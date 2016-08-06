## [PostCSS](https://github.com/postcss/postcss)

一个类似于webpack的工具，组成CSS编译/lint/autoprefixer的生态环境。

具体的插件，可以根据自己的需要进行安装，而不是像less或者scss一样的全家桶

### Use with webpack

```bash
# 安装webpack postcss loader
npm install postcss-loader --save-dev
```

```javascript
// 配置webpack.config.js
module: {
  loaders: [
    {
      test: /\.css$/,
      // if you use ExtractTextPlugin
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
      // else
      // loader: "style-loader!css-loader!postcss-loader"
    }
  ]
},
postcss: function () {
	return [
		// 假设我们使用下列插件
		// cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全
		// 也可以直接在列表中加入 autoprefixer
		cssnext({autoprefixer: {browsers: "ie >= 10, ..."}}),
		// precss有着类似scss的语法
		precss,
		// 在@import css文件的时候让webpack监听并编译
		postcssImport({ addDependencyTo: webpack })
	];
}
```

以上插件的安装：

```bash
npm install postcss-cssnext --save-dev

npm install autoprefixer --save-dev

npm install precss --save-dev

npm install postcss-import --save-dev
```

### Use stylelint

PostCSS配合[Stylelint](https://github.com/stylelint/stylelint)插件可以让你在编译的时候就知道自己CSS文件里的错误

#### 1. [use with webpack](https://github.com/vieron/stylelint-webpack-plugin)

```bash
npm install stylelint-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const StyleLintPlugin = require('stylelint-webpack-plugin');
// ...
plugins: [
	new StyleLintPlugin(),
],
```

#### 2. [add  configuration](https://github.com/stylelint/stylelint-config-standard)

use standard styelint config as an example

```bash
npm install stylelint-config-standard --save
```

```javascript
// webpack.config.js
// 接着上面的webpack配置继续
plugins: [
	new StyleLintPlugin({
      config: {
      	// 你的lint扩展自刚刚安装的stylelint-config-standard
        "extends": "stylelint-config-standard"
      },
      // 正则匹配想要lint监测的文件
      files: 'frontend/stylesheet/**/*.l?(e|c)ss'
	}),
]
```

#### 3. [StyleLintPlugin config options](https://github.com/vieron/stylelint-webpack-plugin#options)

[stylelint options](http://stylelint.io/user-guide/node-api/#options)里面的配置也可以在plugin里使用。介绍几个常用的配置：

- config：lint基础配置。没有的话则会去寻找`.stylelintrc`
- configFile：lint配置文件。可以被config的配置替代。默认为`.stylelintrc`文件
- context：上下文环境。默认使用webpack的context
- files：要匹配的文件。默认为`['**/*.s?(a|c)ss']`
- failOnError：错误时是否停止编译。默认`false`
- quiet：在console中不打印错误信息。默认`false`