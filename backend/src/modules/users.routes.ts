import express from 'express';
import { createUser, getUserById, getUsers, updateUser, deleteUserById, resetUserData } from './users/users.controller';
import { protect } from '../middleware/authenticate';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.delete('/me/data', protect, resetUserData);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;