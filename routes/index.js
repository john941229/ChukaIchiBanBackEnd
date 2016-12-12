const router = require('koa-router')();
const textData = require('../model/txtData')
var txtData = require('../model/txtData')

router.get('/', function * (next) {
  yield txtData()
});

module.exports = router;
