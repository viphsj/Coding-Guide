## Python语言及其应用-2

### Python标准库

#### `setdefault()`&`defaultdict()`

```python
d.setdefault(key, defaultvalue)
# 如果键不存在字典中，则会被赋予默认值。否则不会改变原有的键值

from collection import defaultdict
defaultdict(fun)
# 以函数作为参数，它返回赋给缺失的键值
# e.g.
from collections import defaultdict
dic = defaultdict(int)
print(dic['d']) # 0

# 可以搭配lambda来赋予初始值
defaultdict(lambda: 'no-value')
```

#### `Counter`