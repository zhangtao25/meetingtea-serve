var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// Import mongodb dependency
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://101.132.46.146:27017';
const dbName = 'meetingtea2';

router.post('/common', (req, res, next) => {
  let user_phone = req.body.user_phone;
  let user_password = req.body.user_password;

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('User');
    collection.find({"user_phone": user_phone}).toArray((err, docs) => {
      if (docs.length == 1) { //检验是否存在用户
        if (docs[0].user_password == user_password) { //检验手机号、密码

          let basic_info = {
            "user_nikename": docs[0].user_nikename,
            "user_avatar":docs[0].user_avatar,
            "user_address":docs[0].user_address,
            "user_sex":docs[0].user_sex,
            "user_birthday":docs[0].user_birthday,
            "user_introduce":docs[0].user_introduce,
            "user_profession":docs[0].user_profession
          };

          let token = jwt.sign(basic_info, user_phone, {expiresIn: 60 * 60 * 24});

          res.send({user_phone, token, basic_info})
        } else {
          res.status(401).send({
            errid: "2013",
            msg: "手机号、密码错误"
          })
        }
      } else {
        res.status(401).send({
          errid: "2013",
          msg: "手机号、密码错误"
        })
      }
    })
  });
});

router.post('/token', (req, res, next) => {
  let user_phone = req.body.user_phone;
  let token = req.body.token;
  jwt.verify(token, user_phone, function (err, decode) {
    if (err) {
      res.status(401).send({
        errid: "401",
        msg: "无效的token"
      })
    } else {
      MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        const collection = db.collection('User');
        collection.find({"user_phone": user_phone}).toArray((err, docs) => {
          res.send(docs[0])
        })

      })
    }
  })
});

module.exports = router;
