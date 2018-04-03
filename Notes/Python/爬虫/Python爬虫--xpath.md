<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Python爬虫--xpath](#python%E7%88%AC%E8%99%AB--xpath)
  - [install](#install)
  - [快速入门](#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
    - [匹配的路径](#%E5%8C%B9%E9%85%8D%E7%9A%84%E8%B7%AF%E5%BE%84)
    - [匹配符](#%E5%8C%B9%E9%85%8D%E7%AC%A6)
    - [栗子](#%E6%A0%97%E5%AD%90)
  - [附加匹配](#%E9%99%84%E5%8A%A0%E5%8C%B9%E9%85%8D)
  - [资料](#%E8%B5%84%E6%96%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Python爬虫--xpath

虽然`BeautifulSoup`可以使我们如同操作jQuery一样，选取网页上的各个元素，但是其通用性并没有那么高。比如要爬取很多个不同的网站，你就可能要一个一个的对网页结构进行分析。相比之下，使用`xpath`则可以较为通用的对指定字段进行匹配。

### install

```bash
$ pip3 install -U lxml
```

### 快速入门

#### 匹配的路径

- `/` 节点之间的分隔符
- 以`/`开头的匹配代表绝对路径，从根节点开始匹配
- `.`代表当前节点
- 直接以节点名开头的匹配代表相对路径，从当前节点开始匹配
- 直接以`./`开头的匹配代表相对路径，从当前节点开始匹配
- `..`代表当前节点的父节点，已它作为开头的匹配也是相对匹配

#### 匹配符

- `*`代表匹配所有
- `//`代表匹配任意位置的目标节点、
- `/`开头，代表匹配绝对路径下的某个节点
- `@`代表匹配某个属性，`@*`可代表匹配任意属性
- `nodename`开头，代表匹配相对路径下的某个节点

#### 栗子

```python
from lxml import etree

text = '''
<div>
	 <ul>
		<li class="item"><a href="link1.html">1</a></li>
		<li class="item" data-class="item"><a href="link2.html">2</a></li>
		<li class="item" data-id="3"><a href="link3.html">3</a></li>
		<li class="item" data-id="4"><a href="link4.html">4</a></li>
		<li class="item"><a href="link5.html">5</a></li>
	</ul>
</div>
'''

html = etree.HTML(text)
# 匹配到所有的 li
for li in html.xpath('//li'):
	# 匹配每个 li 节点下的 a
	# or print(li.xpath('a'))
	print(li.xpath('./a'))
```

上例输出：

```bash
[<Element a at 0x270678c>]
[<Element a at 0x270678c>]
[<Element a at 0x270678c>]
[<Element a at 0x270678c>]
[<Element a at 0x270678c>]
```

也可以使用`@`来匹配或者获取属性：

```python
# 匹配有 data-id 这个属性的 li
target_lis = html.xpath('//li[@data-id]')
print(target_lis)
# [<Element li at 0x28d2f2c>, <Element li at 0x458978c>]

# 匹配 data-id 为3的 li
target_li = html.xpath("//li[@data-id='3']")
print(target_li)
# [<Element li at 0x28d2f2c>]

# 匹配任意有属性值的 li
target_lis = html.xpath('//li[@data-*]')
print(target_lis)
# [<Element li at 0x2cf726c>, <Element li at 0x2cf78ac>, <Element li at 0x28d2eac>, <Element li at 0x2cf71ec>, <Element li at 0x2cf718c>]

# 获取有 data-id 的 li 的 a 的 link
target_lis = html.xpath('//li[@data-id]')
for li in target_lis:
	link = li.xpath('./a/@href')
	print(link)
# ['link3.html']
# ['link4.html']
```

### 附加匹配

- `[number]` 匹配第number个节点，从1开始计数
- `[last()]` 匹配最后一个节点
- `[last()-number]` 匹配倒数第 number + 1 个节点
- `[position()<number]` 匹配前 number - 1 个节点
- `|` 匹配多个路径
- `node()` 匹配所有节点
- `text()` 匹配节点文本
- `[contains(where, what)]` 匹配 where 里包含了 what 的节点

举栗子：

```python
from lxml import etree
text = '''
<div>
	 <ul>
		<li class="item"><a href="link1.html">1</a><a href="link1.html">1</a></li>
		<li class="item"><a href="link2.html">2</a></li>
		<li class="item"><a href="link3-1.html"><a href="link3-2.html">3</a></a></li>
		<li class="item"><a href="link4-1.html">4-1<a href="link4-2.html">4-2</a></a></li>
	</ul>
</div>
'''
html = etree.HTML(text)
lis = html.xpath('//li')
for li in lis:
	# 获取 li 下的所有子节点，包括嵌套的子节点也可以查找出来
	print(li.xpath('./node()'))
	# 输出所有子节点下的文本，只能查找出第一层子节点的文本
	print(li.xpath('./node()/text()'))

print('=================')

for li in lis:
	print(li.xpath("./*[contains(@href, 'link3-1.html')]"))
```

输出：

```bash
[<Element a at 0x1f0686c>, <Element a at 0x1f0622c>]
['1', '1']
[<Element a at 0x1f0672c>]
['2']
[<Element a at 0x1f0614c>, <Element a at 0x1f0686c>]
['3']
[<Element a at 0x1f061ec>, <Element a at 0x1f0638c>]
['4-1', '4-2']
=================
[]
[]
[<Element a at 0x27061ec>]
[]
```

### 资料

- [lxml官网](http://lxml.de/index.html)
- [xpath基本教程](http://www.w3school.com.cn/xpath/index.asp)
- [xpath路径表达式笔记](http://www.ruanyifeng.com/blog/2009/07/xpath_path_expressions.html)