## JavaScript 中的一些实用方法

### `Object.assign()`

```js
Object.assign(target, ...sources);
```

把任意多个目标对象所拥有的**可枚举属性**拷贝给目标对象
返回被修改之后的 target

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

**继承属性和不可枚举属性不能被拷贝**

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