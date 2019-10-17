import BankAccount from '../../models/BankAccount';

class ListBalanceService {
  async run({ userId }) {
    const account = await BankAccount.findOne({
      attributes: ['balance', 'limit', 'available_limit'],
      where: {
        user_id: userId,
      },
    });

    return account;
  }
}

export default new ListBalanceService();
