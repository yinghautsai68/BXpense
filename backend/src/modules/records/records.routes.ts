import express from 'express';
import { createRecord, deleteRecordById, getMonthlySummary, getRecords, getRecordsById, updateRecordById } from './records.controller';
import { protect } from '../../middleware/authenticate';

const recordsRouter = express.Router();

recordsRouter.post('/', createRecord);
recordsRouter.get('/', getRecords);
recordsRouter.get('/monthly-summary', protect, getMonthlySummary);
recordsRouter.get('/:id', getRecordsById);
recordsRouter.patch('/:id', updateRecordById);
recordsRouter.delete('/:id', deleteRecordById);
export default recordsRouter;