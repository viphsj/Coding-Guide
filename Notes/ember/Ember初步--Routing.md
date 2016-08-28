## Ember初步--Routing

Ember中的Router会把URL交给`route handler`来处理，每个Route Handler可以做如下的事情：

- render一个template
- 加载模板对应的modal
- 重定向到新的route
- 处理事件（改变modal、转换路由）

### 定义路由

```bash
$ ember generate route route-name
# will create
# app/routes/route-name.js
# app/templates/route-name.hbs
# tests/unit/routes/route-name-test.js
# and
# will add new route to app/router.js
```

#### 基本路由

```javascript
// app/router.js
Router.map(function() {
  this.route('about', { path: '/about' });
  this.route('favorites', { path: '/favs' });
});
```

现在，当用户访问`/about`的时候，Ember会渲染`about`模板。favorites路由同理。

另外，当路由名称和模板名称一样的时候，就可以直接省略后面那个包含了path的Object：

```javascript
// app/router.js
Router.map(function() {
  this.route('about');
  this.route('favorites', { path: '/favs' });
});
```

在模板内，你可以使用`{{link-to}}`来创建`a`标签，以此链接到其他的路由：

```html
{{#link-to "index"}}<img class="logo">{{/link-to}}

<nav>
  {{#link-to "about"}}About{{/link-to}}
  {{#link-to "favorites"}}Favorites{{/link-to}}
</nav>
```

`{{link-to}}`方法会根据当前路由自动给标签加上`active`class。

如果路由由多个单词组成，则要按照常规写法：

```javascript
// app/router.js
Router.map(function() {
  this.route('blog-post', { path: '/blog-post' });
});
```

```javascript
// app/router.js
Router.map(function() {
  this.route('blog_post', { path: '/blog-post' });
});
```

以上两个路由会渲染`blog-post.hbs`和`blog-post.js`

#### Nested Routes

有时候你的路由有嵌套关系，比如，一个博客网站，它的列表页和新建页的URL是有递进关系的，例如`/posts/new`，此时可以通过：

```bash
$ ember generate route posts/new
```

创建出形如：

```javascript
Router.map(function() {
  this.route('posts', function() {
    this.route('new');
  });
});
```

的路由关系，而他们的模板也有嵌套复用的关系：

```html
<!-- templates/posts.hbs -->
<h1>Posts</h1>
<!-- Display posts and other content -->
{{outlet}}
```

当用户访问`/posts`页面的时候，渲染的是`templates/posts.hbs`模板；而当他们访问`posts/new`页面的时候，`posts/new.hbs`模板会作为`{{outlet}}`输出在`posts.hbs`模板里面。

#### application route

当你访问ember web应用时，实际上也访问了`application`路由，因此，`app/templates/application.hbs`模板会贯穿整个应用。其他页面的模板都将作为`{{outlet}}`输出在`application.hbs`模板中。

#### index route

Ember会自动将`/`路径指向名为`index`的路由。在没有设置`index`模板的情况下，会自动渲染一个空的`{{outlet}}`到`application.hbs`模板。

```javascript
// app/router.js
Router.map(function() {
  this.route('posts', function() {
    this.route('favorites');
  });
});
```

与下面这样的写法等价：

```javascript
// app/router.js
Router.map(function(){
  this.route('index', { path: '/' });
  this.route('posts', function() {
    this.route('index', { path: '/' });
    this.route('favorites');
  });
});
```

#### 动态片段

路由的一个责任是加载对应的model。例如，如果我们有`this.route('posts');`这个路由，它会加载应用里所有的博文。

因为`/posts`相当于一个静态的model，我们不需要额外的信息就能够知道它会渲染出什么（一个博客文章的列表）。但是，对于针对某一篇博客的路由而言，就不得而知了。我们总不能hard-code出每一篇博客的路由。

此时的路由是动态的。

动态路由片段在定义时以`:`开头，后面则跟着各个路由独特的认证：

```javascript
// app/router.js
Router.map(function() {
  this.route('posts');
  this.route('post', { path: '/post/:post_id' });
});
```

当用户导航到`/post/5`这个URL时，路由会将`post_id`赋值为5，以便渲染对应的文章。

> Ember遵守着形如`:model-name_id`的动态路由规范，例如上面的`:post-id`
> 
> 第一个理由是路由可以获取到正确的model，例如上面会去找post model
> 
> 第二个理由则是动态路由的参数是个对象，它的键和值应该一一对应

鉴于上面的理由，下面这样写的路由不会正常工作：

```javascript
// app/router.js
Router.map(function() {
  this.route("photo", { path: "photo/:id" }, function() {
    this.route("comment", { path: "comment/:id" });
  });
});
```

但这样的就会：

```javascript
// app/router.js
Router.map(function() {
  this.route("photo", { path: "photo/:photo_id" }, function() {
    this.route("comment", { path: "comment/:comment_id" });
  });
});
```

#### 全局路由/多URL匹配的路由

你可以定义能够匹配多个路径的路由。它的场景使用场景是用来捕获用户输入的错误的路径，来渲染一个特定的模板：

```javascript
// app/router.js
Router.map(function() {
  this.route('page-not-found', { path: '/*wildcard' });
});
```

### Route Model

通常情况下，模板会渲染其对应的model里提供的数据。而加载model则是route的本质工作。

#### 静态model

例如这个route：

```javascript
// app/router.js
Router.map(function() {
  this.route('favorite-posts');
});
```

为了能让`favorite-posts`路由加载model，你需要在`favorite-posts`的route handler中使用`model()`钩子：

```javascript
// app/routes/favorite-posts.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').query('post', { favorite: true });
  }
});
```

还有就是，`model()`必须返回一个`Ember Data`，它可以是`Promise`对象，JS对象或者Array。在渲染template之前，Ember会保持阻塞知道数据获取完毕（promise resolved）。

之后路由会将从`model()`钩子返回的值作为对应controller的model属性。之后你就能够在模板里获取到controller里的model属性了：

```html
<!-- app/templates/favorite-posts.hbs -->
<h1>Favorite Posts</h1>
{{#each model as |post|}}
  <p>{{post.body}}</p>
{{/each}}
```

#### 动态model

一些路由总是会对应不变的model，例如，`/photos`路由总是会渲染出照片列表。即便用户离开了页面之后再回来，该路由对应的model也不会变。

但是，有一些路由是根据用户的互动而变化的。还是上面那个渲染照片列表的App，当用户点击图片列表里的某个特定图片时，渲染出来的内容各不相同，但都会使用`phone.hbs`这个模板。此时，针对不同的含有动态片段路由，会处理不同的model：

```javascript
// app/router.js
Router.map(function() {
  this.route('photo', { path: '/photos/:photo_id' });
});
```

路由接收的`photo_id`会作为参数传入`route handler`，即`params`。

但要注意的是，`params`是个Object，拥有`photo_id`参数，即点击不同图片是加载的不同动态路由里拥有的图片ID：

```javascript
// app/routes/photo.js
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('photo', params.photo_id);
  }
});
```

注意，拥有动态路由的模板应该这么写：

```html
<!-- app/templates/photos.hbs -->
<h1>Photos</h1>
{{#each model as |photo|}}
  <p>
    <!-- photo.id作为参数传入，形成不同的URL -->
    {{#link-to 'photo' photo.id}}
      <img src="{{photo.thumbnailUrl}}" alt="{{photo.title}}" />
    {{/link-to}}
  </p>
{{/each}}
```

#### 多model

复数个model可以通过[`RSVP.hash`](http://emberjs.com/api/classes/RSVP.html#method_hash)来返回。`RSVP.hash`接收`Promise`作为参数，并且当所有的Promise都resolve之后才会返回resolve。例如：

```javascript
// app/routes/songs.js
import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      songs: this.get('store').findAll('song'),
      albums: this.get('store').findAll('album')
    });
  }
});
```

```html
<!-- app/templates/songs.hbs -->
<h1>Playlist</h1>

<ul>
  {{#each model.songs as |song|}}
    <li>{{song.name}} by {{song.artist}}</li>
  {{/each}}
</ul>

<h1>Albums</h1>

<ul>
  {{#each model.albums as |album|}}
    <li>{{album.title}} by {{album.artist}}</li>
  {{/each}}
</ul>
```

### 渲染模板

在默认情况下，route handler会渲染和它同名的模板：

```javascript
// app/router.js
Router.map(function() {
  this.route('posts', function() {
    this.route('new');
  });
});
```

`posts`路由渲染`posts.hbs`模板，而`posts.new`路由渲染`posts/new.hbs`模板。

每个模板都会在加载其对应的controller数据之后，作为父模板的`{{outlet}}`渲染。

如果你不想用默认的方式渲染一样名称的模板，则需要设置`templateName`属性：

```javascript
// app/routes/posts.js
import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'posts/favorite-posts'
});
```

### 重定向

在route内调用`transitionTo()`方法，或者在controller内调用`transitionToRoute()`方法，都会立即停止当前的渲染，并开始一个新的。

#### Transitioning Before the Model is Known

如果你想在路由中进行重定向，则可以在`beforeModel()`钩子中进行处理：

```javascript
// app/router.js
Router.map(function() {
  this.route('posts');
});
```

```javascript
// app/routes/index.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('posts');
  }
});
```

#### Transitioning After the Model is Known

如果你为了获取重定向相关的信息，而需要等待model载入的话，可以在`afterModel()`钩子里处理逻辑。

`afterModel()`方法将resolved的model作为第一个参数，将`transition`作为第二个参数：

```javascript
// app/router.js
Router.map(function() {
  this.route('posts');
  this.route('post', { path: '/post/:post_id' });
});
```

```javascript
// app/routes/posts.js
import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model, transition) {
    if (model.get('length') === 1) {
      this.transitionTo('post', model.get('firstObject'));
    }
  }
});
```

#### 子路由

修改下上面的路由关系，改成：

```javascript
// app/router.js
Router.map(function() {
  this.route('posts', function() {
    this.route('post', { path: ':post_id' });
  });
});
```

如果我们在`afterModel()`中重定向到了`posts.post`，那么会因为参数错误而再次发起重定向。

`redirect()`方法可以解决这个问题，它保证父route的钩子事件不会再次被调用：

```javascript
// app/routes/posts.js
import Ember from 'ember';

export default Ember.Route.extend({
  redirect(model, transition) {
    if (model.get('length') === 1) {
      this.transitionTo('posts.post', model.get('firstObject'));
    }
  }
});
```

### 阻止和重试路由跳转

- `transition.abort()`立即阻止路由跳转
- `transition.retry()`重试路由跳转

#### 通过`willTransition`阻止路由跳转

当Ember试图通过`{{lin-to}}`、`transitionTo`，或者URL变化来进行路由跳转时，会触发当前路由的`willTransition`行为，使得它可以决定是否继续进行路由改变的行为。

假设你有一个路由，渲染出一个表单。当用户填写表单的时候不小心后退了。除非我们阻止了用户的回退，否则他的填写都前功尽弃了：

```javascript
// app/routes/form.js
export default Ember.Route.extend({
  actions: {
    willTransition(transition) {
      if (this,controller.get('userHasEnteredData') &&
          !confirm('Are you sure you want to abandon progress?')) {
        transition.abort();
      } else {
        return true;
      }
    }
  }
});
```

当用户点击`{{link-to}}`，或者通过`transitionTo`方法改变路由的时候，利用上面的方法我们可以成功的阻止他的跳转。但是如果他使用了浏览器的后退键，调用`route:from`，或者人为的改变URL的时候，则会在`willTransition`方法调用之前就被定向到了新的URL。此时上面的方法无效。

#### 通过model内的`beforeModel`和`afterModel`方法阻止跳转

我们将要在[异步路由](https://guides.emberjs.com/v2.7.0/routing/asynchronous-routing)里说到的`beforeModel`和`afterModel`钩子，接收`transition`作为参数被调用。它会在目的路由的route-handler中被调用：

```javascript
// app/routes/disco.js
export default Ember.Route.extend({
  beforeModel(transition) {
    if (new Date() > new Date('January 1, 1980')) {
      alert('Sorry, you need a time mechine to enter this route');
      transition.abort();
    }
  }
});
```

#### 储存/重试路由转变

阻止了路由转变之后，可以在稍后进行重试。它的常用场景是一个需要用户认证的路由，把没有认证的用户重定向到了登录页面，等到用户登录完成之后再重新回到之前的路由：

```javascript
// app/routes/some-authonticated.js
export default Ember.Route.extend({
  beforeModel(transition) {
    if (!this.controllerFor('auth').get('userIsLoggedIn')) {
      var loginCOntroller = this.controllerFor('login');
      loginController.get('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
```

```javascript
// app/controllers/login.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login() {
      var previousTransitoin = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      } else {
        this.transitionToRoute('index');
      }
    }
  }
});
```

### Loading/Error状态

#### `loading`状态

##### 加载loading模板

route-handler在加载路由的时候，会因为各个方法而阻塞，直到所有的Promise全部完成。举个栗子：

```javascript
// app/router.js
Router.map(function() {
  this.route('slow-model');
});
```

```javascript
// app/routes/slow-model.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('slow-model');
  }
});
```

当你访问`slow-model`的时候，`model`需要很长的时候获取到需要的数据。在这段时间里，如果什么也不做的话，在UI上就没有任何变化，直至数据加载完成，然后页面突然呈现。这太糟糕了。我们该如何避免？

定义一个叫做`loading`或者类似名称的模板，并且将路由设计成嵌套的形式：

```javascript
// app/router.js
Router.map(function() {
  this.route('foo', function() {
    this.route('bar', function() {
      this.route('slow-model');
    });
  });
});
```

当试图加载`foo.bar.slow-model`路由的时候，Ember会试着不断获取`routeName-loading`或者上层的loading模板：

- `foo.bar.slow-model-loading`
- `foo.bar.loading`或者`foo.bar-loading`
- `foo.loading`或者`foo-loading`
- `loading`或者`application-loading`

要注意的是，Ember不会寻找`slow-model.loading`模板

而当路由指向`foo.bar`的时候，Ember会寻找：

- `foo.bar-loading`
- `foo.loading`或者`foo-loading`
- `loading`或者`application-loading`

在这个情况下，Ember不再寻找`foo.bar.loading`模板

##### loading事件

如果`beforeModel`/`model`/`afterModel`方法没有立刻返回，`loading`方法就会自动调用：

```javascript
// app/routes/foo-slow-model.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('slow-model');
  },
  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('foo');
      controller.set('currentlyLoading', true);
    }
  }
});
```

如果在当前的route-handler里没有定义`loading`方法，那么它会继续向上冒泡，寻找父路由的`loading`方法。

当使用`loading`方法的时候，我们可以通过`transition`的`promise`来确定什么时候loading完毕：

```javascript
// app/routes/foo-slow-model.js

import Ember from 'ember';

export default Ember.Route.extend({
  // ...
  actions: {
    loading(transition, originRoute) {
      let controller = this.controllerFor('foo');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    }
  }
});
```

#### `error`状态

##### error模板

通过抛出一个错误，或者promise返回reject，都可以出发error状态。例如如下路由：

```javascript
// app/router.js
Route.map(function() {
  this.route('articles', function() {
    this.route('overview');
  });
});
```

当抛出错误的时候，会类似于loading机制一样寻找error模板：

- `articles.overview-error`
- `articles.error`或者`articles-error`
- `error`或者`application-error`

##### error事件

当触发error状态的时候，`error`方法会被调用：

```javascript
// app/routes/articles-overview.js
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findAll('problematic-model');
  },
  actions: {
    error(error, transition) {
      if (error) {
        return this.transitionTo('error-page');
      }
    }
  }
});
```

类似于`loading`事件，你可以让`error`事件的处理向上传递，来避免写重复的代码。

### URL参数

#### 特定的URL参数

特定的参数必须定义在route对应的controller里。例如，为了获取`articles`理由里的URL参数，必须在`controller:articles`里声明：

```javascript
// app/controllers/articles.js
import Ember from 'ember';

export default Ember.Controller.extend({
  // 定义category参数
  queryParams: ['category'],
  category: null
});
```

因此，在`articles`路由加载好之后，任何`category`参数的变化都会被监听，我们也就可以以此来更新数据：

```javascript
// app/controllers/articles.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['category'],
  category: null,

  filteredArticles: Ember.computed('category', 'model', function() {
    var category = this.get('category');
    var articles = this.get('model');

    if (category) {
      return articles.filterBy('category', category);
    } else {
      return articles;
    }
  })
});
```

#### 通过`link-to`helper给URL带上参数

```html
<!-- 设置一个特定的参数 -->
{{#link-to "posts" (query-params direction="asc")}}Sort{{/link-to}}

<!-- 或者绑定一个变量 -->
{{#link-to "posts" (query-params direction=otherDirection)}}Sort{{/link-to}}
```

#### 通过`transitionTo`加参数

`Router#transitionTo`和`Controller#transitionToRoute`都可以接受一个参数，且该参数要有`queryParams`键值对：

```javascript
// app/routes/some-route.js
this.transitionTo('post', object, { queryParams: { showDetails: true }});
this.transitionTo('posts', { queryParams: { sort: 'title' }});

// if you want to transition the query parameters without changing the route
this.transitionTo({ queryParams: { direction: 'asc' }});
```

也可以直接把带有参数的URL传递给`transitionTo`方法：

```javascript
this.transitionTo('/posts/1?sort=date&showDetails=true');
```

#### Opting into a full transition

由`transitionTo`或者`link-to`提供的参数，只会让Ember相应其参数的变化，使得在改变参数的时候不会有数据查询结果的变化，而不会再调用`model`或者`setupController`方法。如果我们想强制性刷新页面，确保方法的再次调用，则需要在`controller`对应的路由中配置`queryParams`对象，在某个特定参数下添加`refreshModel`字段并设置为`true`：

```javascript
// app/routes/articles.js
import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    category: {
      // 当category参数改变时会强制刷新model
      refreshModel: true
    }
  },
  model(params) {
    // This gets called upon entering 'articles' route
    // for the first time, and we opt into refiring it upon
    // query param changes by setting `refreshModel:true` above.

    // params has format of { category: "someValueOrJustNull" },
    // which we can forward to the server.
    return this.get('store').query('article', params);
  }
});
```

```javascript
// app/controllers/articles.js

import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['category'],
  category: null
});
```

#### 使用`replaceState`更新路由

在默认情况下，Ember使用`pushState`来跟新URL。如果你乐意也可以使用`replaceState`更新URL：

```javascript
// app/routes/articles.js
import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    category: {
      replace: true
    }
  }
});
```

设置了`replace`的路由，在点击时，会在浏览器历史记录里，以点击的链接来替代当前页面的链接。

它的效果和`{{#link-to}}`helper里设置了`replace=true`一样。

#### 参数名映射

在默认情况下，URL中的传入的参数和我们之前定义的参数名一一映射。例如，在`queryParams`中定义了一个名为`foo`的参数，所以在URL里含有例如`?foo=1`时，就能拿到参数对应的值了。但我们也可以手动改变参数名的一一对应关系，设置别名：

```javascript
// app/controllers/articles.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    category: 'articles_category'
  },
  category: null
});
```

在这之后，URL中传入`articles_category`参数，会作为controller中的`category`变量。

如果我们有多个参数：

```javascript
// app/controllers/articles.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'filter', {
    category: 'articles_category'
  }],
  category: null,
  page: 1,
  filter: 'recent'
});
```

#### 默认值和反序列化

例如下面的例子，`page`参数被设置为默认是1：

```javascript
// app/controllers/articles.js
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: 'page',
  page: 1
});
```

- 查询到的page的值会根据默认值的类型进行转化。因为定义了默认值为1，所以之后查询到的所有值都会被转化为int类型
- 当参数为`?page=1`的时候，路由会被转化为`/articles`，为2时则是`/articles?page=2`，依次类推

#### [粘性参数](https://guides.emberjs.com/v2.7.0/routing/query-params/#toc_sticky-query-param-values)

默认情况下，在Ember中查询参数是粘性的，即当你改变了查询参数，或者是离开页面之后又退回来，参数会默认在URL上，而不会自动清除

### [异步路由](https://guides.emberjs.com/v2.7.0/routing/asynchronous-routing/)