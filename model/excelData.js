const parseExcel = require('excel');
const Cusine = require('./cusine.js')['cusine'],
    Step = require('./cusine.js')['step'];

const excelData = function() {
    cusineData().then((result)=>{
        stepData(result);
    });
};

// 去掉引号
const takeOutSemicolon = (str) => {
    if (str[str.length - 1] === ';')
        str = str.substring(0, str.length - 1);
    return str;
}

var cusineData = () => {
    return new Promise((resolve, reject)=>{
        parseExcel('cusine.xlsx', (err, data) => {
            if (err) throw err;
            else {
                delete data[0];
                let cusineArray = [];
                for (item of data) {
                    if (item !== undefined && item[0] !== '') {
                        let type = item[3],
                            material = item[4];
                        let typeArrayString = takeOutSemicolon(type),
                            materialArrayString = takeOutSemicolon(material);
                        let typeArray = typeArrayString.split(';'),
                            materialArray = materialArrayString.split(';');

                        let cusine = new Cusine({
                            id: parseInt(item[0]),
                            name: item[1],
                            description: item[2],
                            type: typeArray,
                            material: materialArray
                        });
                        cusineArray.push(cusine);
                    }
                }
                Cusine.create(cusineArray).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
            }
        });
    })
};

var stepData = () => {
    parseExcel('steps.xlsx', (err, data) => {
        if (err) throw err;
        else {
            delete data[0];
            let stepArray = [],
                id = '';
            for (item of data) {
                if (item !== undefined && item[0] !== '') {
                    if (item[0] !== id) {
                        if (stepArray.length !== 0) {
                            Cusine.findOneAndUpdate({ id: parseInt(id) }, { steps: stepArray }, (err, doc) => {
                                if (err) throw err;
                            });
                        }
                        stepArray = [];
                        id = item[0];
                    }
                    let step = new Step({
                        name: item[2],
                        text: item[3],
                        time: parseInt(item[4]),
                        imgUrl: item[5]
                    });
                    stepArray.push(step);
                }
            }
            Cusine.findOneAndUpdate({ id: parseInt(id) }, { steps: stepArray }, (err, doc) => {
                if (err) throw err;
            });
        }
    });
};

module.exports = excelData;
