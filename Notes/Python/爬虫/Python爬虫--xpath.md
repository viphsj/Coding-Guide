## Python爬虫--xpath

虽然`BeautifulSoup`可以使我们如同操作jQuery一样，选取网页上的各个元素，但是其通用性并没有那么高。比如要爬取很多个不同的网站，你就可能要一个一个的对网页结构进行分析。相比之下，使用`xpath`则可以较为通用的对指定字段进行匹配。

### install

[官网](http://lxml.de/index.html)

```bash
$ pip3 install -U lxml
```

[基本教程](http://www.w3school.com.cn/xpath/index.asp)

### 快速入门

