const router = require('koa-router')()

const model = require('../model'),
  cusine = model.Cusine,
  User = model.User

router.post('/add', function * () {
  let data = this.request.body
  data.tag = JSON.parse(data.tag || '[]')
  data.material = JSON.parse(data.material || '[]')
  data.steps = JSON.parse(data.steps || '[]')

  this.response.body = yield cusine.create(data)
})

router.post('/edit', function * () {
  let data = this.request.body
  data.tag = JSON.parse(data.tag || '[]')
  data.material = JSON.parse(data.material || '[]')
  data.steps = JSON.parse(data.steps || '[]')

  this.response.body = yield cusine.updateById(data.idNumber, data)
})

router.get('/star', function * () {
  this.response.body = yield User.starCusine(this.query.userId, this.query.cusineId)
})

module.exports = router