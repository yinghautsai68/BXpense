import express from 'express';
import cors from 'cors';
import { db } from './config/db';
import usersRouter from './modules/users.routes';
import accountsRouter from './modules/accounts/accounts.routes';
import categoriesRouter from './modules/categories/categories.routes';
import recordsRouter from './modules/records/records.routes';
import savingGoalsRouter from './modules/saving_goals/saving_goals.routes';
import authRouter from './modules/auth/auth.routes';
import uploadRouter from './modules/upload/upload.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/records', recordsRouter);
app.use('/api/saving-goals', savingGoalsRouter);

const testDbConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log("db connection successful!");
        connection.release();
    } catch (error) {
        console.log(error);
    }
}
app.listen(5000, async () => {
    console.log("Server Working!");
    await testDbConnection();
})