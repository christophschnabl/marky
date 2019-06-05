const markdown = require('../modules/markdown.js')
const express = require('express'),
      router = express.Router();



router.get('/render', function(req, res) {
  res.send(markdown.Render('# hustensaft'));
});

module.exports = router;
