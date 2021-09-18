# EEach clone填充 模板

`el` 不建议用于生成类似数据项、搜索结果的列表等量大、无绑定的元素创建，请利用 `eeach(e, {key})` DOM 模板并 `e,data=[]`。

eeach 可以内联于 HTML ，单项的填充位置是 `key` 如 `$text:$href`、`1$text+0$title=Just $it` ，数据预处理是 `each` ；`e pos posa` 指定复制与插入元素、其位置；参考 [el.path],[el.ins]

`data` 可以是 [Equiv.csv] ，或者在 JS 被写入刷新；可用 `each="it.ok?it:NO"`。 `key`,`each` 的语法参考 [el.setv], [el.eval]

它们支持JS路径、无引号字符串、`$` 内联表达式； `pos posa` 和 `key datak data` 也是 el 的类似模板化功能。

默认值 `{e:0,each:noOp,key:"$text",data:NO, pos:"",posa:"in",deep:1}`

普通Google徽标+上标

```html
<p e="1" each="[...Google]" key="0$text+1$text" posa="in" pos="">
  <i>That is</i>
  <ruby><rt></rt><rp></ruby>
```

独立出template

```html
<template e="$a" pos="$body"  key="$text:$href" data="Hello,#main
Goodbye,#foot">
  <a></a>
```

选择单项，`deep=0` 时不 `cloneNode(true)` 深复制

```html
<select deep="0" data="hello
world"><option>
```

`deep=2` 时展开内部 eeach 标签。

```html
<p deep="2" data="Goo,谷,red,green,blue
gle,歌,yellow,red,blue" key="0.0$alt:0.1$text:0.0$data">
  <ruby><span each="zip([...e.alt],it)" key="$text:$fg"><b></span><rt></ruby>
```

`el.use(eeach,doc.body)` 对文档启用

## 实现笔记

最初的 `each` 语义混杂了 `data` ，允许分号 csv 而后者只是个 `it`JSON  数据，且 `eeach(,,data)` 不是属性

这种做法让二者都是常变的，且 data 只能是 JSON 或作参数提供、each 则只能选择从 HTML 取值或 `=it`，限制很大、数据表达不统一
