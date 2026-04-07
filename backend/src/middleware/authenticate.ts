import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../config/env";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({ success: false, message: `沒有提供headers: Authorization` });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: `沒有提供token` });
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        (req as any).user = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: `token有誤` });
    }
}