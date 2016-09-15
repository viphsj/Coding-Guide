## learn koa2--context

> [Koa context](https://github.com/koajs/koa/blob/master/docs/api/context.md)

Koa里的`context`，即上下文，是一个封装了`response`，`request`等属性和方法的对象。每一次请求都会生产一个新的`context`。

在Koa1中，每个请求func中的`this`即使一个`context`：

```javascript
app.use(function *(){
    this; // Context
    this.request; // koa Request
    this.response; // koa Response
});
```

而在Koa2中，`context`对象直接就在回调函数里：

```javascript
app.use((ctx, next) => {
    ctx; // Context
    ctx.request; // koa Request
    ctx.response; // koa Response
})
```

### handle error

```javascript
// 监听error，自定义错误处理逻辑
app.on('error', (err) => {
  log.error('server error', err);
});
```

当 request/response 中出现任何错误且无法响应客户端时，Koa 会把 ctx 实例作为第二个参数：

```javascript
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});
```

### context.request

> [Koa request](https://github.com/koajs/koa/blob/master/docs/api/request.md)

- `request.header`/`request.headers` 请求头对象

- `request.length` 以数字（或`undefined`）的形式返回`Content-Length`
- `request.type` 获取请求的`Content-Type`

- `request.is(type)` 判断`Content-Type`是否是`is`中期待的值。如果没有 request body，返回 undefined； 如果没有 content type，或者匹配失败，返回 false； 否则返回匹配的 content-type

```javascript
// With Content-Type: text/html; charset=utf-8
request.is('html'); // => 'html'
request.is('text/html'); // => 'text/html'
request.is('text/*', 'text/html'); // => 'text/html'

// When Content-Type is application/json
request.is('json', 'urlencoded'); // => 'json'
request.is('application/json'); // => 'application/json'
request.is('html', 'application/*'); // => 'application/json'

request.is('html'); // => false
```

```javascript
// usage
if (request.is('image/*')) {
  // process
} else {
  ctx.throw(415, 'images only!');
}
```

- `request.accepts(types)`  检查给定的类型 types(s) 是否可被接受，当为 true 时返回最佳匹配，否则返回 false。参数可以是字符串或者数组

```javascript
// Accept: text/html
this.accepts('html');
// => "html"

// Accept: text/*, application/json
this.accepts('html');
// => "html"
this.accepts('text/html');
// => "text/html"
this.accepts('json', 'text');
// => "json"
this.accepts('application/json');
// => "application/json"

// Accept: text/*, application/json
this.accepts('image/png');
this.accepts('png');
// => false

// Accept: text/*;q=.5, application/json
this.accepts(['html', 'json']);
this.accepts('html', 'json');
// => "json"

// No Accept header
this.accepts('html', 'json');
// => "html"
this.accepts('json', 'html');
// => "json"
```

- `request.method` 请求方法
- `request.method=` 设置请求的方法

- `request.url` 请求的URL
- `request.url=` 设置请求的URL
- `request.path` 获取请求路径
- `request.path=` 设置请求路径（保留请求参数）

- `request.search` 获取请求的查询参数字符串，包含`?`
- `request.search=` 设置请求的查询参数字符串，不需要加`?`
- `request.querystring` 获取请求的查询参数字符串，不包含`?`
- `request.querystring=` 设置请求的查询参数字符串，需要加上`?`

- `request.query` 以对象的形式获取请求参数，不支持嵌套对象
- `request.query=` 以对象的形式设置请求参数，不支持嵌套对象

```javascript
// example
const about = async (ctx, next) => {
    const request = ctx.request;
    console.log('request query');
    console.log(request.query);
    await ctx.render('home/about', {
        title: 'about page',
        content: 'this is about page'
    });
};

// visit /about?a=1&b=2
// result:
// {a: 1, b: 2}
```

### context.response

> [Koa response](https://github.com/koajs/koa/blob/master/docs/api/response.md)

- `response.status` 响应的状态值，没有默认值
- `response.status=` 设置响应的状态值
- `response.message` 获取响应消息。默认情况下和`response.status`相关联
- `response.message=`

- `response.body` 获取响应体
- `response.body=`
    + `string` written
    + `Buffer` written
    + `Stream` piped
    + `Object` json-stringified
    + `null` no content response

- `response.get(field)` 获取 response header 中某字段的值
- `response.set(field, value)` 设置 response header 中某字段的值
- `response.set(fields)` 设置 response header 中字段的值，参数为Object

- `response.is(types...)`

- `response.redirect(url, [alt])`

### context.cookies

Koa的`cookie`处理底层是通过[`cookies`](https://github.com/pillarjs/cookies)模块来实现的。

- `ctx.cookies.set`

```javascript
ctx.cookies.set(name, value, [options])

// options
{
    maxAge, // 从 Date.now() 开始的过期时间，以毫秒作为单位
    signed, // 是否签名
    expires, // 通过 Date 表示的 cookie 过期日期
    path: "/", // cookie path
    domain, // cookie 的域
    secure, // cookie 发送方式。false 表示 cookie 通过 HTTP 协议发送，true 表示 cookie 通过 HTTPS 发送
    httpOnly: true, //  true 表示 cookie 只能通过 HTTP 协议发送
    overwrite: false // 对于重名的 cookie 是否覆盖
}
```

- `ctx.cookies.get`

```javascript
ctx.cookies.get(name, [options])

// options
{
    signed // 是否签名
}
```

```javascript
// example
router.get('/', async (ctx, next) => {
    ctx.cookies.set('username', 'ecmadao');
    await ctx.render('home/index', {
        title: 'home page',
        content: 'this is home page'
    });
});
router.get('about', async (ctx, next) => {
    console.log('ctx cookies');
    console.log(`log: ${ctx.cookies.get('username')}`);
    await ctx.render('home/about', {
        title: 'about page',
        content: 'this is about page'
    });
});

// visit /
// then visit /about
// result:
// log: ecmadao
```

### context.throw

Koa是封装了[`http-assert`](https://github.com/jshttp/http-assert)模块，来进行错误的抛出。

通过`throw`抛出一个包含`status`属性的`Error`对象。默认情况下这个`Error`的`status`为`500`：

```javascript
ctx.throw([msg], [status], [properties])

// examples
ctx.throw(403);
ctx.throw('name required', 400);
ctx.throw(400, 'name required');
ctx.throw('something exploded');
```

```javascript
ctx.throw('something exploded');
// 相当于
var err = new Error('something exploded');
err.status = 400;
throw err;
```
