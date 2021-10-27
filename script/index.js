#!/usr/bin/env node

const program = require('commander')
const newMd = require('./newMd')

program.version('0.1.0')

program
    .command('init')
    .description('初始化目录结构')
    .option('-c, --categories', 'Open categories')
    .option('-t, --tags', 'Open tags')
    .action((cmd) => {
        if(cmd.categories) {
            const buffer = '---\n' +
                'categoriesPage: true\n' +
                '---';
            newMd('categories', 'README', buffer)
        }
        if(cmd.tags) {
            const buffer = '---\n' +
                'tagsPage: true\n' +
                '---';
            newMd('tags', 'README', buffer)
        }
    })

program
    .command('new [folder] [fileName]')
    .description('创建一个带初始化配置的新md文件')
    .action((folder, fileName) => {
        const date = new Date().toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
        
        const buffer = '---\n' +
                `title: ${fileName !== undefined ? fileName : folder}\n` +
                `postTime: ${date}\n` +
                '---';

        newMd(folder, fileName, buffer)
    })

program.parse(process.argv)