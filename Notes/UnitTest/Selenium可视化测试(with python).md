<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Selenium可视化测试(with python)](#selenium%E5%8F%AF%E8%A7%86%E5%8C%96%E6%B5%8B%E8%AF%95with-python)
  - [setup](#setup)
  - [quick start](#quick-start)
  - [导航](#%E5%AF%BC%E8%88%AA)
    - [与页面交互](#%E4%B8%8E%E9%A1%B5%E9%9D%A2%E4%BA%A4%E4%BA%92)
      - [获取页面上的元素：](#%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E4%B8%8A%E7%9A%84%E5%85%83%E7%B4%A0%EF%BC%9A)
      - [键盘操作](#%E9%94%AE%E7%9B%98%E6%93%8D%E4%BD%9C)
    - [填写表单](#%E5%A1%AB%E5%86%99%E8%A1%A8%E5%8D%95)
    - [拖拽](#%E6%8B%96%E6%8B%BD)
    - [切换窗口和frame](#%E5%88%87%E6%8D%A2%E7%AA%97%E5%8F%A3%E5%92%8Cframe)
    - [控制窗口大小](#%E6%8E%A7%E5%88%B6%E7%AA%97%E5%8F%A3%E5%A4%A7%E5%B0%8F)
    - [弹出对话框](#%E5%BC%B9%E5%87%BA%E5%AF%B9%E8%AF%9D%E6%A1%86)
    - [历史记录](#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
    - [Cookies](#cookies)
  - [运行脚本](#%E8%BF%90%E8%A1%8C%E8%84%9A%E6%9C%AC)
  - [定位DOM元素](#%E5%AE%9A%E4%BD%8Ddom%E5%85%83%E7%B4%A0)
  - [Waits](#waits)
    - [明确的wait](#%E6%98%8E%E7%A1%AE%E7%9A%84wait)
    - [含蓄的wait](#%E5%90%AB%E8%93%84%E7%9A%84wait)
  - [页面对象](#%E9%A1%B5%E9%9D%A2%E5%AF%B9%E8%B1%A1)
    - [测试案例](#%E6%B5%8B%E8%AF%95%E6%A1%88%E4%BE%8B)
  - [WebDriver API](#webdriver-api)
    - [webdriver](#webdriver)
    - [ActionChains](#actionchains)
    - [Alert](#alert)
    - [By](#by)
  - [Use with PhantomJS](#use-with-phantomjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Selenium可视化测试(with python)

[Selenium with Python](http://selenium-python.readthedocs.io/index.html)

### setup

```bash
$ sudo pip3 install selenium
```

配置 Chrome 驱动到环境变量

- download [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads)
- 或者在这里下载[ChromeDriver](https://npm.taobao.org/)
- 解压缩文件，把所得文件扔到/usr/bin目录下

### quick start

看一个简单的例子：

```python
from selenium import webdriver # 可用来模拟Firefox，Chrome，IE等浏览器
from selenium.webdriver.common.keys import Keys # 模拟键盘操作，例如回车、F1，Alt等按键

driver = webdriver.Chrome() # 生成一个Chrome浏览器的实例
# 同理，通过webdriver.Firefox()也可以生成一个Firefox的实例

driver.get("https://www.google.com") # get方法会打开一个URL，并且driver会等待到页面完全打开(onload时间触发完毕)，但如果页面上有大量的Ajax异步的话，driver就不知道什么时候才能真正的加载完毕

assert "Google" in driver.title # 断言测试，认为页面的title里含有Google。如果没有则抛出异常并退出测试

elem = driver.find_element_by_name("q")
# driver的find_element_by_XX方法，返回定位的DOM元素。在这个例子里是搜索框input

elem.clear() # 清空input
elem.send_keys("python") # 输出python
elem.send_keys(Keys.RETURN) # 模拟回车操作

assert "No results found" not in driver.page_source
print(driver.page_source) # driver.page_source返回页面HTML源代码

driver.close() # 终止进程，关闭当前窗口的tab。当浏览器只有这一个窗口的时候将会退出浏览器。
# 与这个API类似的方法是driver.quit()，它始终会关闭浏览器并终止进程。
```

再来看一个单元测试的例子：

```python
import unittest # Python的内置标准库，依赖于Java的JUnit
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class GoogleSearch(unittest.TestCase):
	def setup(self):
		"""
		setup是初始化时会调用的方法，我们在这里生成一个webdriver实例
		"""
		self.driver = webdriver.Chrome()
	
	def test_search_in_google(self):
		"""
		至关重要的一点：unittest扩展类的测试方法必须都以test作为开头
		"""
		driver = self.driver
		driver.get("https://google.com")
		self.assertIn("Google", driver.title) # 断言方法
		elem = driver.find_element_by_name("q")
		elem.send_keys("python")
		elem.send_keys(Keys.RETURN)
		assert "No results found" not in driver.page_source
		
	def tearDown(self):
		"""
		tearDown方法会在每个测试末尾调用，经常用来在这里做一些清理工作
		"""
		self.driver.close()

if __name__ == "__main__":
	unittest.main()
```

### 导航

通过`driver.get(url)`导航到某个页面。当页面上有很多Ajax的时候，driver无法准确的判断等待的时间，这个时候就可以使用`wait`

#### 与页面交互

##### 获取页面上的元素：

假设页面上有这么一个DOM：

```html
<input type="text" name="passwd" id="passwd-id" />
```

那么就可以通过如下方法获取它：

```python
element = driver.find_element_by_id("passwd-id")
element = driver.find_element_by_name("passwd")
element = driver.find_element_by_xpath("//input[@id='passwd-id']")

# 对于含有text的DOM元素，还可以：
element = driver.find_element_by_text(text)
# 但这个方式只能获取到精准匹配text的元素，否则抛出NoSuchElementException错误

element = driver.find_element_by_class_name(classname) # 返回首个class匹配的元素
element = driver.find_elements_by_class_name(classname) # 返回所有class匹配的元素，是个Array，可以通过[0],[1]等形式获取单个元素
```

##### 键盘操作

```python
element.send_keys("some text")
element.send_keys("some text", Keys.ARROW_DOWN)
```

每次添加的内容都会叠加到上次的内容上，因此最好在测试键盘操作通过`element.clear()`清空内容

#### 填写表单

上面讲到了操作input并输入/清空内容的操作，接着再获取select

```python
from selenium.webdriver.support.ui import Select
select = Select(driver.find_element_by_name('name'))

select.select_by_index(index)
select.select_by_visible_text("text")
select.select_by_value(value)

select.deselect_all() # 全部复原

# 获取select里的全部默认option
all_selected_options = select.all_selected_options # return一个list
# 获取全部option
options = select.options

# 提交表单
driver.find_element_by_id("submit").click()
# 或者通过submit方法
element.submit()
# 当调用该方法的DOM元素在一个form内部时，webdriver会从该元素出发知道寻找到一个闭合的form，并进行提交操作。如果DOM元素不在form内，则会抛出NoSuchElementException错误
```

#### 拖拽

可以使用拖拽来移动一个元素，或者把它放在其他元素内

```python
from selenium.webdriver import ActionChains

element = driver.find_element_by_name("source")
target = driver.find_element_by_name("target")

action_chains = ActionChains(driver)
action_chains.drag_and_drop(element, target).perform()
```

#### 切换窗口和frame

现代浏览器拥有不止一个窗口和frame，可以通过driver在不同窗口或frame间进行切换。

```python
driver.switch_to_window("windowName")
driver.switch_to_frame("frameName")

for handle in driver.window_handles:
	driver.switch_to_window(handle)
```

#### 控制窗口大小

```python
from selenium import webdriver

# get initial window size
driver = webdriver.Firefox()
print driver.get_window_size()

# set window size
driver.set_window_size(480, 320)
print driver.get_window_size()

# maximize window
driver.maximize_window()
print driver.get_window_size()

driver.quit()
```

#### 弹出对话框

```python
alert = driver.switch_to_alert()
alert.text() # 弹出里的文本
alert.accept() # 点击确认
alert.dismiss() # 点击取消
```

#### 历史记录

除了`driver.get()`可以导航到一个页面，通过driver内的历史记录系统也可以达到这个效果

```python
driver.forward()
driver.back()
```

#### Cookies

```python
# Go to the correct domain
driver.get("http://www.example.com")

# Now set the cookie. This one's valid for the entire domain
cookie = {‘name’ : ‘foo’, ‘value’ : ‘bar’}
driver.add_cookie(cookie)

# And now output all the available cookies for the current URL
driver.get_cookies()
```

### 运行脚本

有时候，我们无法直接明确的通过操作DOM来达到目的，这时可能需要让`selenium`运行一段JS脚本。

比如，一个通过异步加载载入数据的页面，只有在用户滚动到最底部时才会加载下一页。这时我们就需要让浏览器滚动到底部去：

```python
# ....
js = "document.body.scrollTop=100000"
driver.execute_script(js)
```

### 定位DOM元素

```python
# 定位单个元素
find_element_by_id
find_element_by_name
find_element_by_xpath
find_element_by_link_text
find_element_by_partial_link_text
find_element_by_tag_name
find_element_by_class_name
find_element_by_css_selector

# 定位多个DOM元素，返回一个list
find_elements_by_name
find_elements_by_xpath
find_elements_by_link_text
find_elements_by_partial_link_text
find_elements_by_tag_name
find_elements_by_class_name
find_elements_by_css_selector

# 如果有一个HTML长这样：
<html>
 <body>
  <p class="content">Site content goes here.</p>
</body>
<html>

# 那么通过find_element_by_css_selector获取class为content的p则是这样：
content = driver.find_element_by_css_selector('p.content')
```

### Waits

当网页上存在异步操作的时候，可能会造成网页元素渲染结束时间的不统一。而当我们去获取一个页面上还不存在的元素(还没渲染好)时，就会抛出`ElementNotVisibleException`错误。在这种情况下，我们可以通过wait来进行线程的阻塞，知道页面渲染好再进行下一步操作。

#### 明确的wait

明确的wait指明了等待的时间，以及触发等待结束的条件

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
driver.get("http://somedomain/url_that_delays_loading")
try:
	# 等待10秒知道until的条件成立，否则抛出TimeoutException错误
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "myDynamicElement"))
    )
finally:
    driver.quit()
```

`WebDriverWait(driver, time).until()`

**until的内置条件：**

```python
title_is
title_contains
presence_of_element_located
visibility_of_element_located
visibility_of
presence_of_all_elements_located
text_to_be_present_in_element
text_to_be_present_in_element_value
frame_to_be_available_and_switch_to_it
invisibility_of_element_located
element_to_be_clickable - it is Displayed and Enabled.
staleness_of
element_to_be_selected
element_located_to_be_selected
element_selection_state_to_be
element_located_selection_state_to_be
alert_is_present

# example
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)
element = wait.until(EC.element_to_be_clickable((By.ID,'someid')))
```

#### 含蓄的wait

指定等待时间，只是单纯的阻塞目标时间长短的线程

```python
from selenium import webdriver

driver = webdriver.Firefox()
driver.implicitly_wait(10) # 以秒为单位
driver.get("http://somedomain/url_that_delays_loading")
myDynamicElement = driver.find_element_by_id("myDynamicElement")
```

### 页面对象

页面对象是selenium所推崇的一种测试的设计模式。一个页面对象代表着一个与你的测试进行关联的网页。

使用页面对象有几个好处：

- 在大量的测试中复用代码
- 减少重复代码
- 网页样式变动时只需要修改一处的测试代码

#### 测试案例

在python.org上搜索一段文字，并确保找到搜索结果

```python
import unittest
from selenium import webdriver
import page # 别慌，这不是第三方库。后面会编写page.py

class PythonOrgSearch(unittest.TestCase):
    """展现page工作方式的简单例子"""

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://www.python.org")

    def test_search_in_python_org(self):
        """
        python.org搜索功能的测试，搜索"pycon"并展现结果。
        需要注意的是，测试并不会在搜索结果中期待一个特定的值，而是断言它不会为空
        """

        # 加载主页面，在这个例子里是Python.org.
        main_page = page.MainPage(self.driver)
        assert main_page.is_title_matches("Python"), "python.org title doesn't match."
        # 在输入框内填入"pycon"
        main_page.search_text_element = "pycon"
        main_page.click_go_button()
        search_results_page = page.SearchResultsPage(self.driver)
        # 断言结果不为空
        assert search_results_page.is_results_found(), "No results found."

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
```

page.py

```python
from element import BasePageElement # 同样是自定义包
from locators import MainPageLocators # 同样是自定义包

class SearchTextElement(BasePageElement):
    """从一个特点的搜索框中获取搜索的文字"""

    #The locator for search box where search string is entered
    locator = 'q'


class BasePage(object):
    """初始化base page，它会被其他所有page继承"""

    def __init__(self, driver):
        self.driver = driver


class MainPage(BasePage):
    """测试中出现的首要页面I.e. Python.org"""

    #Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self, title):
        """断言title在driver.title内"""
        return title in self.driver.title

    def click_go_button(self):
        """Triggers the search"""
        element = self.driver.find_element(*MainPageLocators.GO_BUTTON)
        element.click()


class SearchResultsPage(BasePage):
    """Search results page action methods come here"""

    def is_results_found(self):
        # Probably should search for this text in the specific page
        # element, but as for now it works fine
        return "No results found." not in self.driver.page_source
```

element.py

```python
from selenium.webdriver.support.ui import WebDriverWait


class BasePageElement(object):
    """所有page类的基础"""

    def __set__(self, obj, value):
        """Sets the text to the value supplied"""
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element_by_name(self.locator))
        driver.find_element_by_name(self.locator).send_keys(value)

    def __get__(self, obj, owner):
        """Gets the text of the specified object"""
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element_by_name(self.locator))
        element = driver.find_element_by_name(self.locator)
        return element.get_attribute("value")
```

locators.py

```python
from selenium.webdriver.common.by import By # 可用于定位元素的API

class MainPageLocators(object):
    """A class for main page locators. All main page locators should come here"""
    GO_BUTTON = (By.ID, 'submit')

class SearchResultsPageLocators(object):
    """A class for search results locators. All search results locators should come here"""
    pass
```

### WebDriver API

#### webdriver

```python
from selenium import webdriver

webdriver.Firefox
webdriver.Chrome
webdriver.Ie
webdriver.Opera
webdriver.PhantomJS
webdriver.Remote

from selenium.webdriver.common.keys import Keys # 获取键盘
from selenium.webdriver import ActionChains
from selenium.common.exceptions import [TheNameOfTheExceptionClass]
```

#### ActionChains

```python
# ActionChains API
action_chains = ActionChains(driver)

action_chains.click(on_element=None)
click_and_hold(on_element=None)
context_click(on_element=None) # 相当于右键点击
double_click(on_element=None)

drag_and_drop(source, target) # 把一个元素拖拽到另一个元素里
drag_and_drop_by_offset(source, xoffset, yoffset)

key_down(value, element=None) # 按下一个按键，并不松开，常用于Control, Alt and Shift按键
key_up(value, element=None) # 松开按键
ActionChains(driver).key_down(Keys.CONTROL).send_keys('c').key_up(Keys.CONTROL).perform()

perform() # 运行动作

send_keys(*keys_to_send) # 传入按键内容，赋给当前聚焦的元素
send_keys_to_element(element, *keys_to_send)
```

#### Alert

```python
from selenium.webdriver.common.alert import Alert
from selenium import webdriver

driver = webdriver.Chrome()

Alert(driver).accept()
Alert(driver).dismiss()
Alert(driver).send_keys(keysToSend)
Alert(driver).text

# 弹窗的另一种方法
alert = driver.switch_to_alert()
```

#### By

```python
from selenium.webdriver.common.by import By

"""
CLASS_NAME = 'class name'
CSS_SELECTOR = 'css selector'
ID = 'id'
LINK_TEXT = 'link text'
NAME = 'name'
PARTIAL_LINK_TEXT = 'partial link text'
TAG_NAME = 'tag name'
XPATH = 'xpath'
"""

# example
driver.find_element(By.ID, 'submit')
driver.find_element(By.NAME, 'ecmadao')
```

### Use with PhantomJS

[Is there a way to use PhantomJS in Python?](http://stackoverflow.com/questions/13287490/is-there-a-way-to-use-phantomjs-in-python)

一个简单的例子

```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.PhantomJS()
driver.set_window_size(1024, 768)
driver.get('https://www.google.com')
driver.save_screenshot('google.png')

search_input = driver.find_element_by_name('q')
search_input.send_keys("python")
search_input.send_keys(Keys.RETURN)

print(driver.page_source)
driver.close()
```

不过，期间并不会生成浏览器界面。。