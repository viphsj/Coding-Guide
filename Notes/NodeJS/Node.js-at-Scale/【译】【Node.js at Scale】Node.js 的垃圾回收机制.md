<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译】【Node.js at Scale】Node.js 的垃圾回收机制](#%E8%AF%91nodejs-at-scalenodejs-%E7%9A%84%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%9C%BA%E5%88%B6)
  - [Node.js 应用中的内存管理](#nodejs-%E5%BA%94%E7%94%A8%E4%B8%AD%E7%9A%84%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86)
  - [垃圾回收的概念](#%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E7%9A%84%E6%A6%82%E5%BF%B5)
    - [被垃圾回收之前的内存](#%E8%A2%AB%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E4%B9%8B%E5%89%8D%E7%9A%84%E5%86%85%E5%AD%98)
    - [垃圾回收之后的内存](#%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E4%B9%8B%E5%90%8E%E7%9A%84%E5%86%85%E5%AD%98)
  - [使用垃圾回收的优势](#%E4%BD%BF%E7%94%A8%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E7%9A%84%E4%BC%98%E5%8A%BF)
    - [使用垃圾回收时需要牢记的](#%E4%BD%BF%E7%94%A8%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%97%B6%E9%9C%80%E8%A6%81%E7%89%A2%E8%AE%B0%E7%9A%84)
  - [Node.js 垃圾回收&内存管理实践](#nodejs-%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%AE%9E%E8%B7%B5)
    - [栈](#%E6%A0%88)
    - [堆](#%E5%A0%86)
    - [垃圾回收方法](#%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%96%B9%E6%B3%95)
      - [新空间与旧空间](#%E6%96%B0%E7%A9%BA%E9%97%B4%E4%B8%8E%E6%97%A7%E7%A9%BA%E9%97%B4)
      - [新生代](#%E6%96%B0%E7%94%9F%E4%BB%A3)
      - [Scavenge 和 Mark-Sweep 回收](#scavenge-%E5%92%8C-mark-sweep-%E5%9B%9E%E6%94%B6)
  - [真实案例](#%E7%9C%9F%E5%AE%9E%E6%A1%88%E4%BE%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 【译】【Node.js at Scale】Node.js 的垃圾回收机制

> 原文链接：[Node.js Garbage Collection Explained - Node.js at Scale](https://blog.risingstack.com/node-js-at-scale-node-js-garbage-collection/)

![ancient-garbage-collector-in-action](https://blog-assets.risingstack.com/2016/11/ancient-garbage-collector-in-action.jpg)

### Node.js 应用中的内存管理

每个应用都需要占用内存来正常运行。内存管理机制可以在程序需要的时候，动态的调整应用的内存占用，并在不需要的时候进行释放，以便内存可以被重复利用。

应用的内存管理既可以自动也可以手动，而自动的机制通常被称作垃圾回收。下面这段代码通过手工的内存管理，展现了 `C` 中是如何进行内存分配的：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {

   char name[20];
   char *description;

   strcpy(name, "RisingStack");

   // memory allocation
   description = malloc( 30 * sizeof(char) );

   if( description == NULL ) {
      fprintf(stderr, "Error - unable to allocate required memory\n");
   } else {
      strcpy( description, "Trace by RisingStack is an APM.");
   }

   printf("Company name = %s\n", name );
   printf("Description: %s\n", description );

   // release memory
   free(description);
}
```

进行手工管理时，释放没再使用的内存是开发者的职责。通过上面这种形式管理内存可能会导致如下几种 bug：

- **内存泄露**，当使用过的内存没有被释放时
- **野生/被挂起的指针**，当对象被删除，但指针被重复使用时会引发这种错误。当其他数据结构被复写，或者读取敏感信息时，这种 bug 可能会造成严重的错误。

但幸运的是，Node.js 有一套垃圾回收机制，你不需要进行手工管理。

### 垃圾回收的概念

垃圾回收是自动进行内存管理的一种方式，而垃圾回收者（GC）的工作则是回收被不再使用的对象占用的内存（指垃圾）。它最早于 1959 年在 LISP 中被  John McCarthy 所发明。

当一个对象不再被其他对象引用时，就会被 GC 认为是不再使用的对象。

#### 被垃圾回收之前的内存

下面这幅图展现了当有对象相互引用，并有一些对象不再引用时的内存。那些独立的对象会被垃圾回收掉。

![memory-state-before-node-js-garbage-collection](https://blog-assets.risingstack.com/2016/11/memory-state-before-node-js-garbage-collection.png)

#### 垃圾回收之后的内存

垃圾回收运行之后，孤立的对象就会被删除，内存也随之释放。

### 使用垃圾回收的优势

- 阻止了**野生/被挂起的指针**引起的 bug
- 不会重复使用内存
- 可以阻止内存泄露

当然，仅仅是通过垃圾回收还无法完全解决问题，它也并不是内存管理机制的银弹。我们先来看一下你需要牢记心中的几点。

#### 使用垃圾回收时需要牢记的

- **性能影响** — GC 需要消耗运算能力来决定什么可以被释放
- **不可预测** — 现代的垃圾回收机制会避免 "stop - the - world" 回收

### Node.js 垃圾回收&内存管理实践

最好的学习方式就是动手 — 我将通过代码片段向你展示内存的变化。

#### 栈

栈包含了局部变量和针对对象的指针。在下面的例子里，`a` 和 `b` 将会入栈：

```javascript

function add (a, b) {  
  return a + b
}

add(4, 5);
```

#### 堆

堆用于储存可以被引用的对象，例如 string 或者 object。下面的代码里，被创建的 `Car` 对象将要入堆：

```javascript
function Car (opts) {  
  this.name = opts.name
}

const LightningMcQueen = new Car({name: 'Lightning McQueen'});
```

在这之后，内存的占用会变成：

![node-js-garbage-collection-first-step-object-placed-in-memory-heap](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-first-step-object-placed-in-memory-heap.png)

再让我们实例化一些车，看看内存会变成什么样：

```javascript
function Car (opts) {  
  this.name = opts.name
}

const LightningMcQueen = new Car({name: 'Lightning McQueen'})  
const SallyCarrera = new Car({name: 'Sally Carrera'})  
const Mater = new Car({name: 'Mater'})
```

![node-js-garbage-collection-second-step-more-elements-added-to-the-heap](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-second-step-more-elements-added-to-the-heap.png)

如果这会儿运行 GC ，鉴于 root 引用了所有的对象，什么东西都不会被释放。

我们再给车增加些部件：

```javascript
function Engine (power) {  
  this.power = power
}

function Car (opts) {  
  this.name = opts.name
  this.engine = new Engine(opts.power)
}

let LightningMcQueen = new Car({name: 'Lightning McQueen', power: 900})  
let SallyCarrera = new Car({name: 'Sally Carrera', power: 500})  
let Mater = new Car({name: 'Mater', power: 100})
```

![node-js-garbage-collection-assigning-values-to-the-objects-in-heap](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-assigning-values-to-the-objects-in-heap.png)

此时，如果我们不再使用 `Mater` 对象，但把它赋予其他值，比如 `Mater = undefined` 的话，会发生什么？

![node-js-garbage-collection-redefining-values](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-redefining-values.png)

`Mater` 对象不再被引用，垃圾回收也可以释放它：

![node-js-garbage-collection-freeing-up-unreachable-object](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-freeing-up-unreachable-object.png)

在我们理解了垃圾回收机制的行为之后，再来看看它在 V8 中是怎么实施的。

#### 垃圾回收方法

在上一篇文章里，我们提及了 [Node.js 中垃圾回收的工作方式](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/)，我墙裂推荐你去看看。

##### 新空间与旧空间

堆具有两个主要区域，新空间（New Space）和旧空间（Old Space）。新空间是发生内存分配的地方，在这里垃圾回收进行的速度很快，可以达到 1~8 MB/s。新空间中的对象被叫做 新生代（Young Generation）。

旧空间的对象则是从新空间里存留下来的幸存者，被叫做 老生代（Old Generation）。旧空间里的内存分配速度很快，但回收成本比较高，因此也很少发生。

##### 新生代

通常，只有不到 20% 的新生代可以成为老生代，而jiu'kong'jian旧空间只有在几乎耗尽时才会触发回收机制。V8 引擎采用了两种回收算法来实现：Scavenge 和 Mark-Sweep 。

##### Scavenge 和 Mark-Sweep 回收

Scavenge 回收算法速度很快，运行在新空间，而 Mark-Sweep 相对较慢，运行在旧空间。

### 真实案例

2013 年，Meteor 框架的作者们发布了他们遇见了一个内存泄露的例子：

```javascript
var theThing = null  
var replaceThing = function () {  
  var originalThing = theThing
  var unused = function () {
    if (originalThing)
      console.log("hi")
  }
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage)
    }
  };
};
setInterval(replaceThing, 1000)
```

> Well, the typical way that closures are implemented is that every function object has a link to a dictionary-style object representing its lexical scope. If both functions defined inside replaceThing actually used originalThing, it would be important that they both get the same object, even if originalThing gets assigned to over and over, so both functions share the same lexical environment. Now, Chrome's V8 JavaScript engine is apparently smart enough to keep variables out of the lexical environment if they aren't used by any closures - from the [Meteor blog](http://info.meteor.com/blog/an-interesting-kind-of-javascript-memory-leak).
