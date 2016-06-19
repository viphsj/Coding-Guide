## Python Design Pattern

### 抽象工厂模式

在Python的Class里，实例方法是以`self`作为第一个参数的方法。除此之外，类的方法类型还包括**类方法**和**静态方法**。

类方法以`Class`作为第一个参数并使用前缀修饰符`@classmethod`，类的所有实例都可以调用。
静态方法则不会影响类也不会影响类实例的方法，具有独立性，使用前缀修饰符`@staticmethod`

```python
class FatherFactory():
	@classmethod
	def print_something(Class, string):
		return Class.print_string(string)
		
	@staticmethod
	def print_string(string):
		print(string)
		
class ChildFactory(FatherFactory):
	def test(self):
		print('test')
	@staticmethod
	def print_string(string):
		print('this is a child object and print \'{}\''.format(string))
		
fatherPrint = FatherFactory.print_something('I am father')
# I am father

childPrint = ChildFactory.print_something('\'I am father\'')
# this is a child object and print 'I am father'
```

ChildFactory继承了FatherFactory，但并没有复写FatherFactory的print_something类方法。因此，在ChildFactory调用print_something方法时，实际上调用的是父类的print_something方法。在父类里，`Class.print_string`会调用`FatherFactory.print_string`。而在子类里，虽然print_something是父类的方法，但当前Class已经变成了ChildFactory，因此`Class.print_string`实际上是`ChildFactory.print_string`

### 建造者模式

