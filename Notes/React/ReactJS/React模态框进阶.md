## React 模态框进阶

以前在写 React 的模态框时，通常会遇见几个问题：

0. 首先，既然是 React，那我们就要尽量避免书写风格不够 React，尽量使用 state 控制组件的状态，而不是通过 jQuery 操作
1. 想要通过底层的某个 DOM 点击事件来打开模态框，而模态框的状态又是通过 state 来控制的。那样的话，要么把模态框放到该 DOM 所在组件里（或者更底层），要么把模态框放在外层，然后在外层组件的 state 里记录其状态
2. 因为模态框所处组件的位置受到限制，其样式也很有可能被父元素、兄弟元素影响
3. 如果使用了 Redux 的话还好，我们可以统一使用 Reducer 来管理状态，但有时候完全没有必要使用 Redux

说来惭愧，我自己使用 Redux 的场景比较多，所以通常不假思索选择了第三种方式，而没有去想更好解决方案。而在没有使用 Redux 的情况下，则是把模态框放在了组件的外层，给外层组件增加 state 来控制模态框的展示。

但现在有了更加优雅的解决方案，即通过[`react-portal`](https://github.com/tajo/react-portal)或者[`react-overlays`](https://github.com/react-bootstrap/react-overlays)，在渲染时改变 DOM 元素插入的位置，将模态框插入到组件外层去。

### [`react-portal`](https://github.com/tajo/react-portal)