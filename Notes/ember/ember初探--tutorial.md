## ember初探--tutorial

### 创建新的应用

ember cli, ember命令行，都为ember项目提供了良好的项目结构，以及很多开发工具和附加的插件，因此使得使用ember的开发者们可以更加专心致力于App的开发而不是搭建项目的结构。

#### 初始化应用

```bash
# 新建一个名为super-rentals的项目，我们将在应用里浏览并查找租房信息
$ ember new super-rentals
```

#### 目录结构

```bash
# 基本的项目结构
|--app # models, components, routes, templates, styles...
|--bower_components
|--config # containers environment.js
|--dist # output files
|--node_modules
|--public # assets such as images & fonts
|--tests
|--tmp # ember cli temporary files
|--vendor # third-party dependencies

bower.json
ember-cli-build.js
package.json
README.md
testem.js
```

值得一提的是，ember cli默认使用es6语法

#### start server

```bash
$ ember server
# $ ember s
```

then visit[ember tutorial](http://localhost:4200)

### 测试先行

首先我们思考一下App的功能：

- 列出可用的租房信息
- 要有能够到达公司介绍页面的链接
- 要有能够到达联系我们页面的链接
- 根据城市来筛选租房信息的列表

它的最终形态应该这样：

![](../../image/ember_tutorial/style-super-rentals-maps.png)

我们把这些目标叫作`ember验收测试`，它用来保障我们的App在完工之后能够正常工作。

首先，新建一个测试文件：

```bash
$ ember g acceptance-test list-rentals
# output
# installing acceptance-test
#   create tests/acceptance/list-rentals-test.js
```

之后我们修改`/tests/acceptance/list-rentals-test.js`文件：

```javascript
import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list-rentals');

test('should list available rentals.', function (assert) {
});

test('should link to information about the company.', function (assert) {
});

test('should link to contact information.', function (assert) {
});

test('should filter the list of rentals by city.', function (assert) {
});
```

测试毫无疑问会爆掉。ember为我们提供了测试方法来模拟访问页面、表单填充、等待页面渲染等行为，因此我们应该更详细的写下测试：

```javascript
// 测试页面访问
test('should list available rentals.', function (assert) {
  visit('/');
  // andThen 方法会等到之前的执行完毕之后再执行
  andThen(function () {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});
```

```javascript
test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function () {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information', function (assert) {
  visit('/');
  // 运用click模拟点击操作
  click('a:contains("Contact")');
  andThen(function () {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});
```

```javascript
// 最后来测试列表筛选功能
test('should filter the list of rentals by city.', function (assert) {
  visit('/');
  // fillIn模拟input的填充
  // keyEvent模拟键盘事件
  fillIn('.list-filter input', 'seattle');
  keyEvent('.list-filter input', 'keyup', 69);
  andThen(function () {
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
  });
});
```

### Routes & Templates

#### 新建about路由

```bash
$ ember generate route about
# $ ember g route about

# 它会新增about路由，以及对应的route handler
# 并创建about模板，和对应的测试
# installing route
#   create app/routes/about.js
#   create app/templates/about.hbs
# updating router
#   add route about
# installing route-test
#   create tests/unit/routes/about-test.js
```

```javascript
// app/router.js
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // 新增about
  this.route('about');
});

export default Router;
```

在默认情况下，about路由指向`app/routes/about.js`route handler，并加载`app/templates/about.hbs`模板。来给模板里填充点东西：

```html
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
</div>
```

#### 新建contact路由

