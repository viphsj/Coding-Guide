## 【译文】用ES6写更赞的JavaScript（1）

> 本文译自：[Better Node with ES6, Pt. I](https://scotch.io/tutorials/better-node-with-es6-pt-i)

随着ES2015的最终敲定和Node.js的稳重发展，现在终于可以说：未来离我们不远了。

...我老早就想这么说了。

这是真的。[V8引擎的高性能](http://v8project.blogspot.com/2016/03/v8-release-50.html)和Node对于ES2015特性的支持都为其生产环境发挥作用做好的准备。在Node中我们可以使用那些新的特性而不需要[Babel](https://babeljs.io/)或者[Traceur](https://github.com/google/traceur-compiler)这样的预处理器。

这篇文章将会介绍在Node中可用的下面几种ES2015特性：

  - `let`，`const`以及它们的作用域
  - 箭头函数
  - 简写属性和方法

Let's get to it.

### `let`，`const`以及它们的作用域

作用域代表着你的代码中，变量可见的那一块区域。换句话说，它规定了你声明的变量在哪些区域里可以使用。

我们都知道JavaScript会在函数内创建新的作用域。你所创建的作用域有98%都是函数作用域，它们通常由三种方法创建：

  1. 创建一个方法
  2. 创建一个`catch`块
  3. 创建一个代码块。当你在使用ES2015的时候，在代码块内声明的`let`和`const`变量仅仅在该代码块内可用。这种作用域叫作块作用域。

作用域仅仅是代码中的一个段落，`{like this}`。它们会随着`if/else`或者`try/catch/finally`的声明而自然出现。如果你想利用块作用域，也可以通过手动创建`{}`来完成。

来看看这个代码段：

```js
// 在 Node 中要使用严格模式
"use strict";

var foo = "foo";
function baz() {
    if (foo) {
        var bar = "bar";
        let foobar = foo + bar;
    }
    // foo 和 bar 在这儿都是可见的
    console.log("This situation is " + foo + bar + ". I'm going home.");

    try {
        console.log("This log statement is " + foobar + "! It threw a ReferenceError at me!");
    } catch (err) {
        console.log("You got a " + err + "; no dice.");
    }

    try {
        console.log("Just to prove to you that " + err + " doesn't exit outside of the above `catch` block.");
    } catch (err) {
        console.log("Told you so.");
    }
}

baz();

try {
    console.log(invisible);
} catch (err) {
    console.log("invisible hasn't been declared, yet, so we get a " + err);
}
let invisible = "You can't see me, yet"; // let 声明的变量没有变量提升
```

需要注意的几点：

  - 在`if`的外面，`foobar`不能被调用。因为我们使用`let`进行的声明
  - 在任何地方都能使用`foo`，因为我们是用`var`将其作为全局变量声明的
  - 在函数`baz`的内部我们可以随意使用`bar`，因为`var`声明的变量在它们的作用域内是完全可用的。
  - 在`let`或`const`声明之前该变量不可用。换句话说，它们不像`var`那样有变量声明

`const`和`let`很像：

  1. 必须先声明，再使用
  2. 不能重复声明和改变。否则会有`TypeError`

#### `let` & `const`：谁在乎呢？

既然我们都已经相安无事的使用`var`有二十余年了，那你肯定会对我们为什么还要用这些新变量。

好问题。这儿有一些使用`let`和`const`会给我们带来的好处：

  - `let`和`host`都不能变量提升。这增加了代码可读性。
  - 它们限制了变量作用域。因此命名空间不会再像之前那么困扰了。
  - 制止变量改变。`const`声明的变量不可变

`let`在循环体也非常有用：

```js
"use strict";

var languages = ['Danish', 'Norwegian', 'Swedish'];

// 污染了全局命名
for (var i = 0; i < languages.length; i += 1) {
    console.log(`${languages[i]} is a Scandinavian language.`);
}

console.log(i); // 4

for (let j = 0; j < languages.length; j += 1) {
    console.log(`${languages[j]} is a Scandinavian language.`);
}

try {
    console.log(j); // Reference error
} catch (err) {
    console.log(`You got a ${err}; no dice.`);
}
```

在`for`循环中使用`var`并没有只将变量包含在循环内。相反的，`let`做到了。

`let`对于每次循环的过程中重复绑定循环变量后很大优势。每个循环都有自己特有的拷贝，而不是共享一个全局变量。

```js
"use strict";

// 简单又干净
for (let i = 1; i < 6; i += 1) {
    setTimeout(function() {
        console.log("I've waited " + i + " seconds!");
    }, 1000 * i);
}

// 不能更糟
for (var j = 0; j < 6; j += 1) {
        setTimeout(function() {
        console.log("I've waited " + j + " seconds for this!");
    }, 1000 * j);
}
```