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

#### 闭包和作用域

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