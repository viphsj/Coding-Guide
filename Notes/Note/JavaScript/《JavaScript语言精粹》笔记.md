---
title: 《JavaScript语言精粹》笔记
date: 2016-03-03 08:38:41
tags: JavaScript
---

## 第三章-对象

通过对象字面量建立对象：

```js
var obj = {
	name: 'ecmadao',
	age: 24,
	job: 'developer'
};
```

---

对象的索引：

```js
obj.name; //等同于
obj['name'];
```

建议以链式方法`obj.name`来调用，速度更快

---

** 对象通过引用来传递。它们不会被复制 **

---

### 原型：

每个对象都连接到一个原型对象。所有通过对象字面量创建的对象都连接到 `Object.prototype`

### 委托：

原型连接在更新时是不起作用的。当我们对某个对象做出改变时不会触及该对象的原型链。在索引值时，如果该对象没有索引的属性名，那么JavaScript会试着从原型对象中获取属性值。如果原型中也不存在则返回`undefined`

如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

---

获取/操作对象中的属性：

```js
// hasOwnProperty() 不检查原型链，返回true || false
obj.hasOwnProperty('name');

// for in 遍历一个对象中所有的属性名
for (name in obj){
	// do something here;
}

// delete 删除对象的某个属性，不会触及原型链
delete obj.name;
```

## 第四章-函数

函数字面量：

```js
var add = function(a + b) {
	return a + b;
}
```

---

函数的调用：

- 方法调用模式
- 函数调用模式
- 构造器调用模式
- apply调用模式

#### 方法/函数调用模式

当一个函数被保存为对象的一个属性时，称之为方法。并非是对象的属性时，则是被当做一个函数来调用的

```js
var myObj = {
	name: 'ecmadao',
	sayName : function() {
		console.log(this.name);
	}
}

//方法函数可以使用this访问自身对象（注意this作用域的坑）

var sayTest = function() {
	console.log('test');
}

//以此模式调用函数的时候绑定的全局对象
```

#### 构造器调用模式

在一个函数前带上 new 调用的时候，背地里会创建一个连接到该函数的`prototype`成员的新对象，同时this会绑定到那个新对象上（函数名以大写作为约定）

#### apply调用模式

apply方法让我们构建一个参数数组传递给调用函数。允许选择this的值。

apply方法接受两个参数，第一个是要绑定给this的值，第二个是参数数组。

```js
var anotherObj = {
	name: 'ws'
}

var status = myObj.apply(anotherObj);

status.sayName(); //作用域改变，输出ws
```

---

### 闭包

闭包是指有权访问另一个函数作用域中变量的函数。创建闭包的最常见办法是在一个函数内部嵌套创建另外一个函数，并访问函数内部的局部变量

闭包三特性：

- 函数嵌套函数
- 函数内部可以引用外部的参数和变量
- 参数和变量不会被垃圾回收机制回收

闭包缺点：

- 常驻内存。易内存泄露

```js
function outFunction(){
	var x = 10;
	var innerFunction(){
		x ++;
		console.log('x = ' + x);
	}
	return innerFunction;
}

var test = outFunction(); // test == innerFunction

test() // x = 11
test() // x = 12
// 局部变量会保持引用不会被释放。可以一直访问被创建时所处的上下文环境
```

---

### 模块

模块模式利用函数作用域/闭包/函数自调用来创建被绑定对象与私有成员的关联，可以用来生成安全的对象

一般形式：

- 一个定义了私有变量和函数的函数
- 利用闭包创建可以访问私有变量和函数的特权函数
- 返回特权函数，或者把它保存到一个可以访问到的地方

```js
var ModuleExample = (function(){
	var x = 1;
	var y = 1;
	add = function(a, b){
		console.log(a + b);
	}

	log = function(){
		console.log('x = ' + x + ', y = ' + y);
	}
	
	return {
		add: add
		log: log
	}

})();

var  moduleExample = new ModuleExample();

moduleExample.log(); //x = 1, y = 1
moduleExample.add(2, 2); //4
```

---

### 级联

让对象的方法返回`this`而不是undefined，那样的话就可以通过链式方法不断调用对象的方法

## 第五章-继承

当一个函数被创建时，Function构造器产生的函数对象会运行类似如下的代码：

```js
this.prototype = { constructor: this; }
```

新函数被赋予一个prototype属性，它的值是一个包含constructor属性且属性值为该新函数的对象

prototype对象是存放继承特征的地方

---

通过替换函数对象的prototype为父类的实例，来实现继承：

```js
// 基于类的继承
var Child = function(){};

Child.prototype = new Father();

// 以上可以扩展为一个新方法：
Function.method('inherits', function(Parent){
	this.prototype = new Parent();
	return this;
});
```


```js
//基于原型的继承

var father = {
	name: 'ecmadao',
	get_name: function(){ console.log(this.name); }
};

var children = Object.create(father);
```

## 数组方法

js允许数组包含任意混合类型的值

- 数组的合并 `array.concat(item1, item2,....)`

```js
//返回新数组，不修改原数组
newarray =array1.concat(array2);
```

- 数组末尾添加新元素 `array.push(item1, item2,...);`
- 移除数组末尾的元素 `array.pop();`
- 数组头部添加新元素 `array.unshift();`
- 移除数组首位的元素 `array.shift()`

```js
//push()方法修改array，返回array的新长度

//pop()/shift()方法都返回被移除的元素。在array为空时，返回undefined
```

- 删除数组中的元素 `delete`

```js
delete array[1]; //删除list中的第二位元素
// 这个方法会在数组中留下一个空洞（排在被删除元素之后的元素保留着它们最初的属性）
```

- 切除/替换数组中的元素 `array.splice(start, num, item...)`

```js
var array = [0, 1, 2, 3, 4];

array.splice(2, 1); //从第二位list[2]开始切除，切除1个元素

console.log(array); //[0, 1, 3, 4]

//第三个及之后的参数存在时，会用新的item替换切除的元素
// splice方法对于大型数组来说可能效率不高
```

- 获取数组中的数组段 `array.slice(start, end);`

```js
//slice方法对array中的一段做浅复制
//如果两个参数中的任一个参数为负数，array.length会和它们相加，试图让它们变成正数
```

- 枚举 `for val in array`，无法保障属性的顺序

Object.create()对于数组而言是没有意义的，因为它产生一个对象而不是数组，没有特殊的length属性

## 字符串方法

- `string.charAt(pos);`
- `string.indexOf(searchString, position);`
- `string.lastIndexOf(searchString, position);`
- `string.search(regexp);`

```js
// charAt(p) 返回p位置的字符串。p小于0或大于字符串长度时，返回空字符串
// indexOf(target, p) 从p位置开始查找target字符串，返回第一个匹配字符串的位置。没有找到则返回 -1
// lastIndexOf(target, p) 从字符串的末尾开始查找
// search(regexp) 接受一个正则表达式对象作为参数。此方法忽略g标识，没有position参数
```

- `string.replace(searchValue, replaceValue)`

```js
// 对字符串进行查找和替换，并返回一个新的字符串
// 参数searchValue可以是一个字符串或者一个正则表达式
// searchValue是字符串时，只有第一次匹配的地方会被替换；searchValue是正则表达式且带有g标识时，会替换所有的匹配。没有g标识则只替换第一个匹配
```

- `string.slice(start, end);`
- `string.substring(start, end);`

```js
// slice()中，若存在负数参数，则会与length值相加转换为正数
// substring()用法与slice()一样，但不接受负数参数
```

- `string.toLowerCase();`
- `string.toUpperCase();`

```js
//返回新字符串，string中的所有字母都转换格式
```
