const CusineModel = require('./model').cusine

var Cusine = exports

Cusine.create = function * (data) {
  let info = yield CusineModel.create(data).then((data) => {
    return true
  }).catch((err) => {
    return false
  })
  return info
}

Cusine.update = function * (query, data) {
  let info = yield CusineModel.findOneAndUpdate(query, data).then((data) => {
    return true
  }).catch((err) => {
    return false
  })
  return info
}

Cusine.findByIdAndUpdate = function * (id, data) {
  console.log(data);
  let info = yield this.update({idNumber: id}, data)
  return info
}
