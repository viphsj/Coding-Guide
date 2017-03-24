<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ember初步--Component](#ember%E5%88%9D%E6%AD%A5--component)
  - [定义一个Component](#%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AAcomponent)
    - [新建component](#%E6%96%B0%E5%BB%BAcomponent)
    - [定义component类](#%E5%AE%9A%E4%B9%89component%E7%B1%BB)
  - [component的生命周期](#component%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
    - [生命周期回调函数的调用顺序](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E7%9A%84%E8%B0%83%E7%94%A8%E9%A1%BA%E5%BA%8F)
    - [Examples](#examples)
      - [当组件的属性被改变时会触发`didUpdateAttrs`方法](#%E5%BD%93%E7%BB%84%E4%BB%B6%E7%9A%84%E5%B1%9E%E6%80%A7%E8%A2%AB%E6%94%B9%E5%8F%98%E6%97%B6%E4%BC%9A%E8%A7%A6%E5%8F%91didupdateattrs%E6%96%B9%E6%B3%95)
      - [通过`didReceiveAttrs`来统一属性的格式](#%E9%80%9A%E8%BF%87didreceiveattrs%E6%9D%A5%E7%BB%9F%E4%B8%80%E5%B1%9E%E6%80%A7%E7%9A%84%E6%A0%BC%E5%BC%8F)
      - [通过`didInsertElement`融入第三方组件](#%E9%80%9A%E8%BF%87didinsertelement%E8%9E%8D%E5%85%A5%E7%AC%AC%E4%B8%89%E6%96%B9%E7%BB%84%E4%BB%B6)
      - [更新DOM之后触发`didRender`](#%E6%9B%B4%E6%96%B0dom%E4%B9%8B%E5%90%8E%E8%A7%A6%E5%8F%91didrender)
      - [在`willDestroyElement`中卸载组件](#%E5%9C%A8willdestroyelement%E4%B8%AD%E5%8D%B8%E8%BD%BD%E7%BB%84%E4%BB%B6)
  - [给组件传递属性](#%E7%BB%99%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E5%B1%9E%E6%80%A7)
    - [组件的位置参数](#%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%8D%E7%BD%AE%E5%8F%82%E6%95%B0)
  - [拿组件来包裹DOM（给组件传入DOM）](#%E6%8B%BF%E7%BB%84%E4%BB%B6%E6%9D%A5%E5%8C%85%E8%A3%B9dom%E7%BB%99%E7%BB%84%E4%BB%B6%E4%BC%A0%E5%85%A5dom)
  - [自定义包裹组件的HTML标签](#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8C%85%E8%A3%B9%E7%BB%84%E4%BB%B6%E7%9A%84html%E6%A0%87%E7%AD%BE)
    - [定义包裹组件的标签](#%E5%AE%9A%E4%B9%89%E5%8C%85%E8%A3%B9%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%87%E7%AD%BE)
    - [定义包裹组件的标签的类名](#%E5%AE%9A%E4%B9%89%E5%8C%85%E8%A3%B9%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%87%E7%AD%BE%E7%9A%84%E7%B1%BB%E5%90%8D)
    - [自定义绑定包裹标签的其他属性](#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%91%E5%AE%9A%E5%8C%85%E8%A3%B9%E6%A0%87%E7%AD%BE%E7%9A%84%E5%85%B6%E4%BB%96%E5%B1%9E%E6%80%A7)
  - [使用块参数](#%E4%BD%BF%E7%94%A8%E5%9D%97%E5%8F%82%E6%95%B0)
  - [处理事件](#%E5%A4%84%E7%90%86%E4%BA%8B%E4%BB%B6)
    - [组件处理内部事件](#%E7%BB%84%E4%BB%B6%E5%A4%84%E7%90%86%E5%86%85%E9%83%A8%E4%BA%8B%E4%BB%B6)
    - [组件与外部的事件传递](#%E7%BB%84%E4%BB%B6%E4%B8%8E%E5%A4%96%E9%83%A8%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92)
    - [事件名称](#%E4%BA%8B%E4%BB%B6%E5%90%8D%E7%A7%B0)
  - [事件触发](#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91)
    - [创建组件](#%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6)
    - [父组件的action](#%E7%88%B6%E7%BB%84%E4%BB%B6%E7%9A%84action)
    - [设计子组件的action](#%E8%AE%BE%E8%AE%A1%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84action)
    - [组件的事件传递](#%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92)
    - [异步事件](#%E5%BC%82%E6%AD%A5%E4%BA%8B%E4%BB%B6)
    - [事件传递参数](#%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92%E5%8F%82%E6%95%B0)
    - [在层层嵌套的组件中传递事件](#%E5%9C%A8%E5%B1%82%E5%B1%82%E5%B5%8C%E5%A5%97%E7%9A%84%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BC%A0%E9%80%92%E4%BA%8B%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ember初步--Component

### 定义一个Component

#### 新建component

```bash
$ ember g component my-component-name
```

component名称里至少要有一个`-`，因此`blog-post`或者`my-blog-component`都是ok的，但是`blog`不行。

一个简单的component可能长这样：

```html
<!-- app/templates/components/blog-post.hbs -->
<article class="blog-post">
  <h1>{{title}}</h1>
  <p>{{yield}}</p>
  <p>Edit title: {{input type="text" value=title}}</p>
</article>
```

我们可以在模板里引用组件：

```html
<!-- app/templates/index.hbs -->
{{#each model as |post|}}
  {{#blog-post title=post.title}}
    {{post.body}}
  {{/blog-post}}
{{/each}}
```

在默认情况下，引用的component在渲染的时候被`<div>`所包裹。

而数据来源自模板对应的route-handler：

```javascript
// app/routes/index.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('post');
  }
});
```

#### 定义component类

当component需要自己的逻辑的时候，可以在`app/components/`里添加一个和component同名的js文件，来处理component里的逻辑。

```javascript
// app/components/my-component.js
import Ember from 'ember';

export default Ember.Component.extend({
});
```

### component的生命周期

 当component被render/re-render/remove的时候，Ember都提供了对应生成周期的回调函数。

 #### 生命周期回调函数的调用顺序

 1. Initial

- init
- didReceiveAttrs
- willRender
- didInsertElement
- didRender

2. Re-Render

- didUpdateAttrs
- didReceiveAttrs
- willUpdate
- willRender
- didUpdate
- didRender

3. Component Destroy

- willDestroyElement
- willClearRender
- didDestroyElement

#### Examples

##### 当组件的属性被改变时会触发`didUpdateAttrs`方法

`didUpdateAttrs`方法会在属性改变之后，Re-Render之前触发

```html
<!-- /app/templates/components/profile-editor.hbs -->
<ul class="errors">
  {{#each errors as |error|}}
    <li>{{error.message}}</li>
  {{/each}}
</ul>
<fieldset>
  {{input name="user.name" value=name change=(action "required")}}
  {{input name="user.department" value=department change=(action "required")}}
  {{input name="user.email" value=email change=(action "required")}}
</fieldset>
```

```javascript
// /app/components/profile-editor.js
import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.errors = [];
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('errors', []);
  },

  actions: {
    required(event) {
      if (!event.target.value) {
        this.get('errors').pushObject({ message: `${event.target.name} is required`});
      }
    }
  }
});
```

##### 通过`didReceiveAttrs`来统一属性的格式

`didReceiveAttrs`在`init`调用之后被调用，而且在之后的Re-Render以后也会被调用。可以借此在接受到参数之后来统一他们的格式。

例如，某个component可能接受string或者json作为参数，你可以在`didReceiveAttrs`里把他们统一成为json的格式：

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    const profile = this.get('data');
    if (typeof profile === 'string') {
      this.set('profile', JSON.parse(profile));
    } else {
      this.set('profile', profile);
    }
  }
});
```

##### 通过`didInsertElement`融入第三方组件

假设你想把一个第三方日期选择插件运用在你的Ember项目里。通常来说，这种第三方组件需要绑定一个DOM。那么什么时候是调用第三方组件的最佳时机呢？

当组件成功的渲染了HTML元素之后，就会触发`didInsertElement`回调。有两种情况：

1. 组件的元素都生成完毕并插入到了DOM里
2. 组件的元素可以通过`$()`方法被取到

组件的`$()`方法返回jQuery对象，以此来拿到组件的DOM元素，并且对它进行操作：

```javascript
didInsertElement() {
    this._super(...arguments);
    this.$().attr('contenteditable', true);
}
```

`$()`会返回组件的根元素。还可以设定目标元素，跟jQuery中一样：

```javascript
didInsertElement() {
    this._super(...arguments);
    this.$('div p button').addClass('enabled');
}
```

回到例子。日期选择器通常要绑定在`<input>`元素上，因此可以：

```javascript
didInsertElement() {
    this._super(...arguments);
    this.$('input.date').initialDatePicker();
}
```

`didInsertElement`也是个进行事件监听的好地方：

```javascript
didInsertElement() {
    this._super(...arguments);
    this.$().on('animationend', () => {
        $(this).removeClass('.sliding-anim');
    });
}
```

除此以外，关于`didInsertElement`你还需要知道：

- 它只在组件渲染之后调用一次
- 子组件总会在父组件调用该方法之前，调用`didInsertElement`
- 不要在`didInsertElement`里设置组件的属性，会导致re-render

##### 更新DOM之后触发`didRender`

在render和re-render之后都会触发`didRender`方法，你可以在这里对更新过后的DOM进行操作。

例如，有一个组件组成的列表，需要你在渲染完成之后滚动到某一个被选择的组件处。因此我们就要确认在触发滚动事件之前，所有的组件已经渲染完毕。

```html
{{selected-item-list items=items selectedItem=selection}}
```

```html
<!-- /app/templates/components/selected-item-list.hbs -->
{{#each items as |item|}}
  <div class="list-item {{if item.isSelected 'selected-item'}}">{{item.label}}</div>
{{/each}}
```

```javascript
// /app/components/selected-item-list.js
import Ember from 'ember';

export default Ember.Component.extend({
  className: 'item-list',

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('items', this.get('items').map((item) => {
      if (item.id === this.get('selectedItem.id')) {
        item.isSelected = true;
      }
      return item;
    }));
  },

  didRender() {
    this._super(...arguments);
    this.$('.item-list').scrollTop(this.$('.selected-item').position.top);
  }
});
```

##### 在`willDestroyElement`中卸载组件

当一个组件不再被渲染时，会触发`willDestroyElement`事件，例如：

```html
<!-- 当falseBool是false的时候卸载组件 -->
{{#if falseBool}}
  {{my-component}}
{{/if}}
```

我们可以在这个方法里进行清理工作：

```javascript
willDestroyElement() {
  this._super(...arguments);
  this.$().off('animationend');
  this.$('input.date').myDatepickerLib().destroy();
}
```

### 给组件传递属性

组件和他周围的环境所孤立，因此组件需要的属性要从外部传入

例如，有一个`blog-post`组件来展现blog：

```html
<!-- app/templates/components/blog-post.hbs -->
<article class="blog-post">
  <h1>{{title}}</h1>
  <p>{{body}}</p>
</article>
```

假设我们有如下的模板和route：

```javascript
// app/routes/index.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('post');
  }
});
```

在模板里这样使用组件：

```html
<!-- app/templates/index.hbs -->
{{#each model as |post|}}
  {{blog-post title=post.title body=post.body}}
{{/each}}
```

就能够正确的渲染组件：

```html
<article class="blog-post">
  <h1>XX</h1>
  <p>XXXX</p>
</article>
```

当传入的属性更新时，组件DOM也会跟着更新。

#### 组件的位置参数

上面的例子`{{blog-post title=post.title body=post.body}}`展示了组件的命名参数：传入的都是键值对。除此以外，还有组件的位置参数，需要按照顺序传入组件：

```html
<!-- app/templates/index.hbs -->
{{#each model as |post|}}
  {{blog-post post.title post.body}}
{{/each}}
```

但只是这样还不行，还需要在组件的class中处理`positionalParams`：

```javascript
// app/components/blog-post.js
import Ember from 'ember';

const BlogPostComponent = Ember.Component.extend({});

BlogPostComponent.reopenClass({
  // 按照参数传入的顺序组成列表
  positionalParams: ['title', 'body']
});

export default BlogPostComponent;
```

之后就能想传入命名参数一样正常渲染。

在不知道传入参数多少的情况下，还可以把`positionalParams`设置成为string，例如：`positionalParams: 'params'`，然后像下面这样使用它：

```javascript
<!-- app/components/blog-post.js -->
import Ember from 'ember';

const BlogPostComponent = Ember.Component.extend({
  title: Ember.computed('params.[]', function(){
    return this.get('params')[0];
  }),
  body: Ember.computed('params.[]', function(){
    return this.get('params')[1];
  })
});

BlogPostComponent.reopenClass({
  positionalParams: 'params'
});

export default BlogPostComponent;
```

### 拿组件来包裹DOM（给组件传入DOM）

通常情况下，想这样`{{blog-post title=title body=body}}`的调用，我们只能给组件传入正常的值。但是如果想要用组件包裹其他DOM元素，即把DOM元素作为参数传入的时候，需要使用`{{yield}}`关键字：

```html
<!-- app/templates/components/blog-post.hbs -->
<h1>{{title}}</h1>
<div class="body">{{yield}}</div>
```

然后把组件的调用改为：

```html
<!-- app/templates/index.hbs -->
{{#blog-post title=title}}
  <p class="author">by {{author}}</p>
  {{body}}
{{/blog-post}}
```

需要说明的是，这种方式传入组件后，组件内的作用域和外面相同。也就是说，如果一个属性（例如author）在组件外可以被拿到，那么它在组件内也是如此。

### 自定义包裹组件的HTML标签

在默认情况下，渲染的组件会被`<div>`标签所包裹。如果有需要我们可以自定义它的包裹标签。

#### 定义包裹组件的标签

```javascript
// app/components/navigation-bar.js
import Ember from 'ember';

export default Ember.Component.extend({
  // 使用<nav>标签来包裹
  tagName: 'nav'
});
```

#### 定义包裹组件的标签的类名

```javascript
// app/components/navigation-bar.js
import Ember from 'ember';

export default Ember.Component.extend({
  // 会使用<nav class="primary">来包裹
  tagName: 'nav',
  classNames: ['primary']
});
```

- 如果你希望包裹组件的标签的class名称可以收到组件属性的控制，则要通过`classNameBindings`：

```javascript
// app/components/todo-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isUrgent'],
  isUrgent: true
});
```

在默认情况下`isUrgent`为true，渲染出来的组建为：

```html
<div class="ember-view is-urgent"></div>
```

而当`isUrgent`为false的时候则不会有`is-urgent`类名。

- 还可以把属性名和class名做成一个对应关系：

```javascript
// app/components/todo-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isUrgent:urgent'],
  isUrgent: true
});
```

这样的话会渲染：

```html
<div class="ember-view urgent">
```

- 还可以有一个表达式

```javascript
// app/components/todo-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isEnabled:enabled:disabled'],
  isEnabled: false
});
```

当`isEnabled`为true的时候使用class名`enabled`，否则使用`disabled`

```html
<!-- 上面的代码在默认情况下渲染出 -->
<div class="ember-view disabled"></div>
```

- 也可以在指定条件不满足的情况下使用指定的class名：

```javascript
// app/components/todo-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  // 在不是isEnabled的时候使用class名disabled
  classNameBindings: ['isEnabled::disabled'],
  isEnabled: false
});
```

这会渲染出：

```html
<div class="ember-view disabled">
<!-- 当isEnabled为true时则是 -->
<div class="ember-view">
```

- 如果组件的属性为String，则会直接把这个属性对应的值作为class渲染

```javascript
// app/components/todo-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['priority'],
  priority: 'highestPriority'
});
```

```html
<div class="ember-view highestPriority">
```

#### 自定义绑定包裹标签的其他属性

上面说了在组件的js里，根据组件的属性来绑定组件的class。然后再来了解一下绑定元素的其他属性。

使用`attributeBindings`来指定绑定的其他属性：

绑定`<a>`标签的href:

```javascript
// app/components/link-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  href: 'http://emberjs.com'
});
```

或者可以这样：

```javascript
// app/components/link-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['customHref:href'],
  customHref: 'http://emberjs.com'
});
```

当属性为`null`的时候，则不会被render出来：

```javascript
// app/components/link-item.js
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  title: null,
  attributeBindings: ['title'],
});
```

这时会渲染：

```html
<span class="ember-view">
```

而如果把title赋值为，例如`Ember JS`，则渲染出来的是：

```html
<span class="ember-view" title="Ember JS">
```

### 使用块参数

组件不仅可以传入参数然后渲染在DOM里，也可以作为返回值用在模板的块状表达式中。

```html
<!-- app/templates/index.hbs -->
{{{blog-post post=model}}}
```

组件内通过`yield`来返回值

```html
<!-- app/templates/components/blog-post.hbs -->
{{yield post.title post.body post.author}}
```

### 处理事件

组件可以处理例如单击、双击、hover、key-press这样的事件

#### 组件处理内部事件

新建一个组件：

```bash
$ ember g component event-example
```

为了演示，组件的hbs模板可以不做改动。

修改组件的js文件：

```javascript
// app/components/enevt-example.js
import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    alert('click');
  },
  mouseEnter() {
    Ember.Logger.info("mouseEnter");
  }
});
```

然后在模板里使用它：

```html
<!-- app/templates/index.hbs -->
{{#event-example}}
  hover or click here
{{/event-example}}
```

#### 组件与外部的事件传递

接着上面的栗子。假设`index.hbs`所属的`controllers/index.js`中有如下事件：

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    handleClickAction(value) {
      alert(value);
    }
  }
});
```

我们可以在`index.hbs`中把该事件传递给组件：

```html
<!-- app/templates/index.hbs -->
{{#event-example handleClic=(action "handleClickAction")}}
  hover or click here
{{/event-example}}
```

而在组件js文件中：

```javascript
// app/components/enevt-example.js
import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    // 通过sendAction来进行回调
    this.sendAction('handleClic', 'click');
  },
  mouseEnter() {
    Ember.Logger.info("mouseEnter");
  }
});
```

最终效果跟之前一样，在点击组件内元素的时候弹窗，内容为"click"。

#### 事件名称

参见：[可处理的事件名称](https://guides.emberjs.com/v2.7.0/components/handling-events/#toc_event-names)

触摸事件：

- `touchStart`
- `touchMove`
- `touchEnd`
- `touchCancel`

键盘事件：

- `keyDown`
- `keyUp`
- `keyPress`

鼠标事件：

- `mouseDown`
- `mouseUp`
- `mouseMove`
- `mouseEnter`
- `mouseLeave`
- `contextMenu`
- `click`
- `doubleClick`
- `focusIn`
- `focusOut`

表单事件：

- `submit`
- `change`
- `focusIn`
- `focusOut`
- `input`

HTML5拖拽事件：

- `drag`
- `dragStart`
- `dragEnter`
- `dragLeave`
- `dragOver`
- `dragEnd`
- `drop`

### 事件触发

组件类似于一个独立的黑箱。目前为止，我们已经接触了从父组件把属性传递给子组件的过程，但如果是反响的数据流呢？在Ember中，可以通过触发action来进行数据的反馈。举个栗子。

#### 创建组件

```bash
$ ember g component button-with-confirm
```

我们想要能够这样：

```html
<!-- app/templates/components/user-profile.hbs -->
{{button-with-confirm text="点击OK将删除账户"}}
```

或者这样

```html
<!-- app/templates/components/send-message.hbs -->
{{button-with-confirm text="点击OK将发送信息"}}
```

- 在父组件里，决定事件的处理方式。比如删除账户或者发送消息
- 在子组件里，决定什么时候事件被处罚。除此以外，我们还想在外层事件处理完成之后进行追踪

#### 父组件的action

在Ember中，每个组件都可以有一个叫作`actions`的属性，应该把你的事件定义在这里面。

先来看下父组件的js文件。假设我们有一个叫做`user-profile`的父组件：

```javascript
// app/components/user-profile.js
import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),

  actions: {
    userDidDeleteAccount() {
      this.get('login').deleteUser();
    }
  }
});
```

#### 设计子组件的action

```javascript
// app/components/button-with-confirmation.js
import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    launchConfirmDialog() {
      this.set('confirmShown', true);
    },

    submitConfirm() {
      // trigger action on parent component
      this.set('confirmShown', false);
    },

    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
```

并且在组件的模板中这样调用方法：

```html
<!-- app/templates/components/button-with-confirmation.hbs -->
<button {{action "launchConfirmDialog"}}>{{text}}</button>
{{#if confirmShown}}
  <div class="confirm-dialog">
    <button class="confirm-submit" {{action "submitConfirm"}}>OK</button>
    <button class="confirm-cancel" {{action "cancelConfirm"}}>Cancel</button>
  </div>
{{/if}}
```

#### 组件的事件传递

现在，我们要做的就是在触发子组件的`submitConfirm`方法时，能够触发外层传递给子组件的方法。

```html
<!-- app/templates/components/user-profile.hbs -->
{{button-with-confirmation text="Click here to delete your account." onConfirm=(action "userDidDeleteAccount")}}
```

```html
<!-- app/templates/components/send-message.hbs -->
{{button-with-confirmation text="Click to send your message." onConfirm=(action "sendMessage")}}
```

然后修改子组件的事件处理：

```javascript
// app/components/button-with-confirmation.js
import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    launchConfirmDialog() {
      this.set('confirmShown', true);
    },

    submitConfirm() {
      //call the onConfirm property to invoke the passed in action
      this.get('onConfirm')();
    },

    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
```

#### 异步事件

让父组件的异步事件返回Promise，则子组件可以在父组件事件完成之后再触发一些方法：

```javascript
// app/components/button-with-confirmation.js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    launchConfirmDialog() {
      this.set('confirmShown', true);
    },

    submitConfirm() {
      //call onConfirm with the value of the input field as an argument
      const promise = this.get('onConfirm')();
      promise.then(() => {
        this.set('confirmShown', false);
      });
    },

    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
```

#### 事件传递参数

sendMessage方法期待接受一个参数：

```html
<!-- app/templates/components/send-message.hbs -->
{{button-with-confirmation text="Click to send your message." onConfirm=(action "sendMessage" "info")}}
```

为了能够实现参数的传递：

```html
<!-- app/templates/components/button-with-confirmation.hbs -->
<button {{action "launchConfirmDialog"}}>{{text}}</button>
{{#if confirmShown}}
  <div class="confirm-dialog">
    {{yield confirmValue}}
    <button class="confirm-submit" {{action "submitConfirm"}}>OK</button>
    <button class="confirm-cancel" {{action "cancelConfirm"}}>Cancel</button>
  </div>
{{/if}}
```

```html
<!-- app/templates/components/send-message.hbs -->
{{#button-with-confirmation
    text="Click to send your message."
    onConfirm=(action "sendMessage" "info")
    as |confirmValue|}}
  {{input value=confirmValue}}
{{/button-with-confirmation}}
```

```javascript
// app/components/button-with-confirmation.js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    launchConfirmDialog() {
      this.set("confirmShown", true);
    },

    submitConfirm() {
      //call onConfirm with the value of the input field as an argument
      const promise = this.get('onConfirm')(this.get('confirmValue'));
      promise.then(() => {
        this.set('confirmShown', false);
      });
    },

    cancelConfirm() {
      this.set('confirmShown', false);
    }
  }
});
```

```javascript
// app/components/send-message.js
import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    sendMessage(messageType, messageText) {
      //send message here and return a promise
    }
  }
});
```

#### 在层层嵌套的组件中传递事件

我们已经在`button-with-confirmation.hbs`组件中处理了点击事件，然后向上传递给了`user-profile.hbs`组件。现在假设删除账户的事件还要继续向上传递，交给`system-preferences-editor.hbs`组件进行处理。

```html
<!-- app/templates/components/user-profile.hbs -->
{{button-with-confirmation onConfirm=(action deleteCurrentUser)
  text="Click OK to delete your account."}}
```

```html
<!-- app/templates/components/system-preferences-editor.hbs -->
{{user-profile deleteCurrentUser=(action 'deleteUser' login.currentUser.id)}}
```

```javascript
// app/components/system-preferences-editor.js
import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  actions: {
    deleteUser(idStr) {
      return this.get('login').deleteUserAccount(idStr);
    }
  }
});
```
