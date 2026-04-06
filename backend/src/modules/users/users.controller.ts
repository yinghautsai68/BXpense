import type { Request, Response } from "express";
import { success } from "zod";
import { createUserSchema, updateUserSchema } from "./users.schema";
import { db } from "../../config/db";
import bcrypt from 'bcrypt';
export const createUser = async (req: Request, res: Response) => {
    const bodyResult = createUserSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: "輸入資料錯誤" });
    }
    try {
        const { username, password, image_url } = bodyResult.data;

        const [userResult]: any = await db.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );
        if (userResult.length > 0) {
            return res.status(400).json({ success: false, message: `使用者已存在` })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [insertResult]: any = await db.query(
            `
            INSERT INTO users 
            (username, password, image_url)
            VALUES (?,?,?)
            `,
            [username, hashedPassword, image_url]
        );
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立使用者失敗` })
        }

        res.status(201).json({ success: true, message: "建立使用者成功", data: insertResult.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [usersResult]: any = await db.query(
            `SELECT username, image_url, created_at, updated_at FROM users`
        )
        if (usersResult.length === 0) {
            return res.status(404).json({ success: false, message: `沒有使用者資料`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得使用者成功", data: usersResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [userResult]: any = await db.query(
            `
            SELECT 
                username, 
                image_url, 
                created_at, 
                updated_at 
            FROM users 
            WHERE id = ?
            `,
            [id]
        );
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: `沒有使用者資料`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得使用者成功", data: userResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const bodyResult = updateUserSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有錯誤` });
    }
    try {
        const { id } = req.params;
        const { username, image_url } = bodyResult.data;

        const [userResult]: any = await db.query(
            `SELECT id FROM users WHERE id = ?`,
            [id]
        );
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: `使用者不存在` });
        }

        const [updateResult]: any = await db.query(
            `
            UPDATE users SET
                username = COALESCE (?, username),
                image_url = COALESCE (?, image_url)
            WHERE id = ?
            `,
            [username ?? null, image_url ?? null, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `更新使用者失敗` })
        }

        const [newResult]: any = await db.query(
            `
            SELECT 
                username, 
                image_url, 
                created_at, 
                updated_at 
            FROM users 
            WHERE id = ?
            `,
            [id]
        )


        res.status(200).json({ success: true, message: `更新使用者成功`, data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR!" });
    }
}


export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [userResult]: any = await db.query(
            `
            SELECT 
                username, 
                image_url, 
                created_at, 
                updated_at 
            FROM users 
            WHERE id = ?
            `,
            [id]
        );
        if (userResult.length === 0) {
            return res.status(400).json({ success: false, message: `使用者資料不存在` });
        }

        const [deleteResult]: any = await db.query(
            `
            DELETE FROM users WHERE id = ?
            `,
            [id]
        );
        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `刪除使用者失敗` });
        }

        res.status(200).json({ success: true, message: `刪除使用者成功` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

/*
export const createUser = async (req: Request, res: Response) => {
    try {

        res.status(200).json({ success: true, message: "" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR!" });
    }
}
*/