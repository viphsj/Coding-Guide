<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [iOS 开发入坑记录](#ios-%E5%BC%80%E5%8F%91%E5%85%A5%E5%9D%91%E8%AE%B0%E5%BD%95)
  - [应用生命周期](#%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [View Controller](#view-controller)
  - [布局](#%E5%B8%83%E5%B1%80)
  - [Multiple MVCs](#multiple-mvcs)
  - [实践](#%E5%AE%9E%E8%B7%B5)
    - [UITextField](#uitextfield)
    - [日期](#%E6%97%A5%E6%9C%9F)
    - [本地化](#%E6%9C%AC%E5%9C%B0%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## iOS 开发入坑记录

- [官方文档：View Controller Programming Guide for iOS](https://developer.apple.com/library/content/featuredarticles/ViewControllerPGforiPhoneOS/index.html#//apple_ref/doc/uid/TP40007457-CH2-SW1)
- [官方 Tutorial，开发一个小 Demo](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/index.html#//apple_ref/doc/uid/TP40015214-CH2-SW1)

### 应用生命周期

![application lifecircle](../../image/iOS/lifecircle.png)

### View Controller

View Controller 的生命周期

- [Work with View Controllers](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/WorkWithViewControllers.html)

```Swift
override func viewDidLoad() {
  super.viewDidLoad()
  // do the primary setup
  // update your View using your Model

  // ATTENTION
  // 1. 不要在这里进行 view 相关的绘制，因此此时 App 的边界还没有被设置
  // 2. 可以在这里进行准备工作
  //    - 类中成员对象和变量的初始化
  //    - 获取数据
  // 3. 该方法只会在布局时调用一次
}

override func viewWillAppear(_ animated: Bool) {
  super.viewWillAppera(animated)
  // catch your View up to data

  // ATTENTION
  // 该生命周期可以被调用多次
}

override func viewDidAppear(_ animated: Bool) {
  super.viewDidAppear(animated)
  // maybe start a timer or an animation or start observing something(e.g. GPS position)
  // There is also a good place to start something expensive going, for example, network fetching

  // ATTENTION
  // 1. 在这里再绘制 UI 就太晚了！！！
  // 2. 可以进行一些 UI 展示操作，例如，动效
  // 3. 当该方法调用时，并不能保障 UI 一定是可见的：它可能会被遮挡或者隐藏
}

// 可能在用户点击了返回按钮，或者切换了不同的 tab 时触发
override func viewWillDisappear(_ animated: Bool) {
  super.viewWillDisappear(animated)
  // Usually you undo what you do in viewDidAppear
  // For example: stop a timer or stop observer

  // 1. 进行收尾工作
  // 2. 保存用户的修改
  // 3. 取消监听器、responser
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  // clean up MVC
}

/*
Geometry
You get notified when your top-level view's bounds change,
or otherwise need a re-layout
可以在下面两个生命周期时进行 view 的重绘
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
如果一个对象的 awakeFromNib 函数被调用，就表明这个对象已经成功的通过 nib 文件创建
只用通过 IB 或者是 Storyboard 的方式创建的对象才会调用该函数
*/
override func awakeFromNib() {
  super.awakeFromNib()
}
```

整体流程：

![UIViewController LifeCircle](../../image/iOS/uilifecircle.png)

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

### 布局

- 内容变多优先级`content hugging priorities`

表示视图大小在某个维度上不会比内容多的可能性。取值范围`0~1000`，`1000`表示视图大小肯定不会比内容多。

因此，优先级低的视图会在某个维度上被拉伸

- 内容抗压优先级`content compression resistance priorities`

和内容变多优先级相反：优先级低的视图会在某个维度上被压缩

### Multiple MVCs

### 实践

#### UITextField

- [Getting to Know UITextField](https://grokswift.com/uitextfield/)
- [Five Simple Tips to Make User Friendly Forms on iOS](https://cocoacasts.com/five-simple-tips-to-make-user-friendly-forms-on-ios)
- [在Swift中整数以及浮点的格式化](http://www.cnblogs.com/sandal1980/p/3844307.html)
- [How do I check when a UITextField changes?](http://ioscake.com/how-do-i-check-when-a-uitextfield-changes.html)
- [Close iOS Keyboard by touching anywhere using Swift](https://stackoverflow.com/questions/24126678/close-ios-keyboard-by-touching-anywhere-using-swift)
- [Best way to dismiss Keyboard in a View Controller iOS (Swift)](https://medium.com/@KaushElsewhere/how-to-dismiss-keyboard-in-a-view-controller-of-ios-3b1bfe973ad1)

#### 日期

- [Convert Date To String & Vice-Versa Swift 4 - iOS](http://iosrevisited.blogspot.hk/2017/10/convert-date-string-swift4.html)

#### 本地化

- [iOS国际化（本地化）详解](http://www.bijishequ.com/detail/378783)
- [ios10+swift3.0 app多语言——国际化和本土化](https://www.jianshu.com/p/b13945381795)
- [A different way to deal with Localized strings in Swift](https://medium.com/@dcordero/a-different-way-to-deal-with-localized-strings-in-swift-3ea0da4cd143)

```Swift
// 获取用户的当前地区
let currentLocale = Locale.current
// 读取本地化的变量
NSLocalizedString(variableString, comment: commentString)

// or
extension String {
  var localized: String {
    return NSLocalizedString(self, comment: "")
  }
}
"localeVariable".localized
```