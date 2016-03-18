## Node.js初步 - API - Path

> 用于处理和转换文件路径的工具集,用于处理目录的对象

### Path API

#### path.normalize

```js
path.normalize(pathString)
```
> Normalize a string path, taking care of '..' and '.' parts.

```js
path.normalize('/foo/bar//baz/asdf/quux/..')
// returns
'/foo/bar/baz/asdf'
```

> If the path string passed as argument is a zero-length string then '.' will be returned, which represents the current working directory.
> 
> 当传递空string的时候返回`.`，代表了当前所在目录

#### path.parse & path.format

```js
path.parse(pathString)
```
> 将path解析为object

```js
path.parse('/home/user/dir/file.txt')
// returns
{
    root : "/",
    dir : "/home/user/dir",
    base : "file.txt",
    ext : ".txt",
    name : "file"
}
```

---

```js
path.format(pathObject);
```

> 与 `path.parse` 作用相反，将object合成为path

```js
path.format({
    root : "/",
    dir : "/home/user/dir",
    base : "file.txt",
    ext : ".txt",
    name : "file"
})
// returns
'/home/user/dir/file.txt'
```

#### path.relative & path.resolve

```js
path.relative(from, to);
```
> 解析出一段从from到to的相对路径

`path.relative` examples:

```js
// 用 path.relative 获取从 from 到 to 的相对路径

path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')
// returns
'..\\..\\impl\\bbb'

path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
// returns
'../../impl/bbb'
```
---

```js
path.resolve([from ...], to);
```
> 将 to 解析为一段绝对路径
> 
> If to isn't already absolute from arguments are prepended in right to left order, until an absolute path is found
> 
> 如果to不是一个相对于from 参数的绝对路径，to会被添加到from的右边，直到找出一个绝对路径为止
> 
> The resulting path is normalized

`path.resolve` examples:

```js
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
```
> 把它看做一系列 cd 命令

```js
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')

//相当于
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd
```

```js
path.resolve('/foo/bar', './baz')
// returns
'/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// returns
'/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// if currently in /home/myself/node, it returns
'/home/myself/node/wwwroot/static_files/gif/image.gif'
```

#### path.sep

> The platform-specific file separator. `\\` or `/`

```js
'foo/bar/baz'.split(path.sep)

// returns
['foo', 'bar', 'baz']
```

#### path.join

```js
path.join([path1][, path2][, ...])
```
> Join all arguments together and normalize the resulting path.
> 
> 将参数合并为 normalize 路径

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// returns
'/foo/bar/baz/asdf'

path.join('foo', {}, 'bar')
// throws exception
TypeError: Arguments to path.join must be strings
```
> 会忽略空参数。
> 
> 如果结果为空，则会返回 `.`，代表当前目录

#### path.isAbsolute

```js
path.isAbsolute(path);
```
> 判断是否是绝对路径

```js
path.isAbsolute('/foo/bar') // true
path.isAbsolute('/baz/..')  // true
path.isAbsolute('qux/')     // false
path.isAbsolute('.')        // false
```

#### path.dirname & path.extname

```js
path.dirname(pathString);
```
> 返回路径中的目录名

```js
path.dirname('/foo/bar/baz/asdf/quux')

// returns
'/foo/bar/baz/asdf'
```

---

```js
path.extname(pathString)
```
> 返回扩展名。从最后的一个`.`到路径末尾
> 
> 如果在路径的最后一部分中不存在`.`，或者以`.`开头的话，则返回空

```js
path.extname('index.html')
// returns
'.html'

path.extname('index.coffee.md')
// returns
'.md'

path.extname('index.')
// returns
'.'

path.extname('index')
// returns
''

path.extname('.index')
// returns
''
```

#### path.basename

```js
path.basename(pathString[, ext]);
```
> basename函数可返回路径中的最后一部分，并且可以对其进行条件排除

```js
path.basename('/foo/bar/baz/asdf/quux.html')
// returns
'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html') // 排除 .html
// returns
'quux'
```

