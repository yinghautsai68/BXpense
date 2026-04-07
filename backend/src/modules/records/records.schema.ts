import { z } from 'zod';

export const createRecordSchema = z.object({
    user_id: z.number(),
    account_id: z.number(),
    category_id: z.number(),
    type: z.enum(['expense', 'income']),
    amount: z.number(),
    remarks: z.string()
});

export const updateRecordSchema = z.object({
    account_id: z.number().optional(),
    category_id: z.number().optional(),
    type: z.enum(['expense', 'income']).optional(),
    amount: z.number().optional(),
    remarks: z.string().optional(),
});