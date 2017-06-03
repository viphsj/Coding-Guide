<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ubuntu](#ubuntu)
  - [新用户](#%E6%96%B0%E7%94%A8%E6%88%B7)
  - [端口](#%E7%AB%AF%E5%8F%A3)
  - [sh](#sh)
  - [文件](#%E6%96%87%E4%BB%B6)
  - [链接](#%E9%93%BE%E6%8E%A5)
    - [硬链接](#%E7%A1%AC%E9%93%BE%E6%8E%A5)
    - [软链接](#%E8%BD%AF%E9%93%BE%E6%8E%A5)
  - [重定向输出](#%E9%87%8D%E5%AE%9A%E5%90%91%E8%BE%93%E5%87%BA)
    - [重定向标准输出](#%E9%87%8D%E5%AE%9A%E5%90%91%E6%A0%87%E5%87%86%E8%BE%93%E5%87%BA)
    - [重定向错误输出](#%E9%87%8D%E5%AE%9A%E5%90%91%E9%94%99%E8%AF%AF%E8%BE%93%E5%87%BA)
    - [重定向标准输出和错误到同一个文件](#%E9%87%8D%E5%AE%9A%E5%90%91%E6%A0%87%E5%87%86%E8%BE%93%E5%87%BA%E5%92%8C%E9%94%99%E8%AF%AF%E5%88%B0%E5%90%8C%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6)
  - [目录](#%E7%9B%AE%E5%BD%95)
  - [系统](#%E7%B3%BB%E7%BB%9F)
  - [Shell](#shell)
    - [echo](#echo)
    - [转义符](#%E8%BD%AC%E4%B9%89%E7%AC%A6)
    - [通配符](#%E9%80%9A%E9%85%8D%E7%AC%A6)
    - [`{}`展开](#%E5%B1%95%E5%BC%80)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ubuntu

### 新用户

```bash
# 新用户
$ adduser xxx # 创建用户
$ passwd xxx # 用户密码
$ gpasswd -a xxx xxxx # 将 xxx 用户增加到 xxxx 管理组
$ su xxx # 切换到 xxx 用户
$ cd ~/home/xxx # 切换到 xxx 用户的目录

# 创建 ssh
$ mkdir ~/.ssh
$ chmod 700 ~/.ssh
$ ssh-keygen -t rsa
# 把本机信息添加到服务器
$ touch ~/.ssh/authorized_keys
$ vim authorized_keys # 添加并保存 pub ssh

$ exit
$ ssh xxx@xxxx.xxx.xxx # 使用新用户登录
$ ssh xxx@xxx.xxx.xxx -v # ssh 输出 log
```

### 端口

- 查看端口

```bash
# 查看 8080 端口
$ lsof -i:8080

# 关闭 pid 对应进程
$ kill pid
```

### sh

运行一个脚本

```bash
# 运行位于 /home/ecmadao/test.sh
$ cd /home/ecmadao/test.sh
$ chmod +x test.sh
$ ./test.sh
```

### 文件

```bash
$ ls
$ ls -l # 以长格式显示结果
$ ls -r # 或 --reverse，以相反的顺序显示结果
$ ls -S  # 安装文件大小排序
$ ls -t # 安装修改的时间顺序排序
$ ls -d # 或 --directory，列出指定目录中的文件
```

```bash
$ file filename # 输出指定文件(filename)的简单信息
$ less filename # 浏览文件内容
```

```bash
$ cat file1 file2... # 读取一个或多个文件，然后复制它们到标准输出
$ tac file1 file2... # 类似于 cat，但从最后一行开始输出，反向打印
$ stat file # 显示文件详细属性信息

$ tail -n x filename # 输出文件的倒数x行内容，不带参数则默认10行
$ tail -f # 随着文件内容的增加而输出，默认输出间隔为1s。可以用于查看实时log

$ head -n x filename # 打印文件前x行内容，默认十行
```

```bash
$ touch filename # 创建文件
```

### 链接

```bash
# 创建硬链接
$ ln file1 file2 # 给 file1 创建一个链接，指到 file2

# 创建符号链接（软链接）
$ ln -s file1 file2
```

不管是硬链接还是软连接，修改任意任意一个文件，会使链接的文件（或主文件）也被修改

#### 硬链接

- 硬链接不能关联它所在文件系统之外的文件
- 硬链接不能关联目录

```bash
$ ln file1 file2
# 输出两个文件的 inode 号，会发现它们是一样的
$ ls -i file1
$ ls -i file2
```

对系统而言，通过硬链接创建的文件实际上是同一个文件。删除两个文件的任意一个，都不会造成文件的删除。只有文件的硬链接数为0时，这个文件才会被删除。

#### 软链接

```bash
$ ln -s file1 file2
#  输出两个文件的 inode 号，会发现它们是不一样的
```

删除原文件后，软链接的文件不能再被打开。

### 重定向输出

#### 重定向标准输出

命令行输出的结果出了可以在 shell 里展示以外，还可以通过`>`和`>>`操作符输出到指定的文件中

```bash
# 把 ls -l 的结果输出到 ls-output.txt 中
# 当 ls-output.txt 不存在时会新建，若已存在，则会删除后重建
$ ls -l > output.txt

# 把 ls -l 的结果追加输出到 ls-output.txt 中
# 当 ls-output.txt 不存在时会新建，若已存在，则会在原有内容后新增
$ ls -l >> output.txt

$ cat example.txt > output.txt # 相当于把 example.txt 内的内容拷贝到 output.txt 中
```

```bash
# 当命令有误时，则结果不会输出到文件中
# 但由于使用 > 重定向符来重定向输出结果时，目标文件总是从开头被重写，所以相当于新建了文件

# 如下 ls 命令没有产生运行结果，只有错误信息，重定向操作开始重写文件，然后 由于错误而停止，导致文件内容删除
$ ls /not_exist > output.txt
```

#### 重定向错误输出

```bash
$ ls /not_exist 2> err.txt
```

#### 重定向标准输出和错误到同一个文件

```bash
$ ls -l /bin/usr > output.txt 2>&1
```

### 目录

```bash
$ mkdir xxx xx x # 创建目录
```

```bash
# 复制文件
$ cp file1 file2 # 将 item1 复制到 item2，若重名则默认覆盖
$ cp -i file1 file2 # 若重名则需用户确认

$ cp file1 file2 dir1 # 复制文件 file1 和文件 file2 到目录 dir1。目录 dir1 必须存在
$ cp dir1/* dir2 # 目录 dir1 中的所有文件都被复制到目录 dir2 中。 dir2 必须已经存在
$ cp -u dir1/* dir2 # 当把文件从一个目录复制到另一个目录时，仅复制 目标目录中不存在的文件，或者是文件内容新于目标目录中已经存在的文件

# 复制目录(-r会递归的复制文件)
$ cp -r dir1 dir2 # 复制目录 dir1 中的内容到目录 dir2。如果目录 dir2 不存在， 创建目录 dir2
```

```bash
# 移动文件
$ mv file1 file2 # 如果 file2 存在，它的内容会被 file1 的内容重写，可用于文件重命名
$ mv -i file1 file2 # 若重名则需用户确认

$ mv file1 file2 dir1 # 移动 file1 和 file2 到目录 dir1 中。dir1 必须已经存在
$ mv dir1 dir2 # 如果目录 dir2 不存在，创建目录 dir2，并且移动目录 dir1 的内容到 目录 dir2 中，同时删除目录 dir1
```

```bash
# 删除文件
$ rm file1 file2...
$ rm -i file1... # 删除前需用户确认
$ rm -r dir # 递归地删除文件
$ rm -f # 强制删除
```

### 系统

```bash
$ df -hl # 查看磁盘剩余空间

$ type command-name # 解释一个命令名
$ man command-name # 显示命令手册页
```

### Shell

#### echo

```bash
$ echo xxx # 将 echo 之后的命令执行结果输出

$ echo * # 输出当前目录下的文件名

# *** 路径名展开 ***
$ echo D* # 输出当前目录下以 D 开头的文件名
$ echo [[:upper:]]* # 输出目录下的大写文件的文件名
$ echo ~ # 展开成当前用户的家目录：/homt/root
$ echo ~ecmadao # 展开成指定用户的家目录名: /home/ecmadao
```

```bash
$ echo -n xxx # 命令输出结果最后不换行
$ echo -e xxx # 对转义符进行转义
```

#### 转义符

- `\a` # 响铃
- `\b` # 退格
- `\n` # 换行
- `\r` # 回车
- `\t` # 制表

#### 通配符

- `*` # 匹配任意多个字符（包括零个或一个）
- `?` # 匹配任意一个字符（不包括零个）
- `[characters]` # 匹配任意一个属于字符集中的字符
- `[!characters]` # 匹配任意一个不是字符集中的字符
- `[[:class:]]` # 匹配任意一个属于指定字符类中的字符，`[:class:]`代表字符类

常用字符类：

- `[:alnum:]` # 匹配任意一个字母或数字
- `[:alpha:]` # 匹配任意一个字母
- `[:digit:]` # 匹配任意一个数字
- `[:lower:]` # 匹配任意一个小写字母
- `[:upper:]` # 匹配任意一个大写字母

举例：

```bash
$ echo * # 输出当前目录下所有文件名
# test README.md node_modules .gitignore index.js

$ echo [[:upper:]]* # 输出以大写开头的文件
# README.md

$ echo [![:upper:]]* # 输出不以大写开头的文件
$ echo [tn]* # 输出以 t 或 n 开头的文件
$ echo .[!.]?* #输出以 . 开头，且第二个字符不是 . ，并且之后紧跟着任意多个字符的文件名
```

#### `{}`展开

```bash
$ echo {1..5} # 1 2 3 4 5
$ echo {Z..A} # Z Y X W V U T S R Q P O N M L K J I H G F E D C B A

# 可以嵌套
$ echo a{A{1..3},B{4..6}}b
# aA1b aA2b aA3b aB4b aB5b aB6b

# 可以串联
$ echo {a..c}-{1..3}
# a-1 a-2 a-3 b-1 b-2 b-3 c-1 c-2 c-3
```