import express from 'express';

import TransferenceController from '../app/controllers/TransferenceController';

import auth from '../app/middlewares/auth';
import isUserValid from '../app/middlewares/is-user-valid';
import isBenefited from '../app/middlewares/is-benefited';
import schemaValidator from '../app/middlewares/schema-validator';
import transferenceValidator from '../app/validators/transference';

const router = express.Router();

router.post(
  '/:id',
  auth,
  isUserValid,
  isBenefited,
  schemaValidator(transferenceValidator.store),
  TransferenceController.store
);

export default router;
