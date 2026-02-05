# Proyecto Integrador

## Descripción
Aplicación full stack para un dispensador inteligente de comida para perros. El sistema permite autenticar usuarios, registrar datos del dispositivo (sensores) y administrar perfiles, con un panel web para monitoreo y control.

## Objetivos
- Integrar conocimientos de diferentes áreas
- Desarrollar habilidades de trabajo en equipo
- Aplicar buenas prácticas de desarrollo

## Requisitos
- Node.js (v14 o superior)
- Git
- [Añade otros requisitos según corresponda]

## Instalación
```bash
git clone <tu-repositorio>
cd proyectoIntegrador

# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

## Uso
1) Configura variables de entorno
	- Crea un archivo .env en backend con las claves necesarias (por ejemplo, la cadena de conexion a MongoDB).

2) Inicia el backend
```bash
cd backend
npm run server
```

3) Inicia el frontend
```bash
cd ../frontend
npm run dev
```

4) Abre la app
	- Frontend: http://localhost:5173
	- Backend: http://localhost:3000 (o el puerto configurado en .env)

## Endpoints
Base URL: http://localhost:4000 (o el puerto configurado en .env)

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/admin

### Sensores
- POST /api/sensors
- GET /api/sensors
- GET /api/sensors/device/:deviceId

### Usuarios
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- PATCH /api/users/:id
- DELETE /api/users/:id

## Estructura del Proyecto
```
proyectoIntegrador/
├── src/
├── tests/
├── docs/
└── README.md
```


