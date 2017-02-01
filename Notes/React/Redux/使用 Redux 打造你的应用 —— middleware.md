<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [使用 Redux 打造你的应用 —— middleware](#%E4%BD%BF%E7%94%A8-redux-%E6%89%93%E9%80%A0%E4%BD%A0%E7%9A%84%E5%BA%94%E7%94%A8-%E2%80%94%E2%80%94-middleware)
  - [`applyMiddleware`](#applymiddleware)
  - [middleware](#middleware)
  - [redux-promise](#redux-promise)
  - [redux-promise-middleware](#redux-promise-middleware)
  - [redux-thunk](#redux-thunk)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 使用 Redux 打造你的应用 —— middleware

### `applyMiddleware`

我们先来复习一下 redux 的 `middleware`，以及 `applyMiddleware` 对中间件进行的串联处理。

源码解读：

```javascript
// 定义一个代码组合的方法
// 传入一些function作为参数，返回其链式调用的形态。例如，
// compose(f, g, h) 最终返回 (...args) => f(g(h(...args)))
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}

export default function applyMiddleware(...middlewares) {
  // 最终返回一个以createStore为参数的匿名函数
  // 这个函数返回另一个以reducer, initialState, enhancer为参数的匿名函数
  return (createStore) => (reducer, initialState, enhancer) => {
    var store = createStore(reducer, initialState, enhancer)
    var dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    // 每个 middleware 都以 middlewareAPI 作为参数进行注入调用，返回一个新的链。此时的返回值相当于调用 thunkMiddleware 返回的函数： (next) => (action) => {} ，接收一个next作为其参数
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 并将链代入进 compose 组成一个函数的调用链
    // compose(...chain) 返回形如(...args) => f(g(h(...args)))，f/g/h都是chain中的函数对象。
    // 之后以 store.dispatch 作为参数进行注入
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

在 `applyMiddleware` 内部，传入的所有 middleware 通过 `map` 进行遍历，每个 middleware 都以 `{ getState: store.getState, dispatch: (action) => dispatch(action) }` 为参数进行一次调用。在这之后，通过 `compose` 方法进行代码组合：

```javascript
// 传入一些function作为参数，返回其链式调用的形态。例如，
// compose(f, g, h) 最终返回 (...args) => f(g(h(...args)))
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}
```

所有的 middleware 形成一个层层包含的调用链。然后再以 `store.dispatch` 为参数进行调用。每一层 middleware 的调用，都会返回一个新的、被包裹封装了的 dispatch 函数（在每一层的封装里，middleware 可以调用到 `action`、`getState` API，以此做到自己想做的事情 ），最终返回一个新的 `dispatch`：

```javascript
dispatch = compose(...chain)(store.dispatch) // 这个 dispatch 作为最终 redux 应用的 dispatch 函数
```

由此可见，在通过 `applyMiddleware` 封装了 middleware 之后，每次 `dispatch(someAction)` ，会以此把 action 传入各个 middleware 中，middleware 可以做自己想做的操作，比如输出 log，调用 promise 等。

### middleware

由上可见，middleware 的规范是有一定限制。

```javascript
const middleware = ({ dispatch, getState }) =>
	(next) => (action) => {
      // do something
      return next(action);
	}
```

`next` 其实就是被改变过的 `dispatch` 函数。在每个 middleware 中，可以收到用户分发的 `action` 函数；进行完自己的操作以后，需要通过 `next` 继续将 `action` 分发下去。

因此，你可以自己尝试写一个简单的 输出 log 的 middleware：

```javascript
const logger = ({ getState }) => (next) => (action) => {
  console.log(getState());
  return next(action);
};
```

然后在 `applyMiddleware` 中进行注入：

```javascript
const AppStore = createStore(appReducer, initialState, applyMiddleware(logger));
```

这样，每当应用 dispatch action 的时候，都会输出当前的 state。

关于 middleware 的更多阅读资料：

- [A Beginner's Guide to Redux Middleware](https://www.codementor.io/vkarpov/beginner-s-guide-to-redux-middleware-du107uyud)
- [Middleware -- redux doc](http://redux.js.org/docs/advanced/Middleware.html)

### [redux-promise](https://github.com/acdlite/redux-promise)

redux-promise 是一个相当简洁的小库，它帮助你完成异步请求以后自动分发到 reducer，并且在失败（reject）的时候停止继续分发。

```javascript
// 注入 middleware
import promiseMiddleware from 'redux-promise';

const AppStore = createStore(appReducer, initialState, applyMiddleware(promiseMiddleware));
```

```javascript
// actions.js
// 在 action 中使用异步
import API from 'some api func';

// API.getThing 返回的应该是个 promise，并且需要直接将结果代入 reducer
export const getThing = createAction('GET_THING', API.getThing);

// 相当于：
const getThing = createAction('GET_THING');
const fetchThing = () => (dispatch, getState) => {
  API.getThing.then(result => dispatch(getThing(result)));
};
```

由此可见，在使用了 redux-promise 之后，在通过 `createAction` 创建 action 时可以直接代入 promise 。也就是说，redux-promise 中间件在其内部帮我们完成了 `promise.then` 的调用，并将最终结果传递给了 `action.payload`。

redux-promise 源码：

```javascript
import { isFSA } from 'flux-standard-action';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    // 对于非 FSA 的 action 而言，如果 action 是个 Promise，则调用 then 方法，并把 dispatch 作为参数代入
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }
	// 否则，这个 action 是一个标准 action，返回值类似：
    // {
    //  type: '',
    //	payload: '',
    //	error: bool
    // }
    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```

顺便看一眼 [`flux-standard-action`](https://github.com/acdlite/flux-standard-action)：

```javascript
import isPlainObject from 'lodash.isplainobject';
import isString from 'lodash.isstring';
import isSymbol from 'lodash.issymbol';

export function isFSA(action) {
  return (
    // action 必须是一个 plan object
    isPlainObject(action) &&
    // type 是 String 或者 Symbol
    (isString(action.type) || isSymbol(action.type)) &&
    // action object 的每一个 key 都是合法的，只存在于 ['type', 'payload', 'error', 'meta'] 中
    Object.keys(action).every(isValidKey)
  );
}

export function isError(action) {
  return action.error === true;
}

function isValidKey(key) {
  return [
    'type',
    'payload',
    'error',
    'meta',
  ].indexOf(key) > -1;
}
```

### [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)

与 redux-promise 类似的一个库，其内部对 action 的判断更加仔细，但原理和 redux-promise 一样，不再赘述。

### [redux-thunk](https://github.com/gaearon/redux-thunk)

在没有 redux-thunk 的情况下，我们写的 action 必须是同步的，且最后必须返回一个类似

```javascript
function increment(value) {
  return {
    type: INCREMENT_COUNTER,
    payload: value
  };
}
```

的对象，以便分发给 reducer。

而借助于 redux-thunk ，我们可以把 action 写成 middleware 的形式，在其中进行异步，或者分发其他的 action：

```javascript
import thunk from 'redux-thunk';
const AppStore = createStore(appReducer, initialState, applyMiddleware(thunk));

// actions.js
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

更多参考：

- [In-depth introduction to thunks in Redux](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

redux-thunk 源码：

```javascript
// 相当简单。检测每个 action 的类型，如果是对象，则分发给 reducer，否则以 dispatch, getState 为参数进行调用
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

