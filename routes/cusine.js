const router = require('koa-router')()

const model = require('../model'),
  Cusine = model.Cusine,
  User = model.User

router.post('/add', function * () {
  let data = this.request.body
  data.tag = JSON.parse((data.tag === '') ? '[]' : data.tag)
  data.material = JSON.parse((data.material === '') ? '[]' : data.material)
  data.steps = JSON.parse((data.steps === '') ? '[]' : data.steps)

  yield Cusine.create(data)

  this.redirect('/management')
})

router.post('/edit', function * () {
  let data = this.request.body,
    idNumber = data.idNumber
  data.tag = JSON.parse((data.tag === '') ? '[]' : data.tag)
  data.material = JSON.parse((data.material === '') ? '[]' : data.material)
  data.steps = JSON.parse((data.steps === '') ? '[]' : data.steps)

  console.log(data)

  yield Cusine.updateById(idNumber, data)

  this.redirect('/management')
})

router.get('/star', function * () {
  this.response.body = yield User.starCusine(this.query.userId, this.query.id)
})

router.post('/delete', function * () {
  yield Cusine.delete(this.request.body.cusineId)

  this.redirect('/management')
})

module.exports = router