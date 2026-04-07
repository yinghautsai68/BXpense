import type { Request, Response } from "express";
import { db } from "../../config/db";
import { addRecordToSavingGoalSchema, updateSavingGoalRecordSchema } from "./saving_goal_records.schema";
import { success } from "zod";


export const addRecordToSavingGoal = async (req: Request, res: Response) => {
    const bodyResult = addRecordToSavingGoalSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `輸入資料錯誤` });
    }
    try {
        const { id } = req.params;
        const { date, amount } = bodyResult.data;

        const [insertResult]: any = await db.query(
            `
            INSERT INTO saving_goal_records
            (saving_goal_id, date, amount)
            VALUES (?,?,?)
            `,
            [id, date, amount]
        );
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立儲蓄目標紀錄失敗` });
        }

        const [newResult]: any = await db.query(
            `
            SELECT * FROM saving_goal_records WHERE id = ?
            `,
            [insertResult.insertId]
        );
        res.status(201).json({ success: true, message: "建立儲蓄目標紀錄成功", data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getSavingGoalRecords = async (req: Request, res: Response) => {
    try {
        // get user_id from token!
        const [userResult]: any = await db.query(
            `SELECT
                id
            FROM users 
            WHERE id = ?`,
            [1]
        );
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: `用戶不存在` })
        }

        // 取得用戶的所有 儲蓄目標
        const [savingGoalsResult]: any = await db.query(
            `
            SELECT 
                id
            FROM saving_goals
            WHERE user_id = ?
            `,
            [1]
        );
        if (savingGoalsResult.length === 0) {
            return res.status(404).json({ success: false, message: `該用戶沒有儲蓄目標` })
        }

        for (let goal of savingGoalsResult) {
            const [savingGoalRecordsResult]: any = await db.query(
                `SELECT * FROM saving_goal_records WHERE saving_goal_id = ?`,
                [goal.id]
            );
            goal.records = savingGoalRecordsResult;
        }



        res.status(200).json({ success: true, message: `取得儲蓄目標成功`, data: savingGoalsResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}


export const getSavingGoalRecordById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [savingGoalRecordResult]: any = await db.query(
            `SELECT * FROM saving_goal_records WHERE id = ?`,
            [id]
        )
        if (savingGoalRecordResult.length === 0) {
            return res.status(404).json({ success: false, message: `該儲蓄目標紀錄不存在`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得儲蓄目標紀錄成功", data: savingGoalRecordResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const updateSavingGoalRecordById = async (req: Request, res: Response) => {
    const bodyResult = updateSavingGoalRecordSchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` })
    }
    try {
        const { id } = req.params;
        const { date, amount } = bodyResult.data;

        const [savingGoalRecordResult]: any = await db.query(
            `
            SELECT id FROM saving_goal_records WHERE id = ?
            `,
            [id]
        );
        if (savingGoalRecordResult.length === 0) {
            return res.status(404).json({ success: false, message: `該儲蓄目標紀錄不存在` });
        }

        const [updateResult]: any = await db.query(
            `
            UPDATE saving_goal_records
            SET
                date = COALESCE(?, date),
                amount = COALESCE(?, amount)
            WHERE id = ?
            `,
            [date ?? null, amount ?? null, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `更新儲蓄目標紀錄失敗` });
        }

        const [newResult]: any = await db.query(
            `SELECT * FROM saving_goal_records WHERE id = ?`,
            [id]
        );
        res.status(200).json({ success: true, message: `更新儲蓄目標紀錄成功`, data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const deleteSavingGoalRecordById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [savingGoalRecordResult]: any = await db.query(
            `
            SELECT 
                id  
            FROM saving_goal_records
            WHERE id = ?
            `,
            [id]
        );
        if (savingGoalRecordResult.length === 0) {
            return res.status(400).json({ success: false, message: `該儲蓄目標紀錄不存在` });
        }

        const [deleteResult]: any = await db.query(
            `
            DELETE FROM saving_goal_records WHERE id = ?
            `,
            [id]
        );
        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `刪除儲蓄目標紀錄失敗` });
        }

        res.status(200).json({ success: true, message: `刪除儲蓄目標紀錄成功` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}
