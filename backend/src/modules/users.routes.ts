import express from 'express';
import { createUser, getUserById, getUsers, updateUser, deleteUserById } from './users/users.controller';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUserById);

export default usersRouter;