<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [iOS 开发入坑记录](#ios-%E5%BC%80%E5%8F%91%E5%85%A5%E5%9D%91%E8%AE%B0%E5%BD%95)
  - [View Controller](#view-controller)
  - [Multiple MVCs](#multiple-mvcs)
  - [实践](#%E5%AE%9E%E8%B7%B5)
    - [UITextField](#uitextfield)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## iOS 开发入坑记录

- [官方文档：View Controller Programming Guide for iOS](https://developer.apple.com/library/content/featuredarticles/ViewControllerPGforiPhoneOS/index.html#//apple_ref/doc/uid/TP40007457-CH2-SW1)

### View Controller

View Controller 的生命周期

```Swift
override func viewDidLoad() {
  super.viewDidLoad()
  // do the primary setup
  // update your View using your Model

  // ATTENTION
  // 不要在这里进行 view 相关的绘制，因此此时 App 的边界还没有被设置
}

override func viewWillAppear(_ animated: Bool) {
  super.viewWillAppera(animated)
  // catch your View up to data

  // ATTENTION
  // 该生命周期可以被调用多次，而 viewDidLoad 只在初始化的时候调用一次
}

override func viewDidAppear(_ animated: Bool) {
  super.viewDidAppear(animated)
  // maybe start a timer or an animation or start observing something(e.g. GPS position)
  // There is also a good place to start something expensive going, for example, network fetching

  // ATTENTION
  // 在这里绘制图案就太晚了！！！
}

// 可能在用户点击了返回按钮，或者切换了不同的 tab 时触发
override func viewWillDisappear(_ animated: Bool) {
  super.viewWillDisappear(animated)
  // Usually you undo what you do in viewDidAppear
  // For example: stop a timer or stop observer
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  // Clean up MVC
}

/*
Geometry
You get notified when your top-level view's bounds change,
or otherwise need a re-layout
可以在下面两个生命周期时进行 view 的绘制
*/
override func viewWillLayoutSubviews() {}
override func viewDidLayoutSubviews() {}

/*
Autorotation
当设备旋转时会被触发。此时边界 bounds 改变，因此 viewWillLayoutSubviews/viewDidLayoutSubviews 也会被触发
如果需要自己手动进行布局或者设置动画，则可以使用下面的生命周期
*/
override func viewWillTransition(
  to size: CGSize,
  with coordinator: UIViewControllerTransitionCoordinator
) {
  super.viewWillTransition(to: size, with: coordinator)
}

/*
Low memory
This usually means a builup for very large video, image, sounds
如果你的 App 对那些占用较大内存的对象保持了强指针引用，就有可能会触发该警告
*/
override func didReceiveMemoryWarning() {
  super.didReceiveMemoryWarning()
  // 此时应该对不用的对象取消引用，在使用的时候重新创建
  // 如果持续触发该警告，则 App 会被 iOS 强制杀死
}

/*
Wakeup from a storyboard
*/
override func awakeFromNib() {
  super.awakeFromNib()
}
```

整体流程：

1. 应用实例化 Instantiated（Usually from storyboard）
2. `awakeFromNib`（只有通过 storyboard 实例化时才会被调用）
3. segue preparation happens
4. outlets get set
5. `viewDidLoad`
6. 当控制器的视图在屏幕上出现/消失时，
  - `viewWillAppear`/`viewDidAppear`
  - `viewWillDisappear`/`viewDidDisappear`
7. 在`viewDidLoad`之后，UI 绘制方法可以在任意时刻被调用
 - `viewWillLayoutSubviews`
 - `viewDidLayoutSubviews`
8. 当内存不足时，会收到`didReceiveMemoryWarning`警告

### Multiple MVCs

### 实践

#### UITextField

- [Getting to Know UITextField](https://grokswift.com/uitextfield/)
- [Best way to dismiss Keyboard in a View Controller iOS (Swift)](https://medium.com/@KaushElsewhere/how-to-dismiss-keyboard-in-a-view-controller-of-ios-3b1bfe973ad1)
- [Five Simple Tips to Make User Friendly Forms on iOS](https://cocoacasts.com/five-simple-tips-to-make-user-friendly-forms-on-ios)
- [在Swift中整数以及浮点的格式化](http://www.cnblogs.com/sandal1980/p/3844307.html)