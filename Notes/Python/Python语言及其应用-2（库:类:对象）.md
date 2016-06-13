## Python语言及其应用-2(库/类/对象)

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

---

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

---

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

---

#### `deque`双端队列

```python
from collections import deque
```

传入一个序列，返回一个双端队列。其具有`popleft()`方法，可去掉最左边的项并返回该项；也有`pop()`方法，去掉最右边的项并返回该项

---

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

