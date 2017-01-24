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

