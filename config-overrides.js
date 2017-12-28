const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require('react-app-rewired')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = function (config, env) {
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
                style: 'css'
            })]
        })
    }

    config.resolve.plugins = [new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
    })]

    return config
}