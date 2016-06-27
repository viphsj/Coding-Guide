<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python爬虫踩坑](#python%E7%88%AC%E8%99%AB%E8%B8%A9%E5%9D%91)
  - [`urllib`](#urllib)
    - [打开url](#%E6%89%93%E5%BC%80url)
    - [设置request参数](#%E8%AE%BE%E7%BD%AErequest%E5%8F%82%E6%95%B0)
    - [`urllib.parse.urlencode`组合请求体](#urllibparseurlencode%E7%BB%84%E5%90%88%E8%AF%B7%E6%B1%82%E4%BD%93)
  - [使用`urllib`进行https网站的爬取](#%E4%BD%BF%E7%94%A8urllib%E8%BF%9B%E8%A1%8Chttps%E7%BD%91%E7%AB%99%E7%9A%84%E7%88%AC%E5%8F%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python爬虫踩坑

### `urllib`

#### 打开url

```python
from urllib import request
urllib.request.urlopen(url[,data[,proxies]])
```

返回一个文件对象，然后可以进行类似于文件对象的操作。urlopen()返回的对象提供如下方法：

	- `read(),readline(),readlines(),fileno(),close()` # 使用类似文件对象
	- `info()` # 返回一个httplib.HTTPMessage对象，表示远程服务器返回的头信息
	- `getcode()` 返回一个http状态码
	- `geturl()` 返回请求的URL

#### 设置request参数

```python
urllib.request.Request(url, data=None, headers={},origin_req_host=None, unverifiable=False, method=None)

req = urllib.request.Request(url, headers = {
  'GET': url,
  'Connection': 'Keep-Alive',
  'Accept': 'text/html, application/xhtml+xml, */*',
  'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
  'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11'
})

data = urllib.request.urlopen(req).read().decode('UTF-8')
```

#### `urllib.parse.urlencode`组合请求体

```python
# 传入一个字典query
urllib.parse.urlencode(query, doseq=False, safe='', encoding=None, errors=None)
```

```python
from urllib import parse
params = parse.urlencode({'spam':1,'eggs':2,'bacon':0})
print(params) # eggs=2&bacon=0&spam=1
```

- GET 方法

```python
import urllib.request
import urllib.parse
params = urllib.parse.urlencode({'spam': 1, 'eggs': 2, 'bacon': 0})
url = "http://www.musi-cal.com/cgi-bin/query?%s" % params
with urllib.request.urlopen(url) as f:
	print(f.read().decode('utf-8'))
```

- POST 方法

```python
import urllib.request
import urllib.parse
params = urllib.parse.urlencode({'spam': 1, 'eggs': 2, 'bacon': 0})
params = data.encode('ascii')
with urllib.request.urlopen("http://requestb.in/xrbl82xr", params) as f:
	print(f.read().decode('utf-8'))
```

### 使用`urllib`进行https网站的爬取

正常使用`urllib`库爬取网站的过程如下：

```python
import urllib
url = 'xxxxx'
req = urllib.request.Request(url, headers = {
  'GET': url,
  'Connection': 'Keep-Alive',
  'Accept': 'text/html, application/xhtml+xml, */*',
  'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
  'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11'
})
opener = request.urlopen(req, timeout=15)
data = opener.read().decode('UTF-8')
print(data)
```

然而面对https网站则会报错：

```python
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:646)>
```

那是因为Python自带的urllib库不支持ssl，解决方案如下：

```python
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
# 之后按照上面正常的爬虫步骤即可
```