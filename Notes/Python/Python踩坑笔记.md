### Python踩坑笔记

#### 函数的默认参数

函数的默认参数在Python中只会执行一次，即定义该函数的时候，默认参数会被初始化，之后在每次调用的时候，都会使用之前初始化过的参数。

```python
def fun(bar=[]):
	bar.append("bar")
	return bar

print(fun()) # ["bar"]
print(fun()) # ["bar", "bar"]
```

#### 捕获多个异常

将多个类型的异常放进元组里，作为except的参数

```python
try:
	# do something
except (ValueError, IndexError) as e:
	print(e)
```

#### Python中的变量名解析

Python中的变量名解析遵循按顺序查找的所谓的**LEGB原则**，也就是

- L：本地作用域
- E：上一层结构中`def`或`lambda`的本地作用域
- G：全局作用域
- B：内置作用域（Local，Enclosing，Global，Builtin）

一个关于全局变量和作用域的典型错误：

```python
x = 10
def fun():
	x += 1
	print(x)
fun()

# UnboundLocalError: local variable 'x' referenced before assignment
```

**因为当你在某个作用域内为变量赋值时，该变量被Python解释器自动视作该作用域的本地变量，并会取代任何上一层作用域中相同名称的变量**

#### 通过列表解析式来避免在遍历列表时改变列表

```python
odd = lambda x : bool(x % 2)
numbers = [n for n in range(10)]
numbers = [n for n in numbers if not odd(n)] 
print(numbers) #[0, 2, 4, 6, 8]
```

#### `print`

Python的`print`可以接受多个通过逗号间隔的参数，会在输出时通过空格链接。且在print输出的语句后面都会加入`\n`换行符

```python
print('this', 'is', 'a example')
print('test')
# this is a example
# test

# print函数
print(object, sep='',end='\n', file=None, flush=False)
```

print函数有四个关键字参数，其中sep代表字符串连接符，而end代表print输出完毕之后在末尾加入的符号。

PS.通过`string.strip()`可以去除末尾的换行符

#### 最大递归深度设定

Python的最大递归深度为900+，超出这个范围之后返回如下错误：

```python
maximum recursion depth exceeded
```

解决方案：
手工设置递归调用深度

```python
import sys   
sys.setrecursionlimit(1000000) # 例如这里设置为一百万
```

#### 生成器

创建generator：

- 把列表生成器的`[]`改为`()`

```python
g = (x * x for x in range(10))
print(g)
# <generator object <genexpr> at 0x1022ef630>
```

- 函数定义中包含`yield`关键字

generator和函数的执行流程不一样。函数是顺序执行，遇到return语句或者最后一行函数语句就返回。而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行

```python
def odd():
	print('step 1')
	yield(1)
	print('step 2')
	yield(3)
	print('step 3')
	yield(5)
	
o = odd()
next(o)
# step 1
# 1
next(o)
# step 2
# 3
next(o)
# step 3
# 5
```

#### `dir`打印所有方法

内置函数`dir()`用于按模块名搜索模块定义，它返回一个字符串类型的存储列表。无参数调用时，`dir()`函数返回当前定义的命名

`dir()`不会列出内置函数和变量名

```python
import sys
print(dir(sys))
```

#### `isinstance`

`isinstance(value, type)`
接受两个参数，判断第一个参数是否是第二个参数类型的。第二个参数还可以是一个元组，如果value是元组里面一个类型的实例，则返回True

```python
isinstance(2, int) # True
isinstance('2', (str, int)) # True
```

