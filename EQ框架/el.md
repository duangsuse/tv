# El 简写函数

`el(doc.body, el("div", wAll.a("nth",0), el("p","Hello (0+1)st") ))`

此函数允许你用树形语法在 JS 内表达 DOM ，即 HTML。不需要 JSX,E4X 等蹩脚的内联XML ，也不需要 JQ 式链式设置或拼接 HTML 字符串。

形式为 `el(tag, ...fn, ...ee)` ，fn 的第一项可以是 `el.okChain(wAll().cls("txt").text("Happy") , e0)` 并设链，自动调用 `.done()` 方法化为多属性设置函数；函数部分结束后元素部分被 `e0.append(e)` 。

tag 可以是标签名或既存标签，此外支持在 el 上自定义已配置标签。如 `el.p("Cat:", el.img("meow","m.png"), el.label("Yes!", el.rng(0,10), el.btn("rank") )) `

如 `el.段="p"; el.img="$alt:$src"; el.btn=wA().cPre("mdui-").c("btn").ee("inn text")` 及多参 `el.what=(a,b)=>el.div(Number(a), ":"+b)`

el._frag, el.opts, ulOpto

href, title("", desc, kw)

`<pre emet>` 可以内联要 emet 的信息

```js
<script src="//equery.js.org/main.js" use="eeach" href=".js .css">
doc.tail="Hello EQ!"
</script>
```

可以外提/内联代码

ask,askYN, say, askFeature

ord,dfs,eqv,experm,scra,norm,玩 .js

## wAll 支持的配置

- `a(k,v?)` 属性, `ee(...tag)` 初始子项目
- `cls(k,k_new?)`, `sty(k,v, ...)` CSS类与属性，支持自动 `px` 等单位与 `bg=background` 等缩写
- `op.click(ev=>).hover(ev=>).ok` 监听器子设置，只在 `wAll()` 实例上可用；`done()` 后可通过 `listen=["click",f1, "hover", f2]` 访问及 `listen.use=0`; `opee` 用于子元素的冒泡事件
- `save()`,`dup`,`done()`; `cPre("prefix-")`,`ns("svg")` 把当前设置移动到二列合并容器的「基项」部分、复制、合并出设置函数

通过切分 wAll 实例的基础/叠加配置项，在JS内实现类似 CSS 的层叠设置，或者利用 `dup` 继承配置集

## EQ 查询

`$("",e0)`, `$.body_div$id$cls1$cls2` CSS查询, `$.old` 返回JQ

它支持 `parXY, pageXY, viewXY,viewWH` 和 `viewArea s?` 对 `getClientRect` 的封装；和 wAll 共用 a,cls 等配置方法，此外支持 text,html 设置

`parent, child` 上都支持 `[i], (css), .a`; `tail` 用于设置 append 元素(集)；`child` 支持 `html fst last relist(es)`

`$(ev)` 的 parent,xy 基本可用； `$.atXY, $.atsXY` 是 `doc.elementFromPoint` 缩写，`$.path(xpath); $.wait(css,f_each?)` , `each`

`.sel` 可获得 Selection 封装、`popK` 删除一个属性值， `.clear();drop(); runEv("click",{})` 删除元素/触发事件， [el.ins], `wrapBy` 在前后内外插入

matches

```js
(wOp.flags={
  once:"once",
  revBubble:["capture",$N],//add both bubble
  bubble:[ev=>ev.stopPropagation(), ev=>assert(ev.bubbles)],
  default:[ev=>ev.preventDefault(),"passive"],
  stopNow:[ev=>ev.stopImmediatePropagation(), ev=>assert(!ev.cancelBubble)],
}).also(p=>p.stop=p.bubble) // default -sign

qs.mkcss(cls("wtf",wSty(), "inherd"))
pfixs webkit- moz- ms- o-
svgBg
```

## 核心

doc,con,win,navi:copy,viberate

Infty,undef,NO,$Y,$N

n,ss,newA,div,isa,elv,execRE,defCtor,fthis,just,noOp,operator

lets,also

once local/session,onRetCall,withTmp,objPuts

Promise.delayCall

mkindexOf,zip,mapWhile,rng/0/PN,next,cycle,chunk,eachNext

split2D,splitCond,psufIfNone,replace/*re*/,replaceAll,casePSuf,psuf

rand/pick/fill, limitIn, copy,eq

time Once/Rate/Now/UseStamp

evPair,dragMove

XHR URLSearchParams,header

## Emet CSS 片段元素生成

与 Emmet.io 不同， EQuery 主旨在于少代码量实现必要缩写；它不太支持括号或者 `^` 以及隐式标签名，还有 `*N` 计数重复，但它支持完整的 ES6 字符串内联——子标签(集)、each数据

按优先级低到高：

- `div, p`
- `div p span` 或 `div>p>span`
- `b[t=$a]+i[t=$b+1]:"a,b=zip(abc, _012)"`
- `span+span`
- `b.bold#txt[t="some text"]` 是同级、顺序与个数随意的

解析方式是正则切分+优先级重组，利用 `$变量` 规避了双引字符串内容的冲突；你内联的变量值也会被化为编号引用，以避免错误解析

`emet_(e,c=["str literal","your ${}"], css_1)` 只能设置单项

`emetP(s)` 将 `div span.a[no=i]:i=1 2, div, ${el.btn()}` 解析为 `, (" " div (: span.a[no=$2] 2 $0) ) div $1`, `["1 2", <btn elem>,]` ；它暴露了 CSS 选择器的常用功能

没错。emet 支持嵌套的 `:x=1,2 :x=a,b` 而它们都被存储在全局数组里

大量的模板创建请用 [eeach](eeach.md) 模板，emet 的变量设置适用于1~20项元素，快速界面结构、等等

## 实现笔记

el 过去有种思想是符号化 DOM 特质，比如 `[a,b,c]=el.sym("#id .cls [attr=v]")` ，然后 `a()!=NO , b(doc.body), c(e)` 就可以执行选择器/classList/`wAll.a` 等设置项的功能

这项同时与 el,emet 的功能冲突，尽管比较巧妙、是CSS选择器的一种暴露法，它对网页设计者整体观要求很大，而且混杂度高，最后没有加入

本来设计利用 `emetRun(emetP(code,consts)) (1,"first")` 可以重填变量多次执行，其实意义不大。

`emetP` 的拆分是为了方便实现 CSS 选择器，它接受的是 `arg=el.strvar(code_parts,join_consts)` 的结果，向内分配常量和for变量编号，利用 `new Map` 实现嵌套作用域，返回算符栈，通过 `arg[0..]` 的重写能替换参数

```js
wAll().cPre("mdui-")
.cls("btn shadow")
.done().ok.cPre("bs-").
 cls("col-xs")
```

里 ok 把既有项添加回二分容器，允许修改配置是无必要的，save 会保留 cPre 等属性
