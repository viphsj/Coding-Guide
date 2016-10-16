<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python Style Guide](#python-style-guide)
  - [空格](#%E7%A9%BA%E6%A0%BC)
  - [类和注释](#%E7%B1%BB%E5%92%8C%E6%B3%A8%E9%87%8A)
  - [字符串](#%E5%AD%97%E7%AC%A6%E4%B8%B2)
  - [`import`](#import)
  - [命名](#%E5%91%BD%E5%90%8D)
  - [代码建议](#%E4%BB%A3%E7%A0%81%E5%BB%BA%E8%AE%AE)
  - [Be Pythonic](#be-pythonic)
    - [解包(Unpacking)](#%E8%A7%A3%E5%8C%85unpacking)
    - [创建一个被忽略的变量](#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E8%A2%AB%E5%BF%BD%E7%95%A5%E7%9A%84%E5%8F%98%E9%87%8F)
    - [创建一个含N个对象的列表](#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%90%ABn%E4%B8%AA%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%88%97%E8%A1%A8)
    - [创建一个含N个列表的列表](#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%90%ABn%E4%B8%AA%E5%88%97%E8%A1%A8%E7%9A%84%E5%88%97%E8%A1%A8)
    - [使用列表来创建字符串](#%E4%BD%BF%E7%94%A8%E5%88%97%E8%A1%A8%E6%9D%A5%E5%88%9B%E5%BB%BA%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [在集合体（collection）中查找一个项（而不是列表中）](#%E5%9C%A8%E9%9B%86%E5%90%88%E4%BD%93%EF%BC%88collection%EF%BC%89%E4%B8%AD%E6%9F%A5%E6%89%BE%E4%B8%80%E4%B8%AA%E9%A1%B9%EF%BC%88%E8%80%8C%E4%B8%8D%E6%98%AF%E5%88%97%E8%A1%A8%E4%B8%AD%EF%BC%89)
    - [限制try里面有且仅有绝对必要的代码](#%E9%99%90%E5%88%B6try%E9%87%8C%E9%9D%A2%E6%9C%89%E4%B8%94%E4%BB%85%E6%9C%89%E7%BB%9D%E5%AF%B9%E5%BF%85%E8%A6%81%E7%9A%84%E4%BB%A3%E7%A0%81)
    - [使用`''.startswith()`和`''.endswith()`替代切片](#%E4%BD%BF%E7%94%A8startswith%E5%92%8Cendswith%E6%9B%BF%E4%BB%A3%E5%88%87%E7%89%87)
    - [不要用`==`比较`True`和`False`](#%E4%B8%8D%E8%A6%81%E7%94%A8%E6%AF%94%E8%BE%83true%E5%92%8Cfalse)
  - [代码美感](#%E4%BB%A3%E7%A0%81%E7%BE%8E%E6%84%9F)
  - [推荐阅读](#%E6%8E%A8%E8%8D%90%E9%98%85%E8%AF%BB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python Style Guide

### 空格

- `:`用在行尾时前后皆不加空格，如分枝、循环、函数和类定义语言

```python
example = {'a': 1, 'b': 2}
if isTrue: # 在行尾不加空格
```

- 当`=`用于作为指示关键字参数或默认参数时在其两侧不使用空格

```python
def example_method(a, b=1):
```

- 在使用不同优先级的运算符时，考虑在更低优先级的操作符两侧插入空格

```python
# good
i = i + 1
x = x*2 - 1
hypot2 = x*x + y*y
c = (a+b) * (a-b)

# bad
i=i+1
x = x * 2 - 1
hypot2 = x * x + y * y
c = (a + b) * (a - b)
```

### 类和注释

- 类应该在其定义下有一个用于描述该类的文档字符串。如果类还有公共属性，那么文档中应该有一个属性(Attributes)段。

- 如果一个类不继承自其它类，就显示的从object继承。

```python
class ExampleClass(object):
	"""Summary of class here.
	Attributes:
		a: A number of the example.
		b: .......
	"""
	def __init__(self, a, b):
		........
```

- 对于单行的文档字符串，把结尾`"""`放在同一行

```python
def double(x):
	"""get double"""
	return x * x
```

### 字符串

- 使用`format`格式化字符串

- 避免在循环中用+和+=操作符来累加字符串。由于字符串是不可变的，这样做会创建不必要的临时对象，并且导致二次方而不是线性的运行时间。**可以将每个子串加入列表，然后在循环结束后用 .join 连接列表**

- 为多行字符串使用三重双引号而非三重单引号

### `import`

- 模块导入的顺序：

1. 从标准库导入
2. 从第三方库导入
3. 从自己编写的模块导入

面对上面三种不同来源的模块，应该空出一行

- 使用完整包名来导入模块

```python
# Not good
from collections import defaultdict

# good
import collections
collections.defaultdict
```

### 命名

- 使用`_`开头则表明模块变量或函数是protected的
- 使用`__`开头的实例变量或方法表示类内私有
- 类名使用大写字母开头双驼峰式写法(ExampleClass)
- 模块名使用小写字母+`_`的形式(examlpe_class.py)
- 常量名使用全大写+`_`的形式
- 变量名使用全小写+`_`的形式
- 变量名不应该带有类型信息，例如(example_list是不好的)
- 函数的命名规则和变量名相同


| Type                       | Public             | Internal                                 |
| -------------------------- | ------------------ | :--------------------------------------- |
| Moudles                    | lower_with_under   | _lower_with_under                        |
| Packages                   | lower_with_under   |                                          |
| Classes                    | CapWords           | _CapWords                                |
| Exceptions                 | CapWords           |                                          |
| Functions                  | lower_with_under() | _lower_with_under()                      |
| Global/Class Constants     | CAPS_WITH_UNDER    | _CAPS_WITH_UNDER                         |
| Global/Class Variables     | lower_with_under   | _lower_with_under                        |
| Instance Variables         | lower_with_under   | _lower_with_under (protected) or __lower_with_under (private) |
| Method Names               | lower_with_under() | _lower_with_under() (protected) or __lower_with_under() (private) |
| Function/Method Parameters | lower_with_under   |                                          |
| Local Variables            | lower_with_under   |                                          |

### 代码建议

- 按需使用生产器

- 单行函数则使用`lambda`匿名函数

- 在简单的情况下使用列表推导式`[expression for item in iterable]`，若复杂则不建议使用

### Be Pythonic

说得简单些，就是写代码的方式更加具有Python风。
下面是一些实践

#### 解包(Unpacking)

```python
# 同时遍历列表里的index和value
for index, item in enumerate(example_list):
	# do something

# 交换变量
a, b = b, a

# 嵌套解包
a, (b, c) = 1, (2, 3)

# 扩展解包
a, *rest = [1, 2, 3]
# a = 1, rest = [2, 3]
a, *middle, c = [1, 2, 3, 4]
# a = 1, middle = [2, 3], c = 4
```

#### 创建一个被忽略的变量

当你需要赋值于一个变量，但实际上并不需要它(比如在解包的时候)，使用`__`作为变量名：

```python
filename = 'foobar.txt'
basename, __, ext = filename.rpartition('.')
# filename.rpartition('.') = ('foobar', '.', 'txt')
```

#### 创建一个含N个对象的列表

```python
# so easy
four_nones = [None] * 4
```

#### 创建一个含N个列表的列表

因为列表是可变的，所以 * 操作符（如上）将会创建一个包含N个且指向 同一个 列表的列表，这可能不是你想用的。取而代之，使用列表解析：

```python
example_list = [[1]] * 4
print(example_list)
# [[1], [1], [1], [1]] 列表里的每个[1]实际上都指向相同的引用
example_list[0][0] = 0
print(example_list)
# [[0], [0], [0], [0]]
```

```python
# 使用列表解析式
example_list = [[1] for i in range(5)]
print(example_list)
# [[1], [1], [1], [1], [1]]
example_list[0][0] = 0
print(example_list)
# [[0], [1], [1], [1], [1]]
```

#### 使用列表来创建字符串

避免字符串的`+`操作，使用列表的`join`方法

```python
letters = ['s', 'p', 'a', 'm']
word = ''.join(letters)
```

#### 在集合体（collection）中查找一个项（而不是列表中）

```python
s = set(['s', 'p', 'a', 'm'])
l = ['s', 'p', 'a', 'm']

def lookup_set(s):
    return 's' in s
def lookup_list(l):
    return 's' in l
# 在集合中查找比在列表中查找要快速的多。当在列表中查找时，Python对查看每一项的值直到找到匹配的项。而在集合中，哈希值将会告诉Python在集合的哪里去查找匹配的项
```

#### 限制try里面有且仅有绝对必要的代码

对于所有的`try/except`语句来说，限制try里面有且仅有绝对必要的代码。相对的，使用`try/except/else`，在`else`中处理`except`没有捕获的情况。

```python
# good
try:
    value = collection[key]
except KeyError:
    return key_not_found(key)
else:
    return handle_value(value)

# bad
try:
    # Too broad!
    return handle_value(collection[key])
except KeyError:
    # Will also catch KeyError raised by handle_value()
    return key_not_found(key)
```

#### 使用`''.startswith()`和`''.endswith()`替代切片

有时候，我们可能需要检查一段字符串的开头或者结尾。除了常见的切片方法以外，更推荐`startswith`和`endswith`方法。

```python
# good
if foo.startswith('bar'):
	print(foo)

# just soo
if foo[:3] == 'bar':
	print(foo)
```

#### 不要用`==`比较`True`和`False`

```python
# good
if greeting:
# bad
if greeting == True:
# too bad
if greeting is True:
```

### 代码美感

```python
# use
my_list = [
    1, 2, 3,
    4, 5, 6,
]
# not
my_list = [
    1, 2, 3,
    4, 5, 6,
    ]
```

```python
# 文档字符串

# 单行文档
# 对于单行的文档字符串，把结尾"""放在同一行
"""单行文档字符串"""

# 多行文档
# 文档字符串的结尾"""应该放在单独的一行
"""多行文档
多行文档实例
"""
```

### 推荐阅读

- [Google开源项目风格指南](http://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/)
- [Python最佳实践指南](http://pythonguidecn.readthedocs.io/zh/latest/)
- [PEP 8 - Python 编码风格指南](http://drafts.damnever.com/2015/EPE8-style-guide-for-python-code.html)