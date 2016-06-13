## Python多线程

### threading模块

线程运行在进程内部，可以访问进程的所有内容。

**线程内尽量不要共享全局变量**，在需要修改共同数据的情况下，使用**线程锁**

threading模块的常用方法：

```python
threading.active_count()  # 返回当前线程对象Thread的个数
threading.current_thread()  # 返回当前的线程对象Thread
threading.current_thread().name # 返回当前线程的名称
```

简单实例：

```python
import datetime
import threading

class ThreadClass(threading.Thread):
	def run(self):
		now = datetime.datetime.now()
		print("%s says Hello World at time: %s" % (self.getName(), now))
        
for i in range(2):
	t = ThreadClass()
	t.start()

# Thread-1 says Hello World at time: 2008-05-13 13:22:50.252069
# Thread-2 says Hello World at time: 2008-05-13 13:22:50.252576
```

```python
# 启动一个线程
thread.start()

# 继承threading.Thread
import threading
class ThreadClass(threading.Thread):
	# 初始化方法
	def __init__(self, threadName):
		threading.Thread.__init__(self)
		self.threadName = threadName
	# 运行线程时会被调用的run方法
	def run(self):
		print('{0} is start'.format(self.threadName))
		
# 关闭一个进程
thread.join()
# join方法会暂时阻塞进程，等待子进程结束后再继续往下运行
```

### 线程锁

```python
import threading

lock = threading.Lock() # 线程锁应该只在主线程实例化一个

lock.acquire() # 调用线程锁，阻塞其他线程
lock.release() # 释放线程锁
```

### 使用实例

```python
import threading
import time

lock = threading.Lock()
thread_list = []

class ThreadClass(threading.Thread):
	def __init__(self, threadName):
		threading.Thread.__init__(self)
		self.threadName = threadName
	
	def run(self):
		lock.acquire()
		for i in range(0, 10):
			print('{}'.format(self.threadName), ':', str(i))
			time.sleep(2)
		lock.release()
	
for i in range(3):
	thread = ThreadClass('thread {}'.format(i))
	thread_list.append(thread)
	thread.start()

for thread in thread_list:
	if thread:
		thread.join()
```

输出结果：

```python
thread 0 : 0
...
thread 0 : 9
thread 1 : 0
...
thread 1 : 9
thread 2 : 0
...
thread 2 : 9
```