## 探索 RxJS - 做一个 github 搜索器

本文是一篇 RxJS 实战教程，利用 RxJS 和 github API 来一步步做一个 github 搜索器。因此，文章的重点是解释 RxJS 的使用，而涉及的 ES6语法、webpack 等知识点不予讲解。

首先要注意的是，目前在 github 上有两个主流 RxJS，它们代表不同的版本：

- [ReactiveX - rxjs](https://github.com/ReactiveX/rxjs) RxJS 5 beta 版
- [Reactive-Extensions - RxJS](https://github.com/Reactive-Extensions/RxJS) RxJS 4.0 稳定版

这两个版本的安装和引用稍有不同：

```bash
# 安装 4.0 稳定版
$ npm install rx --save
# 安装 5 beta 版
$ npm install rxjs --save
```

```javascript
// 4.0 稳定版
import Rx from 'rx';
// 5 beta 版
import Rx from 'rxjs/Rx';
```

除此以外，它们的语法也稍有不同，比如在 5 beta 版里，`subscribe`时可以代入一个对象作为参数，也可以代入回调函数作为参数，而 4.0 版则只支持以回调函数为参数的情况：

```javascript
// 5 beta
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
Observable.subscribe(observer);

// 5 和 4 都支持：
Observable.subscribe(x => console.log(x), (err) => console.log(err), () => console.log('completed'));
```

其他更多语法不同可以参考：

- [4.0 稳定版 Document](https://github.com/Reactive-Extensions/RxJS/tree/master/doc)
- [5 beta 版 Document](http://reactivex.io/rxjs/manual)