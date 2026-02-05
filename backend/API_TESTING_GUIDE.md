# API Testing Guide - SnackBox Backend

## 🚀 Quick Start

### 1. Iniciar el servidor
```bash
cd backend
npm run server
```

### 2. Crear usuario Admin
```bash
npm run create-admin
```

### 3. El servidor debería estar en: `http://localhost:4000`

---

## 📝 Testing Endpoints con cURL

### 1️⃣ REGISTRO DE USUARIO (POST /api/auth/register)

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Password123"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2️⃣ LOGIN DE USUARIO (POST /api/auth/login)

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Password123"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3️⃣ LOGIN DE ADMIN (POST /api/auth/admin)

```bash
curl -X POST http://localhost:4000/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@snackbox.com",
    "password": "Admin@123"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4️⃣ LISTAR USUARIOS (GET /api/users)

```bash
curl -X GET http://localhost:4000/api/users \
  -H "Content-Type: application/json"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "user",
      "favData": {}
    }
  ]
}
```

---

### 5️⃣ OBTENER USUARIO POR ID (GET /api/users/:id)

```bash
curl -X GET http://localhost:4000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json"
```

---

### 6️⃣ ACTUALIZAR USUARIO (PUT /api/users/:id)

```bash
curl -X PUT http://localhost:4000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez",
    "email": "juancarlos@example.com"
  }'
```

---

### 7️⃣ ACTUALIZAR PARCIALMENTE (PATCH /api/users/:id)

```bash
curl -X PATCH http://localhost:4000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newemail@example.com"
  }'
```

---

### 8️⃣ ELIMINAR USUARIO (DELETE /api/users/:id)

```bash
curl -X DELETE http://localhost:4000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json"
```

---

## 🧪 Testing en Postman

### Importar endpoints

1. Abre **Postman**
2. Crea una nueva colección llamada "SnackBox API"
3. Agrega estas solicitudes:

#### Register
- **Type**: POST
- **URL**: `http://localhost:4000/api/auth/register`
- **Body** (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@1234"
}
```

#### Login User
- **Type**: POST
- **URL**: `http://localhost:4000/api/auth/login`
- **Body** (JSON):
```json
{
  "email": "test@example.com",
  "password": "Test@1234"
}
```

#### Login Admin
- **Type**: POST
- **URL**: `http://localhost:4000/api/auth/admin`
- **Body** (JSON):
```json
{
  "email": "admin@snackbox.com",
  "password": "Admin@123"
}
```

#### List All Users
- **Type**: GET
- **URL**: `http://localhost:4000/api/users`

#### Get User by ID
- **Type**: GET
- **URL**: `http://localhost:4000/api/users/{{USER_ID}}`

#### Update User
- **Type**: PUT
- **URL**: `http://localhost:4000/api/users/{{USER_ID}}`
- **Body** (JSON):
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

## ✅ Validaciones de la API

### Registro de usuario
- ✅ Email debe ser válido
- ✅ Contraseña mínimo 8 caracteres
- ✅ El email no debe existir
- ✅ La contraseña se hashea antes de guardar

### Login
- ✅ Usuario debe existir
- ✅ Contraseña debe coincidir
- ✅ Retorna JWT token

### Admin Login
- ✅ Solo usuarios con role='admin' pueden loguear
- ✅ La contraseña debe coincidir con hash en BD

### CRUD de usuarios
- ✅ No se retorna la contraseña en GET
- ✅ Validación de email en UPDATE/PATCH
- ✅ Hash de nuevas contraseñas en UPDATE/PATCH

---

## 🔐 Estructura del JWT Token

Después de decodificar el token obtendrás:

**Token de Usuario:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "role": "user"
}
```

**Token de Admin:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "role": "admin"
}
```

---

## 📊 Estructura de Respuestas

### Respuesta exitosa
```json
{
  "success": true,
  "data": {...}
}
```

### Respuesta con error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🐛 Troubleshooting

Si obtienes errores:

1. **"User does not exist"** → El email no está registrado
2. **"User already exists"** → El email ya existe en la BD
3. **"Invalid email"** → El formato del email es incorrecto
4. **"Please enter strong password"** → La contraseña debe tener min. 8 caracteres
5. **"Incorrect password"** → La contraseña no es correcta
6. **"Access denied: Not an admin user"** → El usuario no tiene rol de admin

---

## 🚀 Flujo Recomendado de Testing

1. Crear admin: `npm run create-admin`
2. Registrar usuario: POST `/api/auth/register`
3. Loguear usuario: POST `/api/auth/login`
4. Loguear admin: POST `/api/auth/admin`
5. Listar usuarios: GET `/api/users`
6. Obtener usuario: GET `/api/users/{id}`
7. Actualizar usuario: PUT `/api/users/{id}`
8. Eliminar usuario: DELETE `/api/users/{id}`
