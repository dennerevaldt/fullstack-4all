import User from '../models/User';

import StatusError from '../../errors/status';

export default async (req, res, next) => {
  const { userId } = req;

  const user = await User.findOne({
    where: {
      id: userId,
      active: true,
    },
  });

  if (!user) {
    const error = new StatusError(400, res.__('middleware.userNotFound'));
    return next(error);
  }

  return next();
};
