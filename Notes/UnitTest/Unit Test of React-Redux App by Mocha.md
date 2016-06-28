<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Unit Test of React-Redux App by Mocha](#unit-test-of-react-redux-app-by-mocha)
  - [测试异步操作](#%E6%B5%8B%E8%AF%95%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Unit Test of React-Redux App by Mocha

### 测试异步操作

`done()`

```js
try {
  expect(...).to.deep.equal(...);
  done();
} catch (err) {
  done(err);
}
```
