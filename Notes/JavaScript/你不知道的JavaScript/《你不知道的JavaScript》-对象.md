<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript的对象](#javascript%E7%9A%84%E5%AF%B9%E8%B1%A1)
  - [类型](#%E7%B1%BB%E5%9E%8B)
  - [对象的内容](#%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%86%85%E5%AE%B9)
    - [对象属性](#%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)
    - [修改属性](#%E4%BF%AE%E6%94%B9%E5%B1%9E%E6%80%A7)
    - [复制对象](#%E5%A4%8D%E5%88%B6%E5%AF%B9%E8%B1%A1)
    - [不变性](#%E4%B8%8D%E5%8F%98%E6%80%A7)
    - [存在性](#%E5%AD%98%E5%9C%A8%E6%80%A7)
    - [对象属性的遍历](#%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E7%9A%84%E9%81%8D%E5%8E%86)
  - [对象创建](#%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA)
    - [构造器模式](#%E6%9E%84%E9%80%A0%E5%99%A8%E6%A8%A1%E5%BC%8F)
    - [原型模式](#%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript的对象

### 类型

在JavaScript中一共有六种主要类型：

- string
- number
- boolean
- null
- undefined
- object

简单基本类型`string, boolean, number, null, undefined`本身并不是对象

原始值 "I am a string" 并不是一个对象，它只是一个字面量，并且是一个不可变的值。如果要在这个字面量上执行一些操作，比如获取长度、访问其中某个字符，则需要将它转换为`String`对象。不过引擎会帮我们自动转换。

```js
var str = 'I am a string';

console.log(str.length); // 13

console.log(str.charAt(0)); // I

//引擎自动把string转换为String对象，因此可以访问属性和方法
```

### 对象的内容

#### 对象属性

**在对象中，属性名永远都是字符串**

- 数据属性
	- configurable：能否通过delete删除属性而重新定义属性；能否修改属性的特性；能否把属性修改为**访问器属性**。默认为true
	- enumerable：能否通过for-in循环返回这个属性。默认为true
	- writable：能否修改这个属性的数据值。默认为true
	- value：属性的数据值。默认为undefined

- 访问器属性：包含一对getter和setter函数。有如下4个特性：
	- configurable：能否通过delete删除属性而重新定义属性；能否修改属性的特性；能否把属性修改为**数据属性**。默认为true
	- enumerable:：能否通过for-in循环返回这个属性。默认为true
	- get：在读取属性时调用的函数。默认为undefined
	- set：在写入属性时调用的函数。默认为undefined

**访问器属性不能直接定义，必须使用Object.defineProperty()定义**

```js
//`_year`前面的下划线_是一种常用的符号，用于表示只能通过对象方法访问的属性
var book = {
  _year = 2015,
  edition = 1
};
Object.defineProperty(book, "year", {
  get : function(){
    return this._year;
  },
  set : function(newValue){
    if(newValue > 2015){
      this._year = newValue;
      this.edition += newValue - 2015;
    }
  }
});
book.year = 2016;
console.log(book.edition); //2
```

上例中，访问器属性year包含一个`getter`函数和一个`setter`函数。`getter`函数用于返回`_year`的值，`setter`函数用于设置`_year`的值并通过计算设置edition的值

#### 修改属性

`Object.defineProperty()`

- 添加一个属性或者修改一个已有属性（如果它是configurable）:

```js
var myObj = {};

Object.defineProperty(myObj, "a", {
	value: 2,
	writable: false, //只读
	configurable: true,
	enumerable: true
});

myObj.a; //2
```

- 一次定义多个属性

```js
var book = {};
Object.defineProperties(
  _year : {
    value : 2015
  },
  edition : {
    value : 1
  },
  yeat{
    get : function(){
      return thie._year;
    },
    set : function(newValue){
      if(newValue>2015){
        this._year = newValue;
        thie.edition += newValue -2015;
      }
    }
  },
);

//读取属性的特性
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor.value); //2015
console.log(descriptor.configurable); //false
console.log(typeof descriptor.get); //false

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value); //undefined
console.log(descriptor.enumerable); //false
console.log(typeof descriptor.get); //function
```

只有`configurable`为`true`，就可以使用`defineProperty(..)`方法来修改属性描述符。
当`configurable`为`false`时，无法使用`defineProperty`，且无法删除该属性

**在调用`Object.defineProperty()`时，如果不指定，`configurable`, `enumerable`, `writable`默认值都是`false`**

> 把`configurable`修改为`false`是单向操作，无法撤销
>
> 例外：即使属性为`configurable: false`，我们还是可以把`writable`的状态由`true`改为`false`，但无法由`false`改为`true`

#### 复制对象

浅复制 `Object.assign(..)`

第一个参数是目标对象，之后可以跟一个或多个源对象。它会遍历一个或多个源对象的所有可枚举(enumerable)的自有键(owned key)，并把它们复制到目标对象，最后返回目标对象：

```js
var myObject = {
	a : 2,
	b : [],
	c : anotherObj, //引用的一个外部对象
	d : anotherFun //引用的一个外部方法
}

var newObj = Object.assign({}, myObject);

newObj.a; // 2
newObj.c === anotherObj; // true
newObj.d === anotherFun; //true
```

由于`Object.assign(..)`就是使用`=`操作符来赋值，所以源对象属性的一些特性（比如`writable`）不会被复制到目标对象

#### 不变性

- 对象常量

不可修改、重定义或者删除

> writable: false
>
> configurable: false

- 禁止拓展

禁止一个对象添加新属性，并保留已有属性

> `Object.preventExtensions(obj);`

```js
var myObj = {
	a: 2,
};

Object.preventExtensions(myObj);
myObj.b = 3;
myObj.b; // undefined
```

- 密封

禁止扩展，也不能重新配置或者删除任何现有属性（但可以修改属性的值）

> `Object.seal(...)`

相当于`Object.preventExtensions(obj)` +`configurable: false`

- 冻结

密封一个对象，并把所有“数据访问”属性标记为writable: false

> `Object.freeze(..)`

相当于 `Object.seal(...)` + `writable: false`

#### 存在性

判断对象中是否存在某个属性：

- `in` : 检查对象与`Prototype`原型链，无所谓`enumerable`
- `for..in` : 检查对象与`Prototype`原型链，且`enumerable = true`
- `obj.hasOwnProperty(..)` : 只检查对象
- `obj.propertyIsEnumerable(..)` : 只检查对象，且`enumerable = true`
- `Object.keys(obj)` : 只检查对象，返回一个数组，包含所有可枚举属性
- `Object.getOwnPropertyName(obj)` : 只查找对象直接包含的属性，返回一个数组，无论是否可枚举

#### 对象属性的遍历

- `forEach(..)`

遍历数组中的所有值并忽略回调函数的返回值

- `every(..)`

一直运行到回调函数返回false

- `some(..)`

一直运行到回调函数返回true

- `for..in..`

无法直接获取属性值，因为它遍历的是对象中所有可枚举属性，需要手动获取属性值

- `for..of..`

遍历数组和有迭代器的对象

```js
var myArray = [1, 2, 3];
for (var v of myArray){
	console.log(v);
}
```

### 对象创建

#### 构造器模式

```js
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    console.log(this.name);
  };
};
var person1 = new Person('ecmadao',24,'developer');
var person2 = new Person('edward',24,'designer');
person1.sayName(); //ecmadao
person2.sayName(); //edward
```

执行步骤：

- 创建一个新对象
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
- 执行构造函数中的代码（为新对象添加属性和方法）
- 返回新对象

person1和person2分别保存着Person的不同实例。他们都有一个`constructor`(指向构造实例的函数)属性，该属性指向Person：

```js
console.log(person1.constructor == Person); //true
console.log(person2.constructor == Person); //true
```

---

**注1**

`.constructor`并不表示被构造
它不可被枚举，但值可写

```js
var Person = function(){};
var person = new Person();
person.constructor === Person(); // true,指向构造person的原型函数Person
Person.prototype.constructor === Person; // true
```

**注2**

应该使用`instanceof`来检测对象属性：

```js
console.log(person1 instanceof Object); //true 因为所有对象都继承自Object
console.log(person1 instanceof Person); //true
```

---

构造函数的使用：

```
//作为构造函数使用
var person = new Person('ecmadao',24,'developer');
person.sayName();

//作为普通函数使用
Person('ecmadao',24,'developer'); //添加到window
window.sayName();

//在另一个对象的作用域中使用
var o = new Object();
Person.call(o,'ecmadao',24,'developer');
o.sayName();
```

#### 原型模式

见下文==