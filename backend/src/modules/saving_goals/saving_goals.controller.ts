import type { Request, Response } from "express";
import { db } from "../../config/db";
import { createSavingGoalSchema, updateSavingGoalSchema } from "./saving_goals.schema";


export const createSavingGoal = async (req: Request, res: Response) => {
    const bodyResult = createSavingGoalSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `輸入資料錯誤` });
    }
    try {
        const { user_id, name, target_date, goal_amount } = bodyResult.data;

        const [insertResult]: any = await db.query(
            `
            INSERT INTO saving_goals 
            (user_id, name, target_date, goal_amount)
            VALUES (?,?,?,?)
            `,
            [user_id, name, target_date, goal_amount]
        );
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立儲蓄目標失敗` });
        }

        const [newResult]: any = await db.query(
            `
            SELECT * FROM saving_goals WHERE id = ?
            `,
            [insertResult.insertId]
        );
        res.status(201).json({ success: true, message: "建立儲蓄目標成功", data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getSavingGoals = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;
        let query = `SELECT * FROM saving_goals`
        let params = []




        if (user_id) {
            query += ` WHERE user_id = ?`
            params.push(user_id);
        }


        const [savingGoalsResult]: any = await db.query(query, params);
        if (savingGoalsResult.length === 0) {
            return res.status(404).json({ success: false, message: user_id ? `該帳號沒有儲蓄目標` : `沒有儲蓄目標` });
        }

        res.status(200).json({ success: true, message: `取得儲蓄目標成功`, data: savingGoalsResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}


export const getSavingGoalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [savingGoalResult]: any = await db.query(
            `SELECT * FROM saving_goals WHERE id = ?`,
            [id]
        )
        if (savingGoalResult.length === 0) {
            return res.status(404).json({ success: false, message: `該儲蓄目標不存在`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得儲蓄目標成功", data: savingGoalResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const updateSavingGoalById = async (req: Request, res: Response) => {
    const bodyResult = updateSavingGoalSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` })
    }
    try {
        const { id } = req.params;
        const { name, target_date, goal_amount } = bodyResult.data;

        const [savingGoalResult]: any = await db.query(
            `
            SELECT id FROM saving_goals WHERE id = ?
            `,
            [id]
        );
        if (savingGoalResult.length === 0) {
            return res.status(404).json({ success: false, message: `該儲蓄目標不存在` });
        }

        const [updateResult]: any = await db.query(
            `
            UPDATE saving_goals
            SET
                name = COALESCE(?, name),
                target_date = COALESCE(?, target_date),
                goal_amount = COALESCE(?, goal_amount)
            WHERE id = ?
            `,
            [name ?? null, target_date ?? null, goal_amount ?? null, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `更新儲蓄目標失敗` });
        }

        const [newResult]: any = await db.query(
            `SELECT * FROM saving_goals WHERE id = ?`,
            [id]
        );
        res.status(200).json({ success: true, message: `更新儲蓄目標成功`, data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const deleteSavingGoalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [savingGoalResult]: any = await db.query(
            `
            SELECT 
                id  
            FROM saving_goals
            WHERE id = ?
            `,
            [id]
        );
        if (savingGoalResult.length === 0) {
            return res.status(400).json({ success: false, message: `該儲蓄目標不存在` });
        }

        const [deleteResult]: any = await db.query(
            `
            DELETE FROM saving_goals WHERE id = ?
            `,
            [id]
        );
        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `刪除儲蓄目標失敗` });
        }

        res.status(200).json({ success: true, message: `刪除儲蓄目標成功` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}
