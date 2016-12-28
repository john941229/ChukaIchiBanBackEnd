const CusineModel = require('./model').cusine

let Cusine = exports

Cusine.create = function * (data) {
  return yield CusineModel.create(data).then(() => {
    return true
  }).catch((err) => {
    console.log(err)
    return false
  })
}

Cusine.find = function * (query, options) {
  options = (options === undefined) ? '' : options
  return yield CusineModel.find(query, options).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return false
  })
}

Cusine.findAll = function * () {
  return yield this.find({}, '-_id -__v -steps')
}

Cusine.findByTag = function * (tag) {
  return yield this.find({ 'tag': tag }, '-_id -__v -steps')
}

Cusine.findByName = function * (name) {
  return yield this.find({ 'name': new RegExp(`\w*${name}\w*`) })
}

Cusine.findStepsById = function * (id) {
  return yield this.find({ 'idNumber': id }, 'steps -_id')
}

Cusine.update = function * (query, data) {
  return yield CusineModel.findOneAndUpdate(query, data).then(() => {
    return true
  }).catch((err) => {
    // console.log(err)
    return false
  })
}

Cusine.updateById = function * (id, data) {
  return yield this.update({idNumber: id}, data)
}