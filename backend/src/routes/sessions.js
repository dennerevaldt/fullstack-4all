import express from 'express';

import SessionController from '../app/controllers/SessionController';
import schemaValidator from '../app/middlewares/schema-validator';
import sessionValidator from '../app/validators/session';

const router = express.Router();

router.post(
  '/',
  schemaValidator(sessionValidator.store),
  SessionController.store
);

export default router;
