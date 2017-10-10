<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Express初步05 - MongoDB](#express%E5%88%9D%E6%AD%A505---mongodb)
    - [配置工程数据库](#%E9%85%8D%E7%BD%AE%E5%B7%A5%E7%A8%8B%E6%95%B0%E6%8D%AE%E5%BA%93)
    - [对 Express 项目安装 MongoDB 与其他依赖](#%E5%AF%B9-express-%E9%A1%B9%E7%9B%AE%E5%AE%89%E8%A3%85-mongodb-%E4%B8%8E%E5%85%B6%E4%BB%96%E4%BE%9D%E8%B5%96)
    - [文件配置](#%E6%96%87%E4%BB%B6%E9%85%8D%E7%BD%AE)
    - [通过终端操作](#%E9%80%9A%E8%BF%87%E7%BB%88%E7%AB%AF%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Express初步05 - MongoDB

有这么好的简明教程，自然不会再去重复造轮子:

[MongoDB 极简实践入门](https://github.com/StevenSLXie/Tutorials-for-Web-Developers/blob/master/MongoDB%20%E6%9E%81%E7%AE%80%E5%AE%9E%E8%B7%B5%E5%85%A5%E9%97%A8.md)

在安装好MongoDB之后，进行一系列配置:

#### 配置工程数据库

```javascript
// 将下载的MongoDB文件夹放在目录/Users/ecmadao/MongoDB/下，并取名为MongoDB

// 新建一个文件夹以储存数据库
$ mkdir /Users/ecmadao/MongoDB/TodoApp
```

```javascript
$ cd /Users/ecmadao/MongoDB/MongoDB/bin[mongodb 的 bin 目录]

// 将TodoApp文件夹作为工程的储存目录并启动数据库
$ ./mongod --dbpath /Users/ecmadao/MongoDB/TodoApp
```

#### 对 Express 项目安装 MongoDB 与其他依赖

```javascript
$ cd [项目文件夹]

// 安装MongoDB
$ sudo npm install mongodb --save
// 安装会话支持
$ sudo npm install express-session --save
// 安装MongoDB连接工具
$ sudo npm install connect-mongo --save
// 安装session中信息存储工具
$sudo npm install connect-flash
```

#### 文件配置

- 在项目根目录下新建 setting.js

```javascript
module.exports = { 
  cookieSecret: 'todoApp',  // cookie加密
  db: 'TodoApp',  // 数据库名称（）
  host: 'localhost', // 数据库地址
  port: 27017 // 数据库端口
}; 
```

- 建立 models

```javascript
// 在项目根目录下新加 models文件夹
$ mkdir models

// 在models文件夹中新建db.js

var 
  settings = require('../settings'),
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});
```

通过 `new Db(settings.db, new Server(settings.host, settings.port), {safe: true});` 设置数据库名、数据库地址和数据库端口创建了一个数据库连接实例，并通过 module.exports 导出该实例

- 配置 app.js

```javascript
// 在app.js中

var setting = require('./setting');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

app.use(session({
  secret: settings.cookieSecret, // 防止篡改cookie
  key: settings.db, // cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ // store为MongoDB实例
    url: 'mongodb://localhost/TodoApp',
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));

app.use(flash());
```

#### 通过终端操作

```shell
$ cd /Users/ecmadao/MongoDB/mongoDB/bin
$ ./mongo
// 之后会展示MongoDB的Version和当前connect，一般会默认connect到test
> use TodoApp // 转到TodoApp的数据库
```



