const conn = require('./conn');
const { Sequelize } = conn;

const Alarm = conn.define('alarm', {
  time: {
    type: Sequelize.STRING
  },
  on: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Alarm;
