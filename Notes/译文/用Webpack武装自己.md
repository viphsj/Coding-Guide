## 用Webpack武装自己

> 译自：[Webpack your bags](https://blog.madewithlove.be/post/webpack-your-bags/)

![what-is-webpack](../../image/WebpackYourBags/what-is-webpack.png)

你可能已经听说过这个酷酷的工具-Webpack。一些人称之为类似于Gulp的工具，还有一些人则认为它类似于Browserify。如果你还没接触过它，那很有可能会因此感到困惑。而Webpack的主页上则认为它是两者的结合，那或许更让你困惑了。

说实话，一开始的时候，“什么是Webpack”这个话题让我很心烦，也就没有继续研究下去了。直到后来，当我已经构建了几个项目后，才真心的为之痴迷。如果你像我一样紧随Javascript的发展步伐，你很有可能会因为太追随潮流跨度太大而蛋疼。在经历了上面这些之后，我写下这篇文章，以便更加细致的解释Webpack是什么，以及它如此重要的原因。

> What is Webpack?

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

> 你究竟为啥要这么做？

在你理解了Webpack是做什么的之后，第二个问题就接踵而至：使用它有什么好处？