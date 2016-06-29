<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python及应用3-数据处理](#python%E5%8F%8A%E5%BA%94%E7%94%A83-%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86)
  - [数据处理](#%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86)
    - [文本格式化](#%E6%96%87%E6%9C%AC%E6%A0%BC%E5%BC%8F%E5%8C%96)
    - [`input`](#input)
  - [正则表达式](#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
    - [推荐教程](#%E6%8E%A8%E8%8D%90%E6%95%99%E7%A8%8B)
    - [匹配的方法](#%E5%8C%B9%E9%85%8D%E7%9A%84%E6%96%B9%E6%B3%95)
    - [模式标识符](#%E6%A8%A1%E5%BC%8F%E6%A0%87%E8%AF%86%E7%AC%A6)
      - [匹配的输出](#%E5%8C%B9%E9%85%8D%E7%9A%84%E8%BE%93%E5%87%BA)
  - [文件操作](#%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C)
    - [打开文件](#%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6)
    - [读取文件](#%E8%AF%BB%E5%8F%96%E6%96%87%E4%BB%B6)
    - [写入文件](#%E5%86%99%E5%85%A5%E6%96%87%E4%BB%B6)
    - [使用`seek()`改变读写位置](#%E4%BD%BF%E7%94%A8seek%E6%94%B9%E5%8F%98%E8%AF%BB%E5%86%99%E4%BD%8D%E7%BD%AE)
  - [系统操作](#%E7%B3%BB%E7%BB%9F%E6%93%8D%E4%BD%9C)
    - [路径与目录](#%E8%B7%AF%E5%BE%84%E4%B8%8E%E7%9B%AE%E5%BD%95)
    - [文件相关](#%E6%96%87%E4%BB%B6%E7%9B%B8%E5%85%B3)
  - [时间日期](#%E6%97%B6%E9%97%B4%E6%97%A5%E6%9C%9F)
    - [time](#time)
      - [基本用法](#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
      - [格式化日期](#%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%97%A5%E6%9C%9F)
    - [calendar](#calendar)
    - [datetime](#datetime)
      - [datetime模块](#datetime%E6%A8%A1%E5%9D%97)
      - [date模块](#date%E6%A8%A1%E5%9D%97)
  - [json](#json)
  - [美化输出](#%E7%BE%8E%E5%8C%96%E8%BE%93%E5%87%BA)
    - [pprint](#pprint)
    - [colorama](#colorama)
    - [prettytable](#prettytable)
  - [数据库](#%E6%95%B0%E6%8D%AE%E5%BA%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python及应用3-数据处理

### 数据处理

#### 文本格式化

- `%`旧式格式化

`%s 字符串`
`%d 十进制整数`
`%x 十六进制整数`
`%f 十进制浮点数`
`%e 以科学计数法表示的浮点数`
`%% 文本值%本身`

```python
'%s' % 42 # '42'
'%f' % 7.03 # 7.030000
'%d%%' % 100 # 100%

# 需要插入多个数据的时候，使用元组的形式
'this %s a %s test' % ('is', 'simple')
# this is a simple test
```

- `{}`和`format`的新式格式化

```python
'{},{},{}'.format('ecmadao', 'edward', 'cavalier')
# 'ecmadao','edward','cavalier'
```

*在`{}`中可以传入位置参数，代表format里的第几位参数*

```python
# 旧格式化中传入参数的顺序要与%出现的顺序完全一致。但使用format则可以指定插入的顺序
'{2},{0},{1}'.format('ecmadao', 'edward', 'cavalier')
# 2代表最后一个参数，0代表第一个参数，1代表第二个参数
# 'cavalier','ecmadao','edward'
```

*在`{}`中传入标识符*

```python
# 当format里参数为字典或命名变量
example_dict = {a: 0, b: 1, c: 2}
'{a} {b} {c}'.format(a = 0, b = 1, c = 2)
# 0代表format第一个参数，1代表第二个参数
'{0[a]} {0[b]} {0[c]}{1}'.format(example_dict, 'others')
```

*`{位置参数/标识符: 格式化}`*

```python
'{0: f}'.format(7.03)
# '7.030000'
```

#### [`input`](http://anh.cs.luc.edu/python/hands-on/3.1/handsonHtml/io.html)



### 正则表达式

#### 推荐教程

[正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex.htm)
[Python正则表达式指南](http://www.cnblogs.com/huxi/archive/2010/07/04/1771073.html)
[Python专题教程：正则表达式re模块详解](http://www.crifan.com/files/doc/docbook/python_topic_re/release/html/python_topic_re.html#ch03_re_search)

#### 匹配的方法

```python
import re

# 检测以模式串作为开头的源字符串
m = re.match(pattern, str) # m.group()可拿到匹配结果

# 在源字符串内寻找首次匹配
m = re.search(pattern, str) # m.group()可拿到匹配结果

# 在源字符串内寻找所有匹配
m = re.findall(pattern, str) # 返回一个由结果组成的list

# 将源字符串按照匹配切分
m = re.split(pattern, str) # 返回一个由结果组成的list

# 将源字符串内匹配的模式使用目标替换
m = re.sub(pattern, replace, str) # 返回替换之后的新的字符串
```

#### 模式标识符

**对于模式中转义字符串的处理**

Python字符串会使用一些特殊的转义符，例如  \b 在字符串中代表退格，而在正则表达式中则代表一个单词的开头位置。因此可以在模式串的前面添加 r 来禁止字符串转义

##### 匹配的输出

使用`match`或`search`时，所有的匹配会以`m.group()`的形式返回。如果用括号将某一模式包裹起来，则每个被包裹的匹配结果都会返回`.group()`，且整体以元组形式返回，调用`.groups()`则可获取。

```python
import re
source = 'Have a dish of fish tonight'
m = re.search(r'(. dish\b).*(\bfish)', source)
m.group() # 'a dish of fish'
m.groups() # ('a dish', 'fish')
```

### 文件操作

#### 打开文件

```python
fileobj = open(filename, mode, encoding)

# mode的第一个字母
# r 读
# w 写，如果文件不存在则新建，若存在则重写其内容
# x 在文件不存在的情况下新建并写文件
# a 如果文件存在，在文件末尾追加写内容

# mode的第二个字母
# t 可省略，表示文本类型
# b 代表二进制文件

# encoding表示编码方式
# 有些文件会被误认为是与当前默认编码不同的其他编码形式，会造成UnicodeDecodeError。这时需要我们手动指定编码形式
open('example.html', encoding='utf-8')
```

如果不是使用`with`方法，则在打开文件后需要手动调用文件关闭方法`f.close()`

使用`with`语句：

```python
with open(filename) as f:
	for line in f.readlines():
		print(line.strip()) # 去除末尾的'\n'
```

#### 读取文件

```python
f = fileobj.read() # 一次性读取全部内容
f = fileobj.read(size) # 读取指定大小的内容
f = fileobj.readline() # 一次读取一行内容。重复调用则会继续调用下面的行
f = fileobj.readlines() # 一次性读取所有行，并返回各行组成的list

# 读取二进制文件
f = open(filename, 'rb')
bytedata = f.read()
```

#### 写入文件

```python
with open(filename) as f:
	f.write(str) # 返回写入文件的字节数
	# print(str, file = f, sep = '', end = '')
	# sep分隔符：默认为空格' '
	# end结束字符：默认是换行符'\n'

# 写入二进制文件
f = open(filename, 'wb')
f.write(bytedata)
f.close()
```

#### 使用`seek()`改变读写位置

`tell()`返回距离文件开始处的字节偏移量，`seek()`允许跳转到文件其他字节偏移量的位置

```python
with open(filename) as f:
	f.tell() # 0
	f.seek(255) # 255
	# seek()同样返回当前的偏移量
	f.tell() #255
```

`seek(offset, origin)`

offset:
0 - 默认值，代表从开头处偏移offset个字节
1 - 从当前位置偏移offset个字节
2 - 距离最后结尾处偏移offset个字节

### 系统操作

#### 路径与目录

```python
import os
os.path.isfile(filename) # 判断是否是文件
os.path.isdir(name) # 判断是否是目录
os.path.isabs(name) # 判断是否是绝对路径名
os.path.exists(name) # 判断是否存在这个目录

os.mkdir(name) # 创建一个目录
os.rmdir(name) # 删除目录
os.listdir(name) # 列出目录下的内容(以list的形式)
os.chdir(name) # 从当前目录跳转到目标目录下
```

**使用`glob`进行文件匹配**

```python
import glob
glob.glob(name) # 匹配当前目录下，对应名称的文件/目录，返回一个文件/目录名组成的list
# * 匹配任意名称
# ? 匹配一个字符
# [abc] 匹配字符a、b、c
# [!abc] 匹配除了a、b和c之外的所有字符

####### example
glob.glob('??') # 获取所有名称为两个字符的文件和目录
```

#### 文件相关

- 使用`open()`创建文件
- 使用`exists()`检查文件是否存在
- 使用`isfile()`检查是否为文件
- 使用`copy()`复制文件
- 使用`rename()`重命名文件
- 使用`abspath()`获取绝对路径名
- 使用`remove()`删除文件

```python
import os
os.path.exists('example.txt') # True or False
os.path.isfile('example.txt')
os.path.abspath('example.txt') # 获取example文件的绝对路径

os.remove('example.txt')
os.rename('example.txt', 'renamed_example.txt')
# 把example文件改名为renamed_example
```

```python
import shutil
shutil.copy('example.txt', 'new_example.txt')
# 把example文件复制到new_example文件
shutil.move('example.txt', 'new_example.txt')
# 把example文件复制到new_example文件，并删除example文件
```

### 时间日期

[Python 3 - Date & Time](http://www.tutorialspoint.com/python3/python_date_time.htm)
[PYTHON-基础-时间日期处理小结](http://www.wklken.me/posts/2015/03/03/python-base-datetime.html)

#### [time](https://docs.python.org/3/library/time.html)

##### 基本用法

```python
import time

time.time() # 获取当前时间戳
time.sleep(second) # 阻塞当前线程，休眠second秒

time.localtime([seconds]) # 把获取的参数(seconds)转化为一个时间元组。不传入参数的时候，相当于：
time.localtime(time.time())
# 输出：
# time.struct_time(tm_year=2016, tm_mon=6, tm_mday=26, tm_hour=20, tm_min=31, tm_sec=43, tm_wday=6, tm_yday=178, tm_isdst=0)
for t in time.localtime():
	print(t)
# 2016
# 6
# 26
# 21
# 19
# 20
# 6
# 178
# 0
```

##### 格式化日期

```python
time.asctime([tuple]) # 接受时间元组为参数，格式化时间。没有参数时，将当前时间的时间元组格式化
time.asctime() # 或 time.asctime(time.localtime())
# Sun Jun 26 21:21:49 2016
```

```python
time.strftime(format[, tuple]) # 使用format规定的模式获取格式化的时间，没有传入时间元组的时候则格式化当前时间
```

**format规则：**

```python
%y # 两位数的年份表示（00-99）
%Y # 四位数的年份表示（000-9999）
%m # 月份（01-12）
%d # 月内中的一天（0-31）
%H # 24小时制小时数（0-23）
%I # 12小时制小时数（01-12）
%M # 分钟数（00=59）
%S # 秒（00-59）

# example
format_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
print(format_time) # 2016-06-26 21:31:29
```

#### [calendar](https://docs.python.org/3/library/calendar.html)

```python
import calendar
calendar.month(year, month, w=2, l=1) # 返回一个多行字符串格式的year年month月日历。两行标题，一周一行。每日宽度间隔为w字符。每行的长度为7* w+6。l是每星期的行数
calendar.isleap(year) # 是闰年返回True，否则为false
```

```python
import calendar
cal = calendar.month(2016, 1)
print(cal)
```

**result：**

```bash
    January 2016
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31
```

#### [datetime](https://docs.python.org/3/library/datetime.html)

##### datetime模块

```python
from datetime import datetime
datetime.now() # 返回形如 2016-06-26 21:48:24.248034 的当前时间

datetime.now().strftime(format) # 格式化获取的时间。format规则同上述time模块的strftime。例如：
datetime.now().strftime("%Y-%m-%d") # 2016-06-26

datetime.now().date() # 获取当前日期：2016-06-26
```

##### date模块

```python
from datetime import date

# 构造一个date对象
date(2016, 6, 29) # 2016-06-29

# 由时间戳构造date对象
date.fromtimestamp(时间戳)
today_date = date.fromtimestamp(time.time()) # 2016-06-26

# 获取当前日期
today = date.today() # 2016-06-26
today.year # 2016
today.month # 6
today.day # 26

# date对象之间可以进行大小比较
date(2016, 6, 29) > today # True

# 还可以进行加减操作
from datetime import timedelta, date
data.today() # 2016-06-26
date.today() + datetime.timedelta(days=1) # 2016-06-27
```

### [json](https://docs.python.org/3.3/library/json.html)

```python
import json

# 编码encoding
json.dumps() # 把一个Python对象编码转换成Json字符串

# 解码decoding
json.loads() # 把Json格式字符串解码转换成Python对象
```

```python
print(json.dumps({"c": 0, "b": 0, "a": 0}, sort_keys=True)) # sort_keys为True则将key按顺序排序。默认为False
```

### 美化输出

#### [pprint](https://docs.python.org/3/library/pprint.html)

格式化输出数据，便于阅读调试

```python
from pprint import PrettyPrinter, pprint
# pprint(object, stream=None, indent=1, width=80, depth=None, *, compact=False)

stuff = ['spam', 'eggs', 'lumberjack', 'knights', 'ni']
stuff.insert(0, stuff[:])
PrettyPrinter(indent=4).pprint(stuff)
# PrettyPrinter返回一个配置的PrettyPrinter实例，上面例子里设定了4个空格的缩进，而默认为1
# 之后输出
pprint(stuff, indent=4) # 与上面的输出一样
```

```bash
[   ['spam', 'eggs', 'lumberjack', 'knights', 'ni'],
    'spam',
    'eggs',
    'lumberjack',
    'knights',
    'ni']
```

#### [colorama](https://pypi.python.org/pypi/colorama)

```python
from colorama import Fore, Back, Style
# Fore 字体颜色
# Back 字体背景颜色
# Style 字体粗细
```

**Basic Usage**

```python
from colorama import Fore, Back, Style
print(Fore.RED + 'some red text')
print('these text has the same font color') # 这里打印出的字体仍是绿色
print(Back.GREEN + 'and with a green background')
print(Style.BRIGHT + 'and in dim text') # 粗体
print(Style.RESET_ALL) # 样式全部重置
print('back to normal now')
```

*需要注意的是，在添加任意一种样式之后，如果后面的print没有再设置其他样式，则将一直保持最后一次设置的样式*

**Options**

```python
Fore # BLACK, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE, RESET.
Back # BLACK, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE, RESET.
Style # DIM, NORMAL, BRIGHT, RESET_ALL
# Style.RESET_ALL 可以重置所有样式
```

#### [prettytable](https://code.google.com/archive/p/prettytable/wikis/Tutorial.wiki)

以表格的形式输出数据

```bash
$ pip3 install prettytable
```

**Basic Usage**

```python
from prettytable import PrettyTable

table_headers = ['column1', 'column2', 'column3']

table = PrettyTable(table_headers) # 创建一个带有表格题头的table
for i in range(3): # 创建3行
	table.add_row([t for t in range(3)]) # 每行都添加[0, 1, 2]
print(table)
```

*output*

```bash
+---------+---------+---------+
| column1 | column2 | column3 |
+---------+---------+---------+
|    0    |    1    |    2    |
|    0    |    1    |    2    |
|    0    |    1    |    2    |
+---------+---------+---------+
```

**Enhance**

```python
# ...接着上面的table

table.align["column1"] = "l" # 将制定列进行左对齐, 默认为"c"居中对齐
table.valign = "m" # 垂直居中，参数也可以是 "t"顶部对齐/"b"底部对齐
# x.align = "l"/"c"/"r" 可以将所有列都左/居中/右对齐
table.border = False # table是否有border(默认为True)
print(table)
```

```bash
 column1  column2  column3 
 0           1        2    
 0           1        2    
 0           1        2  
```

### 数据库

[MongoDB](https://www.mongodb.com/)
[pymongo](https://api.mongodb.com/python/current/index.html)

[Python数据储存-pymongo](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/Python/Python%E6%95%B0%E6%8D%AE%E5%82%A8%E5%AD%98-pymongo.md)