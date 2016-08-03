<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Elm基础语法](#elm%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95)
  - [基本](#%E5%9F%BA%E6%9C%AC)
    - [Type](#type)
      - [Type aliases](#type-aliases)
      - [Union types](#union-types)
      - [unit type](#unit-type)
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

#### Type

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
```

##### Type aliases

```elm
-- 类型设置别名
type alias Id = Int
type alias UserName = String

-- 对于Records
type alias User = {
  id: Int,
  name: String
}

-- 可以通过先对类型设置别名的方式，进行比较简单的声明
a: {b: String, c: Int} -- a是一个类型较复杂的对象
d: List {b: String, c: Int} -- d是a组成的List

type alias A = {b: String, c: Int} -- 声明A的类型
a: A
d: List A
```

##### Union types

对于一个不确定类型的变量，其类型可以用`|`间隔，每个类型叫作一个Tag

```elm
type Answer = Yes | No
type Visibility = All | Active | Completed

-- usage
update visibility =
	case visibility of
		All ->
			-- do something
		Active ->
			-- do something
		Completed ->
			-- do something
```

**Union type**里的Tag还可以是一个方法，后面要跟着它能接受的参数类型，且这个方法的返回值要跟目标type一样

```elm
type User = Anonymous | Named String

Anonymous : User
Named: String -> User

-- example
userPhoto : User -> String
userPhoto user =
  case user of
    Anonymous ->
      "anon.png"
    Named name ->
      "users/" ++ name ++ ".png"
```

##### unit type

在Elm里，空tuple`()`叫作`unit type`，经常被当做占位符使用。

```elm
-- 举个栗子
-- 定义一个Message，这个别名接受一个参数并返回一个Record
type alias Message a =
    { code : String
    , body : a
    }

-- 定义一个func，接受Message作为参数，同时函数内部Message必须接受一个String
readMessage : Message String -> String
readMessage message =
    ...

-- 但是如果Message在readMessage方法内不需要接受参数，则使用空tuple作为参数
readMessage : Message () -> String
readMessage message =
    ...
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

**类型的定义**

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

```elm
-- 在表示函数的参数和返回值的类型时，使用箭头链接
fun: Int -> Int -> Int
-- 代表
fun a b =
	-- 只返回一个Int类型
	a + b

fun: Int -> Int -> Int -> Int
-- 代表
fun a b c=
	-- 只返回一个Int类型
	a + b + c
```

**why ?**

```elm
-- why 
Int -> Int -> Int
-- not
(Int, Int) -> Int
```

你可能会问，为什么参数类型表示的是使用连续的箭头链接？这给人的直观感觉是，函数接受第一个参数后，返回一个函数，接受第二个参数，然后不断返回接受一个参数的函数直至最后返回一个结果。其实差不多就是这样。Elm是一门FP语言，而这样的函数就展现了柯里化（curry）的思想。

**curry**

```javascript
const add = (x) => {
  return (y) => {
    return x + y;
  };
};

const increment = add(1);
increment(1); // 2
```

```elm
-- elm里的curry很自由
add: Int -> Int -> Int
add x y =
	x + y

add2 = add 2
add2 3 -- 5
```

**其他参数类型**

```elm
-- 接收/返回多个变量
switch: (a, b) -> (b, a)
switch (x, y) =
	(y, x)

-- 函数作为参数
convertIntToString: Int -> String
	toString Int

map: (Int -> String) -> List Int -> List String
map convertIntToString [1, 2, 3] -- ["1", "2", "3"]

-- 但有时候我们可以不用特指参数类型
map: (a -> b) -> List a -> List b

-- 这样只要第一个函数的参数/返回值和List a/b的类型相同就行了
-- 因此下面这些函数都是可行的
convertStringToInt : String -> Int
convertIntToString : Int -> String
convertBoolToInt : Bool -> Int

-- example
map convertStringToInt ["Hello", "1"]
map convertIntToString [1, 2]
map convertBoolToInt [True, False]
```

#### let..in..

let 表达式的结果会被用在in表达式内

> `let` defines local variables for `in`

```elm
volume {width, height, depth} =
  let
    area = width * height
  in
    area * depth
volume { width = 3, height = 2, depth = 7 } -- 42
```

#### List

[elm-lang - core - List](http://package.elm-lang.org/packages/elm-lang/core/3.0.0/List)

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