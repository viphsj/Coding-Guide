## 【译文】你需要知道的四种JavaScript设计模式

> 本文译自：[4 JavaScript Design Patterns You Should Know](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know)

![4-javascript-design-patterns-you-should-know](../../image/4-javascript-design-patterns-you-should-know/4-javascript-design-patterns-you-should-know.png)

每个开发者都努力写出可维护的、易读易用的代码。当应用变的越来越大时，代码结构也越来越重要。而设计模式对于解决这个问题至关重要--它对于特殊状况提供了普遍适用的解决方案。

当开发网站的时候，JavaScript开发者往往在无意识中使用了设计模式。

而且，虽然对于某个特定的情况都有很多的设计模式可供选择，但JavaScript开发者往往趋向于选择其中某几种。在接下来，我就会带你们了解这几张普遍常用的设计模式，包括：

  - 模型
  - 原型
  - 观察者
  - 单例

每种模式都由很多点组成，而我会着重强调下面几点：

  1. **上下文**：这个模式是在什么情景下使用的？
  2. **问题**：我们尝试用它去解决什么问题？
  3. **解决方案**：它是如何解决我们的问题的？
  4. **实践**：使用这个设计模式进行实践

### 模型

JavaScript的模型是为了保障一段代码和其他的组件独立，它是js中大量运用的设计模式。它提供了低耦合的代码结构。

相对于那些类似于面向对象的语言，模型是JavaScript中的“类”。类的一大好处是封装--保护自身状态和行为。模型模式对公有代码和私有代码都同样适用。

为了建立各个私有作用域，模型应该是“立即自调用”（IIFE）的--一个保护自身变量和方法的闭包（它返回一个对象而不是方法）。它看起来像下面这样：

```js
(function() {
    // declare private variables and/or functions
    return {
      // declare public variables and/or functions
    }
})();
```

在这段代码里，在我们返回目标对象之前，首先实例化了私有属性和方法。闭包的外面和它不属于同一个作用域，因此无法直接调用那些私有变量。来看看更多例子：

```js
var HTMLChanger = (function() {
  var contents = 'contents'
  var changeHTML = function() {
    var element = document.getElementById('attribute-to-change');
    element.innerHTML = contents;
  }
  return {
    callChangeHTML: function() {
      changeHTML();
      console.log(contents);
    }
  };
})();

HTMLChanger.callChangeHTML();       // Outputs: 'contents'
console.log(HTMLChanger.contents);  // undefined
```

请注意，`callChangeHTML`在IIFE返回的Object里，因而可以在`HTMLChanger`的命名空间下被调用。但是对于没有暴露出去的内容则无法调用。

#### 暴露模型模式

模型模式的一个变种叫作暴露模型模式。它的目的是保持代码封装，同时通过返回的对象，暴露出去特定的变量和方法。看个直白的例子：

```js
var Exposer = (function() {
  var privateVariable = 10;

  var privateMethod = function() {
    console.log('Inside a private method!');
    privateVariable++;
  }

  var methodToExpose = function() {
    console.log('This is a method I want to expose!');
  }

  var otherMethodIWantToExpose = function() {
    privateMethod();
  }

  return {
      first: methodToExpose,
      second: otherMethodIWantToExpose
  };
})();

Exposer.first();        // Output: This is a method I want to expose!
Exposer.second();       // Output: Inside a private method!
Exposer.methodToExpose; // undefined
```

尽管看着还不错，但有一个缺点是，它无法使用私有方法。这会给单元测试造成麻烦。同样的，公共方法也无法被重写。

### 原型模式

任何一个JavaScript开发者都听说过**原型**，或许还会为原型继承而感到困惑。原型继承模式依赖于[JavaScript原型继承](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)，它主要用来在表现密集的场景下创建对象。

在原型模式下，创建的对象都是原始对象的拷贝（浅拷贝）。使用这种设计模式的一个目的是创建一个可以被应用中其他部分使用的对象。如果其他部分要使用这个对象，