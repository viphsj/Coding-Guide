## Express初步 - 中间件

### 中间件概念

> 中间件函数能够访问请求对象 (req)、响应对象 (res) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 next 的变量来表示

![中间件](../../../image/zhongjianjian.png)

要装入中间件函数，需调用 app.use() 并指定中间件函数。

以下代码在根路径 (/) 的路由之前装入 myLogger 中间件函数。应用程序每次收到请求时，会在终端上显示消息“LOGGED”：

```js
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```

中间件装入顺序很重要：首先装入的中间件函数也首先被执行。

如果在根路径的路由之后装入 myLogger，那么请求永远都不会到达该函数，应用程序也不会显示“LOGGED”，因为根路径的路由处理程序终止了请求/响应循环

### 中间件分类

- 应用层中间件
- 路由层中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

#### 应用层中间件

使用 `app.use()` 和 `app.METHOD()` 将应用层中间件绑定到应用程序对象的实例

```js
var app = express();

// 没有安装路径的中间件函数, 应用程序每次收到请求时执行该函数
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 安装在 /user/:id 路径中的中间件函数, 在 /user/:id 路径中为任何类型的 HTTP 请求执行此函数
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

要跳过路由器中间件堆栈中剩余的中间件函数，请调用 next('route') 将控制权传递给下一个路由。 
> 注：next('route') 仅在使用 app.METHOD() 或 router.METHOD() 函数装入的中间件函数中有效

```js
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```

#### 路由层中间件

工作方式与应用层中间件基本相同，差异之处在于它绑定到 `express.Router()` 的实例

使用 router.use() 和 router.METHOD() 函数装入路由器层中间件

```js
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```

#### 错误处理中间件

> 错误处理中间必须使用四个自变量 `function(err, req, res, next)`
> 
> 即使无需使用 next 对象，也必须指定该对象以保持特征符的有效性

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

#### 内置中间件

`express.static(root, [options])`

> Express 中唯一内置的中间件函数是 `express.static`。此函数基于 `serve-static`，负责提供 Express 应用程序的静态资源

- root 自变量指定从其中提供静态资源的根目录
- 可选的 options 对象可以具有以下属性:

![options对象属性](../../../image/express-options-properties.png)

options使用实例:

```js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```

#### 第三方中间件

> 演示如何安装和装入 cookie 解析中间件函数 cookie-parser

`$ npm install cookie-parser`

```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
```