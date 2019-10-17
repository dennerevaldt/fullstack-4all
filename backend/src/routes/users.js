import express from 'express';

import UserController from '../app/controllers/UserController';

import schemaValidator from '../app/middlewares/schema-validator';
import uniqueCpf from '../app/middlewares/unique-cpf';
import auth from '../app/middlewares/auth';
import isUserValid from '../app/middlewares/is-user-valid';

import userValidator from '../app/validators/user';

const router = express.Router();

router.post(
  '/',
  schemaValidator(userValidator.store),
  uniqueCpf,
  UserController.store
);
router.put(
  '/',
  auth,
  isUserValid,
  schemaValidator(userValidator.update),
  UserController.update
);
router.delete('/', auth, isUserValid, UserController.delete);

export default router;
