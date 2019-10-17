import express from 'express';

import BalanceController from '../app/controllers/BalanceController';

import auth from '../app/middlewares/auth';
import isUserValid from '../app/middlewares/is-user-valid';

const router = express.Router();

router.get('/', auth, isUserValid, BalanceController.index);

export default router;
