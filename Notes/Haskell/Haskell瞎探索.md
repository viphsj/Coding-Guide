<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Haskell 瞎探索](#haskell-%E7%9E%8E%E6%8E%A2%E7%B4%A2)
  - [基础](#%E5%9F%BA%E7%A1%80)
  - [列表](#%E5%88%97%E8%A1%A8)
    - [列表操作](#%E5%88%97%E8%A1%A8%E6%93%8D%E4%BD%9C)
    - [区间](#%E5%8C%BA%E9%97%B4)
    - [列表推导式](#%E5%88%97%E8%A1%A8%E6%8E%A8%E5%AF%BC%E5%BC%8F)
  - [元组](#%E5%85%83%E7%BB%84)
    - [二元组/序对](#%E4%BA%8C%E5%85%83%E7%BB%84%E5%BA%8F%E5%AF%B9)
  - [类型](#%E7%B1%BB%E5%9E%8B)
    - [常见类型](#%E5%B8%B8%E8%A7%81%E7%B1%BB%E5%9E%8B)
    - [类型类](#%E7%B1%BB%E5%9E%8B%E7%B1%BB)
  - [函数](#%E5%87%BD%E6%95%B0)
    - [模式匹配](#%E6%A8%A1%E5%BC%8F%E5%8C%B9%E9%85%8D)
    - [哨卫](#%E5%93%A8%E5%8D%AB)
    - [`where`](#where)
    - [`let`](#let)
    - [`case`](#case)
    - [优先级](#%E4%BC%98%E5%85%88%E7%BA%A7)
  - [递归](#%E9%80%92%E5%BD%92)
    - [用递归实现 Haskell 中的自带函数](#%E7%94%A8%E9%80%92%E5%BD%92%E5%AE%9E%E7%8E%B0-haskell-%E4%B8%AD%E7%9A%84%E8%87%AA%E5%B8%A6%E5%87%BD%E6%95%B0)
    - [用递归实现快速排序](#%E7%94%A8%E9%80%92%E5%BD%92%E5%AE%9E%E7%8E%B0%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
  - [高阶函数](#%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0)
    - [柯里化](#%E6%9F%AF%E9%87%8C%E5%8C%96)
      - [多元函数的本质](#%E5%A4%9A%E5%85%83%E5%87%BD%E6%95%B0%E7%9A%84%E6%9C%AC%E8%B4%A8)
      - [柯里化的截断](#%E6%9F%AF%E9%87%8C%E5%8C%96%E7%9A%84%E6%88%AA%E6%96%AD)
    - [高阶函数](#%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0-1)
    - [匿名函数](#%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0)
    - [折叠函数](#%E6%8A%98%E5%8F%A0%E5%87%BD%E6%95%B0)
      - [`foldl`/`foldl1`](#foldlfoldl1)
      - [`foldr`/`foldr1`](#foldrfoldr1)
    - [`$`函数](#%E5%87%BD%E6%95%B0)
    - [函数组合](#%E5%87%BD%E6%95%B0%E7%BB%84%E5%90%88)
  - [模块](#%E6%A8%A1%E5%9D%97)
    - [模块导入](#%E6%A8%A1%E5%9D%97%E5%AF%BC%E5%85%A5)
    - [模块导出](#%E6%A8%A1%E5%9D%97%E5%AF%BC%E5%87%BA)
    - [Haskell 中的常用模块](#haskell-%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E6%A8%A1%E5%9D%97)
      - [`Data.List`模块](#datalist%E6%A8%A1%E5%9D%97)
      - [`Data.Char`模块](#datachar%E6%A8%A1%E5%9D%97)
      - [`Data.Map`模块](#datamap%E6%A8%A1%E5%9D%97)
      - [`Data.Set`模块](#dataset%E6%A8%A1%E5%9D%97)
  - [类型和类型类](#%E7%B1%BB%E5%9E%8B%E5%92%8C%E7%B1%BB%E5%9E%8B%E7%B1%BB)
    - [自定义类型和值构造器](#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%80%BC%E6%9E%84%E9%80%A0%E5%99%A8)
    - [值构造器的记录语法](#%E5%80%BC%E6%9E%84%E9%80%A0%E5%99%A8%E7%9A%84%E8%AE%B0%E5%BD%95%E8%AF%AD%E6%B3%95)
    - [类型构造器](#%E7%B1%BB%E5%9E%8B%E6%9E%84%E9%80%A0%E5%99%A8)
      - [参数化构造](#%E5%8F%82%E6%95%B0%E5%8C%96%E6%9E%84%E9%80%A0)
    - [派生实例](#%E6%B4%BE%E7%94%9F%E5%AE%9E%E4%BE%8B)
    - [类型别名](#%E7%B1%BB%E5%9E%8B%E5%88%AB%E5%90%8D)
    - [类型类](#%E7%B1%BB%E5%9E%8B%E7%B1%BB-1)
      - [`Eq`类型类](#eq%E7%B1%BB%E5%9E%8B%E7%B1%BB)
      - [`Functor`类型类](#functor%E7%B1%BB%E5%9E%8B%E7%B1%BB)
  - [函子](#%E5%87%BD%E5%AD%90)
    - [普通函子](#%E6%99%AE%E9%80%9A%E5%87%BD%E5%AD%90)
      - [函数类型的函子值](#%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%87%BD%E5%AD%90%E5%80%BC)
      - [两条函子定律](#%E4%B8%A4%E6%9D%A1%E5%87%BD%E5%AD%90%E5%AE%9A%E5%BE%8B)
    - [`applicative`函子](#applicative%E5%87%BD%E5%AD%90)
      - [`<$>`函数](#%E5%87%BD%E6%95%B0)
      - [`Maybe`函子](#maybe%E5%87%BD%E5%AD%90)
      - [列表函子](#%E5%88%97%E8%A1%A8%E5%87%BD%E5%AD%90)
      - [`ZipList`函子](#ziplist%E5%87%BD%E5%AD%90)
      - [函数函子](#%E5%87%BD%E6%95%B0%E5%87%BD%E5%AD%90)
      - [`applicative`的实用函数](#applicative%E7%9A%84%E5%AE%9E%E7%94%A8%E5%87%BD%E6%95%B0)
  - [`newtype`](#newtype)
  - [`Monoid`类型类](#monoid%E7%B1%BB%E5%9E%8B%E7%B1%BB)
    - [什么是`Monoid`](#%E4%BB%80%E4%B9%88%E6%98%AFmonoid)
    - [`Monoid`的一些实例](#monoid%E7%9A%84%E4%B8%80%E4%BA%9B%E5%AE%9E%E4%BE%8B)
      - [列表](#%E5%88%97%E8%A1%A8-1)
      - [`Product`和`Sum`](#product%E5%92%8Csum)
      - [`All`和`Any`](#all%E5%92%8Cany)
      - [`Maybe`](#maybe)
  - [`Monad`](#monad)
    - [回顾函子](#%E5%9B%9E%E9%A1%BE%E5%87%BD%E5%AD%90)
    - [`Monad`类型类](#monad%E7%B1%BB%E5%9E%8B%E7%B1%BB)
    - [`Maybe`的`Monad`实例](#maybe%E7%9A%84monad%E5%AE%9E%E4%BE%8B)
    - [列表的`Monad`实例](#%E5%88%97%E8%A1%A8%E7%9A%84monad%E5%AE%9E%E4%BE%8B)
    - [`monad`定律](#monad%E5%AE%9A%E5%BE%8B)
      - [左单位元](#%E5%B7%A6%E5%8D%95%E4%BD%8D%E5%85%83)
      - [右单位元](#%E5%8F%B3%E5%8D%95%E4%BD%8D%E5%85%83)
      - [结合律](#%E7%BB%93%E5%90%88%E5%BE%8B)
  - [输入和输出](#%E8%BE%93%E5%85%A5%E5%92%8C%E8%BE%93%E5%87%BA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Haskell 瞎探索

Haskell 很有趣。

Haskell 是一门纯函数式编程语言。

- Haskell 是**惰性**的。若非指明，在需要结果之前，Haskell 不会执行函数。它会尽量推迟计算、执行最少的计算，直到你需要的数据为止
- Haskell 是**静态类型，并支持类型推导**。因此，不必要每次都手动表明变量的类型
- Haskell 里面没有`for`或者`while`这样的循环，而是用递归代替迭代
- [Why doesn't Haskell have loops (e.g. for or while)?](https://www.quora.com/Why-doesnt-Haskell-have-loops-e-g-for-or-while)

### 基础

- 基础语法可见：[learnxinyminutes - haskell](https://learnxinyminutes.com/docs/zh-cn/haskell-cn/)

- 命名

1. 用于命名值、变量、函数名和类型变量的标识符，必须从小写字母开始
2. 类型、模块、值构造器、类型类，必须以大写字母开始

- 对于基本运算而言，和其他语言几乎一致，但需要注意的是，如果表达式内存在负数，则最好用括号将其包裹起来

```haskell
{-
  + 加
  - 减
  * 乘
  / 除 -- 默认除法返回浮点数
  == 相等
  /= 不等
  div/quot 整除
  mod/rem 求余
-}
-- Exact difference between div and quot: https://stackoverflow.com/questions/24149832/exact-difference-between-div-and-quot
5 * (-1)
```

- if,else

Haskell 中的 if 语句里，else 部分不可省略。在 Haskell 里，if 语句是一个必然返回结果的表达式，而非语句

```haskell
haskell = if 1 == 1 then "awesome" else "awful" -- haskell = "awesome"
```

- 列表，字符，字符串

字符串实质上是字符组成的列表，且字符串只能用双引号`""`表示，而字符则用单引号`''`表示

```haskell
-- 字符串处理函数

-- lines 将字符串用 \n 分割
-- unlines 将字符串组成的列表用 \n 合并
lines "123\n456" -- ["123", "456"]

-- words 将字符串用空格分割
-- unwords 将字符串组成的列表用空格连接
words "123 456" -- ["123", "456"]
```

### 列表

列表用于储存**一组相同类型**的元素

字符串本质上也是列表，即一组字符组成的列表。"hello" 是 ['h', 'e', 'l', 'l', 'o'] 的语法糖

#### 列表操作

```haskell
-- 列表拼接 ++
-- 使用列表拼接时需要注意，Haskell 会遍历 ++ 符号左边的列表。因此当列表很大时会造成效率问题
['h', 'e'] ++ ['l', 'l', 'o']

-- 将单个元素追加到列表头部 :
-- 速度很快
-- [1, 2, 3] 本质上是 1:2:3:[] 的语法糖
1:[2, 3] -- [1, 2, 3]

-- 按索引访问 !!
-- 索引从 0 开始。若要获取的索引超出列表长度则会抛出错误
"hello" !! 0 -- 'h'
[1, 2, 3] !! 1 -- 2

-- 列表的比较
-- 列表间可以通过比较符进行比较，会自动依次比较列表中的各个元素，直到出现结果
[1, 2, 3] < [2, 2, 3] -- True
[1, 2, 3, 4] > [1, 2, 3] -- True

-- 获取列表第一个元素 head
head [1, 2, 3] -- 1

-- 获取除了头部以外的元素 tail
tail [1, 2, 3] -- [2, 3]

-- 获取列表最后一个元素 last
last [1, 2, 3] -- 3

-- 获取除了最后一个元素的其他元素 init
init [1, 2, 3] -- [1, 2]

-- 获取列表长度 length
:t length -- [a] -> Int
-- 返回的长度不是任意精度的整数，而是 Int 类型，因此，如果处理过长的列表，不应使用 length，而是 Data.List.genericLength
length [1, 2, 3] -- 3

-- 检查列表是否为空 null
null [1, 2, 3] -- False
null [] -- True

-- 反转列表 reverse
reverse [1, 2, 3] -- [3, 2, 1]

-- 返回列表中指定的前 N 个元素 take
-- 如果 N 超过列表长度，则返回原列表的复制（纯函数，因此不会返回原列表，而是原列表的拷贝）
take 2 [1, 2, 3] -- [1, 2]

-- takeWhile 给定一个条件，从列表头部开始取出元素，直到不符合条件为止
:t takeWhile -- takeWhile :: (a -> Bool) -> [a] -> [a]
takeWhile (>0) [1, 2, -1] -- [1, 2]

-- 删除列表中指定的前 N 个元素 drop
-- 返回的是删除了前 N 个元素的新列表，不会修改原列表
drop 2 [1, 2, 3] -- [3]

-- dropWhile 需要指定条件版的 drop

-- 获取列表中最大值/最小值 maximum/minimum
maximum [1, 2, 3] -- 3
minimum [1, 2, 3] -- 1

-- 列表所有元素求和/求积 sum/product
sum [1, 2, 3] -- 6
product [1, 2, 3, 4] -- 24

-- 判断某个元素是否包含在列表里 elem
elem 2 [1, 2, 3] -- True
4 `elem` [1, 2, 3] -- False

-- 相反的，判断一个元素不在列表里，使用 notElem
notElem 2 [1, 3] -- True

-- span/break 将列表根据条件分割成两个列表，放在一个二元组里
:t span -- or :t break
span :: (a -> Bool) -> [a] -> ([a], [a])
-- 对于 span 而言，给定一个条件，从左到右遍历列表，当遇见第一个不符合条件的值时停止遍历，并从当前位置进行分割；而对于 break 而言，则是遍历到第一个符合条件的位置后进行分割
span even [2, 4, 6, 7, 8] -- ([2, 4, 6], [7, 8])

-- splitAt 在指定位置上分割列表，返回二元组
splitAt 5 "Hello World"
-- ("Hello", "World")

-- and/or
-- 把列表中所有的布尔值用 &&/|| 连接起来
and [True, True, False]

-- iterate 将第一个参数中的函数应用到第二个参数上，并将结果重复应用到函数上，形成无限长的列表
:t iterate -- iterate :: (a -> a) -> a -> [a]
take 10 $ iterate (+3) 1
-- [1,4,7,10,13,16,19,22,25,28]

-- until 迭代的生成数据，直至满足给定的条件为止
:t until -- until :: (a -> Bool) -> (a -> a) -> a -> a
until (>10) (+2) 0 -- 12

-- concat 将一个列表中的列表相连接 [[a]] -> [a]
concat [[1], [2]] -- [1, 2]

-- concatMap 先对列表进行 map，然后再 concat
:t concatMap -- concatMap :: Foldable t => (a -> [b]) -> t a -> [b]
map (replicate 3) [1, 2, 3] -- [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
concatMap (replicate 3) [1, 2, 3] -- [1, 1, 1, 2, 2, 2, 3, 3, 3]
```

#### 区间

区间是构造列表的方式之一，区间中的值必须是可枚举/可排序的

```haskell
-- 两端闭区间

-- 默认步长为 1，下限必须小于上限
[1..5] -- [1, 2, 3, 4, 5]
['a'..'f'] -- "abcdef"

-- 指定步长，做等差数列，可倒序
[1, 3..8] -- [1, 3, 5, 7]
['a', 'c'..'f'] -- "ace"
[5,4..0] -- [5, 4, 3, 2, 1, 0]
```

```haskell
-- 利用区间和惰性来构造列表
take 3 [1..] -- 从一个无限列表中取前 3 个数。因为惰性的原因，编译器不会计算无限计算该区间，在取出前三个数以后就自动停止

-- cycle 以列表为参数，对该列表进行无限循环
take 4 (cycle [1, 2]) -- [1, 2, 1, 2]

-- repeat 以单个元素为参数进行无限循环
take 2 (repeat 3) -- [3, 3]
take 2 (repeat [3]) -- [[3], [3]]

-- replicate 将制定元素复制数次形成列表
replicate 3 10 -- [10, 10, 10]
```

#### 列表推导式

列表推导式用`[]`进行包括，`|`进行分隔，前面是输出后面是条件

```haskell
-- rem 求余
[x * 2 | x <- [1..10], rem x 2 == 0] -- [4, 8, 12, 16, 20]

-- odd 判断一个整数是否是奇数
[x | x <- [1..10], odd x] -- [1, 3, 5, 7, 9]
```

列表推导式也可以用来从多个列表中取值

```haskell
-- 形成两个列表里所有元素相加的排列组合
[x + y | x <- [1, 2], y <- [3, 4]] -- [4, 5, 5, 6]
```

### 元组

元组是异构的，即一个元组内可以有多种类型的元素。元组的长度固定，不同长度的元组被视为不同的类型。这意味着一个包含二元组的列表不能加入三元组。总结来说：

**元组内元素的类型和元组长度决定了该元组的类型**

#### 二元组/序对

```haskell
-- 获取序对首项 fst
fst ('1', 2) -- '1'

-- 获取序对尾项 snd
snd ('1', 2) -- 2

-- 通过两个列表来生成一组序对 zip
-- 1. 返回的序对列表的长度由较短的列表决定
-- 2. 惰性计算
zip [1..] ['a', 'b'] -- [(1, 'a'), (2, 'b')]
```

### 类型

#### 常见类型

- `Int` 整数，有边界（bounded）
- `Integer` 整数，无边界，销量比`Int`低
- `Float` 单精度浮点数
- `Double` 双精度浮点数
- `Bool`
- `Char` 一个 Unicode 字符
- 元组类型 - 由元组长度和内部数据类型决定

类型的首字母必然大写

```haskell
-- :t + 合法的表达式，可得该表达式的类型
-- :: 代表 “它的类型是”
:t 'a' -- 'a' :: Char
:t True -- True :: Bool
:t "ab" -- "ab" :: [Char]

-- 函数的类型
-- a 不是类型而是类型变量，代表其可以是任意类型
-- 使用了类型变量的函数叫做多态函数
-- 函数的多个参数之间仍使用 -> 连接。因为 Haskell 的函数本质上都是一元函数，而多参数的函数则是柯里化的一元函数
:t head
-- head :: [a] -> a

:t fst
-- fst :: (a, b) -> a

sum a b = a + b
:t sum
-- sum :: Num a => a -> a -> a
```

#### 类型类

可以理解为接口`interface`。如果一个类型是某类型类的实例，则其必然实现了该类型类所描述的行为

- `Eq`类型类

用于可判断相等性的类型，要求其实例必须实现了`==`和`/=`两个函数

```haskell
:t (==)
-- (==) :: Eq a => a -> a -> Bool
-- 相等性函数取两个相同类型的值作为参数并返回一个布尔值，且这两个参数的类型都必须是 Eq 类型类的实例
```

- `Ord`类型类，用于比较大小

```haskell
:t (>)
-- (>) :: Ord a => a -> a -> Bool
```

`compare`函数取两个`Ord`类型的值作为参数，并返回一个`Ordering`类型的结果。`Ordering`类型有`GT`、`LT`、`EQ`三种值

```haskell
:t compare
-- compare :: Ord a => a -> a -> Ordering

compare 5 3
-- GT

5 `compare` 5
-- EQ
```

- `Show`类型类

`Show`类型类的实例为可以表示为字符串的类型

```haskell
show 3 -- "3"
```

- `Enum`类型类

`Enum`的类型类都是有连续顺序的，其值是可以枚举的，每个值都有相应的前趋（predecesor）和后继（successer）。可以在区间中使用该类型类的实例

```haskell
[LT..GT] -- [LT, EQ, GT]
[1..3] -- [1, 2, 3]
['a'..'c'] -- ['a', 'b', 'c']
```

- `Num`类型类

表示数值的类型类，其实例类型都有数的特征。包含了实数和整数在内的所有数值相关类型

```haskell
:t 20
-- 20 :: Num t => t
```

- `Floating`类型类

包含`Float`和`Double`两种浮点类型

- `Integral`类型类

表示数值的类型类，仅包含整数，其实例类型有`Int`和`Integer`

```haskell
:t odd
-- odd :: Integral a => a -> Bool
```

### 函数

#### 模式匹配

定义函数时，可以为不同的模式分别定义函数体，传入的参数会从上到下的进行匹配；匹配上后，执行对应的函数体并退出函数。注：如果没有万能模式，则函数体匹配可能会失败，届时将抛出错误

```haskell
-- 元组的模式匹配
addVectors :: (Double, Double) -> (Double, Double) -> (Double, Double)
addVectors (x1, y1) (x2, y2) -> (x1 + x2, y1 + y2)

-- 递归（阶乘函数）
factorial :: Int a => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)

factorial 6 -- 720

-- 列表的模式匹配
-- x:xs 这样的模式可以把列表匹配为两部分，x 代表列表的第一个元素，xs 代表剩下的列表
head' :: [a] -> a
head' [] = error "Can not get head from an empty list"
head' (x:_) = x

-- as 模式
-- as 模式可以把一个值分隔成多个项，同时仍保留对其整体的引用
-- 例如，xs@(x:y:ys) 把值分隔成前两项和剩下的项，且 xs 保留了对原值的引用
firstLetter :: String -> String
firstLetter "" = "Empty"
firstLetter all@(x:_) = "First letter of " ++ all ++ " is: " ++ [x]

firstLetter "Abc" -- First letter of Abc is A
```

#### 哨卫

模式用于检查参数的结构是否匹配，而哨卫则用于检查参数的性质是否是真，其作用等同于 if 语句。哨卫的最后要使用`otherwise`语句，来捕获之前漏掉的条件

```hashell
judgeNumber :: Double -> Double -> String
judgeNumber numberA numberB
  | numberA / numberB < 5.0 = "Less than five"
  | numberA / numberB < 10.0 = "Less than ten"
  | numberA / numberB < 15.0 = "Less than fifteen"
  | otherwise = show numberA ++ " is much bigger than " ++ show numberB

judgeNumber 1000 10 -- "1000.0 is much bigger than 10.0"
```

#### `where`

可以利用`where`来保存计算的中间结果，**在`where`中定义的变量可以作用于当前函数的当前模式**

```hashell
-- 在 where 中定义变量
judgeNumber :: Double -> Double -> String
judgeNumber numberA numberB
  | number < small = "Less than five"
  | number < mid = "Less than ten"
  | number < big = "Less than fifteen"
  | otherwise = show numberA ++ " is much bigger than " ++ show numberB
  where number = numberA / numberB
        small = 5.0
        mid = 10.0
        big = 15.0

judgeNumber 1000 10 -- "1000.0 is much bigger than 10.0"
```

在`where`中也可以定义函数、使用模式匹配

```haskell
-- 在 where 中使用模式匹配
headOfList :: Show a => [a] -> String
headOfList listA = "List head is " ++ show headA
  where (headA:_) = listA

headOfList [1, 2, 3] -- "List head is 1"
```

#### `let`

`let`是一个表达式，一定会有返回值，允许在任何位置定义局部变量。在一个哨卫中通过`let`的变量，对其他哨卫不可见。

```haskell
-- let <binding> in <expression>
-- let 中定义的变量仅在 in 后的表达式内可见

(let a = 9 in a + 1) * 2 -- 20
let (a, b, c) = (1, 2, 3) in a + b + c -- 6

-- let 中定义多个变量
let a = 1; b = 2 in a * b -- 2

-- 列表推导式中的 let
[result | (a, b) <- [(1, 2), (3, 4)], let result = a + b] -- [3, 7]
```

#### `case`

函数定义中的模式匹配本质上就是`case`表达式的语法糖。不需要使用`break`关键字，匹配到之后自动退出后续匹配

```haskell
{-
case expression of pattern1 -> result1
                   pattern2 -> result2
                   pattern3 -> result3
-}

listLength :: [a] -> String
listLength ls = "List length is " ++ case ls of [] -> "empty"
                                                (x:[]) -> "a singleton list"
                                                (x:_) -> "a longer list"

listLength [] -- "List length is empty"
listLength [1] -- "List length is a singleton list"
listLength [1, 2] -- "List length is a longer list"
```

`case..of`和模式匹配是对于类型值不同形式的分析，而哨卫和`if..then..else..`则是对参数的条件讨论的表达式。

#### 优先级

运算符可能有三种属性：优先级、结合性、位置。

- 优先级：运算符号共有 0~9 总共 10 个优先级
- 结合性：左结合、右结合、无结合
- 位置：前缀、中缀、后缀

函数默认有着最高的优先级，且左结合，即`f j g == (f g) h`

### 递归

#### 用递归实现 Haskell 中的自带函数

```haskell
-- maximum 从列表中获取最大值
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "Empty list"
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)

-- replicate 将一个参数 x 重复 n 次，返回列表
replicate' :: Int -> a -> [a]
replicate' n x
  | n <= 0 = []
  | otherwise = x:(replicate' (n - 1) x)

-- repeat 将一个参数重复无限次，返回无限长度的列表
repeat' :: a -> [a]
repeat' x = x:repeat' x

-- take 截取数组的前 n 个元素，返回列表
take' :: Int -> [a] -> [a]
take' n _
  | n <= 0 = []
take' _ [] = []
take' n (x:xs) = x:take' (n - 1) xs

-- reverse 将数组反转
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

-- zip 以两个列表为参数，将列表对应位置的元素组合成元组，返回新的列表
zip' :: [a] -> [b] -> [(a, b)]
zip' [] _ = []
zip' _ [] = []
zip' (x:xs) (y:ys) = (x, y):zip' xs ys

-- elem 以一个元素和列表为参数，检查该元素是否存在于列表中，返回布尔值
elem' :: (Eq a) => a -> [a] -> Bool
elem' _ [] = False
elem' t (x:xs)
  | t == x = True
  | otherwise = elem' t xs
```

#### 用递归实现快速排序

0. 将数组升序排列
1. 以一个数为基准，将小于该数的值全部排在其左边，大于等于该数的值排在其右边
2. 左右分别快排，即左右两边的数组都递归的进行上一步操作，最后将结果合并起来

```haskell
quickSort :: [a] -> [a]
quickSort [] = []
quickSort [a] = [a]
quickSort (x:xs) =
  quickSort smaller ++ [x] ++ bigger
  where smaller = [a | a <- xs, a < x]
        bigger = [a | a <- xs, a >= x]

quickSort [5,2,3,5,7,1,0,9] -- [0,1,2,3,5,5,7,9]
```

### 高阶函数

#### 柯里化

##### 多元函数的本质

**Haskell 中的函数实质上只接收一个参数**，对于接收多参数的函数而言，其实是在传入一个参数之后返回的新的函数，这就是柯里化函数

```haskell
-- 自定义一个将三个数求和的函数
multTree a b c = a + b + c

-- 查看该函数类型
:t multTree
-- multTree :: Int -> Int -> Int -> Int

-- 我们知道 -> 后应该是代表了函数返回的结果，但三个参数之所以全部使用 -> 连接，是因为它本质上的类型其实是
-- Int -> (Int -> (Int -> Int))
-- 即在传入 Int 作为参数之后，返回了新的函数，如此这样重复三次，最终返回的 Int 才是函数调用后返回的结果
```

##### 柯里化的截断

```haskell
-- 以上面的 multTree 函数为例，可以利用截断不必一次性的调用函数，而是返回一个中间阶段

-- 正常使用多元函数
multTree 1 2 3
-- 如果传入参数的数量不对则会报错
multTree 1 2 -- error

-- 利用截断，不必一次性调用
-- 使用括号对函数进行截断
let multThree' = (multTree 1 2)
-- 之后再进行调用
multThree' 3 -- 6
multThree' 4 -- 7
```

#### 高阶函数

将函数作为函数的参数或者函数的返回值

```haskell
-- 实现一些标准库中的高阶函数

-- zipWith 该函数以一个方法和两个列表为参数，将两个列表中相应位置上的元素分别作用在方法上，并返回由结果组成的列表
zipWith (*) [1, 2, 3] [4, 5, 6] -- [4, 10, 18]

zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = (f x y):zipWith' f xs ys

-- flip 该函数以一个二元函数为参数，返回新的二元函数，且返回的函数所应接受的参数的顺序和原函数相反
-- 例如，原函数为 a -> b -> c，通过 flip 调用后返回的函数为 b -> a -> c

flip' :: (a -> b -> c) -> b -> a -> c
flip' f x y = f y x

-- map 接受一个函数和列表为参数，将列表中各个元素作用在函数上，返回由结果组成的新列表
-- \x -> x * x 是一个匿名函数，表示返回 x 的平方
map (\x -> x * x) [1, 2, 3] -- [1, 4, 9]

map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map' f xs

-- filter 将列表中的各元素作用于一个函数，返回由作用结果为 True 的元素组成的列表
filter (\x -> x > 0) [-1, 2, 0] -- [2]

filter' _ [] = []
filter' f (x:xs)
  | f x = x : filter' f xs
  | otherwise = filter' f xs
```

#### 匿名函数

匿名函数通过`\`表示，常用场景是作为函数参数传入

```haskell
-- 该匿名函数返回参数的 2 倍
\x -> x + x

-- 匿名函数可以使用匹配模式
-- 该匿名函数接受二元组为参数，并自动对二元组中的两个元素进行了匹配
let lambda = \(a, b) -> a * b
lambda (2, 3) -- 6
-- 但是如果匹配失败的话会直接抛出错误
lambda (2, 3, 4) -- error Couldn't match expected type ‘(a, a)’
```

#### 折叠函数

在 Haskell 中，处理列表一般都有一种通用的模式：

1. 检查列表是否为空，如果是空则直接返回空列表，或者抛出错误
2. 利用`(x:xs)`模式，分别取出列表中的单独元素进行处理，并将剩下的元素进行递归

同样利用这样的模式，Haskell 提供了折叠函数（fold function），用于将列表中的各元素依次代入到某一方法中，并将每个元素代入后返回的结果叠加起来，类似于其他语言中的`reduce`，但独特之处在于可以正序或逆序的进行叠加

折叠函数以一个二元函数、一个初始值（累加值）、一个待折叠的列表为参数。对于从左向右折叠的函数而言，二元函数的第一个参数是累加值，第二个参数是当前列表的值；对于从右向左折叠的函数而言，二元函数的第一个参数是当前列表的值，第二个参数是累加值

```haskell
foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b
foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b

-- 除此以外，还有 foldl1 和 foldr1 函数，它们默认以列表的第一个/最后一个元素作为初始的累加值
foldl1 :: Foldable t => (a -> a -> a) -> t a -> a
foldr1 :: Foldable t => (a -> a -> a) -> t a -> a
```

`l/r`两种折叠有一大差别：左折叠无法处理无限列表，而右折叠可以

##### `foldl`/`foldl1`

```haskell
-- 利用 foldl 实现 sum，对列表内元素求和
sum' [] = 0
sum' x = foldl (\a b -> a + b) 0 x
-- 或者直接使用 foldl1
sum' x = foldl1 (\a b -> a + b) x

sum' [1, 2, 3] -- 6

-- 利用 foldl 实现 map
mapl' :: (t -> a) -> [t] -> [a]
mapl' _ [] = []
mapl' f xs = foldl (\b x -> b ++ [f x]) [] xs

mapl' [2, 3, 4] -- [4, 9, 16]

-- 利用 foldl 实现 reverse
reversel' [] = []
reversel' xs = foldl (\b x -> x:b) [] xs

reversel' [1, 2, 3] -- [3, 2, 1]
```

##### `foldr`/`foldr1`

```haskell
-- 利用 foldr 实现 map
mapr' :: (t -> a) -> [t] -> [a]
mapr' _ [] = []
mapr' f xs = foldr (\x b -> f x : b) [] xs

mapr' [2, 3, 4] -- [4, 9, 16]

-- 利用 foldr 实现 reverse
reverser' [] = []
reverser' xs = foldr (\x b -> b ++ [x]) [] xs

reverser' [1, 2, 3] -- [3, 2, 1]
```

之前提及过，在列表合并的时候，向头部插入元素的`:`方法要优于在尾部并入数组的方法`++`，因此性能上`mapr'`比`mapl'`要好，而`reversel'`性能比`reverser'`好

#### `$`函数

`$`叫做函数应用符，定义为：

```haskell
($) :: (a -> b) -> a -> b
f $ x = f x
```

对于普通的函数而言，在调用过程中有较高的优先级（从左到右），而`$`的优先级则最低，因此，将`$`置于调用链中，可以改变正常的调用顺序

正常而言，形如`f a b c`的代码的调用过程是`((f a) b) c`，而如果使用了`$`，例如`f $ a b c`，则`f (a b c)`

```haskell
square :: Integral a => a -> a
square x = x * x

square 2 + 3 + 4 -- 相当于 2 * 2 + 3 + 4 = 11
square $ 2 + 3 + 4 -- 相当于 square (2 + 3 + 4) = square 9 = 81
```

#### 函数组合

函数组合定义为：`(fg)(x) = f(g(x))`，即乘法中的交换律。Haskell 中进行函数组合的标志为`.`，定义为：

```haskell
-- 注意查看参数类型：g 函数调用后返回的参数必须和 f 函数能够接受的参数类型一致
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)
```

使用函数组合可以应对一些需要生成新函数，或者需要匿名函数的场景

```haskell
-- 将列表内的数全部转为负数
-- 先全部取绝对值，再取负数

-- 如果通过匿名函数实现，则：
map (\x -> negate (abs x)) [5, -3, 1, -7]

-- 或者使用函数组合
map (negate . abs) [5, -3, 1, -7]
```

### 模块

Haskell 可以导入导出模块，使各个部分的代码可以松耦合，方便重用和管理

#### 模块导入

```haskell
-- 模块名称必须大写字母开头
-- import 语句要放在代码头部
import ModuleName

-- 只选择性的导入模块中的一些函数
import ModuleName (func1, func2)

--  导入模块中除了某个函数以外的其他函数
-- import ModuleName hiding (func3)

-- 限定导入，处理可能的命名冲突（模块内函数名和文件内函数名冲突）
-- import qualified ModuleName
-- 之后只能通过 ModuleName.func 来调用函数

-- 限定导入，并设置别名
-- import qualified ModuleName as Module
-- Module.func
```

#### 模块导出

模块的导出也需要在文件的开头就进行标识，指明该模块的名称以及导出的函数名，然后在导出语句的下部，在给出具体的函数实现。

```haskell
-- example.hs
module Example
(
  func1,
  func2,
  func3
) where

func1 x = x * x
-- ...func2, func3
```

#### Haskell 中的常用模块

##### `Data.List`模块

```haskell
import qualified Data.List as List

-- List.words 函数，可以将字符串转换为一组单词组成的列表（用空格分隔）
List.words "these are words"
["these", "are", "words"]

-- List.group 函数，将列表中相邻且相同的元素分到子列表里
:t List.group
-- List.group :: Eq a => [a] -> [[a]]
List.group [0, 0, 1, 1, 1, 2]
-- [[0, 0], [1, 1, 1], [2]]
List.group "hello"
-- ["h", "e", "ll", "o"]

-- List.sort 以可排序的元素组成的列表为参数，返回从小到大排序的结果
List.sort [4, 3, 2, 5, 0]
[0, 2, 3, 4, 5]

-- List.tails 返回一个列表的所有尾部子列表（包含一个空列表）
List.tails "hello"
["hello", "ello", "llo", "lo", "o", ""]

List.tails [1, 2, 3]
[[1, 2, 3], [2, 3], [3], []]

-- List.isPrefixOf 判断一个列表是否是另一个列表的前缀
List.isPrefixOf [1, 2] [1, 2, 3] -- True
List.isPrefixOf "he" "hello" -- True

-- List.isSuffixOf 判断一个列表是否是另一个列表的后缀
List.isSuffixOf [1, 2] [1, 2, 3] -- False
List.isSuffixOf "lo" "hello" -- True

-- List.isInfixOf 判断一个 String 是否是另一个 String 的 中缀
:t isInfixOf -- isInfixOf :: Eq a => [a] -> [a] -> Bool
isInfixOf "abc" "1abc2" -- True
isInfixOf "abc" "1absc2" -- False

-- List.any 以一个限制条件和一个列表为参数，判断列表中是否存在元素满足该限制条件
List.any (\x -> x > 0) [-1, -2, 0, 1]
True

-- List.\\ 求两个列表的差集（第一个列表减去第二个列表）
(List.\\) :: Eq a => [a] -> [a] -> [a]
[1, 2, 3, 4] List.\\ [1, 2, 3] -- [4]
[1, 2, 3] List.\\ [1, 2, 3, 4] -- []

-- List.nub 列表去重
:t List.nub -- List.nub :: Eq a => [a] -> [a]
List.nub [1, 1, 2, 3] -- [1, 2, 3]

-- List.findIndex 返回第一个满足条件的元素的位置
:t List.findIndex -- List.findIndex :: (a -> Bool) -> [a] -> Maybe Int
List.findIndex (>0) [0, 1, 2] -- Just 1
List.findIndex (>0) [0, -1, -2] -- Nothing

-- List.findIndices 返回所有满足条件的元素的索引
:t List.findIndices -- List.findIndices :: (a -> Bool) -> [a] -> [Int]
List.findIndices (>0) [0, 1, 2] -- [1, 2]
List.findIndices (>0) [0, -1, -2] -- []

{-
----- Data.List.Split 模块 -----
https://hackage.haskell.org/package/split-0.2.3.3/docs/Data-List-Split.html
-}

-- splitOn 方法，根据指定字符分割字符串
splitOn " " "   1" -- ["", "", "", "1"]
```

---

关于列表折叠：

由于 Haskell 的延迟计算属性，在折叠操作的每一步计算时，只有到真正计算时才进行运算。但折叠时，需要依赖上一步的累加值。鉴于这种延迟计算之间的依赖关系，Haskell 会把每步的延迟计算放在内存中保留起来。随着折叠的进行，会造成大量延迟计算的遗留，占据内存，可能导致栈溢出错误。

```haskell
-- Haskell 的折叠运行过程
-- 构建了一个大的延迟计算栈，直到折叠的目标数组为空时，才开始对之前的延迟进行计算，而延迟计算都是按照递归的形式进行求值
foldl (+) 0 [1, 2, 3] =
foldl (+) (0 + 1) [2, 3] =
foldl (+) ((0 + 1) + 2) [3] =
foldl (+) (((0 + 1) + 2) + 3) [] =
(((0 + 1) + 2) + 3) =
(1 + 2) + 3 =
3 + 3 =
6

-- List.foldl' 提供了非延迟计算版本的折叠方法
List.foldl' (+) 0 [1, 2, 3] =
List.foldl' (+) 1 [2, 3] =
List.foldl' (+) 3 [3] =
List.foldl' (+) 6 [] =
6
```

##### `Data.Char`模块

```haskell
import qualified Data.Char as Char

-- Char.ord 将字符转换为数值
-- 两个字符 ord 值的差，即代表他们在 Unicode 编码表中的距离
Char.ord 'a' -- 97

-- Char.chr 将数值转换为字符
Char.chr 97 -- 'a'

-- Char.digitToInt 把 Char 类型的参数转为 Int 类型
-- 可用于 '0' ~ '9' 以及 'A'/'a' ~ 'F'/'f'
Char.digitToInt '2' -- 2
Char.digitToInt 'F' -- 15

-- Char.isDigit 以一个字符为参数，判断是否是数字
Char.isDigit 'a' -- False
Char.isDigit '1' -- True

-- 将字符转为大写
-- Char.toUpper
Char.toUpper 'a' -- A
```

##### `Data.Map`模块

```haskell
-- 映射
import qualified Data.Map as Map

-- 关联列表：即字典，将数据按照键值对的形式进行储存。可以有重复的键。例如，
-- [('a', 1), ('b', 2)]
-- [('a', 1), ('b', 2), ('a', 2)]
-- 关联列表的键必须是可判断是否相等的，即必须是 Eq 类型类的实例

-- Map.fromList 将一组关联列表转换为映射（Map.Map）。重复键的键值对会被覆盖
Map.fromList [('a', 1), ('b', 2), ('a', 2)]
fromList [('b', 2), ('a', 2)]

-- 映射的键必须是可排序的，即 Ord 类型类的实例
-- :t Map.fromList
-- Map.fromList :: (Ord k) => [(k, v)] -> Map.Map k v

-- Map.fromList 会令关联列表中重复键的键值对丢失。如果需要全部转为映射，则需要使用 Map.fromListWith 函数，该函数需要你自己提供一个函数来确定处理重复键的情况
Map.fromListWith (+) [('a', 1), ('b', 2), ('a', 2)]
[('a', 3), ('b', 2)]
```

```haskell
-- Map.lookup 以一个键和 Map.Map 为参数，查找映射中该键对应的值
map = Map.fromList [('a', 1), ('b', 2), ('a', 2)]
Map.lookup 'a' map
-- Just 2
Map.lookup 'c' map
-- Nothing

-- Map.! 以一个键和 Map.Map 为参数，查找映射中该键对应的值
-- 如果查找到键，则直接返回值（不是 Maybe），但如果键不存在则抛出错误
(Map.!) map 'key'

-- Map.insert 插入键值对，返回新的映射
newMap = Map.insert 'c' 9 map
map -- fromList [('a', 2), ('b', 2)]
newMap -- fromList [('a', 2), ('b', 2), ('c', 9)]

-- Map.size -- 返回映射中键值对总数
Map.size map -- 2

-- Map.map 取一个函数和映射为参数，将函数应用到映射键值对的每个值上，返回新的映射
-- :t Map.map
Map.map :: (a -> b) -> Map.Map k a -> Map.Map k b
```

##### `Data.Set`模块

```haskell
import qualified Data.Set as Set

-- 将数组转为 Set
Set.fromList [1, 2, 3, 4, 4] -- fromList [1, 2, 3, 4]

-- 将 Set 转为 List
Set.elems $ Set.fromList [1, 2, 3, 4, 4] -- [1, 2, 3, 4]

-- 检查元素是否存在于 Set 内
Set.member a set

-- 检查元素是否不存在于 Set 内
Set.notMember a set

-- 检查 Set 是否为空
Set.empty set
```

### 类型和类型类

#### 自定义类型和值构造器

使用`data`关键字定义类型

```haskell
-- Bool 类型的定义
data Bool = False | True
-- 等号左侧为类型名称；等号右侧为值构造器，指明了该类型所有可能的值
```

可以自定义类型和值构造器，例如，定义一个`Shape`类型，其可能的值有`Circle`和`Rectangle`

```haskell
-- 值构造器的表示方式和函数类似，即 名称 + 参数
data Shape = Circle Float Float Float | Rectangle Float Float Float Float
:t Circle
-- Circle :: Float -> Float -> Float -> Shape
:t Rectangle
-- Rectangle :: Float -> Float -> Float -> Float -> Shape

-- 编写一个计算面积的函数，它以 Shape 类型作为参数，并根据不同的值构造器来进行计算
area :: Shape -> Float
area (Circle _ _ r) = pi * r ^ 2
area (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)
area $ Circle 1 2 3
-- 28.274334

-- 令类型派生 Show 类型类的协议，则可以让值构造器被输出
data Shape = Circle Float Float Float | Rectangle Float Float Float Float
:t Circle
  deriving (Show)
Circle 1 1 1
-- 输出：Circle 1 1 1

-- 由于值构造器本质上是函数，因此可以对它进行所有可以对函数做的事情
map (Circle 10 20) [4, 5, 6, 6]
```

将自定义类型导出

```haskell
module Shapes
(
  Shape(..) -- 将 Shape 的所有值构造器都导出
  -- 或者通过 Shape(Circle, Rectangle) 导出特定的某些值构造器
) where
```

#### 值构造器的记录语法

当值构造器需要接受很多参数时，通过旧的参数依次传递的方法会显得非常麻烦，例如：

```haskell
data Person = Person String String Int -- 等等很多参数.......
```

利用*记录语法*来实现等价功能

```haskell
data Person = Person {
  name :: String,
  age :: Int,
  job :: String
} deriving (Show)

-- 在构造时可以不必在意各个参数的顺序
Person { age: 999, job: "whatever", name: "ecmadao" }

-- 并且自动提供了获取值的函数
name Person -- "ecmadao"
:t name
-- name :: Person -> String
```

#### 类型构造器

使用`data`构造类型时，以类型作为参数产生新的类型

```haskell
data Maybe a = Nothing | Just a
```

`a`是一个类型参数，因此`Maybe`是一个类型构造器，可以生产出诸如`Maybe Int`，`Maybe String`这样的类型

```haskell
-- 将 Char 类型传入 Maybe，即可得到 Maybe Char 类型
-- 因此，Just 'a' 的类型就应该是 Maybe Char
:t Just 'a'
Just 'a' :: Maybe Char
```

##### 参数化构造

之前在生成值构造器的时候，我们直接指定了各个参数的类型，例如`data Person = Person String String Int`，这样的话，在运用的时候，就必须确实的使用该类型的参数。而如果参数化构造器，则不再对其进行限制：

```haskell
data Person a b c = Person a b c

descOfPerson :: (Show c) => (Person String String c) -> String
descOfPerson (Person a b c) = "Name: " ++ a ++ ", Job: " ++ b ++ ", Age: " ++ c
```

#### 派生实例

类型类是定义了某些行为的接口。如果类型想拥有该行为，则需要通过`deriving`成为该类型类的实例。

例如，通过派生`Show`使得`Person`可以被直接输出。通过派生`Eq`则使两个`Person`实例之间可以被`==`和`/=`比较：a, b, c 三个值都相等的`Person`实例被认为是相等的，因此，这又要求 a, b, c 三个参数都是派生了`Eq`了的类型

```haskell
data Person a b c = Person a b c deriving (Show, Eq)
Person "a" "b" 1 == Person "a" "b" 1 -- True
Person "a" "b" 1 == Person "a" "b" 2 -- False
```

如果类型派生了`Ord`类型类，则可以进行比较操作。对于拥有多个值构造器的类型而言，排在前面的值被认为较小；而如果是同一个值构造器，则依次比较各个参数的大小。例如：

```haskell
data Bool = False | True deriving (Ord)
False > True -- False
False < True -- True
```

#### 类型别名

通过`type`关键字来给某个类型定义别名。例如，`String`本质上是`Char`组成的列表，因此，`type String = [Char]`

类型别名可以带有参数：

```haskell
import Data.Map

type AssocList k v = [(k, v)] -- 定义另一个类型表示关联列表
type IntMap v = Map.Map Int -- 表示从整数到某东西之间的映射关系的类型
```

#### 类型类

类型类定义了某些行为，派生了特定类型类的类型，可以实现这些行为。`class`关键字用于定义新的类型类，而`instance`关键字则用于将类型转为某一类型类的实例

##### `Eq`类型类

```haskell
-- Eq 类型类
class Eq a where
  (==) :: a -> a -> Bool
  (/=) :: a -> a -> Bool
  x == y = not (x /= y)
  x /= y = not (x == y)
```

自定义一个类型，并让其实现为`Eq`的实例：

```haskell
data TrafficLight = Red | Yellow | Green

instance Eq TrafficLight where
  Red == Red = true
  Yellow == Yellow = true
  Green == Green = true
  _ == _ = false
```

```haskell
-- 可以将一个类型类实现为另一个类型类的子类
class (Eq a) => Num a where
  -- ...

-- 将带参数的类型（类型构造器）实现为类型类的实例
-- 而且带有类型约束
-- Maybe 是一个类型构造器，因此不能用来实现类型类的定义；而 Maybe m 则是具体的类型
instance (Eq m) => Eq (Maybe m) where
  Nothing == Nothing = true
  Just x == Just y = x == y
  _ == _ = False
```

##### `Functor`类型类

`Functor`表示可以映射的事务，又可被称作“函子”。在范畴论中，函子是范畴间的一类映射。在 Haskell 中，凡是拥有容器性质的类型都可以被视为函子，例如列表（可以为空，也可以装某种类型的数据），`Maybe`（可以是`Nothing`，也可以是`Just a`）

```haskell
{-
  定义了一个函数 fmap
  而其中的 f 则代表一个取一个类型参数的类型构造器，例如 Maybe
  总结而言，fmap 函数取一个参数类型和返回值类型不同的函数，和一个应用到某类型的函子（functor）值作为参数，
  返回一个应用到另一个类型的函子值
-}
class Functor f where
  fmap :: (a -> b) -> f a -> f b

-- map 函数就是一种仅处理列表的 fmap 方法
:t map
-- map :: (a -> b) -> [a] -> [b]

-- 列表作为 Functor 类型类的实例的实现如下
instance Functor [] where
  fmap = map

-- Maybe 作为 Functor 类型类的实例的实现如下
instance Functor Maybe where
  fmap f (Just x) = Just (f x)
  fmap f Nothing = Nothing

-- 由 Maybe 的实现可知，函数可以直接作用在 Maybe 内可能包含的值上，并最终返回一个 Maybe 类型，比如：
fmap (*2) $ Just 2 -- Just 4
fmap (*2) Nothing -- Nothing
```

### 函子

#### 普通函子

如上所述，函子是可以被映射的东西，是具有容器性质的类型，例如列表，`Maybe`，树。可以把函子看做是具有额外上下文的值，比如`Maybe`的额外上下文是`Nothing`或者`Just`，即它可能会失败。`fmap`函数可以在保持上下文不变的条件下，把一个函数作用到上下文里的值上。

##### 函数类型的函子值

函数类型`r -> a`可以被改下为`(->) r a`，而得益于 Haskell 的截断语法，`(->) r`可以被单独提取出来。作为一个函数函子存在

```haskell
-- 定义在 Control.Monad.Instances
instance Functor ((->) r) where
  fmap f g = (\x -> f (g x))
```

很明显了，函数组合！一步一步拆解上述定义：

```haskell
-- fmap 的定义
fmap :: (a -> b) -> f a -> f b

-- 用 (->) r 替换 f
fmap :: (a -> b) -> ((->) r a)) -> ((->) r b)

-- 把 (->) r a 改写为 r -> a 的形式
fmap :: (a -> b) -> (r -> a) -> (r -> b)
```

可以看出，一个以`a`类型的值为参数且返回`b`类型的值的函数，和一个以`r`类型值为参数且返回`a`类型值的函数进行组合，即相当于返回了一个以`r`类型值为参数，且最终返回`b`类型值的函数。`f g = (\x -> f g( x))`

函数组合的另一种表示方式：

```haskell
instance Functor ((->) r) where
  fmap = (.)
```

可以用如下两种方式思考`fmap`：

- 接受函数和函子值，在函子值上映射该函数
- 接受函数，把它提升为操作函子值的函数

##### 两条函子定律

1. **如果在函子值上映射`id`函数，则返回的函子值应该和之前的一样**

```haskell
-- id 函数
id :: a -> a

fmap id (Just 3) -- Just 3
id (Just 3) -- Just 3
```

2. **如果把两个函数组合起来，映射在一个函子上，则得到的结果和 先用一个函数映射函子，再用另一个函数映射后得到的结果相同**

```haskell
fmap (f . g) = fmap f . fmap g
```

#### `applicative`函子

普通的函子可以解决了**将函数作用到上下文内的值**的问题，但无法解决*多个上下文内的值相互作用*的问题。

例如，利用函子，我们可以把`(*3)`函数作用的`Maybe`上下文的值里，即`fmap (*3) (Just 2)`可得`Just 6`，但是无法计算`Just (*3) $ Just 2`。

因此，只是使用普通函子，我们可以把普通函数映射在函子值上，但不能把函子值里面的函数映射到另一个函子值上，而这就是`applicative`函子所要解决的问题。

```haskell
-- 定义在 Control.Applicative 模块中，是 Functor 类型类的子类
class (Functor f) => Applicative f where
  pure :: a -> f a -- 接收一个值，把它放在某个默认的（纯的）上下文中
  (<*>) :: f (a -> b) -> f a -> f b -- 接收一个里面是函数的函子值和另一个函子，从第一个函子里取出函数然后映射到第二个函子的值上
```

##### `<$>`函数

为了简化操作，在`Control.Applicative`中导出了`<$>`函数，就是`fmap`函数的中缀操作符版本：

```haskell
-- Control.Applicative
(<$>) :: (Functor f) => (a -> b) -> f a -> f b
f <$> x = fmap f x

-- 使用 <$>
-- f <$> x <*> y，把函数 f 映射到两个 applicative 函子值上
```

##### `Maybe`函子

```haskell
instance Applicative Maybe where
  pure = Just -- pure x = Just x
  Nothing <*> _ = Nothing
  (Just f) <*> something = fmap f something -- 抽出函数后，即可利用普通函子的性质

Just (*3) <*> Just 9 -- Just 27
Just (*3) <*> Nothing -- Nothing

pure (+) <*> Just 3 <*> Just 5
-- (pure (+) <*> Just 3) <*> Just 5
-- (Just + <*> Just 3) <*> Just 5
-- Just (+3) <*> Just 5
-- Just 8
```

由上面的`pure (+) <*> Just 3 <*> Just 5`可以得到一个`applicative`函子定律：

**如果我们把一个函数放到默认上下文中，取出来应用到另一个 applicative 函子上的值里，则相当于直接用该函数映射到那个 applicative 函子**

```haskell
pure f <*> x = fmap f x
pure f <*> x <*> y <*> ... === fmap f x <*> y <*>...

-- 使用 <$>
(*) <$> Just 2 <*> Just 3 -- Just 6
```

##### 列表函子

```haskell
instance Applicative [] where
  pure x = [x]
  fs <*> xs = [f x | f <- fs, x <- xs] -- 两个列表组成的列表推导式

-- fs <*> xs = [f x | f 4 fs, x <- xs]
-- 以一个函数列表和普通列表为参数，将两者内的元素进行组合
[(*0), (*2), (^2)] <*> [1, 3] -- [0, 0, 2, 6, 1, 9]
```

##### `ZipList`函子

如上述列表函子所示，`list1 <*> list2`实质上就是两个列表的列表推导式，一个列表里的函数会以此作用在第二个列表的所有元素里。而如果想实现`Zip`的功能，即各列表只有同样位置上的元素才会相互作用，则需要使用`ZipList`函子

```haskell
instance Applicative ZipList where
  pure x = ZipList (repeat x)
  ZipList fs <*> ZipList xs = ZipList (zipWith (\f x -> f x) fs xs)

-- 因为 ZipList 不是 Show 的实例，因此需要用 getZipList 从中取出原生的列表
getZipList $ (+) <$> ZipList [1, 2, 3] <*> ZipList [100, 100, 100, 100]
-- [101, 102, 103]

getZipList $ (,,) <$> ZipList "ab" <*> ZipList "cd" <*> ZipList "ef"
[('a', 'c', 'e'), ('b', 'd', 'f')]
-- (,,) 函数等同于 \x y z -> (x, y, z)
-- 类似的，(,) 等同于 \x y -> (x, y)
```

##### 函数函子

```haskell
instance Applicative ((->) r) where
  pure x = (\_ -> x)
  f <*> g = \x -> f x (g x)
```

应用函数 applicative 函子

```haskell
(+) <$> (+3) <*> (*100) $ 5
-- 一步步分析
-- 1. (+3) <*> (*100) = \x -> (+3) x ((*100) x)
-- 2. (+3) <*> (*100) $ 5 = (+3) 5 ((*100) 5) = 8 500
-- 3. (+) <$> (+3) <*> (*100) $ 5 = 把 + 作用在得到的结果上，即 508
```

##### `applicative`的实用函数

```haskell
-- 在两个 applicative 之间应用普通函数
liftA2 :: (Applicative f) => (a -> b -> c) -> f a -> f b -> f c
listA2 f a b = f <$> a <*> b

listA (:) (Just 3) (Just [4]) -- Just [3, 4]
```

### `newtype`

> 高达里的新人类（大雾）

通过`newtype`关键字可以根据现有数据类型来创建新的类型：接收一个类型，然后包裹成另一个类型

可以对`newtype`使用`deriving`关键字，但要求被包裹的类型已经是派生的类型类的实例

```haskell
-- 创建一个 CharList newtype
newtype CharList = CharList { getCharList :: [Char] } deriving (Eq, Show)

CharList "this is test"
-- CharList {getCharList = "this is test"}
CharList "test" == CharList "test" -- True
```

```haskell
-- 用 newtype 创建类型类的实例
-- 对于 Functor 类型类而言，只接收一个参数的类型构造器可以成为其实例，例如 Maybe
-- instance Functor Maybe where
-- 但是对于多参数的类型，比如二元组 (a, b)，则无法直接成为 Functor 实例，可以先用 newtype 创建一个新类型
newtype Tuple a b = Tuple { getTuple :: (a, b) }

-- 然后另其成为 Functor 的实例
-- 让一个作用在二元组上的函数仅作用在第二个元素上
instance Functor (Tuple a) where
  fmap f (Tuple (x, y)) = Tuple (f x, y)

getTuple $ fmap (*100) (Tuple (1, 2)) -- (1, 200)
```

`newtype`把一个已有的类型转换为新的类型，因此在 Haskell 内部，新、旧类型的值是一样的。

关于`type`/`newtype`/`data`的对比：

- `type`用于创建类型别名，即仅仅赋予一个新的名称
- `newtype`将已有类型包裹成新的类型
- `data`则用于创建全新的类型

### `Monoid`类型类

#### 什么是`Monoid`

- [什么是 Monoid？](http://www.jdon.com/idea/monoid.html)

`Monoid`是类型类。一个`monoid`由一个满足结合律的二元函数和一个单位元组成。

- 结合律：`(a b) c` = `a (b c)`
- 单位元：一个值被称为某函数的单位元，是指当它和函数的其他参数作用时，结果总是返回其他参数。例如，`*`运算的单位元是`1`，`:`运算的单位元是`[]`

```haskell
class Monoid m where
  mempty :: m
  mappend :: m -> m -> m
  mconcat :: [m] -> m
  mconcat :: foldr mappend mempty
```

`monoid`定律：

- mempty `mappend` x = x
- x `mappend` mempty = x
- (x `mappend` y) `mappend` z = x `mappend` (y `mappend` z)

#### `Monoid`的一些实例

##### 列表

```haskell
instance Monoid [a] where
  mempty = []
  mappend = (++)

-- 注：instance Monoid [a] where 中使用 [a] 而不是 []
-- [] 是类型构造器
-- [a] 是类型 --> 具体含有某种类型的元素的列表

[1, 2] `mappend` [3, 4] -- [1, 2, 3, 4]
-- monoid 没有要求 a `mappend` b = b `mappend` a
```

##### `Product`和`Sum`

把`Num`看成`monoid`有两种方式：

1. 二元函数为乘法`*`，且单位元为`1`
2. 二元函数为加法`+`，且单位元为`0`

**当有多种方式把一个类型变成某个类型类的实例时，可以把那个类型包裹到 newtype 里，然后把新的类型变成那个类型类的实例。**

因此，为了把`Num`变成`Monoid`类型类的实例，且支持上述两种`monoid`，在`Data.Monoid`模块里导出了两个`newtype`：`Product`和`Sum`：

```haskell
newtype Product a = Product { getProduct: a } deriving (Eq, Ord, Read, Show, Bounded)
newtype Sum a = Sum { getSum: a } deriving (Eq, Ord, Read, Show, Bounded)
```

两个新类型的`Monoid`实例定义如下：

```haskell
instance Num a => Monoid (Product a) where
  mempty = Product 1
  Product x `mappend` Product y = Product (x * y)

instance Num a => Monoid (Sum a) where
  mempty = Sum 0
  Sum x `mappend` Sum y = Sum (x + y)
```

```haskell
getProduct $ (Product 3) `mappend` (Product 9) -- 27
getSum $ (Sum 3) `mappend` (Sum 4) -- 7
```

##### `All`和`Any`

把`Bool`看成`monoid`有两种方式：

1. 二元函数为`||`，单位元为`False`
2. 二元函数为`&&`，单位元为`True`

因此，为了把`Bool`变成`Monoid`类型类的实例，且支持上述两种`monoid`，在`Data.Monoid`模块里导出了两个`newtype`：`Any`和`All`：

```haskell
newtype Any = Any { getAny :: Bool } deriving (Eq, Ord, Read, Show, Bounded)
newtype All = All { getAll :: Bool } deriving (Eq, Ord, Read, Show, Bounded)
```

实例定义如下：

```haskell
instance Monoid Any where
  mempty = Any False
  Any x `mappend` Any y = Any (x || y)

instance Monoid All where
  menpty = All True
  All x `mappend` All y = All (x && y)
```

```haskell
getAny $ Any True `mappend` Any False -- True
getAll $ All True `mappend` All False -- False
```

##### `Maybe`

```haskell
-- 具有类约束，a 必须是 Monoid 的实例
instance Monoid a => Monoid (Maybe a) where
  mempty = Nothing
  Nothing `mappend` m = m
  m `mappend` Nothing = m
  (Just m) `mappend` (Just n) = Just (m `mappend` n)

Nothing `mappend` (Just 1) -- Just 1
```

### `Monad`

> A monad is just a monoid in the category of endofunctors, what's the problem?

- [什么是 Monad？](http://www.jdon.com/idea/monad.html)

#### 回顾函子

对于普通函子而言，解决了这样一类问题：有一个类型为`a -> b`的函数和某个类型为`f a`的数据，把函数映射到数据上得到`f b`

```haskell
fmap :: (Functor f) => (a -> b) -> f a -> f b
```

而`applicative`函子则解决了这样的问题：有类型为`f (a -> b)`的函数和类型为`f a`的数据，把数据作用到函数上得到`f b`

```haskell
(<*>) :: (Applicative f) => f (a -> b) -> f a -> f b
```

而`monad`则是对`applicative`函子概念的延伸，它是为了解决这样的问题：如果有带着上下文的值`m a`，和一个函数`a -> m b`，把值作用到函数上得到`m b`。即把参数的值从上下文中抽离出来后作用在函数上返回一个新的带有上下文的数据。

```haskell
(>>=) :: (Monad m) => m a -> (a -> m b) -> m b
```

#### `Monad`类型类

```haskell
class Monad m where
  return :: a -> m a -- 类似于 applicative 函子中的 pure
  (>>=) :: m a -> (a -> mb) -> m b

  (>>) :: m a -> m b -> m b
  x >> y = x >>= \_ -> y -- >> 方法总是会忽略左边的参数

  fail :: String -> m a
  fail msg = error msg
```

#### `Maybe`的`Monad`实例

```haskell
instance Monad Maybe where
  return x = Just x
  Nothing >>= f = Nothing
  Just x >>= f = f x
  fail _ = Nothing
```

```haskell
return "WHAT" :: Maybe String
-- Just "WHAT"

Just 9 >>= \x -> return (x*10)
-- Just 90

Nothing >>= \x -> return (x*10)
-- Nothing

Just 4 >> Just 3
-- Just 3
```

#### 列表的`Monad`实例

```haskell
instance Monad [] where
  return x = [x]
  xs >>= f = concat (map f xs)
  fail _ = []

-- concat 用来展平列表
:t concat
-- concat :: Foldable t => t [a] -> [a]
concat [[1], [2], [3, 4]]
-- [1, 2, 3, 4]
```

```haskell
[3, 4, 5] >>= \x -> [x, -x]
-- [3, -3, 4, -4, 5, -5]

[1, 2] >>= \n -> ['a', 'b'] >>= \ch -> return (n, ch)
-- [1, 2] 中的各个元素被绑定到 n
-- ['a', 'b' 中的各个元素被绑定到 ch]
-- 对于 [1, 2] 中的每个元素，遍历 ['a', 'b'] 组合成一个二元组 (n, ch)
-- [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
-- 其作用相当于列表推导式：[(n, ch) | n <- [1, 2], ch <- ['a', 'b']]

-- 用 do 语法改写
listOfTuples :: [(Int, Char)]
listOfTuples = do
  n <- [1, 2]
  ch <- ['a', 'b']
  return (n, ch)
```

#### `monad`定律

##### 左单位元

```haskell
return x >>= f == f x

return "ab" >>= \x -> [x, x]
-- ["ab", "ab"]
```

##### 右单位元

```haskell
m >>= return == m

"ab" >>= return
-- "ab"
```

##### 结合律

```haskell
(m >>= f) >>= g == m >>= (\x -> f x >>= g)
```

### 输入和输出

略