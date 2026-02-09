#include <WiFi.h>
#include <HTTPClient.h>
#include <HX711.h>
#include <ESP32Servo.h>

/* ================= CONFIG ================= */
#define DEVICE_ID "petfeeder-01"

/* ================= WIFI ================= */
const char* ssid     = "Galaxy A13 D7DC";
const char* password = "muoh9266";

/* ================= BACKEND ================= */
const char* API_POST = "http://10.27.134.128:4000/api/sensors";
const char* API_GET  = "http://10.27.134.128:4000/api/feeding/command";

/* ================= OBJETOS ================= */
HX711 balanzaComida;
HX711 balanzaAnimal;
Servo servo;

/* ================= CALIBRACIÓN ================= */
float ESCALA_COMIDA = -420.0;
float ESCALA_ANIMAL = -2150.0;

/* ================= ESTADO ================= */
bool backendPermite = false;
float portionTarget = 0;
float portionDelivered = 0;
bool dispensing = false;
int servoAngle = SERVO_CERRADO;

unsigned long lastSend = 0;
unsigned long lastCommand = 0;

#define SEND_INTERVAL_MS     3000
#define COMMAND_INTERVAL_MS  4000
#define TIEMPO_MAX_SERVIR    12000

/* ================= WIFI ================= */
void connectWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("🌐 Conectando WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi conectado");
}

/* ================= PESO FILTRADO ================= */
float leerPeso(HX711 &balanza, int muestras) {
  float suma = 0;
  for (int i = 0; i < muestras; i++) {
    suma += balanza.get_units(1);
    delay(5);
  }
  return suma / muestras;
}

/* ================= GET COMANDO ================= */
void getCommand() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(API_GET);

  int httpCode = http.GET();
  if (httpCode == 200) {
    String payload = http.getString();

    // EJEMPLO ESPERADO:
    // { "permitir": true, "grams": 180 }

    backendPermite = payload.indexOf("\"permitir\":true") > 0;

    int gIndex = payload.indexOf("\"grams\":");
    if (gIndex > 0) {
      portionTarget = payload.substring(gIndex + 8).toFloat();
    }

    Serial.println("📥 Comando backend recibido");
  }
  http.end();
}

/* ================= SERVIR COMIDA ================= */
void servirComida() {
  Serial.println("🐕 Sirviendo comida...");
  dispensing = true;
  portionDelivered = 0;

  servo.write(SERVO_ABIERTO);
  servoAngle = SERVO_ABIERTO;

  unsigned long inicio = millis();

  while (true) {
    float peso = leerPeso(balanzaComida, 5);
    portionDelivered = peso;

    if (peso >= portionTarget) break;
    if (millis() - inicio > TIEMPO_MAX_SERVIR) break;

    delay(100);
  }

  servo.write(SERVO_CERRADO);
  servoAngle = SERVO_CERRADO;
  dispensing = false;
}

/* ================= POST SENSORES ================= */
void sendToBackend() {

  if (WiFi.status() != WL_CONNECTED) return;

  bool pir = digitalRead(PIR_PIN);
  bool ir  = digitalRead(IR_PIN);

  float weightAnimal = leerPeso(balanzaAnimal, 15);
  float weightFood   = leerPeso(balanzaComida, 10);

  String json = "{";
  json += "\"deviceId\":\"" DEVICE_ID "\",";
  json += "\"pir\":" + String(pir ? "true" : "false") + ",";
  json += "\"irProximity\":" + String(ir ? "true" : "false") + ",";
  json += "\"weightAnimal\":" + String(weightAnimal, 2) + ",";
  json += "\"weightFood\":" + String(weightFood, 1) + ",";
  json += "\"servoAngle\":" + String(servoAngle) + ",";
  json += "\"dispensing\":" + String(dispensing ? "true" : "false") + ",";
  json += "\"portionTarget\":" + String(portionTarget) + ",";
  json += "\"portionDelivered\":" + String(portionDelivered);
  json += "}";

  HTTPClient http;
  http.begin(API_POST);
  http.addHeader("Content-Type", "application/json");
  http.POST(json);
  http.end();
}

/* ================= SETUP ================= */
void setup() {
  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);
  pinMode(IR_PIN, INPUT);

  servo.attach(SERVO_PIN);
  servo.write(SERVO_CERRADO);

  connectWiFi();

  balanzaComida.begin(HX_COMIDA_DT, HX_COMIDA_SCK);
  balanzaComida.set_scale(ESCALA_COMIDA);
  balanzaComida.tare();

  balanzaAnimal.begin(HX_ANIMAL_DT, HX_ANIMAL_SCK);
  balanzaAnimal.set_scale(ESCALA_ANIMAL);
  balanzaAnimal.tare();

  Serial.println("🐾 PetFeeder ESP32 listo");
}

/* ================= LOOP ================= */
void loop() {

  if (millis() - lastCommand > COMMAND_INTERVAL_MS) {
    getCommand();
    lastCommand = millis();
  }

  bool pir = digitalRead(PIR_PIN);
  bool ir  = digitalRead(IR_PIN);
  float pesoAnimal = leerPeso(balanzaAnimal, 10);

  bool esPerro = (pesoAnimal >= 3.0);

  if (backendPermite && pir && ir && esPerro && !dispensing) {
    servirComida();
    backendPermite = false; // evita repetir
  }

  if (millis() - lastSend > SEND_INTERVAL_MS) {
    sendToBackend();
    lastSend = millis();
  }

  delay(100);
}
