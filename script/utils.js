const fs = require('fs')

function isFileExisted(file) {
    return new Promise(function (resolve, reject) {
        fs.access(file, (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve('File already exists!');
            }
        });
    })
}

module.exports = {
    isFileExisted
}