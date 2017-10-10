<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [React.js Tips](#reactjs-tips)
  - [~~使用`classSet()`操作className~~](#%E4%BD%BF%E7%94%A8classset%E6%93%8D%E4%BD%9Cclassname)
  - [`classnames`](#classnames)
  - [`update()` - 不可变数据的辅助工具](#update---%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%95%B0%E6%8D%AE%E7%9A%84%E8%BE%85%E5%8A%A9%E5%B7%A5%E5%85%B7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## React.js Tips

### ~~使用`classSet()`操作className~~

`classSet()`方法已经被React废弃，可以使用新的`classnames`插件

### [`classnames`](https://github.com/JedWatson/classnames)

在没有`classnames`的时候，我们如果要通过`state`或者`props`操作className，通常可能会这样：

```javascript
// inside some `<Message />` React component
render: function() {
  var classString = 'message';
  if (this.props.isImportant) {
    classString += ' message-important';
  }
  if (this.props.isRead) {
    classString += ' message-read';
  }
  // 'message message-important message-read'
  return <div className={classString}>Great, I'll be there.</div>;
}
```

如果有很多className需要操作，整个过程会变的非常繁琐。通过`classnames`就可以简化这个过程

需要先通过npm安装依赖：

```javascript
npm install classnames --save
```

使用方式：

```javascript
var classNames = require('classnames');
classNames('foo', 'bar'); // => 'foo bar'

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

单个/多个对象作为参数：

```javascript
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
```

数组作为参数同样有效：

```javascript
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```

### `update()` - 不可变数据的辅助工具

有时候可能会遇见这样的场景：

```javascript
constructor(props) {
	super(props);
	this.state = {
		a: {
			b: {
				c: {
					... // 继续嵌套
				}
			}
		}
	}
}

updateData() {
	// 需要改变this.state.a.b.c.....
}

useDataSomewhere() {
	// 需要拷贝一份this.state.a.b.c...
	// let data = this.state.a.b.c;
	//
	// do something and change it 
	// data = d;
}
```
多层嵌套的state需要改变，或者需要取出数据做一些操作（使数据变化）的时候，直接通过：

```javascript
myData.x.y.z = 7;
// or...
myData.a.b.push(9);
```
是不好的，因为通过 `=` 复制的只是一个引用，改变的时候原有的对象也会改变。你无法确定哪个数据改变了，因为之前的副本被覆盖了。相反，你需要创建一个新的myDate副本，仅仅改变需要改变的部分

使用React update 工具可以较简便的达成目的：

需要先通过npm安装依赖：

```javascript
npm install react-addons-update --save
```
命令介绍：

```javascript
//以$为前缀的键被称作命令。他们“改变”的数据结构被称为目标

{$push: array} 利用push()把目标上所有的元素放进数组

{$unshift: array} 利用unshift()把目标上所有的元素放进数组

{$splice: array of arrays} 依次使用 arrays 中的元素（array）作为参数，在目标对象（target）上调用 splice() 方法

{$set: any} 整体替换目标

{$merge: object} 合并目标和 object 的键

{$apply: function} 传入当前的值到函数，然后用新返回的值更新它
```

例子：

```javascript
// 入栈

var initialArray = [1, 2, 3];
var newArray = update(initialArray, {$push: [4]}); // => [1, 2, 3, 4]
```

```javascript
// 嵌入的集合

var collection = [1, 2, {a: [12, 17, 15]}];
var newCollection = update(collection, {2: {a: {$splice: [[1, 1, 13, 14]]}}});
// => [1, 2, {a: [12, 13, 14, 15]}]
```
获取 collection 中索引是2的对象，然后取得该对象键为 a 的值，删掉索引从 1 开始的 1 个元素（即移除 17 ），插入 13 和 14

```javascript
// 根据现有的值更新

var obj = {a: 5, b: 3};
var newObj = update(obj, {b: {$apply: function(x) {return x * 2;}}});
// => {a: 5, b: 6}
// This is equivalent, but gets verbose for deeply nested collections:
var newObj2 = update(obj, {b: {$set: obj.b * 2}});
```

```javascript
// （浅）合并

var obj = {a: 5, b: 3};
var newObj = update(obj, {$merge: {b: 6, c: 7}}); // => {a: 5, b: 6, c: 7}
```