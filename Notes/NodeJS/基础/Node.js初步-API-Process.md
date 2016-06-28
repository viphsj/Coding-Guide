<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Node.js初步 - API - Process](#nodejs%E5%88%9D%E6%AD%A5---api---process)
  - [Process API](#process-api)
    - [cwd](#cwd)
    - [chdir](#chdir)
    - [stdout & stderr & stdin](#stdout-&-stderr-&-stdin)
    - [exit](#exit)
    - [memoryUsage](#memoryusage)
    - [nextTick](#nexttick)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Node.js初步 - API - Process

> The process object is a global object and can be accessed from anywhere. It is an instance of EventEmitter
> 
> process对象是一个全局对象，可以在任何地方访问到它。 它是EventEmitter的一个实例

### Process API

#### cwd

```js
process.cwd();
```
> 查看应用程序当前目录

```js
console.log(`Current directory: ${process.cwd()}`);
```

#### chdir

```js
process.chdir(directory);
```

> 改变应用的当前目录，失败时报错，通过try/catch捕获

```js
console.log(`Starting directory: ${process.cwd()}`);
try {
  process.chdir('/tmp');
  console.log(`New directory: ${process.cwd()}`);
}
catch (err) {
  console.log(`chdir: ${err}`);
}
```

#### stdout & stderr & stdin


> `process.stdout.write()`
> 
> 标准输出流
> 
> console.log 已封装该方法
> 
> 可以通过stdout注册事件监听

```js
// 设置流编码
process.stdout.setEncoding('utf8');

console.log = function(d){
    process.stdout.write(d+'\n');
}
```

```js
// 注册监听事件
process.stdout.on('data',function(data){
   console.log(data);
});
```

> `process.stderr.write()`
> 
> 标准错误流，捕获错误信息

```js
// 设置流编码
process.stderr.setEncoding('utf8');
```

> `process.stdin` 进程的输入流
> 
> 可以通过注册事件的方式来获取输入的内容

```js
// 设置流编码
process.stdin.setEncoding('utf8');

// 打开标准输入流，并监听两个事件
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
```

#### exit

```js
process.exit([code])
```

> 杀死进程，退出程序
> 
> 参数code为退出后返回的代码，如果省略则默认返回0

#### memoryUsage

```js
process.memoryUsage()
```

> 返回一个对象，它描述了Node进程的内存使用情况
> 
> 单位是bytes

```js
console.log(util.inspect(process.memoryUsage())); 

// 输出
{ 
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472 
}
```

#### nextTick

```js
process.nextTick(callback[, arg][, ...]);
```
> 在事件循环的下一次循环中调用 callback 回调函数
> 
> 该函数能在任何 I/O 事件 (including timers) 之前调用 callback
> 
> 比 `setTimeout(fn, 0)` 更高效

```js
console.log('start');
process.nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');
// Output:
// start
// scheduled
// nextTick callback
```
> 这个函数对于想要在*对象创建*后而*I/O操作*发生之前，执行某些操作来说非常重要

```js
function MyThing(options) {
  this.setupOptions(options);

  process.nextTick(() => {
    this.startDoingStuff();
  });
}

var thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() gets called now, not before.
```
> 必须保证函数一定是同步执行或者一定是异步执行

```js
// WARNING!  DO NOT USE!  BAD UNSAFE HAZARD!
function maybeSync(arg, cb) {
  if (arg) {
    cb();
    return;
  }

  fs.stat('file', cb);
}
```
这样做很危险，因为当你这样做的时候：

```js
maybeSync(true, () => {
  foo();
});
bar();
```
并不知道`foo()`还是`bar()`哪个先被调用。如果能够确定是否100%异步或同步的话就没问题：

```js
function definitelyAsync(arg, cb) {
  if (arg) {
    process.nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
```

> `nextTick` 的队列会在完全执行完毕之后才调用 I/O 操作
> 
> 因此，递归设置 `nextTick` 的回调就像一个 `while(true);` 循环一样，将会阻止任何`I/O操作`的发生