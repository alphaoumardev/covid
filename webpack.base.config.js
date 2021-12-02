module.exports = {
    entry: {
        app: './src/main.js'
    },
    // 下面才是我们所要配置的
    externals: {
        'BMap': 'BMap',
        'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT'
    }}
