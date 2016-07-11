<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Magic Python](#magic-python)
  - [树结构](#%E6%A0%91%E7%BB%93%E6%9E%84)
  - [`fromkeys`](#fromkeys)
  - [拆箱](#%E6%8B%86%E7%AE%B1)
  - [反转字典](#%E5%8F%8D%E8%BD%AC%E5%AD%97%E5%85%B8)
  - [命名元组](#%E5%91%BD%E5%90%8D%E5%85%83%E7%BB%84)
  - [库](#%E5%BA%93)
    - [数据处理](#%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86)
    - [爬虫](#%E7%88%AC%E8%99%AB)
    - [命令行](#%E5%91%BD%E4%BB%A4%E8%A1%8C)
    - [workflow](#workflow)

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

```python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])

p = Point(x=11, y=22)
p[0] + p[1] # 33
p.x # 11
p.y # 22
```

```python
# namedtuple._make(sequence/iterable) 通过序列或生成器来实例化一个命名元组
Point = namedtuple('Point', ['x', 'y'])
p = Point._make([11, 22])

# namedtuple._asdict() 作用于实例化的命名元组，返回一个新的OrderedDict
p._asdict()
# OrderedDict([('x', 11), ('y', 22)])

# namedtuple._replace() 替换命名元组内的某些值并返回新的实例
p._replace(x=33)
# Point(x=33, y=22)

# namedtuple._fields() 返回命名元组中key组成的元组
p._fields()
# ('x', 'y')
```

命名元组在通过[`csv`](https://docs.python.org/3.5/library/csv.html)包解析csv文件的时候很有用

```python
EmployeeRecord = namedtuple('EmployeeRecord', 'name, age, title, department, paygrade')

import csv
for emp in map(EmployeeRecord._make, csv.reader(open("employees.csv", "rb"))):
    print(emp.name, emp.title)
```

### 库

#### 数据处理

- [openpyxl--读写Excel](http://openpyxl.readthedocs.io/en/default/)
- [xlrd--读取Excel](https://github.com/python-excel/xlrd)
- [Pillow--图像处理](https://pillow.readthedocs.io/en/3.3.x/)
- [Numpy--数据科学](http://www.numpy.org/)
- [jieba--中文分词](https://github.com/fxsjy/jieba)
- [PyMongo--mongodb with python](https://api.mongodb.com/python/current/index.html)

#### 爬虫

- [cssselect--CSS选择器](https://pythonhosted.org/cssselect/)
- [Requests--Http请求库](http://requests-docs-cn.readthedocs.io/zh_CN/latest/)
- [BeautifulSoup--HTML解析库](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)
- [Selenium--web爬虫究极神器](http://selenium-python.readthedocs.io/index.html)

#### 命令行

- [docopt](http://docopt.org/)
- [click](http://click.pocoo.org/6/)

#### workflow

- [alfred-workflow](http://www.deanishe.net/alfred-workflow/)
- [alfred-python](https://github.com/nikipore/alfred-python)