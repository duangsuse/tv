```js
el.count=({n=0}, my)=>(
  my.add=()=>n.v++ ,
  div(p(n), button(wOp({tap:my.add}), n,"+1") )
)

let app={n:0}
main=()=>(say(`count from ${app.n}`),
  el.button(wOp(
    {tap(){ app.n++ } }),
  "Count: ",app.it.n) //n=ref()
)

main=(N=app.it.n
, _=anim.at(N).lets({dur:1}) //:hover{--N:new,animation:js} OR wSty()-only
)=>el(
  b("已收集",N,"票"),
  input(N(倍率(1.5)),"助力一下")
)
倍率=k=>Eqv(x=>x*rn(1,k).rand()).fcat//仅读入
rep=(txt,n)=>ul(...
  rn(1,n).let(i=>li(txt)) //let?
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
  way(v.upd, v=>sup(wSty`color:green on wheat`, "^",v.major,".",v.minor)) )
el(doc.body,
  h3("听书",更新(app),
  btn((检查更新,更新,完成)=>{ app.v.let(v=>(检查更新)? (v.upd={...v, minor:2,upd:NO}) :(更新)? v.let(v.upd) ); return 更新+1 })
))
```

Eqv 是克制的框架联邦。囊括 界面/传输/巧语 三界
- el.TOADRR CSSanim
- qs.HISTPM /hi-cmdarg , flush(Encode)
- it/QN

EQ让算法与模式相乘，而不是争锋同场。「凝聚的代码，连周期也能超越」

正常软件功能膨胀，不是解耦合术语膨胀

非null(NO)值 都有 lets(f)得自身 let(f)得f结果。f支持 `el.let(_=>{优化的 with(el) })`

wOSK 如 `el(doc, wOp({tap/2s: ev=>say('${ev.e}好') }),  eApp)`
- `wOp({, edit:$N即NO,inscr,acty:$Y,stop}, 'li, only once stop/! first')` 冒泡参数可选
- `wSty('.css'?, { ,pos})`, wSty\`css${$Y}` 表示 div$css_cls__idSSR() 类的有无
- `wKV({ ,v,slot:[父容器,需全屏]}, 'data/aria')`, `wKV.i18n/css.T='tw-'` 是简写
  - wKV `wOp(fns={my:1}); fns.冒泡my({})` 可监听
  - `pos=[xy,wh监听,abs'!'含框]`; `Fshadow:[x,y,], _myVar,__moz等XX`

另有树绑定
- let(a,fe_x) 绑定列表, lets(x,br,or, fk=`o.type`) way非空判定
  - a={reload(){async的[]/进度条流},clear:div()/NO }
  - `a.make(a=>a.sort, {io})` 时 `Eqv.diff(a,b)=[splice(0,-1),(2,+2),(0,[新] 或要移位+2项) ]`
  - 有 `wbr~* {hide缓存}` 和 list[eqN/K=] 方便上色； 移动画:先posabs,排序,赋pos.i
- say(,danger=0~3), ask(inert=NO|body|e横中心).YN/str/(rv,form) 填框和弹框, `sel(rv_i18n,[v]{k:jsonV}rn,{of:'many',chk:1使用box2下拉})`

界面
- Only1(sel=[N=0~Inf], e_rv=.it.open, vs=$Y$N冲突换色)
  - .on.phone (长按)显示拖选 /初0禁用
  - S-区间增选(仅异边) C-反增选 A-Esc, Shift滚轮=换tab
    - EQDE 主页=控件板(dock分屏,滚轮), 新工作区=App表控件, 热区=左…位置日期app(drop笔记) 右消息开关, 滚轮抖动win=概览(-1区);跨区拖放;层叠动效
    - 截屏/冷藏 ,UI值类型(rand,滚轮),pin菜单 右键模态栏化 关窗=中键(右日期)

EQ基于 tree pattern 读写DOM：
- `el(doc|qs, ..wXX, ..pre, it/parent(css__n)={}, ..tail)` 调用内部"模式" 实现插入
  - `body($app(it, 右))`,el.its((x,y, if!modify)=>`body(el('*query子项', wKV(a), Eqv.fmt'${x},${y}'/Eqv.json ))` ) 是爬虫模式
  -  `div(html(str))` 是爬绑HTML, `$wtf(lets(rn(10), el.html(p(), p()) ))` 加10次到.wtf
- let尾随ul参, lets据{k:fn}内CSS/匹配爬虫
  - qs\`${e0} tag\${}` 会监听tag[attr/v0, str/child] 如.pintop.headroom.Vscroll ; 以及 el.D. pages,forms
  - qs\`@media,net,dpi` via qs.on.net/phone
  - `a1.it({a:2}).it` .a 编辑函数+取ref ；可Row化 `o.it {key,()=vs,(vSwp, af?)}`
- `let([{id:'X',age:18}], o=>同上,  ()=>ul(wOp{draghovE:[起,落]/f_it }), li)` 拖放(Tab^B)前悬停，返$Y禁用
  - wSty{pos}的[N2.xyPtr] 可拖放和撤销

只有 `e.pos={e0,e/copy,eHide, L,R, css:'div'/chk,n:NO,deep:2 ,fskip}`

## 贰

Scr={_root,err(ev){},
  focus,inFull,inPic,lockPtr,lockWake
  iDeg: 2=横右 -2=横左 1=纵下，±1时i=0。-1 换横竖，负号镜像
}
ScrOff={now:01切走, acty:0从不 1熄屏时 2切走时-游戏 3毫秒后-锁屏 , unload:NO }

HI支持 .line=[]

## 叁

如同 `el.组件=({n=0}, my=el.DSL(get, set私有组件/公开函/默认,NS=svg))=>`, `Eqv.at(ret?,{可改量,}, _=>响应式)`, `Nd((A,B)=>四则)`

组件只访问全局量。也可 `el.it({NotGlobal: f=>c=>f({...c, api: }) })` ；`el.暴露容器=({e=1})=>e.v=div()`

`T=({age})=>my.check={age:[0,100]}` 把信息暴露在T.prototype{同default}=age.T上，.it.load([])=赋值+复制

  ref(need) //el.评论板=lets(strs, x=>评论(x))

 fref(f=>以f递归 ).v() //v默认自身, 尾递归优化
 evalFun(this_=NO, sf) //sf的函数式参数f, f.args可含参数名和{k=v,} 的默认表; 用于let_ 和Eq.at
 cache(f,c__f), //同参数只算1次
 
 hook o.f 请用 `o.it({f:f=>(...a)=>f(...a), f1:logs })`;

`o.let(_=>x)` 作用域在运行期暂把o内变量覆盖到全局，eqvjs编译后则只添加 `_.x`

也即 `let=evaly((o,f,kw)=> [{_:kw[0]=='_'? o, f}, '(f)(_)' ] )` 代码生成+内联参数

```js
o={x:1, a:[2], f(){}}
o.it={
  key: ss`x a`
  x: {v:1,onmod:v=>{}可多项 }
  a: {v:[2], it:{onmod,ondiff,sort:By, [0],} },
}

Eqv(谈cat,吐cut=cat)
  oncat(x, af); flip
num(+1, 2)//2x+1
pipe(...eqf) of(eq,arg,$Y)
way({v:1, _VK: })
o.it.x=o.a.it[0] //x=2 双绑,如对URL

Str.it=let_ reC: 支持fn(get)和Eqv(fcat=get,fcut=set)
```
- `noOp.v(f,x)` EQ f都兼容常数，`heredoc.v(JSON),ss,Rn(A?,B) ,href包或css调用, win=global, doc, isA,n,newA{非空列;wOp流},rn{cut/cycle/has/rand}`
- `it.unit(CSS=>{ 1..s.then, rate{onmod}/Lim(f,{slow:0~3,rep}) })` 可做进度条隐藏
- sel支持color/RE逐字/tel Picker 和loadK(*异步进度)
- Trie(v,Dir) deep Sum N2~N(Vn,Va)

Paint(f)支持淡化和弹性动画, 注册_var

- anim(v01,fx) `.rep(1, ok,stopr)={dur:1,fps:10/1s, t0,ease, call(t)}`
- anim(t0,Infinity, f_dt); xywhs
- .at .posMod=(e,i)=>

- `URL=[s,'title', {}, Eqv.form]` UA=`{env:ss'Chromium 105.0.5195.102 ...', os: ss'Linux x86_64 5.19.6', vnd:[$Y, "iPhon"]}` credentials

## Pjs失败的前作

jsju 是kt的子集，支持JSON字面/扩展算符和函数块 ，它能和java玩反射RPC

ju.url= `ju://org.ui.Toast:objID/f#arg` 和 JS.eval(`js://`) 实现两方收发
- `v{get();set(v1)}, Pair()` 都视作无名方法, T.Named:0 即static
- data,Buider 构造于 `JSON{age:16, id:(showAll)way{omit} {id} }` ，也能 `o={k:v,}` set
- `io.File()!.open!` 保留引用而 `readTxt()!!` 深拷贝 (都可 `fun File.xx`) ，ju.onThen=catch错误消息和弹框
- `ju.Httpc()! {onEnd=Fn{} }` 在有!或Fn参叫XXer时保留引用，jvm 侧才可多参 `f(o:JS)=o.get("fn",1)`
- 可尾参Consumer, `f(s=ju.Seq()); for(await)` 

RPC负责给包里static的词(new,enum,.)或实例做编址-pin，实现 (o.f).!f1 能GC临时this,和深拷贝f1

默认只爬取基元值，调用f1获得属性， `pair: A=1;B=2` 自动ORM式值同步

调用皆异步，尾参Consumer可多返回; 支持Builder,SAM参 `ju.Fn:say(it) or {=run{fn}}`

- 与弱类型不同！调用参数不存在 Number, Collection 这种统一格式，因此ISON靠 `cat(ty,list, [add *args]); cut(ison.tyres)` ,随序列化做调用
- `= | $Y $N NO` 关键词,`[]` 分隔符。其它str可以无"",支持 \"\\
- `List(Str) (size)` 需要类型参: Ty.send[T]=(ISON,EArg)-> 利用 Ary(E){x->} KV 读取器创建T
- .subtype[Str][Blob]=(0) 就可以让调用(接受filePath,) 。[T=Obj]下 0#num,0. 为Int,Double; [],[=]为list和map
- JDK提供ListT,MapKV 的反射，兼容到 Args,Obj 方便由弱类型修改. `ju://vm/TYPE:objID/$ISON(加#代表深拷)`; 配置 ju{url,onThen=catch, showACC='priv'}

之前 vs 统一用语

k|重赋值|遍历
:-:|:--|:--
Ju|lets|let
EQ|sees|see
旧EQ|when|ary
PRR|make|seen(visit)


功能|EQ|Svelte|Vue|React
:-:|:--|:--|:--|:--
UI|el树模式|MD|ElementUI|自家的MD库
State|qs.ST|自带|Vuex|Redux
Route|qs.HI|[spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)|router|[BrowserRouter](https://reactrouter.com/en/main/start/tutorial)
预渲染|el树模式|kit|pre-SSR|prerender
测试|wOp树模式|[testing](https://testing-library.com/docs/svelte-testing-library/example)|@vue/test-utils|Jest


apple: vo=ca vf=s,tri,circ,quad  scr
2048: snake-360,renju,quest ,linuxgames,funcplot
qsort: bars ,ring-popxy
scrcat: floatOCR-edit obs snap subtitle,move

jsju不实现的语义：
- 类/物的格局
- 判- 储, 泛型T 视作Any
- 恒, @和’‘受内码

要点：
- 记法的分词 (英文,不匹配\w+)
- 词/作扩充,含你, 量纲报错自动化
- [预计算], 流控内联[^]
- 受解构, (仅)函函续, Args
- 物- 扩充,可送零值, 书/#! 引

```js
feed=(s,i=0)=> n=>s.slice(0,Math.abs(n),  n<0?s=s.slice(-n):0)

re=(s,grp, f)=>{let m, n=0,nr=1
  while(/\s/.test(s(1)))s(-1) //分词空格
  //流式向右瞄, 也可以s() 一览到尾
  while(n!= (m=grp.exec(s(nr)),  m?(/*新*/n= m[0].length):n) )nr+=1
  return m? (m.shift()==s(-n), f(...m)) :m
}
Many=(p ,r)=>s=>{let a=[];while(r=p(s))a.push(r) ;return a}

lisp=Many((s ,ret)=>(
  re(s, /(\d+)/,parseInt)||re(s, /(\w+)/,str=>str) ||
  (s(1)=='('? (s(-1), ret=lisp(s), s(-1)==')', ret) : null)
))

falso=af=>(f ,r)=>(...a)=>(r=f(...a), af(r,...a),r)
zip=(a,b)=>a.map((x,i)=>[x,b[i]])

lg=falso(console.log)
1&& ["1a", "(str 123 (deep str )4 ) ", "() ( a 2 3a)"].forEach(lg(s=>
  lisp(lg(feed(s)))
))

/*
牛逼看过瘾了吗？ 咱们开始简化吧。

刚才，你手写了Lua,apktool 级的代码！ 不过加20行就能实现[读写平权]和[词条高亮] 两个特技
1. 既然能 JSON.parse, 就一定能 stringify(正如 Rustc, rustfmt 视出同源)，别为此再定义 Writer
2. CSS.hl 可以添加文本框Range，只需read(s)后绑定 s.spans([ i0,i1,k:'num' ])

为此，要得出完整的树成员
- "",//  str得undef,读完会跳 s.ws(s), 不成功都得NO(null)
- [a,b, f], ['*或?', a, b], [P,a,b] 得 f([a,b]), a||b
- ['+',',', a] 读 "a, a",. 加['#n', /\d* /]如["1",".0"]间无空格
- P() 以函数暴露读写，递归只需 s=>Any(s) 代理; s.w指明要dump的数据
*/
lisp=P(['*',[P,
  [/\d+/,parseInt], /\w+/,
  ['(', s=>lisp(s) ,')']
]])

P=(s ,f,re)=>(
  f=a=>{if(a.call)return a(s)
    let r,N
    ,A=
      a.substr? (N=a.length,s(N)==a? void s(-N):NO) :
      a.test? re(a,0, 1/*++*/) :true //使用py,irb同款试错法
    ,B={
      [P]:(_,...p)=>{for(_ of p){if(NO!=(r=p(s)))return r}return NO},
      '*':p=>{},
      '?':p=>{ },
      '+':(sp,...p)=>{},
      else:p=>{ }
    },s0
    if(true!==A)return(A!==NO?(s.wsOf[A]=s.ws(s)):0, A)
    if('#'==a[0][0]){s0=s.st;s.st=a.shift().slice(1)}
    r=(B[a[0]]||B.else)(a) ;if(NO!=s0)s.st=s0
    return r
  },
  re=(f,{n,no=''})=>{let m=f(s(n));
    try{JSON.parse(s(n))} catch(e){+/at.*?(\d+)/.exec(e+'')}
    if(no==m[0])return NO
    if(m){s(-m[0].length)}return m
  },
  O.assign(f, {dump:x=>f(x, ) })
)

/*
递归，你也可以用Y组合子; p=fref(引用p)
*/
fref=(need ,v,f=(...a)=>v(...a))=>(v=need(f),v.v=V=>v=V, v)

// 100==fref(f=> x=>x?f(x-1)+1 : 0)(100)

```
