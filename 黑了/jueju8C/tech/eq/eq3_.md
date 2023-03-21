```js
el={
  get,
  _lazy={Paint,_inview:[], _fread,_fxml}, //用于 Eqv. file,h5 。注意不是 h5_(MIME=类似el.ns,svg啥的)
  _die=[],
}

// el.href`` also for NodeJS
it.deep.cfg(win, {
  document: {
    url: 
  },
  CSS:{
    s:
  }
  CSSUnitValue:{prototype: {
    rateLim:
    to(unit){return this}
  }}
})

say={
  f(watched), // logs arg-res every f()
  get dbg(){} // d={}  dir({}), dx=dirxml, dif=n(a)>3 debugger, dm=list method. dm(/get/,'fn'),d('table dir ..',console)
  //console.logN(n|NO, app.it.lines, {key:ev=>, xywh:, line:'',ps1:'>'}?)
}
d=say // convenient!

main.to`part1` //app.part1(cfg={}).. easy to preview
main=()=>yourNewPart
```

- tap,tap2双击,tap2s右键，tap_li 选择性代理
- wOp 有 (鼠+触摸) hov:[ptrIn,Out],tapup,focus[,blur] ,key,drag,draghov. hovE,focusE 对子树生效
- `wOp.at(o|{e:..})` 以允许 `o.wOp()`。EQ 有监听 change,resize,unload,scroll 的组件
- `wOp.flag` over,stop,stop! 在 `return $Y` 不阻止默认/父级/中间件处理。 meFirst 优先父级, scroll 阻止滚动。`{tap:ev=>ev.e,eRel, e0}` 以访问被点子项,相关,自身。

`wA{inview:c.it.YN}` 是滚动侦测，其数组以 `e.xy.y` 有序与 win.scroll.xywh 相交(`div.area` 则+宽高)。onresize 与 `wA{xywh/s:[xy,wh?],area:wh}` 提供xy， `Vec2.pMouse(e,tap?)` 类似

- xy是基于最近 `position:relative` 父级，如e。 修正鼠标ev.offsetX
- `scroll` 偏移后是 clientX 即 x,left (如,"包围"clientRects)
- 还有按 `screen.area,.xy` 。offsetParent 默认 body(page)，ev.offset 则是拖拽抓住的框内点
- `P=pMouse; P.z` 鼠标 0则松钮 触摸 Touch.force


它提供 `.eq-pintop`：(首显后)其上1元素可见则解除pin，否则开始pin。 eq 的功能类都监听 qs\`[className]\`。

`Only1(rv=.sel CSS, sel=[1], sameset=父级相同,vs=[$Y,$N])` = [in,out] 可调用

导航栏/`details` 悬停展开。据事件配对赋 `rv=vs[0,1]`，或单击 `rv=vs[i++越界/反选 回0]`
- Ctrl=新选不清旧、Shift=选中区间，同时=改区间锚点,不清旧
- 可监听 sel 实现选区UI，修改 `sel.n=0` 实现仅长按可选中。
- 默认UI：>2项时 全(不)选CtrlA/Esc，光标拖选元素 //EQ 不特殊支持触屏

```
el.Rn={
  now={e0,i0, e,i, sel},
  focus,
  copy(s?),
  onpaste(get=>{ get('html') })(e) // 支持drag=支持cut/paste。ary() 有默认支持
}
```

多选拖选是多个 Only1 基于 `Rn.it.now.onmod=` 监听，且不论 `onmod` 只允1个，被移除了不会内存泄漏？

`s=it.listen(app.it.txt)` 令 `s|txt.onmod=v=>{}` 可重复添加，在返回 $Y 时监听失效

```js
anim.at(c.it.txt, {ease,erase})(e)
// wA({show})(e) 、el.ary 也会播放擦拭后隐藏/移走e
// ary和手动remove 会用 el._die() 注册已退场节点，ary 在 [eq-n]>wbr~* 右始终留住3项 待复用。a.make 只需用 splice 等编辑方法修改原数组(过滤,. 后的结果)

anim.at.rest=e=>在垂直方向放 erase.flys

anim.erase={
  fly('s',{Tscale:1}), //.iverb=2
  flys(A,B)(t=0~1),
  fade(g,A,B), // perlin
  flow, // same, need el.draw
  cubes, //draw(,'svg')
  _('chess', mask, {smooth:±.5}) // '-' flip erase
  _chess, _cloud
}

iverb.oncut({rows:$Y, fwd:$Y, i:1}, x=>x-1).rows=$N
```

`a.make(a=>, {io:$Y, brief:$N})` 会diff新旧a，并对原a进行添删和深赋值。io假时 `it.deep.n=1`，brief真时多于 `--brief:3` 位置整体只末端有动画，同长度段深赋值。

`Eqv.iverb` 编码了“上下左右”4向1数， i=1时 +2=横右 -2=横左 +3=纵下 -3=纵上，±1时i=0，以此类推。所以 -1 就能换横竖排，负号就镜像


```js
Va={
  X(...comb),
  Xself(a,uniq=n(a)),
  T(a, _90deg=1),
  dot(...sum), // Shape [n,3] * [n,3] = [n,1]
  eachNext(...g)
}

Va([2,[3,1]], i=>j=>i*3+j ) // 提供数字就等于Vec1。为方便运算 V(1): Vec2
Va([2,3], i=>V(i,2,3))

r; l; rVec(r__2v)
```