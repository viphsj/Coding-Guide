### Google Python Style Guide摘录

(仅仅选取了一些值得注意的地方)

#### 空格

- `:`用在行尾时前后皆不加空格，如分枝、循环、函数和类定义语言；用在非行尾时两端加空格

```python
example = {'a' : 1, 'b' : 2} # 非行尾时两端加空格
if isTrue: # 在行尾不加空格
```

- 当`=`用于作为指示关键字参数或默认参数时在其两侧不使用空格

```python
def example_method(a, b=1):
```

#### 类和注释

- 类应该在其定义下有一个用于描述该类的文档字符串。如果类还有公共属性，那么文档中应该有一个属性(Attributes)段。

- 如果一个类不继承自其它类，就显示的从object继承。

```python
class ExampleClass(object):
	"""Summary of class here.
	Attributes:
		a: A number of the example.
		b: .......
	"""
	def __init__(self, a, b):
		........
```

#### 字符串

- 使用`format`格式化字符串

- 避免在循环中用+和+=操作符来累加字符串。由于字符串是不可变的，这样做会创建不必要的临时对象，并且导致二次方而不是线性的运行时间。**可以将每个子串加入列表，然后在循环结束后用 .join 连接列表**

- 为多行字符串使用三重双引号而非三重单引号

#### `import`

- 模块导入的顺序：

1. 从标准库导入
2. 从第三方库导入
3. 从自己编写的模块导入

面对上面三种不同来源的模块，应该空出一行

- 使用完整包名来导入模块

```python
# Not good
from collections import defaultdict

# good
import collections
collections.defaultdict
```

#### 命名

- 使用`_`开头则表明模块变量或函数是protected的
- 使用`__`开头的实例变量或方法表示类内私有
- 类名使用大写字母开头双驼峰式写法(ExampleClass)
- 模块名使用小写字母+`_`的形式(examlpe_class.py)
- 常量名使用全大写+`_`的形式
- 变量名使用全小写+`_`的形式
- 变量名不应该带有类型信息，例如(example_list是不好的)
- 函数的命名规则和变量名相同


| Type                       | Public             | Internal                                 |
| -------------------------- | ------------------ | :--------------------------------------- |
| Moudles                    | lower_with_under   | _lower_with_under                        |
| Packages                   | lower_with_under   |                                          |
| Classes                    | CapWords           | _CapWords                                |
| Exceptions                 | CapWords           |                                          |
| Functions                  | lower_with_under() | _lower_with_under()                      |
| Global/Class Constants     | CAPS_WITH_UNDER    | _CAPS_WITH_UNDER                         |
| Global/Class Variables     | lower_with_under   | _lower_with_under                        |
| Instance Variables         | lower_with_under   | _lower_with_under (protected) or __lower_with_under (private) |
| Method Names               | lower_with_under() | _lower_with_under() (protected) or __lower_with_under() (private) |
| Function/Method Parameters | lower_with_under   |                                          |
| Local Variables            | lower_with_under   |                                          |

#### 代码建议

- 按需使用生产器

- 单行函数则使用`lambda`匿名函数

- 在简单的情况下使用列表推导式`[expression for item in iterable]`，若复杂则不建议使用