<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [UnitTest](#unittest)
  - [TDD](#tdd)
  - [Test Type & Test Tools](#test-type-&-test-tools)
    - [Type](#type)
    - [Tools](#tools)
  - [Mocha + chai的API/Fun UnitTest](#mocha--chai%E7%9A%84apifun-unittest)
  - [基于 phantomjs 的UI UnitTest](#%E5%9F%BA%E4%BA%8E-phantomjs-%E7%9A%84ui-unittest)
  - [selenium](#selenium)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## UnitTest

[前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)

[测试驱动开发（TDD）介绍中的误区](http://blog.jobbole.com/64431/)

### TDD

测试驱动开发(TDD)，其基本思路是通过测试来推动整个开发的进行。

- 单元测试的首要目的不是为了能够编写出大覆盖率的全部通过的测试代码，而是需要从使用者(调用者)的角度出发，尝试函数逻辑的各种可能性，进而辅助性增强代码质量
- 测试是手段而不是目的。测试的主要目的不是证明代码正确，而是帮助发现错误，包括低级的错误
- 测试要快。快速运行、快速编写
- 测试代码保持简洁
- 不会忽略失败的测试。一旦团队开始接受1个测试的构建失败，那么他们渐渐地适应2、3、4或者更多的失败。在这种情况下，测试集就不再起作用

**IMPORTANT**

- 一定不能误解了TDD的核心目的！
- 测试不是为了覆盖率和正确率
- 而是作为实例，告诉开发人员要编写什么代码

**大致过程**

1. 需求分析，思考实现。考虑如何“使用”产品代码，是一个实例方法还是一个类方法，是从构造函数传参还是从方法调用传参，方法的命名，返回值等。这时其实就是在做设计，而且设计以代码来体现。此时测试为红
2. 实现代码让测试为绿
3. 重构，然后重复测试
4. 最终符合所有要求：
   - 每个概念都被清晰的表达
   - Not Repeat Self
   - 没有多余的东西
   - 通过测试

### Test Type & Test Tools

#### Type

- API/Fun UnitTest
  - 测试不常变化的函数逻辑
  - 测试前后端API接口
- UI UnitTest
  - 页面自动截图
  - 页面DOM元素检查
  - 跑通交互流程

#### Tools

- [Mocha](http://mochajs.org/) + [Chai](http://chaijs.com/)
- [PhantomJS](http://phantomjs.org/) or [CasperJS](http://casperjs.org/) or [Nightwatch.js](http://nightwatchjs.org/)
- [selenium](https://github.com/SeleniumHQ/selenium)
  - [with python](http://seleniumhq.github.io/selenium/docs/api/py/)
  - [with js](http://seleniumhq.github.io/selenium/docs/api/javascript/)

### [Mocha](http://mochajs.org/)+[chai](http://chaijs.com/)的API/Fun UnitTest

> chai只是一个断言库，为测试提供更简洁的语法

#### initial

[Testing in ES6 with Mocha and Babel 6](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/)

[Using Babel](https://babeljs.io/docs/setup/#installation)

##### setup

```bash
$ npm i mocha --save
```

##### use with es6

*babel 6+*

```bash
$ npm install --save-dev babel-register
$ npm install babel-preset-es2015 --save-dev
```

```json
// package.json
{
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha --compilers js:babel-register"
  },
  "babel": {
    "presets": [
      "es2015"
    ]
  }
}
```

*babel 5+*

```bash
$ npm install --save-dev babel-core
```

```json
// package.json
{
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha --compilers js:babel-core/register"
  }
}
```

##### use with coffeescript

```bash
$ npm install --save coffee-script
```

```json
{
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha --compilers coffee:coffee-script/register"
  }
}
```

##### use with es6+coffeescript

after done both...

```json
{
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha --compilers js:babel-core/register,coffee:coffee-script/register"
  }
}
```

##### usage

```bash
# $ mocha
$ npm t
$ npm test
```

#### Test

测试的一个基本思路是，自身从函数的调用者出发，对函数进行各种情况的调用，查看其容错程度、返回结果是否符合预期。

```js
import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

describe('describe a test', () => {

  it('should return true', () => {
  	let example = true;
  	// expect
  	expect(example).not.to.equal(false);
  	expect(example).to.equal(true);
  	// should
  	example.should.equal(true);
  	example.should.be.a(boolen);
  	[1, 2].should.have.length(2);
  });
  
  it('should check an object', () => {
    // 对于多层嵌套的Object而言..
    let nestedObj = {
  	  a: {
  	    b: 1
	  }
	};
	let nestedObjCopy = Object.assign({}, nestedObj);
	nestedObj.a.b = 2;
	
	// do a function to change nestedObjCopy.a.b 
	expect(nestedObjCopy).to.deep.equal(nestedObj);
	expect(nestedObjCopy).to.have.property('a');
  });
});
```

#### AsynTest

[Testing Asynchronous Code with MochaJS and ES7 async/await](http://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/)

mocha无法自动监听异步方法的完成，需要我们在完成之后手动调用`done()`方法

```js
// 普通的测试方法
it("should work", function(){
    console.log("Synchronous test");
});
// 异步的测试方法
it("should work", function(done){
    console.log("Synchronous test");
});
```

#### Test Redux


### 基于[phantomjs](http://phantomjs.org/)的UI UnitTest

- open 某个 url
- 监听 onload 事件
- 事件完成后调用 sendEvent 之类的 api 去点击某个 DOM 元素所在 point
- 触发交互
- 根据 UI 交互情况 延时 setTimeout （规避惰加载组件点不到的情况）继续 sendEvent 之类的交互

### [selenium](https://github.com/SeleniumHQ/selenium)

[Getting started with Selenium Webdriver for node.js](http://bites.goodeggs.com/posts/selenium-webdriver-nodejs-tutorial/)