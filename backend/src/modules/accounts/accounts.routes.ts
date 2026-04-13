import express from 'express';
import { createAccount, getAccounts, getAccountsById, updateAccountById, deleteAccountById, getTotalAssets } from './accounts.controller';
import { protect } from '../../middleware/authenticate';

const accountsRouter = express.Router();

accountsRouter.post('/', protect, createAccount);
accountsRouter.get('/', getAccounts);
accountsRouter.get('/total-assets', protect, getTotalAssets);

accountsRouter.get('/:id', getAccountsById);
accountsRouter.patch('/:id', updateAccountById);
accountsRouter.delete('/:id', deleteAccountById);


export default accountsRouter;