## Node.js初步 - API - file system

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

```js
fs.rename(oldPath, newPath, callback);

fs.renameSync(oldPath, newPath);
```

callback是失败时的回调，接收可能的异常信息作为参数

