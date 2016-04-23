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