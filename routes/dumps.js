var express = require('express');
var ObjectID = require('mongodb').ObjectID
var router = express.Router();

router.get('/:username', function (req, res, next) {
  var db = require('../app.js').db
  const usernameRegex = new RegExp(req.params.username, 'i')
  db.collection('dumps').findOne({ "userDetails.name": usernameRegex })
    .then((data) => { //note in the promise, err is not the first argument. You need to catch it
      res.send(data)
    })
    .catch((err) => {
      console.err(err)
      res.status(500)
      res.send(err)
    })
});

router.post('/:username', function (req, res, next) {
  var db = require('../app.js').db
  delete req.body._id
  const usernameRegex = new RegExp(req.params.username, 'i')
  db.collection('dumps').findOneAndReplace({ "userDetails.name": usernameRegex }, req.body, { upsert: true })
    .then(
    (data) => {
      console.log("data")
      res.send(data)
    }
    )
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.send(err)
    })
})

module.exports = router