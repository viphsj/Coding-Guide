### Webpack 配置优化

#### React 热加载



#### `alias`配置别名

直接指定 `require` 或者 `import` 的包的位置，可以指定到 `.min` 以便缩减编译时间


```js
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// config the path
var path = require('path');
var CURRENT_PATH = path.resolve(__dirname);
var ROOT_PATH = path.join(__dirname, '../');
var MODULES_PATH = path.join(ROOT_PATH, './node_modules');
var BUILD_PATH = path.join(ROOT_PATH, './public/assets')

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    index: './public/pages/index.coffee',
    public: './public/pages/public.coffee',
    jquery: ['jquery']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.css', '.less'],
    alias: {
      'semantic-css': path.join(MODULES_PATH, './semantic-ui/dist/semantic.min.css'),
      'semantic-js': path.join(MODULES_PATH, './semantic-ui/dist/semantic.min.js'),
      'bounce': path.join(MODULES_PATH, './bounce.js/bounce.min.js'),
      'moment': path.join(MODULES_PATH, './moment/min/moment.min.js')
    }
  },
  module: {
    loaders:[
      // css & less & scss loader
      // 分离css文件
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!scss-loader')},
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      // jquery config
      // use expose-loader
      { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
      // react && es6
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader'],
        query: {
          presets: ['react', 'es2015']
        }
      },
      // coffee
      { test: /\.coffee$/, loader: 'coffee-loader'},
      // font & image
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
    ]
  },
  plugins: [
    // 把jquery作为全局变量插入到所有的代码中
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // public sources
    new webpack.optimize.CommonsChunkPlugin({
      // 与 entry 中的 jquery 对应
      name: 'jquery',
      // 输出的公共资源名称
      filename: 'common.bundle.js',
      // 对所有entry实行这个规则
      minChunks: Infinity
    }),
    // 分离css
    new ExtractTextPlugin('[name].bundle.css', {
      allChunks: true
    }),
    // 代码丑化混淆
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
}

```