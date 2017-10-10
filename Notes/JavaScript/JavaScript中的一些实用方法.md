<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript 中的一些实用方法](#javascript-%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%AE%9E%E7%94%A8%E6%96%B9%E6%B3%95)
  - [Object.assign()](#objectassign)
  - [`扩展运算符 ...`](#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6-)
  - [FormData](#formdata)
  - [关于数组](#%E5%85%B3%E4%BA%8E%E6%95%B0%E7%BB%84)
  - [WeakMap](#weakmap)
    - [方法](#%E6%96%B9%E6%B3%95)
  - [js正则表达式](#js%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript 中的一些实用方法

> 偏重于ES6

### [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```javascript
Object.assign(target, ...sources);
```

把任意多个目标对象所拥有的**可枚举属性**拷贝给目标对象
返回被修改之后的 target

**继承属性和不可枚举属性不能被拷贝**

- 克隆对象

```javascript
let obj = {
	a: 1,
	b: 2
}

let copyObj = Object.assign({}, obj);
console.log(copyObj);
```

- 合并对象

```javascript
let 
obj1 = {a: 1},
obj2 = {b: 2},
obj3 = {c: 3};

let obj = Object.assign(obj1, obj2, obj3);

console.log(obj); // {a:1, b:2, c:3}
console.log(obj1); // {a:1, b:2, c:3}
```

- 修改对象（不改变原有对象，返回新对象）

```javascript
let obj1 = {
	name: 'ecmadao',
	age: 24
};

let obj2 = Object.assign({}, obj1, {name: 'edward'});

console.log(obj1); // {name: 'ecmadao', age: 24}
console.log(obj2); // {name" 'edward', age: 24}
```

当需要改变的目标对象属性嵌套层级很深时....


```javascript
let obj1 = {
	profile: {
		name: 'ecmadao',
		age: 24
	},
	job: 'developer'
}

let obj2 = Object.assign({}, obj1, [profile]: {name: 'edward'});

console.log(obj2);
// 输出
/**
* {
* 	profile: {
*  		name: 'edward',
*  	 	age: 24
*  },
*  job: 'developer'
* }
**/
```


### `扩展运算符 ...`

将一个数组转为用逗号分隔的参数序列

- 作为参数调用

```javascript
console.log(...[1, 2, 3]); // 1 2 3

let list = [1];
list.push(...[2, 3, 4]);
console.log(list); // [1, 2, 3, 4]
```

```javascript
function test(a, b, c) {
	// do something..
}
let arguments = [1, 2, 3];

test(...arguments);
```

- 数组合并

```javascript
let list = [1, 2, 3];

[a, b, ...list]; // [a, b, 1, 2, 3]

[...list, a, b]; // [1, 2, 3, a, b]
```

- 将字符串转换为数组

```javascript
let a = 'ecmadao';

[...a]; // ['e', 'c', 'm', 'a', 'd', 'a', 'o'];
```

### [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

- 构建 form

```javascript
// 手动构建一个form
let form = new FormData();
form.append(key, value);

// 使用 <form> 构建一个 form
let formObj = document.getElementById('form_dom');
// let $formObj = $('#form_dom')[0];
let form = new FormData(formObj);
```

- 发送数据

```javascript
formData.append(key, value); // 增加数据

// 若通过 dom 构建 form 并传输文件，则需要在 <form> 中加入:
<form enctype="multipart/form-data" method="post">
</form>
```

- 通过 jQuery 发送 FormData 时，

```javascript
$.ajax({
	url: url,
	type: 'post',
	data: formData,
	processData: false,  // 不要处理发送的数据
	contentType: false   // 不要设置Content-Type请求头
})
```

### 关于数组

`map()`
通过`.map((value, index) => {})` 
方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组

`some(callback)`
some中的callback返回一个布尔值。数组中的元素只要有一个返回true，则最终将返回true

`every(callback)`
every中的callback返回一个布尔值，只有当数组中的元素全部返回true的时候才返回true，否则返回false

`filter((value) => {})`
根据filter中的函数进行筛选，返回一个符合条件的list

`list.forEach((value, index) => {})`
对自身中的每一个元素进行操作

```javascript
const list = [1, 2, 3, 4];

const newList = list.map((value) => {
  return value * 2
}); 
console.log(newList); // [2, 4, 6, 8];
return list.some((value, index) => value < 3); // true
return list.every((value, index) => value < 3); // false
return list.filter((value, index) => value > 3); // [4]
return list.forEach((value, index) => value * 2); // [2, 4, 6, 8]
```

关于`map`
```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
/* roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9] */

["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

// 通常使用parseInt时,只需要传递一个参数.但实际上,parseInt可以有两个参数.第二个参数是进制数.可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 元素索引, 原数组本身.
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.

//应该使用如下的函数returnInt
function returnInt(element){
  return parseInt(element,10);
}

["1", "2", "3"].map(returnInt);
// [1,2,3]
```

### [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

> WeakMap对象就是简单的键/值映射.但键只能是对象值,不可以是原始值.
>
> 典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除

#### 方法

`const weakMap = new WeakMap();`

- `weakMap.get(key [, defaultValue])`
- `weakMap.set(key, value)`
- `weakMap.has(key)`
- `weakMap.delete(key)`
- `weakMap.clear()`

[利用`WeakMap`创建对象中的私有变量](https://gist.github.com/greim/44e54c2f23eab955bb73b31426e96d6c)

```javascript
const __ = new WeakMap();

class Foo {
  constructor(x) {
    __.set(this, { x });
  }
  getX() {
    var { x } = __.get(this);
    return x;
  }
}
```

### js正则表达式

[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)