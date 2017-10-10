<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Electron【01】--主进程VS渲染进程&不同页面间共享数据](#electron01--%E4%B8%BB%E8%BF%9B%E7%A8%8Bvs%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B%E4%B8%8D%E5%90%8C%E9%A1%B5%E9%9D%A2%E9%97%B4%E5%85%B1%E4%BA%AB%E6%95%B0%E6%8D%AE)
  - [主进程VS渲染进程](#%E4%B8%BB%E8%BF%9B%E7%A8%8Bvs%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B)
    - [主进程](#%E4%B8%BB%E8%BF%9B%E7%A8%8B)
    - [渲染进程](#%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B)
    - [主进程和渲染进程的不同](#%E4%B8%BB%E8%BF%9B%E7%A8%8B%E5%92%8C%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B%E7%9A%84%E4%B8%8D%E5%90%8C)
  - [不同页面间共享数据](#%E4%B8%8D%E5%90%8C%E9%A1%B5%E9%9D%A2%E9%97%B4%E5%85%B1%E4%BA%AB%E6%95%B0%E6%8D%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Electron【01】--主进程VS渲染进程&不同页面间共享数据

Electron使用了网页页面作为App的GUI，因此你可以将它看做是一个由JavaScript控制的一个小型的Chrome内核浏览器。

### 主进程VS渲染进程

#### 主进程

在Electron中，跑`package.json`里的主脚本的进程叫作主进程。在主进程里跑的脚本可以通过创建web页面的窗口来扮演GUI角色。

主进程看起来就是一段脚本：

```javascript
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var window = null;

app.on('ready', function() {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadURL('https://github.com');
});
```

#### 渲染进程

正因为Electron使用了chrome内核，才使得它多进程的结构也可以被我们使用。在Electron里的每个页面都有它自己的进程，叫作渲染进程。

在普通的浏览器里，网页页面跑在一个沙盒环境下，不能接触到native源码。而Electron则允许你在页面中使用Node.js的API，较低程度上的和操作系统进行交互。

渲染进程如同传统的HTML，但它可以直接使用Node模块：

```javascript
<!DOCTYPE html>
<html>
  <body>
  <script>
    const remote = require('electron').remote;
    console.log(remote.app.getVersion());
  </script>
  </body>
</html>
```

#### 主进程和渲染进程的不同

主进程通过实例化`BrowserWindow`，每个`BrowserWindow`实例都在它自己的渲染进程内返回一个web页面。当`BrowserWindow`实例销毁时，相应的渲染进程也会终止。

主进程负责掌管所有的web页面和它们相应的渲染进程。每个渲染进程都是相互独立的，它们只关心自己所运行的web页面。

在页面（渲染进程）中不允许调用原生GUI相关的API，那是因为在网页（渲染进程）中中掌管原生GUI很危险，易造成内存泄露。如果你想在网页中进行GUI的操作，渲染进程必须向主进程传达请求，然后在主进程中完成操作。

在Electron中，我们有几种连接主进程和渲染进程的方法，例如用于传送消息的[`ipcRenderer`](https://github.com/heyunjiang/electron/blob/master/docs/api/ipc-renderer.md)和[`ipcMain`](https://github.com/heyunjiang/electron/blob/master/docs/api/ipc-main.md)模块，以及用于RPC的[`remote`](https://github.com/heyunjiang/electron/blob/master/docs/api/remote.md)模块。

### 不同页面间共享数据

非常简单，使用HTML5 API就能完成。

[`Storage API`](https://developer.mozilla.org/en-US/docs/Web/API/Storage)，[`IndexedDB`](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)都是很好的选择。

你还可以使用Electron中提供的`IPC`系统。它在主进程中将一个对象储存为全局变量，然后可以通过`remote`模块操作它们：

```javascript
// 在主进程里
global.sharedObject = {
  someProperty: 'default value'
};
```

```javascript
// In page 1.
require('remote').getGlobal('sharedObject').someProperty = 'new value';

// In page 2.
console.log(require('remote').getGlobal('sharedObject').someProperty);
```