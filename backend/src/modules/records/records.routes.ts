import express from 'express';
import { createRecord, deleteRecordById, getMonthlySummary, getRecords, getRecordsById, getSummary, getTopExpenseRecords, updateRecordById } from './records.controller';
import { protect } from '../../middleware/authenticate';

const recordsRouter = express.Router();

recordsRouter.post('/', createRecord);
recordsRouter.get('/', getRecords);
recordsRouter.get('/summary', protect, getSummary);
recordsRouter.get('/monthly-summary', protect, getMonthlySummary);
recordsRouter.get('/top-expenses', protect, getTopExpenseRecords);
recordsRouter.get('/:id', getRecordsById);
recordsRouter.patch('/:id', updateRecordById);
recordsRouter.delete('/:id', deleteRecordById);
export default recordsRouter;