<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Django-02-template](#django-02-template)
  - [基本语法](#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)
    - [过滤器](#%E8%BF%87%E6%BB%A4%E5%99%A8)
    - [循环标签](#%E5%BE%AA%E7%8E%AF%E6%A0%87%E7%AD%BE)
    - [判断标签](#%E5%88%A4%E6%96%AD%E6%A0%87%E7%AD%BE)
    - [拼接字符串](#%E6%8B%BC%E6%8E%A5%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [定义变量](#%E5%AE%9A%E4%B9%89%E5%8F%98%E9%87%8F)
  - [表单](#%E8%A1%A8%E5%8D%95)
    - [使用原生表单](#%E4%BD%BF%E7%94%A8%E5%8E%9F%E7%94%9F%E8%A1%A8%E5%8D%95)
    - [ajax](#ajax)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Django-02-template

[内置标签与过滤器](http://python.usyiyi.cn/django/ref/templates/builtins.html)

Django比较爽的一点是view可以直接写HTML，注入数据则在`{{}}`和`{%%}`内完成，因此可以不必去学习额外的模板语法。但蛋疼的是Django template对语法进行了限制，在`{{}}`/`{%%}`内无法使用Python语法，只能使用一些指定的语句。但其设计模式的目的就是在此：

> 业务逻辑应该和表现逻辑相对分开 。我们将模板系统视为控制表现及表现相关逻辑的工具，仅此而已。模板系统不应提供超出此基本目标的功能。
>
> 出于这个原因，在 Django 模板中是**不可能直接调用 Python 代码**的。所有的编程工作基本上都被局限于模板标签的能力范围。当然，是有可能写出自定义的模板标签来完成任意工作，但这些“超范围”的 Django 模板标签有意地不允许执行任何 Python 代码。
>
> 语法不应受到 HTML/XML 的束缚 。尽管 Django 模板系统主要用于生成 HTML，它还是被有意地设计为可生成非 HTML 格式，如纯文本。一些其它的模板语言是基于 XML 的，将所有的模板逻辑置于 XML 标签与属性之中，而 Django 有意地避开了这种限制。强制要求使用有效 XML 编写模板将会引发大量的人为错误和难以理解的错误信息，而且使用 XML 引擎解析模板也会导致令人无法容忍的模板处理开销。
>
> 假定设计师精通 HTML 编码 。模板系统的设计意图并不是为了让模板一定能够很好地显示在 Dreamweaver 这样的所见即所得编辑器中。这种限制过于苛刻，而且会使得语法不能像目前这样的完美。Django 要求模板创作人员对直接编辑 HTML 非常熟悉。
>
> 假定设计师不是 Python 程序员 。模板系统开发人员认为：网页模板通常由 设计师 而不是 程序员 编写，因而假定这些人并不掌握 Python 相关知识。
>
> 当然，系统同样也特意地提供了对那些 由 Python 程序员进行模板制作的小型团队的支持。它提供了一种工作模式，允许通过编写原生 Python 代码进行系统语法拓展。
>
> Django架构的目标并不是要发明一种编程语言 。而是恰到好处地提供如分支和循环这一类编程式功能，这是进行与表现相关判断的基础。

### 基本语法

- 渲染变量`{{variable}}`

- 模板标签`{%%}`

#### 过滤器

过滤器用于接收模板中的参数并返回处理结果

[自定义模板标签和过滤器](http://python.usyiyi.cn/django/howto/custom-template-tags.html)

```python
# templatetags/custom_filter.py
from django import template
register = template.Library()

@register.filter
def custom_filter(value):
    return value.lower()
```

```html
<!--将var作为变量传入函数custom_filter-->
{% load custom_filter %}
{{ var|custom_filter }}

<!--var 和 "bar"作为参数传入foo-->
{% load foo %}
{{ var|foo:"bar" }}
```

#### 循环标签

```html
{% for i in tags%}
	<span>{{i}}</span>
{% endfor %}
```

#### 判断标签

`{% else %}`语句是可选的

```html
{% if var %}
{% else %}
{% endif %}

<!--判断var与targetValue是否相等-->
{% ifequal var targetValue %}
{% else %}
{% endifequal %}

<!--判断var与targetValue是否不相等-->
{% ifnotequal var targetValue %}
{% else %}
{% endifnotequal %}
```

#### 拼接字符串

```html
{% with "articles/"|add:url|add:"/user.html" %}
{% endwith %}
```

但上述方法在字符串与数字连接时会出现问题。为了能够在连接时将变量全部转换为字符串，可以自定义templatetags

```python
from django import template

register = template.Library()

@register.filter
def addstr(arg1, arg2):
    """concatenate arg1 &  arg2"""
    return str(arg1) + str(arg2)
```

```html
{% load addstr %}
{% with "articles/"|addstr:url|addstr:"/user.html" %}
{% endwith %}
```

#### 定义变量

```html
<!--with 语句可以对变量进行赋值-->
{% with var=article.tags.all %}
	{% for tag in tags%}
		<span>{{tag}}</span>
	{% endfor %}
{% endwith %}
```

`with`的一大好处：

Django的数据库查询(QuerySet)是被延迟处理的。对于不可调用的属性，它会进行缓存处理：

```python
articles = Articles.objects.get(id=1)
articles.content # 第一次取出时会对数据库进行查询
articles.content # 第二次取出时则从缓存中寻找
```

但是，对于可调用的属性，每一次的访问都会查询数据库

```python
articles = Articles.objects.get(id=1)
articles.tags.all() # 第一次取出时会对数据库进行查询
articles.tags.all() # 第二次取出时仍会对数据库进行查询
```

为了能够避免开销，则可以利用with标签，在template中将查询结果缓存:

```html
{% with var=article.tags.all %}
	
{% endwith %}
```

在实际应用中，通过with缓存，将网页内存占用由600M~800M稳定在了200M

其他的缓存方案：

- [caching-and-querysets](http://python.usyiyi.cn/django/topics/db/queries.html#caching-and-querysets)
- [数据库访问优化](http://python.usyiyi.cn/django/topics/db/optimization.html)
- [指定要保存的字段](http://python.usyiyi.cn/django/ref/models/instances.html#specifying-which-fields-to-save)

### 表单

**需要注意`csrf_token`**

#### 使用原生表单

```html
<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
<!--csrf_token会渲染出一个hiden input-->
</form>
```

#### ajax

```js
$.ajax({
	url: `/articles/${articleId}/comment_new/`,
	method: 'POST',
	data: {
		comment: comment,
        csrfmiddlewaretoken: {{ csrf_token }}
	}
})
```