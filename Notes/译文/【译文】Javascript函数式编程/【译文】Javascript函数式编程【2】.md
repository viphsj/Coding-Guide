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

#### `forEach`

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

你可以在这里查阅[关于forEach的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

#### `map`

虽然我们的`forEach`函数已经挺好用了，但还有一些缺陷。在`forEach`中，会忽略回调函数返回的值。不过只需要一点改动就能获取到它的返回值了。

举个栗子，我们有一个由ID组成的列表，并想获取到相符的由DOM元素组成的列表。使用循环遍历它：

```js
var ids = ['unicorn', 'fairy', 'kitten'];
var elements = [];
for (var i = 0; i < ids.length; i = i + 1) {
    elements[i] = document.getElementById(ids[i]);
}
// elements now contains the elements we are after
```

再一次的，我们每次都要手动创建遍历并递归它--但这些东西我们并不想关心。我们把这些代码封装到一个叫`map`的函数里，像之前那个`forEach`函数一样重构它：

```js
var map = function(callback, array) {
    var newArray = [];
    for (var i = 0; i < array.length; i = i + 1) {
        newArray[i] = callback(array[i], i);
    }
    return newArray;
}
```

现在我们拥有了一个`map`函数了，可以这样使用它：

```js
var getElement = function(id) {
  return document.getElementById(id);
};

var elements = map(getElement, ids);
```

`map`函数将渺小不起眼的函数转变成为了英雄--仅仅需要调用一次list

跟`forEach`一样，`map`也已经被现代的JavaScript函数语法所支持。你可以这样使用原生的`map`方法：

```js
var ids = ['unicorn', 'fairy', 'kitten'];
var getElement = function(id) {
  return document.getElementById(id);
};
var elements = ids.map(getElement, ids);
```

你可以在这里查阅[关于map的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

#### `reduce`

`map`已经很好用了，但我们还能做一个更加强力的函数，以一个列表作为参数，最终返回一个结果。或许这看起来有点不合常理--一个仅仅返回单个结果的函数，怎么会比返回列表的函数更有力呢？为了寻找答案，我们先来看看这样的一个函数是如何工作的。

为了说明这个问题，我们先考虑两个问题：

  1. 以一串数字组成的列表作为参数，返回它们的总和
  2. 以一串单词组成的列表作为参数，使用空格将所有单词拼接在一起

这些例子看起来似乎微不足道还有点愚蠢--的确是这样。但是如果我们掌握了`reduce`，它们会变得很有趣。

回到正题。解决这谢问题最高效的方法就是遍历：

```js
// Given an array of numbers, calculate the sum
var numbers = [1, 3, 5, 7, 9];
var total = 0;
for (i = 0; i < numbers.length; i = i + 1) {
    total = total + numbers[i];
}
// total is 25

// Given an array of words, join them together with a space between each word.
var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = '';
for (i = 0; i < words.length; i++) {
    sentence = sentence + ' ' + words[i];
}
// ' sparkle fairies are amazing'
```

这两端代码有很多重叠的地方。它们都使用了`for`遍历方法，有需要缓存的变量，也都在遍历的时候，把值赋给了上一次的结果。

将循环体内部的代码封装成函数试试：

```js
var add = function(a, b) {
    return a + b;
}

// Given an array of numbers, calculate the sum
var numbers = [1, 3, 5, 7, 9];
var total = 0;
for (i = 0; i < numbers.length; i = i + 1) {
    total = add(total, numbers[i]);
}
// total is 25

function joinWord(sentence, word) {
    return sentence + ' ' + word;
}

// Given an array of words, join them together with a space between each word.
var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = '';
for (i = 0; i < words.length; i++) {
    sentence = joinWord(sentence, words[i]);
}
// 'sparkle fairies are amazing'
```

这样变得简洁多了。重构出来的两个方法都以上一次的结果作为第一个参数，遍历的Array中的当前值作为第二个参数。我们可以把这些凌乱的循环体放进函数里：

```js
var reduce = function(callback, initialValue, array) {
    var working = initialValue;
    for (var i = 0; i < array.length; i = i + 1) {
        working = callback(working, array[i]);
    }
    return working;
};
```

现在我们拥有这个迷人的`reduce`函数了。拿它做下尝试：

```js
var total = reduce(add, 0, numbers);
var sentence = reduce(joinWord, '', words);
```

`reduce`也已经被现代化JavaScript语法支持了：

```js
var total = numbers.reduce(add, 0);
var sentence = words.reduce(joinWord, '');
```

你可以在这里查阅[关于reduce的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### 混合运用

正如我之前提到的，这些都是些微不足道的例子--`add`和`joinWord`函数都很简单--但这正是关键所在。简单又小的函数更利于思考和测试。就算把两个这样的函数组合在了一起（例如add和reducer），它依旧比一个巨大复杂的函数易于理解。还记得我之前说啥吗？我们可以做些更有意思的事情。

来做点复杂的。写点假的样板数据，使用`map`和`reduce`把它们转换到HTML的列表里。数据在这儿：

```js
var ponies = [
    [
        ['name', 'Fluttershy'],
        ['image', 'http://tinyurl.com/gpbnlf6'],
        ['description', 'Fluttershy is a female Pegasus pony and one of the main characters of My Little Pony Friendship is Magic.']
    ],
    [
        ['name', 'Applejack'],
        ['image', 'http://tinyurl.com/gkur8a6'],
        ['description', 'Applejack is a female Earth pony and one of the main characters of My Little Pony Friendship is Magic.']
    ],
    [
        ['name', 'Twilight Sparkle'],
        ['image', 'http://tinyurl.com/hj877vs'],
        ['description', 'Twilight Sparkle is the primary main character of My Little Pony Friendship is Magic.']
    ]
];
```

数据不是很干净，如果这些内部的列表是Object的话会好很多。在这以前，我们使用`reduce`函数返回简单的结果，例如数组或字符串。但没人规定它只能返回简单的结果。我们可以让它返回Object，Array，甚至DOM元素。现在来创建和函数，以一个Array作为参数（例如['name', 'Fluttershy']），将列表内部的数据转换为key/value形式的Object。

```js
var addToObject = function(obj, arr) {
    obj[arr[0]] = arr[1];
    return obj;
};
```

通过这个`addToObject`方法，我们就能把ponies列表中的第一层列表里的各个列表转换为一个Object：

```js
var ponyArrayToObject = function(ponyArray) {
    return reduce(addToObject, {}, ponyArray);
};
```

转换为后成如下形式：

```js
var ponies = [
  [
    {
      name: 'Fluttershy',
      image: 'http://tinyurl.com/gpbnlf6',
      description: 'Fluttershy is a female Pegasus pony and one of the main characters of My Little Pony Friendship is Magic.'
    }
  ],
  [
    {
      // 忽略
    }
  ],
  ....
]
```

如果使用`map`函数，则可以把ponies列表中的第一层列表转为Object：

```js
var tidyPonies = map(ponyArrayToObject, ponies);
```

现在，我们就取得了一个满是Object的列表了。通过[Thomas Fuchs’ tweet-sized模板引擎](http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/)，我们可以利用`reduce`将它转换为HTML片段。模板方法使用模板字符串或Object，当它发现占位符（例如{name}或{image}）的时候，就会从Object中取出相应的数据进行替换。例如：

```js
var data = { name: "Fluttershy" };
t("Hello {name}!", data);
// "Hello Fluttershy!"

data = { who: "Fluttershy", time: Date.now() };
t("Hello {name}! It's {time} ms since epoch.", data);
// "Hello Fluttershy! It's 1454135887369 ms since epoch."
```

因此，如果我们想要把列表里面的pony object转换为HTML list，可以这么做：

```js
var ponyToListItem = function(pony) {
    var template = '<li><img src="{image}" alt="{name}"/>' +
                   '<div><h3>{name}</h3><p>{description}</p>' +
                   '</div></li>';
    return t(template, pony);
};
```

这是把一个单独的Object转为HTML。如果要转换整个list，则要使用`reduce`函数和`joinWord`函数：

```js
var ponyList = map(ponyToListItem, tidyPonies);
var html = '<ul>' + reduce(joinWord, '', ponyList) + '</ul>';
```

戳这里查看[完整实例](http://jsbin.com/wuzini/edit?html,js,output)

如果你理解掌握了`map`和`reduce`的用法，就再也不用写以前那样lowd的循环了。事实上，在项目中不使用循环还真的是个挑战。当你使用几次`map`和`reduce`以后，会注意到更多的使用模式并被它吸引。还有一些普遍的用法是从Array中[filtering](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)或者[plucking](http://ramdajs.com/docs/#pluck)数据

因为这些模式经常被使用，人们就把他们放进了单独的库中。一些比较出名的库有：

  - [Ramda](http://ramdajs.com/)
  - [Lodash](https://lodash.com/)
  - [Underscore](http://underscorejs.org/)

现在你已经看见了将函数作为参数的优势了，尤其是应对列表的时候。你可以编码更高效、成功，永远不会被复杂的参数困扰。但是，如果还想进阶学习，可以看下一章