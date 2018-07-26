<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ruby 瞎探索](#ruby-%E7%9E%8E%E6%8E%A2%E7%B4%A2)
  - [基本语法](#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)
  - [循环](#%E5%BE%AA%E7%8E%AF)
  - [方法](#%E6%96%B9%E6%B3%95)
    - [方法的定义](#%E6%96%B9%E6%B3%95%E7%9A%84%E5%AE%9A%E4%B9%89)
  - [类](#%E7%B1%BB)
    - [存取器](#%E5%AD%98%E5%8F%96%E5%99%A8)
    - [类方法/单例类方法](#%E7%B1%BB%E6%96%B9%E6%B3%95%E5%8D%95%E4%BE%8B%E7%B1%BB%E6%96%B9%E6%B3%95)
    - [实例变量/类变量/常量](#%E5%AE%9E%E4%BE%8B%E5%8F%98%E9%87%8F%E7%B1%BB%E5%8F%98%E9%87%8F%E5%B8%B8%E9%87%8F)
    - [public/private/protected](#publicprivateprotected)
    - [扩展类](#%E6%89%A9%E5%B1%95%E7%B1%BB)
  - [模块](#%E6%A8%A1%E5%9D%97)
  - [块](#%E5%9D%97)
  - [数值类](#%E6%95%B0%E5%80%BC%E7%B1%BB)
    - [类型转换](#%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
    - [运算](#%E8%BF%90%E7%AE%97)
    - [方法](#%E6%96%B9%E6%B3%95-1)
  - [数组](#%E6%95%B0%E7%BB%84)
    - [创建数组](#%E5%88%9B%E5%BB%BA%E6%95%B0%E7%BB%84)
    - [索引](#%E7%B4%A2%E5%BC%95)
    - [集合运算](#%E9%9B%86%E5%90%88%E8%BF%90%E7%AE%97)
    - [常用方法](#%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95)
    - [遍历](#%E9%81%8D%E5%8E%86)
  - [字符串](#%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [常用操作](#%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C)
  - [散列](#%E6%95%A3%E5%88%97)
    - [散列的键值操作](#%E6%95%A3%E5%88%97%E7%9A%84%E9%94%AE%E5%80%BC%E6%93%8D%E4%BD%9C)
  - [Proc 类](#proc-%E7%B1%BB)
    - [封装块](#%E5%B0%81%E8%A3%85%E5%9D%97)
    - [lambda 表达式](#lambda-%E8%A1%A8%E8%BE%BE%E5%BC%8F)
    - [Proc 的实例方法](#proc-%E7%9A%84%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
  - [异常处理](#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)
  - [引入库](#%E5%BC%95%E5%85%A5%E5%BA%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ruby 瞎探索

- [Ruby style guide (zh)](https://github.com/JuanitoFatas/ruby-style-guide/blob/master/README-zhCN.md)

### 基本语法

```ruby
# 单行注释

=begin
多行注释
=end

# 命名变量和常量
=begin
局部变量 -> 以英文小写字母或者 _ 开头
全局变量 -> 以 $ 开头
实例变量 -> 以 @ 开头
类变量 -> 以 @@ 开头
常量 -> 由大写字母组成
=end

# 变量名和方法名使用小写字母和 _ 组合的形式命名，例如
sort_by
# 类名和模块名用小驼峰式命名，例如
messageController

# 字符串数字转换
string.to_i # 字符串转数字
number.to_s # 数字转字符串

# 字符串专 Symbol
string.to_sym
# 例
"1".to_sym # :"1"

"1".to_i # 1
1.to_s # "1"

# 多重赋值
a, b, c = 1, 2, 3
a, b, *c = 1, 2, 3, 4
print c # [3, 4]

a, *b, c = 1, 2, 3, 4
print b # [2, 3]

a, b = 1, 2
a, b = b, a
print a, b # 21

a, b = [1, 2, 3]
print a # 1
print b # 2
```

```ruby
# 打印
name = "ecmadao"
print "Hello #{name}" # Hello ecmadao
# 单引号会直接输出换行等符号以及变量
print 'Hello\n#{name}' # Hello\n#{name}
print "Hello ", name # Hello, ecmadao

# puts 方法在每次输出后会加入换行符
puts "Hello", name
# Hello
# ecmadao

# p 方法的输出会区分字符串和数字
p "100" # "100"
p 100 # 100
# p 的输出也不会对换行符等符号进行转义
p "Hello\n#{name}" # Hello\necmadao

# 格式化输出，需要提前引入
require "pp"
arr = [
  1,
  2
]
pp arr
```

```ruby
# 真假
# 在 Ruby 中，false 和 nil 为假，其他都是真
# 且返回真假值的方法都要以 ? 结尾

# 控制语句 和 循环

# if
if condition then
  # do something
elsif condition then
  # do something
else
  # do something
end

# unless
# unless 中当 condition 为假时执行
unless condition then
  # do something
else
  # do something
end

unless 1 > 2 then
  puts '1 > 2 is false'
else
  puts '1 < 2'
end
# 1 > 2 is false

# one line code
a = 1 unless false
print a # 1

# while
while condition do
  # do something
end

# case
=begin
case 语句在执行时使用的 === 运算符
=== 运算符除了具有 == 的功能外（判断值是否相等），还能判断右边的对象是否属于左边的类

例如：

1 == "1" # false
1 === "1" # false
String === "1" # true
=end

# case 和 when 在同一级
case target
when value1 then
  # do
when value2 then
  # do
else
  # do
end

# case 语句的结果可以赋值
val = case year
      when 1850..1889 then 'Blues'
      when 1890..1909 then 'Ragtime'
      when 1910..1929 then 'New Orleans Jazz'
      when 1930..1939 then 'Swing'
      when 1940..1950 then 'Bebop'
      else 'Jazz'
      end

# times 迭代器
number.times do
  # do something
end
```

```ruby
# 对象的同一性

=begin
Ruby 中所有的对象都是唯一的，可以通过
object_id 或者 __id__ 获取其 id，例如：

array.object_id
array.__id__

利用 .equal? 方法来判断两个对象的 id 是否一致
=end
str1 = "foo"
str2 = str1
str1.equal?(str2) # true
str2.equal?("foo") # false

=begin
对象的值就是对象拥有的信息
只要对象的字符串内容相等，Ruby 的 == 就会认为对象是相等的
=end
str = "foo"
str == "foo" # true

=begin
除 == 以外，还有 .eql? 方法来判断值是否相等
但对于数值类型而言，浮点数和整形是不等的
=end
1 == 1.0 # true
1.eql?(1.0) # false
```

### 循环

```ruby
=begin
number.times do
  # do
end

number.times {
  # do
}

number.times do |index|
  # do
end

number.times { |index| dosomething }
=end

3.times do |i|
  print i
end

=begin
for i in from..to do
  # do
end

for item in list do
  # do
end

while condition do
  # do
end

until condition do
  # do
end

对象.each do |变量|
  # do
end

对象.each { |变量| dosomething }
=end

(1..3).each do |i|
  print i
end

=begin
loop 无限循环，除非设置条件 break
loop do
  # do
end
=end
loop do
  print "233"
end

=begin
循环控制
break: 终止循环
next: 进入下一次循环
redo: 在相同的条件下重复刚才的处理
=end

10.times do |i|
  puts i
end
# 相当于
10.times { |i| puts i }
```

### 方法

调用方法即向对象发送消息。

```ruby
=begin
方法定义的语法：
def 方法名(参数1, ...)
  块内容
end

========================

方法调用的语法：

对象.方法名 (参数, ...) do |变量1, ...|
  块内容
end

对象.方法名 (参数, ...) { |变量1, ...|
  块内容
}
=end
```

- 实例方法：实例对象是消息的接受者，通过`实例.方法`的形式调用
- 类方法：接受者是类本身。除`类.方法`外，还能通过`类::方法`调用
- 函数式方法：省略了接受者

#### 方法的定义

在方法定义时，可以给参数指定默认值，类似 ES6，并且有位置参数和关键字参数，类似 Python

在方法内，如果没有手动 return，则最后一个表达式的执行结果就会成为方法返回值。

```ruby
# 默认参数
def foo(name = "Ruby")
  print "name is #{name}"
end

foo() # name is Ruby

# 位置参数
def foo(arg, *args)
  print [arg, args]
end

foo(1, 2, 3) # [1, [2, 3]]

def foo(arg1, *args, arg2)
  print [arg, args, arg2]
end

fee(1, 2, 3) # [1, [2], 3]

# 关键字参数
# 定义关键字参数的同时，给某些关键字参数加上默认值
# 注意：
# 1. 忽略了默认值的参数在调用时不可忽略
# 2. 如果没有 **args，则不能传入未定义的参数
def foo(x:, y: 0, z:)
  print x + y + z
end

foo(z: 3, x: 1) # 4

# args 会把多传入的关键字参数作为散列储存
def foo(x:, **args)
  print args
end

foo(x: 1, z: 2, y: 3) # {:z => 2, :y => 3}

# 还能直接把散列传入
dict = { :x => 1, :z => 2 }
# or dict = {x: 1, z: 2}
foo(dict)
```

### 类

```ruby
# BasicObject 类是 Ruby 中所有类的父类

# .class 方法获取实例所属的类
arr = []
arr.class # Array

# .instance_of? 方法判断实例是否是某个类
arr.instance_of?(Array) # true

# .is_a? 方法在继承链上判断对象是否属于某个类
String.is_a?(Object) # true
'1'.is_a?(String) # true
```

#### 存取器

```ruby
class Foo
  # 存取器，定义 name 实例变量是可读写的
  attr_accessor :name

  # ================ 初始化方法 ================
  def initialize(x:, y: 2, z: 3, name: 'foo')
    @x = x # 初始实例变量
    @y = y # 只有获取没有赋值，被定义为只读
    @z = z # 实例变量在没有存取器的时候，不能获取或者赋值
    @name = name
  end

  def echo
    puts "x: #{@x}, y: #{@y}, z: #{@z}"
    # 或者
    # puts "x: #{this.x}..."
    # this 指向了该方法的接受者，即该类的实例
  end

  # ================ 存取器 ================
  def x
    @x
  end

  def x=(val)
    @x = val
  end

=begin
除了直接定义 存取器 外，还可以通过便捷方式：
attr_reader :name => 实例变量只读
attr_writer :name => 实例变量只写
attr_accessor :name => 实例变量可读写
=end

  # y 是只读
  def y
    @y
  end
end

foo = Foo.new(x: 1)
foo.echo # x: 1, y: 2, z: 3
puts foo.name # 已经定义 name 为可读写
foo.name = 123
puts foo.name # 123
# 而 y 为只读
puts foo.y # 2
foo.y = 3 # error!
```

#### 类方法/单例类方法

```ruby
# 类方法
# 为类定义类方法有如下一些形式

# Template 1
class << Foo
  def hello(name)
    puts "hello #{name}"
  end
end

# Template 2
class Foo
  class << self
    def hello(name)
      puts "hello #{name}"
    end
  end
end

# Template 3
class Foo
  def self.hello(name)
    puts "hello #{name}"
  end
end

# Template 4
def Foo.hello(name)
  puts "hello #{name}"
end

Foo.hello('123') # 调用类方法
```

```ruby
# 单例类方法
# 单例类方法即只给某个类的实例定义的方法，仅有该实例可以调用

# Template
class << instance
  def func
   # do
  end
end

# example

str1 = "1"
str2 = "2"

class << str1
  def hello
    puts "hello"
  end
end

str1.hello # hello
str2.hello # error
```

#### 实例变量/类变量/常量

```ruby
# 变量/常量

=begin
实例变量：以 @ 开头，提供外部访问、修改时需要定义存取器
例如：@name

类变量：以 @@ 开头，也需要定义存取器，但是不能使用 attr_accessor 等便捷方式去定义
例如：@@name

常量：以首字母大写开头
例如：Name
=end

# 类常量通过 类名::Name 访问
class Foo
  Version = 1
end

puts Foo::Version # 1

# 类变量是所有实例的共享变量
class Foo
  @@count = 0

  def Foo.count
    @@count
  end

  def call
    @@count += 1
  end
end

foo1 = Foo.new()
foo2 = Foo.new()

foo1.call
foo2.call
Foo.count # 2
```

#### public/private/protected

```ruby
# 类方法

=begin
public - 以实例方法的形式向外部公开
private - 在指定接受者的情况下不能调用，即无法从实例的外部访问
protected - 在同一个类中可将该方法作为实例方法访问
=end

class Foo
=begin
通过 public/private/protected :func1, :func2 来指定某些方法的类型
当关键字后面不加方法名时，表示该关键字后面的所有方法（直到遇见下一个关键字）都属于该类型
=end
  public
  # 如果需要单独指定 foo 则需写作 public :foo
  def foo
    puts "foo"
  end

  private
  def boo
    puts "boo"
  end

  protected :call
  def call
    puts "protected func was called"
  end

  def call_protected_func(instance)
    instance.call
  end
end

foo = Foo.new()
foo2 = Foo.new
foo.foo
foo.boo # error
# 可以调用 protected 类型的方法
foo.call_protected_func(foo2) # "protected func was called"
```

#### 扩展类

```ruby
# 在原有类的基础上增加方法
class Foo
end

class Foo
  def new_func
    puts "new func"
  end
end
```

```ruby
=begin
通过继承来扩展类

class 类名 < 父类
end

在重写父类的方法时，可以在方法内通过 super 调用父类的同名方法
=end

class Foo
  def echo
    puts "foo"
  end
end

class Boo < Foo
  def echo
    puts "boo"
    super
  end
end

boo = Boo.new
boo.echo
# boo
# foo
```

在没有指定父类时，Ruby 会默认继承`Object`类作为父类。也可以手动指定父类为`BasicObject`类

```ruby
# 如果在复写父类同名方法的同时还想保留原有的父类方法，则可以通过 alias 给其设置别名
class Boo < Foo
  alias foo_echo echo

  def echo
    puts "boo"
  end
end

boo = Boo.new
boo.foo_echo # foo
boo.echo # boo
```

```ruby
# 可以利用 undef 删除已经定义的方法
class Boo < Foo
  undef echo
end

boo = Boo.new
boo.echo # error
```

### 模块

模块类似与类，语法非常相似，但主要有两点不同：

1. 模块不能拥有实例
2. 模块不能被继承，只能通过`include`的形式被类扩展

因此，虽然类不能多重继承，但可以通过 Mix-in 的形式来添加一些通用的模块的功能

```ruby
=begin
创建模块
和类一样，模块名称的首字母必须大写

module 模块名
  模块定义
end
=end

module ExampleModule
  Version = 1 # 定义常量

  def echo
    puts "example"
  end

  def test
    puts "test"
  end

  # 如果想能够通过 模块.方法 的形式调用模块内的方法，
  # 则需要通过 module_function 进行暴露
  module_function :echo
end

puts ExampleModule::Version # 1
ExampleModule.echo # "example"

# 类扩展模块
# 扩展之后即可为类增加模块的实例方法
class ExampleClass
  include ExampleModule
end

ExampleClass.new.echo # "example"
```

```ruby
# 可以通过 Class.include?(Module) 来判断一个类是否扩展了某个模块
ExampleClass.include?(ExampleModule) # true

# 可以通过 Class.ancestors 获取到类的继承关系
ExampleClass.ancestors # [ExampleClass, ExampleModule, Object, Kernel, BasicObject]
# 而 Class.superclass 方法返回类的直接父类
ExampleClass.superclass # Object

=begin
对于继承了类，扩展了模块的某个子类，在调用子类实例的方法时，有如下查找链：

1. 如果子类中已有该方法，则使用该方法
2. 在同一个类中包含了多个模块时，优先使用最后一个 include 的模块
3. 嵌套 include 时，也会按照由外到内的深入顺序查找
4. 同一个模块被 include 两次时，第二次会被忽略
=end

=begin
可以通过 实例.extend(Modlue) 来给实例增加模块的方法
=end
str = "1"
str.extend(ExampleModule)
str.test # "test"

=begin
而类的 extend Module 则是给类扩展类方法
类的 include Module 是给类扩展实例方法
=end
Module ExampleModule2
  def echo2
    puts "example2"
  end
end

class ExampleClass
  include ExampleModule
  extend ExampleModule2
end

ExampleClass.new.echo # "example"
ExampleClass.echo2 # "example2"
```

### 块

> 个人感觉较为类似 JavaScript 中的回调

```ruby
=begin
块调用的语法

对象.方法名(参数) do |块变量|
  # do
end

对象.方法名(参数) { |块变量|
  # do
}
=end

# 例如
list = [1, 2, 3]
list.each do |item|
  puts item
end

list.each_with_index do |item, index|
  puts "item: #{item}, index: #{index}"
end

dict = { :a => 1, :b => 2 }
dict.each do |key, val|
  puts "key: #{key}, val: #{val}"
end
```

```ruby
# 定义带块的方法
def function
  # 如果有参数要传递给块，则可以 yield(params)
  # 否则仅 yield 即可
  yield(1)
end

function do |value|
  puts value
end
# 1

# ===============================================================

# 在带块的方法内，yield 调用的次数不受限制
def function
  yield(1)
  yield(2)
end

function do |value|
  puts value
end
# 1
# 2

# ===============================================================

=begin
在带块的方法内，可以通过 block_given? 来判断是否有块传入
或者将块封装为对象写在参数中，即在定义方法时，在最末尾的参数使用 &参数名 的形式，
则 Ruby 会把传入的块封装为 Proc 对象
=end

def function
  if block_given? then
    puts "block_given"
    yield
  else
    puts "no block given"
end

# Proc 参数一定要在最后一位
def function(val, &block)
  if block then
    puts "has block"
    # 如果没有传入块，则 block 为 nil
    # 在调用 Proc 对象的 call 方法之前，块中定义的程序不会被执行
    block.call(val)
  else
    puts "no block"
  end
end

# ===============================================================

# 将块封装为对象
# 利用 Proc.new 方法，将块封装，之后可以通过 .call 方法调用块
echo = Proc.new do |val|
  puts "echo #{val}"
end

echo.call ("Ruby") # echo Ruby
```

```ruby
# 控制块的执行

=begin
break
在块中使用 break，则会抛弃已经计算的结果，返回到块被调用的地方
可以通过 break val 来指定退出块时的返回值

next
next 会使程序中断当前处理
next 后可以指定返回的参数，否则返回 nil

redo
redo 会使程序回到块执行的开头，再次以相同的参数对块进行调用
在这种情况下，块处理的结果不会返回给外部（知道块调用完成）
此时如果不注意处理块退出的逻辑，可能会造成死循环
=end
n = 5.times do |i|
  if i == 2
    break 10
  end
  i
end

puts n # 10
```

### 数值类

```text
Numeric 数值 ------ Integer 整数 ----- Fixnum 普通的整数
              |                   |
              |                   |__ Bignum 大整数
              |
              |--- Float 浮点数
              |
              |--- Rational 有理数
              |
              |___ Complex 复数
```

```ruby
# 有理数用 Rational 类表示
r = Rational(2, 5) # 表示 2/5
r.numerator # 获取分子
r.denominator # 获取分母

# 复数用 Complex 类表示
c = Complex(1, 2) # 表示 1 + 2i
c.real # 获取实数部分
c.imaginary # 获取虚数部分
```

#### 类型转换

```ruby
=begin
num.to_i
num.to_f
num.to_r
num.to_c

在小数和整数的末尾添加 r 即可得到 Rational 对象
在小数和整数的末尾添加 i 即可得到 Complex 对象

在 ** 乘方运算时，指数如果为负整数，则返回有理数的 Rational 对象
5 ** -2 => (1/25)

============================================================

round 可以对小数进行四舍五入，并指定位数
- 当参数为正数时，指定取几位小数
- 当参数为负时，则往整数部分取整
0.12.round(1) => 0.1
120.round(-2) => 100
180.rount(-2) => 200

ceil 向大数的方向取整
1.2.ceil => 2
-1.2.ceil => -1

floor 向小数的方向取整
1.8.floor => 1
-1.2.floor => -2
=end
```

#### 运算

```ruby
# x.div(y) 相当于 (x / y).floor
5.div(2) # 2
-5.div(2) # -3

# x.quo(y) 返回 x / y 的商。如果 x,y 都是整数，则返回 Rational 对象
5.quo(2) # (5/2)

# x.modulo(y) 相当于 x % y

# x.divmod(y) 返回商和余数的数组，相当于 [x.div(y), x.modulo(y)]

# x.remainder(y) 返回 x 除以 y 的余数。和 x % y 相比，该方法返回数值的符号和 x 一致
-5 % 2 # 1
-5.remainder(2) # -1
```

```ruby
# 随机数
Random.rand # 返回比 1 小的随机浮点数
Random.rand(num) # 返回 0 到 num（正整数）之间的正整数

# 生成随机数种子
r = Random.new(num)
r = Random.new # 不指定参数会使每次的种子不一样
r.rand
```

#### 方法

```ruby
# n.times { |i| ... }
2.times { |index|
  puts index
}

# from.upto(to) { |i| ... } 相当于 from...to
1.upto(3) { |index|
  puts index
}

# from.downto(to) { |i| ... }
3.downto(1) { |index|
  puts index
}

# from.step(to, step) { |i| ... }
1.step(3, 2) { |index|
  puts index
}
```

### 数组

#### 创建数组

```ruby
# 利用 Array.new 构造函数
Array.new # []
Array.new(3) # [nil, nil, nil]
Array.new(3, 1) # [1, 1, 1]

# Array.new 可以指定块
a = Array.new(3) do
  [1]
end
a # [[1], [1], [1]]

# 用 %w 创建不包含空白的字符串数组
%w(1 2 3) # ["1", "2", "3"]

# 用 %i 创建不包含空白的符号数组
%i(1 2 3) # [:"1", :"2", :"3"]

# 通过 to_a 方法将散列转换为 [[:key, val]] 形式的数组
dict = { "a": 1 }
dict.to_a # [[:a, 1]]

# 通过 split 方法
"1,2,3".split(',') # [1, 2, 3]
```

#### 索引

```ruby
# 索引
a[n] # 索引为负时从末尾开始获取元素
a[n..m] # 获取索引在 [n, m] 范围内的元素
a[n...m] # 获取索引在 [n, m) 范围内的元素
a[n, len] # 获取索引在 [n, n + len) 范围内的元素

a.at(n) # 相当于 a[n]
a.slice(n) # 相当于 a[n]
a.slice(n, len) # 相当于 a[n, len]
a.slice(n..m) # 相当于 a[n..m]

a.values_at(n1, n2,...) # 获取指定位置上的索引

# 替换
# 索引的方法可以直接赋值以进行元素的替换，例如，
a = [1, 2, 3, 4, 5]
a[1..2] # [2, 3]
a[1..2] = 2
a => [1, 2, 4, 5]

a[1..2] = [9, 10]
a => [1, 9, 10, 5]

# 通过 a[n, 0] 可以在第 n 位上插入元素
a[1, 0] = 100
a => [1, 100, 9, 10, 5]

# 即便插入的是数组，也会被扁平展开
a[1, 0] = [1, 2]
a => [1, 1, 2, 100, 9, 10, 5]
```

#### 集合运算

```ruby
arr1 = [1, 1, 2]
arr2 = [2, 3, 4]

# 交集
# arr1 & arr2
arr1 & arr2 # [2]

# 并集，不会包含重复元素
# arr1 | arr2
arr1 | arr2 # [1, 2, 3, 4]

# 数组连接
# arr1 + arr2
arr1 + arr2 # [1, 1, 2, 2, 3, 4]

# 差集
# arr1 - arr2
arr1 - arr2 # [1, 1]
```

#### 常用方法

```ruby
array.length
array.size
array.empty?

# 对数组末尾的操作
array.push(num)
array << item
array.pop
array.last

# 对数组开头的操作
array.unshift(num)
array.shift
array.first

# 数组合并
array.concat(arr) # 修改原有数组
array + arr # 不修改数组，返回新数组

# 删除元素
# 删除所有 nil
arr.compact # 返回新数组
arr.compact! # 直接修改原数组

# 删除所有指定元素
arr.delete(num) # 直接修改原数组

# 删除指定位置的元素
arr.delete_at(n) # 直接修改原数组

# 根据条件删除
a.delete_if { |item| ... } # 直接修改原数组
a.reject { |item| ... } # 返回新数组
a.reject! { |item| ... } # 直接修改原数组

# 利用 slice! 删除
a.slice!(n)
a.slice!(n..m)
a.slice!(n...m)
a.slice!(n, len)

# 删除重复元素
a.uniq # 返回新数组
a.uniq! # 修改原数组

# 直接在原数组上替换
a.fill(value) # 将所有元素都换位 value
a.fill(value, begin)
a.fill(value, begin, len)
a.fill(value, n..m)
a.fill(value, n...m)

# 将嵌套的数组扁平化
a.flatten
a.flatten!

# 反转数组
a.reverse
a.reverse!

# 排序
a.sort
a.sort!
a.sort { |i, j| ... }
a.sort! { |i, j| ... }
a.sort_by { |i| ... }
a.sort_by! { |i| ... }
```

#### 遍历

```ruby
# 遍历数组

# map/collect
a.collect { |item| ... }
a.collect! { |item| ... }
a.map { |item| ... }
a.map! { |item| ... }

['1', '2', '3'].map(&:to_i) # [1, 2, 3]

arr = [1, 2, 3].collect { |item| item * 2 }
print arr # [2,4,6]

# each
a.each { |item| ... }
a.each do |item|
  ...
end

# each_with_index
a.each_with_index { |item, index| ... }

# 利用 zip 同时访问多个数组
a1 = [1, 2, 3]
a2 = [4, 5, 6]

a1.zip(a2) do |val1, val2|
  puts "sum: #{val1 + val2}"
end
```

### 字符串

```ruby
s.length
s.size
s.empty?
String.new # ""

# %Q 可创建 "" 字符串
%Q{123} # "123"

# %q 可创建 '' 字符串
%q{123} # '123'

# sprintf/format 格式化字符串
a = sprintf("hello, %s", "world")
```

#### 常用操作

```ruby
s1 + s2 # 拼接，返回新字符串
s1 << s2 # 把 s2 加在 s1 后面
s1.concat(s2) # 把 s2 加在 s1 后面

# 删除字符串最后一个字符
s.chop
s.chop!

# 删除字符串行末的换行符
s.chomp
s.chomp!

# 获取索引
s.index('char') # 获取从开头开始第一次出现时的索引
s.rindex('char') # 获取从结尾开始第一次出现时的索引

s.include?('char') # 判断是否包含某子字符串

# 字符串的索引、删除、反转操作和数组一样

# 删除两端的空白字符
s.strip
s.strip!

# 改变大小写
# 全部大写
s.upcase
s.upcase!

# 全部小写
s.downcase
s.downcase!

# 大小写反转
s.swapcase
s.swapcase!

# 仅首字母大写，其他小写
s.capitalize
s.capitalize!

# 替换字符
s.tr('B', 'b') # 将 B 替换为 b
```

### 散列

```ruby
h.length
h.size
h.empty?

# 创建散列
h = { "a" => 1 }
h["a"] # 1

h = { a: 1 } # 键将作为符号 { :a => 1 }
h[:a] # 1

# 通过 Hash.new/Hash.new(default)
h = Hash.new
h[:a] # nil

h = Hash.new("none")
h[:a] # none

# 或者在 Hash.new 时指定块
h = Hash.new do |hash, key|
  hash[key] = key.upcase
end
h["x"] # X
```

#### 散列的键值操作

```ruby
h = Hash.new

# store 储存值
h.store("R", "Ruby")
h.store(:r, "Ruby")

# fetch 获取值
h.fetch(:r) # "Ruby"

# 当 fetch 的 key 不存在时会报错
h.fetch(:m) # error
# 可以给 fetch 指定键不存在时的默认返回值
h.fetch(:m, nil)
# fetch 还可以指定块
h.fetch(:m) {
  # return default value
}
```

```ruby
# 获取所有键
h.keys

# 获取所有值
k.values

# 以 [键, 值] 的形式获取所有键值对
k.to_a

# 迭代
h.each_key { |key| ... }
h.each_value { |value| ... }
h.each { |key, value| ... }
h.each { |arr| ... }
```

```ruby
# 判断是否含有指定的键
h.key?(key)
h.has_key?(key)
h.include?(key)
h.member?(key)

# 判断是否含有指定的值
h.value?(value)
h.has_value?(value)

# 删除键值对
h.delete(key)
h.delete_if { |key, val| ... } # 返回修改后的散列
h.reject! { |key, val| ... } # 返回 nil

# 清空散列的所有键值对
h.clear

# 合并散列，merge 和 update 用法相同
h1.merge(h2)
h1.merge!(h2)

h1.update(h2)
h1.update!(h2)
```

关于判断散列中的键是否相等：

对于两个键 key1 和 key2，如果`key1.hash == key2.hash && key1.eql?(key2)`，则认为两个键相等

### Proc 类

#### 封装块

`Proc`类可以使块对象化

```ruby
# 创建 Proc 对象
echo = Proc.new do |name|
  puts "echo: #{name}"
end

echo.call("ruby") # echo: ruby

echo = proc do |name|
  puts "echo: #{name}"
end

# 块变量可以使用可变参数或关键字参数
double = Proc.new do |*args|
  args.map { |val| val * 2 }
end
double.call(1, 2, 3) # 2, 4, 6
```

#### lambda 表达式

- Proc 创建的块对象，在调用时，传入的参数和块可接受的参数个数可以不同；但 lambda 则要求参数数量必须对应
- lambda 表达式可以使用 return 将值从块中返回，而通过 Proc 创建的块中如果调用 return，则会跳过当前执行的块
- 对于 break，表现和 return 一样

```ruby
lam = lambda do |a, b, c|
  a + b + c
end

lam.call(1, 2, 3) # 6

# 闭包
def power_of(n)
  lambda do |x|
    return x ** n
  end
end

cube = power_of(3)
cube.call(5) # 125

# lambda 的另一种简写方式
# -> (块变量) { do... }
square = -> (n) { return n ** 2 }
square[5] # 25
```

#### Proc 的实例方法

```ruby
# 执行块
prc.call(args)
prc[args, ..]
prc.yield(args)
prc.(args)
prc === arg # 只能传递一个参数，可以是数组

# 获取参数个数
prc.arity # 返回作为 call 方法的参数的块变量个数
p = Proc.new { |a| a }
p.arity # 1
# 当以 *args 形式指定块变量时，返回 -1
p = Proc.new { |*args| args }
p.arity # -1

prc.lambda? # 判断是否是 lambda 表达式
```

### 异常处理

```ruby
=begin
基本语法

begin
  # do
rescue => ex
  # handle error
end

ex 对象的方法：
ex.class # 异常的种类
ex.message # 异常信息
ex.backtrace # 异常的发生未知

在没有赋值 ex 的时候，可以在异常处理块内通过 $! 获取到异常对象，通过 $@ 获取到发生异常的位置
begin
  # do
rescue
  puts $!.message
  puts $@
end

在处理异常的时候可以通过 ensure 执行希望总能够处理的语句
begin
  # do
rescue
  # handle error
ensure
  # always do
end

可以使用多个 rescue 来捕捉不同类型的错误
可以通过 raise 来抛出错误
=end

def open_file
  File.open('not_exist_file')
end

def handle_file(file)
  raise "some unexpect error"
end

io = open_file
begin
  handle_file(io)
rescue
  puts $!.message
ensure
  io.close
end

=begin
如果错误处理的范围是整个方法或者类的话，则可以省略 begin 和 end
例如，

def function
  # do
rescue => ex
  # handle error
ensure
  # final
end

class Foo
  # class info
rescue => ex
  # handle error
ensure
  # final
end
=end
```

### 引入库

```ruby
require some_library
require_relative some_library

# 在 require 之后，Ruby 会同步式的搜索并读取库中的内容，读取完毕之后再运行后序的代码
# require_relative 引入的是相对当前文件的其他文件路径
```

```ruby
require "date"

days = Date.today - Date.new(1993, 2, 24)
puts days.to_i
```
