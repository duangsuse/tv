Title: 同样是考场失意的JS迷，来点前端技术讨论
To: hi@taonan.lu

我(duangsuse)是搜「Vue大对新React docs 的批评」发现你博客的，看你最近有更新，也富有个人风格；我想要花时间写点字，就谈你在 lutaonan.com 分享的..所有文章吧？

我小时候的理想，是成为一名Linux运维，做自己喜欢的极客类工作；现在的日程是完善自己的编程范式，使它能为Web.dev创造价值（这可真是花了大半年，改了几百版“Talk is cheap”的API Set吧..晕）
未来的妄想，也是支持那些相信中国人、相信汉字文化配得上法制民权的所谓公知？

我大概是5年前高考，最后在某个软件专科肄业。没有IT的工作经历，但从初2开始，对元编程、算法和编译原理的好奇诅咒般陪伴着我。
直到今天，我愿意“信口”掂来七八年中的所有经验，无论对错。
我还写过些古怪的、那时尚幼稚的应用，下文会逐渐提及三个。

访问链接可用 cat|sed -En 's/^#(.*)$/https:\/\/lutaonan.com\/blog\/\1/g p'

#read-react-18-doc
#react-and-the-way-building-web-ui/

出于语意化，我不会在React等lib的术语体系下，做接下来的讨论（其实是碎碎念）
- Effect=依据state(可变量) 重算的表达式
- useXX=hook,同上,它的组合性是Rea比字典化MVVM有的重要优势
- LP=逻辑式编程

跑两次能查出clearTimeout这样的问题，但对于vueUse没有也没毛病，因为函数拆分合理的话，人眼就能test代码才对。最好的文档/typehint 就是代码即文档，这方面推荐 CodeAesthetic.io yt
在我的范式(VVOP, view var oriented p.)里没有在粗粒度copy&diff 的“纯函数式”render()，我不评价这些原教主义FRP，但其实WebKit有提供 reqIdle(fn) 和form.reset

Rea家的问题不是FP in JS 带来的，尤大说的“眼高手低”并不是空穴来风。 minikanren.org 完全能在JS里引入LP: 可试玩 vennerjs, https://github.com/duangsuse/mkey
我有信心在"更难"的LP in JS 上赢过React

Rea Fibers 因何而来的？为何要VDOM？ 真正能弄懂的人很少，我猜Rea team 也没想过更简更快的方案，给了Svelte,Solid 这些后继者机会。 这是"FP"所不该表现出的态度

我看到了C语言里指针和"数组"的小聪明。今天用numpy做并行计算,用Go接口封包的人可不会怀念i++,++i; arg{c,v} 的烂摊子，谁又敢保证从 Haskell 传出的纯的幻想，不是另一种？
React 里写v-if，需要把这个判断写成 function, 然后条件判断 return 哪一个 view ，这就叫眼高手低。 rsearch.as(x=>x.as({User:, Blog:,  key:'type' })) 也是一种 for-elif 的JS写法，比堆砌return好得多

Promise的用途，被局限在async()=> ，但then:catch 的模型完全能cover Optional,Result 的业务。 
不可变+memo 很美好吧？但，Svelte所用的细粒度重算，绕开了缓存失效问题「让有重赋值的代码、让Effect也可以pure」
早于Rea的Signal范式就是这样不讲道理，因为纯就是可memo。单拿伪递归实现for(i=0..)也太nerd了，用上 fold,.(Excel里的Sum,.) 就叫FP则更扯了，列表处理GraphQL,SQL都会的

ReScript的作者张是个好人，他在开发介于rs~go 的 Moonbitlang.cn ，目前仅target=WASM但stdlib堪比JS

#retake-and-destiny
#how-do-i-take-note/

在B站偶尔刷到「二本还妄想面试tx」，无论学历，优秀的CTO都是极少数，而平庸但称职的程序员，却无关于大学经历

时间确实很重要！但今天的我，非常羡慕有「复读一年」时间的人。
如果看到文尾后，您愿意的话，请告诉我的家人，我的技术不过时、没被淘汰。 或许他们是相信「大厂」的flag的

谈到思维导图，我有个油猴脚本把Lisp转.dot 的，还有个OCR视频硬字幕识图。 当时都是做着玩，没啥好UI
尽管我不爱分享碎笔，我会把笔记放在Telegram，按IT领域打些#tag ，想引用时也靠关键代码段来搜索

我是个技术人员，不太爱Presentation，我觉得导图读起来没主次没语序。 但曾经也做过点
https://www.bilibili.com/video/BV1Af4y1M7Yn

#things-i-learnt-after-6-years-as-software-engineer/

- btw. puppeteer RPA能完成的截屏，靠dom2svg也可以，现在问GPT就能解决许多功能点，刷编程圈只需要找灵感。 我不太喜欢自己重捏DOM API的libs
- 作为框架eer，我会比学院派更「了解你的用户」，但我对DX的重心，会放在我敲代码之前。 好的代码肉眼能test，我设计的APIs也是从无数种test里脱胎的
- 我不想拿自己的尺子去度量别人，但技术上除外。 我尊重功利的人，会协作完成需求，但不容忍丑开源代码
- 至少在中国，许多CS学院派不能像张洪波、@lazyparser 那样 open-mind 。但我是很泛语言的，我能比较C struct, C++/Java class 的范式差异，也知道许多FP里的甜头(组合器,.) 推广到工程的难点在哪
- Zen of py 有写到，重新编程是很麻烦的。 “Dijkstra:不要快且脏”，让二次重构犯难
- 恰逢圣诞，谈到蚂蚁金服有代码发布的「三板斧」，就想起Antd事件了。 这是管理问题，但代码上，就FP自称没有变量泄漏了。 Java和HTML都挺靠依赖注入
- 除了「用别人的语言交流」，有自己的心智模型也很重要。我也很重视 Why, What, How 呢 https://t.me/dsuse/19186

btw. /(.*)/ 的grp替换确实很多人都不懂.. regex101.com

#you-dont-need-to-drop-out/
#talking-about-dropout-again/
#my-coding-road/

dropout 应该是“被字句”吧，并不是你自己想要「不平庸」的。 在Linus看来，他应该是个普通人呢，他批评Nvidia时可没个“正经”样
像我这样的人，可能只懂 backdrop-filter: 毛玻璃。哈哈
JS 的 [[Proto]] 挺好玩的，你可以用reduce实现个对象合并玩。最近的sql`` 拼${}也可reduce呢

不要怀疑学历的差别对待，中国人也是不被允许有gap year 的。哪有那么长的避风港？永远只有top%的人能过《后浪》里的那种人生

PHP的心智模型和MVC差别不大(Str函数的RPC..)，却被认为是乱搞文本模板..  ES6的`` 免sqlmapper才能算不一样吧。 明明都是CRUD转发器，静态类型顶多快一点
虽然Pascal的作者最近逝世，我想说那真是不伦不类的VB式语言

别人为了这个学历，付出的更多是学费。让大学可以投资那些研究者。 看起来这是双赢，但在IT界，却有些理论在误导工程者..比如PF范式
作为喜欢冷门技术的人，我受够了那些含糊其辞的抽象。
天道不是酬勤的。有些人可以学古生物和拉丁文，我不必与所有人合群。 我们应该接受努力无效的可能性，过容错的人生、写链式的健壮，而不只是选择「正确」

#how-svelte-set-state-works/

首先，DOM 赋值是不需要js层去合并 microtask 的，js里改两次className看看CSS anim: 会不会放吧
为什么JS界总有自己比C++和SVG更重视性能的幻觉啊，明明 InsectObserver 都是近两年才流行起来的，之前是每wheel一下就要等调两三次函数吧？

虽然我自学编译原理，不可能连转转AST都不会，但简单说下VVOP是咋做能 return 的 $(val) 的吧
inout(0)//{_obj,it:NO, k:"",v:0, onvar:[], then()}

依据Promise.as(x=>then) 和其与变量可互换原则，实现 watch()或computed 。这里省篇幅，总之是说一个统一的API，对编程有很大的帮助

生成代码的GUI，我做过 https://github.com/duangsuse-valid-projects/TkGUI
感觉若JS协程支持手调yield语句指针，Svelte 重算能方便不少？ 看到这种机翻源码..

#svelte/

Rich对DOM,CSS,SVG 的理解都很好，最重要的是他很注重设计哲学， 我觉得S的持久性是比Vue好的 ..虽然S5刚刚抛弃了$:语法
VVOP:
let {a,b,it}=({a:1,b:2, c:NO}).Out
it.c=inout((a,b)=>a+b)(a,b)
c.as(x=>dd=x) //3  dd调试显示
a(2) //4

至于onDestroy, 因为只会被list和switch 结构调用，我会让 wOP({unload:[1..sRate(rwVar)]}) 被ul而非li的挂载器捕获

点到为止了，包括跨组件通讯。它们和 HTML attr inherit 和事件 bubbling 是同类问题，Rea在依赖注入上并不比DOM/CSS更老资
我很奇怪为啥要this.、为啥要编译，或许这就是代码风格差异吧

我讨厌样板代码, Code Snippet
VVOP:
export let ww=wOP.fork
ww.App=()=>
$$( // 如何定义组件
)
ww.w=()=>
body(App$$id({挂载对象}))

..对了，4年前我还曾和Drakeet闹得不愉快。 但今天的我，不会因问题的答案而争执对错，
因为我所设计的，都是不会有标准答案的问题、是无可替代的解决方案。天赋的自信和适时的毅力，会是我对开源最好的贡献。

谈到阿里，还有个PUA-lang meme编程语言。

#to-frontend-prejudicers/
#declarative-programming-is-the-future/

其实即便Svelte，也无法完全取代JQ和lodash这些玩意啊

用Java的眼光评数据驱动的JS是错误的，但这不意味着vuex是对的。 你的需求是保留状态树到local或URL参数，乃至handle SSR的上文切换，但这不会突破reactive() API
h(‘div’, 这种树Builder完全是莫名其妙的(和XML语法一样,人机不友好)，还不比Java的new Record甜， vanjs.org 的好看不少 。怎么用JS的人没用过Ruby或Pug模板呢

FRP范式 UI=f(state)，其实是对LP-面向变量集编程 的误解。实现Reactive是Signal而非Memo: mount(jsVar)(UIvar) 
因此UIvar也未必是append的，可以是既存Node-可以用CSS选择器.. 可以0代码MVP..
比起突兀的 IO() 类型，还有那个模仿co() 的redux-saga，还是查询更“纯”吧
https://t.me/dsuse/19222

#think-deeper/
谈到拖拽式编程， ffmpeg.guide 算是一种LLVM IR 吧。 其实就是把1个函数的结果连到N个函数的输入，但要先意识到 +,noOp,= “运算”和重载并不特殊哈，以及a&&b 实质是2个if()=>这种莫名其妙的混淆

之前我说了摸ESTree"AST"的Svelte编译，说白了每层语法只有"TWAP",tuple when ary parenPrim 4种节点。 就像[Either/Result]对值做的归纳.. 甚至二进制文件都是这4种

这些知识，或者说对代码的另一种认知吧，对dev无立竿见影的帮助（谁会学我空转3年呢）， 但如果你感兴趣请回信

后给钥匙先给锁。比起从 commit#0 开始读源码，在开始前对比同类项、查看example usage，从而与原作站在相同立场更重要。


