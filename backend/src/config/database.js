require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'mysql',
  dialectOptions: {
    decimalNumbers: true
  },
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : null,
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
