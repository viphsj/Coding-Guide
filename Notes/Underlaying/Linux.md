<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux](#linux)
  - [Recommend](#recommend)
  - [文件和目录管理](#%E6%96%87%E4%BB%B6%E5%92%8C%E7%9B%AE%E5%BD%95%E7%AE%A1%E7%90%86)
    - [文件与目录](#%E6%96%87%E4%BB%B6%E4%B8%8E%E7%9B%AE%E5%BD%95)
    - [文档](#%E6%96%87%E6%A1%A3)
    - [属性和权限](#%E5%B1%9E%E6%80%A7%E5%92%8C%E6%9D%83%E9%99%90)
  - [用户和用户组](#%E7%94%A8%E6%88%B7%E5%92%8C%E7%94%A8%E6%88%B7%E7%BB%84)
    - [组](#%E7%BB%84)
    - [用户](#%E7%94%A8%E6%88%B7)
  - [磁盘管理](#%E7%A3%81%E7%9B%98%E7%AE%A1%E7%90%86)
  - [VIM](#vim)
  - [压缩](#%E5%8E%8B%E7%BC%A9)
    - [常见压缩文件后缀名](#%E5%B8%B8%E8%A7%81%E5%8E%8B%E7%BC%A9%E6%96%87%E4%BB%B6%E5%90%8E%E7%BC%80%E5%90%8D)
    - [压缩/打包命令](#%E5%8E%8B%E7%BC%A9%E6%89%93%E5%8C%85%E5%91%BD%E4%BB%A4)
  - [shell 基础](#shell-%E5%9F%BA%E7%A1%80)
  - [正则表达式](#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
  - [日期](#%E6%97%A5%E6%9C%9F)
  - [Others](#others)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linux

### Recommend

- [快乐的 Linux 命令行](http://billie66.github.io/TLCL/index.html)
- [linux基础命令介绍](https://segmentfault.com/a/1190000007258280)
- [Linux工具快速教程](http://linuxtools-rst.readthedocs.io/zh_CN/latest/index.html)
- [Linux 文本处理三利器](https://segmentfault.com/a/1190000007993999)

### 文件和目录管理

#### 文件与目录

- `cd`

```bash
$ cd path # 切换目录到 path
```

- `mkdir [-p] dirpath`

```bash
# -p: 递归的创建联级目录结构

$ mkdir dirname # 创建单个文件夹
$ mkdir -p dirpath # 创建联级目录结构
```

- `rmdir`

```bash
$ rmdir dir1 dirpath.. # 删除多个文件夹，但文件夹内必须为空
```

- `rm [-r/-f] target`

```bash
# -r: 递归的删除目录下的文件
# -f: 强制删除

$ rm -r dirpath # 相当于 rmdir，删除一个联级目录结构
$ rm -f dir # 无论是否为空，强制删除
$ rm -rf
```

- `cp [-r/-i] source target`

```bash
# -r: 递归的复制目录下的文件
# -i: 如果目标已经存在，会询问是否覆盖

$ cp -r dir1 dir2 # 复制一个目录
$ cp -i source target
```

- `mv [-i/-f] source target`

```bash
# -i: 如果目标已经存在，会询问是否覆盖
# -f: 强制移动，覆盖重复

# 如果 target 是目录：
# 1. target 存在，则会把 source 放在 target 内
# 2. target 不存在，则相当于把 source 重命名
# 如果 target 是文件：
# 1. target 存在，则覆盖
# 2. target 不存在，则相当于重命名 source
```

#### 文档

- `cat [-n] filename`

```bash
$ cat filename # 输出文件的内推
$ cat -n filename # 输出文件的内容＋行号
```

- `more filaname`
- `less filename`

```bash
$ more filename # 带分页的输出文件内容
$ less filename # 带分页的输出文件内容
```

- `head [-n/-f] filename`
- `tail [-n/-f] filename`

```bash
# -n: n 代表数字，表示输出 n 行文件
# -f: 随文件内容改变动态的输出

$ head filename # 显示文件前 10 行
$ head -100 filename # 显示文件前 100 行

$ tail filename # 显示文件后 10 行
$ tail -100 filename # 显示文件后 100 行
$ tail -f filename # 动态的显示文件的最后 10 行
```

#### 属性和权限

- `ll`
- `ls -l`

```bash
$ ll
# -rw-r--r--    1 ecmadao  staff   8456 10  2 21:33 README.md
# drwxr-xr-x  100 ecmadao  staff   3200 10  2 21:32 leetcode

# 第一列一共 11 位（或 10 位）字符：
# 第一个字符代表文件类型：
  # d 表示为目录
  # - 表示为普通文件
  # l 表示为链接文件
  # b 表示为块设备
  # c 表示为串行端口设备文件
  # s 表示为套接字文件
# 第一列之后的 9 为元素，每 3 个为一组，其中，
  # r 代表可读
  # w 代表可写
  # x 代表可执行
  # 前 3 位为所属主的权限，中间 3 位代表所属组的权限，后 3 位代表其他非本群组用户的权限

# 第二列：链接占用的节点（inode）。如果文件是目录，则代表该目录下子目录数
# 第三列：文件所属主
# 第四列：文件所属组
# 第五列：文件大小
# 第六、七、八列：文件最后一次被修改的时间，依次为月，日，时间
# 第九列：文件名
```

- `chown [-R] user file`

```bash
# 把文件或目录归属到 user 下
# -R 会递归的作用于文件夹下的所有文件
$ chown ecmadao README.md
$ chown -R ecmadao ./foler
```

- `chmod [-R] xyz filename`

```bash
# r 代表 4
# w 代表 2
# x 代表 1
# - 代表 0
# 则 rwx 为 7
# -R 会递归的作用于文件夹下的所有文件
$ chmod 750 test.md # 把 test.md 文件权限设置为 rwxr-x---
```

- `chattr [+-=][A/s/a/c/i] filename`

```bash
# +-= 分别代表增加，去除，设定
# A: 增加该属性后，文件或目录的 atime 不可被修改
# s: 增加该属性后，会将数据同步写入磁盘中
# a: 增加该属性后，表示只能追加不能删除
# c: 增加该属性后，表示自动压缩该文件，读取时会自动解压
# i: 增加该属性后，表示文件不能被删除、重命名、设定链接、写入、新增数据
```

- `find [path] [option]`
- `find [path] [option] -exec cmd`

```bash
# -atime +n/-n: 表示访问或执行时间大于或小于 n 天的文件。atime -> access time, 在读取文件或执行文件时被修改
# -ctime +n/-n: 表示写入、更改 inode 属性（如更改所有者、权限或者链接）时间大于或小于 n 天的文件。ctime -> create time, 在写入文件、更改所有者、权限或链接设置时随 inode 内容的更改而更改的
# -mtime +n/-n: 表示写入时间大于或小于 n 天的文件。mtime -> modified time, 在写入文件时随文件内容的更改而更改
$ find /tmp/ -mtime -1 # 查找 tmp 文件夹内修改时间小于 1 天的文件

# -name filename: 直接根据文件名搜索
$ find /tmp/ -name test.md

# -type filetype: 根据文件类型搜索，可使用的类型包括 f, b, c, d, l, s 等
$ find /tmp/ -type d # 搜索 tmp 文件夹下的文件夹

# -exec 和下面的 xargs 有类似的效果，也是以前面的命令执行结果作为参数来执行下面的命令
$ find . -mtime +10 -exec rm -rf {} \; # 找到当前目录创建时间大于 10 天的文件并删除，其中 {} 代表变量
```

- `crontab [-u/user] file`
- `crontab [-u/user] {-l/-r/-e}`
- [Linux 下执行定时任务 crontab 命令详解](https://segmentfault.com/a/1190000002628040)
- [crontab 定时任务](http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)

```bash
$ crontab file filepath # 用指定的文件替代目前的 crontab
$ crontab -l # 查看当前用户的定时任务
$ crontab -e # 编辑当前用户的定时任务
$ crontab -d # 删除当前用户的定时任务
$ sudo crontab -u ecmadao -l # 使用 -u 查看指定用户的定时任务，执行时必须有 root 权限
```

crontan 各时间段意义：

```bash
# * * * * * cmd
# 分 时 日期 月 星期 命名

# 分：0-59, * 表示每分钟都要执行
# 时：0-59, * 表示每小时都要执行
# 日期：1-31, * 表示每天都要执行
# 月：1-12, * 表示每月都要执行
# 星期：0-7, 0 或 7 代表星期日

# 当设定为 a-b 时，表示 a-b 的时间段内都要执行
# 当设定为 */n 时，表示每隔 n 个时间段后要执行
# 当设定为 a,b,c 时，表示第 a,b,c 个时间段要执行
```

### 用户和用户组

#### 组

- `groupadd [-g GID] groupname`

```bash
# 新增用户组
# 如果不加 -g 选项，则按照系统默认的 gid 创建组
$ groupadd groupTest1
$ groupadd -g 511 groupTest2
```

- `groupdel`

```bash
# 删除组，当组内有用户时无法删除
$ groupdel groupTest1
```

#### 用户

- `useradd [-u UID] [-g GID] [-d HOME] [-M] [-s] username`

```bash
# -u 自定义 UID
# -g 表示令用户属于某个已存在的组，-g 后可使用 GID 或组名
# -d 自定义用户的家目录
# -M 表示不建立家目录
# -s 表示自定义 shell
$ useradd -g 0 ecmadao # 添加 ecmadao 用户，并放到 root 组内
# 如果 -g 后使用了不存在的 gid 则会报错
```

- `userdel [-r] username`

```bash
# -r: 删除用户时同时删除该用户的家目录
$ userdel ecmadao
$ userdel -r ecmadao
```

- `passwd [username]`

```bash
# 更改用户的密码
$ passwd # 修改自身密码
$ passwd user1 # 更改 user1 用户密码（当前必须以 root 用户登录）
# 只有 root 用户有权限更改其他用户的密码
```

- `su [-] username`

```bash
# 切换当前登录用户
# 加上 - 则会重置环境变量
```

### 磁盘管理

- `df [-i/-h/-k/-m]`

```bash
# df 可查看已挂载磁盘的总容量、使用容量、剩余容量等。默认以 KB 为单位
$ df
$ df -i # 查看 inode 的使用情况
$ df -h # 以合适的单位来显示
$ df -k # 以 K 为单位
$ df -m # 以 M 为单位
```

- `du [option] file/folder`

```bash
# 查看某个目录或文件所占空间的大小
# option:
# -a: 表示全部文件和目录的大小都列出来。不带 -a 参数则只列出文件夹的大小
# -b: 以 bytes 为单位输出
# -k: 以 KB 为单位输出
# -m: 以 MB 为单位输出
# -h: 自动调节到合适的单位
# -c: 在最后显示总和
# -s: 只列出总和

$ du -sh folder # 列出某文件夹占空间的总大小，并根据大小自动选择合适的单位

$ du --max-depth=1 -h ./ # 查看指定目录下第一层级内各文件夹占用磁盘大小
```

### VIM

```bash
$ vim filename # 进入一般模式
# 在一般模式中，有如下快捷操作可以编辑文档:

# x: 向后删除一个字符
# X: 向前删除一个字符
# nx: 向后删除 n 个字符

# dd: 删除/剪切光标所在的行（执行后该行已被复制）
# ndd: 删除/剪切光标所在行之后的 n 行（包括当前行）

# yy: 复制当前行
# nyy: 从光标所在行开始，复制下面的 n 行（包括当前行）

# p: 从光标所在行开始，向下粘贴
# P: 从光标所在行开始，向上粘贴

# u: 还原上一步操作
# v: 按 v 后移动光标会选中指定字符，然后可以实现复制、粘贴等操作

########################################################
# 在一般模式下，输入 : 可进入命令模式
# :w 保存文本
# :w! 强制保存
# :q 退出 vim
# :q! 强制退出
# :wq 保存并退出
# :set nu 显示行号
# :set nonu 不显示行号
```

### 压缩

#### 常见压缩文件后缀名

- `.gz` 由 gzip 压缩工具压缩的文件
- `.bz2` 由 bzip2 压缩工具压缩的文件
- `.zip` 由 zip 压缩工具压缩的文件
- `.tar` 由 tar 打包工具打包出的文件（tar 没有压缩功能，只是把目录合并为一个文件）
- `.tar.gz` 先由 tar 打包，再用 gzip 压缩出的文件
- `.tar.bz2` 先由 tar 打包，再用 bzip2 压缩出的文件

#### 压缩/打包命令

- `gzip [-d/-#] filename`

gzip 不能压缩目录

```bash
# -d 在解压缩时使用
# # 为 1~9 的数字，代表压缩等级，1 为最差，9 为最好，默认为 6
# 原文件压缩之后不保留
$ ls
# test.md
$ gzip test.md
$ ls
$ test.md.gz
# 注意，gzip 不能压缩目录
```

- `bzip2 [-d/-z] filename`

```bash
# -d 代表解压缩
# -z 代表压缩
# 不带参数则默认为压缩
# 和 gzip 一样，不保留原文件，且不能压缩目录
```

- `zip [-r] resultname filename/folder`
- `unzip zipname`

```bash
# zip 可以压缩目录
$ zip -r result.zip folder # 把 folder 压缩为 result.zip，且 folder 内的其他子目录都会被压缩
$ unzip result.zip
```

- `tar [-zjxcvfpP] resultname tar`

```bash
# options:
# -z: 打包同时使用 gzip 压缩
# -j: 打包同时使用 bzip2 压缩
# -x: 解包或解压缩
# -t: 查看 tar 包里的文件
# -c: 创建一个 tar 包或者压缩文件包
# -v: 可视化
# -f: 后面需跟文件名，即 -f filename，表示压缩/解压后的文件名为 filename。在多参数组合的情况下，f 需要被写在最后
# -p: 使用原文件的属性
# -P: 表示可以使用绝对路径
# --exclude filename: 在打包或压缩时，不要包含该文件

########################################################

# 利用 tar，可以打包文件和目录，且原文件/目录保留。如果遇到重名则会覆盖
$ tar -cvf result.tar folder # 打包文件夹
$ tar -czvf result.tar.gz folder # 打包同时利用 gzip 压缩
$ tar -cjvf result.tar.bz2 folder # 打包同时利用 bzip2 压缩

$ tar -zxvf result target.tar.gz # 解压 gz 文件
$ tar -jxzf result target.tar.bz2 # 解压 bz2 文件

$ tar -tf target.tar.gz # 查看压缩文件/包内的内容

$ tar -cvf result.tar --exclude test2.md testfolder # 打包同时排除某些文件和文件夹
```

### shell 基础

- `alias`
- `alias '[别名]=[具体的命令]'`
- `unalias 别名`

```bash
$ alias # 查看别名
$ alias 'currentPath=pwd' # 设置别名
$ unalias currentPath # 删除别名
```

- 输入/输出重定向

```bash
# < 输入重定向
# > 输出重定向
# >> 追加重定向命令
# 2> 错误重定向
# 2>> 追加错误重定向

$ echo '1' > test.md # 把 1 输入到 test.md
$ cat test.md # 1
$ echo '2' > test.md # 把 2 输入到 test.md
$ cat test.md # 2，可以看见原内容被覆盖
$ echo '3' >> test.md # 把 3 追加到 test.md
$ cat test.md
# 2
# 3
```

- `env` 显示全部预设的系统变量
- `set` 显示系统变量和用户自定义的变量
- `unset variable` 删除某个变量

```bash
# 自定义变量
# 变量格式为 a=b，a 为变量名，b 为变量值，等号两边不能有空格
# 变量名只能由字母、数字、下划线组成，且不能以数字开头
# 当变量内容带有特殊字符（如空格）时，需要加上单引号：username='ecmadao 233'
# 如果变量值本身就有单引号，则需要使用双引号：a="user's name"
# 变量值中如果需要用到其他命令运行结果，则使用反引号：currentPath=`pwd`
# 变量值可以累积其他变量的内容，需要使用双引号：
# a=`pwd`
# b="current path is $a"
```

- `wc [-l/-w/-m] file`

```bash
# 统计文档的行数、词数、字符数
# -l: 只输出行数
# -w: 只输出词数
# -m: 只输出字符数
$ wc test.md # 输出 行数 词数 字符数
```

- `tee file`

```bash
# 类似于重定向 >，但在输出之后会把内容输出在屏幕上
# 注意只能覆盖，不能追加
```

- 管道符 `|`

```bash
# 将前一个指令的输出作为后一个的输入
$ echo '1' | tee test.md # 利用 echo 输出 1，然后使用 tee 写入到 test.md 中
```

- `xargs cmd`
- `xargs -n1 -I[variable] cmd [variable]`


```bash
# 把前面命令的输出作为 xargs 后面命令的输入
$ ls README.md | xargs cat
# ls README.md 输出 README.md，作为参数传递给 cat

# 如果输出为多个值时，可以使用 xargs 的循环命令
# -n1 表示对前面输出的各个值分别进行处理，类似循环
# -Ivariable 表示每次循环使用的变量为 variable，该变量作为后面命令的输入
$ ls folder/ | xargs -n1 -Iv mv v tmp_v
```

- `$`
- `;`
- `&`
- `&&`
- `||`

```bash
# $ 作为变量前的标识符，而 !$ 则表示上条命令中的最后一个变量
$ echo '123'
$ ech !$ # -> echo '123'

# 利用 ; 在一行中运行两个及以上的命令，命令之间不会相互影响，即无论前面的命令是否成功，后面的命令都会运行
$ mkdir test; echo '123'

# && 前一个执行成功才会执行后一个，类似于 且 操作符
# || 前一个执行失败才会执行后一个，类似于 或 操作符
```

### 正则表达式

- `grep [-cinvABC] 'word' filename`

```bash
# -c: 打印符合要求的行数
# -i: 忽略大小写
# -n: 输出符合要求的行和行号
# -v: 打印不符合要求的行
# -A: 后 ＋数字，例如 -A2，表示打印符合要求的行和后面两行
# -B: 后 ＋数字，例如 -B2，表示打印符合要求的行和上面两行
# -C: 后 ＋数字，例如 -C2，表示打印符合要求的行和上下各两行

$ grep -n '[0-9]' filename # 附带行号的输出带有数字的行
$ grep -nv '[0-9]' filename # 附带行号的输出不带数字的行
$ grep -n '^$' filename # 输出所有空行
$ grep -n 'l\{2\}' README.md # 输出 l 连续出现两次的行
```

- `egrep`

```bash
# egrep 和 grep 不同的是，它能够使用扩展表达式
# 如
# + 匹配一个或者多个先前的字符, 至少一个先前字符.
# ? 匹配 0 个或者多个先前字符.
# a|b|c 匹配 a 或 b 或 c

$ egrep 'a?' filename
```

- `sed -n 'n'p filename`

```bash
# sed 可以同时实现搜索和编辑的功能

# n 为数字，表示第几行
$ sed -n '2'p filename # 打印第二行
$ sed -n '1,$'p filename # 打印所有行
$ sed -n '1,3'p filename # 打印 1~3 行

# n 为表达式，表示符合要求的行
$ sed -n '/al/'p README.md
# 要注意的是，它无法使用 egrep 支持的扩展表达式，即例如 sed -n 'a+'p README.md 这样会报错
```

- `sed 'n'd filename`

```bash
# 删除某行或符合条件的行
$ sed '1'd filename # 删除第一行
$ sed '1,3'd filename # 删除 1~3 行
$ sed '/al/'d filename # 删除有 al 的行
```

- `sed [-i] 'ns/target/replace/[g]' filename`

```bash
# 替换字符或字符串之后输出
# -i: 直接修改原文件，不加则不会修改，值在输出内容中进行替换

# n: 代表某行或行的范围，不加则代表全部行
# s: 替换的标识符
# /: 操作分隔符，也可以使用 @ 或者 #
# target 被替换对象
# replace 替换对象
# g: 是否全部替换匹配的对象。如果不加，则只替换每行的第一个匹配

$ sed 's@a@bbbbbbbbbbbbbbbbbbbbbbbbbb@' README.md # 把每行第一个匹配的 a 替换为 bbbbbbbbbbbbbbbbbbbbbbbbbb
$ sed '1,3s@about@abort@g' README.md # 把 1~3 行全部匹配的 about 替换为 abort
```

### 日期

```bash
$ date # 读取当前时间和日期
$ date +%s # 将时间转换为时间戳，以秒为单位
$ date --date "2017-04-01" # 将字符串类型日期输入，转换为时间
$ date --date "2017-04-01" +%s # 将字符串类型日期输入，并转换格式
```

```bash
# 时间格式 format
# === 星期 ===
%a # Sun
%A # Sunday

# === 月 ===
%b # Nov
%B # November

# === 日 ===
%d # 31

# === 固定格式 ===
%D # mm/dd/yy

# === 年 ===
%y # 18
%Y # 2018

# === 小时 ===
%I # 09
%H # 09

# === 分钟 ===
%M # 33

# === 秒 ===
%S # 10

# === 时间戳（秒）===
%s
```

### Others

- cURL

[Linux命令行：cURL的十种常见用法](https://juejin.im/post/5915204b44d904006c463c61)

- 查看机器内网和外网 IP

```bash
$ hostname -I
# 内网 IP 外网 IP
```

- 查看内存占用

```bash
$ ps -e -o 'pid,comm,args,pcpu,rsz,vsz,stime,user,uid'
```

- 查看 CPU 核数

```bash
$ cat /proc/cpuinfo |grep "cores"|uniq
```

- 通过 bash 发送邮件

- [5 Ways to Send Email From Linux Command Line](https://tecadmin.net/ways-to-send-email-from-linux-command-line/)
- [3 minute tip: Configure a Linux server to send email](https://rianjs.net/2013/08/send-email-from-linux-server-using-gmail-and-ubuntu-two-factor-authentication)
- [“Mail” command hangs and maillogs shows error [closed]](https://serverfault.com/questions/548771/mail-command-hangs-and-maillogs-shows-error)

- CPU/进程/线程/并发/并行

- [CPU 核心数目与多线程](https://blog.csdn.net/qq_33530388/article/details/62448212)
- [线程、进程与处理器](http://jsonliangyoujun.iteye.com/blog/2358274)
- [多核 CPU 是否能同时执行多个进程？](https://www.zhihu.com/question/271821176)
- [操作系统中的进程与线程](http://www.cnblogs.com/CareySon/archive/2012/05/04/ProcessAndThread.html)

- 修改 TCP

- [Linux TCP/IP 协议栈调优](https://colobu.com/2014/09/18/linux-tcpip-tuning/)
- [Linux 下 Http 高并发参数优化之 TCP 参数](https://kiswo.com/article/1017)
- [Linux 之 TCPIP 内核参数优化](https://www.cnblogs.com/fczjuever/archive/2013/04/17/3026694.html)
- [sysctl 命令](http://man.linuxde.net/sysctl)

```bash
# 通过以下命令查看各个状态的TCP连接的数据
$ netstat -n | awk '/^tcp/ {++y[$NF]} END {for(w in y) print w, y[w]}'

# 修改文件，增加配置项
$ sudo vim /etc/sysctl.conf
# net.ipv4.tcp_syncookies = 1 表示开启 SYN Cookies。当出现 SYN 等待队列溢出时，启用 cookies 来处理，可防范少量 SYN 攻击，默认为 0，表示关闭
# net.ipv4.tcp_tw_reuse = 1 表示开启重用。允许将 TIME-WAIT sockets 重新用于新的 TCP 连接，默认为 0，表示关闭
# net.ipv4.tcp_tw_recycle = 1 表示开启 TCP 连接中 TIME-WAIT sockets 的快速回收，默认为 0，表示关闭
# net.ipv4.tcp_fin_timeout = 30 修改系統默认的 TIMEOUT 时间

# 生效修改的参娄
$ sudo /sbin/sysctl -p
```

- 安装中文字体 https://wiki.ubuntu.com.cn/%E5%AD%97%E4%BD%93
