# 《重构Lua解释器》

Lua是一门类似pyjs、主打小巧的脚本语言，它支持Java编译不通过的 `if 1==1 then class{BE='Pair',swap=()=>Pair(B,A)}` 和 `co:yield(Async)` 一类函数范式。高动态和客制性，使Lua被腾讯游戏引擎+OpenResty+OpenWRT所青睐，并有了 [Luvit.io]/[MoonScript.org]/[YueScript.org] 等运行时和方言。

Lua被 neovim,wireshark,Lightroom,Androlua,AutoJS 等App作为规则引擎高频调用，其地位很像给JVM构建apk的Groovy、其后端模板EL、`@Spring(DSL)` ，但，Lua没安全漏洞，[它甚至能运行在内核里](https://github.com/luainkernel/lunatik)、[跑在单片机上](LuatOS.com)！

可见，「Lua生态」并非藉藉无名。如果说它比pyjs差在哪，那就是 `local do…end` 和数组字典结构较冗长混淆，但其效率和完备性，深受游戏开发者、架构师的青睐。

本书是 [《Lua解释器构建：从虚拟机到编译器》 ©2023 Manistein](https://book.douban.com/subject/36280421/) 的知识预备，__从前后端C算法开发常识，导向PLT(元编程理论)常识__；解析Lua所用的算法范式，手打一杯将代码字面语意，映射到js列表字典的抓娃TreeWalker。

Lua和PyJS的元编程技术有这样的对应关系：[NeLua.io]=Mojo、[Luau.org]=TSC/BabelJS.io、[LuaJIT.org]=[PyPy自举JIT](https://pybenchmarks.org/dont-jump-to-conclusions.php)、[metalua](https://github.com/fab13n/metalua/blob/master/README-parser.md)=[ESTree](https://tree-sitter.github.io/tree-sitter/playground)/Py CST/IntelliJ PSI。

若要在Web上体验Lua，或配置类似py的开箱即用环境的最好方法，请打开[Fengari.js](http://fengari.io/)和[Luvit](#标准安装)，它们提供了文件/格式/网络IO库。

> “业界总有两派程序设计方法，一派简洁大方，明确不堆砌缺陷，一派琐碎空洞，连缺陷设计都不明确——Hoare, 快速排序之父”

为啥非要构建Lua？ [CRuby,CPython,QuickJS](https://hellogithub.com/report/tiobe) 的源码有啥问题吗？ 其实，**无论你是想认识当代工业界 DSL(interpreter)|VM|GC 原理、OS或OOP架构本质，或是只做二进制|逆向Mod|FFI或AOP调用绑定，Lua都是top 1%的案例！🍏**

麻雀虽小，五脏超全，我初次阅读计算器[subexpr()解析](https://github.com/Tencent/xLua/blob/master/WebGLPlugins/lparser.c#L1069)时就学到了「科班的」 YaCC,LL1,[ANTLR+VSCode引擎](https://www.cnblogs.com/dtux/p/14885606.html) 与一众[FP函数式]解析组合子不会教你的速算法。 此法还可用于生成 HTML.h1~h6 大纲树、py的缩进块，本书都会实操 ——如果说Lisp和入演算是「语言之间的语言」，Lua便是「语言里的语言」了

如果您还不会Lua，请多看 [js2Lua](https://js-to-lua.netlify.app/) 和 [中文API文档](https://cloudwu.github.io/lua53doc/manual.html#6.1)。本书大部分链接都可视为资料站，而非孤立引用（初读可以忽略，但确实都是沙海淘金的资料）。 对Javaer和Pythonista，本书的元编程技巧也是通用的。 对序列化/依赖注入/接口绑定和 `@调用()` -例如 Gson,ButterKnife,DeepCopy 的幕后代码好奇？本书更附赠了实践方案。

目前，CLua的最新版是2024/1发布的 Lua 5.4.7 ，Lua 1.0 早在30年前的1993，诞生于巴西 PUC Rio 大学，语法上没什么变化，或者说，没py2to3那样重大的错误。

>“简明是可靠的先验，不是可靠的祭品。——Dijkstra，或许和Linus聊不来”

三位作者 Roberto Ierusalimschy, Waldemar Celes, Luiz Henrique de Figueiredo 均在Tecgraf实验室为巴西石油公司工作。Lua前身是DEL和Sol(西语的Sun)，为Excel类处理设计，Lua把JSON的ary|obj混合成了table，用falsey代表nil("数文表真空")，又天生支持C函数、树指针、协程，共5+3种类型。

Lua解释器是开源的，其输入Lua脚本却有两种形式: loadstr|chunk ，对应着 lparser.c codegen 和 lvm.c bytecode 解释器。 本书仅讨论str的形式，在末尾会教大家实现"JSON-spgjia六变量栈机"和反汇编器ChunkSpy的原理。 它俩覆盖了 JVM/Dalvik ART/Flash ruffle.rs 的基本操作。

和《Lua构建》比，《重构》的顺序和着重点差异很大。 下为原章节叙事：

1. 解释器的基本概念，也告诉你虚拟机和编译器的肝胆相照
2. Lua虚拟机的抽象，包括“带类型的指针”和指令循环(CPU cycle是1秒几G?)、内存垃圾回收机制、字符串和表，这也是Boost等C++er爱造的轮子。
3. Lua编译器和虚拟机如何交互，如果它们是def或class，调用签名和this变量集长啥样。
4. Lua编译器「纯手写」的词法分析器和语法分析器，如何边parse着就把Chunk字节码生成了。
5. Lua的元编程和设计模式，包括元表、Userdata树指针、Upvalue闭包、弱引用表和require模块
6. 一个俄罗斯方块小游戏，如何被dummyLua解释运行？

本书不提供图表，而是通过自顶向下、拆分代换、接口复用的「元语言」，定义万物，就像上面这样。

在显示本书大纲前，我希望您认真读完这3篇导论，再试下这3个玩具。 这些文章的作者在国内Java/C#/JS的元编程和调优领域是佼佼者，其真知灼见亦字字珠玑，他山之石，可攻玉也。

- [RednaxelaFX 如何区分解释与编译](https://www.iteye.com/blog/rednaxelafx-492667)
- [WASM MoonbitLang.cn 主创张宏波侃编程语言史](https://juejin.cn/post/7040037986699837453)
- [HW-PLLab 朱子润谈类型检查兼推导](https://zhuanlan.zhihu.com/p/634217295) (“数学”公式的部分不用看，[本文](#子类型断言)有覆盖)
- [文言编程语言](https://wy-lang.org/) (类似生成PDF的PostScript，基于传参栈，难点还是在IDE与设计美工)
- [草蟒和zhpy](https://www.grasspy.cn/zwdocs/grasspy-bible/chapter16_monkeypatch/)
- [一个OI生的Kotlin:kamet](https://mivik.moe/2020/tech/kamet-basic-implementation/)
- 读完本书后，您再关注这些公知，便有更深的理解：  阮一峰 廖雪峰 云风 陈皓 张鑫旭 鸟哥 编程随想, 王垠 [vczh轮子哥](http://www.cppblog.com/vczh/category/6824.html) clowwindy(SSR的原作) Barret李靖 Conmajia

卷王，跑下分

AST递归兼VM流水线的根基：结构体共存体

一遍过vs编译并rustfmt

解释器=计算器+str和varName

参数slot化、流控与回填slot，模式匹配

GC=依赖图=树+硬链接减枝

Rc::shared_ptr、双指针对象、Hash预分组查表

元编程

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

跟着Lua作者的脚步喵一眼「闭包」「导包」等特性吧，设计点都有「性价比」。 更加有趣的细节，会独立章节开讲。

- 1.1 VM优化table构造器({}字面)
- 2.1
  - 允许运算符重载如_index(`new Proxy{}{元表Dunders}, {}.__proto__`) 以竞争Java OOP
  - `Grades{8.5, 6.0, 9.2; name="John", major="math"}` 消灭了 `@()，@[]和@{}`
- 2.5 str库支持伪正则 gsub,find (实现 grep AWK)
- 3.1
  - VM尝试寄存器(=局部变量)化
  - 构造器的 `{[10*x+f(y)]=47}`
  - 引入了 Context *L，可沙盒并行多个上文，增强 ldebug 以竞争Java多线程
  - 字面 `sum=A=>(B=>A+B)` 等效于 FP `sum=A=>((upA,B)=>upA+B).bind(0,A)`, 即 **upvalue/upv, 术语为 nonlocal/cell var**
  - nonlocal 仨怪癖： Java里cell必须是 effective final，py里 ` [(lambda:x) for x in "abc"][0]()` 是c， `sum=A=>` 返回(close)前A在栈上，之后就不一定了，或许在堆里？
  - Kt用 `val upA=IntRef(0)` 支持mut捕获，Vue用更灵活的 `x=ref(0).value, watch(()=>x)`
  - 他们其实是想优化 `class sum(A=0) { invoke(B=0) { A+=1;return this.A+B } }` 这样的变量集关系(Lexical scope)，pyjs 在this和原型链上各有各的坑。
  - 其实 call stack 也是坑。thread异常返回栈、coro回调链表，当协程+多线调度成了主流，你会发现 协程=闭包+switch(var 语句号)： “局部分配”还存在吗？
  - [Scheme解释器](https://www.yinwang.org/blog-cn/2012/08/01/interpreter)没这概念，毕竟她从不考虑优化 `async()=>await(rand()? '闪电五连鞭' : sleep(1))`, `sum=A=>(1==1)? (B=>A+b) : cry('天塌了,CPU能算错?')`, `f=obj.f; f()//找不到原型链` 😄
  - **make it work, code it work, then make it fast. 不要看他怎么写，猜他怎么想。有why自然懂how，有reason的开发自然correct** #码哲
- 4.1 支持false, 沙盒已解决"GIL"问题
- 5.0 废除JVM式的参数栈，用寄存器做运算，函参API沿用push，也即 `luaK_dischargevars` 算法优化
- 5.1 十年前纪念版
  - `a,b = ...`; VA_ARGS 无需{}来模拟，kwarg和js保持一致
  - `(--)?[==[ [[heredoc任意嵌套&多行注释]] ]==]` Wiki语法
- 5.2
  - 自由变量指向 `_ENV`, `_ENV ??= globalThis` (5.1非 `const,arg[i],nonlocal[i,j]` 的变量名即全局键, 现在改成"this键", 以实现模块)
  - 5.1基于setfenv()的 `module("pip", package.seeall)` 被node风格模块 `local pip = {}; function pip:list; return pip`.. `require'pip'` 消灭
  - `coroutine:yield()` 可以在try{}和元方法(pcall,Proxy)里返回，此魔法比 LuaJIT/CoCo(用户态线程)聪明。 yield或许很难理解，请你叫它 `sleep(sec=random())` 或 `dieWithCallback(f=> looper[0]=f )`
    - 不允许等lua_call()返回，因为C调用栈会丢失yield后then()回的位置，全部用 `L.callk(0,LUA_MULTRET,0, k);return k(L);` Kont即回调。在L栈上的函数未休眠时直接k(L)，否则longjmp()
  - 垃圾收集器（GC）增加了分代模式，LuaJIT未跟进，因为使用了v8的 1bit pointer|float tag 优化
  - GC 支持了WeakMap(ephemeron table), >40b的str不再池化 
- 5.3
  - 新LL整数值域A~B `A=2LL^63LL; B=A-1`。越界回滚
  - 'bit32'库(与LuaJIT的64位'bit'割席)，不再需lightuserdata裸指针
  - GC不默认分代模式 `collectgarbage("generational")`
- 5.4
  - `local n const, x close = 1, {__close = (x,err)=>}`
  - `1 + "2" ==3`, 基于运算符重载 `x=""; for k,v in pairs(getmetatable(x)) do print(k,v) end`
  - 采用C99 computed goto, for int 等新魔法，2D数组的性能提升达1倍

>[全文（感谢spin6lock翻译）](https://github.com/spin6lock/the_evolution_of_lua_zh_CN/blob/master/the_evolution_of_lua.md#51-----lua-1)

未解之谜：
- 表下标或者 userdata 的静态方法使用(.)，"a".."b" 使用(..)，vararg是(...)，正常调用需要 obj:f() !
- it,err=fetch()，被滥用的多返回值，是没学过 `T? or T|Error` Optional&Result类型吗？
  - 布尔&错控还有更下头的判法，和JS的 `Array(1e5).map(u=>NEVER)` holey、Go的分类型nil、C的\0结尾str如出一辙：
  - Lua a={1,nil,3} 里的“空”会导致 `for i, v in ipairs(a)` 早于`#a`(4) 终结！
  - 幸运的是，pairs(a) 和 `for i = 1, #a do` 不这样， `false, ngx.null, cjson.null` 现在是null，而 `a[2]=undef` 规范化了nil (<v5.4)
  - `nil,false and print()` **是假值不会执行，这有意义，让它干扰列表处理+vararg，很蠢。** 这并不好笑。Rust的 `()`=Unit=void 才算致敬LISP #码史
- 下标从 1 开始，其实写多了也能习惯，但只要你索引一个 ffi.C 数组……
- repeat…until比continue还有用，因此提前return的 grep -v '^#' 不得不写成 for in do if then...end end 甚至 goto next ::next::
- 提前返回也只能写 do return end，和kt的 `val it=fetch()?.body ?: return "curl fail"` 有云泥之别

# 本书的语法改良

> 针对过于冗长的 `local function do` 和单调的 `if or for` 块，既不JSON也不够C的 `Pair{A,f"A={A}"} / Col2{.B=~1}` 字面做了简化

```lua
-- 词法
x = -(y) for kebab-case-小不忍则乱大谋啊
1\=1  for '对仗\n'
f"以f开头均使用{ES6}模板字串" == f({"以f开头均使用","模板字串"},ES6)
{YY=true,NN=false,NO=json.null, oo=1/0, pass={nil}}

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
-B pass A for(n) { pass if n>0{n} } --or{NO}
pass user for { f"{id} ({age})" }
-- 我们区分单句/算式位置的 pass(x)? for|if 来实现 forEach/mapNotNO, 或模拟 py.match: kt.when(val A=){A?->B;}
mapAs {user} (_){ f"Amy ({_age})" }
-f(x) {x+1}
pass fsql"SELECT 1, 2" for(2) { A+B } -- bash式参数!
-- 其实 do=栏目答(改ENV?), for=mapAs+do内联, if=默认参(u)+for, 没错：迭代亦判定、判定亦错处，不分对错单多 #码哲
-- x for|if 若 rawlen(x)==-1 则不索引LOOP一次, falsey零次, v=x if{} 就是 v=v1=NO; if x{v1=..}; v=v1

--计算器·改！
{1 2 3} for(x){pass x*2 if u>4{u}} -sum (2){A+B} 0 --管道|>只是全局函数
-aZ {"not" "too"}
aZ -1 "good"
aZ(1)(1) == "n" -- 是的，没有类型推理，您必须以 a,aX,a1, nums 这样的变量名调用才能忘记故作深沉的 push_back/append/concat
aZ(1,NO) -- 参2不能以a开头，但可以 a -1 {42,'.',1};a[-1]=[#a-0]
-extend(2) { table.move(B, 1, #B, A, #A + 1) }
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
  -swap(_) {Pair(_B,_A)}
  -B(_,B,A) {Pair(A or _A,B)}
}
Pair{1,2} if {
  -eq21 u -swap
  -eq12 u -B('1')(2) -swap
  --vs u.B('1',2).swap(); 我确实可以像_A那样，令 u.f=u:f, T.f=T.f 但算了，毁灭吧。真正的OOP，单参方法赛高！
}
-tbl Tri{
  1,2,3,
  'a','b','c',
  {-(Pair){666,233}}
}
tbl[2]C=='c'
tbl [3]A pairs [1]B==233
-o Proxy({}, {get:{x=1}}) --getmetatable并赋值
o.__proto__.x == 1
pass() {
  -OS chop {
    -Pair.T.swap(_) {Pair(A,B)}
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
-m.greet(name) {f"Hi {name} from (?) !"}

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

typealias Gen=Method.(Array<Any?>?) -> Any?
fun Proxy(by:Class<*>, g:Gen) = Proxy.newProxyInstance(by.classLoader, arrayOf(by)){ _, f, a -> f.g(a) }
inline fun<reified T> Eval(noinline g:Gen):T=Proxy(T::class.java,g) as T

val u:Api=Eval{it?.let{""+listOf(*it,"-${it.size}$name")} ?: name}

u.posts(2) eq "[2, -1posts]"
//试试编写 infix fun eq 和 SAM<Runnable> {1} 代理。当
```

但TDDc也并非单纯给「eval串留字面」。你应该听过Python2的一个梗， `True,False=False,True` 后新def运行正确，调用旧函数却崩了，这说明只要 `override operator fn` 足够多，编程语言的语意可以天翻地覆，是佯装成「别人家的语言」，是嵌入0尖括号版HTML(vanjs.org)，是在GPU上计算(numpy,taichi-lang.org)，或是被“SQL注入”…… DSL考验的不是算法，是你的需求和想象力。 今天前后端和安卓的“魔法”，远远不够，而类型体操，搞错了方向。

就像 `await www.baidu.com ({wd="酷壳"},'/')` 和 `"查真资料(void) { https://goog.le;\n goto https; }"` ，当你真懂语法，知道 `cout<<; printf("%d",1)` 也只不过是同行的作品，你才能明白元编程和PLT的reason。

无需parser或算法/函数式特技，您可以阅读 [运行即编译，TDDc就是Visitor]。长话短说，把 `x=Pair(1,2); x.B.times(n=> dd=n.十(1))` 里的2变成 [2,'x.B'], 无论是生成 `while(x.B-->0) dd=x.B+1` 或是将函数体变成「别人家的语言」都易如反掌，这才是TDDc

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

# 编程语言：从计算器开始

## 类型

## stringify和parse



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
