## learn koa2--认证

> 本章涉及session，csrf

### session

#### `session`

- [`koa-session`](https://github.com/koajs/session)

> 基于cookie的session中间件

```bash
$ npm install koa-session
```

`koa-session`本身是基于`koa1`的中间件，因此我们还需要`koa-convert`

```bash
$ npm install koa-convert --save
```

```javascript
import Koa from 'koa';
import convert from 'koa-convert';
import session from 'koa-session';

const app = new Koa();
app.keys = ['keys'];

// session
app.use(session(app));
```

#### `generic-session`

> 使用内存进行session的储存

我们使用`mongo`作为session的储存。需要安装一下两者：

- [`koa-generic-session`](https://github.com/koajs/generic-session)
- [`koa-generic-session-mongo`](https://github.com/pavelvlasov/koa-generic-session-mongo)

```bash
$ npm install koa-generic-session koa-generic-session-mongo --save
```

同样，`koa-generic-session`本身是基于`koa1`的中间件，需要`koa-convert`

```bash
$ npm install koa-convert --save
```

```javascript
import Koa from 'koa';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import MongoStore from 'koa-generic-session-mongo';

const app = new Koa();
app.keys = ['keys'];

// session
app.use(convert(session({
  store: new MongoStore()
})));
```

#### `session`加密

注意到上面两种session在初始化的时候，都有`app.keys = ['keys'];`这句话吗？因为两者session在默认情况下都进行了加密配置（`signed`），必须用`app.keys`指定加密短语。

实际上在使用过程中，往往在生产环节下赋予`app.keys`一个独特的加密配置，对外不可见。

#### use session

举个栗子

```javascript
// ...
app.use((ctx, next) => {
  let n = ctx.session.num || 0;
  console.log(n);
  ctx.session.num = n + 1;
});
```

### csrf

> 基本上是必装插件，防止跨域挟持

- [`koa-csrf`](https://github.com/koajs/csrf)

```bash
# for koa2
$ npm install --save koa-csrf@3.x
```

```javascript
import Koa from 'koa';
import csrf from 'koa-csrf';

const app = new Koa();

// init csrf
app.use(convert(new csrf()));

// usage
app.use(async (ctx, next) => {
  await ctx.render('home/index', {
    title: 'home page',
    content: 'this is home page',
    csrf: ctx.csrf
  });
});
```

在模板中：

```html
<form action="/register" method="POST">
  <input type="hidden" name="_csrf" value="<%= csrf %>" />
  <input type="email" name="email" placeholder="Email" />
  <input type="password" name="password" placeholder="Password" />
  <button type="submit">Register</button>
</form>
```
