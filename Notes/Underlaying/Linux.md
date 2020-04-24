<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux 命令行](#linux-%E5%91%BD%E4%BB%A4%E8%A1%8C)
  - [Recommend](#recommend)
  - [文件和目录管理](#%E6%96%87%E4%BB%B6%E5%92%8C%E7%9B%AE%E5%BD%95%E7%AE%A1%E7%90%86)
    - [文件/目录](#%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95)
    - [路径](#%E8%B7%AF%E5%BE%84)
    - [属性和权限](#%E5%B1%9E%E6%80%A7%E5%92%8C%E6%9D%83%E9%99%90)
    - [搜索](#%E6%90%9C%E7%B4%A2)
    - [排序](#%E6%8E%92%E5%BA%8F)
    - [临时文件/文件夹](#%E4%B8%B4%E6%97%B6%E6%96%87%E4%BB%B6%E6%96%87%E4%BB%B6%E5%A4%B9)
    - [名称提取](#%E5%90%8D%E7%A7%B0%E6%8F%90%E5%8F%96)
  - [系统](#%E7%B3%BB%E7%BB%9F)
    - [定时任务](#%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1)
    - [用户和用户组](#%E7%94%A8%E6%88%B7%E5%92%8C%E7%94%A8%E6%88%B7%E7%BB%84)
    - [磁盘管理](#%E7%A3%81%E7%9B%98%E7%AE%A1%E7%90%86)
    - [软链接](#%E8%BD%AF%E9%93%BE%E6%8E%A5)
    - [系统信息](#%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF)
    - [日志记录](#%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95)
    - [信号](#%E4%BF%A1%E5%8F%B7)
  - [VIM](#vim)
  - [压缩/备份](#%E5%8E%8B%E7%BC%A9%E5%A4%87%E4%BB%BD)
    - [常见压缩文件后缀名](#%E5%B8%B8%E8%A7%81%E5%8E%8B%E7%BC%A9%E6%96%87%E4%BB%B6%E5%90%8E%E7%BC%80%E5%90%8D)
    - [压缩/打包命令](#%E5%8E%8B%E7%BC%A9%E6%89%93%E5%8C%85%E5%91%BD%E4%BB%A4)
    - [备份](#%E5%A4%87%E4%BB%BD)
  - [shell 基础](#shell-%E5%9F%BA%E7%A1%80)
    - [基础](#%E5%9F%BA%E7%A1%80)
    - [输出、重定向和管道符](#%E8%BE%93%E5%87%BA%E9%87%8D%E5%AE%9A%E5%90%91%E5%92%8C%E7%AE%A1%E9%81%93%E7%AC%A6)
    - [函数和流程控制](#%E5%87%BD%E6%95%B0%E5%92%8C%E6%B5%81%E7%A8%8B%E6%8E%A7%E5%88%B6)
    - [比较与测试](#%E6%AF%94%E8%BE%83%E4%B8%8E%E6%B5%8B%E8%AF%95)
  - [正则表达式](#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
  - [网络](#%E7%BD%91%E7%BB%9C)
    - [下载](#%E4%B8%8B%E8%BD%BD)
    - [网络](#%E7%BD%91%E7%BB%9C-1)
  - [日期](#%E6%97%A5%E6%9C%9F)
  - [Others](#others)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linux 命令行

### Recommend

- [快乐的 Linux 命令行](http://billie66.github.io/TLCL/index.html)
- [linux基础命令介绍](https://segmentfault.com/a/1190000007258280)
- [Linux工具快速教程](http://linuxtools-rst.readthedocs.io/zh_CN/latest/index.html)
- [Linux 文本处理三利器](https://segmentfault.com/a/1190000007993999)
- [linux-command](https://github.com/jaywcjlove/linux-command)

### 文件和目录管理

#### 文件/目录

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
:<<COMMENT
-i: 如果目标已经存在，会询问是否覆盖
-f: 强制移动，覆盖重复

如果 target 是目录：
1. target 存在，则会把 source 放在 target 内
2. target 不存在，则相当于把 source 重命名

如果 target 是文件：
1. target 存在，则覆盖
2. target 不存在，则相当于重命名 source
COMMENT
```

- `dd if=xx of=xx bs=xx count=xx` 创建特定大小的文件

```bash
:<<COMMENT
if 表示 input file，可以是 stdin、设备文件、普通文件。不指定 if 则从 stdin 中读入
of 表示 output file，可以是 stdout、设备文件、普通文件。不指定 of 则作为 stdour 输出
bs 表示 block size，指定了以字节为单位的块大小，可以使用 C(1字节)，B(512字节)，K(1024字节)，M，G
count 表示需要被复制的块数
COMMENT

# /dev/zero 是特殊的字符设备，会返回 0 值字节（\0）
$ dd if=/dev/zero of=temp.data bs=1M count=2 # 生成一个 temp.data 文件，大小为 2 * 1M = 2M
```

- `touch [-am] filename` 生成空白文件，或修改已有文件的时间戳
  - -a 修改文件访问时间
  - -m 修改文件修改时间

- `cat [-n] filename`

```bash
$ cat filename # 输出文件的内推
$ cat -n filename # 输出文件的内容＋行号

# 在多个输入的时候，会拼接后输出
$ cat file1 file2

# cat 还可以接收 stdin 输入
$ ls -l | cat -n

# -s 去除输出中多余的空行
# -n 输出行号
```

> **注：`cat`不能使用相同的文件作为输入和重定向后的输出，否则会清空文件。** 例如 cat file1 > file1 并没有写入，但清空了文件

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
$ head -n -M filename # 将打印除最后 M 行之外所有的行

$ tail filename # 显示文件后 10 行
$ tail -100 filename # 显示文件后 100 行
$ tail -f filename # 动态的显示文件的最后 10 行
$ tail -f -s seconds filename # 动态的显示文件，但有时间间隔
$ tail -n +(M+1) filename # 打印除了前 M 行之外所有的行
```

- `file [-b] filename` 打印文件类型信息，-b 则不再输出文件名

- `wc [-l/-w/-m] file`

```bash
# 统计文档的行数、词数、字符数
# -l: 只输出行数
# -w: 只输出词数
# -m: 只输出字符数
$ wc test.md # 输出 行数 词数 字符数
```

- `cut [-fd] filename` 按列切分文件内容

```bash
# -f 指定要取出显示的列
$ cut -f 2,3 filename # 显示 2、3 列
# -f N- 从第 N 列开始到列尾，N-M 第 N 到 M 列，-M 从第 1 列开始到第 M 列
$ cut -f -3 filename # 显示 1，2，3 列

# -d 指定分隔符
$ cut -f 1 -d ',' filename

# 也可以从 stdin 中读入
$ cat filename | cut -f 1
```

- `sed [-ie] 's/pattern/replace_string/' filename` 替换文本

```bash
# 直接读取文件，或者接收 stdin 输入
$ sed 's/text/replace/' filename
$ cat filename | sed 's/text/replace/'

# -i 会原地修改文件，-i.bak 则在修改文件的同时，生成 filename.bak 的原文件副本
$ sed -i 's/text/replace/' filename # 用修改后的数据替换原始文件
$ sed -i.bak 's/text/replace/' filename

# /g 全局匹配，/Ng 替换匹配到的第 N 个
$ sed 's/text/replace/g' filename # 全局替换
# sed 's/text/replace/Ng' filename # 替换第 N 次出现的匹配
$ sed 's/text/replace/2g' filename

# /d 则直接执行删除操作
$ sed '/^$/d' filename # 删除文件中的空行
$ sed -i '/^$/d' filename

# sed 命令会将 s 之后的字符视为命令分隔符，因此也可以不使用 / 分隔符。如果作为分隔符的字符串出现在模式中，在必须用 \ 转义
$ sed 's|text|replace|' filename
$ sed 'st\tex\ttreplacet' filename

# -e 可以组合多个匹配模式
$ sed -e 's/t/replace/' -e 's/a/replace/' filename

# 可以用 & 指代模式所匹配到的字符串
$ echo "this1is2an3example" | sed 's/[a-z]\+/[&]/g' # [this]1[is]2[an]3[example]
```

#### 路径

- `cd`

```bash
$ cd path # 切换目录到 path
$ cd - # 回到上一个目录
```

- `pwd` 显示当前用户所处的路径
- `pushd` 压入并切换路径
- `popd` 删除最近压入的路径并切换到下一个目录
- `dirs` 查看栈中的内容

```bash
$ pwd # /Users/ecmadao

$ pushd /var
$ dirs # var /Users/ecmadao

$ pushd /var/log
$ dirs # /var/log /var /Users/ecmadao

$ pushd /var
$ dirs # /var /var/log /Users/ecmadao

# 要切换到栈中某个路径时，从左到由自 0 开始索引，获取到路径编号 n，然后 pushd +n
$ pushd +1
$ pwd # /var/log
$ dirs # /var/log /Users/ecmadao /var

$ popd
$ dirs # /Users/ecmadao /var

# 要删除栈中某个指定路径时，popd +n，n 还是从左到右，自 0 开始计数
$ pushd /var/log
$ dirs # /var/log /Users/ecmadao /var
$ popd +0
$ pwd # Users/ecmadao
$ dirs # /Users/ecmadao /var
```

#### 属性和权限

- `ll`
- `ls -l`

```bash
$ ll
:<<COMMENT
-rw-r--r--    1 ecmadao  staff   8456 10  2 21:33 README.md
drwxr-xr-x  100 ecmadao  staff   3200 10  2 21:32 leetcode

第一列一共 11 位（或 10 位）字符：
第一个字符代表文件类型：
  d 表示为目录
  - 表示为普通文件
  l 表示为链接文件
  b 表示为块设备
  c 表示为串行端口设备文件
  s 表示为套接字文件
  p 表示为管道
第一列之后的 9 为元素，每 3 个为一组，其中，
  r 代表可读 read
  w 代表可写 write
  x 代表可执行 execute
  - 代表没有对应的权限
  前 3 位为所属主的权限，中间 3 位代表所属组的权限，后 3 位代表其他非本群组用户的权限
  用户权限（rwx------）中还有一位 setuid(S/s)，SUID 的特殊权限，位于执行权限（x）的位置，代表允许可执行文件以其拥有者的权限来执行，即便该文件是由其他用户运行的。如果原先没有 x 权限，则赋予特殊权限后显示为 S，否则为 s
  用户组权限（---rwx---）中还有一位 setgid(S/s)，SGID 的特殊权限，位于执行权限（x）的位置，代表允许可执行文件以其拥有组的权限来执行，即便该文件是由其他用户组运行的。如果原先没有 x 权限，则赋予特殊权限后显示为 S，否则为 s
  目录有一个叫作粘滞位（t/T）的特殊权限。如果设置了粘滞位，则只有创建该目录的用户才能删除目录中的文件，其他用户即便有写权限，也不能删除
    - 没有执行权限但设置了粘滞位：d------rwT
    - 有执行权限和粘滞位：d------rwt

第二列：链接占用的节点（inode）。如果文件是目录，则代表该目录下子目录数
第三列：文件所属主
第四列：文件所属组
第五列：文件大小
第六、七、八列：文件最后一次被修改的时间，依次为月，日，时间
第九列：文件名
COMMENT
```

- `chown [-R] user file`
- `chown [-R] user:group file`

```bash
# 把文件或目录归属到 user 下
# -R 会递归的作用于文件夹下的所有文件
$ chown ecmadao README.md
$ chown -R ecmadao ./foler
```

- `chmod [-R] xyz filename`
- `chmod [-R] u=xxx g=xxx o=xxx filename`
- `chmod [-R] [ugoa][+-][rwxt] filename`

```bash
# r 代表 4
# w 代表 2
# x 代表 1
# - 代表 0
# 则 rwx 为 7
# -R 会递归的作用于文件夹下的所有文件
$ chmod 750 test.md # 把 test.md 文件权限设置为 rwxr-x---

# u 代表用户权限，g 代表用户组权限，o 代表其他用户权限
$ chmod u=rwx g=rw o=r filename

# 增加/删除权限
$ chmod u+x filename # 为用户增加执行权限
$ chmod a+r filename # 为所有用户增加读权限
$ chmod o-w filename # 其他用户不可写
$ chmod a+t dir # 设置粘滞位，设置后仅目录所有者可删除其中的文件
```

- `chattr [+-=][A/s/a/c/i] filename` 为文件增加、删除隐藏权限
- `lsattr [-a] filename/dir` 列出文件或文件夹下文件的隐藏权限

```bash
:<<COMMENT
+-= 分别代表增加，去除，设定
A: 增加该属性后，文件或目录的 atime 不可被修改
s: 增加该属性后，会将数据同步写入磁盘中
a: 增加该属性后，表示只能追加，不能删除
c: 增加该属性后，表示自动压缩该文件，读取时会自动解压
i: 增加该属性后，表示文件不能被删除、重命名、设定链接、写入、新增数据
COMMENT

$ chattr +i file # 设置之后文件不可修改
$ chattr -i file # 恢复可修改
```

#### 搜索

- `find [path] [option]`
- `find [path] [option] -exec cmd`

```bash
# find 基本操作
# 1. -name 指定待查找文件名的模式，-iname 类似，但忽略大小写
$ find ./ -name '*.txt' # 匹配所有名字以 .txt 结尾的文件
$ find ./ -iname 'example.txt' # 会忽略 example 文件名的大小写去匹配

# 2. 支持 -a, -and, -o, -or 的逻辑操作
$ find ./ \( -name '*.txt' -o -name '*.py' )\

# 3. -regex 可以利用正则匹配，可以用 ! 排除匹配到的模式
$ find ./ -regex '.*\.\(py\|sh\)$' # 匹配 .py 文件和 .sh 文件
$ find ./ ! -name '*.txt' # 匹配所有不是 .txt 的文件

# 4. -maxdepth 限制最大搜索深度，-mindepth 限制最小搜索深度
$ find ./ -maxdepth 2 -name '*.txt'

# 5. -type 对文件类型进行过滤。f 代表普通文件，l 代表符号链接，d 代表目录
$ find ./ -maxdepth 2 -type f -name '*.txt'

# 6. 以天为单位：-atime 访问时间，-mtime 修改时间，-ctime 文件元数据（权限或所有权）变化时间
# 以分钟为单位：-amin, -mmin, -cmin
# -atime +n/-n: 表示访问或执行时间大于或小于 n 天的文件。atime -> access time, 在读取文件或执行文件时被修改
# -ctime +n/-n: 表示写入、更改 inode 属性（如更改所有者、权限或者链接）时间大于或小于 n 天的文件。ctime -> create time, 在写入文件、更改所有者、权限或链接设置时随 inode 内容的更改而更改的
# -mtime +n/-n: 表示写入时间大于或小于 n 天的文件。mtime -> modified time, 在写入文件时随文件内容的更改而更改
$ find ./ -type f -mtime -7 # 最近 7 天内被修改过的文件
$ find ./ -type f -amin +10 # 10 分钟之前被创建的文件

# 7. -size 基于文件大小搜索，b/c/w/k/M/G
$ find ./ -type f -size +10k # 查找大于 10k 的文件

# 8. -perm 基于权限查找，-user 基于用户查找
$ find ./ -type f -perm 644
$ find ./ -type f -user ecmadao # -user 后可以是用户名或者 UID
```

> **注：find 不同参数的顺序影响了搜索的执行。当先指定`--maxdepth`参数时，会先限制搜索深度，大大提升搜索效率。**即`find`命令是根据传入参数的顺序，一步一步过滤的

```bash
# 利用 find 执行相应操作
# 1. -delete 删除匹配的文件
$ find ./ -type f -name 'tmp' -delete

# 2. -exec 结合其他命令使用
# -exec 和下面的 xargs 有类似的效果，也是以前面的命令执行结果作为参数来执行下面的命令
# {} 为变量，代表文件名
$ find . -mtime +10 -exec rm -rf {} \; # 找到当前目录创建时间大于 10 天的文件并删除，其中 {} 代表变量
# 命令结尾的 ; 必须转义为 \;，否则会认为是 find 命令的结束，而不是 exec 命令的结束
$ find ./ -type f -exec cat {} > ../otuput.txt \;

# 为每个匹配到的文件调用 -exec 命令开销较大。如果指定的命令接收多参数，则可在结尾使用 +，则 find 会生成一份包含所有搜索结果的列表，然后将其作为指定命令的多个参数，一次性执行
$ find ./ -type f -exec cat {} > ../output.txt +

# -prune 让 find 跳过指定目录
$ find ./ -name '*.log' -prune # .log 文件被排除
```

#### 排序

- `sort [-onrmC] input1 input2...`

```bash
$ sort file1.txt file2.txt > sorted.txt
# or
$ sort file1.txt file2.txt -o sorted.txt

# -n  内容按数字顺序排序
$ sort -n file.txt

# -r 内容逆序排序
$ sort -r file.txt

# -m 合并已排序的文件
$ sort -m file1.txt file2.txt

# 找出已排序文件中不重复的行
$ sort file1.txt file2.txt | uniq

# -C 检查文件是否已排序。如果已排序，则退出码为 0，否则非 0
$ sort -C file
$ echo $?
```

- `uniq [-uc] sorted_input` 只能作用于排过序的数据

```bash
$ uniq sorted.txt # 打印所有行，但重复数据仅打印一次
$ uniq -u sorted.txt # 仅打印没有重复的行
$ uniq -c sorted.txt # 统计各行出现的次数
```

- `comm [-123i] file1 file2` 使用排好序的文件作为输入，求出两文件差集和交集

```bash
$ cat file1 # apple\norange
$ cat file2 # orange\nbanana

$ comm file1 file2
# 第一列代表只在 file1 中出现的行
# 第二列代表只在 file2 中出现的行
# 第三列代表在 file1 和 file2 中共有的行
:<<COMMENT
apple
           orange
     banana
COMMENT

# -1 删除第一列，-2 删除第二列，-3 删除第三列
# 打印文件中的全部差集
$ comm -3 file1 file2 | tr -d '\t'
# apple
# banana

# 打印交集
$ comm -1 -2 file1 file2
# orange

# 用 - 代表 stdin 的输入
$ cat file1 | comm - file2
```

#### 临时文件/文件夹

- `mktemp [-d/-u]`

> 临时数据储存在 /tmp，该目录中的内容在系统重启后会被清空

```bash
# 创建临时文件
$ mktemp # 在 /tmp 目录下生成临时文件

# 创建临时目录
$ mktemp -d

# 仅生成文件名，不实际创建
$ mktemp -u

# 基于模板生成文件名。模板名中至少有 3 个 X（连续）
$ mktemp example.XXXXXXXXXXXXXXXX # 生成 example.xxxxxx
# 有多个连续 X 时，会替换最后的连续 X
$ mktemp 1.XXX.2.XXXX # 1.XXX.2.1lGu
```

#### 名称提取

```bash
$ VAR=example.a.jpg

# 提取通配符左侧
# 从 VAR 中删除位于 % 右侧的通配符（.*）所匹配的字符串。通配符从右向左进行匹配
$ echo ${VAR%.*} # 输出 example.a
# % 为非贪婪模式，%% 为贪婪模式
$ echo ${VAR%%.*} # 输出 example

# 提取通配符右侧
# 与 % 类似，删除位于 # 右侧的通配符从左向右匹配到的字符串
$ echo ${VAR#*.} # 输出 a.jpg
# # 为非贪婪模式，## 为贪婪模式
$ echo ${VAR##*.} # jpg

# 利用 ${var:start_position:length} 可以字符串切片
$ echo ${VAR:1:2} # xa
$ echo ${VAR:3} # mple.a.jpg
```

```bash
#!/bin/bash
# 批量重命名 .jpg/.png 文件

count=1;
for img in `find . -iname '*.png' -o -iname '*.jpg' -type f -maxdepth 1`
do
  new=image-$count.${img##*.}
  echo "Renaming $img to $new"
  mv "$img" "$new"
  let count++
done
```

> 利用并行进程加速命令执行：**利用 bash 的操作符 &，会使得 shell 将命令置于后台并继续执行脚本**

```bash
#!/bin/bash
# 批量生成文件的 md5

PIDARRAY=()

for file in File.iso
do
  md5sun $file &
  PIDARRAY++("$!") # #! 中保存着最近一个后台进程的 PID
done
wait ${PIDARRAY[@]} # wait 等待指定进程结束
```

### 系统

#### 定时任务

- `crontab [-u/user] file`
- `crontab [-u/user] {-l/-r/-e}`
- [Linux 下执行定时任务 crontab 命令详解](https://segmentfault.com/a/1190000002628040)
- [crontab 定时任务](http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)
- [迷之 crontab 异常：不运行、不报错、无日志](https://my.oschina.net/leejun2005/blog/1788342)
- [Linux Crontab 定时任务不好使了?](https://xu3352.github.io/linux/2017/08/18/linux-crontab-not-working)
- [分享一次Linux任务计划crontab不执行的问题排查过程](https://zhang.ge/5093.html)

```bash
$ crontab file filepath # 用指定的文件替代目前的 crontab
$ crontab -l # 查看当前用户的定时任务
$ crontab -e # 编辑当前用户的定时任务
$ crontab -d # 删除当前用户的定时任务
$ sudo crontab -u ecmadao -l # 使用 -u 查看指定用户的定时任务，执行时必须有 root 权限
```

```bash
:<<COMMENT
crontan 各时间段意义
* * * * * cmd
分 时 日期 月 星期 命名

分：0-59, * 表示每分钟都要执行
时：0-59, * 表示每小时都要执行
日期：1-31, * 表示每天都要执行
月：1-12, * 表示每月都要执行
星期：0-7, 0 或 7 代表星期日

当设定为 a-b 时，表示 a-b 的时间段内都要执行
当设定为 */n 时，表示每隔 n 个时间段后要执行
当设定为 a,b,c 时，表示第 a,b,c 个时间段要执行

======================

- 执行 cron 作业所使用的权限同创建 crontab 的用户权限相同
- 在 cron 作业中指定的命令需要使用完整路径，这是因为 cron 并不会执行用户的 .bashrc，因此在执行 cron 作业时的环境与终端所使用的环境不同
  - cron 命令会将 SHELL 变量设置为 /bin/sh，还会根据 /etc/passwd 设置 LOGNAME 和 HOME
  - 可以在 crontab 中设置其他环境变量，可针对所有作业设置，也可针对个别作业设置

NAME=abc
00 * * * * bash /user/home/test.sh
COMMENT
```

#### 用户和用户组

```bash
:<<COMMENT
管理员 UID 为 0: 系统的管理员用户
系统用户 UID 为 1~999: 默认服务程序会有独立的系统用户负责运行
普通用户的 UID 从 1000 开始
UID 不保证连续，且不能重复
COMMENT
```

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

- `useradd [-e YYYY-MM-DD] [-u UID] [-g GID] [-d HOME] [-M] [-s shell] username` 创建新账户

```bash
:<<COMMENT
-u 自定义 UID
-g 表示令用户属于某个已存在的组，-g 后可使用 GID 或组名
-d 自定义用户的家目录
-M 表示不建立家目录
-e 代表账户到期时间，格式为 YYYY-MM-DD
-s 表示指定用户的 shell 解释器，设置为 /sbin/nologin 则用户不能登录系统
COMMENT

$ useradd -g 0 ecmadao # 添加 ecmadao 用户，并放到 root 组内
# 如果 -g 后使用了不存在的 gid 则会报错
```

- `usermod [-L/-U] [-e YYYY-MM-DD] [-g GID] [-u UID] [-s shell] username` 修改用户信息，-L 代表锁定用户禁止登录系统，-U 则解锁用户

- `userdel [-rf] username`

```bash
# -f: 强制删除
# -r: 删除用户时同时删除该用户的家目录
$ userdel ecmadao
$ userdel -r ecmadao
```

- `passwd [-l/-u] [-d] [-e] [username]`

```bash
:<<COMMENT
passwd 不指定用户的时候，则仅针对当前登录用户
指定其他用户时，需要有 root 权限

-l: 锁定用户，禁止其登录
-u: 解锁用户
-d: 删除用户的密码，使其可以以空密码登录
-e: 让用户的密码过期，强制用户下次登录的时候修改密码
COMMENT

$ passwd # 修改自身密码
$ passwd user1 # 更改 user1 用户密码（当前必须以 root 用户登录）
```

- `su [-] username`

```bash
# 切换当前登录用户
# 加上 - 则会重置环境变量，即切换时将环境变量也设置为该用户的信息
$ su - user
```

#### 磁盘管理

- `df [-i/-h/-k/-m]` dist free

```bash
# df 可查看已挂载磁盘的总容量、使用容量、剩余容量等。默认以 KB 为单位
$ df
$ df -i # 查看 inode 的使用情况
$ df -h # 以合适的单位来显示
$ df -k # 以 K 为单位
$ df -m # 以 M 为单位
```

- `du [-ahcs] file/folder` dist usage

```bash
:<<COMMENT
查看某些目录或文件所占空间的大小
option:
-a: 表示全部文件和目录的大小都列出来。不带 -a 参数则只列出文件夹的大小

-b: 以 bytes 为单位输出
-k: 以 KB 为单位输出
-m: 以 MB 为单位输出
-h: 自动调节到合适的单位

-c: 在最后显示总和
-s: 只列出总和

--exclude PATTERN/file 排除通配符匹配到的文件或单个文件
--max-depth=n 指定递归的深度（子目录层级）

使用 du 时，需要确保其对所有的文件有读权限，对所有的目录有读权限和执行权限
另外，du 输出的是文件字节数，未必和文件所占的磁盘空间完全一样，因为磁盘空间是以块为单位分配的，就算是 1 字节的文件，也会消耗一个磁盘块
COMMENT

$ du -sh folder # 列出某文件夹占空间的总大小，并根据大小自动选择合适的单位

$ du --max-depth=1 -h ./ # 查看指定目录下第一层级内各文件夹占用磁盘大小

$ du -h folder --exclude "*.log"
```

#### 软链接

Linux 系统中存在硬链接和软链接两种文件：

- 硬链接 hard link：「指向原文件 inode 的指针」，硬链接和原文件其实是同一个文件。每增加一个硬链接，文件的 inode 数就加 1。只有当 inode 数为 0 时，才算把文件真正删除。不能跨分区对目录文件进行链接
- 软链接 symbolic link：仅包含所链接文件的路径名，可链接目录文件，可跨分区链接。当原始文件被删除后，链接文件也将失效

- `ln [-sfiv] source target`

```bash
:<<COMMENT
-s: 创建软链接，否则创建硬链接
-f: 强制创建链接
-i: 覆盖前询问
-v: 显示创建链接的过程
COMMENT

$ ln -sv example.txt ./example_soft.txt
```

#### 系统信息

```bash
:<<COMMENT
Linux 系统中常见的目录名称以及相应内容
/boot: 开机所需文件 - 内核、开机菜单以及所需配置文件等
/dev: 以文件形式存放任何设备与接口
/etc: 配置文件
/home: 家目录
/bin: 存放单用户模式下可操作的命令
/lib: 开机时用到的函数库，以及 /bin 和 /sbin 下命令要调用的函数
/media: 用于挂载设备文件的目录
/root: 系统管理员的家目录
/tmp: 任何人都可以使用的共享临时目录
/proc: 虚拟文件系统，例如系统内核、进程、外部设备及网络状态等
/usr/local: 用户自行安装的软件
/usr/sbin: Linux 开机时不会使用到的软件、命令、脚本
/usr/share: 帮助与说明文件、共享文件
/var: 经常变化的文件，例如日志
COMMENT
```

- `who`/`w` 获取当前登录用户的信息
- `last [user]` 获取自文件 /var/log/wtmp 创建之后登录过系统的用户列表。可以指定用户
- `lastb [-F]` 获取登录失败的信息，-F 输出完整的日期

- `hostname` 打印当前主机名
- `uname [-n/-a]` 输出 Linux 内核版本、硬件架构等详细信息
- `uptime` 查看系统的加电运行时长
- `reboot` 重启系统，仅 root 用户有权限
- `poweroff` 关闭系统，仅 root 用户有权限

- `which cmd`
- `whereis cmd`
- `whatis cmd`

- `watch [-n/-d] 'command'` 按照指定的间隔执行命令并显示输出

```bash
$ watch 'ls -lh' # 默认 2 秒执行一次命令
$ watch -n 5 'ls -lh' # 指定每隔 5 秒执行一次命令
$ watch -d 'ls -lh' # 着重标记处连续命令输出之间的差异
```

- `nice`/`renice` 调整任务调度优先级

```bash
:<<COMMENT
nice 命令会修改内核的调度表，以更低/更高的优先级运行任务。
表示优先级的值越低，则调度器分配给任务的 CPU 时间就越多；优先级越高，则分配的 CPU 时间越少，占用的资源则越少

nice cmd # 默认在命令已有优先级上增加 10
nice -num cmd # 以指定的 num 优先级运行命令
nice -adjustment=num cmd # 指定命令优先级，但只有超级用户可以指定负数的优先级

renice 可以修改正在运行的任务的优先级
对占用大量资源，但运行时间没有特别要求的任务，可以利用该命令降低优先级

renice num pid # 给某进程指定优先级
COMMENT
```

- `ps [-f/-e/-ax/-o] [--sort] [-u/-U] [-C]`

```bash
:<<COMMENT
ps 默认值显示当前终端所启动的进程。-e/-ax 命令可以显示系统中运行的所有进程
-f 打印多列的完整信息

-o 指定显示哪些列的数据：
pcpu CPU 占用率
pid 进程 ID
ppid 父进程 ID
pmem 内存使用率
comm 可执行
cmd 简单命令
user 启动进程的用户
nice 优先级
time 累计的 CPU 时间
stat 进程状态
tty 所关联的 TTY 设备

--sort 强制对输出进行排序，后面的参数名称和 -o 一致。+代表升序，-代表降序

-u user1,user2.. 指定有效用户列表
-U user1,user2.. 指定真实用户列表

-C cmd1,cmd2.. 找出特定命令的进程
COMMENT

$ ps -axf
$ ps -axo pid,user,comm

# 按照 CPU 占用率从高到低排序，并只输出占用最高的前 5 个
$ ps -axo pid,user,comm,pcpu --sort -pcpu | head -5

# 用 grep 过滤出特定用户的进程
$ ps -axo pid,user,comm,pcpu | grep user
# 或者直接用 -u 参数输出该用户的进程（注：不能和 -ax/-e 一起用）
$ ps -u user -U user -o pid,user,comm,pcpu

$ ps -e -o 'pid,comm,args,pcpu,rsz,vsz,stime,user,uid'
```

- `pgrep cmd [-d/-u/-c]`

```bash
# pgrep 列出命令的进程 ID，命令不需要使用精准名称（ps 命令则需要使用精准名称）
# 默认使用换行符作为分隔符
$ pgrep bash # 或者 pgrep ash
$ pgrep bash -d ':' # 使用 : 作为分隔符

# -u 可以过滤用户
$ pgrep -u root,user cmd

# -c 返回匹配的进程数量
$ pgrep -c cmd
```

```bash
:<<COMMENT
/proc 目录中存有系统、模块及运行进程的相关信息

/proc/cpuinfo 中包含了 CPU 的详细信息
/proc/meminfo 中包含了内存相关的信息
/proc/partitions 中描述了磁盘分区的信息
COMMENT

$ cat /proc/cpuinfo |grep "cores"|uniq # 查看 CPU 核数
```

- `sysctl [-a/-p]` 修改内核参数，需要 root 权限

```bash
:<<COMMENT
sysctl 命令可以立即改变参数值，但除非将参数定义在 /etc/sysctl.conf 中，否则重启之后会复原
修改 /etc/sysctl.conf 前尽量前测试，否则可能导致系统无法启动

一些值的作用
kernel.sched_migration_cost_ns 控制任务被切换之前能够保持活跃状态的时长
net.core.rmem_max 网络缓存的最大值

sysctl 支持的参数通常 /proc 文件系统也支持
例如，参数 net.core.rmem_max 可以以 /proc/sys/net/core/rmem_max 的形式访问
COMMENT

$ sysctl -a # 输出所有的参数
$ sysctl -p filename # 从 filename 中读入值。默认从 /etc/sysctl.conf 中读取
$ sysctl param # 读取 param 的值
$ sysctl param=value # 临时设置值
```

#### 日志记录

> 与守护进程和系统进程相关的日志文件位于 /var/log 目录中。在 Linux 系统中，由守护进程 syslogd 使用 syslog 标准协议处理日志，每个标准应用程序都可以利用 syslogd 记录日志

- `logger [-tfp] message`

```bash
:<<COMMENT
一些标准的 Linux 日志文件
/var/log/boot.log 系统启动信息
/var/log/messages 内核启动信息、普通日志文件
/var/log/auth.log 用户认证信息
/var/log/mail.log 邮箱服务器日志
COMMENT

$ logger 'message' # 直接向 /var/log/messages 中写入信息
$ logger -t TAG 'message' # -t 定义消息标签
$ logger -f target.log # -f 将其他文件的内容写入日志文件

# -p 和 /etc/rsyslog.d/ 目录下的配置文件决定了日志消息保存的地方
$ vim /etc/rsyslog.d/mylog.conf
# 写入: testlog.* /var/log/testlog.log
$ service syslog restart
$ logger -p testlog.info 'message'
```

使用 logrotate 配置日志压缩和切分

- [LOGROTATE 日志滚动解决日志占用空间过大](https://www.noisyfox.io/logrotate.html)
- [ubuntu server 使用 logrotate 切割日志](http://jiangli373.github.io/2014/10/08/ubuntu-server%E4%BD%BF%E7%94%A8logrotate%E5%88%87%E5%89%B2%E6%97%A5%E5%BF%97/)

```bash
:<<COMMENT
参数                         功能
compress                     通过gzip 压缩转储以后的日志
nocompress                   不需要压缩时，用这个参数
copytruncate                 用于还在打开中的日志文件，把当前日志备份并截断
nocopytruncate               备份日志文件但是不截断
create mode owner group      转储文件，使用指定的文件模式创建新的日志文件
nocreate                     不建立新的日志文件
delaycompress                和 compress 一起使用时，转储的日志文件到下一次转储时才压缩
nodelaycompress              覆盖 delaycompress 选项，转储同时压缩。
errors address               专储时的错误信息发送到指定的Email 地址
ifempty                      即使是空文件也转储，这个是 logrotate 的缺省选项。
notifempty                   如果是空文件的话，不转储
mail address                 把转储的日志文件发送到指定的E-mail 地址
nomail                       转储时不发送日志文件
olddir directory             转储后的日志文件放入指定的目录，必须和当前日志文件在同一个文件系统
noolddir                     转储后的日志文件和当前日志文件放在同一个目录下
prerotate/endscript          在转储以前需要执行的命令可以放入这个对，这两个关键字必须单独成行
postrotate/endscript         在转储以后需要执行的命令可以放入这个对，这两个关键字必须单独成行
hourly                       指定转储周期为每小时。开启此项前，需利用 man logrotate 确认版本是否支持，然后到 /etc/cron.daily 文件夹下，将 logrotate.conf 文件复制到 /etc/cron.hourly 文件夹中
daily                        指定转储周期为每天
weekly                       指定转储周期为每周
monthly                      指定转储周期为每月
rotate count                 指定日志文件删除之前转储的次数，0 指没有备份，5 指保留5 个备份
tabootext [+] list           让logrotate 不转储指定扩展名的文件，缺省的扩展名是：.rpm-orig, .rpmsave, v, 和 ~
size size                    当日志文件到达指定的大小时才转储，Size 可以指定 bytes (缺省)以及KB (sizek)或者MB (sizem).
COMMENT

$ cd /etc/logrotate.d/
$ vim xxx

# 强制执行
sudo logrotate -f /etc/logrotate.d/xxx
```

#### 信号

> 信号可以中断正在运行的程序。当进程收到一个信号时，会执行对应的信号处理程序作为相应。编译型的应用程序使用系统调用 kill 生成信号。在命令行（或是 shell 脚本）中则通过 kill 命令实现

- `kill [-l/-s] [pid]`
- `killall [-s/-u] process_name`

```bash
:<<COMMENT
-l 列出所有可用的信号，常用信号有：
SIGHUP 1: 对控制进程或终端的结束进行挂起检测
SIGINT 2: 当按下 Ctrl+C 时发送该信号
SIGKILL 9: 用于强制杀死进程
SIGTERM 15: 默认用于终止进程
SIGTSTP 20: 当按下 Ctrl+Z 时发送该信号
COMMENT
$ kill -l

# 终止某进程
$ kill pid
# 给某进程发送信号
$ kill -s signal pid
$ kill -s 9 pid # 信号量 9 用于强制杀死信号
$ kill -9 pid # 同上

$ killall process_name # killall 以进程名称为参数
$ killall -9 process_name

# 杀死某用户的所有指定进程
$ killall -u user process_name
```

- `history [-c]` 显示历史执行过的命令，默认显示 1000 条记录，可修改`/etc/profile`文件中的`HISTSIZE`变量。`-c`则清除所有记录。历史记录会保存在`~/.bash_history`文件中
- `!number` `history`命令打印的信息带有行号，该命令可快速输出某行的命令，避免重复输入

### VIM

- [Learn Vim Progressively](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
- [简明 VIM 练级攻略](https://coolshell.cn/articles/5426.html)

```bash
$ vim filename # 进入一般模式

:<<COMMENT
在一般模式中，有如下快捷操作可以编辑文档:

0: 移动光标到行首
$: 移动光标到行尾

x: 向后删除一个字符
X: 向前删除一个字符
nx: 向后删除 n 个字符

dd: 删除/剪切光标所在的行（执行后该行已被复制）
ndd: 删除/剪切光标所在行之后的 n 行（包括当前行），例如 5dd

yy: 复制当前行
nyy: 从光标所在行开始，复制下面的 n 行（包括当前行）

p: 从光标所在行开始，向下粘贴
P: 从光标所在行开始，向上粘贴

u: 还原上一步操作
v: 按 v 后移动光标会选中指定字符，然后可以实现复制、粘贴等操作

########################################################

在一般模式下，输入 : 可进入命令模式
:w 保存文本
:w! 强制保存
:q 退出 vim
:q! 强制退出
:wq 保存并退出
:wq! 强制保存退出
:set nu 显示行号
:set nonu 不显示行号
:整数 跳到该行

########################################################

从一般模式进入编辑模式
i: 把光标放在 cursor 处
I: 把光标放在行首
a: 把光标放在 cursor 后一个位置
A: 把光标放在行尾
o: 在光标所在行的下一行插入新行
O: 在光标所在行的上一行插入新行
COMMENT
```

### 压缩/备份

#### 常见压缩文件后缀名

- `.gz` 由 gzip 压缩工具压缩的文件
- `.bz2` 由 bzip2 压缩工具压缩的文件
- `.zip` 由 zip 压缩工具压缩的文件
- `.tar` 由 tar 打包工具打包出的文件（tar 没有压缩功能，只是把目录合并为一个文件）
- `.tar.gz` 先由 tar 打包，再用 gzip 压缩出的文件
- `.tar.bz2` 先由 tar 打包，再用 bzip2 压缩出的文件
- `.lzma` 由 lzma 压缩的文件

#### 压缩/打包命令

- `gzip [-d/-#] filename`
- `gzip -l zipfile` 列出压缩文件的属性信息
- `gunzip zipfile`

> **gzip 不保留原文件，不能压缩目录**

```bash
:<<COMMENT
-d 在解压缩时使用
# 为 1~9 的数字，代表压缩等级，默认为 6
1 的压缩率最低，压缩速度最快
9 的压缩率最高，压缩速度最慢

不能压缩目录，原文件压缩之后不保留
COMMENT
$ ls # test.md
$ gzip test.md
$ ls # test.md.gz

# 解压，不保留压缩文件
$ gzip -d zipfile
$ gunzip zipfile
```

- `bzip2 [-d/-z] filename`

> bzip2 的压缩率比 gzip 高
>
> **bzip2 不保留原文件，不能压缩目录**

```bash
# -d 代表解压缩
# -z 代表压缩
# 不带参数则默认为压缩
```

- `lzma file`
- `unlzma lzmafile`

> lzma 的压缩率优于 bzip2 和 gzip
>
> **lzma 不保留原文件，不能压缩目录**

- `zip [-r] resultname filename/folder`
- `unzip zipname`

> **zip 利用 -r 参数可以压缩目录**，解压之后不会删除原压缩文件

```bash
$ zip -r result.zip folder # 把 folder 压缩为 result.zip，且 folder 内的其他子目录都会被压缩
$ unzip result.zip

# -u 可以更新压缩文件中的内容
$ zip zipfile.zip -u newfile

# -d 可以删除压缩文件中的多个内容
$ zip -d zipfile.zip file1 file2..

# -l 可以列出压缩文件中的内容
$ zip -l zipfile.zip
```

- `tar [-zjxcvfpP] resultname tar`

```bash
:<<COMMENT
-z: 打包同时使用 gzip 压缩
-j: 打包同时使用 bzip2 压缩
--lzma: 使用 lzma 压缩
-a: 根据输出文件的扩展名，自动选择合适的压缩方式

-x: 解包或解压缩，可以通过 -C path 来指定输出目录
-c: 创建一个 tar 包或者压缩文件包

-f: 后面需跟文件名，即 -f filename，表示压缩/解压后的文件名为 filename。在多参数组合的情况下，f 需要被写在最后
-p: 使用原文件的属性
-P: 表示可以使用绝对路径
--exclude PATTERN: 在打包或压缩时，不要包含某文件
--totals: 打印出归档的总字节数

-t: 查看 tar 包里的文件
-r: 将新文件追加到已有的归档文件中
-u: 当新文件和归档内的文件重名时，仅当文件更新时间更新时，才会被加入到归档中

-v: 冗长模式（verbose），在终端中显示更多细节
-vv: 非常冗长模式（very verbose）
COMMENT

########################################################

# 利用 tar，可以打包文件和目录，且原文件/目录保留。如果遇到重名则会覆盖
$ tar -cvf result.tar folder # 打包文件夹

$ tar -czvf result.tar.gz folder # 打包同时利用 gzip 压缩
$ tar -cjvf result.tar.bz2 folder # 打包同时利用 bzip2 压缩
$ tar -cavf result.tar.lzma folder # 自动旋转合适的压缩方式

$ tar -zxvf target.tar.gz result # 解压 gz 文件
$ tar -jxzf target.tar.bz2 result # 解压 bz2 文件

$ tar -tf target.tar.gz # 查看压缩文件/包内的内容

$ tar -cvf result.tar --exclude test2.md testfolder # 打包同时排除某些文件和文件夹
$ tar -cf archive.tar * --exclude "*.log"

# 可以接受通配符
$ tar -cvf example.tar ./**/*.txt # 归档目录下所有的 txt 文件
```

#### 备份

- `rsync [-avzr] source target`

```bash
:<<COMMENT
-a 表示归档操作
-v 打印细节
-z 在传输时压缩
-r 递归的复制目录中所有内容

--exclude PATTERN 排除某些文件
--exclude-from FILEPATH 通过一个列表文件指定要排除的文件

--delete 默认条件下，rsync 不会在目的端删除源端已不存在的文件，而 --delete 命令会删除它们

source、target 可以是远程目录
对于目录格式，如果在路径结尾使用了 /，则会将目录内的内容同步，而不包含目录本身；如果没有 /，则包含了目录本身
COMMENT

$ rsync -avz dir user@host:path # 本机目录同步到远程
$ rsync -avz user@host:dir path # 远程目录同步到本机

$ rsync -avzr source target --delete
```

### shell 基础

#### 基础

```bash
:<<COMMENT
转义符
\: 反斜杠之后的变量变为单纯的字符串
'': 转义其中所有的变量为单纯的字符串
"": 保留其中的变量
``: 把其中执行的命令输出返回
COMMENT

$ echo `ls`

:<<COMMENT
主要环境变量
HOME: 用户主目录
SHELL: 用户在使用的 shell 解释器名称
HISTSIZE: 输出的历史记录条数
HISTFILESIZE: 保存的历史记录条数
MAIL: 邮件保存路径
LANG: 系统语言、语系名称
RANDOM: 生成一个随机数字
PS1: Bash 解释器的提示符
PATH: 定义解释器搜索用户执行命令的路径
EDITOR: 用户默认的文本编辑器
COMMENT

$ echo $RANDOM # 生成一个随机数
```

- 数组和关联数组

```bash
# 数组
array=(1 2 3 4 5)
echo ${array[0]} # 获取特定索引的数据
echo ${array[*]} # 获取所有数据
echo ${array[@]} # 获取所有数据

echo ${#array[*]} # 获取数组长度
echo ${!array[*]} # 获取数组的索引列表

# 关联数组，以任意文本作为索引
declare -A ass_array
ass_array[a]=1
ass_array[b]=2

echo ${!ass_array[*]} # 获取数组的索引列表: a b
```

- `alias`
- `alias '[别名]=[具体的命令]'`
- `unalias 别名`

命令行中的`alias`效果只是暂时的，一旦关闭当前终端，则设置的别名失效。

```bash
$ alias # 查看别名
$ alias 'currentPath=pwd' # 设置别名

$ unalias currentPath # 删除别名
$ alias currentPath= # 删除别名

# 别名可以覆盖原生的命令
$ alias ls="ls -l"
$ ls # 执行 ls -l
# 但通过 \ 可以执行被覆盖的原生命令
$ \ls # 执行原生 ls
```

- `env` 显示全部预设的系统变量
- `set` 显示系统变量和用户自定义的变量
- `unset variable` 删除某个变量
- `cat /proc/$PID/environ` 查看某个进程使用的环境变量（输出的环境变量彼此用 null 字段，即 \0 分隔）
  - `cat /proc/$PID/environ | tr '\0' '\n'`

可以通过`export`导出变量。被导出后，当前 shell 脚本所执行的任何应用程序都会获得这个变量

```bash
:<<COMMENT
自定义变量
变量格式为 a=b，a 为变量名，b 为变量值，等号两边不能有空格
变量名只能由字母、数字、下划线组成，且不能以数字开头
当变量内容带有特殊字符（如空格）时，需要加上单引号：username='ecmadao 233'
如果变量值本身就有单引号，则需要使用双引号：a="user's name"
变量值中如果需要用到其他命令运行结果，则使用反引号：currentPath=`pwd`
变量值可以累积其他变量的内容，需要使用双引号：
a=`pwd`
b="current path is $a"
COMMENT

$ a='123'
$ arr=(1 2 3 4)

# 输出变量长度
$ echo ${#a} # 3
$ echo ${#arr[*]} # 4
```

- 数学运算（仅支持整数）

```bash
no1=1
no2=2

# 1. 利用 let 进行数学运算
let result=no1+no2
echo $result # 3

n=1

let n++
echo $n # 2

let n--
echo $n # 1

let n+=2
echo $n # 3

# 2. 使用 [] 操作符
result=$[no1 + no2] # 或者 result=$[$no1 + no2]
echo $result # 3

# 3. 使用 (()) 操作符
result=$((no1 + no2)) # 或者 result=$(($no1 + no2))
echo $result # 3

# 4. 使用 expr
result=`expr 3 + 4`
echo $result # 7

result=$(expr $no1 + $no2) # 3
```

- 子 shell

```bash
# 将命令序列的输出赋值给变量
# cmd_output=$(cmd)
# cmd_output=`cmd`
$ cmd_output=$(ls -l)
$ cmd_output=`ls -l`

# 在 () 运行的命令是一个独立的子 shell 进程，不会对当前 shell 造成影响
$ pwd # /var/ecmadao
$ (cd ../www && pwd) # /var/www
$ pwd # /var/ecmadao
```

#### 输出、重定向和管道符

- 彩色输出

```bash
:<<COMMENT
颜色码：0-重置，30-黑色，31-红色，32-绿色，33-黄色，34-蓝色，35-洋红，36-青色，37-白色

更改文字颜色：`\e[1;3xm...\e[0m`
更改背景色：`\e[1;4xm...\e[0m`
COMMENT

echo "\e[1;31m 12345 \e[0m"
echo "\e[1;41m 12345 \e[0m"
```

- 文件描述符和重定向

```bash
:<<COMMENT
0 - stdin（标准输入）
1 - stdout（标准输出）
2 - stderr（标准错误）

在命令执行完后，可以在特殊变量 $? 中获取退出状态。如果正常完成，则退出状态为 0

> 将输出重定向，>> 为重定向追加，但仅打印 stdin 的信息。在命令前加入文件描述符则可打印对应的输出：
1> 标准输出重定向
2> 标准错误重定向
&> 输出/错误重定向

cmd < file # 将文件作为命令的标准输入
cmd << 结束符 # 从标准输入中读入，指定遇见结束符为止
COMMENT

ls -l > test.txt # 等同于 ls -l 1> test.txt
ls -l 2> test.txt # 仅打印错误信息
ls -l &> test.txt # 打印 stdout 和 stderr
```

```bash
# 输出通过`>`重定向到文件后，不会再在终端输出。如果需要同时输出到文件和终端，需要使用`tee`命令
ls -l > test.txt # 终端不会再输出
ls -l | tee test.txt # 输入文件后，再输出到终端

# tee file1 file2 file3....
# tee 命令将输入写入后，再将其作为后续命令的 stdin 传递下去
ls -l | tee test.txt | cat -n

# tee 默认覆盖写入。通过 -a 参入转为追加
# tee -a file
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

- `tee file`

```bash
# 类似于重定向 >，但在输出之后会把内容输出在屏幕上
# 注意只能覆盖，不能追加
$ echo 'example' | tee test.txt | xargs
```

- `|` 管道符

```bash
# 将前一个指令的输出作为后一个的输入
$ echo '1' | tee test.md # 利用 echo 输出 1，然后使用 tee 写入到 test.md 中
```

- `xargs cmd`
- `xargs -n1 -I[variable] cmd [variable]`

> 将命令输出作为 xargs 的输入时，最好为输出的结果添加 0 值字节终止符，然后在 xargs 中再用 -0 进行分割
>
> 因为 xargs 默认使用空格分隔，当参数中含有空格时，则解析将会不正确

```bash
# xargs 默认使用空白字符分割输入，并使用 echo 命令，会将多行输入转为单行输出
$ ls | xargs # file1 file2 ...

# 把前面命令的输出作为 xargs 后面命令的输入
$ ls README.md | xargs cat
# ls README.md 输出 README.md，作为参数传递给 cat

# -n 限制 xargs 每次调用命令时传递的参数个数
$ ls | xargs -n 3 # 每三个一行输出

# -d 指定自定义分隔符，-0 使用 Null 分隔符
$ echo "abc" | xargs -d b # a c
# 先利用 find 的 -print0 命令， 将输出用 Null 结合，再在 xargs 中用 Null 分隔，最后找出内容中不包含 image 的文件
$ find ./ -type f -name '*.txt' -print0 | xargs -0 grep -L image

# 如果输出为多个值时，可以使用 xargs 的循环命令
# -n1 表示对前面输出的各个值分别进行处理，类似循环
# -Ivariable 表示每次循环使用的变量为 variable，该变量作为后面命令的输入
$ ls folder/ | xargs -n1 -Iv mv v tmp_v
```

- `tr [-cds] set1 set2` 对标准输入的内容进行字符替换、字符删除、重复字符压缩

```bash
# 1. 替换
# 将大写字母替换为小写
$ echo "AbC" | tr 'A-Z' 'a-z' # abc

# 将制表符替换为单个空格
$ tr '\t' ' ' < file.txt

# 2. -d 删除字符
$ cat file | tr -d 'a-z' # 删除文件中的小写英文字母

# 3. -c 补集，即模式没有匹配到的字符
$ echo -n 'a1' | tr -c '0-9' ' ' # 将非数字字符替换为空格
$ echo -n 'a1' | tr -dc '0-9' # 删除非数字字符

# 4. tr -s set1 压缩
$ echo 'example     test  1' | tr -s ' ' # 删除多余空格
$ tr -s '\n' < test.txt # 删除文件中的换行符
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

#### 函数和流程控制

```bash
# 函数定义
function fname() {}
fname() {}

# 函数调用
$ fname;
$ fname arg1 arg2;

# 函数的参数
fname() {
  echo $0; # 固定参数，脚本名称
  echo $1; # 第一个参数；可以依次类推
  echo $@; # 已列表的形式打印所有参数
  echo $#; # 接收到的参数个数
  return 0; # 函数返回值
}
fname 1 2 3
# $? 上一个命令运行结果，为 0 表示正常运行，非零表示出现异常
echo $?
```

```bash
# 递归函数
# Fork 炸弹
# https://linux.cn/article-5685-1.html
# https://zh.wikipedia.org/wiki/Fork炸弹
:() { :|:& }; :
# or
forkbomb(){ forkbomb|forkbomb & } ; forkbomb

# 读取命令返回值
# 命令的返回值被保存在变量 $? 中
$ fname
$ echo $? # 0
# 返回值被称为退出状态，可用于确定命令是否执行成功。如果成功退出，则状态为 0

# shift 命令可以在函数内将参数向左移动一个位置，因此可以用 $1 获取到当前第一个参数
fname() {
  for i in `seq 1 $#`
  do
    echo $i is $1
    shift
  done
}
fname a b
# 1 is a
# 2 is b
```

```bash
:<<COMMENT
if condition1; then
  do something
elif condition2; then
  do something
else
  do something
fi
COMMENT

:<<COMMENT
for var in list
do
  do something
done
COMMENT

:<<COMMENT
while condition
do
  do something
done
COMMENT

:<<COMMENT
case var in
pattern1)
  do something
  ;;
pattern2)
  do something
  ;;
*)
  do something
esac
COMMENT

$ KEY=1
case "$KEY" in
[a-z]|[A-Z])
  echo "key $KEY is letter"
  ;;
[0-9])
  echo "key $KEY is number"
  ;;
*)
  echo "key $KEY is other word"
esac
```

#### 比较与测试

```bash
# [ condition ] && action; 如果 condition 为真，则执行 action
# [ condition ] || action; 如果 condition 为假，则执行 action
```

> **注，在 [ 右侧和 ] 左侧，需要有空格**

算数比较

```bash
:<<COMMENT
整数比较运算：
[ $var -gt $num ] # 大于
[ $var -lt $num ] # 小于
[ $var -ge $num ] # 大于或等于
[ $var -le $num ] # 小于或等于
[ $var -eq $num ] # 等于
[ $var -ne $num ] # 不等于
COMMENT
$ [ $var1 -ne 0 -o $var2 -gt 0 ] # 逻辑 or，等同于 [ $var1 -ne 0 ] or [ $var2 -gt 0 ]
$ [ $var1 -ne 0 -a $var2 -gt 0 ] # 逻辑 and，等同于 [ $var1 -ne 0 ] and [ $var2 -gt 0 ]

:<<COMMENT
文件系统相关测试:
[ -f $file_var ] # 如果给定的变量包含正常的文件路径或文件名，则返回真
[ -x $var ] # 如果给定的变量包含的文件可执行，则返回真
[ -d $var ] # 如果给定的变量包含的是目录，则返回真
[ -e $var ] # 如果给定的变量包含的文件存在，则返回真
[ -c $var ] # 如果给定的变量包含的是一个字符设备文件的路径，则返回真
[ -b $var ] # 如果给定的变量包含的是一个块设备文件的路径，则返回真
[ -w $var ] # 如果给定的变量包含的文件可写，则返回真
[ -r $var ] # 如果给定的变量包含的文件可读，则返回真
[ -L $var ] # 如果给定的变量包含的是一个符号链接，则返回真
COMMENT

:<<COMMENT
字符串比较运算：
[ $str1 = $str2 ]
[ $str2 != $str2 ]
[ -z $str ] # 判断是否是空字符串
COMMENT
```

```bash
fpath="/etc/www"

if [ -d $fpath ];
then
  echo "folder $fpath existed"
elif [ -f $fpath ];
then
  echo "file $fpath exists"
else
  echo "file not exist"
fi
```

字符串比较

- [Shell 字符串匹配](https://blog.csdn.net/xy913741894/article/details/74355576)
- [Linux shell 字符串操作（长度，查找，替换）详解](https://www.cnblogs.com/chengmo/archive/2010/10/02/1841355.html)
- [Shell 判断字符串包含关系的几种方法](https://blog.csdn.net/iamlihongwei/article/details/59484029)

> 最好使用`[[ ]]`形式的双中括号

```bash
[[ $str1 = $str2 ]] # 等同于 [[ $str1 == $str2 ]]
[[ $str1 != $str2 ]]
[[ $str1 < $str2 ]] # 字母序比较

[[ -z $str ]] # 如果 str 为空，则返回真
[[ -n $str ]] # 如果 str 不为空，则返回真
```

### 正则表达式

- `grep [-cinvABC] 'word' filename`

```bash
:<<COMMENT
-R 在目录中递归搜索
-i 忽略大小写

-v 打印不符合要求的行
-c 仅打印符合要求的行
-n 输出行号

-A 后 ＋数字，例如 -A2，表示打印符合要求的行和后面两行
-B 后 ＋数字，例如 -B2，表示打印符合要求的行和上面两行
-C 后 ＋数字，例如 -C2，表示打印符合要求的行和上下各两行
COMMENT

$ grep -n '[0-9]' filename # 附带行号的输出带有数字的行
$ grep -nv '[0-9]' filename # 附带行号的输出不带数字的行
$ grep -n '^$å' filename # 输出所有空行
$ grep -n 'l\{2\}' README.md # 输出 l 连续出现两次的行

:<<COMMENT
-e 可以指定多个匹配模式
--include 通配符，指定包含哪些文件
--exclude 通配符，指定排除哪些文件
--exclude-dir 排除目录
-q 静默输出，不输出结果，仅返回是否匹配成功（$? 为 0 则成功）
COMMENT

$ grep -e '[0-9]' -e '[a-z]' filename
$ grep '[a-z]' --include '*.log'
```

- `egrep`

```bash
:<<COMMENT
egrep 和 grep 不同的是，它能够使用扩展表达式
如:
+ 匹配一个或者多个先前的字符, 至少一个先前字符.
? 匹配 0 个或者多个先前字符.
a|b|c 匹配 a 或 b 或 c
COMMENT

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
:<<COMMENT
替换字符或字符串之后输出
-i: 直接修改原文件，不加则不会修改，值在输出内容中进行替换

n: 代表某行或行的范围，不加则代表全部行
s: 替换的标识符
/: 操作分隔符，也可以使用 @ 或者 #
target 被替换对象
replace 替换对象
g: 是否全部替换匹配的对象。如果不加，则只替换每行的第一个匹配
COMMENT

$ sed 's@a@bbbbbbbbbbbbbbbbbbbbbbbbbb@' README.md # 把每行第一个匹配的 a 替换为 bbbbbbbbbbbbbbbbbbbbbbbbbb
$ sed '1,3s@about@abort@g' README.md # 把 1~3 行全部匹配的 about 替换为 abort
```

### 网络

#### 下载

- `wget [-t try_times] url [-O outputfile] [-o log]`

```bash
# -t 指定在放弃下载前尝试多少次，设置 -t 0 则会强制不断重试
$ wget -t 0 url

# -O 指定输入文件，-o 指定输出日志信息。指定 -o 后，日志信息不会打印到 stdout
$ wget url -O output.html -o log

# 需要认证的网页
$ wget --user username --password pwd url
```

- cURL

[Linux命令行：cURL的十种常见用法](https://juejin.im/post/5915204b44d904006c463c61)

#### 网络

```bash
:<<COMMENT
HWaddr: MAC 地址
inet addr: IP 地址
Bcast: 广播地址
Mask: 子网掩码
COMMENT

$ ifconfig # 用于配置或显示网络接口、子网掩码等信息

$ host domain # 列出域名所有的 IP 地址

$ route [-n] # 显示路由表，-n 则会指定已数字形式显示地址

$ hostname -I # 内网 IP 外网 IP
```

- `ping [-c] host/ip`

> ping 命令使用 ICMP 协议（Internet Control Message Protocol，网络控制消息协议）中的 echo 分组检验主机间连通性。发送 echo 分组之后，如果目标主机处于活跃状态，则会返回一条 reply。

```bash
$ ping -c2 domain # 限制发送 2 次 echo 分组
```

- `traceroute domain/ip` 显示分组途径的所有网关的地址

- `scp [-rp] source target` Secure Copy Program，安全复制程序，文件均通过 SSH 加密通道进行传输

```bash
# -r 以递归形式复制目录
# -p 可以在复制文件同时保留文件的权限和模式

$ scp filename user@host:path # 本机文件复制到远程
$ scp user@host:filepath path # 远程文件复制到本机
```

- `lsof [-i:port]` 列出已打开的文件，-i 则将范围限制在已打开的网络连接，port 参数可指明端口号
- `netstat -tnp` 列出开放端口与服务

```bash
$ lsof -i:27017
```

**修改 TCP**

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

### 日期

- `date`

```bash
:<<COMMENT
时间格式 format
=== 星期 ===
%a # Sun
%A # Sunday

=== 月 ===
%b # Nov
%B # November

=== 日 ===
%d # 31

=== 固定格式 ===
%D # mm/dd/yy

=== 年 ===
%y # 18
%Y # 2018

=== 小时 ===
%I # 09
%H # 09

=== 分钟 ===
%M # 33

=== 秒 ===
%S # 10

=== 时间戳（秒）===
%s

=== 查看当前是今年的第几天 ===
%j
COMMENT

$ date # 读取当前时间和日期
$ date +%s # 将时间转换为时间戳，以秒为单位
$ date --date "2017-04-01" # 将字符串类型日期输入，转换为时间
$ date --date "2017-04-01" +%s # 将字符串类型日期输入，并转换格式

$ date "+%Y-%M-%d %H:%M:%S" # 2019-18-06 22:18:54
$ date -s "20170901 8:30:00" # 设置时间
```

### Others

通过 bash 发送邮件

- [5 Ways to Send Email From Linux Command Line](https://tecadmin.net/ways-to-send-email-from-linux-command-line/)
- [3 minute tip: Configure a Linux server to send email](https://rianjs.net/2013/08/send-email-from-linux-server-using-gmail-and-ubuntu-two-factor-authentication)
- [“Mail” command hangs and maillogs shows error [closed]](https://serverfault.com/questions/548771/mail-command-hangs-and-maillogs-shows-error)

CPU/进程/线程/并发/并行

- [CPU 核心数目与多线程](https://blog.csdn.net/qq_33530388/article/details/62448212)
- [线程、进程与处理器](http://jsonliangyoujun.iteye.com/blog/2358274)
- [多核 CPU 是否能同时执行多个进程？](https://www.zhihu.com/question/271821176)
- [操作系统中的进程与线程](http://www.cnblogs.com/CareySon/archive/2012/05/04/ProcessAndThread.html)

- 安装中文字体 https://wiki.ubuntu.com.cn/%E5%AD%97%E4%BD%93
