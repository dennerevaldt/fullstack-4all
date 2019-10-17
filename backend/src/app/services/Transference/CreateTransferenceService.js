import CreateTransferenceRulesService from './CreateTransferenceRulesService';

import db from '../../../database';

import StatusError from '../../../errors/status';

class CreateTransferenceService {
  async run({ userId, id, value }) {
    let transaction;

    try {
      transaction = await db.connection.transaction();

      const transferredAtLessThanTwoMinutes = await CreateTransferenceRulesService.isDidSameTransferenceLessThanTwoMinutes(
        {
          id,
          userId,
          value,
          transaction,
        }
      );

      if (transferredAtLessThanTwoMinutes) {
        await transaction.commit();

        return {
          message: 'transference.success',
        };
      }

      const transference = await CreateTransferenceRulesService.doTransferenceBetweenUsers(
        {
          id,
          userId,
          value,
          transaction,
        }
      );

      if (!transference.transferred) {
        throw new Error(transference.message);
      }

      await transaction.commit();

      return {
        message: transference.message,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new StatusError(400, error.message);
    }
  }
}

export default new CreateTransferenceService();
