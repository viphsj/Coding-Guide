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

```js
var url = require('url');
url.parse('http://www.baidu.com');

{ protocol: 'http:',
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: 'www.baidu.com',
  path: 'www.baidu.com',
  href: 'http://www.baidu.com' 
}
```