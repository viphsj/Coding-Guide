<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译文】用ES6写更赞的JavaScript（1）](#%E8%AF%91%E6%96%87%E7%94%A8es6%E5%86%99%E6%9B%B4%E8%B5%9E%E7%9A%84javascript1)
  - [`let`，`const`以及它们的作用域](#letconst%E4%BB%A5%E5%8F%8A%E5%AE%83%E4%BB%AC%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F)
    - [`let` & `const`：谁在乎呢？](#let--const%E8%B0%81%E5%9C%A8%E4%B9%8E%E5%91%A2)
  - [动态的`this`](#%E5%8A%A8%E6%80%81%E7%9A%84this)
    - [箭头函数里的`this`](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E9%87%8C%E7%9A%84this)
  - [简写属性和方法](#%E7%AE%80%E5%86%99%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95)
    - [简写方法](#%E7%AE%80%E5%86%99%E6%96%B9%E6%B3%95)
    - [简写属性/计算属性](#%E7%AE%80%E5%86%99%E5%B1%9E%E6%80%A7%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)
    - [计算得出的属性名](#%E8%AE%A1%E7%AE%97%E5%BE%97%E5%87%BA%E7%9A%84%E5%B1%9E%E6%80%A7%E5%90%8D)
    - [`getter`&`setter`方法](#gettersetter%E6%96%B9%E6%B3%95)
  - [总结](#%E6%80%BB%E7%BB%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

```javascript
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

```javascript
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

```javascript
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

第一个循环的结果跟你像的一样，而第二个则打印了六次“I've waited 6 seconds!”

### 动态的`this`

作为一个能够做所有你想让它做的事情的东西，`this`在JavaScript中早就臭名昭著。

事实上，[规则很简单](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes)。不管怎样，在一些情景`this`会变得很笨拙：

```javascript
"use strict";

const polyglot = {
    name : "Michel Thomas",
    languages : ["Spanish", "French", "Italian", "German", "Polish"],
    introduce : function () {
        // this.name 是 "Michel Thomas"
        const self = this;
        this.languages.forEach(function(language) {
            // this.name is undefined, 所以我们得使用之前保存的self变量
            console.log("My name is " + self.name + ", and I speak " + language + ".");
        });
    }
}

polyglot.introduce();
```

在`introduce`的循环体内部，`this.name`是`undefined`。在`forEach`循环里，它提及到了`polyglot`这个Object。而通常，我们希望在函数的内部和外部，`this`都能指向同一个Object。

问题在于，JavaScript中的方法都会在调用过程中，[根据四个规则](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch2.md)创建它自己的`this`值。这样的机制被称为动态`this`。

这意味着，当引擎寻找`this`的时候，它所找到的那个并不一定是回调函数外部的那个。有两种传统方法解决这个问题：

  1. 将`this`在函数外部保存（通常赋值给`self`变量），然后在内部使用它
  2. 使用`bind`函数把`this`绑定在目标函数上

这两种方法都有效，但是一点也不简洁。

从另一个方面考虑，如果内部函数没有找到它们的`this`，JavaScript会像寻找其他变量一样寻找`this`：查看父作用域直到找到一个同名的变量。这就使得我们可以使用“附近的”`this`来替代函数内的`this`。

如果我们能够将内部的`this`指向外部的`this`，代码就会干净许多。你不这么认为吗？

#### 箭头函数里的`this`

在ES2015中，我们做到了这点。箭头函数没有绑定`this`变量，使得我们可以更好的利用`this`。我们可以这样重构上面的代码：

```javascript
"use strict";

let polyglot = {
    name : "Michel Thomas",
    languages : ["Spanish", "French", "Italian", "German", "Polish"],
    introduce : function () {
        this.languages.forEach((language) => {
            console.log("My name is " + this.name + ", and I speak " + language + ".");
        });
    }
}
```

一切都能像预期那样的工作了。

箭头函数有几种语法类型：

```javascript
"use strict";

let languages = ["Spanish", "French", "Italian", "German", "Polish"];

// 在多行箭头函数中，必须使用中括号，而且要有明确的返回值
let languages_lower = languages.map((language) => {
    return language.toLowerCase()
});

// 单行箭头函数中，中括号可选
// 并且函数隐式的返回了表达式的最终结果
// 你也可以显式的return一个值，不过这是可选的
let languages_lower = languages.map((language) => language.toLowerCase());

// 如果箭头函数只有一个参数，你都不需要使用小括号
let languages_lower = languages.map(language => language.toLowerCase());

// 反之，如果有多个参数，则必须使用小括号
let languages_lower = languages.map((language, unused_param) => language.toLowerCase());

console.log(languages_lower); // ["spanish", "french", "italian", "german", "polish"]

// 最后，如果箭头函数不接受参数，则必须使用一个空的小括号
(() => alert("Hello!"))();
```

[MDN文档里对于箭头函数给出了很好的介绍](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### 简写属性和方法

ES2015提供了一些定义属性和方法的途径。

#### 简写方法

在JavaScript中，方法是Object的一个参数，只不过以一个函数作为它的值：

```javascript
"use strict";

const myObject = {
    const foo = function () {
        console.log('bar');
    },
}
```

在ES2015中，我们可以简写成这样：

```javascript
"use strict";

const myObject = {
    foo () {
        console.log('bar');
    },
    * range (from, to) {
        while (from < to) {
            if (from === to)
                return ++from;
            else
                yield from ++;
        }
    }
}
```

你也可以使用生成器（generator）定义方法，需要做的只是在方法名前面加上（*）。

它们叫作方法描述符。和传统的方法有些近似，但有几点不同：

  - 可以在内部只使用`super`
  - 不允许用`new`调用

我会在之后的文章里说明`super`。如果你都等不及了，可以先看看这篇[Exploring ES6](http://exploringjs.com/es6/ch_classes.html)

#### 简写属性/计算属性

ES6里同样引入了简写属性和计算属性。

如果一个Object中的key的值和变量名称一样，那么就可以通过只写这个名称来达到跟`key: value`一样的效果。

```javascript
"use strict";

const foo = 'foo';
const bar = 'bar';

// 旧方法
const myObject = {
    foo : foo,
    bar : bar
};

// 新的做饭
const myObject = { foo, bar }
```

两个方法都会生成一个有`foo`和`bar`的key和对应的value，后者只是个语法糖。

当我使用[revealing module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)写公共API的时候，就经常使用简写属性。

```javascript
"use strict";

function Module () {
    function foo () {
        return 'foo';
    }

    function bar () {
        return 'bar';
    }

    // Write this:
    const publicAPI = { foo, bar }

    /* Not this:
    const publicAPI =  {
       foo : foo,
       bar : bar
    } */ 

    return publicAPI;
};
```

在上面的代码块中，我们创建并返回了publicAPI，它的key（foo，bar）对应着foo，bar方法。

#### 计算得出的属性名

ES6允许你用表达式当做变量名

```javascript
"use strict";

const myObj = {
  // 变量名与函数的返回值相等
    [foo ()] () {
      return 'foo';
    }
};

function foo () {
    return 'foo';
}

console.log(myObj.foo() ); // 'foo'
```

根据Dr. Raushmayer的[Exploring ES6](http://exploringjs.com/)介绍的，它的主要用途是保障属性名与[`Symbol`](https://scotch.io/tutorials/better-node-with-es6-pt-i)函数值相等。

#### `getter`&`setter`方法

最后，我想提及下`get`和`set`方法，虽说它们在ES5里就出现了。

```javascript
"use strict";

// 从 MDN上拿的 getter例子
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
const speakingObj = {
    // 追踪speak被调用的次数
    words : [],

    speak (word) {
        this.words.push(word);
        console.log('speakingObj says ' + word + '!');
    },

    get called () {
        // 返回最后一个单词
        const words = this.words;
        if (!words.length)
            return 'speakingObj hasn\'t spoken, yet.';
        else
            return words[words.length - 1];
    }
};

console.log(speakingObj.called); // 'speakingObj hasn't spoken, yet.'

speakingObj.speak('blargh'); // 'speakingObj says blargh!'

console.log(speakingObj.called); // 'blargh'
```

当使用getter的时候有几点要铭记：

  - getter不能接受参数
  - 不能有跟getter重名的方法
  - 你还可以通过`Object.defineProperty(OBJECT, "property name", { get : function () { . . . } })`创建getter

举个栗子说明最后一点：

```javascript
"use strict";

const speakingObj = {
    // 追踪speak被调用的次数
    words : [],

    speak (word) {
        this.words.push(word);
        console.log('speakingObj says ' + word + '!');
    }
};

// 只是为了这个例子而存在。实际上肯定不会这么写
function called () {
    // 返回最后一个单词
    if (!words.length)
        return 'speakingObj hasn\'t spoken, yet.';
    else
        return words[words.length - 1];
};

Object.defineProperty(speakingObj, "called", get : getCalled ) 
```

有了getter，就要增加setter。显而易见，setter使用自定义的方法改变Object上的属性值。

```javascript
"use strict";

// 创建一个全局的globetrotter!
const globetrotter = {
    // 在我们的globetrotter，当前的lang是：
    const current_lang = undefined,
    let countries = 0,
    // See how many countries we've travelled to
    get countryCount () {
        return this.countries;
    }, 
    // Reset current language whenever our globe trotter flies somewhere new
    set languages (language) {
        countries += 1;
        this.current_lang = language; 
    };
};

globetrotter.language = 'Japanese';
globetrotter.countryCount(); // 1

globetrotter.language = 'Spanish';
globetrotter.countryCount(); // 2
```

之前说到的getter需要注意的几点，对于setter同样适用。不过有一点不同：

  - 与getter不能接受参数这点不同，setter至少要接收一个参数

破坏任何一个规则都会抛出错误。

随着Angular 2中对TypeScript的应用，以及`class`关键字地位的逐渐突出，我预计`get`和`set`会变得越来越流行。

### 总结

JavaScript发展迅速，我们有必要掌握它基本的新特性。在这篇文章里，我们简要介绍了ES2015中的：

  - `let`和`const`以及它们的块作用域
  - `this`和箭头函数
  - 简写属性和方法，以及getter和setter方法

想要更深入的了解`let`和`const`以及它们的块作用域，可以查看这篇[Kyle Simpson's take on block scoping](https://davidwalsh.name/for-and-against-let)。如果只是想快速了解它们，那只要看MDN就行了。

如果你想更好的了解箭头函数，Dr Rauschmayer的[ECMAScript 6: arrow functions and method definitions](http://www.2ality.com/2012/04/arrow-functions.html)在这篇文章里对箭头函数进行了详细介绍。

最后，Dr Rauschmayer的书[Exploring ES6](http://exploringjs.com/)是最好的教材。