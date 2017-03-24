<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [使用 Redux 打造你的应用 —— redux-actions](#%E4%BD%BF%E7%94%A8-redux-%E6%89%93%E9%80%A0%E4%BD%A0%E7%9A%84%E5%BA%94%E7%94%A8--redux-actions)
  - [Actions](#actions)
    - [创建 action](#%E5%88%9B%E5%BB%BA-action)
    - [`createAction` & `createActions`](#createaction--createactions)
      - [`createAction`](#createaction)
      - [`createActions`](#createactions)
  - [Reducers](#reducers)
    - [创建 reducers](#%E5%88%9B%E5%BB%BA-reducers)
    - [`handleAction` & `handleActions`](#handleaction--handleactions)
      - [`handleActions`](#handleactions)
      - [`handleAction`](#handleaction)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 使用 Redux 打造你的应用 —— redux-actions

[redux-actions](https://github.com/acdlite/redux-actions) ，一个帮助 redux 应用快速创建 actions 、reducers 的辅助类函数库。通过它，可以摒弃掉传统的 redux action/reducer 定义方法，更加快速有效的创建一个 redux 应用。

在这之前，我们可以先看看在传统 redux 中是如何定义 action 和 reducer 的：

```javascript
// actions.js
export const INITIAL = 'INITIAL';
export const initial = (initialValue) => {
  return {
    type: INITIAL,
    state: initialValue
  }
};
```

```javascript
// reducers.js 
import { combineReducers } from 'redux';
import * as ACTIONS from '../actions.js';

const state = {
  initialValue: 0
};

const initialValue = (initialValue = state.initialValue, action) {
  switch(action.type) {
    case ACTIONS.INITIAL:
      return action.state;
    default:
      return initialValue;
  }
};

export default combineReducers(
  initialState
);
```

而在使用了 redux-actions 之后，整个过程可以得到极大的简化：

```javascript
// actions.js
const initial = createAction('INITIAL');
export default {
  initial
}
```

```javascript
const state = {
  initialValue: 0
};

const reducer = handleActions({
  INITIAL(state, action) {
    return ({
      ...state,
      initialValue: action.playload
    });
  }
}, state);

export default reducers;
```

### Actions

#### 创建 action

通过 `createAction` API，可以快速的创建方法。例如，

```javascript
const initial = createAction('INITIAL');
// initial 方法就相当于
const initial = (value) => {
  return {
    type: INITIAL,
    payload: value
  }
};

// 也可以手动代入方法
const initial = createAction('INITIAL', () => null);
// 相当于
const initial = () => {
  return {
    type: INITIAL,
    payload: null
  }
};

const initial = createAction('INITIAL', (name, email) => ({name, email}));
// 相当于
const initial = (name, email) => {
  return {
    type: INITIAL,
    payload: {
      name,
      email
    }
  }
};
```

同时也提供了 `createActions` API，用来批量创建方法：

```javascript
const {
  initial,
  setName,
  setEmail
} = createActions(
  'INITIAL',
  'SET_NAME',
  'SET_EMAIL'
);

// 如果要给某个方法指定自己的函数，比如 
// const initial = createAction('INITIAL', () => null)
const {
  initial,
  setName,
  setEmail
} = createActions({
  'INITIAL': () => null
},
  'SET_NAME',
  'SET_EMAIL'
);
```

#### `createAction` & `createActions`

##### `createAction`

```javascript
// identity 返回一个基本的函数：
// value => value
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
// 一个用于验证的库
// invariant(someTruthyVal, 'This will not throw');
// No errors
import invariant from 'invariant';

export default function createAction(type, payloadCreator = identity, metaCreator) {
  // payloadCreator 为给 action 指定的自定义方法，必须是个函数或 undefined
  invariant(
    isFunction(payloadCreator) || isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  );

  // 如果不传入 payloadCreator，则使用 identity 替代：
  // const identity = (value) => value;
  const finalPayloadCreator = isNull(payloadCreator)
    ? identity
    : payloadCreator;

  // actionCreator 是 createAction 最终返回的函数
  const actionCreator = (...args) => {
    const hasError = args[0] instanceof Error;

    const action = {
      type
    };

    const payload = hasError ? args[0] : finalPayloadCreator(...args);
    if (!isUndefined(payload)) {
      action.payload = payload;
    }
    if (hasError || payload instanceof Error) {
      action.error = true;
    }
    if (isFunction(metaCreator)) {
      action.meta = metaCreator(...args);
    }
    return action;
  };
  // 复写 toString 方法，确保在对该方法调用 toString 时，输出的是 action.type
  actionCreator.toString = () => type.toString();
  return actionCreator;
}
```

##### `createActions`

更多使用实例：[`createActions(?actionsMap, ?...identityActions)`](https://github.com/acdlite/redux-actions#createactionsactionsmap-identityactions)

```javascript
// 如上面的例子所示
// createActions 的参数可以是多个字符串，但如果要自定义 action 的处理函数，则第一个参数为一个对象
// 因此第一个参数比较特殊（Object 或 String），之后再可以有不显个数个相同类型（String）的参数
export default function createActions(actionsMap, ...identityActions) {
  invariant(
    identityActions.every(isString) &&
    (isString(actionsMap) || isPlainObject(actionsMap)),
    'Expected optional object followed by string action types'
  );
  // 如果第一个参数也是 String，则所有参数都是 String。将它们组成数组代入函数中
  if (isString(actionsMap)) {
    return fromIdentityActions([actionsMap, ...identityActions]);
  }
  // 否则将第一个函数特殊对待
  return { ...fromActionsMap(actionsMap), ...fromIdentityActions(identityActions) };
}
```

```javascript
function isValidActionsMapValue(actionsMapValue) {
  if (isFunction(actionsMapValue)) {
    return true;
  } else if (isArray(actionsMapValue)) {
    const [payload = identity, meta] = actionsMapValue;

    return isFunction(payload) && isFunction(meta);
  }
  return false;
}

// 将
// {
//   'INITIAL': () => null,
//   'SET_DATA': (name, email) => ({ name, email }),
//	 'ACTION_TWO': [
//    (first) => [first],             // payload
//    (first, second) => ({ second }) // meta
//   ],
// }
// 转换为
// {
//   'initial': createAction('INITIAL', () => null),
//	 'setData': createAction('SET_DATA', (name, email) => ({ name, email })),
//	 'actionTwo': createAction('ACTION_TWO', (first) => [first], (first, second) => ({ second }))
// }
//
// camelCase 的作用是将形如 SET_DATA 的 String 转换为 setData
function fromActionsMap(actionsMap) {
  return Object.keys(actionsMap).reduce((actionCreatorsMap, type) => {
    const actionsMapValue = actionsMap[type];
    invariant(
      isValidActionsMapValue(actionsMapValue),
      'Expected function, undefined, or array with payload and meta ' +
      `functions for ${type}`
    );
    const actionCreator = isArray(actionsMapValue)
      ? createAction(type, ...actionsMapValue)
      : createAction(type, actionsMapValue);
    return { ...actionCreatorsMap, [camelCase(type)]: actionCreator };
  }, {});
}

// 将 ['INITIAL', 'ACTION_ONE', 'ACTION_TWO'] 转为
// {
//   initial:  createAction('INITIAL'),
//	 actionOne:  createAction('ACTION_ONE'),
//	 actionTwo:  createAction('ACTION_TWO'),
// }
function fromIdentityActions(identityActions) {
  return fromActionsMap(identityActions.reduce(
    (actionsMap, actionType) => ({ ...actionsMap, [actionType]: identity })
  , {}));
}
```

### Reducers

#### 创建 reducers

通过 `handleActions` 一次性处理所有的 action handler，不再需要传统的 `combineReducers`

```javascript
import { handleActions } from 'redux-actions';

const reducer = handleActions({
  INCREMENT: (state, action) => ({
    counter: state.counter + action.payload
  }),

  DECREMENT: (state, action) => ({
    counter: state.counter - action.payload
  })
}, { counter: 0 });

export default reducer;
```

#### `handleAction` & `handleActions`

##### `handleActions`

在源码中引用了 [`reduce-reducers`](https://github.com/acdlite/reduce-reducers) 库，目的是将多个单一的 reducer 通过 `reduce` 的方式转为一个 reducer。

通过官方实例可以看出，其实本质就是将参数依次代入每个 reducer 进行调用，返回最终的结果。因此，核心和 redux 的 `combineReducer` 是一样的：将 action 依次代入每个 reducer 进行调用，总有一个 reducer 可以处理当前的 action.type，否则返回 default。

reduce-reducers 实例：

```javascript
// reduce-reducers 官方实例
import reduceReducers from 'reduce-reducers';

const reducer = reduceReducers(
  (prev, curr) => ({...prev, A: prev.A + curr}),
  (prev, curr) => ({...prev, B: prev.B * curr}),
);

expect(reducer({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 4, B: 6 });
expect(reducer({ A: 5, B: 8 }, 13)).to.deep.equal({ A: 18, B: 104 });
```

handleActions 源码：

```javascript
// handleActions
import handleAction from './handleAction';
import ownKeys from './ownKeys';
import reduceReducers from 'reduce-reducers';

// handlers 为一个 object
// {
//	 KEY: actionHandler
// }
// 将每个 KEY: actionHandler 键值对都通过 handleAction 处理，返回结果都是形如
// (state, action) => newState 的函数
// 并通过 reduce-reducers 合为一个
export default function handleActions(handlers, defaultState) {
  const reducers = ownKeys(handlers).map(type =>
    handleAction(
      type,
      handlers[type],
      defaultState
    )
  );
  const reducer = reduceReducers(...reducers);
  return (state, action) => reducer(state, action);
}
```

##### `handleAction`

`handleAction(type, reducer | reducerMap = Identity, defaultState)`

使用方式：

```javascript
handleAction(
  // action type
  'FETCH_DATA',
  // reducer
  // 你可以分别处理 next(成功)和throw(失败)两种情况，也可以同时处理
  {
  	next(state, action) {...},
  	throw(state, action) {...}
  },
  // default state
  defaultState
);
```

源码：

```javascript
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import identity from 'lodash/identity';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import includes from 'lodash/includes';
import invariant from 'invariant';
import { ACTION_TYPE_DELIMITER } from './combineActions';

export default function handleAction(actionType, reducer = identity, defaultState) {
  const actionTypes = actionType.toString().split(ACTION_TYPE_DELIMITER);
  // reducer 要么是一个函数，next/throw 两种情况会被统一对待
  // 要么是个形如 { next() {}, throw() {} } 的函数，依次处理成功和失败的情况
  invariant(
    !isUndefined(defaultState),
    `defaultState for reducer handling ${actionTypes.join(', ')} should be defined`
  );
  invariant(
    isFunction(reducer) || isPlainObject(reducer),
    'Expected reducer to be a function or object with next and throw reducers'
  );

  const [nextReducer, throwReducer] = isFunction(reducer)
    ? [reducer, reducer]
    : [reducer.next, reducer.throw].map(aReducer => (isNil(aReducer) ? identity : aReducer));

  // 返回真正的 reducer，在内部进行类型检查，跳过不处理的 action
  return (state = defaultState, action) => {
    const { type } = action;
    if (type && !includes(actionTypes, type.toString())) {
      return state;
    }
	// 否则在没有错误的情况下使用 nextReducer 进行处理，返回修改的 state
    return (action.error === true ? throwReducer : nextReducer)(state, action);
  };
}
```

