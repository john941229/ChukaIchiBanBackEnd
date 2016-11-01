const fs = require('fs')
const Cusine = require('./cusine.js')['cusine'],
    Step = require('./cusine.js')['step']

const txtData = function() {
    cusineData().then((result) => {
        stepData(result);
    });
};

// 去掉行末分号
const takeOutSuffix = (str) => {
    if (str[str.length - 1] === ';')
        str = str.substring(0, str.length - 1);
    return str;
}

var cusineData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('cusine.txt', 'utf8', (err, data) => {
            if (err) throw err
            if (data) {
                let dataLines = data.split('\n')
                delete dataLines[0]
                let cusineArray = []
                for (let line of dataLines) {
                    if (line !== undefined && line[0] !== '\t') {
                        takeOutSuffix(line)
                        let infoArray = line.split('\t')

                        let tagArray = (takeOutSuffix(infoArray[3])).split(';')
                        if (line !== dataLines[dataLines.length - 1]) {
                            infoArray[4] = infoArray[4].substring(0, infoArray[4].length - 1)
                        }
                        let materialArray = takeOutSuffix(infoArray[4]).split(';')

                        let cusine = new Cusine({
                            idNumber: parseInt(infoArray[0]),
                            name: infoArray[1],
                            description: infoArray[2],
                            tag: tagArray,
                            material: materialArray
                        })
                        cusineArray.push(cusine)
                    }
                }
                Cusine.create(cusineArray).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }
        })
    })
}

var stepData = () => {
    fs.readFile('steps.txt', 'utf8', (err, data) => {
        if (err) throw err
        if (data) {
            let dataLines = data.split('\n')
            delete dataLines[0]
            let stepArray = [], idString
            for (let line of dataLines) {
                if (line !== undefined && line[0] !== '\t') {
                    let infoArray = line.split('\t')
                    if (infoArray[0] !== idString) {
                        if (stepArray.length !== 0) {
                            Cusine.findOneAndUpdate({ idNumber: parseInt(idString) }, { steps: stepArray }, (err) => {
                                if (err) throw err;
                            });
                        }
                        stepArray = []
                        idString = infoArray[0]
                    }
                    let step = new Step({
                        name: infoArray[2],
                        text: infoArray[3],
                        time: infoArray[4] === '' ? 0 : parseInt(infoArray[4]),
                        imgUrl: infoArray[5]
                    })
                    stepArray.push(step)
                }
            }
            Cusine.findOneAndUpdate({ idNumber: parseInt(idString) }, { steps: stepArray }, (err) => {
                if (err) throw err;
            });
        }
    })
}

module.exports = txtData
