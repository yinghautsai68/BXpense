import z from "zod";

export const updateUserSchema = z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    image_url: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
});