import express from 'express';
import { createRecord, deleteRecordById, getRecords, getRecordsById, updateRecordById } from './records.controller';

const recordsRouter = express.Router();

recordsRouter.post('/', createRecord);
recordsRouter.get('/', getRecords);
recordsRouter.get('/:id', getRecordsById);
recordsRouter.patch('/:id', updateRecordById);
recordsRouter.delete('/:id', deleteRecordById)
export default recordsRouter;