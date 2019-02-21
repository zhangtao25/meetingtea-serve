var express = require('express');
// var jwt = require('jsonwebtoken');
var router = express.Router();

// Import mongodb dependency
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
// const url = 'mongodb://101.132.46.146:27017';
// const dbName = 'meetingtea1';

router.post('/', (req, res, next) => {
  console.log(req.body)
});


module.exports = router;
