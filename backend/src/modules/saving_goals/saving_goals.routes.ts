import express from "express";
import { createSavingGoal, deleteSavingGoalById, getSavingGoalById, getSavingGoals, updateSavingGoalById } from "./saving_goals.controller";

const savingGoalsRouter = express.Router();

savingGoalsRouter.post('/', createSavingGoal);
savingGoalsRouter.get('/', getSavingGoals);
savingGoalsRouter.get('/:id', getSavingGoalById);
savingGoalsRouter.patch('/:id', updateSavingGoalById);
savingGoalsRouter.delete('/:id', deleteSavingGoalById);
export default savingGoalsRouter;