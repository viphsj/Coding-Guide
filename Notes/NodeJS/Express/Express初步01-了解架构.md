<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Express初步01 - 了解架构](#express%E5%88%9D%E6%AD%A501---%E4%BA%86%E8%A7%A3%E6%9E%B6%E6%9E%84)
  - [Express 安装](#express-%E5%AE%89%E8%A3%85)
  - [Express 组成部分](#express-%E7%BB%84%E6%88%90%E9%83%A8%E5%88%86)
    - [application对象](#application%E5%AF%B9%E8%B1%A1)
    - [request对象](#request%E5%AF%B9%E8%B1%A1)
    - [response对象](#response%E5%AF%B9%E8%B1%A1)
  - [Express 目录结构](#express-%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
    - [定义路由](#%E5%AE%9A%E4%B9%89%E8%B7%AF%E7%94%B1)
    - [分发路由,加载中间件](#%E5%88%86%E5%8F%91%E8%B7%AF%E7%94%B1%E5%8A%A0%E8%BD%BD%E4%B8%AD%E9%97%B4%E4%BB%B6)
    - [view层](#view%E5%B1%82)
    - [资源文件](#%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6)
    - [处理错误页面](#%E5%A4%84%E7%90%86%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Express初步01 - 了解架构

> 以 express V4.13.1为例

### Express 安装

- 安装 Node
- 全局安装Express

```js
// install node

// install express
$ sudo npm install -g express-generator
$ express [项目名]
$ cd [项目名] && npm install

// start 
$ DEBUG=blog:* npm start
// if it can't used, then try
$ npm start
```

### Express 组成部分

#### application对象

创造一个Express模块对象：

```js
var express = require('express');
var app = new express();
```
application对象的方法：

```js
app.set(name, value) // 设置一个app属性 
app.get(name) // 提取由app.set()设置的值 
app.enable(name) // 开启一个设置 
app.disable(name) // 关闭一个设置 
app.enabled(name) // 检查设置是否开启 
app.disabled(name) // 检查设置是否不可用 
app.configure([env], callback) // 根据开发环境进行设置 
app.use([path], function) // 在app中载入一个中间件 
app.engine(ext, callback) // 为app注册一个模板 
app.param([name], callback) // 为路径变量增加逻辑 
app.VERB(path, [callback...], callback) // 根据HTTP verbs 定义路径和处理器 
app.all(path, [callback...], callback) // 为所有HTTP verbs定义路径和处理器 
app.locals // 存储所有视图都能访问的变量的对象 
app.render(view, [options], callback) // 从app中渲染一个视图 
app.routes // 在app中定义的所有路径列表 
app.listen() // 绑定并监听所有连接
```

#### request对象

当一个客户端对Express app发起一个请求时，HTTP request对象被创建。
它包含许多与当前请求相关的方法和属性：

```js
req.params // 包含请求路径中的变量 
req.params(name) // 从GET变量或者POST变量中返回一个特定变量 
req.query // 包含GET中的值 
req.body // 包含POST中的值 
req.files // 包含由表单上传的文件 req.route 提供当前匹配路径的信息 
req.cookies // Cookie值 
req.signedCookies // Signed cookie 值 
req.get(header) // 获取http请求头文件 
req.accepts(types) // 检查客户端是否接受媒体类型 
req.accepted // 客户端可接受的媒体类型列表 
req.is(type) // 检查请求中是否包含某种媒体类型 
req.ip // 客户端的ip地址 
req.ips // 客户端以及代理的ip地址 
req.path // 请求路径 
req.host // 来自HTTP头文件的主机信息 
req.fresh // 检查请求是否刚发生 
req.stale // 检查请求是否稳定 
req.xhr // 检查请求是否来自于AJAX请求 
req.protocol // 进行请求的协议 
req.secure // 检查是否是安全连接 
req.subdomains // 主域名下面的子域名 
req.url // 请求路径以及查询变量 
req.originalUrl // req.url的根源
req.acceptedLanguages // 客户端所接受的语言列表 
req.acceptsLanguage(langauge) // 检查客户端是否接受某种特定语言 req.acceptedCharsets // 客户端可接受字符列表 
req.acceptsCharsets(charset) // 检查客户端是否接受某种特定字符
```

#### response对象

response对象和request对象一起被创建

每个中间件在把控制传递给下一个中间件之前都需要包含一个res对象和一个req对象

```js
res.status(code) // 设置HTTP恢复状态码 
res.set(field, [value]) // 设置回复HTTP头文件 
res.get(header) // 获取回复HTTP头文件 
res.cookie(name, value, [options]) // 在客户端上设置cookie 
res.clearCookie(name, [options]) // 清除客户端上的cookie 
res.redirect([status], url) // 连同一个HTTP状态码重定向到一个新的url 
res.location // HTTP头文件中的location值 
res.charset // HTTP头文件中的charset值 
res.send([body|status], [body]) // 连同一个HTTP回复码，发送一个HTTP回复对象 
res.json([status|body], [body]) // 连同一个HTTP回复码，发送一个JSON对象 
res.jsonp([status|body], [body]) // 连同一个HTTP回复码，发送一个JSONP对象 
res.type(type) // 设置回复HTTP头文件的媒体类型 
res.format(object) // 根据客户端可接受的类型发送一个HTTP回复 
res.attachment([filename]) // 设置HTTP头文件内容为一个附件 
res.sendfile(path, [options], [callback]]) // 向客户端发送一个文件 
res.download(path, [filename], [callback]) // 提示客户端下载一个文件 
res.links(links) // 设置HTTP连接头文件 
res.locals // 存储所有视图能够访问的req的变量值 
res.render(view, [locals], callback) // 渲染一个视图
```

### Express 目录结构

```
-- app.js [根文件，生成了ExpressApp实例，分发路由]
-- bin
---- www [最终的执行文件]
-- node_modules [node依赖包]
-- public [public资源文件，存放js/css/image等]
-- routes [路由目录]
-- views [view层]
-- package.json
```

#### 定义路由

```js
./routes/index.js

var express = require('express');

// express.Router 类来创建可安装的模块化路由处理程序。Router 实例是完整的中间件和路由系统
var router = express.Router();

// 定义路由
router.get('/', function(req, res, next) {

  // render出view层
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
其底层都是通过如下方法实现:

```js
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
```
可以提供多个回调函数, 这些回调函数可能调用 next('route') 来绕过剩余的路由回调

可以使用此机制对路由施加先决条件，在没有理由继续执行当前路由的情况下，可将控制权传递给后续路由

多个回调函数可以处理一个路由（确保您指定 next 对象）:

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

一组回调函数可以处理一个路由。例如：

```js
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
```


#### 分发路由,加载中间件

```js
./app.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var app = express();

// view引擎初始化
app.set('views', path.join(__dirname, 'views')); // 配置view文件目录
app.set('view engine', 'jade'); // 使用 jade

// 配置网站的favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 加载解析json的中间件
app.use(bodyParser.json());
// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 加载解析cookie的中间件
app.use(cookieParser());

// 配置public资源文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 分发路由
app.use('/', routes);
app.use('/users', users);
app.use('/about', routes);

// 设置404页面
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
```
在根路由 (/) 上（应用程序的主页）对 POST 请求进行响应:

```js
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
```

对 /user 路由的 PUT 请求进行响应:

```js
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
```

对 /user 路由的 DELETE 请求进行响应:

```js
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```

#### view层

使用`.jade`格式文件

```jade
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
```

#### 资源文件

```js
./app.js

// 配置路径
app.use(express.static(path.join(__dirname, 'public')));

// result
http://localhost:3000/css/style.css
```

要使用多个静态资产目录，请多次调用 express.static 中间件函数:

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

要为 express.static 函数提供的文件创建虚拟路径前缀（路径并不实际存在于文件系统中），请为静态目录指定安装路径，如下所示:

```js
app.use('/static', express.static('public'));
// 推荐使用绝对路径
app.use('/static', express.static(__dirname + '/public'));

// result
http://localhost:3000/static/css/style.css
```

#### 处理错误页面

设置404

```js
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
```

设置500

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```