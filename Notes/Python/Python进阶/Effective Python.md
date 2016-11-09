<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Effective Python](#effective-python)
  - [Pythonic](#pythonic)
    - [列表切割](#%E5%88%97%E8%A1%A8%E5%88%87%E5%89%B2)
    - [列表推导式](#%E5%88%97%E8%A1%A8%E6%8E%A8%E5%AF%BC%E5%BC%8F)
    - [迭代](#%E8%BF%AD%E4%BB%A3)
    - [`try/except/else/finally`](#tryexceptelsefinally)
  - [函数](#%E5%87%BD%E6%95%B0)
    - [使用生成器](#%E4%BD%BF%E7%94%A8%E7%94%9F%E6%88%90%E5%99%A8)
    - [使用位置参数](#%E4%BD%BF%E7%94%A8%E4%BD%8D%E7%BD%AE%E5%8F%82%E6%95%B0)
    - [使用关键字参数](#%E4%BD%BF%E7%94%A8%E5%85%B3%E9%94%AE%E5%AD%97%E5%8F%82%E6%95%B0)
    - [关于参数的默认值](#%E5%85%B3%E4%BA%8E%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC)
  - [类](#%E7%B1%BB)
    - [`__call__`](#__call__)
    - [`@classmethod` & `@staticmethod`](#classmethod-&-staticmethod)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Effective Python

> 部分提炼自书籍：《Effective Python》&《Python3 Cookbook》，但也做出了部分修改，并加上了我自己的理解和运用中的最佳实践

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

#### `try/except/else/finally`

- 如果`try`内没有发生异常，则调用`else`内的代码
- `else`会在`finally`之前运行
- 最终一定会执行`finally`，可以在其中进行清理工作

### 函数

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
for i in indexs:
	print(i)
```

如果你还是需要一个列表，那么可以将函数的调用结果作为参数，再调用`list`方法

```python
results = get_a_indexs('this is a test to check a')
results_list = list(results)
```

但是需要注意的是，迭代器只能迭代一轮，一轮之后重复调用是无效的。解决这种问题的方法是，你可以定义一个可迭代的容器类：

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
indexs = LoopIter(string)
print('loop 1')
for _ in indexs:
	print(_)

print('loop 2')
for _ in indexs:
	print(_)
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

但要注意的是，不定长度的参数`args`在传递给函数时，需要先转换成元组`tuple`。这意味着，如果你将一个生成器作为参数带入到函数中，生成器将会先遍历一遍，转换为元组。这可能会消耗大量内存：

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

- 普通的方式

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

- 使用*Python3*中强制关键字参数的方式

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

- 使用*Python2*中强制关键字参数的方式

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

也就是说，如果给某参数赋予动态的值（ 比如 [] 或者 {} ），则如果之后在调用函数的时候给参数赋予了其他参数，则以后再调用这个函数的时候，之前定义的默认值将会改变，成为上一次调用时赋予的值：

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