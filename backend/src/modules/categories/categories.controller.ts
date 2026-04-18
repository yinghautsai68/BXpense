import type { Request, Response } from "express";
import { db } from "../../config/db";
import { createCategorySchema, updateCategorySchema } from "./categories.schema";
import { success } from "zod";


export const createCategory = async (req: Request, res: Response) => {
    const bodyResult = createCategorySchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `輸入資料錯誤` });
    }
    try {
        const { user_id } = (req as any).user;
        const { name, image_url } = bodyResult.data;

        const [insertResult]: any = await db.query(
            `
            INSERT INTO categories
            (user_id, name, image_url)
            VALUES (?,?,?)
            `,
            [user_id, name, image_url]
        );
        if (insertResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `建立類別失敗` })
        }

        const [newResult]: any = await db.query(
            `
            SELECT * FROM categories WHERE id = ?
            `,
            [insertResult.insertId]
        );
        res.status(201).json({ success: true, message: "建立類別成功", data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}


export const getCategories = async (req: Request, res: Response) => {
    try {
        const [categoriesResult]: any = await db.query(
            ` 
            SELECT 
                * 
            FROM categories 
            `,
            []
        );
        if (categoriesResult.length === 0) {
            return res.status(404).json({ success: false, message: `沒有類別`, data: [] });
        }
        res.status(200).json({ success: true, message: `取得類別成功`, data: categoriesResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getMyCategories = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as any).user;

        const [categoriesResult]: any = await db.query(
            ` 
            SELECT 
                * 
            FROM categories 
            WHERE user_id = ?`
            , [user_id]);
        if (categoriesResult.length === 0) {
            return res.status(404).json({ success: false, message: `該帳號沒有自己的類別`, data: [] });
        }
        res.status(200).json({ success: true, message: `取得類別成功`, data: categoriesResult });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const getCategoriesById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [categoryResult]: any = await db.query(
            `SELECT 
              *
            FROM categories
            WHERE id = ?`,
            [id]
        )
        if (categoryResult.length === 0) {
            return res.status(404).json({ success: false, message: `類別不存在`, data: [] });
        }

        res.status(200).json({ success: true, message: "取得類別成功", data: categoryResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const updateCategoryById = async (req: Request, res: Response) => {
    const bodyResult = updateCategorySchema.safeParse(req.body);
    if (!bodyResult.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` })
    }
    try {
        const { id } = req.params;
        const { name, image_url } = bodyResult.data;

        const [categoryResult]: any = await db.query(
            `
            SELECT id FROM categories WHERE id = ?
            `,
            [id]
        );
        if (categoryResult.length === 0) {
            return res.status(404).json({ success: false, message: `該類別不存在` });
        }

        const [updateResult]: any = await db.query(
            `
            UPDATE categories 
            SET
                name = COALESCE(?, name),
                image_url = COALESCE(?, image_url)
            WHERE id = ?
            `,
            [name ?? null, image_url ?? null, id]
        );
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `更新類別失敗` });
        }

        const [newResult]: any = await db.query(
            `
            SELECT * FROM categories WHERE id = ?
            `,
            [id]
        );
        res.status(200).json({ success: true, message: `更新類別成功`, data: newResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}

export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [categoryResult]: any = await db.query(
            `
            SELECT 
                id  
            FROM categories
            WHERE id = ?
            `,
            [id]
        );
        if (categoryResult.length === 0) {
            return res.status(400).json({ success: false, message: `該類別不存在` });
        }

        const [deleteResult]: any = await db.query(
            `
            DELETE FROM categories WHERE id = ?
            `,
            [id]
        );
        if (deleteResult.affectedRows === 0) {
            return res.status(400).json({ success: false, message: `刪除類別失敗` });
        }

        res.status(200).json({ success: true, message: `刪除類別成功` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
}
