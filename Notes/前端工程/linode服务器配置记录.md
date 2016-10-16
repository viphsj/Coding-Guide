<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [linode服务器配置记录](#linode%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%95)
  - [初步配置](#%E5%88%9D%E6%AD%A5%E9%85%8D%E7%BD%AE)
  - [安装node](#%E5%AE%89%E8%A3%85node)
  - [github](#github)
  - [production](#production)
  - [nginx](#nginx)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## linode服务器配置记录

### 初步配置

```bash
# 创建新用户
# http://wiki.ubuntu.org.cn/%E6%96%B0%E5%BB%BA%E7%94%A8%E6%88%B7%E5%B9%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E7%AE%A1%E7%90%86%E7%BB%84
$ adduser ecmadao # 新建用户
$ gpasswd -a ecmadao sudo # 增加权限

# 创建SSH文件
# https://help.ubuntu.com/community/SSH/OpenSSH/Keys
$ mkdir ~/.ssh
$ chmod 700 ~/.ssh
$ ssh-keygen -t rsa
$ touch ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/authorized_keys

# 把本机信息添加到服务器
$ cd .ssh
$ sudo apt-get install vim
$ vim authorized_keys
# 然后加入自己本地电脑里 ~/.ssh/id_rsa.pub的内容
$ exit # 退出登录再重新登入，验证是否成功

$ cd /etc/ssh/
$ sudo vim sshd_config # 配置

$ sudo service ssh restart # 重启服务
$ pwd # 查看路径
```

### 安装node

```bash
$ sudo apt-get install curl
# https://nodejs.org/en/download/package-manager/
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
// $ sudo apt-get install -y npm

# http://debdas.com/install-nodejs-on-ubuntu/
$ node -v
# if error: /usr/sbin/node: No such file or directory
# then
$ export PATH=$PATH:/usr/bin
```

### github

```bash
# install & config git
$ sudo apt-get install git
$ git config --global user.name "Yourname"
$ git config --global user.email "email@example.com"

# https://segmentfault.com/a/1190000004317077
# http://www.cnblogs.com/hustskyking/p/problems-in-git-when-ssh.html
$ cd ~/.ssh
$ cat id_rsa.pub # 复制内容
```

登录github，进入`setting` -> `SSH and GPG keys` -> `new SSH key`，使用刚刚复制的内容新建一个public key。之后就可以正常的在服务器进行一系列的github远程操作

### production

生产环境下的配置文件不会添加到`git`里去，因此需要我们手动把配置文件通过`scp`命名push上去：

```bash
# 要把production.json文件push到线上
# http://www.cnblogs.com/no7dw/archive/2012/07/07/2580307.html
# scp file ssh:/path
$ scp /Users/ecmadao/production/config/production.json ecmadao@xxx.xxx:/home/ecmadao/production/config
```

### nginx

```bash
$ sudo apt-get update
$ sudo apt-get install nginx

$ cd /etc/nginx
$ ls
$ cd sites-enabled

# 配置完成之后
$ sudo service nginx restart
```

- [chown所有者权限设置](http://yanwen.org/doc/chown.html)
- [Install & Configure Node.JS & Nginx on Ubuntu](https://coderwall.com/p/hwkjba/install-configure-node-js-nginx-on-ubuntu)
- [How To Set Up a Node.js Application for Production on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)
- [ubuntu创建、删除文件及文件夹，强制清空回收站方法](http://www.cnblogs.com/lwm-1988/archive/2011/09/13/2174538.html)
- [在Linode上搭建Ghost的过程](http://www.justzht.com/zai-linodeshang-da-jian-ghostde-guo-cheng/)
- [Ubuntu:使用Fail2ban防止暴力破解SSH等服务](https://www.polarxiong.com/archives/ubuntu-fail2ban.html)
- [Using Fail2ban to Secure Your Server](https://www.linode.com/docs/security/using-fail2ban-for-security)