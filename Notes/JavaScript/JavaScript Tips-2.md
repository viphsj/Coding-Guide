## JavaScript Tips-2

### 使用`arguments`获取函数中的所有参数

`arguments`是一个类数组对象，代表传给一个函数的参数列表。

可以在函数内部通过`arguments`对象来获取其所有参数，然后通过`arguments[0]`这样的方法分别获取每个参数，也可以通过`arguments[0] = xxx`这样的形式改变参数。

**要注意的是，`arguments`仅仅是一个类数组对象，没有数组特有的属性和方法**

因此，如果要对`arguments`使用数组的方法，需要通过
`Array.prototype.slice.call(arguments)`
将它转换为数组

#### example

```javascript
function fun() {
  let args = Array.prototype.slice.call(arguments);
  console.log(args[0]);
  fun2(...args.slice(1));
}

function fun2() {
  console.log(arguments.length);
}

fun(1,2,3,4,5);
// 1
// 4
```

需要提出的是，使用下面的方法无法获取`arguments`

```javascript
// WRONG
const fun = () => {
  console.log(arguments.length);
}
```

### 使用`reduce()`遍历数组元素

#### 语法一览

```javascript
array.reduce(
  (preValue, currentValue[, currentIndex[, anotherArray]]) => {},
  initialValue
);
```

也就是说，`reducer`接收一个`callback`作为必须的参数，`callback`中，以上一步的value和当前value作为参数，`callback`的返回值则又会作为下一步`callback`中的`preValue`

除此以外，如果没有`initialValue`，则第一次`callback`时的`preValue`则为数组中的第一个元素

#### example

```javascript
let array = [0, 1, 2, 3, 4];
let result = array.reduce((pre, cur) => {
  return pre + cur;
});
console.log(result); // 10;

let array2 = [0, 1, 2, 3, 4];
let result2 = array2.reduce((pre, cur) => {
  return pre + cur;
}, 10);
console.log(result2); // 20;
```