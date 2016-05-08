## 【译文】用ES6写更赞的JavaScript（2）

> 本文译自：[Better JavaScript with ES6, Pt. II: A Deep Dive into Classes](https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes)

开始之前首先要说明的一点是：

> ES6的class并不真的是全新的东西：它提供了方便的语法来创建方法。
> 
> -- Axel Rauschmayer

从功能上讲，`class`比我们很早就有的“以原型链为基础的委托关系”做的更多。这篇文章从原型关系出发，带你了解ES2015的`class`。包括以下几点：

  - 定义和实例化类
  - 通过`extends`创建子类
  - 子类中的`super`
  - symbol方法的例子

### 后退一步：类不是什么

JavaScript中的类跟Java、Python或者任何面向对象语言里的类有很大不同。

在传统的面向对象语言里，你创建的类是Object的模板。当你需要新的Object的时候，只要实例化类，引擎就会拷贝类里的属性和方法到新的实体中，称之为实例。实例是一个Object，而且在实例化之后与他的父类完全没有联系。

JavaScript没有这样的拷贝方法。在JavaScript中，实例化一个类也会生成新的Object，但并没有从父类独立。

反之，实例化的结果会连接到它的原型。即便已经实例化过了，改变原型还是会影响到这个新生成的Object。

原型在JavaScript设计模式中及其有用。通过它提供的一些方法可以达到模拟传统类的效果。

总结：

  1. JavaScript没有严格意义上的类
  2. JavaScript中的类仅仅是创建原型链的语法糖

来让我们深入了解js中的类吧。

### 基础：声明&表达式

使用`class`和代码块创建类，称之为“类的声明”。在声明基类时不需要使用`extends`关键字：

```js
"use strict";

// Food is a base class
class Food {

    constructor (name, protein, carbs, fat) {
        this.name = name;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
    }

    toString () {
        return `${this.name} | ${this.protein}g P :: ${this.carbs}g C :: ${this.fat}g F`
    }

    print () {
      console.log( this.toString() );
    }
}

const chicken_breast = new Food('Chicken Breast', 26, 0, 3.5);

chicken_breast.print(); // 'Chicken Breast | 26g P :: 0g C :: 3.5g F'
console.log(chicken_breast.protein); // 26 (LINE A)
```

需要注意的几点：

  - 类内只能包含方法，不能有属性
  - 定义类的方法时，可以使用简写方法
  - 与创建Object不同，类中的方法不需要用`,`分隔
  - 可以使用类的原型链

类中有一个特殊的方法叫作`constructor`，这是初始化属性的地方。

你不必总是自己写`constructor`方法，当你不写的时候引擎会自动帮你添加一个新的`constructor`方法。

```js
"use strict";

class NoConstructor { 
    /* JavaScript inserts something like this:
     constructor () { }
    */
}

const nemo = new NoConstructor(); // Works, but pretty boring
```

将类赋值给变量叫作类表达式：

```js
"use strict";

// 创建匿名class，无法在class内部使用它的名字
const Food = class {
    // 内部的定义和之前的一样
}

// 命名class表达式，可以在内部使用它的名称FoodClass
const Food = class FoodClass {
    // 内部的定义和之前的一样

    printMacronutrients () {
      console.log(`${FoodClass.name} | ${FoodClass.protein} g P :: ${FoodClass.carbs} g C :: ${FoodClass.fat} g F`)
    }
}

const chicken_breast = new Food('Chicken Breast', 26, 0, 3.5);
chicken_breast.printMacronutrients(); // 'Chicken Breast | 26g P :: 0g C :: 3.5g F'

// 但外部无法调用class的属性
try {
    console.log(FoodClass.protein); // ReferenceError 
} catch (err) { 
    // pass
}
```

这与普通[函数表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)的表现一样。

### 使用`extends`创建子类&调用`super`方法

使用`extends`建立的类被称为子类。它的使用很简单。来瞅瞅例子：

```js
"use strict";

// FatFreeFood is a derived class
class FatFreeFood extends Food {
    constructor (name, protein, carbs) {
        super(name, protein, carbs, 0);
    }
    print () {
        super.print(); 
        console.log(`Would you look at that -- ${this.name} has no fat!`);
    }
}

const fat_free_yogurt = new FatFreeFood('Greek Yogurt', 16, 12);
fat_free_yogurt.print(); // 'Greek Yogurt | 26g P :: 16g C :: 0g F  /  Would you look at that -- Greek Yogurt has no fat!'
```

有几个要额外注意的点：

  - 子类通过`class`和`extends`关键字创建
  - 如果要使用它扩展的父类，则需要使用`super`关键字
  - `constructor`方法内不能为空，即使里面只调用了`spuer`方法。但你仍然可以不写`constructor`方法。
  - 在使用`this`之前，必须在`constructor`内调用`super`方法

在JavaScript中，有两个地方要用到`super`方法：

  1. **子类调用了`constructor`方法。**如果需要通过调用父类的`constructor`方法才能实例化子类，你可以通过在子类的构造方法里调用`super(parentConstructorParams)`完成它。
  2. **为了使用父类的方法。**子类通过`super.methodName`可以调用父类里的方法。

我们的例子`FatFreeFood`同时使用了这两种super方法：

  1. 在构造方法内，调用`super`方法，并将0作为给父类的参数传入。
  2. 在`print`方法内，先调用了`super.print`方法，然后添加了额外的方法。

不管你信不信，我们已经对`class`进行了基本的介绍了。这些就是你开始探索的基础。

### 深入原型

是时候了解`class`里原型链的机制了。我们将要学习：

  - 使用构造函数创建对象
  - 原型链的本质
  - 属性和委托方法
  - 使用原型模仿class

#### 使用构造函数创建对象

构造函数并不是什么新东西。通过`new`关键字调用的方法都会返回一个对象--这种方法叫做构造方法。对应的函数叫做构造函数：

```js
"use strict";

function Food (name, protein, carbs, fat) {
    this.name    = name;
    this.protein = protein;
    this.carbs    = carbs;
    this.fat          = fat;
}
// 通过new关键字调用Food，返回一个对象
const chicken_breast = new Food('Chicken Breast', 26, 0, 3.5);
console.log(chicken_breast.protein) // 26

// 直接调用则返回 'undefined'
const fish = Food('Halibut', 26, 0, 2);
console.log(fish); // 'undefined'
```

当你使用`new`来调用函数的时候，会发生下面这些事情：

  1. 创建新对象（就叫做 O 吧）
  2. O与另一个对象建立联系，并叫它为*原型*
  3. 函数的`this`指向 O
  4. 函数最后返回 O

在第三第四步中间，引擎负责处理函数的逻辑。

知道了这些之后，我们可以重写`Food`方法，并使其实例化时不必使用`new`关键字：

```js
"use strict";

// Eliminating the need for 'new' -- just for demonstration
function Food (name, protein, carbs, fat) {
       // Step One: Create a new Object
    const obj = { }; 
    // Step Two: Link prototypes -- we'll cover this in greater detail shortly
    Object.setPrototypeOf(obj, Food.prototype);
    // Step Three: Set 'this' to point to our new Object
    // Since we can't reset `this` inside of a running execution context, we simulate Step Three by using 'obj' instead of 'this'
    obj.name = name;
    obj.protein = protein;
    obj.carbs = carbs;
    obj.fat = fat;
    // Step Four: Return the newly created object
    return obj;
}

const fish = Food('Halibut', 26, 0, 2);
console.log(fish.protein); // 26
```

四个步骤中有三步都很简单：创建对象（第一步），设置this和属性（第三步），返回对象（第四步）。而第二部的原型往往让人们却步。

#### 体验原型链

在正常状态下，JavaScript里的所有对象--包括方法--都连接到了另一个对象上，我们称之为原型。

如果你调用了对象上不存在的属性，JavaScript会在该对象的原型里寻找这个属性。换句话说，当对象上的属性不存在是，它就会说：“咱不知道。去问我的原型吧。”

这个过程--向其他对象查找不存在的属性--叫作**委托**

```js
"use strict";

// joe 并没有toString方法
const joe    = { name : 'Joe' },
       sara  = { name : 'Sara' };

Object.hasOwnProperty(joe, toString); // false
Object.hasOwnProperty(sara, toString); // false

// 但我们仍能调用它！
joe.toString(); // '[object Object]', 而不是 ReferenceError!
sara.toString(); // '[object Object]', 而不是 ReferenceError!
```

我们的`toString`方法应该完全没用，但它没有引起`ReferenceError`。那是因为虽然joe和sara没有toString方法，但他们的原型有。之后JavaScript询问`Object.prototype`是否有`toString`方法。在得到确定的回答之后，它将`Object.prototype`的`toString`方法作为最初的调用。

虽然sara自己没有相应的方法但这无所谓--我们委托给了它的原型。

换句话说，只要对象的原型里有我们想要的方法，我们就能从对象那里进行调用。那样的话，我们可以把属性和方法放在它的原型里，然后好像它们存在对象里面一样，正常的通过对象来进行调用。

还有更赞的。如果一些对象有共同的原型--就好像上面的joe和sara--它们可以通过原型共享同样的属性和方法，而不需要进行任何的拷贝。

这就是人们经常提及的原型继承--如果我的对象没有，但是对象的原型有，那么它就能从原型继承自己所需的。

实际上，不存在任何的继承。在面向对象的语言里，继承暗示着子类的行为是从父类拷贝而来。而在JavaScript中，没有拷贝这样的行为--事实上，这是通过JavaScript class 里的原型获取的最大优势之一。

快速的梳理一下：

  - joe和sara并没有继承`toString`方法
  - 事实上，joe和sara也没有继承`Object.prototype`
  - joe和sara连接到了`Object.prototype`
  - joe和sara连接着同样的`Object.prototype`
  - 为了寻找原型--暂且把原型称之为O--调用：`Object.getPrototypeOf(O)`

最后再强调一点：对象不继承他们的原型，而是委托它们。

来让我们再深入一下。

### 给对象设置原型

我们已经知道了（几乎）所有的对象（O）都有原型（P），而当你在O上寻找它没有的属性时，JavaScript引擎会在P身上进行查询。

那么问题是：

  1. 对于方法而言，如果运行这一套机制？
  2. 这些原型究竟是从哪儿来的？

#### 名为对象的方法

在JavaScript执行程序之前，它会创建一个运行的环境，在那里面建立了一个叫做[`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)的函数。而与它联系的对象，则叫做 [`Object.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

换句话说，在一段执行的JavaScript程序中，`Object`和`Object.prototype`是一直存在的。

这个函数（Object）跟其他的方法不同。它是一个构造函数--调用它则会返回一个新的对象：

```js
"use strict";

typeof new Object(); // "object"
typeof Object(); // Object function 的一个奇特之处是它不需要通过 new 调用
```

`Object`,`Object.prototype`都是对象，就跟其他对象一样拥有属性。

![properties in Object.prototype](../../../image/BetterJavaScriptWithES6/ebbd5e3.png)