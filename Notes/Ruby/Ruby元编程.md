<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ruby 元编程](#ruby-%E5%85%83%E7%BC%96%E7%A8%8B)
  - [对象模型](#%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%9E%8B)
    - [方法，属性，链](#%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7%E9%93%BE)
    - [Monkey patch](#monkey-patch)
      - [修改实例方法](#%E4%BF%AE%E6%94%B9%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
      - [修改类方法](#%E4%BF%AE%E6%94%B9%E7%B1%BB%E6%96%B9%E6%B3%95)
  - [方法](#%E6%96%B9%E6%B3%95)
    - [动态方法](#%E5%8A%A8%E6%80%81%E6%96%B9%E6%B3%95)
    - [`method_missing`](#method_missing)
    - [`method_missing` in JavaScript](#method_missing-in-javascript)
  - [代码块](#%E4%BB%A3%E7%A0%81%E5%9D%97)
    - [块的闭包](#%E5%9D%97%E7%9A%84%E9%97%AD%E5%8C%85)
    - [作用域门](#%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%97%A8)
    - [扁平化作用域](#%E6%89%81%E5%B9%B3%E5%8C%96%E4%BD%9C%E7%94%A8%E5%9F%9F)
    - [上下文探针](#%E4%B8%8A%E4%B8%8B%E6%96%87%E6%8E%A2%E9%92%88)
    - [Proc 对象](#proc-%E5%AF%B9%E8%B1%A1)
  - [类定义](#%E7%B1%BB%E5%AE%9A%E4%B9%89)
    - [`class_eval`/`module_eval`](#class_evalmodule_eval)
    - [实例变量和类变量](#%E5%AE%9E%E4%BE%8B%E5%8F%98%E9%87%8F%E5%92%8C%E7%B1%BB%E5%8F%98%E9%87%8F)
    - [单件方法](#%E5%8D%95%E4%BB%B6%E6%96%B9%E6%B3%95)
    - [类宏](#%E7%B1%BB%E5%AE%8F)
    - [类扩展](#%E7%B1%BB%E6%89%A9%E5%B1%95)
    - [别名/环绕别名](#%E5%88%AB%E5%90%8D%E7%8E%AF%E7%BB%95%E5%88%AB%E5%90%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ruby 元编程

元编程，即动态生成代码的代码。其本质上就是在运行过程中，动态的改变类或者实例的方法、属性等特性，在调用前不需要像静态语言那样预先定义好所有的代码。Ruby 动态语言的特性和其暴露出的 API 可以轻松的达到元编程所需的条件。

- [《Ruby 元编程》中的那些干货](http://liuxiang.logdown.com/posts/161099-the-ruby-metaprogramming-in-the-dry)

### 对象模型

- 对象由一组实例变量和一个类的引用组成
- 类本身是 Class 类的对象。类名仅仅是一个常量
- 当类包含一个模块时，该模块会被插入到祖先链中，位于该类的正上方

#### 方法，属性，链

```ruby
# 获取对象的实例方法 obj.methods
# 相当于 Class.instance_methods
"1".methods === String.instance_methods

# 获取对象的实例变量
obj.instance_variables
```

```ruby
# 类自身也是对象，适用于对象的规则也适用于类
"1".class # String
String.class # Class

# 可以通过 superclass 获取到类的超类
String.superclass # Object
Object.superclass # BasicObject
BasicObject.superclass # nil

# 类也是模块，只是增强的 Module
Class.superclass # Module
Module.superclass # Object

# 当一个方法被调用的时候，Ruby 会沿着调用的接受者（receiver）的祖先链（ancestors）上寻找
# 祖先链会包括引用的模块
String.ancestors # [String, Comparable, Object, Kernel, BasicObject]
# Object 类包含了 Kernel 模块，因此 Kernel 进入了每个对象的祖先链
```

在调用一个方法或属性时，即给某个对象传递消息，要求调用该对象的方法或属性。
Ruby 维持对这个接受者（self）的引用，以便在作用域内寻找方法调用时所需的条件。
在一开始运行 Ruby 时，解释器会创建一个名为 main 的对象作为当前对象，即顶级上下文，此时处于调用堆栈的顶层

对于调用私有方法而言：

1. 如果调用方法的接受者不是自己，则必须指明一个接受者
2. 私有方法只能被隐含的接受者调用

#### Monkey patch

打开已有的类，为其增改方法的行为被称之为“猴子补丁”

##### 修改实例方法

```ruby
class String
  def to_n
    self.to_i
  end
end

"1".to_n # 1

# 除了方法之外，还能够打开类扩展模块，将模块的方法作为类的实例方法
class SomeClass
  include SomeModule
end
```

除了打开类以外，还能够为实例扩展方法

```ruby
"string".extend(SomeModule)
```

##### 修改类方法

```ruby
# 已知类
class Foo
end

# 扩展类方法
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

# 扩展模块，将模块的方法作为类方法
class Foo
  extend SomeModule
end
```

同样的，可以扩展单例方法，即仅此实例可以调用

```ruby
str = "1"
class << str
  def hello
    puts "hello"
  end
end

str.hello # "hello"

# 注意，如果是通过这种形式，则不是单例方法
class << "1"
  def hello
    puts "hello"
  end
end
"1".hello # errir
```

但猴子补丁的问题是，如果后续增改的方法和已有的方法重名，则会造成未知的影响

### 方法

#### 动态方法

动态方法，即将调研的方法名作为一个变量，可以在代码运行期间，真正的调用时才决定需要调用的方法，即**动态派发**

```ruby
# ruby 对象中的 send 方法可以将方法名作为参数动态调用
# obj.send(:method, params, ...)

# 还可以带上代码块
# obj.send(:method, params) { |x| ... }
class Example
  def echo
    puts "send example"
  end
end

Example.new.send(echo)
Example.new.send(:echo)
```

除了动态调用以外，还能动态创建方法

```ruby
# Module#define_method
class Example
=begin
define_method :method do |params|
  # do
end
=end
  # 注意，define_method 是个类方法
  def self.create(name)
    # 但创建的是实例方法
    define_method name do |*args|
      print args
    end
  end
end

Example.create("test")
Example.new.test(1,2,3)
```

`define_method` 除了在 Class 内部使用以外，也可以直接在外部创建方法：

```ruby
chars = %w(a b c)
chars.each_with_index do |char, index|
  define_method char.to_sym do
    puts index ** 2
  end
end

c() # 4
```

#### `method_missing`

当调用对象中并不存在的方法时，会触发`method_missing`方法。可以通过覆写该方法，动态的自定义的处理缺失的方法

```ruby
class Example
  def method_missing(method, *args)
    puts "You just called #{method} with #{args.join(',')}"
  end
end

Example.new.not_exist_method 1 # You just called not_exist_method with 1
```

被`method_missing`方法处理的消息，对于调用者而言，和普通方法相比没有区别，但对于接受者，实际上并没有这些方法，因此被称之为**幽灵方法**。一个捕获幽灵方法的调用，并把它转发给另一个对象的对象，称之为**动态代理**

通过`method_missing`处理的方法，不会相应`respond_to?`方法，如果需要，则还需覆写`respond_to?`方法

```ruby
example = Example.new

example.wow('!')
example.respond_to?(:wow) # false

class Example
  def respond_to?(method)
    method === :wow || super
  end
end

Example.new.respond_to?(:wow) # true
```

当一个幽灵方法和一个真实方法的名称发生冲突时，则会调用真实方法。因此，为了避免莫名的命名冲突问题，可以令类继承自`BasicObject`而不是`Object`。或者通过`undef_method`来清除已有的方法

```ruby
class Example
  instance_methods.each do |m|
    # 保留 __ 开头的方法
    undef_method m unless m.to_s =~ /^__|method_missing|respond_to?/
  end
end
```

#### `method_missing` in JavaScript

在 JavaScript 中可以通过代理类`Proxy`实现类似`method_missing`的效果

- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [Ruby Method Missing In Javascript](http://www.aurelienbottazini.com/2016/10/19/ruby-method-missing-in-javascript.html)
- [JS Meta Programming](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Meta_programming)
- [Does Javascript have something like Ruby's method_missing feature?](https://stackoverflow.com/questions/9779624/does-javascript-have-something-like-rubys-method-missing-feature)

```javascript
class MethodMissing {
  constructor(...args) {
    console.log(`[MethodMissing:INIT] ${JSON.stringify(args)}`);

    const handler = {
      get: this._handleMissingMethod.bind(this)
    };
    return new Proxy(this, handler);
  }

  _handleMissingMethod(target, name) {
    if (Reflect.has(target, name)) {
      return Reflect.get(target, name);
    }
    return (...args) => this.methodMissing(name, ...args);
  }

  methodMissing(name, ...args) {
    throw new Error(`Method ${name} is missing!`);
  }
}

class ExampleClass extends MethodMissing {
  constructor(name) {
    super(name);
    this.name = name;
  }

  methodMissing(name, ...args) {
    if (name === 'echo') {
      console.log(`Method ${name} cached. Called with args: ${JSON.stringify(args)}`);
    } else {
      super.methodMissing(name, ...args);
    }
  }

  print(...args) {
    console.log(JSON.stringify(args));
  }
}

new ExampleClass('example-1').echo(1, 2, 3);
// [MethodMissing:INIT] ["example-1"]
// Method echo cached. Called with args: [1,2,3]

new ExampleClass('example-2').print(1, 2, 3);
// [MethodMissing:INIT] ["example-2"]
// [1,2,3]

new ExampleClass('example-3').puts(1, 2, 3);
// [MethodMissing:INIT] ["example-3"]
// Error:
// Method puts is missing!
```

### 代码块

#### 块的闭包

在方法中，可以通过`Kernal#block_given?`来判断是否传入了代码块。

当定义了一个块时，它会获取到当前环境中的绑定。当把块传给方法时，它会带着这些绑定一起进入方法内，形成闭包。

```ruby
def example_method
  x = "hello"
  yield
end

x = "hi"
example_method do
  puts x
end
# hi
```

可以在块内定义额外的绑定，但这些绑定在块结束时就会消失：

```ruby
def example
  yield
end

x = 1

example do
  x = 2
  y = 1
end

puts x # 2
puts y # error
```

#### 作用域门

程序会在三个地方关闭前一个作用域，并同时打开新的作用域：

1. 类定义
2. 模块定义
3. 方法

只要程序进入上述三者的定义中，就会发生作用域切换。这三个边界的`class`, `module`, `def` 关键字充当了作用域门的标志。

```ruby
v1 = 1

class Example # 作用域门：进入 Class
  v2 = 2
  local_variables # ['v2']

  def example_method # 作用域门：进入 def
    v3 = 3
    local_variables # ['v3']
  end # 作用域门：离开 def

  local_variables # ['v2']
end # 作用域门：离开 Class

local_variables # ['v1']
```

#### 扁平化作用域

扁平化作用域，就是让绑定穿越作用域门。在如下的正常情况下，作用域门的内部无法获取到外部的变量：

```ruby
v1 = 1

class Example
  # can not get v1
  def echo
    puts v1
  end
end

Example.new.echo # error, undefined local variable or method `v1'
```

因此，想要达到目的，就不能使用作用域门的`class`/`def`/`module`关键字。

- 使用`Class.new`替代`class`
- 使用`Module.new`替代`module`
- 使用`Module#define_method`替代`def`

```ruby
v1 = 1

Example = Class.new do
  puts v1

  define_method :echo do
    puts "echo #{v1}"
  end
end

Example.new.echo
```

除此以外，如果想在一组方法之间共享一个变量，则可以把这些方法定义在那个变量所在的扁平作用域中：

```ruby
def define_methods
  shared = 0

  Kernel.send :define_method, :counter do
    shared
  end

  Kernel.send :define_method, :inc do |x|
    shared += x
  end
end

define_methods
counter # 0
inc(4)
counter # 4
```

#### 上下文探针

通过`Object#instance_eval`方法传入的块被称之为**上下文探针**，因为块内可以获取到对象内部的上下文。

```ruby
class Example
  def initialize
    @v = 1 # 实例属性
  end

  def echo
    puts @v
  end
end

obj = Example.new
obj.instance_eval do
  @v = 2
end
obj.echo # 2
```

#### Proc 对象

块的延迟执行：通过把块传递给`Proc.new`/`lambda`/`proc`来创建一个`Proc`对象，之后通过`Proc#call`进行调用。

```ruby
inc = Proc.new { |x| x + 1 }
inc.call(2) # 3

dec = lambda { |x| x - 1 }
# lambda 还有简写方法：
# dec = -> (x) { x - 1 }
dec.call(2) # 1

# proc 在 Ruby 1.9 之后仅是 Proc.new 的别名
product = proc { |x| x * 2 }
product.call(2) # 4
```

`lambda`和`proc`在使用中有些许不同：

- 在`lambda`中，`return`仅表示从当前`lambda`中返回
- 在`proc`中，`return`代表**从定义这个`proc`的作用域中返回**
- `lambda`严格限制参数数量的对应，即定义时和调用时，传入的参数数目必须一致

### 类定义

> 类只是一个增强的模块

和方法定义一样，类定义也会返回最后一条语句的值

```ruby
result = class Example
  self
end

result # Example
```

#### `class_eval`/`module_eval`

按照之前的知识，想要打开一个已有的类，可以通过`class`关键字，使用类似类定义的语法。但如果类是一个变量，不知道类名称，则需要使用`class_eval`（别名为`module_eval`），在该类的上下文中执行块：

```ruby
def add_method_to_class(some_class)
  some_class.class_eval do
    def echo
      "hello"
    end
  end
end

add_method_to_class String
"1".echo # "hello"
```

和`instance_eval`不同的是，`instance_eval`仅会修改`self`，而`class_eval`则打开了类后，修改`self`和当前类。

#### 实例变量和类变量

所有的实例变量都属于当前对象 self

```ruby
class Example
  @var = 1 # 实例变量

  # 类方法
  def self.read
    @var
  end

  # 实例方法
  def write
    @var = 2
  end

  # 类方法
  def read
    @var
  end
end

obj = Example.new
# 修改的是当前方法内的实例变量
obj.write
obj.read # 2
Example.read # 1
```

类变量并不真正属于类，而属于类体系结构

```ruby
# @@var 定义于 main 的上下文，属于 main 的类 Object，所以也属于
# Object 的所有后代
@@var = 1

# Example 继承自 Object，因此也共享了这个类变量
class Example {
  @@var = 2
}

puts @@var # 2
```

#### 单件方法

```ruby
# 实例的单件方法
str = "123"

def str.echo
  "hello"
end

str.echo # "hello"

# 类方法的实质是：它们是一个类的单件方法
```

#### 类宏

如果希望类可以暴露属性给外部，则需要定义拟态方法（访问器）：读方法和写方法

```ruby
class Example
  # 写方法
  def var=(val)
    @var = val
  end

  # 读方法
  def var
    @var
  end
end

obj = Example.new
obj.var = 1
obj.var # 1
```

可以通过`Module#attr_*`关键字来快速定义访问器：

- `attr_reader` 读方法
- `attr_writer` 写方法
- `attr_accessor` 读写

类似`attr_*`这样的方法被称为**类宏**：本身是方法，但看起来很像关键字，而且只能在类中定义

```ruby
class Example
  def initialize
    @a = 1
    @b = nil
  end

  # 只读
  attr_reader :a

  # 读写
  attr_accessor :b
end

obj = Example.new
obj.a # 1
obj.a = 2 # error
obj.b = 3
obj.b # 3
```

#### 类扩展

目前已经知道，在类中直接`include` Module，将会增加类的实例方法：

```ruby
module ExampleModule
  def echo
    "this is module function"
  end
end

class ExampleClass
  include ExampleModule
end

obj = ExampleClass.new
obj.echo
ExampleClass.echo # error
```

如果想要利用`include`增加类方法，则需要：

```ruby
class << ExampleClass
  include ExampleModule
end

ExampleClass.echo
```

除此以外，可以直接通过`extend`进行**类扩展**和**对象扩展**：

```ruby
class ExampleClass
  extend ExampleModule
end

ExampleClass.echo

obj = Object.new
obj.extend ExampleModule
obj.echo
```

#### 别名/环绕别名

通过`alias`关键字可以给方法定义别名。而定义别名后，重新利用原有的方法名来定义方法，并不会改变旧的方法本身，还是可以通过别名来使用它，这种方式被称为**别名环绕**

```ruby
class String
  alias :real_length :length

  def length
    real_length > 5 ? "long" : "short"
  end
end

"1".length # short
```

