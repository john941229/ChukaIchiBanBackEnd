const router = require('koa-router')();
const model = require('../model'),
  user = model.User

router.get('/', function * (next) {
  this.body = 'this a users response!';
});

router.post('/signup', function * () {
  console.log(this.request.body)
  this.response.body = yield user.create(this.request.body)
})

router.post('/login', function * () {
  this.response.body = yield user.login(this.request.body)
})

module.exports = router;
