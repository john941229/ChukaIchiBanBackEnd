const CusineModel = require('./model').cusine

var Cusine = exports

Cusine.create = function * (data) {
  let info = yield CusineModel.create(data).then(() => {
    return true
  }).catch((err) => {
    console.log(err)
    return false
  })
  return info
}

Cusine.find = function * (query, options) {
  options = (options === undefined) ? '' : options
  let info = yield CusineModel.find(query, options).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return false
  })
  return info
}

Cusine.findAll = function * () {
  let info = yield this.find({}, '-_id -__v -steps')
  return info
}

Cusine.findByTag = function * (tag) {
  let info = yield this.find({ 'tag': tag }, '-_id -__v -steps')
  return info
}

Cusine.findByName = function * (name) {
  let info = yield this.find({ 'name': new RegExp(`\w*${name}\w*`) })
  return info
}

Cusine.findStepsById = function * (id) {
  let info = yield this.find({ 'idNumber': id }, 'steps -_id')
  return info
}

Cusine.update = function * (query, data) {
  let info = yield CusineModel.findOneAndUpdate(query, data).then(() => {
    return true
  }).catch((err) => {
    // console.log(err)
    return false
  })
  return info
}

Cusine.updateById = function * (id, data) {
  let info = yield this.update({idNumber: id}, data)
  return info
}