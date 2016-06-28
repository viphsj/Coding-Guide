<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [this解析](#this%E8%A7%A3%E6%9E%90)
  - [独立函数调用](#%E7%8B%AC%E7%AB%8B%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)
  - [绑定规则-隐式绑定](#%E7%BB%91%E5%AE%9A%E8%A7%84%E5%88%99-%E9%9A%90%E5%BC%8F%E7%BB%91%E5%AE%9A)
  - [绑定规则-new绑定](#%E7%BB%91%E5%AE%9A%E8%A7%84%E5%88%99-new%E7%BB%91%E5%AE%9A)
  - [判断this（绑定优先级）](#%E5%88%A4%E6%96%ADthis%EF%BC%88%E7%BB%91%E5%AE%9A%E4%BC%98%E5%85%88%E7%BA%A7%EF%BC%89)
  - [空绑定](#%E7%A9%BA%E7%BB%91%E5%AE%9A)
  - [箭头函数](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: 《你不知道的JavaScript》--this解析
date: 2016-03-03 08:09:48
tags: JavaScript
---

## this解析

**this 不指向自身，也不指向函数的作用域**

this是在运行中绑定的，并不是在编写时绑定。它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this就是这样一个属性，**它指向什么完全取决于在哪里被调用。**

- 调用位置：函数在代码中被调用的位置
- 调用栈：为了达到当前执行位置所调用的所有函数
- 绑定规则-默认绑定

### 独立函数调用

```js
function foo() {
	console.log(this.a);
}

var a = 2;

foo(); // 2
```

this的绑定规则完全取决于调用位置

### 绑定规则-隐式绑定

```js
function foo(){
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

> 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象
> 
> 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用


```js
function foo(){
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
}

var a = 'I am global'; //全局对象的属性

function doFoo(fn){
	// fn实际上引用的是foo
	fn(); // <---调用位置
}

doFoo(obj.foo); // I am global
```

绑定规则-显式绑定

- call(...)
- apply(...)
- bind(...)
第一个参数是一个对象（为this准备），在调用函数时将它绑定到this

```js
function foo(){
	console.log(this.a);
}

var obj = {
	a : 2
};

foo.call(obj); // 2

// 通过foo.call(..)，可以在调用foo时强制把它的this绑定到obj上

function foo(something){
	console.log(this.a, something);
return this.a + something;
}

var obj = {
	a : 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3

console.log(b); // 5

//bind()会返回一个硬编码的新函数，它会把你所指定的参数设置为this的上下文并调用原始函数
```

### 绑定规则-new绑定

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建（构造）一个全新的对象
2. 这个新对象会被执行[[Prototype]]连接
3. 这个新对象会被绑定到函数调用的this
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

```js
function foo(a) {
	this.a = a;
}

var bar = new foo(2);

console.log(bar.a); //2

//使用new来调用foo(..)时，我们会构造一个新对象并把它绑定到foo(..)调用中的this上
```

### 判断this（绑定优先级）

- 函数是否在new中被调用（new绑定）？如果是的话this绑定的是新创建的对象
- 函数是否通过call、apply（显式绑定）或者bind（硬绑定）调用？如果是的话this绑定的是指定的对象
- 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话this绑定的是那个上下文对象
- 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象

### 空绑定

- 如果把null、undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则

```js
//显式绑定到null的应用

//使用apply(..)来展开一个数组，并当做参数传入一个函数

function foo(a, b){
	console.log("a : " + a + ", b : " + b);
}

foo.apply(null, [2, 3]); // a : 2, b : 3

//使用bind(..)对参数进行柯里化（预先设置一些参数）

var bar = foo.bind(null, 2);

bar(3); // a : 2, b : 3
```

更安全的做法---创建一个空对象进行绑定：

```js
function foo(a, b){
	console.log("a : " + a + ", b : " + b);
}

var EMPTY = Object.create(null);

foo.apply(EMPTY, [2, 3]); //a : 2, b : 3

var bar = foo.bind(EMPTY, 2);
bar(3); // a : 2, b : 3
```

### 箭头函数

箭头函数不适用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this

```js
function foo(){
//返回一个箭头函数
	return (a) => {
		//this继承自foo()
		console.log(this.a);
	}
}

var obj1 = {
	a: 2
}

var obj2 = {
	a: 3
}

var bar = foo.call(obj1);

bar.call(obj2); // 2，不是3！
```

foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到obj1，bar的this也会绑定到obj1，箭头函数的绑定无法被修改（new也不行）
