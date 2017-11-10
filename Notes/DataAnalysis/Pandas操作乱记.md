<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Pandas 操作乱记](#pandas-%E6%93%8D%E4%BD%9C%E4%B9%B1%E8%AE%B0)
  - [Recommend](#recommend)
  - [基本信息](#%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF)
  - [数学计算](#%E6%95%B0%E5%AD%A6%E8%AE%A1%E7%AE%97)
  - [数据操作](#%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C)
    - [数据索引](#%E6%95%B0%E6%8D%AE%E7%B4%A2%E5%BC%95)
    - [数据删除](#%E6%95%B0%E6%8D%AE%E5%88%A0%E9%99%A4)
    - [数据操作](#%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C-1)
    - [数据聚合](#%E6%95%B0%E6%8D%AE%E8%81%9A%E5%90%88)
    - [数据合并](#%E6%95%B0%E6%8D%AE%E5%90%88%E5%B9%B6)
  - [时间序列](#%E6%97%B6%E9%97%B4%E5%BA%8F%E5%88%97)
  - [输出 & 转换](#%E8%BE%93%E5%87%BA--%E8%BD%AC%E6%8D%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Pandas 操作乱记

### Recommend

- [10 Minutes to pandas](http://pandas.pydata.org/pandas-docs/stable/10min.html)
- [Pandas Cookbook](http://pandas.pydata.org/pandas-docs/stable/cookbook.html)
- [Pandas Exercises](https://github.com/guipsamora/pandas_exercises)

### 基本信息

```python
import pandas as pd

# ------------------ 创建 Series ------------------
se = pd.Series(dict) # 默认会用 key 作为 Index
se = pd.Series(array, index=array) # 传入数组创建 Series，可指定 Index

# 创建 DataFrame
# pd.DataFrame(dict)
# pd.DataFrame(dict, columns=array)
# pd.DataFrame(嵌套数组, columns=array)
# pd.DataFrame.from_dict()
# pd.DataFrame.from_csv()
# pd.DataFrame.from_items()
df = pd.DataFrame.from_dict(dict, orient='index'/'columns')

# ------------------ 读取 CSV 文件 ------------------
df = pd.read_csv('filepath or url')
df = pd.read_csv('filepath or url', sep='|') # 可以指定每行的分隔符
df = pd.read_csv('filepath or url', index_col='user_id') # 可以指定某列作为 Index

# 其他读取方式
pd.read_csv
pd.read_sql
pd.read_html
pd.read_json
pd.read_excel
pd.read_table
pd.read_clipboard

# ------------------ 逐块读取数据 ------------------
# 给出 chunksize 参数可以加载为一个迭代器，每次读取 chunksize 行数的文件，读取出的格式为 DataFrame
file_chunk = pd.read_csv(filepath, chunksize=2000) # 每次读取 2000 行
for piece in file_chunk:
  print(piece.values)

# ------------------ 读取指定行数 ------------------
pd.read_csv(filepath, nrows=2000) # 只读取开头的 2000 行
```

```python
# pandas 基本对象类型：`DataFrame` 和 `Series`。可以理解为 `Series` 即 `DataFrame` 的各个列
type(df) # pandas.core.frame.DataFrame
type(df['ColumnName']) # pandas.core.series.Series
type(df.loc[0:1,:]) # pandas.core.frame.DataFrame
```

```python
# --------------- 信息概览 ---------------
df.shape # 返回一个元组：(行数, 列数)
df.size # 返回单元格总数

df.dtypes # 获取各个 column 的类型
df.dtype['ColunmName'] # 获取某一列的类型

df.index # 获取各行的索引
df.index.max() # 获取行索引的最大值
df.index.min() # 获取行索引的最小值
df.columns # 获取各列的索引
df.info() # 输出行、列的基本信息
df.T # 转置

df.describe() # 输出类型为数字的列的统计信息
df.describe(include = "all") # 输出所有列的统计信息
df['ColunmName'].describe(include = "all") # 输出某一列的统计信息

# --------------- values ---------------
df.values # 以嵌套数组的形式返回所有的值
# --> 等同于
df.get_values()
df['ColunmName'].values # 以数组的形式返回某一列的值
df.get_value(index, column)
df.at(indexName, columnName)
df.iat(indexPosition, columnPosition)

# --------------- is_unique ---------------
df.index.is_unique # 检查列名是否有重复
df.columns.is_unique # 检查行名是否有重复
df['ColumnName'].is_unique # 检查列中各值是否有重复

# -------------- rank --------------
df['ColumnName'].rank() # 返回数的排序位置
df['ColumnName'].rank(method='first') # 返回数的排序位置
# method 取值：
# average: 当值相等时，将其排名平均分配
# min: 使用更小的那个排名
# max: 使用更大的那个排名
# first: 按照原始的排列顺序排名
```

### 数学计算

```python
# 直接对 DataFrame 进行操作
df.mean() # 对各列求均值
df.median() # 中位数
df.max() # 最大值
df.min() # 最小值
df.std() # 标准差
df.var() # 方差
# 也可对 Series 进行同样的操作
df['ColumnName'].mean() # 对某一列求均值，返回一个 Series

# 可用在时间序列分析的便捷方法
df.cumsum() # 各列从上到下逐步累加
df.diff() # 各列从上到下，依次和上一行该列的数据做差
df['ColumnName'].cumsum() # 指定列逐步累加

df.groupby('ColumnName').ColumnName.mean().max() # 对各个 group 中的指定列先求平均数，返回一个 Series，然后再从中求出最大值

# ----------------------- agg -----------------------
df.agg(['max', 'min', 'mean', 'count']) # 输出一个新的 DataFrame，包含有各列的指定的统计信息
df['ColumnName'].agg(['max', 'min', 'mean']) # 输出一个新的 Series，包含有针对指定列的指定的统计信息

# 针对某些指定的列进行统计
df.agg({
  'ColumnName': 'func',
  # or
  'ColumnName': ['func1', 'func2']
})
# 例如
df.agg({ 'col1': 'count' })
df.agg({ 'col1': ['count', 'mean', 'max'] })
```

### 数据操作

#### 数据索引

- [Indexing and Selecting Data](http://pandas.pydata.org/pandas-docs/stable/indexing.html)

```python
# 已不再建议使用 pandas 原有的 ix 方法来索引行、列，而是通过 iloc 和 loc 进行索引
# 不过 ix 方法仍可以用来获取到某行某列的一个值

# ------------ 索引列 ------------
# 按照名称索引
df['ColumnName']
df.ColumnName
df.loc[:, [columnName1, columnName2..]]
df.loc[:, columnStartName:columnEndName:step]

# 按照 index 索引
df.iloc[:, columnStartIndex:columnEndIndex:step]
df.iloc[:, [columnIndex1, columnIndex2..]]

# ------------ 索引行 ------------
# 按照行名称索引
df[rowIndexStart:rowIndexEnd:step] # --> df[0:20:2]
df.loc[rowName] # 获取行名称相符的所有行
df.loc[rowStartName:rowEndName] # 在行名称没有重复的情况下，取从 startName 到 endName 的所有行
df.loc[[rowName1, rowName2...]] # 获取指定名称的行

# 按照行 index 索引
df.iloc[rowIndex] # 获取行 index 相符的所有行
df.iloc[rowStartIndex:rowEndIndex:step] # 取从 startIndex 到 endIndex 的所有行
df.iloc[[rowIndex1, rowIndex2...]] # 获取指定 index 的行

# ------------ 索引行列 ------------
df.loc[rowStartName:rowEndName:step, columnStartName:columnEndName:step]
df.loc[rowStartName:rowEndName:step, [columnName1, columnName2]]
df.loc[[rowName1, rowName2], columnStartName:columnEndName:step]
df.loc[[rowName1, rowName2], [columnName1, columnName2]]

df.iloc[rowStartIndex:rowEndIndex:step, columnStartIndex, columnEndIndex:step]
df.iloc[rowStartIndex:rowEndIndex:step, [columnName1, columnName2]]
df.iloc[[rowIndex1, rowIndex2], columnStartIndex:columnEndIndex:step]
df.iloc[[rowIndex1, rowIndex2], [columnName1, columnName2]]

# ------------ 按照条件表达式索引 ------------
# http://pandas.pydata.org/pandas-docs/version/0.13.1/indexing.html#query-use-cases
df[df.age > 18] # 索引 age 列中所有大于 18 的行
df[(df.age > 18) | (df.name == 'ecmadao')]
df[(df.age > 18) & (df.name == 'ecmadao')]
# 等效于
df.query('name > 18')
df.query('(a < b) & (b < c)')
```

#### 数据删除与替换

```python
# 删除数据
del df['ColumnName'] # 删除某列
df.drop(['rowIndex1', 'rowIndex2']) # 删除多行或一行
df.drop(df.loc[:, 'ColumnName1':'ColumnNameN'], axis=1) # 删除多列或一列

# 去除全部列/指定列中的重复值 -> 包含重复值的行会被整行去除
# 不会修改原对象，返回新的对象
df.drop_duplicates()
df.drop_duplicates(['ColumnName1', 'ColumnName2'])
df.drop_duplicates(take_last=True) # 默认保留重复元素的第一个，通过 take_last 则保留最后一个

# 过滤无效值
df.dropna(how='any') # to drop if any value in the row has a nan
df.dropna(how='all') # to drop if all values in the row are nan

# 替换无效值
df.fillna(value=5)
# 针对不同 column 的缺失值，填入不同数据
df.fillna({
  'columnName': fill_value
})

# 替换指定值
df.replace(target, new_value)
df.replace([target1, target2...], new_value)
df.replace([target1, target2...], [new_value1, new_value2...])
df.replace({
  'target': new_value
})

# 修改 IndexName
df.index = df.index.map(str.upper)
df.rename(index=str.title, columns=str.upper) # 修改 IndexName 和 ColumnName
```

#### 数据操作

```python
# 按照列名传入的顺序，对该列的值进行排序
df.sort_values('ColumnName')
df.sort_values(['ColumnName1', 'ColumnName2'])
# 按照索引大小来改变横轴排列
df.sort_index(ascending=True/False)

# 改变索引
df.set_index('ColumnName') # 将某列转为行索引。不改变原对象，返回新对象
df.set_index('ColumnName', drop = False) # 将某列转为行索引。不改变原对象，返回新对象。同时转换为索引的列不会被去除
# 改变 DataFrame 的索引值、列名称，传入的必须是类列表对象
df.reindex(index=['index1', 'index2'], columns=['column1', 'column2'])

# 获取某个单元格的数据
df.ix['IndexName or index', 'ColumnName or columnIndex']

# ---------------- idxmax/idxmin ----------------
# 获取各列/某列取到最大、最小值时，所对应的 Index
df.idxmax(axis=0)
df['Column'].idxmax(axis=0)
df.idxmin(axis=0)
df['Column'].idxmin(axis=0)

# 获取各行/某行取到最大、最小值时，所对应的 Column
df.idxmax(axis=1)
df.iloc[1].idxmax()
df.idxmin(axis=1)
df.iloc[1].idxmin()
```

```python
# 对某列进行操作

# ------------------ 统计 ------------------
df['ColumnName'].count() # 统计该列有多少行非 nan 值 -> df.shape[0]
df['ColunmName'].unique() # 以数组形式输出某一列的所有不同的值

df['ColunmName'].value_counts() # 输出某一列的统计信息：不同的值分别出现的次数
df['ColunmName'].value_counts().count() # 统一某一列总共有多少种不同值 -> len(df['ColunmName'].unique())

# ------------------ 列操作 ------------------
# 判断某一列各个值是否存在于指定的数组中
df['ColumnName'].isin(['value1', 'value2'])

# 当某列值的类型为 string 时
df['ColumnName'].str.xxx() # 可以使用 string 的一些方法，例如：
df['ColumnName'].str.startswith('A') # 判断某列的各个值是否以 A 开头
df['ColumnName'].str.endswith('A') # 判断某列的各个值是否以 A 结尾
df['ColumnName'].str.lower() # 把某列的各个值转为小写
df['ColumnName'].str.capitalize() # 把某列的各个值转为大写

# 其他类型方法
df.add(1) # 每个元素都递增 1，不修改原对象
df['ColumnName'].add(1) # 某列的各值都递增 1，不修改原对象
df['ColumnName'].eq(5) # 判断各值是否相等
df['ColumnName'].isnull() # 判断各列的值是否存在
df['ColumnName'].notnull() # 判断各列的值是否存在
```

```python
# apply & map & applymap
# Difference between map, applymap and apply methods in Pandas:
# https://stackoverflow.com/questions/19798153/difference-between-map-applymap-and-apply-methods-in-pandas

# ---------- apply ----------
# 当对 DataFrame 使用 apply 时，传入的是各列，返回 Series；
# 对 Series 使用 apply 时，传入的是各个值，返回 Series
df.apply(func) # 对 DataFrame 的各列都应用 func，返回一个新的 Series
df['ColumnName'].apply(func) # 对某一列的各个值应用 func，返回一个新的 Series

# ---------- applymap ----------
# 作用于 DataFrame 里的各个元素

# ---------- map ----------
# 作用于某一列上的各个元素
```

#### DataFrame 遍历

```python
for index, row in df.iterrows():
  print(index) # index 是 DataFrame 各个 Index 的名称
  print(type(row)) # 每行以 Series 的形式输出
  print(row['columnName']) # 可以获取到各个 column 的值
```

#### 数据聚合

```python
# 数据聚合

# 将表按照某一类的数据进行聚合
# 聚合完成之后会将该列内一样的值排列在一起，可进行下一步操作
df_group = df.groupby('ColumnName') # 返回类型为 pandas.core.groupby.DataFrameGroupBy，是一个可迭代对象

for name, group in df_group:
  print(name) # 指定列聚合之后剩下的 unique 值
  print(group.values)

# 聚合之后，也可以对 DataFrameGroupBy 类型的值进行 DataFrame 的一些操作
df.groupby('ColumnName').ColumnName.describe() # 输出聚合的各个 DataFrame 中指定列的信息
df.groupby('ColumnName').mean()
df.groupby('ColumnName').size() # 输出聚合后各个 group 的数量信息

# 按照多列聚合
df.groupby(['ColumnName1', 'ColumnName2'])
```

#### 多层索引（MultiIndex）

- [Cookbook - multiindexing](http://pandas.pydata.org/pandas-docs/stable/cookbook.html#multiindexing)
- [How to iterate over pandas multiindex dataframe using index](https://stackoverflow.com/questions/25929319/how-to-iterate-over-pandas-multiindex-dataframe-using-index)

```python
import numpy as np

# --------------------- 创建多层索引 ---------------------
data = pd.Series(
  np.random.randn(10),
  index=[
    ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'd', 'd'],
    [1, 2, 3, 1, 2, 3, 1, 2, 2, 3]
  ]
)

# 通过 pd.MultiIndex 或者 groupby(array)，以及 groupby 之后再进行 column 数据的合并，即可创建多层索引
# 例如：
df.groupby('id').resample('d').sum()
df.set_index(['column1', 'column2'])
df.read_csv(url, index_col=['column1', 'column2'])

# --------------------- 获取多层索引 ---------------------
# 直接通过 index 获取时，会输出多个元组，每个元组从左向右分别代表各层的索引
data.index
# --> [(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3), (c, 1), (c, 2), (d, 2), (d, 3)]

# 遍历多层索引
df.index.get_level_values(0) # 获取全部的第一层索引
df.index.get_level_values(1) # 获取全部的第二层索引
```

#### 数据合并

- [Merge, join, and concatenate](http://pandas.pydata.org/pandas-docs/stable/merging.html)

### 时间序列

```python
#  ------------------ 时间操作 ------------------
pd.to_datetime(df['ColumnName'], format='')

# ------------------ 时间序列 ------------------
# 生成一个 Series 类型的时间序列
pd.date_range('20150101', periods=30) # 默认时间间隔为 D，即天
pd.date_range('2017-01-01', periods=30)
pd.date_range(start='2017-01-01', end='2017-01-10')
pd.date_range('2017-01-01', periods=30, freq='M') # 令时间间隔为 月
# 可用的时间间隔（freq）：
# a/A: year
# [number]as/[number]AS: number 年 -> 10AS 每十年作为一个间隔
# m/M: month
# w/W: week
# d/D: day
# h/H: hour
# min/Min: minute
# s/S: second

# 不能同时设置 start, end 和 periods
pd.date_range(start='20150101', end='20150110', periods=30) # ERROR!

# ------------------ 时间聚合 ------------------
# 按照指定规则将时间序列进行聚合，规则可见
# pandas resample documentation:
# https://stackoverflow.com/questions/17001389/pandas-resample-documentation
df.resample(rule)
df['ColumnName'].resample(rule)
# 例：
df.resample('10AS').sum() # 每十年进行聚合，并求十年数据的总和

# 旧版本的 pandas 中可以通过如下形式设定聚合方式
# 但现在已经不再建议这样调用
df.resample('W', how='sum')
df.resample('W', how='mean')

time_series = pd.date_range('20150101', periods=3)
# --> DatetimeIndex(['2015-01-01', '2015-01-02', '2015-01-03'], dtype='datetime64[ns]', freq='D') -> DatetimeIndex 储存了纳秒级的时间戳
time_series = time_series.to_period()
# --> PeriodIndex(['2015-01-01', '2015-01-02', '2015-01-03'], dtype='period[D]', freq='D') -> PeriodIndex 储存的是时间间隔
time_series = time_series.to_timestamp()
# --> DatetimeIndex(['2015-01-01', '2015-01-02', '2015-01-03'], dtype='datetime64[ns]', freq='D')
```

### 输出 & 转换

```python
# 转换为字典
df.to_dict(orient='dict')

# 转换为数组
df.values

# 输出为 CSV
df.to_csv(path, sep=',', line_terminator='\n')
```

```python
# --------------------------- 输出为图片 ---------------------------
# http://pandas.pydata.org/pandas-docs/stable/visualization.html
import matplotlib.pyplot as plt

# 可以对图片样式进行设定
import matplotlib
matplotlib.style.use('ggplot')

%matplotlib inline # 在 jupyter 内开启图片显示

# 使用 Series 进行作图时，默认使用 Index 作为横轴
ts = pd.Series(np.random.randn(1000), index=pd.date_range('1/1/2000', periods=1000))
ts = ts.cumsum()
ts.plot()

# 使用 DataFrame 进行作图时，多个 column 会画出多条线
df = pd.DataFrame(np.random.randn(1000, 4), index=ts.index, columns=list('ABCD'))
df = df.cumsum()
# plt.figure()
plt.axhline(number, color='k') # 在 y = number 的地方画一条黑色直线
plt.axhline(number, color='k--') # 在 y = number 的地方画一条黑色虚线
df.plot()
# 或者指定横轴和纵轴
df.plot(x='A', y='B')

# 在调用 plot 方法的时候，可以通过 kind 参数指定绘图的方式：
# - 'line' : line plot (default)
# - 'bar' : vertical bar plot
# - 'barh' : horizontal bar plot
# - 'hist' : histogram
# - 'box' : boxplot
# - 'kde' : Kernel Density Estimation plot
# - 'density' : same as 'kde'
# - 'area' : area plot
# - 'pie' : pie plot
# - 'scatter' : scatter plot
# - 'hexbin' : hexbin plot
```
