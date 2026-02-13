# 🐾 Smart Pet Feeder - Sistema de Dispensado Inteligente

## 📋 Descripción
Aplicación full stack IoT para un dispensador inteligente de comida para mascotas. El sistema integra hardware (ESP32), backend (Node.js + Express), frontend (React) y base de datos (MongoDB) para ofrecer un control total del alimentación de tus mascotas desde cualquier lugar.

### Características Principales
- 🔐 **Autenticación y autorización** con JWT (usuarios y administradores)
- 🐕 **Gestión de perfiles de mascotas** con información detallada
- ⏰ **Programación de horarios de alimentación** automáticos
- 🎯 **Dispensado manual** con control de porciones en gramos
- 📊 **Monitoreo en tiempo real** mediante WebSockets
- 📈 **Dashboard administrativo** con estadísticas y análisis
- 🔔 **Sistema de notificaciones** en tiempo real
- 📸 **Upload de fotos** para perfiles de mascotas (Cloudinary)
- 🤖 **IoT con ESP32** - Integración con sensores y actuadores

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Framework de estilos
- **React Router DOM** - Enrutamiento
- **Lucide React** - Iconos
- **Socket.io Client** - WebSockets en tiempo real
- **React Toastify** - Notificaciones
- **jsPDF** - Generación de reportes PDF

### Backend
- **Node.js + Express 5** - Servidor web
- **MongoDB + Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Cloudinary** - Almacenamiento de imágenes
- **Multer** - Upload de archivos
- **Socket.io** - WebSockets
- **CORS** - Cross-Origin Resource Sharing

### Hardware (IoT)
- **ESP32** - Microcontrolador WiFi
- **HX711** - Sensor de peso (celda de carga)
- **HC-SR501 (PIR)** - Sensor de movimiento
- **Sensor IR** - Detección de obstáculos
- **Servomotor SG90** - Dispensador mecánico
- **Arduino IDE** - Programación del ESP32

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    USUARIO (Frontend Web)                       │
│  React App - Dashboard, Horarios, Perfil de Mascota            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                     	REST API 
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                     │
│  • API REST (CRUD)                                              │
│  • Autenticación JWT                                            │
│  • scheduleProcessor.js (⏰ Verifica horarios cada minuto)      │
│  • Socket.io (Notificaciones en tiempo real)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    MongoDB (Base de Datos)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                     BASE DE DATOS                                │
│  • users (usuarios y admins)                                    │
│  • pets (perfiles de mascotas)                                  │
│  • schedules (horarios programados)                             │
│  • sensorCommands (órdenes de dispensado)                       │
│  • sensors (estado de sensores)                                 │
│  • notifications (notificaciones)                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTP Polling (cada 3s)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      ESP32 (Arduino)                             │
│  • Consulta órdenes cada 3 segundos                             │
│  • Abre servo (dispensa comida)                                 │
│  • Monitorea peso con HX711                                     │
│  • Detecta movimiento (PIR)                                     │
│  • Detecta obstáculos (IR)                                      │
│  • Cierra servo al alcanzar peso objetivo                       │
│  • Marca orden como completada                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Instalación

### Requisitos Previos
- **Node.js** v18 o superior
- **Git**
- **MongoDB** (local o MongoDB Atlas)
- **Cuenta de Cloudinary** (para imágenes)
- **ESP32** con Arduino IDE configurado

### 1. Clonar el Repositorio
```bash
git clone <tu-repositorio>
cd proyectoIntegrador
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en `backend/`:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/petfeeder
# O MongoDB Atlas: mongodb+srv://usuario:password@cluster.mongodb.net/petfeeder

JWT_SECRET=tu_clave_secreta_muy_segura

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

NODE_ENV=development
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

Crear archivo `.env` en `frontend/`:
```env
VITE_API_URL=http://localhost:4000
```

### 4. Configurar ESP32 (Arduino)

Instalar librerías en Arduino IDE:
- WiFi (incluida con ESP32)
- HTTPClient (incluida con ESP32)
- ArduinoJson (por Christopher Kohlhoff)
- HX711 (por Bogdan Necula)
- ESP32Servo (por Kevin Harrington)

Editar `sensores.ino` y configurar:
```cpp
// WiFi
const char* ssid = "TU_WIFI";
const char* password = "TU_PASSWORD";

// Backend API (reemplaza IP del servidor backend)
const char* API_STATUS = "http://IP:4000/api/sensors/status";
const char* API_COMMAND = "http://IP:4000/api/sensors/command";
const char* API_COMPLETE = "http://IP:4000/api/sensors/command";

// ID único del dispositivo
#define DEVICE_ID "petfeeder-01"
```

**Conexiones de Hardware:**
```
ESP32          Componente
------------------------------
GPIO 26    →   PIR (HC-SR501)
GPIO 25    →   IR Sensor
GPIO 16    →   HX711 DOUT
GPIO 4     →   HX711 CLK
GPIO 13    →   Servo Signal
5V         →   VCC (sensores)
GND        →   GND (común)
```

---

## 🚀 Uso

### 1. Iniciar el Backend
```bash
cd backend
npm run server
```
El servidor estará disponible en `http://localhost:4000` o `http://IP_AWS:4000`

### 2. Iniciar el Frontend
```bash
cd frontend
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173` o `http://IP:5173`

### 3. Cargar Código en ESP32
1. Abrir `sensores.ino` en Arduino IDE
2. Seleccionar placa: **ESP32 Dev Module**
3. Verificar y cargar el código
4. Abrir Monitor Serial (115200 baud) para ver logs

### 4. Crear Usuario Administrador (Opcional)
```bash
cd backend
npm run create-admin
```

### 5. Usar la Aplicación Web

#### Registro y Login
1. Acceder a `http://IP:5173`
2. Registrarse con email y contraseña
3. Iniciar sesión

#### Registrar Mascota
1. Ir a "Registrar Mascota"
2. Completar:
   - Nombre
   - Edad
   - Género
   - Peso
   - Nivel de actividad
   - Raza
   - Foto (opcional)

#### Crear Horarios de Alimentación
1. Ir a "Horario de Alimentación"
2. Click en "Agregar Horario"
3. Configurar:
   - Hora (formato 24h)
   - Porción en gramos
   - Días de la semana
4. Guardar

El backend verificará cada minuto si hay horarios pendientes y creará órdenes automáticamente.

#### Dispensado Manual
1. Ir al Dashboard
2. En "Quick Feed", seleccionar porción (gramos)
3. Click en "Dispensar Ahora"

El ESP32 consultará la orden en máximo 3 segundos y comenzará el dispensado.

#### Monitoreo en Tiempo Real
- **Dashboard:** Muestra estado de sensores
  - Peso actual de comida en el plato
  - Detección de movimiento (mascota cerca)
  - Nivel del hopper (depósito)
  - Estado del servo
- **Notificaciones:** Alertas automáticas por eventos

#### Panel de Administrador
Login administrativo: `http://IP:5173/admin-login`
- Vista general de estadísticas
- Gestión de usuarios
- Logs de actividad
- Análisis de rendimiento

---

## 📡 API Endpoints

Base URL: `http://IP_AWS:4000/api`

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/admin` | Login de administrador |

### Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users` | Obtener todos los usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| PUT | `/users/:id` | Actualizar usuario completo |
| PATCH | `/users/:id` | Actualizar campos específicos |
| DELETE | `/users/:id` | Eliminar usuario |

### Mascotas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/pets` | Registrar nueva mascota |
| GET | `/pets/user/:userId` | Obtener mascotas del usuario |
| GET | `/pets/:id` | Obtener mascota por ID |
| PUT | `/pets/:id` | Actualizar mascota |
| DELETE | `/pets/:id` | Eliminar mascota |

### Horarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/schedules` | Crear horario |
| GET | `/schedules/user/:userId` | Obtener horarios del usuario |
| GET | `/schedules/:id` | Obtener horario por ID |
| PUT | `/schedules/:id` | Actualizar horario |
| DELETE | `/schedules/:id` | Eliminar horario |

### Sensores y Comandos (IoT)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/sensors/status` | ESP32 envía estado de sensores |
| GET | `/sensors` | Obtener todos los estados |
| GET | `/sensors/device/:deviceId` | Obtener último estado del dispositivo |
| POST | `/sensors/command` | ESP32 consulta si hay órdenes pendientes |
| POST | `/sensors/commands` | Crear orden manual de dispensado |
| PATCH | `/sensors/command/:id/complete` | Marcar orden como completada |

### Notificaciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/notifications/user/:userId` | Obtener notificaciones del usuario |
| POST | `/notifications` | Crear notificación |
| PATCH | `/notifications/:id/read` | Marcar como leída |

---

## 🤖 Sistema de Sensores (ESP32)

### Flujo de Dispensado

```
[Usuario] Crea horario (09:00 AM - 300g)
    ↓
[Backend] scheduleProcessor verifica cada minuto
    ↓ (09:00 AM detectado)
[Backend] Crea orden: {status: "pending", portionTarget: 300}
    ↓
[ESP32] Consulta cada 3 segundos → POST /api/sensors/command
    ↓
[Backend] Encuentra orden pendiente → {dispense: true, portionTarget: 300, commandId: "cmd-123"}
[Backend] Actualiza estado → status: "in_progress"
    ↓
[ESP32] Detecta nueva orden (commandId diferente)
[ESP32] Abre servo (180°)
[ESP32] Monitorea peso: 0g → 100g → 200g → 300g ✅
    ↓
[ESP32] Cierra servo (0°)
[ESP32] PATCH /api/sensors/command/cmd-123/complete
    ↓
[Backend] Actualiza estado → status: "completed"
    ↓
[ESP32] Guarda commandId para evitar duplicados
```

### Sensores Implementados

#### HX711 - Sensor de Peso
- **Función:** Mide el peso de comida en el plato
- **Precisión:** ±1 gramo
- **Uso:** Control de porciones, detección de comida faltante
- **Calibración:** Factor configurado en código (`calibration_factor = 66.74`)

#### PIR (HC-SR501) - Sensor de Movimiento
- **Función:** Detecta presencia de la mascota
- **Rango:** 3-7 metros
- **Uso:** Notificaciones de actividad, estadísticas de visitas

#### Sensor IR - Nivel del Hopper
- **Función:** Detecta nivel bajo de comida en el depósito
- **Uso:** Alerta de recarga necesaria

#### Servomotor SG90
- **Función:** Abre/cierra compuerta del dispensador
- **Posiciones:**
  - `0°` → Cerrado
  - `180°` → Abierto
- **Control:** PWM en GPIO 13

### Características de Seguridad
- ✅ **Prevención de duplicados:** El ESP32 guarda el último `commandId` ejecutado
- ✅ **Límite de peso máximo:** No dispensa más de 1110g (protección)
- ✅ **Confirmación de ejecución:** Marca orden como completada al finalizar
- ✅ **Reconexión automática:** Si se pierde WiFi, reintenta conectar
- ✅ **Timeout de servo:** Cierra automáticamente si alcanza límite

---

## 🗂️ Estructura del Proyecto

```
proyectoIntegrador/
│
├── sensores.ino                 # Código Arduino para ESP32
├── ARQUITECTURA_COMPLETA.md     # Documentación de arquitectura
├── SISTEMA_DISPENSADO.md        # Flujo del sistema de dispensado
├── Readme.md                    # Este archivo
│
├── backend/                     # Servidor Node.js
│   ├── server.js                # Punto de entrada
│   ├── package.json
│   ├── .env                     # Variables de entorno (no incluido en repo)
│   │
│   ├── config/
│   │   ├── mongodb.js           # Conexión a MongoDB
│   │   └── cloudinary.js        # Configuración de Cloudinary
│   │
│   ├── models/                  # Modelos de Mongoose
│   │   ├── userModel.js
│   │   ├── petModel.js
│   │   ├── scheduleModel.js
│   │   ├── sensorCommandModel.js
│   │   ├── sensorsModel.js
│   │   └── notificationsModel.js
│   │
│   ├── controllers/             # Lógica de negocio
│   │   ├── userController.js
│   │   ├── petController.js
│   │   ├── scheduleController.js
│   │   ├── sensorController.js
│   │   └── notificationController.js
│   │
│   ├── routes/                  # Rutas de la API
│   │   ├── authRouter.js
│   │   ├── userRouter.js
│   │   ├── petRouter.js
│   │   ├── scheduleRoute.js
│   │   ├── sensorRoute.js
│   │   └── notificationRoute.js
│   │
│   ├── middleware/
│   │   └── multer.js            # Upload de imágenes
│   │
│   ├── services/
│   │   └── scheduleProcessor.js # Procesador automático de horarios
│   │
│   └── scripts/
│       ├── createAdmin.js       # Script para crear admin
│       └── testDispense.js      # Script de prueba de dispensado
│
└── frontend/                    # Aplicación React
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env                     # Variables de entorno (no incluido en repo)
    │
    └── src/
        ├── App.jsx              # Componente raíz
        ├── main.jsx             # Punto de entrada
        ├── index.css
        │
        ├── pages/               # Páginas principales
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Menu.jsx         # Dashboard principal
        │   ├── RegisterPet.jsx
        │   ├── PetProfile.jsx
        │   ├── FeedingSchedule.jsx
        │   ├── Settings.jsx
        │   └── AdminLogin.jsx
        │
        ├── components/          # Componentes reutilizables
        │   ├── ProtectedRoute.jsx
        │   ├── AdminRoute.jsx
        │   ├── dashboard/       # Componentes del dashboard
        │   ├── feeding/         # Componentes de alimentación
        │   ├── home/            # Componentes de landing
        │   ├── layout/          # Headers, footers, sidebar
        │   ├── login/
        │   ├── pet/
        │   ├── petProfile/
        │   ├── register/
        │   └── settings/
        │
        ├── admin/               # Panel administrativo
        │   ├── pages/
        │   │   ├── AdminOverview.jsx
        │   │   ├── AdminUsers.jsx
        │   │   ├── AdminLogs.jsx
        │   │   └── AdminPerformance.jsx
        │   ├── components/
        │   └── componentslayout/
        │
        ├── context/
        │   └── AuthContext.jsx  # Contexto de autenticación
        │
        ├── hooks/
        │   └── useDispenser.js  # Custom hook para dispensador
        │
        ├── services/
        │   └── sensorService.js # Servicios de API
        │
        └── assets/              # Imágenes, iconos
```

---

## 🧪 Scripts Disponibles

### Backend
```bash
npm run server       # Iniciar servidor con nodemon (auto-reload)
npm start           # Iniciar servidor en producción
npm run create-admin # Crear usuario administrador
npm run test:dispense # Probar dispensado manual
```

### Frontend
```bash
npm run dev         # Iniciar servidor de desarrollo
npm run -- --host   # Iniciar en modo host para acceso desde red local
```

---

## 🔧 Troubleshooting

### ESP32 no se conecta al WiFi
- Verificar nombre de red y contraseña
- Asegurar que la red sea 2.4GHz (ESP32 no soporta 5GHz)
- Revisar en Monitor Serial los intentos de conexión

### ESP32 no consulta órdenes
- Verificar que la IP del backend sea correcta y accesible
- Ping a la IP del servidor desde otra computadora en la misma red
- Verificar firewall no esté bloqueando puerto 4000

### El servo no abre/cierra correctamente
- Verificar conexión de alimentación (5V)
- Ajustar valores `SERVO_ABIERTO` y `SERVO_CERRADO` según tu servo
- Revisar que el pin 13 esté bien conectado

### El peso no se mide correctamente
- Calibrar el HX711 ajustando `calibration_factor`
- Ejecutar `scale.tare()` sin peso en la celda de carga
- Colocar peso conocido y ajustar factor

### Órdenes se ejecutan múltiples veces
- Verificar que el código del ESP32 tenga la lógica de `lastCommandId`
- Asegurar que se llame `markCommandComplete()` al finalizar
- Revisar en MongoDB que las órdenes cambien a `status: "completed"`

---

## 👥 Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto es para uso educativo como parte de un Proyecto Integrador.

---

## ✨ Mejoras Futuras

- [ ] Aplicación móvil (React Native)
- [ ] Integración de Webhooks para eventos en tiempo real
- [ ] Comprobacion del peso de mascota con una balanza digital
- [ ] Cámara para monitoreo en vivo
- [ ] Análisis de hábitos alimenticios con IA
- [ ] Integración con sensores de salud (collar inteligente)
- [ ] Notificaciones push
- [ ] Soporte para múltiples dispositivos por usuario
- [ ] Historial de dispensado con gráficas
- [ ] Integración con asistentes de voz (Alexa, Google Home)

---

## 📞 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.


