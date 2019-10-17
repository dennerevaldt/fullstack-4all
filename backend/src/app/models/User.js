import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(200),
        cpf: Sequelize.STRING(11),
        phone: Sequelize.STRING(15),
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.BankAccount, {
      foreignKey: 'id',
      as: 'bank_account',
    });

    this.hasMany(models.Benefited, {
      foreignKey: 'benefited_id',
      as: 'user_benefited',
    });

    this.hasMany(models.Benefited, {
      foreignKey: 'user_id',
      as: 'user_holder',
    });

    this.hasMany(models.BankTransfer, {
      foreignKey: 'benefited_id',
      as: 'to_user',
    });

    this.hasMany(models.BankTransfer, {
      foreignKey: 'user_id',
      as: 'from_user',
    });
  }
}

export default User;
