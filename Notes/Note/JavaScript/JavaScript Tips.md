## JavaScript Tips

### `null` & `undefined `

注意`null`与`undefined`的区别:

- null 可用于初始化一个变量
- undefined代表变量未被初始化

**不要用null来检测是否传入了某个参数**

```js
// 反面教材（用null检测是否传入参数）
function deSomething(arg1, arg2, arg3){
	if(arg3 != null){
		// do something..
	}
}
```

**不要用null来检测一个未初始化的变量**

```js
// 反面教材（变量没有初始化就和null比较）
var person;
if(person != null){
	// do something..
}
```

**应该将null当做占位符使用**

```js
var person = null;

// ....

if(person != null){
	// do something..
}
```

**尽量避免使用特殊值undefined**

可以有效确保只在一种情况下`typeof`返回`undefined`：当变量为声明时

**使用null初始化变量**

```js
var person = null;
console.log(person === null); // true
console.log(person === undefined); // false
```

### `typeof`检测原始类型

JavaScript中的五种原始类型：字符串(string)、数字(number)、布尔值(boolean)、null、undefined

**可使用`typeof`检测 字符串、数字、布尔值、undefined的类型**

**未定义的变量和值为undefined的变量通过`typeof`都将返回`undefined`**

```js
let 
name = "ecmadao",
num = 5,
isTrue = true,
jsUndefined;

typeof name; // string
typeof num; // number
typeof isTrue; // boolean
typeof jsUndefined; // undefined
```

**可用`typeof`检测函数**

```js
function myFun(){};

typeof myFun; // function
```

### `instanceof`检测引用类型

**`typeof`检测引用类型的时候，会返回`object`**

```js
typeof []; // object
typeof {}; //object
typeof new Date(); // object
```



### `for..in`循环

`for..in`循环用于遍历对象属性，返回属性名

**循环不仅遍历对象的实例属性，也遍历原型属性**

**可使用`hasOwnProperty()`方法进行过滤**

```js
var props;
for (props in object){
	if(object.hasOwnProperty(props)){
		console.log(object[props]);
	}
}
```
