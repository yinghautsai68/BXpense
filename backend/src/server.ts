import express from 'express';
import cors from 'cors';
import { db } from './config/db';

const app = express();
app.use(express.json());
app.use(cors());

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