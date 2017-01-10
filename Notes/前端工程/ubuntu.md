<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ubuntu](#ubuntu)
  - [新用户](#%E6%96%B0%E7%94%A8%E6%88%B7)
  - [node](#node)
  - [端口](#%E7%AB%AF%E5%8F%A3)
  - [sh](#sh)
  - [文件](#%E6%96%87%E4%BB%B6)
  - [目录](#%E7%9B%AE%E5%BD%95)
  - [系统](#%E7%B3%BB%E7%BB%9F)

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
```

### node

```bash
# 安装 nvm
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

# 配置
$ vim ~/.bashrc
# 增加如下内容
export NVM_DIR="/home/ecmadao/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
# 重启配置
$ source ~/.bashrc

# 安装 node
$ nvm ls-remote # 查看远程可安装的node版本
$ nvm install v5.11.1 # 安装指定版本
$ nvm ls # 查看本地所有版本
$ nvm alias default v5.11.1 # 将 v5.11.1 作为默认版本
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
$ cat # 输出文件内容
$ tail -n # 输出文件的倒数n行内容，不带参数则默认10行
$ tail -f # 随着文件内容的增加而输出，默认输出间隔为1s。可以用于查看实时log
```

```bash
$ touch filename # 创建文件
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
