<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python Design Pattern](#python-design-pattern)
  - [抽象工厂模式](#%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F)
  - [观察者模式](#%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python Design Pattern

[python-patterns](https://github.com/faif/python-patterns)

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

### 观察者模式

```python
# 创建一个被观察者基类
class Subject(object):

    def __init__(self):
        self._observers = []

    def attach(self, observer):
    	"""
    	增加监听者
    	"""
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
    	"""
    	注销监听者
    	"""
        try:
            self._observers.remove(observer)
        except ValueError:
            pass

    def notify(self, modifier=None):
    	"""
    	当自身有变化的时候，通知所有的监听者，并调用其update方法
    	"""
        for observer in self._observers:
            if modifier != observer:
                observer.update(self)
```

```python
# 实例化一个被观察者
class Data(Subject):
	"""
	继承自基类，并在自身数据发生变化的时候调用notify方法通知所有的监听者
	"""
    def __init__(self, name=''):
        Subject.__init__(self)
        self.name = name
        self._data = 0

    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, value):
        self._data = value
        self.notify()
        print('data now is {}'.format(value))
```

```python
# example
class Listener:
	def update(self):
		print('data update')

def main():
	listener = Listener()
	data = Data('data1')
	data.attach(listener)
	data.data = 1
	data.data = 2

if __name__ == '__main__':
	main()

# data update
# data now is 1
# data update
# data now is 2
```

