## Node.js 初步 - 模块化

### 模块化

众所周知，node中的模块与包的概念非常出名。其编程的过程中也基本以严格的模块化为主。

在编写模块的时候，可使用`require`和`exports`变量

#### `require`

`require`函数用于加载其他模块，传入一个模块名，返回一个模块导出对象:

```js
var foo = require('./example.js');
// 等价于
var foo = require('./example');
// 等价于
var foo = require('/home/demo/example');

// 可以通过require方式加载json文件
var data = require('./data.json');
```

#### `exports`

通过`exports`导出当前模块中的对象

```js
// example.js

function example() {
	// do something..
	console.log('do something');
}

exports.example = example;
```

```js
// index.js

var example = require('./example');

example.example(); // do something
```

#### package

如果一个模块，有很多其他模块支撑的话，他们可以共同组成一个包（package）

文件结构目录就像这样：

```js
-- demo_package
---- main.js
---- side.js
---- example.js
```
其中，`main.js`是总出口，它引用并使用了`side.js`和`example.js`

```js
var side = require('./side');
var example = require('./example');

exports.main = function (name) {
    return {
        name: name,
        side: side.start(),
        example: example.start()
    };
};
```
在其它模块里使用包的时候，需要加载包的入口模块（main.js）。在现在这种情况下，需要安装下面的方式加载：

```js
require('./demo_package/main.js');
```
**但是，如果我们把`main.js`改名为`index.js`，则可通过只加载包名而加载包**

```js
// 将 ./demo_package/main.js 改名为 ./demo_package/index.js
require('./demo_package');
```

#### package.json

如果想自定义入口模块的文件名和存放位置，就需要在**包目录下**包含一个 `package.json` 文件，并在其中指定入口模块的路径

我们先看一下 `demo_package` 的整体文件路径：

```js
-- home
---- demo
------ package
-------- demo_package
---------- package.json
---------- readme.md
---------- files
------------ main.js
------------ side.js
------------ example.js
```

```js
// package.json 配置文件

{
	"name": "demo_package",
	"main": "./files/main.js"
}
```

这样，就同样可以通过`require('./package/demo_package')`的方式加载模块

#### 工程目录

An example:

```js
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
```

### 回调

**Node.js规定在JavaScript的回调函数的第一个参数为 Error 对象**