import type { Request, Response } from "express";
import { db } from "../../config/db";
import { createAccountSchema, updateAccountSchema } from "./accounts.schema";
import { success } from "zod";

export const createAccount = async (req: Request, res: Response) => {
    const { user_id } = (req as any).user;
    if (!user_id) {
        return res.status(400).json({ success: false, message: "沒有資格" });
    }
    const bodyResult = createAccountSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: "輸入資料錯誤" });
    }
    try {
        const { name, image_url, balance } = bodyResult.data;

        const [insertResult]: any = await db.query(
            `
            INSERT INTO accounts
            (user_id, name, image_url, balance)
            VALUES (?,?,?,?)
            `,
            [user_id, name, image_url, balance]
        );
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立帳戶失敗` })
        }

        res.status(201).json({ success: true, message: "建立帳戶成功", data: insertResult.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getAccounts = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;

        let query =
            `SELECT 
                id,
                user_id,
                name,
                image_url,
                balance,
                created_at,
                updated_at
            FROM accounts`
        const queryParams: any[] = [];

        if (user_id) {
            query += ` WHERE user_id = ?`
            queryParams.push(user_id);
        }

        const [accountsResult]: any = await db.query(query, queryParams);

        if (accountsResult.length === 0) {
            return res.status(404).json({ success: false, message: user_id ? `該用戶者沒有帳戶資料` : `沒有帳戶資料`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得帳戶成功", data: accountsResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}
export const getAccountsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [accountResult]: any = await db.query(
            `SELECT 
                id,
                user_id,
                name,
                image_url,
                balance,
                created_at,
                updated_at
            FROM accounts
            WHERE id = ?`,
            [id]
        )
        if (accountResult.length === 0) {
            return res.status(404).json({ success: false, message: `沒有帳戶資料`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得帳戶成功", data: accountResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const updateAccountById = async (req: Request, res: Response) => {
    const bodyResult = updateAccountSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    try {
        const { id } = req.params;
        const { name, image_url, balance } = bodyResult.data;
        const [accountResult]: any = await db.query(
            `
            SELECT id FROM accounts WHERE id = ?
            `,
            [id]
        );
        if (accountResult.length === 0) {
            return res.status(404).json({ success: false, message: `該帳戶不存在` });
        }

        const [updateResult]: any = await db.query(
            `
            UPDATE accounts SET
                name = COALESCE(?, name),
                image_url = COALESCE(?, image_url),
                balance = COALESCE(?, balance)
            WHERE id = ?
            `,
            [name ?? null, image_url ?? null, balance ?? null, id]
        )
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `更新帳戶失敗` });
        }

        const [newResult]: any = await db.query(
            `
            SELECT * FROM accounts WHERE id = ?
            `,
            [id]
        )
        res.status(200).json({ success: true, message: `更新帳戶成功`, data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const deleteAccountById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [accountResult]: any = await db.query(
            `
            SELECT 
                id  
            FROM accounts 
            WHERE id = ?
            `,
            [id]
        );
        if (accountResult.length === 0) {
            return res.status(400).json({ success: false, message: `帳戶不存在` });
        }

        const [deleteResult]: any = await db.query(
            `
            DELETE FROM accounts WHERE id = ?
            `,
            [id]
        );
        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `刪除帳戶失敗` });
        }

        res.status(200).json({ success: true, message: `刪除帳戶成功` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}


export const getTotalAssets = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;
        const [totalAssetsResult]: any = await db.query(
            'SELECT SUM(balance) AS assets FROM accounts WHERE user_id = ?',
            [user_id]
        );
        if (totalAssetsResult.length === 0) {
            return res.status(404).json({ success: false, message: `沒有` })
        }

        res.status(200).json({ success: true, message: `取得成功`, data: totalAssetsResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}