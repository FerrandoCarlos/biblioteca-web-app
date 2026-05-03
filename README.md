# 📚 Biblioteca Web App

Trabajo práctico de la cátedra Web II - Integración de Node.js + PostgreSQL

## 🛠️ Tecnologías

- **Node.js** — entorno de ejecución
- **Express** — servidor web y rutas
- **PostgreSQL** — base de datos relacional
- **Pug** — motor de plantillas
- **Tailwind CSS** — estilos por CDN
- **Zod** — validación de datos
- **Multer** — subida de archivos
- **dotenv** — variables de entorno

## 📁 Estructura del proyecto

biblioteca-web-app/
├── src/
│ ├── config/ ← conexión a la BD (Singleton)
│ ├── controllers/ ← lógica de cada entidad
│ ├── middlewares/ ← validación, errores, uploads
│ ├── models/ ← consultas a la BD
│ ├── routes/ ← rutas de la app
│ ├── schemas/ ← validaciones con Zod
│ ├── views/ ← plantillas Pug
│ └── public/ ← archivos estáticos
├── .env.example
└── app.js

## ⚙️ Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/FerrandoCarlos/biblioteca-web-app.git
cd biblioteca-web-app
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. Crear la base de datos en PostgreSQL

```bash
# Ejecutar el script SQL en DBeaver o psql
```

5. Iniciar el servidor

```bash
npm run dev
```

## 🗄️ Base de datos

### Tablas

- `genres` — géneros literarios
- `authors` — autores
- `books` — libros
- `book_authors` — relación muchos a muchos

### Stored Procedures y Functions

- CRUD completo para cada entidad
- Transactions para operaciones complejas

## 🏗️ Arquitectura

Patrón **MVC** (Model - View - Controller)

| Capa       | Responsabilidad   |
| ---------- | ----------------- |
| Model      | Consultas a la BD |
| View       | Plantillas Pug    |
| Controller | Lógica de negocio |

## 📐 Patrones y principios

- **Singleton** — conexión a la BD
- **DRY** — código sin repetición
- **SOLID** — principios de diseño
- **Clean Code** — código legible
- **Conventional Commits** — historial de git

## 🌐 Rutas

### Géneros

| Método | Ruta               | Descripción       |
| ------ | ------------------ | ----------------- |
| GET    | /genres            | Listar todos      |
| GET    | /genres/create     | Formulario crear  |
| POST   | /genres            | Crear género      |
| GET    | /genres/:id/edit   | Formulario editar |
| POST   | /genres/:id/edit   | Actualizar        |
| POST   | /genres/:id/delete | Eliminar          |

### Autores

| Método | Ruta                | Descripción       |
| ------ | ------------------- | ----------------- |
| GET    | /authors            | Listar todos      |
| GET    | /authors/create     | Formulario crear  |
| POST   | /authors            | Crear autor       |
| GET    | /authors/:id        | Biografía         |
| GET    | /authors/:id/edit   | Formulario editar |
| POST   | /authors/:id/edit   | Actualizar        |
| POST   | /authors/:id/delete | Eliminar          |

### Libros

| Método | Ruta                | Descripción       |
| ------ | ------------------- | ----------------- |
| GET    | /books              | Listar todos      |
| GET    | /books/create       | Formulario crear  |
| POST   | /books              | Crear libro       |
| GET    | /books/:isbn        | Detalle           |
| GET    | /books/:isbn/edit   | Formulario editar |
| POST   | /books/:isbn/edit   | Actualizar        |
| POST   | /books/:isbn/delete | Eliminar          |
