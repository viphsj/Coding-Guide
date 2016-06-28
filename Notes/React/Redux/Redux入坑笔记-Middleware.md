<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Redux入坑笔记-Middleware](#redux%E5%85%A5%E5%9D%91%E7%AC%94%E8%AE%B0-middleware)
  - [当Redux遇见低版本浏览器](#%E5%BD%93redux%E9%81%87%E8%A7%81%E4%BD%8E%E7%89%88%E6%9C%AC%E6%B5%8F%E8%A7%88%E5%99%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Redux入坑笔记-Middleware

> components shouldn’t care whether something happens synchronously or asynchronously

stackoverflow上的一个问题的答案，回答了我们为什么要用中间件，以及如何使用异步中间件、如何在中间件中操作`state`：

[How to dispatch a Redux action with a timeout?](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

### 当Redux遇见低版本浏览器

批评低版本安卓浏览器，尤其批评微信内置浏览器。。

Redux更改state通常会使用`Object.assign()`，返回一个新Object，然而微信内置浏览器并不支持这个方法。。于是只能另寻插件喽

```javascript
$ npm install --save object-assign

// usage

import objectAssign from 'object-assign';
// 还好用法跟Object.assign()一样
// API
//objectAssign(target, source, [source, ...])
let test = objectAssign({}, {a: 1}, {b: 2});
console.log(test); // {a: 1, b: 2}
```