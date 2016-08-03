<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Think in Elm](#think-in-elm)
  - [基础组成](#%E5%9F%BA%E7%A1%80%E7%BB%84%E6%88%90)
    - [Counter Example：](#counter-example%EF%BC%9A)
    - [Input Example](#input-example)
    - [Update](#update)
  - [混合实例](#%E6%B7%B7%E5%90%88%E5%AE%9E%E4%BE%8B)
    - [注册表单](#%E6%B3%A8%E5%86%8C%E8%A1%A8%E5%8D%95)
  - [Advance](#advance)
    - [subscriptions](#subscriptions)
      - [*example : *](#example--)
    - [Commands](#commands)
      - [example--生成随机数](#example--%E7%94%9F%E6%88%90%E9%9A%8F%E6%9C%BA%E6%95%B0)
    - [Tasks](#tasks)
    - [import & module](#import-&-module)
    - [生成HTML](#%E7%94%9F%E6%88%90html)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Think in Elm

### 基础组成

Elm的基本概念由Model, Update, View三者组成：

> Model — the state of your application
>
> Update — a way to update your state. composed by messages & update
>
> iew — a way to view your state as HTML

#### Counter Example：

```elm
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Html.App as App

-- Model，App state
type alias Model = Int
initModel : Model
initModel = 999

-- update the way you can update your state

-- define messages type
type Msg = Increment | Decrement

-- define update func
update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1
    Decrement ->
      model - 1

-- view, render as html
view: Model -> Html Msg
view model =
  div [class "model_container"]
    [ button [onClick Decrement] [text "-"]
    , text (toString model)
    , button [onClick Increment] [text "+"]
    ]

main = App.beginnerProgram {model = initModel, view = view, update = update}
```

#### Input Example

```elm
import Html exposing (Html, Attribute, text, div, input)
import Html.App exposing (beginnerProgram)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import String

type alias Model = String

initModel: Model
initModel = ""

type Msg = NewContent String

update: Msg -> Model -> Model
update msg model =
  case msg of
    NewContent content ->
      content

view model =
  div []
    [
      input [onInput NewContent, placeholder "placeholder"] [],
      div [] [text model]
    ]

main = beginnerProgram {model = initModel, view = view, update = update}
```

#### Update

```elm
-- 定义操作类型
type Msg = Increment | Decrement
-- or
type Operation = Increment | Decrement | Reset
-- or
type Bool = True | False
```

定义的Msg，Operation叫作Union type，用来表示一组可能的值。它的名称可以自己定义，但要大写开头。
类型的可能的值叫作Tag

**Tag也可以是一个接受参数的函数**，例如：

```elm
type Msg
  = Change String

Change: String -> String
```

定义类型如何改变数据：

```elm
-- 定义类型如何改变数据
-- 该update方法接受operation和state作为参数
update operation state =
  case operation of
    Increment ->
      state + 1
    Decrement ->
      state - 1
    Reset ->
      0

-- view
view : Model -> Html Msg
view model =
  div []
    [ input [ placeholder "Text to reverse", onInput Change ] []
    , div [] [ text (String.reverse model.content) ]
    ]
```

实例：

```elm
-- model
-- Model的类型是一个record
type alias Model =
  { content : String
  }

model : Model
model =
  { content = "" }

-- update
-- tag是Change String，其中Change接受String类型作为参数，并返回Model类型
type Msg
  = Change String

update : Msg -> Model -> Model
update msg model =
  case msg of
    Change newContent ->
      { model | content = newContent } -- 更新record类型的model中的content key
```

### 混合实例

#### 注册表单

```elm
import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

main =
  App.beginnerProgram
    { model = model
    , view = view
    , update = update
    }

-- MODEL

-- 定义model别名为Model
type alias Model =
  { name : String
  , password : String
  , passwordAgain : String
  }

model : Model
-- 调用Record生成一个实例
-- {name = "", password = "", passwordAgain = ""}
model =
  Model "" "" ""

-- UPDATE

-- 定义Tag
type Msg
    = Name String
    | Password String
    | PasswordAgain String

update : Msg -> Model -> Model
update msg model =
  case msg of
    Name name ->
      { model | name = name }

    Password password ->
      { model | password = password }

    PasswordAgain password ->
      { model | passwordAgain = password }



-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ input [ type' "text", placeholder "Name", onInput Name ] []
    , input [ type' "password", placeholder "Password", onInput Password ] []
    , input [ type' "password", placeholder "Re-enter Password", onInput PasswordAgain ] []
    , viewValidation model
    ]


viewValidation : Model -> Html msg
viewValidation model =
  let
    (color, message) =
      if model.password == model.passwordAgain then
        ("green", "OK")
      else
        ("red", "Passwords do not match!")
  in
    div [ style [("color", color)] ] [ text message ]
```

### Advance

#### subscriptions

> using subscriptions is how your application can listen for external input. Some examples are: 
> Keyboard events, 
> Mouse movements, 
> Browser locations changes, 
> Websocket events

在Elm中，使用`subscriptions`来监听应用的一些事件，例如键盘响应、鼠标移动、浏览器URL变化、websocket事件等等，并使用`Commands`对事件进行处理。

> A Cmd can be one or a collection of things to do. We use commands to gather all the things that need to happen and hand them to the runtime. Then the runtime will execute them and feed the results back to the application

`subscriptions`要和`cmd`搭配使用，在使用之后，之前的`MUV`结构变为`MSUV`结构。并且Update函数返回的不再仅仅是Model，是`Model + Cmd Msg`

```elm
-- MODEL
type alias Model =
  { ...
  }

-- SUBSCRIPTIONS
-- subscriptions接受model作为参数，在内部声明了要监听的事件，并返回Msg Value，之后传入UPDATE方法
subscriptions : Model -> Sub Msg
subscriptions model =
  ...

-- UPDATE
type Msg = Submit | ...

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  ...

-- VIEW
view : Model -> Html Msg
view model =
  ...

-- INIT
init : (Model, Cmd Msg)
init =
  ...
```

##### *example : *

```elm
import Html exposing (Html, div, text)
import Html.App
import Mouse
import Keyboard

-- MODEL
type alias Model =
    Int
init : ( Model, Cmd Msg )
init =
    ( 0, Cmd.none )

-- MESSAGES
type Msg
    = MouseMsg Mouse.Position
    | KeyMsg Keyboard.KeyCode
-- 监听两种消息MouseMsg、KeyMsg。会在鼠标/键盘操作的时候触发相应的监听事件

-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MouseMsg position ->
            ( model + 1, Cmd.none )
        KeyMsg code ->
            ( model + 2, Cmd.none )
-- update函数必须多返回一个Cmd
-- Cmd.none代表没有命令，什么也不需要做

-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Mouse.clicks MouseMsg
        , Keyboard.presses KeyMsg
        ]
-- 声明要监听的事件。它们(Mouse.clicks/Keyboard.presses)接受Msg作为参数并返回
-- 使用Sub.batch监听多个事件

-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ text (toString model) ]

-- MAIN
main : Program Never
main =
    Html.App.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
```

[Random案例](http://guide.elm-lang.org/architecture/effects/random.html)

#### Commands

> commands (Cmd) are how we tell the runtime to execute things that involve side effects

我们使用cmd来处理需要在程序中运行并需要被处理的事件。在处理完成之后程序会将结果返还给应用。

例如：
- 生成随机数
- http请求
- 储存数据

##### example--生成随机数

```elm
module Main exposing (..)

import Html exposing (Html, div, button, text)
import Html.Events exposing (onClick)
import Html.App
import Random

-- MODEL
type alias Model =
    Int
init : ( Model, Cmd Msg )
init =
    ( 1, Cmd.none )

-- MESSAGES
type Msg
    = Roll
    | OnResult Int
-- OnResult 用来从Random库中获取一个随机数
    
-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Roll ] [ text "Roll" ]
        , text (toString model)
        ]

-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Roll ->
            ( model, Random.generate OnResult (Random.int 1 6) )
        OnResult res ->
            ( res, Cmd.none )

-- MAIN
main : Program Never
main =
    Html.App.program
        { init = init
        , view = view
        , update = update
        , subscriptions = (always Sub.none)
        }
```

**IMPORTANT**

> But commands don't have a concept of success or failure. They also don't have the concept of sequencing. Commands are just bags of things to do.

#### Tasks

鉴于commands并不知道任务返回的结果是成功还是失败，而且也没有对立的概念。因此，我们使用task来进行异步操作，它就像是js中的Promise

task的signature：

```elm
import Task

-- 第一个参数代表失败值，第二个参数代表成功时的回调
Task errorValue successValue

-- example
-- fails with an Http.Error or succeeds with a String
Task Http.Error String

-- a task that never fails, and always succeeds with a Result
Task Never Result
```

*举个栗子：*

```elm
module Main exposing (..)

import Html exposing (Html, div, button, text)
import Html.Events exposing (onClick)
import Html.App
import Http
import Task exposing (Task)
import Json.Decode as Decode


-- MODEL
type alias Model =
    String
init : ( Model, Cmd Msg )
init =
    ( "", Cmd.none )


-- MESSAGES
type Msg
    = Fetch
    | FetchSuccess String
    | FetchError Http.Error


-- VIEW
view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Fetch ] [ text "Fetch" ]
        , text model
        ]

decode : Decode.Decoder String
decode =
    Decode.at [ "name" ] Decode.string

url : String
url =
    "http://swapi.co/api/planets/1/?format=json"

-- fetchTask: takes a decoder and a url and returns a task.
fetchTask : Task Http.Error String
fetchTask =
    Http.get decode url

-- use Task.perform to transform a task into a command
fetchCmd : Cmd Msg
fetchCmd =
    Task.perform FetchError FetchSuccess fetchTask


-- UPDATE
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Fetch ->
            ( model, fetchCmd )
        FetchSuccess name ->
            ( name, Cmd.none )
        FetchError error ->
            ( toString error, Cmd.none )


-- MAIN
main : Program Never
main =
    Html.App.program
        { init = init
        , view = view
        , update = update
        , subscriptions = (always Sub.none)
        }
```

[http请求](http://guide.elm-lang.org/architecture/effects/http.html)

#### import & module

```elm
import Html exposing (..)
-- 把Html模块内的变量全部导入

import Html.Events exposing (onClick)
-- 只导入指定的变量

-- 暴露module
-- 在文件开头加入
module Counter exposing (Model, initModel, Msg, update, view)
-- exposing后是要暴露出去的变量名。使用(..)则暴露全部(不推荐)
-- 变量名(Counter)要首字母大写
-- 且该文件内不再有main变量
```

#### 生成HTML

**非module的渲染文件中必须有main变量**

> Front end applications in Elm start on a function called main. main is a function that returns an element to draw into the page. In this case it returns an Html element 

```elm
import Html exposing (..)
import Html.App as App

main = App.beginnerProgram {model = initModel, view = view, update = update}
-- or
main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
```

**HTML渲染**

```javascript
-- 前端使用elm时的渲染方法
const Elm = require('./example.elm');
const mountNode = document.getElementById('example');
let app = Elm.Main.embed(mountNode);
```