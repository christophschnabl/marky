const markdown = require('../modules/markdown.js')
const express = require('express'),
      router = express.Router();

const BADREQUEST = 400;

router.get('/render', function(req, res) {
  if(req.body.text != undefined){
      res.send(markdown.Render(req.body.text));
  }else{
    res.status(BADREQUEST);
    res.send("400 - Bad request");
  }
});

module.exports = router;
