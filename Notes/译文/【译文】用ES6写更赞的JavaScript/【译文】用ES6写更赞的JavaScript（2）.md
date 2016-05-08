## 【译文】用ES6写更赞的JavaScript（2）

> 本文译自：[Better JavaScript with ES6, Pt. II: A Deep Dive into Classes](https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes)

开始之前首先要说明的一点是：

> ES6的class并不真的是全新的东西：它提供了方便的语法来创建方法。
> 
> -- Axel Rauschmayer

从功能上讲，`class`比我们很早就有的“以原型链为基础的委托关系”做的更多。这篇文章从原型关系出发，带你了解ES2015的`class`。包括以下几点：

  - 定义和实例化类
  - 通过`extends`创建子类
  - 子类中的`super`
  - symbol方法的例子

### 后退一步：类不是什么

JavaScript中的类跟Java、Python或者任何面向对象语言里的类有很大不同。

在传统的面向对象语言里，你创建的类是Object的模板。当你需要新的Object的时候，只要实例化类，引擎就会拷贝类里的属性和方法到新的实体中，称之为实例。实例是一个Object，而且在实例化之后与他的父类完全没有联系。

JavaScript没有这样的拷贝方法。在JavaScript中，实例化一个类也会生成新的Object，但并没有从父类独立。

反之，实例化的结果会连接到它的原型。即便已经实例化过了，改变原型还是会影响到这个新生成的Object。

原型在JavaScript设计模式中及其有用。通过它提供的一些方法可以达到模拟传统类的效果。

总结：

  1. JavaScript没有严格意义上的类
  2. JavaScript中的类仅仅是创建原型链的语法糖

来让我们深入了解js中的类吧。

### 基础：声明&表达式

