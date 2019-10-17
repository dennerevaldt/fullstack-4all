import express from 'express';

import BenefitedController from '../app/controllers/BenefitedController';

import schemaValidator from '../app/middlewares/schema-validator';
import uniqueCpf from '../app/middlewares/unique-cpf';
import auth from '../app/middlewares/auth';
import isUserValid from '../app/middlewares/is-user-valid';
import isBenefited from '../app/middlewares/is-benefited';

import UserValidator from '../app/validators/user';

const router = express.Router();

router.use(auth, isUserValid);

router.get('/', BenefitedController.index);
router.post(
  '/',
  schemaValidator(UserValidator.store),
  uniqueCpf,
  BenefitedController.store
);
router.put(
  '/:id',
  isBenefited,
  schemaValidator(UserValidator.update),
  BenefitedController.update
);
router.delete('/:id', isBenefited, BenefitedController.delete);

export default router;
