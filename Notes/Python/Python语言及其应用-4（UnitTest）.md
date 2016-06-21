## Python语言及其应用-4（UnitTest）

### Pylint

使用Pylint来进行Python代码检测。[Pylint官网](http://www.pylint.org/)

```bash
# install
$ pip3 install pylint
# usage
$ pylint example.py
# 之后会打印检测结果和得分
```

### UnitTest

Python自带[unittest标准库](https://docs.python.org/3/library/unittest.html)。在unittest中，通过assert开头的断言方法，来检查返回的结果是否符合预期

```python
# 编写一个待测试的函数
def just_do_it(text):
	return text.capitalize()

import unittest # Python的内置标准库，依赖于Java的JUnit

class TestCap(unittest.TestCase):
	def setUp(self):
		pass
	def tearDown(self):
		pass
	
	def test_one_word(self):
		text = 'duck'
		result = just_do_it(text)
		self.assertEqual(result, 'Duck')
	
	def test_multiple_words(self):
		text = 'a veritable flock of ducks'
		result = just_do_it(text)
		self.assertEqual(result, 'A Veritable Flock Of Duck')

if __name__ == '__main__':
	unittest.main()
```

- `setUp()`方法会在每个测试方法执行之前执行，常用来进行一些初始化和分配外部资源的操作
- `tearDown()`方法则在每个测试方法执行之后执行，常用来回收外部资源

*断言方法*

- `assertEqual(first, second, msg=None)`
- `assertNotEqual(first, second, msg=None)`
- `assertTrue(expr, msg=None)`
- `assertFalse(expr, msg=None)`
- `assertIs(first, second, msg=None)`
- `assertIsNot(first, second, msg=None)`
- `assertIsNone(expr, msg=None)`
- `assertIsNotNone(expr, msg=None)`
- `assertIn(first, second, msg=None)`
- `assertNotIn(first, second, msg=None)`
- `assertIsInstance(obj, cls, msg=None)`
- `assertNotIsInstance(obj, cls, msg=None)`
- `assertGreater(first, second, msg=None)`
- `assertGreaterEqual(first, second, msg=None)`
- `assertLess(first, second, msg=None)`
- `assertLessEqual(first, second, msg=None)`

### doctest

又一个Python[自带标准库doctest](https://docs.python.org/3/library/doctest.html)

使用这个包可以把测试写在文档字符串中，在测试的同时起到文档的作用。格式要求：

```python
# 先>>> 函数调用
# 下一行输出预期的结果
"""
>>> fun()
result
"""
```

EXAMPLE：

```python
import doctest

def list_generator(number):
	"""
	>>> list_generator(5)
	[0, 1, 2, 3, 4]
	"""
	return [n for n in range(number)]
	
if __name__ == '__main__':
	doctest.testmod()
```

运行Python文件，如果没有错误，则不会输出内容。现在把list_generator稍微改变一下：

```python
import doctest

def list_generator(number):
	"""
	>>> list_generator(5)
	[0, 1, 2, 3, 4]
	"""
	return [str(n) for n in range(number)]
	
if __name__ == '__main__':
	doctest.testmod()
```

运行文件，输出如下内容：

```bash
**********************************************************************
File "example.py", line 5, in __main__.list_generator
Failed example:
    list_generator(5)
Expected:
    [0, 1, 2, 3, 4]
Got:
    ['0', '1', '2', '3', '4']
**********************************************************************
1 items had failures:
   1 of   1 in __main__.list_generator
***Test Failed*** 1 failures.
```

By the way，如果你不想写：

```python
if __name__ == '__main__':
	doctest.testmod()
```

那么，在运行Python文件的时候，需要：

```bash
# python example.py 之前这样运行
$ python example.py -v # 现在这样运行才能进行代码测试
```

### debugger

[Python用于调试代码的标准库pdb](https://docs.python.org/3/library/pdb.html)

```python
import pdb
pdb.set_trace() # 设置一个断点

# example
print('debugger begin')
pdb.set_trace()
for i in range(5):
	print(i)

pdb.set_trace()
print('debugger end')
```

运行文件，会进入交互式debugger模式。在该模式下可以进行如下操作(仅列常用)：

- `c`: 继续执行代码，直至下一个断点
- `s`: 执行**当前代码行**，进入当前行调用的函数内部，并停在第一个能停的地方
- `n`: 继续执行，到当前函数的下一行停止，或者当前行直接返回（单步跳过）
- `w`: 显示当前正在执行的代码行的上下文信息
- `a`: 打印当前函数的参数列表
- `l`: 该命令后没有参数时，列出当前debug行附近的11行代码
- `q`: 退出运行的代码

```bash
# 在Pdb的debug模式下

# 以当前行为中心，上下各列出5行代码。共计11行
(Pdb) l
(Pdb) l .

# 以第一个参数为起点，往后列出共计11行代码
(Pdb) l 2

# 以第一个参数为行数起点，第二个参数作为终止行数，列出期间的代码
(Pdb) l 2, 5
```

### decorator

