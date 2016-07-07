<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python及应用2-类/库/对象](#python%E5%8F%8A%E5%BA%94%E7%94%A82-%E7%B1%BB%E5%BA%93%E5%AF%B9%E8%B1%A1)
  - [Python标准库](#python%E6%A0%87%E5%87%86%E5%BA%93)
    - [`setdefault()`&`defaultdict()`](#setdefault&defaultdict)
    - [`Counter`](#counter)
    - [`OrderedDict()`](#ordereddict)
    - [`deque`双端队列](#deque%E5%8F%8C%E7%AB%AF%E9%98%9F%E5%88%97)
    - [`namedtuple`](#namedtuple)
    - [`itertools`迭代代码结构](#itertools%E8%BF%AD%E4%BB%A3%E4%BB%A3%E7%A0%81%E7%BB%93%E6%9E%84)
  - [类和对象](#%E7%B1%BB%E5%92%8C%E5%AF%B9%E8%B1%A1)
    - [类的定义和初始化](#%E7%B1%BB%E7%9A%84%E5%AE%9A%E4%B9%89%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96)
    - [类的继承](#%E7%B1%BB%E7%9A%84%E7%BB%A7%E6%89%BF)
    - [使用`property`对特性进行访问和设置](#%E4%BD%BF%E7%94%A8property%E5%AF%B9%E7%89%B9%E6%80%A7%E8%BF%9B%E8%A1%8C%E8%AE%BF%E9%97%AE%E5%92%8C%E8%AE%BE%E7%BD%AE)
    - [使用名称重整保护私有特性](#%E4%BD%BF%E7%94%A8%E5%90%8D%E7%A7%B0%E9%87%8D%E6%95%B4%E4%BF%9D%E6%8A%A4%E7%A7%81%E6%9C%89%E7%89%B9%E6%80%A7)
    - [方法/属性的类型](#%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7%E7%9A%84%E7%B1%BB%E5%9E%8B)
    - [通过`__slots__`限制类实例的属性](#%E9%80%9A%E8%BF%87__slots__%E9%99%90%E5%88%B6%E7%B1%BB%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7)
  - [`__init__`](#__init__)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python及应用2-类/库/对象

### Python标准库

如果一个模块已经被引用了，Python可以做到不再次进行引用

#### `setdefault()`&`defaultdict()`

```python
d.setdefault(key, defaultvalue)
# 如果键不存在字典中，则会被赋予默认值。否则不会改变原有的键值

from collection import defaultdict
defaultdict(fun)
# 以函数作为参数，它返回赋给缺失的键值
# e.g.
from collections import defaultdict
dic = defaultdict(int)
print(dic['d']) # 0

# 可以搭配lambda来赋予初始值
defaultdict(lambda: 'no-value')
```

#### `Counter`

以一个列表作为参数，返回一个Counter对象，其内部是`{元素: 元素在列表中出现次数}`，e.g.

```python
from collections import Counter
example_list = ['a', 'b', 'a', 'c']
Counter(example_list) # 返回Counter({'a': 2, 'b': 1, 'c': 1})
```

`Counter`支持一些类似集合的运算：

```python
from collections import Counter
example_list1 = ['a', 'b', 'a', 'c']
example_list2 = ['a', 'a', 'a', 'b']

# + 计数器相加
Counter(example_list1) + Counter(example_list2)
# Counter({'a': 5, 'b': 2, 'c': 1})

# - 第一个计数器有，而第二个没有的元素
Counter(example_list1) - Counter(example_list2) 
# Counter({'c': 1})

# & 交集，取两者共有的项的较小计数
Counter(example_list1) & Counter(example_list2)
# Counter({'a': 2, 'b': 1})

# | 并集，相同的元素则取较大的计数
Counter(example_list1) | Counter(example_list2)
# Counter({'a': 3, 'b': 1, 'c': 1})
```

#### `OrderedDict()`

有序字典，记忆字典键添加的顺序，然后从一个迭代器按照相同的顺序返回。e.g.

```python
from collections import OrderedDict
example_dict = {
  'a': 1,
  'b': 2,
  'c': 3
}

for key in OrderedDict(example_dict):
	print(key)
# a
# b
# c
```

#### `deque`双端队列

```python
from collections import deque
```

传入一个序列，返回一个双端队列。

- `popleft()` 可去掉最左边的项并返回该项
- `pop()` 去掉最右边的项并返回该项
- `append()`
- `appendleft()` 把元素加在左边

- `rotate()` 队列的旋转操作

`rotate`参数为正时，由队列尾开始往前，依次把元素移动到队列首部，直到移动参数数目的元素；
`rotate`参数为负时，由队列首开始往后，依次把元素移动到队列尾部，直到移动参数数目的元素

```python
from collections import deque

d = deque(range(5))
print(d) # deque([0, 1, 2, 3, 4])
d.rotate(2)
print(d) # deque([3, 4, 0, 1, 2])
d.rotate(5)
print(d) # deque([3, 4, 0, 1, 2]) 当参数大于等于列表长度的时候则无效

d2 = deque(range(5))
print(d2) # deque([0, 1, 2, 3, 4])
d2.rotate(-2)
print(d2) # deque([2, 3, 4, 0, 1])
d2.rotate(-5)
print(d2) # deque([2, 3, 4, 0, 1]) 当参数的绝对值大于等于列表长度的时候则无效
```

可以通过关键字参数`maxlen`来限制一个双端数列的大小

```python
d = deque(maxlen=30)

```

#### `namedtuple`

命名元组。通过命名元组创建的对象具有元祖的特性，而且可以通过位置索引&键值索引获取到元组内的数据。

```python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])

p = Point(1, 2)
print(p) # Point(x=1, y=2)
p.x # 1
p.y # 2
p[0], p[1] # (1, 2)
x, y = p
x, y # (1, 2)
```

#### `itertools`迭代代码结构

```python
import itertools

# itertools.chain(list1, list2....) 将多个列表进行迭代
for item in itertools.chain([1, 2], ['a', 'b', 'c']):
	print(item)
# 1
# 2
# a
# b
# c

# itertools.cycle() 在传入的参数间无限迭代
for item in itertools.cycle([1, 2]):
	print(item)
# 1
# 2
# 1
# 2
# ....

# itertools.accumulate() 计算累积的值。默认情况下累加。也可以传入一个函数作为第二个参数，该函数必须接受两个参数，返回单个结果
for item in itertools.accumulate([1, 2, 3, 4]):
	print(item)
# 1
# 3
# 6
# 10

for item in itertools.accumulate([1, 2, 3, 4], lambda a, b: a * b):
	print(item)
# 1
# 2
# 6
# 24
```

### 类和对象

#### 类的定义和初始化

```python
class Animal():
	def __init__(self, name):
		self.name = name
```

#### 类的继承

在子类中定义`__init__`方法时，父类的`__init__`方法会被覆盖。因此，在子类中父类的初始化方法并不会被自动调用，必须显式的调用它。

```python
class Person(Animal):
	def __init__(self, name, type):
		super().__init__(name) # 调用父类的方法
		self.type = type
```

#### 使用`property`对特性进行访问和设置

Python里所有的特性(attribute)都是公开的。可以创建getter和setter方法。利用属性(property)，限制对特性的直接访问。

- 通过`property(getter, setter)`

property的第一个参数为getter方法，第二个参数为setter方法

```python
class Animal():
	def __init__(self, name):
		self.hiden_name = name
	def get_name(self):
		print('get my name')
		return self.hiden_name
	def set_name(self):
		print('set my name')
		return self.hiden_name
	name = property(get_name, set_name) # 把getter和setter方法定义为了name属性
```

当尝试访问Animal类对象的name特性时，`get_name()`会被自动调用。当手动赋值修改对象的name特性时，则`set_name`会被自动调用

```python
animal = Animal('human')
animal.name
# get my name
# human
animal.name = 'man'
# set my name
# man
```

- 通过`@property`和`@name.setter`修饰符

`@property`用于指示`getter`方法
`@name.setter`用于指示setter方法

```python
class Animal():
	def __init__(self, name):
		self.hiden_name = name
		
	@property
	def name(self):
		print('get my name')
		return self.hiden_name
		
	@name.setter # 如果设定的是其他属性，例如sex，则使用 @sex.setter
	def name(self, new_name):
		print('set my name')
		self.hiden_name = new_name

animal = Animal('monkey')
animal.name
# get my name
```

若不定义`@name.setter`，则name是一个只读属性

#### 使用名称重整保护私有特性

**使用`__`作为命名的开头使其对外不可见**

```python
class Human():
	def __init__(self, name):
		self.__name = name

human = Human('ecmadao')
print(human.__name) # 报错
# 但也不是完全不可见
print(human._Human__name) # ecmadao
```

注：同时以`__`作为开头和结尾的变量不是私有变量，而是特殊变量，特殊变量是可以直接访问的

#### 方法/属性的类型

- 实例方法
- 实例属性

以`self`作为第一个参数的方法/属性。

- 类方法
- 类属性

类方法作用于整个类，对类作出的任何改变都会对它的**所有实例对象**产生影响。类方法的第一个参数是**类本身`cls`**，并使用前缀修饰符`@classmethod`

而类属性则直接写在类内部，不需要self。**当我们定义了一个类属性后，这个属性虽然归类所有，但类的所有实例都可以访问到**

- 静态方法

不会影响类也不会影响类实例的方法，具有独立性，使用前缀修饰符`@staticmethod`

```python
class A():
	count = 0 # 类属性
	def __init__(self):
		A.count += 1
		
	@classmethod
	def kids(cls):
		print('A has', cls.count, 'objects')
	
	@staticmethod
	def intro():
		print('this is a example')

a1 = A()
a2 = A()
a3 = A()
A.kids()
# A has 3 objects
```
#### 通过`__slots__`限制类实例的属性

Python作为动态语言，可以在运行的时候动态的给类的实例添加新的属性：

```python
class Test(object):
    def __init__(self, name):
        self.name = name
test = Test('ecmadao')
test.age = 24
print(test.age) # 24
```

通过`__slots__`，则可以限制类实例所能够绑定的属性：

```python
class Test(object):
    __slots__ = ('name', 'age')
    def __init__(self, name):
        self.name = name
test = Test('ecmadao')
test.age = 24
test.job = 'developer'
# AttributeError: 'Test' object has no attribute 'job'
```

### `__init__`

[Python导入模块的几种姿势](http://codingpy.com/article/python-import-101/)

[python import备忘笔记](http://littlewhite.us/archives/361)