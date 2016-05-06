## 【译文】用ES6写更赞的JavaScript（1）

> 本文译自：[Better Node with ES6, Pt. I](https://scotch.io/tutorials/better-node-with-es6-pt-i)

随着ES2015的最终敲定和Node.js的稳重发展，现在终于可以说：未来离我们不远了。

...我老早就想这么说了。

这是真的。[V8引擎的高性能](http://v8project.blogspot.com/2016/03/v8-release-50.html)和Node对于ES2015特性的支持都为其生产环境发挥作用做好的准备。在Node中我们可以使用那些新的特性而不需要[Babel](https://babeljs.io/)或者[Traceur](https://github.com/google/traceur-compiler)这样的预处理器。

这篇文章将会介绍在Node中可用的下面几种ES2015特性：

  - `let`和`const`
  - 箭头函数
  - 简写属性和方法

Let's get to it.

