## Chrome扩展程序开发

### `manifest.json`

在项目根目录下创建`manifest.json`文件，其中会涵盖扩展程序的基本信息，并指明需要的权限和资源文件

```json
{
  // 以下为必写
  "manifest_version": 2, // 必须为2，1号版本已弃用
  "name": "扩展程序名称",
  "version": "0.01", // 版本号
  
  // 以下为选填
  
  // 推荐
  "default_locale": "cn",
  "description": "描述",
  "icons": {
    "16": "icons/icon_16.png",
    "48": "icons/icon_48.png",
    "64": "icons/icon_64.png",
    "128": "icons/icon_128.png"
  },
  "author": "ecmadao",
  
  // 根据自己使用的权限填写
  "permissions": [
    // 例如
    "tab",
    "storage",
    // 如果会在js中请求外域API或者资源，则要把外域链接加入
    "http://localhost:5000/*"
  ],
  
  // options_page，指右键点击右上角里的插件logo时，弹出列表中的“选项”是否可点，以及在可以点击时，左键点击后打开的页面
  "options_page": "view/options.html",
  
  // browser_action，左键点击右上角插件logo时，弹出的popup框。不填此项则点击logo不会有用
  "browser_action": {
    "default_icon": {
      "38": "icons/icon_38.png"
    },
    "default_popup": "view/popup.html", // popup页面，其实就是普通的html
    "default_title" : "保存到cliper"
  },
  
  // background，后台执行的文件，一般只需要指定js即可。会在浏览器打开后全局范围内后台运行
  "background": {
    "scripts": ["js/vendor/jquery-3.1.1.min.js", "js/background.js"],
    // persistent代表“是否持久”。如果是一个单纯的全局后台js，需要一直运行，则不需配置persistent（或者为true）。当配置为false时转变为事件js，依旧存在于后台，在需要时加载，空闲时卸载
    "persistent": false
  },
  
  // content_scripts，在各个浏览器页面里运行的文件，可以获取到当前页面的上下文DOM
  "content_scripts": [
    {
      // matches 匹配 content_scripts 可以在哪些页面运行
      "matches" : ["http://*/*", "https://*/*"],
      "js": ["js/vendor/jquery-3.1.1.min.js", "js/vendor/keyboard.min.js", "js/selection.js", "js/notification.js"],
      "css": ["css/notification.css"]
    }
  ]
}
```

综上，我们一共有三种资源文件，针对着三个运行环境：

  - `browser_action`
    - 控制logo点击后出现的弹窗，涵盖相关的html/js/css
  - `background`
    - 在后台持续运行，或者被事件唤醒后运行
  - `content_scripts`
    - 当前浏览的页面里运行的文件，可以操作DOM

#### 注

  - `content_scripts`中如果没有`matches`，则扩展程序无法正常加载，也不能通过“加载未封装的扩展程序”来添加。如果你的`content_scripts`中有js可以针对所有页面运行，则填写`"matches" : ["http://*/*", "https://*/*"]`即可
  - 推荐将`background`中的`persistent`设置为`false`，根据事件来运行后台js

### 不同运行环境之间的交互

### 脚本的区别与生命周期

#### [`content_scripts`](https://crxdoc-zh.appspot.com/extensions/content_scripts)

#### [background](https://crxdoc-zh.appspot.com/extensions/event_pages)

#### runtime

[chrome.runtime](https://crxdoc-zh.appspot.com/extensions/runtime)

#### storage

[chrome.storage](https://crxdoc-zh.appspot.com/apps/storage)

`chrome.storage.sync`

`chrome.storage.local`

API:

`StorageArea.set(object items, function callback)`

`StorageArea.get(string or array of string or object keys, function callback)`

`StorageArea.remove(string or array of string keys, function callback)`

`StorageArea.clear(function callback)`