const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://saveplus.link', // 目标 API 地址
                changeOrigin: true, // 需要虚拟托管站点，以能够跨域
                pathRewrite: {'^/api': ''}, // 重写路径: 去掉路径中开头的 '/api'
            },
        }
    }
})

