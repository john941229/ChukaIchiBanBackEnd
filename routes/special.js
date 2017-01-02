const router = require('koa-router')()

const model = require('../model'),
  Special = model.Special

router.get('/add', function * () {
  this.response.body = yield Special.create({
    "sid": 101,
    "name": "冬日暖心餐",
    "item": [{
      "itemname": "养生暖身粥",
      "descripe": "古人云：“粥饮为世间第一补人之物”。冬天来了，天气也开始变冷，这时你的肠胃更需温软保护。而喝粥就是很不错的养生之道。冬季饮食，切记贪吃辛辣油腻食品，因为肠胃很难从夏秋的清淡适应过来，并且建议能多喝粥，润养肺燥，是冬季养生的绝佳选择。下面为您推荐一些冬季养生粥品。",
      "list": [301681, 299401, 297373]
    },{
      "itemname": "养生暖身粥",
      "descripe": "古人云：“粥饮为世间第一补人之物”。冬天来了，天气也开始变冷，这时你的肠胃更需温软保护。而喝粥就是很不错的养生之道。冬季饮食，切记贪吃辛辣油腻食品，因为肠胃很难从夏秋的清淡适应过来，并且建议能多喝粥，润养肺燥，是冬季养生的绝佳选择。下面为您推荐一些冬季养生粥品。",
      "list": [301681, 299401, 297373]
    }]
  })
})

module.exports = router