## 【译文】Javascript函数式编程【2】

> 本文译自：[A GENTLE INTRODUCTION TO FUNCTIONAL JAVASCRIPT: PART 2](http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-arrays/)

这篇文章是JavaScript函数式编程系列的第二部分。在上一篇里，我们见识了函数的灵活用法。而在这篇里面则会将它运用到list身上。

  1. [Part1：动机和代码块](【译文】Javascript函数式编程【1】.md)
  2. Part2：使用Array和List
  3. Part3：使用函数创造函数
  4. Part4：Doing it with style

### 使用Array

还记得上篇文章中提到的DRY代码吗。我们认识到了函数对于消除重复代码的重要性。但如果要重复性的使用函数呢？举个栗子：

```js
function addColour(colour) {
    var rainbowEl = document.getElementById('rainbow');
    var div = document.createElement('div');
    div.style.paddingTop = '10px';
    div.style.backgroundColour = colour;
    rainbowEl.appendChild(div);
}

addColour('red');
addColour('orange');
addColour('yellow');
addColour('green');
addColour('blue');
addColour('purple');
```

`addColour`被调用了很多次。有一个可以避免这样的方法是，将所有颜色放进列表里，通过循环进行调用：

```js
var colours = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple'
];

for (var i = 0; i < colours.length; i = i + 1) {
    addColour(colours[i]);
}
```

这样看起来还不错，比之前那个少了很多重复代码。但它并不是最佳实践。每次要使用的时候，我们都要创造一个变量并不断递增，每次还要检查是否要停止循环。那么，如果把整个包装进函数里呢？

#### `For-Each`

因为JavaScript允许函数作为参数传递，因此我们可以写一个简单的`forEach`函数：

```js
function forEach(callback, array) {
    for (var i = 0; i < array.length; i = i + 1) {
        callback(array[i], i);
    }
}
```

这个函数接收一个`callback`函数作为参数，并且在每次循环的时候调用。

在我们这个例子里，想对Array中的每个元素调用`addColour`函数。此时就能使用这个`forEach`函数，仅仅一行就能搞定：

```js
forEach(addColour, colours);
```

给列表中的每个元素一个回调非常有用，现代JavaScript语言也已经支持了这个特性，因此我们可以直接使用它：

```js
var colours = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple'
];
colours.forEach(addColour);
```

你可以在这里查阅[更多文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

### `Map`

