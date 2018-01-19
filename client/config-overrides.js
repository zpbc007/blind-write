const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require('react-app-rewired')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLess = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
})

// env development production
module.exports = function (config, env) {

    // add tsloader
    const tsLoader = getLoader(
        config.module.rules,
        rule => 
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    )
    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
            })]
        })
    }

    // add TsconfigPathsPlugin to use alias
    config.resolve.plugins = [new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
    })]

    if (env === 'development') {
        // add less
        config.module.rules.unshift({
            test: /\.less$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'less-loader'}
            ]
        })
    } else if (env === 'production') {
        // add less
        config.module.rules.unshift({
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader'
            })
        })
        config.plugins.push(extractLess)
    }
    
    // 真尼玛费劲
    config.module.rules.forEach(item => {
        if (item.oneOf) {
            item.oneOf.forEach(one => {
                if (one.exclude) {
                    one.exclude.push(/.less$/)
                }
            }) 
        }
    })

    return config
}