<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [learn koa2--model & mongodb](#learn-koa2--model--mongodb)
  - [model](#model)
  - [services](#services)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## learn koa2--model & mongodb

自己身为以前端开发为主的工程师，虽然也使用过PostgreSQL，SQLite，MySql这些数据库，但还是更偏向于MongoDB，因为觉得它对于前端更友好（JSON数据格式的储存），学习成本很低，和Node搭配的也不错。因此，接下来会使用`mongodb`作为和Koa2配合的数据库。

接下来，会通过mongodb创建一个ToDo-APP

### model

> 如果对mongodb不熟悉，我墙裂推荐看[MongoDB 极简实践入门](https://github.com/StevenSLXie/Tutorials-for-Web-Developers/blob/master/MongoDB%20%E6%9E%81%E7%AE%80%E5%AE%9E%E8%B7%B5%E5%85%A5%E9%97%A8.md)入门

先在本地安装并配置MongoDB

[mongoose官方文档](http://mongoosejs.com/docs/guide.html)

```bash
$ npm install --save mongoose
```

在项目内建立model

```javascript
// app/models/todo.js
// 定义数据结构
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// 定义TodoSchema数据表和数据结构
const TodoSchema = new Schema({
  content: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  user: { type: String, required: true }
});

// 使用content字段作为索引
TodoSchema.index({content: 1});
// 使用Todo名称来调用表
export default mongoose.model('Todo', TodoSchema);
```

然后在`models/index.js`中启动数据库：

```javascript
// app/models/index.js
import mongoose from 'mongoose';

// 事先创建了名为koa2-todo的数据库
mongoose.connect('mongodb://127.0.0.1:27017/koa2-todo', function (err) {
  if (err) {
    console.error('connect to %s error: ', 'koa2-todo', err.message);
    process.exit(1);
  }
});

import Todo from './todo';
export default {Todo};
```

这样，在调用`models/index.js`的时候，会连接`koa2-todo`数据库，并且会在没有`TodoSchema`数据表的时候新建数据表

### services

虽然`model`好了，但我们在使用的时候不会直接调用`Todo`数据表来操作，而是再做一层封装，把数据的各个操作借口封装到我们需要的函数里，然后再暴露出去。

数据库的操作是异步的，不过好在`mongoose`已经为我们封装成了`Promise`。

```javascript
// app/services/todo.js
import Model from '../models/index';

const getTodos = () => {
  return new Promise((resolve, reject) => {
    Model.Todo.find().exec().then((result) => {
      resolve(result);
    });
  });
};

const addTodo = (options) => {
  return new Promise((resolve, reject) => {
    Model.Todo.create(options).then((result) => {
      resolve(result);
    });
  });
};

export default {
  getTodos,
  addTodo
}
```

之后需要新建`controller`，来进行操作的调用：

```javascript
// app/controllers/todo.js
import Todo from '../services/todo';

// todo-app首页，渲染所有ToDo，并可以新建ToDo
const todoIndex = async (ctx, next) => {
  const todos = await Todo.getTodos(user.name);
  await ctx.render('todo/index', {
    todos: todos,
    csrf: ctx.csrf,
    title: 'todos index'
  });
};

// 通过表单的post新建一个ToDo，并返回列表页
const addTodo = async (ctx, next) => {
  const requestData = ctx.request.body;
  const todo = {
    content: requestData.content
  }
  await Todo.addTodo(todo);
  ctx.redirect('/todo');
};

export default {
  addTodo,
  todoIndex
}
```

最后就是`router`和`view`层：

```javascript
// app/routes/todo.js
import koaRouter from 'koa-router';
import todo from '../controllers/todo';

const router = koaRouter({
  prefix: '/todo'
});

router.post('/new', todo.addNew);
router.get('/', todo.todoIndex);
module.exports = router;
```


```html
<!-- app/templates/todo/index.html -->
{% extends "layouts/base.html" %}

{% block body %}
  <!-- 用来新建ToDo的表单，使用POST方法，并且要传入csrf -->
  <form action="/todo/new" method="post">
    <input type="hidden" name="_csrf" value="{{ csrf }}" />
    <input type="hidden" name="utf8" value="✓" />
    <input type="text" name="content"/>
    <input type="submit" value="submit"/>
  </form>
  <ul>
    {% for todo in todos %}
      <li data-id="{{ todo._id }}">
        <span class="todo_content">
          {{ todo.content }}
        </span>
      </li>
    {% endfor %}
  </ul>
{% endblock %}
```
