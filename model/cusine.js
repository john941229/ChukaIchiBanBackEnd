const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/ChukaIchiBan');

var step = mongoose.model('step', {
    name: { type: String, default: '' },
    text: { type: String, default: '' },
    time: { type: Number, default: 0 },
    imgUrl: { type: String, default: ''}
});

var cusine = mongoose.model('cusine', {
    id: { type: Number, default: 0 },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    type: { type: Array, default: [] },
    material: { type: Array, default: [] },
    steps: {type: Array, default: [] },
    a: { type: Number, default: 0 }
});

module.exports = {
    'cusine': cusine,
    'step': step
};
