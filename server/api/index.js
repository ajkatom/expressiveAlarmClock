const router = require('express').Router();
const db = require('../db');
const { Alarm } = db.model;
const axios = require('axios');

db.sync();
router.get('/weather', (req, res, next) => {
  axios
    .get(
      `https://api.darksky.net/forecast/1582d970b85e6f04314af7c756a588d4/${
        req.query.lat
      },${req.query.long}`
    )
    .then(res => res.data)
    .then(weather => res.send(weather))
    .catch(next);
});
router.get('/setAlarm', (req, res, next) => {
  Alarm.findOrCreate({
    where: { time: req.query.time },
    defaults: { on: req.query.on }
  })
    .spread(alarm => {
      res.send({ alarm, isNew: alarm._options.isNewRecord });
    })
    .catch(next);
});
router.get('/allAlarms', (req, res, next) => {
  Alarm.findAll().then(alarms => res.send(alarms));
});

router.put('/editAlarm', (req, res, next) => {
  Alarm.findById(req.body.alarm.id)
    .then(alarm => {
      Object.assign(alarm, req.body.alarm);
      return alarm.save();
    })
    .then(alarm => res.sendStatus(200))
    .catch(next);
});

router.delete('/deleteAlarm', (req, res, next) => {
  const id = req.query.id;
  Alarm.findById(id)
    .then(alarm => alarm.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
