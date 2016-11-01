const serve = require('koa-static');
const koa = require('koa');

const txtData = require('./model/txtData')
const router = require('./routers/index')

const app = koa();

app.use(serve(__dirname + '/public'));

app.use(router.routes()).use(router.allowedMethods());

txtData()

app.listen(3000);
