## learn koa2--context

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
