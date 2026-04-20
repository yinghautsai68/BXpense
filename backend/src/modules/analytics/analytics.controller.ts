import { record, success } from "zod";
import { db } from "../../config/db";
import type { Request, Response } from "express";

export const getLineChartSummaryExpense = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;

        /*
        const [result]: any = await db.query(
            `
            SELECT
                id,
                user_id,
                record_date,
                type,
                amount
            FROM records 
            WHERE user_id = ?
            `,
            [user_id]
        )
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: '沒有資料', data: [] });
        }

        const formatResult = result.map((data: any) => ({
            ...data, record_date: data.record_date.toISOString().split("T")[0]
        }));

        const group: Record<string, any[]> = {};
        for (let i = 0; i < formatResult.length; i++) {
            if (!group[formatResult[i].record_date]) {
                group[formatResult[i].record_date] = [];
            }

            group[formatResult[i].record_date]!.push({
                id: formatResult[i].id,
                user_id: formatResult[i].user_id,
                type: formatResult[i].type,
                amount: formatResult[i].amount
            });
        }

        const chartData = Object.entries(group).map(([date, items]) => {
            const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

            return {
                date,
                amuont: total
            }
        });
        */
        const [result]: any = await db.query(
            `
            SELECT 
                DATE_FORMAT(record_date, '%Y-%m-%d') AS date,
                SUM(amount) AS amount
            FROM records
            WHERE user_id = ? AND record_date >= '2026-03-01' AND record_date <= '2026-04-01' 
            GROUP BY date
            ORDER BY date ASC
            `,
            [user_id]
        );
        res.status(200).json({ success: true, message: '資料', data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const getCategorySummary = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;
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
            WHERE r.user_id = ? AND r.type = 'expense'
            GROUP BY c.id, c.name, c.image_url
            ORDER BY total_amount DESC
            `,
            [user_id]
        );

        res.status(200).json({ success: true, message: `取得成功`, data: categorySummaryResult })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}