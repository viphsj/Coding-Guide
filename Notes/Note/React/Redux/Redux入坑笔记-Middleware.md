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