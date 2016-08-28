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

### Action Helper

当你给任意HTML DOM元素添加`{{action}}`helper的时候，都会触发通过action绑定在DOM上的事件，而那个事件是由template对应的component或者controller所提供：

```html
<!-- app/templates/components/single-post.hbs -->
<h3><button {{action "toggleBody"}}>{{title}}</button></h3>
{{#if isShowingBody}}
  <p>{{{body}}}</p>
{{/if}}
```

```javascript
// app/components/single-post.js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleBody() {
      this.toggleProperty('isShowingBody');
    }
  }
});
```

#### action的参数

如果action需要接收参数，则调用方法为`{{action actionName params}}`：

```html
<p><button {{action "select" post}}>✓</button> {{post.title}}</p>
```

```javascript
// app/components/single-post.js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    select(post) {
      console.log(post.get('title'));
    }
  }
});
```

#### 由特定的事件触发action

在默认情况下，点击事件会触发action。但可以通过设置`on="XXX"`来指定事件的触发：

```html
<!-- 只有mouse up的时候才会触发事件 -->
<p>
  <button {{action "select" post on="mouseUp"}}>✓</button>
  {{post.title}}
</p>
```

#### 由特定按键触发事件

可以通过`allowedKey`来指定触发事件啊按键：

```html
<!-- 只有alt才能触发 -->
<button {{action "anActionName" allowedKeys="alt"}}>
  click me
</button>
```

#### 处理浏览器默认行为

在默认情况下。action会阻止浏览器的默认行为，即起到`e.preventDafault`的作用。如果不想阻止默认行为，则要手动添加`preventDefault=false`：

```html
<a href="newPage.htm" {{action "logClick" preventDefault=false}}>Go</a>
```

即：

- 当没有`preventDefault=false`的时候，点击链接会触发action事件，而不会导航到新的链接
- 当存在`preventDefault=false`的时候，点击链接则正常导航到新链接

#### 单向数据绑定

```html
<label>What's your favorite band?</label>
<input type="text" value={{favoriteBand}} onblur={{action "bandDidChange" value="target.value"}} />
```

```javascript
actions: {
  bandDidChange(newValue) {
    console.log(newValue);
  }
}
```

### [Input Helper](https://guides.emberjs.com/v2.7.0/templates/input-helpers/)

`{{input}}`和`{{textarea}}`两个方法是Ember提供的便捷helper。`{{input}}`封装了`Ember.TextField`和`Ember.Checkbox`，而`{{textarea}}`方法则是封装了`Ember.TextArea`

关于他们的具体使用可戳标题链接或者[这里](https://guides.emberjs.com/v2.7.0/templates/input-helpers/)

### Development Helper

#### log

```html
{{log XXXX}}
```

效果相当于`console.log()`

#### debug

```html
{{debugger}}
```

### 写自己的helper

通过建立自己的helper，我们可以在template里便捷的引用并获得想要的结果。

> helper 接受Array作为参数

例如，创建一个格式化金额显示的helper

```bahs
$ ember g helper format-currency
```

```javascript
// app/helpers/format-currency.js
import Ember from 'ember';

export function formatCurrency([value, ...rest]) {
  let dollars = Math.floor(value / 100);
  let cents = value % 100;
  let sign = '$';

  if (cents.toString().length === 1) { cents = '0' + cents; }
  return `${sign}${dollars}.${cents}`;
}

export default Ember.Helper.helper(formatCurrency);
```

usage:

```html
<span>total cost: {{format-currency 250}}</span>

<!-- output -->
<span>total cost: $2.50</span>
```

#### helper命名

component的名称要求多个单词组成，单词中间带有`-`，而helper则没有命名限制，一个或多个单词都可以。但多个单词间要以`-`链接

#### helper的参数

在template中，你可以给helper传递一个或多个参数。因此helper方法本身接受一个Array作为参数：

```html
{{my-helper "hello" "world"}}
```

```javascript
// app/helpers/my-helper.js
import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let [arg1, arg2] = params;

  console.log(arg1); // => "hello"
  console.log(arg2); // => "world"
});
```

#### 命名参数

helper可以指定参数的名称，因此在调用的时候可以打乱参数顺序：

> 命名参数全部合在一起作为一个Object传给helper方法

```javascript
// app/helpers/format-currency.js
import Ember from 'ember';

export default Ember.Helper.helper(function([value, ...rest], namedArgs) {
    let dollars = Math.floor(value / 100);
    let cents = value % 100;
    let sign = namedArgs.sign === undefined ? '$' : namedArgs.signp;

    if (cents.toString().length === 1) { cents = '0' + cents; }
    return `${sign}${dollars}.${cents}`;
});
```

```html
{{format-currency 350 sign="￥"}}
<!-- output -->
￥3.5
```

注意，命名参数在helper内，是作为一个整体的Object：

```html
{{my-helper option1="hello" option2="world" option3="goodbye cruel world"}}
```

```javascript
// app/helpers/my-helper.js
import Ember from 'ember';

export default Ember.Helper.helper(function(params, namedArgs) {
  console.log(namedArgs.option1); // => "hello"
  console.log(namedArgs.option2); // => "world"
  console.log(namedArgs.option3); // => "goodbye cruel world"
});
```

或者你也可以这样：

```javascript
// app/helpers/my-helper.j
import Ember from 'ember';

export default Ember.Helper.helper(function(params, { option1, option2, option3 }) {
  console.log(option1); // => "hello"
  console.log(option2); // => "world"
  console.log(option3); // => "goodbye cruel world"
});
```

### 过滤helper里返回的HTML

来创建一个生成`<b>`标签的helper：

```javascript
// app/helpers/make-bold.js
import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
    return `<b>${param}</b>`;
});
```

然后调用它：

```html
{{make-bold "Hello World"}}
```

结果

```html
&lt;b&gt;Hello World&lt;/b&gt;
```

这是因为Ember禁止直接从方法里返回并插入一段HTML代码，以防止跨域的脚本攻击。想要成功的插入HTML，需要使用Ember的`htmlSafe`方法，将其转化为安全的形式：

```javascript
// app/helpers/make-bold.js
import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
  return Ember.String.htmlSafe(`<b>${param}</b>`);
});
```

但需要重视的是，即便我们是通过`htmlSafe`返回了`SafeString`，也有可能受到XSS攻击。比如，一段聊天室的代码是这样的：

```html
Welcome back! {{make-bold model.firstName}} has joined the channel.
```

此时，一个恶意的用户或许可以把他的`firstName`写成是一段以`<script>`包含的代码，被我们的方法调用之后，就相当于往DOM里插入了一段JS。所以说，不建议通过这种形式在HTML里面插入DOM，如果想做，可以通过component来完成。

但如果你真的真的非常想还是使用这样的方式插入DOM的话，则要确保自己已经将那些不可信的内容过滤过：

```javascript
// app/helpers/make-bold.js
import Ember from 'ember';

export default Ember.Helper.helper(function([param, ...rest]) {
  let value = Ember.Handlebars.Utils.escapeExpression(param);
  return Ember.String.htmlSafe(`<b>${value}</b>`);
});
```

现在在把一段被`<script>`标签包裹的代码代入进去，会发现`<script>`被过滤掉了：

```html
Welcome back! <b>&lt;script
type="javascript"&gt;alert('pwned!');&lt;/script&gt;</b> has joined the channel.
```
