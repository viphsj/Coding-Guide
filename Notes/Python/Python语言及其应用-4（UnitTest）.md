## Python语言及其应用-4（UnitTest）

### Pylint

[Pylint官网](http://www.pylint.org/)

```bash
# install
$ pip3 install pylint

$ pylint example.py
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
# python example.py -v 现在这样运行才能进行代码测试
```

### debugger

[Python用于调试代码的标准库pdb](https://docs.python.org/3/library/pdb.html)

