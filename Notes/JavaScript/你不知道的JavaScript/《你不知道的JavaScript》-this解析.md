<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript 的 this](#javascript-%E7%9A%84-this)
  - [独立函数调用](#%E7%8B%AC%E7%AB%8B%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)
  - [绑定规则](#%E7%BB%91%E5%AE%9A%E8%A7%84%E5%88%99)
    - [隐式绑定](#%E9%9A%90%E5%BC%8F%E7%BB%91%E5%AE%9A)
    - [显式绑定](#%E6%98%BE%E5%BC%8F%E7%BB%91%E5%AE%9A)
    - [new绑定](#new%E7%BB%91%E5%AE%9A)
  - [判断this（绑定优先级）](#%E5%88%A4%E6%96%ADthis%E7%BB%91%E5%AE%9A%E4%BC%98%E5%85%88%E7%BA%A7)
  - [空绑定](#%E7%A9%BA%E7%BB%91%E5%AE%9A)
  - [箭头函数](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript 的 this

- **`this`不指向自身，也不指向函数的作用域**
- **`this`是在运行中绑定的，并不是在编写时绑定。它的上下文取决于函数调用时的各种条件。`this`的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。**

当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。`this`就是这样一个属性，**它指向什么完全取决于在哪里被调用。**

- 调用位置：函数在代码中被调用的位置
- 调用栈：为了达到当前执行位置所调用的所有函数
- 绑定规则：默认绑定

### 独立函数调用

```javascript
function foo() {
	console.log(this.a);
}

var a = 2;

foo(); // 2
```

`this`的绑定规则完全取决于调用位置

### 绑定规则

#### 隐式绑定

```javascript
function foo() {
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

> 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的`this`绑定到这个上下文对象
>
> 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用


```javascript
function foo() {
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
}

var a = 'I am global'; // 全局对象的属性

function doFoo(fn) {
	// fn 实际上引用的是 foo
	fn(); // <---调用位置
}

doFoo(obj.foo); // I am global
```

#### 显式绑定

- `call(...)`
- `apply(...)`
- `bind(...)`
- 第一个参数是一个对象（为 this 准备），在调用函数时将它绑定到 this

```javascript
function foo() {
	console.log(this.a);
}

var obj = {
	a : 2
};

foo.call(obj); // 2

// 通过 foo.call(..)，可以在调用 foo 时强制把它的 this 绑定到 obj 上

function foo(something) {
	console.log(this.a, something);
	return this.a + something;
}

var obj = {
	a : 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3

console.log(b); // 5

// bind() 会返回一个硬编码的新函数，它会把你所指定的参数设置为 this 的上下文并调用原始函数
```

#### new绑定

使用`new`来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建（构造）一个全新的对象
2. 这个新对象会被执行`[[Prototype]]`连接
3. 这个新对象会被绑定到函数调用的`this`
4. 如果函数没有返回其他对象，那么`new`表达式中的函数调用会自动返回这个新对象

```javascript
function foo(a) {
	this.a = a;
}

var bar = new foo(2);

console.log(bar.a); // 2

// 使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上
```

### 判断this（绑定优先级）

- 函数是否在`new`中被调用（`new`绑定）？如果是的话`this`绑定的是新创建的对象
- 函数是否通过`call`、`apply`（显式绑定）或者`bind`（硬绑定）调用？如果是的话`this`绑定的是指定的对象
- 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话`this`绑定的是那个上下文对象
- 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到`undefined`，否则绑定到全局对象

### 空绑定

- 如果把`null`、`undefined`作为`this`的绑定对象传入`call`、`apply`或者`bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则

```javascript
// 显式绑定到 null 的应用
// 使用 apply(..) 来展开一个数组，并当做参数传入一个函数

function foo(a, b) {
	console.log("a : " + a + ", b : " + b);
}

foo.apply(null, [2, 3]); // a : 2, b : 3

// 使用 bind(..) 对参数进行柯里化（预先设置一些参数）

var bar = foo.bind(null, 2);

bar(3); // a : 2, b : 3
```

更安全的做法 --- 创建一个空对象进行绑定：

```javascript
function foo(a, b) {
	console.log("a : " + a + ", b : " + b);
}

var EMPTY = Object.create(null);

foo.apply(EMPTY, [2, 3]); // a : 2, b : 3

var bar = foo.bind(EMPTY, 2);
bar(3); // a : 2, b : 3
```

### 箭头函数

箭头函数不适用`this`的四种标准规则，而是根据外层（函数或者全局）作用域来决定`this`

```javascript
function foo() {
 // 返回一个箭头函数
	return () => {
		// this 继承自 foo()
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

bar.call(obj2); // 2，不是 3！
```

`foo()`内部创建的箭头函数会捕获调用时`foo()`的`this`。由于`foo()`的`this`绑定到`obj1`，`bar`的`this`也会绑定到`obj1`，箭头函数的绑定无法被修改（`new`也不行）
