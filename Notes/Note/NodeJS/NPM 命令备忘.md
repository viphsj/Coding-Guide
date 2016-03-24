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
```

[玩转npm](http://www.alloyteam.com/2016/03/master-npm/)