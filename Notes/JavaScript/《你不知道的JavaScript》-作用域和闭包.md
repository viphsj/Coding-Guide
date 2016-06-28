<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [作用域](#%E4%BD%9C%E7%94%A8%E5%9F%9F)
  - [js的编译过程(以 var a = 2 为例)：](#js%E7%9A%84%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B%E4%BB%A5-var-a--2-%E4%B8%BA%E4%BE%8B%EF%BC%9A)
  - [LHS查询/RHS查询](#lhs%E6%9F%A5%E8%AF%A2rhs%E6%9F%A5%E8%AF%A2)
  - [异常](#%E5%BC%82%E5%B8%B8)
- [语法作用域](#%E8%AF%AD%E6%B3%95%E4%BD%9C%E7%94%A8%E5%9F%9F)
- [函数作用域和块作用域](#%E5%87%BD%E6%95%B0%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E5%9D%97%E4%BD%9C%E7%94%A8%E5%9F%9F)
  - [规避命名冲突](#%E8%A7%84%E9%81%BF%E5%91%BD%E5%90%8D%E5%86%B2%E7%AA%81)
  - [函数声明&函数表达式](#%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E&%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)
  - [块作用域](#%E5%9D%97%E4%BD%9C%E7%94%A8%E5%9F%9F)
- [提升](#%E6%8F%90%E5%8D%87)
- [作用域闭包](#%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%97%AD%E5%8C%85)
  - [循环和闭包](#%E5%BE%AA%E7%8E%AF%E5%92%8C%E9%97%AD%E5%8C%85)
  - [模块](#%E6%A8%A1%E5%9D%97)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: 《你不知道的JavaScript》--作用域和闭包
date: 2016-03-03 08:26:38
tags: JavaScript
---

## 作用域

### js的编译过程(以 var a = 2 为例)：

- 遇到var a，编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域的集合中。如果是，编译器会忽略该声明继续编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量并命名为a
- 编译器为引擎生成运行时所需的代码，这些代码被用来处理 a = 2 这个赋值操作。引擎运行时会首先询问作用域，在当前的作用域集合中是否存在一个叫作 a 的变量
- 如果找到 a 变量，就会将2赋值给它；否则引擎会抛出异常

### LHS查询/RHS查询

- LHS查询是试图找到变量的容器本身（赋值操作的目标是谁）
- RHS查询近似与简单查找某个变量的值（谁是赋值操作的源头）

### 异常

- RHS查询在所有嵌套的作用域中寻找不到所需的变量时，引擎会抛出一个ReferenceError异常
- LHS查询无法查找到目标时
	- 非严格模式下，在全局作用域中创建一个具有该名称的变量，并将它返还给引擎
	- 严格模式下，抛出ReferenceError异常
- RHS查询找到了变量，但操作不合理（例如对非函数类型的值进行函数调用，或者引用null或undefined类型的值中的属性），引擎抛出TypeError
- ReferenceError与作用域判别失败相关，而TypeError则代表判别成功了，但对结果的操作是非法的

## 语法作用域

无论函数在哪里被调用，也无论它如何被调用，它的语法作用域都只由函数被声明时所处的位置决定

## 函数作用域和块作用域

### 规避命名冲突

- 全局命名空间（使用一个对象作为库的全局命名空间，从对象中暴露接口给外界）
- 模块管理

```js
var $ = {
	child: child(),
	each: each(),
......
}
```

### 函数声明&函数表达式

- 函数声明

```js
var a = 2;

function foo(){
	var a = 3;
	console.log(a);
}

foo(); // 3

console.log(a); // 2
```

- 函数表达式

```js
a = 2;

(function f00(){
	var a = 3;
	console.log(a); // 3
})();

console.log(a); // 2
```

- 函数声明与函数表达式的最重要区别是它们的名称标识符会绑定在何处
- 第一个代码段（函数声明）中，foo被绑定在所在的作用域中，可直接通过foo()来调用它
- 第二个代码段（函数表达式）中，foo被绑定在函数表达式自身的函数中而不是所在作用域里
- `(function foo(){...})`作为函数表达式，foo只能在...所代表的位置中国被访问，外部作用域则不行。foo变量名被隐藏在自身中意味着不会非必要的污染外部作用域

### 块作用域

- 闭包自执行函数(function(){})();
- try/catch; catch分句会创建一个块作用域，其中声明的变量仅在catch内部有效
- let声明（不会提升）
- const声明

## 提升

函数和变量的声明会从它们在代码中出现的位置上，移动到它们所在作用域的最上层

- 现有声明，后有赋值

```js
foo();

function foo(){
	console.log(a); //undefined
	var a = 2;
}

//编译过程中，通过提升，会被理解为下面的形式：

function foo(){
	var a;
	console.log(a); //undefined
	a = 2;
}

foo();
```

- 函数声明会被提升，但函数表达式不会被提升：

```js
foo(); // 不是ReferenceError，而是TypeError

var foo = function bar(){...}
```

- 函数首先会被提升，其次是变量

## 作用域闭包

在函数执行完毕之后，依旧能获得其内部完整的语法作用域而不被回收，并在其语法作用域以外的区域执行。

```js
function wait(message){
	setTimeout(function timer(){
		console.log(message);
	}, 1000);
}

wait('you have a new message');

//将一个内部函数（timer）传递给setTimeout(..)，timer具有涵盖wait()作用域的闭包，因此还保有对变量message的引用。

//wait(..)执行1000毫秒之后，它的内部作用域不会消失，timer函数依然保有wait(..)作用域的闭包
```

### 循环和闭包

**延迟函数的回调会在循环结束后才执行**

```js
for(var i = 1; i < 5; i++){
	setTimeout(function timer(){
		console.log(i);
	}, i * 1000);
}

//以每秒一次的频率输出五个6
```

我们试图假设循环中的每个迭代在运行中都会给自己捕获一个i的副本，但是根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各个迭代中定义的，但它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i

```js
for(var i = 1; i < 5; i++){
	(function(j){
		setTimeout(function timer(){
			console.log(j);
		}, i * 1000);
	})(i);
}

//分别输出1~5，每秒一次，每次一个
```

在迭代内使用IIFE（立即执行函数）会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的作用域封闭在迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。

### 模块

```js
function CoolModule(name){
	var something = 'cool';
	function doSomething() {
		console.log(something);
	};

	function sayName() {
		console.log(name);
	};
	
	return {
		doSomething: doSomething,
		sayName: sayName
	}
}

var foo = CoolModule('ecmadao');

foo.doSomething(); // cool

foo.sayName(); // ecmadao
```

模块返回一个对象字面量语法`{key: value,....}`

这个返回的对象中含有对内部函数而不是内部数据变量的引用。我们保持内部数据变量是隐藏且私有的状态。可以将这个对象类型的返回值看做本质上是模块的公共API

- 必须有外部的封闭函数（CoolModule），该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）
- 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态