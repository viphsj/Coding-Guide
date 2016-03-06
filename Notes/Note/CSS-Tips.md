---
title: CSS Tips
date: 2016-03-04 17:06:04
tags: css
---

### 页面变灰

在`<body>`中加入`class="be-gray"`

```sass
.be-gray{
	filter: grayscale(100%);//IE浏览器
	-webkit-filter: grayscale(100%);//谷歌浏览器
	-moz-filter: grayscale(100%);//火狐
	-ms-filter: grayscale(100%);
	-o-filter: grayscale(100%);
	filter:
		progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
 	-webkit-filter: grayscale(1);//谷歌浏览器
}
```

### 截断字符串

```
<div id="test"> 
	任意长度的字符串任意长度的字符串 
	任意长度的字符串任意长度的字符串 
	任意长度的字符串任意长度的字符串
</div>
```

```
#id{
  width:300px;
  
  //一下三个必须全部加上
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
```

`text-overflow`:

- clip : 修剪文本
- ellipsis : 显示省略符号(...)来代表被修剪的文本
- string : 使用给定的字符串来代表被修剪的文本
  
`white-space`:

- normal : 默认值。文本自动处理换行。假如抵达容器边界内容会转到下一行
- pre : 换行和其他空白字符都将受到保护
- nowrap : 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象

### `box-sizing`

当一个元素加入了边框属性时，边框会被加在元素宽度的外围。此时，元素的实际宽度将大于设定的`width`值。
为了避免这个问题，可以使用：

```
box-sizing:border-box;
```
那样的话，边框就会位于元素的内侧，元素的总宽度就不会改变

### `X:nth-child(n)`

该选择器选择的是，X元素的父元素下，第n个(从1开始计数)子元素

若该子元素不是X元素，则该选择器无效。只有是X元素时才能被选上

### 让元素不捕获事件

```
pointer-events: none;
```

[ 有哪些暖心却鲜为人知的属性？](https://www.zhihu.com/question/39817183)

### 通过3在元素内部（内部的前面或者后面）动态添加元素

- `::before`
- `::after`

- 作用一

```
//建立一个和父元素大小相同的伪元素
div::before {
	content: ''; //添加元素的内容
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
```
通过这种形式可以添加一个没有内容的空区域，进行多重的阴影效果布局

- 作用二

```
div::after {
	content: '';
	display: block;
	clear: both;
}
```
当父元素内有浮动子元素，且父元素高度不定，需要被子元素撑起时，通过给`::after`设置`clear: both`，可以完美达到效果

### 使用负的`nth-child`选取元素

```
//使用负的 nth-child 在 1 到 n 之间选择元素
li {
	display: none;
}
//选择第1到第3个元素并显示它们
li:nth-child(-n + 3) {
	display: block;
}
```

### currentColor是color属性的值

```
div{
  width: 200px;
  height: 200px;
  color: #343434;
  border: 1px solid currentColor;
}
```

### `user-select`禁止选择文本

```
div{
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
```

### `selection`可设置文字被选择时的样式

```
&::selection {
    background: #FE6E66;
    color: #FFF;
}
```