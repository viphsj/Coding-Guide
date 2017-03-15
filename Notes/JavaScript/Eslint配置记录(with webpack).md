<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Eslint 配置记录(with webpack)](#eslint-%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%95with-webpack)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [基本配置](#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
    - [配置webpack](#%E9%85%8D%E7%BD%AEwebpack)
  - [插件](#%E6%8F%92%E4%BB%B6)
  - [资料](#%E8%B5%84%E6%96%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Eslint 配置记录(with webpack)

[ESLint](http://eslint.org/)，The pluggable linting utility for JavaScript and JSX
![eslint](../../image/es-lint.jpg)

### 安装

- [eslint](https://github.com/eslint/eslint)
- [eslint-config-standard](https://github.com/feross/eslint-config-standard)
- [eslint-loader](https://github.com/MoOx/eslint-loader)

```bash
$ npm install eslint --save-dev

# use js standard style
$ npm install eslint-config-standard --save-dev

# with webpack
$ npm install eslint-loader --save-dev
```

### 基本配置

#### 配置 webpack

```javascript
module: {
  preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
  ]
}
```

在项目根目录下添加`.eslintrc.json`文件

```json
// .eslintrc.json

{
  "extends": "standard",
  "plugins": [],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jquery": true,
    "commonjs": true,
    "phantomjs": true,
    "mocha": true
  },
  "rules": {
    // 规则配置
    "no-console": 1,
    "no-debugger": 1,
    "no-extra-semi": 1,
    "no-constant-condition": 2,
    "no-extra-boolean-cast": 2,
    "use-isnan": 2,
    "no-undef-init": 2,
    "camelcase": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-const-assign":2,
    "no-func-assign": 2,
    "no-else-return": 1,
    "no-obj-calls": 2,
    "valid-typeof": 2,
    "no-unused-vars": 1,
    "quotes": 0,
    "object-curly-spacing": 1,
    "block-spacing": 1,
    "semi": 0,
    "no-extra-semi": 1,
    "keyword-spacing": 1,
    "comma-dangle": 0,
    "array-bracket-spacing": 1,
    "space-before-function-paren": 1,
    "no-extra-bind": 1,
    "no-var": "error",
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "arrow-body-style": ["error", "as-needed"],
    "no-empty-function": ["error", { "allow": ["arrowFunctions", "constructors"] }]
  }
}
```

Eslint 的规则配置具体可戳[这里](http://eslint.org/docs/rules/)

通常，0 代表不使用这个规则，1 代表`warnning`的程度，2 代表`error`的程度。

有一篇博客写的挺细的：[详解 ESLint 规则，规范你的代码](http://guowenfh.github.io/2016/08/07/ESLint-Rules/)

### 插件

如果我们使用 ES6/ES7 或者 JSX 的语法，并用 babel 进行解析的话，可以安装 [babel-eslint](https://github.com/babel/babel-eslint)

```bash
$ npm install babel-eslint --save-dev
```

```json
// .eslintrc.json

{
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  }
}
```

在使用 React 的时候，如果 Eslint 里配置了`no-unused-vars`的规则，那么在检查代码的时候会报错，提示 import 的组件没有被调用(实际上使用了)：

```bash
React is defined but never used no-ununsed-vars
Component is defined but never used
```

查到 GitHub 上有人提出 [issue](https://github.com/eslint/eslint/issues/4821)，解决方案是使用`eslint-plugin-react`，因此来安装配置`eslint-plugin`：

- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)

```bash
$ npm install eslint-plugin-react --save-dev
```

```json
// .eslintrc.json

{
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/react-in-jsx-scope": "error",
    "react/jsx-uses-vars": [2],
    "react/jsx-uses-react": [2]
  }
}
```

- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)

> 检查 import 是否合法的插件

```bash
$ npm install eslint-plugin-import --save-dev
```

```json
// .eslintrc.json

{
  "plugins": [
    "import"
  ],
  "rules": {
  	// 检查引用的路径是否有误
  	// 通过 {"commonjs": true, "amd": true} 来支持 commonjs 和 amd 方式的 require
  	"import/no-unresolved": [2, {"commonjs": true, "amd": true}],
    "import/namespace": 2,
  	"import/default": 2,
  	"import/export": 2
  },
  "settings": {
  	// 如果我们通过webpack配置忽略了js文件后缀，在正常情况下eslint会因为找不到文件而报错。因此需要在settings里配置可省略的后缀名
    "import/resolver": {
      "node": {
        "extensions": [".coffee", ".js", ".jsx"]
      }
    },
    // 哪些import是不去检查的
    // node_modules为默认值
    // 还可以配置带有指定文件后缀不检查，如\.coffee$ 
    "import/ignore": ["node_modules"]
  }
}
```

其他可选插件：

- [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard)
- [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise/)
- [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack)

### 资料

- [awesome-eslint](https://github.com/dustinspecker/awesome-eslint)
- [Eslint](http://eslint.org/)