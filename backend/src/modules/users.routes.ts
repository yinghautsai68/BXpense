import express from 'express';
import { createUser, getUserById, getUsers, updateUser, deleteUserById, resetUserData, getMyProfile } from './users/users.controller';
import { protect } from '../middleware/authenticate';

const usersRouter = express.Router();

usersRouter.post('/', protect, createUser);
usersRouter.get('/', protect, getUsers);
usersRouter.get('/me', protect, getMyProfile);
usersRouter.delete('/me/data', protect, resetUserData);
usersRouter.get('/:id', protect, getUserById);
usersRouter.patch('/:id', protect, updateUser);
usersRouter.delete('/:id', protect, deleteUserById);

export default usersRouter;