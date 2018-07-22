const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/alarm',
  {
    // logging: false
  }
);

module.exports = conn;
