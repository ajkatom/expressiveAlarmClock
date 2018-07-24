const router = require('express').Router();
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
module.exports = router;
