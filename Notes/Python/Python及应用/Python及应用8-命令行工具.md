<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python及应用8-命令行工具](#python%E5%8F%8A%E5%BA%94%E7%94%A88-%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7)
  - [docopt](#docopt)
  - [click](#click)
    - [arguments](#arguments)
      - [基本用法](#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
      - [多参数](#%E5%A4%9A%E5%8F%82%E6%95%B0)
      - [文件参数](#%E6%96%87%E4%BB%B6%E5%8F%82%E6%95%B0)
    - [option](#option)
      - [基本用法](#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95-1)
      - [多参数的选项](#%E5%A4%9A%E5%8F%82%E6%95%B0%E7%9A%84%E9%80%89%E9%A1%B9)
      - [多参数作为元组传入](#%E5%A4%9A%E5%8F%82%E6%95%B0%E4%BD%9C%E4%B8%BA%E5%85%83%E7%BB%84%E4%BC%A0%E5%85%A5)
      - [多次传入option](#%E5%A4%9A%E6%AC%A1%E4%BC%A0%E5%85%A5option)
      - [boolen判断](#boolen%E5%88%A4%E6%96%AD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python及应用8-命令行工具

### [docopt](http://docopt.org/)

### [click](http://click.pocoo.org/6/)

```bash
$ pip3 install click
```

```python
# clicker.py
import click
```

#### [arguments](http://click.pocoo.org/6/arguments/)

##### 基本用法

```python
@click.command()
@click.argument('name', default='ecmadao')
def arg_with_default(name):
	click.echo(name)
```

名为name的参数会传递给arg_with_default函数，而当我们不添加参数调用的时候则会使用默认值。

```bash
$ python3 clicker.py
# ecmadao
$ python3 clicker.py test
# test
```

##### 多参数

需要传递多个参数时，可以设定`nargs`。`nargs`为-1时代表可以接受多个参数，为1则只能接受一个参数。可以接受多个参数时，多参数以tuple的形式赋值

```python
@click.command()
@click.argument('says', nargs=-1)
@click.argument('name', nargs=1)
def hello_multiply_arg(says, name):
	print('{} says:'.format(name))
	for said in says:
		click.echo(said)
```

第一个参数`nargs=-1`，第二个`nargs=-1`，因此在调用时，整体从后往前匹配，最后一个参数赋值给name，其他的作为元组赋值给says

```bash
$ python3 clicker.py 1 2 ecmadao
# ecmadao says:
# 1
# 2
$ python3 clicker.py ecmadao
# ecmadao says:
```

##### 文件参数

传递一个文件路径作为参数，并设置`type=click.File(操作文件的形式)`，则在调用参数的函数内转化为文件对象。

```python
@click.command()
@click.argument('input', type=click.File('rb'))
@click.argument('output', type=click.File('wb'))
def inout(input, output):
    while True:
        chunk = input.read(1024)
        if not chunk:
            break
        output.write(chunk)
```

对于文件参数而言，可以使用一个默认的参数`-`，来作为特殊的文件输入/输出流

```bash
$ python3 clicker.py - hello.txt
# hello
$ python3 clicker.py hello.txt -
```

#### [option](http://click.pocoo.org/6/options/)

`option`有三种写法： 完整写法`--option`，缩写`-op`，不带`-`的写法

```python
@click.option('--save', '-s') # 在函数中作为参数名称为save
@click.option('-s') # 参数名称为s
@click.option('--save-local') # 参数名称为save_local
@click.option('--save', '-s', 'saved') # 参数名称为saved
```

##### 基本用法

```python
@click.command()
@click.option('--options', '-op', default=2)
def default_option(options):
	for option in range(options):
		click.echo(option)
```

```bash
$ python3 clicker.py
# 0
# 1
$ python3 clicker.py -op=3
# 0
# 1
# 2
```

##### 多参数的选项

每一个option只支持接收固定长度的参数(argument接收参数个数可以无限制)。多个参数作为元组赋值给option

多次重复调用option则可以不断传入参数(见下文**多次传入option**)

```python
@click.command()
@click.option('--op', nargs=2)
def multi_options(op):
	for option in op:
		click.echo(option)
```

如果传入的参数不是2个则无法正常运行

```bash
$ python3 clicker.py --op=0
# Error: --op option requires 2 arguments
$ python3 clicker.py --op=0 1
# 0
# 1
```

##### 多参数作为元组传入

这种方法传入option，不仅仅限制了option的数目，也同时限制了其type

实际作用等同于上面多参数的option，但限制了传递的类型

```python
@click.command()
@click.option('--item', type=(int, str, int))
def tuple_option(item):
	for i in item:
		click.echo(i)
```

```bash
$ python3 clicker.py --item=s 0 0 
# Error: Invalid value for "--item": s is not a valid integer
$ python3 clicker.py --item=0 s 0 
# 0
# s
# 0
```

##### 多次传入option

通过`multiple=True`可以在一次调用中无限次数的调用option，并最终将全部的值作为一个tuple代入函数

```python
@click.command()
@click.option('--message', '-m', multiple=True)
def commit(message):
    click.echo(' '.join(message))
```

```bash
$ python3 clicker.py -m foo -m bar
# foo bar
```

##### boolen判断

option可以有True或False的判断，并且能够在不传入option使用默认值

```python
@click.command()
@click.option('--happy/--no-happy', default=True)
def boolean_option(happy):
	if happy:
		print('happy')
	else:
		print('sad')
```

```bash
$ python3 clicker.py --happy
# happy
$ python3 clicker.py --no-happy
# happy
$ python3 clicker.py
# happy
```

如果不想使用这种True/False的两个参数的判断，则可以使用`is_flag=True`

```python
@click.command()
@click.option('--happy', is_flag=True)
def boolean_option(happy):
	if happy:
		print('happy')
	else:
		print('sad')
```

若传入option则为True，否则是False

```bash
$ python3 clicker.py --happy
# happy
$ python3 clicker.py
# sad
```