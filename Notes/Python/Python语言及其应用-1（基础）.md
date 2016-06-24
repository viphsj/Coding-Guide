## Python语言及其应用-1(基础)

### 数字、字符串和变量

**赋值只是对对象的引用而不是对象本身**

强制类型转换：

- `int(params)`
- `float(params)`
- `str(params)`

判断变量类型：

```python
isinstance(params, type)
a = list()
isinstance(a, list) # True
```


字符串操作：

- 使用`*`进行复制

- 字符串不可变

```python
name = 'ecmadao'
name[0] = 'm';
# ERROR
```

- 使用`[start:end:step]`分片
  - 右侧end从-1开始依次减小
  - `[0:]`和`[0: -1]`都是提取整个字符串
  - 设定step为-1可以用于反转字符串
- `len(params)`获取长度

- `str.split(params)` 将String通过params进行分割成为列表
- `params.join(list)` 将一个list通过params进行连接成为字符串

---

- `str.startswith(params)` 以..开头
- `str.endswith(params)` 以..结尾

- `str.find(params)` 寻找指定参数第一次出现的位置
- `str.rfind(params)` 寻找指定参数最后一次出现的位置

- `str.count(params)` 指定参数在字符串中出现的次数
- `str.isalnum()` 字符串中的组成元素是否全是数字

- `str.strip(params)` 删除字符串结尾的指定元素(全部)

```python
name = "ecmadao....."
name.strip('.')
print(name) # ecmadao
```

---

- `str.capitalize()` 字符串的首字母变大写
- `str.title()` 字符串中所有单词的首字母都大写
- `str.upper()` 所有字母都大写
- `str.lower()` 所有字母都小写
- `str.swapcase()` 字符串大小写调转

- `str.replace(target, replace, max)` replace字符串中target元素，最多修改max处

- `str.strip()` 去除string两侧的空格(含tab)
- `str.rstrip()` 去除string右侧的空格(含tab)
- `str.lstrip()` 去除string左侧的空格(含tab)

### 列表和元组

列表和元组（tuple）中的元素可以是任意类型的Python数据对象。
元组不可变，列表可变

####  列表

- `list()` 创建一个空列表
- `list(str)` 将string类型的数据转换为列表

- `list[start:end:step]` 列表切片，不包含位于end-index的元素

```python
# 列表切片不会改变原有列表，而是生成新的列表
old_list = [0, 1, 2, 3, 4]
# list切片
new_list = old_list[0:2] # [0, 1]
print(old_list) # [0, 1, 2, 3, 4]

# list逆序排列
new_list = old_list[::-1] # [4, 3, 2, 1, 0]

# 可以通过切片赋空值的形式达到删除的效果
old_list[0:2] = []
print(old_list) # [2, 3, 4]
# 或者del进行删除
del old_list[0:1]
print(old_list) # [3, 4]
```

---

- `list.append(params)`
- `list.extend(list2)` 合并列表
- `list += list2` 合并列表

---

- `list.insert(index, params)` 在指定位置上插入元素
- `del list[index]` 删除指定位置的元素。当列表中一个元素被删除之后，位于它后面的元素会自动向前补充，列表长度减一
- `list.remove(params)` 删除指定元素
- `list.pop()` 获取并删除指定位置的元素

```python
# pop(0)返回列表的头元素，pop()或pop(-1)则返回列表的尾元素
old_list = [0, 1, 2, 3, 4]
old_list.pop() # 4
print(old_list) # [0, 1, 2, 3]
```

---

- `list.index(params)` 查询指定元素所在的位置(仅匹配第一个)
- `params in list` 判断元素是否存在于列表中
- `list.count(params)` 记录某个特定值在列表中出现的次数

---

- `list.sort()` 对列表进行排序，改变原有列表
- `list.sorted()` 返回排好序的列表副本，不改变原有列表
- `sort(reverse = True)` 默认的排序为升序，将reverse设为True则可进行倒序排列

**如果将一个列表赋值给了多个变量，改变其中的任何一处，则会造成其他变量对应的值也被改变**
```python
a = [1, 2, 3]
b = a
a[0] = 4
print(b) # [4, 2, 3]
```

**通过拷贝一份列表，可以避免以上情况**
```python
# old_list.copy()
# list(old_list)
# old_list[:]
a = [1, 2, 3]
b = a.copy()
# or b = list(a)
# or b = a[:]
a[0] = 4
print(b) # [1, 2, 3]
```

#### 元组

- `()` 创建空元组
- `a, b = ('example', 'example2')` 解构元组
- `tuple(list)` 将list转换为元组

创建包含一个或多个元素的元组时，每一个元素后面都需要跟着一个逗号。如果多于一个元素，则最后的那个逗号可以省略。

**创建元组**

```python
# 创建空元组
empty_tuple = ()
empty_tuple = tuple()

example_tuple = 'example0', 'example1', 'example2'

# 创建单一元组
sinple_tuple = 'example',
# 注：在创建单一元组时，将值放在括号内不会创建元组
sinple_tuple = ('example')
print(type(sinple_tuple)) # str
```

**解构元组**

```python
a, b, c = example_tuple # 将元组里的值赋值给变量 -- 元组解包
a, b, *rest = range(10)
a # 0
b # 1
rest # [2, 3, 4, 5, 6, 7, 8, 9]

first, second, *rest, last = range(10)
last # 9
```

**元组在函数中的运用**

```python
# 该函数可以接受任意长度的参数，并在函数内部组建成为元组的形式
def print_all(*args):
	print(args)
print_all(1, 2, 3, 4) # (1, 2, 3, 4)

# 将元组分散后传入函数
def print_two(a, b):
	print(a)
	print(b)
print_two(*(1, 2))
# 1
# 2

# 当函数返回多个参数时。。
def return_multiply():
	# do something
	return a, b
# 返回值是元组的形式
# example:
def return_multiply(*args):
	a, b = args
	return a, b

result = return_multiply(1, 2)
print(type(result)) # <class 'tuple'>
print(result) # (1, 2)
```

### 字典与集合

#### 字典

- `dict()` 将包含双值子序列的序列转换为字典
```python
example = [('a', 'b'), ('c', 'd')]
# or (('a', 'b'), ('c', 'd'))
dict(example)
# {'a': 'b', 'c': 'd'}

example2 = ['ab', 'cd']
# or ('ab', 'cd')
dict(examples)
# {'a': 'b', 'c': 'd'}
```

---

- `d1.update(d2)` 将字典d2合并到字典d1中，若有重复的键，则新归入字典的值会取代原有的值
- `d.clear()` 删除字典中全部元素
- `in` 判断某个键是否存在于字典中
- `d.copy()` 浅拷贝，只复制字典中的父对象，对子对象采用引用的方法
- `d.deepcopy()` 深拷贝，新字典的改变不会影响原来的字典

---

获取字典中的元素

- `d.[key]` 
- `d.get(key, defaultValue)` 获取指定key的value，并指定了默认值
- `d.keys()` 获取所有键组成的list
- `d.values()` 获取所有值组成的list
- `d.items()` 获取所有键值对，返回一个list，里面的元素是(键，值)组成的元组

当使用`d.[key]`获取字典中不存在的元素时会报错

---

字典的格式化字符串

通过`'%(key)s' % dict`，可以取出字典中对应key的value

```python
dict_example = {
  'a': 1,
  'b': 2
}
print('a is %(a)s but b is %(b)s' % dict_example)
# a is 1 but b is 2
```


#### 集合

类似于舍弃了值，仅剩下键的字典

- `set()` 创建空集合。**不能使用`{}`创建，它创建的是个空字典**
- `set(str/list/tuple)` 将字符串/列表/元组转换为集合，不会包含重复元素
- `set(dic)` 把字典转为集合时，只有键会被使用

---

集合的合并

**获取交集**
`&` or `a.intersection(b)`

**获取并集**
`|` or `a.union(b)`

**获取差集**(出现在第一个集合而没有在第二个集合中的元素)
`-` or `a.difference(b)` 

**判断包含关系**
`<=` or `a.issubset(b)` 判断a是否是b的子集
`>=` or `a.issuperset(b)` 判断b是否是a的子集

### 代码结构

#### 迭代

##### `for`迭代

**列表、字符串、元组、字典、集合都是可迭代对象。**

对一个字典进行迭代将会返回字典中的键。如果想对字典的值进行迭代，可以使用字典的`values()`函数：
```python
for value in example_dict.values():
```

而如果想返回`(key: value)`的元组形式，则可以使用字典的`items()`函数：
```python
for item in example_items():
	print(item) # (key: value)
```

##### `enumerate`创建迭代器

对于list，`for..in..`循环只能迭代value，无法或许index。此时，可以通过`enumerate`创建一个迭代器：

```python
example_list = [1, 2, 3]
for index, value in enumerate(example_list):
	print(index, ':', value)
# 0 : 1
# 1 : 2
# 2 : 3
```

`enumerate`还可以接受第二个参数，表示index的起始值：

```python
example_list = [1, 2, 3]
for index, value in enumerate(example_list, 1):
	print(index, ':', value)
# 1 : 1
# 2 : 2
# 3 : 3
```

##### `zip()`

该函数可以遍历多个序列，在具有**相同位移**的项之间创建**元组**

```python
list1 = [1, 2, 3, 4]
tuple1 = [a, b, c, d]
list(zip(list1, tuple1)) # [(1, a), (2, b), (3, c), (4, d)]
```

`zip()`生成的结果既不是列表也不是元组，而是一个整合在一起的可迭代变量。可通过`list()`，`dict()`等方法进一步处理

```python
dict(zip('ab', range(2))) # {'a': 0, 'b': 1}

# 压缩与解压缩
tuple_1 = ('a', 'b', 'c')
tuple_2 = (1, 2, 3)

zip_1 = zip(tuple_1, tuple_2) # [('a', 1), ('b', 2), ('c', 1)]
zip_2 = zip(*zip_1) # [('a', 'b', 'c'), (1, 2, 3)]

# 用zip反转dict
m = {'a': 1, 'b': 2, 'c': 3, 'd': 4}
m.items() # [('a', 1), ('c', 3), ('b', 2), ('d', 4)]
zip(m.values(), m.keys()) # [(1, 'a'), (3, 'c'), (2, 'b'), (4, 'd')]
m_reverse = dict(zip(m.values(), m.keys())) # {1: 'a', 2: 'b', 3: 'c', 4: 'd'}
```

##### `range(start, end, step)`

返回在特定区间的自然数序列，生成的是一个可循环对象

```python
list(range(2, -1, -1)) # [2, 1, 0]
list(range(0, 11, 2)) # [0, 2, 4, 6, 8, 10]
```

##### `map()`

`map(fun, sequence[, sequence...])`
根据提供的函数对指定序列做映射，返回一个可迭代对象

```python
x = map(lambda x: x * 2, [1, 2, 3, 4])
for i in x:
	print(i)
# 2
# 4
# 6
# 8

def abc(a, b, c):
	return a * 100 + b * 10 + c

list1 = [9, 8, 7]
list2 = [9, 8, 7]
list3 = [9, 8, 7]

for i in map(abc, list1, list2, list3):
	print(i)
# 999
# 888
# 777
```

```python
# map不仅仅可以接受变量参数list，也可以接受函数list

def multiply(x):
	return x * x

def add(x):
	return x + x

funs = [multiply, add]
for i in range(5):
	value = map(lambda x: x(i), funs)
	print(list(value))

# [0, 0]
# [1, 2]
# [4, 4]
# [9, 6]
# [16, 8]
```

##### `filter()`

`filter(fun, sequence)`
第一个参数为函数，接收一个参数并返回一个布尔值

```python
def larger_than_ten(a):
	return a > 10
	
list1 = [10, 11, 9, 8, 7]

for i in filter(larger_than_ten, list1):
	print(i)
# 11
```

##### `reduce()`

```python
from functools import reduce
reduce(fun, sequence[, initial])
# fun是一个接收两个参数的函数
# 提供initial参数，会以sequence中的第一个元素和initial作为参数调用fun
```

```python
from functools import reduce

def add(x, y):
	return x + y
	
list1 = [1, 2, 3, 4]
result = reduce(add, list1)
print(result)
# 10
result2 = reduce(add, list1, 10)
print(result2)
# 20
```

#### 列表推导式

`[expression for item in iterable if condition]`

expression为符合condition条件的列表生成值。e.g.

```python
# example_1
number_list = [number for number in range(1, 6) if number % 2 == 1]
print(number_list) # [1, 3, 5]

# example_2
# 嵌套列表推导式
rows = range(1, 4)
cols = range(1, 3)
cells = [(row, col) for row in rows for col in cols]
# by the way, for row...和for col...都可以有自己的if判断
print(cells) # [(1, 1), (1, 2), (2, 1), (2, 2), (3, 1), (3, 2)]
```

#### 字典推导式

`{key_expression: value_expression for expression in iterable if condition}`

```python
word = 'letter'
letter_counts = {letter: word.count(letter) for letter in set(word)}
# 在set(word)中遍历，避免了重复元素的遍历
print(letter_counts) # {'r': 1, 'l': 1, 't': 2, 'e': 2}
```

#### 集合推导式

`{expression for expression in iterable if condition}`

```python
new_set = {number for number in range(1, 6) if number % 3 == 1}
print(new_set) # {1, 4}
```

#### 条件表达式

```python
a = x if True else y

# 一个阶乘函数的递归版本
def factorial(n):
	return 1 if n == 0 else n * factorial(n-1)

# 用条件表达式处理默认参数
def fun(params=None):
	params = params if params != None else 1
	print(params)

fun() # 1
```

by the way，提一句`for...else`

```python
# else 语句块会在循环结束后执行，除非在循环块中执行 break
# 即如果for循环中break了，则不会执行for后面紧跟的else
for i in (1, 4, 5):
	if i % 2 == 0:
		break
else:
	print("var i is always an odd")
```

#### 生成器表达式

生成器表达式与列表推导式类似，但是**使用的是圆括号**，而不是方括号

```python
g = (x for x in range(4))

print(next(g)) # 0
print(next(g)) # 1
```

#### 列表推导式&生成器表达式

列表推导也可能会有一些负面效应，那就是整个列表必须一次性加载于内存之中。虽然对大多数情况这都不是问题，但是总会达到极限，内存总会被用完。
针对上面的问题，生成器能够很好的解决。生成器表达式不会一次将整个列表加载到内存之中，而是生成一个生成器对象(Generator objector)，所以一次只加载一个列表元素

```python
num = [1, 4, -5, 10, -7, 2, 3, -1]
double_result_g = ( x*2 for x in num if x > 0 )
print(double_result_g)
# <generator object <genexpr> at 0x00583E18>
 
for item in double_result_g:
	print(item)
# 2
# 8
# 20
# 4
# 6
```

#### `try/except/else/finally`

```python
example = 1

try:
	print('1' + example)
except TypeError as e:
	print(e)
else: 
	# 当没有catch到except的时候走else
	# else语句必须在finally之前
	print('no except')
finally:
	print('finally')
```

else语句的存在必须以except X或者except语句为前提，如果在没有except语句的try block中使用else语句会引发语法错误

#### `any` & `all`

- `any`：接受一个布尔值序列，如果其中有任意一个值为 True 则返回 True
- `all`：如果序列中的每个元素均为 True 才会返回 True

```python
has_greater_than_ten = any(i > 10 for i in range(11))
print(has_greater_than_ten) # False

has_greater_than_ten = any(i > 10 for i in range(12))
print(has_greater_than_ten) # True
```

### 函数

定义函数: `def fun(params):`

对于仅有位置参数的函数`fun(p1, p2, p3)`，调用的时候需要按照参数顺序进行传值。而通过关键字参数则可避免这个问题：

```python
def fun(p0, p1 = 1, p2 = 0): # 第一个位置参数，后两个关键字参数
	return p0 - p1 - p2

print(fun(5, p2 = 2, p1 = 1)) # 2
```

#### 使用`*`收集位置参数

当参数被用在函数内部时，`*`将一组**可变数量的位置参数**集合成参数值的**元组**

```python
def fun(p, *args):
	return args

fun(1, 2, 3, 4) # (2, 3, 4)
```

#### 使用`**`收集关键字参数

使用两个星号可以将参数收集到一个字典中，参数名则是字典的键，对应的值是字典的值

```python
def fun(**kwargs):
	return kwargs

fun(a = 0, b = 1, c = 2) # {'c': 2, 'a': 0, 'b': 1}
```

```python
def example_fun(a, b):
	print(a)
	print(b)
	
# 字典的key必须和函数的参数名对应
example_dict = {
	"a": 1,
	"b": 2
}

example_fun(**example_dict)
# 1
# 2
```

#### 闭包

函数返回一个被动态创建的可以记录外部变量的函数

```python
def fun(str):
	def say():
		return "He said: %s" % str
	return say
```

#### 匿名函数`lambda()`

```python
# 普通函数
def print_upstr(str, fun):
	for word in str:
		print(fun(word))

def upstr(word):
	return word.capitalize()

print_upstr('this is a test', upstr)
# This
# Is 
# A
# Test

# 匿名函数
def print_upstr(str, fun):
	for word in str:
		print(fun(word))

print_upstr('this is a test', lambda word: word.capitalize())
```

#### 装饰器

用于在不改变原函数代码的情况下修改已存在的函数。常见场景是增加一句调试，来查看传入的参数

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
	
def add(a, b):
	return a + b
add(3, 2) # 5

new_add = decorator_fun(add)
new_add(3, 2)
# current fun: add
# position arguments: (3, 2)
# key arguments: {}
# 5
```

*相对于人工进行装饰器赋值传参的操作过程，可以直接在要装饰的函数前面添加装饰器名称@decorator_name:*

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

*一个函数可以有多个装饰器，靠近函数定义的装饰器最先执行，然后依次执行上面的装饰器*

#### 命名空间和作用域

```python
const_value = 'const_value'

# example 1
def fun():
	global const_value # 要使用并修改全局变量前需要显示的通过global进行声明
	print('before is:', const_value)
	const_value = '2'
	print(const_value)

fun() # 2
print(const_value) # 2

# example 2
def fun():
	print('before is:', const_value)
	const_value = '2'
	print(const_value)

fun() 
# error: local variable 'const_value' referenced before assignment
# 认为函数中第一次使用的const_value是局部变量，尚未声明

# example 3
def fun():
	const_value = '2'
	print(const_value)

fun() # 2
print(const_value) 
# const_value
# 函数中使用的const_value为局部变量
```