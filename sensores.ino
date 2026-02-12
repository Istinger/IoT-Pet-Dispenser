#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include <ESP32Servo.h>

/* ================= CONFIG ================= */
#define DEVICE_ID "petfeeder-01"

/* ================= WIFI ================= */
const char* ssid = "WIFI";
const char* password = "PASSW";

/* ================= BACKEND ================= */
const char* API_STATUS = "http://IP:4000/api/sensors/status";
const char* API_COMMAND = "http://IP:4000/api/sensors/command";
const char* API_COMPLETE = "http://IP:4000/api/sensors/command";

/* ================= PINES ================= */
#define PIR_PIN 26
#define IR_PIN  25
#define DOUT 16
#define CLK  4
#define SERVO_PIN 13

#define SERVO_ABIERTO 180
#define SERVO_CERRADO 0

#define LIMITE_MAXIMO 1110.0

HX711 scale;
Servo servo;

float calibration_factor = 66.74;

bool sirviendo = false;
float pesoObjetivo = 0;

// IMPORTANTE: Guardar commandId de la última orden ejecutada
String lastCommandId = "";
String currentCommandId = "";  // ID de la orden que se está ejecutando

unsigned long lastCheck = 0;

/* ================= WIFI ================= */
void connectWiFi() {
  WiFi.begin(ssid, password);
  Serial.println("Conectando WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");
}

/* ================= MARCAR ORDEN COMO COMPLETADA ================= */
void markCommandComplete(String commandId) {
  if (commandId.length() == 0) return;
  
  HTTPClient http;
  String url = String(API_COMPLETE) + "/" + commandId + "/complete";
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PATCH("");  // PATCH sin body
  
  if (httpCode == 200) {
    Serial.print("✅ Orden marcada como completada: ");
    Serial.println(commandId);
  } else {
    Serial.print("❌ Error marcando orden: ");
    Serial.println(httpCode);
  }
  
  http.end();
}

/* ================= SETUP ================= */
void setup() {
  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);
  pinMode(IR_PIN, INPUT);

  scale.begin(DOUT, CLK);
  scale.set_scale(calibration_factor);
  delay(3000);
  scale.tare();

  servo.attach(SERVO_PIN, 500, 2400);
  servo.write(SERVO_CERRADO);

  connectWiFi();
}

/* ================= LOOP ================= */
void loop() {

  float peso = scale.get_units(10);
  bool pir = digitalRead(PIR_PIN);
  bool ir  = digitalRead(IR_PIN);

  /* ===== SI ESTÁ DISPENSANDO ===== */
  if (sirviendo) {

    if (peso >= pesoObjetivo || peso >= LIMITE_MAXIMO) {

      servo.write(SERVO_CERRADO);
      sirviendo = false;

      Serial.println("✅ Dispensado completado");
      Serial.print("Peso final: ");
      Serial.print(peso);
      Serial.println("g");

      // 🔴 MARCAR ORDEN COMO COMPLETADA EN BACKEND
      markCommandComplete(currentCommandId);
      
      // Guardar que ya ejecutamos esta orden
      lastCommandId = currentCommandId;
      currentCommandId = "";
    }
  }

  /* ===== CONSULTAR BACKEND CADA 3 SEGUNDOS ===== */
  if (millis() - lastCheck >= 3000) {
    lastCheck = millis();

    if (WiFi.status() == WL_CONNECTED) {

      HTTPClient http;
      http.begin(API_COMMAND);
      http.addHeader("Content-Type", "application/json");

      String payload = "{\"deviceId\":\"" + String(DEVICE_ID) + "\"}";
      int httpCode = http.POST(payload);

      if (httpCode == 200) {

        String response = http.getString();

        DynamicJsonDocument doc(512);
        deserializeJson(doc, response);

        bool dispense = doc["dispense"];
        float portionTarget = doc["portionTarget"];
        String commandId = doc["commandId"].as<String>();

        Serial.println("\n----- CONSULTA A BACKEND -----");
        Serial.print("Respuesta: ");
        Serial.println(response);

        // ✅ VERIFICAR: Solo ejecutar si es una NUEVA orden (commandId diferente)
        if (dispense && !sirviendo && commandId != lastCommandId) {

          Serial.println("🎯 NUEVA ORDEN DETECTADA");
          
          pesoObjetivo = peso + portionTarget;

          if (pesoObjetivo > LIMITE_MAXIMO)
            pesoObjetivo = LIMITE_MAXIMO;

          servo.write(SERVO_ABIERTO);
          sirviendo = true;
          currentCommandId = commandId;  // Guardar ID de la orden actual

          Serial.println(">>> ABRIENDO SERVO");
          Serial.print("Objetivo: ");
          Serial.print(pesoObjetivo);
          Serial.print("g | CommandId: ");
          Serial.println(commandId);

        } else if (dispense && commandId == lastCommandId) {
          // Ignorar: Es la misma orden que ya ejecutamos
          Serial.println("⏭️  IGNORANDO: Orden ya ejecutada");
          
        } else if (!dispense) {
          // No hay nueva orden
          Serial.println("⏸️  SIN ÓRDENES NUEVAS");
        }

        Serial.println("----------------------------");
      }

      http.end();

      /* ===== ENVIAR ESTADO ===== */
      HTTPClient httpStatus;
      httpStatus.begin(API_STATUS);
      httpStatus.addHeader("Content-Type", "application/json");

      DynamicJsonDocument statusDoc(512);
      statusDoc["deviceId"] = DEVICE_ID;
      statusDoc["pir"] = pir;
      statusDoc["ir"] = ir;
      statusDoc["pesoComida"] = peso;
      statusDoc["servoAbierto"] = sirviendo;

      String jsonStatus;
      serializeJson(statusDoc, jsonStatus);

      int statusCode = httpStatus.POST(jsonStatus);
      httpStatus.end();

      Serial.print("Status enviado: ");
      Serial.println(peso);
    }
  }

  delay(200);
}
