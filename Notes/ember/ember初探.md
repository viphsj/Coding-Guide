<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ember初探](#ember%E5%88%9D%E6%8E%A2)
  - [core concept](#core-concept)
  - [ember command line](#ember-command-line)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [Ember](http://emberjs.com/)初探

> 自称是：A framework for creating ambitious web applications，为效率而生，
> 默认使用[`Handlebars`](http://handlebarsjs.com/)模板引擎

依赖：
- node
- npm
- bower -- 依赖管理工具
- wtachman(optional)
- phantomjs(optional)

```bash
# install
$ npm install -g ember-cli
```

### [core concept](https://guides.emberjs.com/v2.7.0/getting-started/core-concepts/)

一张图看明白ember架构：

![ember core concept](../../image/ember/ember-core-concepts.png)

`app/router.js`文件根据不同路由，选择`app/routes/`里的不同文件（`route handler`）。每个`route handler`文件的基本构成：

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
});
```

例如，我们设置的路由为`/example`，那么在访问这个路径的时候，ember会在`app/router.js`查找`examlpe`是否注册：

```javascript
Router.map(function() {
  this.route('example');
});
```

接着，去`app/routes/`文件夹下寻找对应的`route handler`。我们可以在`route handler`文件里通过modal查询并返回数据：

```javascript
// app/routes/example.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return ['this is example1', 'this is example2', 'this is example3'];
  }
});

```

之后，route在`app/templates/`里寻找并渲染对应的模板：

```hbs
<!-- templates/example.hbs -->
<ul>
    {{#each model as |example|}}
        <li>{{example}}</li>
    {{/each}}
</ul>
```

DONE.

### ember command line

```bash
# 新建应用
$ ember new app-name
```

文件结构：

```bash
|--app (models, components, routes, templates, styles...)
|--bower_components (ember-cli dependency)
|--config (environment.js)
|--dist (build output)
|--node_modules (node dependency)
|--public (assets such as images/fonts)
|--tests (Automated tests)
|--tmp (Ember CLI temporary files)
|--vendor (third-party front-end dependencies)

bower.json
ember-cli-build.js
package.json
README.md
testem.js
```

```
# 创建名为application的模板
$ ember generate template application

# 创建router - scientists
$ ember generate route scientists
# 会连带着创建路由和模板：
# create app/routes/scientists.js
# create app/templates/scientists.hbs
# 并在 app/router.js中新增router：
# add route scientists
# 同时创建对应的测试：
# create tests/unit/routes/scientists-test.js

# 如果有模板需要复用，则可以创建组件
$ ember generate component people-list
# 会连带着创建组件和模板：
# create app/components/people-list.js
# create app/templates/components/people-list.hbs
# 同时创建对应的测试
# create tests/integration/components/people-list-test.js

# build
$ ember build
# 已生产环境打包（hash、压缩）
$ ember build --env production
```

从command line就能体会出，ember试图帮你做好其他多余的事情，让开发者更专注于生产
