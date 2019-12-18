/* eslint-disable @typescript-eslint/no-var-requires */
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const { override, fixBabelImports } = require('customize-cra')

if (process.env.NODE_ENV === 'production') {
  process.env.GENERATE_SOURCEMAP = 'false'
}
/* config-overrides.js */
module.exports = override(
  (config, env) => {
    config = rewireReactHotLoader(config, env)
    return config
  },
  fixBabelImports('@material-ui/core', {
    libraryName: '@material-ui/core',
    // Use "'libraryDirectory': ''," if your bundler does not support ES modules
    libraryDirectory: 'esm',
    camel2DashComponentName: false
  }),
  fixBabelImports('@material-ui/icons', {
    libraryName: '@material-ui/icons',
    // Use "'libraryDirectory': ''," if your bundler does not support ES modules
    libraryDirectory: 'esm',
    camel2DashComponentName: false
  })
)
