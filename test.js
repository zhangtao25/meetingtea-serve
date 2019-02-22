// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'

MongoClient.connect(url, (err, client) => {
  const db = client.db(dbName);
  const collection = db.collection('user');
  collection.insertMany([{
    username: 'zhangtao25',
    password:'123456',
    phoneNumber: '18158899797',
    email: '18158899797@163.com',
    sex: 0,
    hometown: null,
    nowLiving: null,
    signature: ''
  },
    {
      username: 'gyz01',
      password:'123456',
      phoneNumber: '19956543767',
      email: '19956543767@163.com',
      sex: 1,
      hometown: null,
      nowLiving: null,
      signature: ''
    }], (err, result) => {
    console.log(111)
  })
});
