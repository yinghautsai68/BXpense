import z from "zod";

export const createCategoryFormSchema = z.object({
    name: z.string().min(1, '請輸入名稱'),
    image_url: z.string().min(1, '請選擇照片')
});