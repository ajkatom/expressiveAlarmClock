const router = require('express').Router();
const db = require('../db');
const { Alarm } = db.model;
const axios = require('axios');
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
  // Alram.findOrCreateCart(time:req.query.time)
  //   .spread(alarm => res.send(cart))
  console.log(req.query.time, 'ok');
  res.send('ok');
  //.catch(next);
});
module.exports = router;
