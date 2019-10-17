import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import BankAccount from '../app/models/BankAccount';
import Benefited from '../app/models/Benefited';
import BankTransfer from '../app/models/BankTransfer';

const models = [User, BankAccount, Benefited, BankTransfer];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
  }

  init() {
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
