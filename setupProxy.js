// setupProxy.js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('http://localhost:3000', {  //`api`是需要转发的请求 
      target: 'https://api.juooo.com/home/index/',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  )
}