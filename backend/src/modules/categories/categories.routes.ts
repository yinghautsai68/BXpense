import express from 'express';
import { createCategory, getCategories, getCategoriesById, updateCategoryById, deleteCategoryById, getMyCategories } from './categories.controller';
import { protect } from '../../middleware/authenticate';

const categoriesRouter = express.Router();

categoriesRouter.post('/', protect, createCategory);
categoriesRouter.get('/', protect, getCategories);
categoriesRouter.get('/me', protect, getMyCategories);
categoriesRouter.get('/:id', protect, getCategoriesById);
categoriesRouter.patch('/:id', protect, updateCategoryById);
categoriesRouter.delete('/:id', protect, deleteCategoryById);

export default categoriesRouter;