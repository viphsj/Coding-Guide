## 【译文】为何柯里化（curry）如此给力

开发者的白日梦大概就是想要不费精力的复用代码了吧。柯里化可以帮你实现它。

### 柯里化是啥，为什么这么迷人？

普通的javascript函数语法是这样的：

```javascript
var add = function(a, b){ return a + b }
add(1, 2) //= 3
```

上面的函数接收一些参数，然后返回结果。我可以传入少量或大量的参数来调用它。

```javascript
add(1, 2, 'IGNORE ME') //= 3
add(1) //= NaN
```

柯里化函数，就可以用来把原本应该接收一系列参数的函数，转变为仅仅接收一个参数的函数。例如，用柯里化来写上面的函数则是这样的：

```javascript
var curry = require('curry')
var add = curry(function(a, b){ return a + b })
var add100 = add(100)
add100(1) //= 101
```

一个接收许多参数的柯里化函数可以写成这样：

```javascript
var sum3 = curry(function(a, b, c){ return a + b + c })
sum3(1)(2)(3) //= 6
```

柯里化函数也允许你一次性传入多个参数，就像丑陋的javascript语法那样：

```javascript
var sum3 = curry(function(a, b, c){ return a + b + c })
sum3(1, 2, 3) //= 6
sum3(1)(2, 3) //= 6
sum3(1, 2)(3) //= 6
```

### 但那又有什么卵用？

如果你没有经常使用柯里化函数，那或许很难看出它有什么优势。对我而言，它的主要优势有两点：

  - 将碎片化（的逻辑）整合在一起
  - 函数始终贯穿其中（纯函数）

#### 碎片

我们来举一个显而易见的例子：遍历一个集合，获取其中每个元素的id

```javascript
var objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
objects.map(function(o){ return o.id })
```

概括第二行做了什么：

> 遍历每个Object，获取其ID

上面函数的第二行做了太多事情。那么接下来让它更简洁：

```javascript
var get = curry(function(property, object){ return object[property] })
objects.map(get('id')) //= [1, 2, 3]
```

选择这样就更加清晰了。我们在`get`函数中返回的是一个可配置的函数。

如果我们想要重用这个“从一个包含Object的列表中获取全部id”的函数的话，只需要这么做：

```javascript
var getIDs = function(objects){
    return objects.map(get('id'))
}
getIDs(objects) //= [1, 2, 3]
```

擦，选择这样好像不在优雅简单，反而更加杂乱了。如何弥补它呢？思考一下如果`map`方法也成为一个配置呢？

```javascript
var map = curry(function(fn, value){ return value.map(fn) })
var getIDs = map(get('id'))

getIDs(objects) //= [1, 2, 3]
```

我们逐渐开始看出一些端倪了。如果我们的基础底层函数是柯里化函数，那么可以很轻松的通过它们创造一些逻辑清晰的，新且实用的方法。

#### 遍地都是函数

柯里化的另一个优势是它鼓励创造函数，而不是方法。尽管方法是个好东西--它们运行多态，可读性高--但它们并不总是最好的选择，尤其是当存在大量异步代码的时候

在下面这个小例子中，我们来从服务端创造一些数据。看起来像是这样：

```javascript
{
    "user": "hughfdjackson",
    "posts": [
        { "title": "why curry?", "contents": "..." },
        { "title": "prototypes: the short(est possible) story", "contents": "..." }
    ]
}
```

你的目的是获取每个的title。GOGOGO！

```javascript
fetchFromServer()
    .then(JSON.parse)
    .then(function(data){ return data.posts })
    .then(function(posts){
        return posts.map(function(post){ return post.title })
    });
```

这样或许吓着你了。别害怕。让我们用已经定义好的工具来处理它：

```javascript
fetchFromServer()
    .then(JSON.parse)
    .then(get('posts'))
    .then(map(get('title')))
```

精简且易于表达。没有柯里化我们还真做不到。