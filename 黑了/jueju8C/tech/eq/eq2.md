# EQ三重奏

## 1.DOM/CSS/`el.get`/`Vec anim`
- <code>el(tag,...配置及子项); el.div(...); el\`#wtf.btn{txt}`</code>
- 数据 `wA({绑定,v,edit,show,data:{}},...花括或配置)` *el(...只绑定|爬取连续#text); `e.tail=[]` 仅做append; `el.xx=/*()=>*/wA()` 以附加配置
- 排版 `wSty({fg,bg,color: white on black, pad:{LRTB},pado,anim:{dur},atran:transition,Tscale:1.5,Fblur:2"px})`; <code>wSty\`vip-${x.vipLevel} bvip\${x.isYearVip}`</code>
- 交互 `wOp({tap2/2s,acty,drop,run, +4点}, 'over once+3项')`
- 绑定 `el.bind(o,fr_返e)=f(o.it)`, `ary(a, x=>li(), a=>ul("已清空"))`, `when(o, {user: , blog: ,.. [1]:}, r=>r.type)` +3点

- drag, inview

`a.make(a=>a.sort(), io=$N)` 会深赋值所有{}, bind/when都能拿到必要信息。`a.it` 会生成add,pop,mov 事件以尽量避免读写DOM，它支持 `sort="ref",empty(push)`。io=$Y 时深试{}==，{}地址不同也避免对DOM无效写入

### 跗注

- 有wA `area,xywh/s` 和 `Vec2.pMouse(e,tap=P=>)` 获取点和鼠标/钮 `P.z` 0则松钮
- wOp 有 (鼠+触摸)ptr:[In,Out],focus,key. ptrE,focusE 对子树生效，`wOp.at(o|{e:..})` 以允许 `o.wOp()`。EQ 有监听 change,resize,unload,scroll 的组件
- `wOp.flag` over,stop,stop! 在 `return $Y` 不阻止默认/父级/中间件处理。 meFirst 优先父级, scroll 阻止滚动。`{tap:ev=>ev.e ,e0,eRel}` 以访问被点子项,自身,相关。
- `el.d. ary(a,{filter,sort,sel}), list(a,f,cfg), table(a,[f],cfg)` 提供了基础的增删API

- slidr({atran:(A,B,g)=>(t=0~1)=>渐变 })
- 绑定Vec的途径： Vec2.pMouse(), wA{area,xywh/s }

CSS
- (e.)qs`` 永远返[]，反引号内带 ${e=>} 在#id/head/body监听
- 默认单位 `1px 1s 1turn`. 时间相关 `CSS.s(1).then, rate(f) (调用撤销), rateLim(f, 0~4, (a,b)=>b)`
- only1 slidr.acty

### Slide 和 `anim.iseq`

滑移(在安卓非常常见)与序号动画(“播放列表”)构成了轮播图。 典型的写法如下：

```js
Slide({i:0, fl:'detail'})(
  anim.iseq("//"),
  el`ul .big*'A B C' `
)

href`
.slide:hover{anim:none}
.slide{anim:js 1.5s infinite}
.big{font: 80px sans}
`
c={a,i,l:1, fl:0b00, tabs:[],atran:NO}
```

- `c.fl` 是标准位旗：`0b1=纵向, 0b10=显示细节`-这里是轮播指示器
- str引用 `"//"` 是无限循环正向，而正向、正逆、随机、单曲由 `/ /\ ~ (数值)` 表示，还支持相反的 `\ \/`
- a,i 是全部元素和当前显示位置，l 是可见元素个数

比较高级的是tabs和渐变


谈到为啥灵活的EQ也有组件的“约定俗成” `e.c` ，得看看和 `anim.iseq` 同类的修饰词 `at`：

```js
c={txt:"Fade what?"}
div(
  anim.at(c.it.txt, {ease:'cos',erase:'fade'})
  p(c.it.txt),
  "Yes!"
)
```

需求是：可以得出0~1 的50%、却无法补间 "a"到"b"，必须对整体元素进行重绘。比起用 JQ 式的 `config.element`，`e.c` 更适合隐式提供 `div(e=>anim.at(...)(e)` 树内目标元素

EQ 的组件不是为设计模式服务。必须低理解成本实现显/隐传参的简化，它是元素树的孪生品。

## 2.H-API

1. 支柱 `img[src], background:url()` 的精灵图(类似 WebFont)优化
2. 封装 `g=canvas.getCtx("2d")` 的简单图形、渐变/进退场
3. 绑定 `el.draw(gPaint,"GL",g=>..)` 的geo/vtx/着色器 和 `g.modeBg` 混成模式

你愿酷功能，我愿看原理；你愿酷原理，我愿观功能

爱用脚本语言，是因为把不愿把宝贵的人类时间浪费在可以被生成的模板代码上，视为宗教般的信仰

动态类型第一定律：只从(对象内)变量的使用位置、在语法里的位置定义一种类型

橡皮鸭只是贴近生活的玩具，却柔韧而长存。

金色透明翅膀代表EQ对应用无形的助力，鸭侧背的等号代表翅膀不分高下地托起各类软件，鸭嘴的扁平象征EQ注视过程序员困窘之刻，却仍祝福我们能云淡风轻地完成全栈任务

橡皮鸭代表EQ基础的厚实、心智的不老气不客套，以及调皮的个性。


如果把你的应用比作小动物，wA是毛细血管，wOp是神经末梢，wSty是皮肤。 血管重扩展，神经重灵动联动，皮肤则以简洁够用为佳

那么“心脏”一定是EQ框架了吧？因为它负责 `<html>` 里的一切？ 其实EQ乃至JS只是连着每细胞的“胶原蛋白”，你的数据类型和业务流才是心脏！

你有资格写心脏，更有能力像EQ一样封装重复的代码。很多人对『框架』有种无条件的崇拜，宏大和神秘的事物总是令人着迷；以至于忘记编程的本意，淡漠要解决的那一类问题

复用集的扩充，使框架能插足更多流水帐的简化、提供额外功能和预设，框架的术语概念自然增长，悟出“安静”不容易，保持收敛更是极难的。

谁不想“从根源”改掉旧写法、“无前例”引入新技巧？但EQ的独特，正在于它不改，但一切都变了。

称职的框架善于创造，但好的框架不会把自己放在世界的正中央。 很难想象心脏占90%的动物照片像怎样。请给JS一次机会，蓝天和留白占90%，用户的想法站在最中央。

EQ可是有“概念杀手”的美名呢（笑）


如果说 Native Apps 是绿洲，Web 是埋满宝箱的沙漠，EQ便是装满藏宝图的宝箱！

加入和炫技不是编程的方向，傲慢才是。 遇到拖慢进度的高大上，把它留给原作消受吧！如果IQ180，不会母语都说不利索。

大家可以问问我，所有关于EQ首个版本的设计。感兴趣的话！

>为啥不用semver，即语义版本 `主.副.补丁` 规范化EQ包呢

`semver.patch`? 你是指 修订编号reversion 吗？ 难道副版本 不该体现加过几次功能，却需要非递增的补丁号，给用户手选？因为不向下兼容？

>只是说要遵循规范

用户不该关心(含新功能的)副版本补丁几次。像apk那样只管rev，ver仅供人读都能实现semver的功能。搞成三段算什么？

>那么你想用 1.2p5  (2次修bug) 1.2p7 来“修正”语义版本的习惯？

semver支持 ^1.2 的匹配，新的小版本补丁归0也利于阅读，至少比年月号通用。我只是吐个槽。

>所以你怼天怼地，却最终只怼到空气？

先别生气！ 如果你是对技术有追求的人，不会为这种程度的 __认知碰撞__ 而玻璃心碎一地

人是爱玩的。“按部就班”地传达一些知识，不仅令人犯困，更会错失它实践的一面！

人有负面情绪，但没有无价值的情绪。 没有批判性思维，把见识挂钩为财产，人云亦云…我们不说人类进步，__即便你得到了“知识”，也不懂知识的心__-它为之而生的宿敌。

>知识就是知识，人有了知识才会壮大

你有知识、你能做，然后呢？ 我们总要面对欣喜的“然后”，然后你继续学、“发散”思路为框架、更加聪明？ EQ可不是这么诞生的！

知识。若不能拎得清它的朋友、整个领域、供应链，不能从0 __面对__ 它的宿敌，就见不到知识本知-那就当然是死物，对于不再发展的东西，衍生出的好处，不能叫核心技术，或者说 "technologies"。

>所以EQ有什么不一样，大家都是用专业技能和时间堆起来的

EQ是用9成的时间和1成的技能，“不动笔”占大头。

>你可以先设计一半，开始编程和写测试，不就有更多时间改bug了？

这怎么行？未定API怎么开始编程呢？ 只有100%拿捏住提供和需求的API，才能给项目或函数起名字呢！

>那EQ的开发流程是怎样？ 不会卡住？

1. 写20个有各种(xml,交互,图形,IO)功能的小玩具
2. 把产生的优质片段拿出来重写遍，放一块看契合度
3. 将其归类！幻想场景来击败它们
4. 每天散步时考虑API的融合和优化，一天5小时，每月30天

>幻想场景？是指写测试？

没有测试那么边界性…或许有。 被击败的片段只能拿掉，或许以后能秽土转生，但我不会为行数词数而留住。

这和测试的本质区别是，测试为功能服务，而淘汰为项目服务； 但凡我找不出用法用处，或调用冗乱的片段，都只能换掉。

我删除过许多优美的函数体或参数表。你要知道在只得二字“鸡肋”前，我对这些亲笔的设计有多满意-而且都是一遍过。它们并非不成熟，只是不凑巧

>能进入像JQ,Vue这些框架的函数，一定是常复用的，能淘汰出什么？

截停新加监听的 `Event.stopImmediatePropagation` 很长，不如弄出 `ev.stop(immediate=$Y)` ，另外几点学 Vue 用 `onClick.prevent.stop` 呗。可这在XML里写不了，改进下 JSX 的语法？

`onClick.prevent="alert()"` 听起来像“阻止点击弹窗”，但是弹窗！多加几句文档让人熟悉一下，或者说，它是极端个例？

没。EQ只是用 `wOp(c={tap:ev=>say("资源占线") }, 'stop! only')` 而没有深究 `ev.stop`，同时提供 `c.acty=$N` 禁用时 `c.run(0/*click*/,{})`

>Vue 还支持 `<input @keyup.enter=submit @keyup.ctrl.C=copy>` ，好短好酷？

不行。快捷键用 `<button accessKey=enter>`，编辑键不加个右键菜单项？用 `wKbd({Enter:submit, C_C:copy})` 甚至能让用户自定义键绑，不香吗？

淘汰不仅是对成员的有无。如果我看见有用处但不清晰、不分类，我会单删掉这个调用签名，怎么办？重新想，直到算法有了契合的外壳，

__因为API一旦发布，就影响所有人很长时间对事情的理解。__

即便只是事件报上级，这种两个词的「小事」；即便只是语法，这种无关“核心算法”的细节，也值得把整个业务流程拉出来优化。

因为我知道如果为简化忽略了一点功能，就有人不得不重做整个封装-或者他们不懂封装而去复制粘贴-或者那是未来的我自己！那就更糟了。

作为一个程序员，我没资格对最终用户，拿着烂代码做出的特效夸夸其谈，好似以食材的优质沾沾自喜的厨师。 正因为我目睹着CSS那些平淡的化枯槁为神奇，才领悟“安静的框架”为何美丽。

走运的是，删除那些优美后，我总能找到更贴切的实现法和API！或者，导致问题的技术路线都删了！

>`@keyup.ctrl.C` 怎么没用了？ `@click.ctrl.exact` 有何不“准确”？

EQ 不需要“常量糖”。这条展开无非是 `if(!ev.ctrlKey||ev.key!='C')return` ，并没有 1+1>2 那样的效果。按EQ的预期无功无过、孤岛功能就是亏本，就该删！

我可以实现3种语法 `on(e,'Ctrl C')`, `ev=>{ ev.at('Ctrl C'); say('copy') }`, `ev=>{ ev.CtrlC; }` ，但却不会以用完即扔的N种做法，写快捷键这种重要功能

正是因为从不轻视小片段，EQ 才有了 `el(wOp wSty wA)` 函数的雏形，同样的，`Ctrl*` 比 `@click.ctrl` 适合指代 `wKbd({tap}, 'Ctrl*')` ，至少不会稀里糊涂就绑上 `Ctrl Alt`

>EQ未来会更函数式一点吗？

我也是函数式编程爱好者，但不玩纯函数(purely functional)。EQ三部曲其实涵盖了 _.js (underscore,lodash) 和 Ramda 的一些功能，比如 throttle `CSS.s(0.1).rateLim` 和 `say.it('a')('b')` 柯里化、`it.fn.ref, .cache(fk_v,obj)` Y组合子、惰性&缓存。

纯函数和仅定义式编程完全是两个世界，用EQ资深用户的语言：做相同任务差异比"2D"和"GL"还要大。

EQ 很愿意接纳更数学的数据/功能建模，但不能破坏易用优先、默认0复制的原则。FP 框架的“话风”大多粒度太细，或太笼统，EQ 也赶时尚，__但不会为抽象的美放弃母语的美。__

FP 的老祖宗 Lisp系(如 [Racket]) 里最简单的列表甚至KV处理，都要把链表颠来倒去，而 Elm,React,Angular(SPA) 等秀儿够短但很糊。这些缺点并未影响函编能力和思维的强悍(如 plt-games)，尽管它有些好处，也不能否认其语言表现力的贫弱。

“配置式”API 也可以不杂乱！一开始我想 EQ 有了“组件系统”一定变得又僵又长又散乱，但事实是 `main=({wtf,})=>` 这样的组件系统广泛地省去 `app={}, ST(app)` 等一大堆套路代码。虽然它没用 `this, class` ，本质上仍是采用了配置对象的模式！

[Racket]:https://racket-lang.org/

>你好像对“友商” Vue 很有意见？

EQ 并没有和 Vue 这种激进、重量级的成熟Web框架站在同一跑道，我们积极学习和小声点评开源社区里前人的智慧（虽然整个IT世界也就70岁）

按键等功能点 JQ 甚至没加，在这个角度 Vue 是先进许多，然而，有并不一定比没有好。这取决于框架的可扩展性等综合素质：坏的写法在“能用”后制造更多麻烦，甚至能扰乱人的设计思考。 比前人的肩膀更高的，是前人的盖帽。

EQ 学习了 Vue 的不少功能，如 `el.Reload`、`wKbd`、`anim.at(it.text,e)` 的Group渐变，不少是我从未考虑过的系统，或是正愁功能孤岛化就在Vue遇到了用法！当然后者也从 Facebook React 收获良多。Vue 对前端的贡献是毋庸置疑的，并不是不夸就是贬低。

不过，EQ 不像 Vue 只对框架对象应用“黑科技”。对 EQ 而言所有Object和DOM都是它的舞台，用积极联动 CSS/事件 的方法省去无聊代码，同时提升可配置性。__EQ不为杂事事无巨细地提供包装，而专心辅助ES6语言和编程。__

Vue,Next(React大包),Ang/Ember 并不是独一的。实际上 [Preact],[Alpine],[Svelte] 和EQ对DOM的理解更接近，不过尽管同属不独立Model而直绑data的流派，EQ和它们的相似也仅止于此。

每个人对市面上这些框架都有自己的亮眼点，也有(自己+框架)后的综合素质，不是只要用函编就能当主编，我尊重大家的选择自由。以前“资深”Java 吃香时，谁会想到如今 Electron,H5 满天飞呢？再之前 C#,VB,Flash 相当流行，但现在都不是唯一选择

对爱用EQ的人而言，EQ也不需要PK任何框架，需要PK的永远是笔下代码和你的想象力～

```js
main=({n=0})=>button(
  wOp({tap(){n.v++} }),
  n," time", n(Eqv.YN(1,"","s")) )

// EQ只靠JS做组件化
main=(
  {n=0}, inc=wOp({tap(){n.v++} }),
)=>
  button(inc, num(n,"time"))

num=(x,unit)=>el.span(x," "+unit, x(Eqv.YN(1,"","s")))
```

[Preact]:https://www.preactjs.com.cn/
[Alpine]:https://www.preactjs.com.cn/
[Svelte]:https://www.preactjs.com.cn/

>作为 EQ 的作者，有什么建议想给大家吗？

优秀编程语言的亮点不是作为某种编程的唯一途径，而是作为易改长存的语言文字。

1. 不要让编程语言和既有API限制你的思维，“一招鲜吃遍天”想想就好。你可以通过解锁新编程语言增近自己对社区文化的了解和充实感，[Kotlin] 和 [Ruby] 都在某一点带来过革命(Ruby之风还助成了lodash)，从简单做起。
2. __准确干练的人话就是编程语言__。如果API限制你的思考，如果词重率减慢你的阅读，用自己统一的语言换掉它！干惯了，你的每个项目就自有框架
3. 不要因为社会的评价把前端定位为自我复制的码农，或者觉得都该后端先顶着。[Shadertoy]、[Regex101]、[Jupyter]、[WASM] 这些都是前端所作，更别说[WebKit]的参与者。可能你做不到，但可以慢慢开始
4. 搜索引擎比你想的重要。猪和人的DNA与活动范围都有70%重叠呢。 (NO translation)
5. 别拿收藏夹当努力。可以看文记笔记，甚至从改代码做起，你想要，那就长久执行
6. 跑道上骑火箭也别往天冲。效率!=人数*时间/工作量，效率=有用功/总功
7. 迟到好过不做，不做好过无熟悉就蛮干。可结合条2. ([Zen] of Py)
8. 《聪明的一休》常说，编程和读书时卡住，一定要休息、换书、休息一下
9. Talk 容易，但[并不廉价]。即便是对纯技术。

1~2 是个人修养，3~6 是自我认知，7~9 是懒的智慧

[Kotlin]:https://kotlinlang.org/
[Ruby]:https://ruby-lang.org/
[WebKit]:https://developer.mozilla.org/en-US/docs/Web/CSS/Webkit_Extensions
[Shadertoy]:https://www.shadertoy.com/new
[Regex101]:https://regex101.com/
[Jupyter]:https://jupyter.org/try
[WASM]:https://mmontag.github.io/chip-player-js/?q=Swan
[Zen]:https://pep20.org/
[并不廉价]:http://www.yinwang.org/blog-cn/2019/09/11/talk-is-not-cheap

1. Don't hardcode you purpose with ONE language or API. You can learn new languages to enrich understanding of dev communities. A good-first choice is [Kotlin]/[Ruby].
2. __Talking concise&clear IS programming__. If you can't stand library API, if code is too repetitive, replace with your own! You won't have short of "frameworks" after that
3. Don't repeat yourself, don't leave all the rest to backend. [Shadertoy],[Regex101],[Jupyter],[WASM] was all made by frontend devs(let alone [WebKit]). You can't DIY, but stick trying
4. 搜索引擎比你想的重要。猪和人的DNA与活动范围都有70%重叠呢。 (NO translation)
5. Don't just "Star" and wait! take note & read blogs, try fork your version, keep trying.
6. Efficiency!=Employee*Duration/Jobs, Eff=UsefulWork/TotalWork
7. Better late than never, although never is often better than *right* now ([Zen])
8. Rest more. DOS dies when one process got stuck!
9. Talk is cheap, but not redundant, even in the face of code.


1. 我们不需要XML。那些尖括号只是UI树的书面形式，一种冗长的表达途径。重视心中所想、眼中所得、数据所化。
2. 为最终代码而生的设计好，为设计而生的模式坏。
3. EQ带来的不是“程序员特供版”Excel或PS，是思考方式。我们的职责不是应付各语言的“黑话”、不是印证算法和写法百变的成功，而是在创作中让各领域融恰、让人和算力融恰
4. 学习即关联，思维即归纳，学而思。
  - 程序是对数据与(周期)步骤-参数的归纳。能指定关联，就别归纳步骤。能行莫言，既明勿思。
  - 别把归纳的文本当学习，死的。除非找到多方关联
  - 你关联得完，归纳不完。思要尽力，文别尽“厉”。学而不思则罔，却只随心而为

## 3.Eqv与工具

logs


`code hi.htm` 并粘贴以下，直接打开，见证魔术发生。

```html
<script src="https://eqvjs.org/1.js">
el.PWA`你好世界 by You @EQ ##css,js,h5##
View world filled with tags&CSS properties!
`
el.href`jquery bootstrap` //但用不到哦

with(el){
fg=(fg,e)=>span(wSty({fg}),e)

doc.body.tail=[
  p("Welcome", fg("red","!")),
  p("To"),
  ..."Equery".zip(ss`#972ea9 #d85d54 lime cyan slategray black`)
  .lets(([s,cv])=>fg(cv,s))
]
}
</script>
```

>`qs.PWA` 带@时生成 OpenGraph 社交化标签和 PWA 信息(含 favicon.png 和 banner)

要使代码更合规，不劳烦键盘！

```bash
npm -g i eqjs # 你的整套工具
```

```sh
eqjs hi.htm -x js -h cdnjs #即便 <script file=""> 未提供也抽离, 变更CDN
cat web/hi/index.html
cat web/hi/manifest.json
```

```sh
eqjs !flat web
cat web/hi/js/index.js
```

……或者你想导入既有HTML，甚至项目，甚至……

```sh
eqjs emet # -em 以生成 el`` 格式
eqjs flat
eqjs emet web/hi/ # hi.htm 回来了

eqjs !emet # 导出HTML
eqjs emet -jq # 粘贴JQ代码
eqjs emet -dom # 但是，Vue 因为模型太大而未实现导入。EQ也不支持导出JQ等
```

`eqjs` 还能进行一些通用 web 优化

```sh
EQJS_TOOLS='' # 压缩js,css 的工具
eqjs min hi.htm
cat hi.min*
eqjs min web/hi/ -o static/ -spirte '.*' -xjs 4
# 将所有面积差<20%的 img,background 图片放在 sp01.png, <4K 的js内联
#尤其对静态/单页SPA管用, 再配合 ST({['/img/*.png']: $Y}, 'sw') 离线缓存
# EQ 只能用 src="sp.png#xywh=0,0,10,10" 在运行时将img换为img[src=data:1px透明].spimg

# 介于 CSS image() 不受支持，FF上EQ以 -moz-image-rect() 实现CSS的精灵图
# WebKit 上以 bg:paint(crop) 和 bg-size 实现
# EQ 还为不支持 CSS Houdini 的FF等顺带了 -bg-element:canvas 以及 DataURL,背景图滤镜 的 polyfill
#见 el.Paint((g,L,{cssVarName,.})=>)(e, getCanvas?), CSS._.dt=`time 0s` 和 el.draw(L)={g,L,context:'2d'}
```

即便只兼容常绿浏览器们，EQ 也确实在背后做了不少补丁，但 it just works!

另外，EQ 也会编译 `<script type="text/coffeescript">` 和 TS,Haxe,pure(Haskell),cljs 作为彩蛋！

`eqjs` 很强大，但它只是EQ的转换工具，对大学生和面临代码基的人尤其实用。文如其名，EQuery 不仅重视效率，也善于表达查询，请在导航栏开始学习之旅！
