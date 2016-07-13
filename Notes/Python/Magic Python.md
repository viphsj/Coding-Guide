<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Magic Python](#magic-python)
  - [树结构](#%E6%A0%91%E7%BB%93%E6%9E%84)
  - [`fromkeys`](#fromkeys)
  - [拆箱](#%E6%8B%86%E7%AE%B1)
  - [反转字典](#%E5%8F%8D%E8%BD%AC%E5%AD%97%E5%85%B8)
  - [命名元组](#%E5%91%BD%E5%90%8D%E5%85%83%E7%BB%84)
  - [读写 XML/CSV](#%E8%AF%BB%E5%86%99-xmlcsv)
  - [文件操作](#%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C)
    - [os](#os)
    - [shutil](#shutil)
  - [beautifulsoup的技巧](#beautifulsoup%E7%9A%84%E6%8A%80%E5%B7%A7)
  - [杂项](#%E6%9D%82%E9%A1%B9)
    - [从可迭代对象中随机选取元素](#%E4%BB%8E%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1%E4%B8%AD%E9%9A%8F%E6%9C%BA%E9%80%89%E5%8F%96%E5%85%83%E7%B4%A0)
    - [生成包含大写字母和数字的随机字符串](#%E7%94%9F%E6%88%90%E5%8C%85%E5%90%AB%E5%A4%A7%E5%86%99%E5%AD%97%E6%AF%8D%E5%92%8C%E6%95%B0%E5%AD%97%E7%9A%84%E9%9A%8F%E6%9C%BA%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [检验一个字符串是否是数字](#%E6%A3%80%E9%AA%8C%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%98%AF%E5%90%A6%E6%98%AF%E6%95%B0%E5%AD%97)
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

### 读写 XML/CSV

- [ElementTree解析简单的XML数据](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p03_parse_simple_xml_data.html)
- [使用 Python ElementTree 生成 xml](http://dola.xinfan.org/?p=191)
- [用第三方库进行XML解析](http://pythonguidecn.readthedocs.io/zh/latest/scenarios/xml.html)
- [读写CSV数据](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p01_read_write_csv_data.html)

### 文件操作

#### os

```python
import os

os.listdir(path) # 列出目录下所有文件
os.isfile(path) # 判断是否是文件
os.path.splitext(path) # 把一个文件分为文件名和后缀
os.path.join() # 合并路径
os.path.exists(path) # 检查是否存在
os.makedirs(dir) # 创建文件夹

os.walk(path) # 遍历每个目录将会返回两个列表(一个文件列表,一个目录列表)
```

#### [shutil](https://docs.python.org/2/library/shutil.html)

> High-level file operations

```python
# 复制文件
import shutil

shuilt.copyfile(src, dst)
# 把src复制至dst
```

### beautifulsoup的技巧

使用bs4分析html的时候，可能会遇见DOM解析出错的时候：

```python
target_url = soup.find('a').get('href')
# or
content = soup.find('div', attr={"class": "demo"}).string
```

如果DOM中没有找到目标元素，还进一步使用get的话，则会报出异常。因此，在没有获取到元素的时候，返回{}就可以避免get出错

```python
target_url = (soup.find('a') or {}).get('href')
```

### 杂项

#### 从可迭代对象中随机选取元素

```python
import random

foo = (1, 2, 3, 4, 5)
random.choice(foo)
```

#### 生成包含大写字母和数字的随机字符串

`string`有方法能让我们方便的获取所有字母和数字

```python
import string
string.ascii_lowercase # abcdefghijklmnopqrstuvwxyz
string.ascii_uppercase # ABCDEFGHIJKLMNOPQRSTUVWXYZ
string.ascii_letters # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
string.digits # 0123456789
```

通过`random.choice`即可进行随机选择

```python
import string
import random

def id_generator(size=6, chars=None):
	chars = chars if chars is not None else string.ascii_letters + string.digits
	return ''.join([random.choice(chars) for _ in range(size)])

id_generator() # 随机生成一个混合大小写和数字的六位码
```

#### 检验一个字符串是否是数字

```python
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False
```

```python
# 对字符串对象用isdigit()方法:
a = "03523"
a.isdigit()
# True
b = "963spam"
b.isdigit()
# False
```

### 库

#### 数据处理

**excel/word/xml/csv**

- [openpyxl--读写Excel](http://openpyxl.readthedocs.io/en/default/)
- [xlrd--读取Excel](https://github.com/python-excel/xlrd)
- [xlsxwriter](https://github.com/jmcnamara/XlsxWriter)

> 注：openpyxl读取文件类型不支持xls但支持xlsx，可以使用xlrd库进行xls的读取，或者直接将xls转换为xlsx
>
> 墙裂推荐[xlsxwriter](http://xlsxwriter.readthedocs.io/index.html)

- [untangle--xml转为Python对象](https://github.com/stchris/untangle)
- [xmltodict--xml转为dict对象](https://github.com/martinblech/xmltodict)
- [ElementTree--解析并创建xml](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p05_turning_dictionary_into_xml.html)

- [Python-docx--读写word文档](http://hao.jobbole.com/python-docx/)

- [CSV](http://python3-cookbook.readthedocs.io/zh_CN/latest/c06/p01_read_write_csv_data.html)

**图像**

- [Pillow--图像处理](https://pillow.readthedocs.io/en/3.3.x/)
  - [Pillow v2.4.0快速入门](http://pillow-cn.readthedocs.io/zh_CN/latest/handbook/tutorial.html)
  - [pillow-doc](https://pillow.readthedocs.io/en/3.3.x/)

**计算**

- [Numpy--数据科学](http://www.numpy.org/)
  - [Quickstart tutorial](https://docs.scipy.org/doc/numpy-dev/user/quickstart.html)
  - [Python 数据分析基础包：Numpy](http://my.oschina.net/lionets/blog/276574)

**数据库**

- [PyMongo--mongodb with python](https://api.mongodb.com/python/current/index.html)

**其他**

- [jieba--中文分词](https://github.com/fxsjy/jieba)
- [Delorean--时间日期时区的转换](http://delorean.readthedocs.io/en/latest/index.html)


#### 爬虫

- [cssselect--CSS选择器](https://pythonhosted.org/cssselect/)
- [Requests--Http请求库](http://requests-docs-cn.readthedocs.io/zh_CN/latest/)
- [BeautifulSoup--HTML解析库](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)
- [Selenium--web爬虫究极神器](http://selenium-python.readthedocs.io/index.html)

#### 命令行

- [docopt](http://docopt.org/)
- [click](http://click.pocoo.org/6/)
- [prettytable](https://pypi.python.org/pypi/PrettyTable)
- [termcolor](https://pypi.python.org/pypi/termcolor)
- [colorama](https://pypi.python.org/pypi/colorama)

#### workflow

- [alfred-workflow](http://www.deanishe.net/alfred-workflow/)
- [alfred-python](https://github.com/nikipore/alfred-python)