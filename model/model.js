const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/ChukaIchiBan')

let model = exports

model.step = mongoose.model('step', {
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  time: {
    type: Number,
    default: 0
  },
  imgUrl: {
    type: String,
    default: ''
  }
})

model.cusine = mongoose.model('cusine', {
  idNumber: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  tag: {
    type: Array,
    default: []
  },
  material: {
    type: Array,
    default: []
  },
  steps: {
    type: Array,
    default: []
  },
  imgUrl: {
    type: String,
    default: ''
  }
})

model.user = mongoose.model('user', {
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

model.special = mongoose.model('special', {
  sid: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  item: {
    type: Array,
    default: []
  }
})