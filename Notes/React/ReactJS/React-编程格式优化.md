<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [组件命名与文件分类](#%E7%BB%84%E4%BB%B6%E5%91%BD%E5%90%8D%E4%B8%8E%E6%96%87%E4%BB%B6%E5%88%86%E7%B1%BB)
- [代码编写规范](#%E4%BB%A3%E7%A0%81%E7%BC%96%E5%86%99%E8%A7%84%E8%8C%83)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: React.js 编程格式优化
date: 2016-03-06 19:38:40
tags: React.js
---

> 使用ES6语法

## 组件命名与文件分类

- React组件名使用大驼峰式命名法（单词首字母大写）

```
class DefaultComponent extends Component {
	constructor(props) {
		super(props)
	}
}
```

- React组件的文件名应与包含的React组件一致，同样使用大驼峰式命名法

```js
DefaultComponent.jsx
	- 包含一个 <DefaultComponent />组件
```

- `import`与`export`React组件的时候，同样使用大驼峰式命名法

```js
import DefaultComponent from './DefaultComponent'

export default ComponentDemo;
```

- 如果一个文件夹内有很多jsx组件，它们全部构成一个React组件的话：
	- 总组件名与文件夹名一致
	- 包含总组件的jsx文件命名为index.jsx

```js
[folder] ComponentDemo
	- [file] index.jsx
		- [React Component] <ComponentDemo />
	- [file] DemoController.jsx
		- [React Component] <DemoController />
```

## 代码编写规范

- 对齐方式

```js
<DefaultComponent
  num="222"
  data={this.props.data}
/>

<DefaultComponent
  num="222"
  data={this.props.data}
>
  <DemoController /> // 终始在自闭合标签前面添加一个空格
</DefaultComponent>
```

- 如果组件的属性可以放在一行就保持在当前一行中

```js
<DefaultComponent num="222" data={this.props.data}/>
```

- 引号
	- JSX 的属性都采用双引号，其他的 JS 都使用单引号

- 属性
	- 属性名使用驼峰命名法
	- 当属性值等于true的时候，省略该属性的赋值

```js
<DefaultComponent defaultData={this.props.defaultData} />

<DefaultComponent isTrue={true} /> //bad
<DefaultComponent isTrue /> //good
```

- 括号
	- 使用括号包裹多行jsx

```
render() {
	return (
		<DefaultComponent
		  num="222"
		  data={this.props.data}
		>
		  <DemoController />
		</DefaultComponent>
	)
}
```