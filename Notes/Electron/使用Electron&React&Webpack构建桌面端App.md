## 使用Electron&React&Webpack构建桌面端App【01】--配置

### intro

对于Electron的学习，什么也不比[官方文档](https://github.com/electron/electron/tree/master/docs-translations/zh-CN)+[开源项目代码](https://github.com/sindresorhus/awesome-electron#documentation)来的痛快

先看下[官网](http://electron.atom.io/)，按照上面的Quick Start走：

```bash
# Clone the Quick Start repository
$ git clone https://github.com/electron/electron-quick-start

# Go into the repository
$ cd electron-quick-start

# Install the dependencies and run
$ npm install && npm start
```

目录结构：

```bash
|--index.html # 控制首屏UI
|--renderer.js # 渲染线程
|--main.js # 总入口
|--package.json
```

```js
// main.js
const electron = require('electron')
// app用于控制应用的生命周期
const app = electron.app
// BrowserWindow用于生成一个原生的窗口
const BrowserWindow = electron.BrowserWindow
// 创建一个全局的窗口对象变量，并在接下来的初始化窗口函数中赋值。通过这样的方式我们可以保持对窗口对象的引用，以免垃圾回收导致应用退出
let mainWindow

function createWindow() {
  // 创建主窗口，加载资源文件URL（html文件或一个网址）
  // 在这个官方例子里加载了index.html
  // 并定义当主窗口关闭时的回调函数
}

app.on('ready', createWindow)
app.on('window-all-closed', function() {}) // 全部窗口关闭时的回调
app.on('active', function() {
  // 在mac平台上，当点击dock icon的时候，如果没有其他窗口的话则新建主窗口
  if(mainWindow === null)createWindow();
})
```

```html
<!--index.html-->
<!--...省略一些HTML代码-->
<script>
  require('./renderer.js') // 在这里render渲染进程
</script>
```

```js
// renderer.js
// 在这里可以使用Node.js API
// 例如，可以调用渲染进程的专用API，如remote（用于在主进程和渲染进程间建立联系，并可获取当前窗口），clipboard（用于粘贴渲染进程的相应文字）
```

在进一步之前，建议先戳这里：

[Electron【01】--主进程VS渲染进程&不同页面间共享数据](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/Electron/Electron%E3%80%9001%E3%80%91--%E4%B8%BB%E8%BF%9B%E7%A8%8BVS%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B%26%E4%B8%8D%E5%90%8C%E9%A1%B5%E9%9D%A2%E9%97%B4%E5%85%B1%E4%BA%AB%E6%95%B0%E6%8D%AE.md)

和这里：

[Electron【02】--第一个Electron App](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/Electron/Electron%E3%80%9002%E3%80%91--%E7%AC%AC%E4%B8%80%E4%B8%AAElectron%20App.md)

加深一下了解。然后我们就开始吧。Electron + React + Webpack构建桌面端App。

使用上面根据官方QuickStart获取的内容，进行进一步的构建。

首先来让我们引入 Webpack + React的环境搭配，戳这篇：

[Webpack配置从零到一](https://segmentfault.com/a/1190000005110967)

里面记录了自己搭建webpack时的常用配置，以及配合React+Redux时安装和设置。

React搭配Webpack时，关于`production`和`development`需要注意的点：

[Make your own React production version with webpack](http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/)

### webpack + electron

##### webpack + electron 的问题

配好webpack，先不急搭建目录。先使用根目录下的`renderer.js`：

```js
// renderer.js
// remote用于在主进程和渲染进程之间建立联系
// clipboard可以提供复制文本的功能
import {clipboard, remote} from 'electron';

// 例如，你可以用remote获取当前的窗口
let currentWindow = remote.getCurrentWindow();
console.log(currentWindow); // It's an Object
```

然后以`renderer.js`作为webpack`entry`中的入口：

```js
//config/webpack.config.js

module.exports = {
  entry: {
    renderer: 'renderer.js'
  },
  output: {
    path: BUILD_PATH, // 设置输出目录
    filename: '[name].bundle.js', // 输出文件名
  }
}
```

最后再改下`index.html`，把之前引用的`require('./renderer.js')`改为`require('./assets/renderer.bundle.js')`

运行webpack，就会发现直接报错：

```bash
Module not found: Error: Cannot resolve module 'electron' in /Users/ecmadao1/Dev/Electron-OpenSourceApp/electron-quick-start
```

#### 解决方案1：

在webpack中配置：

```js
module.exports = {
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}
```

#### 解决方案2：

所有`require('electron')`的地方全部改为`window.require('electron')`

### setup

#### React

```bash
$ npm install react --save
$ npm install react-dom --save
```

#### Redux

```bash
$ npm install --save redux # redux
$ npm install --save react-redux # 和React配合
$ npm install --save redux-thunk # middleware
```

#### 搭建目录结构

改变目录结构如下：

```bash
|--app
|----Components # react组件都扔在这里
|----Redux # redux负责组件的函数逻辑和state更新
|------actions
|------reducers
|----Page # html文件扔这里
|------index.html
|--assets # 打包好以后的资源在这儿
|--config
|----webpack.config.js # webpack配置
|--package.json
|--main.js # Electron App的入口文件
```
