<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [PostCSS配置指北(with webpack)](#postcss%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8C%97with-webpack)
  - [Use with webpack](#use-with-webpack)
  - [autoprefixer](#autoprefixer)
  - [Use stylelint](#use-stylelint)
    - [1. use with webpack](#1-use-with-webpack)
    - [2. add  configuration](#2-add--configuration)
    - [3. StyleLintPlugin config options](#3-stylelintplugin-config-options)
  - [资源](#%E8%B5%84%E6%BA%90)
    - [postcss & loader](#postcss-&-loader)
    - [autoprefixer & cssnext](#autoprefixer-&-cssnext)
    - [stylelint](#stylelint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [PostCSS](https://github.com/postcss/postcss)配置指北(with webpack)

一个类似于webpack的工具，组成CSS编译/lint/autoprefixer的生态环境。

具体的插件，可以根据自己的需要进行安装，而不是像less或者scss一样的全家桶

### Use with webpack

```bash
# 安装webpack postcss loader
npm install postcss-loader --save-dev
```

**基本配置**

```javascript
// 配置webpack.config.js
// ...
module: {
  loaders: [
    {
      test: /\.css$/,
      // if you use ExtractTextPlugin
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
      // else
      // loader: "style-loader!css-loader!postcss-loader"
    }
  ]
},
postcss: function () {
	return [ // 里面是我们要用的插件
	];
}
```

**使用插件**

```bash
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
npm install postcss-cssnext --save-dev
# 浏览器兼容补全
npm install autoprefixer --save-dev

# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
npm install precss --save-dev

# 在@import css文件的时候让webpack监听并编译
npm install postcss-import --save-dev
```

```javascript
// 配置webpack.config.js
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

// ...
postcss: function () {
	return [
		cssnext({autoprefixer: {browsers: "ie >= 10, ..."}}),
		postcssImport({ addDependencyTo: webpack })
	];
}
```

### [autoprefixer](https://github.com/postcss/autoprefixer)

- autoprefixer可以单独配置使用

```javascript
// webpack.config.js
const autoprefixer = require('autoprefixer');
// ...
postcss: function(){
  return [autoprefixer({ browsers: ['last 2 versions'] })]
}
```

- 或者与[postcss-cssnext](https://github.com/MoOx/postcss-cssnext)一起使用，但`autoprefixer`都要进行安装

```javascript
const cssnext = require('postcss-cssnext');

postcss: function(){
  return [cssnext({autoprefixer: {browsers: "ie >= 10, ..."}})]
}
```

[`autoprefixer`的配置](https://github.com/postcss/autoprefixer#options)

### Use stylelint

PostCSS配合[Stylelint](https://github.com/stylelint/stylelint)插件可以让你在编译的时候就知道自己CSS文件里的错误

#### 1. [use with webpack](https://github.com/vieron/stylelint-webpack-plugin)

```bash
npm install stylelint-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const StyleLintPlugin = require('stylelint-webpack-plugin');
// ...
plugins: [
	new StyleLintPlugin(),
],
```

#### 2. [add  configuration](https://github.com/stylelint/stylelint-config-standard)

use standard styelint config as an example

```bash
npm install stylelint-config-standard --save
```

```javascript
// webpack.config.js
// 接着上面的webpack配置继续
plugins: [
	new StyleLintPlugin({
      config: {
      	// 你的lint扩展自刚刚安装的stylelint-config-standard
        "extends": "stylelint-config-standard"
      },
      // 正则匹配想要lint监测的文件
      files: 'frontend/stylesheet/**/*.l?(e|c)ss'
	}),
]
```

#### 3. [StyleLintPlugin config options](https://github.com/vieron/stylelint-webpack-plugin#options)

[stylelint options](http://stylelint.io/user-guide/node-api/#options)里面的配置也可以在plugin里使用。介绍几个常用的配置：

- config：lint基础配置。没有的话则会去寻找`.stylelintrc`
- configFile：lint配置文件。可以被config的配置替代。默认为`.stylelintrc`文件
- context：上下文环境。默认使用webpack的context
- files：要匹配的文件。默认为`['**/*.s?(a|c)ss']`
- failOnError：错误时是否停止编译。默认`false`
- quiet：在console中不打印错误信息。默认`false`

### 资源

#### postcss & loader

- [postcss](https://github.com/postcss/postcss)
- [postcss-loader](https://github.com/postcss/postcss-loader)

#### autoprefixer & cssnext

- [cssnext](http://cssnext.io/)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [browserslist](https://github.com/ai/browserslist)

#### stylelint

- [stylelint](https://github.com/stylelint/stylelint)
- [stylelint-webpack-plugin](https://github.com/vieron/stylelint-webpack-plugin)
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)