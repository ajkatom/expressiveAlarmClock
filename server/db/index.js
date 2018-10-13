const Alarm = require('./Alarm');
const db = require('./conn');

const sync = () => db.sync();

module.exports = {
  sync,
  model: {
    Alarm
  }
};
