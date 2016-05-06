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