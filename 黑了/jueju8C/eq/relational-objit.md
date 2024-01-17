
# 关系式响应性

EQ最独特的功能是配合ES6解构工作的 `{ref:0}.it` 面板，即 __组件=KV里可变的键=>组合出HTML形式__

键被赋值，就等于向视图赋值； `div({vars})(视图挂载点)`，就等于向键赋值且+监听，_组件()==挂载函数_

“箭头变量” 直观化了状态管理，避免设计师读写AI更擅长的样板代码；但，如果你要长期使用某个框架，想理解它如何工作也是理所当然。

下面，我们说说wOSK“可变量作为值”的底层逻辑。

>Vue3 使用了 Excel 公式的例子，来证明“事件”的广泛性

JS `let C=A+B` 不支持在A变更时重算(如 print)，你必须“监听” on_setA：那会涉及到很多常量名字、创建销毁、代码复用的难题

EQ用类似SQL的 __单/双关系变量__ 思想(但简洁得多)，也添加了 __Eq同构性__，减少框架内外的赋值函数 “面条代码”

```js
let app={A0:1,A1:2}, //ee.main 也帮你建这个

{A0,A1, A2}=app.it

Eq.$({A0,A1}, 
  _=> app.A2=A0+A1) //一般直接 A2=(Eq.$)

A2(x=> say(x))
A2(x=> doc.body.innerHTML=`求和= ${x}`)

A0.v++; A1.v--
```

注意，`html(innerHTMLvar,{filters})` 是EQ唯一要解析尖括号的，富文本组件

这些脚本看起来是一起执行了2遍，即便彼此联系松散。这正是面向事件的实质。 加上同构就叫EQ：

```js
A_p1=A0.as(Eq.num(+1)) //因为 num=d=>Eq(x=>x+d, y=>y-d)
A_p1.v=3 //那么 A0=2

Eq.$(1, x=>x) //无返回, 类似多次版 Promise.resolve

也可&&( Eq.$([A1], ([x])=>x ),
  Eq.sep(','), N2(x,y)(Nd(P=>(P.x+1) )) //切分多变量返回
)
Eq.open(/.txt/, fp=>
  fp.oncat('noWS_', s=>s.replace(/\w+/g,'')) )() // Eq也被用于另存为
```

ee.组件=`({A0=1})=>` 只是在ee域用eval()帮你赋值个默认参数、设置下原型链。 直用it的观感不及Vue

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // 追踪和监听 A0 和 A1
  A2.value = A0.value + A1.value
})

A0.value = 2
```

为了与热度爆炸的新JS界兼容，有几个术语。

- `A1(x=>)` __选中sel__，在事件触发时“赋值”，就像 `Makefile` 规则
- `A1.as(x=>)` __拆分fork__, 派生量，比箭头要晚，即 `A1.onvar.push()`
- `A0`, `A1` 是事件的“箭头”指向的 __按键变量keyvar__, 键量、信号signal、订阅者subscriber的依赖dependency 
- `A2.v=A0+A1` 是箭头函数的 __副作用operation__，因为忽视其返回值，函数仍生效：XML里是没有这种节点

尽管 `[1].as(x=>x+1), users.to(_=>age=8)` as&to 也叫映射和赋值，在ee里，你仍可使用不同的术语；不过说真的，用简洁明确的术语最酷了

此外，`div( p(wOp{}), text)` 本质也是在“选中”div里的变量-只不过它们是有“标签名和下级”的键量。你注意到了吗？ 这就是关系式编程范式，是让EQ“多而不乱”的强力后盾。 

## it的类型

>__EQ 并没有设计响应性系统，而是去除了ES6解构对变量关系式数据的阉割__

请回头看看 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)`(obj,'k', _rwx_属性)`

-- `obj.it({k: Eq((v,_)=>setOther)},'wx')` 是EQ提供的封装。wx这种情况相当于 `obj.k=wtf`

旗|位置含义|术语
:--|:--|:--
r|配置对象|readonly, !writable, frozen
w|传输对象|enumerable
x|尚未seal|dynamic keys, configurable, extensions

历史上，JS等编程语言的设计也是会失误的。可以说 `__proto__:原型链` 只是复用键值(而 `obj=new T` 只是晚赋值proto)，无法区别 'T' 成员和 'obj' 数据键的可传输,可监听性 (JS setter 不一定加在类级,和多数语言不同)

--导致从 own property 到 `Obj.keys().forEach` 的一揽子“最佳实践”，最终却还原了 Python `dir(wtf), __dict__` 的[行为](https://docs.python.org/3/library/functions.html#dir) 。接着 `{set k(){}}` 又无视了程序员需复用“监听”这样的读写器，或者是需要“扩充属性”

你在F12里看到 `__define*__` 这类成员就是对 `obj.k` 做监听，这也是EQ的最核心。尽管，`[{}]` 的 diff 只会在 `it.ary.to(assign)` 变量树上执行，而任何数据被拿it后会标记 [Object.seal](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)(tuple)

### 回到现代

尽管我们想了解EQ如何工作，JS 里那类 `.1+.2!=.3, 'b'+'a'+ + 'a'+'a'=="baNaNa"` 的把戏也不在考虑范围内，不然直接拿“原生”JS写软件好了。

当你想出“酷而脏” “高性能但未跑分”的点子时，请回忆下上篇JS `Object, void 0, undefined..` 类型树的设计——如果比你聪明的人也会把事情搞砸，或许，人生苦短，你就会放下做这些过度设计的表现欲了。

[Object#it] 是懒创建 getter/setter 覆盖的面板，它不会为兼容IE添加任何代码

`shallowRef(xy=[v])` 可以直接对应到 `xy.it` ，因为EQ版本的“DOM”(无论虚拟与否) diff 时， [ArrayIt#to] 等列表处理要进行求增删和深赋值

毕竟 [{}] 里所有的'key=' 和 [].ondiff 已绑定到它们的Node，而不再比对和缓存树的“复用”

细粒度 `render(组件函数)` 可以直接在 DevTools 里观测HTML(数据)的变更。靠 `A0(x=> dd=$Y)` 依然能给问题事件下断点

```js
when(class{
  main(A,B){A=rn,B=rn}
})
ee.main=({A,B, it})=> // 解析形参的特性： (1)...非单参 (2)加局部量 (3)_=()=>尾逻辑
p(A(),B(), Eq.$({A,B},_=> A+B ))


//EQ和Prolog加法类似，但可以写出 add(A,B)=>C ，甚至是 A+B=C 这种 “往let=右侧解构的模式”
Nd({},_=> (1+2) ) // 1['+'](2)
//你可以尝试复用设计 +,= 的函数。提示: a=>b=>a'+'b 柯里化是有实用价值的
```

>为实现 `html"scanf",when,bodys.live` 挂载需有3种模式：例如对 `div(p(),p()) (doc.body)`

EQ|添加段|解构|匹配
:--|:--|:--|:--
`div(..es)(e0)`|div挂到e0,es挂到自己|`(e0=childNodes)[.i++]` 到自己,递归下降!|qs()到自己,bind自己的qs给es
`html(..es)(e0)`|`es.to(e=>e(e0))` 添加|1e 吃掉e0内 1项|e用qs找到首次匹配

ee只对 `f=wOSK(), f.length!=0` 的三要素绑定提供 节点自身,以及..

`body/s(e0,({})=>)` 靠匹配，as节点按位置调“解构”。when也按位置:

文/段绑定|添加|解构|匹配
:--|:--|:--|:--
'x'|向右append|.i++ 跳过|(不验证)
it.x|添,绑定replace|`x.v=项`; when被match()测试|(子级qs不到时catch) (无序解构,要标记$)

“分支”节点按道理只能是as列表位的项。但组合(...)=>函数，据类型做挂载，自动支持靠qs

__diff和efx，则按以下流程完成__

1. `objOrAry.it.to(新状态)` 比如被fetch,filter 后。递归下降直到it树被合一。
2. `it.ondiff([-1删除, {新对象}, 旧索引])` 被合一到NodeList，所有旧视图的xy被记录。as可能会调用 `删增.map(onEfx)` 来调整CSS属性(_dt时延,.)
3. 用[FLIP](https://aerotwist.com/blog/flip-your-animations/)算法，把已移动节点按 `translate:` 调回原位，新增的透明掉。返回给CSS主循环1下
4. 让所有 `efx(add)` 变量播放进退场，同时渐变 `translate=''`。add会在退场后删除节点

## 不可变和状态机

[is.ST] 支持undo路径，但如果你想接入 [Immer](https://immerjs.github.io/immer/patches#producewithpatches) 以优化diff算法， `st0(x=> produce(x, updater))` 就能缓存差异：如同更新 `a.to(a=>[...a].reverse())`

`await A0` 会等待onvar(_未必有变更_) 或者说 `A0()`，最初是为了方便 `1..s.rate(evVar)` 监听和SSR表单。当然，箭头变量 现已指导了EQ框架的整体

`wOp({tap: A0})(doc)` 或 `$doStop(wOp(super={tap:1}))` 都可以直接触发，或等待事件冒泡

除了语法和心智模型的极大简化，EQ和Redux,Vuex 这类框架差异不大。

## 为啥要编译

只基于JS属性的UI "Signal"框架 [Knockout](https://knockoutjs.com/documentation/observableArrays.html)，早在2010就颇具人气(10k)，[Svelte, S.js](https://github.com/adamhaile/S) 和 [轻过 Preact 的 van](https://github.com/vanjs-org/van#why-vanjs) 也有2k

它们都在某些方向上，选择了EQ的DSL和响应式方案，以至于“生产力大爆炸”，但没有足够全面、自然的API，以至于选择了离根源问题很远、效益很低的奇技淫巧。

>与上文“箭头函数”南辕北辙的魔法函数是指：靠 `f=()=>A0()+1` 的执行，把f挂到A0的监听里

对于 Vue reactive() 而言，只需要让 signal() 取值时 `WeakMap[sig]+=activeEffect` 就够了

Vue因为[重视代码明确性](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028)，避免了 Svelte 式的，在编译期 __把$: 局部量扩写为 ref()__

EQ虽有意避免了对编译宏的滥用，不过，我们也改了JS的作用域语法：
`"a ".as(_=>trim()),  Str.it({cap(_) {}})` 是被常量求值优化的

### 题外话

__闭包f__ 难以兼容“引用检测魔法”：evalFun 需重复添全局域键值

因此，EQ主要对div()等纯函数利用隐式this

而能转为js代码的函数f，可以正则匹配，极大避免了工具链的冗余；或者acron遍历ESTree

`with(new Proxy(window,{get:(_,k)=>_[k]|| k.substr?"var"+k : {}, has:()=>true })){ a+b }`

>! with(){} 域高于任何上层的{}(包括'脚本即函数'的vars)，但在 f() 闭包里'a'早已绑在全局this，只能靠catch修补RefError(stack=[file:i:j,])

>! eval,with 在CSP沙箱(e.g. `env.UA.webext=='chrome'`) 里是禁止的。预编译能 fix CSP

## 兴趣阅读

- [js.info](https://zh.javascript.info/destructuring-assignment#zhi-neng-han-shu-can-shu), 解构赋值
- [springleo's blog](https://lq782655835.github.io/blogs/js/es6-2.destruction.html), 原理:关于迭代器
- [MiniKanren](https://tomstu.art/hello-declarative-world#building-a-relational-language), Prolog 怎么靠DFS“解释” x+y=9
- ee.模板 也是关系式的，只是它靠数据驱动，没有 `cond,x=1 | x=2` 的整合(unification)对象后的“解集流”
- 关系式也是 形式化验证(静态检查参返assert)的前身，不过交给AI生成甚至直接推导更好吧？
- py `from ast import parse as cat, unparse as cut, NodeTransformer as Vis,dump; cut(cat('1+1'))`