<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Redis](#redis)
  - [redis-cli](#redis-cli)
    - [key/value](#keyvalue)
    - [expire](#expire)
  - [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Redis

[Redis 命令](http://redisinaction.com/preview/chapter3.html)

- 开启与关闭

```bash
$ sudo service redis-server stop
$ sudo service redis-server start

# 安全退出
$ redis-cli shutdown
```

- 配置

```bash
# redis 安全性配置
# 配置文件默认位于 /etc/redis/redis.conf

bind 127.0.0.1 # 仅绑定本机 IP，全部注释则默认任意 IP 均可访问本机的 redis
port 6379 # 使用 6379 端口
logfile /var/log/redis/redis-server.log # 日志文件
requirepass your_passport_here # 设置密码

# 修改完成后，通过
$ redis-cli shutdown
$ sudo service redis-server start /etc/redis/redis.conf # 重启并应用新的配置文件

# 之后如果通过命令行连接 redis，则需
$ redis-cli -p new_port -a passport
# 例如，
# redis-cli -p 6380 -a 12345678 配置了 6380 端口，且密码为 12345678

# 如果允许外网 IP 访问，则在外部访问该服务器的 redis 时
$ redis-cli -h ip -p new_port -a passport
```

### redis-cli

```bash
$ redis-cli
> select 1 # 选 1 号数据库
> info # 查看 Redis 内存使用情况
```

#### key/value

> 键命名规范：
>
> 以 **对象类型:对象ID:对象属性** 的形式进行命名，多个单词之间使用 **.** 进行分隔

```bash
$ redis-cli

> set key1 'value'
> get key2 # value
> del key1 # 可以接多个 key 名来删除多个键，返回值是删除的键的个数
> exists key # 查看 key 是否存在，返回 1 代表存在，返回 0 代表不存在
> type key # 查看键值的数据类型

# keys 参数支持通配符，比如用 ? 匹配一个字符，用 * 匹配任意个字符
# 但 del 命令不支持通配符
> keys * # 获取所有 key
# 可以通过命令组合的方法来实现 del 通配符
$ redis-cli DEL `redis-cli KYES "key-*"`

# 更改键名
> set key1 'value1'
> rename key1 key2
> get key2 # value1
```

```bash
$ redis-cli

> randomkey # 随机获取一个 key
> dbsize # key 数目

> flushdb # 清除当前数据库的所有 keys
> flushall # 清除所有数据库的所有 keys
```

#### expire

```bash
$ redis-cli

> ttl key # 查看 key 的有效期，返回秒。当返回 -1 时，代表永久有效；返回 -2 时，代表 key 不存在
> expire key ttl # 给目标 key 设置 ttl，ttl 以秒为单位
> persist key # 将 key 设置为永久储存。成功返回 1，否则返回 0 (key 不存在或本身就是永久储存的)

# 重新给 key 赋值会清除其原本的过期时间
> set key1 value
> expire key1 2000
> ttl key1 # 2000
> set key1 value2
> ttl key1 # -1
```

### References

- http://www.awaimai.com/761.html
- https://ruby-china.org/topics/28094
- http://yijiebuyi.com/blog/bc2b3d3e010bf87ba55267f95ab3aa71.html
