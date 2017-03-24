<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [【译】React 高阶组件](#%E8%AF%91react-%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6)
  - [使用 HOC 处理跨组件的需求](#%E4%BD%BF%E7%94%A8-hoc-%E5%A4%84%E7%90%86%E8%B7%A8%E7%BB%84%E4%BB%B6%E7%9A%84%E9%9C%80%E6%B1%82)
  - [不要修改原有组件，而是组合组件](#%E4%B8%8D%E8%A6%81%E4%BF%AE%E6%94%B9%E5%8E%9F%E6%9C%89%E7%BB%84%E4%BB%B6%E8%80%8C%E6%98%AF%E7%BB%84%E5%90%88%E7%BB%84%E4%BB%B6)
  - [公约：不相关的参数不应该传递给被包裹的组件](#%E5%85%AC%E7%BA%A6%E4%B8%8D%E7%9B%B8%E5%85%B3%E7%9A%84%E5%8F%82%E6%95%B0%E4%B8%8D%E5%BA%94%E8%AF%A5%E4%BC%A0%E9%80%92%E7%BB%99%E8%A2%AB%E5%8C%85%E8%A3%B9%E7%9A%84%E7%BB%84%E4%BB%B6)
  - [公约：最大化其组合能力](#%E5%85%AC%E7%BA%A6%E6%9C%80%E5%A4%A7%E5%8C%96%E5%85%B6%E7%BB%84%E5%90%88%E8%83%BD%E5%8A%9B)
  - [公约：给容器一个名词，以便 debug](#%E5%85%AC%E7%BA%A6%E7%BB%99%E5%AE%B9%E5%99%A8%E4%B8%80%E4%B8%AA%E5%90%8D%E8%AF%8D%E4%BB%A5%E4%BE%BF-debug)
  - [忠告](#%E5%BF%A0%E5%91%8A)
    - [不要在 render 方法内使用 HOC](#%E4%B8%8D%E8%A6%81%E5%9C%A8-render-%E6%96%B9%E6%B3%95%E5%86%85%E4%BD%BF%E7%94%A8-hoc)
    - [静态方法需要被复制](#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95%E9%9C%80%E8%A6%81%E8%A2%AB%E5%A4%8D%E5%88%B6)
    - [ref 不会被传递](#ref-%E4%B8%8D%E4%BC%9A%E8%A2%AB%E4%BC%A0%E9%80%92)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 【译】React 高阶组件

> 本文翻译自 React 官方文档：[Higher-Order Components](https://facebook.github.io/react/docs/higher-order-components.html)

高阶组件（ higher-order component ，HOC ）是 React 中复用组件逻辑的一种进阶技巧。它本身并不是 React 的 API，而是一种 React 组件的设计理念。

说具体点，高阶组件就是以一个组件为参数，并返回新组件的方法。

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

普通的组件把 props 传递给 UI，而高阶组件则以组件为参数，传递给其他组件。

在本篇文档中，我们将要讨论高阶组件的重要性，并尝试着写自己的高阶组件。

### 使用 HOC 处理跨组件的需求

组件是 React 中的一等公民。但是，你可能会发现一些设计模式并不能很好的和传统的 React 组件相匹配。

例如，有一个 `CommentList` 组件，监听外部的数据源并以此渲染一个评论列表：

```javascript
class CommentList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

后来，你需要再写一个监听博客发布的组件，它的和之前的评论列表在一些模式上很像：

```javascript
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <BlogPost blogPost={this.state.blogPost} />;
  }
}
```

`CommentList` 和 `BlogPost` 并不相同 —— 它们调用 `DataSource` 上的不同方法，而且输出也不同。但它们的许多实现过程是一样的：

- 在组件挂载之后，给 `DataSource` 增加一个变化的监听
- 在监听函数内，当数据改变时就调用 `setState` 方法
- 在组件卸载之后，移除监听者

可以想象，在一个大型 App 中，类似模式的监听和状态改变会被重复使用很多很多次。我们需要一个抽象的方式，把这种逻辑放在同一个地方，然后让我们的组件去共享它。由此，就诞生了高阶组件的概念。

我们可以写一个创建组件的函数，让创建的组件注册 `DataSource` 的监听（比如 `CommentList` 和 `BlogPost` ），这个函数要以组件为参数，而组件则要以 `DataSource` 的数据作为 `props` 。我们把这个方法叫做 `withSubscription`：

```javascript
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
});
```

第一个参数是需要被包裹的组件，而第二个参数则用于接收我们需要的数据。

当 `CommentListWithSubscription` 和 `BlogPostWithSubscription` 被渲染时，`CommentList` 和 `BlogPost` 会收到从 `DataSource` 中获取的数据，并作为它们的 `data` 传入其中：

```javascript
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

要注意的是，HOC 并不会修改传入的组件，也不会通过继承来拷贝其行为。HOC 只是将原有组件做了一层包裹，它只是一个没有任何副作用的纯函数。

被包裹的组件会收到父组件所收到的所有 props。HOC 不关心数据的使用，而被包裹的组件则不需要关心数据是从哪儿来的。

鉴于 `withSubscription` 只是一个普通的函数，你可以在上面增加任意的参数。例如，你或许想让数据的名称可配置，以便未来将 HOC 和被包裹的组件独立开；或者接受参数来配置 `shouldComponentUpdate` 或数据源。因为 HOC 对于容器组件的创建掌控着全权，所以这些功能都是可实现的。

就像一般的组件一样，`withSubscription` 和被包裹的组件之间完全依赖 props 联系。这使得一个 HOC 可以轻易的被其他 HOC 所包裹（只要父组件提供了子组件所需的 props ）。当你需要更新数据源时，这种特性就显得十分有用。

### 不要修改原有组件，而是组合组件

要抵制在 HOC 内修改原有组件的诱惑。

```javascript
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  }
  // 实际上 InputComponent 组件已经被修改过了
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```

这会造成几个问题：Input 组件在脱离了增强组件（ enhanced component ）之后无法复用。更要命的是，如果你把另一个 HOC 代入 `EnhancedComponent`，而它也修改了 `componentWillReceiveProps` 方法的话，第一个 HOC 的方法会被覆盖，也不会有自己的生命周期函数。

修改 HOC 会降低抽象性 —— 调用者必须了解其内部实现，以避免和其他 HOC 的冲突。

与修改相反的是，HOC 应该使用**组合**的方式。比如上例，我们应该将 Input 组件包裹在一个容器组件里：

```javascript
function logProps(WrappedComponent) {
  // 创建了一个匿名组件
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // 将传入的组件包裹在匿名组件里，
      // 并不修改原有组件，而是利用匿名组件的声明周期
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

这个 HOC 有着和之前版本一样的功能，同时也避免了潜在的冲突。因为它只是个纯函数，因此可以和其他的 HOC（甚至它自身）随意组合。

你可能听说过 HOC 和**容器组件**设计模式之间的相似性。容器组件是一种分离高阶与低阶组件责任的一种策略。容器会负责管理 state 和事件监听，并将数据传递给子组件来渲染 UI。HOC 则将容器作为其实现的一部分，你可以将 HOC 看做是容器的生产工厂。

### 公约：不相关的参数不应该传递给被包裹的组件

HOC 可以给组件添加新特性，但它们不应该修改原有的约定。一个从 HOC 返回的组件应该和原组件一样，拥有着相同的接口。

HOC 不应该将与子组件不相关的属性传递给它。大多数 HOC 的 render 方法类似这样：

```javascript
render() {
  // 筛选出 HOC 特有且不应该传递下去的属性
  const { extraProp, ...passThroughProps } = this.props;

  // 将 props 注入到被包裹的组件中
  // Inject props into the wrapped component. These are usually state values or
  // instance methods.
  const injectedProp = someStateOrInstanceMethod;

  // Pass props to wrapped component
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

这个公约确保了 HOC 的可扩展性和可复用性。

### 公约：最大化其组合能力

并不是所有的 HOC 都看起来一样。它们有时仅接受需要包裹的组件这一个参数：

```javascript
const NavbarWithRouter = withRouter(Navbar);
```

通常，HOC 会接受其他附加的参数。在 Relay 的这个例子里，接受了一个 config 参数，它用于指定组件的数据依赖：

```javascript
const CommentWithRelay = Relay.createContainer(Comment, config);
```

而最常见的 HOC 则是这样：

```javascript
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(Comment);
```

难懂？但是如果你将其分离开来，则很容易看明白：

```javascript
// connect 是一个函数，它返回另一个函数
const enhance = connect(commentListSelector, commentListActions);
// 返回的函数是一个 HOC，以一个组件为参数，返回一个连接到 Redux store 的组件
const ConnectedComment = enhance(CommentList);
```

换句话说，`connect` 是一个高阶函数，它返回一个高阶组件。

这看起来似乎令人困扰，也没什么用处，但有一个很赞的特性。接收单一参数的 HOC ，比如 `connect` 返回的高阶组件，都遵循 `Component => Component` 的特性。输入、输出类型一样的函数更容易组合在一起。

```javascript
// 与这种做法相比
const EnhancedComponent = connect(commentSelector)(withRouter(WrappedComponent))

// 你可以使用函数组合
// compose(f, g, h) 和 (...args) => f(g(h(...args))) 效果一样
const enhance = compose(
  // 他们都是接收单一参数的 HOC
  connect(commentSelector),
  withRouter
)
const EnhancedComponent = enhance(WrappedComponent)
```

（这个特性使得 `connect` 和其他增强型 HOC 可以被当做装饰器来使用）

`compose` 函数在许多第三方库中都有提供，比如 [`lodash`](https://lodash.com/docs/#flowRight)、[`Redux`](http://redux.js.org/docs/api/compose.html)、[`Ramda`](http://ramdajs.com/docs/#compose)

### 公约：给容器一个名词，以便 debug

通过 HOC 创建的容器组件，也会在 [React Developer Tools](https://github.com/facebook/react-devtools) 中展现出来。因此，为了能够更加便捷的 debug，建议创建容器组件时为其命名。

最常见的做法是根据被包裹的组件名来命名。如果你的高阶组件叫做 `withSubscription` ，被包裹的组件叫做 `CommentList` ，那么容器组件名则为 `WithSubscription(CommentList)` :

```javascript
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

### 忠告

#### 不要在 render 方法内使用 HOC

React 的 Diff 算法利用组件的身份验证来决定是否应该更新树中的某个组件，或者去除掉它并渲染一个新的组件。如果一个从 `render` 方法中返回的组件被认为与之前渲染的组件一样（`===`），React 会检测两者的不同并更新 UI；如果不一样，则之前渲染的组件会被卸载掉。

一般来说，不不需要去考虑这些。但这些概念对于 HOC 而言则很重要，它意味着你不能在组件的渲染方法中使用 HOC（因为 HOC 每次都会创建一个新的容器组件）

```javascript
render() {
  // EnhancedComponent 在每次 render 的时候都会创建新的组件
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这会导致每次 render 时树都会 unmount/remount，降低了性能
  return <EnhancedComponent />;
}
```

这个问题不仅仅关乎性能 —— 重复的挂载组件会使它的状态和子组件丢失。

因此，应该在组件定义的外部调用 HOC ，使其返回的组件只生成一次，它的身份在 render 的时候也是可持续的。

有时候，你需要动态的调用 HOC，那样的话你可以在组件的生命周期函数里调用高阶组件。

#### 静态方法需要被复制

有时候需要在 React 组件中创建静态方法。例如，Relay 容器暴露了一个名为 `getFragment` 的静态方法来促进和 GraphQL 框架的组合。

当你通过 HOC 创建组件的时候，原有组件被容器组件包裹。这意味着容器组件不含有原有组件的静态方法。

```javascript
// 创建静态方法
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply an HOC
const EnhancedComponent = enhance(WrappedComponent);

// 新组件没有静态方法
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

为了解决这个问题，你需要在包裹之前把静态方法拷贝给容器组件：

```javascript
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

但是，这需要你知道有哪些静态方法需要被拷贝。你可以使用 [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) 来自动拷贝非原生 React 方法的静态方法：

```javascript
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

还有一种方法是将静态方法完全从组件中独立出去：

```javascript
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```

#### ref 不会被传递

尽管高阶组件的约定是把所有的 props 传递给被包裹的组件，但它并不能传递 ref。那是因为 `ref` 实际上并不是 prop —— 就像 `key` 一样，它们会被 React 特殊对待。如果你给 HOC 传递了 ref，它将指向容器组件而不是被包裹的组件。

面对这种问题，最好的解决方案是**完全避免使用 `ref` **。但有时 ref 是必要的 “逃生仓口” —— 否则 React 也不会去支持它。例如，聚焦一个 input ，一种解决方案是将 ref 作为普通的 props 传递给组件：

```javascript
function Field({ inputRef, ...rest }) {
  return <input ref={inputRef} {...rest} />;
}

// 将 Field 在高阶组件里包裹起来
const EnhancedField = enhance(Field);

// 在组件的 render 方法内..
<EnhancedField
  inputRef={(inputEl) => {
    // This callback gets passed through as a regular prop
    this.inputEl = inputEl
  }}
/>

// Now you can call imperative methods
this.inputEl.focus();
```

但这并不是最佳解决方案。我们更加提倡将 ref 作为库自身所关注的东西，而不是你手动去处理它们。