<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Articles](#articles)
  - [Node.js](#nodejs)
    - [模块](#%E6%A8%A1%E5%9D%97)
    - [进程/线程](#%E8%BF%9B%E7%A8%8B%E7%BA%BF%E7%A8%8B)
    - [事件循环](#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)
    - [**V8**](#v8)
    - [其他](#%E5%85%B6%E4%BB%96)
  - [JavaScript](#javascript)
    - [基础](#%E5%9F%BA%E7%A1%80)
    - [**How JavaScript works**](#how-javascript-works)
    - [Promise](#promise)
    - [前端](#%E5%89%8D%E7%AB%AF)
    - [其他](#%E5%85%B6%E4%BB%96-1)
  - [Redis](#redis)
    - [知识点](#%E7%9F%A5%E8%AF%86%E7%82%B9)
    - [其他](#%E5%85%B6%E4%BB%96-2)
  - [计算机](#%E8%AE%A1%E7%AE%97%E6%9C%BA)
  - [计算机网络](#%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C)
    - [TCP/UDP](#tcpudp)
    - [HTTPS](#https)
    - [SSH](#ssh)
    - [DNS/CDN](#dnscdn)
    - [网络攻击](#%E7%BD%91%E7%BB%9C%E6%94%BB%E5%87%BB)
  - [算法和数据结构](#%E7%AE%97%E6%B3%95%E5%92%8C%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
    - [算法](#%E7%AE%97%E6%B3%95)
    - [难点](#%E9%9A%BE%E7%82%B9)
    - [数据结构](#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
  - [架构](#%E6%9E%B6%E6%9E%84)
    - [消息队列](#%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97)
    - [微服务](#%E5%BE%AE%E6%9C%8D%E5%8A%A1)
  - [运维](#%E8%BF%90%E7%BB%B4)
  - [其他](#%E5%85%B6%E4%BB%96-3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Articles

### Node.js

#### 模块

- [深入学习 Node.js Module](https://semlinker.com/node-module/)
- [Node.js 中的循环依赖](https://cnodejs.org/topic/567104f61d2912ce2a35aa88)
- [浅析 NodeJs 的几种文件路径](https://github.com/imsobear/blog/issues/48)
- [Node.js module.exports vs. exports](https://www.freecodecamp.org/news/node-js-module-exports-vs-exports-ec7e254d63ac/)
- [module.exports vs exports in Node.js](https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js)

#### 进程/线程

- [浅析 Node 进程与线程](https://juejin.im/post/5e0728ce518825122b0f99f2)
- [NodeJS 充分利用多核 CPU 以及它的稳定性](https://segmentfault.com/a/1190000007343993)
- [当我们谈论 cluster 时我们在谈论什么](https://github.com/hustxiaoc/node.js/issues/11)
- [NodeJS 多进程](https://segmentfault.com/a/1190000004621734)
- [Node.js 软肋之 CPU 密集型任务](https://www.infoq.cn/article/nodejs-weakness-cpu-intensive-tasks/)
- [[转] Node.js 的线程和进程详解](https://github.com/xiongwilee/blog/issues/9)

#### 事件循环

事件循环/任务调度

- [The JavaScript Event Loop: Explained](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/)
- [Concurrency model and the event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [【译】【Node.js at Scale】理解 Node.js 中的事件循环](./Node.js-at-Scale/)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

setTimeout 问题

- [Difference between setTimeout(fn, 0) and setTimeout(fn, 1)?](https://stackoverflow.com/questions/8341803/difference-between-settimeoutfn-0-and-settimeoutfn-1)
- [Why is setTimeout(fn, 0) sometimes useful?](https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful)

#### **V8**

- [Speeding up spread elements](https://v8.dev/blog/spread-elements)
- [Fast async](https://v8.dev/blog/fast-async)
- [V8 引擎的垃圾回收策略](https://www.cnblogs.com/onepixel/p/7422820.html)
- [【译】【Node.js at Scale】Node.js 的垃圾回收机制](./Node.js-at-Scale/)

#### 其他

- [Node.js Interview Questions and Answers !?](https://blog.risingstack.com/node-js-interview-questions-and-answers-2017/)
- [深入学习 Node.js EventEmitter](https://semlinker.com/node-event-emitter/)
- [深入理解 Node.js：核心思想与源码分析](https://github.com/yjhjstz/deep-into-node)

### JavaScript

- [The Modern JavaScript Tutorial](https://javascript.info/)
- [Getting creative with the Console API!](https://areknawo.com/getting-creative-with-the-console-api/)

#### 基础

> 数据类型，原型/原型链

- [细说 JavaScript 七种数据类型](https://www.cnblogs.com/onepixel/p/5140944.html)
- [JavaScript 中的四舍五入](https://www.cnblogs.com/onepixel/p/5141566.html)
- [认识原型对象和原型链](https://www.cnblogs.com/onepixel/p/5024903.html)
- [函数作用域和作用域链](https://www.cnblogs.com/onepixel/p/5036369.html)
- [你不知道的 JavaScript](../JavaScript/你不知道的JavaScript)

> Map, WeakMap

- [Difference between Map and WeakMap in JavaScript](https://www.mattzeunert.com/2017/01/31/weak-maps.html)
- [What are the actual uses of ES6 WeakMap?](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)
- [带键的集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Keyed_collections)

> 判断操作

- [详解 undefined 与 null 的区别](https://www.cnblogs.com/onepixel/p/7337248.html)
- [Why `null >= 0 && null <= 0` but not `null == 0`?](https://stackoverflow.com/questions/2910495/why-null-0-null-0-but-not-null-0)
- [JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

#### **How JavaScript works**

1. [How JavaScript works: An overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
2. [How JavaScript works: Inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
3. [How JavaScript works: Memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)
4. [How JavaScript works: Event loop and the rise of Async programming + 5 ways to better coding with async/await](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
5. [How JavaScript works: Storage engines + how to choose the proper storage API](https://blog.sessionstack.com/how-javascript-works-storage-engines-how-to-choose-the-proper-storage-api-da50879ef576)

#### Promise

- [JavaScript Promise 迷你书（中文版）](http://liubin.org/promises-book/)
- [大白话讲解 Promise](https://www.cnblogs.com/lvdabao/p/es6-promise-1.html)
- [How do Promises Work?](https://robotlolita.me/articles/2015/how-do-promises-work/)

#### 前端

- [前端高性能动画最佳实践](https://mp.weixin.qq.com/s?__biz=MjM5Njc0MjIwMA==&mid=401923510&idx=1&sn=daddf02e41981b5fc7d3eb62d9c3d891&scene=0#wechat_redirect)
- [前端工程与性能优化](https://github.com/fouber/blog/issues/3)
- [Should I use shouldComponentUpdate?](http://jamesknelson.com/should-i-use-shouldcomponentupdate/)
- [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc)
- 事件冒泡 和 事件捕获
  - [https://juejin.im/post/5cc941436fb9a03236394027](https://juejin.im/post/5cc941436fb9a03236394027)
  - [https://segmentfault.com/a/1190000012729080](https://segmentfault.com/a/1190000012729080)

#### 其他

- [4 类 JavaScript 内存泄露及如何避免](https://juejin.im/entry/5742dc3471cfe4006c4e6c45/view)
- [开开心心做几道 JavaScript 机试题](https://segmentfault.com/a/1190000005828394)
- [44个 Javascript 变态题解析 (上\下)](http://ourjs.com/detail/5761040488feaf2d031d2526?utm_source=tuicool&utm_medium=referral)
- [20个 Js 变态题解析](https://segmentfault.com/a/1190000005988554)
- [JavaScript 数组乱序 - 洗牌问题](https://github.com/lessfish/underscore-analysis/issues/15)
- [十几道含答案的大厂面试题总结](https://juejin.im/post/5e096d63e51d4558381e9906)

- deepcopy 实现
  - [What is the most efficient way to deep clone an object in JavaScript?](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)
  - [lodash.cloneDeep](https://github.com/lodash/https://github.com/lodash/lodash/blob/master/cloneDeep.js)
  - [deepcopy.js](https://github.com/sasaplus1/deepcopy.js)
- Immutable.js
  - [为什么用 Immutable.js 代替普通 js 对象？](https://zhuanlan.zhihu.com/p/29983598)
  - [facebook immutable.js 意义何在，使用场景？](https://www.zhihu.com/question/28016223)
  - [为什么需要 Immutable.js](http://zhenhua-lee.github.io/react/Immutable.html)

```javascript
JSON.parse(JSON.stringify(obj)) // hack
// Issues with Date() when using JSON.stringify() and JSON.parse()
// https://stackoverflow.com/questions/11491938/issues-with-date-when-using-json-stringify-and-json-parse/
```

- 防抖`debounce`: 事件被触发后 N 秒内不能重复执行。如果执行，则 N 重新计时
- 节流`throttle`: 如果持续触发一个事件，则在一定的时间内只执行一次事件

#### 扩展阅读

- [Future JavaScript: what is still missing?](https://2ality.com/2019/01/future-js.html)
  - [距离最好的编程语言，JavaScript 还缺些什么？](https://www.infoq.cn/article/Sv8He1JZNj_qZgOxL7zg)
- [ECMAScript 2019: the final feature set](https://2ality.com/2018/02/ecmascript-2019.html)
- [What's New in ES2019: Array flat and flatMap, Object.fromEntries](http://thecodebarbarian.com/whats-new-in-es2019-flat-flatmap-catch.html)

### Redis

#### 知识点

- [Redis 基础](https://juejin.im/post/5db66ed9e51d452a2f15d833)
- [Redis 常见面试题（带答案）](https://juejin.im/post/5dcaebea518825571f5c4ab0)
- [Redis 避免缓存穿透的利器之 BloomFilter](https://juejin.im/post/5db69365518825645656c0de)

#### 其他

- [谈谈 Redis 的 SETNX](https://www.jianshu.com/p/8b3130229515)
- [Redis 的 KEYS 命令引起 RDS 数据库雪崩，RDS 发生两次宕机，造成几百万的资金损失](https://mp.weixin.qq.com/s/SGOyGGfA6GOzxwD5S91hLw)
- [Redis 和 Memcache 的区别总结](https://www.cnblogs.com/aspirant/p/8883871.html)

### 计算机

- [简单介绍 CPU 的工作原理](https://www.cnblogs.com/onepixel/p/8724526.html)

### 计算机网络

> http 数据分隔 CLRF(\r\n)

- [扒一扒 HTTP 的构成](http://mrpeak.cn/blog/http-constitution/)
- [从输入 URL 到页面加载完成的过程中都发生了什么事情？](http://fex.baidu.com/blog/2014/05/what-happen/)

#### TCP/UDP

TCP/UDP/IP

- [**TCP/IP 协议知识科普**](https://www.cnblogs.com/xuanku/p/tcpip.html)
- [深入浅出 TCP/IP 协议栈](https://www.cnblogs.com/onepixel/p/7092302.html)
- [**面试官，不要再问我三次握手和四次挥手**](https://juejin.im/post/5d9c284b518825095879e7a5)
- [通俗大白话来理解 TCP 协议的三次握手和四次分手](https://github.com/jawil/blog/issues/14)
- [TCP 的那些事儿（上）](https://coolshell.cn/articles/11564.html)

- [TCP/IP、Http、Socket 的区别](https://mp.weixin.qq.com/s?__biz=MjM5OTMxMzA4NQ==&mid=403550414&idx=2&sn=b466e4a4a469782a1374095be4bd3036&scene=0#wechat_redirect)
- [如何通俗地解释一下 TCP/UDP 协议和 HTTP、FTP、SMTP 等协议之间的区别？](https://www.zhihu.com/question/20583641)

调优

- [Linux 下 Http 高并发参数优化之 TCP/IP 基础](https://kiswo.com/article/1016)
- [理解 TIME_WAIT](http://www.firefoxbug.com/index.php/archives/2795/)
- [Linux 下 Http 高并发参数优化之 TCP 参数](https://kiswo.com/article/1017)
- [Linux TCP/IP 协议栈调优](https://colobu.com/2014/09/18/linux-tcpip-tuning/)

- [不要在 Linux 上启用 net.ipv4.tcp_tw_recycle 参数](http://www.cnxct.com/coping-with-the-tcp-time_wait-state-on-busy-linux-servers-in-chinese-and-dont-enable-tcp_tw_recycle/)
- [tcp_tw_reuse、tcp_tw_recycle 使用场景及注意事项](https://www.cnblogs.com/lulu/p/4149312.html)

TCP 连接和挥手过程：

![tcp 连接和挥手过程](https://images.cnblogs.com/cnblogs_com/xuanku/688508/o_tcp_status.png)

`TIME_WAIT`是主动关闭方在收到被动关闭方发的`FIN`包之后处于的状态, 这个包是主动关闭方收到的最后一个包了, 在收到这个包之后还不能直接就把连接给关闭了, 还得等待一段时间才能关闭, 等待时间为`2MSL`。

为什么要等待一段时间呢? 主要是两个原因:

1. 在收到最后一个包之后主动关闭方还得发一个`ACK`回去, 这个`ACK`可能会丢包, 如果丢包, 对方还需要重新发最后一个`FIN`包, 如果收到重新发过来的`FIN`包的时候这边连接已经关闭, 则会导致连接异常终止;
2. 不过第 1 点也不会造成太大的问题, 毕竟数据已经正常交互了。但是有另外一点风险更高, 就是如果不等待`2MSL`的话, 那么如果正好一个新连接又建立在相同的端口上, 那么上次的`FIN`包可能因为网络原因而延时的包，这个时候才送达该端口, 导致下一次连接出现问题;

所以一定要有一个`TIME_WAIT`的状态等待一段时间, 等待的`MSL`时间`RFC`上面建议是 2 分钟

但是如果你的服务是一个高并发短连接服务, `TIME_WAIT`可能会导致连接句柄被大量占用, 而你又相信服务内部是一个非常稳定的网络服务, 或者即使有两个连接交互出现故障也可以接受或者有应用层处理, 不希望有那么多的`TIME_WAIT`状态的连接, 一般有两种方式:

1. 在建立连接的时候使用`SO_REUSEADDR`选项
2. 在`/etc/sysctl.conf`中加入如下内容:

```bash
# 表示开启 TCP 连接中 TIME-WAIT sockets 的快速回收，默认为 0，表示关闭
net.ipv4.tcp_tw_recycle = 1
# 表示开启重用。允许将 TIME-WAIT sockets 重新用于新的 TCP 连接，默认为 0，表示关闭
net.ipv4.tcp_tw_reuse = 1
# 对于本端断开的 socket 连接，TCP 保持在 FIN-WAIT-2 状态的时间。对方可能会断开连接或一直不结束连接或不可预料的进程死亡。默认值为 60 秒
# 即 MSL。断开连接四次挥手时，最后会等待 2MSL 后释放文件句柄
net.ipv4.tcp_fin_timeout = 1
# 在每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目
net.core.netdev_max_backlog = 4000
```

然后执行`/sbin/sysctl -p`生效参数

#### 扩展阅读

- [高性能网络编程(一)：单台服务器并发 TCP 连接数到底可以有多少](http://www.52im.net/thread-561-1-1.html)
  - [为什么 QQ 用的是 UDP 协议而不是 TCP 协议？](http://www.52im.net/thread-279-1-1.html)
  - [移动端 IM/推送系统的协议选型：UDP 还是 TCP？](http://www.52im.net/thread-33-1-1.html)
- [高性能网络编程(二)：上一个10年，著名的 C10K 并发连接问题](http://www.52im.net/thread-566-1-1.html)
  - [聊聊 C10K 问题及解决方案](https://my.oschina.net/xianggao/blog/664275)
  - [程序员怎么会不知道 C10K 问题呢？](https://medium.com/@chijianqiang/%E7%A8%8B%E5%BA%8F%E5%91%98%E6%80%8E%E4%B9%88%E4%BC%9A%E4%B8%8D%E7%9F%A5%E9%81%93-c10k-%E9%97%AE%E9%A2%98%E5%91%A2-d024cb7880f3)
  - [2000 年问题（千年虫问题）](https://zh.wikipedia.org/wiki/2000%E5%B9%B4%E9%97%AE%E9%A2%98)
- [高性能网络编程(三)：下一个 10 年，是时候考虑 C10M 并发问题了](http://www.52im.net/thread-568-1-1.html)
- [高性能网络编程(四)：从 C10K 到 C10M 高性能网络应用的理论探索](http://www.52im.net/thread-578-1-1.html)
- [高性能网络编程(五)：一文读懂高性能网络编程中的 I/O 模型](http://www.52im.net/thread-1935-1-1.html)
- [高性能网络编程(六)：一文读懂高性能网络编程中的线程模型](http://www.52im.net/thread-1939-1-1.html)
- [高性能网络编程经典：《The C10K problem(英文)》[附件下载]](http://www.52im.net/thread-560-1-1.html)

#### HTTPS

- [HTTPS 基本过程](https://hit-alibaba.github.io/interview/basic/network/HTTPS.html)
- [**HTTPS 科普扫盲帖**](https://www.cnblogs.com/chyingp/p/https-introduction.html)

#### SSH

- [图解 SSH 原理](https://www.jianshu.com/p/33461b619d53)

#### DNS/CDN

- [CDN 原理简析](https://juejin.im/post/5d105e1af265da1b71530095)

#### 网络攻击

### 算法和数据结构

#### 算法

- [Javascript Array.sort implementation?](https://stackoverflow.com/questions/234683/javascript-array-sort-implementation)
- [js 中 sort 函数的底层实现机制？](https://segmentfault.com/q/1010000007133473)
- [十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/p/7674659.html)
- [一致性 hash 算法释义](https://www.cnblogs.com/haippy/archive/2011/12/10/2282943.html)

#### 难点

- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/submissions/)

#### 数据结构

- [《吊打面试官》系列 - HashMap](https://juejin.im/post/5dee6f54f265da33ba5a79c8)

### 架构

#### 消息队列

- [消息队列基础](https://juejin.im/post/5dd3ff85e51d453fe34dfcc5)
- [分布式事务、重复消费、顺序消费](https://juejin.im/post/5dda9e7e6fb9a07aae2a3778)

#### 微服务

- [微服务杂谈](https://www.rowkey.me/blog/2019/05/30/msa/)
- [微服务十二要素](https://12factor.net/zh_cn/codebase)

### 运维

- [Learn Enough Command Line to Be Dangerous](https://www.learnenough.com/command-line-tutorial/basics)
- [70个经典的 Shell 脚本面试问题](http://www.imooc.com/article/1131)

### 其他

- [系统设计入门](https://github.com/donnemartin/system-design-primer/blob/master/README-zh-Hans.md)
- [秒杀系统设计与实现](https://github.com/qiurunze123/miaosha)
- [码农翻身全年文章精华](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513504&idx=1&sn=25dd6420e3056101dd3f6fdaedacaa2a&chksm=80d67a63b7a1f37572a5159ff6f53810467c15c8beec94770e8360c45f45036360d77755ee78&scene=21#wechat_redirect)
- [这些知识决定了程序员的上限](https://www.rowkey.me/blog/2019/04/22/upforprogrammer/)


```javascript
console.log(a)
a() // 1
function a() { console.log('1') }
var a = function() { console.log('2' )}
console.log(a)
```

React 虚拟 DOM

```javascript
class Test {
  constructor() {
    this.echo = () => {
      console.log('echo in constructor')
    }
  }

  echo() {
    console.log('echo')
  }
}

Test.echo // error
new Test().echo() // echo in constructor
```
