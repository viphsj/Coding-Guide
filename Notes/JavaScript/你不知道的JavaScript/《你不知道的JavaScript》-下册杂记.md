<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [《你不知道的 JavaScript》下册杂记](#%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84-javascript%E4%B8%8B%E5%86%8C%E6%9D%82%E8%AE%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 《你不知道的 JavaScript》下册杂记

```javascript
// 声明空函数
const cb = Function.prototype;
// 等价于
const cb = () => {};
```

```javascript
// 简写方法、箭头函数，将会生成匿名函数表达式
const example = {
  someFunc() {
  },
  arrowFunc: () => {
  }
};

// 实际等效于
const example = {
  someFunc: function() {
  },
  arrowFunc: function() {
  }
}
```

- 标签模板字面量

```javascript
// 标签模板字面量
function foo(strings, ...values) {
  console.log(strings);
  console.log(values);
}

const desc = "interesting";
foo`Swift is ${desc} and awesome and ${desc}`;
// output:
// ["Swift is ", " and awesome"]
// ["interesting", "interesting"]
```

- Symbol

```javascript
/*
 * Symbol
 * 用于创建一个类似字符串的，不会和其他任何值冲突的值
 * 通常作为唯一的标识
 */
// 创建 Symbol，并识别是否是 Symbol
const sym = Symbol('I am a symbol'); // Symbol(I am a symbol)
typeof of sym === 'symbol'; // true
sym.toString(); // "Symbol(I am a symbol)"

// 注意，symbol 不是 Symbol 的实例
sym instanceof Symbol; // false
const symObject = Object(sym);
symObject instanceof Symbol; // true
symObject.valueOf() === sym; // true

// 全局注册 Symbol
const globalSymbol = Symbol.for('golbal symbol example');
// 通过 Symbol.for 注册过以后，之后如果再注册，则始终会返回这一个实例

// 获取注册 Symbol 的文本
const symbol = Symbol.for('example');
Symbol.keyFor(symbol); // example

// 当 Symbol 作为对象的属性/键值时，不会在其一般属性枚举中出现
const object = {
  a: 1,
  [Symbol('b')]: 2,
  c: 3
};

for (const key in object) {
  console.log(key);
}
// a
// c

// 但是，可以通过 Object.getOwnPropertySymbols(..) 获取到 Symbol 的键
```

- 模块

```javascript
/*
 * 模块
 * ES6 的模块是单例
 * 当导出局部私有变量时，导出的是对变量的引用（类似指针）。如果在模块内部修改已经导出绑定的变量的值，则已经导入的绑定也会被更改
 */

// 默认导出
// way1:
// 导出的是此时函数表达式值的绑定，即直接导出了一个表达式，相当于
// export default function foo() {}
// 因此，即便后续改变 foo 的引用，也不会改变已经导入的模板
function foo() {}
export default foo;

// way2:
// 默认导出绑定实际上绑定到了 foo 标识符上，而不是 foo 的值。
// 因此，如果后续改变了 foo，已经导入的模块也会改变
function foo() {}
export { foo as default };
```

- Promise

```javascript
// Promise
// 题外话：How do I tell if an object is a Promise?
// -> https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise
```

- WeakMap/WeakSet

- [Difference between Map and WeakMap in JavaScript](https://www.mattzeunert.com/2017/01/31/weak-maps.html)
- [What are the actual uses of ES6 WeakMap?](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)

```javascript
// WeakMap/WeakSet
// WeakMap/WeakSet 所持有的键是弱持有的，即，如果这些对象本身被垃圾回收了，
// 则 WeakMap/WeakSet 中这些项目也会被回收
// 它们只接受对象作为键
const weakMap = new WeakMap();

let a = { a: 1 };
let b = { b: 2 };
weakMap.set(a, b);
a = null;
// 则 a 将彻底从内存中释放，不会因为 WeakMap 的弱引用而造成无法释放
```

- New APIs

```javascript
// 新增 API

// Array
Array(3); // [undefined, undefined, undefined]
Array.of(3); // [3]
// Array.from(iterable/arrayLike)，将可迭代对象、类数组对象转换为数组
const arrayLike = {
  length: 3,
  0: '0',
  1: '1'
};
Array.from(arrayLike); // ['0', '1', undefined]; 不会产生空槽位

// array.fill()
Array(3).fill(1); // [1, 1, 1]

// Number
// Number.isFinite(number); 检查是否是非无限的
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(42); // true
// Number.isSafeInteger(); 检查为整数，
// 且位于 Number.MIN_SAFE_INTEGER ~ Number.MAX_SAFE_INTEGER 之内

// String
// string.repeat(number)
'a'.repeat(3); // aaa

// string.startsWith();
// string.endsWith();
// string.inclueds();
```
