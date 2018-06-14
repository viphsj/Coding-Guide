## Ruby 瞎探索

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
case target
when value1 then
  # do
when value2 then
  # do
else
  # do
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

在方法内，如果没有手动 return，则最后一个表达式的执行结果就会成为方法发返回值。

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
  # 存取器，定义 name 实例变量时可读写的
  attr_accessor :name

  # ================ 初始化方法 ================
  def initialize(x:, y: 2, z: 3, name: 'foo')
    @x = x # 初始实例变量
    @y = y # 只有获取没有赋值，被定义为只读
    @z = z # 实例变量在没有存取器的时候，不能获取或者赋值
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
```

#### 类方法/单例类方法

```ruby
# 类方法

# 为类定义类方法有如下一些形式
class << Foo
  def hello(name)
    puts "hello #{name}"
  end
end

class Foo
  class << self
    def hello(name)
      puts "hello #{name}"
    end
  end
end

class Foo
  def self.hello(name)
    puts "hello #{name}"
  end
end

def Foo.hello(name)
  puts "hello #{name}"
end

Foo.hello('123') # 调用类方法
```

```ruby
# 单例类方法

# 单例类方法即只给某个类的实例定义的方法，仅有该实例可以调用

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
@name

类变量：以 @@ 开头，也需要定义存取器，但是不能使用 attr_accessor 等便捷方式去定义
@@name

常量：以首字母大写开头
Name
=end

# 类常量通过 类名::Name 访问
class Foo
  Version = 1
end

puts Foo::Version

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

  # 如果想能够通过 模块.方法 的形式调用模块内的方法，
  # 则需要通过 module_function 进行暴露
  module_function :echo
  def echo
    puts "example"
  end
end

ExampleModule.Version # 1
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
str.echo # "example"

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
    echo "block_given"
    yield
  else
    echo "no block given"
end

# Proc 参数一定要在最后一位
def function(val, &block)
  if block then
    echo "has block"
    # 如果没有传入块，则 block 为 nil
    # 在调用 Proc 对象的 call 方法之前，块中定义的程序不会被执行
    block.call(val)
  else
    echo "no block"
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

### 异常处理