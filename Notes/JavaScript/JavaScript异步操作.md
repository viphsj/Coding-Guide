<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript异步操作](#javascript%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C)
  - [Fetch](#fetch)
    - [实例](#%E5%AE%9E%E4%BE%8B)
  - [Promise](#promise)
    - [APIS](#apis)
  - [ES7的异步`async/await`](#es7%E7%9A%84%E5%BC%82%E6%AD%A5asyncawait)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript异步操作

### [Fetch](http://github.github.io/fetch/)

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

#### 实例

  - 通过fetch获取数据

```javascript
fetch(url).then((response) => response.json()) // 解析获取到的json
.then((data) => {
  // do something
})
.catch((error) => {
  // do something
});
```

  - 通过fetch发送数据

```javascript
fetch(url, {
  method: 'post',
  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify({data})
})
.then((response) => response.json())
.then((data) => {
  // do something
})
.then((error) => {});
```

### [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

- 作用

在 `Promise` 对象内部编写异步操作，并通过其自带的 `resolve` 和 `reject` 进行异步结果返回的处理。之后在使用这个 `Promise` 的时候，便可以通过 `.then((result) => {}).then((result) => {})...` 进行链式调用。 `.then()` 函数中的 `result` 参数即异步操作的结果

- status

Promise 对象所拥有的几种状态:

	- pending 初始化状态
	- fulfilled 成功的状态
	- rejected 失败的状态

- example

```js
function example(data) {
	console.log(data)
	// resolve 和 reject 分别表示异步操作执行成功或失败后的回调函数
	var promise = new Promise((resolve, reject) => {
		$.ajax({
			url: www.example.com?page=1&num=1,
			methon: get,
			success: (data) => {
				resolve(data);
			},
			error: (error) => {
				reject(error);
			}
		});
	});
	return promise;
}
```
- usage

```js
// then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调
// 但这种方法无法捕获resolve回调中产生的异常
example().then(
	(result) => {
		// 获取 resolve 传输的参数
	},
	(error) => {
		// 获取 reject 传输的参数
	}
);

/**
* 或者使用 catch 写法，在 catch 中指定 reject 时的回调
* 当 reject 或者 resolve 失败的时候，会调用 catch
* catch()方法是then(undefined, onRejected)的一个别名
**/
example().then((result) => {
	// do something..
}).catch((error) => {
	// when fail..
});
```
`Promise.then()`和`Promise.catch()`都返回 Promise 对象，因此可以链式调用
如果只想对异常进行处理，可以采用`promise.then(undefined, callback);`方法

```js
/**
* Promise 的链式操作
* 可以保证按照顺序依次执行异步操作，并能利用上一步异步操作的结果
**/
example().then((data1) => {
	// 获取 resolve 传输的参数
	example(data1)
}).then((data2) => {
	example(data2);
}).then((data3) => {
	console.log(data3);
});

// 输出 data1 data2 data3
```

- final

Promise中没有`.final()`API，但是我们可以手动造一个：
```javascript
promise(XXX).then((result) => {
  // resolve时
}).catch((err) => {
  // reject时
}).then(
  /*
  * 全部处理完以后
  * do something..
  * 注：如果发生错误则不会catch
  */
)
```

#### APIS

- `Promise.all()`

接收一个数组作为参数，数组内是多个 Promise 对象。 `.then()`会在**全部 Promise 执行完毕**之后返回一个包含所有异步操作结果的 list
传递给 Promise.all 的promise并不是一个个的顺序执行的，而是同时开始、并行执行的

```js
Promise.all([example(1), example(2), example(3)])
	.then((result) => {
		console.log(result);
		// [data1, data2, data3]
	});
```

`Promise.all()`所耗费的时间为最慢的异步操作的时间

如果传入的数组中某项不是一个 promise ，该项会被用`Promise.resolve`转换为一个promise

*如果传出的参数list中有任意 Promise 失败返回 reject, 那么 `.all()` 将带着该 Promise 的 reject参数进入 reject 状态，不再理会其他 Promise 的返回结果*

- `Promise.race()`

接收一个数组作为参数，数组内是多个 Promise 对象。 `.then()`会在**执行最快的 Promise 执行完毕**之后返回一个包含异步操作结果的 result

在最快的 Promise 执行完毕之后，数组参数中的其他 Promise 会正常继续执行，并通过 `.then()`返回结果

如果最快的 Promise 返回 reject，那么`.race()`将会返回 reject，不再理会之后的 Promise 操作结果

### ES7的异步`async/await`

**用同步的方法写异步**

```javascript
const setTimeoutToLog = () => {
  setTimeout(() => {
    console.log('test async');
  }, 1000);
}

const showConsole = async () => {
  await setTimeoutToLog();
}

showConsole();
```

`await`会阻塞后面代码的执行，直到异步函数执行完成