import type { Request, Response } from "express";
import { db } from "../../config/db";
import { createRecordSchema, updateRecordSchema } from "./records.schema";
import { success } from "zod/mini";



export const createRecord = async (req: Request, res: Response) => {
    const bodyResult = createRecordSchema.safeParse(req.body);
    if (!bodyResult.success) {
        console.log(bodyResult.error.format());
        return res.status(400).json({ success: false, message: `輸入資料錯誤` });
    }
    try {
        const { user_id, account_id, category_id, type, amount, remarks, record_date } = bodyResult.data;

        const [insertResult]: any = await db.query(
            `
            INSERT INTO records
            (user_id, account_id, category_id, type, amount, remarks, record_date)
            VALUES (?,?,?,?,?,?,?)
            `,
            [user_id, account_id, category_id, type, amount, remarks, record_date]
        );
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立紀錄失敗` })
        }

        const [newResult]: any = await db.query(
            `
            SELECT * FROM records WHERE id = ?
            `,
            [insertResult.insertId]
        );
        res.status(201).json({ success: true, message: "建立紀錄成功", data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getRecords = async (req: Request, res: Response) => {
    try {
        const { user_id, account_id } = req.query;
        let query = `
        SELECT 
            r.id,
            r.user_id,
            r.type, 
            r.amount, 
            r.remarks, 
            r.record_date,
            r.created_at, 
            r.updated_at,
            a.id AS account_id,
            a.name AS account_name,
            a.image_url AS account_image_url, 
            a.balance AS account_balance,
            c.id AS category_id,
            c.name AS category_name, 
            c.image_url AS category_image_url
        FROM records r
        LEFT JOIN accounts a ON r.account_id = a.id
        LEFT JOIN categories c ON r.category_id = c.id
        `
        let params = []


        if (user_id) {
            query += ` WHERE r.user_id = ?`
            params.push(user_id);
        }

        if (account_id) {
            query += ' WHERE r.account_id = ?';
            params.push(account_id);
        }

        query += ' ORDER BY record_date DESC'

        const [recordsResult]: any = await db.query(query, params);
        if (recordsResult.length === 0) {
            return res.status(404).json({ success: false, message: user_id ? `該帳號沒有紀錄` : `沒有紀錄` });
        }

        const grouped: any = {};
        for (let i = 0; i < recordsResult.length; i++) {

            const date = new Date(recordsResult[i].record_date).toLocaleDateString('en-CA');

            if (!grouped[date]) {
                grouped[date] = [];
            }

            grouped[date].push(recordsResult[i]);
        }



        res.status(200).json({ success: true, message: `取得紀錄成功`, data: grouped });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}


export const getRecordsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [recordResult]: any = await db.query(
            ` SELECT
            r.user_id,
            r.type, 
            r.amount, 
            r.remarks, 
            r.record_date,
            r.created_at, 
            r.updated_at,
            a.id AS account_id,
            a.name AS account_name,
            a.image_url AS account_image_url, 
            a.balance AS account_balance,
            c.id AS category_id,
            c.name AS category_name, 
            c.image_url AS category_image_url
        FROM records r
        LEFT JOIN accounts a ON r.account_id = a.id
        LEFT JOIN categories c ON r.category_id = c.id
        WHERE r.id = ?`,
            [id]
        )
        if (recordResult.length === 0) {
            return res.status(404).json({ success: false, message: `該紀錄不存在`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得紀錄成功", data: recordResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}


export const getMonthlySummary = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;

        const [result]: any = await db.query(
            `SELECT 
                DATE_FORMAT(record_date, '%Y-%m') AS month, 
                SUM(CASE WHEN type ='income' THEN amount ELSE 0 END) AS income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
            FROM records
            WHERE user_id = ?
            GROUP BY month
            ORDER BY month`,
            [user_id]
        )
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: `沒有資料`, data: [] });
        }

        res.status(200).json({ success: true, message: `取得月成功`, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const updateRecordById = async (req: Request, res: Response) => {
    const bodyResult = updateRecordSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` })
    }
    try {
        const { id } = req.params;
        const { account_id, category_id, type, amount, remarks, record_date } = bodyResult.data;

        const [recordResult]: any = await db.query(
            `
            SELECT id FROM records WHERE id = ?
            `,
            [id]
        );
        if (recordResult.length === 0) {
            return res.status(404).json({ success: false, message: `該紀錄不存在` });
        }

        const [updateResult]: any = await db.query(
            `
            UPDATE records
            SET
                account_id = COALESCE(?, account_id) ,
                category_id = COALESCE(?, category_id),
                type = COALESCE(?, type),
                amount = COALESCE(?, amount),
                remarks = COALESCE(?,remarks),
                record_date = COALESCE(?, record_date)
            WHERE id = ?
            `,
            [account_id ?? null, category_id ?? null, type ?? null, amount ?? null, remarks ?? null, record_date ?? null, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `更新紀錄失敗` });
        }

        const [newResult]: any = await db.query(
            `SELECT 
                r.type, 
                r.amount, 
                r.remarks, 
                r.created_at, 
                r.updated_at,
                a.name AS account_name,
                a.image_url AS account_image_url, 
                a.balance AS account_balance,
                c.name AS category_name, 
                c.image_url AS category_image_url
            FROM records r
            LEFT JOIN accounts a ON r.account_id = a.id
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.id = ?`,
            [id]
        );
        res.status(200).json({ success: true, message: `更新紀錄成功`, data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const deleteRecordById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [recordResult]: any = await db.query(
            `
            SELECT 
                id  
            FROM records
            WHERE id = ?
            `,
            [id]
        );
        if (recordResult.length === 0) {
            return res.status(400).json({ success: false, message: `該紀錄不存在` });
        }

        const [deleteResult]: any = await db.query(
            `
            DELETE FROM records WHERE id = ?
            `,
            [id]
        );
        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `刪除紀錄失敗` });
        }

        res.status(200).json({ success: true, message: `刪除類別成功` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getTopExpenseRecords = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;

        const [topTenResult]: any = await db.query(
            `
            SELECT 
                r.id,
                r.user_id,
                r.type,
                r.amount,
                r.remarks,
                r.record_date,
                r.created_at,
                r.updated_at,
                a.id AS account_id,
                a.name AS account_name,
                a.image_url AS account_image_url,
                a.balance AS account_balance,
                c.id AS category_id,
                c.name AS category_name,
                c.image_url AS category_image_url
            FROM records r
            LEFT JOIN accounts a ON r.account_id = a.id
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.user_id = ? AND r.type = 'expense'
            ORDER BY amount DESC
            LIMIT 10
            `,
            [user_id]
        );

        res.status(200).json({ success: true, message: `get`, data: topTenResult })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` })
    }
}


export const getSummary = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;

        const [userSummaryResult]: any = await db.query(
            `
            SELECT
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
                COUNT(id) AS total_records 
            FROM records 
            WHERE user_id = ?
            `,
            [user_id]
        );

        res.status(200).json({ success: true, message: `取得成功`, data: userSummaryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}