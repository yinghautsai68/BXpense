import z from "zod";

export const chartQuerySchema = z.object({
    year: z.coerce.number().int("年份必須是整數").min(2000, "年份必須>=2000"),
    month: z.coerce.number().int("月份必須是整數").min(1, "月份不能小於1").max(12, "月份不能大於12")
});