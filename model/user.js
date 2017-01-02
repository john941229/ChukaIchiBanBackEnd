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

User.findById = function * (userId) {
  return yield this.find({ _id: userId })
}

User.login = function * (data) {
  data.password = md5(data.password)
  return yield this.find(data, '-__v -password')
}

User.starCusine = function * (userId, cusineId) {
  let userStar = (yield this.find({ '_id': userId }))[0]['star']
  if (userStar.indexOf(cusineId) === -1) {
    return yield this.update({ '_id': userId }, { $push: { star: cusineId } })
  } else {
    return yield this.update({ '_id': userId }, { $pull: { star: cusineId } })
  }
}

User.update = function * (query, data) {
  return yield UserModel.findOneAndUpdate(query, data).then(() => {
    return true
  }).catch((err) => {
    console.log(err)
    return false
  })
}