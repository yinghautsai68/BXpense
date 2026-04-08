import type { Request, Response } from "express";
import { success } from "zod";

export const uploadImage = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: `沒有收到任何檔案` });
    }
    try {

        const imageUrl = (req.file as any).location;

        return res.json({
            success: true,
            message: "Upload success",
            image_url: imageUrl
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}