<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python 中的 Collections 库](#python-%E4%B8%AD%E7%9A%84-collections-%E5%BA%93)
  - [`Counter`](#counter)
  - [`defaultdict`](#defaultdict)
  - [`OrderedDict`](#ordereddict)
  - [`deque`](#deque)
  - [`namedtuple`](#namedtuple)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python 中的 Collections 库

`Collections`库中的常用方法：

- `Counter`
- `defaultdict`
- `OrderedDict`
- `deque`
- `namedtuple`

### `Counter`

> 计数器

`Counter`对象本质上是`dict`的子类，其内部结构为：`{元素: 元素出现次数}`

- `Counter`: 通常接受一个可迭代对象作为参数，返回每个元素出现的次数
- `elements()`: 方法返回所有元素组成的可迭代对象，包括重复元素
- `most_common(num)`: 以一个数组作为参数，获取重复频率最高的前 num 个元素，返回类型位 Array，Array 中每个元素都是`(元素, 重复次数)`的元组形式

```python
from collections import Counter

string = 'this is a counter test to count letter'
counter = Counter(string)
# Counter({'t': 8, ' ': 7, 'e': 4, 's': 3, 'o': 3, 'c': 2, 'n': 2, 'r': 2, 'u': 2, 'i': 2, 'l': 1, 'a': 1, 'h': 1})
counter.most_common(5)
# [('t', 8), (' ', 7), ('e', 4), ('o', 3), ('s', 3)]
```

`Counter`还支持一些类似集合的运算

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

除此以外，还有一个`subtract`方法，用于两个`Counter`之差：

```python
c = Counter(a=4, b=2, c=0, d=-2)
d = Counter(a=1, b=2, c=3, d=4)
# 将会直接在 c 上进行操作
c.subtract(d)
print(c)
# Counter({'a': 3, 'b': 0, 'c': -3, 'd': -6})
```

### `defaultdict`

一个传统的字典，如果通过`dict[key]`去获取一个不存在的`key`的值时，则会报错。而`defaultdict`则在构造时传入一个方法，之后如果要获取的`key`不存在，则会调用该方法，返回方法调用的结果。

```python
from collections import defaultdict

def default_func():
	return None

result = defaultdict(default_func)

for i in range(10):
	result[i] = i

print(result) # defaultdict(<function default_func at 0x39577c>, {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9})
print(result[99]) # None
```

### `OrderedDict`

字典是无序的，每次遍历时的顺序都可能会不一样。而通过`OrderedDict`，可以创建一个有序字典，它会记忆字典的键添加的顺序，迭代时会按照相同的顺序返回。

```python
from collections import OrderedDict
example_dict = {
	'a': 1,
	'b': 2,
	'c': 3
}

# 确保传入 OrderedDict 的值是排好序的
orderedDict = OrderedDict(sorted(example_dict.items(), key=lambda t: t[0]))

# 或者：
example_dict = (
	('a', 1),
	('b', 2),
	('c', 3)
)
orderedDict = OrderedDict(example_dict)

# 之后遍历会按照初始化 OrderedDict 时的顺序
for key in orderedDict:
	print(key)
# a
# b
# c
```

```python
# OrderedDict 的 Key 会按照插入的顺序排列，不是Key本身排序
od = OrderedDict()
od['z'] = 1
od['y'] = 2
od['x'] = 3
od.keys() # 按照插入的 Key 的顺序返回
# ['z', 'y', 'x']
```

### `deque`

`deque`是双端队列，可从队列头部或尾部快速增加和取出对象。除此以外，可以在实例化`deque`的时候限制最大长度，之后如果长度超出了最大长度，则头部的元素会自动出栈。

在初始化时传入一个序列，返回一个双端队列。它的常用 API 有：

- `pop()`去掉最右边的项并返回该项
- `popleft()`可去掉最左边的项并返回该项
- `append(x)`把元素加在左边
- `appendleft(x)`把元素加在左边
- `extend(iterable)`在右侧合并一个可迭代对象
- `extendleft(iterable)`在左侧合并一个可迭代对象
- `insert(index, x)`在`index`位置上添加一个元素
- `remove(value)`删除匹配的第一个元素；如果没有匹配元素则抛出`ValueError`
- `reverse()`反转队列
- `rotate(iterable)`队列的旋转操作
  - `rotate`参数为正时，由队列尾开始往前，依次把元素移动到队列首部，直到移动参数数目的元素；
  - `rotate`参数为负时，由队列首开始往后，依次把元素移动到队列尾部，直到移动参数数目的元素

```python
from collections import deque
# 可以通过很多方式初始化一个双端队列
d = deque() # 空队列
d.append(1)
d.append(2)
d.append(3)
# deque([1, 2, 3])

d = deque(range(7)) # deque([0, 1, 2, 3, 4, 5, 6])
d.pop() # 返回 6
d.popleft() # 返回 0
d.appendleft(11) # 返回 None
d.extend(['a', 'b', 'c'])
print(d) # deque([11, 1, 2, 3, 4, 5, 'a', 'b', 'c'])
```

```python
# reverse & rotate
from collections import deque
d = deque(range(5))
print(d) # deque([0, 1, 2, 3, 4])

# reverse
d.reverse() # deque([4, 3, 2, 1, 0])
d.reverse() # deque([0, 1, 2, 3, 4])

# rotate
d.rotate(2) # 从队尾开始，把 2 个元素移到队首
print(d) # deque([3, 4, 0, 1, 2])
d.rotate(5)
print(d) # deque([3, 4, 0, 1, 2]) 当参数大于等于列表长度的时候则无效

d2 = deque(range(5))
print(d2) # deque([0, 1, 2, 3, 4])
d2.rotate(-2) # 从队首开始，把 2 个元素移到队尾
print(d2) # deque([2, 3, 4, 0, 1])
d2.rotate(-5)
print(d2) # deque([2, 3, 4, 0, 1]) 当参数的绝对值大于等于列表长度的时候则无效
```

通过`maxlen`来限制队列最大长度：

```python
from collections import deque
d = deque(range(5), maxlen=10)
print(d) # deque([0, 1, 2, 3, 4], maxlen=10)
d.extend([1, 2, 3, 4, 5, 6, 7, 8, 9])
print(d) # deque([4, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
```

### `namedtuple`

命名元组。通过命名元组创建的对象具有元组的特性，而且可以通过位置索引 & 键值索引获取到元组内的数据。

```python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])

p = Point(1, 2)
print(p) # Point(x=1, y=2)
# 通过属性引用
p.x # 1
p.y # 2
# 通过索引引用
p[0], p[1] # (1, 2)
p[0] + p[1] # 3
x, y = p
x, y # (1, 2)
```

`namedtuple`用来创建一个自定义的`tuple`对象，并且规定了`tuple`元素的个数，可以用**属性**或者**索引**来引用`tuple`的某个元素。

命名元组的内置方法：

- `_asdict()` 将命名元组转换为`OrderedDict`
- `_replace(kwargs)` 替换命名元组内的某些值，不修改旧命名元组，返回一个新命名元组
- `_make(iterable)` 实例化命名元组时的方法
- `_fields()` 返回命名元组中 key 组成的元组

```python
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
# 或者使用 _make
# p = Point._make([1, 2])

dict = p._asdict()
print(dict) # OrderedDict([('x', 1), ('y', 2)])

new_p = p._replace(x=3)
print(new_p) # Point(x=3, y=2)
print(p) # Point(x=1, y=2)

keys = p._fields()
print(keys) # ('x', 'y')
```