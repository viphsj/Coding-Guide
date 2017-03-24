<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Node.js初步 - API - File System](#nodejs%E5%88%9D%E6%AD%A5---api---file-system)
  - [file system](#file-system)
  - [file system class](#file-system-class)
  - [file system api](#file-system-api)
    - [access](#access)
    - [exists](#exists)
    - [appendFile](#appendfile)
    - [rename](#rename)
    - [close](#close)
    - [createReadStream](#createreadstream)
    - [createWriteStream](#createwritestream)
    - [open](#open)
    - [read](#read)
    - [write](#write)
    - [readdir](#readdir)
    - [readFile](#readfile)
    - [writeFile](#writefile)
    - [rename](#rename-1)
    - [rmdir & mkdir](#rmdir--mkdir)
    - [unlink](#unlink)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Node.js初步 - API - File System

node.js中提供一个名为fs的模块来支持I/O操作，fs模块的文件I/O是对标准POSIX函数的简单封装

### file system

> 文件操作的API有异步/同步两种
> 
> 在异步操作API后加上Sync，并去除callback，即可得同步操作API
> 
> eg.
> 
> fs.readFile(file[, options], callback);
> 
> fs.readFileSync(file[, options]);
> 
> 
> fs.open(path, flags[, mode], callback);
> 
> fs.openSync(path, flags[, mode]);

---

### file system class

- `fs.FSWatcher`
	- Event: `change`
	- Event: `error`
	- Function: `watcher.close()`

`fs.FSWatcher` 是 `fs.watch()` 返回的class类型

- `fs.ReadStream`
	- Event: `open`
		- 当文件的流被打开时触发
	- Property: `readStream.path`
		- 流的路径

`fs.ReadStream` 是可读的数据流

- `fs.WriteStream`
	- Event: `open`
		- 当文件的流被打开时触发
	- Property: `writeStream.bytesWritten`
		- 已写入的字节数。不包括还在队列中的未写入字节
	- Property: `writeStream.path`
		- 流被写入的路径

`fs.WriteStream` 是可写的数据流

- `fs.Stats`
	- Function: `stats.isFile()`
	- Function: `stats.isDirectory()`
	- Function: `stats.isBlockDevice()`
	- Function: `stats.isCharacterDevice()`
	- Function: `stats.isSymbolicLink()`
	- Function: `stats.isFIFO()`
	- Function: `stats.isSocket()`

`fs.Stats` 是 `fs.stat()`, `fs.lstat()` 和 `fs.fstat()` 以及他们对应的同步版本返回的对象

---

### file system api

#### access

```js
fs.access(path[, mode], callback);

fs.accessSync(path[, mode]);
```

> Tests a user's permissions for the file specified by `path`
> 
> `mode` is an optional integer that specifies the accessibility checks to be performed
> 
> 检查用户对文件操作的权限。`mode`传入代表文件操作的`fs`常量

`mode`的取值：

- fs.F_OK
	- default.文件可见。常用于确定文件是否存在
- fs.R_OK
	- 文件可读
- fs.W_OK
	- 文件可写
- fs.X_OK
	- 文件可删除（Windows下无效）

---

#### exists

> 检查一个文件是否存在

```js
fs.existe(path, callback);

fs.existsSync(path);
```
- callback(exists); exists为是否存在的布尔值

```js
var fs= require("fs");
 
fs.exists('/etc/passwd', function (exists) {
  console.log(exists ? "存在" : "不存在!");
});
```

---

#### appendFile

```js
fs.appendFile(filename, data, [options], callback);

fs.appendFileSync(filename, data, [options]);
```

> Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer
> 
> 将data添加到file文件后面。如果文件不存在就新建文件。data可以是string或者buffer

`options`的配置（可以是String或者Object）：

- `encoding`: String | Null, default = 'uft8'
- `mode`: Number, default = 0o666
- `flag`: String, default = 'a'

example: 

```js
fs.appendFile('message.txt', 'data to append', 'utf8', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
```

> Note :
> 
> Any specified file descriptor has to have been opened for appending.
> 
> Specified file descriptors will not be closed automatically.

---

#### rename

```js
fs.rename(oldPath, newPath, callback);

fs.renameSync(oldPath, newPath);
```

callback是失败时的回调，接收可能的异常信息作为参数

---

#### close

```js
fs.close(fd, callback)

fs.closeSync(fd)
```

---

#### createReadStream

```js
fs.createReadStream(path[, options])
```
Returns a new ReadStream object

> options is an object or string with the following defaults:
> 
> options可以是一个对象或者字符串，如下是其默认配置
> 
> options can include start and end values to read a range of bytes from the file instead of the entire file
> 
> options可以包含start和end值，以便读取file中的一段数据而不必全部读取

```js
{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
```

> If `fd` is specified, ReadStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted.
> 
> 如果特定指明了`fd`，`ReadStream`则会忽略`path`参数并使用指定的file descriptor(fd)，那么open行为并不会发生
> 
> If `autoClose` is false, then the file descriptor won't be closed, even if there's an error. 
> 
> 当`autoClose`为false的时候，即便发生错误file descriptor也不会被关闭
> 
> If `autoClose` is set to true (default behavior), on error or end the file descriptor will be closed automatically.
> 
> 当`autoClose`为true时，file descriptor会在发生错误或结束时自动关闭
> 
> If options is a string, then it specifies the encoding.
> 
> 如果options为字符串，那么应该是指明encoding的字符串

---

#### createWriteStream

```js
fs.createWriteStream(path[, options])
```

Returns a new WriteStream object

> options is an object or string with the following defaults:

```js
{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
```

> options may also include a start option to allow writing data at some position past the beginning of the file.
> 
> options可以包含一个起始值，用于指明从文件的哪个位置开始写入数据
> 
> Modifying a file rather than replacing it may require a flags mode of r+ rather than the default mode w.
> 
> 如果是继续写入数据而不是替换原有数据的话，需要将`flags`设置为`r+`而不是`w`
> 
> `autoClose`、`fd`特性和`fs.createReadStream()`中相同
> 
> If options is a string, then it specifies the encoding.
> 
> 如果options为字符串，那么应该是指明encoding的字符串

---

#### open

```js
fs.open(path, flags[, mode], callback)

fs.openSync(path, flags[, mode])
```

> flags can be the following:

- `r` 读取文件。文件不存在的时候会报错
- `r+` 读写文件。文件不存在的时候会报错
- `rs` 以同步模式读取文件。请使用`fs.openSync()`
- `rs+` 以同步模式读写文件
- `w` 写文件。文件不存在的时候则会新建文件
- `wx` 与`w`功能类似，但是`path`已存在的时候则无效
- `w+` 读写文件。文件不存在的时候则会新建文件
- `wx+` 与`w+`功能类似，但是`path`已存在的时候则无效
- `a` 在文件末尾续写。当文件不存在的时候则新建
- `ax` 与`a`功能类似，但是`path`已存在的时候则无效
- `a+` 读取/续写文件。当文件不存在的时候则新建
- `ax+` 与`a+`功能类似，但是`path`已存在的时候则无效

---

#### read

```js
fs.read(fd, buffer, offset, length, position, callback)
```

Read data from the file specified by fd.

- `buffer` 缓冲区，数据将写入到这里
- `offset` 向缓冲区写入的数据量
- `length` integer，写入数据的字节数
- `position` integer，指定了从哪里开始读取文件。当值为`null`的时候
- `callback(err, bytesRead, buffer)` 分别为错误、读取的字节和缓冲区

---

#### write

```js
fs.write(fd, buffer, offset, length[, position], callback)
fs.writeSync(fd, buffer, offset, length[, position])

fs.write(fd, data[, position[, encoding]], callback)
fs.writeSync(fd, data[, position[, encoding]])
```

---

#### readdir

```js
fs.readdir(path, callback)

fs.readdirSync(path)
```

> 读取path路径所在目录下的所有文件
> 
> callback接收两个参数：error和files
> 
> 其中files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'

---

#### readFile

```js
fs.readFile(file[, options], callback)

fs.readFileSync(file[, options])
```

- `file`
- `options` Object或String
	- `encoding` String或null, default = null
	- `flag` default = `r`
- `callback(error, data)`

```js
fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.readFile('/etc/passwd', 'utf8', callback);
```

---

#### writeFile

```js
fs.writeFile(file, data[, options], callback)
fs.writeFileSync(file, data[, options])
```
- `file`
- `data`
- `options`
	- `encoding` String | Null, default = 'utf8'
	- `mode` Number, default = 0o66
	- `flag` String, default = `w`
- `callback(error)` // 回调只有error

```js
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

> 如果文件已经存在则会被替换掉
> 
> *it is unsafe to use fs.writeFile multiple times on the same file without waiting for the callback*

---

#### rename

```js
fs.rename(oldPath, newPath, callback)

fs.renameSync(oldPath, newPath)
```

---

#### rmdir & mkdir

```js
// 删除目录
fs.rmdir(path, callback)
fs.rmdirSync(path)

// 创建目录
fs.mkdir(path, [mode], callback)
fs.mkdirSync(path, [mode])
```

- `mode` 权限，默认为0777，表示所有用户都可进行读/写/执行的操作
- `callback(error)`

---

#### unlink

```js
fs.unlink(path, callback);

fs.unlinkSync(path);
```
> 删除文件

```js
var fs = require('fs');
 
fs.unlink(文件, function(err) {
  if (err) throw err;
  console.log('successfully deleted');
});
```