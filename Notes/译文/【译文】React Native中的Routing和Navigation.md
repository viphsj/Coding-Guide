## 【译文】React Native中的Routing和Navigation

![navigation](../../image/Routing-and-Navigation-in-React-Native/navigation.png)

Note：本文是[《Programming React Native》](https://leanpub.com/programming-react-native)一书的一部分。祝看的愉快！

### 为何是navigation

你或许已经问过自己这个问题了：为什么要用navigation？什么是navigation的堆栈？在手机上，navigation占据着重要的作用。

  - 情境意识：让你在应用中知道自己在哪儿，以及从哪儿过来的
  - 功能：可以导航。后退、撤销、跳过，或者深度链接到App中的某些功能
  - 基础设施：在渲染一个新屏幕之前完成一个统一的视觉效果
  - 可维护性：想要理清上面的疑虑，你需要先建立一个掌控state的机器。navigation的堆栈就是这样的机器。我们编程的平台或许允许我们对这个机器的编码进行改变，并通过将逻辑集中在一处来提高维护性。

