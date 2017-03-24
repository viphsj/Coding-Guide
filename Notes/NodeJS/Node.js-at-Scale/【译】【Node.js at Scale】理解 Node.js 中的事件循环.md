<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译】【Node.js at Scale】理解 Node.js 中的事件循环](#%E8%AF%91nodejs-at-scale%E7%90%86%E8%A7%A3-nodejs-%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)
  - [问题起源](#%E9%97%AE%E9%A2%98%E8%B5%B7%E6%BA%90)
  - [解决方案](#%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [堆栈](#%E5%A0%86%E6%A0%88)
  - [Node.js 的事件循环](#nodejs-%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)
    - [任务队列](#%E4%BB%BB%E5%8A%A1%E9%98%9F%E5%88%97)
    - [微任务（Microtasks） 和宏任务（Macrotasks）](#%E5%BE%AE%E4%BB%BB%E5%8A%A1microtasks-%E5%92%8C%E5%AE%8F%E4%BB%BB%E5%8A%A1macrotasks)
  - [驯服异步怪兽](#%E9%A9%AF%E6%9C%8D%E5%BC%82%E6%AD%A5%E6%80%AA%E5%85%BD)
    - [最后一点建议](#%E6%9C%80%E5%90%8E%E4%B8%80%E7%82%B9%E5%BB%BA%E8%AE%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 【译】【Node.js at Scale】理解 Node.js 中的事件循环

> 原文链接：[Understanding the Node.js Event Loop - Node.js at Scale](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)

### 问题起源

大多数网站的后台都不会进行复杂的运算。我们的程序在大部分时间里都在等待对磁盘进行读写，或者是接收信息并返回结果。

IO 操作与数据处理相比，要慢上好几个等级。举个例子，SSD 的读取速度可以达到 200 ~ 730 MB/s，读取一千字节的数据只需耗费 1.4 微妙，但在这期间，一个 2 千兆赫的 CPU 可以执行 28000 次指令操作周期。

至于网络通讯方面，表现的就更糟了。ping 一下 google.com 试试：

```bash
$ ping google.com
64 bytes from 172.217.16.174: icmp_seq=0 ttl=52 time=33.017 ms  
64 bytes from 172.217.16.174: icmp_seq=1 ttl=52 time=83.376 ms  
64 bytes from 172.217.16.174: icmp_seq=2 ttl=52 time=26.552 ms  
64 bytes from 172.217.16.174: icmp_seq=3 ttl=52 time=40.153 ms  
64 bytes from 172.217.16.174: icmp_seq=4 ttl=52 time=37.291 ms  
64 bytes from 172.217.16.174: icmp_seq=5 ttl=52 time=58.692 ms  
64 bytes from 172.217.16.174: icmp_seq=6 ttl=52 time=45.245 ms  
64 bytes from 172.217.16.174: icmp_seq=7 ttl=52 time=27.846 ms  
```

平均延迟是 44 毫秒。在这段时间里，上面提到的那个处理器可以操作 8 千 8 百万次操作周期。

### 解决方案

一些操作系统提供了某种异步的 IO 接口，使你可以不依赖于通讯结果的传输数据，同时通讯也会同步进行。

这种效果可以通过几种方案实现。目前最常见的解决方案是，以提高软件复杂度为代价，利用多线程进行同步操作。比如，在 Java 或者 Python 里读取一个文件是一个阻塞操作，当程序在等待网络请求 / 磁盘读写结束时，无法进行其他操作。为了应对这种情况，你只能创建一个子线程，并在操作结束之后通知主线程 —— 至少在 Java 中是这样。

这种方式乏味并复杂，但至少可以完成任务。但在 Node 中会怎么样呢？可以肯定的是，在 Node.js —— 比如 V8 —— 中会遇见问题：它是单线程的，代码只能跑在一个线程上。

你可能已经知道，在浏览器中，`setTimeout(someFunction, 0)` 有神奇的异步效果。但为什么将延迟设置为 0，让 `someFunction` 延迟 0 毫秒执行就可以达到异步的效果？难道不是立即执行吗？确实不是这样。

想要理解这个现象，首先要学习一下 ”调用栈“，或者简单的称之为 "堆栈"。我会尽量讲的简单一些，只要能够理解它的基本概念就行了。

### 堆栈

当你调用函数时，它返回结果时所处的地址、参数、局部变量都会入栈。如果你在当前执行的函数内再调用一个函数时，它的环境变量以及返回结果时所处的地址会被入栈到当前执行函数的上方。

看一眼代码：

```javascript
 1 function main () {
 2   const hypotenuse = getLengthOfHypotenuse(3, 4)
 3   console.log(hypotenuse)
 4 }
 5
 6 function getLengthOfHypotenuse(a, b) {
 7   const squareA = square(a)
 8   const squareB = square(b)
 9   const sumOfSquares = squareA + squareB
10   return Math.sqrt(sumOfSquares)  
11 }  
12  
13 function square(number) {  
14   return number * number  
15 }  
16  
17 main()  
```

首先调用 `main()` 函数：

![the-main-function](https://blog-assets.risingstack.com/2016/10/the-main-function.png)

在 `main` 函数内以 3、4 作为参数，调用了 `getLengthOfHypotenuse` 函数：

![The-getLengthOfHypotenuse-function](https://blog-assets.risingstack.com/2016/10/The-getLengthOfHypotenuse-function.png)

再往后以 a 为参数调用 `square`：

![The-square-a--function-1](https://blog-assets.risingstack.com/2016/10/The-square-a--function-1.png)

当 `square` 函数返回后就出栈，并将返回结果赋给 `squareA`。`squareA` 加入到 `getLengthOfHypotenuse` 的调用栈中：

![variable_a](https://blog-assets.risingstack.com/2016/10/variable_a.png)

之后继续调用 `square` 函数：

![The-square-b-function-1-1](https://blog-assets.risingstack.com/2016/11/The-square-b-function-1-1.png)

![variable_b](https://blog-assets.risingstack.com/2016/10/variable_b.png)

在下一行表达式内计算 `squareA + squareB`：

![sumOfSqaures](https://blog-assets.risingstack.com/2016/10/sumOfSqaures.png)

最后以 `sumOfSquares` 作为参数，调用 `Math.sqrt` 方法：

![Math.sqrt](https://blog-assets.risingstack.com/2016/10/Math.sqrt.png)

最后返回 `getLengthOfHypotenuse` 的结果：

![The-return-function](https://blog-assets.risingstack.com/2016/10/The-return-function.png)

返回值在 `main` 函数内赋给 `hypotenuse` 变量：

![hypotenuse](https://blog-assets.risingstack.com/2016/10/hypotenuse.png)

`hypotenuse` 在 console 中输出：

![console-log](https://blog-assets.risingstack.com/2016/10/console-log.png)

最终，`main` 函数执行完毕，并且没有返回值，调用栈被清空：

![finally](https://blog-assets.risingstack.com/2016/10/finally.png)

> 注：在上面的分析里，当函数执行完毕时，对应的局部变量也一同从栈中去除了。但这只有使用简单类型的变量时才会发生，比如 Number, String, Boolean。而对象、数组或者比较深层的数据结构时，你的变量仅仅只是指向了它们，当你传递这样的变量时，实际上传递的是指针，这使得这些数据在不同的堆栈中是可变的。当函数出栈时，也只是指针出栈，而实际值则继续保留。而垃圾回收机制就是用于处理这些没用的对象的。

### Node.js 的事件循环

他喵的我不是说这种循环：

![cat-node-js-event-loop](https://blog-assets.risingstack.com/2017/01/cat-node-js-event-loop-.gif)

当我们调用诸如 `setTimeout`、`http.get`、`process.nextTick` 或者 `fs.readFile` 方法时发生了什么？这些代码并不在 V8 引擎里，但借助 Node.js，可以通过 Chrome WebApi 和 C++ API 来调用他们。为了理解它们，我们先要更好的理解代码的执行顺序。

来看一眼最普通的 Node.js 应用 —— 一个监听 `localhost:3000/` 的 server。当收到请求后，server 会调用 `wttr.in/<city>` 来获取天气数据，并在 console 中打印信息，最后将结果返回。

```javascript
'use strict'  
const express = require('express')  
const superagent = require('superagent')  
const app = express()

app.get('/', sendWeatherOfRandomCity)

function sendWeatherOfRandomCity (request, response) {  
  getWeatherOfRandomCity(request, response)
  sayHi()
}

const CITIES = [  
  'london',
  'newyork',
  'paris',
  'budapest',
  'warsaw',
  'rome',
  'madrid',
  'moscow',
  'beijing',
  'capetown',
]

function getWeatherOfRandomCity (request, response) {  
  const city = CITIES[Math.floor(Math.random() * CITIES.length)]
  superagent.get(`wttr.in/${city}`)
    .end((err, res) => {
      if (err) {
        console.log('O snap')
        return response.status(500).send('There was an error getting the weather, try looking out the window')
      }
      const responseText = res.text
      response.send(responseText)
      console.log('Got the weather')
    })

  console.log('Fetching the weather, please be patient')
}

function sayHi () {  
  console.log('Hi')
}

app.listen(3000)
```

那么当我们访问 `localhost:3000` 的时候 console 会打印什么？如果你了解 Node.js，那么肯定知道，尽管在代码里 `console.log('Fetching the weather, please be patient')` 比 `console.log('Got the weather')` 后执行，但输出结果会是这样的：

```bash
Fetching the weather, please be patient  
Hi  
Got the weather
```

为毛？尽管 V8 是单线程的，但其底层的 C++ 不是。这意味着当我们执行一个非阻塞操作时，Node 会同时（在一个隐藏的线程里）调用一些代码，和我们的 JavaScript 一起执行。一旦这个隐藏的线程收到了返回值或者抛出错误，之前定义好的回调就会以这些结果为参数来执行。

> 注："调用一些代码"，这些代码实际上是 [libuv](https://github.com/libuv/libuv) 的一部分。libuv 是一个处理线程池的开源库，专门为异步任务服务。它最初是为 Node.js 开发的，后来也被用到了[其他项目](https://github.com/libuv/libuv/wiki/Projects-that-use-libuv)里。

为了解开这层面纱，我们先要介绍两个概念：事件循环（event loop）和任务队列（task queue）

#### 任务队列

JavaScript 是一门单线程的、事件驱动的语言。这意味着我们可以给事件绑定监听者，当事件被触发时，监听者也会调用回调函数。

当你调用 `setTimeout`、`http.get`、`fs.readFile` 等方法时，Node.js 为了能够让 V8 持续的执行它们，需要把这些操作转移到不同的线程，并且在执行结束后调用回调函数。这些回调函数和其他函数就组成了任务执行队列。只有通过这种方式，我们才能够在读取文件的同时处理 server 的请求，并保证进程不被阻塞。

但我们只有一个主线程和一个调用栈，因此，如果在文件读取完毕之后有其他请求占用了线程的堆栈，那么回调函数只有等待栈清空之后才会执行。回调函数等待被执行的情况叫做任务队列（task queue，或者 event queue，也叫作 message queue）。当主线程结束了操作以后，回调函数在一个无限循环的队列中被调用，因此被叫做事件循环（event loop）

在上一个例子里：

1. express 注册了对 `request` 事件的相应，用于处理针对 `/` 路由的请求
2. 监听 3000 端口
3. 堆栈为空，等待 `request` 事件被触发
4. 收到请求，express 触发请求处理函数 `sendWeatherOfRandomCity`
5. `sendWeatherOfRandomCity` 入栈
6. `getWeatherOfRandomCity` 被调用并入栈
7. `Math.floor`、`Math.random` 被调用，入栈并执行结束后出栈
8. `superagent.get` 以 `'wttr.in/${city}'` 为参数执行，回调函数绑定在了 `end` 事件上
9. 针对 `http://wttr.in/${city}` 的网络请求被送至后台线程，并不阻塞的持续执行
10. `Fetching the weather, please be patient` 被 console 打印，`getWeatherOfRandomCity` 返回执行结果
11. `sayHi` 函数被执行，`Hi` 将打印在 console 上
12. `sendWeatherOfRandomCity` 执行完毕并返回结果，然后出栈
13. 等待 `http://wttr.in/${city}` 发送结果
14. 一旦受到相应的结果，`end` 事件就会被触发
15. `end` 的回调函数被触发，并以闭包形式堆栈。这意味着我们可以操作 express、superagent、app、CITIES、request、response、city 等变量以及其他定义过的函数
16. `response.send()` 以 `200` 或者 `500` 状态码执行。同样的，是在一个后台线程执行的，这样的话就不会阻塞主线程。

现在，我们就可以知道为什么 `setTimeout` 可以那样执行了。哪怕我们把计时器设置为 0 毫秒，它也会等到任务队列为空（前面没有其他任务）时才执行，让浏览器绘制 UI，或者 Node 相应其他请求。

#### 微任务（Microtasks） 和宏任务（Macrotasks）

实际上，我们有不止一种任务队列。一个是 microtasks，另一个是 macrotasks

microtasks 的例子：

- `process.nextTick`
- `promises`
- `Object.observe`

macrotasks 的例子：

- `setTimeout`
- `setInterval`
- `setImmediate`
- `I/O`

上代码：

```javascript
console.log('script start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
        clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {  
  console.log('promise 1')
}).then(() => {
  console.log('promise 2')
})
```

输出如下：

```bash
script start  
promise1  
promise2  
setInterval  
setTimeout1  
promise3  
promise4  
setInterval  
setTimeout2  
setInterval  
promise5  
promise6
```

根据 [WHATVG](https://zh.wikipedia.org/wiki/%E7%B6%B2%E9%A0%81%E8%B6%85%E6%96%87%E6%9C%AC%E6%87%89%E7%94%A8%E6%8A%80%E8%A1%93%E5%B7%A5%E4%BD%9C%E5%B0%8F%E7%B5%84) 规范，在事件循环的一个周期中，应该从宏任务队列中处理正好一个（宏）任务。在所述宏任务完成之后，所有可用的微任务将在相同的周期内被处理。当这些微任务正在被处理时，它们可以入队更多的微任务，这些微任务将一个接一个地运行，直到微任务队列耗尽。

用图表示更清晰：

![the-Node-js-event-loop](https://blog-assets.risingstack.com/2016/10/the-Node-js-event-loop.png)

在例子里：

**周期1：**

1. `setInterval` 被规划为一个任务
2. `setTimeout 1` 被规划为一个任务
3. `Promise.resolve 1` 里的 `then` 方法被规划为一个微任务
4. 堆栈空了以后微任务开始执行

任务队列：`setInterval`，`setTimeout 1`

**周期2：**

5. 微任务队列为空，`setInteval` 的处理回调函数被执行，而另外一个 `setInteval` 为规划为一个任务，并放置到 `setTimeout 1` 之后

任务队列：`setTimeout 1`，`setInterval`

**周期3：**

6. 微任务队列为空，`setTimeout 1` 的回调处理函数被执行，同时 `promise 3` 和 `promise 4` 被规划为微任务
7. `promise 3` 和 `promise 4` 的处理函数被执行，`setTimeout 2` 被标记为任务

任务队列：`setInterval`，`setTimeout 2`

**周期4：**

8. 微任务队列为空，`setInteval` 的处理函数被执行，另一个 `setInteval` 被标记为任务，并放置到 `setTimeout` 之后

任务队列：`setTimeout 2`，`setInteval`

9. `setTimeout 2` 的回调函数被执行，`promise 5` 和 `promise 6` 被标记为微任务

现在，`promise 5` 和 `promise 6` 的回调函数被执行，并清除 interval。然由于一些奇怪的原因，`setInterval` 又一次被执行。但如果在 Chrome 下执行则可以得到期望的结果。

在 Node 中我们可以通过 `process.nextTick` 解决这个问题（并得到一个回调地狱！）

```javascript
console.log('script start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  process.nextTick(() => {
    console.log('nextTick 3')
    process.nextTick(() => {
      console.log('nextTick 4')
      setTimeout(() => {
        console.log('setTimeout 2')
        process.nextTick(() => {
          console.log('nextTick 5')
          process.nextTick(() => {
            console.log('nextTick 6')
            clearInterval(interval)
          })
        })
      }, 0)
    })
  })
})

process.nextTick(() => {  
  console.log('nextTick 1')
  process.nextTick(() => {
    console.log('nextTick 2')
  })
})
```

除了丑的可怕以外，上面这段代码可以达到和 `Promise` 一样的效果，至少它按照我们的预期工作了。

### 驯服异步怪兽

如上所述，当我们使用 Node.js 编写应用时，如果希望利用它的所有功能，并保证任务不会阻塞主线程，我们要管理并且注意任务队列以及事件循环。

事件循环一开始可能难以掌握，但一旦你可以熟练应对以后就再也离不开了。连续的回调会造成回调地狱，不过好在我们有 Promise，不就之后也会有 async-await（译者注：目前 ES7 中已经可以使用，并通过 Babel 编译为 ES5 ）。在这期间，我们可以使用 [co](https://github.com/tj/co) 或者 [koa](http://koajs.com/)

#### 最后一点建议

在了解了 Node.js 和 V8 如何处理长时间运行的任务以后，你可以更好的处理类似的情况。可能之前你已经听说过，应该将长时间运行的循环发送到任务队列。现在，你可以自己手动处理它们，或直接使用 [async.js](http://caolan.github.io/async/)。

Happy coding!