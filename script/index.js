#!/usr/bin/env node

const program = require('commander')
const newMd = require('./newMd')

program.version('0.1.0')

program
    .command('init <categories> <tag>')
    .description('初始化目录结构')
    .action((categories, tag) => {
        console.log(categories, tag);
    })

program
    .command('new [folder] [fileName]')
    .description('创建一个带初始化配置的新md文件')
    .action((folder, fileName) => {
        newMd(folder, fileName)
    })

program.parse(process.argv)