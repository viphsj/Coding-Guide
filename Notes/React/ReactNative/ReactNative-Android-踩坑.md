<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [组件化](#%E7%BB%84%E4%BB%B6%E5%8C%96)
- [又一个大坑：](#%E5%8F%88%E4%B8%80%E4%B8%AA%E5%A4%A7%E5%9D%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---
title: ReactNative Android 踩坑
date: 2016-03-03 08:49:55
tags: React-Native
---


```jsx
<TouchableHighlight>
  <View>
    <Image/>
  </View>
  //内部不能直接嵌套<Image/>组件
</TouchableHighlight>
```

```jsx
//WRONG!
<View>
  DEMO TEST  //<View>内部不能直接放文字
</View>

//Good
<View>
  <Text>
    THIS IS A DEMO
  <Text>
</View>
```

```jsx
//在组件中写函数的时候，很有可能会混乱 this 作用域
//所以极度建议使用 ES6 箭头函数
showDrawer(){
  this.props.showDrawer();
}
render(){
  return (
    <ToolbarAndroid
      onIconClicked={()=>this.showDrawer()}
      //若使用：
      //onIconClicked={this.showDrawer}
      //则会报错：undefined is  not a function
      navIcon={require('./icon/iconfont_menu.png')}
      title="ReactDemo"
      style={styles.toolBar}
    />
  )
}
```

```jsx
<ListView></ListView>
被嵌套以后的滚动问题:
被其他<View></View>嵌套以后，若外层<View>不设置高度，那么<ListView>无法滚动，但设定具体高度的话无法滚动到完全展示

**解决方案**
<ListView></ListView>外层的<View></View>设置：
flex:1
```

```jsx
//点击 <Toolbar> 的icon打开/关闭<DrawerLayoutAndroid>
var DRAWER_REF = 'drawer';

showDrawer(){
  this.refs[DRAWER_REF].openDrawer();
  this.setState({
    drawerOpen: true
  })
}

unShowDrawer(){
  this.refs[DRAWER_REF].closeDrawer();
  this.setState({
    drawerOpen: false
  })
}

render(){
  
  var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  );
  
  return (
    
    <DrawerLayoutAndroid
      ref={DRAWER_REF}
      keyboardDismissMode='on-drag'
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      
      <ToolbarAndroid
        onIconClicked={()=>{
          if(this.state.drawerOpen){
            this.unShowDrawer();
          }else{
            this.showDrawer();
          }
        }}
        navIcon={require('./icon/iconfont_menu.png')}
        title="ReactDemo"
        style={styles.toolBar}
      />
      
    </DrawerLayoutAndroid>
    
  )
}
```

```jsx
//修改 <Toolbar>字体颜色：
<Toolbar
  titleColor = '#ffffff' //标题颜色
  subtitleColor = '#ffffff' //子标题颜色
>
</Toolbar>
```

```jsx
//在同一个样式名称中，写相同的属性的话会报错
textStyle: {
  color: '#343434',
  textAlign: 'center',
  fontSize: 16,
  color: '#ffffff', //报错
}
```

```jsx
//picker
<Picker
  selectedValue={this.state.language}
  onValueChange={(lang) => this.setState({language: lang})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
//onValueChange函数，会在picker初次加载的时候调用一次
<Picker>要设置在<View>中，否则加载Picker上的样式（flex）无效
```

```jsx
<PullToRefreshViewAndroid></PullToRefreshViewAndroid>
中只放一个直接关系子<View>
```

### 组件化

ReactNative-Android目前还没有像原生Android那样顶部点击切换pager的button，所以我们就来自己搭建一个。为了未来复用组件考虑，就将它独立封装一个新的组件

结构：

```javascript
<View style={styles.viewPagerContainer}>

  <ViewPagerToolbar
    title={MESSAGE_PAGE}
    navigator={navigator}
  />
  
  <ViewPagerAndroid>
    <ViewPagerContent />
  </ViewPagerAndroid>
</View>
```

其中，`ViewPagerToolbar`和`ViewPagerContent`是我们封装的组件

已知的坑：
把自定义组件`ViewPagerContent`代入进`ViewPagerAndroid`的时候，自定义组件最外层和向内的第一层会作为一个pager。如果第二层之后包裹了多层，则每个`View`会被作为一个pager而加载。

比如，我们的`ViewPagerContent`在有数据的时候，返回：

```javascript
<View style={styles.dataContainer}>
  <ListView />
</View>
```
那样的话会产生一个pager

在没有数据的时候，返回：

```javascript
<View style={styles.emptyContainer}>
  <View style={styles.defaultView}>
    <Image resizeMode='contain' source={require('../../src/image/logo.jpg')} style={styles.defaultImage}/>
    <Text>哎呦我去没有数据..</Text>
    <Text>下拉可刷新哦</Text>
  </View>
</View>
```

则会产生3个pager。。

**解决方案**

**不要返回View组成的DefaultComponent，返回一个空的ViewPager**

```javascript
let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let listData = dataSource.cloneWithRows([1]);

  <View style={styles.emptyContainer}>
  <ListView
    enableEmptySections={true}
    style={styles.emptyListView}
    dataSource={listData}
    renderRow={(data) => {
      return (
        <View style={styles.defaultViewContainer}>
          <View style={styles.defaultView}>
            <Image resizeMode='contain' source={require('../../src/image/logo.jpg')} style={styles.defaultImage}/>
            <Text>哎呦我去没有数据..</Text>
            <Text>下拉可刷新哦</Text>
          </View>
        </View>
      )
    }}
  />
</View>

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
  },
  emptyListView: {
    flex: 1
  },
  defaultViewContainer: {
    flex: 1,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultView: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultImage: {
    height: 60
  }
});
```

### 又一个大坑：

ReactNative自带的ListView，有几个便利的函数：

```javascript
onEndReached={()=>{}}
// 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。原生的滚动事件会被作为参数传递。

onEndReachedThreshold={number}
// 调用onEndReached之前的临界值，单位是像素。
```

因此，我们可以在列表滚动到底部的时候，发送请求fetch下一页的数据，之后更新到state中，就可以轻松的实现如同原生分页般的顺滑体验

但是，当它和上面的自定义ViewPager配合的时候，就会出现诡异的现象：
当ViewPager滚动到底部触发fetch事件，并获取到数据更新了state之后，ListView会被压缩至原来的一半高，下半部的ListView中的内容没有被渲染（但ListView依旧全部占满屏幕）！

坑爹玩意！

目前解决方案：

ListView中其实还有一个不起眼的方法：

```javascript
renderScrollComponent={function}
// 指定一个函数，在其中返回一个可以滚动的组件。ListView将会在该组件内部进行渲染。默认情况下会返回一个包含指定属性的ScrollView。
```

文档里没有详细介绍，但在最新版英文文档ListView的例子里却有它：

```javascript
var React = require('react-native');
var {
  ListView,
  RecyclerViewBackedScrollView,
  View,
} = React;

<ListView
  dataSource={this.state.dataSource}
  renderRow={this._renderRow}
  renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
  renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
/>
```

然后就OK了。。。==