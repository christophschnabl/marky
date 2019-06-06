const { Render } = require('../modules/markdown.js');
const { Verify } = require('../modules/googleauth.js');
const { User } = require('../models/user.js');
const express = require('express'),
      router = express.Router();

const BADREQUEST = {
  StatusCode: 400,
  Message: '400 - Bad Request'
};

router.get('/render', function(req, res) {
  if(req.body.text != undefined){
      res.send(Render(req.body.text));
  }else{
    res.status(BADREQUEST.StatusCode);
    res.send(BADREQUEST);
  }
});

router.post('/users', function(req, res) {
  if(req.body !== undefined){
    Verify(req.body.id_token).catch(console.err); //TODO: Do something when id is bs
    const query = {};
    const update = {
      id_token: req.body.id_token,
      name: req.body.name,
      email: req.body.email,
      imageUrl: req.body.imageUrl
    };

    const options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };

    User.findOneAndUpdate(query, update, options, function(error, doc) {
        if (error) res.send(error); //TODO: Better error handling
        res.send(doc);
    });
  }else{
    res.status(BADREQUEST.StatusCode);
    res.send(BADREQUEST);
  }
})

module.exports = router;
