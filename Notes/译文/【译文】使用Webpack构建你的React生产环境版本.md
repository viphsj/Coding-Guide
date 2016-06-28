<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译文】使用Webpack构建你的React生产环境版本](#%E3%80%90%E8%AF%91%E6%96%87%E3%80%91%E4%BD%BF%E7%94%A8webpack%E6%9E%84%E5%BB%BA%E4%BD%A0%E7%9A%84react%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E7%89%88%E6%9C%AC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 【译文】使用Webpack构建你的React生产环境版本

> 文本译自：[Make your own React production version with webpack](http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/)

如果你用React进行开发，那么就一定见过它冗长的警告。

译者注：下面这段：

```text
Warning: It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details.
```

[React官方这么解释](https://facebook.github.io/react/downloads.html#development-vs.-production-builds)的：

> 我们提供两种版本的React：未压缩的开发环境版和压缩的生产环境版本。开发环境的版本涵盖了对普遍错误的警告提示，而生产环境的版本则提供了更好的优化，并忽略了所有警告信息。

当你在生产环境打包时，不应该包含任何用于开发环境的代码（它们会让webpack进行不必要的检查，并增加包的大小）。

而解决方案则是使用[Webpack.DefinePlugin](http://dev.topheman.com/optimize-your-bundles-weight-with-webpack/)，或者使用`envify`（如果你使用`browserify`）。

通过下面的配置，你可以将`process.env.NODE_ENV`变量设置为`production`：

```js
// webpack.config.prod.js
module.exports = {
  //...
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
  //...
}
```

这样的话，就可以将`react.min.js`用在你的包里了。如果你看过位于`./node_modules/react/lib`的React源码，你会发现有很多地方使用了类似于`process.env.NODE_ENV !== 'production'`的表达式。这也就是因此我们可以通过修改上面那个变量改变引入的React包的原因。

参考资源：

  - [Optimize your bundle’s weight with webpack](http://dev.topheman.com/optimize-your-bundles-weight-with-webpack/)
  - [React – recommendation of use](https://facebook.github.io/react/downloads.html#npm)
  - [Example of webpack.config.js on topheman/react-es6-redux](https://github.com/topheman/react-es6-redux/blob/master/webpack.config.js)

---

Notes:

为什么不直接引用`react.min.js`对象？

通过那样的方式，你依旧使用的是开发版本。有警告，而且需要webpack多余的检查。

同理，我可以直接通过webpack`resolve.alias`属性，把`react`指向`react.min.js`就好了。

这样是完全可以正常工作的。但想一想`UglifyJS`插件是如何工作的吧。它检查你App里的所有代码进行计算，寻找相似的对象（比如React里或者其他module用的`document`对象）。因而那样的话`UglifyJS`就有可能在直接引用`react.min.js`的时候无法发现那些包（`UglifyJS`不再检查React包）。

但是，你依旧可以压缩已经压缩了的文件。但是要进行一些繁琐的配置。。