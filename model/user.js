const md5 = require('md5')
const UserModel = require('./model').user

let User = exports

User.create = function * (data) {
  data.password = md5(data.password)
  return yield UserModel.create(data).then(() => {
    return true
  }).catch((err) => {
    console.log(err)
    return false
  })
}

User.find = function * (query, options = '') {
  return yield UserModel.find(query, options).then((data) => {
    return data
  }).catch((err) => {
    console.log(err)
    return false
  })
}

User.login = function * (data) {
  data.password = md5(data.password)
  return yield this.find(data, '-__v -password')
}