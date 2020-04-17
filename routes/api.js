const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({type: 'sucsess', message: 'You accessed the protected api routes'});
})

module.exports = router;