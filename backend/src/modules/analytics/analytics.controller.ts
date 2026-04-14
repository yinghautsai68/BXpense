import { db } from "../../config/db";
import type { Request, Response } from "express";

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