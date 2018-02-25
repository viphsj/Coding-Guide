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
    - [HMAC](#hmac)
  - [HTTP 请求和线程](#http-%E8%AF%B7%E6%B1%82%E5%92%8C%E7%BA%BF%E7%A8%8B)
    - [JSON 解析](#json-%E8%A7%A3%E6%9E%90)
      - [`JSONSerialization`](#jsonserialization)
      - [`Codable`/`Encodable`/`Decodable`](#codableencodabledecodable)
    - [线程和阻塞](#%E7%BA%BF%E7%A8%8B%E5%92%8C%E9%98%BB%E5%A1%9E)
    - [利用`DispatchSemaphore`进行主线程阻塞](#%E5%88%A9%E7%94%A8dispatchsemaphore%E8%BF%9B%E8%A1%8C%E4%B8%BB%E7%BA%BF%E7%A8%8B%E9%98%BB%E5%A1%9E)
    - [在请求完成之后回到主线程进行绘制](#%E5%9C%A8%E8%AF%B7%E6%B1%82%E5%AE%8C%E6%88%90%E4%B9%8B%E5%90%8E%E5%9B%9E%E5%88%B0%E4%B8%BB%E7%BA%BF%E7%A8%8B%E8%BF%9B%E8%A1%8C%E7%BB%98%E5%88%B6)

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

```Swift
let now = Date()

// 获取当前时间戳，单位秒，Double 类型
let timeStamp:TimeInterval = now.timeIntervalSince1970

// 格式化时间
let dateformatter = DateFormatter() // 创建日期格式器
dateformatter.dateFormat = "yyyy年MM月dd日 HH:mm:ss"
print("当前日期时间：\(dateformatter.string(from: now))")

// 时间戳转为时间
Date(timeIntervalSince1970: timeStamp)
```

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

#### HMAC

USE `CommonCrypto`

- [Implementing HMAC and SHA1 encryption in swift](https://stackoverflow.com/questions/26970807/implementing-hmac-and-sha1-encryption-in-swift)

```Swift
extension String {
  func hmac(key: String) -> String {
    // HMAC SHA1
    var digest = [UInt8](repeating: 0, count: Int(CC_SHA1_DIGEST_LENGTH))
    CCHmac(CCHmacAlgorithm(kCCHmacAlgSHA1), key, key.count, self, self.count, &digest)
    let data = Data(bytes: digest)
    // base64
    return data.base64EncodedString()
  }
}

print("test".hmac(key: "233"))
```

### HTTP 请求和线程

在 Swift4 中使用`URLSession`进行网络请求。它是一个异步操作，不会阻塞主线程。

```Swift
// 可以通过两种方式构建 session 实例
// 自定义配置
let config = URLSessionConfiguration.default
let session = URLSession(configuration: config)

// 或者直接使用不可配置的单例
let session: URLSession = URLSession.shared
```

两者区别可戳：

- [Shared session vs. session with default configuration](https://stackoverflow.com/questions/25299166/shared-session-vs-session-with-default-configuration)
- [Developer document: URLSession](https://developer.apple.com/documentation/foundation/urlsession)

#### JSON 解析

##### `JSONSerialization`

```Swift
// JSONSerialization
let jsonObject = try? JSONSerialization.jsonObject(with: jsonData, options: [])

// 对于结构复杂的 JSON 对象，这种方法层层解析起来比较麻烦：
var weatherJsonString = """
{
"results": [
{
"location": {
"id": "WX4FBXXFKE4F",
"name": "北京",
"country": "CN",
"path": "北京,北京,中国",
"timezone": "Asia/Shanghai",
"timezone_offset": "+08:00"
},
"now": {
"text": "晴",
"code": "0",
"temperature": "-3"
},
"last_update": "2018-02-25T09:20:00+08:00"
}
]
}
"""

func parseWeather(dataString: String) {
  let jsonData = weatherJsonString.data(using: .utf8)!
  let jsonObject = try? JSONSerialization.jsonObject(with: jsonData, options: []) as! [String:AnyObject]
  print(jsonObject!)
  guard
    let results = jsonObject!["results"] as? [[String:AnyObject]],
    let result = results.first,
    let location = result["location"] as? [String:AnyObject],
    let now = result["now"] as? [String:AnyObject]
  else {
    print("Error: \(WeatherParseError.ParseError)")
    return
  }
  print(location)
  print(now)
}

parseWeather(dataString: weatherJsonString)
```

##### `Codable`/`Encodable`/`Decodable`

在 Swift4 中，新提供了三种协议：

1. `Encodable` 编码 JSON，我们需要实现`encode(to:)`方法
2. `Decodable` 解码 JSON，我们需要实现`init(from:)`方法
3. `Codable` 编码 & 解码，只需定义好数据结构即可

```Swift
// Codable
// 根据 JSON 格式定义好键名和值的类型
struct Photo: Codable {
  var title: String
  var url: URL
  var isSample: Bool
  // The Dictionary is of type [String:String] and String already conforms to Codable.
  var metaData: [String:String]

  //PhotoType and Size are also Codable types
  var type: PhotoType
  var size: Size
}

struct Size: Codable {
  var height: Double
  var width: Double
}

enum PhotoType: String, Codable {
  case flower
  case animal
  case fruit
  case vegetable
}
```

```Swift
// 直接对对象编码
let photoObject = Photo(
  title: "Hibiscus",
  url: URL(string: "https://www.flowers.com/hibiscus")!,
  isSample: false,
  metaData: ["color" : "red"],
  type: .flower,
  size: Size(height: 200, width: 200)
)
let encodedData = try? JSONEncoder().encode(photoObject)

// 相同结构下进行解码
let jsonString = """
{
  "type":"fruit",
  "size": {
    "width":150,
    "height":150
  },
  "title":"Apple",
  "url":"https:\\/\\/www.fruits.com\\/apple",
  "isSample":true,
  "metaData": {
    "color":"green"
  },
  "origin": "China"
}
"""
if let jsonData = jsonString.data(using: .utf8) {
  let photoObject = try? JSONDecoder().decode(Photo.self, from: jsonData)
  print(photoObject?.title) // "Apple"
  print(photoObject?.origin) // Error, 没有定义的键不存在
}
```

以上是严格按照 JSON 的格式进行解析的例子，如果需要自定义键值，或者去除一些不需要的值，则需要利用创建一个`CodingKeys`枚举并遵循`CodingKey`协议进一步改造：

```Swift
// CodingKeys 类似一个检查器，在 encoded 或者 decoded 时对其中的键值对进行检查
// 修改上一步的 Photo 结构体，增加一个 JSON 中不存在的键名，并且自定义两个键名
struct Photo: Codable {
  // ...
  // 在 CodingKeys 中没有定义的 format 键名会在编码/解码的时候被忽略
  var format: String = "png"

  // 通过 CodingKeys 枚举来改变键名
  enum CodingKeys: String, CodingKey {
    // 假设提供的 jsonString 中不存在名为 name 的键，则可以利用它解码后转换为 title；
    // 同理，编码后，原先 Photo 对象中的 title 属性会被编码为 name
    case title = "name"
    case url = "link"
    case isSample
    case metaData
    case type
    case size
  }
}
let jsonString = """
{
  "type":"fruit",
  "size": {
    "width":150,
    "height":150
  },
  "name":"Apple",
  "link":"https:\\/\\/www.fruits.com\\/apple",
  "isSample":true,
  "metaData": {
    "color":"green"
  },
  "format": "jpg"
}
"""

if let jsonData = jsonString.data(using: .utf8) {
  let photoObject = try? JSONDecoder().decode(Photo.self, from: jsonData)
  print(photoObject?.title) // "Apple"
  print(photoObject?.format) // "png"，因为 format 键没有在 CodingKeys 中定义
}
```

如果需要再进一步自定义，改变 JSON 的结构，则需要我们自己通过`Encodable`/`Decodable`协议来实现解析，而不再使用`Codable`

```Swift
// json 结构为 { size: { height, width } }，想解析为 { height, width }
struct Photo: Decodable {
  var height: Double
  var width: Double

  enum CodingKeys: String, CodingKey {
    case size
  }

  init(from decoder: Decoder) throws {
    let values = try decoder.container(keyedBy: CodingKeys.self)
    let size = try values.decode(Size.self, forKey: .size)
    height = size.height
    width = size.width
  }
}
```

进阶阅读：

- [Parsing JSON in Swift 4](https://grokswift.com/json-swift-4/)
- [Everything about Codable in Swift 4](https://hackernoon.com/everything-about-codable-in-swift-4-97d0e18a2999)
- [Ultimate Guide to JSON Parsing with Swift 4](https://benscheirman.com/2017/06/swift-json/)

#### 线程和阻塞

由于`URLSession`请求是一个在子线程进行的异步操作，所以在请求完成之后如果需要绘制 UI，则需要回到主线程。同时，在一些应用中，例如脚本，为了避免程序执行后自动退出，需要锁住主线程进行阻塞。

- [stackoverflow - Send make synchronous http request](https://stackoverflow.com/questions/40491502/swift-3-send-make-synchronous-http-request)

#### 利用`DispatchSemaphore`进行主线程阻塞

- [A Quick Look at Semaphores in Swift](https://medium.com/swiftly-swift/a-quick-look-at-semaphores-6b7b85233ddb)

> 注：这种方法在有 UI 交互的场景里不推荐！它会造成线程的阻塞

`DispatchSemaphore`的工作过程：

1. 创建一个信号量`semaphore`
  - 通过`value`参数标记有多少线程可以使用其资源（作为信号量的计数器）
  - 创建一个先入先出队列来储存请求资源的线程
2. 当调用`semaphore.wait()`方法时，信号量检查自身的计数器是否大于零
  - 计数器大于零，则计数器减一，并把资源给予请求的子线程
  - 计数器小于零，则将请求的线程放入到队列中去
3. 调用`semaphore.signal()`进行资源的释放，同时信号量检查其队列中是否还存有等待请求的线程
  - 有线程，则将其推出队列，给予资源
  - 没有线程，则自身计数器加一
4. 需要注意的是，当一个线程给信号量发送请求获取资源时（`.wait()`），该线程会一直冻结，直到信号量给予其资源。因此，在主线程调用时会造成阻塞

```Swift
// Demo: 通过请求获取一个 JSON 数据并解析
// 在异步运行过程中会进入子线程，为了防止主线程退出，可以设置信号灯 semaphore 使主线程阻塞直到请求完成
func httpRequest() -> Void {
  // 创建一个信号量，初始值为0
  // value 参数代表允许同时访问该资源的线程数量
  let semaphore = DispatchSemaphore(value: 0)

  let url: URL = URL(string: "exampleurl")
  let session: URLSession = URLSession.shared
  let request = URLRequest(url: url)
  let task = session.dataTask(with: request) {
    (data, response, error) -> Void in
    if let jsonData = data {
      // 解析 JSON
      let jsonObject = try? JSONSerialization.jsonObject(with: jsonData, options: [])
      print(jsonObject)
    }
    // 释放信号
    semaphore.signal()
  }
  // 执行异步请求
  task.resume()

  // 阻塞主线程，直到信号被释放
  semaphore.wait()
}
```

#### 在请求完成之后回到主线程进行绘制

```Swift
let task = session.dataTask(with: request) {
  (data, response, error) -> Void in
  if let jsonData = data {
    // 解析 JSON
    let jsonObject = try? JSONSerialization.jsonObject(with: jsonData, options: [])
    print(jsonObject)
    OperationQueue.main.addOperation {
      // 更新主线程 UI
    }
  }
}
// 执行异步请求
task.resume()
```