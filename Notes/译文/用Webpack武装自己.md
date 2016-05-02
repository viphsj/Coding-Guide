## 用Webpack武装自己

> 译自：[Webpack your bags](https://blog.madewithlove.be/post/webpack-your-bags/)

![what-is-webpack](../../image/WebpackYourBags/what-is-webpack.png)

你可能已经听说过这个酷酷的工具-Webpack。一些人称之为类似于Gulp的工具，还有一些人则认为它类似于Browserify。如果你还没接触过它，那很有可能会因此感到困惑。而Webpack的主页上则认为它是两者的结合，那或许更让你困惑了。

说实话，一开始的时候，“什么是Webpack”这个话题让我很心烦，也就没有继续研究下去了。直到后来，当我已经构建了几个项目后，才真心的为之痴迷。如果你像我一样紧随Javascript的发展步伐，你很有可能会因为太追随潮流跨度太大而蛋疼。在经历了上面这些之后，我写下这篇文章，以便更加细致的解释Webpack是什么，以及它如此重要的原因。

### Webpack是啥?

首先来让我们回答最开始的问题：Webpack是个系统的构建工具，还是打包工具？答案是两者都是--这不代表它做了这两件事（先构建资源，在分别进行打包），而是说它将两者结合在一起了。

更加清晰的说明：与“构建sass文件，压缩图片，然后引用它们，再打包，再在页面上引用”相比，你只要这么做：

```javascript
import stylesheet from 'styles/my-styles.scss';
import logo from 'img/my-logo.svg';
import someTemplate from 'html/some-template.html';

console.log(stylesheet); // "body{font-size:12px}"
console.log(logo); // "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5[...]"
console.log(someTemplate) // "<html><body><h1>Hello</h1></body></html>"
```

你的所有资源都被当做包处理，可以被import，修改，控制，最终展现在你最后的一个bundle上。

为了能让上面那些有效运转，你需要在自己的Webpage配置里配置`loader`。`loader`是一个“当程序遇见XXX类型文件的时候，就做YYY”的小型插件。来看一些`loader`的例子：

```javascript
{
  // 如果引用了 .ts 文件, 将会触发 Typescript loader
  test: /\.ts/,
  loader: 'typescript',
},
{
  // 如果引用了png|jpg|svg图片,则会用 image-webpack 进行压缩 (wrapper around imagemin)
  // 并转化成 data64 URL 格式
  test: /\.(png|jpg|svg)/,
  loaders: ['url', 'image-webpack'],
},
{
  // 如果使用了 SCSS files, 则会用 node-sass 解析, 最终返回CSS格式
  test: /\.scss/,
  loaders: ['css', 'autoprefixer', 'sass'],
}
```

最终在食物链的最底端，所有的`loader`都返回`string`，这样Webpack就可以将它们加入到javascript模块中去。当你的Sass文件被loader转换之后，它的引用实际上是这样的：

```javascript
export default 'body{font-size:12px}';
```

![What-is-Webpack](../../image/WebpackYourBags/What-is-Webpack.gif)

### 究竟为什么要这么做？

在你理解了Webpack是做什么的之后，第二个问题就接踵而至：使用它有什么好处？“把图片和CSS扔进我的js里？什么鬼？”其实在很久之前，为了减少HTTP request请求，我们都被教育要把所有东西写在一个文件里面。

到了现在，与之类似的是，很多人把所有东西打包进`app.js`。这两种方法都有一个很大的负面影响：很多时候人们在下载的是他们用不到的资源。但如果你不这么做吧，你就得手动的在每个页面引用相应的资源，最终会混乱成一坨：哪个页面已经引用了它所依赖的资源？

这些方法没有绝对的对错。把Webpage当做一个中间件--不仅仅是打包或构建工具，而是个聪明的模块打包系统。只要你设置正确，它会比你还要清楚使用的技术栈，并更好的优化它们。

### 来让我们一起构建一个简单的App

为了让你更快捷的理解使用Webpack的好处，我们会构建一个简单的App，并将资源打包进去。在这里教程中我推荐使用Node4（或5），以及NPM3作为包管理工具，以便在使用Webpack的时候避免大量的麻烦。如果你还没装NPM3，可以通过`npm install npm@3 -g`来安装。

```javascript
$ node --version
v5.7.1
$ npm --version
3.6.0
```

我还要推荐你把`node_modules/.bin`放进你的`PATH`变量，以避免每次都要输入`node_modules/.bin/webpack`。在下面了例子里我输入的指令都不会再包含`node_modules/.bin`。

#### 基础指引

从创建项目安装Webpack开始。我们同时也安装了jQuery以便支持后续操作。

```javascript
$ npm init -y
$ npm install jquery --save
$ npm install webpack --save-dev
```

现在来做一个App的入口：

```javascript
// src/index.js
var $ = require('jquery');

$('body').html('Hello');
```

让我们在`webpack.config.js`文件里进行的Webpack配置。Webpack配置实质上是Javascript，并且在最后`export`出去一个Object：

```javascript
// webpack.config.js
module.exports = {
    entry:  './src',
    output: {
        path:     'builds',
        filename: 'bundle.js',
    },
};
```

在这里，`entry`告诉Webpack哪些文件是应用的入口文件。它们是你的主要文件，在依赖树的最顶端。之后，我们告诉Webpack把资源打包在`builds`文件夹下的`bundle.js`文件里。让我们编写index HTML文件。

```javascript
<!DOCTYPE html>
<html>
<body>
    <h1>My title</h1>
    <a>Click me</a>

    <script src="builds/bundle.js"></script>
</body>
</html>
```

运行Webpack。如果一切正确那就可以看见下面的信息：

```javascript
$ webpack
Hash: d41fc61f5b9d72c13744
Version: webpack 1.12.14
Time: 301ms
    Asset    Size  Chunks             Chunk Names
bundle.js  268 kB       0  [emitted]  main
   [0] ./src/index.js 53 bytes {0} [built]
    + 1 hidden modules
```

在这段信息里可以看出，`bundle.js`包含了`index.js`和一个隐藏的模块。隐藏的模块是jQuery。在默认模式下Webpack隐藏的模块都不是你写的。如果想要显示它们，我们可以在运行Webpack的时候使用`--display-modules`：

```javascript
$ webpack --display-modules
bundle.js  268 kB       0  [emitted]  main
   [0] ./src/index.js 53 bytes {0} [built]
   [1] ./~/jquery/dist/jquery.js 259 kB {0} [built]
```

你还可以使用`webpack --watch`，在改变代码的时候自动进行打包。

#### 设置第一个loader

还记得Webpack可以处理各种资源的引用吗？该怎么搞？如果你跟随了这些年Web组件发展的步伐（Angular2，Vue，React，Polymer，X-Tag等等），那么你应该知道，与一堆UI相互连接组合而成的App相比，使用可维护的小型可复用的UI组件会更好：web component。

为了确保组件能够保持独立，它们需要在自己内部打包需要的资源。想象一个按钮组件：除了HTML之外，还需要js以便和外部结合。噢对或许还需要一些样式。如果能够在需要这个按钮组件的时候，加载所有它所依赖的资源的话那就太赞了。当我们import按钮组件的时候，就获取到了所有资源。

开始编写这个按钮组件吧。首先，假设你已经习惯了ES2015语法，那么需要安装第一个loader：Babel。安装好一个loader你需要做下面这两步：首先，通过`npm install {whatever}-loader`安装你需要的loader，然后，将它加到Webpage配置的`module.loaders`里：

```javascript
$ npm install babel-loader --save-dev
```

loader并不会帮我们安装Babel所以我们要自己安装它。需要安装`babel-core`包和`es2015`预处理包。

```javascript
$ npm install babel-core babel-preset-es2015 --save-dev
```

新建`.babelrc`文件，里面是一段JSON，告诉Babel使用`es2015`进行预处理。

```javascript
// .babelrc 
{ "presets": ["es2015"] }
```

现在，Babel已经被安装并配置完成，我们要更新Webpack配置。我们想要Babel运行在所有以`.js`结尾的文件里，但是要避免运行在第三方依赖包例如jQuery里面。loader拥有`include`和`exclude`规则，里面可以是一段字符串、正则、回调等等。在这个例子里，我们只想让Babel在我们自己的文件里运行，因此使用`include`包含自己的资源文件夹：

```javascript
module.exports = {
    entry:  './src',
    output: {
        path:     'builds',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test:   /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
            }
        ],
    }
};
```

现在，我们可以用ES6语法重写`index.js`了：

```javascript
// index.js
import $ from 'jquery';

$('body').html('Hello');
```