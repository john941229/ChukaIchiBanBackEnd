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
  let info = yield CusineModel.find(query).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return false
  })
  return info
}

Cusine.findByTag = function * (tag) {
  let info = yield CusineModel.find({ 'tag': tag }, '-_id -__v -steps')
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

Cusine.findByIdAndUpdate = function * (id, data) {
  let info = yield this.update({idNumber: id}, data)
  return info
}
