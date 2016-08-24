## Ember初探--Ember中的对象

你或许已经发现，虽然Ember已经支持了ES6，但JS中的class和ES2015的class还没有在Ember中得到广泛运用。而原生的JS对象并不对属性改变进行监听，所以，在Ember中大量使用的是一种名为`Ember.Object`的对象。

`Ember.Object`同样提供了“类”系统，并支持`mixins`和`constructor`构造方法，而一些Ember对象的model目前并不存在于JS的类中，不过在其他语言中有着类似的实现。

Ember中的对象与JS对照关系大致如下：

- Ember.Object -> JS Class
- Ember.Enumerable -> JS Array
- Ember.String -> JS String

### 类和实例

在Ember中经常可见例如`Ember.Component.extend()`或者`DS.Model.extend()`这样的东西。通过`extend()`可以定义一个类。

#### 定义类

调用`Ember.Object`上的`extend()`方法可以定义一个新的Ember类：

```javascript
// 定义一个有say方法的Person类
const Person = Ember.Object.extend({
  say(thing) {
    alert(thing);
  }
});
```

除此以外，也可以在任何已经存在的类上调用`extend()`方法来创建一个子类：

```javascript
export default Ember.Component.extend({
  classNameBindings: ['isUrgent'],
  isUrgent: true
});
```

#### 复写父类的方法

创建子类之后，你可以覆盖父类的方法，也可以通过`_super()`方法来调用父类的方法：

```javascript
const Person = Ember.Object.extend({
  say(thing) {
    alert(`${this.get('name')} says: ${thing}`);
  }
});

const Soldier = Person.extend({
  say(thing) {
    // 调用父类的say方法，把thing作为参数传入
    this._super(`${thing}, sir!`);
  }
});

let yehuda = Soldier.create({
  name: 'Yehuda Katz'
});

yehuda.say('Yes'); // alerts "Yehuda Katz says: Yes, sir!"
```

可能在一些特定的场景下，你想要把一些参数传给`_super()`方法，让它正常运行：

```javascript
// ...

someFunc(a, b, c) {
    this._super(...arguments);
}
```

#### 创建实例

在定义类之后，可以通过`create()`方法来创建类的实例。之后这个类中的属性、方法都可以被这个实例所调用。

```javascript
const Person = Ember.Object.extend({
  say(thing) {
    alert(`${this.get('name')} says: ${thing}`);
  }
});

let person = Person.create();

person.say('Hello'); // alerts " says: Hello"
```

在创建实例时，可以把初始化参数传入：

```javascript
const Person = Ember.Object.extend({
  helloWorld() {
    alert(`Hi, my name is ${this.get('name')}`);
  }
});

let tom = Person.create({
  name: 'Tom Dale'
});

tom.helloWorld(); // alerts "Hi, my name is Tom Dale"
```

创建实例时，只能在`create()`方法中传入简单的参数，不行复写对象的方法。如果要复写，只能通过子类的形式进行。

#### 初始化实例

在创建一个实例的时候，类的`init()`方法会被自动调用，在这里进行一些初始化的工作：

```javascript
const Person = Ember.Object.extend({
  init() {
    alert(`${this.get('name')}, reporting for duty!`);
  }
});

Person.create({
  name: 'Stefan Penner'
});

// alerts "Stefan Penner, reporting for duty!"
```

当你在创建子类并要自定义`init()`方法的时候，例如从`Ember.Component`扩展出子类，必须要在子类中调用父类的`init()`方法，否则无法正常工作。

```javascript
// app/components/list-filter.js
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    // 初始化
    this.get('filter')('').then((results) => this.set('results', results));
  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get('value'); // input的value
      let filterAction = this.get('filter'); // 在index.hbs中传入，为filterByCity
      // 筛选过后把结果赋值给result
      // filter=(action 'filterByCity') as |rentals| 即 result as |rentals|
      filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
    }
  }

});
```

**IMPORTANT**

> **直接定义在Ember.Object上的Array和对象，会共享创建出的实例：**

举个栗子：

```javascript
const Person = Ember.Object.extend({
  shoppingList: ['eggs', 'cheese']
});

Person.create({
  name: 'Stefan',
  addItem() {
    this.get('shoppingList').pushObject('bacon');
  }
});

Person.create({
  name: 'Robert',
  addItem() {
    this.get('shoppingList').pushObject('sausage');
  }
});
```

最终创建出的两个实例（Stefan和Robert），会共享同一个`shoppingList`：
`['eggs', 'cheese', 'bacon', 'sausage']`

因为`shoppingList`直接定义在了Ember.Object上。

如何避免这种情况？复写类的初始化方法，在初始化方法里给`shoppingList`赋初始化值：

```javascript
const Person = Ember.Object.extend({
  init() {
    this.set('shoppingList', ['eggs', 'cheese']);
  }
});

Person.create({
  name: 'Stefan Penner',
  addItem() {
    this.get('shoppingList').pushObject('bacon');
  }
});

Person.create({
  name: 'Robert Jackson',
  addItem() {
    this.get('shoppingList').pushObject('sausage');
  }
});

// Stefan ['eggs', 'cheese', 'bacon']
// Robert ['eggs', 'cheese', 'sausage']
```

#### 获取对象的属性

使用`get()`和`set()`方法进行属性操作：

```javascript
const Person = Ember.Object.extend({
  name: 'Robert Jackson'
});

let person = Person.create();

person.get('name'); // 'Robert Jackson'
person.set('name', 'Tobias Fünke');
person.get('name'); // 'Tobias Fünke'
```

> 记住，属性操作必须通过`get`和`set`方法，否则不会重新计算，也就无法触发监听事件，导致模板UI无法更新。

### Reopen 类和实例

你可以不必一次性定义好一个类，可以在之后通过`reopen()`来更新它：

```javascript
Person.reopen({
  isPerson: true
});

Person.create().get('isPerson'); // true
```

在使用`reopen()`方法的时候。可以通过调用`this._super`来复写已存在的方法：

```javascript
Person.reopen({
  // override `say` to add an ! at the end
  say(thing) {
    this._super(thing + '!');
  }
});
```

> 通过`reopen`增改的属性和方法会被类的所有实例所共享，并不会单独改某一个特定的实例

但是，如果你仅仅想给类增改静态属性或方法，则可以使用`reopenClass()`方法：

```javascript
// add static property to class
Person.reopenClass({
  isPerson: false
});
// override property of Person instance
Person.reopen({
  isPerson: true
});

Person.isPerson; // false - 因为通过reopenClass更改了类的静态属性

// 但通过reopen添加的类属性isPerson不会被更改，并且它的实例会获得这个属性
Person.create().get('isPerson'); // true
```

### 计算属性

计算属性是什么？

计算属性允许你把函数声明为一个属性，当你调用这个属性的时候，Ember会自动允许这个函数并返回结果，因此可以像正常属性一样使用它。

#### 计算属性实例

```javascript
Person = Ember.Object.extend({
  // these will be supplied by `create`
  firstName: null,
  lastName: null,

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});

let ironMan = Person.create({
  firstName: 'Tony',
  lastName:  'Stark'
});

ironMan.get('fullName'); // "Tony Stark"
```

如果你在计算属性中要用到Object：

```javascript
let obj = Ember.Object.extend({
  baz: {foo: 'BLAMMO', bar: 'BLAZORZ'},

  something: Ember.computed('baz.{foo,bar}', function() {
    return this.get('baz.foo') + ' ' + this.get('baz.bar');
  })
});
```

#### 链式计算属性

因为计算属性可以被当做正常属性来使用，所以计算属性里传入的属性也可以是计算属性：

```javascript
// 在description计算属性里调用了fullName计算属性

Person = Ember.Object.extend({
  firstName: null,
  lastName: null,
  age: null,
  country: null,

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  description: Ember.computed('fullName', 'age', 'country', function() {
    return `${this.get('fullName')}; Age: ${this.get('age')}; Country: ${this.get('country')}`;
  })
});

let captainAmerica = Person.create({
  firstName: 'Steve',
  lastName: 'Rogers',
  age: 80,
  country: 'USA'
});

captainAmerica.get('description'); // "Steve Rogers; Age: 80; Country: USA"
```

#### 动态更新

计算属性监听着可以改变他们计算结果的属性。因此在改变那些属性的时候，动态属性的计算结果也会被改变：

```javascript
captainAmerica.set('firstName', 'William');

captainAmerica.get('description'); // "William Rogers; Age: 80; Country: USA"
```

#### 改变计算属性

你可以自定义计算属性被set时的行为，但需要提供key-value键值对，以便Ember确定你更改了对象的哪个属性：

```javascript
Person = Ember.Object.extend({
  firstName: null,
  lastName: null,

  fullName: Ember.computed('firstName', 'lastName', {
    get(key) {
      return `${this.get('firstName')} ${this.get('lastName')}`;
    },
    set(key, value) {
      let [firstName, lastName] = value.split(/\s+/);
      this.set('firstName', firstName);
      this.set('lastName',  lastName);
      return value;
    }
  })
});


let captainAmerica = Person.create();
captainAmerica.set('fullName', 'William Burnside');
captainAmerica.get('firstName'); // William
captainAmerica.get('lastName'); // Burnside
```

#### 计算属性宏

Ember提供了一些属性可以让我们的操作更便捷：

```javascript
Person = Ember.Object.extend({
  fullName: 'Tony Stark',

  isIronManLongWay: Ember.computed('fullName', function() {
    return this.get('fullName') === 'Tony Stark';
  }),

  isIronManShortWay: Ember.computed.equal('fullName', 'Tony Stark')
});
```

上面这个例子里，`isIronManLongWay`和`isIronManShortWay`完全等价，但是利用Ember的`Ember.computed.equal()`方法则更加简洁。

更多的自带方法可以参考[Ember API文档](http://emberjs.com/api/classes/Ember.computed.html)
