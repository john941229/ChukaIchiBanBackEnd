const router = require('koa-router')()

const txtData = require('../model/txtData'),
  model = require('../model'),
  cusine = model.Cusine,
  Special = model.Special,
  User = model.User

router.get('/', function * () {
  // yield txtData()
  this.response.body = 'Hello'
});

router.get('/tag', function * () {
  let data = yield cusine.findByTag(this.request.query.tag)
  this.response.body = { results: data }
})

router.get('/sp', function * () {
  let specialResult = yield Special.findById(this.query.sid)
  let specialInfo = {}
  if (!!specialResult.length) {
    specialInfo = specialResult[0]
    for (i of specialInfo.item) {
      let itemArray = []
      for (id of i.list) {
        itemArray.push((yield cusine.findById(id))[0])
      }
      i.list = itemArray
    }

    console.log(i.list)
  }

  this.response.body = specialInfo
})

router.get('/id', function * () {
  let data = yield cusine.findStepsById(this.request.query.id)
  this.response.body = { steps: data[0].steps }
})

router.get('/search', function * () {
  let data = yield cusine.findByName(this.request.query.name)
  this.response.body = { results: data }
})

router.get('/all', function * () {
  let data = yield cusine.findAll()
  console.log(data)
  this.response.body = { results: data }
})

router.get('/management', function * () {
  let data = yield cusine.findAll()

  yield this.render('management', { cusines: data })
})

router.get('/collection', function * () {
  let data = yield User.collection(this.query.userId)
  this.response.body = { results: data }
})

module.exports = router;
