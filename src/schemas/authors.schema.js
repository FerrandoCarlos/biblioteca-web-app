import { z } from 'zod';

const authorSchema = z.object({
    first_name: z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres')
        .trim(),
    last_name: z
        .string()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(100, 'El apellido no puede superar los 100 caracteres')
        .trim(),
    id_card: z
        .string()
        .min(2, 'El documento debe tener al menos 7 caracteres')
        .max(100, 'El documento no puede superar los 20 caracteres')
        .trim()
        .optional(),
    email: z
        .string()
        .email('El email no es válido')
        .max(100, 'El email no puede superar los 100 caracteres')
        .trim()
        .optional(),
    photo: z
        .url('La URL de la foto no es válida')
        .optional()
        .nullable()
});

export default authorSchema;