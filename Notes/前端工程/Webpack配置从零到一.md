## Webpack配置从零到一

> 这不算是初学者的入门文章，也不能算是高端用户的进阶。这只是我自己在配置Webpack过程中收集整理的一些资料，以及自己常用的整个配置流程。因为有时候老是忘了某个东西是怎么配置的，所以记录下来用于速查和备忘。

### setup

```bash
$ npm init
$ npm install webpack --save-dev # 全局安装依赖
# or
$ npm install webpack-dev-server --save-dev # 安装webpack调试工具
```

### basic config

```js
// config/webpack.config.js
const webpack = require('webpack');

// 配置目录
// 因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置
const path = require('path');
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(ROOT_PATH, './public/assets'); // 最后输出放置公共资源的目录

module.exports = {
  context: path.join(__dirname, '../'), // 设置webpack配置中指向的默认目录为项目根目录
  entry: {
    index: './public/pages/index.js',
    public: './public/pages/public.js'
  },
  output: {
    path: BUILD_PATH, // 设置输出目录
    filename: '[name].bundle.js', // 输出文件名
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'] // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀
  },
  module: {
    loaders: [
      // loader 扔在这里
    ]
  },
  plugins: [
    // 插件扔在这里
  ]
}
```

### loaders

> 没有loader怎么活！￣へ￣

#### install css/less/style loader

scss-loader的配置同理less，个人比较常用less

```bash
$ npm install less --save-dev # install less

$ npm install css-loader style-loader --save-dev # install style-loader, css-loader

$ npm install less less-loader --save-dev # 基于style-loader,css-loader
```

#### install url loader

> 用来处理图片和字体文件

```bash
$ npm install file-loader --save-dev
$ npm install url-loader --save-dev
```

#### install babel loader

> 不能写ES6的js不叫js

```bash
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev
```

#### config loaders

```js
// config/webpack.config.js

module.exports = {
  module: {
    loaders: [
      // style & css & less loader
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader")},
      // babel loader
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader'],
        query: {
          presets: ['es2015']
          // 如果安装了React的话
          // presets: ['react', 'es2015']
        }
      },
      // image & font
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
    ]
  }
}
```

### plugin

#### `ExtractTextPlugin`分离CSS

> 行内插入一坨CSS是万恶之源 
> 
> -- 我瞎扯的

```bash
# install ExtractTextPlugin
$ npm install extract-text-webpack-plugin --save-dev
```

```js
// config/webpack.config.js

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module: {
  loaders: [
    // 把之前的style&css&less loader改为
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
  ]
},
plugins: [
  // 分离css
  new ExtractTextPlugin('[name].bundle.css', {
    allChunks: true
  }),
]
```

#### 设置`jQuery`全局变量

`jQuery`很老土？好吧我还真有点同意你。。但无疑在一定程度上它还是很方便的。我把`jQuery`设置成全局变量，这样的话有时候就能偷懒用下它了。

```bash
$ npm install jquery --save-dev

# 安装 expose-loader
$ sudo npm install exports-loader --save
```

```js
// config/webpack.config.js

module: {
  loaders: [
    // expose-loader将需要的变量从依赖包中暴露出来
    { test: require.resolve("jquery"), loader: "exports?$! exports?jQuery" }
  ]
},
plugins: [
  // 把jquery作为全局变量插入到所有的代码中
  // 然后就可以直接在页面中使用jQuery了
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
]
```

#### `CommonsChunkPlugin`抽取公共资源

```js
// config/webpack.config.js

entry: {
  jquery: ['jquery']
},
plugins: [
  // public sources
  new webpack.optimize.CommonsChunkPlugin({
    // 与 entry 中的 jquery 对应
    name: 'jquery',
    // 输出的公共资源名称
    filename: 'common.bundle.js',
    // 对所有entry实行这个规则
    minChunks: Infinity
  }),
]
```

#### `UglifyJsPlugin`代码压缩混淆

```js
// config/webpack.config.js

plugins: [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require']
      //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
    },
    compress: {
      warnings: false
    }
  })
]
```