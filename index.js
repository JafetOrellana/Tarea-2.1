/*Tarea: Creación de una API básica de gestión de tareas
Objetivo: Desarrollar una API RESTful (sin conexión a base de datos de momento) para
gestionar una lista de tareas (To-Do List) usando Node.js y Express.
Requisitos:
1. Modelos de Datos: Deben crear un modelo básico para cada objeto de tarea
que incluya:
oid: (numerico unico).
otítulo: (string).
odescripcion: (string).
ocompletada: (booleano).
ofecha_creacion: DateTime.
2. Rutas y Funcionalidades:
oGET /tareas: Obtener la lista de todas las tareas.
oGET /tareas/:id: Obtener una tarea específica por su id.
oPOST /tareas: Crear una nueva tarea.
oPUT /tareas/:id: Actualizar una tarea existente.
oDELETE /tareas/:id: Eliminar una tarea por su id.
Todas las acciones se deben agregar a un archivo .json similar a como filtramos en el
ejemplo en clase, las funcionalidades de agregar, actualizar y eliminar, deben usar los
verbos correspondientes y usar como “base de datos” una lista dentro del archivo .json.
Adicional:
•
Validar que el título de la tarea sea obligatorio y que la descripción tenga al menos
20 caracteres.
•
Manejar errores como tareas no encontradas y validaciones fallidas con sus
respectivos códigos de respuesta.*/

import express, { json } from "express";
import  tareas  from "./store/tareas.json" with {type: "json"};
import crypto from 'node:crypto'
import { validatePartialTareaSchema, validateTareaSchema } from "./schemas/tarea.schema.js";
const app = express();

app.disable("x-powered-by");
app.use(json());

const PORT = process.env.PORT || 3000;

app.get("/tareas", (req, res) => {
    res.
        header('Content-Type', 'application/json')
        .status(200)
        .json(tareas);
});

app.get("/tareas/:id", (req, res) => {
    const id = Number(req.params.id);
    
    const tarea = tareas.find((tarea) => tarea.id === id);

    if (!id) {
    return    res.status(404).json({ error: "El id debe ser numerico" });
    }

    if (!tarea) {
    return    res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(tarea);
});

app.post("/tareas", (req, res) => {
    const data = req.body;
    const {success, error} = validateTareaSchema(data);

    if (!data.titulo) {
        return res.status(400).json({
            message: "El título es obligatorio."
        });
    }

    if (!success) {
        return res.status(400).json({
            message: JSON.parse(error.message)
        })
    }
 
    const id = tareas[tareas.length - 1].id + 1;
    if (!data.completada) {
        data.completada = false;
    }

    if (!data.fecha_creacion) {
        data.fecha_creacion = new Date().toISOString();
    }
    data.id = id;
    tareas.push(data);

    res.status(201).json(tareas);

});

app.put("/tareas/:id", (req, res) => {
    const data = req.body;
    const {success, error} = validatePartialTareaSchema(data);

    if (!success) {
        return res.status(400).json({
            message: JSON.parse(error.message)
        })
    }

    const id = Number(req.params.id);

    const index = tareas.findIndex((tarea) => tarea.id == id);

    if (index == -1) {
       return res.status(404).json({ error: "Tarea no encontrada" });
    }


    const tareaActualizada = { ...tareas[index], ...data };
    tareas[index] = { ...tareaActualizada};

    

    res.json(tareas[index]);
});

app.delete("/tareas/:id", (req, res) => {
    const data = req.body;
    
    const id = Number(req.params.id);

    const index = tareas.findIndex((tarea) => tarea.id == id);

    if (index == -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    tareas.splice(index, 1);

    return res.json(tareas);
});


// ... (todo tu código actual de Express) ...

// Al final de tu archivo principal (ej. app.js o index.js)
// Exporta la instancia de la aplicación para que los tests puedan importarla
export default app;

// La línea de app.listen() solo debe ejecutarse si el archivo se ejecuta directamente,
// no cuando es importado por los tests.
if (process.env.NODE_ENV !== 'test') { // Solo escucha si no estamos en entorno de pruebas
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}