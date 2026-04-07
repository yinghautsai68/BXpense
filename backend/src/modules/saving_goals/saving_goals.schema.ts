import { z } from 'zod';
export const createSavingGoalSchema = z.object({
    user_id: z.number(),
    name: z.string(),
    target_date: z.string(),
    goal_amount: z.number()
});

export const updateSavingGoalSchema = z.object({
    name: z.string().optional(),
    target_date: z.string().optional(),
    goal_amount: z.number().optional()
});