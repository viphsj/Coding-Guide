<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript-函数式编程](#javascript-%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B)
  - [函数与其他数据类型一样，处于平等地位](#%E5%87%BD%E6%95%B0%E4%B8%8E%E5%85%B6%E4%BB%96%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%80%E6%A0%B7%EF%BC%8C%E5%A4%84%E4%BA%8E%E5%B9%B3%E7%AD%89%E5%9C%B0%E4%BD%8D)
  - [函数应该纯天然，无副作用](#%E5%87%BD%E6%95%B0%E5%BA%94%E8%AF%A5%E7%BA%AF%E5%A4%A9%E7%84%B6%EF%BC%8C%E6%97%A0%E5%89%AF%E4%BD%9C%E7%94%A8)
  - [引用透明](#%E5%BC%95%E7%94%A8%E9%80%8F%E6%98%8E)
  - [immutable](#immutable)
  - [柯里化](#%E6%9F%AF%E9%87%8C%E5%8C%96)
    - [概念摘要](#%E6%A6%82%E5%BF%B5%E6%91%98%E8%A6%81)
    - [创建柯里化函数](#%E5%88%9B%E5%BB%BA%E6%9F%AF%E9%87%8C%E5%8C%96%E5%87%BD%E6%95%B0)
  - [高阶函数](#%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0)
  - [代码组合](#%E4%BB%A3%E7%A0%81%E7%BB%84%E5%90%88)
    - [pointfree 函数无需提及要操作的数据是什么样的](#pointfree-%E5%87%BD%E6%95%B0%E6%97%A0%E9%9C%80%E6%8F%90%E5%8F%8A%E8%A6%81%E6%93%8D%E4%BD%9C%E7%9A%84%E6%95%B0%E6%8D%AE%E6%98%AF%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84)
    - [结合律](#%E7%BB%93%E5%90%88%E5%BE%8B)
    - [坑](#%E5%9D%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript-函数式编程

命令式编程中“典型”的方法和过程都深深地根植于它们所在的环境中，通过状态、依赖和有效作用达成；纯函数与此相反，它与环境无关，只要我们愿意，可以在任何地方运行它

> 面向对象语言的问题是，它们永远都要随身携带那些隐式的环境。你只需要一个香蕉，但却得到一个拿着香蕉的大猩猩...以及整个丛林

### 函数与其他数据类型一样，处于平等地位

可作为变量一样被传递、返回或者在函数中嵌套函数。可作为参数。使用总有返回值的表达式而不是语句

### 函数应该纯天然，无副作用

副作用是指，函数内部与外部互动，产生运算以外的其他结果。
例如在函数调用的过程中，利用并修改到了外部的变量，那么就是一个有副作用的函数。

由于**函数式编程不修改外部变量**，所以根本不存在线程锁的问题。多线程并发的时候不用担心使用的变量被其他线程所修改 

概括而言，副作用包含：

- 改变了任何外部变量或对象属性（例如，全局变量，或者一个在父级函数作用域链上的变量）
- 写日志
- 在屏幕输出
- 写文件
- 发网络请求
- 触发任何外部进程
- 调用另一个有副作用的函数

### 引用透明

**纯函数的运行不应该依赖于外部变量或状态，只依赖于输入的参数。对于相同的输入参数，返回的结果一定相同。**

### immutable

如果要改变变量，则需要把数据deep copy出去进行修改

几个函数式编程的普通例子：

```javascript
// 非函数式编程
let a = 1;
function increase() {
  a++;
}
increase();
console.log(a); // 2

// 函数式编程
var a = 1;
function increase(a) { // 通过参数引用，不依赖外部数据
  return a + 1; // 不改变外部数据，返回一个新值
}
console.log(increase(a)); // 2
console.log(a); // 1
```

```javascript
// 比较Array中的slice和splice
let test = [1, 2, 3, 4, 5];

// slice为纯函数，返回一个新的数组
console.log(test.slice(0, 3)); // [1, 2, 3]
console.log(test); //[1, 2, 3, 4, 5]

// splice则会修改参数数组
console.log(test.splice(0, 3)); // [1, 2, 3]
console.log(test); // [4, 5]
```

```javascript
// 函数式编程-函数作为返回参数
const add = (x) => {
  return plus = (y) => {
    return x + y;
  }
};
let plus1 = add(1);
let plus2 = add(2);

console.log(plus1(1)); // 2
console.log(plus2(1)); // 3
```

函数式编程的几个要点

> 把函数当成变量来用，关注于描述问题而不是怎么实现
>
> 函数之间没有共享的变量
>
> 函数间通过参数和返回值来传递数据
>
> 在函数里没有临时变量

[函数式编程](http://coolshell.cn/articles/10822.html)

### 柯里化

> 把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下参数且返回结果的新函数

#### 概念摘要

即：
传入一个（或很少量的）参数调用父函数，父函数返回一个可接受多个参数的子函数。例：
```javascript
const add = (x) => {
  return (y, z) => {
    return x + y + z
  }
}

let increase = add(1);
console.log(increase(2, 3)); // 6
```

函数式编程+柯里化，将提取成柯里化的函数部分配置好之后，可作为参数传入，简化操作流程。
```javascript
// 给list中每个元素先加1，再加5，再减1
let list = [1, 2, 3, 4, 5];

//正常做法
let list1 = list.map((value) => {
  return value + 1;
});
let list2 = list1.map((value) => {
  return value + 5;
});
let list3 = list2.map((value) => {
  return value - 1;
});
console.log(list3); // [6, 7, 8, 9, 10]

// 柯里化
const changeList = (num) => {
  return (data) => {
    return data + num
  }
};
let list1 = list.map(changeList(1)).map(changeList(5)).map(changeList(-1));
console.log(list1); // [6, 7, 8, 9, 10]
```

#### 创建柯里化函数

```javascript
// 安装lodash依赖
$ npm install lodash

let curry = require('lodash').curry;
let list = [1, 2, 3, 4];

let filter = curry(function(f, ary) {
  return ary.filter(f);
});
let map = curry(function(f, ary) {
  return ary.map(f);
});

let filterFun = (x) => {
  return (y) => {
    return x < y
  }
}
let mapFun = (x) => {
  return (y) => {
    return x + y
  }
}

let filteredList = filter(filterFun(3), list);
let mapedList = map(mapFun(1), list);
console.log(filteredList); // [4]
console.log(mapedList); // [2, 3, 4, 5]
```

### 高阶函数

- 抽象或隔离行为、作用，异步控制流程作为回调函数，promises，monads 等
- 创建可以泛用于各种数据类型的功能
- 部分应用于函数参数（偏函数应用）或创建一个柯里化的函数，用于复用或函数复合
- 接受一个函数列表并返回一些由这个列表中的函数组成的复合函数

### 代码组合

将数个函数对象作为参数传递给一个函数，在该函数内部将传入的函数参数分别作为参数进行嵌套。最直观的例子如下所示：
```javascript
const compose = (f,g) => {
  return (x) => {
    return f(g(x));
  };
};
```

#### pointfree 函数无需提及要操作的数据是什么样的

```javascript
// 非pointfree函数。提及到了数据list
const filterList = (list) => {
  return list.map((value) => value * 2).filter((value) => return value < 3);
}
// 非pointfree函数，提及到了数据word
const changeWord = (word) => {
  return word.toLowerCase().split(' ');
}

// pointfree
const filterList = compose(filter((value) => return value < 3), map((value) => value * 2));
const changeWord = compose(split(' '), toLowerCase)
```

#### 结合律

```javascript
compose(f, compose(g, h)) == compose(compose(f, g), h);

// map函数的组合律
compose(map(f), map(p)) == map(compose(f, g));
```

#### 坑

ERROR: 在没有局部调用之前，就组合类似 map 这样接受两个参数的函数

```javascript
const addOne = (value) => {
  return value + 1;
}

// error
const greaterList = compose(map, addOne, reverse);
// god
const greaterList = compose(map(addOne), reverse);
greaterList([1, 2, 3]); // [4, 3, 2]
```