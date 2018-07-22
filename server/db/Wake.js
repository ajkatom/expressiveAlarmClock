const conn = require('./conn');
const { Sequelize } = conn;

const Awake = conn.define('awake', {
  time: {
    type: Sequelize.STRING
  },
  on: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Awake;
