<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack编译提速-CommonsChunkPlugin的正确姿势](#webpack%E7%BC%96%E8%AF%91%E6%8F%90%E9%80%9F-commonschunkplugin%E7%9A%84%E6%AD%A3%E7%A1%AE%E5%A7%BF%E5%8A%BF)
  - [配置common入口](#%E9%85%8D%E7%BD%AEcommon%E5%85%A5%E5%8F%A3)
  - [配置Plugin](#%E9%85%8D%E7%BD%AEplugin)
  - [对比](#%E5%AF%B9%E6%AF%94)
  - [坑](#%E5%9D%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Webpack编译提速-CommonsChunkPlugin的正确姿势

> 假定你已经了解了webpack的基本配置，也会使用一些例如React这样的框架依赖，就会发现自己的webpack在第一次打包编译的时候速度非常慢。我们的项目一次编译就要2min之多，而配置提取了React之后则提速了20s

[`CommonsChunkPlugin`](https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin)是webpack使用者会经常使用的一个插件，它的功能就是把文件中的功能依赖提取成一个单独的文件。

### 配置common入口

```javascript
entry: {
  common_react: ["react", "react-dom", "redux", "react-redux", "redux-thunk", "classnames"], // 提取出React/Redux等依赖，避免重复打包
  common: ["jquery"] // 抽取jquery
},
output: {
  path: ...,
  filename: '[name].bundle.js'
}
```

### 配置Plugin

```javascript
plugins: {
  new webpack.optimize.CommonsChunkPlugin({
      names: ['common_react', 'common'],
      minChunks: Infinity
  }),
}
```

### 对比

按照惯例我们来个优化前后对比。

打包自己业余的项目，前后速度对比：

```bash
# 优化前
# 注：没有使用UglifyJsPlugin压缩
> webpack --config frontend/config/webpack.config.js -p

Hash: 97d2cc94120a8d7baa82
Version: webpack 1.13.1
Time: 7832ms
                     Asset     Size  Chunks             Chunk Names
   articles_base.bundle.js  3.55 kB       6  [emitted]  articles_base
             js_header.gif   540 kB          [emitted]  
 articles_detail.bundle.js   4.1 MB       1  [emitted]  articles_detail
          writer.bundle.js   3.9 MB       2  [emitted]  writer
 users_dashboard.bundle.js  2.58 MB       3  [emitted]  users_dashboard
     users_login.bundle.js  1.94 MB       4  [emitted]  users_login
   articles_home.bundle.js  5.18 kB       5  [emitted]  articles_home
          common.bundle.js   765 kB       0  [emitted]  common
  articles_base.bundle.css  6.49 kB       6  [emitted]  articles_base
articles_detail.bundle.css  20.2 kB       1  [emitted]  articles_detail
  articles_home.bundle.css  9.17 kB       5  [emitted]  articles_home
users_dashboard.bundle.css  2.37 kB       3  [emitted]  users_dashboard
    users_login.bundle.css  15.8 kB       4  [emitted]  users_login
         writer.bundle.css  19.6 kB       2  [emitted]  writer
```

```bash
# 优化后
# 注：没有使用UglifyJsPlugin压缩
> webpack --config frontend/config/webpack.config.js -p

Hash: f1f0b901991d0ad51234
Version: webpack 1.13.1
Time: 5625ms
                     Asset     Size  Chunks             Chunk Names
   articles_home.bundle.js  5.17 kB       6  [emitted]  articles_home
             js_header.gif   540 kB          [emitted]  
    common_react.bundle.js  2.02 MB       1  [emitted]  common_react
 articles_detail.bundle.js  2.08 MB       2  [emitted]  articles_detail
          writer.bundle.js  2.02 MB       3  [emitted]  writer
     users_login.bundle.js  57.7 kB       4  [emitted]  users_login
 users_dashboard.bundle.js   560 kB       5  [emitted]  users_dashboard
          common.bundle.js   765 kB       0  [emitted]  common
   articles_base.bundle.js  3.55 kB       7  [emitted]  articles_base
  articles_base.bundle.css  6.49 kB       7  [emitted]  articles_base
articles_detail.bundle.css  20.2 kB       2  [emitted]  articles_detail
  articles_home.bundle.css  9.17 kB       6  [emitted]  articles_home
users_dashboard.bundle.css  2.37 kB       5  [emitted]  users_dashboard
    users_login.bundle.css  15.8 kB       4  [emitted]  users_login
         writer.bundle.css  19.6 kB       3  [emitted]  writer
```

### 坑

打包生成`common_react.bundle.js`和`common.bundle.js`两个文件，我们会在全局的`root.html`引用`common.bundle.js`，在使用React的地方引用`common_react.bundle.js`。

但需要注意的是，CommonsChunkPlugin插件生成的common文件需要有一个入口依赖，而这个入口依赖会被打包进Plugin配置的`names`中的最后一个文件里，也就是`common.bundle.js`里。所以如果调换了`names`里文件的顺序，或者`common.bundle.js`晚于`common_react.bundle.js`引用，则会报出
`common.bundle.js:1 Uncaught ReferenceError: webpackJsonp is not defined`
