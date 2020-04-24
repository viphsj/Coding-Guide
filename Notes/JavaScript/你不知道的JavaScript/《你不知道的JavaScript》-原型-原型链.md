<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript 中的原型链](#javascript-%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%93%BE)
  - [属性设置与屏蔽](#%E5%B1%9E%E6%80%A7%E8%AE%BE%E7%BD%AE%E4%B8%8E%E5%B1%8F%E8%94%BD)
  - [类与继承](#%E7%B1%BB%E4%B8%8E%E7%BB%A7%E6%89%BF)
    - [委托/继承](#%E5%A7%94%E6%89%98%E7%BB%A7%E6%89%BF)
    - [构造函数](#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
    - [原型继承](#%E5%8E%9F%E5%9E%8B%E7%BB%A7%E6%89%BF)
    - [检查类关系](#%E6%A3%80%E6%9F%A5%E7%B1%BB%E5%85%B3%E7%B3%BB)
    - [原型的动态性](#%E5%8E%9F%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E6%80%A7)
    - [子类复写、添加方法](#%E5%AD%90%E7%B1%BB%E5%A4%8D%E5%86%99%E6%B7%BB%E5%8A%A0%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript 中的原型链

- [认识原型对象和原型链](https://www.cnblogs.com/onepixel/p/5024903.html)

我们创建的每个函数都有一个**原型属性(prototype)**，该属性是一个指针，指向一个对象。

**这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法 ==> 使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。**通俗一点讲，`prototype`的主要作用就是继承，`prototype`中定义的属性和方法都是留给自己的 “后代” 用的，因此，子类完全可以访问`prototype`中的属性和方法

`prototype`对于父对象本身是不可见的，但子类可以完全访问。当通过`new`操作符创建新对象的时候，通常会把父类的`prototype`赋值给新对象的`__proto__`属性，子类就可以调用到继承的属性或方法。

原型链的形成真正是靠`__proto__`而非`prototype`，当 JS 引擎执行对象的方法时，先查找对象本身是否存在该方法，如果不存在，会在原型链上查找，但不会查找自身的`prototype`

```javascript
function Person() {};
// 或者：
var Person = function() {};

Person.prototype = {
  name : 'ecmadao',
  age : 24,
  job : 'developer',
  sayName : function() {
    console.log(this.name);
  }
};
Person.prototype.sex = '男';

var person1 = new Person();
var person2 = new Person();
person1.sayName(); // ecmadao;
person2.sayName(); // ecmadao;

Person.name // undefined. prototype 对父类而言是透明的，无法访问
```

```javascript
function func() {}
func.prototype.foo = 'foo'
console.log(func.foo) // undefined

const f = new func()
console.log(f.foo) // foo
```

向上追溯原型链：

1. `f.__proto__` -> `func.prototype`
2. `func.prototype.__proto__` -> `Object.prototype`
3. `Object.prototype.__proto__` -> `null`

### 属性设置与屏蔽

```javascript
var anotherObj = {
	a: 2,
	foo: 'test'
};

// 创建一个关联到 anotherObj 的对象
var myObj = Object.create(anotherObj);
myObj.foo = 'foo'; // 将会屏蔽原型链上的原有 foo 属性
```

在`[[Prototype]]`链上层存在名为 foo 的普通访问属性（可读写），则会发生属性屏蔽
如果在`[[Prototype]]`链上层存在 foo，且被标记为只读`writable: false`，只读属性会阻止`[[Prototype]]`链下层隐式创建同名属性。此时应使用`Object.defineProperty(..)`来向 myObj 增加 foo 属性

### 类与继承

#### 委托/继承

*继承*意味着复制操作，javascript (默认)不会复制对象属性，而是在两者之间建立关联。新建对象通过委托访问原对象的属性和函数

*委托*即是 javascript 中对象的关联机制

所有的函数默认都会拥有一个名为`prototype`的公有并且不可枚举的属性，它会指向另一个对象

```javascript
function Foo() {
	// ....
}

var a = new Foo();

Object.getPrototypeOf(a) === Foo.prototype; // true
```

`new Foo()`会生成一个新对象(a)，这个新对象的内部链接`[[Prototype]]`，即`__proto__`关联的是`Foo.prototype`对象

> 在 JavaScript 中，我们并不会将一个对象（“类”）复制到另一个对象（“实例”），只是将它们关联起来。（**原型继承**）
>
> 这样一个对象就可以通过**委托**访问另一个对象的属性和函数

#### 构造函数

```javascript
function Foo() {
	// ....
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true
```

`Foo.prototype`默认有一个公有且不可枚举的属性`.constructor`，这个属性引用的是对象关联的函数（本例中是 Foo）。

通过构造函数调用`new Foo()`创建的对象也有一个`.constructor`属性，指向“创造这个对象的函数”

> 在 JavaScript 中对于“构造函数”最准确的解释是--所有带 new 的函数调用
>
> 函数不是构造函数，但是当且仅当使用 new 时，函数调用会变成“构造函数调用”

但实际上，a 并没有一个指向 Foo 的`.constructor`属性。`.constructor`引用同样被委托给了`Foo.prototype`，而`Foo.prototype.constructor`默认指向 Foo

**`a.constructor`只是通过默认的`[[Prototype]]`委托指向 Foo**

```javascript
function Foo() { /*...*/ }

Foo.prototype = { /*...*/ }; // 创建一个新原型对象(不包含 constructor 属性)

var a1 = new Foo();

a1.constructor === Foo; // false

a1.constructor === Object; // true
```

a1 并没有`.constructor`属性，所以它会委托`[[Prototype]]`链上的`Foo.prototype`，但这个对象也没有`.constructor`属性（但默认的`Foo.prototype`对象有这个属性），所以它会继续委托，这次会委托给委托链顶端的`Object.prototype`，这个对象有`.constructor`属性，指向内置的`Object(..)`函数

> constructor 不代表被构造
>
> .constructor 不可枚举，但它的值是可修改的

#### 原型继承

```javascript
function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
};

function Bar(name, label) {
	Foo.call(this, name);
	this.label = label;
}

// 创建一个新的 Bar.prototype 对象并关联到 Foo.prototype

Bar.prototype = Object.create(Foo.prototype); // ！现在没有 Bar.prototype.constructor 了
Bar.prototype.myLabel = function() {
	return this.label;
};

var a = new Bar("a", "obj a");

a.myName(); // a
a.myLabel(); // obj a
```

`Bar.prototype = Object.create(Foo.prototype)`，通过调用`Object.create(..)`，创建了一个新对象并把新对象内部的`[[Prototype]]`关联到指定对象

- `Bar.prototype = Object.create(Foo.prototype)`
- `Object.setPrototypeOf(Bar.prototype, Foo.prototype)`

#### 检查类关系

- `instanceof`

```javascript
function Foo() {
	// ....
}

Foo.prototype.x = ....;

var a = new Foo();

a instanceof Foo; // true

// instanceof 回答的问题是：在 a 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象？
// 处理对象(a)和函数(带 .prototype 引用的 Foo)之间的关系
// 如果想判断两个对象（比如 a 和 b）之间是否通过 [[Prototype]] 链关联，instanceof 无法实现
```

- `isPrototypeOf(..)`

```javascript
Foo.prototype.isPrototypeOf(a); // true

// isPrototypeOf 回答的问题是：在 a 的整条 [[Prototype]] 链中是否出现过 Foo.prototype
```

- `Object.getPrototypeOf(..)`

```javascript
Object.getPrototypeOf(a) === Foo.prototype; // true

// getPrototypeOf 可直接获取一个对象的 [[Prototype]] 链
```

#### 原型的动态性

原型链在更新时是不起作用的。当我们对某个对象做出改变时，不会触及该对象的原型。

但我们对原型对象所做的任何修改都能立刻在实例上展现出来。如果我们添加/修改一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见

**子类得到的只是父类的一个副本。类的继承本质上是复制**

**即使是先创建了实例后再修改原型也是这样：**

```javascript
var friend = new Person();
Person.prototype.sayHi = function() {
  console.log('hi');
};
friend.sayHi(); // hi
```

但若是在实例化之后，重写整个原型对象，则再调用之前的旧实例时会报错。

#### 子类复写、添加方法

**给原型添加方法的代码一定要放在替换原型的语句之后**

```javascript
function Father() {
  this.father_name = 'ecmadao';
};
Father.prototype.getFatherName = function() {
  return this.father_name;
};

var Child = function() {
  this.child_name = 'cavalier';
};
// 继承了 Father
Child.prototype = new Father();

// 添加新方法
Child.prototype.getChildName = function() {
  return this.child_name;
};
// 重写超类中的方法
Child.prototype.getFatherName = function() {
  return 'hahaha';
};

var child = new Child();
child.getChildName(); // cavalier
child.getFatherName(); // hahaha
```

---

**包含引用类型值的原型属性会被所有实例共享**

```javascript
// bad example

function Father() {
  this.colors = ['red', 'black'];
};
function Child() {};

// 继承 Father
Child.prototype = new Father();

var child1 = new Child();
child1.colors.push('yellow');
console.log(child1.colors); // red,black,yellow

var child2 = new Child();
console.log(child2.colors); // red,black,yellow
```

在上例中，通过原型对象修改的属性被所有实例所共享。

**要在构造函数中，而不是原型对象中定义属性**

```javascript
function Father() {
  this.name = 'ecmadao';
};

function Child(){
  // 继承 Father
  // 在子类型构造函数的内部调用超类型构造函数
  Father.call(this, 'edward');
  // Father.apply(this)

  //添加实例属性
  this.age = 24;
};

var child = new Child();
console.log(child.name); // edward
console.log(child.age); // 24
```

```javascript
// good example

function Father() {
  this.colors = ['red', 'black'];
};

function Child() {
  // 继承 Father
  // 在子类型构造函数的内部调用超类型构造函数
  Father.call(this);
  // Father.apply(this)
};

var child1 = new Child();
child1.colors.push('yellow');
console.log(child1.colors); // red,black,yellow

var child2 = new Child();
console.log(child2.colors); // red,black
```