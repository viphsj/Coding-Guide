<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack配置从零到一](#webpack%E9%85%8D%E7%BD%AE%E4%BB%8E%E9%9B%B6%E5%88%B0%E4%B8%80)
  - [setup](#setup)
  - [basic config](#basic-config)
  - [loaders](#loaders)
    - [install css/less/style loader](#install-csslessstyle-loader)
    - [install url loader](#install-url-loader)
    - [install babel loader](#install-babel-loader)
    - [config loaders](#config-loaders)
  - [plugin](#plugin)
    - [`ExtractTextPlugin`分离CSS](#extracttextplugin%E5%88%86%E7%A6%BBcss)
    - [设置`jQuery`全局变量](#%E8%AE%BE%E7%BD%AEjquery%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F)
    - [`CommonsChunkPlugin`抽取公共资源](#commonschunkplugin%E6%8A%BD%E5%8F%96%E5%85%AC%E5%85%B1%E8%B5%84%E6%BA%90)
    - [`UglifyJsPlugin`代码压缩混淆](#uglifyjsplugin%E4%BB%A3%E7%A0%81%E5%8E%8B%E7%BC%A9%E6%B7%B7%E6%B7%86)
  - [我要用 React!](#%E6%88%91%E8%A6%81%E7%94%A8-react)
    - [install](#install)
    - [config](#config)
    - [bug ?](#bug-)
  - [end](#end)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

```javascript
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
  context: CURRENT_PATH, // 设置webpack配置中指向的默认目录为项目根目录
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

```javascript
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

```javascript
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
$ npm install expose-loader --save-dev
$ npm install exports-loader --save-dev
```

```javascript
// config/webpack.config.js

module: {
  loaders: [
    // expose-loader将需要的变量从依赖包中暴露出来
    { test: require.resolve("jquery"), loader: "expose?$! expose?jQuery" }
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

```javascript
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

```javascript
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

### 我要用 React!

React + Webpack在我心里是个标配，自己也很喜欢React+Redux+Webpack那一套，所以怎么少得了它。

#### install

```bash
# react
$ npm install react --save
$ npm install react-dom --save

# 喜欢redux?
$ npm install --save redux # redux
$ npm install --save react-redux # 和React配合
$ npm install --save redux-thunk # middleware

# 如果已经装了babel可以忽略下面这条
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev

# 但是要用React的话一定记得安装下面这个
$ npm install babel-preset-react --save-dev
```

#### config

```javascript
loaders: [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: ['babel-loader'],
    query: {
      presets: ['react', 'es2015']
    }
  }
]
```

#### bug ?

在最新的React(V15)里，如果你按照上面的配置正常使用的话，应该会出现如下的警告：

```text
Warning: It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details.
```

我记得以前的版本没有这个警告啊？我在开发环境压缩它了？那把`UglifyJsPlugin`拿走试试。。结果还是一样。

最后在[github React-issue](https://github.com/facebook/react/issues/6479)找到了目前的解决方案：

在Webpack的plugins里添加：

```javascript
new webpack.DefinePlugin({
  "process.env": { 
     NODE_ENV: JSON.stringify("production") 
   }
})
```

然后就没问题了==

### end

```bash
# 运行
$ webpack --config config/webpack.config.js -p --display-reasons --display-chunks --progress --colors --profile --display-modules
```

可以在package.json里面配置一下运行命令

```json
"scripts": {
    "build": "webpack --config config/webpack.config.js -p --display-reasons --display-chunks --progress --colors --profile --display-modules"
}
```

如果真的要玩的话，webpack可以有非常多的玩法（看看它插件就知道了）。但webpack终究是一个工具，所以也就没有特别深入探究它，知道怎么用，够用就好了。