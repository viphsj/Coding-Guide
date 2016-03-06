---
title: webpack命令备忘
date: 2016-03-03 09:29:15
tags: webpack
---

## 安装webpack

```sass
npm install webpack -g //webpack全局安装到了本地环境中，就可以使用webpack命令了。
```


## 在项目中使用webpack

```sass
npm init //实例化package.json文件。
npm install webpack --save-dev //安装webpack到package.json文件中。
//或者通过npm install webpack@1.2.x --save-dev 安装指定版本的webpack到package.json文件中。
npm install webpack-dev-server --save-dev //安装dev tools到package.json文件中，本地运行webpack服务
```

切换到包含webpack.config.js的目录运行命令：

```sass
webpack //执行一次开发时的编译
webpack -p //执行一次生成环境的编译（压缩）
webpack --watch //在开发时持续监控增量编译（很快）
webpack -d //让他生成SourceMaps
webpack --progress //显示编译进度
webpack --colors //显示静态资源的颜色
webpack --sort-modules-by, --sort-chunks-by, --sort-assets-by //将modules/chunks/assets进行列表排序
webpack --display-chunks //展示编译后的分块
webpack --display-reasons //显示更多引用模块原因
webapck --display-error-details //显示更多报错信息
```

[webpack入门级教程](http://www.cnblogs.com/shinggang/p/5034404.html)
