## JavaScript 数据结构

### 链表

链表储存有序的元素集合，其中的元素在内存中不是连续放置的。对于**单向链表**，每个元素由一个储存**元素本身的节点**和一个**指向下一个元素的引用**组成；而**双向链表**中的各元素则多了一个**指向上一个元素的引用**

链表的存在有什么意义呢？

对于传统的数组而言，我们增加或删除一个元素时，需要移动其之后的元素。比如删除了 `index` 为 10 的元素，那么之前 `index` 为 11 的元素需要向前挪动一位；同理，后面的每一个元素都要向前挪动一位。

除此以外，链表和数组的又一个差别是，数组可以直接通过 `array[index]` 访问到 `index` 位上的元素；而对于链表而言，需要从头开始遍历到目标元素。



由此可知，当我们在**单向链表**中某个位置上插入一个元素 `node` 时：

1. 遍历查找到位于 `index` 的元素 `current`，以及它的上一位元素 `previous`
2. 将 `previous` 的 `next` 指向 `node`
3. 将 `node` 的 `next` 指向 `current`


同理，删除某个位置上的元素，即是将该位置的上一个元素的 `next` 指向了该位置的下一位元素。

对于双向链表而言，则多了设置 `pre` 指向上一个元素的一步。

### 集合

集合中的元素无序且唯一。可以按照插入元素的顺序来迭代集合中的各元素。

在 ES6 原生 API 中，支持了 [`Set` ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 和 [`WeakSet`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)。但要注意的一点是，尽管 `Set` 中的值是唯一的，且 JS 中 `NaN !== NaN` ，但在 `Set` 里 `NaN` 仍被认为是相同的值。除此以外，集合中以 `value, value` 的形式储存数据，即保存的 `value` 也会作为它本身的 `key` 便于索引查找。

### 字典（映射）

与 `Set` 中 `value` 做 `key` 不同，字典 `Map` 需要给 `value` 制定一个 `key` 。它也用来储存不重复的数据。

在 ES6 原生 API 中，有 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 以及 [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 两种字典。

`WeakMap` 和 `WeakSet` 相比较于 `Map` 和 `Set` 而言：

- `WeakMap` 和 `WeakSet` 对象中只能存放*对象值*, 不能存放原始值, 而 `Map` 和 `Set` 都可以
- `WeakMap` 和 `WeakSet` 对象中存储的对象值都是被**弱引用**的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉。
- 因此，`WeakMap` 和 `WeakSet` 对象是无法被枚举的, 没有办法拿到它包含的所有元素

### 散列

`HashTable`（或 `HashMap` ）。对散列中的元素而言，拥有一个特殊的键值（通常通过元素的 ASCII 码获取到），以此来增加索引的速度。除此以外，在删除某个元素以后，散列对该键的索引值将指向 `undefined` ，也就因此避免了改变其他元素的位置。

但其实有时候，不同元素计算得到的 `key` 依旧会有重复。如果是不加处理的普通散列，则当 `key` 重复时，后加入的元素会覆盖原有的元素。但我们可以通过`分离链接` 或者 `线性探索` 的方法解决这个问题。

#### `分离链接`

散列中的每一个 `key` 都指向一个链表；对于每个新增的元素，都会 push 到相对应的引用中去。这也就避免了元素 key 重复的问题，但很显然：占用了多余的储存空间。

#### `线性探索`

当想向表中某位置加入一个新元素时，如果索引为 `index` 的位置已经被其他元素占据了，则尝试 `index + 1` 的位置。如果仍然被占据，则继续尝试 `index + 2` 的位置；以此类推。

### 二叉树

### 图

