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