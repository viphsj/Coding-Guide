<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Node.js初步 - API - URL](#nodejs%E5%88%9D%E6%AD%A5---api---url)
  - [URL API](#url-api)
    - [url.parse](#urlparse)
    - [url.format](#urlformat)
    - [url.resolve](#urlresolve)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Node.js初步 - API - URL

`require('url');`

###URL Parsing:

- `href` 所解析的完整原始URL，协议名和主机名都转为小写
- `protocol` 小写的请求协议
- `host` URL主机名(含端口信息)，小写
- `auth` URL中身份验证信息部分
- `hostname` 主机的主机名部分，小写
- `port` 主机的端口号
- `pathname` URL的路径部分，位于主机名之后请求查询之前
- `search` URL的查询部分，包含开头的问号
- `path` pathname和search连在一起
- `query` 查询字符串中的参数部分（问号后的部分）
- `hash` URL的“#”后部分（含“#”）

### URL API

#### url.parse

```js
url.parse(urlStr[, parseQueryString][, slashesDenoteHost])
```

> 解析url，返回一个json格式的数组

- `parseQueryString` 布尔值，是否将查询条件解析成为json格式的对象
- `slashesDenoteHost` 布尔值，是否将url的"//"和第一个"/"之间的部分解析为主机名

```js
var url = require('url');
url.parse('http://www.baidu.com?page=1', true, false);

{ protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?page=1',
  query: { page: '1' },
  pathname: '/',
  path: '/?page=1',
  href: 'http://www.baidu.com/?page=1' 
}

url.parse('http://www.baidu.com/news?page=1', true, true);

{ protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname:'www.baidu.com',
  hash: null,
  search: '?page=1',
  query: {page: 1},
  pathname: '/news',
  path: '/news?page=1',
  href: 'http://www.baidu.com/news/page=1' 
}
```

#### url.format

```js
url.format(urlObj)
```
> 作用与parse相反，接收一个Json对象，返回一个组装好的URL地址

```js
var url = require('url');
url.format({
	protocol: 'http:',
	hostname:'www.baidu.com',
	port:'80',
	pathname :'/news',
	query:{page:1}
});

// http://www.baidu.com/news?page=1
```

#### url.resolve

```js
url.resolve(from, to)
```

> Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag. Examples:
> 
> 第一个路径是开始的路径或者说当前路径，第二个则是想要去往的路径，返回值是一个组装好的url

```js
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```