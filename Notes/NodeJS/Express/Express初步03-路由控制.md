## Express初步03 - 路由控制

```js
app.get(path, function(req, res) {});

app.post(path, function(req, res) {});
```

### 获取并解析路径:

- `req.query` 处理get请求，获取get请求参数
- `req.params` 处理`/:xxx`形式的请求，获取请求参数
- `req.body` 处理post请求，获取post请求体
- `req.param()` 处理post和get请求，查找优先级由高到低为 `req.params`->`req.body`->`req.query`

```js
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

```js
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

```js
var express = require('express');
var routes = require('./routes/index');

var app = express();

app.use('/', routes);
app.use('/about', routes);
```