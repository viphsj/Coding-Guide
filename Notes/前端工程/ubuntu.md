<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ubuntu](#ubuntu)
  - [新用户](#%E6%96%B0%E7%94%A8%E6%88%B7)
  - [node](#node)
  - [端口](#%E7%AB%AF%E5%8F%A3)
  - [sh](#sh)
  - [forever](#forever)

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

### forever 

```bash
# 查看 log
$ tail -f /home/ecmadao/.forever/79UJ.log
```