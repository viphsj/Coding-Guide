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
    - [subscriptions & cmd](#subscriptions-&-cmd)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Think in Elm

### 基础组成

Elm的基本概念由Model, Update, View三者组成：

> Model — the state of your application
>
> Update — a way to update your state
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

-- define update type
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

#### subscriptions & cmd

