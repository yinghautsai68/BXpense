import { z } from "zod";

export const createAccountSchema = z.object({
    name: z.string().min(1, "請輸入名稱"),
    image_url: z.string().min(1, "請上傳照片"),
    balance: z.number().min(0, "餘額不能小於 0"),
});

export const updateAccountSchema = z.object({
    name: z.string().min(1, "請輸入名稱"),
    image_url: z.string().min(1, "請上傳照片"),
    balance: z.number().min(0, "餘額不能小於 0")
});

export type CreateAccountType = z.infer<typeof createAccountSchema>;