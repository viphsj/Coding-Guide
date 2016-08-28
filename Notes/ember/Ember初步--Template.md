## Ember初步--Template

Ember使用[Handlebars](http://www.handlebarsjs.com/)作为模板引擎，并使用`{{}}`的方式来渲染变量。

除此以外，我们可以自己写helper方法，作为在模板内调用的调用的方法：

```javascript
// app/helpers/sum.js
import Ember from 'ember';

export function sum(params) {
  return params.reduce((a, b) => {
    return a + b;
  });
};

export default Ember.Helper.helper(sum);
```

usage:

```html
<p>Total: {{sum 1 2 3}}</p>
```

### 内建的helper方法

#### `get`方法

`get`方法可用于获取key对应的value：

```html
{{get address city}}
<!-- 等价于 this.get('address.city') -->
```

#### `concat`方法

`concat`方法用于合并字符串

```html
{{concat "item" 1}} 
<!-- result is "item1" -->

{{get "foo" (concat "item" index)}}
<!-- 当index为1时，上式等价于 -->
<!-- this.get("foo.item1") -->
```

### 条件语句

#### if

```html
{{if isTrue 'true' 'false'}}
<!-- 当isTrue为true的时候返回'true'，否则返回'false' -->

<div class="foo {{if isActive "active" "disabled"}}">
</div>

<div>
    {{if isTrue (if isActive "isActive")}}
</div>
```

```html
{{#if isTrue}}
    <div>isTrue</div>
{{/if}}

{{#if isTrue}}
    <div>isTrye</div>
{{else if isActive}}
    <div>isActive</div>
{{else}}
    <div>isDisabled</div>
{{/if}}
```

#### unless

```html
{{#unless isFalse}}
    <div>isTrue</div>
{{/unless}}
```

### 列表

假设route-handler返回了一个列表：

```javascript
// app/routes/list.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
        {name: 'ecmadao', age: 1},
        {name: 'ws', age: 2}
    ]
  }
});
```

```html
<!-- app/template/list.hbs -->
<li>
    {{#each model as |peopel index|}}
        <li>
            name: {{people.name}},
            age: {{people.age}},
            index: {{index}}
        </li>
    {{/each}}
</li>
```

`{{#each}}`helper还有`{{else}}`语句。当Array为空时会被触发：

```html
{{#each model as |people|}}
    Hello, {{people.name}}
{{else}}
    Nobody here
{{/each}}
```

### 显示对象的键

可以使用`{{#each-in}}`来显示对象的键：

```javascript
// app/components/store-categories.js
import Ember from 'ember';

export default Ember.Component.extend({
  willRender() {
    this.set('categories', {
      'Bourbons': ['Bulleit', 'Four Roses', 'Woodford Reserve'],
      'Ryes': ['WhistlePig', 'High West']
    });
  }
});
```

```html
<!-- /app/templates/components/store-categories.hbs
 -->
<ul>
  {{#each-in categories as |category products|}}
    <li>{{category}}
      <ol>
        {{#each products as |product|}}
          <li>{{product}}</li>
        {{/each}}
      </ol>
    </li>
  {{/each-in}}
</ul>
```

output:

```html
<ul>
  <li>Bourbons
    <ol>
      <li>Bulleit</li>
      <li>Four Roses</li>
      <li>Woodford Reserve</li>
    </ol>
  </li>
  <li>Ryes
    <ol>
      <li>WhistlePig</li>
      <li>High West</li>
    </ol>
  </li>
</ul>
```

#### 重新渲染

但是`{{#each-in}}`并不会监听到数据的变化。也就是说在上面的`categories`里增加数据的时候，模板不会自动的重新渲染更新：

```javascript
// app/components/store-categories.js
import Ember from 'ember';

export default Ember.Component.extend({
  willRender() {
    this.set('categories', {
      'Bourbons': ['Bulleit', 'Four Roses', 'Woodford Reserve'],
      'Ryes': ['WhistlePig', 'High West']
    });
  },

  actions: {
    addCategory(category) {
      // This won't work!
      let categories = this.get('categories');
      categories[category] = [];
    }
  }
});
```

为了能够让数据监听正常工作，需要手动在数据更改之后调用`rerender()`方法：

```javascript
// /app/components/store-categories.js
import Ember from 'ember';

export default Ember.Component.extend({
  willRender() {
    this.set('categories', {
      'Bourbons': ['Bulleit', 'Four Roses', 'Woodford Reserve'],
      'Ryes': ['WhistlePig', 'High West']
    });
  },

  actions: {
    addCategory(category) {
      let categories = this.get('categories');
      categories[category] = [];

      // A manual re-render causes the DOM to be updated
      this.rerender();
    }
  }
});
```

#### 序列

获取的key的顺序和Object中key的顺序一致。

#### 空列表

`{{#each-in}}`也支持`{{else}}`来应对空列表的状态：

```html
{{#each-in people as |name person|}}
  Hello, {{name}}! You are {{person.age}} years old.
{{else}}
  Sorry, nobody is here.
{{/each-in}}
```

### 绑定元素属性

```html
<div id="logo">
  <img src={{logoUrl}} alt="Logo">
</div>

<input type="checkbox" disabled={{isAdministrator}}>
```

但是默认情况下Ember不会绑定形如`data-xxx`的属性：

```html
{{#link-to "photos" data-toggle="dropdown"}}Photos{{/link-to}}

{{input type="text" data-toggle="tooltip" data-placement="bottom" title="Name"}}
```

只能渲染为：

```html
<a id="ember239" class="ember-view" href="#/photos">Photos</a>

<input id="ember257" class="ember-view ember-text-field" type="text"
       title="Name">
```

为了能够绑定`data-xxx`属性，需要手动在view文件中设置：

```bash
$ ember generate view binding-element-attributes
```

```javascript
// app/view/binding-element-attributes.js
import Ember from 'ember';

export default Ember.View.extend({  
});

Ember.TextField.reopen({  
    attributeBindings: ['data-toggle', 'data-placement']
});

Ember.LinkComponent.reopen({  
    attributeBindings: ['data-toggle']
});
```

### Link

`{{link-to}}`helper方法

#### 带有变量的`link-to`

看下例子感受感受学习一下：

```javascript
// app/router.js
Router.map(function() {
  this.route('photos', function(){
    this.route('edit', { path: '/:photo_id' });
  });
});
```

```html
<!-- app/templates/photos.hbs -->
<ul>
  {{#each photos as |photo|}}
    <li>{{#link-to "photos.edit" photo}}{{photo.title}}{{/link-to}}</li>
  {{/each}}
</ul>
```

```html
<!-- output -->
<ul>
  <li><a href="/photos/1">Happy Kittens</a></li>
  <li><a href="/photos/2">Puppy Running</a></li>
  <li><a href="/photos/3">Mountain Landscape</a></li>
</ul>
```

并且，当当前的URL和某一个link匹配时，会自动给`<a>`标签加上`active`方法：

```html
<!-- 当前在/photos/2页面 -->
<ul>
  <li><a href="/photos/1">Happy Kittens</a></li>
  <li><a href="/photos/2" class="active">Puppy Running</a></li>
  <li><a href="/photos/3">Mountain Landscape</a></li>
</ul>
```

#### 给link设置查询参数

```html
{{#link-to "posts" (query-params direction="asc")}}Sort{{/link-to}}

{{#link-to "posts" (query-params direction=otherDirection)}}Sort{{/link-to}}
```

#### replace history entries

`{{link-to}}`的默认行为会给浏览器的历史新增一个路由入口。也就是说，当用户点击link的时候，浏览器的历史里会增加他刚刚点击的这个链接。而通过设置`replace=true`，则用户点击链接的时候，该链接会替代浏览器当前所处的历史记录，而不是新增进去。

```html
<!-- /index.html -->
{{#link-to "/about" replace=true}}about{{/link-to}}
```

假设在index页面，浏览器的历史记录是：

[..., A.html, index.html]

若点击正常的about，则历史记录变成：

[..., A.html, index.html, about.html]

但设置了`replace=true`，则在点击之后历史记录为：

[..., A.html, about.html]