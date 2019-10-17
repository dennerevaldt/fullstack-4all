import User from '../models/User';

import StatusError from '../../errors/status';

export default async (req, res, next) => {
  const { cpf } = req.body;

  const cpfExistent = await User.findOne({
    where: {
      cpf,
    },
  });

  if (cpfExistent) {
    const error = new StatusError(400, res.__('middleware.cpfExistent'));
    return next(error);
  }

  return next();
};
