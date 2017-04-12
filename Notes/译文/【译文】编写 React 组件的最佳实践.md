<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译文】编写 React 组件的最佳实践](#%E8%AF%91%E6%96%87%E7%BC%96%E5%86%99-react-%E7%BB%84%E4%BB%B6%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
  - [基于类的组件](#%E5%9F%BA%E4%BA%8E%E7%B1%BB%E7%9A%84%E7%BB%84%E4%BB%B6)
    - [引入 CSS](#%E5%BC%95%E5%85%A5-css)
    - [初始化状态](#%E5%88%9D%E5%A7%8B%E5%8C%96%E7%8A%B6%E6%80%81)
    - [propTypes 和 defaultProps](#proptypes-%E5%92%8C-defaultprops)
    - [方法](#%E6%96%B9%E6%B3%95)
    - [给 `setState` 传递方法](#%E7%BB%99-setstate-%E4%BC%A0%E9%80%92%E6%96%B9%E6%B3%95)
    - [解构 Props](#%E8%A7%A3%E6%9E%84-props)
    - [装饰器](#%E8%A3%85%E9%A5%B0%E5%99%A8)
    - [闭包](#%E9%97%AD%E5%8C%85)
  - [纯函数式组件](#%E7%BA%AF%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)
    - [propTypes](#proptypes)
    - [解构 props 和 defaultProps](#%E8%A7%A3%E6%9E%84-props-%E5%92%8C-defaultprops)
    - [Wrapping](#wrapping)
  - [JSX 中的条件句](#jsx-%E4%B8%AD%E7%9A%84%E6%9D%A1%E4%BB%B6%E5%8F%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 【译文】编写 React 组件的最佳实践

> 本文译自：[Our Best Practices for Writing React Components](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)

![](https://cdn-images-1.medium.com/max/800/1*GEniDHmmO0nkVuKQ8fhLYw.png)

当我第一次写 React 的时候，翻遍了各种编写 React 组件的方法，而不同教程之间有很大的差别。尽管这个框架现在已经日趋成熟，但还没有一个标准的组件编写指导。

在 [MuseFind](https://musefind.com/) 的过去一年里，我们的团队编写了很多 React 组件。我们逐步改进编写的方法直至满意。这篇文章向你展示了我们所建议的最佳实践，希望不管你是新手还是专家，它都能对你有所帮助。

开始前，有几点声明：

- 使用 ES6 和 ES7 语法
- 如果你不明白 UI 组件和容器的差别，可以阅读这篇文章：[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- 欢迎拍砖评论

### 基于类的组件

基于类的组件拥有自己的状态和方法，我们尽可能少的使用它们。

来逐步构建一个组件：

#### 引入 CSS

```javascript
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
```

我喜欢 [CSS in JavaScript](https://medium.freecodecamp.com/a-5-minute-intro-to-styled-components-41f40eb7cd55) 的理念，但没在实战中使用过。它还是个很新的解决方案，不够成熟。所以目前为止，我们还是想以前那样把 CSS 文件引入到各个组件中去。

#### 初始化状态

```javascript
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
export default class ProfileContainer extends Component {
  state = { expanded: false }
```

你也可以使用[老方法](http://stackoverflow.com/questions/35662932/react-constructor-es6-vs-es7)来初始化组件状态，但我们更喜欢这个简洁明了的。

同时，确保将该组件 export 出去。

#### propTypes 和 defaultProps

```javascript
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
export default class ProfileContainer extends Component {
  state = { expanded: false }
 
  static propTypes = {
    model: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  }
 
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
```

`propTypes` 和 `defaultProps` 是静态属性，尽量写在组件内部的开头。它们应该类似于文档的作用一样，让开发者可以尽早的浏览到。

所有的组件都应该拥有 `propTypes`

#### 方法

```javascript
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
export default class ProfileContainer extends Component {
  state = { expanded: false }
 
  static propTypes = {
    model: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  }
 
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }
```

在类组件内，当你把它的方法传递给子组件时，需要确保函数作用域被正确的传递。通常我们利用 `this.handleSubmit.bind(this)` 来实现。

我们认为这样的方式配合 ES6 的箭头函数简洁又清晰。

#### 给 `setState` 传递方法

在上面的例子里，我们是这样实现的 `setState`：

```javascript
this.setState({ expanded: !this.state.expanded })
```

`setState` 中阴暗而不为人知的一点是：它是异步的。介于性能原因，React 会批量改变状态，因此，在 `setState` 调用之后马上获取其状态，此时它可能没有发生变化。

这意味着你不能在 `setState` 中依赖于当前的状态。我们并不知道它此时会是什么！

有一种解决方案 —— 给 `setState` 传递一个函数，该函数以之前的状态为参数：

```javascript
this.setState(prevState => ({ expanded: !prevState.expanded }))
```

（感谢 [Austin Wood](https://medium.com/@indiesquidge) 的贡献）

#### 解构 Props

```javascript
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
export default class ProfileContainer extends Component {
  state = { expanded: false }
 
  static propTypes = {
    model: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  }
 
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ expanded: !prevState.expanded }))
  }
  
  render() {
    const {
      model,
      title
    } = this.props
    return ( 
      <ExpandableForm 
        onSubmit={this.handleSubmit} 
        expanded={this.state.expanded} 
        onExpand={this.handleExpand}>
        <div>
          <h1>{title}</h1>
          <input
            type="text"
            value={model.name}
            onChange={this.handleNameChange}
            placeholder="Your Name"/>
        </div>
      </ExpandableForm>
    )
  }
}
```

在 `render` 方法中，利用解构来获取各属性。

#### 装饰器

```javascript
@observer
export default class ProfileContainer extends Component {
```

如果你使用过类似 [mobx](https://github.com/mobxjs/mobx) 的库，那么对上面这样的装饰器肯定不陌生。它就类似于把一个类传递给了一个函数。

[装饰器](http://javascript.info/tutorial/decorators) 很灵活，并有很好的阅读性。我们通过 mobx 和自己写的 [mobx-models](https://github.com/musefind/mobx-models) 库来大量的使用它。

如果你不想使用装饰器，则可以这么做：

```javascript
class ProfileContainer extends Component {
  // Component code
}
export default observer(ProfileContainer)
```

#### 闭包

避免将闭包传递给子组件，比如：

```javascript
<input
	type="text"
	value={model.name}
	// onChange={(e) => { model.name = e.target.value }}
	// ^ Not this. Use the below:
	onChange={this.handleChange}
	placeholder="Your Name"
/>
```

因为：每次父组件重新渲染时，都会为该 `input` 创建一个新的方法。

如果 `input` 是一个 React 组件，那么子组件会自动调用 `re-render` 来重新渲染，而不管传入它的属性是否真的产生了变化。

重新渲染是 React 中开销最大的部分。当没有必要的时候请无比避免。此外，直接传入类的方法更简单易读，便于改变和调试。

下面是该组件的全部代码：

```javascript
import React, {Component} from 'react'
import {observer} from 'mobx-react'
// Separate local imports from dependencies
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

// Use decorators if needed
@observer
export default class ProfileContainer extends Component {
  state = { expanded: false }
  // Initialize state here (ES7) or in a constructor method (ES6)
 
  // Declare propTypes as static properties as early as possible
  static propTypes = {
    model: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  }

  // Default props below propTypes
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }

  // Use fat arrow functions for methods to preserve context (this will thus be the component instance)
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.name = e.target.value
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ expanded: !prevState.expanded }))
  }
  
  render() {
    // Destructure props for readability
    const {
      model,
      title
    } = this.props
    return ( 
      <ExpandableForm 
        onSubmit={this.handleSubmit} 
        expanded={this.state.expanded} 
        onExpand={this.handleExpand}>
        // Newline props if there are more than two
        <div>
          <h1>{title}</h1>
          <input
            type="text"
            value={model.name}
            // onChange={(e) => { model.name = e.target.value }}
            // Avoid creating new closures in the render method- use methods like below
            onChange={this.handleNameChange}
            placeholder="Your Name"/>
        </div>
      </ExpandableForm>
    )
  }
}
```

### 纯函数式组件

这类组件没有状态和方法，可以的话请尽量使用它们。

#### propTypes

```javascript
import React from 'react'
import { observer } from 'mobx-react'
import './styles/Form.css'
ExpandableForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool
}
// Component declaration
```

同理，`propTypes`属性应该尽可能早的被开发者观察到。而得力于 JavaScript 的**提升**这个特性，我们才能在组件声明之前就进行定义。

#### 解构 props 和 defaultProps

```javascript
import React from 'react'
import { observer } from 'mobx-react'
import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool,
  onExpand: React.PropTypes.func.isRequired
}
function ExpandableForm(props) {
  const formStyle = props.expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={props.onSubmit}>
      {props.children}
      <button onClick={props.onExpand}>Expand</button>
    </form>
  )
```

因为我们的组件只是一个函数，它把 `props` 作为参数传入。因此，可以这样解构：

```javascript
import React from 'react'
import { observer } from 'mobx-react'
import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool,
  onExpand: React.PropTypes.func.isRequired
}

function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}
```

注意，在函数默认接收的参数中，我们可以通过定义 `expanded = false` 来达到和 `defaultProps` 一样的效果。

但要避免下面这样的 ES6 语法：

```javascript
const ExpandableForm = ({ onExpand, expanded, children }) => {
```

看着很好，但实际上该函数是个匿名函数。

这对于 Babel 的编译来说是个问题。此外，也不利于出问题时的调试。

匿名函数在 Jest —— 一个 React 测试库 —— 中也会产生问题。鉴于其现在的问题和调试的关系，我们还是建议使用 `function` 而不是 `const`。

#### Wrapping

如果没有使用装饰器，则可以把函数作为参数传入：

```javascript
import React from 'react'
import { observer } from 'mobx-react'
import './styles/Form.css'

ExpandableForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool,
  onExpand: React.PropTypes.func.isRequired
}

function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}
export default observer(ExpandableForm)
```

下面是该组件的全部代码：

```javascript
import React from 'react'
import { observer } from 'mobx-react'
// Separate local imports from dependencies
import './styles/Form.css'

// Declare propTypes here, before the component (taking advantage of JS function hoisting)
// You want these to be as visible as possible
ExpandableForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool,
  onExpand: React.PropTypes.func.isRequired
}

// Destructure props like so, and use default arguments as a way of setting defaultProps
function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? { height: 'auto' } : { height: 0 }
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}

// Wrap the component instead of decorating it
export default observer(ExpandableForm)
```

### JSX 中的条件句

当你需要在 `render` 中进行大量的判断时可能会遇见这样的挑战。而你应该避免下面这样的写法：

![](https://cdn-images-1.medium.com/max/800/1*4zdSbYcOXTVchgSJqtk0Ig.png)

嵌套的三元表达式绝不是个好点子。

有一些库专门为了解决这类问题而生（[JSX-Control Statements](https://github.com/AlexGilleran/jsx-control-statements)）。但是与其再引入一个依赖，我们更倾向于这么做：

![](https://cdn-images-1.medium.com/max/800/1*IVFlMaSGKqHISJueTC26sw.png)

利用 [IIFE](http://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript) 对其进行包裹，将 if 判断放入其中，返回任何想要渲染的组件。但注意，这样的 IIFE 可能会导致性能问题，但大多数情况下还是宁可牺牲一点性能来换取代码可读性的。

**更新：**

许多评论表示，可以把这段逻辑放入到子组件中，子组件根据 props 来选择性的渲染不同 DOM。这样做肯定没错 —— 分割组件拥有都是很好的选择。但也请牢记于心：IIFE 的实现方式要优于嵌套回调。

当然，如果只是一个简单的判断，那就没必要这么复杂了。

与其这样：

```javascript
{
  isTrue
   ? <p>True!</p>
   : <none/>
}
```

不如：

```javascript
{
  isTrue && 
    <p>True!</p>
}
```

Thanks for reading!