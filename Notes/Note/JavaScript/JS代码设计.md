## JS代码设计

### 链式调用

对象的方法返回对象自身，可以进行链式调用

### 尝试合并`set`与`get`方法

简单的例子，jQuery中普遍的方法:

```js
$element.attr('data'); // getter
$element.attr('data', 'test'); // setter
$element.attr('data') = 'test'; // setter
```

### 将序列化的对象作为函数参数

可以便捷的避免繁琐的操作

```js
$element.css({
	'color': 'white',
	'font-size': '18px'
});

function foo(obj) {
	obj.keys.map((key, index) => {
		// do something...
	});
}
```

### 考虑可能接收的参数类型，容错判断

### 避免`undefined`，使用`null`作为初始化值

### 设置默认参数