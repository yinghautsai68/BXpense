import { z } from 'zod';

export const createCategorySchema = z.object({
    user_id: z.number(),
    name: z.string(),
    image_url: z.string(),
});

export const updateCategorySchema = z.object({
    name: z.string().optional(),
    image_url: z.string().optional()
})