## 【译文】JavaScript函数式编程【1】

> 本文译自：[A GENTLE INTRODUCTION TO FUNCTIONAL JAVASCRIPT: PART 1](http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/)

这篇文章是《JavaScript函数式编程》四个模块中的第一部分。我们会先简要介绍JavaScript函数式编程，以及它为何如此有用的原因。

  1. Part1：动机和代码块
  2. [Part2：使用Array和List](【译文】Javascript函数式编程【2】.md)
  3. Part3：使用函数创造函数
  4. Part4：Doing it with style

### 函数是什么？

为什么会大肆渲染JavaScript函数式编程？为什么要叫“函数式”？又不是每个人都在写糟糕的无函数的JavaScript。它又有什么好处呢？你为什么会感到困惑？

对我而言，学习函数式编程就好像是买了一台Thermomix（译者注：某品牌的食品处理机）：

  - 前期需要很多投资
  - 然后你会深深为此痴迷，并向家人和朋友们大肆宣传它有多棒
  - 他们会以为你加入了什么邪教组织

但是它确实能够帮助你，让任务实现的更轻松。它甚至能自动化的完成一些枯燥无味的事情。

### 创造代码块

让我们先来看看一些使得函数式编程变的可能的JavaScript特性。在JavaScript中有两种方式可以制造块：变量`variables`和函数`functions`。变量是一些放置东西的容器。可以这样定义：

```js
var myContainer = "Hey everybody! Come see how good I look!";
```

这样创造了一个叫`myContainer`的变量并把一串String赋值给它。

另一方面，函数则是包含了一些指令的容器。你可以重复使用它们或者仅仅用一次就扔在一边。可以这样定义函数：

```js
function log(someVariable) {
    console.log(someVariable);
    return someVariable;
}
```

可以这样调用：

```js
log(myContainer);
// Hey everybody! Come see how good I look!
```

当然如果你见识过足够多JavaScript代码，就会知道我们也可以这样使用函数：

```js
var log = function(someVariable) {
    console.log(someVariable);
    return someVariable;
}

log(myContainer);
// Hey everybody! Come see how good I look!
```

下面来仔细分析下它：如果我们通过这种方式定义函数，看起来就像是创建了一个名为`log`的变量，并将一个函数塞给了它。`log()`方法同时也是个变量，这意味着我们可以对它做任何可以对变量做的事情。

来试试。或许可以将函数作为参数，传递给其他函数？

```js
var classyMessage = function() {
    return "Stay classy San Diego!";
}

log(classyMessage);
// [Function]
```

嗯。。好像没什么实际作用。换种方式试试看：

```js
var doSomething = function(thing) {
    thing();
}

var sayBigDeal = function() {
    var message = "I’m kind of a big deal";
    log(message);
}

doSomething(sayBigDeal);
// I’m kind of a big deal
```

这或许无法让你感到兴奋，但足以让计算机科学家激动了。这种把函数作为变量的做法，就是所谓的“在JavaScript中，函数是第一等公民”。它的意思是指，函数不会像Object或者String那样特殊对待，而是作为一个Common Data Type。特性虽小。但有着巨大的作用。为了更深入的理解，我们需要聊聊DRY（Don't Repeat Yourself）代码。

### 别重复自己

开发者总是喜欢谈论DRY原则--Don't Repeat Yourself（别重复自己）。它的核心思想是，如果你需要重复同样的任务很多次，那就应该把它分离到可重复利用的包（例如函数）内。

来看个例子。我们想把三个行李放在行李传送带上：

```js
var el1 = document.getElementById('main-carousel');
var slider1 = new Carousel(el1, 3000);
slider1.init();

var el2 = document.getElementById('news-carousel');
var slider2 = new Carousel(el2, 5000);
slider2.init();

var el3 = document.getElementById('events-carousel');
var slider3 = new Carousel(el3, 7000);
slider3.init();
```

代码重复了好几次。我们想在页面上初始化传送带，每一个都有自己独特的ID。因此，应该新建一个函数，描述初始化传送带的过程，然后将ID作为参数调用这个函数。

```js
function initialiseCarousel(id, frequency) {
    var el = document.getElementById(id);
    var slider = new Carousel(el, frequency);
    slider.init();
    return slider;
}

initialiseCarousel('main-carousel', 3000);
initialiseCarousel('news-carousel', 5000);
initialiseCarousel('events-carousel', 7000);
```

代码变的清晰且易于维护了。你可以遵循这个模式：如果有基于不同数据的相同行为，就可以把数据作为变量，将行为封装起来。但如果行为也各不相同呢？

```js
var unicornEl = document.getElementById('unicorn');
unicornEl.className += ' magic';
spin(unicornEl);

var fairyEl = document.getElementById('fairy');
fairyEl.className += ' magic';
sparkle(fairyEl);

var kittenEl = document.getElementById('kitten');
kittenEl.className += ' magic';
rainbowTrail(kittenEl);
```

这段代码不太好重构。它确实有重复，但是使用了不同的方法调用。或许我们可以把`document.getElementById()`封装起来并把`className`作为参数传入。这样的话会好一丢丢：

```js
function addMagicClass(id) {
    var element = document.getElementById(id);
    element.className += ' magic';
    return element;
}

var unicornEl = addMagicClass('unicorn');
spin(unicornEl);

var fairyEl = addMagicClass('fairy');
sparkle(fairyEl);

var kittenEl = addMagicClass('kitten');
rainbow(kittenEl);
```

但其实还能更进一步的优化。还记得JavaScript允许函数作为参数传入吗：

```js
function addMagic(id, effect) {
    var element = document.getElementById(id);
    element.className += ' magic';
    effect(element);
}

addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);
```

这样就更简洁了，且易于维护。允许函数作为变量这点给我们带来了很多的可能。在接下来的第二部分，我们会使用这个能力让Array变的更加友好。