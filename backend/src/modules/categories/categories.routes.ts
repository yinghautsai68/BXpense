import express from 'express';
import { createCategory, getCategories, getCategoriesById, updateCategoryById, deleteCategoryById } from './categories.controller';
import { protect } from '../../middleware/authenticate';

const categoriesRouter = express.Router();

categoriesRouter.post('/', protect, createCategory);
categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getCategoriesById);
categoriesRouter.patch('/:id', updateCategoryById);
categoriesRouter.delete('/:id', deleteCategoryById);

export default categoriesRouter;