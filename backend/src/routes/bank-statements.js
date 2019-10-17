import express from 'express';

import BankStatementController from '../app/controllers/BankStatementController';

import auth from '../app/middlewares/auth';
import isUserValid from '../app/middlewares/is-user-valid';

const router = express.Router();

router.get('/', auth, isUserValid, BankStatementController.index);

export default router;
