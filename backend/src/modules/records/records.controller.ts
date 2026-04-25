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
        const [recordsResult]: any = await db.query(
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
            ORDER BY record_date DESC
            `, []);
        if (recordsResult.length === 0) {
            return res.status(200).json({ success: true, message: `沒有紀錄`, data: [] });
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

export const getMyRecords = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;
        const { type, account_id, sort, limit, year, month } = req.query;

        let query =
            `SELECT 
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
                    WHERE r.user_id = ?
                    `

        const params = [user_id];

        if (type) {
            query += ` AND r.type = ? `
            params.push(type)
        }
        if (account_id) {
            query += ` AND r.account_id = ? `
            params.push(account_id);
        }
        if (year && month) {
            const formatYear = Number(year);
            const formatMonth = Number(month) - 1;
            const start_date = new Date(formatYear, formatMonth, 1);
            const end_date = new Date(formatYear, formatMonth + 1, 1);
            query += ` AND CONVERT_TZ(r.record_date, '+00:00', '+08:00') >= ? AND CONVERT_TZ(r.record_date, '+00:00', '+08:00') < ? `;
            params.push(start_date.toISOString(), end_date.toISOString());
        }

        if (sort === 'amount_desc') {
            query += ` ORDER BY r.amount DESC `;
        } else if (sort === 'amount_asc') {
            query += ` ORDER BY r.amount ASC `;
        }
        else {
            query += ` ORDER BY r.record_date DESC `
        }

        if (limit) {
            query += ` LIMIT ? `;
            params.push(Number(limit))
        }


        const [recordsResult]: any = await db.query(
            query,
            params
        );
        if (recordsResult.length === 0) {
            return res.status(200).json({ success: true, message: user_id ? `該帳號沒有紀錄` : `沒有紀錄`, data: [] });
        }


        res.status(200).json({ success: true, message: `取得紀錄成功`, data: recordsResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getMyGroupedRecords = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;
        const { type, account_id, sort, limit } = req.query;

        let query =
            `SELECT 
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
                WHERE r.user_id = ?
                `

        const params = [user_id];

        if (type) {
            query += ` AND r.type = ? `;
            params.push(type)
        }
        if (account_id) {
            query += ` AND r.account_id = ? `;
            params.push(account_id);
        }

        if (sort === 'amount_desc') {
            query += ` ORDER BY r.amount DESC `;
        } else if (sort === 'amount_asc') {
            query += ` ORDER BY r.amount ASC `;
        }
        else {
            query += ` ORDER BY r.record_date ASC `
        }

        if (limit) {
            query += ` LIMIT ? `;
            params.push(Number(limit))
        }

        const [recordsResult]: any = await db.query(
            query,
            params
        );
        if (recordsResult.length === 0) {
            return res.status(404).json({ success: false, message: user_id ? `該帳號沒有紀錄` : `沒有紀錄` });
        }
        res.status(200).json({ success: true, message: `取得紀錄成功`, data: recordsResult });
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

        const grouped: any = {}
        for (let i = 0; i < result.length; i++) {
            const date = result[i].month;
            const year = new Date(date).toLocaleString('sv-SE', { year: 'numeric' });
            const month = new Date(date).toLocaleString('sv-SE', { month: 'numeric' });
            if (!grouped[year]) {
                grouped[year] = {}
            }
            if (!grouped[year][month]) {
                grouped[year][month] = {
                    income: result[i].income,
                    expense: result[i].expense
                }
            }
        }
        if (result.length === 0) {
            return res.status(200).json({ success: true, message: `沒有資料`, data: [] });
        }

        res.status(200).json({ success: true, message: `取得月成功`, data: grouped });
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

        res.status(200).json({ success: true, message: `取得成功`, data: userSummaryResult[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}