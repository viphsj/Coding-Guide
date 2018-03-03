<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Node.js Plugin](#nodejs-plugin)
  - [User-Agent](#user-agent)
  - [Http](#http)
  - [命令行](#%E5%91%BD%E4%BB%A4%E8%A1%8C)
  - [Callback](#callback)
  - [System](#system)
  - [Tool](#tool)
    - [生成随机 ID](#%E7%94%9F%E6%88%90%E9%9A%8F%E6%9C%BA-id)
  - [Server](#server)
  - [GraphQL](#graphql)
  - [Progress](#progress)
  - [定时任务](#%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1)
  - [消息队列](#%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97)
  - [爬虫](#%E7%88%AC%E8%99%AB)
  - [Machine Learning](#machine-learning)
    - [Tools](#tools)
    - [Intro](#intro)
  - [矩阵运算](#%E7%9F%A9%E9%98%B5%E8%BF%90%E7%AE%97)
  - [Schema](#schema)
  - [Others](#others)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Node.js Plugin

### User-Agent

- [platform.js](https://github.com/bestiejs/platform.js)
- [useragent](https://github.com/3rd-Eden/useragent)
- [ua-parser-js](https://github.com/faisalman/ua-parser-js)
- [express-useragent](https://github.com/biggora/express-useragent/)
- [koa-useragent](https://github.com/rvboris/koa-useragent)

### Http

- [superagent](https://github.com/visionmedia/superagent)
- [request](https://github.com/request/request)
- [request-promise](https://github.com/request/request-promise)
- [request-promise-native](https://github.com/request/request-promise-native)
- [urllib](https://github.com/node-modules/urllib)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- [strong-soap](https://github.com/strongloop/strong-soap)

### 命令行

- [commander.js](https://github.com/tj/commander.js)
- [shelljs](https://github.com/shelljs/shelljs)
- [chalk](https://github.com/chalk/chalk)
- [co-prompt](https://github.com/tj/co-prompt)
- [progress](https://github.com/visionmedia/node-progress)
- [yargs](https://github.com/yargs/yargs)

### Callback

- [bluebird](https://github.com/petkaantonov/bluebird)
- [co](https://github.com/tj/co)

### System

- [node-fs-extra](https://github.com/jprichardson/node-fs-extra)
- [ncp](https://github.com/AvianFlu/ncp)
- [node-klaw](https://github.com/jprichardson/node-klaw)
- [string.js](https://github.com/jprichardson/string.js)
- [mkdirp](https://github.com/substack/node-mkdirp)
- [rimraf](https://github.com/isaacs/rimraf)
- [memwatch](https://github.com/lloyd/node-memwatch) 【内存监控】
- [current-processes](https://github.com/branneman/current-processes) 【检查内存占用】
- [compute-cluster](https://github.com/lloyd/node-compute-cluster) 【开启子进程】

### Tool

- [cross-env](https://github.com/kentcdodds/cross-env)
- [cpx](https://github.com/mysticatea/cpx)
- [doctoc](https://github.com/thlorenz/doctoc)
  一个 Node.js 组件，为你的Markdown文件自动化添加目录。你看见的本文的目录就是由doctoc添加的

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [xss](https://github.com/leizongmin/js-xss)
- [node-bunyan](https://github.com/trentm/node-bunyan)
- [casual](https://github.com/boo1ean/casual) 【Mock 工具】

#### 生成随机 ID

- [node-uuid](https://github.com/kelektiv/node-uuid)
- [js-shortid](https://github.com/zzzhan/js-shortid)
- [guid](https://github.com/dandean/guid)
- [node-hat](https://github.com/substack/node-hat)
- [shortid](https://github.com/dylang/shortid)

### Server

- [nodemon](https://github.com/remy/nodemon)
- [http-server](https://github.com/indexzero/http-server)
- [json-server](https://github.com/typicode/json-server)

### GraphQL

- [graphql.js](https://github.com/graphql/graphql-js/)
- [graphql-tools](https://github.com/apollographql/graphql-tools)
- [apollo-server](https://github.com/apollographql/apollo-server)

### Progress

- [pm2](https://github.com/Unitech/pm2)
- [forever](https://github.com/foreverjs/forever)

### 定时任务

- [node-schedule](https://github.com/node-schedule/node-schedule) 【Node.js 定时任务】
- [cron-parser](https://github.com/harrisiirak/cron-parser) 【时间设定工具，辅助定时任务】
- [cron](https://github.com/kelektiv/node-cron)
- [node-cron](https://github.com/merencia/node-cron)
- [later](https://github.com/bunkat/later)

### 消息队列

- [coffee-resque](https://github.com/technoweenie/coffee-resque)
- [super-queue](https://github.com/SuperID/super-queue)
- [disque](https://github.com/antirez/disque)
- [disqueue-node](https://github.com/gideonairex/disqueue-node)
- [disq](https://github.com/djanowski/disq)
- [bull](https://github.com/OptimalBits/bull)
- [node-resque](https://github.com/taskrabbit/node-resque)
- [rsmq](https://github.com/smrchy/rsmq)
- [kue](https://github.com/Automattic/kue)

文章

- [node消息队列](https://mp.weixin.qq.com/s?__biz=MzAxMTU0NTc4Nw==&mid=222389072&idx=1&sn=c0baf99bda2c74aa8b4fd0e2a2b14096#rd)
- [从Redis谈起（三）—— Redis和消息中间件](https://mp.weixin.qq.com/s?__biz=MzAxMjgyMTY1NA==&mid=401601934&idx=1&sn=f87768708cdfe54fb6c302f203f3af44#rd)

### 爬虫

- [x-ray](https://github.com/matthewmueller/x-ray)
- [**cheerio**](https://github.com/cheeriojs/cheerio) 【Node.js 爬虫工具，可以在服务端像使用 jQuery 一样解析获取的 HTML】

### Machine Learning

#### Tools

- [machine_learning](https://github.com/junku901/machine_learning) 【据说 API 很友好】
- [brain.js](https://github.com/harthur-org/brain.js/) 【创建神经网络的库，通过输入/输出数据进行训练】
- [neurojs](https://github.com/janhuenermann/neurojs) 【没有适当的文档】
- [ml](https://github.com/mljs/ml)
- [convnetjs](https://github.com/karpathy/convnetjs) 【不再积极维护，适合于对神经网络有较多经验的人使用】
- [mind](https://github.com/stevenmiller888/mind)
- [synaptic](https://github.com/cazala/synaptic) 【维护活跃】
- [thing-translator](https://github.com/dmotz/thing-translator) 【图像识别】
- [playground](https://github.com/tensorflow/playground) 【可用于学习，[tensorflow](https://github.com/tensorflow) 出品】
- [regression-js](https://github.com/tom-alexander/regression-js) 【线性拟合】
- [shaman](https://github.com/luccastera/shaman) 【包含了普通的线性拟合和分类】
- [deeplearn](https://github.com/PAIR-code/deeplearnjs)
- [natural](https://github.com/NaturalNode/natural) 【自然语言处理】

#### Intro

- [FlappyLearning](https://github.com/xviniette/FlappyLearning) 【可用于学习，源码少，值得看】
- [teachable-machine](https://github.com/googlecreativelab/teachable-machine)
- [deeplearningbook-chinese](https://github.com/exacity/deeplearningbook-chinese)
- [tensorflow-zh](https://github.com/jikexueyuanwiki/tensorflow-zh)
- [have-fun-with-machine-learning](https://github.com/humphd/have-fun-with-machine-learning)
- [Deep-Learning-Papers-Reading-Roadmap](https://github.com/songrotek/Deep-Learning-Papers-Reading-Roadmap)
- [TopDeepLearning](https://github.com/aymericdamien/TopDeepLearning)

### 矩阵运算

- [ml-matrix](https://github.com/mljs/matrix) 【矩阵运算，ml 系列独立出去的一个包】
- [node-sylvester](https://github.com/NaturalNode/node-sylvester)
- [sylvester](https://github.com/jcoglan/sylvester)
- [mathjs](https://github.com/josdejong/mathjs)

其他资源

- [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning)
- [awesome-machine-learning-cn](https://github.com/jobbole/awesome-machine-learning-cn)
- [机器学习该怎么入门？](https://www.zhihu.com/question/20691338)
- [机器学习入门资源不完全汇总](http://ml.memect.com/article/machine-learning-guide.html#%E5%85%A5%E9%97%A8%E6%94%BB%E7%95%A5)
- [MachineLearning](https://github.com/apachecn/MachineLearning)
- [py-ml-tutorials](https://github.com/MorvanZhou/tutorials)

### Schema

- [node-orm2](https://github.com/dresende/node-orm2)
- [joi](https://github.com/hapijs/joi)
- [normalizr](https://github.com/paularmstrong/normalizr)
- [sequelize](https://github.com/sequelize/sequelize)

### Others

- [phantomjs-node](https://github.com/amir20/phantomjs-node)
  - [How to evaluate a page using awaitFor to load dynamic contents](https://github.com/amir20/phantomjs-node/issues/431)
  如果有类似 `waitFor` 的需求，即保持阻塞直到触发某种条件，一般是用来通过检查某个 DOM 是否存在，来判断页面是否加载完成，以便进行下一步的操作（比如截图）。可以通过上面的 issue 来实现这样的需求。

- [jsinspect](https://github.com/danielstjules/jsinspect) 【检查代码中的重复代码，虽然不是非常精准，但对优化代码也有一定帮助。】
- [nodemailer](https://github.com/nodemailer/nodemailer) 【Node.js 发送邮件】
- [debug](https://github.com/visionmedia/debug) 【Tiny node.js & browser debugging utility for your libraries and applications】
- [url-to-pdf-api](https://github.com/alvarcarto/url-to-pdf-api)
- [node-cache-manager](https://github.com/BryanDonovan/node-cache-manager) 【缓存】
- [slate](https://github.com/lord/slate) 【搭建 API 文档】
- [winston](https://github.com/winstonjs/winston) 【logger】