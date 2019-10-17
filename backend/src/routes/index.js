import express from 'express';

import sessions from './sessions';
import users from './users';
import benefited from './benefited';
import balances from './balances';
import transferences from './transferences';
import bankStatements from './bank-statements';

const router = express.Router();

router.use('/sessions', sessions);
router.use('/users', users);
router.use('/benefited', benefited);
router.use('/balances', balances);
router.use('/transferences', transferences);
router.use('/bank-statements', bankStatements);

export default router;
