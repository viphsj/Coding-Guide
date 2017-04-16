<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Effective Python](#effective-python)
  - [Pythonic](#pythonic)
    - [列表切割](#%E5%88%97%E8%A1%A8%E5%88%87%E5%89%B2)
    - [列表推导式](#%E5%88%97%E8%A1%A8%E6%8E%A8%E5%AF%BC%E5%BC%8F)
    - [迭代](#%E8%BF%AD%E4%BB%A3)
    - [反向迭代](#%E5%8F%8D%E5%90%91%E8%BF%AD%E4%BB%A3)
    - [`try/except/else/finally`](#tryexceptelsefinally)
  - [函数](#%E5%87%BD%E6%95%B0)
    - [使用装饰器](#%E4%BD%BF%E7%94%A8%E8%A3%85%E9%A5%B0%E5%99%A8)
    - [使用生成器](#%E4%BD%BF%E7%94%A8%E7%94%9F%E6%88%90%E5%99%A8)
    - [可迭代对象](#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1)
    - [使用位置参数](#%E4%BD%BF%E7%94%A8%E4%BD%8D%E7%BD%AE%E5%8F%82%E6%95%B0)
    - [使用关键字参数](#%E4%BD%BF%E7%94%A8%E5%85%B3%E9%94%AE%E5%AD%97%E5%8F%82%E6%95%B0)
    - [关于参数的默认值](#%E5%85%B3%E4%BA%8E%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC)
  - [类](#%E7%B1%BB)
    - [`__slots__`](#__slots__)
    - [`__call__`](#__call__)
    - [`@classmethod` & `@staticmethod`](#classmethod--staticmethod)
    - [创建上下文管理器](#%E5%88%9B%E5%BB%BA%E4%B8%8A%E4%B8%8B%E6%96%87%E7%AE%A1%E7%90%86%E5%99%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Effective Python

> 部分提炼自书籍：《Effective Python》&《Python3 Cookbook》，但也做出了修改，并加上了我自己的理解和运用中的最佳实践

### Pythonic

#### 列表切割

> `list[start:end:step]`

- 如果从列表开头开始切割，那么忽略 start 位的 0，例如`list[:4]`
- 如果一直切到列表尾部，则忽略 end 位的 0，例如`list[3:]`
- 切割列表时，即便 start 或者 end 索引跨界也不会有问题
- 列表切片不会改变原列表。索引都留空时，会生成一份原列表的拷贝

```python
b = a[:]
assert b == a and b is not a # true
```

#### 列表推导式

- 使用列表推导式来取代`map`和`filter`

```python
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# use map
squares = map(lambda x: x ** 2, a)
# use list comprehension
squares = [x ** 2 for x in a]
# 一个很大的好处是，列表推导式可以对值进行判断，比如
squares = [x ** 2 for x in a if x % 2 == 0]
# 而如果这种情况要用 map 或者 filter 方法实现的话，则要多写一些函数
```

- 不要使用含有两个以上表达式的列表推导式

```python
# 有一个嵌套的列表，现在要把它里面的所有元素扁平化输出
list = [[
  [1, 2, 3],
  [4, 5, 6]
]]
# 使用列表推导式
flat_list = [x for list0 in list for list1 in list0 for x in list1]
# [1, 2, 3, 4, 5, 6]

# 可读性太差，易出错。这种时候更建议使用普通的循环
flat_list = []
for list0 in list:
	for list1 in list0:
		flat_list.extend(list1)
```

- 数据多时，列表推导式可能会消耗大量内存，此时建议使用生成器表达式

```python
# 在列表推导式的推导过程中，对于输入序列的每个值来说，都可能要创建仅含一项元素的全新列表。因此数据量大时很耗性能。
# 使用生成器表达式
list = (x ** 2 for x in range(0, 1000000000))
# 生成器表达式返回的迭代器，只有在每次调用时才生成值，从而避免了内存占用
```

#### 迭代

- 需要获取 index 时使用`enumerate`
- `enumerate`可以接受第二个参数，作为迭代时加在`index`上的数值

```python
list = ['a', 'b', 'c', 'd']

for index, value in enumerate(list):
	print(index)
# 0
# 1
# 2
# 3

for index, value in enumerate(list, 2):
	print(index)
# 2
# 3
# 4
# 5
```

- 用`zip`同时遍历两个迭代器

```python
list_a = ['a', 'b', 'c', 'd']
list_b = [1, 2, 3]
# 虽然列表长度不一样，但只要有一个列表耗尽，则迭代就会停止
for letter, number in zip(list_a, list_b):
	print(letter, number)
# a 1
# b 2
# c 3
```

- `zip`遍历时返回一个元组

```python
a = [1, 2, 3]
b = ['w', 'x', 'y', 'z']
for i in zip(a,b):
	print(i)

# (1, 'w')
# (2, 'x')
# (3, 'y')
```

- 当列表不等长时，只要有一个耗尽，则不再迭代。

- 关于`for`和`while`循环后的`else`块
  - 循环**正常结束**之后会调用`else`内的代码
  - 循环里通过`break`跳出循环，则不会执行`else`
  - 要遍历的序列为空时，立即执行`else`

```python
for i in range(2):
	print(i)
else:
	print('loop finish')
# 0
# 1
# loop finish

for i in range(2):
	print(i)
	if i % 2 == 0:
		break
else:
	print('loop finish')
# 0
```

#### 反向迭代

对于普通的序列（列表），我们可以通过内置的`reversed()`函数进行反向迭代：

```python
list_example = [i for i in range(5)]
iter_example = (i for i in range(5)) # 迭代器
set_example = {i for i in range(5)} # 集合

# 普通的正向迭代
# for i in list_example

# 通过 reversed 进行反向迭代
for i in reversed(list_example):
	print(i)
# 4
# 3
# 2
# 1
# 0

# 但无法作用于 集合 和 迭代器
reversed(iter_example) # TypeError: argument to reversed() must be a sequence
```

除此以外，还可以通过实现类里的`__reversed__`方法，将类进行反向迭代：

```python
class Countdown:
    def __init__(self, start):
        self.start = start

    # 正向迭代
    def __iter__(self):
        n = self.start
        while n > 0:
            yield n
            n -= 1

    # 反向迭代
    def __reversed__(self):
        n = 1
        while n <= self.start:
            yield n
            n += 1

for i in reversed(Countdown(4)):
    print(i)
# 1
# 2
# 3
# 4
for i in Countdown(4):
    print(i)
# 4
# 3
# 2
# 1
```

#### `try/except/else/finally`

- 如果`try`内没有发生异常，则调用`else`内的代码
- `else`会在`finally`之前运行
- 最终一定会执行`finally`，可以在其中进行清理工作

### 函数

#### 使用装饰器

装饰器用于在不改变原函数代码的情况下修改已存在的函数。常见场景是增加一句调试，或者为已有的函数增加`log`监控

举个栗子：

```python
def decorator_fun(fun):
	def new_fun(*args, **kwargs):
		print('current fun:', fun.__name__)
		print('position arguments:', args)
		print('key arguments:', **kwargs)
		result = fun(*args, **kwargs)
		print(result)
		return result
	return new_fun
	
@decorator_fun
def add(a, b):
	return a + b

add(3, 2)
# current fun: add
# position arguments: (3, 2)
# key arguments: {}
# 5
```

除此以外，还可以编写接收参数的装饰器，其实就是在原本的装饰器上的外层又嵌套了一个函数：

```python
def read_file(filename='results.txt'):
	def decorator_fun(fun):
		def new_fun(*args, **kwargs):
			result = fun(*args, **kwargs)
			with open(filename, 'a') as f:
                f.write(result + '\n')
			return result
		return new_fun
	return decorator_fun

# 使用装饰器时代入参数
@read_file(filename='log.txt')
def add(a, b):
	return a + b
```

但是像上面那样使用装饰器的话有一个问题：

```python
@decorator_fun
def add(a, b):
	return a + b

print(add.__name__)
# new_fun
```

也就是说原函数已经被装饰器里的`new_fun`函数替代掉了。调用经过装饰的函数，相当于调用一个新函数。查看原函数的参数、注释、甚至函数名的时候，只能看到装饰器的相关信息。为了解决这个问题，我们可以使用 Python 自带的`functools.wraps`方法。

> [stackoverflow: What does functools.wraps do?](http://stackoverflow.com/questions/308999/what-does-functools-wraps-do)

`functools.wraps`是个很 hack 的方法，它本事作为一个装饰器，做用在装饰器内部将要返回的函数上。也就是说，它是装饰器的装饰器，并且以原函数为参数，作用是保留原函数的各种信息，使得我们之后查看被装饰了的原函数的信息时，可以保持跟原函数一模一样。

```python
from functools import wraps

def decorator_fun(fun):
	@wraps(fun)
	def new_fun(*args, **kwargs):
		result = fun(*args, **kwargs)
		print(result)
		return result
	return new_fun
	
@decorator_fun
def add(a, b):
	return a + b

print(add.__name__)
# add
```

此外，有时候我们的装饰器里可能会干不止一个事情，此时应该把事件作为额外的函数分离出去。但是又因为它可能仅仅和该装饰器有关，所以此时可以构造一个装饰器类。原理很简单，主要就是编写类里的`__call__`方法，使类能够像函数一样的调用。

```python
from functools import wraps

class logResult(object):
	def __init__(self, filename='results.txt'):
		self.filename = filename
	
	def __call__(self, fun):
		@wraps(fun)
		def new_fun(*args, **kwargs):
			result = fun(*args, **kwargs)
			with open(filename, 'a') as f:
                f.write(result + '\n')
			return result
		self.send_notification()
		return new_fun
	
	def send_notification(self):
		pass

@logResult('log.txt')
def add(a, b):
	return a + b
```

#### 使用生成器

> 考虑使用生成器来改写直接返回列表的函数

```python
# 定义一个函数，其作用是检测字符串里所有 a 的索引位置，最终返回所有 index 组成的数组
def get_a_indexs(string):
	result = []
	for index, letter in enumerate(string):
		if letter == 'a':
			result.append(index)
	return result
```

用这种方法有几个小问题：

- 每次获取到符合条件的结果，都要调用`append`方法。但实际上我们的关注点根本不在这个方法，它只是我们达成目的的手段，实际上只需要`index`就好了
- 返回的`result`可以继续优化
- 数据都存在`result`里面，如果数据量很大的话，会比较占用内存

因此，使用生成器`generator`会更好。生成器是使用`yield`表达式的函数，调用生成器时，它不会真的执行，而是返回一个迭代器，每次在迭代器上调用内置的`next`函数时，迭代器会把生成器推进到下一个`yield`表达式：

```python
def get_a_indexs(string):
	for index, letter in enumerate(string):
		if letter == 'a':
			yield index
```

获取到一个生成器以后，可以正常的遍历它：

```python
string = 'this is a test to find a\' index'
indexs = get_a_indexs(string)

# 可以这样遍历
for i in indexs:
	print(i)

# 或者这样
try:
	while True:
		print(next(indexs))
except StopIteration:
	print('finish!')

# 生成器在获取完之后如果继续通过 next() 取值，则会触发 StopIteration 错误
# 但通过 for 循环遍历时会自动捕获到这个错误
```

如果你还是需要一个列表，那么可以将函数的调用结果作为参数，再调用`list`方法

```python
results = get_a_indexs('this is a test to check a')
results_list = list(results)
```

#### 可迭代对象

需要注意的是，普通的迭代器，同一个实例只能迭代一轮，一轮之后重复调用是无效的。

```python
# 定义一个函数，把一个列表中的值依次迭代出去
def loop(items):
    for i in items:
        yield i

foo = loop([1, 2, 3, 4])
print(list(foo)) # 另其完成迭代
# output: [1, 2, 3, 4]
print(list(foo)) # 再次迭代
# output: []
```

解决这种问题的方法是，你可以**定义一个可迭代的容器类**：

```python
class LoopIter(object):
	def __init__(self, data):
		self.data = data
	# 必须在 __iter__ 中 yield 结果
	def __iter__(self):
		for index, letter in enumerate(self.data):
			if letter == 'a':
				yield index
```

这样的话，将类的实例迭代重复多少次都没问题：

```python
string = 'this is a test to find a\' index'
indexs = LoopIter(string)

print('loop 1')
for _ in indexs:
	print(_)
# loop 1
# 8
# 23

print('loop 2')
for _ in indexs:
	print(_)
# loop 2
# 8
# 23
```

但要注意的是，仅仅是实现`__iter__`方法的迭代器，只能通过`for`循环来迭代；想要通过`next`方法迭代的话则需要使用`iter`方法：

```python
string = 'this is a test to find a\' index'
indexs = LoopIter(string)

next(indexs) # TypeError: 'LoopIter' object is not an iterator

iter_indexs = iter(indexs)
next(iter_indexs) # 8
```

#### 使用位置参数

有时候，方法接收的参数数目可能不一定，比如定义一个求和的方法，至少要接收两个参数：

```python
def sum(a, b):
	return a + b

# 正常使用
sum(1, 2) # 3
# 但如果我想求很多数的总和，而将参数全部代入是会报错的，而一次一次代入又太麻烦
sum(1, 2, 3, 4, 5) # sum() takes 2 positional arguments but 5 were given
```

对于这种接收参数数目不一定，而且不在乎参数传入顺序的函数，则应该利用位置参数`*args`：

```python
def sum(*args):
	result = 0
	for num in args:
		result += num
	return result

sum(1, 2) # 3
sum(1, 2, 3, 4, 5) # 15
# 同时，也可以直接把一个数组带入，在带入时使用 * 进行解构
sum(*[1, 2, 3, 4, 5]) # 15
```

但要注意的是，**不定长度的参数`args`在传递给函数时，会首先自动转换成元组`tuple`**。这意味着，如果你将一个生成器作为参数带入到函数中，生成器将会先遍历一遍，转换为元组。这可能会消耗大量内存：

```python
def get_nums():
	for num in range(10):
		yield num

nums = get_nums()
sum(*nums) # 45
# 但在需要遍历的数目较多时，会占用大量内存
```

#### 使用关键字参数

- 关键字参数可提高代码可读性
- 可以通过关键字参数给函数提供默认值
- 便于扩充函数参数

**定义只能使用关键字参数的函数**

- 普通的方式，在调用时不会强制要求使用关键字参数

```python
# 定义一个方法，它的作用是遍历一个数组，找出等于(或不等于)目标元素的 index
def get_indexs(array, target='', judge=True):
	for index, item in enumerate(array):
		if judge and item == target:
			yield index
		elif not judge and item != target:
			yield index

array = [1, 2, 3, 4, 1]
# 下面这些都是可行的
result = get_indexs(array, target=1, judge=True)
print(list(result)) # [0, 4]
result = get_indexs(array, 1, True)
print(list(result)) # [0, 4]
result = get_indexs(array, 1)
print(list(result)) # [0, 4]
```

- 使用 *Python3* 中强制关键字参数的方式

```python
# 定义一个方法，它的作用是遍历一个数组，找出等于(或不等于)目标元素的 index
def get_indexs(array, *, target='', judge=True):
	for index, item in enumerate(array):
		if judge and item == target:
			yield index
		elif not judge and item != target:
			yield index

array = [1, 2, 3, 4, 1]
# 这样可行
result = get_indexs(array, target=1, judge=True)
print(list(result)) # [0, 4]
# 也可以忽略有默认值的参数
result = get_indexs(array, target=1)
print(list(result)) # [0, 4]
# 但不指定关键字参数则报错
get_indexs(array, 1, True)
# TypeError: get_indexs() takes 1 positional argument but 3 were given
```

- 使用 *Python2* 中强制关键字参数的方式

```python
# 定义一个方法，它的作用是遍历一个数组，找出等于(或不等于)目标元素的 index
# 使用 **kwargs，代表接收关键字参数，函数内的 kwargs 则是一个字典，传入的关键字参数作为键值对的形式存在
def get_indexs(array, **kwargs):
	target = kwargs.pop('target', '')
	judge = kwargs.pop('judge', True)
	for index, item in enumerate(array):
		if judge and item == target:
			yield index
		elif not judge and item != target:
			yield index

array = [1, 2, 3, 4, 1]
# 这样可行
result = get_indexs(array, target=1, judge=True)
print(list(result)) # [0, 4]
# 也可以忽略有默认值的参数
result = get_indexs(array, target=1)
print(list(result)) # [0, 4]
# 但不指定关键字参数则报错
get_indexs(array, 1, True)
# TypeError: get_indexs() takes 1 positional argument but 3 were given
```

#### 关于参数的默认值

算是老生常谈了：**函数的默认值只会在程序加载模块并读取到该函数的定义时设置一次**

也就是说，如果给某参数赋予动态的值（ 比如`[]`或者`{}`），则如果之后在调用函数的时候给参数赋予了其他参数，则以后再调用这个函数的时候，之前定义的默认值将会改变，成为上一次调用时赋予的值：

```python
def get_default(value=[]):
	return value
	
result = get_default()
result.append(1)
result2 = get_default()
result2.append(2)
print(result) # [1, 2]
print(result2) # [1, 2]
```

因此，更推荐使用`None`作为默认参数，在函数内进行判断之后赋值：

```python
def get_default(value=None):
	if value is None:
		return []
	return value
	
result = get_default()
result.append(1)
result2 = get_default()
result2.append(2)
print(result) # [1]
print(result2) # [2]
```

### 类

#### `__slots__`

默认情况下，Python 用一个字典来保存一个对象的实例属性。这使得我们可以在运行的时候动态的给类的实例添加新的属性：

```python
test = Test()
test.new_key = 'new_value'
```

然而这个字典浪费了多余的空间 --- 很多时候我们不会创建那么多的属性。因此通过`__slots__`可以告诉 Python 不要使用字典而是固定集合来分配空间。

```python
class Test(object):
	# 用列表罗列所有的属性
	__slots__ = ['name', 'value']
	def __init__(self, name='test', value='0'):
		self.name = name
		self.value = value

test = Test()
# 此时再增加新的属性则会报错
test.new_key = 'new_value'
# AttributeError: 'Test' object has no attribute 'new_key'
```

#### `__call__`

通过定义类中的`__call__`方法，可以使该类的实例能够像普通函数一样调用。

```python
class AddNumber(object):
	def __init__(self):
		self.num = 0

	def __call__(self, num=1):
		self.num += num

add_number = AddNumber()
print(add_number.num) # 0
add_number() # 像方法一样的调用
print(add_number.num) # 1
add_number(3)
print(add_number.num) # 4
```

通过这种方式实现的好处是，可以通过类的属性来保存状态，而不必创建一个闭包或者全局变量。

#### `@classmethod` & `@staticmethod`

资料：

- [Python @classmethod and @staticmethod for beginner](http://stackoverflow.com/questions/12179271/python-classmethod-and-staticmethod-for-beginner)
- [Difference between staticmethod and classmethod in python](http://pythoncentral.io/difference-between-staticmethod-and-classmethod-in-python/)

`@classmethod`和`@staticmethod`很像，但他们的使用场景并不一样。

- 类内部普通的方法，都是以`self`作为第一个参数，代表着通过实例调用时，将实例的作用域传入方法内；
- `@classmethod`以`cls`作为第一个参数，代表将类本身的作用域传入。无论通过类来调用，还是通过类的实例调用，默认传入的第一个参数都将是类本身
- `@staticmethod`不需要传入默认参数，类似于一个普通的函数

来通过实例了解它们的使用场景：

假设我们需要创建一个名为`Date`的类，用于储存 年/月/日 三个数据

```python
class Date(object):
	def __init__(self, year=0, month=0, day=0):
		self.year = year
		self.month = month
		self.day = day
	
	@property
	def time(self):
		return "{year}-{month}-{day}".format(
			year=self.year,
			month=self.month,
			day=self.day
		)
```

上述代码创建了`Date`类，该类会在初始化时设置`day/month/year`属性，并且通过`property`设置了一个`getter`，可以在实例化之后，通过`time`获取存储的时间：

```python
date = Date('2016', '11', '09')
date.time # 2016-11-09
```

但如果我们想改变属性传入的方式呢？毕竟，在初始化时就要传入年/月/日三个属性还是很烦人的。能否找到一个方法，在不改变现有接口和方法的情况下，可以通过传入`2016-11-09`这样的字符串来创建一个`Date`实例？

你可能会想到这样的方法：

```python
date_string = '2016-11-09'
year, month, day = map(str, date_string.split('-'))
date = Date(year, month, day)
```

但不够好：

- 在类外额外多写了一个方法，每次还得格式化以后获取参数
- 这个方法也只跟`Date`类有关
- 没有解决传入参数过多的问题

此时就可以利用`@classmethod`，在类的内部新建一个格式化字符串，并返回类的实例的方法：

```python
# 在 Date 内新增一个 classmethod
@classmethod
def from_string(cls, string):
	year, month, day = map(str, string.split('-'))
	# 在 classmethod 内可以通过 cls 来调用到类的方法，甚至创建实例
	date = cls(year, month, day)
	return date
```

这样，我们就可以通过`Date`类来调用`from_string`方法创建实例，并且不侵略、修改旧的实例化方式：

```python
date = Date.from_string('2016-11-09')
# 旧的实例化方式仍可以使用
date_old = Date('2016', '11', '09')
```

好处：

- 在`@classmethod`内，可以通过`cls`参数，获取到跟外部调用类时一样的便利
- 可以在其中进一步封装该方法，提高复用性
- 更加符合面向对象的编程方式

而`@staticmethod`，因为其本身类似于普通的函数，所以可以把和这个类相关的 helper 方法作为`@staticmethod`，放在类里，然后直接通过类来调用这个方法。

```python
# 在 Date 内新增一个 staticmethod
@staticmethod
def is_month_validate(month):
	return int(month) <= 12 and int(month) >= 1
```

将与日期相关的辅助类函数作为`@staticmethod`方法放在`Date`类内后，可以通过类来调用这些方法：

```python
month = '08'
if not Date.is_month_validate(month):
	print('{} is a validate month number'.format(month))
```

#### 创建上下文管理器

上下文管理器，通俗的介绍就是：在代码块执行前，先进行准备工作；在代码块执行完成后，做收尾的处理工作。`with`语句常伴随上下文管理器一起出现，经典场景有：

```python
with open('test.txt', 'r') as file:
	for line in file.readlines():
		print(line)
```

通过`with`语句，代码完成了文件打开操作，并在调用结束，或者读取发生异常时自动关闭文件，即完成了文件读写之后的处理工作。如果不通过上下文管理器的话，则会是这样的代码：

```python
file = open('test.txt', 'r')
try:
	for line in file.readlines():
		print(line)
finally:
    file.close()
```

比较繁琐吧？所以说使用上下文管理器的好处就是，通过调用我们预先设置好的回调，自动帮我们处理代码块开始执行和执行完毕时的工作。而通过自定义类的`__enter__`和`__exit__`方法，我们可以自定义一个上下文管理器。

```python
class ReadFile(object):
	def __init__(self, filename):
		self.file = open(filename, 'r')
	
	def __enter__(self):
		return self.file
	
	def __exit__(self, type, value, traceback):
		# type, value, traceback 分别代表错误的类型、值、追踪栈
		self.file.close()
		# 返回 True 代表不抛出错误
		# 否则错误会被 with 语句抛出
		return True
```

然后可以以这样的方式进行调用：

```python
with ReadFile('test.txt') as file_read:
	for line in file_read.readlines():
		print(line)
```

在调用的时候：

1. `with`语句先暂存了`ReadFile`类的`__exit__`方法
2. 然后调用`ReadFile`类的`__enter__`方法
3. `__enter__`方法打开文件，并将结果返回给`with`语句
4. 上一步的结果被传递给`file_read`参数
5. 在`with`语句内对`file_read`参数进行操作，读取每一行
6. 读取完成之后，`with`语句调用之前暂存的`__exit__`方法
7. `__exit__`方法关闭了文件

要注意的是，在`__exit__`方法内，我们关闭了文件，但最后返回`True`，所以错误不会被`with`语句抛出。否则`with`语句会抛出一个对应的错误。