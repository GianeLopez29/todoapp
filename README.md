# TodoApp Backend

API REST para aplicación de gestión de tareas con autenticación JWT y verificación por email.

## 🚀 Características

- **Autenticación segura**: JWT + Hash de contraseñas con bcrypt
- **Verificación por email**: Registro con confirmación por correo
- **CRUD completo**: Tareas y Categorías
- **Arquitectura en capas**: Routes → Controllers → Services → Repositories
- **Validación de datos**: Joi para validación de entrada
- **Manejo de errores**: Middleware centralizado
- **Base de datos**: MongoDB con Mongoose

## 📋 Requisitos

- Node.js 16+
- MongoDB
- Cuenta de email (Gmail recomendado)

## 🛠️ Instalación

1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd todo-backend
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus datos:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
CLIENT_URL=http://localhost:3000
```

4. Iniciar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📚 API Endpoints

### Autenticación

#### POST /api/auth/register
Registrar nuevo usuario
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456"
}
```

#### POST /api/auth/login
Iniciar sesión
```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

#### GET /api/auth/verify-email?token=TOKEN
Verificar email con token

#### GET /api/auth/profile
Obtener perfil del usuario (requiere JWT)

### Tareas

#### GET /api/tasks
Obtener todas las tareas del usuario (requiere JWT)

#### POST /api/tasks
Crear nueva tarea (requiere JWT)
```json
{
  "title": "Completar proyecto",
  "description": "Finalizar la aplicación de tareas",
  "dueDate": "2024-12-31",
  "category": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

#### GET /api/tasks/:id
Obtener tarea específica (requiere JWT)

#### PUT /api/tasks/:id
Actualizar tarea (requiere JWT)

#### DELETE /api/tasks/:id
Eliminar tarea (requiere JWT)

### Categorías

#### GET /api/categories
Obtener todas las categorías del usuario (requiere JWT)

#### POST /api/categories
Crear nueva categoría (requiere JWT)
```json
{
  "name": "Trabajo",
  "color": "#3B82F6"
}
```

#### GET /api/categories/:id
Obtener categoría específica (requiere JWT)

#### PUT /api/categories/:id
Actualizar categoría (requiere JWT)

#### DELETE /api/categories/:id
Eliminar categoría (requiere JWT)

## 🏗️ Arquitectura

```
src/
├── config/          # Configuración de BD
├── models/          # Modelos de Mongoose
├── repositories/    # Acceso a datos
├── services/        # Lógica de negocio
├── controllers/     # Manejo de req/res
├── routes/          # Definición de rutas
├── middleware/      # Middlewares (auth, validación, errores)
└── utils/           # Utilidades (JWT, email)
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds: 12)
- JWT con expiración configurable
- Validación de entrada con Joi
- CORS configurado
- Variables de entorno para datos sensibles

## 🚀 Despliegue

### Heroku
1. Crear app en Heroku
2. Configurar variables de entorno
3. Conectar MongoDB Atlas
4. Deploy desde GitHub

### Railway
1. Conectar repositorio
2. Configurar variables de entorno
3. Deploy automático

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| PORT | Puerto del servidor | 5000 |
| MONGODB_URI | URI de MongoDB | mongodb://localhost:27017/todoapp |
| JWT_SECRET | Secreto para JWT | mi_secreto_super_seguro |
| JWT_EXPIRE | Expiración del JWT | 7d |
| EMAIL_HOST | Host del email | smtp.gmail.com |
| EMAIL_PORT | Puerto del email | 587 |
| EMAIL_USER | Usuario del email | tu@email.com |
| EMAIL_PASS | Contraseña del email | tu_app_password |
| CLIENT_URL | URL del frontend | http://localhost:3000 |

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Test con coverage
npm run test:coverage
```

## 📄 Licencia

MIT License