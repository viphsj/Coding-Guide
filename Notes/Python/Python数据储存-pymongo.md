## Python数据储存-[pymongo](https://api.mongodb.com/python/current/index.html)

### [MongoDB](https://www.mongodb.com/)

MongoDB的基础用法可见博文[mongodb极简实践入门](https://github.com/StevenSLXie/Tutorials-for-Web-Developers/blob/master/MongoDB%20%E6%9E%81%E7%AE%80%E5%AE%9E%E8%B7%B5%E5%85%A5%E9%97%A8.md)

### [pymongo](https://api.mongodb.com/python/current/index.html)

#### install

```bash
# install
$ pip3 install pymongo
```

注意，MongoDB使用bson格式进行储存，但我们不需要额外的安装Python的bson包。`pip install bson`这种行为是绝对不推荐的。当数据通过pymongo储存的时候会被自动转换成bson格式。

#### 建立连接

```python
from pymongo import MongoClient

client = MongoClient('localhost', 27017) # 链接服务器
db = client.test_database # 选择一个数据库
# 如果数据库命名特殊，例如test-database，则可以通过
# collection = db['test-collection'] 来获取
collection = db.test_collection # 获取collection
```

**NOTE**

即便通过上述步骤实例化了mongodb数据库，也不会真的建立链接。只有在进行数据库操作的时候才会链接。因此，在上面的步骤中进行try/catch是无法捕获到错误信息的。应该在真正建立链接的时候进行捕获。

```python
# 看一眼pymongo拥有的错误信息
from pymongo import errors

print(dir(errors))

'''
['AutoReconnect', 'BSONError', 'BulkWriteError', 'CertificateError', 'CollectionInvalid', 'ConfigurationError', 'ConnectionFailure', 'CursorNotFound', 'DocumentTooLarge', 'DuplicateKeyError', 'ExceededMaxWaiters', 'ExecutionTimeout', 'InvalidBSON', 'InvalidDocument', 'InvalidId', 'InvalidName', 'InvalidOperation', 'InvalidStringData', 'InvalidURI', 'NetworkTimeout', 'NotMasterError', 'OperationFailure', 'PyMongoError', 'ServerSelectionTimeoutError', 'WTimeoutError', 'WriteConcernError', 'WriteError', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__']
'''
```

#### 数据操作

```python
from pymongo import MongoClient

# 先获取collection
client = MongoClient('localhost', 27017)
db = client.test_database
collection = db.test_collection
```

##### 插入数据

```python
# 创建一条数据
import datetime
post = {
	"author": "ecmadao",
	"text": "My first blog post!",
	"tags": ["mongodb", "python", "pymongo"],
	"date": datetime.datetime.utcnow()
}

# 插入数据，并返回ObjectId
object_id = collection.insert_one(post).inserted_id
print(object_id)
```

`insert_one`返回一个`InsertOneResult`的实例，而`inserted_id`则获取该实例的`_id`

##### 使用`find_one`进行简单查询

```python
# find_one()可用于获取collection中的第一条数据
collection.find_one()
# {u'date': datetime.datetime(...), u'text': u'My first blog post!', u'_id': ObjectId('...'), u'author': u'ecmadao', u'tags': [u'mongodb', u'python', u'pymongo']}

# find_one还可接受键值对作为查询参数，返回匹配的第一条结果
collection.find_one({"author": "ecmadao"})
{u'date': datetime.datetime(...), u'text': u'My first blog post!', u'_id': ObjectId('...'), u'author': u'ecmadao', u'tags': [u'mongodb', u'python', u'pymongo']}

# 如果查询不到结果，则返回空
```

##### 通过[ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)查询

通过ObjectId查询其实也是接受了ObjectId参数的find_one查询。但ObjectId有其独特之处需要注意：

```python
collection.find_one({"_id": object_id})
{u'date': datetime.datetime(...), u'text': u'My first blog post!', u'_id': ObjectId('...'), u'author': u'ecmadao', u'tags': [u'mongodb', u'python', u'pymongo']}
```

要注意的是，**ObjectId并不是一个String字符串。如果传入一个String作为`_id`的value，则无法获取到查询结果**。

```python
collection.find_one({"_id": str(object_id)})
# 空

# 可以把String转为ObjectId再进行查询
from bson.objectid import ObjectId
collection.find_one({"_id": ObjectId(str_object_id)})
```

##### 多条数据操作

**多条数据插入**

```python
new_posts = [{"author": "ecmadao",
			"text": "Another post!",
			"tags": ["bulk", "insert"],
			"date": datetime.datetime(2009, 11, 12, 11, 14)},
			{"author": "Eliot",
			"title": "MongoDB is fun",
			"text": "and pretty easy too!",
			"date": datetime.datetime(2009, 11, 10, 10, 45)}]
>>> result = collection.insert_many(new_posts)
>>> result.inserted_ids
[ObjectId('...'), ObjectId('...')]
```

`insert_many`接受一个列表作为参数，并返回一个实例列表，通过`inserted_ids`则可以获取到ObjectId组成的列表

**多条数据查询**

```python
for post in collection.find({"author": "ecmadao"}).sort("author")
	print(post)
```

可以对查询结果通过`.sort(key)`进行排序

##### 计数`count()`

```python
collection.count() # 获取collection里所以数据数目
collection.find(...).count()
```