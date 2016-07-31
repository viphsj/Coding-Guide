<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Elm基础语法](#elm%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95)
  - [基本](#%E5%9F%BA%E6%9C%AC)
    - [类型](#%E7%B1%BB%E5%9E%8B)
    - [字符串拼接](#%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%8B%BC%E6%8E%A5)
    - [算数](#%E7%AE%97%E6%95%B0)
    - [boolean](#boolean)
    - [条件表达式](#%E6%9D%A1%E4%BB%B6%E8%A1%A8%E8%BE%BE%E5%BC%8F)
  - [more](#more)
    - [Func](#func)
    - [let..in..](#letin)
    - [List](#list)
    - [tuple](#tuple)
    - [Record](#record)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Elm基础语法

[Learn X in Y minutes -- Where X=Elm](https://learnxinyminutes.com/docs/elm/)

### 基本

#### 类型

[How to Read a Type Annotation](https://github.com/elm-guides/elm-for-js/blob/master/How%20to%20Read%20a%20Type%20Annotation.md)

基本类型和多数语言是类似的，String, Char, Bool Int, Float。
但需要注意，String必须用双引号，单引号是用来表示Char的

```elm
-- 类型声明
a: Int -- 声明a变量必须是Int类型
a = 1 -- 注意在声明之后就需要赋值

-- 声明函数(接受类型和返回类型)
func: Int -> Int -- 接受一个Int，并返回一个Int
fun: String -> Int -> String -- 接受一个String一个Int，并返回一个String

-- 复杂类型设置别名
a: {b: String, c: Int} -- a是一个类型较复杂的对象
d: List {b: String, c: Int} -- d是a组成的List

-- 但可以通过先对类型设置别名的方式，进行比较简单的声明

type alias A = {b: String, c: Int} -- 声明A的类型
a: A
d: List A
```

#### 字符串拼接

```elm
"hey" ++ " world"
-- hey world
```

#### 算数

```elm
-- 整除
9 // 2 -- 4

-- 返回浮点数的除法
9 /2 -- 4.5

-- 平方
5 ^ 2 -- 25
```

#### boolean

```elm
not True -- False
1 == 1 -- True
1 /= 1 -- False
1 < 10 -- False
```

#### 条件表达式

```elm
-- if else
if True then .. else ..

if True then 
  ..
else if True then 
  ..
else
  ..

-- case
case List.head aList of
  Just x ->
  	"The head is " ++ toString x
  Nothing ->
  	"The list was empty."
```

### more

#### Func

```elm
-- 以空格表示参数的接受和定义
fun: Int -> Int -> Int
fun a b =
	a + b
	
fun 1 2 -- 3
```

```elm
-- 使用\表示匿名函数
List.map (\a -> a * 2) [1..4] -- [2, 4, 6, 8]
```

#### let..in..

let 表达式的结果会被用在in表达式内

```elm
volume {width, height, depth} =
  let
    area = width * height
  in
    area * depth
volume { width = 3, height = 2, depth = 7 } -- 42
```

#### List

[List](http://package.elm-lang.org/packages/elm-lang/core/3.0.0/List)

```elm
import List

-- List的类型为List a，其中a表示任意的类型。但一个List里的元素必须都是一样的类型
-- elements in a List must be the same type

[1..5] == [1, 2, 3, 4, 5] -- True

repeat: Int -> a -> List a
-- Create a list with n copies of a value
repeat 3 (0,0) == [(0,0),(0,0),(0,0)]

append: List a -> List a -> List a
-- append list
[1..5] ++ [6..10] == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
append [1,1,2] [3,5,8] == [1,1,2,3,5,8]
append ['a','b'] ['c'] == ['a','b','c']

(::): a -> List a -> List a
-- add item to the front of a list
0 :: [1..5] -- [0, 1, 2, 3, 4, 5]

concat: List (List a) ->List a
concat [[1,2],[3],[4,5]] == [1,2,3,4,5]
```

```elm
import List
examples: List Int
examples = [2, 1, 5, 4, 3]

List.isEmpty: List a -> Bool
-- Determine if a list is empty.
List.isEmpty examples -- False

List.length: List a -> Int
List.length examples -- 5

List.reverse: List a -> List a
-- Reverse a list.
List.reverse examples -- [3, 4, 5, 1, 2]

List.sort: List a -> List a
-- sort a list
List.sort examples -> [1, 2, 3, 4, 5]

List.member: a -> List a -> Bool
-- Figure out whether a list contains a value.
member 9 [1,2,3,4] == False
member 4 [1,2,3,4] == True

List.map: (a -> b) -> List a -> List b
-- map func
double n = n * 2
number_list = [1, 2, 3, 4]
List.map double number_list -- [2, 4, 6, 8]
```

#### tuple

```elm
-- tuple有固定的长度，里面元素的类型可以不同
("elm", 42)

fst ("elm", 42) -- "elm"
snd ("elm", 42) -- 42

-- 空tuple叫作unit，经常作为占位符使用
()
```

#### Record

key = value组成的键值对

```elm
-- like tuples but the fields have names
{ x = 3, y = 7 }

{ x = 3, y = 7 }.x -- 3
.y { x = 3, y = 7 } -- 7

-- 更新 record. (It must have the fields already.)
{ person |
  name = "ecmadao" }

-- 批量更新
{ person |
  name = "ecmadao",
  age = 24}
```

与Object不同的是，Record不能使用自身不存在的键，且键值不能是undefined或者null

**Record赋值：**

```elm
type alias Model = 
  {a: Int, b: String}

model = Model 1 "1" 
-- {a = 1, b = "1"}
```

```elm
origin : { x : Float, y : Float, z : Float }
origin =
  { x = 0, y = 0, z = 0 }

type alias Point3D =
  { x : Float, y : Float, z : Float }

otherOrigin : Point3D
otherOrigin =
  Point3D 0 0 0

origin == otherOrigin -- True
```