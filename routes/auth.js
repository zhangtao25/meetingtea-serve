var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// Import mongodb dependency
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://101.132.46.146:27017';
const dbName = 'meetingtea';

router.post('/', (req, res, next) => {
  console.log(req.body.phoneNumber)
  let phoneNumber = req.body.phoneNumber
  let password = req.body.password

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('user');
    collection.find({'phoneNumber':phoneNumber}).toArray((err,docs)=>{
      if (docs.length == 1){ //检验是否存在用户
        console.log(docs[0].password)
        if (docs[0].password == password){ //检验手机号、密码
          let token = jwt.sign(docs[0], phoneNumber, { expiresIn: 60*60*24 })
          res.send({userInfo:docs[0],token})
        } else {
          res.send({'err':'密码错误'})
        }
      }else {
        res.send({'err':'手机号不存在'})
      }
    })
  });
});


module.exports = router;
