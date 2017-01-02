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

router.get('/hasStared', function * () {
  console.log(this.request.query.id)
  console.log(this.request.query.userId)

  let userData = yield User.findById(this.request.query.userId || ''),
    hasStared = false
  if (userData.length) {
    let userInfo = userData[0]
    if (userInfo.star.indexOf(this.request.query.id) !== -1) {
      hasStared = true
    }
  }

  this.response.body = hasStared
})

module.exports = router;
