## Selenium可视化测试(with python)

### setup

```bash
$ sudo pip3 install selenium
```

配置 Chrome 驱动到环境变量

- download [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads)
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
# 但这个方式只能获取到精准匹配text的元素，否则报NoSuchElementException错误
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
# 当调用该方法的DOM元素在一个form内部时，webdriver会从该元素出发知道寻找到一个闭合的form，并进行提交操作。如果DOM元素不在form内，则会报NoSuchElementException错误
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