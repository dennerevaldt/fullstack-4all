import { differenceInMinutes } from 'date-fns';

import BankTransfer from '../../models/BankTransfer';
import BankAccount from '../../models/BankAccount';

import StatusError from '../../../errors/status';

class CreateTransferenceRulesService {
  async isDidSameTransferenceLessThanTwoMinutes({
    id,
    userId,
    value,
    transaction,
  }) {
    try {
      const checkTransference = await BankTransfer.findOne({
        where: {
          value,
          benefited_id: id,
          user_id: userId,
          status: 'success',
        },
      });

      if (
        checkTransference &&
        differenceInMinutes(new Date(), checkTransference.get('created_at')) <=
          2
      ) {
        await checkTransference.update(
          {
            status: 'cancelled',
          },
          {
            transaction,
          }
        );

        await BankTransfer.create(
          {
            value,
            benefited_id: id,
            user_id: userId,
          },
          {
            transaction,
          }
        );

        return true;
      }

      return false;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new StatusError(400, error.message);
    }
  }

  async doTransferenceBetweenUsers({ id, userId, value, transaction }) {
    try {
      let useLimit = false;

      const accountFrom = await BankAccount.findOne({
        where: {
          user_id: userId,
        },
      });

      const accountTo = await BankAccount.findOne({
        where: {
          user_id: id,
        },
      });

      if (accountFrom.get('balance') < value) {
        const availableValueWithLimit =
          accountFrom.get('balance') + accountFrom.get('limit');

        if (availableValueWithLimit < value) {
          return {
            transferred: false,
            message: 'transference.insufficientBalance',
          };
        }

        useLimit = true;
      }

      await BankTransfer.create(
        {
          value,
          benefited_id: id,
          user_id: userId,
        },
        {
          transaction,
        }
      );

      const accountUpdate = {};

      if (useLimit) {
        const excedent = value - accountFrom.get('balance');
        const newLimit = accountFrom.get('limit') - excedent;
        accountUpdate.limit = newLimit;
      }

      accountUpdate.balance = useLimit ? 0 : accountFrom.get('balance') - value;

      await accountFrom.update(accountUpdate, {
        transaction,
      });

      await accountTo.update(
        {
          balance: accountTo.get('balance') + value,
        },
        {
          transaction,
        }
      );

      return {
        transferred: true,
        message: useLimit
          ? 'transference.useLimit'
          : 'transference.success',
      };
    } catch (error) {
      console.log('err', error);
      if (transaction) await transaction.rollback();
      throw new StatusError(400, error.message);
    }
  }
}

export default new CreateTransferenceRulesService();
