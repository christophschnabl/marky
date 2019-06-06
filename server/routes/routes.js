const markdown = require('../modules/markdown.js');
const { Verify } = require('../modules/googleauth.js');
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

router.post('/verifyid', function(req, res) {
  if(req.body.id_token != undefined){
    Verify(req.body.id_token).catch(console.err);
    res.send("verified");
  }else{
    res.status(BADREQUEST.StatusCode);
    res.send(BADREQUEST);
  }
})

module.exports = router;
