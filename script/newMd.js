const fs = require('fs')
const path = require('path');

const symbols = require('log-symbols')
const chalk = require('chalk');

const { isFileExisted } = require('./utils')

function newMd(folder, fileName, buffer) {
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
            fs.writeFile(filePath, buffer, function (err) {
                if (err) console.log(symbols.error, chalk.red(err));
                else console.log(chalk.green(symbols.success, 'File created successfully!'));
            })
        });
}

module.exports = newMd