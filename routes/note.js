var express = require('express');
var router = express.Router();
const multer  = require('multer');

// Import mongodb dependency
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://101.132.46.146:27017';
const dbName = 'meetingtea2';

// set multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/note/18158899797/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
let upload = multer({ storage: storage });

router.get('/explorer', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload',upload.array('note',5), function(req, res, next) {
  let phoneNumber = JSON.parse(req.headers.authorization).phoneNumber;

  let files = req.files;
  let noteForm = JSON.parse(req.body.noteForm)
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('user');

    let whereStr = {phoneNumber};
    let updateStr = {
      $push: {
        note:{
          noteForm:noteForm,
          files:files
        }
      }
    };

    collection.updateOne(whereStr, updateStr, (err, result) => {
      res.send({msg:'更新成功！'})
    });
  });
});

module.exports = router;
