const fs = require('fs')
const Cusine = require('./cusine')

var readFile = function*(fileName) {
  let fsPromise = new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      if (data) resolve(data)
    })
  })
  var fsData = yield fsPromise.then((data) => {
    return data
  })

  return fsData
}

var dealCusineData = function*(data) {
  let dataStringArray = data.split('\n')
  dataStringArray.splice(0, 1)
  let cusines = [], propertyArray = []
  for (let dataString of dataStringArray) {
    let dataArray = dataString.split('\t')
    for (let i = 0; i < dataArray.length; i++) {
      let data = dataArray[i]
      if (i === 3 || i === 4) {
        let tmArray = data.split(';')
        if (tmArray.length > 1 && tmArray[tmArray.length - 1] !== '') {
          propertyArray.push(tmArray)
        } else {
          propertyArray.push([tmArray[0] || ''])
        }
      } else {
        propertyArray.push(data)
      }
    }
    cusines.push({idNumber: parseInt(propertyArray[0]),
                name: propertyArray[1],
                description: propertyArray[2],
                tag: propertyArray[3],
                material: propertyArray[4],
                steps: []})
    propertyArray = []
  }
  let info = yield Cusine.create(cusines)
  if (info) {
    console.log('cusine success');
  } else {
    console.log('cusine failed');
  }
}

var dealStepData = function*(data) {
  let dataStringArray = data.split('\n')
  dataStringArray.splice(0, 1)
  let id = '', stepArray = []
  for (let dataString of dataStringArray) {
    let dataStringNoR = dataString.split('\r')[0]
    let datas = dataStringNoR.split('\t')
    if (id !== '' && id !== datas[0]) {
      let info = yield Cusine.findByIdAndUpdate(parseInt(id), {steps: stepArray})
      if (info) {
        console.log('step success');
      } else {
        console.log('step failed');
      }
      stepArray = []
      id = ''
    } else {
      id = datas[0]
      stepArray.push({
        name: datas[2],
        text: datas[3],
        time: parseInt(datas[4]) || 0,
        imgUrl: datas[5]
      })
    }
    let info = yield Cusine.findByIdAndUpdate(parseInt(id), {steps: stepArray})
    if (info) {
      console.log('step success');
    } else {
      console.log('step failed');
    }
  }
}

var txtData = function*() {
  let cusineData = yield readFile(__dirname + '/cusine.txt')
  yield dealCusineData(cusineData)
  let stepData = yield readFile(__dirname + '/steps.txt')
  yield dealStepData(stepData)
}

module.exports = txtData
