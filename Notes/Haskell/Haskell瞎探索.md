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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Haskell 瞎探索

Haskell 很有趣。

Haskell 是一门纯函数式编程语言。

- Haskell 是**惰性**的。若非指明，在需要结果之前，Haskell 不会执行函数。它会尽量推迟计算、执行最少的计算，直到你需要的数据为止
- Haskell 是**静态类型，并支持类型推导**。因此，不必要每次都手动表明变量的类型

### 基础

- 基础语法可见：[learnxinyminutes - haskell](https://learnxinyminutes.com/docs/zh-cn/haskell-cn/)

- 命名

1. 用于命名值、变量、函数名和类型变量的标识符，必须从小写字母开始
2. 类型名、模块名、类名，必须以大写字母开始

- 对于基本运算而言，和其他语言几乎一致，但需要注意的是，如果表达式内存在负数，则最好用括号将其包裹起来

```haskell
{-
  + 加
  - 减
  * 乘
  / 除
  == 相等
  /= 不等
-}
5 * (-1)
```

- if,else

Haskell 中的 if 语句里，else 部分不可省略。在 Haskell 里，if 语句是一个必然返回结果的表达式，而非语句

- 列表，字符，字符串

字符串实质上是字符组成的列表，且字符串只能用双引号`""`表示，而字符则用单引号`''`表示

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
length [1, 2, 3] -- 3

-- 检查列表是否为空 null
null [1, 2, 3] -- False
null [] -- True

-- 反转列表 reverse
reverse [1, 2, 3] -- [3, 2, 1]

-- 返回列表中指定的前 N 个元素 take
-- 如果 N 超过列表长度，则返回原列表的复制（纯函数，因此不会返回原列表，而是原列表的拷贝）
take 2 [1, 2, 3] -- [1, 2]

-- 删除列表中指定的前 N 个元素 drop
-- 返回的是删除了前 N 个元素的新列表，不会修改原列表
drop 2 [1, 2, 3] -- [3]

-- 获取列表中最大值/最小值 maximum/minimum
maximum [1, 2, 3] -- 3
minimum [1, 2, 3] -- 1

-- 列表所有元素求和/求积 sum/product
sum [1, 2, 3] -- 6
product [1, 2, 3, 4] -- 24

-- 判断某个元素是否包含在列表里 elem
elem 2 [1, 2, 3] -- True
4 `elem` [1, 2, 3] -- False
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

函数定义中的模式匹配本质上就是`case`表达式的语法糖

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
