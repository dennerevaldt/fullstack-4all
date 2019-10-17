import Sequelize, { Model } from 'sequelize';

class Benefited extends Model {
  static init(sequelize) {
    super.init(
      {
        active: Sequelize.BOOLEAN,
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
      as: 'user_benefited',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user_holder',
    });
  }
}

export default Benefited;
