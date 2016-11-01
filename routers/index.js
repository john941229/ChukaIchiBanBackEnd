const router = require('koa-router')()

router.get('/', function *(next) {
    console.log('get /')
})

router.get('/haha', function*(next) {
    console.log('get /haha')
})

module.exports = router
