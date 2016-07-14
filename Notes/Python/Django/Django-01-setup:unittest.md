<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Django-01-setup/unittest](#django-01-setupunittest)
  - [setup](#setup)
  - [unittest](#unittest)
    - [功能测试](#%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95)
    - [单元测试](#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Django-01-setup/unittest

### setup

```bash
# install
$ pip3 install django

# setup
# 新建项目
$ django-admin.py startproject my_django_app
$ cd my_django_app
# $ python3 manage.py migrate
# 开跑
# my_django_app/
$ python3 manage.py runserver

# 新建一个模块
# my_django_app/
$ python3 manage.py startapp articles
```

新建模块之后，需要在`settings.py`内注册：

```python
# my_django_app/my_django_app/settings.py
INSTALLED_APPS = [
  # ....
  'articles'
]
```

### [unittest](https://docs.python.org/3.5/library/unittest.html)

本着测试先行的TDD原则，配置好Django中的单元测试/功能测试

- 功能测试往往从用户的角度出发，利用selenium进行UI/交互上的测试
- 单元测试则是从程序内部走起，测试函数内部逻辑

```bash
$ pip3 install nose
```

#### 功能测试

```python
# my_django_app/test/test_app.py
import unittest
from selenium import webdriver


class TestSetup(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()

    def tearDown(self):
        self.browser.quit()

    def test_setup(self):
        self.browser.get('http://localhost:8000')
        self.assertIn('Django', self.browser.title)
```

#### 单元测试

```python
# my_django_app/articles/tests.py
from django.test import TestCase


class TestArticles(TestCase):
    def test_math(self):
        self.assertEqual(1 + 1, 2)
```

```bash
# nose单元测试如果不配合django-nose总是会报错
$ pip3 install django-nose
```

by the way，如果不安装django-nose也可以，只需要每次运行

```bash
# my_django_app/
$ python3 manage.py test
```

就可以运行模块内的单元测试。但是无法调用到外部的功能测试。为了能够一行命令运行两种测试，则需要安装[`django-nose`](https://django-nose.readthedocs.io/en/latest/)，然后进行一些配置：

```python
# my_django_app/my_django_app/settings.py
INSTALLED_APPS = [
  # ...
  'django_nose'
]

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
```

然后跑个测试：

```bash
# my_django_app/
$ python3 manage.py test
```

bingo!