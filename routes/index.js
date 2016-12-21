const router = require('koa-router')();
const txtData = require('../model/txtData'),
  model = require('../model')

router.get('/', function * () {
  yield txtData()
  this.response.body = 'Hello'
});

router.get('/tag', function * () {
  this.response.body = yield model.findByTag(this.request.query.tag)
})

module.exports = router;
