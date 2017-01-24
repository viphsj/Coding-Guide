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