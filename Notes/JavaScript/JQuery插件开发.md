<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [为jQuery写插件](#%E4%B8%BAjquery%E5%86%99%E6%8F%92%E4%BB%B6)
- [理解jquery的`$.extend()`、`$.fn`和`$.fn.extend()`](#%E7%90%86%E8%A7%A3jquery%E7%9A%84extend%E3%80%81fn%E5%92%8Cfnextend)
  - [`jQuery.fn`](#jqueryfn)
  - [`jQuery.extend(object)`](#jqueryextendobject)
  - [`jQuery.extend( target, object1, [objectN])`](#jqueryextend-target-object1-objectn)
  - [`jQuery.fn.extend(object);`](#jqueryfnextendobject)
  - [`jQuery.fn.extend = jQuery.prototype.extend`](#jqueryfnextend--jqueryprototypeextend)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: JQuery 插件开发
date: 2016-03-04 00:08:05
tags: JavaScript
---

### 为jQuery写插件
[原文链接](http://www.tuicool.com/articles/mQ7Rnye "为jQuery写插件")

定义html，假设我们要把test div修改成宽高都是200px，背景色为红色的这么一个插件功能

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<div id='test'></div>
		<script type='text/javascript' src="jquery-1.11.3.min.js"></script>
		<script type='text/javascript'></script>
	</body>
</html>
```

写一个名为test的插件函数，完成插件的功能。这里可以直接使用this，表示选择器选择的那个元素封装对象。

```js
function test(){
	this.css('background-color','red');
	this.css('width', '200');
	this.css('height', '200');
}
```
完成一个自执行函数，将jQuery传进去，关键就是把插件函数挂到jQuery.fn中去。

```js
(function(jquery){
	jquery.fn.test = test;
})(jQuery);
```

调用的时候，就用jQuery选择器选择test div后直接链式调用test插件函数即可。

```js
$('#test').test();
```

如此，最简单的插件就完成了。

代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<div id='test'></div>
	
		<script type='text/javascript' src="jquery-1.11.3.min.js"></script>
		<script type='text/javascript'>
			function test(){
				this.css('background-color','red');
				this.css('width', '200');
				this.css('height', '200');
			}
	
			(function(jquery){
				jquery.fn.test = test;
			})(jQuery);
	
			$('#test').test();
	
		</script>
	</body>
</html>
```

---

### 理解jquery的`$.extend()`、`$.fn`和`$.fn.extend()`
[原文链接](http://caibaojian.com/jquery-extend-and-jquery-fn-extend.html "理解jquery的$.extend()、$.fn和$.fn.extend()")

jQuery为开发插件提拱了两个方法，分别是：

- `jQuery.fn.extend();`
- `jQuery.extend();`

#### `jQuery.fn`

```js
jQuery.fn = jQuery.prototype = {
　　　init: function( selector, context ) {
　　　//….
　　　}
};
```

原来 `jQuery.fn = jQuery.prototype`对prototype肯定不会陌生啦

虽然 javascript　没有明确的类的概念，但是用类来理解它，会更方便。
jQuery便是一个封装得非常好的类，比如我们用语句`$("#btn1")`会生成一个jQuery类的实例。

#### `jQuery.extend(object)`

为jQuery类添加类方法，可以理解为添加静态方法。如：

```js
jQuery.extend({
	min: function(a, b) { return a < b ? a : b; },
	max: function(a, b) { return a > b ? a : b; }
});
jQuery.min(2,3); //  2 
jQuery.max(4,5); //  5
```

#### `jQuery.extend( target, object1, [objectN])`

用一个或多个其他对象来扩展一个对象，返回被扩展的对象

```js
var settings = { validate: false, limit: 5, name: "foo" }; 
var options = { validate: true, name: "bar" }; 
jQuery.extend(settings, options); 
```

结果：

```js
settings == { validate: true, limit: 5, name: "bar" }
```

#### `jQuery.fn.extend(object);`

对jQuery.prototype进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。

比如我们要开发一个插件，做一个特殊的编辑框，当它被点击时，便alert 当前编辑框里的内容。可以这么做：

```js
$.fn.extend({          
	alertWhileClick:function() {            
   		$(this).click(function(){                 
       	alert($(this).val());           
       });           
   }       
});       
$("#input1").alertWhileClick();
```

`$("#input1")`为一个jQuery实例，当它调用成员方法`alertWhileClick`后，便实现了扩展，每次被点击时它会先弹出目前编辑里的内容。

`jQuery.extend()`的调用并不会把方法扩展到对象的实例上，引用它的方法也需要通过jQuery类来实现，如`jQuery.init()`

而 **jQuery.fn.extend()的调用把方法扩展到了对象的prototype上，所以实例化一个jQuery对象的时候，它就具有了这些方法**，这是很重要的，在jQuery.JS中到处体现这一点

#### `jQuery.fn.extend = jQuery.prototype.extend`

你可以拓展一个对象到jQuery的 prototype里去，这样的话就是插件机制了。

```js
(function( $ ){
	$.fn.tooltip = function( options ) {
		//do something
	};
})( jQuery );
//等价于
(function( $ ){
	var tooltip = {
		function(options){
			//do something
		}
	};
	$.fn.extend(tooltip) = $.prototype.extend(tooltip) = $.fn.tooltip
})( jQuery );
```
