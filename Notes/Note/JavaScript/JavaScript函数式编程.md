## JavaScript-函数式编程

### 函数与其他数据类型一样，处于平等地位
可作为变量一样被传递、返回或者在函数中嵌套函数。可作为参数。使用总有返回值的表达式而不是语句

### 函数应该纯天然，无副作用
副作用是指，函数内部与外部互动，产生运算以外的其他结果。
例如在函数调用的过程中，利用并修改到了外部的变量，那么就是一个有副作用的函数。

由于函数式编程不修改外部变量，所以根本不存在线程锁的问题。多线程并发的时候不用担心使用的变量被其他线程所修改 

### 引用透明
**纯函数的运行不应该依赖于外部变量或状态，只依赖于输入的参数。对于相同的输入参数，返回的结果一定相同。**

### immutable
如果要改变变量，则需要把数据deep copy出去进行修改

几个函数式编程的普通例子：

```javascript
// 非函数式编程
let a = 1;
function increase() {
  a++;
}
increase();
console.log(a); // 2

// 函数式编程
var a = 1;
function increase(a) { // 通过参数引用，不依赖外部数据
  return a + 1; // 不改变外部数据，返回一个新值
}
console.log(increase(a)); // 2
console.log(a); // 1
```

```javascript
// 比较Array中的slice和splice
let test = [1, 2, 3, 4, 5];

// slice为纯函数，返回一个新的数组
console.log(test.slice(0, 3)); // [1, 2, 3]
console.log(test); //[1, 2, 3, 4, 5]

// splice则会修改参数数组
console.log(test.splice(0, 3)); // [1, 2, 3]
console.log(test); // [4, 5]
```

```javascript
// 函数式编程-函数作为返回参数
const add = (x) => {
  return plus = (y) => {
    return x + y;
  }
};
let plus1 = add(1);
let plus2 = add(2);

console.log(plus1(1)); // 2
console.log(plus2(1)); // 3
```
函数式编程的几个要点

> 把函数当成变量来用，关注于描述问题而不是怎么实现
>
> 函数之间没有共享的变量
>
> 函数间通过参数和返回值来传递数据
>
> 在函数里没有临时变量