<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [webpack安装](#webpack%E5%AE%89%E8%A3%85)
- [基础知识--理解文件路径](#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86--%E7%90%86%E8%A7%A3%E6%96%87%E4%BB%B6%E8%B7%AF%E5%BE%84)
- [webpack配置](#webpack%E9%85%8D%E7%BD%AE)
- [常用webpack配置代码](#%E5%B8%B8%E7%94%A8webpack%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%A0%81)
  - [提取CSS，不合并到js里](#%E6%8F%90%E5%8F%96css%E4%B8%8D%E5%90%88%E5%B9%B6%E5%88%B0js%E9%87%8C)
  - [babel/jsx(react-jsx to js)](#babeljsxreact-jsx-to-js)
  - [React/React-Dom](#reactreact-dom)
  - [jQuery](#jquery)
  - [Style&&CSS](#stylecss)
  - [less](#less)
  - [url-loader(处理图片和其他静态文件)](#url-loader%E5%A4%84%E7%90%86%E5%9B%BE%E7%89%87%E5%92%8C%E5%85%B6%E4%BB%96%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6)
  - [jshint](#jshint)
  - [html-webpack-plugin(自动生成一个html文件的插件)](#html-webpack-plugin%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E4%B8%80%E4%B8%AAhtml%E6%96%87%E4%BB%B6%E7%9A%84%E6%8F%92%E4%BB%B6)
- [webpack打包](#webpack%E6%89%93%E5%8C%85)
  - [将所有CSS合并成一个](#%E5%B0%86%E6%89%80%E6%9C%89css%E5%90%88%E5%B9%B6%E6%88%90%E4%B8%80%E4%B8%AA)
  - [多重CSS入口](#%E5%A4%9A%E9%87%8Dcss%E5%85%A5%E5%8F%A3)
  - [具体的组件](#%E5%85%B7%E4%BD%93%E7%9A%84%E7%BB%84%E4%BB%B6)
  - [编译文件](#%E7%BC%96%E8%AF%91%E6%96%87%E4%BB%B6)
- [基础知识--模块](#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86--%E6%A8%A1%E5%9D%97)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: webpack入门(1)
date: 2016-03-03 09:12:20
tags: webpack
---


![webpack.png](../../image/3B0BB29D22F20C57E570847DD508C1FF.png)

## webpack安装

- 基于node和npm
- 进入项目目录
- 确定已经有 package.json，没有就通过 npm init 创建
- 安装 webpack 依赖

```javascript
$ npm init // 在项目根目录创建npm
$ npm install webpack --save-dev // 安装webpack依赖
//或者
//$ npm install -g webpack 全局安装webpack依赖
$ npm install webpack-dev-server --save-dev // 安装webpack开发工具(可选)
```

## 基础知识--理解文件路径

假设文件路径如下：

```javascript
-- app
------ modules
----------- MyModule.js
------ main.js (entry point)
------ utils.js
```

打开 main.js 然后可以通过下面两种方式引入 app/modules/MyModule.js

```javascript
// app/main.js

// ES6
import MyModule from './modules/MyModule.js';

// CommonJS
var MyModule = require('./modules/MyModule.js');
```

**最开始的 ./ 是 “相对当前文件路径”**

让我们打开 MyModule.js 然后引入 app/utils：

```javascript
// app/modules/MyModule.js

// ES6 相对路径
import utils from './../utils.js';

// ES6 绝对路径
import utils from '/utils.js';

// CommonJS 相对路径
var utils = require('./../utils.js');

// CommonJS 绝对路径
var utils = require('/utils.js');
```

**相对路径是相对当前目录。绝对路径是相对入口文件，这个案例中是 main.js。**

```javascript
var path = require('path');

// 当前config文件所在目录
var CURRENT_PATH = path.resolve(__dirname);

// 到config文件的上一级目录
var ROOT_PATH = path.join(__dirname, '../');
// 指定一个build目录
var BUILD_PATH = path.join(ROOT_PATH, './public/assets')
```

## webpack配置
[webpack配置文档](http://webpack.github.io/docs/configuration.html)

- 在根目录创建配置文件webpack.config.js
- 设置entry,output,module
- 一个典型的配置文件大概如下:

([CommonsChunkPlugin的配置](./webpack入门-2.md))

```javascript
var webpack = require('webpack');
//公共资源文件
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        entry1: './entry/entry1.js',
        entry2: './entry/entry2.js'
    },
    /*
    * 单一入口写法:
    * entry:'entry.js'
    */
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js'
        // path: __dirname,
        // filename: '[name].entry.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
        	  // 典型的 babel-loader 配置，编译es6与react、jsx
	        {
		        test: /\.jsx?$/,
		        exclude: /(node_modules|bower_components)/,
		        loader: 'babel-loader',
		        query: {
		          presets: ['react', 'es2015']
		        }
	      	 },
        ]
    },
    plugins: [commonsPlugin]
};

//另一种配置entry/output方式
var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),//入口文件
    output: {
        path: path.resolve(__dirname, 'build'),//build为文件名
        filename: 'bundle.js',//出口文件
    },
};
```

- entry：指定打包的入口文件，每有一个键值对，就是一个入口文件

- output：配置打包结果，path定义了打包文件存放的绝对路径，filename则定义了打包结果文件的名称，filename里面的[name]会由entry中的键（这里是entry1和entry2）替换
  
- resolve：定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全

- module：定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。比如这里定义了凡是.js结尾的文件都是用babel-loader做处理，而.jsx结尾的文件会先经过jsx-loader处理，然后经过babel-loader处理。**当然这些loader也需要通过npm install安装**

- plugins: 这里定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取出公用的部分，生成common.js

```javascript
resolve: {
        //查找module的话从这里开始查找
        root: '/pomy/github/flux-example/src', //绝对路径
        
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
}
```

然后我们想要加载一个js文件时，只要require('common')就可以加载common.js文件了。
**注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.**

---

```javascript
module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
                        
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
}
```

- test项表示匹配的资源类型
- loader或loaders项表示用来加载这种类型的资源的loader
- **！用来定义loader的串联关系，"-loader"是可以省略不写的，多个loader之间用“!”连接起来，但所有的加载器都需要通过 npm 来安装**

给css和less还有图片添加了loader之后，我们不仅可以像在node中那样require js文件了，我们还可以require css、less甚至图片文件：

```javascript
 require('./bootstrap.css');
 require('./myapp.less');
 var img = document.createElement('img');
 img.src = require('./glyph.png');
```

---
loaders是一个数组，包含要处理这些程序的loaders.
举个栗子：

```javascript
module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: APP_PATH // css资源文件的路径
      }
    ]
}
```

这里我们用了css和style，注意loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loader

## 常用webpack配置代码
[list-of-loaders](https://webpack.github.io/docs/list-of-loaders.html)

```javascript
//Installing loaders：
$ npm install xxx-loader --save-dev
```

---

### 提取CSS，不合并到js里

- Installation

```javascript
$ npm install extract-text-webpack-plugin --save-dev
```

- Configuration

```javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");

...
module: {
    loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        { test: /\.scss$/,loader: ExtractTextPlugin.extract('style-loader', 'css-loader!scss-loader') },
      	 { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') }
        //{ test: /\.css$/, loader: "style-loader!css-loader" }
        //配置了ExtractTextPlugin的话就不配置css-loader
    ]
},
plugins: [
    new ExtractTextPlugin('[name].[hash].css')
]
```

---

### babel/jsx(react-jsx to js)
[babel-loader](https://github.com/babel/babel-loader)
**Transform jsx code for React to js code**

- Installation

```javascript
$ npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev //支持了es6语法
```

babel-preset-es2015 es6语法包，有了这个，你的代码可以随意的使用es6的新特性啦，const,箭头操作符等信手拈来
babel-preset-react react语法包，这个包，是专门作为react的优化，让你在代码中可以使用React ES6 classes的写法，同时直接支持JSX语法格式

- Configuration

```javascript
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}
```

---

### React/React-Dom

- Installation

```javascript
$ npm install react --save-dev
$ npm i react-tap-event-plugin
$ npm install react-dom --save
```

- Usage

```javascript
var React = require('react');
//es6:
//import React from 'react'
```

---

### jQuery

- Installation

```javascript
$ npm install jquery --save-dev
```

- Usage

```javascript
var $ = require('jquery');
//es6
//import $ from 'jquery';
```

---

### Style&&CSS

- Installation

```javascript
$ npm install css-loader style-loader --save-dev //install style-loader, css-loader
```

- Configuration

```javascript
module: {
  loaders: [
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }
  ]
}
```

style-loader会把css文件嵌入到html的style标签里
css-loader会把css按字符串导出，这两个基本都是组合使用的

---

### less

- Installation

```javascript
$ npm install less less-loader --save-dev //基于style-loader,css-loader
```

- Configuration

```javascript
module: {
  loaders: [
    {
      test:  /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }
  ]
}
```

---

### url-loader(处理图片和其他静态文件)

- Installation

```javascript
$ npm install file-loader --save-dev
$ npm install url-loader --save-dev
```

- Configuration

```javascript
module: {
  loaders: [
  		{ test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=40000&name=[name].[ext]'},
  		{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=40000&name=[name].[ext]'},
      //注意后面那个limit的参数，当你图片大小小于这个限制(40kb)的时候，会自动启用base64编码图片
  ]
}
```

---

### jshint

- Installation

```javascript
$ npm install -g jshint //安装jshit依赖
$ npm install jshint-loader --save-dev
```

- Configuration

```javascript
module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ]
    },
    // more options in the optional jshint object
    jshint: {
        // any jshint option http://www.jshint.com/docs/options/
        // i. e.
        camelcase: true,
        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,
        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: false,
        // custom reporter function
        reporter: function(errors) { }
    }
}
```

---

### html-webpack-plugin(自动生成一个html文件的插件)

- Installation

```javascript
$ npm install html-webpack-plugin --save-dev
```

- Configuration

```javascript
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: APP_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ]
};
```

- Usage

在项目根目录运行:

```javascript
$ webpack
```

## webpack打包

### 将所有CSS合并成一个

- 在你的主入口文件中个，比如 app/main.js 你可以为整个项目加载所有的 CSS：

```javascript
import './project-styles.css';
import './project-styles2.css';
import './project-styles3.css';
//...
// 其他 JS 代码
```

---

### 多重CSS入口

- 发挥应用中多重入口文件的优势，在每个入口点包含各自的 CSS:

```javascript
//app/main.js
import './style.css';
// 其他 JS 代码

//app/entryA/main.js
import './style.css';
// 其他 JS 代码

//app/entryB/main.js
import './style.css';
// 其他 JS 代码
```

---

### 具体的组件

- 为每个组件创建 CSS 文件，可以让组件名和 CSS 中的 class 使用一个命名空间，来避免一个组件中的一些 class 干扰到另外一些组件的 class

```javascript
import './MyComponent.css';
import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <div className="MyComponent-wrapper">
        <h1>Hello world</h1>
      </div>
    )
  }
});
```

---

### 编译文件

```javascript
$ webpack ./js/react.jsx ./js/bundle.js
//$ webpack 待编译的文件 编译完成的出口文件

$ webpack
//通过webpack.config.js的配置来编译文件
```

## 基础知识--模块

ES6 模块

```javascript
//导入模块
import MyModule from './MyModule.js';

//制作模块
class HelloWorldComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div>Hello World</div>
        );
    }
}
//导出模块
export default HelloWorldComponent
```

CommonJS

```javascript
//导入模块
var MyModule = require('./MyModule.js');

//制作与导出
var HelloWorldComponent = React.createClass({
    displayName: 'HelloWorldComponent',
    render: function() {
        return (
            <div>Hello world</div>
        );
    }
});
module.exports = HelloWorldComponent;
```

AMD

```javascript
define(['./MyModule.js'], function (MyModule) {
});
```
