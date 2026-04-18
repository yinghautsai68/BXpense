import express from 'express';
import { createRecord, deleteRecordById, getMonthlySummary, getMyRecords, getRecords, getRecordsById, getSummary, getTopExpenseRecords, updateRecordById } from './records.controller';
import { protect } from '../../middleware/authenticate';

const recordsRouter = express.Router();

recordsRouter.post('/', protect, createRecord);
recordsRouter.get('/', protect, getRecords);
recordsRouter.get('/me', protect, getMyRecords);
recordsRouter.get('/summary', protect, getSummary);
recordsRouter.get('/monthly-summary', protect, getMonthlySummary);
recordsRouter.get('/top-expenses', protect, getTopExpenseRecords);
recordsRouter.get('/:id', protect, getRecordsById);
recordsRouter.patch('/:id', protect, updateRecordById);
recordsRouter.delete('/:id', protect, deleteRecordById);
export default recordsRouter;