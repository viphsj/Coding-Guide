<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python踩坑笔记](#python%E8%B8%A9%E5%9D%91%E7%AC%94%E8%AE%B0)
  - [函数的默认参数](#%E5%87%BD%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%8F%82%E6%95%B0)
  - [捕获多个异常](#%E6%8D%95%E8%8E%B7%E5%A4%9A%E4%B8%AA%E5%BC%82%E5%B8%B8)
  - [Python中的变量名解析](#python%E4%B8%AD%E7%9A%84%E5%8F%98%E9%87%8F%E5%90%8D%E8%A7%A3%E6%9E%90)
  - [通过列表解析式来避免在遍历列表时改变列表](#%E9%80%9A%E8%BF%87%E5%88%97%E8%A1%A8%E8%A7%A3%E6%9E%90%E5%BC%8F%E6%9D%A5%E9%81%BF%E5%85%8D%E5%9C%A8%E9%81%8D%E5%8E%86%E5%88%97%E8%A1%A8%E6%97%B6%E6%94%B9%E5%8F%98%E5%88%97%E8%A1%A8)
  - [`print`](#print)
  - [最大递归深度设定](#%E6%9C%80%E5%A4%A7%E9%80%92%E5%BD%92%E6%B7%B1%E5%BA%A6%E8%AE%BE%E5%AE%9A)
  - [生成器](#%E7%94%9F%E6%88%90%E5%99%A8)
  - [`dir`打印所有方法](#dir%E6%89%93%E5%8D%B0%E6%89%80%E6%9C%89%E6%96%B9%E6%B3%95)
  - [`isinstance`](#isinstance)
  - [浅拷贝和深拷贝](#%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%92%8C%E6%B7%B1%E6%8B%B7%E8%B4%9D)
    - [浅拷贝](#%E6%B5%85%E6%8B%B7%E8%B4%9D)
    - [深拷贝](#%E6%B7%B1%E6%8B%B7%E8%B4%9D)
  - [使用无状态的函数](#%E4%BD%BF%E7%94%A8%E6%97%A0%E7%8A%B6%E6%80%81%E7%9A%84%E5%87%BD%E6%95%B0)
  - [迟绑定闭包](#%E8%BF%9F%E7%BB%91%E5%AE%9A%E9%97%AD%E5%8C%85)
  - [利用webbrowser控制浏览器](#%E5%88%A9%E7%94%A8webbrowser%E6%8E%A7%E5%88%B6%E6%B5%8F%E8%A7%88%E5%99%A8)
  - [特殊命名](#%E7%89%B9%E6%AE%8A%E5%91%BD%E5%90%8D)
  - [杂记](#%E6%9D%82%E8%AE%B0)
    - [Do not use & when you use multiply int](#do-not-use-&-when-you-use-multiply-int)
    - [Python2中的编码错误](#python2%E4%B8%AD%E7%9A%84%E7%BC%96%E7%A0%81%E9%94%99%E8%AF%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python踩坑笔记

### 函数的默认参数

函数的默认参数在Python中只会执行一次，即定义该函数的时候，默认参数会被初始化，之后在每次调用的时候，都会使用之前初始化过的参数。

```python
def fun(bar=[]):
	bar.append("bar")
	return bar

print(fun()) # ["bar"]
print(fun()) # ["bar", "bar"]
```

### 捕获多个异常

将多个类型的异常放进元组里，作为except的参数

```python
try:
	# do something
except (ValueError, IndexError) as e:
	print(e)
```

### Python中的变量名解析

Python中的变量名解析遵循按顺序查找的所谓的**LEGB原则**，也就是

- L：本地作用域
- E：上一层结构中`def`或`lambda`的本地作用域
- G：全局作用域
- B：内置作用域（Local，Enclosing，Global，Builtin）

一个关于全局变量和作用域的典型错误：

```python
x = 10
def fun():
	x += 1
	print(x)
fun()

# UnboundLocalError: local variable 'x' referenced before assignment
```

**因为当你在某个作用域内为变量赋值时，该变量被Python解释器自动视作该作用域的本地变量，并会取代任何上一层作用域中相同名称的变量**

### 通过列表解析式来避免在遍历列表时改变列表

```python
odd = lambda x : bool(x % 2)
numbers = [n for n in range(10)]
numbers = [n for n in numbers if not odd(n)] 
print(numbers) #[0, 2, 4, 6, 8]
```

### `print`

Python的`print`可以接受多个通过逗号间隔的参数，会在输出时通过空格链接。且在print输出的语句后面都会加入`\n`换行符

```python
print('this', 'is', 'a example')
print('test')
# this is a example
# test

# print函数
print(object, sep='',end='\n', file=None, flush=False)
```

print函数有四个关键字参数，其中sep代表字符串连接符，而end代表print输出完毕之后在末尾加入的符号。

PS.通过`string.strip()`可以去除末尾的换行符

### 最大递归深度设定

Python的最大递归深度为900+，超出这个范围之后返回如下错误：

```python
maximum recursion depth exceeded
```

解决方案：
手工设置递归调用深度

```python
import sys   
sys.setrecursionlimit(1000000) # 例如这里设置为一百万
```

### 生成器

创建generator：

- 把列表生成器的`[]`改为`()`

```python
g = (x * x for x in range(10))
print(g)
# <generator object <genexpr> at 0x1022ef630>
```

- 函数定义中包含`yield`关键字

generator和函数的执行流程不一样。函数是顺序执行，遇到return语句或者最后一行函数语句就返回。而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行

```python
def odd():
	print('step 1')
	yield(1)
	print('step 2')
	yield(3)
	print('step 3')
	yield(5)
	
o = odd()
next(o)
# step 1
# 1
next(o)
# step 2
# 3
next(o)
# step 3
# 5
```

### `dir`打印所有方法

内置函数`dir()`用于按模块名搜索模块定义，它返回一个字符串类型的存储列表。无参数调用时，`dir()`函数返回当前定义的命名

`dir()`不会列出内置函数和变量名

```python
import sys
print(dir(sys))
```

### `isinstance`

`isinstance(value, type)`
接受两个参数，判断第一个参数是否是第二个参数类型的。第二个参数还可以是一个元组，如果value是元组里面一个类型的实例，则返回True

```python
isinstance(2, int) # True
isinstance('2', (str, int)) # True
```

### 浅拷贝和深拷贝

#### 浅拷贝

`from copy import copy`

在 python 中，标识一个对象唯一身份的是：对象的id(内存地址)，对象类型，对象值，而浅拷贝就是创建一个具有相同类型，相同值但不同id的新对象。

浅拷贝可以完全拷贝一个扁平化的单层对象。但若对象包含了其他对象的引用，则拷贝的引用则完全相同。也就是说，对于嵌套的对象，内部引用的改变也就会造成拷贝结果的改变

```python
from copy import copy

# 单层数据拷贝安全
a = [1, 2, 3, 4, 5, 6]
b = copy(a)

a[0] = 0
print(a)
print(b)
# [0, 2, 3, 4, 5, 6]
# [1, 2, 3, 4, 5, 6]

# 单层数据拷贝安全
a = {
	'a': 1,
	'b': 2
}
b = copy(a)

a['a'] = 0
print(a)
print(b)
# {'a': 0, 'b': 2}
# {'a': 1, 'b': 2}

# 多层数据内部引用仅拷贝指针
a = {
	'a': [1, 2, 3, 4, 5, 6]
}
b = copy(a)

a['a'][0] = 0
print(a)
print(b)
# {'a': [0, 2, 3, 4, 5, 6], 'b': [1, 2, 3, 4, 5, 6]}
# {'a': [0, 2, 3, 4, 5, 6], 'b': [1, 2, 3, 4, 5, 6]}
```

#### 深拷贝

`from copy import deepcopy`

深拷贝不仅仅拷贝了原始对象自身，也对其包含的值进行拷贝，它会递归的查找对象中包含的其他对象的引用，来完成更深层次拷贝

```python
from copy import deepcopy

a = {
	'a': 1,
	'b': 2
}
b = deepcopy(a)

a['a'] = 0
print(a)
print(b)
# {'a': 0, 'b': 2}
# {'a': 1, 'b': 2}
```

深拷贝不会一直递归的查找所有对象，因为当对象引用了自身时，递归可能会导致无限循环。相反的，在拷贝时，Python 会对该对象做个标记，如果其他需要拷贝的对象引用了该对象，它们的拷贝将指向同一份拷贝

### 使用无状态的函数

尽量使用隐式上下文和副作用较小的函数与程序。

函数的隐式上下文由函数内部访问 到的所有全局变量与持久层对象组成。副作用即函数可能使其隐式上下文发生改变。如果函数保存或删除全局变量或持久层中数据，这种行为称为副作用

把有隐式上下文和副作用的函数与仅包含逻辑的函数(纯函数)谨慎地区分开来，会有如下好处：

- 纯函数的结果是确定的：给定一个输入，输出总是固定相同
- 当需要重构或优化时，纯函数更易于更改或替换
- 纯函数更容易做单元测试：很少需要复杂的上下文配置和之后的数据清除工作
- 纯函数更容易操作、修饰和分发

### 迟绑定闭包

Python的闭包是 迟绑定 。 这意味着闭包中用到的变量的值，是在内部函数被调用时查询得到的。举个栗子：

```python
def create_multipliers():
    return [lambda x : i * x for i in range(5)]

for multiplier in create_multipliers():
    print multiplier(2)

# 结果输出
# 8
# 8
# 8
# 8
# 8
# 而不是
# 0
# 2
# 4
# 6
# 8
# 不论任何返回的函数是如何被调用的，i的值是调用时在周围作用域中查询到的。接着，循环完成，i的值最终变成了4
```

可以通过创建一个立即绑定参数的闭包结果上述问题：

```python
def create_multipliers():
    return [lambda x, i=i : i * x for i in range(5)]
```

### 利用webbrowser控制浏览器

```python
import webbrowser

# 使用默认浏览器打开页面
webbrowser.open(url)
# 新建一个浏览器打开页面
webbrowser.open_new(url)
# 在新tab里打开页面
webbrowser.open_new_tab(url)

# 指定浏览器类型
webbrowser.get('firefox')
```

### 特殊命名

`__foo__` 一种约定,Python内部的名字,用来区别其他用户自定义的命名,以防冲突.

`_foo`一种约定,用来指定变量私有.程序员用来指定私有变量的一种方式.

`__foo`这个有真正的意义:解析器用`_classname__foo`来代替这个名字,以区别和其他类相同的命名.

### 杂记

#### Do not use & when you use multiply int

当使用`&`作为`if`的比较条件时，如果使用多个int类型的变量，例如`1 & 2`，则无法正确判断

```python
a = 1
b = 2
if a & b:
	print('true')
else:
	print('false')
# false
```

而使用`and`则可以正确判断：

```python
a = 1
b = 2
if a and b:
	print('true')
else:
	print('false')
# true
```

个人理解，Python在运行时把&当做“交集"进行处理了，所以在a、b相等时可以正确判断

#### Python2中的编码错误

可参考：

[Python2中的编码错误](https://www.zybuluo.com/zwenqiang/note/21851)

[PYTHON-进阶-编码处理小结](http://www.wklken.me/posts/2013/08/31/python-extra-coding-intro.html)

究极处理方案：

```python
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
```