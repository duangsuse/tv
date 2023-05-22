```js
let app={n:0}
main=()=>(say(`count from ${app.n}`),
  el.button(wOp(
    {tap(){ app.n++ } }),
  "Count: ",app.it.n) //n=ref()
)
el.count=({n=0} )=>(
  my.add=()=>n.v++ ,
  div(p(n), button(wOp({tap:my.add}), n,"+1") )
)

main=(N=app.it.n
, _=anim.at(N).let({dur:1}) //:hover{--N:new,animation:js} OR wSty()-only
)=>el(
  b("已收集",N,"票"),
  input(N(倍率(1.5)),"助力一下")
)
倍率=k=>Eqv(x=>x*rn(1,k).rand()).fcat//仅读入
rep=(txt,n)=>ul(...
  rn(1,n).lets(i=>li(txt)) //see?
)

main=({words=[], sp=[' ','.']}
, ws=i=>words(Eqv.of(Eqv.sep,sp[i])) )=>_app(
  input(sp[0]),"vs.",input(sp[1])
  grid(1,2,
    textarea(ws(0)), div(wOp({edit:$Y}), ws(1)(Eqv.each(Eqv.fmt`${0}!`)) )
  )
)

let app={v:{major:3, minor:1, upd:NO}}
el.更新=({v})=>p(v.major,".", small(v.minor),
  seesIf(v.upd, v=>sup(wSty`color:green on wheat`, "^",v.major,".",v.minor)) )
doc.body.let=el(
  h3("听书",更新(app),
  btn((检查更新,更新,完成)=>{ app.v.let(v=>(检查更新)? (v.upd={...v, minor:2,upd:NO}) :(更新)? v.let(v.upd) ); return 更新+1 })
))
```

Eqv 是克制的框架联邦。囊括 界面/传输/巧语 三界

EQ让算法与模式相乘，而不是争锋同场。「凝聚的代码，连样貌也能超越」
- el.OSDARR CSSanim
- qs.HISTPM
- it.refVec

非null(NO)值 都有 let(f)得自身 lets(f)得f结果。f支持 `el.let(_=>{优化的 with(el) })`, my限全局域

wOSK 如 `doc.let=el(wOp({tap/2s: ev=>say('$this好') }), wXX,, ...child)`
- `wOp({, edit:$N即NO,acty:$Y,stop}, 'li, only once stop/! first')` 冒泡参数可选
- `wSty('.css'?, { ,pos,inview})`, wSty\`css${$Y}` 表示 div_css$idSSR() 类的有无
- `wKV({ ,v,slot:[父容器,需全屏]}, 'data/aria')`, `wKV.i18n/css.T='tw-'` 是简写
  - wKV `wOp(fns={my:1}) ({e:Node}); fns.my(触发={})` 可监听
  - `pos=[xy,wh监听,abs'!'含框]`; `Fshadow:[x,y,], _myVar,__moz等XX`
  - `wSty().wSty()` 支持 `&:sub`

另有树绑定
- see(a,fe) 绑定列表, sees(cfe,fk=`o.type`)/If非空判定
- say(,danger=0~3), ask(inert=NO|body|e横中心)(rv,form)/YN/str 填框和弹框, `sel(rv_i18n,[v]{k:jsonV}rn,{of:'many',chk:1使用box2下拉})`

EQ基于 tree pattern 读写DOM：
- `el(无tag,wXX,)` 和 `get((a,b, !modify,rv)=>body(el('*', wKV(a))) )` 树都返回函数
- `doc.let=el(...pre, it/parent(), ...tail)` 调用它 完成插入/爬取
  - see则据ul参, sees据{k:fn}内异常爬
  - see优化: `a.make(a=>a.sort, {io})` 时 `Eqv.diff(a,b)=[splice(2,2),(0,0,刚才=2 或[新项]) ]`；有 `wbr~* {hide缓存}` 和 list[eqN/K=] 方便上色
  - qs\`${e0} tag\${}` 同样会监听tag[attr/v0, str/child] 如.pintop.Vscroll
  - qs\`@media,net,dpi` via qs.on.net
  - `a1.it({a:2}).it` .a 编辑函数+取ref ；可Row化 `o.it {key,()=vs,(vSwp, af?)}`
- `pt=({x=2,y})=> el.div( Eqv.fmt'${x},${y}'/.json.v)` 可编辑(el.和el.my组件)
- `see([{id:'X',age:18}], o=>同上,  ()=>ul(wOp{draghovE:[起,落]/f_it }), li)` 拖放(Tab^B)前悬停，返$Y禁用
  - [Vec2.xyPtr]和wSty{pos} 可拖放和撤销

只有 `e.pos={e0,e,eHide, L,R, css:'div'/chk,n:NO,deep:2 ,fskip}`

## 贰

Scr={_root,err(ev){},
  focus,inFull,inPic,lockPtr,lockWake
  iDeg: 2=横右 -2=横左 1=纵下，±1时i=0。-1 换横竖，负号镜像
}
ScrOff={now:01切走, acty:0从不 1熄屏时 2切走时-游戏 3毫秒后-锁屏 , unload:NO }

## 叁

```js
o={x:1, a:[2], f(){}}
o.it={
  key: ss`x a`
  x: {v:1,onmod:v=>{} }
  a: {v:[2], it:{onadd,onpop,sort:by, [0],} },
}

Eqv(谈cat,吐cut=cat)
  oncat(x, af); flip
pad(+1, 2) //+1,*2
pipe(...eqf) of(eq,arg,$Y)
way({v:1, _VK: })
of({v}, _=>响应式)
o.it.x=o.a.it[0] //x=2 双绑,如对URL
```
- `noOp.v(f,x)` EQ f都兼容常数，`heredoc.v(JSON),ss,href包引用, win=global, doc, isA,n,newA{非空列;wOp流},rn{cut/cycle/has/rand}`
- `it.unit(CSS=>{ 1..s.then, rate/Lim(f,0~3) })` 可做进度条隐藏
- sel支持color/RE逐字/tel Picker 和loadK(*异步进度)
- Trie deep Sum Vec2~N(Vn,Va)

Paint(f)支持淡化和弹性动画, 注册_var

- anim(v01,fx) `.rep(1, ok,stopr)={dur:1,fps:10/1s, t0,ease, call(t)}`
- anim(t0,Infinity, f_dt)

- `URL=[s,'title', {}, Eqv.form]` UA=`{env:ss'Chromium 105.0.5195.102 ...', os: ss'Linux x86_64 5.19.6', vnd:[$Y, "iPhon"]}` credentials
