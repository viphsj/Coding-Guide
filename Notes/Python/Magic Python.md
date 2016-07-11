<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Magic Python](#magic-python)
  - [树结构](#%E6%A0%91%E7%BB%93%E6%9E%84)
  - [`fromkeys`](#fromkeys)
  - [拆箱](#%E6%8B%86%E7%AE%B1)
  - [反转字典](#%E5%8F%8D%E8%BD%AC%E5%AD%97%E5%85%B8)
  - [命名元组](#%E5%91%BD%E5%90%8D%E5%85%83%E7%BB%84)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Magic Python

### 树结构

[One-line Tree in Python](https://gist.github.com/hrldcpr/2012250)

```python
from collections import defaultdict

# 定义一个可形成树的方法
tree = lambda: defaultdict(tree)

# 实例化一个树
database = tree()
database['users']['name'] = 'ecmadao'
# 如果是普通的字典，则对于不存在的多层嵌套的赋值会直接报错
# 必须先 database['users'] = {}

import json
print(json.dumps(database))
# {"users": {"name": "ecmadao"}}
```

### `fromkeys`

提供默认的值，通过一个list生成一个dict

```python
# ⽤序列做 key,并提供默认value
dict.fromkeys(["a", "b", "c"], 1)
# {'c': 1, 'b': 1, 'a': 1}
```

### 拆箱

```python
example = [1, 2, 3, 4]
a, *b, c = example
# a -> 1
# b -> [2, 3]
# c -> 4
```

### 反转字典

**使用zip**

```python
example = {
  'a': 1,
  'b': 2,
  'c': 3
}
tmp = zip(example.values(), example.keys())
# [(1, 'a'), (2, 'b'), (3, 'c')]
result = dict(tmp)
# {1: 'a', 2: 'b', 3: 'c'}
```

**使用字典推导式**

```python
example = {
  'a': 1,
  'b': 2,
  'c': 3
}
elpmaxa = {key: value for value, key in example.items()}
# {1: 'a', 2: 'b', 3: 'c'}
```

### 命名元组


