## Node.js初步 - API - Query String

`var querystring = require('querystring');`

> Query String模块用于实现URL参数字符串与参数对象之间的互相转换
> 
> 提供函数进行序列化和反序列化

### Query String API

#### stringify

```js
querystring.stringify(obj[, sep][, eq][, options])
```

> 序列化对象
> 
> 将对象类型转换成一个字符串类型
> 
> 默认的分割符 `&`, 分配符 `=`

```js
var querystring= require('querystring');
var result = querystring.stringify({foo:'bar',cool:['xux', 'yys']});
console.log(result);

// foo=bar&cool=xux&cool=yys

querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
// returns
'foo:bar;baz:qux'
```

#### parse

```js
querystring.parse(str[, sep][, eq][, options])
```
> 反序列化字符串为对象
> 
> 默认的分割符 `&`, 分配符 `=`

```js
var querystring = require('querystring');
var result = querystring.parse('foo@bar$cool@xux$cool@yys','@','$');
console.log(result);

// { foo: '', bar: 'cool', xux: 'cool', yys: '' }
```