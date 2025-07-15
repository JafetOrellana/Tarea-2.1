// test/tareas.test.js
import request from 'supertest';

import app from '../index.js'; 

describe('API de Tareas', () => {
  // Test para GET /tareas
  test('GET /tareas debería devolver todas las tareas', async () => {
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('titulo');
  });

  // Test para POST /tareas
  test('POST /tareas debería crear una nueva tarea con título válido', async () => {
    const nuevaTarea = {
      titulo: 'Nueva Tarea de Prueba',
      descripcion: 'Esta es una descripción de una tarea de prueba que tiene más de veinte caracteres.',
    };
    const res = await request(app)
      .post('/tareas')
      .send(nuevaTarea);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          titulo: 'Nueva Tarea de Prueba',
        }),
      ]),
    );
  });

  // Test para POST /tareas con título faltante (validación)
  test('POST /tareas debería devolver error 400 si falta el título', async () => {
    const nuevaTareaInvalida = {
      descripcion: 'Esta es una descripción de una tarea de prueba que tiene más de veinte caracteres.',
    };
    const res = await request(app)
      .post('/tareas')
      .send(nuevaTareaInvalida);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("El título es obligatorio.");
  });

  // Test para GET /tareas/:id
  test('GET /tareas/:id debería devolver una tarea específica', async () => {
    const res = await request(app).get('/tareas/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  test('GET /tareas/:id debería devolver error 404 si la tarea no existe', async () => {
    const res = await request(app).get('/tareas/9999'); 
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe('Tarea no encontrada');
  });
});