const router = require('koa-router')();
const model = require('../model'),
  User = model.User

router.get('/', function * (next) {
  this.body = 'this a users response!';
});

router.post('/signup', function * () {
  console.log(this.request.body)
  this.response.body = yield User.create(this.request.body)
})

router.post('/login', function * () {
  let userInfo = yield User.login(this.request.body)
  this.response.body = !!userInfo.length ? `${userInfo[0]._id},${userInfo[0].username}` :''
})

module.exports = router;
