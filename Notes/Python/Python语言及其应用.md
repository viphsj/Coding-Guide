## Python语言及其应用

### 数字、字符串和变量

**赋值只是对对象的引用而不是对象本身**

强制类型转换：

- `int(params)`
- `float(params)`
- `str(params)`


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
# list逆序排列
new_list = old_list[::-1] # [4, 3, 2, 1, 0]
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
```python
empty_tuple = ()
sinple_tuple = 'example',
example_tuple = 'example0', 'example1', 'example2'

a, b, c = example_tuple # 将元组里的值赋值给变量 -- 元组解包
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

---

获取字典中的元素

- `d.[key]` 
- `d.get(key, defaultValue)` 获取指定key的value，并指定了默认值
- `d.keys()` 获取所有键组成的list
- `d.values()` 获取所有值组成的list
- `d.items()` 获取所有键值对，返回一个list，里面的元素是(键，值)组成的元组

当使用`d.[key]`获取字典中不存在的元素时会报错

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

`zip()`
该函数可以遍历多个序列，在具有**相同位移**的项之间创建**元组**

```python
list1 = [1, 2, 3, 4]
tuple1 = [a, b, c, d]
list(zip(list1, tuple1)) # [(1, a), (2, b), (3, c), (4, d)]
```

`zip()`生成的结果既不是列表也不是元组，而是一个整合在一起的可迭代变量。可通过`list()`进一步处理

---

`range(start, end, step)`
返回在特定区间的自然数序列，生成的是一个可循环对象

```python
list(range(2, -1, -1)) # [2, 1, 0]
list(range(0, 11, 2)) # [0, 2, 4, 6, 8, 10]
```

---

#### 列表推导式

`[expression for item in iterable if condition]`

expression为符合condition条件的列表生成值。e.g.

```python
# example_1
number_list = [number for number in range(1, 6) if number % 2 == 1]
print(number_list) # [1, 3, 5]

# example_2
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

---

#### 函数

