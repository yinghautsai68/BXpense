import z from "zod";

export const RecordFormSchema = z.object({
    user_id: z.number(),
    account_id: z.number().min(1, '請選擇賬戶'),
    category_id: z.number().min(1, '請選擇類別'),
    type: z.enum(['expense', 'income']),
    amount: z.number().min(1, '請輸入金額大於0'),
    remarks: z.string().optional(),
    record_date: z.string()
});


