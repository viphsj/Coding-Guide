## Python爬虫--BeautifulSoup

使用BeautifulSoup库解析HTML

### quick start

```bash
# install
sudo pip3 install beautifulsoup4
```

```python
# import
from bs4 import BeautifulSoup

soup = BeautifulSoup(htmlstring, "html.parser")
```

| bs中的对象类型        | 含义                                       | 常用方法                              |
| --------------- | ---------------------------------------- | --------------------------------- |
| Tag             | html标签。只能获取到第一个标签。Type为bs4.element.Tag，可以通过str()转化为string | `soup.tag.name`, `soup.tag.attrs` |
| NavigableString | 通过`.string`获取到的标签内容，类型为bs4.element.NavigableString | `soup.tag.string`                 |
| BeautifulSoup   | 一个文档的全部内容                                | `soup.name`(document)             |
| Comment         | 特殊类型的 NavigableString 对象，输出的内容不包括注释符号    |                                   |

### 遍历DOM

#### 获取节点内容

- `soup.tag.string`
  - 如果tag只有一个 NavigableString 类型子节点,那么这个tag可以使用 .string 得到子节点
  - 如果一个tag仅有一个子节点,那么这个tag也可以使用 .string 方法,输出结果与当前唯一子节点的 .string 结果相同
  - 如果tag包含了多个子节点,tag就无法确定，string 方法应该调用哪个子节点的内容, .string 的输出结果是 None

- `soup.tag.strings`
  - 获取多个子节点内容。需遍历获取：
  - `for string in soup.tag.strings`
  - 其结果会包含空行或空格

- `soup.tag.stripped_strings`
  - 效果类似于`.strings`
  - 获取多个子节点内容，但不含空行或空格

#### 获取子节点

- `soup.tag.contents`
  - 将tag的**直接子节点**以list列表的方式输出
  - **节点内的空白元素(如换行符\n)也会成为列表的一员输出**

- `soup.tag.children`
  - 返回由Tag子节点组成的生成器对象，只能获取到**直接子节点**
  - `for child in soup.tag.children`

- `soup.tag.descendants`
  - 返回由Tag子节点组成的生成器对象，获取到**全部子节点**
  - `for child in soup.tag.descendants`

#### 获取父节点

- `soup.tag.parent` # 获取单个父节点
- `soup.tag.parents` # 获取全部父节点

#### 获取兄弟节点

- `soup.tag.next_sibling` # 下一个兄弟节点
- `soup.tag.previous_sibling` # 上一个兄弟节点
- 若节点不存在，则返回 None

#### 获取前后节点

- 单个前后节点
  - `soup.tag.next_element`
  - `soup.tag.previous_element`

- 全部前后节点
  - `soup.tag.next_elements`
  - `soup.tag.previous_elements`

与 兄弟节点 不同，它并不是针对于兄弟节点，而是**按照层次往内部深入**

```python
html = '<head><title>The Dormouse\'s story</title></head>'
soup = BeautifulSoup(html, "html.parser")
soup.head.next_element # <title>The Dormouse's story</title>
soup.title.next_element # The Dormouse's story
```

### 搜索DOM

#### 全DOM搜索

 - `find_all( name , attrs , recursive , text , **kwargs )` 返回找到的全部元素，为一个**列表**
 - `find( name , attrs , recursive , text , **kwargs )` 返回找到的第一个元素

- name：tag名，可以传入字符串、正则、列表、true、方法
- attrs：属性，{key: value}或者id=XX(class=XX)这样
- text：文档中的字符串内容，参数接受 字符串 , 正则表达式 , 列表, True
- limit：返回的数目上线
- recursive：是否搜索Tag的所有子孙节点，默认为True

```python
soup.find_all('a', attrs={href: '/'})
soup.find_all('a', id="test")

# HTML5中的 data-* 属性不能直接在find_all()里定义
# 但是可以通过 find_all() 方法的 attrs 参数定义一个字典参数来搜索包含特殊属性的tag
soup.find_all(attrs={"data-foo": "value","id":"XX"})
```

#### 相邻节点搜索

- `find_parents()`
- `find_parent()`

- `find_next_siblings()`
- `find_next_sibling()`

- `find_previous_siblings()`
- `find_previous_sibling()`

- `find_all_next()`
- `find_next()`

- `find_all_previous()`
- `find_previous()`