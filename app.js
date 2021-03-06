var app = require('koa')(),
  koa = require('koa-router')(),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror');

const index = require('./routes/index'),
  users = require('./routes/users'),
  cusine = require('./routes/cusine'),
  special = require('./routes/special')

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
koa.use('', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());
koa.use('/cusine', cusine.routes(), cusine.allowedMethods())
koa.use('/special', special.routes(), special.allowedMethods())

// mount root routes
app.use(koa.routes());

app.on('error', function(err, ctx) {
  console.error('server error', err, ctx);
});

module.exports = app;
