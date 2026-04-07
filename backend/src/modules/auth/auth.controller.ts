import type { Request, Response } from "express";
import { success } from "zod";
import { loginSchema, registerSchema } from "./auth.schema";
import { db } from "../../config/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../../config/env";

export const register = async (req: Request, res: Response) => {
    const bodyResult = registerSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    try {
        const { username, password, confirmPassword, image_url } = bodyResult.data;
        const [userResult]: any = await db.query(
            `SELECT 
                id
            FROM users
            WHERE username = ?`,
            [username]
        );
        if (userResult.length > 0) {
            return res.status(400).json({ success: false, message: `用戶已存在` });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: `密碼不一致` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [insertResult]: any = await db.query(
            `INSERT INTO users (username, password, image_url)
            VALUES (?,?,?)`,
            [username, hashedPassword, image_url]
        )
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立用戶失敗` });
        }

        res.status(201).json({ success: true, message: `建立用戶成功` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const login = async (req: Request, res: Response) => {
    const bodyResult = loginSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    try {
        const { username, password } = bodyResult.data;

        const [userResult]: any = await db.query(
            `SELECT 
                id,
                password
            FROM users
            WHERE username = ?`,
            [username]
        );
        if (userResult.length === 0) {
            return res.status(400).json({ success: false, message: `用戶不存在` });
        }

        const isPasswordMatch = await bcrypt.compare(password, userResult[0].password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: `密碼錯誤` });
        }

        const token = jwt.sign(
            { user_id: userResult[0].id },
            env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({ success: true, message: `登入成功`, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}