# 📌 Backend - Gestión de Tareas y Proyectos

Este es el backend de la aplicación de gestión de tareas y proyectos. Está construido con **Node.js, Express y MongoDB**, siguiendo la arquitectura **MVC** y utilizando **TypeScript** para un código más seguro y mantenible.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución para JavaScript en el servidor.
- **Express.js** - Framework para construir la API de manera eficiente.
- **MongoDB** - Base de datos NoSQL para almacenar la información.
- **Mongoose** - ODM para interactuar con MongoDB usando modelos de datos.
- **TypeScript** - Tipado estático para mejorar la seguridad y calidad del código.
- **JSON Web Token (JWT)** - Autenticación segura con tokens.
- **Nodemailer** - Envío de correos electrónicos.
- **Arquitectura MVC** - Organización del código en Modelos, Vistas y Controladores.

## 📂 Estructura del Proyecto

```
backend_task/
│── src/
│   ├── config/          # Configuración (DB, CORS, Email)
│   ├── controllers/     # Controladores de la lógica de negocio
│   ├── emails/          # Envío de correos
│   ├── middleware/      # Middleware de autenticación y validación
│   ├── models/          # Modelos de la base de datos
│   ├── routes/          # Rutas de la API
│   ├── utils/           # Funciones de utilidad
│── .env                 # Variables de entorno
│── package.json         # Configuración del proyecto
│── tsconfig.json        # Configuración de TypeScript
```

## 🛠 Instalación y Configuración

1. Clona el repositorio:
   ```sh
    git clone https://github.com/wilyramos/backend_teamly_projects.git
    cd backend_task
    npm install
    npm run dev

## ✅ Scripts Disponibles

- `npm run dev` → Ejecuta el servidor en modo desarrollo con Nodemon
- `npm run build` → Compila el proyecto TypeScript a JavaScript
- `npm start` → Ejecuta la versión compilada en producción

Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.

---

📌 **¡Contribuye!** Si tienes mejoras o encuentras errores, abre un issue o haz un pull request. 😊
