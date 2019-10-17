import User from '../../models/User';
import BankAccount from '../../models/BankAccount';

import db from '../../../database';

import StatusError from '../../../errors/status';

class CreateUserService {
  async run({ name, cpf, phone }) {
    let transaction;

    try {
      transaction = await db.connection.transaction();

      const user = await User.create(
        {
          name,
          cpf,
          phone,
        },
        {
          transaction,
        }
      );

      await BankAccount.create(
        {
          balance: 1000,
          limit: 500,
          available_limit: 500,
          user_id: user.id,
        },
        {
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

export default new CreateUserService();
