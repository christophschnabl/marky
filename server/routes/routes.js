const markdown = require('../modules/markdown.js')
const express = require('express'),
      router = express.Router();



router.get('/render', function(req, res) {
  console.log(req.body);
  res.send(markdown.Render('# hustensaft'));
});

module.exports = router;
