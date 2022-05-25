const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Подсистема хранения цифрового кампуса ЮРГПУ(НПИ)' });
});

module.exports = router;
