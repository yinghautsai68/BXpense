import express from 'express';
import { createRecord, deleteRecordById, getMonthlySummary, getMyGroupedRecords, getMyRecords, getRecords, getRecordsById, getSummary, updateRecordById } from './records.controller';
import { protect } from '../../middleware/authenticate';

const recordsRouter = express.Router();

recordsRouter.post('/', protect, createRecord);
recordsRouter.get('/', protect, getRecords);
recordsRouter.get('/me', protect, getMyRecords);
recordsRouter.get('/me/grouped', protect, getMyGroupedRecords);
recordsRouter.get('/summary', protect, getSummary);
recordsRouter.get('/monthly-summary', protect, getMonthlySummary);
recordsRouter.get('/:id', protect, getRecordsById);
recordsRouter.patch('/:id', protect, updateRecordById);
recordsRouter.delete('/:id', protect, deleteRecordById);
export default recordsRouter;