// vue.config.js
var path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },
  },
  publicPath: '/project name/',
  css: { requireModuleExtension: true }
}

