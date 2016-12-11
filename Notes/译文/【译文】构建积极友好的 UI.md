## 【译文】构建积极友好的 UI

> 原文链接：[Optimistic UIs in under 1000 words](https://uxplanet.org/optimistic-1000-34d9eefe4c05#.wj1y3e4nd)

今天来谈论一下“积极友好的 UI”

### 积极？

积极的 UI 指其不需要等到更新完状态之后才更新界面。它会立马切换到最终状态的界面，然后以进行中的样式等待操作的完成。

这句话可能不好理解，还是先看个栗子吧。下面是一个名为 “Cotton Candy” 的虚构的发送信息的 APP。它有两种发送信息的方式可供我们选择：

> 不积极的 UI设计

![不积极的 UI设计](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-N5tK8JB0MmRb04ONghE5mg.gif?raw=true)

> 积极的 UI 设计

![积极的 UI 设计](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-KE0p_NCjeeV0Sk9ZAIuE8g.gif?raw=true)

如上所示，积极的 UI 会在操作完成之前率先展示其最终的样式。

### 看起来太 Magic 了，为什么要这么做？

太背后隐藏的概念其实很简单，就是让用户感到愉悦。

首先，通过这样的方式，可以让人感觉你的 APP 反应速度很快。当 APP 在上传一个照片或者发送一段话的时候，用户可以着手做其他事情。

其次，去除掉不必要的等待状态，可以让操作连贯起来，获得“流”式的操作体验，这也使得 APP 看起来更加简洁友好。

### 真实案例

积极的 UI 经常被用在信息和社交 APP 中。iOS 和 macOS 都在发送信息时使用了这种方式。

> 在 Mac 上发送信息时会立即更新 UI

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-lGIBhHTPCUuFl8LkSi3Ikg.gif?raw=true)

Instagram 在用户的评论列表里使用了积极的 UI 设计

>在评论的右侧展示发送状态

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-GwXigyxILbWYKqcOnOiEdw.gif?raw=true)

再看一个不同的例子：iOS 上的 [Audible](http://audible.com/) 客户端。只要下载完成专辑的一小部分之后就可以播放，而剩下的部分则会在你听的时候悄然下载：

> 下载好专辑的一小部分之后就能开始播放

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-x6Av27i_C_Y939jDI1vS3Q.png?raw=true)

再来一个例子：[Trello](http://trello.com/)，当用户移动卡片时，它会被立即移动，而不用等待服务端完成这个操作

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-2sem8ziRkYSVenm5pk6cBw.gif?raw=true)

而在 Medium 里，在用户接受图片时，会通过逐步显现的方式构建积极的界面。

这些方法都可以用在你自己的产品里。

### 进度展示

有时候只是展现一个最终状态的界面还是不够的。通过一个进度提示可以避免让用户困扰，尤其是在错误发生时至关重要。

无疑，如果操作所用时间越长，则进度提示就会越显眼。当用户做出例如“点赞”这样的操作时没有必要使用进度提示，但当他上传照片时这样的提示就至关重要。

一些 APP 会在结果展示的 UI 旁边展现当前进度：

> 在消息的同一行里展示发送的进度

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-zOpNzRINts7Pzc_4wsO-dw.png?raw=true)

再进一步的话，可以在消息旁边展示一个小 icon 或者 label

>facebook web 里发送消息时的 icon

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-TwOEaDPTJnbJiPMRxlC8Vg.png?raw=true)

iOS 的消息 APP 则会在顶部展示一个发送进度条：

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-Vm7qBwrOO3JkTzSmhvNOyg.png?raw=true)

### 处理错误

如果已经展示了最终结果的 UI，但又发生了错误的话，该如何处理？

有两点要考虑：

1. 突出：结果必须可见，确保用户不会错过错误消息
2. 因果：需要让用户理解什么操作发生了错误。因为我们已经更新好了 UI，所以在用户心里这个操作是应该已经完成了的。

在构建积极的 UI 过程中，错误处理是一个很大的挑战。

最简单的处理方法是弹出一个错误提示框：

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-Yo4j_LieR_xB2O89_Zr6RQ.gif?raw=true)

这种方法对于第一点（突出）而言很棒。用户不会错过错误消息，而且它终止了 APP 内的其他交互。

但对于第二点（因果）来说就不行了。在心智上没能把错误和用户之前的操作联系起来。它只是随机的蹦出来，还在上面附带了吓人的文字。

还有一种处理方式，是在消息旁边展示一个表示错误的 icon：

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-zDdRaFaU2qVHGJFQXGbyHA.png?raw=true)

当用户点击这个 icon 的时候，再弹出一个选择框，让用户可以再次发送消息：

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-eArwlVHG4IDGQVEdoggb9A.png?raw=true)

这个方法对于第二点（因果）很友好，但可惜的是错误提示不够明显。如果用户屏幕上展示的不是这个错误消息，那么他就无法查看到消息的错误状态。

iOS 的消息 APP 会在图标上展示一个错误提示来让其更加显眼。所以即便用户离开了 APP 也能够注意到它：

![](https://github.com/ecmadao/Coding-Guide/blob/master/image/OptimisticUIs/1-fJNUyqeU5Ssju9J7AuWExg.png?raw=true)

为了减少错误提示带来的负面影响，有时我们可以在程序内部初步处理错误，在错误发生时再次重新尝试消息发送。

### 结论

积极的 UI 可以让你的应用更加流利、直接、面向用户，而当你的服务器响应比较缓慢的时候尤为重要。但要注意的是，如果你的后端服务并不可靠，可能经常会返回错误，此时再大量使用积极的 UI 就很槽糕了。