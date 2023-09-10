```js
ee.count=({n=0}, my)=>
  (my.add=()=>n.v++ ,
div(p(n),
  button(wOp({tap:my.add}), n,"+1") ))

ee.Count=({n=0}, add=x=>x+1)=>
div(p(n(add)),
  button(wOp({tap:n}), n,"+1"))

ee.Voteup=({N=1}, 倍率=k=>x=>x*rn(1,k).pick() )=>
html(
  b(`已收集${N}票`),
  sel(N.as(倍率(1.5))), `助力一下`
)

ee.Sep=({words=[], sp=['\n',' ']}, ws=i=>words(Eq.sep(sp[i])))=>
$app(
  as(sp, x=>sel(x) ),
  grid({of:'1,2'},
    textarea(ws(0)), sel(ws(1))
  )
)

ee.Upd=({major=3, minor=1, upd=NO, it, iB=0}, chkUp, doUp, done,
  ver=x=>html`${x.major}.${x.minor}`)=>
html(
  h3("听书", ver(it),
    sup(wKV({if:upd}), wSty({fg:green,bg:wheat}), `^`,ver(upd) )),
  btn(iB, chkUp(_=> upd.v={...it._, minor:2,upd:NO}), doUp(_=> it._.to(upd.v)), done(_=>0))

let app={n:0}
main=()=>(say(`count from ${app.n}`),
  Eq.at(n1, {n}, _=>n+1)
  el.button(wOp(
    {tap(){ app.n++ } }),
  "Count: ",app.it.n, " next:",n1) //n=ref()
)

main=(N=app.it.n
, _=Efx.at(N).lets({dur:1}) //:hover{--N:new,animation:js} OR wSty()-only
)=>el(
  b("已收集",N,"票"),
  input(N(倍率(1.5)),"助力一下")
)
倍率=k=>Eq(x=>x*rn(1,k).rand()).fcat//仅读入
rep=(txt,n)=>ul(...
  rn(1,n).let(i=>li(txt)) //let?
)

main=({words=[], sp=[' ','.']}
, ws=i=>words(Eq.of(Eq.sep,sp[i])) )=>_app(
  input(sp[0]),"vs.",input(sp[1])
  grid(1,2,
    textarea(ws(0)), div(wOp({edit:$Y}), ws(1)(Eq.each(Eq.fmt`${0}!`)) )
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

Eq 是克制的框架联邦。囊括 界面/传输/巧语 三界
- el.TOADHIRE CSSanim
- qs.STPM  , flush(Encode)
- it/QN

快速&可扩展、简明&可规范、易用&可评测 (复用 工程 健壮)

Good things come in small packages.

EQ让算法与模式相乘，而不是争锋同场。「凝聚的代码，连周期也能超越」

正常软件功能膨胀，不是解耦合术语膨胀

非null(NO)值 都有 lets(f)得自身 let(f)得f结果。f支持 `el.let(_=>{优化的 with(el) })`

wOSK 如 `el(doc, wOp({tap/2s: ev=>say('${ev.e}好') }),  eApp)`
- `wOp({, edit:$N即NO,inscr,acty:$Y,stop}, 'li, only once stop/! first')` 冒泡参数可选
- `wSty('.css'?, { ,pos,&:})`, wSty\`css${$Y}` 表示 div$css_cls__idSSR() 类的有无
- `wKV({ ,v,slot:[父容器,需全屏]}, 'data/aria')`, `wKV.i18n/css.T='tw-'` 是简写
  - wKV `wOp(fns={my:1}); fns.冒泡my({})` 可监听
  - `pos=[[xy,wh],监听,abs'!'含框]` -plen类型; `Fshadow:[x,y,], _myVar,__moz等XX`, N2.ptr(ev|{move=tap(z在按下时=0),e})偏移

另有树绑定
- let(a,fe) 绑定列表, lets(x,ce,or, fk=`o.type`) way非空判定
  - a={reload(){async的[]/进度条流},clear:div()/NO }
  - `a.make(a=>a.sort, {io})` 时 `Eq.diff(a,b)=[splice(0,-1),(2,+2),(0,[新] 或要移位+2项) ]`
  - 有 `wbr~* {hide缓存}` 和 list[eqN/K=] 方便上色； 移动画:先posabs,排序,赋pos.i
- say(,danger=0~3), ask(inert=NO|body|e横中心).YN/str/(rv,form) 填框和弹框, `sel(rv_i18n,[v]{k:jsonV}rn,{of:'many',chk:1使用box2下拉})`

界面
- Tabs(e0, {i:0,rn:ei=>e.title, ease,corner,kbd:_4way, url:'#'}) //--anim: i rate(); atline:i; snap
- Only1(sel=[N=0~Inf], e_rv=.it.open, vs=$Y$N冲突换色)
  - .on.phone (长按)显示拖选 /初0禁用

EQ基于 tree pattern 读写DOM：
- `el(doc|qs, ..wXX, ..pre, it/parent(css__n)={}, ..tail)` 调用内部"模式" 实现插入
  - `body($app(it, 右))`,el.body((x,y, if var已变)=>`el('*query子项', wKV(a), Eq.fmt'${x},${y}'/Eq.json )` ,body) 是爬虫模式
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
  focus,asFull,asPic,lockPtr,lockWake
  i_deg: 2=横右 -2=横左 1=纵下，±1时i=0。-1 换横竖，负号镜像
  acty:01切走, actyMode:0从不 1熄屏时 2切走时-游戏 3毫秒后-锁屏 
}, quit:NO

HI支持 .story=[], cmdarg, if(card)ret el()

## 叁

如同 `el.组件=({n=0}, my=el.DSL(get, set私有组件/公开函/默认,NS=svg))=>`, `Eq.at({可改量,}, _=>响应式 ,it.type1)`, `Nd(({A,B})=>四则)`

组件只访问全局量。也可 `el.it({NotGlobal: f=>c=>f({...c, api: }) })` ；`el.暴露容器=({e=1})=>e.v=div()`

`T=({age})=>my.check={age:[0,100]}` 把信息暴露在T.prototype{同default}=age.T上，.it.load([])=赋值+复制

  ref(need) //el.评论板=lets(strs, x=>评论(x))

 fref(f=>以f递归 ).v() //v默认自身, 尾递归优化
 evalFun(cg) //用一段据参数生成的(可缓存)代码实现函数，'this域'或在arg0。 cg的函数式参数f, f.args可含参数名和{k=v,} 的默认表; 用于let_, el域 和 Eq.at unit Nd
 cache(f,c__f), //同参数只算1次
 
 hook o.f 请用 `o.it({f:f=>(...a)=>f(...a), f1:logs })`;

`o.let(_=>x)` 作用域在运行期暂把o内变量覆盖到全局，Eqjs编译后则只添加 `_.x`

也即 `let=evaly((o,f,kw)=> [{_:kw[0]=='_'? o, f}, '(f)(_)' ] )` 代码生成+内联参数

```js
o={x:1, a:[2], f(){}}
o.it={
  key: ss`x a`
  x: {v:1,onmod:v=>{}可多项 }
  a: {v:[2], it:{onmod,ondiff,sort:By, [0],} },
  _RWX_key: 'readonly !configurable !enumerable'
  ::fn
}
it.copy(, f=dfs,of=isA.obj)

Eq(谈cat,吐cut=noOp)
  oncat(x, af); flip
num(+1, 2)//2x+1
pipe(...eqf) of(eq,arg,$Y)
way({v:1, _VK: })
o.it.x=o.a.it[0] //x=2 双绑,如对URL

Str.it=let_ reC: 支持fn(get)和Eq(fcat=get,fcut=set)
```
- `noOp.v(f,x)` EQ f都兼容常数，`heredoc.v(JSON),ss,Rn(A?,B), data(class Tag,{T:()=>class{made} }) ,href包或css调用, win=global, doc, isA,n,newA{非空列;wOp流},rn{cut/cycle/has/rand}`
- `Nd.unit(CSS=>{ 1..s.then, rate{onmod}/Lim(f,{slow:0~3,rep}) })` 可做进度条隐藏
- sel支持color/RE逐字/tel Picker 和loadK(*异步进度)
- Trie(v,Dir) deep Sum N2~N(Vn,Va)

Paint(f)支持淡化和弹性动画, 注册_var

- anim(v01,fx) `.rep(1, ok,stopr)={dur:1,fps:10/1s, t0,ease, call(t)}`
- anim(t0,Infinity, f_dt); xywhs
- .at .posMod=(e,i)=>, $EQid

- `URL=[s,'title', {}, Eq.form]` UA=`{env:ss'Chromium 105.0.5195.102 ...', os: ss'Linux x86_64 5.19.6', vnd:[$Y, "iPhon"]}` credentials

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




apple: vo=ca vf=s,tri,circ,quad  scr
2048: snake-360,renju,quest ,linuxgames,funcplot
qsort: bars ,ring-popxy
scrcat: floatOCR-edit obs snap subtitle,move
胞亲 哥姐爸妈  男+女 我是“”

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



如果SQL函数从过滤 table(row,,) 转为DFS搜索“x-解 集”，就能实现类似线代的解方程
解的个数:
1: x=1; a=b; x<1
0: x=y,y=2,x=0 //1: 删x=y
1: 1=y, (y=2|y=1) //2: 改为1=x
响应式: a=b,b=c, c=a

所以函数的参数是“变量”。它也在全局解集添量,用于模式匹配；以执行'=,|'(unify and or)滤流
unification 是指cut(深解赋值), 如 [1 x]=[y 2] 执行后 cat(深建构)出解集: [3 x]=[y [5 y]]
[1]+x =[1 2 3]
append([1], x, [1 2 3])

解集是可以缓存。看看关系式的实例：
类型，是在编译期创建的列表。this把全局函数按首参::分组。推导 "Box.let"(Box<Int>, (T)->R) 是关系式:
let A B等arg
|A=[Box T], B=[Fn T R], 函数体(R变量)或已知'R关于args'的类型函数
|A=[Box T], T
此刻，
  fun<T,R> Box<T>.let(f:(T)->R) = f(this.item)
  Box<T>.let=item

A B 都是“解”提及的变量，因此，cat得到的竟然是“类型函数”(关于 A B)
'|'表现的是重载,(子类)隐式转换可以在 n=Int4,N=Int2, N'='n 里给前者打标
不是只用查询单独的 I2->I4，因为 Fn<set I4> 有 Fn<I2> 要兼容

3写法链表append:
(+) a b
|a=[], b
|a=[x A], [x (A+b)]

appendo a b r
|a=[], r=b
|(xA) a=[x A], r=[x R], append(A b R)

a+b=[1 2 3 4]
#code tca.github.io/veneer/editor.html
(define (appendo a b r) (conde
  ((== a '()) (== b r))
  ((fresh(x A R) (== a `(,x . ,A)) (== r `(,x . ,R))
    (appendo A b R)
  ))
))
(appendo a b '(1 2 3 4))

:- use_module(library(clpfd)). %区间整数求解
solve(X, Y) :-
  X + Y #= 14,
  2 * X + 4 * Y #= 38.
solve(X, Y),
  X in 0..14.


- Str symbol, .lit=add constant  +`,`=raw CodeBlock
- Typed=Pair<Str Type>, +`,`=get names
- Fun=Pair<List<Type> List<Str>> +`,`=reference::fn
- Import("pkg")["item"]


Trie(ways={a,b..},end?) 键值是用于前缀补齐、批量字串替换的树，“单字符文件夹”也是git,apt 等管理hashed数据的方法

其优化AC机(KMP)通过 ab'c'.way['']='bc'd.. 避免了"".indexOf(ss) 时的 `ss[i],s[i-=失配回退]` ，Trie的压缩 后缀树/Radix树用途也很广泛，类似有Huffman树与lz压缩、加权图与输入法，不可谓不好用。

我的PRR 对+-*/,对中文的分词可能要靠字典，本来想靠 pri pro => pr/{i,o} 的后缀树，但"pr"是无法逐字符或单遍读取

如果只是用 Trie，那要1次读取最长的键，性能还不如{}["public"]，毕竟树主要是前缀查找的，对解析器鸡肋

我还是妥协在了 Trie+单后缀懒Map-AC, pri pro pubg=> p/{r/{i,o}, u/bg} ，这样比 [strs].find,filter(startsWith) 优雅很多，主要是提供了高频的(关键词/解析期变量编址/类型期.括号) 补齐/优化、str替换API

[+, {运算符KV},/变量名/] 实现了"a添2"等分词。Chk(kv)会维护对应的正则，读名=向前peek变量名并寻找'添'的位置。消耗二者并下次返回'添'


#tech 有些常见的解析器，如 h1~h6 的标题树、MSWord乃至YAML的缩进列表，以及 1+2*3 => [1 2 3 * +]

若想把 "Hello "+name+"!" 优化为模板，也要先读为 [+ "H" name "!"] 的N参调用树 ##1

读法，比如混乱的左递归、逆波兰算符重排(就是上面 1 2 * ;等效于AST树)。

幸运的是 Lua 提供了基于 Op(x,sep) (层S, 内项>S则停止)递归法，此法易支持 (Expr),也能 'k to (2 to 3)' 这样右优先级更大

- x(流s)='1'
- ·x, ·失败:返回, ·的级比S  大:返回 中:替换S 小:递归(新S) , 结束前add(S)
- 比如，S(+) S(*) 会导致加法最后add，类似遇到'=' 会跳回再上面的S(=) 那层，继续读完 x=x+1/2 到[$x x 1 2 / + =]

嵌套的["", ["h2",]]同理：每一行都是 ·(缩进级)文本、<hN>文本 ，所以它和 #1 的调用树同构，只是不靠[1 2].reduce(+)==3 来执行而已

业界里更复杂，一般 !x.fn()!! 都是读取 unaryNot 再读 x.()[]!! 的括号链，'=' > Or > And ，还有 (1 as? Int + 1) 这些微妙的设计

#js #code 能输入HTML、缩进文本、1+2*3 的解析器




```kt
inout=("in ","out ")
param=range(0,22+1)

Kt("""
package kotlin.jvm.functions

{param,N:,} doc
interface Function{N}<{range(1,it), inout[0]+"P"+it, ","}, R>:Function<R> {
  {N==0,}/** Invokes the function. */
  {OR,}/** Invokes the function with the specified arguments. */
  operator fun invoke({range(1,it),j: "p%: P%"%(j)}): R
}

{R=inout[1]+"R"}
{doc=,}/** A function that takes {N} argument{""if N==1 else "s"}. */
""")


Kt{
"""
class 物(val 造量) {
  fun 事() {
    println(你好 +", $name")
  }
}

fun main(args) = 物(a0).事()
""" to kvOf("物 事 你好 造量 args a0",
  "greeter","greet", "Hello".lit, listOf("name".to<String>),
  listOf(Kt.MOD.vararg+"args".to<String>)
)
}


Kt{
"""
class X_Builder(private var vars) {
  vs{[v T] fun set_v(to:T)=apply {v=to } }
  fun build()=X(vs,)
}
""" to kvOf("X vs vars",
  T, T.vars, T.vars.map{ "$it?" `=` null }
)
}

fun ktSum(rn=10..20)=Kt("control"){
"""
fun main()=print(f(i))

fun sum$f()=let{
  var total = 0
  for (i in rn) {
    total op i
  }
  return i
}
""" to kvOf("0 rn f", 0,rn, rn.run{"${first}to$last"})
}

Kt{
"""
class Hello {
  fun $0()="$0"
  MOD val v
}
"""to kvOf("fun MOD v",
  Fun(rows="slimShady eminem marshall\$Mathers".split().map{listOf(it)} ),
  MOD.private, "android".to<String> `=` "Oreo v.".lit+ 8.1
)
}

Kt{
"""
package com.example

fun print(ary) {
  println("${日()} These are the $a0: \${a0.f()}")
}

typealias Ta
"""to kvOf("ary a0 f 日 Ta",
  listOf("digi".to<IntArray>),"digi",
  Import("kotlin.collections")["contentToString"], Date::class ),
  mapOf("Word".to<String>, "FileTable<K>"to"Map<K,Set<File>>", "Predicate<T>" to "(T) -> Boolean")
}

Kt{
"""
fun f(b: Int): String {
  val result = CharArray(2) { i -> hex((b ushr (1-i)*4) and 0xf) }
  result[0] = hex((b ushr 4) and 0xf)
  result[1] = hex(harg,)
  return String(result)
}

fun hex(i: N) =
 (if (i < 10) i + '0'.to_N() else i - 10 + 'a'.to_N()).toChar()

fun N.square(): N {
  val s = this * this
  return s
}
fun abs(x: N) = if (x < 0) -x else x

"""to kvOf("hex N f harg",
  "hexDigit", Int::class, "byte->hex", "i=b and 0xf"
}


Kt{
"""
class HelloWorld {
  fun beyond(): List<T> {
    val result = ArrayList<T>()
    _times { result += T() }
    return result
  }

  fun print_E(_E: Array<out _E>) {
    println(_E)
  }

  fun print_K(_K<*>) {
    println(_K)
    val taco = createTaco()
    println(taco.isVegan, cake.samename)  
  }
  private var vs
}

"""to kvOf("T E K _times vs", Pkg("com.mattel")/"Hoverboard" ,
  Long::class, KClass<*>::class, 1..3,
  listOf("java".to<String?> `=` null, "kotlin".to<String>)
)to kvOf("createTaco isVegan samename",
  ::createTaco, ::isVegan, Pkg("com.mattel")/"isVegan"
)
}
fun createTaco()=""
fun String.isVegan()=true
```


pls manually import  Pkg/`-=` (KOperator.MINUS_ASSIGN),. or use a formatter on generated code

supported automatically:
- Modifiers, ParameterizedType, `@file:Test` s
- sealed/fun interface, data class/object
- inner class, enum{ XX{overrride}}

weird combination of "hardcoded AST"(by Builder.add!?) + String.format

those struct are !belonging to bussiness logics anymore, they are just boilerplates

why using complicated tools to "magically" generates complicated boilerplates?

