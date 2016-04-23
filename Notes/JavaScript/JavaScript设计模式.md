## Javascript 设计模式

### 用对象收编变量

```javascript
var funObject = function() {};
// 为原型对象属性赋值
funObject.prototype.getName = function() {};
funObject.prototype.getAge = function() {};
// 或 将一个对象赋值给类的原型对象
funObject.prototype = {
  getName: () => {
    // do something..
    return this;
  },
  getAge: () => {
    // do something..
    return this;
  }
}
// 两种方法不能混用否则会覆盖
```
当将函数变量赋值到对象原型链的时候，调用时，要通过`let funObj = new funObject()`获取对象实例，才能使用原型链上的方法。
同一个对象不同实例，在调用原型链方法时取得的都是同一个

原型链方法里，通过最终的`return this;`使方法可以链式调用

**不使用`this.getName = () => {}`的原因**
通过 this 定义的属性和方法添加在当前对象上。当通过`new`新建一个实例的时候，它的 this 属性和方法就会再次重复创建

### 类的继承

- 关于`apply()`,`call()`,`bind()`

`apply()`和`call()`被用于立即修改函数的作用域（常见于继承时调用），而`bind()`则用于在函数调用的时候改变其作用域

`apply()`和`call()`非常类似，不同之处在于提供参数的方法。`apply()`可以使用数组字面量，如`fun.apply(this, ['eat', 'drink'])`，或使用数组对象作为参数，如`fun.apply(this, new Array('eat', 'drink'))`


**推荐好文** 

[继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[Javascript call() & apply() vs bind()?](http://stackoverflow.com/questions/15455009/javascript-call-apply-vs-bind)

[Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

- 通过原型链赋值父类实例实现继承

将父类的实例，赋值给子类的原型链，那么子类的原型就能够访问父类的属性和方法，即继承
```javascript
const Father = () => {
  this.fatherName = 'ecmadao';
}
Father.prototype.getFatherName = () => {
  console.log(this.fatherName);
}

const Child = () => {
  this.childName = 'cavalier';
}
Child.prototype = new father();
Child.prototype.getChildName = () => {
  console.log(this.childName);
}

let child = new Child();
child.getChildName(); // cavalier
child.getFatherName(); // ecmadao
```

- `instanceof`

判断前面的对象是否是后面类的实例，并不代表两者的继承
```javascript
let child = new Child();
child instanceof Child // true
child instanceof Father // true
Child instanceof Father // false
Child.prototype instanceof Father // true
child instanceof Object // true
```

**通过`prototype`继承的坑**
当有多个子类实例，其中的某个子类修改了从父类继承来的属性/方法时，全部的子类都会被修改。因为它们只是通过原型链链接到了父类实例上

- `Object.create(proto[, propertiesObject])`
  - `proto` 一个对象，作为新创建对象的原型。如果不是null或对象，则抛出TypeError异常
  - `propertiesObject`包含若干个属性描述符的对象

```javascript
// father
const Father = () => {
  this.x = 0;
  this.y = 0;
}
Father.prototype.move = (x, y) => {
  this.x += x;
  this.y += y;
  console.log('moved');
}

// child
Child = () => {
  Father.call(this); // 调用基类的构造函数
}
Child.prototype = Object.create(Father.prototype);

var child = new Child();
child instanceof Child //true
child instanceof Father // true
child.move(1, 2); // moved
```

传入`null`作为参数的时候，则会创建一个没有原型链的全新对象
`Object.create(null);`

### 单例模式

避免命名冲突，便于函数管理
```javascript
const Example = {
  Util: {
    method1: () => {
      
    },
    method2: () => {
      
    }
  },
  Tools: {
    fun1: () => {
      
    },
    fun2: () => {
      
    }
  }
}

Example.Tools.fun1();
```
创建静态变量:
 
  - 立即调用创建单利对象
  
```javascript
const Config = (() => {
  const config = {
    MAX_NUMBER = 10,
    MIN_NUMBER = 1
  };
  return {
    get: () => {
      return config['MAX_NUMBER'];
    }
  }
})();
// 上例单例通过自调用()自动创建一次，并赋值给Config，Config作为一个单例放在全局空间里作为静态变量单例对象被使用
```

  - 延迟调用创建单利对象
 
```javascript
const LazyConfig = (() => {
  let _instance = null;
  const Config = () => {
    const config = {
      MAX_NUMBER = 10,
      MIN_NUMBER = 1
    }; 
    return {
      get: () => {
        return config['MAX_NUMBER'];
      }
    }
  }
   
  return () => {
    if(!_instance) {
      _instance = Config();
    }
    return _instance;
  }
})();
 
console.log(LazyConfig().get()); // 10
```
 
### 模板方法模式
 
创建一个通用类模板，子类继承模板，按需在原型链上添加自己的方法，实例化后即可使用。
 
```javascript
// 模板
const Message = (content, time = 1000) => {
  this.content = content;
  this.time = time;
  this.panel = document.createElement('div');
  this.contentNode = document.createElement('span');
}
Message.prototype = {
  init: () => {
    this.contentNode.innerHTML = this.content;
    this.panel.appendChild(this.contentNode);
    body.append(this.panel);
  },
  showAlert: () => {
    this.panel.addClass('negative');
    this.panel.addClass('active');
    this.hideMessage();
  },
  showMessage: () => {
    this.panel.addClass('positive');
    this.panel.addClass('active');
    this.hideMessage();
  },
  hideMessage: () => {
    setTimeout(this.callback, this.time);
  },
  callback: () => {
    this.panel.removeClass('active');
  }
}

// 子类
const MessageWithImage = (data, time = 1000) => {
  Message.call(this, data.content, time);
  this.image = document.createElement('img');
  this.image.src = data.url;
}
MessageWithImage.prototype = new Message();
MessageWithImage.prototype.init = () => {
  Message.prototype.init.call(this);
  this.panel.appendChild(this.image);
}

// 实例化
let Message = new Message('test').init();
Message.showAlert();

let MessageWithImage = new MessageWithImage({
  content: 'Message with image',
  url: '/src/image/test.png'
}, 2000).init();
MessageWithImage.showMessage();
```

### 观察者模式

观察者模式的核心是观察者，它与被观察者和消息接受者应该是一对多的关系，内部包含注册、取消注册、事件监听和消息发送的方法

```javascript
// 建立观察者
class Observer {
  constructor() {
    this.message = {};
  }
  // 事件接收者注册
  regist(type, callback) {
    if(typeof this.message[type] === 'undefined') {
      this.message[type] = [callback]
    }else {
      this.message[type].push(callback);
    }
    return this.message[type].length - 1;
  }
  // 给事件接收者发送消息
  fire(type, value) {
    this.message[type].map((callback, index) => {
      callback.call(this, value);
    });
  }
  // 移除事件接收者
  remove(type, key) {
    let filtered = this.message[type].filter((fn, i) => i !== key);
    this.message[type] = filtered;
    console.log('type length is ' + filtered.length);
  }
}

let observer = new Observer();

// 建立监听者
class Watcher {
  constructor(name) {
    this.name = name;
  }
  weatherForecast(weather) {
    console.log(this.name);
    console.log('weather is :' + weather);
  }
  watch(weather) {
    let key = observer.regist(weather, this.weatherForecast.bind(this));
    this.key = key;
  }
  broken(weather) {
    console.log(this.name + ' is broken..');
    observer.remove(weather, this.key);
  }
}

class Weather {
  changeWeather(type, value) {
    observer.fire(type, value);
  }
}

let watcher1 = new Watcher('一号预报天气');
watcher1.watch('rainy');
let watcher2 = new Watcher('二号预报天气');
watcher2.watch('sunny');
let watcher3 = new Watcher('三号预报天气');
watcher3.watch('rainy');
watcher3.broken('rainy');
// 三号预报天气 is broken..
let weather = new Weather();
weather.changeWeather('rainy', 'heavyRain');
// 一号预报天气
// weather is :heavyRain
weather.changeWeather('sunny', 'too hot');
// 二号预报天气
// weather is :too hot
```

### 状态模式

创建一个状态对象，内部保存各种状态变量，以及对应的状态应该触发的方法。

```javascript
class BatMan {
  constructor(name) {
    this.name = name;
    this.actions = {};
    this.status = {
      beat: () => {
        this.beat();
      },
      run: () => {
        this.run();
      },
      shot: () => {
        this.shot();
      }
    }
  }
  
  beat(num) {
    console.log(this.name + ' beat bad guys');
  }
  
  run() {
    console.log(this.name + ' run very fast');
  }
  
  shot() {
    console.log('holy shit ' + this.name + ' was forced to use his gun');
  }
  
  changeStatus(actions) {
    actions.map((action, index) =>{
      this.status[action]();
    });
  }
}

const batMan = new BatMan('bluce');
batMan.changeStatus(['run', 'beat', 'shot']);
// bluce run very fast
// bluce beat undefined bad guys
// holy shit bluce was forced to use his gun
```