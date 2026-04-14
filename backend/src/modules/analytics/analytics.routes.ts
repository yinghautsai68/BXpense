import express from 'express';
import { getCategorySummary, getLineChartSummaryExpense } from './analytics.controller';
import { protect } from '../../middleware/authenticate';

const analyticsRouter = express.Router();

analyticsRouter.get('/line', protect, getLineChartSummaryExpense);
analyticsRouter.get('/', protect, getCategorySummary);

export default analyticsRouter;