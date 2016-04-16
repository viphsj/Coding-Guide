## Redux入坑笔记-源码解析

### `combineReducers`

```javascript
// combineReducers的使用格式
const todos = (state = INIT.todos, action) {};
const filterStatus = (state = INIT.filterStatus, action) {};

const appReducer = combineReducers({
  todos,
  filterStatus
});
```
源码标注解读（省略部分）：

```javascript
export default function combineReducers(reducers) {
  // 第一次筛选，参数reducers为Object
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    // 剔除掉不是function的
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  // 二次筛选，判断reducer中传入的值是否合法（!== undefined）
  // 获取筛选完之后的所有key
  var finalReducerKeys = Object.keys(finalReducers)

  var sanityError
  // assertReducerSanity函数用于遍历finalReducers中的reducer，检查传入reducer的state是否合法
  try {
    assertReducerSanity(finalReducers)
  } catch (e) {
    sanityError = e
  }
  
  // 返回一个总state，内部包含子reducer
  return function combination(state = {}, action) {
    // 如果之前的判断state有不法值，则抛出错误
    if (sanityError) {
      throw sanityError
    }
    // 如果不是production环境则抛出warning
    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    var hasChanged = false
    var nextState = {}
    // 遍历所有的key和reducer，分别将reducer对应的key所代表的state代入到reducer中进行函数调用
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      // 如果reducer返回undefined则抛出错误
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 将reducer返回的值填入nextState
      nextState[key] = nextStateForKey
      // 如果任一state有更新则hasChanged为true
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}

// 检查传入reducer的state是否合法
function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(key => {
    var reducer = reducers[key]
    // 遍历reducer，给它传入(undefined, action)。当第一个参数传入undefined时，则为reducer定义的默认参数
    var initialState = reducer(undefined, { type: ActionTypes.INIT })
    // ActionTypes.INIT几乎不会被定义，所以会通过switch的default返回reducer的默认参数。如果没有指定默认参数，则返回undefined，抛出错误
    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined.`
      )
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.')
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined.`
      )
    }
  })
}
```

### `createStore`

```javascript
// API
const store = createStore(reducers, state, enhance);
```
源码标注解读（省略部分）：

```javascript
// 对于未知的action.type，reducer必须返回默认的参数state。这个ActionTypes.INIT就可以用来监测当reducer传入未知type的action时，返回的state是否合法
export var ActionTypes = {
  INIT: '@@redux/INIT'
}

export default function createStore(reducer, initialState, enhancer) {
  // 检查你的state和enhance有没有传反
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState
    initialState = undefined
  }
  // 如果有传入合法的enhance，则通过enhancer再调用一次createStore
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, initialState)
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  var currentReducer = reducer
  var currentState = initialState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function getState() {
    return currentState
  }
  // 注册listener，同时返回一个取消事件注册的方法。当调用store.dispatch的时候调用listener
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }
    // 调用dispatch的时候只能一个个调用，通过dispatch判断调用的状态
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    // 遍历调用各个linster
    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }
  // Replaces the reducer currently used by the store to calculate the state.
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }
  // 当create store的时候，reducer会接受一个type为ActionTypes.INIT的action，使reducer返回他们默认的state，这样可以快速的形成默认的state的结构
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}
```