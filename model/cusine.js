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
    idNumber: { type: Number, default: 0 },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    // tag = type
    tag: { type: Array, default: [] },
    material: { type: Array, default: [] },
    steps: { type: Array, default: [] }
});

module.exports = {
    'step': step,
    'cusine': cusine
};
