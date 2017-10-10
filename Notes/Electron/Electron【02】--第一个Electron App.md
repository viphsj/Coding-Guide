<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Electron【02】--第一个Electron App](#electron02--%E7%AC%AC%E4%B8%80%E4%B8%AAelectron-app)
  - [目录结构与文件](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E4%B8%8E%E6%96%87%E4%BB%B6)
  - [运行&生成应用](#%E8%BF%90%E8%A1%8C%E7%94%9F%E6%88%90%E5%BA%94%E7%94%A8)
    - [通过`electron-prebuilt`运行](#%E9%80%9A%E8%BF%87electron-prebuilt%E8%BF%90%E8%A1%8C)
    - [通过Electron Binary运行](#%E9%80%9A%E8%BF%87electron-binary%E8%BF%90%E8%A1%8C)
    - [生成应用](#%E7%94%9F%E6%88%90%E5%BA%94%E7%94%A8)
  - [应用打包](#%E5%BA%94%E7%94%A8%E6%89%93%E5%8C%85)
    - [生成`asar`包](#%E7%94%9F%E6%88%90asar%E5%8C%85)
  - [例子](#%E4%BE%8B%E5%AD%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Electron【02】--第一个Electron App

### 目录结构与文件

Electron App的目录结构如下：

```text
your-app/
├── package.json
├── main.js
└── index.html
```

其中的`package.json`和Node Modules里表现的一样，而`main.js`则是启动你App的脚本，它将会开启主进程。`package.json`的一个例子：

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

注：当`package.json`里不存在`main`时，Electron将会默认使用`index.js`

`main.js`应当创建一个窗口并处理系统事件。一个典型的例子如下：

```javascript
'use strict';

const electron = require('electron');
const app = electron.app;  // 控制App生命周期的模块
const BrowserWindow = electron.BrowserWindow;  // 创建原生窗口的模块

// 保持对窗口对象的全局引用。如果不这么做的话，JavaScript垃圾回收的时候窗口会自动关闭
var mainWindow = null;

// 当所有的窗口关闭的时候退出应用
app.on('window-all-closed', function() {
  // 在 OS X 系统里，除非用户按下Cmd + Q，否则应用和它们的menu bar会保持运行
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当应用初始化结束后调用这个方法，并渲染浏览器窗口
app.on('ready', function() {
  // 创建一个窗口
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载index.js
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开 DevTools
  mainWindow.webContents.openDevTools();

  // 窗口关闭时触发
  mainWindow.on('closed', function() {
    // 如果你的应用允许多个屏幕，那么可以把它存在Array里。
    // 因此删除的时候可以在这里删掉相应的元素
    mainWindow = null;
  });
});
```

最后，`index.html`是你最终要展示的页面

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

### 运行&生成应用

#### 通过`electron-prebuilt`运行

如果你通过`npm`全局安装了`electron-prebuilt`，那么在App文件目录下跑这句就可以运行它：

```bash
electron .
```

如果只是在当前项目下安装了，则要跑：

```bash
./node_modules/.bin/electron .
```

#### 通过Electron Binary运行

在这儿下载[Electron二进制文件](https://github.com/electron/electron/releases)

打开包内的App按照提示操作，或者在该文件夹下运行：

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

就可以通过这个包来运行自己的应用了。

#### 生成应用

应用写完以后，可以参照[Application Distribution](https://github.com/electron/electron/blob/v0.37.8/docs/tutorial/application-distribution.md)里的指导进行打包：

  1. 项目文件名应该命名为`app`
  2. 下载Electron资源文件。就是上一步里面的[Electron二进制文件](https://github.com/electron/electron/releases)
  3. 把项目目录放在Electron资源文件夹下

Mac OS X:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Windows & Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

之后运行`Electron.app`就能启动应用

现在，你的应用名称为默认的`Electron.app`（或`Electron.exe`），可以通过如下方式修改名称：

**Windows**

直接修改`Electron.exe`的名称

**OS X**

  1. 修改应用`Electron.app`的名称
  2. 修改文件中的`CFBundleDisplayName`，`CFBundleIdentifier`，以及`CFBundleName`字段。它们的所在位置：

  - `Electron.app/Contents/Info.plist`
  - `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist
`
 

### 应用打包

使用`asar`库来替代你的`app`文件夹，这样可以避免暴露你的源码。

#### 生成`asar`包

`asar`可以把多个文件合并成一个类似于tar的归档文件。

  1. install

```bash
$ npm install -g asar
```

  2. 打包 

切换到含有你项目文件夹的父级文件夹

```bash
# dev/your-app
$ cd dev
```

打包项目

```bash
$ asar pack your-app/ app.asar
```

将生成的`app.asar`放在：

```text
// OS X
electron/Electron.app/Contents/Resources/
└── app.asar

// Windows & Linux
electron/resources/
└── app.asar
```

这样你就可以不必放入`app`文件夹，而且你的代码都是封装压缩过的。

### 例子

按照下面步骤来运行官方案例：

```bash
# Clone the repository
$ git clone https://github.com/atom/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies and run the app
$ npm install && npm start
```