var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

// Import mongodb dependency
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://101.132.46.146:27017';
const dbName = 'meetingtea2';

router.get('/avatars', function(req, res, next) {
  let user_phone = JSON.parse(req.headers.authorization).phoneNumber;

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('User');

    collection.find({"user_phone":user_phone}).toArray((err,docs)=>{
      res.send({
        user_avatar:docs[0].user_avatar
      })
    })
  });
});

router.get('/avatars/upload', function(req, res, next) {
  let user_avatar = req.query.user_avatar;
  let user_phone = JSON.parse(req.headers.authorization).user_phone;

  console.log(typeof user_avatar)

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('User');

    let whereStr = {"user_phone":user_phone};
    let updateStr = {
      $set: {
        "user_avatar": user_avatar
      }
    };

    collection.updateOne(whereStr, updateStr, (err, result) => {
      res.send({msg:'更新成功！'})
    });
  });
});

router.get('/basic', function(req, res, next) {
  let user_phone = JSON.parse(req.headers.authorization).user_phone
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('User');
    collection.find({"user_phone":user_phone}).toArray((err, docs)=>{
      res.send(docs[0])
    })
  });
});

router.post('/update', function(req, res, next) {
  let reqForm = req.body;
  let user_phone = JSON.parse(req.headers.authorization).user_phone

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('User');

    let whereStr = {'user_phone': user_phone};
    let updateStr = {
      $set: {
        'user_nikename':reqForm.user_nikename,
        'user_address':reqForm.user_address,
        'user_email': reqForm.user_email,
        'user_sex': reqForm.user_sex,
        'user_introduce': reqForm.user_introduce,
        'user_birthday': reqForm.user_birthday
      }
    };

    collection.updateOne(whereStr, updateStr, (err, result) => {
      res.send({msg:'更新成功！'})
    });
  });
});

module.exports = router;
