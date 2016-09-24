<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [PostCSS配置指北](#postcss%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8C%97)
  - [Use with webpack](#use-with-webpack)
    - [基本配置](#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
    - [使用插件](#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6)
  - [兼容性CSS的自动补全](#%E5%85%BC%E5%AE%B9%E6%80%A7css%E7%9A%84%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8)
  - [Use stylelint](#use-stylelint)
    - [在webpack内单独使用stylelint](#%E5%9C%A8webpack%E5%86%85%E5%8D%95%E7%8B%AC%E4%BD%BF%E7%94%A8stylelint)
    - [在PostCSS内使用(荐)](#%E5%9C%A8postcss%E5%86%85%E4%BD%BF%E7%94%A8%E8%8D%90)
    - [1. 基础使用方式](#1-%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
    - [2. 增加配置文件](#2-%E5%A2%9E%E5%8A%A0%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
      - [`.stylelintignore`](#stylelintignore)
      - [`stylelint.config.js`](#stylelintconfigjs)
    - [3. StyleLintPlugin的配置参数](#3-stylelintplugin%E7%9A%84%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0)
  - [资源](#%E8%B5%84%E6%BA%90)
    - [postcss & loader](#postcss-&-loader)
    - [autoprefixer & cssnext](#autoprefixer-&-cssnext)
    - [stylelint](#stylelint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [PostCSS](https://github.com/postcss/postcss)配置指北

![postcss](../../image/postcss.png)

> `PostCSS`并不是一门语言，而是一个类似于`webpack`的工具，它支持很多插件，来达到便捷的编译效果，组成一个CSS编译/lint/autoprefixer的生态圈。它的作者是[Euil Martians](https://evilmartians.com/)，一家致力于技术研究与网站外包开发的公司。其后端技术栈偏重于Ruby，而前端从React到Node都有涉猎。

`PostCSS`的一大特点是，具体的编译插件甚至是CSS书写风格，可以根据自己的需要进行安装，选择自己需要的特性：嵌套，函数，变量。自动补全，CSS新特性等等，而不是像`less`或者`scss`一样的大型全家桶。因此，不需要再专门去学习`less`或者`scss`的语法，只要选择自己喜欢的特性，可以只写CSS文件，但依旧可以写嵌套或者函数，然后选择合适的插件编译它就行了。

### Use with webpack

鉴于现在`webpack`也越来越火，所以之后的配置主要是借助于`postcss-loader`，将`PostCSS`的生态圈依托在`webpack`之下。

```bash
# 安装webpack postcss loader
$ npm install postcss-loader --save-dev
```

#### 基本配置

```javascript
// 配置webpack.config.js
// ...
module: {
  loaders: [
    {
      test: /\.css$/,
      // 如果使用了 ExtractTextPlugin
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
      // 否则
      // loader: "style-loader!css-loader!postcss-loader"
    }
  ]
},
postcss: function () {
	return [ // 里面是我们要用的插件
	];
}
```

#### 使用插件

> 快速配置一览

```bash
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
$ npm install postcss-cssnext --save-dev
# 浏览器兼容补全
$ npm install autoprefixer --save-dev

# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
$ npm install precss --save-dev

# 在@import css文件的时候让webpack监听并编译
$ npm install postcss-import --save-dev
```

```javascript
// 配置webpack.config.js
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

// ...
postcss: function () {
	return [
    postcssImport({ addDependencyTo: webpack }),
		cssnext({autoprefixer: {browsers: "ie >= 10, ..."}})
	];
}
```

### [兼容性CSS的自动补全](https://github.com/postcss/autoprefixer)

```bash
$ npm install autoprefixer --save-dev
```

- `autoprefixer`也可以单独配置使用

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
  // 通过配置browsers，可以指定将CSS语法兼容到什么程度
  return [cssnext({autoprefixer: {browsers: "ie >= 10, ..."}})]
}
```

- [`autoprefixer`的配置](https://github.com/postcss/autoprefixer#options)

### Use stylelint

[Stylelint](https://github.com/stylelint/stylelint)插件可以让你在编译的时候就知道自己CSS文件里的错误

#### 在webpack内单独使用stylelint

用到如下插件：

- [stylelint-webpack-plugin](https://github.com/vieron/stylelint-webpack-plugin)
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

```bash
$ npm install stylelint-webpack-plugin --save-dev
# stylelint语法，使用标准语法
$ npm install stylelint-config-standard --save-dev
```

```javascript
// webpack.config.js
const StyleLintPlugin = require('stylelint-webpack-plugin');
// ...
plugins: [
	new StyleLintPlugin({
      config: {
        // 你的lint扩展自刚刚安装的stylelint-config-standard
        "extends": "stylelint-config-standard"
      },
      // 正则匹配想要lint监测的文件
      files: 'frontend/stylesheet/**/*.l?(e|c)ss'
  }),
],
```

#### 在PostCSS内使用(荐)

会用到如下插件：

- [stylelint](https://github.com/stylelint/stylelint)
- [postcss-reporter](https://github.com/postcss/postcss-reporter)
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)

#### 1. [基础使用方式](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md)

```bash
# 安装stylelint
$ npm install stylelint --save-dev
```

```javascript
// webpack.config.js
const stylelint = require('stylelint');
// ...
module: {
  loaders: [
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
  ]
}
postcss: function() {
  return [
    postcssImport({ addDependencyTo: webpack }),
    stylelint({
      failOnError: true
    })
  ]
}
```

这就是最基本的配置了。因为有`postcss-loader`的存在，所以在webpack解析css的时候，都会调用postcss里返回的插件，因此就会使用`stylelint`对代码进行检查。

但这样的配置有一个很严重的缺点：如果你在js中引用了node_module里的css文件，或者引用了其他不想进行编译的文件，PostCSS会对其一视同仁的调用插件编译/检查。此时就需要我们来配置`.stylelintignore`以及`stylelint.config.js`进行更精确的编译/检查。

#### 2. 增加配置文件

- [stylelint配置说明](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)
- [stylelint with postcss配置说明](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md)

##### `.stylelintignore`

在项目根目录下添加`.stylelintignore`文件，并在内部写下不想通过PostCSS编译的文件路径：

```text
node_modules/
frontend/vendor/
```

之后，在没有指明`ignorePath`的情况下，stylelint会自动寻找根目录下的`.stylelintignore`文件。

##### `stylelint.config.js`

安装`stylelint-config-standard`

```bash
$ npm install stylelint-config-standard --save-dev
```

在配置文件中指明我们的检测语法扩展自该插件：

- [User guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide.md)
- [配置规则](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md)

```javascript
// 常用配置
module.exports = {
  extends: "stylelint-config-standard",
  // 各rules的具体作用见上面链接
  rules: {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
      "ignore": ["stylelint-commands", "between-comments"],
    } ],
    "declaration-colon-space-after": "always",
    "max-empty-lines": 2,
    "rule-nested-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"],
    } ],
    // 允许的单位
    "unit-whitelist": ["em", "rem", "%", "s", "ms", "px"]
  }
};
```

然后指明PostCSS的配置文件：

```javascript
postcss: function() {
  return [
    postcssImport({ addDependencyTo: webpack }),
    stylelint({
        config: require('../../stylelint.config.js'),
        failOnError: true
    })
  ]
}
```

此时运行webpack，有问题的CSS文件输出大概是这样的：

```bash
WARNING in ./~/css-loader!./~/postcss-loader!./frontend/stylesheet/layout/test_post_css.css
    stylelint: /Users/ecmadao1/Dev/Python/where_to_go/frontend/stylesheet/layout/test_post_css.css:17:1: Expected indentation of 2 spaces (indentation)
```

很难看清楚吧！因此接下来安装`postcss-reporter`来美化输出：

```bash
$ npm install postcss-reporter --save-dev
```

webpack配置：

```javascript
postcss: function() {
  return [
    postcssImport({ addDependencyTo: webpack }),
    stylelint({
        config: require('../../stylelint.config.js'),
        failOnError: true
    }),
    postcssReporter({ clearMessages: true })
  ]
}
```

之后的输出会是这样的：

```bash
frontend/stylesheet/layout/test_post_css.css
17:1    ⚠  Expected indentation of 2 spaces (indentation) [stylelint]
```

吊吊哒！

#### 3. [StyleLintPlugin的配置参数](https://github.com/vieron/stylelint-webpack-plugin#options)

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
- [postcss-import](https://github.com/postcss/postcss-import)

#### autoprefixer & cssnext

- [cssnext](http://cssnext.io/)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [browserslist](https://github.com/ai/browserslist)

#### stylelint

- [stylelint](https://github.com/stylelint/stylelint)
- [stylelint-webpack-plugin](https://github.com/vieron/stylelint-webpack-plugin)
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
- [postcss-reporter](https://github.com/postcss/postcss-reporter)