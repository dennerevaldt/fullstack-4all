import Benefited from '../models/Benefited';

import StatusError from '../../errors/status';

export default async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  const isBenefitedByUser = await Benefited.findOne({
    where: {
      benefited_id: id,
      user_id: userId,
      active: true,
    },
  });

  if (!isBenefitedByUser) {
    const error = new StatusError(400, res.__('middleware.userNotBenefited'));
    return next(error);
  }

  return next();
};
