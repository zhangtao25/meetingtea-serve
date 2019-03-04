// Import mongodb dependency
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://101.132.46.146:27017';
const dbName = 'meetingtea2';

MongoClient.connect(url, (err, client) => {
  let user = {
    "user_id": "682b6050-3bea-11e9-9690-4f8a5c28b2f3",
    "user_phone": "18158899797",
    "user_email": "18158899797@163.com",
    "user_password": "123456",
    "user_nikename": "zhangtao",
    "user_avatar":"",
    "user_truename":"张涛",
    "user_address":"上海",
    "user_sex":"男",
    "user_birthday":"10.24",
    "user_intro":"我是个帅哥",
    "user_profession":"学生",
    "user_fans":[],
    "user_follow":[],
    "user_collect":[],
    "user_like":[],
    "create_time": "1551421644476"
  }
  const db = client.db(dbName);
  const collection = db.collection('User');
  collection.insertMany([user],function () {

  })
});
