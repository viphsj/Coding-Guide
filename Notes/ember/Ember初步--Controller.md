<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ember初步--Controller](#ember%E5%88%9D%E6%AD%A5--controller)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ember初步--Controller

Controller就像是一个特殊的Component，由route-handler来进行处理，并作为最终`model()`的返回值。

```bash
# 定义controller
$ ember g controller my-controller-name
```

要注意的是，controller的名称要和它对应的路由一样。而且，通常只有在你需要自定义一些属性，或者给模板提供action的时候才会定义controller

假设一个`blog-post`页面，我们会在这个页面上展示blog的信息：

- title
- intro
- body
- author

这些数据可以通过model定义，然后通过route-handler的`model()`方法返回所需数据，最后渲染在页面上：

```javascript
// app/models/blog-post.js
import DS from 'ember-data';

export default DS.Model.extend({  
  title: DS.attr('string'),
  intro: DS.attr('string'),
  body: DS.attr('string'),
  author: DS.attr('string')
});
```

```html
<!-- app/templates/blog-post.hbs -->
<h1>{{model.title}}</h1>
<h2>by {{model.author}}</h2>

<div class="intro">
  {{model.intro}}
</div>
<hr>
<div class="body">
  {{model.body}}
</div>
```

但如果我们想要有一个展开/关闭的功能来控制blog内容的展现呢？在template层可能会这样：

```html
<!-- app/templates/blog-post.hbs -->
<h1>{{model.title}}</h1>
<h2>by {{model.author}}</h2>

<div class='intro'>
  {{model.intro}}
</div>
<hr>

{{#if isExpanded}}
  <button {{action "toggleBody"}}>Hide Body</button>
  <div class="body">
    {{model.body}}
  </div>
{{else}}
  <button {{action "toggleBody"}}>Show Body</button>
{{/if}}
```

而这个方法则可以在controller里定义：

```javascript
// app/controllers/blog-post.js
import Ember from 'ember';

export default Ember.Controller.extend({
  isExpanded: true, // 可以忽略不定义，则默认为false
  actions: {
    toggleBody() {
      this.toggleProperty('isExpanded');
    }
  }
});
```
