### js编码规范

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