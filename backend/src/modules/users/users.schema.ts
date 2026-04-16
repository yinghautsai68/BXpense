import { z } from 'zod';

export const createUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    image_url: z.string(),
})

export const updateUserSchema = z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    image_url: z.string().optional(),
}) 