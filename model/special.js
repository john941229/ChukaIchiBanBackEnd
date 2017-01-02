const SpecialModel = require('./model').special

let Special = exports

Special.create = function * (data) {
  return yield SpecialModel.create(data).then(() => {
    return true
  }).catch((err) => {
    console.log(err)
    return false
  })
}

Special.find = function * (query, options = '') {
  return yield SpecialModel.find(query, options).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return false
  })
}

Special.findById = function * (id) {
  return yield this.find({ 'sid': id }, '-_id -__v')
}