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

### request

### response

### cookies

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

### throw

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
