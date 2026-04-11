import { z } from 'zod';
export const createAccountSchema = z.object({
    name: z.string().min(1, "請輸入名稱"),
    image_url: z.string().min(1, "請輸入照片"),
    balance: z.number().min(0, "餘額不能為負數量")
});

export const updateAccountSchema = z.object({
    name: z.string().optional(),
    image_url: z.string().optional(),
    balance: z.number().optional()
});