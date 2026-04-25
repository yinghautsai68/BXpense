import { record, success } from "zod";
import { db } from "../../config/db";
import type { Request, Response } from "express";
import { chartQuerySchema } from "./analytics.schema";

export const getLineChartSummaryExpense = async (req: Request, res: Response) => {
    const queryResult = chartQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
        queryResult.error.issues.map((item) => console.error(item.message));
        return res.status(400).json({ success: false, message: `所輸入query有誤` });
    }
    try {
        const { user_id } = (req as any).user;
        const { year, month } = queryResult.data;


        const startDate = new Date(Number(year), Number(month) - 1, 1);
        const endDate = new Date(Number(year), Number(month), 1);
        const [result]: any = await db.query(
            `
            SELECT 
                DATE_FORMAT(record_date, '%Y-%m-%d') AS date,
                SUM(amount) AS amount
            FROM records
            WHERE user_id = ? AND type = 'expense' AND CONVERT_TZ(record_date, '+00:00', '+08:00') >= ? AND CONVERT_TZ(record_date, '+00:00', '+08:00') < ? 
            GROUP BY date
            ORDER BY date ASC
            `,
            [user_id, startDate, endDate]
        );
        if (result.length === 0) {
            return res.status(200).json({ success: true, message: `該時段沒有資料`, data: {} });
        }

        const grouped: any = {};
        for (let i = 0; i < result.length; i++) {
            const raw_date = result[i].date;
            const year = new Date(raw_date).toLocaleString('sv-SE', { year: 'numeric' });
            const month = new Date(raw_date).toLocaleString('sv-SE', { month: 'numeric' });

            if (!grouped[year]) {
                grouped[year] = {};
            }
            if (!grouped[year][month]) {
                grouped[year][month] = [];
            }
            grouped[year][month].push({
                date: result[i].date,
                amount: result[i].amount
            });
        }

        res.status(200).json({ success: true, message: '資料', data: grouped });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const getCategorySummary = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;
        const { year, month } = req.query;
        const start_date = new Date(Number(year), Number(month) - 1, 1);
        const end_date = new Date(Number(year), Number(month), 1);
        const [categorySummaryResult]: any = await db.query(
            `
            SELECT 
                c.id,
                c.name,
                c.image_url,
                SUM(r.amount) AS total_amount,
                COUNT(r.id) AS count
            FROM categories c 
            LEFT JOIN records r ON c.id = r.category_id
            WHERE r.user_id = ? AND r.type = 'expense' AND CONVERT_TZ(r.record_date, '+00:00', '+08:00') >= ? AND CONVERT_TZ(r.record_date, '+00:00', '+08:00') < ?
            GROUP BY c.id, c.name, c.image_url
            ORDER BY total_amount DESC
            `,
            [user_id, start_date, end_date]
        );
        if (categorySummaryResult.length === 0) {
            return res.status(200).json({ success: true, message: `沒有任何數據`, data: [] });
        }

        res.status(200).json({ success: true, message: `取得成功`, data: categorySummaryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}