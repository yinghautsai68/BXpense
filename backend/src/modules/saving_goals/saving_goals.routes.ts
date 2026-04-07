import express from "express";
import { createSavingGoal, deleteSavingGoalById, getSavingGoalById, getSavingGoals, updateSavingGoalById } from "./saving_goals.controller";
import { addRecordToSavingGoal, deleteSavingGoalRecordById, getSavingGoalRecordById, getSavingGoalRecords, updateSavingGoalRecordById } from "./saving_goal_records.controller";

const savingGoalsRouter = express.Router();

// saving_goals
savingGoalsRouter.post('/', createSavingGoal);
savingGoalsRouter.get('/', getSavingGoals);

// saving_goal_records
savingGoalsRouter.get('/records/:id', getSavingGoalRecordById);
savingGoalsRouter.patch('/records/:id', updateSavingGoalRecordById);
savingGoalsRouter.delete('/records/:id', deleteSavingGoalRecordById);

// saving_goals
savingGoalsRouter.get('/:id', getSavingGoalById);
savingGoalsRouter.patch('/:id', updateSavingGoalById);
savingGoalsRouter.delete('/:id', deleteSavingGoalById);

// saving_goal_records
savingGoalsRouter.post('/:id/records', addRecordToSavingGoal);
savingGoalsRouter.get('/:id/records', getSavingGoalRecords);

export default savingGoalsRouter;