<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译文】Javascript函数式编程【3】](#%E8%AF%91%E6%96%87javascript%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B3)
  - [使用函数创造函数](#%E4%BD%BF%E7%94%A8%E5%87%BD%E6%95%B0%E5%88%9B%E9%80%A0%E5%87%BD%E6%95%B0)
  - [更多的函数块](#%E6%9B%B4%E5%A4%9A%E7%9A%84%E5%87%BD%E6%95%B0%E5%9D%97)
    - [作用域](#%E4%BD%9C%E7%94%A8%E5%9F%9F)
    - [特殊的参数变量](#%E7%89%B9%E6%AE%8A%E7%9A%84%E5%8F%82%E6%95%B0%E5%8F%98%E9%87%8F)
    - [`call`和`apply`](#call%E5%92%8Capply)
    - [匿名函数](#%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0)
    - [预留参数](#%E9%A2%84%E7%95%99%E5%8F%82%E6%95%B0)
    - [构造（`Compose`）](#%E6%9E%84%E9%80%A0compose)
    - [柯里化](#%E6%9F%AF%E9%87%8C%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 【译文】Javascript函数式编程【3】

> 本文译自：[A GENTLE INTRODUCTION TO FUNCTIONAL JAVASCRIPT: PART 2](http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-arrays/)

这篇文章是JavaScript函数式编程系列的第三部分。在上一篇里，我们将函数的一些特性运用到了Array身上。这这一篇里面，我们会更深入一步--用函数创造函数。

  1. [Part1：动机和代码块](【译文】Javascript函数式编程【1】.md)
  2. [Part2：使用Array和List](【译文】Javascript函数式编程【2】.md)
  3. Part3：使用函数创造函数
  4. Part4：Doing it with style

### 使用函数创造函数

在上一篇的文末，我所说的要更进一步深入函数式并不适合所有人。那时因为一旦你尝试过list-progressing函数，一切都会变的不一样了。我的意思是函数将会变的更加抽象。首先，我们把`for`循环抽象成了`map`和`reduce`，而它的下一个阶段就是重构创建函数的模式。创建函数是种强大又优雅的方式，但和你之前习惯的JavaScript有些许不同。

### 更多的函数块

创建函数的函数有时被称作高阶函数。为了能够理解它们，我们先来看下JavaScript中为创建高阶函数提供可能的特性。

#### 作用域

首先要理解的是JavaScript中的作用域。在JavaScript中，如果你在函数内部定义了一个变量，那么它就不能被外面的函数所引用。例如：

```js
var thing = 'bat';
    
var sing = function() {
    // This function can 'see' thing
    var line = 'Twinkle, twinkle, little ' + thing;
    log(line);
};

sing();
// Twinkle, twinkle, little bat

// Outside the function we can't see message though
log(line);
// undefined
```

但是如果我们在函数内部定义了变量，函数内部的其他内部函数则可以使用这个外部的变量：

```js
var outer = function() {
    var outerVar = 'Hatter';
    var inner = function() {
         // We can 'see' outerVar here
         console.log(outerVar);
         // Hatter
         
         var innerVar = 'Dormouse';
         // innerVar is only visible here inside inner()
    }
    
    // innerVar is not visible here.
}
```

这个特性超有用，规则也很直接。但是如果我们想把变量作为参数四处传递的时候，哪个函数可以看见哪个变量就会变的难以追踪。如果你感到了困惑，请静心想想：看下你在哪儿定义的函数。从那个地方出发，有哪些变量是这个函数可以引用的？如果只是四处寻找自己调用方法的地方的话，则很有可能只是徒劳。

#### 特殊的参数变量

当你创建一个函数的时候，它会创建一个特殊的参数变量叫作`arguments`，是一个类似数组的玩意，里面包含了所有传给这个函数的参数。例如：

```js
var showArgs = function(a, b) {
    console.log(arguments);
}
showArgs('Tweedledee', 'Tweedledum');
//=> { '0': 'Tweedledee', '1': 'Tweedledum' }
```

需要注意的是输出的`arguments`更像是一个以数字做key的Object，而不是一个真正的Array。

真正有趣的是不管定义了多少参数，`arguments`能够获取所有传入方法的参数。因此，如果你给函数传递了额外的参数，它还是会被`arguments`收录。

```js
showArgs('a', 'l', 'i', 'c', 'e');
//=> { '0': 'a', '1': 'l', '2': 'i', '3': 'c', '4': 'e' }
```

`arguments`像Array一样，拥有`length`属性。

```js
var argsLen = function() {
    console.log(arguments.length);
}
argsLen('a', 'l', 'i', 'c', 'e');
//=> 5
```

将`arguments`当做真正的Array会非常有用。我们可以利用`slice`方法把`arguments`转成真正的Array：

```js
var showArgsAsArray = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log(args);
}
showArgsAsArray('Tweedledee', 'Tweedledum');
//=> [ 'Tweedledee', 'Tweedledum' ]
```

`arguments`参数在创建函数的时候经常用到，之后我们就能看见它有多么得心应手。

#### `call`和`apply`

我们在之前已经学过，js中的Array有一些诸如`.map`和`.reduce`的内置方法。其实吧函数也有自己的内置方法。

最普遍的调用函数的方法是在函数名后面使用圆括号。例如：

```js
function twinkleTwinkle(thing) {
    console.log('Twinkle, twinkle, little ' + thing);
}
twinkleTwinkle('bat');
//=> Twinkle, twinkle, little bat
```

函数自己的一个内置方法叫作`call`，它可以让你使用其他方式调用函数：

```js
twinkleTwinkle.call(null, 'star');
//=> Twinkle, twinkle, little star
```

`.call`的第一个参数定义了需要传入函数内部的特殊作用域。现在可以忽略它。这之后的其他参数都会直接作为目标函数的参数传入。

除此之外还有个类似的`.apply`方法。与一个个传入参数所不同的是，`apply`允许你把参数作为一个Array传入，例如：

```js
twinkleTwinkle.apply(null, ['bat']);
//=> Twinkle, twinkle, little bat
```

这两个方法在我们创建“创建函数的函数”的时候非常有用。

#### 匿名函数

JavaScript允许我们直接书写函数而不用先定义。这经常用在`map`和`reduce`里。例如：

```js
var numbers = [1, 2, 3];
var doubledArray = map(function(x) { return x * 2}, numbers);
console.log(doubledArray);
//=> [ 2, 4, 6 ]
```

这样的函数被称为匿名函数。有时也被称为`lambda`函数。

#### 预留参数

有时候不一定能给函数传满参数。例如，我们创建一个`addClass()`函数，接收`class`和DOM元素作为参数：

```js
var addClass = function(className, element) {
    element.className += ' ' + className;
    return element;
}
```

我们想让它和`map`函数一起使用，给每个元素加上class。但有个问题：`map`遍历Array中的每个元素并把它们作为参数传给回调函数。但我们怎么告诉`addClass`方法应该添加哪个class？

解决方案是创建一个新函数，通过它来告诉`addClass`我们想添加的class：

```js
var addTweedleClass = function(el) {
    return addClass('tweedle', el);
}
```

现在我们就得到了只需要一个参数的函数：

```js
var ids = ['DEE', 'DUM'];
var elements = map(document.getElementById, ids);
elements = map(addTweedleClass, elements);
```

可是如果我们要加入其它class，则需要创建新的函数：

```js
var addBoyClass = function(el) {
    return addClass('boy', el);
}
```

我们开始重复代码了。。所以我们看看能不能找到它们相同的模式。如果我们再创建个函数来生成上面的函数呢？

```js
var partialFirstOfTwo = function(fn, param1) {
    return function(param2) {
        return fn(param1, param2);
    }
}
```

由此创建了一个返回匿名函数的函数。匿名函数需要接受一个参数，然后再返回一个函数。

```js
var addTweedleClass = partialFirstOfTwo(addClass, 'tweedle');
var addBoyClass = partialFirstOfTwo(addClass, 'boy');

var ids = ['DEE', 'DUM'];
var elements = map(document.getElementById, ids);
elements = map(addTweedleClass, elements);
elements = map(addBoyClass, elements);
```

当这个方法只需要传入两个参数的时候一切正常。但如果要传入三个参数呢？或者四个？针对这种情况，我们需要创建更通用的函数：

```js
var argsToArray(args) {
    return Array.prototype.slice.call(args, 0);
}

var partial = function() {
    // 将 arguments 转成 array 
    var args = argsToArray(arguments);

    // 取出 function (第一个参数). 之后 args 里面是剩下的参数
    var fn = args.shift();

    // Return a function that calls fn
    return function() {
        var remainingArgs = toArray(arguments);
        return fn.apply(this, args.concat(remainingArgs));
    }
}
```

这个函数允许我们传入任意多的参数，最终将参数传给目标函数。

```js
var twinkle = function(noun, wonderAbout) {
    return 'Twinkle, twinkle, little ' +
        noun + '\nHow I wonder where you ' +
        wonderAbout;
}

var twinkleBat = partial(twinkle, 'bat', 'are at');
var twinkleStar = partial(twinkle, 'star', 'are');
```

JavaScript有个叫`bind`的内置方法，它对所有方法都有效。它的第一个参数是你想要把`this`绑定到的Object，使得`this`所在的作用域传入到函数内部。这意味着，如果你想要把一些东西部分的`apply`到`document.getElementById`上，你需要把`document`作为参数传给`bind`

```js
var getWhiteRabbit = document.getElementById.bind(document, 'white-rabbit');
var rabbit = getWhiteRabbit();
```

然而我们并不需要`this`这个特殊的变量（尤其是我们使用了函数式编程），因此我们以`null`作为第一个参数传入。例如：

```js
var twinkleBat = twinkle.bind(null, 'bat', 'are at');
var twinkleStar = twinkle.bind(null, 'star', 'are');
```

你可以在这儿查看等多和[bind](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)有关的内容。

#### 构造（`Compose`）

我在上一篇里说过，函数式编程就是创造小型的简单的函数，并把它们组合成大型函数。它的一部分用途是作为工具，让整个编程过程变的简单。我们可以利用它来把`addClass`函数转为可以使用`map`的函数。而“构造”则是让它们组合在一起的工具。

最简单的例子由两个函数组成，a和b，它们两个都接受一个参数。`Compose`创建出第三个函数c。以x作为参数调用c，返回a的被调用函数，其中，以b的被调用结果（以x为参数）作为参数（译者注：我已晕。。这种东西直接上例子多清晰。）。这特么什么鬼（译者注：我表示赞同）。还是举个例子吧：

```js
var composeTwo = function(funcA, funcB) {
    return function(x) {
        return funcA(funcB(x));
    }
}

var nohow = function(sentence) {
    return sentence + ', nohow!';
}
var contrariwise = function(sentence) {
    return sentence + ' Contrariwise…';
}

var statement = 'Not nothin&amp;rsquo;';
var nohowContrariwise = composeTwo(contrariwise, nohow);
console.log(nohowContrariwise(statement));
//=> Not nothin&amp;rsquo;, nohow! Contrariwise…
```

看着真棒。使用`composeTwo`可以让我们爽很长一段时间了。可是，如果你开始使用“纯函数”（我们迟点讲它）的话，你就会发现要把不只两个函数组合到一起。为此我们需要一个适应面更广的`compose`函数：

```js
var compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        i = i - 1;
        while (i >= 0) {
            result = args[i].call(this, result);
            i = i - 1;
        }
        return result;
    };
};
```

第一眼看上去，`compose`好像没那么神奇。我们可以这样用`compose`函数：

```js
var nohowContrariwise = compose(contrariwise, nohow);
```

可是这样看起来并不比下面的写法简洁：

```js
var nohowContrariwise = function(x) {
    return nohow(contrariwise(x));
}
```

`compose`的真正威力在于将它和柯里化函数组合的时候可以非常简洁。就算不是柯里化函数，与其他函数进行组合也可以让代码变的简洁。例如，想象一下有下面这首诗：

```js
var poem = 'Twas brillig, and the slithy toves\n' + 
    'Did gyre and gimble in the wabe;\n' +
    'All mimsy were the borogoves,\n' +
    'And the mome raths outgrabe.';
```

它在浏览器中的表现可不怎么样，因此我们需要给他加一些分段，顺便把难懂的"brillig"换成其他单词。我们要把整首诗放进`<p></p>`标签里并作为引语。先从两个简单的函数开始：

```js
var replace = function(find, replacement, str) {
    return str.replace(find, replacement);
}

var wrapWith = function(tag, str) {
    return '<' + tag + '>' + str + '</' + tag + '>'; 
}

var addBreaks      = partial(replace, '\n', '<br/>\n');
var replaceBrillig = partial(replace, 'brillig', 'four o’clock in the afternoon');
var wrapP          = partial(wrapWith, 'p');
var wrapBlockquote = partial(wrapWith, 'blockquote');

var modifyPoem = compose(wrapBlockquote, wrapP, addBreaks, replaceBrillig);

console.log(modifyPoem(poem));
//=> <blockquote><p>Twas four o’clock in the afternoon, and the slithy toves<br/>
//   Did gyre and gimble in the wabe;<br/>
//   All mimsy were the borogoves,<br/>
//   And the mome raths outgrabe.</p></blockquote>
```

值得一提的是，当你把参数从左到右的传给`compose`函数，他们将会按照反转的顺序进行调用。一些人会对此感到困惑。因此还有一种从左到右正常调用的方法叫`pipe`或`flow`:

```js
var modifyPoem = pipe(replaceBrillig, addBreaks, wrapP, wrapBlockquote);
```

#### 柯里化

关于柯里化的细节稍微有点复杂，因此，先让我们看个例子。现在有一个叫作`formatName`的函数，用来把人的绰号放进引言里。这个函数接受三个参数。当我们以柯里化的形式调用这个函数，并传入的参数少于三个时，它会返回一个新的函数，并以传入的参数作为新函数的参数来调用它：

```js
var formatName = function(first, surname, nickname) {
    return first + ' “' + nickname + '” ' + surname;
}
var formatNameCurried = curry(formatName);

var james = formatNameCurried('James');

console.log(james('Sinclair', 'Mad Hatter'));
//=> James “Mad Hatter” Sinclair

var jamesS = james('Sinclair')

console.log(jamesS('Dormouse'));
//=> James “Dormouse” Sinclair

console.log(jamesS('Bandersnatch'));
//=> James “Bandersnatch” Sinclair
```

这里有些助你理解柯里化的函数：

```js
formatNameCurried('a')('b')('c') === formatNameCurried('a', 'b', 'c'); // true
formatNameCurried('a', 'b')('c') === formatNameCurried('a')('b', 'c'); // true
```

