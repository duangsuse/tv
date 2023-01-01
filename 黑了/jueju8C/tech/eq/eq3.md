# 大写框架

因为核心大而泛用，EQ把能贴近(各方向)实际应用的API称为“枝框架”，就是框架。

有大写、刷新、淡化、绘画 4个框架“大新2化”， 它们有独立、或与树集成的设计，即便为许多用途考虑，也能开箱即用

`el.D, el.Reload` 等首字母大写，要以 `div(el.Paint(绘函), "colors")` 等写法传参再使用(注意 `Paint` 和wSty是同位)的UI项 统称为『大写框架』

- `D({filter,sort}).table({FOR,form}), .list(), .dateCal` 以表格或flex 的方式展示数据
- `Slide()(ul)` 将 ul 滑移分页(页长必须相等)
- `Only1()` 悬浮菜单，配合 `Rn()`
- `Reload(no,err,banner)(div(wOp({reload:async(progress)=> })) )` 为整体添加 Chrome 式加载圈/顶条 或下拉banner



## Slide 滑移与淡化

```js
Slide({chk:`detail`, i:0})(
  anim.iseq(`++`),
  //...Slide.x("btn"),
  el`ul .big*'A B C' `
)

Slide.c={chk:默认值} //标准组件定义
```

>此组件参考 轮播图、标签页、右滑栏、幻灯片，只用 `--{x,y}` transform() 和 `Vec2.pMouse` 实现

- `.slide nav+ul`，显示 ul `内(a[i])` 开始共 `l` 项
- `chk`=0b11 是EQ组件通用位旗，代表竖向、显示细节(nav)。 nav 以 `--{x,w}` 提供趋向 `tab` 位置和宽度，默认含 `e=>hr(e.i)` 以 `nav>hr[now,i]:focus` 标活
- 若有 `overflow:f` 则响应式 `ul.roll` 两端互有复制项，i越界时互跳并f()
- 若有 `.slide>aside` ，只有在其上开始滑才导致换页。手势防抖为15px。

轮播图利用“播放列表” `anim.iseq("+")` 在CSS事件 `anim:js 1s infinite` 换页

- `+` 单次 +- 正反 ~ 随机 0 单曲单次，++ 无限 -+ 反正 以此类推，完后 `.slide.end`
- 赋值 `c.i ~< n(c.a)` ，c或为e.c (标准树组件)

两项间无论 `--x` 位移抑或图像都能渐变。`ac=anim.at('x', {ease,erase, extend:'transform'})(e)` 对 `--属性` 进行补间，

当手势释放，`ac.v=(i=floor(x/w))*w` 滑移到新页。距离>10px 时使用动画

`ac.erase(f=>x=>f(e1,t=x/w ))` 则实现e截图到e1截图 t% 的渐变。即 CSS 配置 `--erase: fade` ，ease 算完时重绘

要定义这两种函数，
- `ease(A,B)(t=0~1)` 在 A~B 间。`anim.at` 在 `isNaN(ease("","hh")(1.0))` 则对e副本和新e 进行淡化
- `erase(A,B)(t), erase(g,A,B)(t)` 是针对DOM和像素图的淡化(/进退场)。二者都能在UI或图片上使用

### 扩充

`Slide.x("")`|功能|另
:--|:--|--:
btn|添加 `.slide .L,.R` 两项、`.slide[i=0][i=end]`|默认淡按钮。支持（键盘)RTL/纵向
wheel|使用滚轮翻页 `.slide[wheel,i="<"][i=overflow]`|等待动画。`anim.at` CSS类更新=重配
pad|`ul{box-sizing: content-box; padding:0 5%}`|计算不变
page drag|nav按页选择(`c.l=3` 每页)、保留拖拽位置,还有 _noovf 位旗|`transition:order 1s` 代表1s/页 自动滑移，移入暂停*
thumb|与父元素按 `i` 关联|且聚焦 `doc.url.hash` 所指 id 的项

*: `onAnimCancel=({elapsedTime})=>`。`chk=0b100` 不吸附拖拽

## spimg 框架

绘画框架的正式名称是 spimg ，因为它只应保留用于支持精灵图(拼小图成大块)的代码

`Paint((g,{_rainbow})=>{}), draw(e,'2D')` 基于 Houdini 定义了参数绘图、滤镜标准


`ptr/tap: el.Only1(rv=.sel类 ,sel=[NO], sameset=parent相同,vs=[$Y,$N])`

- 导航栏悬停菜单，但按 Ctrl 可多选
- `details[open]` ，按 Ctrl+Shift 可增选区间(vs在$Y$N轮转)
- `table tr`，在有选中时，基于 `el.Rn.now` 可以全选/拖选

https://iandevlin.com/blog/2011/05/html5/webvtt-and-video-subtitles/ , Presentation measureText capture, Bluetooth,Ambient/Battery/Serial, CreateTouch, 2ChMsg, CSS:CustomStateSet, evaluate:XPath, doc:open , ErrReport, Crypt/CSPTrusted/Stream, MedK, navigation, IDB.FileHandle, Fetch, MediaDev, RWStream, Custom/ElementInternals/form

performance.getEntriesByType("resource")

LayoutShift,LCP,LTask,

https://docs.w3cub.com/dom/sensor_apis

## Web 优化

当你在地址栏输入URL回车，浏览器(UA)会完成一些职责以实现 C++,C# 之流没有的概念
- 解析 `协议://主机/路径#焦点` 或简或繁的URL，DNS查到IP并 sock.connect() 开字节流，HTTP 收发
- fetch() 到XML以容错解析，并对其href的内容继续加载，直到 `DOMContentLoaded` 和 img等占位object、CSS 下载后的 `load`
- 重算cascade `getComputedStyle($0)`
- 重排layout `box-sizing; border; font; ::after` 等盒模型属性
- 重绘paint 原生视口/控件、`CSS.paintWorklet` Houdini画布
- 混成composite `mix-blend-mode； mask; background-clip; z-index和“后来居上”`

浏览器引擎能负责 Firefox 界面、VSCode 交互。MS Word、GTK/Qt 都学习了它的部分功能。

尽管常绿浏览器能分配好脚本和重排的时间，避免高频读写 DOM 是避免 回流reflow 的主思路，哪怕重绘也是更迅速的。节点复用(显示隐藏)、任务队列化，如利用 rAF 的 `anim(0,Infinity, (d,t)=>)` 无限动画而非总在setTimeout，都能使体验更丝滑

需要注意的是，DOM 对 `location`,`styleText`,`innerHTML` 都有文本和 `{k:v}` 两种表达形式，这和 EQ 流派相同。

网速外的优化对Web好像很矛盾。只有DOM会把容易调试改写(甚至js生成)的文本和UI、历史栈混作一谈，甚至连 Widget, 横纵Layout(类似于 span,div) 都未定死，各层的动态性、甜语法都是以昂贵的重算为祭品。H5的火热似乎证明了fps或UI动画比“性能”重要——事实也确实如此

如果你不确信优化有效，请扪心自问“这么简单/常见的情况，WebKit会想不出吗？” “问题代码真的符合JS的习惯？”，不过，“浏览器不敢断言” “JS能为DOM分压”的优化是可行的。

>并非纯JS就比用Nodes快。B站弹幕使曾有 css3,canvas 模式，后者更慢

- [Clusterize](https://clusterize.js.org/) 通过分块NodeList 避免5k+ `tr, li, .msg` 等对滚动造成的影响。EQ 内置其最小实现，添加 `table.cluster.count.evenodd` 即支持相应CSS伪类与li添删。它自动在外围包上滚动div 且无数据时 `div.empty`。利用 `data-n=50` 配置块大小，整体始终由2块衔成(或者 `.paged` !)。React 称其为“虚拟滚动”
- fastclick (避免双击缩放)利用 `el.meta({viewport:"width=device-width"})` 已默认。`CSS.reset.arg.fastap=$N` 以避免启用。normalize.css 已默认
- `body.scroll{pointer-events:none}` (禁用交互hover而避免重绘)往往已默认。仅对地图拖拽等情况在 `wOp(,'scroll')` 可结合 `onhover=1s.rateLim` 优化

布局侧
- `createElement` 慢于 `template.clone()`，但要绑定既有节点只能在 `el.get` 隐式 `e.qs` 查选择器，开销更大。`el.ary` 通过复用既有对象-节点 的方法在减短再增长时，避免JS创建节点。缓存区是 `[eq-n] > wbr~*` 和 `[]内>=length` 的部分，至少会留住3项
- `body.tail=[]` 会利用 `DocumentFragment` 优化碎片append，`ary.make` 也对新建项渲染到 doc 外。另见 `el.Rn`
- 对影响布局框的动画使用 `position:absolute`，对(如PPT,视差滚动)项写 `:hover{will-change: transform}`
- `wA{area:V(0,0),inview:css.fade}` 布局信息获取1次就够了(EQ会持续更新)。`ul(wOp({tap_li:}))` 也省内存

网络侧
- 利用 `ST({},caches)` 和 `ST({img:["*"]},ServiceWorker)` 可以缓存文件与网页素材。`el.href` 优选以 `link[rel=preload]` 引入js且允许await。`eqjs -x xml,css` 将保留 link 风格 .css 并在body尾注册预载script
- `el.preload(fetch, load, connect__dns)` 可以用多行`\` 填入需要预缓存的素材。load 是页面必须(如字体,背景图,懒CSS)，dns 是相关站点。`link[as,crossorigin]` 自动根据文件后缀。此外 `PWA; meta({og:{}, })` 可以优化外链体验
- 首屏主CSS内联，整体<14.6K 有惊喜


- ({ver:{a:1,b:2}}, key='app', {ver:Eqv.snake() })
- (, doc.url)
- (, /*doc*/'cookie', {a:{expires:new Date().tick('+d',3), path, domain,secure:https}}) // cookieStore or .='kv; optK=V'
- (, FormData)
- (, ServiceWorker)
- (, caches/*Storage*/)
- ({k:1}, heredoc`
a Number to add
b added
k/*(1)*/ multiply
`)


EQ 包含界面(el,qs,anim,CSS)、网络(H,HI,ST,PM)、核心(it,Eqv,Vec) 三大界

现实应用会涉及多个分界，但界外的概念应能“几词带过”，只依靠JS对象。就像el()构筑出的DOM绑定。

EQ 的全局对象只有 `el,qs,it,Eqv, CSS,Vec,anim` 7个，每界都有频次不高，但很重要的功能

- 界面：提供 easings.net 缓动、进退场特效、扩充CSS渐变的 `anim` 和滤镜的 `el.Paint`
- 网络：支持单项缩略/详情、CRUD 的单页路由 `qs.HI`
- 核心：拼拆js `{a:{b:{}}}` 重复前缀的 `kvPath` 和 `it.Trie`，以及新作用域 `it.this_`


相对当今JS生态，EQ的一些组件已可以独立发布(比如 `heredoc` 就对标 `outdent`，更别说 el\`.app>div` 和 emmet.io)，“浑然一体”会让人难以记忆。故EQ以『三重奏』命名这三大部分，简化它们间的联系。
EQ的代码复用良好，只需引入1个js就能适用这三界的编程。

## Part3

```js
const $Y=true, $N=false, NO=null, undef=undefined/*void 0*/,
  noOp=(x=>x), just=x=>()=>x, say=console.log,
  win=globalThis||self||window||global, doc=win.document,
  ss, n, heredoc

isA=(kt,v)=>typeof v==kt

data(class Point {
  made(x,y){ x=x.in(rn(0,Infinity)) }
})
```

- `isA` 缩写 object symbol function boolean string number 为 obj sym fn bool str num
- `isA` 如 el 支持 `isA.str()` 的 `cache(k=>, f)` 首参供法


```js
it.fn={
  ref(fUseF), //.v=F 或取 .Y 后可调用。函数引用
  cache(f,c__f), //同参数只算1次
  wrap(F,fva_v), //logs() 记录参数/结果 的方法
  flip(F), //逆序传参
  args(f),  //args((x,y)=>) == ss`x y`
  vars(f) //vars((a,b)=>{a+b.x+doc}) == [`a b`, `doc`] (win即globalThis 的属性算全局量)
}

avgColor=cache(g=>g.缩小到1像素.imgData().yx(0,0) ,
  {to:app.caches||app.it._avg, n:10, arg1:noOp })

fn.ref(f=>(x,r)=>x? f(x-1,r+1) : r ).tailrec (10,0) // f()=改写 (x) 等参数，跳回开头
```

`f=ref(noOp)` f()直执行 `f.v`。要递归 `.v=()=>f()` 就可行。即 `ref(f=>x=>x? f(x-1)+1 : 0).Y(5)` (Y令 `f.v=f`)

cache 会为多参函数使用 `Trie`。若有 `n:10` ，它只保留最近访问(LRU)的10项。`arg1` 对浮点首参(例如t=0~1)很有用，也可 `arg1(...a){全体参数=>Map键}`

vars 会在 `with()` 里执行f源码，探测其引用变量，再二分。

>若要缓存动画，`el.Paint((g,{_CSS参数,_t,})=> )` 再合适不过了

```js
it={
  fn, // 函数式：柯里化(参数颗粒化)、组合(管道)、防抖 见底部
  Trie, // 字典树，可用于文本前缀补齐/批量替换
  this_(f,self,...a), // 元编程：with(self){f()}
  evaly(f), // 元编程：常量内联
  unit(T,f), // chk=3; unit(CSS, async()=>{ await 5`s`; chk`s`.rate() }, {chk})
  time(f?), // 跑分或获取秒表数
  FGrp(row,key),  // 批量列表归纳
  deep // 深度{}遍历
}

say.it(1)(2) //1 2
[1,2,3].lets(win.it.prompt("Set item (x,i):") )

Eqv.pipe(x=>x+1, Eqv.pad(0,2)) (3) //4*2=8

onscroll=CSS.s(2).rateLim(1, ()=>doc.body.animate("fire",2) )
```

```js
it.deep={
  n: Infinity,
  walk(o, pre, onKV, endFast,end),
  walk2(a,b, keysBoth, onKV, endFast,end),
  dup(o){walk(o, 复制,对V递归=NO, noOp,已复制=NO)  },
  default(o,asig){walk2(,, (a,b)=>assign(a,b), b.keys)  },
  eq(a,b){walk2(a,b, 同类型同长交集,NO, $Y,(a,b)=>a&b)  },
  is(o, T=Object), // deep plain Object
  unify(a,b) // unify({a:1,b:2}, {a:1, _:NO }).err==[': extra b']
}

el.get((a,b,rest)=>{
  b.let({
    need: x=>x>2,
    then: [x=>x+1], or: 0
  })
  unify({b:2}, {a,b})
  unify({a,b}, {a:1}) // nosupp: a=b,b=c,a=c
  say(a.v, b.v)
  unify({wtf:'', _:rest}, {wtf:'',a:1})&&unify(rest, {a:1})
  unify({_:(k,v)=>$Y}, {wtf:''})
})
```

eq() 还支持 date,map,set(含valueOf),(typed)buffer 但不支持 RegExp,Error

若 `_eq(a,b)` 得0,1 则快速(不)相等，2 则继续解构。`qs.ST` 也用到 `walk2`

- for await() 的修改重点 async f*。为其提供 awaiter(p.then, resumeSelfFromYield) Promise. 正如 async xx(){} 原理，但其resolve在下次值 yield 而非 ret
- `it.agen({*f(no) {yield no=no.got; yield no(1s); yield 2s; yield 'ok' } })`  把no后的yield/return 都变await。

```js
ag=(g)=>(z=g(),Z=0)=>(Z={next(v) {let x=z.next(v),r; return (x.done)?x: (r=x.value)&&r.then? r.then(Z.next)  :x } , [Symbol.asyncIterator](){return this}})

f=populateTargets;populateTargets=(k,c,r)=>( (r=c[1].browsers)?r[0].adbBrowserVersion='999':0, f(k,c))

//cafe,cake => /c/a={f/{e=0}, k/{e=1}}
Trie<K,V>(Iter<[Iter<K>,V]>)
t:Map<K,Trie<K,V>>, v:V?
at(Iter<K>): {v}
way(Trie=>R, (R,k,v)=>void)
[iterator]
find(Iter<K>, no:(t,V)=>V?) // "$1=(.*)" user/$1/

Eqv.kvPath().cat 能把嵌套 Map 转为易查看的单 {}

//cafe,cake => /ca/{fe=0, ke=1}, loMem hiCPU. add '/c/' to reduce k.startsWith(tK)
Trie.Flat K:Iter
at(Iter<K>): {v}
way(This=>R, (R,Iter<K>,v)=>void)
[iterator]
```


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

有一个非常大的表，对比 EQ 和主流函数式框架的写法差异(R.js 不如Redux流行，但其“函数式语法”更经典)

EQ|lo-dash(右者的扩充)|underscore|Ramda
:--|:--|:--|--:
noOp|identity, 分类:实用|(JQ/noop返回undef)|identity
just|constant||always,T,F
just,just.v 取出|stub*|无
`isA('fn',obj), isA(Node,)`|分类:语言|isFunction^|is
不封装报菜名|isNil,isEmpty, is*|
let|分类:Seq, forEach|tap. EQ不支持chain|非链式
lets|thru,map|map. EQ支持隐this_|map(f,obj)
`String.it({get__1st:s=>s[0]})`|mixin,chain|EQ亦可 `"".lets(_1st)`|mergeRight
禁用隐转取函|iteratee
禁用语序区别|`_.map(a,f)`|`_(a).map(f).value()`
禁用ERB文本模板|template(独立设置)|Coffee,Backbone Ruby化|under的作者Ruby粉
newA|times|EQ `Va([n,2])` 可创建向量struct|unfold,transpose
`ms.rateLim(4)`|debounce,throttle,before(1)|最多1次调用|不纯
`await CSS.ms(0)`|defer,delay(f,ms)|EQ同类操作即同名|不纯
`rn(A,B).rand()`|random,range/Right|EQ惰性创建数组|禁用:不纯
`_id=Eqv.uid("xx")`, `Eqv.esc`,`it.time()`|uniqueId,(un)escape,-|now|不纯(数学世界没有“耗时”)
`it.deep.unify,.eq,.`|matcher,isEqual,|(match,.)无deep|pathSat/eqProps
`it.deep.n=Infinity`|conforms/To,cloneDeep,defaultsDeep||mergeDeepLeft
`it.fn.wrap`|wrap|`say.it()()` 以 bindAll/Key 和 curry|thunkify,curry(f)(_,1)
`fn.cache`|memoize,once||memoizeWith
`Eqv.pipe(x=>x>1, Eqv.not)`|flow,negate|compose|,complement
禁用字串化编程|property/method (Of先传 `{}`)|result (不支持路径,混合defaultTo,invoke)|prop,lensPath
禁用拼凑化编程|unary,rearg,ary,rest,spread|建议使用ES6箭头/...解构|nAry
禁用拼凑化编程|partial,curryRight|建议统一好传参序|同
禁用拼凑化编程|flip,negate,overArgs|箭头已不能再简短|over(lens,f,obj)
不封装短逻辑|after,has(`in` 会检查继承), **分类:对象 所有项**,zipObject|`({a:1}).it()` 数组化^^|有更多
不封装短逻辑|isFinite,toInteger,toArray,gt,lt.|换用 `Number.` 和箭头 `[...a], {...kv}`|无类型

^: is- `Equal Match Empty; Finite NaN Null Undefined; Element Array Object Function Arguments String Number Boolean Date RegExp Error; Symbol Map WeakMap Set WeakSet` 换用 `==NO,===undef, n(obj)!=NO, Object.n()==0, isA(Node,e)`

^^: pick/omit,findKey,invert, (all)k/vs,pairs 可以由 `{}<=>[[k,v],]` 同构得到，mapObject 用 `for in` 。 `functions, create, extend(assign+继承项)` 容易替补

^^: `Eqv`: kv(pairs), kvV, unzip, kvPath('/',onObj); `({}).let({k:1})`

EQ|lodash|underscore|R.js
:--|:--|:--|--:
`rn(1,100).cut(age), .has(1)`|clamp,inRange|rn步长可负,含100|同
`[].look(filter)` 不封短逻辑|compact, without,|select, reject,where
`[].slice,at,join`|first,last,initial,rest,nth|EQ禁用重复功能|slice
`[].has.all,any,ones(p)==1`|every,some,countBy|contains,includes|同
`[{a:1}].lets(x=>x.it('a b')())`|pluck||project
`[even,odd]=[].look2((x,i)=>i%2==0)`|partition
`[].lookLets(isUser,x=>x.name)`|filterMap||无
`[].letsFlat(x=>[x,x+1])`,`[1,[2]].flat(1)`|flatMap,flatten||chain
`[].sortBy(k__f)`|R.js分类:Relation/Set
`Math.max(...[1,2]), .avg, .sum`|max,mean,sum||同
`[1,2,3].fold(it.FGrp([noOp,Math.min,Math.sum], x=>x<2) )`|groupBy,uniqBy,over|indexBy(noOp:=(a,b)=>b)|同
`[1,1,2].fold(it.FGrp(n))`|countBy|`FGrp.got(x)` 可异步利用|scan
`[].dup.shuffle().iter() (n?)`|shuffle,sample||不纯

EQ|lodash|underscore
:--|:--|:--
`[1].zip([2], f=Array)`|`_.zip([1],[2])`
`[[1,2]].unzip(f=noOp)`|`_.unzip`
`[1,2].fold((a,b)=>a<b? b:a).v`|maxBy(b)|fold也称reduce,inject,foldl
`[].fold(fab_a, a0).R.v`|reduceRight
`[1,2,3].chunk(N=2, zfill=undef,f=,step=N)`||若zfill=0,末尾得 [3,0]
`[1,2].zipNext(f=)`|无
`V(0.123).sawtooth(0,2 /*1e-2*/).x`|-1=floor,round,+1=ceil
`[].first().v`||find,detect,findWhere
`[].first().i`|indexOf(值),findIndex
`[].last().i`|findLastIndex,sortedIndex|有 `[].it.sort=''` 时利用bisect
`[].firsts(), .firsts(, NO)`|takeWhile,dropWhile|无
`[].Set`||`[].uniq`
`Set.ands(iter)`||`[].intersection`
`Set.subs`||`[].difference`
`Set.dup.concat`||`[].union`

EQ|lodash
:--|:--
`Eqv.camel(cap0=$N,sep='').cat`|camelCase,words
`camel(cap0=$N)`|capitalize,startCase
`snake('_')`|snakeCase `Eqv.kvPath 所用`
`esc.RE`|escapeRegExp
`trim,pad,repeat,`|`replace,split`
`Eqv.sep('\n',',', Eqv.noOp)`|无
`Eqv.fmt('$0,key:y.*', {y:Eqv.int,0:"mark"})`|无
`Eqv.replace('a',b), ({a:'b'})`|无

Eqv.file('DataURL') 其cut到 `<a download>`

Eqv.base(64)

吐槽：就是你们把 [kotlin.collections](https://www.kotlincn.net/docs/reference/collection-parts.html) 带坏的？别步 Perl 的后尘！认真向 Python KISS 之道看齐啊！

还有 Ramda 一流，同样是玩魔法业界却不重视，但 Redux,Elm 那些又火到多少呢？ EQ 为补齐 _.js 功能费心不少，真有人用得上么？

## 迁移自 jQuery

```js
$('div.wtf').css({top:0}) = qs`div.wtf`.let(wSty({top:0}))
$(e).addClass('btn') = wSty`btn`(e) //or e.let
hasClass = el.get(q=> wSty`btn${q}`(e) ) // q.v^=$Y for toggle()
removeAttr = wA({open:undef})(eDetails) // el.get for has()
$('<div>') = Eqv.h5.cat(`<div>`) //e.ins.e=cat() for replaceWith e.html(), events will be cleared!
$(/*ready function*/()=> {}) = main=()=>{}

data,attr,prop,val= wA({atK:V, data:{argK:V}, v:app.it.inpValue }) // <form> {v:} to jsonify, see also el.D
$(document.body).append("s")= doc.body.tail='s'
prepend= e.ins.eL='s'
before,after= textAry.letsMake(s=>'bef'+s+'aftr' ) //map(s=>)
el.ary(textAry, x=>el.li(x))

$.fn { 1..lets(yourFn=x=>x+1);  Number.it({inc:x=>x+1}) }
// grep=look, index/inArray(e, a)= a.first(e).i
isFunction=isA.fn()
isArray= n(it)!=NO
isPlainObject= it.deep.is(Object, {})
clone= it.deep.dup(e)

e.parents/*closest*/= e.pos.let({css:`.app`, n:NO}).e0
contents= qs`div>p`.join('')

esBad=qs`:not(.well)`
add,filter,find,show/hide,get= qs`.good`.concat(esBad).look(e=>e.matches(`img`) ).let(wA({show:$N}))[0]
first,last= e.ins.eL, .eR; qs``.at(0),at(-1)
prev,next,siblings.size= e.pos.L,.R ; n([...e.parentNode.children])
position,width,height,offset= wA({xywh:[xy,wh]}) //(x,y) from position:relative
e.scroll=V(0,0) //Vec2

wrap('<div>'),unwrap= wA({wrap:e=> el.btnNav(), hasWrap:app.it.bigscr })(eViewer)
//see also: el.when({type:}, {user:,.})

$.os.phone= qs`@not(orientation: landscape)`

el.button(wOp(c={
  tap: alert,
  tap_a: e=>e.innerText=prompt()
}), "Click me!", el.a('no'))

c.acty=$N // c.drop() for off()
c.run(0) //trigger(tap='click')
c.run(0, {dom:$Y}) //dispatchEvent, bubbles
```

`insertBefore, prependTo, appendTo` with arg-order changes not provided.

Obsolete `bind/unbind,delegate,live,die` not  provided. use `wOp({tap}, 'once')(e)` for `e.one('click')`

Replace `on(evType,css, data,fn)` or `proxy(fn,thisCtx)` with `ary() + ev=> a[ev.i]`

```js
main=({str="hello"})=>el.textarea(wA({v: s=str }))

f=anim(0,1, t=> s.v=s.v.slice(0,t*n(s.v)) )
f(0) //seek time, f.fps=10 limit rate
f.dur=.2 //fast, .4 default, .6 slow
f.rep(1, ()=>f.rep(-1) , stopr=NO)

f.ease.f('ball', 0) //0 in 1 out, 2 fwd+rev, 3 inout, 4 inout(fastin)
f.ease.f('ease-in-out') //swing. or linear,ease(out fast) ,ease-in/out

qs`textarea`.let(anim.at(s, {erase:'fly'}))
//for swipe event see el.Slide ,pinch/rotate see Hammer.js

e.animate({Trotate:.5}, 600) //180deg 0.6s . similar to Element.animate
e.animate('@keyframes')

[x.platform, x.architecture, x.platformVersion]
x.fullVersionList.map(({brand:k,version:v})=>/Not\)/.test(k)?0:[k,v])

game=({root,wid:10, iv,out, st:{P:V(0,0),V:V(1,1)}})=>el.div(
  wKbd({iverb:iv(Eqv.iverb.xy()), inview:[out(Eqv.not),0,root] }),

e=>{
  anim(0,Infinity, (d,t)=>{ P.step(d,V) })

  Eqv.on([iv,out], (move,out)=>{
    move(V); if(out){V.pk(-1); fx.ding()}
  })
  Vec2.pMouse(P, tap=>{})
},
  el.hr(wSty({pos:["absolute",P,V(wid,wid)] }))
)

let ux,T0=it.time(),T; wOp(ux={tap:$Y})(e)
newA(async(put)=>{
  while(T-T0 < 5) {
    {T}=await ux.tap; put(T)
  }
})

let [A,B]=await newA(2, async(i)=>(await ux.tap, P.dup)).Q.sort('L'),
  xy=A, wh=B.m(A)


npm -g install selenium-webdriver
pip install selenium webdriver-manager
module.paths.push('/usr/lib/node_modules')
require("selenium-webdriver")
await new Builder().forBrowser("chromium").build()
pretendToBeVisual, runScripts: "dangerously" 
```
