import { z } from 'zod';
export const createAccountSchema = z.object({
    user_id: z.number(),

    name: z.string(),
    image_url: z.string(),
    balance: z.number()
});

export const updateAccountSchema = z.object({
    name: z.string().optional(),
    image_url: z.string().optional(),
    balance: z.number().optional()
});