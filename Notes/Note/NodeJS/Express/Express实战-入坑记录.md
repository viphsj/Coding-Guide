## Express实战-入坑记录

[官方API文档](http://expressjs.com/en/api.html)

### 路由设置

在`app.js`中设置路由
```javascript
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes); //根目录的路由由/routes/index.js控制
app.use('/users', users); // /users以及之后的路由都由/routes/users.js控制
```

路由层面
```javascript
var express = require('express');
var router = express.Router();

// routes/index.js
routes.get('/'， function(req, res, next) {
  res.render('index', {
    title: 'index'
  });
})
module.exports = router;

// routes/users.js
routes.get('/', function(req, res, next) {
  res.render('users/home', {
    title: 'home'
  });
})
routes.get('/login', function(req, res, next) { // 对应 /users/login
  res.render('users/login', {
    title: 'login'
  });
})
module.exports = routes;
```

### 路由跳转

- 重定向

```javascript
  res.redirect([status,] path);
  // Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an HTTP status code . If not specified, status defaults to “302 “Found”.
```
  `path`可以是相对路径或绝对路径

```javascript
// 重定向到上一页
res.redirect('..');
// or
res.redirect('back');
```
使用重定向时注意，如果报错说不能发送headers( Can’t set headers after they are sent )，那么应该 `return res.redirect()`而不是直接使用它

- `Can’t set headers after they are sent`
  不能发送headers因为已经发送过一次了

  在处理HTTP请求时，服务器会先输出响应头，然后再输出主体内容
  一旦输出过一次响应头（比如执行过 `res.writeHead()` 或 `res.write()` 或 `res.end()`），你再尝试通过 `res.setHeader()` 或 `res.writeHead()` 来设置响应头时（有些方法比如 `res.redirect()` 会调用 `res.writeHead()`），就会报这个错误

  express中的 `res.header()` 相当于 `res.writeHead()` ，`res.send()` 相当于 `res.write()`

  详见：[Node.js Error: Can't set headers after they are sent](http://stackoverflow.com/questions/7042340/node-js-error-cant-set-headers-after-they-are-sent)

### jade

- extends

jade文件中通过`block XX`输出可扩展的块

```jade
doctype html
html
  head
    block head
    meta(charset="utf-8")
    block title
      title= title
    link(rel='stylesheet', href='/assets/public.bundle.css')
  body
    block content
      script(src='/assets/public.bundle.js')
```
上例输出head块，同时head块中的title块也是可扩展的

基础模板的时候，通过直接`block XX`，在其之后写入的内容会覆盖模板块中的内容，同时还有另外两种方法：
`block append XX` 在块内部的后面追加内容，不覆盖原有内容
`block prepend XX`在块内部的前面追加内容，不覆盖原有内容

```jade
extends ./extends/common_layout.jade

block title
  title= (title)
block append head
  link(rel='stylesheet', href='/assets/index.bundle.css')

block append content
  include includes/SideBar/index.jade
  #index_body
  script(src='/assets/index.bundle.js')
```

- layout


### Ajax

- GET

```javascript
// send a GET req
$.ajax({
  url: '/post?name=' + userName,
  type: 'get',
  success: (data) => {
    // do something
  },
  error: (error) => {
    // do something
  }
});

// route
route.get('/get', function(req, res) {
  // finish & send data
  res.josn({success: 1})
});
```

- POST

[body-parser](https://github.com/expressjs/body-parser)

```javascript
// 添加 body-parser 中间件以获取post的参数
$ npm install body-parser --save

// app.js
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
```

- POST 普通类型参数 ( name=XX&age=XX )

```javascript
// route.js
route.post('/post', (req, res) {
  var name = req.body.name;
  var age = req.body.age;
  // do something
  res.send({})
});

// 前端demo.js
$.ajax({
  url: '/post',
  type: 'POST',
  dataType: 'json',
  data: 'name=ecmadao&age=24',
  success: (data) => {
    // do something
  },
  error: (data) => {
    // do soimething
  }
});
```

- POST 多层嵌套的JSON数据

[express为什么不能解析ajax post 上来的数据？](https://segmentfault.com/q/1010000004397502)

```javascript
// 在上面app.js配置body-parser的基础上

// demo.js
$.ajax({
  url: '/postData',
  type: 'post',
  dataType: 'json',
  data: {
    data: JSON.stringify(data)
  },
  success: (data) => {
    // do something
  },
  error: (error) => {
    // do something
  }
});

// route.js
route.get('/postData', function(req, res) {
  data = JSON.parse(req.body.data); // 转为JSON格式
  // do something
})
```

### MongoDB

- 根据`_id`更新/查询数据

```javascript
var ObjectId = require('mongodb').ObjectID;

find({
  "_id": ObjectId("1111111")
}).sort({
  time: -1
}).toArray((err, doc) => {});

update({
  "_id": ObjectId("222222") // 查询
}, {
  $set: {
    content: "new content" // 更新的键值对
  }
}, (err, doc) => {});
```

- 关于`ObjectId`
  [ObjectId](https://docs.mongodb.org/v3.0/reference/object-id/)