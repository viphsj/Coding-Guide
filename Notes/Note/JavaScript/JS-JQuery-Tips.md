---
title: 'JS & JQuery Tips'
date: 2016-03-03 23:45:04
tags: JavaScript
---
# js tips

### js动态加载CSS

```js
<script>
	var link = document.createElement( "link" );
	link.type = "text/css";
	link.rel = "stylesheet";
	var url = "//static.nutsbp.com/css/user/css/profile.css"
	link.href = url;
	document.getElementsByTagName( "head" )[0].appendChild(link);
</script>
```

### js动态加载js

```js
document.write("<script src='http:\/\/static.nutsbp.com\/js\/user\/me_form.js'><\/script>");
```

### 给通过JS动态生成的元素绑定事件

```js
$(document).on("click", ".target", function() {
	//获取目标元素
	var $target = $(e.target);
	// do something..
});
```

### 使用JavaScript获取CSS伪元素属性

```js
// 获取 .element:before 的 color 值  
var color = window.getComputedStyle(  
	document.querySelector('.element'),
	':before').getPropertyValue('color'); 

// 获取 .element:before 的 content 值  
var content = window.getComputedStyle(  
	document.querySelector('.element'),
	':before'  ).getPropertyValue('content');
```

### 禁止右键点击

```js
$(document).ready(function(){
	$(document).bind("contextmenu",function(e){
		return false;
	});
});
```

### 检查图片是否加载完成

```js
$('img').load(function () {
	console.log('image load successful');
});
```

### 自动修改破损图像

```js
$('img').on('error', function () {
	$(this).prop('src', 'img/broken.png');
});
```

### 验证元素是否存在于jquery对象集合中

```js
if ($('#id').length) {
	// do something
}
```

### 确认/取消对话框

```js
<script>
	like=window.confirm("how do you do?");
	if(like==true){
		document.write("fine");//confirm
	}
	else {
		document.write("nothing to say");//cancel
	}
</script>
```

### 发送邮件

```js
<a href=“mailto:xxx@xxx.com”></a>
//或者在js中
window.location.href = 'mailto:' + address;
```

### 监测浏览器窗口的大小改变

```js
$(window).on('resize', function() {
	//do something
});
```

### 监测按键

```js
$(document).on('keydown',function(event){
	var keyCode = event.keyCode;
	//do something
})
```

### 在head区域替换整张样式表
如果样式变动很多，那么可以将它独立出来，通过`@media`放在head区域

```html
<link rel="stylesheet" meida="(max-width:600px)" href="mobile_style.css">
```

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