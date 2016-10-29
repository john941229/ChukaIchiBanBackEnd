const serve = require('koa-static');
const koa = require('koa');

const excelData = require('./model/excelData');

const app = koa();

app.use(serve(__dirname + '/public'));

excelData();

app.listen(3000);
