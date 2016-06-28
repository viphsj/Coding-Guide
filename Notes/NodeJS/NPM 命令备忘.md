<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [NPM 命令备忘](#npm-%E5%91%BD%E4%BB%A4%E5%A4%87%E5%BF%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## NPM 命令备忘

  - setup

```scss
//创建npm包，建立 package.json 文件
npm init
```

  - install && uninstall

```scss
// install
npm install
npm install --global --save --save-dev
npm install -g -S -D

// uninstall
npm uninstall
npm uninstall --global --save --save-dev
npm uninstall -g -S -D
```

`--save` 添加 package.json 中 `dependencies` 字段里的依赖

`--save-dev` 添加 package.json 中 `devDependencies` 字段里的依赖

devDependencies对应用于开发阶段使用的一些测试模块依赖

dependencies则对应于生产环节正式发布时的依赖

生产环境发布：

```scss
npm install --production
```

  - upgrade

```scss
npm outdated
// 检测当前安装的所有npm包是否有更新，并列出可以更新的包，如果没有任何输出，则没有可用更新

// 更新指定包（非全局安装）
npm update packageName
// 对于全局安装的包，则使用
npm update -g packageName
// 更新全部包
npm update
npm update -g 
```

  - show all package

```sass
npm -g list
```

[玩转npm](http://www.alloyteam.com/2016/03/master-npm/)