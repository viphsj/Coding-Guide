## Express初步03 - 模板引擎与View层(jade)

在默认情况下，Express使用`jade`作为模板引擎

### jade的基本使用

jade使用缩进来定义HTML文档的层次结构，直接上代码看的最清楚:

```jade
html
// 编译后
<html></html>

section#area
// 编译后
<section id="area"></section>

section.name
// 编译后
<section class="name"></section>

// class与id混合，并在标记中插入文本(只需在标记定义之后加入)
p.name.section.author#article
	span this is an article
// 编译后
<p class="name section author" id="article">
	<span>this is an article</span>
</p>

// 处理多行文本--使用管道描述符(|)
p
	| this is a test
	| has many lines
// 编译后
<p>this is a test has many lines</p>
```

### jade输出数据

#### 特殊符号

jade中的特殊符号:

- `-`(减号) 告诉随后的代码应当被执行
- `=`(等号) 告诉解释器要对代码进行演算、转义然后输出
- `#{变量}` 告诉jade将变量替换为值
- `\#{变量}` 告诉jade不要渲染这个变量

```jade
- var foo = bar;
p Actually foo is #{foo}.

// 输出
<p>
	Actually foo is bar.
</p>
```

#### 循环

- `each value in array`
- `each value, key in object`

```jade
- users = ['ecmadao', 'edward', 'ws']
- each user in users
  p= user
 
// 输出
<p>ecmadao</p>
<p>edward</p>
<p>ws</p>

- object = {name: 'ecmadao', age: 24}
- each value, key in object
  li #{key}: #{value}
 
// 输出
<li>name: ecmadao</li>
<li>age: 24</li>
```

#### 条件

```jade
- understand = false
- if (understand)
  p Great you understand it
- else
  p oh comeon go back to relearn it.
```

#### 插入css与js

- 引用javascript

```jade
script(src='/javascripts/jquery.js')
```

- 引用css

```jade
link(rel='stylesheet', href='/stylesheets/style.css')
```

- 直接插入js

```jade
script
	|var duoshuoQuery = {short_name:"ydr-me"};
	|(function() {
	|	var ds = document.createElement('script');
	|	ds.type = 'text/javascript';ds.async = true;
	|	ds.src = 'http://static.duoshuo.com/embed.js';
	|	ds.charset = 'UTF-8';
	|	document.getElementsByTagName('head')[0].appendChild(ds);
	|})();
```

#### 注释

- `//` 可见注释
- `//-` 不可见注释

### 模板引用(includes)

#### 引用jade公共文件

```jade
//- head.jade
head
  title My Site
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
  
//- foot.jade
#footer
  p Copyright (c) foobar

//- index.jade
doctype html
html
  include ./includes/head.jade
  body
    h1 My Site
    p Welcome to my super lame site.
    include ./includes/foot.jade
```
编译结果:

```html
<!doctype html>
<html>
  <head>
    <title>My Site</title>
    <script src='/javascripts/jquery.js'></script>
    <script src='/javascripts/app.js'></script>
  </head>
  <body>
    <h1>My Site</h1>
    <p>Welcome to my super lame site.</p>
    <div id="footer">
      <p>Copyright (c) foobar</p>
    </div>
  </body>
</html>
```

#### 引用资源文件

```jade
// style.css
h1 { color: red; }

// script.js
console.log('You are awesome');

//- index.js
doctype html
html
  head
    style
      include style.css
  body
    h1 My Site
    p Welcome to my super lame site.
    script
      include script.js
```
编译结果:

**通过`include`引用的资源文件会直接行内插入html中**

```html
<!doctype html>
<html>
  <head>
    <style>
      h1 { color: red; }
    </style>
  </head>
  <body>
    <h1>My Site</h1>
    <p>Welcome to my super lame site.</p>
    <script>
      console.log('You are awesome');
    </script>
  </body>
</html>
```

#### 直接引用markdown

```jade
// article.md
# This Is Title

This is an article written in markdown.

//- index.jade
doctype html
html
  head
    title An Article
  body
    include:markdown article.md
```

编译结果:

```html
<!doctype html>
<html>
  <head>
    <title>An Article</title>
  </head>
  <body>
    <h1>article.md</h1>
    <p>This is an article written in markdown.</p>
  </body>
</html>
```


### 模板继承(extends)

> 父模板通过 `block` 关键字输出可以被继承的模块
> 
> 子模板通过 `extends` 继承父模板，可以通过 `block` 重新覆盖书写各个模块
> 
> **block内(block下的缩进)包含的元素可以被覆盖重写**
> 
> **通过`block append 模块名`可以在继承的模块后继续添加内容**
> 
> **通过`block prepend 模块名`可以在继承的模块前继续添加内容**

```jade
//- layout.jade
doctype 5
html
  head
    block title
    	title My title
  body
    #content
      block content
        p this is a block

//- index.jade
extends ./layout.jade

block title
  title Index Title

block append content
  h1 My Article
  p append to block
```
编译为:

```html
<!doctype html>
<html>
  <head>
    <title>Index Title</title>
  </head>
  <body>
    <p>this is a block</p>
    <h1>My Article</h1>
    <p>append to block</p>
  </body>
</html>
```

### Filters过滤器

> 通过filters过滤器，可以直接在jade中引用或书写其他语言
> 
> 较通用的过滤器有 `:coffee-script` `:babel` `: uglify-js` `:less` `:markdown`

```jade
:markdown
  # Markdown

  I often like including markdown documents.
script
  :coffee-script
    console.log 'This is coffee script'
```

编译结果:

```html
<h1>Markdown</h1>
<p>I often like including markdown documents.</p>
<script>console.log('This is coffee script')</script>
```