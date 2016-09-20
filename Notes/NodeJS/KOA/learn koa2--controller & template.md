<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [learn koa2--controller & template](#learn-koa2--controller-&-template)
  - [controller](#controller)
  - [template](#template)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## learn koa2--controller & template

### controller

在关于路由的那一篇里，将路由的处理放在了`app/routes/`下的各个文件里，并在`app/routes/index.js`中引用全部进行处理。

但即便是这样，现有的方式也是不妥的。它把路由URL的判断和对应的处理混杂在了一起。因此，我们应该把路由的处理提取出来，作为额外的`controller`层：

```javascript
// app/controllers/home.js
const home = (ctx, next) => {
  ctx.body = 'this is home page';
};

const about = (ctx, next) => {
  ctx.body = 'this is about page';
};

export default {
  home,
  about
};
```

```javascript
// app/routes/home.js
import koaRouter from 'koa-router';
import home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});
router.get('/', home.home);
router.get('/about', home.about);

module.exports = router;
```

That's All. Done.

### template

寻找了很多模板，最终决定使用`nunjucks`来做Koa2的模板：

1. `mozilla`出品，品质和维护起来有保障
2. 语法和文档都挺清晰
3. 类似于原生html，学习成本低

为什么不用[`pug`](https://github.com/pugjs/pug)？

- 从事前端工作的我表示不是很喜欢`pug`的语法

```bash
$ npm install nunjucks --save
# 为了能够让koa渲染
$ npm install koa-views --save
```

为模板准备的目录结构：

```bash
- app
    + controllers
    + routes
    - templates
        - home
            index.html
            about.html
        - layouts
            base.html
    app.js
```

随便写下模板文件：

```html
<!-- templates/layouts/base.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
  </head>
  <body>
    {% block body %}
    {% endblock %}
  </body>
</html>
```

```html
<!-- templates/home/index.html -->
{% extends "layouts/base.html" %}

{% block body %}
  <h1>{{ content }}</h1>
{% endblock %}
```

```html
<!-- templates/home/about.html -->
{% extends "layouts/base.html" %}

{% block body %}
  <h1>{{ content }}</h1>
{% endblock %}
```

在`app/app.js`中为使用`nunjucks`进行配置：

```javascript
import Koa from 'koa';
import nunjucks from 'nunjucks';
import views from 'koa-views';
import router from './routes/index';

const app = new Koa();

// 配置nunjucks模板文件所在的路径，否则模板继承时无法使用相对路径
nunjucks.configure(__dirname + '/templates', { autoescape: true });

app.use(views(__dirname + '/templates', {
  map: {
    html: 'nunjucks'
  }
}));

app.use(router.routes(), router.allowedMethods());
app.listen(7000);
export default app;
```

最后，修改controller，来返回我们的模板：

```javascript
const home = async (ctx, next) => {
  await ctx.render('home/index', {
    title: 'home page',
    content: 'this is home page'
  });
};

const about = async (ctx, next) => {
  await ctx.render('home/about', {
    title: 'about page',
    content: 'this is about page'
  });
};

export default {
  home,
  about
};
```

That's All. Done.