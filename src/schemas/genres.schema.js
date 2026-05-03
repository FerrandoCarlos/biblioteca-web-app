import { z } from 'zod';

const genreSchema = z.object({
    description: z
        .string()
        .min(3, 'La descripción debe tener al menos 3 caracteres')
        .max(100, 'La descripción no puede superar los 100 caracteres')
        .trim()
});

export default genreSchema;