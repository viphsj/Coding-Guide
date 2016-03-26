## JavaScript 中的一些实用方法

### `Object.assign()`

```js
Object.assign(target, ...sources);
```

把任意多个目标对象所拥有的**可枚举属性**拷贝给目标对象
返回被修改之后的 target

**继承属性和不可枚举属性不能被拷贝**

- 克隆对象

```js
let obj = {
	a: 1,
	b: 2
}

let copyObj = Object.assign({}, obj);
console.log(copyObj);
```

- 合并对象

```js
let 
obj1 = {a: 1},
obj2 = {b: 2},
obj3 = {c: 3};

let obj = Object.assign(obj1, obj2, obj3);

console.log(obj); // {a:1, b:2, c:3}
console.log(obj1); // {a:1, b:2, c:3}
```

- 修改对象（不改变原有对象，返回新对象）

```js
let obj1 = {
	name: 'ecmadao',
	age: 24
};

let obj2 = Object.assign({}, obj1, {name: 'edward'});

console.log(obj1); // {name: 'ecmadao', age: 24}
console.log(obj2); // {name" 'edward', age: 24}
```

当需要改变的目标对象属性嵌套层级很深时....


```js
let obj1 = {
	profile: {
		name: 'ecmadao',
		age: 24
	},
	job: 'developer'
}

let obj2 = Object.assign({}, obj1, [profile]: {name: 'edward'});

console.log(obj2);
// 输出
/**
* {
* 	profile: {
*  		name: 'edward',
*  	 	age: 24
*  },
*  job: 'developer'
* }
**/
```


### `扩展运算符 ...`

将一个数组转为用逗号分隔的参数序列

- 作为参数调用

```js
console.log(...[1, 2, 3]); // 1 2 3

let list = [1];
list.push(...[2, 3, 4]);
console.log(list); // [1, 2, 3, 4]
```

```js
function test(a, b, c) {
	// do something..
}
let arguments = [1, 2, 3];

test(...arguments);
```

- 数组合并

```js
let list = [1, 2, 3];

[a, b, ...list]; // [a, b, 1, 2, 3]

[...list, a, b]; // [1, 2, 3, a, b]
```

- 将字符串转换为数组

```js
let a = 'ecmadao';

[...a]; // ['e', 'c', 'm', 'a', 'd', 'a', 'o'];
```

### `FormData`

- 构建 form

```js
// 手动构建一个form
let form = new FormData();
form.append(key, value);

// 使用 <form> 构建一个 form
let formObj = document.getElementById('form_dom');
// let $formObj = $('#form_dom')[0];
let form = new FormData(formObj);
```

- 发送数据

```js
formData.append(key, value); // 增加数据

// 若通过 dom 构建 form 并传输文件，则需要在 <form> 中加入:
<form enctype="multipart/form-data" method="post">
</form>
```

- 通过 jQuery 发送 FormData 时，

```js
$.ajax({
	url: url,
	type: 'post',
	data: formData,
	processData: false,  // 不要处理发送的数据
	contentType: false   // 不要设置Content-Type请求头
})
```

### `Fetch`

用于发送异步请求，返回 Promise 对象

```js
fetch(request).then(function(response) {
  // handle HTTP response
  if(response.ok) {
  	// ....
  }else {
  	// ...
  }
}, function(error) {
  // handle network error
})
```

更详细的例子:

```js
// 提交GET请求
fetch(url).then(function(res) {

}, function(error) {

});


// 提交POST请求
// request 请求
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  // fetch 的 Headers 接口
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
}).then(function(response) {

  // response 相应
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  response.text().then(function(responseText) { ... })
}, function(error) {
  error.message //=> String
})
```

- Headers

```js
// 不同的构造方法

// key-value
var content = "Hello World";
var reqHeaders = new Headers();
reqHeaders.append("Content-Type", "text/plain"
reqHeaders.append("Content-Length", content.length.toString());
reqHeaders.append("X-Custom-Header", "ProcessThisImmediately");

// json
reqHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
```

- request

```
/** 注：
* request = (url, options)
* url 为请求的路径
* options为详细配置:
**/

- method (String) - HTTP 请求方式, 默认为 "GET"
- body (String, Blob, FormData) - HTTP 请求体
- headers (Object, Headers) - 请求头部, Default: {}
- credentials (String) - 是否允许跨域请求 Authentication credentials mode. Default: "omit". Other data structures need to be encoded before hand as one of these types
	- "omit" - don't include authentication credentials (e.g. cookies) in the request
	- "same-origin" - 如果一个请求是跨域的，那么返回一个简单的error
	- "include" - include credentials in requests to all sites
```

- response

response 的属性:

```js
status (number) - HTTP状态码，100~599之间
statusText (String) - Status text as reported by the server, e.g. "Unauthorized"
ok (boolean) - 如果返回的HTTP状态码为2XX则为true
headers (Headers)
url (String)
```
response处理body的方法:

**返回一个Promise对象**

```js
text() - 将 response text 转为 String
json() - 输出 result of JSON.parse(responseText)
blob() - yields a Blob
arrayBuffer() - yields an ArrayBuffer
formData() - 处理成可以再次被request使用的formData对象
```

**request 和 response 的body 只能被读取一次, 读取之后 bodyUsed 属性被设置为 true, 则不能再次读取**

若要多次读取 body, 则应该在读取之前调用 `response.clone()` 方法, 之后读取clone的body（每个clone只能读取一次）
