const path = require('path')
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                includePaths: ['src/styles']
            }
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'lsj',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        '200': {
            entry: 'src/main.js',
            template: 'public/200.html',
            filename: '200.html',
            title: 'lsj',
            chunks: ['chunk-vendors', 'chunk-common', '200']
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('~', path.join(__dirname, 'src/components'))
            .set('@', path.join(__dirname, 'src'))
    }
}
