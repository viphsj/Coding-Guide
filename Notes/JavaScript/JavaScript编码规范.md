<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript编码规范](#javascript%E7%BC%96%E7%A0%81%E8%A7%84%E8%8C%83)
  - [使用 ES6 中的规范](#%E4%BD%BF%E7%94%A8-es6-%E4%B8%AD%E7%9A%84%E8%A7%84%E8%8C%83)
  - [文件与编码](#%E6%96%87%E4%BB%B6%E4%B8%8E%E7%BC%96%E7%A0%81)
  - [解构](#%E8%A7%A3%E6%9E%84)
  - [函数](#%E5%87%BD%E6%95%B0)
  - [属性与变量](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E5%8F%98%E9%87%8F)
  - [比较运算符](#%E6%AF%94%E8%BE%83%E8%BF%90%E7%AE%97%E7%AC%A6)
  - [代码美观](#%E4%BB%A3%E7%A0%81%E7%BE%8E%E8%A7%82)
  - [null & undefined](#null--undefined)
  - [命名规则](#%E5%91%BD%E5%90%8D%E8%A7%84%E5%88%99)
  - [jQuery相关](#jquery%E7%9B%B8%E5%85%B3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript编码规范

### 使用 ES6 中的规范

- 使用对象方法的简写

```javascript
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

- 使用对象属性的简写

```javascript
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```

- 在对象属性声明前把简写的属性分组

> 因为这样能清楚地看出哪些属性使用了简写

```javascript
const example = 'example';
const count = 100;

// bad
const obj = {
  number: 1,
  id: 2,
  count,
  three: 3,
  example
};

// good
const obj = {
  example,
  count,
  number: 1,
  id: 2,
  three: 3
};
```

- 使用拓展运算符 `...` 复制数组

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

### 文件与编码

- 静态常量分离，命名使用 "大写"+"_"

```javascript
// create a file named ConstValue.js

export var CONST_VALUE = 'constValue';

export var AMOUNT = 10;

// use const value...
// in index.js

import {
  CONST_VALUE,
  AMOUNT
} from './ConstValue.js';
```

- 字符串使用单引号 `''`

```javascript
// bad
const name = "Capt. Janeway";

// good
const name = 'Capt. Janeway';
```

### 解构

- **使用解构存取和使用多属性对象**

> 解构能减少临时引用属性

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

- 对数组使用解构赋值

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

- 需要回传多个值时，使用对象解构，而不是数组解构

> 增加属性或者改变排序不会改变调用时的位置

```javascript
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// 调用时需要考虑回调数据的顺序。
const [left, _, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// 调用时只选择需要的数据
const { left, right } = processInput(input);
```

### 函数

- 使用函数声明代替函数表达式

> 因为函数声明是可命名的，所以他们在调用栈中更容易被识别
>
> 此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升

```javascript
// bad
const foo = function () {
};

// good
function foo() {
}
```

```javascript
// 函数声明的名称和函数体都会被提升

function example() {
  getName(); // ecmadao

  function getName() {
    console.log('ecmadao');
  }
}
```

- 直接给函数的参数指定默认值，不要使用一个变化的函数参数

```javascript
// bad
function handleThings(opts) {
  // 不应该改变函数参数。
  opts = opts || {};
  // ...
}

// bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

- 当需要传递一个匿名函数，或使用函数表达式时，使用箭头函数

```javascript
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map(x => x * x);
```

### 属性与变量

- 使用 `.` 来访问对象的属性

```javascript
const person = {
  name: ecmadao,
  age: 24,
};

// bad
const myName = person['name'];

// good
const myName = person.name;
```

- 一直使用 `const` 来声明变量

> 避免全局命名空间的污染

- 对于不确定值的变量。可以初始化赋值`null`，通过 `value !== null` 判断

### 比较运算符

- use `!==` & `===` instead of `!=` & `==`

- 使用简写

```javascript
let name = '';
if(!name) {
  console.log('don\'t have name yet');
}
if(list.length) {
  // do something...
}
```

### 代码美观

- 使用 `//` 作为单行注释。在评论对象上面另起一行使用单行注释。在注释前插入空行

```javascript
function example(){
  const name = 'ecmadao';

  // this is an example
  function sayName() {
    console.log(name);
  }
}
```

- 注释前缀

> 对于需要简短说明的注释，在注释前使用前缀快速标注
>
> `FIXME` 代表需要 review 的代码段/标注问题
>
> `TODO` 则标注问题的可能解决方案

- 在花括号前放一个空格
- 在控制语句（if、while 等）的小括号前放一个空格

```javascript
function example() {}

if(true) {}
```

- 在使用长方法链时进行缩进。使用前面的点 `.` 强调这是方法调用而不是新语句

```javascript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
  highlight().
  end().
  find('.open').
  updateCount();

// good
$('#items')
  .find('.selected')
  .highlight()
  .end()
  .find('.open')
  .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
  .data(data)
  .enter().append('svg:svg')
  .classed('led', true)
  .attr('width', (radius + margin) * 2)
  .append('svg:g')
  .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
  .call(tron.led);
```

### null & undefined

- 不要用 null 来检测是否传入了某个参数
- 不要用 null 来检测一个未初始化的变量
- 把 null 当做占位符，初始化变量的时候赋值
- 如果所期望的值真的会是 null，则可以直接和 null 比较

```javascript
let person = null;
console.log(person === null); // true
console.log(person === undefined); // false

typeof null; // object
typeof undefined; // undefined
```

- 检测 函数/原始值 使用 `typeof`
- 检测 引用值/自定义类型 用 `instanceof`

### 命名规则

- 使用小驼峰式命名对象、函数和实例
- 使用大驼峰式命名构造函数或类
- 使用下划线 `_` 开头命名私有属性

```javascript
const exampleThree = 3;
function exampleController() {}

class User {}

this._name = 'ecmadao';
```

- 别保存 `this` 的引用。使用箭头函数
- 如果你的文件只输出一个类，那你的文件名必须和类名完全保持一致

### jQuery相关

- 使用 $ 作为存储 jQuery 对象的变量名前缀

```javascript
// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');
```

