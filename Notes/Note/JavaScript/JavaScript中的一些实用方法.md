## JavaScript 中的一些实用方法

> 偏重于ES6

### [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

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

### [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

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

### 关于数组

`map()`
通过`.map((value, index) => {})` 
方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组

`some(callback)`
some中的callback返回一个布尔值。数组中的元素只要有一个返回true，则最终将返回true

`every(callback)`
every中的callback返回一个布尔值，只有当数组中的元素全部返回true的时候才返回true，否则返回false

`filter((value) => {})`
根据filter中的函数进行筛选，返回一个符合条件的list

`list.forEach((value, index) => {})`
对自身中的每一个元素进行操作

```javascript
const list = [1, 2, 3, 4];

const newList = list.map((value) => {
  return value * 2
}); 
console.log(newList); // [2, 4, 6, 8];
return list.some((value, index) => value < 3); // true
return list.every((value, index) => value < 3); // false
return list.filter((value, index) => value > 3); // [4]
return list.forEach((value, index) => value * 2); // [2, 4, 6, 8]
```

关于`map`
```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
/* roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9] */

["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

// 通常使用parseInt时,只需要传递一个参数.但实际上,parseInt可以有两个参数.第二个参数是进制数.可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 元素索引, 原数组本身.
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.

//应该使用如下的函数returnInt
function returnInt(element){
  return parseInt(element,10);
}

["1", "2", "3"].map(returnInt);
// [1,2,3]
```

### [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

> WeakMap对象就是简单的键/值映射.但键只能是对象值,不可以是原始值.
> 
> 典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除

#### 方法

`const weakMap = new WeakMap();`

  - `weakMap.get(key [, defaultValue])`
  - `weakMap.set(key, value)`
  - `weakMap.has(key)`
  - `weakMap.delete(key)`
  - `weakMap.clear()`

[利用`WeakMap`创建对象中的私有变量](https://gist.github.com/greim/44e54c2f23eab955bb73b31426e96d6c)

```javascript
const __ = new WeakMap();

class Foo {
  constructor(x) {
    __.set(this, { x });
  }
  getX() {
    var { x } = __.get(this);
    return x;
  }
}
```