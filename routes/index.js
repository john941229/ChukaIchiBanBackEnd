const router = require('koa-router')()

const txtData = require('../model/txtData'),
  model = require('../model'),
  cusine = model.Cusine,
  Special = model.Special,
  User = model.User

router.get('/', function * () {
  yield txtData()
  this.response.body = 'Hello'
});

router.get('/tag', function * () {
  let data = yield cusine.findByTag(this.request.query.tag)
  this.response.body = { results: data }
})

router.get('/sp', function * () {
  // this.response.body = {
  //   "sid": 101,
  //   "name": "冬日暖心餐",
  //   "item": [
  //     {
  //       "itemname": "养生暖身粥",
  //       "descripe": "古人云：“粥饮为世间第一补人之物”。冬天来了，天气也开始变冷，这时你的肠胃更需温软保护。而喝粥就是很不错的养生之道。冬季饮食，切记贪吃辛辣油腻食品，因为肠胃很难从夏秋的清淡适应过来，并且建议能多喝粥，润养肺燥，是冬季养生的绝佳选择。下面为您推荐一些冬季养生粥品。",
  //       "list": [
  //         {
  //           "id": 301681,
  //           "name": "核桃山药南瓜粥",
  //           "imageUrl": "http://i3.meishichina.com/attachment/recipe/2016/11/28/2016112814802632676379179877.jpg@!p800",
  //           "material": [
  //             "山药泥:80g",
  //             "南瓜泥:350g",
  //             "核桃:15g"
  //           ]
  //         }, {
  //           "id": 299401,
  //           "name": "三文鱼片粥",
  //           "imageUrl": "http://i3.meishichina.com/attachment/recipe/2016/11/16/2016111614792786977049749826.jpg@!p800",
  //           "material": [
  //             "米",
  //             "三文鱼",
  //             "胡萝卜",
  //             "香菇",
  //             "油",
  //             "盐"
  //           ]
  //         }, {
  //           "id": 297373,
  //           "name": "红糖紫薯汤圆糯米粥",
  //           "imageUrl": "http://i3.meishichina.com/attachment/recipe/2016/11/06/2016110614784082017626477378.JPG@!p800",
  //           "material": [
  //             "紫薯",
  //             "糯米饭",
  //             "生粉",
  //             "糯米",
  //             "熟花生米",
  //             "红糖",
  //             "白糖"
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
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
  console.log(data)

  yield this.render('management', { cusines: data })
})

module.exports = router;
