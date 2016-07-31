<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Django-03-models](#django-03-models)
  - [DateTimeField](#datetimefield)
    - [auto_now](#auto_now)
    - [auto_now_add](#auto_now_add)
    - [数据存的是实例](#%E6%95%B0%E6%8D%AE%E5%AD%98%E7%9A%84%E6%98%AF%E5%AE%9E%E4%BE%8B)
    - [csrf_token](#csrf_token)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Django-03-models

[模型实例参考](http://python.usyiyi.cn/django/ref/models/instances.html)

### DateTimeField

#### auto_now

#### auto_now_add

#### 数据存的是实例

ValueError: Cannot assign "11": "Comment.article_id" must be a "Article" instance.

#### csrf_token

**使用原生表单**

```html
<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
<!--csrf_token会渲染出一个hiden input-->
</form>
```