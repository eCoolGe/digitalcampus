const express = require('express');
const router = express.Router();

// Подключение к базе данных
Object.defineProperty(exports, '__esModule', { value: true });
const utils = require('../db/utils');
const snippet = require('../db/snippet');
// const utils = require('../!test/utils');
// const snippet = require('../!test/snippet');
utils.main(snippet.run, snippet.options);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express12' });
});

module.exports = router;
