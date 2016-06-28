<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [PhantomJS](#phantomjs)
  - [install](#install)
  - [编写测试脚本](#%E7%BC%96%E5%86%99%E6%B5%8B%E8%AF%95%E8%84%9A%E6%9C%AC)
  - [webpage实例](#webpage%E5%AE%9E%E4%BE%8B)
    - [webpage属性](#webpage%E5%B1%9E%E6%80%A7)
    - [webpage方法](#webpage%E6%96%B9%E6%B3%95)
    - [User-Agent](#user-agent)
    - [获取页面上下文](#%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E4%B8%8A%E4%B8%8B%E6%96%87)
    - [网页截图](#%E7%BD%91%E9%A1%B5%E6%88%AA%E5%9B%BE)
    - [监测网络请求](#%E7%9B%91%E6%B5%8B%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82)
    - [使用附加库](#%E4%BD%BF%E7%94%A8%E9%99%84%E5%8A%A0%E5%BA%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## PhantomJS

A browser without a GUI
PhantomJS基于Webkit引擎，可以布局和渲染页面。它原生支持多种web标准，可以使用HTML，CSS，SVG，Canvas

### install

```bash
# install
$ brew update && brew install phantomjs
# 之后就可以运行phantomjs命令

# 查看版本
$ phantomjs -v
# 查看操作
$ phantomjs --help
# 运行测试脚本
$ phantomjs <js file name>
```

### 编写测试脚本

```js
/*
* 重要API-webpage
* webpage用来打开网页，并返回status。若成功打开则为success
* 在打开网页之后，可以调用webpage.render(filename)来快速的生成一个当前网页的截图
*/

var webpage = require('webpage').create();
webpage.open('https://google.com', function(status) {
  console.log('status is ' + status);
  if(status === 'success') {
    webpage.render('google.png');
  }
  phantom.exit();
});
```

`phantom.exit()`必须在脚本结束时调用，否则PhantomJS永远不会终止

### webpage实例

#### webpage属性

- `page.clipRect` 返回一个Object，代表webpage截图剪裁的图像大小
- `page.content` 返回当前页面的HTML
- `page.cookies`
- `page.settings.userAgent` 获取及设置UserAgent
- `page.title`
- `page.url`
- `page.viewportSize` 返回当前模拟的窗口大小

#### webpage方法

- `page.close`
- `page.loadFinished`
- `page.loadStarted`
- `page.openUrl`
- `page.render`

- `page.addCookie`
- `page.deleteCookie`
- `page.clearCookies`

#### User-Agent

通过`webpage.settings.userAgent`可以获取及设置UserAgent

```python
var webpage = require('webpage').create();
print(webpage.setting.userAgent);
webpage.setting.userAgent = 'new agent'
```

#### 获取页面上下文

```js
/*
* 使用webpage的evaluate()函数
* 可以在回调中获取到页面的上下文环境
* 但是在evaluate()中通过console.log()输出的内容不会出现在terminal中
*/

var webpage = require('webpage').create();
webpage.open('https://google.com', function(status) {
  var pageTitle = webpage.evaluate(function() {
    var title = document.title;
    console.log('page title is ' + title);
    // 甚至可以使用document.getElementById()
    return title;
  });
  console.log(pageTitle);
  phantom.exit();
});
// 输出结果
// Google
```

- `evalute()`方法可以返回一个对象，然而**返回值仅限于对象，不能包含函数（或闭包）**
- 任何来自于网页并且包括来自`evaluate()`内部代码的控制台信息，默认不会显示。解决方案如下：

```js
// 重写webpage的onConsoleMessage方法，使输出统一调用console.log
var webpage = require('webpage').create();
webpage.onConsoleMessage = function((msg) {
  console.log(msg);
});
```

#### 网页截图

在webpage成功open一个页面之后，可以调用它render的函数来截取当前页面的快照。

- `render(filename)` # 针对当前open的页面截图，在脚本文件夹下生成指定文件名的图片
- `viewportSize` # 相当于浏览器窗口的大小，默认为手机端大小的窗口
- `clipRect` # 截图剪裁的图像大小

```js
var webpage = require('webpage').create();
webpage.viewportSize = {
  width: 1024,
  height: 768
};
webpage.clipRect = {
  top: 0,
  left: 0,
  width: 1024,
  height: 768
};
webpage.open('https://www.google.com', function(status) {
  webpage.render('google.png');
  phantomjs.exit();
})
```

#### 监测网络请求

- `onResourceRequested` 记录request
- `onResourceReceived` 记录response

```js
var url = 'https://www.google.com';
var webpage = require('webpage').create();
webpage.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
webpage.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
webpage.open(url, function(status) {
  
});
```

#### 使用附加库

在evaluate内获取DOM元素太慢太痛苦？我们可以引入jQuery等第三方库来便捷操作

```js
var webpage = require('webpage').create();
page.open('https://www.google.com', function() {

// includeJs用来引入第三方库
page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    page.evaluate(function() {
      $("button").click(); // jQuery
    });
    phantom.exit()
  });
});
```