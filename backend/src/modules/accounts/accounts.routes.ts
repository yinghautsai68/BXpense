import express from 'express';
import { createAccount, getAccounts, getAccountsById, updateAccountById, deleteAccountById, getTotalAssets, getMyAccounts } from './accounts.controller';
import { protect } from '../../middleware/authenticate';

const accountsRouter = express.Router();

accountsRouter.post('/', protect, createAccount);
accountsRouter.get('/', protect, getAccounts);
accountsRouter.get('/me', protect, getMyAccounts);
accountsRouter.get('/total-assets', protect, getTotalAssets);

accountsRouter.get('/:id', protect, getAccountsById);
accountsRouter.patch('/:id', protect, updateAccountById);
accountsRouter.delete('/:id', protect, deleteAccountById);


export default accountsRouter;