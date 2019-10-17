import { Op } from 'sequelize';

import User from '../../models/User';

import BankTransfer from '../../models/BankTransfer';

class ListBankStatementService {
  async run({ userId }) {
    const statements = await BankTransfer.findAll({
      include: [
        {
          model: User,
          as: 'from_user',
        },
        {
          model: User,
          as: 'to_user',
        },
      ],
      where: {
        [Op.or]: [
          {
            user_id: userId,
          },
          {
            benefited_id: userId,
          },
        ],
      },
      order: [['created_at', 'DESC']],
    });

    return statements;
  }
}

export default new ListBankStatementService();
