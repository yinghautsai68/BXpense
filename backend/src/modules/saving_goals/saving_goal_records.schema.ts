import { z } from 'zod';

export const addRecordToSavingGoalSchema = z.object({
    date: z.string(),
    amount: z.number()
});

export const updateSavingGoalRecordSchema = z.object({
    date: z.string().optional(),
    amount: z.number().optional()
})