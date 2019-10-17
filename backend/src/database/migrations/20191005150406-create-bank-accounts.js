module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bank_accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      identifier: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      balance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
      },
      limit: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
      },
      available_limit: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('bank_accounts');
  },
};
