const {
  override,
  fixBabelImports,
  addWebpackModuleRule,
  addWebpackAlias,
  addBabelPlugin
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackModuleRule({ test: /\.md$/, use: 'raw-loader' }),
  addWebpackAlias({
    utils: path.resolve(__dirname, 'src/utils'),
    components: path.resolve(__dirname, 'src/components'),
    plugins: path.resolve(__dirname, 'src/plugins')
  })
)
