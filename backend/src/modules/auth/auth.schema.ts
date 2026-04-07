import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    image_url: z.string()
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});