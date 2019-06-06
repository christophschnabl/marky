const markdown = require('../modules/markdown.js')
const express = require('express'),
      router = express.Router();

const BADREQUEST = {
  StatusCode: 400,
  Message: '400 - Bad Request'
};

router.get('/render', function(req, res) {
  if(req.body.text != undefined){
      res.send(markdown.Render(req.body.text));
  }else{
    res.status(BADREQUEST.StatusCode);
    res.send(BADREQUEST);
  }
});

module.exports = router;
