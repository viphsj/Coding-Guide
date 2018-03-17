<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Advanced Swift](#advanced-swift)
  - [写在前面](#%E5%86%99%E5%9C%A8%E5%89%8D%E9%9D%A2)
  - [内建集合类型](#%E5%86%85%E5%BB%BA%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8B)
    - [数组](#%E6%95%B0%E7%BB%84)
    - [字典](#%E5%AD%97%E5%85%B8)
    - [索引集合`IndexSet`](#%E7%B4%A2%E5%BC%95%E9%9B%86%E5%90%88indexset)
    - [范围类型](#%E8%8C%83%E5%9B%B4%E7%B1%BB%E5%9E%8B)
  - [集合类型协议](#%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8B%E5%8D%8F%E8%AE%AE)
    - [序列`Sequence`](#%E5%BA%8F%E5%88%97sequence)
      - [迭代器`Interator`](#%E8%BF%AD%E4%BB%A3%E5%99%A8interator)
      - [单向链表](#%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8)
    - [集合类型`Collection`](#%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8Bcollection)
      - [利用集合类型自定义队列](#%E5%88%A9%E7%94%A8%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8B%E8%87%AA%E5%AE%9A%E4%B9%89%E9%98%9F%E5%88%97)
      - [`Collection`协议中的默认关联类型](#collection%E5%8D%8F%E8%AE%AE%E4%B8%AD%E7%9A%84%E9%BB%98%E8%AE%A4%E5%85%B3%E8%81%94%E7%B1%BB%E5%9E%8B)
      - [集合的索引`Index`](#%E9%9B%86%E5%90%88%E7%9A%84%E7%B4%A2%E5%BC%95index)
      - [集合的切片](#%E9%9B%86%E5%90%88%E7%9A%84%E5%88%87%E7%89%87)
    - [其他集合类型协议](#%E5%85%B6%E4%BB%96%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8B%E5%8D%8F%E8%AE%AE)
      - [`BidirectionalCollection`双向索引](#bidirectionalcollection%E5%8F%8C%E5%90%91%E7%B4%A2%E5%BC%95)
      - [`RandomAccessCollection`随机存取](#randomaccesscollection%E9%9A%8F%E6%9C%BA%E5%AD%98%E5%8F%96)
      - [`MutableCollection`可下标赋值](#mutablecollection%E5%8F%AF%E4%B8%8B%E6%A0%87%E8%B5%8B%E5%80%BC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Advanced Swift

## 写在前面

- 使用可表意的命名
- 为函数添加注释。关于注释，可参见：[Markup Formatting Reference](https://developer.apple.com/library/content/documentation/Xcode/Reference/xcode_markup_formatting_ref/)
- 类、结构体、协议、枚举命名使用大驼峰，函数、变量、枚举成员命名使用小驼峰
- 函数要显式的指定返回类型；其他可以利用类型推断时，可省略类型指定
- 优先选择值传递的结构体
- 除非类是为了被继承，否则使用`final`关键字
- 尽量使用尾随闭包
- 使用`guard`来提早退出
- 在保障代码可读性和逻辑的情况下尽量使用`map`和`reduce`
- 对于不可变的值一律使用`let`
- 尽可能的对现有类型和协议进行扩展，而不是在一个里面写一堆方法，或者使用一些全局函数

## 内建集合类型

### 数组

```Swift
let array

// 迭代数组
for ele in array {}

// 迭代数组中除了第一个元素以外的元素
for ele in array.dropFirst() {}

// 迭代数组中除了最后 N 个元素以外的元素
for ele in array.dropLast(n) {}

// 枚举数组中元素和其下标
for (index, ele) in array.enumerated() {}

// 寻找指定元素的索引
if let index = array.index { matchFunc($0) } {}

// map
array.map { mapFunc($0) }

// filter
array.filter { filterFunc($0) }

// reduce
array.reduce(initial) { reduceFunc($0, $1) }

// flatMap，将返回的数组平摊
let numArray = [1, 2, 3]
numArray.map { [$0] } // [[1], [2], [3]]
numArray.flatMap { [$0] } // [1, 2, 3]
```

通过对`Sequence`进行扩展，我们可以为序列添加新的方法

```Swift
// 新增 every 方法，判断序列中是否所有元素都满足给定的条件
extension Sequence {
    func every(matching: (Element) -> Bool) -> Bool {
        for ele in self {
            if !matching(ele) {
                return false
            }
        }
        return true
    }
}

let numArray = [1,2,3,4,5]
print(numArray.every { $0 > 0 }) // true
```

数组切片之后返回`ArraySlice<T>`类型数据，其背后的数据仍是原先的数组。`ArraySlice`和`Array`有着一样的方法，并能通过`Array()`构造方法转换为数组

### 字典

从字典中移除键值对

```Swift
// 用下标将对应的值设置为 nil，或者通过 removeValue 方法
var dict = ["a": 1, "b": 2, "c": 3]
dict["a"] = nil
dict.removeValue(forKey: "b")
dict // ["c": 3]
```

字典的合并，可以指定如何处理键相同的键值对（选用两个字典中的某一个值）

```Swift
var dict1 = ["a": 1, "b": 2, "c": 3]
var dict2 = ["a": 0, "b": 0]

dict1.merge(dict2) { $1 } // 对于重复的键，使用第二个字典中的值
print(dict1) // 第一个字典被修改 ["a": 0, "b": 0, "c": 3]

// 可以通过 Dictionary() 来从 (key, value) 元组组成的序列中构造字典
// 当元组没有重复的键时，可以使用 Dictionary(uniqueKeysWithValues:) 方法
Dictionary(uniqueKeysWithValues: [("a", 1), ("b", 2)]) // ["a": 1, "b": 2]

// 如果可能有重复的键，则需要使用 Dictionary(_:uniquingKeysWith:) 为其指定处理重复键值对的方法】
// 例如，如果遇见重复的键，则把值相加
Dictionary([("a", 1), ("a", 2)], uniquingKeysWith: +) // ["a": 3]
```

**字典本质是一个哈希表，通过键的`hashValue`来为每个键指定索引位置。**因此，字典的键要求是可哈希的。当使用可变的对象作为字典的键时，当对象改变时，其哈希值往往也会发生变化，则会造成该键值对从字典中消失，导致字典内部储存错误。

### 索引集合`IndexSet`

索引集合表示一个由正整数组成的集合，其内部使用了一组**范围列表**来实现。例如，在储存连续正整数的情况下，`IndexSet`内部只储存了首位和末尾两个整数值。

`IndexSet`可以直接插入一个范围

```Swift
var indices = IndexSet()
indices.insert(integersIn: 1..<5)
indices.map { $0 * 2 } // [2, 4, 6, 8]
```

### 范围类型

四种范围类型:

- 满足`Comparable`的范围类型 - **不能被迭代**
  - 半开范围`Range`
  - 闭合范围`ClosedRange`

```Swift
// 例
Character("a")...Character("b")
```

- 满足`Strideable`的范围类型 - **可数范围，以整数为步长，可以被迭代**
  - 半开范围`CountableRange`
  - 闭合范围`CountableClosedRange`

```Swift
// 例
0...10
```

## 集合类型协议

### 序列`Sequence`

序列代表的是一系列有相同类型的值，可以对这些值进行迭代。因此，满足序列协议的对象都要实现其**返回迭代器`Interator`的`makeIterator`方法**

- 序列在迭代的时候，动态的计算下一个元素
- 序列迭代后不可逆

#### 迭代器`Interator`

迭代器在遍历时，通过`next`方法返回一个序列的值，并对遍历状态进行管理。

```Swift
// 序列的 for 循环本质
var iterator = someSequence.makeIterator()
while let element = iterator.next() {
  doSomething(with: element)
}
```

创建迭代器需要实现`InteratorProtocol`协议

```Swift
protocol InteratorProtocol {
  associatedtype Element
  // 序列被耗尽后，返回 nil
  mutating func next() -> Element?
}

// EXAMPLE-1
// 创建一个斐波那契序列迭代器，无限迭代
struct FibsIterator: IteratorProtocol {
  var state = (0, 1)
  mutating func next() -> Int? {
    let num = state.0
    state = (state.1, state.1 + num)
    return num
  }
}

var fibsIterator = FibsIterator()
while let num = fibsIterator.next() {
  print(num)
}

// EXAMPLE-2
// 创建一个迭代器，获取字符串的所有前缀
// 例如，"abc" 的所有前缀为 "a", "ab", "abc"
struct PrefixIterator: IteratorProtocol {
  var offset: String.Index
  let string: String

  init(string: String) {
    self.string = string
    offset = string.startIndex
  }

  mutating func next() -> Substring? {
    guard offset < string.endIndex else {
      return nil
    }

    offset = string.index(after: offset)
    return string[..<offset]
  }
}

// 然后利用迭代器来创建序列
struct PrefixSequence: Sequence {
  let string: String

  func makeIterator() -> PrefixIterator {
    return PrefixIterator(string: string)
  }
}

// Usage
for prefix in PrefixSequence(string: "abc") {
  print(prefix)
}
// a
// ab
// abc

// 实现序列之后，除了 for 循环，其他 Sequence 的操作都可以实现
PrefixSequence(string: "abc").map { $0.uppercased() }
```

迭代器具有值语义。复制一份迭代器，则它的所有状态也会被复制，两个迭代器可以独立各自工作

```Swift
// 以上面的 PrefixIterator 为例
let string = "abcde"

var iterator1 = PrefixIterator(string: string)
iterator1.next() // Optional("a")

var iterator2 = iterator1
iterator1.next() // Optional("ab")
iterator1.next() // Optional("abc")
iterator2.next() // Optional("ab")
```

但是如果使用`AnyIterator`对迭代器进行封装，则返回的迭代器不再是一个结构体，没有值语义

```Swift
let string = "abcde"

var iterator = PrefixIterator(string: string)

var iterator1 = AnyIterator(iterator)
iterator1.next() // Optional("a")

var iterator2 = iterator1
iterator1.next() // Optional("ab")
iterator2.next() // Optional("abc")
iterator1.next() // Optional("abcd")
```

#### 单向链表

```Swift
// 一个单向链表的节点要么是结尾，要么通过 next 链接到了下一个节点
enum List<Element> {
  case end
  // indirect 关键字告诉编译器该枚举值 node 应该被看做是引用类型
  indirect case node(Element, next: List<Element>)
}

extension List {
  // 在节点前增加新的节点，新节点的 next 链接到自身，且该方法返回新的链表节点
  func cons(_ x: Element) -> List {
    return .node(x, next: self)
  }
}
// let list = List<Int>.end.cons(1).cons(2)

extension List: ExpressibleByArrayLiteral {
  init(arrayLiteral elements: Element...) {
    self = elements.reversed().reduce(.end) {
      list, element in
      list.cons(element)
    }
  }
}
// let list: List = [1, 2, 3]

extension List {
  mutating func push(_ x: Element) {
    self = self.cons(x)
  }

  mutating func pop() -> Element? {
    switch self {
      case .end: return nil
      case let node(x, next: tail):
        self = tail
        return x
    }
  }
}

// 让链表可迭代
extension List: IteratorProtocol, Sequence {
  mutating func next() -> Element? {
    return pop()
  }
}

let list: List = [3, 2, 1]
for x in list {
  print(x)
}
// 3
// 2
// 1
```

上面的链表实现了`ExpressibleByArrayLiteral`协议，其作用是让链表可以通过`[a, b, c, d]`这样的形式进行创建。要支持该协议，需要完成`init(arrayLiteral elements: Element...)`方法

```Swift
protocol ExpressibleByArrayLiteral {
  init(arrayLiteral elements: Element...)
}
```

### 集合类型`Collection`

稳定的序列，可以被遍历多次并保持一致。除线性遍历外，也支持通过下标获取集合中的元素。

#### 利用集合类型自定义队列

在 Swift 中，可以利用数组来实现栈：

- `append` 入栈
- `popLast` 出栈

而队列类型则可以通过`Collection`实现

```Swift
// 定义队列的协议
protocol Queue {
  associatedtype Element
  // 入队
  mutating func enqueue(_ element: Element)
  // 出队
  mutating func dequeue() -> Element?
}

// 创建先入先出队列
struct FIFOQueue<Element>: Queue {
  private var left = [Element]()
  private var right = [Element]()

  mutating func enqueue(_ element: Element) {
    right.append(element)
  }

  mutating func dequeue() -> Element? {
    if left.isEmpty {
      left = right.reversed()
      right.removeAll()
    }
    return left.popLast()
  }
}
```

要实现`Collection`协议，最少需要满足以下内容：

- `startIndex`和`endIndex`属性
- 获取到元素的下标方法
- 在索引之间进行步进的`index(after:)`方法

```Swift
protocol Collection: Sequence {
  // 表示集合中位置的类型
  associatedtype Index: Comparable

  // 首元素索引
  var startIndex: Index { get }
  // 末元素索引
  var endIndex: Index { get }

  // 获取给定索引之后的那个索引
  func index(after i: Index) -> Index
  // 下标方法
  subscript(position: Index) -> Element { get }
}
```

让先出先出队列`FIFOQueue`满足`Collection`协议

```Swift
extension FIFOQueue: Collection {
  public var startIndex: Int { return 0 }
  public var endIndex: Int { return left.count + right.count }

  public func index(after i: Int) -> Int {
    // precondition: Check a necessary condition for making forward progress.
    // 类似于 guard
    // 关于 precondition 可见：
    // https://stackoverflow.com/questions/29673027/difference-between-precondition-and-assert-in-swift
    precondition(i < endIndex)
    return i + 1
  }

  public func subscript(position: Int) -> Element {
    precondition((0..<endIndex).contains(position), "Index out of bounds")
    if position < left.endIndex {
      return left[left.count - position - 1]
    } else {
      return right[position - left.count]
    }
  }
}
```

通过实现`ExpressibleByArrayLiteral`协议来支持便捷的创建队列：

```Swift
extension FIFOQueue: ExpressibleByArrayLiteral {
  public init(arrayLiteral elements: Element) {
    left = elements.reversed()
    right = []
  }
}

let queue: FIFOQueue = [1, 2, 3, 4, 5]
```

#### `Collection`协议中的默认关联类型

对于默认关联类型，协议提供了默认值、方法，一般而言我们不需要自己去实现它们

- `SubSequence`

一个集合类型的`SubSequence`本身也应该是一个`Collection`，其默认值是`Slice<self>`，是对原集合的封装，储存了相对于原集合的切片

- `IndexDistance`

有符号整数类型，代表两个索引之间的步数

- `Indices`

默认类型为`DefaultIndices<self>`，是对原有集合的封装，包含了起始索引和结束索引。`Indices`保持了对原集合的引用，因此能够对索引进行步进。也因此，**如果在迭代索引的同时改变集合的内容，会造成一定的性能问题：如果集合是写时复制，则将触发不必要的复制操作**。要避免这样的情况，可以将`for`循环替换为`while`循环，自己手动记录迭代的索引值，而不是使用`indices`

如果可以在自定义集合中替换默认的`Indices`，无需让它保持对原集合的引用，则可以带来性能上的提升

#### 集合的索引`Index`

集合类型`Index`要求必须实现了`Comparable`协议，即索引必须要有确定的顺序。字典中的键不是字典的索引：

- 可以通过集合得知某个索引之后的索引是什么
- 使用索引进行下标访问应该立即获取需要返回的数据（O1）

```Swift
protocol Collection {
  // 通过索引下标访问，总是返回一个非可选值。因此，越界会抛出错误
  subscript(position: Index) -> Element { get }
}
```

当集合发生改变时，索引可能会失效。

以数组为例，

- 在数组末尾添加一个元素时，原有的索引依然有效
- 在数组开头增加一个元素时，索引有效，但其指向的元素发生改变
- 在数组开头删除一个元素时，最后一个索引失效，其他索引指向的元素发生改变

以字典为例，

- 一般而言，字典的索引不会随着新键值对的加入而失效
- 当字典的尺寸增大到触发内存重新分配时，所有元素的哈希值会被重新计算，此时索引失效
- 从字典中移除元素总是会使索引失效

索引的步进：

从一个索引向前或向后的移动索引，必须交给集合自身来进行操作，索引本身没有能力进行移动，即`collection.index(after: someIndex)`。

因为从一个索引获取到另一个索引，该过程会涉及到集合内部的信息。如果这个过程交给索引本身去完成，则索引需要保留一个对集合储存的引用，而这个额外的引用会在集合被迭代修改时造成不必要的复制。

#### 集合的切片

集合的切片是`Slice<self>`类型，是基于任意集合类型的封装：

```Swift
struct Slice<Base: Collection>: Collection {
  typealias Index = Base.Index
  typealias IndexDistance = Base.IndexDistance
  typealias SubSequence = Slice<Base>

  let collection = base
  var startIndex: Index
  var endIndex: Index

  init(base: Base, bounds: Range<Index>) {
    collection = base
    startIndex = bounds.lowerBound
    endIndex = bounds.upperBound
  }

  func index(after i: Index) -> Index {
    return collection.index(after: i)
  }

  subscript(position: Index) -> Base.Element {
    return collection[position]
  }

  subscript(bounds: Range<Base.Index>) -> Slice<Base> {
    return Slice(base: collection, bounds: bounds)
  }
}
```

**切片的索引可以和原集合的索引互换使用**：

集合类型和它的切片拥有相同的索引。只要集合和它的切片在创建之后没有改变，则切片中某个索引位置上的元素，也存在于原集合同样的索引位置上。

```Swift
let collection = ["A", "B", "C", "D"]
let slice = collection[1...3]

collection.startIndex // 0
slice.startIndex // 1
```

### 其他集合类型协议

有四个专门的集合类型协议，它们在标准的`Collection`协议基础上进行了追加定义：

- `BidirectionalCollection`: 同时支持向前、向后遍历的集合
- `RandomAccessCollection`: 支持高效随机存取索引遍历的集合
- `MutableCollection`: 支持下标赋值的集合
- `RangeReplaceableCollection`: 支持将任意子范围的元素用别的集合中的元素进行替换的集合

#### `BidirectionalCollection`双向索引

`BidirectionalCollection`在`Collection`的基础上增加了`index(before:)`方法，使得其可以向前进行索引。利用此方法，可以实现`last`属性

```Swift
extension BidirectionalCollection {
  public var last: Element? {
    return isEmpty? nil : self[index(before: endIndex)]
  }

  // 除此以外，双向索引的集合逆序不会直接将集合反转，而是在遍历时，动态的使用逆序的索引
  public func reversed() -> ReversedCollection<Self>{
    return ReversedCollection(_base: self)
  }
}
```

#### `RandomAccessCollection`随机存取

`RandomAccessCollection`可以在常数时间内跳转到任意索引，即要求：

1. 在 O(1) 时间内以任意距离移动一个索引
2. 在 O(1) 时间内测量任意两个索引之间的距离

#### `MutableCollection`可下标赋值

相比于`Collection`，`MutableCollection`里的下标访问方法`subscript`增加了`setter`。以前面的`FIFOQueue`为例，让它满足通过下标来改变队列里的值：

```Swift
extension FIFOQueue: MutableCollection {
  public subscript(position: Int) -> Element {
    get {
      precondition((0..<endIndex).contains(position), "Index out of bounds")
      if position < left.endIndex {
        return left[left.count - position - 1]
      } else {
        return right[position - left.count]
      }
    }
    set {
      precondition((0..<endIndex).contains(position), "Index out of bounds")
      if position < left.endIndex {
        left[left.count - position - 1] = newValue
      } else {
        right[position - left.count] = newValue
      }
    }
  }
}
```

注意，`MutableCollection`只允许改变集合中已有的元素值，但是不允许改变集合的长度或者元素的顺序

<!-- ## 可选值 -->

