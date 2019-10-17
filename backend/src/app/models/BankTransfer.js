import Sequelize, { Model } from 'sequelize';

class BankTransfer extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DECIMAL(10,2),
        status: {
          type: Sequelize.ENUM('success', 'cancelled'),
          defaultValue: 'success',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'benefited_id',
      as: 'to_user',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'from_user',
    });
  }
}

export default BankTransfer;
