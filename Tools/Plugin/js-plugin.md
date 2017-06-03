<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JS PLUGIN](#js-plugin)
  - [About animation](#about-animation)
  - [About page-switch](#about-page-switch)
  - [About media](#about-media)
  - [About Data](#about-data)
  - [HTML to..](#html-to)
  - [About Writer](#about-writer)
  - [markdown解析](#markdown%E8%A7%A3%E6%9E%90)
  - [Hotkeys](#hotkeys)
  - [时间日期选择](#%E6%97%B6%E9%97%B4%E6%97%A5%E6%9C%9F%E9%80%89%E6%8B%A9)
  - [Other tools](#other-tools)
  - [函数库](#%E5%87%BD%E6%95%B0%E5%BA%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JS PLUGIN

> mark 一个 [issue](https://github.com/jawil/blog/issues/10) 地址

### About animation

- [mo.js](http://mojs.io/)

> 牛逼的动效库
>
> 墙裂推荐打开官网，静静体会

- [Bounce.js](http://bouncejs.com/)

> 如其名，带有各种弹性效果的动画库，还挺有意思的

- [anime](http://anime-js.com/)

> Javascript Animation Engine

- [Move.js](http://visionmedia.github.io/move.js/)

> 一个JS动效库。还没仔细看它文档

- [Parallax.js](http://matthew.wagerfield.com/parallax/)

> 一个做视差滚动的js库

- [PROGRESS BAR.JS](https://kimmobrunfeldt.github.io/progressbar.js/)
- [SpinThatShit](https://github.com/MatejKustec/SpinThatShit)

> 各种样式的 loading

- [choreographer-js](https://github.com/christinecha/choreographer-js)

> A simple library to take care of complex CSS animations.

- [typed.js](https://github.com/mattboldt/typed.js/)

> 模拟打字效果，需要 jQuery 依赖

- [ityped](https://ityped.surge.sh/)

> 同样是模拟打字效果， 不需要 jQuery 依赖

### About page-switch

- [reveal.js](http://lab.hakim.se/reveal-js/#/)

> 全屏切换。做web ppt的好东西

- [Swiper](http://www.swiper.com.cn/)

> 专注触屏滑动，体会Android上ViewPager的爽快

- [slick](https://github.com/kenwheeler/slick)

> 各种左右滑动效果

- [fullPage.js](http://alvarotrigo.com/fullPage/)

> 上下全屏滑动。现在很多网站首屏上常见到的动效

- [Headroom.js](http://wicky.nillia.ms/headroom.js/)

> 下滑页面隐藏导航栏，上滑展现导航栏
>
> 为页面顶部多留些空间

- [iScroll](https://iiunknown.gitbooks.io/iscroll-5-api-cn/content/index.html)

> 处理页面滚动。
>
> 滚动，缩放，平移，无限滚动，视差滚动，旋转功能

- [scrollreveal](https://github.com/jlmakes/scrollreveal)

> 滚动如丝般顺滑

- [waypoints](http://imakewebthings.com/waypoints/)

> Waypoints is the easiest way to trigger a function when you scroll to an element.

- [glide](http://glide.jedrzejchalubek.com/)

> 轻量级的简单的slider，用起来还行但是文档比较坑

### About media

- [bLazy.js](http://dinbror.dk/blog/blazy/)

> 延迟图片加载，只有当图片首次出现在屏幕内的时候才进行加载。以此提高页面初始化速度

- [Vidage](https://github.com/dvLden/Vidage)

> 全屏背景视频&图片

- [Spectrum](http://bgrins.github.io/spectrum/)

> 基于jQuery的colorPicker，简单易用
>
> 已知bug(?): 在颜色选择面板一直打开的情况下，选择其他颜色之后，无法在回到打开面板是的那个active颜色。
>
> 解决方案: 参数设置`hideAfterPaletteSelect:true`，每次选择完颜色面板都会自动关闭:)

- [VideoJs](http://videojs.com/)

> 用于视频处理的js库

- [PhotoSwipe](http://photoswipe.com/)

> 图片处理的库
>
> 点击图片全屏展示，可左右切换图片

- [Fabric.js](http://fabricjs.com/)

> Fabric.js is a powerful and simple Javascript HTML5 canvas library
>
> html5 canvas绘图插件。挺强大的，基本上只有你想不到没有它做不到。提供的接口可以让你自己进行各种扩展

- [Cropper](http://fengyuanchen.github.io/cropper/)

> A simple jQuery image cropping plugin.
>
> 基于jQuery的图片剪裁库

- [Filterizr](http://yiotis.net/filterizr/)

> Filterizr is a jQuery plugin that searches, sorts, shuffles and applies stunning filters over responsive galleries using CSS3 transitions.

- [granim.js](https://github.com/sarcadass/granim.js)

> 渐变效果

### About Data Visualization

- [Sortable](http://rubaxa.github.io/Sortable/)

> 拖拽排序，非常非常非常方便！
>
> NPM包在这儿：[sortablejs](https://www.npmjs.com/package/sortablejs)

- [Cal-heatmap](http://cal-heatmap.com/)

> 是否还记得github/gitlab上[个人中心里记录自己每日push贡献次数的日历表格](https://github.com/ecmadao)？
>
> 有了这货你也可以做这种酷酷的东西喽

- [Chart.js](http://www.chartjs.org/)

> Simple, clean and engaging charts for designers and developers
>
> 简洁清晰的js chart图表库

- [sigmajs](http://sigmajs.org/)

- [chartist](https://gionkunz.github.io/chartist-js/)

- [DataTables](https://datatables.net/)

> 一个基于 jQuery 的表格插件，可以实现各种表格排序功能

- [tablesorter](https://mottie.github.io/tablesorter/docs/)

> 基于 jQuery 的表格插件，使用起来比 DataTables 简单非常多

- [List.js](http://www.listjs.com/)

> 给 `<ul>` 或 `<table>` 做数据排序/筛选的js插件

- [Moment.js](http://momentjs.com/)

> 轻量级的快速处理时间的插件，便捷的输出各种格式的时间
>
> 可以通过 moment 的方法快速的实现社交媒体上常见的“消息XX秒之前”以及日历上常见的“XX分钟之后”、“下周日”这样的效果

```js
moment(dateString).fromNow(); // 已现在为基准的之前

moment(dateString).toNow(); // 已现在为基准的之后

let before = moment('2016-3-30');
let after = moment('2016-3-31');

before.from(after); // a day ago 相对时间多久之前
before.to(after); // in a day 相对时间多久之后
```

### About Data Storage

- [Basil.js](http://wisembly.github.io/basil.js/)

> 集本地存储、Cookie和Session Storage API于一体，使得前端的存储管理更加方便，允许完全的本地存储

- [storage](https://github.com/alekseykulikov/storage)

> Asynchronous browser storage with multiple back-ends (IndexedDB, WebSQL, localStorage)

- *[Store.js](https://github.com/marcuswestin/store.js)*

> 适用于所有浏览器的本地存储，不使用 cookies 或者 flash。会根据浏览器的不同选择 localStorage, globalStorage, 和 userData 作为存储引擎。

- [js-cookie](https://github.com/js-cookie/js-cookie)

### HTML to..

- [jsPDF](https://github.com/MrRio/jsPDF)

> Render HTML to PDF，但是只有当 HTML 结构与 CSS 样式比较简单时体验较好，适用用把 markdown 类的文章转换为 PDF

- [dom-to-image](https://github.com/tsayen/dom-to-image)

> 把 DOM 转换为图片。同样的，当 DOM 数量多或复杂的时候体验不好（渲染速度慢）

- [to-markdown](https://github.com/domchristie/to-markdown)

> html转markdown

### About Writer

- [snarkdown](https://github.com/developit/snarkdown)

>  轻量级的 Markdown -> HTML 解析

- [tinymce](https://www.tinymce.com/)

> 文本编辑器插件

- [Caret.js](https://github.com/ichord/Caret.js)和[At.js](https://github.com/ichord/At.js)

> 可用于控制textarea光标位置和数据插入，比较方便

- [clipboard.js](https://clipboardjs.com/)

> 剪切板辅助js插件（一键复制什么的）
>
> IE 9+ ok, 然而不支持 Safari

- [MediumEditor](https://yabwe.github.io/medium-editor/)

> 轻量级文本编辑器，没有通常的TextArea式的UI，而会随着用户选择的文字而出现

- [Quill](http://quilljs.com/)

> rich text editor

- [Medium.js](http://jakiestfu.github.io/Medium.js/docs/)

> 感觉挺新颖的，可以研究下

- **[SimpleMDE](https://simplemde.com/)**

> 支持markdown的富文本编辑器

- [marginotes](https://github.com/fdansv/marginotes)

> jQuery插件，文章旁注的效果

- [cleave.js](https://github.com/nosir/cleave.js)
- [text-mask](https://github.com/text-mask/text-mask)

> 格式化 input 的输入

### markdown解析

- [marked](https://github.com/chjj/marked)

> 老牌markdown解析器

- [marky-markdown](https://github.com/npm/marky-markdown)

> npm官方的markdown解析插件

- [Mditor(不推荐)](http://bh-lay.github.io/mditor/)

> 轻量级的Markdown预览插件

- [editor](https://github.com/lepture/editor)

> 还不错的markdown编辑器

- [markdown-it](https://github.com/markdown-it/markdown-it)

> Markdown parser done right. Fast and easy to extend.

- [embed.js](https://github.com/ritz078/embed.js)

> 没用过不太好说。。

### Hotkeys

- [keyboardJS](https://github.com/RobertWHurst/KeyboardJS)

> 算是比较方便的一个键盘按键监听库，不依赖于jquery好评

- [Keypress](https://dmauro.github.io/Keypress/)

> A robust Javascript library for capturing keyboard input

- [jquery.hotkeys](https://github.com/jeresig/jquery.hotkeys)

> 平心而论github star数目还是挺多的，然而没用过

### 时间日期选择

- [pickadate.js](http://amsul.ca/pickadate.js/)

> The mobile-friendly, responsive, and lightweight
> jQuery date & time input picker.
>
> 基于jQuery的 datePicker & timePicker

- **[datedropper](https://github.com/felicegattuso/datedropper)**

> 针对移动端的日期选择

- [react-times](https://github.com/ecmadao/react-times)

> 基于React的时间选择组件，没有jQuery依赖

### Other tools

- [UNDERSCORE.JS](http://underscorejs.org/)

> 工具类函数库，非常之方便。。但是有一点 --> 用太多会被它惯坏啊喂
>
> 推荐看它[源码](http://underscorejs.org/docs/underscore.html)进行学习，深入理解那些函数底层的实现
>
> 另有[汉化版文档](http://www.css88.com/doc/underscore/)

- [favico.js](http://lab.ejci.net/favico.js/)

> 在你网站的favico上展现小徽标，逼死强迫症

- [Messenger](http://www.bootcss.com/p/messenger/)

> 一个Message弹窗组件，基于 jQuery 和 Backbone
>
> 并不是很推荐。。这种东西不如自己写一套来的爽快

- [Modaal](http://humaan.com/modaal/)

> JS弹窗插件
>
> An accessible dialog window plugin for all humans.

- [biu](http://biu.js.org/)

> biu的一下冒出来一个光头~啊不，是弹窗

- [Tipso](http://tipso.object505.com/)

> 鼠标hover上去以后弹出的一个提示框效果

- [FlipClock.js](http://flipclockjs.com/)

> 类似日历翻页效果的插件

- [PLEASE.JS](http://www.checkman.io/please/)

> 生成随机色的js插件，带有过度的动画效果

- *[Feature.js](http://featurejs.com/)*

> 快速有效的检测用户浏览器对各个API的兼容性

- [Hilo](http://hiloteam.github.io/index.html)

> 一个跨终端的互动小游戏解决方案
>
> Hilo不仅仅是一个渲染引擎，它更是一个集成了 Hilo Audio, Hilo Preload 等游戏构建服务的综合解决方案

- [jQuery WeUI](https://lihongxun945.github.io/jquery-weui/)

> WeUI 是微信官方团队针对微信提供的一个H5 UI库，它只提供了一组CSS组件。
>
> jQuery WeUI 中使用的是官方WeUI的CSS代码，并提供了jQuery/Zepto版本的API实现。因为直接使用了官方的CSS，所以你不用担心跟官方版本的冲突。实际上 jQuery WeUI == WeUI + jQuery插件
>
> 同时兼容 jQuery 和 Zepto

- [hammerjs](http://hammerjs.github.io/)

> 手势解析库

- [push.js](https://github.com/Nickersoft/push.js/)

> 浏览器通知插件

- [Slidebars](https://github.com/adchsm/Slidebars)

> jQuery插件，创建侧边栏

- [Leaflet](https://github.com/Leaflet/Leaflet)

> 开源地图组件

- [fusejs](http://fusejs.io/)

> 无依赖JavaScript库，提供模糊搜索（近似字符串匹配）

### 函数库

- [bacon.js](https://github.com/baconjs/bacon.js)

> 基于流的函数库（FRP (functional reactive programming) library for Javascript）

- [mobx](https://github.com/mobxjs/mobx)

> 类似于 Redux 的状态管理器

- [cerebraljs](https://github.com/cerebral/cerebral)

> 状态管理器（A state controller with its own debugger）

- [Rxjs - 5.0](https://github.com/ReactiveX/rxjs)
- [RxJS - 4.x](https://github.com/Reactive-Extensions/RxJS)

> Everything is steam !

