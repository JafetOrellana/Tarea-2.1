# API de Gestión de Tareas

Esta es una API RESTful para gestionar una lista de tareas (To-Do List). La API permite crear, obtener, actualizar y eliminar tareas, utilizando un archivo JSON como almacenamiento temporal.

## Tecnologías

- **Node.js**: v20.17.0
- **Express**: Para la creación de rutas y manejo de solicitudes HTTP.
- **Zod**: Para validación de datos de entrada.

## Características

- CRUD de tareas:
  - **POST /tareas**: Crear una nueva tarea.
  - **GET /tareas**: Obtener todas las tareas.
  - **GET /tareas/:id**: Obtener una tarea específica por ID.
  - **PUT /tareas/:id**: Actualizar una tarea por ID.
  - **DELETE /tareas/:id**: Eliminar una tarea por ID.
- Validación de datos con Zod:
  - El título es obligatorio y debe tener al menos 3 caracteres.
  - La descripción debe tener al menos 20 caracteres si se proporciona.
  - El campo `completada` debe ser booleano.
  - El campo de `fecha_creacion` debe ser del tipo datetime
  

## Requisitos previos

Asegúrate de tener instalado Node.js (versión 20.17.0 o superior) y `npm`.

