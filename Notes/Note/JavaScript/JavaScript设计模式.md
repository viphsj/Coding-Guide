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

**推荐好文** [继承与原型链]()

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
