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
  css: { requireModuleExtension: true }
}

