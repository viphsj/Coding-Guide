<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ember初探--Core Concept](#ember%E5%88%9D%E6%8E%A2--core-concept)
  - [core concept](#core-concept)
    - [router & route handler](#router-&-route-handler)
    - [model & template](#model-&-template)
    - [component](#component)
  - [ember command line](#ember-command-line)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [Ember](http://emberjs.com/)初探--Core Concept

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

#### router & route handler

`app/router.js`文件根据不同路由，选择`app/routes/`里的不同文件（`route handler`）。每个`route handler`文件的基本构成：

```javascript
// app/routes/XXX.js
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

// hard code
export default Ember.Route.extend({
  model() {
    return ['this is example1', 'this is example2', 'this is example3'];
  }
});

```

#### model & template

如果要使用model进行数据库查询，则需要创建model文件并定义数据结构：

```bash
$ ember g model example
# create app/models/about.js
# create tests/unit/models/about-test.js
```

```javascript
// app/models/about.js
import DS from 'ember-data';

export default DS.Model.extend({
  // define your data
  // for example,
  examples: DS.attr()
});
```

```javascript
// app/routes/example.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // 它会发送一个GET请求到/examples
    // 具体方式之后再说
    return this.get('store').findAll('example');
  }
});
```

之后，route在`app/templates/`里寻找并渲染对应的模板：

```html
<!-- templates/example.hbs -->
<ul>
    {{#each model as |example|}}
        <li>{{example}}</li>
    {{/each}}
</ul>
```

如果我们有通用的贯穿个页面的`base_layout`样式，则可以新建一个`application`模板：

```bash
$ ember g template application
# create app/templates/application.hbs
```

在`application.hbs`中：

```html
{{outlet}}
```

`{{outlet}}`会把不同路由渲染的模板加载进`application.hbs`模板里。

#### component

有时，对于一些可复用的组件，我们可以创建component

```bash
$ ember g component example-component
# create app/components/example-component.js
# create app/templates/components/example-component.hbs
# create tests/integration/components/example-component-test.js
```

```html
<!-- app/templates/components/example-component.hbs -->

{{title}}
<ul>
    {{#each examples as |example|}}
        <li>{{example}}</li>
    {{/each}}
</ul>
```

```html
<!-- app/templates/example.hbs -->

{{example-component title="List of Examples" examples=model}}
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

```bash
# $ ember generate XXX
# 可简写为 $ ember g XXX

# 创建名为application的模板
$ ember g template application
# application模板会贯穿各页面

# 创建router - example
$ ember g route example
# or ember g route example
# 会连带着创建路由和模板：
# create app/routes/example.js
# create app/templates/example.hbs
# 并在 app/router.js中新增router：
# add route example
# 同时创建对应的测试：
# create tests/unit/routes/example-test.js

# 如果有模板需要复用，则可以创建组件
$ ember g component example-component
# 会连带着创建组件和模板：
# create app/components/example-component.js
# create app/templates/components/example-component.hbs
# 同时创建对应的测试
# create tests/integration/components/example-component-test.js

# 创建model
$ ember g model example
# create app/models/about.js
# create tests/unit/models/about-test.js

# build
$ ember build
# 已生产环境打包（hash、压缩）
$ ember build --env production

# server
$ ember server
# or ember s
# listen to http://localhost:4200
```

从command line就能体会出，ember试图帮你做好其他多余的事情，让开发者更专注于生产
