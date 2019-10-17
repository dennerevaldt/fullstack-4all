import { Op } from 'sequelize';

import Benefited from '../../models/Benefited';
import User from '../../models/User';

class ListBenefitedService {
  async run({ userId }) {
    const benefited = await Benefited.findAll({
      where: {
        user_id: userId,
        active: true,
      },
    });

    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: benefited.map(b => b.get('benefited_id')),
        },
      },
    });

    return users;
  }
}

export default new ListBenefitedService();
