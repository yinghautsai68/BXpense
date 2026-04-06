import express from 'express';
import { createAccount, getAccounts, getAccountsById, updateAccountById, deleteAccountById } from './accounts.controller';

const accountsRouter = express.Router();

accountsRouter.post('/', createAccount);
accountsRouter.get('/', getAccounts);
accountsRouter.get('/:id', getAccountsById);
accountsRouter.patch('/:id', updateAccountById);
accountsRouter.delete('/:id', deleteAccountById);

export default accountsRouter;