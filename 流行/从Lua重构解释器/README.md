# 前言

Lua是一门类似pyjs、主打小巧的脚本语言，它支持Java编译不通过的 `if 1==1 then class{BE='Pair',swap=()=>Pair(B,A)}` 和 `co:yield(Async)` 一类函数范式。高动态和客制性，使Lua被腾讯和怒鸟游戏引擎+OpenResty+OpenWRT所青睐，并有了 [Luvit.io]/[MoonScript.org]/[YueScript.org] 等运行时和方言。

Lua被 neovim,wireshark,Lightroom,Androlua,AutoJS 等App作为规则引擎高频调用，其地位很像给JVM构建apk的Groovy、其后端模板EL & `@Spring(DSL)` ，但，Lua没安全漏洞，[它甚至能运行在内核里](https://github.com/luainkernel/lunatik)、[跑在单片机上](LuatOS.com)！

可见，「Lua生态」并非藉藉无名。如果说它比pyjs差在哪，那就是 `local do…end` 和数组字典结构较冗长混淆，但其效率和完备性，深受游戏开发者、架构师的青睐。

本书是 [《Lua解释器构建：从虚拟机到编译器》 ©2023 Manistein ￥64](https://book.douban.com/subject/36280421/) 的知识预备，__从前后端C算法开发常识，导向PLT(元编程理论)常识__；解析Lua所用的算法范式，手打一杯将代码字面语意，映射到js列表字典的抓娃TreeWalker。

Lua和PyJS的元编程技术有这样的对应关系：[NeLua.io]=Mojo、[Luau.org]=TSC/Oxc/BabelJS.io、[LuaJIT.org]=[PyPy自举JIT](https://pybenchmarks.org/dont-jump-to-conclusions.php)、[metalua](https://github.com/fab13n/metalua/blob/master/README-parser.md)=[ESTree🌿 🌱](https://tree-sitter.github.io/tree-sitter/playground)/IntelliJ PSI/`import ast` (带行号语法树.py)。

若要问在Web上体验Lua，或配置类似py的开箱即用环境的最好方法，请打开[Fengari.js](http://fengari.io/)和[Luvit](#标准安装)，它们提供了文件/格式/网络IO库。

为啥非要构建Lua？ [CRuby,CPython,QuickJS](https://hellogithub.com/report/tiobe) 的源码有啥问题吗？ 其实，**无论你是想认识当代工业界 DSL(interpreter)|VM|GC 原理、OS或OOP架构本质，或是只做[二进制|逆向](https://github.com/duangsuse-valid-projects/CoolTok)Mod|FFI或AOP调用绑定，Lua都是top 1%的案例！🍏**

> “业界总有两派程序设计方法，一派简洁真诚，明确不堆砌缺陷，一派繁复空洞，连缺陷设计都不明确——Hoare, 快速排序之父”

麻雀虽小，五脏超全，我初次阅读计算器[subexpr()解析](https://github.com/Tencent/xLua/blob/master/WebGLPlugins/lparser.c#L1069)时就学到了「科班的」 YaCC,LL1,[ANTLR+VSCode引擎](https://www.cnblogs.com/dtux/p/14885606.html) 与一众[FP函数式]解析组合子不会教你的速算法。 此法还可用于生成 HTML.h1~h6 大纲树、py的缩进块，本书都会实操 ——如果说Lisp和入演算是「语言之间的语言」，Lua便是「语言里的语言」了

这本书不止写给「称职」的开发者，更是属于「优秀」程序员的自我修养。 一招鲜，吃遍天的技术总是存在，但只有自由掌握底层逻辑上的学习能力，才能在它们初现时便一见如故，能穷其变，新知不穷。 #码哲

如果您还不会Lua，请多看 [js2Lua](https://js-to-lua.netlify.app/) 和 [中文API文档](https://cloudwu.github.io/lua53doc/manual.html#6.1)。**本书大部分链接都可视为资料站，而非孤立引用文（初读建议您忽略，但确实都是沙海淘金的资料）**。 对Javaer和Pythonista，本书的元编程技巧也是通用的。 对序列化/依赖注入/接口绑定和 `@调用()` -例如 Gson,ButterKnife,DeepCopy 的幕后代码好奇？本书更附赠了实践方案。

目前，CLua的最新版是2024/1发布的 Lua 5.4.7。Lua 诞生于巴西 PUC Rio 大学，至今语法上没什么变化，或者说，没py2to3那样重大的错误。

>“简明是可靠的先验，不是可靠的祭品。——Dijkstra，或许和代码至上的Linus聊不来”

2023是Lua的30岁生日。它为何而生？ Tecgraf实验室的三位作者 Roberto Ierusalimschy, Waldemar Celes, Luiz Henrique de Figueiredo 为了巴西石油公司的数据勘探工作，设计了DEL和Sol(西语的Sun)，而为让Excel类处理更好与C兼容，全新的Lua把JSON的ary|obj混合成了table，用falsey代表nil (5"数文表真空")，又天生支持C函数、树指针、协程，只保留5+3种类型。

Lua解释器是开源的，其输入Lua脚本却有两种形式: loadstr|chunk ，对应着 lparser.c codegen 和 lvm.c bytecode 解释器。 本书仅讨论str的形式，在末尾会教大家实现"JSON-spgjia六变量栈机"和反汇编器ChunkSpy的原理。 它俩覆盖了 JVM/Dalvik ART/Flash ruffle.rs 的基本操作。 🍏

除了作为App、MC、网页小游戏开发的基石，以Lua为第一课的「codegen/bin-hex」技术还应用在[安卓x86 armv7模拟器](https://www.zhihu.com/question/29851229/answer/104193305)、基于armv8 MacOS的Rosetta转译、 WebVM.io 的WASM版JVM和Linux(ffmpeg的作者 Bellard.org 也做了一个)、libc的函数依赖回填器 `ld-linux.so $needNoChmod` 上，

哪怕你只是游戏玩家，也逃不掉对CheatEngine和金山游侠、大名鼎鼎的“任地狱” Dolphin/Suyu.dev/[Mednafen🎵](https://chiptune.app/browse/Demo%20MIDI/Voyetra%20Orchestrator) 们的使用。 太酷了，[科技并带着趣味🎨](https://t.me/dsuse/20140)，我们一起逐渐理解这一切吧！🤓🖕

# 大纲篇

和《Lua构建》比，《重构》的顺序和着重点差异很大。 下为原章节叙事：

1. 解释器的基本概念，也告诉你虚拟机和编译器的肝胆相照
2. Lua虚拟机的抽象，包括“带类型的指针”和指令循环(CPU cycle是1秒几G?)、内存垃圾回收机制、字符串和表，这也是Boost等C++er爱造的轮子。
3. Lua编译器和虚拟机如何交互，如果它们是def或class，调用签名和this变量集长啥样。
4. Lua编译器「纯手写」的词法分析器和语法分析器，如何边parse着就把Chunk字节码生成了。
5. Lua的元编程和设计模式，包括元表、Userdata树指针、Upvalue闭包、弱引用表和require模块
6. 一个俄罗斯方块小游戏，如何被dummyLua解释运行？

本书不提供图表，而是通过自顶向下、拆分代换、接口复用的「元语言」，定义万物，就像上面这样。

本书不能为纸质排版。Web的流式布局+超链接，更适合它的信息密度。论文那种格式，大概也承载不了如此数量的引文（笑）

在显示本书大纲前，我希望您认真读完这4篇导论，再试看下这3个玩具。 这些文章的作者在国内Java/C#/JS的编译期和调优领域是佼佼者，有真知灼见，亦字字珠玑。他者之石，可攻玉也。

- [RednaxelaFX 如何区分解释与编译](https://www.iteye.com/blog/rednaxelafx-492667), [如何JIT](https://zhuanlan.zhihu.com/p/610720287) (x86 ABI没基础可简读：[跳着看就够了](https://bxtkezhan.github.io/post/tutorial_003/), 猜猜 Diane Silk dress costs $89 是为啥😂)
- [WASM MoonbitLang.cn 主创张宏波侃编程语言史](https://juejin.cn/post/7040037986699837453)
- [美团技术沙龙：JVM -O3编译优化，从for开始读](https://tech.meituan.com/2020/10/22/java-jit-practice-in-meituan.html)  ([可对照@sysprog的C语言化简案例](https://hackmd.io/@sysprog/c-compiler-optimization?type=view#:~:text=Loop%20Optimizations))
- [HW-PLLab 朱子润谈类型检查兼推导](https://zhuanlan.zhihu.com/p/634217295) (“数学”公式的部分不用看，[本文](#子类型断言)有覆盖)
- [文言编程语言](https://wy-lang.org/) (类似生成PDF的PostScript，基于传参栈，难点还是在IDE封装与设计美工)
- [代码罗塞塔](https://rosettacode.org/wiki/Guess_the_number/With_feedback#Rust)！ [特感兴趣的代码段,请可视化编译](https://godbolt.org/)。 code.golf 是认识语言差异的好方法，当然也可当[OJ赛](https://www.freecodecamp.org/learn/rosetta-code/rosetta-code-challenges/execute-brain)来用。
  - 我曾用8种不同范式的语言写CSV或四则([甚至SQL](https://duangsuse.github.io/tv/黑了/db.htm#:~:text=SQLite%20甚至能))parser、[贪吃蛇](https://duangsuse.github.io/tv/游戏时间/贪吃蛇/?v=0.js)兼[2048](https://duangsuse.github.io/tv/流行/2048.htm?配0%287,7,2,128%29;doc.body.style.userSelect=%60none%60;cfg.动感=1)、[Desmos触屏乞丐版🎨](https://wojs.org/HTMLs/xy/xy.html)这种简单任务，别怕推倒重来，重构是Vue大那种架构师的日程。
  - 喜欢OI、CTF、黑客松的js人可涉猎[这篇游记](https://blog.hanlin.press/2021/01/project-nano-official-writeup/)，程序员的时代，大概比1024节、软考、技术鄙视链、35岁淘汰论丰富一点儿。 倒不如说编程比数学更像「元学习」
- [草蟒和zhpy](https://www.grasspy.cn/zwdocs/grasspy-bible/chapter16_monkeypatch/)、 [一个OI生的Kotlin:kamet](https://mivik.moe/2020/tech/kamet-basic-implementation/)
- 读完本书后，您再关注国内少数的优秀公知，便有更深的理解：  阮一峰 廖雪峰 云风 陈皓 鸟哥 张鑫旭CSS, 王垠 [vczh轮子哥](http://www.cppblog.com/vczh/category/6824.html) Barret李靖 编程随想 clowwindy(SSR的原作) [Conmajia译DNN](https://www.cnblogs.com/conmajia/p/annt-feed-forward-fully-connected-neural-networks.html)
- *这里说的优秀，不是B站编程娱乐圈「Java之父余胜军 C爹谭浩强」*

>“如果Markdown和YAML需要有深度解读的话，那就不需要它们了” ——最有「潜力」的知识，总是所见即所得的，因为语言只是个载体，唯心态有雅俗之别。 读书时若一些章节不那么易见，不妨多读几个链接，再待几周你且看他。
><br> <br>  谈点[功利主义](https://www.zhihu.com/question/544112523/answer/2586209720)和知识付费笑话：Linux可购买用户更名卡，首充6元赠送终端皮肤，黄金会员解锁bashrc配置……
><br> 搜错了大佬，你的知识面会事倍功半。在这样「延迟满足」的内耗中真的想得明白，很不容易，大多数人学到了别人的八股、却忘不掉他自己也不得要领的术语。<br> <br>  本书是我5年唯一的积累，希望您偶尔也能多读两遍，与个人风格灵感结合，方能悟出App和库代码的更佳实践。揠苗助长的事儿，可要不得。 #码哲

按Ctrl+F搜索所有tag: #码哲 #码史

## 标准安装

```sh
mkdir bin; cd $_
#如何添加PATH.: sed "s@.local/bin/:@\0$HOME/bin:@" -i .bashrc
#sudo rm /usr/bin/lit #LLVM的测试套件与Lua包管理重名？删

#PowerShell -NoProfile -ExecutionPolicy unrestricted -Command "[Net.ServicePointManager]::SecurityProtocol = 'Tls12'; iex ((new-object net.webclient).DownloadString('https://github.com/luvit/lit/raw/master/get-lit.ps1'))"
curl -L https://github.com/luvit/lit/raw/master/get-lit.sh | sh
ls -Llh ./{lit,luvi,luvit} /bin/$0
lit install  er2off/class lil-evil/smoldb SinisterRectus/sqlite3 creationix/coro-postgres creationix/weblit

# 我们可以比较下Lua到底有多小：
u=$(echo /bin/{lua,luajit,ruby,python,php,node,rustc})
ls -Llh $u
ldd $u|ruby -e 'puts ARGF.read.gsub(/ => (.*lib\/.*?) \(.*?\)/){"\t"+`du -h $(readlink -f #{$1})`.split[0]}'|grep -v ')$'
```

<details><summary>是LLVM的0.5%！</summary><pre>
/bin/lua: 300K
/bin/luajit:
	libluajit-5.1.so.2	572K
/bin/ruby:
	libruby.so.3.0	3.5M
	libgmp.so.10大整数	664K
/bin/python:
	libpython3.12.so.1.0	6.2M
	libz.so.1解压库	100K
	libreadline.so.8行编辑REPL	336K
/bin/php: 21M
	libicudata.so.75万国码	30M
	libpcre2-8.so.0正则	632K
	libc.so.6	2.0M
	libstdc++.so.6	22M
	libgcc_s.so.1软浮点	896K
/bin/node: 59M
	libuv.so.1免线程IO	204K
/bin/rustc:
	librustc_driver-074e7ea67172ca5c.so	73M
	libstd-80e3b149c7ec451b.so	8.1M
	libLLVM.so.18.1	129M
</details>


核心社区库：
- [Orbit MVC](https://keplerproject.github.io/orbit/) 或 [Resty平台](https://moonbingbing.gitbooks.io/openresty-best-practices/content/openresty/response.html)-自带Redis
- [Discordia](https://github.com/SinisterRectus/Discordia/blob/master/libs/utils/Color.lua#L43) 组装了一大堆tool，来封装聊天机器人
- LuatOS 没有线程协程同步异步，调[Task](https://wiki.luatos.com/luaGuide/luatask.html)就够了
- [pl+itertools](https://stevedonovan.github.io/Penlight/api/manual/02-arrays.md.html) `Cat = class(); function Cat:say()end`
- [Moses FP](https://yonaba.github.io/Moses/) `M.sum(M.range(100))`
- 📦[LPEG DSL](https://luyuhuang.tech/2020/06/24/lpeg.html#lpeg) `cvar=(l.alpha + P'_') * (l.alnum + P'_')^0; list=e=>e * (',' * e)^0`
  - **每算法只有1种 best practice**，请Ctrl+F PEG ，本文有在线试玩的更好版本，这段只是说明「同业务可封装出N种不同写法」，请多触类旁通 #码哲
- 📦[cJSON](https://blog.95id.com/lua-json) `luvit -e 'require"json"'` 便[基于以上PEG](https://github.com/LuaDist/dkjson/blob/master/dkjson.lua#L648)
- 📦WebLit [socket](https://alexarjing.github.io/2016/12/08/chapter16/)，基于回调式 `uv.new_tcp()`: `#ask luvit net.createServer tcp echo, with nc`
- [sql](https://scilua.org/ljsqlite3.html) `db=require("sqlite3").open(""); x=db:prepare[[SELECT 1+?, 3]]:bind(2):step()`
- [OpenDAL](https://opendal.apache.org/docs/python/opendal.html#usage) `op=fs.operator.new("fs",{root="/tmp"}); op:write("a.txt","hello world")`

以上不包含类VBA嵌入式应用。本书不过度导包，仅展示Lua语言功能的完备性，您可以自行搜索API文档做demo。

若您还没有科学上网，编译会卡死。建议用 Clash App + Proxychains 全局代理，日用骑墙安卓赛高！

```sh
#.: sudo bash
cat>socks <<EOF
cat>~/proxychains.conf <<OK
strict_chain
[ProxyList]
socks5 \$(getent hosts ipr|awk '{print \$1}') 10808
OK
export LD_PRELOAD=/usr/lib/libproxychains4.so
proxychains -f ~/proxychains.conf  bash
EOF
cat>/etc/udev/rules.d/99-usb.rules  <<OK
ACTION=="add", SUBSYSTEM=="usb", RUN+="/bin/sh -c '(sleep 2;eval \$(base64 -d<<<c2VkIC1FaSAicy8uKiggaXByKS9gaXAgcnxoZWFkIC1uMXxwY3JlZ3JlcCAtbzEgJ2RlZmF1bHQgdmlhIChcUyopJ2BcMS8iIC9ldGMvaG9zdHMK))& '"
SUBSYSTEM=="usb", ATTR{idVendor}=="2001", MODE="0666"
OK

echo 打开终端 . socks 即联网，插拔数据线自动重连
```

## Lua1~5语法级改良

跟着Lua作者的脚步喵一眼「闭包」「导包」等特性吧，设计点都有「性价比」，我会尽量教得0知识背景，就像闲聊。 更加有趣的细节，独立章节会开讲。

- 1.1 VM优化table构造器({}字面)
- 2.1
  - 允许运算符重载、元表Dunders，如 (`new Proxy{}{_index} => {}.__proto__`) 以竞争Java OOP
  - `Grades{8.5, 6.0, 9.2; name="John", major="math"}` 消灭了 `@()，@[]和@{}` -Kotlin元组最初也是 `1to 2 消灭了 #(1,2)`
- 2.5 str库支持伪正则 gsub,find (实现 grep AWK)
- 3.1
  - VM尝试寄存器(=局部变量)化
  - 构造器的 `{[10*x+f(y)]=47}`
  - 引入了 Context *L，可沙盒并行多个上文，增强 ldebug 以竞争Java多线程
  - 字面 `sum=A=>(B=>A+B)` 等效于 FP `sum=A=>((upA,B)=>upA+B).bind(0,A)`, 即 **upvalue/upv, 术语为 nonlocal/cell var**
  - nonlocal 仨怪癖： Java里cell必须是 effective final，py里 ` [(lambda:x) for x in "abc"][0]()` 是c， `sum=A=>` 返回(close)前A在栈上，之后就不一定了，或许在堆里？
  - Kt用 `val upA=IntRef(0)` 支持mut捕获，Vue用更灵活的 `x=ref(0).value, watch(()=>x)` ，Rust的 FnOnce FnMut 重载trait..就更复杂了
  - 他们其实是想优化 `class sum(A=0) { invoke(B=0) { A+=1;return this.A+B } }` 这样的变量集关系「Lex Scope」，pyjs 在this和原型链上各有各的坑。
  - 其实 call stack 也是坑。thread异常返回栈、coro回调链表，当协程+多线调度成了主流，你会发现 协程=闭包+switch(var 语句号)： “局部分配”还存在吗？
- 4.1 支持false, 沙盒已解决"GIL"问题
  - 🤓： 调用栈才不是坑。KtJS用回调链表实现「深先求值」和finally/defer域，而内核sched.c、LuaVM和Go用更好寻址的4K栈，这是取决于Task的并发个数、递归层数， app层都协程，框架引擎还需要用线程池就成了啊！ 就像py和GTK都是Rc引用计数，但malloc需要内存池啊
  - 😓：有问题的是「同步异步」撕裂。没人提这四两拨千斤的 `curl.then(unzip).then` 和 `Promise.all([])` 封装，3层回调还不是地狱？`thread2.join` 又是哪像 `make -j2`？ 安卓上 `sleep(1s)` 你敢调？不得和js.alert那样卡死。 景德镇出来的，牛B词儿太多欠封装了，主循环，关我何事。new个回调，破事真多。
  - 🤓：
  - [Scheme解释器](https://www.yinwang.org/blog-cn/2012/08/01/interpreter)没协程和cell的概念，毕竟她从不考虑优化 `async()=>await(rand()? '闪电五连鞭' : sleep(1))`, `sum=A=>(1==1)? (B=>A+B) : cry('天塌了,CPU能算错?')`, `f=obj.f; f()//找不到原型链`
  - 😄：圆括号神教，啥时候变反面典型了，nerd不喜欢「简洁but不简单不scale」的东西吗？ 你们喜欢留真心求知的读者在深夜凌乱
  - 🤓： **make it work, code it work, then make it fast. 不要看他怎么写，猜他怎么想。有why才真懂how，有reason的开发自然correct** #码哲
- 5.0 废除JVM式的参数栈，用寄存器做运算，函参API沿用push，也即 `luaK_dischargevars` 算法优化
- 5.1 十年前纪念版
  - `a,b = ...`; VA_ARGS 无需{}来模拟，kwarg和js保持一致
  - `(--)?[==[ [[heredoc任意嵌套&多行注释]] ]==]` Wiki语法
  - 😓：刚说「深先求值」？ 哦对， `eval('1+(2*3)')` 是深先数重写(树重写)，有用 `['farg'].map((k,i)=>env[k]=arg[i])` 实现「Dynamic Scope」
  - 🤓：CS称其「树的后序遍历」「SDT之综合属性」，快想想最有趣的点！bash和Lua里 `0&&print(包括or)` 是空，这叫「传名调用」求值序。Lisp的 `[cond (A) 爽 (B) 更爽]` 函数就是靠这来模拟宏
  - 😓： `@autoclosure` 嘛，低性能。 `IO ()` Monad 就是拿回调链表伪装纯函数-美其名曰fmap，和Lisp的CPS半斤八两 *（注：读书遇到生词折个角，很快要跳转回填的！）*
  - 🤓：等等， `['farg'].map{env.k=v}` ? 应该是在分词时就搞清farg是$1号局部or全局"farg"，仿佛有N条线把'farg'们的slot都连在一起，像电路那样直白！
  - 😄：`{k:v}` 的出现让编译器开发更低幼了，「解释器开销」其实是KV和递归这些高层结构的开销。 变量名只是助记符，malloc地址/栈分配/偏移编号/ret地址 才是本质。如果解释器都用链表手写Map.get禁止set，没人会再拿函数传参当传{}。这就是Luac
  - 😓：没礼貌和不高兴，你俩别聊了， 我用这俩法做了demo，都有bug！  `f=(A)=>A+1; A=0; f(2)==3` 后A居然被改写了，我换🤓的方法虽然OK，但在上文的 `sum(1)(2)` 一例竟输出了4？ 1+2==4 ！
  - 😄：没错啊 `sum=A=> B=>env.A+B` 该得4，另外，我的方法需要有 `val=(e/*单值*/,env)=>e.id?env[it] : e.call? val(e,{__proto__:env}) : e.lit? ..` 这样的层叠KV，你想啊，那是调用「栈」呢
  - 🤓：我希望你在解析 `load=(s/*字面流*/,fenv)=>e.id&&(e.等号左? fenv.新局部() : fenv.局部或_ENV(e.id)) or e.lit ..` 时就编好号，对重名左值要报错，别“变量遮蔽”。另外，再读遍 `class sum(A){..}` 那块吧
  - 😓：有种 `2^8=xor(2,8)=0b1010` 的美感。闭包是私有化的对象，SAM接口，IntRef，原来如此！
  - 😄：Java设计模式「抽象Factory」里就有闭包。为 `grep -oE '^#'` 他们写 `InStream().FilterInStream {it[0]=='#'}` 。许多时候class只是{k:funV}，让 `override class D2(xy).Rect(wh)` 像覆写fun那样自然，少加重复的命名传参，正成为主流。
  - 🤓：对了，😄你又不是nerd专家，没黑框眼镜，为啥抢在我前面当「语言律师」
  - 😄：那我是freak，看我的头顶。 不用高知的口吻，就不会说话了？ 知识就是知识，不要用别人的对错，搪塞自己的取舍和求知。 #码哲
  - 🤓：原来，我们普通人和Lua的作者一样都是「天材」。学者生而平等，只是有自己的个性选择；这无关对错，而是旧知和新知。 **我们不需要靠圈子的符号来包装自己，成为他们的复读和附庸。 失口为知，不失口，怎始口？**
  - 😄：往常，我是说往常，知识不能被1:1传达。这种变异若是“天”择，便成了八股和鄙视链。 这种变异若是人择，便不成功，也成人之美。 没礼貌者，正是对前者：我认真理，我不认真。 我不当[套子里的人](https://www.thepaper.cn/newsDetail_forward_15633677)，不说套子接的字的句柄。它是双管道库启。
  - 🤓：长衫可以脱，这熬夜攻读和刷题的烙印，咱简中人没法破茧而出。我那么刻苦，按Lua三作者的源码一词词摸索赏析，你随便一句「真理不认真」就把我的天才赶下神坛。 我和那三人资质一样，我却写不出Lua吗？我心理该如何平衡？
  - 😄：对于无回报的努力，我们总说「天才」「运气」来给自己上价值。仿佛学鸟了，从吃灰的书堆里挑一本，便成了暴发户；却实在无休无止的“刻苦”中搞丢了自己的天材，赢了比赛，当了人牲。 Dijkstra说，他不懂为何简单与美的算法都如此高效？ 或许我们该用[「经济」的直觉算法](https://t.me/dsuse/19978)投资学习、分工、挑选、联合，在务实与务虚间找到坦荡与平衡。 别学晕了自己，也PUA捧杀了别人。
  - 😓：其实…最正宗的工程师文化是「有头脑，更高兴」。 [Ierusalimschy在论文（感谢spin6lock翻译）中](https://github.com/spin6lock/the_evolution_of_lua_zh_CN/blob/master/the_evolution_of_lua.md#51-----lua-1) 对Lua初创时的个性和试错直言不讳、对贡献了协程和Upval的「无名之辈」不乏赞美，这种宠辱不惊的定力，正是某些重视形式的人所匮乏的。 啥样的土壤开啥样的花，积累多重的果；对不知reason只懂how的问题少碰多等，复杂性自然就小了。
  - 🤓：……分工？ 那需要一个个分化的动态环境吧，也就是：函数导包！
- 5.2
  - 自由变量指向 `_ENV`, `_ENV ??= globalThis` (5.1非 `const,arg[i],nonlocal[i,j]` 的变量名即全局键, 现在改成"this键", 以实现模块)
  - 5.1基于setfenv()的 `module("pip", package.seeall)` 被node风格模块 `local pip = {}; function pip:list; return pip`.. `require'pip'` 消灭
  - `coroutine:yield()` 可以在try{}和元方法(pcall,Proxy)里返回，此魔法比 LuaJIT/CoCo(用户态线程)聪明。
    - 不允许等lua_call()返回，因为C调用栈会丢失yield后then()回的位置，全部用 `L.callk(0,LUA_MULTRET,0, k);return k(L);` Kont即回调。在L栈上的函数未休眠时直接k(L)，否则longjmp(throw)。
    - 😄：yield或许很难理解，请你叫它 `sleep(sec=random())` 或 `dieWithCallback(f=> looper[0]=f )`
    - 🤓：以防你不知道，王垠的【40行代码】CPS 就是这种东西的编译期优化版。实现while{yield}并不简单，但在Lisp里一般用伪递归tailrec(改参goto0)和unquote宏(eval串留字面)做，因此Lisp可以说是元编程祖师。 在「内核油猴」BPF里，通过强制while为 `n.times do{}` 的形式消灭此类分析，也挺聪明。
    - 🤓：Lisper 还有更牛的，yield 只是 call/1cc ，callcc 可以实现fork()、可恢复异常、函数断点续传到N台机上算(workflow序列化)，等等，不过那样就没用处了(依赖注入即隐式传参可实现大半)。 Ruby曾经的 `obj.taint!` 能分析值涉及的函数，shadowJar则能爬清函数涉及的函数。只有Lisp的表示法，最方便揭示它们的原理。WASM选择圆括号。
    - 😄：和goto一样酷呗？ CPS的魅力在于无需「调用栈」等运行时，任何函数都能看清caller的结构。 `f=x=>x0?0:f(x-1)+1; ft=(x,y=0)=>x0?y:ft(x-1,y+1)` 的判别就易如反掌： `f(x-1, R=>r(R+1))` 显然不是伪递归tailrec。 nerd们觉得这超酷，图灵机啊，不可判定啊，让P=NP啦，和goto一样酷。
    - 😄：栏目答、码可揉、函续体，本就是三位一体。FP的 `enum{A(int)B(str)}` ADT正择也挺完备，可惜他们只忠于链表和回调链表的简洁，忽视了更简单的「约定优于配置」。 #码史
    - 🤓：有点道理。 软工软工，是懂汇编会背书的少才组成的体系；如果编译器优化和语法糖只是 make CPU happy，忽视问题集和API的本源逻辑，我们已自相矛盾。 白魔法里有黑魔法，当心权力里的阴影！ #码哲
  - 垃圾收集器（GC）增加了分代模式，LuaJIT未跟进，因为使用了v8的 1bit pointer|float tag 优化！
  - 🤓：Rust::`Option<()>` 同款呦！ x64地址总线有40bit，万国码即UTF32有21bit，浪费了{24,11}位，许多语言拿它来存typeof甚至strUmbra长度。按CBOR的编法3bit就够 `enum JSON{A(int)B(str)}`..了
  - GC 支持了WeakMap(ephemeron table), >40b的str不再池化 
- 5.3
  - 新LL整数值域A~B `A=2LL^63LL; B=A-1`。越界回滚
  - 'bit32'库(与LuaJIT的64位'bit'割席)，不再需lightuserdata裸指针
  - GC不默认分代模式 `collectgarbage("generational")`
- 5.4
  - `local n const, x close = 1, {__close = (x,err)=>}`
  - `1 + "2" ==3`, 基于运算符重载 `x=""; for k,v in pairs(getmetatable(x)) do print(k,v) end`
  - 采用C99 computed goto, for int 等新魔法，2D数组的性能提升达1倍
  - 😓：对了，谈那么多闭包对象、回调链表的事，await 怎么靠 `f=co.wrap{yield sleep()}; z=f(); co.resume(f).then` 实现
  - 🤓：给个DuktapeJS的实例呗 
[▶️播放](https://duktape.org/dukweb#main%20%3D%20async%28function%20%28arg%2C%20aw%29%20%7B%0A%20%20print%28aw%28txt.bind%280%2C%22你%22%29%29%29%3B%20%2F%2F别忘了bind是SAM对象%0A%7D%29%3B%0Atxt%20%3D%20async%28function%20%28s%2Caw%29%20%7B%0A%20%20aw.ok%20%3D%20s%2B%27没睡呢%27%3B%0A%7D%29%3B%0A%0Afunction%20async%28f%20%2CMe%2CR%29%7B%20return%20function%28%29%20%7B%20var%20a%3D%5B%5D.slice.call%28arguments%29%2C%0A%20%20CONT%3Dco.resume%2C%20ok%3Da.pop%28%29%3B%20%2F%2F回调链表尾%0A%20%20function%20HUP%28f%29%7B%20return%20co.yield%28f%29%20%7D%0A%20%20function%20go%28R%29%7Bvar%20r%3DCONT%28Me%2CR%29%3Breturn%20%28void%200!%3D%3Dr%29%3F%20%28r.call%3F%20r%28go%29%20%3A%20r%29%20%3A%20ok%28HUP.ok||HUP.ko%26%26Error%28HUP.ko%29%29%7D%0A%20%20a.push%28HUP%29%3B%20Me%3Dnew%20co%28starmap%28f%29%29%3B%20return%20go%28a%29%0A%7D%7D%0A%20%20co%3DDuktape.Thread%20%2F%2Ff%28*%5B..%5D%29%2C%20和%20import%20threading%20一样传argv%0A%20%20function%20starmap%28f%29%7Breturn%20function%28a%29%7Breturn%20f.apply%28this%2Ca%29%7D%7D%0A%0Amain%28%5B%5D%2Cprint%29)

```js
main = async((arg, aw)=>{
  print(aw(txt.bind(0,"你"))); //别忘了bind是SAM对象，可保存 .gi_frame.f_lasti 行号
});
txt = async((s,aw)=>{
  aw.ok = s+'没睡呢';
});

async=(f ,Me,R)=>(...a)=>{ let
  CONT=co.resume, ok=a.pop(); //回调链表尾
  HUP(f){ co.yield(f) }
  go(R){var r=CONT(Me,R); r.call? r(go) : (void 0!==r)?r : ok(HUP.ok||HUP.ko&&Error(HUP.ko))}
  a.push(HUP); Me=new co(starmap(f)); go(a) //注意，回应式编程没有返回值
}
  co=Duktape.Thread //starmap=f(*[..]), 和 import threading 一样解构argv

main([],print)
```

- Lua 5.5
  - 🤓：还没出呢！你是想自立门户不成？
  - 😄：你马上就知道了。 我是想问问手写了 `__awaiter` 的智库啊，Does it run backwards?
  - 🤓：？！
  - 😄： `def:yield` 很好理解，`cat|grep|less` 的行缓冲区就是，PyJS支持很好。它本身又如何用await实现？
  - 🤓：有奇思妙想建议查查C++术语就服了。yield给到.next()的caller是上下级协程，`await Promise(ok=>给到回调注册)` 是对称协程，什么杂七杂八的[蓝红黄“函数染色”](https://www.whexy.com/posts/func-color)， 是有栈协程/回调链表协程甚至语法糖也， 什么Context/Dispatcher是依赖注入和线程池配置，Scope是模拟finally{共同exit}用的。背压是write不需await写比读速慢占爆，双核机开make -j8 导致切来换去更慢，和拿4K页swap“下载RAM”更慢的原理一样
  - 😄： Talk cheap 收收code
  - 🤓： ReactiveX.io 自己去看，Emitter流 onNext onDone ，Compose的Flow用的这玩意，只比React.State少保存个当前value 多个onErr
  - 😄：本书不教这些？ 好吧，以上就是闭包、协程、模块化、元编程的全部解说了，咱还谈了「Dynamic Scope」和一点微小的感悟

未解之谜：
- 表下标或者 userdata 的静态方法使用(.)，"a".."b" 使用(..)，vararg是(...)，正常调用需要 obj:f() !
- it,err=fetch()，被滥用的多返回值，是没学过 `T? or T|Error` Optional&Result类型吗？
  - 布尔&错控还有更下头的判法，和JS的 `Array(1e5).map(u=>NEVER)` holey、Go的分类型nil、C的\0结尾str如出一辙：
  - Lua a={1,nil,3} 里的“空”会导致 `for i, v in ipairs(a)` 早于`#a`(4) 终结！
  - 幸运的是，pairs(a) 和 `for i = 1, #a do` 不这样， `false, ngx.null, cjson.null` 现在是nil，而 `a[2]=undef` 规范化了nil (<v5.4)
  - `nil,false and print()` **是假值不会执行，这有意义，让它干扰列表处理+vararg，很蠢。** 这并不好笑。Rust的 `()`=Unit=void 才算致敬LISP，C++的 `std::list<T>` 以很丑的命名cue了这个「链表处理中语言」 #码史
- 下标从 1 开始，其实写多了也能习惯，但只要你索引一个 ffi.C 数组……
- 提前返回也只能写 do return end，和kt的 `val it=fetch()?.body ?: return "curl fail"` 有云泥之别
- repeat…until比continue还有用，因此提前return的 grep -v '^#' 不得不写成 for in do if then...end end 甚至 goto next ::next::

## 本书的语法改良

> 针对过于冗长的 `local function do` 和单调的 `if or for` 块、既不JSON也不够C的 `Pair{A,f"A={A}"} / Col2{.B~=1}` 字面，做了简化

```lua
-- 词法
x = -(y) if kebab-case-小不忍则乱大谋啊
1\=1  if '对仗\n'
f"以f开头均使用{ES6}模板字串" == f({"以f开头均使用","模板字串"},ES6)
-kst {YY=true,NN=false,NO=json.null, oo=1/0, pass={nil}} --kv和ret里没pass,ary里没NO, nil=delete

-aZ {"not" "too"}
aZ -1 "fast~"
aZ(1)(1) == "n" -- 是的，没有类型推理，您必须以 a,aX,a1, nums 这样的变量名调用才能忘记故作深沉的 push_back/append/concat
aZ(1,NO) -- 参2不能以a开头，但可以 a -1 {42,'.',1};a[-1]=[#a-0] 宏展开
-extend(2,) { table.move(B, 1, #B, A, #A + 1) }

kst -As {
  -YY : not u
  -NN (u,) { true }
  oo: pass
} -- 函数式赋值，别问为啥不纯，这是对着k:React.useState(v)抄的，它比PF更FP （本语言不会引入Signal响应式）
kst.oo==math.huge
user -As {
  -user.id 2
  -重开.age 1 -- 只有\.(.*) 视为键，这样方便您重构&测试
}
-- 赋值和判定块, pass有点类似void 0
-n #{1, 2}
-say pass
  if n\=0 { "isEmpty not~" }
  or fallb { fallb }
  or { cry("=falsey like nil, has msg,err=",0x404e) }

-- ifor运算, 不可变与健壮
-user {-id "Amy" -age 20}
-vs {.id="Amy", .age=20, [ [[k/v/.b4]] ]=3}
pass user
  if u.age>18 {}
  or u.age>10 {}
  or u.age<0 not {} --or{NO}

http":url" or{cry("fail")} { -- or"fail" { 配合 f!(x) = pcall(f,x) or{cry("(原报错msg)")}
  body if {u+"不空"} or {f"是假值={u}"}
  isOK if({"错误","成功"})
}
pass () {
  inc -i 0
  if (pick -YN) { -i i+1 }
  -i: u+1 -- 实在不想写 -x if{u} 宏。Lua的流水帐keywords和定义式编程有仇……
  -fs DAL("/$fs/tmp") cue
  fs -o 'a.txt' 'good'
} -- cue变量随do域一起关闭, inc -i 允许重赋值

-- fordo函数, class模拟
-A {-1 2 3}
-B pass A for(n,) { pass if n>0{n} } --or{NO}
pass user for { f"{id} ({age})" }
-- 我们区分单句/算式位置的 pass(x)? for|if 来实现 forEach/mapNotNO, 或模拟 py.match: kt.when(val A=){A?->B;}
mapAs {user} (_,){ f"Amy ({_age})" }
-f(x,) {x+1}
pass fsql"SELECT 1, 2" for(2,) { A+B } -- bash式参数!
-- 其实 do=栏目答(改ENV?), for=mapAs+do内联, if=默认参(u)+for, 没错：迭代亦判定、判定亦错处，不分对错单多 #码哲
-- x for|if 若 rawlen(x)==-1 则不索引LOOP一次, falsey零次, v=x if{} 就是 v=v1=NO; if x{v1=..}; v=v1

--计算器·改！
{1 2 3} for(x,){pass x*2 if u>4{u}} -sum (2){A+B} 0 --管道|>只是全局函数
-sum(A,f,x0) {
  inc -ac x0
  for x in A do ac=f(ac,x) end
  out ac
}

class {
  -Pair(A,B){}
  -Tri(A,B,C){}
  -inc(A,__,B=+oo){} -- 请注意，__之前的默认参数被(){}视为typehint忽视。 2int可被压缩为1long，这类需求，让普通函数调 _int(0xAA_BB) 就成
}
class 'Pair' {
  -swap(_,) {Pair(_B,_A)}
  -B(_,B,A) {Pair(A or _A,B)}
}
Pair{1,2} if {
  -eq21 u -swap
  -eq12 u -B('1')(2) -swap
  --vs u.B('1',2).swap(); 我确实可以像_A那样，令 u.f=u:f, T.f=T.f 但算了，毁灭吧。真正的OOP， **单参方法赛高！**
}
-tbl Tri{
  1,2,3,
  'a','b','c',
  {-(Pair){666,233}}
}
tbl [3]A pairs [1]B==233
tbl [2]C=='c'

-o Proxy({}, {get:{x=1}}) --getmetatable并赋值
o.__proto__.x == 1
pass() {
  -OS chop {
    -Pair.T.swap(_,) {Pair(_A,_B)}
    -- class 'Pair' {同原理}
  } cue
  Pair{1,2} -swap --不翻转了, AOP refine! 别在协程里用
}
con [[
  lu json:j io math:M coro-spawn
  io 仅lines
  coro-- fs net
]]
--标准模块 demo.lu
-m {}
-m.greet(name,) {f"Hi {name} from (?) !"}

out m
```

con读作「扛来可忑」，Lua里没有子包的概念(`__init__.py`, javax., PIL. Image ImgDraw..)，但左值仍不能以'.'结尾，'io'包重复会报错

我们叫她 Runar.lu(るな路娜er)，她是Ruby(路彼)的闺密。这便是本书送给你「比原理更重要的东西」： 追求原理的动力！ #码哲

你可能想吐槽，「`export function greet(){}` 之流虽是凑字数，但能被主流工具链静态分析优化，笨蛋！」。 好吧，Runar 会是一门「在运行期编译到js」(runtime codegen) 的语言

这种技巧被我称为[「eval串留字面」](https://github.com/duangsuse-valid-projects/TkGUI)或[TDDc Test Driven Direct Compile]。其实Java和C#经常这么干！ bytebuddy.net 就能够模拟安卓Xposed，实现Proxy即delegate如 `IFile by url{override ..}` 的字节码框架。 [lang.invoke](https://lanlan2017.github.io/JavaReadingNotes/b20bb69e/) 和其JIT大大方方地在运行时，多次篡改“源码”

禁止 `for x in"ABC": class(x,{run:()=>x })` 或 `class Apis: for x in"ABC": vars()[x]=lambda:x` 才是错写漏写、类型标注不完全的根源，是架构师的瓶颈，不对吗？

```kt
import java.lang.reflect.*
import kotlin.Array
interface Api {
  fun posts(tag:Int)="?"
  val ver get()="HOOKME"
}

typealias Gen<A> =Method.(A?,Array<Any?>?) -> Any?
fun <T>Proxy(by:Class<T>,u:T?, g:Gen<T>) = Proxy.newProxyInstance(by.classLoader, arrayOf(by)){ _, f, a -> f.g(u,a) }
inline fun<reified T> Eval(noinline g:Gen<T>):T=Proxy(T::class.java,null,g) as T

val u:Api=Eval{A,ar-> ar?.let{""+listOf(*ar,"-${ar.size}$name")} ?: name}

u.posts(2) eq "[2, -1posts]"
//试试编写 infix fun eq 和 SAM<Runnable> {1} 代理。当
```

但TDDc也并非单纯给「eval串留字面」。你应该听过Python2的一个梗， `True,False=False,True` 后新def运行正确，调用旧函数却崩了，这说明只要 `override operator fn` 足够多，编程语言的语意可以天翻地覆，是佯装成「别人家的语言」，是嵌入0尖括号版HTML(vanjs.org)，是在GPU上计算(numpy,taichi-lang.org)，或是被“SQL注入”…… DSL考验的不是算法，是你的需求和想象力。 今天前后端和安卓的“魔法”，远远不够，而类型体操，搞错了方向。

就像 `await www.baidu.com ({wd="酷壳"},'/')` 和 `"查真资料(void) { https://goog.le;\n goto https; }"` ，当你真懂语法，知道 `cout<<; printf("%d",1)` 也只不过是同行的作品，你才能明白元编程和PLT的reason。

无需parser或算法/函数式特技，您可以阅读 [运行即编译，TDDc就是Visitor]。长话短说，把 `x=Pair(1,2); x.B.times(n=> dd=n.十(1))` 里的2变成 [2,'x.B'], 无论是生成 `while(x.B-->0) dd=x.B+1` 或是将函数体变成「别人家的语言」都易如反掌，这才是TDDc

## HOLPful概念

- sikxfaned久类型: str idx kv any fn ary nItem eTree decimal
- bcd1248: C数值，byte char floats
- BYGRP: 解析器高亮，蓝黄绿红粉💙🦐💚🥓💓
- BBop: `operator fn` 按深先浅后排名， `lit字面|var变量名, As() Sa.[]^, Not, Xノ(kana:no) RemLt%, 十一, Lt< Gt> XLt>= XGt<= , Eq== Ew~=, And, Or`
  - Lua还有 neg- n# vararg.. 和位运算&| shl<< shr>> ；这些术语在 `Proxy(x,{Sa=__index})` 里自动翻译，书尾用它们做2D几何游戏。

bcd=|1|2|4|8
-|-|-|-|-
Byte|`0xb1`|short|✓int|long|✓ssize_t
Char|✓uint8|u16|u32|u64|uintptr|u128|'\U.{8}'
Decs|||d4|✓double

本书变量命名均使用久类型，C数值结构体均使用0xbcd。 #码哲

## 源码树对应于命名前缀

```
luaA_ - lapi.c  - Lua API. Implements the bulk of the Lua C API (lua_* functions).
lua_  - lapi.c/h + luaconf.h
luai_ - luaconf.h
luaopen_ - luaconf.h + libraries
  luaB_ - lbaselib.c - stdlib
  ldblib.c, debug.c
  liolib.c, loadlib.c, loslib.c
  lstrlib.c, ltablib.c, lmathlib.c

luaC_ - lgc.c - incremental garbage collector (memory management)
luaD_ - ldo.c - stack and Call structure of Lua. Handles function calling (luaD_call / luaD_pcall), growing the stack, coroutine handling, ...
luaE_ - lstate.c - global state. Includes functions for opening and closing Lua states (lua_newstate/lua_close) and threads (luaE_newthread / luaE_freethread).
luaF_ - lfunc.c - auxiliary functions to manipulate prototypes and closures
luaG_ - ldebug.c - debug interface. 
luaH_ - ltable.c - Lua tables (hash)
luaI_ - lauxlib.c - defines the luaL_* functions
luaK_ - lcode.c - code generator for Lua. Used by lparser.c
luaL_ - lauxlib.c/h, linit.c (public functions)
luaM_ - lmem.c - interface to the memory manager. This implements luaM_realloc / luaM_growaux_, which wrap the memory allocation functions.
luaO_ - lobject.c - some generic functions over Lua objects. Includes datatype <-> string conversions, raw equality test (luaO_rawequalObj), and log base 2 (luaO_log2)
luaP_ - lopcodes.c - opcodes for Lua virtual machine. Defines names and information on all opcodes (via tables luaP_opnames and luaP_opmodes).
luaS_ - lstring.c - string table (keeps all strings handled by Lua)
luaT_ - ltm.c - tag methods. Implements accessing metamethods from objects.
luaU_ - lundump.c - load precompiled Lua chunks. 
luaV_ - lvm.c - Lua virtual machine. Executes bytecodes (luaV_execute). 
luaX_ - llex.c - lexical analyzer. Used by lparser.c.
luaY_ - lparser.c - Lua parser.
luaZ_ - lzio.c - a generic buffered input stream interface.
```

# 编程语言：从计算器开始

## 难度测试：步骤计算器、配括号改字面、猴语言VM

```py
# 匹配左右括号 paren
_c01 = {'(':')', '[':']', '{':'}'}
def eat(s,c1):
  for c in s:
      # 如果是左括号，就把它压入栈中
      if (c1:=_c01[c]): ifErr='行号'; eat(s,c1)
      elif c==c1:return # 如果是右括号，左括号便与之匹配
      else: assert'','多余项而栈空' #仅支持纯括号文本, 否则要_c10,反向
  assert c0=='eof','栈尚不为空'
```

## 从stringify和parse学择深

无论我们构造哪种程序，都必须先穷举它所处理数据的结构和边界情况，代码是流动的数据，内存是凝固的函数。

因此，想load某种格式，你得先dump它，从浅显遍历程序的结构获取直觉！

JSON递归下降解析器，和语法就是一一对应：

```ini
JSON  (S|D|{S:JSON ,}|[JSON ,]|true|false|null)
S '"' ([^\\"]+|\\Esc)* '"' #G-
Esc ["\/nrtfb]|u hex{4} #Gk

D num (.int)? ([eE]int)? #Bn
num '-'? ([1-9]int|[0-9])#Bn

hex [0-9a-fA-F]
int \d+
ws ' \n\r\t'*
# ws:每小写符号前要跳空格， #高亮tag 内禁用
```

(int ,) 表示 int (, int)* ；其他均是[正则符号](https://regex101.com/library/tA9pM8)，这些模式都是90% C-like 语言里共享的，你懂的

您可能好奇
- 为啥S值不能和TOML.io那样免引号？
  - true和emoji等“非变量名”的判定可是个大问题。
- `{"这里也不行": }` ？
  - JSON发布时JS语法还没加 `{"Brendan Eich": 0, "":1}` 乃至 `{[1+1]: 2}`
- D值为啥限制_1to9起始？
  - chmod 0644 是啥？试试 `[...0644.toString(2)].map((u,i)=>u==0?'-': 'rwx'[i%3])` ，这是8进制(2^3)的唯一用途，它不如2位16进(16^2=2^8)
- JSON.org为啥用 `ws ""|'\u0020' ws` 这样奇怪的 BNF schema
  - 左递归表重复+顺序匹配。 [PeggyJS.org](https://ohmjs.org/editor/) 用它做Web计算器 (链接没坏，点点看。莫求甚解记得回来！)
  - Lua用逆波兰读运算链，更快
- 1e2 是100，咋算？ 
  - `1*Math.pow(10,2)` or 1*10**2 or.. `A=+("1"+'0'.repeat(2))`
  - 可优化A=StringBuilder().push('')： `[...'123'].reduce((A,u)=>A*10+ +u)`, `unfold(123, (A,u)=>(u(A%10), A/10 >>0))`
  - libc和base64是这么做的。嗯哼，位运算。写下unfold吧
- JS字面比JSON多了啥？
  - 0xCAFE_BABE, +inf,NaN,1e-2, 注释和尾逗号
- 我想找更易学、空间效率更高的JSON
  - BitTorrent/BEncoding： `X=i(N)e|N:Hex|[ld](X*)e|[tfo], N=[0-9]+` ，这就是全部： `l3:abci123ee` 。3:abc 规避了大小端、\0|"结尾的 `Escape(%20,&lt;)` 问题！
  - CBOR.me: `byte0=0bT{3}N{5}; T0~7=N-hsaked`, N:+立即数, hex:尾随Nbytes ，基于大端bitfield压缩而已，不展开讲
- rapidjson, SIMDjson 快在哪里？
  - 向量化，1指令跳N空格。 后者会预筛 `\"` 等边界位置，强制SAX的pull模式：单次遍历免GC
  - Visitor模式也可以pull，叫啥之algebra，这类术语文尾我会表格出，文内我不容忍这类含糊其辞的命名。
- 😉咱不讲Lua了，这算跑题吗？ 
  - 先学会跑，你才能飞得更practical。 读书不是当Luac那种one-pass编译器，**和原创者「共同面对问题」你才能消除代沟，而不是复读他附庸他。** #码哲
  - 从PLT&DSL实践讲，树结构的分析处理，触类旁通，且有简繁先后。 别内卷，勤学，提好问！

## AST递归兼VM流水线的根基：结构体共存体

```js
data Val=L Int|Op Char Val Val deriving(Show)
(Op '+' (L 1) (Op '*' (L 2) (L 3) ))
```

# 编程非算术

```js
1+2*3
十(1, X(2,3)) -7

十=(A,B)=>A+B
「前缀式polish notation」，是Lisp的国是
教个小诀窍：js里函数只是一种字面常量，可以被for生成
Object.entries("十一Xノ").forEach(([i,x])=>
  this[x]=eval(`(A,B)=>A${"+-*/"[i]}B`))
```

再看下「解释器interpreter」比计算器强在哪： 能够“在调用时传值”，也就是要有 argument[0] 这种“环境变量”
很厉害！现在有常数外的“语法”了，有变量了，高阶了！或许你需要学动态作用域(原型链?)、调用栈call-ret、惰性求值如&&|| blabla，还有深不可测的编译优化呢！
不就加一个箭头么。

```js
十=(A,B)=> (env=>A(env)+B(env)) //十,一,X,ノ.. 现在知道为啥该用for宏而不是键盘生成函数？
Lit=x=> env=>x
Arg=i=> env=>env[i] //PHP写作 $x, 模仿bash的$1~$*
Fun=(n,f)=>f(Array(n).fill(0).map((x,i)=> Arg(i)))
```

env被称为运行时，它可以是JVM, import dis PVM或者别的bytecode解释器，这能减少tree.walk对递归栈的频繁依赖
这种 `formSytanx.bind(consts=lit/arg/global/Types..)` 的"部分传参"函数，称为编译器，而它的返回就是classFile等类型。 

编译器并不需要与DSL这些技巧隔离：如果我们把 env=>x 写作 JSON(x) 而 env=>env[i] 写作$i ，既 `Lit=x=> gcc? CBOR.dumps(x) : (env=>x)`
以这种人类或机器可读的结构，序列化一些函数被"bind"到的lit，就得到了对应的代码。jvm的 `lconst 1, aload_0 this参数, iadd (AB->C)` 甚至是(Dexer/AOT)自动分配参数寄存器的！

如果你乐意，还可以支持基于全局表的递归 `fib=f(x)=x<2? 1 : f(x-1)+f(x-2) `
这一切，都不会突破以上的定义框架。 If 不会，Call(f,x-1) 不会.. 这就是java的反射嘛。

我看过许多“编译原理书”，他们连这个=>都写不明白。 更何谈[用Visitor实现(正反)序列化](https://t.me/dsuse/19808)……

## 扁平读写AST：逆波兰字节码

## 卷王，跑下分

## 一遍过vs编译并rustfmt

[Visitor树解构 OR 函数字典pull事件-零拷贝](https://zhuanlan.zhihu.com/p/163762783)

[纯预处理宏ML99](https://github.com/hirrolot/datatype99?tab=readme-ov-file#usage)

```kt
/*
datatype(Calc,
  (A, int),
  (Op, Calc*, int(op)(int,int), Calc*)
);
*/
interface Goes<out T> { fun go(): T }

sealed class Calc: Goes<Int> {
  /* A literal */
  data class A(val n: Int): Calc() { override fun go() = n }
  data class Op(val a: Calc, val b: Calc, val op: Int.(Int) -> Int): Calc() {
    override fun toString() = "($a ? $b)"
    override fun go() = op(a.go(), b.go())
  }
  companion object DSL {
    operator fun Int.not()=A(this)
    infix fun Pair<Calc,Calc>.go(f:((Int,Int)->Int))=Op(first,second,f)
  }
}
val c = Calc.run { !1 to !2 go Int::plus }
c.go() //3
```

```kt
interface Goes<out T> { fun go(): T }

interface TrimCalc<out R> {
  fun Tr(e: Calc.A): R
  fun Tr(e: Calc.Op): R
  //上面是闭包版，零拷贝版是 fun Op(a: Calc, b: Calc, op: Int.(Int) -> Int): R
}
operator fun <R>Calc.invoke(u: TrimCalc<R>): R = when (this) {
  is Calc.A -> u.Tr(this)
  is Calc.Op -> u.Tr(this)
  //如果 Calc 不 sealed, 这里得加 else -> throw Error("impossible") as Nothing
  //一般而言，因为OOP默认对 arg0 dispatch(子类型override+overloads)，不会手写这外挂Visitor而是连 sealed enum 一起生成
}

```

## 活学活用：sexp脑图、高级搜索语法、真·步骤计算器

```js
sexp=s=>{let a=[],x;for(;(x=s())&&x!=')';)a.push(x=='('?sexp(s):x); return a}
//^ 一般需配对')'。此省行数
sexp=(s, a=[], f=()=>{let x,i=0;for(;(x=s())&&x!=')';i++) {x=='('?f():a.push(x)} a.push(i) })=>(f(),a)
//'(a (b c) d)' 换RPN [a b c 2 d 3], 可显示步骤

tok=(cod, s=cod.split(/\s+|([()]|\W+)/).filter(x=>!!x).values())=>
 ()=>s.next().value

optab={[';']:-1}
"=;+ -;* /".split(';').map((a,L)=>a.split(' ').forEach(x=> optab[x]=L ))
exp=(L/*evels 大则深,紧 */, s/*字面流: x单项 o算符 xo..*/, ord=[])=>{
  let o,x=()=>add(Number(s())), add=(x)=>ord.push(x),
  at=O=>{let A,B; x()
    for(o=s();(A=L[o])>=(B=L[O]);)if(A!=B)at(o); else{add(O);x(); O=o;o=s()} add(O)
  }
  ord.Sum=(f,a=[])=>ord.forEach(x=>a.push(x.substr? f(x,a.pop(),a.pop()) : x))
  at(";");return ord //逆波兰算符重排
}
(e=exp(optab,tok(prompt())) ).join(' ')
//如 1*2*3+4 '1 2 * 3 * 4 + ;' 令12*=[*1 2]，遇到相同深度追加，否则内嵌可。
e.Sum((f,A,B)=>f==';'? A : eval(A+f+B)) 

//import re 官方示例
RElex=kv=>{
  let re=Object.keys(kv).map(x=>`(${x})`).join('|'), mf=Object.values(kv),m,i,j=0
  re=RegExp(re, 'gy')
  return (s,ontok)=>{
    for(m of re[Symbol.matchAll](s)) ontok(
      mf[(j=m.findIndex((x,i)=>null!=x &&i!=0))-1](m[j]),  (i=m.index), i+m[0].length
    )
}}

_2sREP=RElex({
  '\\d+':parseInt,
  '[a-zA-Z]+':s=>s,
  '\\s+'(){}
})

```

## 排深，比花括号更深

# 解释器=计算器+str和varNameBind

解释器和第一章的计算器，其实只隔3点：前缀树、后缀树、内存域。 从Lisp到JavaC，你会发现各界语言都离不开这三种结构。

[Lexical Scopes](https://bobi.ink/2019/10/01/babel/#:~:text=根据源代码的词法结构来确定作用域)

## 参数slot化、流控与回填slot，模式匹配

## 调用栈：异常和协程的魔法

[js2lua 的try-catch实现](https://github.com/PaulBernier/castl/blob/master/doc/try%20catch%20implementation.lua)

## 元编程

# GC=依赖图=树+硬链接减枝

## 雕虫小技：区间高亮、二进制间绑定

```js
rep=(txt,on, n=null)=>f(txt,x=> (x==null)?on(' '):
  (x.substr)? (on(x.repeat(n)),n=null) : 
  (n=x)
)

buildAry=(f,a=[])=>(f(x=>a.push(x)), a)

rnSel=(e,A,B,o=new Range)=>(o.setStart(e,A),o.setEnd(e,B), o)
rnHL=(e)=>
e.oninput=()=>{CSS.highlights.clear(); f(e.textContent, (x,A,B)=>{
  let on=tag=>CSS.highlights.set(tag, new Highlight(rnSel(e.firstChild,A,B)))
  ;(x==null)?0:
  (x.substr)? on('str') : 
  on('num')
})
  hout.textContent=buildAry(rep.bind(0, e.textContent)).join('')              
}


document.write(`
<style>::highlight(num) {
  background-color: #f06;
  color: white;
}
::highlight(str) {color:red}
</style>
<div contentEditable id=hl></div>
<mark id=hout>
`)
rnHL(hl)
```

[宽化大数]
[pcm解码](https://zhuanlan.zhihu.com/p/8955711051)

## Rc::shared_ptr、双指针对象、Hash预分组查表

## “蛋生鸡文化”：自举quine 

什么语言最好？这是一道主观题。 那什么语言或框架最快？看似我们能够客观得出Rust最快，CBOR比JSON快了。但涉及的环境变数太多，很容易被「图片误用」人为操作。要控制变量。

显然有种程序最易测试编译器是否完备： 它自己！ 这便是bootstrap编译，rust和gcc用它来自我测试。

[Quine 编译接龙](https://www.fxzhihu.com/question/30262900/answer/47877068)
