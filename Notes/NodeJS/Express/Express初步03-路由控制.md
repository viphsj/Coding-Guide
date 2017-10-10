<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Express初步03 - 路由控制](#express%E5%88%9D%E6%AD%A503---%E8%B7%AF%E7%94%B1%E6%8E%A7%E5%88%B6)
  - [获取并解析路径:](#%E8%8E%B7%E5%8F%96%E5%B9%B6%E8%A7%A3%E6%9E%90%E8%B7%AF%E5%BE%84)
  - [添加路由规则](#%E6%B7%BB%E5%8A%A0%E8%B7%AF%E7%94%B1%E8%A7%84%E5%88%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Express初步03 - 路由控制

```javascript
app.get(path, function(req, res) {});

app.post(path, function(req, res) {});
```

### 获取并解析路径:

- `req.query` 处理get请求，获取get请求参数
- `req.params` 处理`/:xxx`形式的请求，获取请求参数
- `req.body` 处理post请求，获取post请求体
- `req.param()` 处理post和get请求，查找优先级由高到低为 `req.params`->`req.body`->`req.query`

```javascript
// GET /search?word=test+one&order[color]=blue
req.query.word; // test one
req.query.order.color; // blue

// POST user[name]=ecmadao&user[email]=xxx@xxx.com
req.body.user.name; // ecmadao

// GET /user/home
req.params/name; // home

// ?name=ecmadao
req.param('name'); // ecmadao
```

### 添加路由规则

在`./routes/index.js`中新增路由：

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Express' });
});

module.exports = router;
```

在`./app.js`中注册路由：

```javascript
var express = require('express');
var routes = require('./routes/index');

var app = express();

app.use('/', routes);
app.use('/about', routes);
```