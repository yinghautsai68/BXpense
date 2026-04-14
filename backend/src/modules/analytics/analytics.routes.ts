import express from 'express';
import { getCategorySummary } from './analytics.controller';
import { protect } from '../../middleware/authenticate';

const analyticsRouter = express.Router();

analyticsRouter.get('/', protect, getCategorySummary);

export default analyticsRouter;