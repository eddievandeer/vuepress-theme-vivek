const { path } = require('@vuepress/shared-utils')

module.exports = {
  name: 'vivek-blog-controller',
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  globalUIComponents: ['BlogController']
}