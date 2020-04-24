<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Shell](#shell)
  - [变量](#%E5%8F%98%E9%87%8F)
  - [操作](#%E6%93%8D%E4%BD%9C)
    - [操作符](#%E6%93%8D%E4%BD%9C%E7%AC%A6)
    - [字符串](#%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [循环/遍历](#%E5%BE%AA%E7%8E%AF%E9%81%8D%E5%8E%86)
    - [test](#test)
  - [运算](#%E8%BF%90%E7%AE%97)
  - [数组](#%E6%95%B0%E7%BB%84)
    - [定义](#%E5%AE%9A%E4%B9%89)
    - [赋/取值](#%E8%B5%8B%E5%8F%96%E5%80%BC)
  - [函数](#%E5%87%BD%E6%95%B0)
  - [Others](#others)
    - [Check if file exists](#check-if-file-exists)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Shell

### 变量

- 环境变量：可作用于所有子进程
- 本地变量：在用户现在的 shell 生命期的脚本中使用，仅存在于当前进程
- 位置变量：作为 shell 脚本程序或者函数的参数
- 特定变量：一些具有特殊意义的变量

```bash
#!/bin/bash
# 环境变量
MYVAR="test"
expirt MYVAR # 暴露环境变量

# 位置变量
$N # N>=1，第 n 个参数
# 当 n>=10 时，需要使用 ${n} 来获取参数

# 特殊变量
$# # 传递到脚本的参数个数
$* # 以一个单字符串显示所有向脚本传递的参数
$$ # shell 脚本运行当前进程ID
$? # 退出状态，0 表示没有错误，其他任何值表明有错误
```

### 操作

#### 操作符

```bash
#!/bin/bash
# echo XXX 输出
# export XXX 将某变量作为环境变量输出
# readonly XXX 将某变量设置为只读
# unset XXX 删除一个变量
```

#### 字符串

```bash
#!/bin/bash
# ${#XXX} 可以获取字符串变量的长度
NAME='ecmadao'
echo ${#NAME} # 7


# 单引号：单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
# 双引号：双引号里可以有变量或转义字符
NAME='ecmadao'
echo 'My name is $NAME' # My name is $NAME
echo "My name is $NAME" # My name is ecmadao


# 字符串切片
# ${变量名:起始:长度} 得到子字符串
# 位置从 0 开始，不指定长度时默认切到结尾
NAME='ecmadao'
echo ${NAME:2} # madao
echo ${NAME:2:1} # m


# 字符串替换
# ${变量/查找/替换值} 一个“/”表示替换第一个，”//”表示替换所有,当查找中出现了：”/”请加转义符”\/”表示
NAME='ecmadao'
echo ${NAME/"a"/"o"} # 把匹配的第一个 a 替换为 o，输出 ecmodao
echo ${NAME//"a"/"o"} # 把匹配的所有 a 替换为 o，输出 ecmodoo
```

#### 循环/遍历

```bash
#!/bin/bash

# if
if condition
then
	command1
fi
# if/else
if condition
then
	command1
else
	command2
fi
# if/elif/else
if condition
then
	command1
elif condition2
	command2
else
	command3
fi

# example
a=10
b=20
if [ $a == $b ]
then
	echo "a 等于 b"
else
	echo "a 不等于 b"
fi
```

```bash
#!/bin/bash
# while 用于不断执行一系列命令，也用于从输入文件中读取数据

int=1
while(( $int<=5 ))
do
	echo $int
	let "int++"
done
```

#### test

### 运算

```bash
#!/bin/sh
# ===== expr 运算符进行基本运算 =====
a=10
b=20

val=`expr $a + $b` # 加法
echo "$val" # 30

val=`expr $a - $b` # 减法
echo "$val" # -10

val=`expr $a \* $b` # 乘法。乘号(*)前边必须加反斜杠(\)才能实现乘法运算
echo "$val" # 200

val=`expr $a / $b` # 除法
echo "$val" # 0

val=`expr $a % $b` # 求余
echo "$val" # 10

# ===== 注 =====
# 在 Mac 的 shell 中 expr 可以被 $(()) 代替
echo $(($a + $b)) # 30
# 在 $(()) 中乘法的 * 不需要转义
echo $(($a * $b)) # 200
```

```bash
#!/bin/sh
# ===== 条件表达式 =====

a=10
b=20
c=10
# 条件表达式要放在方括号之间，并且要有空格
if [ $a != $b ]
then
	echo "a != b"
elif [ $a == $c ]
then
	echo "a == c"
fi
```

```bash
#!/bin/sh
# ===== 逻辑运算符 =====
# && --> and
# || --> or
a=10
b=20
c=1

if [[ $b > $a && $b > $c ]]
then
	echo "b is the biggest."
fi

if [[ $a > $b || $a > $c ]]
then
	echo "a is not the smallest."
fi
```

### 数组

跟其他语言中的数组一样，`shell` 的数组也是以数字索引，且以 0 作为开头。

#### 定义

```bash
#!/bin/sh
# 初始化数组
array=(value0 value1 ...)

# 例
PARAMS=($*) # 获取脚本收到的所有参数，并转为数组

# 或者可以直接给一个变量逐个进行赋值
# 可以不使用连续的下标，而且下标的范围没有限制
array[0]=value0
array[1]=value1
array[3]=value3
```

#### 赋/取值

```bash
#!/bin/bash
# 从数组中取值
value=${array[index]}

# 可是使用 @ 或者 * 获取数组中的全部元素
ARRAY=(1 2 3)
echo ${ARRAY[@]} # 1 2 3
echo ${ARRAY[*]} # 1 2 3

# 获取数组的长度
echo ${#ARRAY[@]} # 3
echo ${#ARRAY[*]} # 3
# 获取数组中某个元素的长度
echo ${#ARRAY[index]}

# 遍历数组
for data in ${ARRAY[*]}
do
	echo ${data}
done
```

### 函数

### Others

#### Check if file exists

```bash
if [ ! -f /tmp/foo.txt ]; then
  echo "File not found!"
fi
```