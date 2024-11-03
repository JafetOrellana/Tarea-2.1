import { z } from 'zod'


export const validateUserSchema = (user) => userSchema.safeParse(user)

const tareaSchema = z.object(
    {
        "titulo": z.string({
            invalid_type_error: "El titulo debe ser un string"
        }).trim().min(3, {
            message: "El titulo debe tener al menos 3 caracteres"
        }),
        "descripcion": z.string().trim().min(20, {
            message: "La descripción debe tener al menos 20 caracteres"
        }).optional(),
        "completada": z.boolean({message: "La tarea debe ser un valor boleano"}).optional(),
        "fecha_creacion": z.string().datetime().optional(),
    },
).strict({
    message: "No incluya campos adicionales"});

export const validateTareaSchema = (tarea) => tareaSchema.safeParse(tarea)

export const validatePartialTareaSchema = (tarea) => tareaSchema.partial().safeParse(tarea)

