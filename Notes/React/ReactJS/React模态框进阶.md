## React 模态框进阶

以前在写 React 的模态框时，通常会遇见几个问题：

0. 首先，既然是 React，那我们就要尽量避免书写风格不够 React，尽量使用 state 控制组件的状态，而不是通过 jQuery 操作
1. 想要通过底层的某个 DOM 点击事件来打开模态框，而模态框的状态又是通过 state 来控制的。那样的话，要么把模态框放到该 DOM 所在组件里（或者更底层），要么把模态框放在外层，然后在外层组件的 state 里记录其状态
2. 因为模态框所处组件的位置受到限制，其样式也很有可能被父元素、兄弟元素影响
3. 如果使用了 Redux 的话还好，我们可以统一使用 Reducer 来管理状态，但有时候完全没有必要使用 Redux

说来惭愧，我自己使用 Redux 的场景比较多，所以通常不假思索选择了第三种方式，而没有去想更好解决方案。而在没有使用 Redux 的情况下，则是把模态框放在了组件的外层，给外层组件增加 state 来控制模态框的展示。

但现在有了更加优雅的解决方案，即通过[`react-portal`](https://github.com/tajo/react-portal)或者[`react-overlays`](https://github.com/react-bootstrap/react-overlays)，在渲染时改变 DOM 元素插入的位置，将模态框插入到组件外层去。

### [`react-portal`](https://github.com/tajo/react-portal)

先看一下官方给出的例子：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';

export default class App extends React.Component {
  render() {
    const button1 = <button>Open portal with pseudo modal</button>;
    return (
      <Portal closeOnEsc closeOnOutsideClick openByClickOn={button1}>
        <PseudoModal>
          <h2>Pseudo Modal</h2>
          <p>This react component is appended to the document body.</p>
        </PseudoModal>
      </Portal>
    );
  }
}

export class PseudoModal extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <p><button onClick={this.props.closePortal}>Close this</button></p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-body'));
```

看上去就应该是在 id 为`react-body`的 DOM 里渲染了一个 Modal，但实际运行以后可以发现，在`<div id="react-body"></div>`里插入的是一个`button`，点击按钮之后，则在`react-body`的外层插入了 Modal，确切的说，是在 body 里直接插入了 Modal。所以本应该渲染在`react-body`里的组件跑到外面去了。

那这样的话，就可以给我们很多便利了：

1. Modal 组件可以正常接收 props
2. 不用限制 Modal 渲染的位置
3. 不用担心 Modal 的样式被其他组件影响

接下来进入源码时间，先看下 modal 的创建和渲染：

```javascript
import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

export default class Portal extends React.Component {
  constructor() {
    super();
    // 通过 active 来判断 modal 是否打开
    this.state = { active: false };
    // 用于储存加载之后的 modal DOM
    this.portal = null;
    // 用于包含 modal 的 div DOM
    this.node = null;
  }
  
  componentDidMount() {
  	// 在 didMount 中进行事件的监听
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }
    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }
	// 如果初始化时已经要开启 modal，则直接进行 modal 的加载和渲染
    if (this.props.isOpened) {
      this.openPortal();
    }
  }
  
  componentWillReceiveProps(newProps) {
    // 通过 prop 中的 isOpened 来掌控 modal 是否打开的状态
    if (typeof newProps.isOpened !== 'undefined') {
      // 如果 props.isOpened 且 state.active，则渲染一个 modal 加载到 DOM 里
      // 否则通过 openPortal，改变组件 state 并渲染 modal
      if (newProps.isOpened) {        
        if (this.state.active) {
          this.renderPortal(newProps);
        } else {
          this.openPortal(newProps);
        }
      }
      // 否则关闭 modal，并从 DOM 中删除
      if (!newProps.isOpened && this.state.active) {
        this.closePortal();
      }
    }
    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
      this.renderPortal(newProps);
    }
  }

  // 处理可以触发打开 modal 的点击事件
  handleWrapperClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.active) { return; }
    this.openPortal();
  }

  // 在 openPortal 中做三件事：
  openPortal(props = this.props) {
  	// 改变组件本身 state，标记为 active
    this.setState({ active: true });
    // 渲染 modal 到 DOM 里
    this.renderPortal(props);
    // 触发回调
    this.props.onOpen(this.node);
  }

  // 渲染 modal
  renderPortal(props) {
  	// 创建一个新 div DOM 作为 modal 的容器，并插入到 body 里
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }

    let children = props.children;
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    // children 的类型既可以是 React.element，也可以是是一个方法，比如
    // children={() => this.refs.xxxx}，需要返回 ref
    if (typeof props.children.type === 'function') {
      // React.cloneElement API，将根据参数拷贝出一个新的 React 元素，之前元素的 props 会被浅拷贝进去
      // React.cloneElement(
  	  //	element, // 目标节点
  	  //	[props], // 拷贝的属性
  	  //	[...children] // 子节点
  	  // )
  	  // 相当于
  	  // <element.type {...element.props} {...props}>{children}</element.type>
)
      children = React.cloneElement(props.children, { closePortal: this.closePortal });
    }
	// unstable_renderSubtreeIntoContainer 在一个特定 DOM 里渲染组件
	// ReactDOM.unstable_renderSubtreeIntoContainer(
	//		parentComponent, // 父组件
	//		nextElement, // 子组件
	// 		container, // 要绑定的 DOM
	//		callback // 更新好的回调
	// )
    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    );
  }
  
  // 最后，在正常的渲染方法中返回 null；或者如果需要渲染一个触发打开 modal 的 DOM，则返回该 DOM
  render() {
    if (this.props.openByClickOn) {
      return React.cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick });
    }
    return null;
  }
}
```

然后我们要处理 modal 的关闭：

```javascript
// 与 didMount 相呼应，解除事件的绑定并关闭 modal
componentWillUnmount() {
    // document.removeEventListener(xxxx)
    // 并且关闭 modal，从 DOM 里卸载
    this.closePortal(true);
}

closePortal(isUnmounted = false) {
    const resetPortalState = () => {
      if (this.node) {
      	// 直接卸载节点
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      // 清空缓存
      this.portal = null;
      this.node = null;
      if (isUnmounted !== true) {
        this.setState({ active: false });
      }
    };

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState);
      } else {
        resetPortalState();
      }
      this.props.onClose();
    }
}
// 处理外部的点击事件，关闭 modal
handleOutsideMouseClick(e) {
    if (!this.state.active) { return; }
	// 判断点击的位置在不在 modal 内
    const root = findDOMNode(this.portal);
    if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }

    e.stopPropagation();
    this.closePortal();
}
```

### [`react-overlays`](https://github.com/react-bootstrap/react-overlays)

`react-overlays`分离自[`react-bootstrap`](https://github.com/react-bootstrap/react-bootstrap)项目，本身是一个 React 工具集，内部也提供了诸如[`Portal`](https://github.com/react-bootstrap/react-overlays/blob/master/src/Portal.js)或者[`Overlay`](https://github.com/react-bootstrap/react-overlays/blob/master/src/Overlay.js)这样的工具

在`react-overlays`中，`Portal`干的事情更少更纯粹，其作用就是在指定 DOM（或者`body`）中创建一个 DOM，并将`children`渲染进去。

看个栗子：

```javascript
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Portal from 'react-overlays/Portal';

class PortalExample extends React.Component {
  constructor(...args){
    super(...args);
    this.state = { show: false };
    this.show = () => this.setState({ show: true });
  }

  render() {
    let child = (
      <span>But I actually render here!</span>
    );
    return (
      <div className='portal-example'>
        <Button bsStyle='primary' onClick={this.show}>
          Render Child
        </Button>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <span>It looks like I will render here.</span>
			// container 是目标节点，Portal 中的 children 将会渲染到里面
            <Portal container={()=> this.refs.container}>
              { this.state.show && child }
            </Portal>
          </div>
        </div>

        <div className='panel panel-default'>
          <div ref='container' className='panel-body'/>
        </div>
      </div>
    );
  }
}

export default PortalExample;
```

其结果是点击 button 之后，改变`show` state，因而将显示/去除`container`中加载的 Portal

Portal 的 container 属性既可以是`React.element`，也可以是一个方法，但方法要返回一个`ref`

再来看下其源码：

```javascript
// 使用 ES5 的方式
let Portal = React.createClass({
  displayName: 'Portal',
  propTypes: {
    /**
     * container 可以是一个 Node 节点或者 Component，也可以是一二个返回节点的方法。
     * 它将作为最终包裹 Portal children 的元素
     */
    container: React.PropTypes.oneOfType([
      componentOrElement,
      React.PropTypes.func
    ])
  },
  // 渲染
  componentDidMount() {
    this._renderOverlay();
  },
  componentDidUpdate() {
    this._renderOverlay();
  },
  // 处理改变了 container 时的情况
  componentWillReceiveProps(nextProps) {
    if (this._overlayTarget && nextProps.container !== this.props.container) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._portalContainerNode = getContainer(nextProps.container, ownerDocument(this).body);
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  },
  // 卸载
  componentWillUnmount() {
    this._unrenderOverlay();
    this._unmountOverlayTarget();
  },
  // 创建一个包裹 children 的 DOM
  _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div');
      this._portalContainerNode = getContainer(this.props.container, ownerDocument(this).body);
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  },
  // 卸载 overlayTarget
  _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
    this._portalContainerNode = null;
  },
  // 渲染 overlay
  _renderOverlay() {
  	// React.Children.only 方法返回 children 中的单个元素，如果有多个 children 作为 Portal 的子元素则该方法会报错，因此确保了 Portal 中一只包含一个直接子元素
    let overlay = !this.props.children
      ? null
      : React.Children.only(this.props.children);

    // 将 overlay 渲染到 this._overlayTarget 中
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
        this, overlay, this._overlayTarget
      );
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  },
  // 卸载 overlay
  _unrenderOverlay() {
    if (this._overlayTarget) {
      ReactDOM.unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    }
  },

  render() {
    return null;
  },

  getMountNode(){
    return this._overlayTarget;
  },

  getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }
    if (this._overlayInstance) {
      return ReactDOM.findDOMNode(this._overlayInstance);
    }
    return null;
  }
});

export default Portal;
```

可以看到，`bootstrap`的`Portal`仅仅只是单纯的把`children`渲染到外层或者指定节点，而不会处理开启/关闭事件

### 总结

可以看到，`Portal`的核心模式如下：

- 通过如下方式使用

```javascript
<Portal>
	<div> Child component </div>
</Portal>
// 或者
<Portal children={() => this.refs.childComponent}>
</Portal>
```

- 将`children`渲染到`body`或者指定 DOM 中

- 在`render`方法里返回`null`，至少不返回要渲染的`children`

- 要在 class 内创建一个包裹 children 的 DOM

- 在渲染的时候，通过`ReactDOM.unstable_renderSubtreeIntoContainer`将`children`渲染到某个 DOM 里

- 在卸载的时候，通过`ReactDOM.unmountComponentAtNode`将`children`及其父元素去除

