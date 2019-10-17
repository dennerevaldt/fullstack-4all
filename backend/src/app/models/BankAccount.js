import Sequelize, { Model } from 'sequelize';

class BankAccount extends Model {
  static init(sequelize) {
    super.init(
      {
        identifier: Sequelize.STRING(20),
        balance: Sequelize.DECIMAL(10,2),
        limit: Sequelize.DECIMAL(10,2),
        available_limit: Sequelize.DECIMAL(10,2),
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', bank_account => {
      bank_account.identifier = +new Date();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'bank_account',
    });
  }
}

export default BankAccount;
