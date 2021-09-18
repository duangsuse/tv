# Eazy 特定元素缩写+常用控件

`ezy` 提供了 HTML form 、CSS爬虫的缩写，提供 Tab, Panel,Menus, FloatWin, Slideshow 基础控件，它还向 `el` 注册 H5 新标签 progress,meter,iframe,canvas 的简写

它提供 i18n `gtex.msg_id` 和 `kbd("CA C")` 服务

Panel(面板) 是划分区域的停靠窗，如 Photoshop 有工具面板、图层通道板。它负责进行吸附和大小调整，或可关闭/转为浮窗

Menus 是桌面应用的 ActionBar ，上面存有多个菜单，如

```js
el.menus(
  ["文件",(i=>{}), "打印","打开 关闭"],
  ["帮助",onHelp, "关于", ["链接", i=>open(ss("git: https:")[i]),
    "源码 主页"]]
)
```

## 广义播放列表

支持单列循环,随机N/随选
