import User from '../../models/User';
import Benefited from '../../models/Benefited';
import BankAccount from '../../models/BankAccount';

import db from '../../../database';

import StatusError from '../../../errors/status';

class DeleteUserService {
  async run({ userId }) {
    let transaction;

    try {
      transaction = await db.connection.transaction();

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      await user.update(
        {
          active: false,
        },
        {
          transaction,
        }
      );

      await Benefited.update(
        {
          active: false,
        },
        {
          where: {
            user_id: userId,
          },
          transaction,
        }
      );

      await BankAccount.update(
        {
          active: false,
        },
        {
          where: {
            user_id: userId,
          },
          transaction,
        }
      );

      await transaction.commit();

      return user;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new StatusError(400, error.message);
    }
  }
}

export default new DeleteUserService();
