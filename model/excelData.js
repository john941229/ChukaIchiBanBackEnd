const parseExcel = require('excel');
const Cusine = require('./cusine.js')['cusine'],
    Step = require('./cusine.js')['step'];

const excelData = function() {
    // parseExcel('cusine.xlsx', (err, data) => {
    //     if (err) throw err;
    //     else {
    //         delete data[0];
    //         for (item of data) {
    //             if (item !== undefined && item[0] !== '') {
    //                 let type = item[3],
    //                     material = item[4];
    //                 let typeArrayString = takeOutSemicolon(type),
    //                     materialArrayString = takeOutSemicolon(material);
    //                 let typeArray = typeArrayString.split(';'),
    //                     materialArray = materialArrayString.split(';');
    //
    //                 let cusine = new Cusine({
    //                     id: parseInt(item[0]),
    //                     name: item[1],
    //                     description: item[2],
    //                     type: typeArray,
    //                     material: materialArray
    //                 });
    //                 cusine.save((err, data) => {
    //                     if (err) console.log(err);
    //                 });
    //             }
    //         }
    //     }
    // });
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
                                console.log(stepArray);
                                console.log(doc);
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
                console.log(stepArray);
                console.log(doc);
            });
        }
    });
};

// 去掉引号
function takeOutSemicolon(str) {
    if (str[str.length - 1] === ';')
        str = str.substring(0, str.length - 1);
    return str;
}

module.exports = excelData;
