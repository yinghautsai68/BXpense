import express from 'express';
import { createCategory, getCategories, getCategoriesById, updateCategoryById, deleteCategoryById } from './categories.controller';

const categoriesRouter = express.Router();

categoriesRouter.post('/', createCategory);
categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getCategoriesById);
categoriesRouter.patch('/:id', updateCategoryById);
categoriesRouter.delete('/:id', deleteCategoryById);

export default categoriesRouter;