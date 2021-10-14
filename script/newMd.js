const fs = require('fs')
const path = require('path');

const symbols = require('log-symbols')
const chalk = require('chalk');

function newMd(folder, fileName) {
    if(!fileName) {
        let folderPath = path.resolve(__dirname, `../../docs/post`)
        fileName = folder
        folder = 'post'
        isFileExisted(folderPath)
            .then(() => {}, () => {
                fs.mkdirSync(folderPath)
            })
    }
    const filePath = path.resolve(__dirname, `../../docs/${folder}/${fileName}.md`);
    console.log(chalk.blue('Create markdown file in: '), chalk.underline(filePath))
    console.log('')

    isFileExisted(filePath)
        .then((response) => {
            console.log(symbols.error, chalk.red(response));
        }, () => {
            const date = new Date().toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')

            const buffer = '---\n' +
                `title: ${fileName}\n` +
                `postTime: ${date}\n` +
                '---';

            fs.writeFile(filePath, buffer, function (err) {
                if (err) console.log(symbols.error, chalk.red(err));
                else console.log(chalk.green(symbols.success, 'File created successfully!'));
            })
        });
}

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

module.exports = newMd