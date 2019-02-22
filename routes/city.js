var express = require('express');
var router = express.Router();
var request = require('request')

router.get('/getAll', function(req, res, next) {
  request('https://www.zcool.com.cn/city/getAll', function (error, response, body) {
    res.send(response.body)
  });

});

module.exports = router;
