<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript Tips-1](#javascript-tips-1)
  - [文件上传处理](#%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E5%A4%84%E7%90%86)
  - [通过拖拽上传文件](#%E9%80%9A%E8%BF%87%E6%8B%96%E6%8B%BD%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6)
  - [js动态加载CSS](#js%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BDcss)
  - [js动态加载js](#js%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BDjs)
  - [给通过JS动态生成的元素绑定事件](#%E7%BB%99%E9%80%9A%E8%BF%87js%E5%8A%A8%E6%80%81%E7%94%9F%E6%88%90%E7%9A%84%E5%85%83%E7%B4%A0%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6)
  - [使用JavaScript获取CSS伪元素属性](#%E4%BD%BF%E7%94%A8javascript%E8%8E%B7%E5%8F%96css%E4%BC%AA%E5%85%83%E7%B4%A0%E5%B1%9E%E6%80%A7)
  - [禁止右键点击](#%E7%A6%81%E6%AD%A2%E5%8F%B3%E9%94%AE%E7%82%B9%E5%87%BB)
  - [检查图片是否加载完成](#%E6%A3%80%E6%9F%A5%E5%9B%BE%E7%89%87%E6%98%AF%E5%90%A6%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%88%90)
  - [自动修改破损图像](#%E8%87%AA%E5%8A%A8%E4%BF%AE%E6%94%B9%E7%A0%B4%E6%8D%9F%E5%9B%BE%E5%83%8F)
  - [验证元素是否存在于jquery对象集合中](#%E9%AA%8C%E8%AF%81%E5%85%83%E7%B4%A0%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E4%BA%8Ejquery%E5%AF%B9%E8%B1%A1%E9%9B%86%E5%90%88%E4%B8%AD)
  - [确认/取消对话框](#%E7%A1%AE%E8%AE%A4%E5%8F%96%E6%B6%88%E5%AF%B9%E8%AF%9D%E6%A1%86)
  - [发送邮件](#%E5%8F%91%E9%80%81%E9%82%AE%E4%BB%B6)
  - [监测浏览器窗口的大小改变](#%E7%9B%91%E6%B5%8B%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AA%97%E5%8F%A3%E7%9A%84%E5%A4%A7%E5%B0%8F%E6%94%B9%E5%8F%98)
  - [监测按键](#%E7%9B%91%E6%B5%8B%E6%8C%89%E9%94%AE)
  - [在head区域替换整张样式表](#%E5%9C%A8head%E5%8C%BA%E5%9F%9F%E6%9B%BF%E6%8D%A2%E6%95%B4%E5%BC%A0%E6%A0%B7%E5%BC%8F%E8%A1%A8)
  - [`null` & `undefined `](#null-&-undefined-)
  - [`typeof`检测原始类型](#typeof%E6%A3%80%E6%B5%8B%E5%8E%9F%E5%A7%8B%E7%B1%BB%E5%9E%8B)
  - [`instanceof`检测引用类型](#instanceof%E6%A3%80%E6%B5%8B%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B)
  - [`for..in`循环](#forin%E5%BE%AA%E7%8E%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript Tips-1

### 文件上传处理

```html
<input type="file" onchange="processFile(this.file)"/>
```

```javascript
const processFile = (files) => {
  let file = files[0];
  let fileName = file.name;
  let reader = new FileReader();
  reader.onload = (e) => {
    // if file is a image
    // let url = e.target.result;
  }
  reader.readAsText(file); // 只能处理包含文本内容的文件
  reader.readAsDataUrl(file); // 处理图片文件
}
```

### 通过拖拽上传文件

```html
<div id="dropFile">拖拽上传</div>
```

```javascript
$(function(){
  let dropFile = document.getElementById('dropFile');
  dropFile.ondragenter = ignoreDrag;
  dropFile.ondragover = ignoreDrag;
  dropFile.ondrop = drop;
  
  const ignoreDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  const drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let data = e.dataTransfer;
    let files = data.files;
    
    processFile(files)
  }
})
```

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