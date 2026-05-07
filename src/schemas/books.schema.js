import { z } from 'zod'

const bookSchema = z.object({
    isbn: z
        .string()
        .min(10, 'El ISBN debe tener al menos 10 caracteres')
        .max(20, 'El ISBN no puede superar los 20 caracteres')
        .trim(),

    title: z
        .string()
        .min(2, 'El título debe tener al menos 2 caracteres')
        .max(200, 'El título no puede superar los 200 caracteres')
        .trim(),

    description: z
        .string()
        .max(1000, 'La descripción no puede superar los 1000 caracteres')
        .trim()
        .optional()
        .nullable(),

    genre_id: z.uuid('El género no es válido'),

    year: z
        .coerce
        .number()
        .int('El año debe ser un número entero')
        .min(1000, 'El año no es válido')
        .max(new Date().getFullYear(), 'El año no puede ser futuro'),

    pages_number: z
        .coerce
        .number()
        .int('Las páginas deben ser un número entero')
        .min(1, 'El libro debe tener al menos 1 página'),

    // Acepta string o array y lo normaliza siempre a array
    author_ids: z
        .union([z.string(), z.array(z.string())])
        .transform(val => Array.isArray(val) ? val : [val])
        .pipe(z.array(z.string()).min(1, 'El libro debe tener al menos un autor')),

    percentages: z
        .union([z.string(), z.array(z.string())])
        .transform(val => Array.isArray(val) ? val : [val])
        .pipe(z.array(z.coerce.number().min(0).max(100)))
})

export default bookSchema