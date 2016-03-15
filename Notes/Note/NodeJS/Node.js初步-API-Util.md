## Node.js初步 - API - Util

`var util = require('util');`

> Node.js核心模块，提供常用函数的集合

### Util API

#### inspect

```js
util.inspect(object[, options])
```
> 将任意对象转换为字符串
> 
> 至少接受一个参数object, options可能的配置如下：

- `showHidden`
- `depth`
- `colors`
- `customInspect`

#### format

> format 函数根据第一个参数，返回一个格式化字符串，第一个参数是一个可包含零个或多个占位符的字符串
> 
> 每一个占位符被替换为与其对应的转换后的值，支持的占位符有：
> 
> `%s` (字符串)
> 
> `%d` (数字<整型和浮点型>)
> 
> `%j` (JSON)
> 
> `%` (单独一个百分号则不作为一个参数)

- 如果占位符没有相对应的参数，占位符将不会被替换

```js
util.format('%s:%s', 'foo'); // 'foo:%s'
```

- 如果有多个参数占位符，额外的参数将会调用util.inspect()转换为字符串。这些字符串被连接在一起，并且以空格分隔

```js
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
```

- 如果第一个参数是一个非格式化字符串，则会把所有的参数转成字符串并以空格隔开拼接在一块，而且返回该字符串

```js
util.format(1, 2, 3); // '1 2 3'
```
