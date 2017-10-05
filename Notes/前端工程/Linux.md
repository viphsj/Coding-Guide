## Linux

### 文件和目录管理

#### 文件与目录

- `cd`
```bash
$ cd path # 切换目录到 path
$ cd - # 输出当前目录路径（不是完整的绝对路径）
```

- `mkdir`

```bash
$ mkdir dirname # 创建单个文件夹
$ mkdir -p dirpath # 创建联级目录结构
```

- `rmdir`

```bash
$ rmdir dir1 dirpath.. # 删除多个文件夹，但文件夹内必须为空
```

- `rm [option] target`

```bash
$ rm -r dirpath # 相当于 rmdir，删除一个联级目录结构
$ rm -f dir # 无论是否为空，强制删除
$ rm -rf
```

- `cp [option] source target`

```bash
$ cp -r dir1 dir2 # 复制一个目录
$ cp -i source target # 如果目标已经存在，会询问是否覆盖
```

- `mv [option] source target`

```bash
# 如果 target 是目录：
# 1. target 存在，则会把 source 放在 target 内
# 2. target 不存在，则相当于把 source 重命名
# 如果 target 是文件：
# 1. target 存在，则覆盖
# 2. target 不存在，则相当于重命名 source
```

#### 文档

- `cat [option] filename`

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

- `head [option] filename`
- `tail [option] filename`

```bash
$ head filename # 显示文件前 10 行
$ head -100 filename # 显示文件前 100 行

$ tail filename # 显示文件后 10 行
$ tail -100 filename # 显示文件后 100 行
$ tail -f filename # 动态的显示文件的最后 10 行
```

#### 属性和权限

- `ll`, `ls -l`

```bash
$ ll
-rw-r--r--    1 ecmadao  staff   8456 10  2 21:33 README.md
drwxr-xr-x  100 ecmadao  staff   3200 10  2 21:32 leetcode

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

# 第二列，表示链接占用的节点（inode）。如果文件是目录，则代表该目录下子目录数
# 第三列，代表文件所属主
# 第四列，代表文件所属组
# 第五列，代表文件大小
# 第六、七、八列，代表文件最后一次被修改的时间，依次为月，日，时间
# 第九列，文件名
```

- `chown [-R] user file`

```bash
# 把文件或目录归属到 user 下
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
$ chmod 750 test.md
# 把 test.md 文件权限设置为 rwxr-x---
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

```bash
# -atime +n/-n: 表示访问或执行时间大于或小于 n 天的文件。atime -> access time, 在读取文件或执行文件时被修改
# -ctime +n/-n: 表示写入、更改 inode 属性（如更改所有者、权限或者链接）时间大于或小于 n 天的文件。ctime -> create time, 在写入文件、更改所有者、权限或链接设置时随 inode 内容的更改而更改的
# -mtime +n/-n: 表示写入时间大于或小于 n 天的文件。mtime -> modified time, 在写入文件时随文件内容的更改而更改
$ find /tmp/ -mtime -1 # 查找 tmp 文件夹内修改时间小于 1 天的文件

# -name filename: 直接根据文件名搜索
$ find /tmp/ -name test.md

# -type filetype: 根据文件类型搜索，可使用的类型包括 f, b, c, d, l, s 等
$ find /tmp/ -type d # 搜索 tmp 文件夹下的搜索文件夹
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