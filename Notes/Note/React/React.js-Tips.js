## React.js Tips

### ~~使用`classSet()`操作className~~

`classSet()`方法已经被React废弃，可以使用新的`classnames`插件

### [`classnames`](https://github.com/JedWatson/classnames)

在没有`classnames`的时候，我们如果要通过`state`或者`props`操作className，通常可能会这样：

```js
// inside some `<Message />` React component
render: function() {
  var classString = 'message';
  if (this.props.isImportant) {
    classString += ' message-important';
  }
  if (this.props.isRead) {
    classString += ' message-read';
  }
  // 'message message-important message-read'
  return <div className={classString}>Great, I'll be there.</div>;
}
```

如果有很多className需要操作，整个过程会变的非常繁琐。通过`classnames`就可以简化这个过程

需要先通过npm安装依赖：

```js
npm install classnames
```

使用方式：

```js
var classNames = require('classnames');
classNames('foo', 'bar'); // => 'foo bar'

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

单个/多个对象作为参数：

```js
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
```

数组作为参数同样有效：

```js
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```


