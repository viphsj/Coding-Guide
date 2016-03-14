## js编码规范

### 使用ES6中的规范

- 使用对象方法的简写

```js
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

- 使用对象属性的简写

```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
	lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
	lukeSkywalker,
};
```

- 在对象属性声明前把简写的属性分组

> 因为这样能清楚地看出哪些属性使用了简写

```js
const example = 'example';
const count = 100;

// bad
const obj = {
	number: 1,
	id: 2,
	count,
	three: 3,
	example
};

// good
const obj = {
	example,
	count,
	number: 1,
	id: 2,
	three: 3
};
```

- 使用拓展运算符 `...` 复制数组

```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

### 文件与编码

- 静态常量分离，命名使用 "大写"+"_"

```js
// create a file named ConstValue.js

export var CONST_VALUE = "constValue";

export var AMOUNT = 10;

// use const value...
// in index.js

import {
	CONST_VALUE,
	AMOUNT
} from './ConstValue.js';
```

- 字符串使用单引号 `''`

```js
// bad
const name = "Capt. Janeway";

// good
const name = 'Capt. Janeway';
```

### 解构

- **使用解构存取和使用多属性对象**

> 解构能减少临时引用属性

```js
// bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function getFullName(obj) {
    const { firstName, lastName } = obj;
    return `${firstName} ${lastName}`;
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
```

- 对数组使用解构赋值

```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

- 需要回传多个值时，使用对象解构，而不是数组解构

> 增加属性或者改变排序不会改变调用时的位置

```js
 // bad
  function processInput(input) {
    // then a miracle occurs
    return [left, right, top, bottom];
  }

  // 调用时需要考虑回调数据的顺序。
  const [left, __, top] = processInput(input);

  // good
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom };
  }

  // 调用时只选择需要的数据
  const { left, right } = processInput(input);
```
   
### 函数
  
- 使用函数声明代替函数表达式

> 因为函数声明是可命名的，所以他们在调用栈中更容易被识别
> 
> 此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升

```js
// bad
const foo = function () {
};

// good
function foo() {
}
```
  
- 直接给函数的参数指定默认值，不要使用一个变化的函数参数

```js
// bad
function handleThings(opts) {
  // 不应该改变函数参数。
  opts = opts || {};
  // ...
}

// bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

- 当需要传递一个匿名函数，或使用函数表达式时，使用箭头函数

```js
// bad
[1, 2, 3].map(function (x) {
	return x * x;
});
	
// good
[1, 2, 3].map((x) => {
	return x * x;
});
```

### 属性与变量

- 使用 `.` 来访问对象的属性

```js
const person = {
  name: ecmadao,
  age: 24,
};

// bad
const myName = person['name'];

// good
const myName = person.name;
```

- 一直使用 `const` 来声明变量

> 避免全局命名空间的污染

