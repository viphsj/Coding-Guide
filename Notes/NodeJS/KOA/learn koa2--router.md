<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [learn koa2--router](#learn-koa2--router)
  - [给Koa2增加路由功能](#%E7%BB%99koa2%E5%A2%9E%E5%8A%A0%E8%B7%AF%E7%94%B1%E5%8A%9F%E8%83%BD)
  - [扩展：`koa-router`的使用](#%E6%89%A9%E5%B1%95%EF%BC%9Akoa-router%E7%9A%84%E4%BD%BF%E7%94%A8)
    - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
    - [路由的`get|put|post|patch|delete`方法](#%E8%B7%AF%E7%94%B1%E7%9A%84getputpostpatchdelete%E6%96%B9%E6%B3%95)
    - [动态路由](#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)
    - [使用middleware](#%E4%BD%BF%E7%94%A8middleware)
    - [路由嵌套](#%E8%B7%AF%E7%94%B1%E5%B5%8C%E5%A5%97)
    - [指定前缀](#%E6%8C%87%E5%AE%9A%E5%89%8D%E7%BC%80)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## learn koa2--router

### 给Koa2增加路由功能

鉴于Koa的轻量级设计，其自身并没有提供route的功能，而需要我们自己去安装[koa-router](https://github.com/alexmingoia/koa-router)组件：

```bash
# 针对Koa2
$ npm install koa-router@next --save
```

```javascript
// app/app.js
import Koa from 'koa';
import koaRouter from 'koa-router';
const app = new Koa();
const router = koaRouter();

router.get('/about', (ctx, next) => {
    ctx.body = "this is the about page";
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7000);

export default app;
```

然后正常启动项目，进入`localhost:7000/about`，就能看见也页面上加载的`this is the about page`了。

`koa-router`的更多使用方法，可以参考[`官方文档`](https://github.com/alexmingoia/koa-router/tree/master/)

当路由增多的时候，我们不可能把它们全部放在`app.js`这个文件中，而是应该新建一个`router.js`文件或者`routes`文件夹。我更推荐使用文件夹的形式，那样的话，不同的路由可以根据各个文件来进行分类，更加便于管理：

```bash
- app
    - routes
        home.js
        articles.js
        # ...
        index.js
```

编写`home.js`：

```javascript
// app/routes/home.js
import koaRouter from 'koa-router';

const router = koaRouter({
  prefix: '/'
});
router.get('/', (ctx, next) => {
  ctx.body = 'home page';
});
router.get('about', (ctx, next) => {
  ctx.body = 'about page';
});

module.exports = router;
```

解释下`prefix`：

路由的前缀。在这个文件里使用的router，在生成时带有参数`{prefix: '/'}`，说明该文件里定义的路由都必须是以`/`开头的，例如说`/`，`/about`，`/articles`等。因为一个文件里只定义一个`prefix`，所以便于之后进行管理。

而对于`articles.js`：

```javascript
// app/routes/articles.js
import koaRouter from 'koa-router';

const router = koaRouter({
  prefix: '/articles'
});
// 路由/articles必须定义在含有{prefix: '/articles'}的路由文件里
router.get('/', (ctx, next) => {
  ctx.body = 'articles page';
});
router.get('/:id/author', (ctx, next) => {
  ctx.body = 'article author page';
});
router.get('/:id/info', (ctx, next) => {
  ctx.body = 'article info page';
});

module.exports = router;
```

上面文件里定义的路由有：

- `/articles`
- `/articles/`
- `/articles/:id/author`
- `/articles/:id/info`

此时进入`localhost:7000/articles`页面，可以看见`articles page`，并且进入类似`localhost:7000/articles/1/author`这样的页面则也能获取到对应的`article author page`

最后，来看一下如何在`index.js`便捷的获取到所有路由：

```javascript
// app/routes/index.js
import fs from 'fs';
import path from 'path';
import koaRouter from 'koa-router';
const router = koaRouter();

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) && (file.split('.').slice(-1)[0] === 'js') && file !== 'index.js'
  )
  .forEach(file => {
    console.log(file);
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

export default router;
```

### 扩展：`koa-router`的使用

#### 基本使用

```javascript
// 基本使用
import Koa from 'koa';
import koaRouter from 'koa-router';

const router = koaRouter();
const app = new Koa();

router.get('/', (ctx, next) => {
  // ...
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

#### 路由的`get|put|post|patch|delete`方法

```javascript
// 直接通过router.xxx方法即可，可以线性链接各方法
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello Koa';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  });
```

#### 动态路由

```javascript
router.get('/:category/:title', (ctx, next) => {
  console.log(ctx.params);
});
```

```javascript
// get: /programming/how-to-node
// -->
// log: { category: 'programming', title: 'how-to-node' }
```

#### 使用middleware

```javascript
router.get(
  '/users/:id',
  (ctx, next) => {
    return User.findOne(ctx.params.id).then((user) => {
      ctx.user = user;
      return next();
    });
  },
  (ctx) => {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```

#### 路由嵌套

```javascript
const forums = new Router();
const posts = new Router();

posts.get('/', (ctx, next) => {...});
posts.get('/:pid', (ctx, next) => {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// 相当于posts接收的`/`和`/:pid`都嵌套到forums内
// 这样处理之后，app可以相应类似"/forums/123/posts"或者"/forums/123/posts/123"
app.use(forums.routes());
```

#### 指定前缀

```javascript
var router = new Router({
  prefix: '/users'
});

router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```

