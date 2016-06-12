## Python语言及其应用-3(数据处理)

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

### 正则表达式

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

Python字符串会使用一些特殊的转义符，例如 `\b``在字符串中代表退格，而在正则表达式中则代表一个单词的开头位置。因此可以在模式串的前面添加`r`来禁止字符串转义

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
fileobj = open(filename, mode)

# mode的第一个字母
# r 读
# w 写，如果文件不存在则新建，若存在则重写其内容
# x 在文件不存在的情况下新建并写文件
# a 如果文件存在，在文件末尾追加写内容

# mode的第二个字母
# t 可省略，表示文本类型
# b 代表二进制文件
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
