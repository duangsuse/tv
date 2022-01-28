一般脚本语言都是 `Global.eval(String)`。要么REPL不支持跨行文本，要么逐Char判断抛弃RegExp；我选择记住当前行内位置substr，无匹配则next()下一行黏起来
若支持Tab补齐，把解析器当前符号表结合分词器当前词条前缀过滤即可；只能增，若有删改则整个输入要重解析
括号代表调用/定义,惰性和作用域，' +-*/ 代表OOP访问而 'a="a"

在()解析的同时 parseInt 或生成运算栈调用 [1 2 +]，利用逆波兰运算符重排支持 ' 1+2 表达式和特殊右项 .call()
instanceof FStr 区分变量与字符串常量

RS的前身有在js设计称作tvr(tree-childval-result)的求值方法，它支持显示每步骤的语法树: `{If:(t,v,r)=>r(v(0)?v(1):v(2)) ,Def:(t,v,r)=>scope[t[0]]=v(0) }`

`v(0)` 在Node内首项t[0]是常量时不计算，否则按其类型查重写器并令 r=v=>{tHere[0]=v} ，tv针对当前节点 r针对它的容器位置，因此每步骤根树(如Stmt*)都能再一遍toString() 出执行状态；可无论是这抑或LitNode不使用，运算栈都也做得到，且自由得更统一
t和v 唯一区别：t[0]是具体类型,v(0)是 kotlin.Any ；所以v0为何不能表示 def Name() 的name这种“语法”？因为解析器只允许那里是[a-zA-z_]+ ，但对工具语言属实没必要那么早区分常/变量。
```java
(\expr-??(x *cond_vals) {letin v (x)  (for (cut 2 cond_vals) (\([a b]) (add(? (== v a) b)) ) )}) //RS 只暴露了 \=? 三个基元-调用作用域,if-部分求值
```
每函数定义完都知道参数(或-1=最少1个)、局部量/upval 计数，“编译”期expr- 函数的局部量就被合并，参数被嵌套栈包住，由编译期函数决定程序变成怎样-程序即数据
(? q a b) 被解析为 [q [a] [b] 3 ?] ，初执行变成 [q n(a) ?no a n(b) ?jmp b ] 的扁平指令
尾递归 (\equ(n)' 1+(tailrec (- n 1)) ) 是基于 call(Sexp,arg) 的参数重设&跳回开头

tree-walker 在运行时需复现递归下降解析时的调用栈，为了复用深先重写，代码太分散命名太多。 利用子类型多态(父类函数覆盖)或 Visitor 的语法树写法是套话，
他们的每个语法(for,if) 在解析器上都有结构定义，而不是以通用结构(S表达式)+宏 这样的元编程写法支持。如果不是易懂举例， 稍微了解下栈求值序，栈机反而比 AST.eval()更具优势，且能支持暂停函数。

栈代码(如Javabc JVM)可在变量活跃期分析后变为寄存器代码(.dex ART)，就像对名字「词法引用(j号参数/上i层j号参/全局键str)」分析后才有词法作用域，否则只有无闭包的层叠域

```java
f"1{2}3" = (f-str [A '1 '3] 2) //1首2次项 3末项
(\List.map(f) (mapTo (List size) f) ) = (fun-ext List.map (\(f) TODO)) //含'.' 快捷定义
(\inc(x) ' x+1) = (= inc (\(x)' x+1))
```

## 文档

分词器用Pattern 从Iter<文>取以下一种词条
+ `(\w[\w\d]*)` 变量名. 常量 $Y $N NO 代表 true false null 。不能包含 `\.+*` 和括号
+ `([-+]?\d+)(.\d+)?` 或 `(.\d+)` 数值，可为 Long, 默认Int/Double
+ `f?""` 跨行(表达式内插)文本 `'(\S+)` 符号文本. 支持 \n\r tfb 和 xAA uCCCC 转义
+ `\s+` 和 `/**/` `//` 被无视

f-str 用 `FStr(k=0,s)` 表示'文本、k=1 表示"、k=2 表示 f"{}" ；RS不支持eval，但允许闭包序列化。变量编译改为“参j/上i层参j”的形式由Upv数组指路，外层ret时Upv将值内联；`(\f ! (= f1 (\! TODO)) )` 里f1序列化时代码统一口径为 global.f$0

空的 ' 文本尾随算术表达式，`' 1+2` 相当 `('+ 1 2)`，单项=`'('Expr')'|[!+-]单项|词条|字串内插`，只有 `.` 号右边特殊，必须是名字或f-str ，后可随 `(1+1,2,3)` 的参数表达式 `.=mcall(o)` ，`单项=变量名?mcall(this)|单项`。 `()[]{}` 皆是有效括号，REPL不检查闭括号数量。

所有参数和局部 `(= x 1)` 都在解析时确定(上i层j号局部..参亦局部)语义，只有this变量和全局 `global[k]` 运行时才去查。 `(fun-this [ArrayList] ({\!' add(1) }))` 的匿名函数=` ('.() (jm 'add) 1)` ，查到即缓存-代码可变

所有S-表达式编译为计算栈，含顶层在内 `(\(*arg) e1 e2)` =['\,nArg,nLoc,nUpv, e1,e2] 在调用栈执行

`(\Any.also(f) (f this) (ret this))` =fun-ext 和 `(\(*args) )` `([a b])` 是支持的。编译会生成局部量和 `unpack([a,b], arg[0])` 解构

基于流解析-栈化 嵌套括号,中缀算符优先级，深者,左者先算
+ 调用:形参是变量或[]解构，可含1 *arg 三分列表，编译期+初始化，函数是 [\ nArg nLoc upv, code] 栈代码。闭包由外层函副本upv创建/ret时通知，0/1参可 `[\! it+TODO]`，`tailrec` 伪递归；最终服务 `(for (cut 2 [A 1 2 3 4]) {\([a b])' a+b})` 类, `(f a b)` 编译为 `a b <global.f 2>`
+ 算式:运算符 (\ '+ ) ，特殊的点号 `o.f() o.f"name"()` 及 `this.f()=f()` 语法括号内是 `(\ )` 函数或逗号算式
+ expr函数: `(\ '!?(q a b) [! q (n a) ?no a (n b) ?jmp b] )` 是RS实现if-部分计算的方法。初版expr函数flag 在调用时+局部编号 合并二者局部量，并替换参数，然后在编译期执行函数，添加 `(add )` 内含的栈代码;过去认为必须在运行期展开expr调用，因为?no ?jmp 的偏移量会受if嵌套影响，expr add 就会不对；现在 expr 只是编译期执行的函数，其参数皆被[]住供它取舍 并在编译期生成栈代码，而非运行时改参数。提供 (!= (!var ) ) 编译期局部量分配API，允许 [letin a 1 b 2 ' a+b] 语法

RS只是学Lua支持了词法作用域，允许闭包和插件函数两种调用。 `'sym` 代表四则类算式，`!` 代表expr函数(编译期生成代码,实现? ?? 判断函数参数-不完整求值)
若内首项='\'，则为(匿名/含'.'fun-ext/局部)函数，否则按 `(f a b)= a b f:2` 执行序。函数值如 `(\(a)' a+1)` 是 `[\ nArg=1 nVar=0 upv=[] *expr]` 列表
局部var 从参数末开始按`(= v val)`编号，最终添加为 `j号`或`上i层j号`或`global.key` 的形式，全局有符-层号地址Map，每进\ +1 。分别生成 `v vEq, vU vUeq, vG vGeq` 取设指令，闭包(序列化命名为 `outf$0` 形式)由外层函数 `fnew` 存作局部，在`ret`或新实例前 `fsave`闭包实例。
可有 `\([a b] *rest)` 解构，编译期分配局部量&生成 `unpack(2x VarAddr, arg[0])` ，若含 `*` 参数则先三分列表。生成slice(0,1)初始化代码后内项 `[a b]` 再生成。有 `[x y]@p=[1 2]` 默认值语法。调用也可 `[A 1 2 *three]`
通过Eqv(into,from) 解构转化 `tup.into(obj)`

那调用能否 lazy(call-byName)？`(f v)` getV 惰性就够，如果要内联也行。



Granda
1. JS Java 需独立 ClassLoader加载所有.java 代码，用完扔掉(不然会 class redefined)，且支持仅修改重编译；但是 cjRun 好像就相当 `$ java mainCls` 的，而且可tools.jar编译完内存内加载，无需交换 /str/*.class 文件
2. 聊天气泡的边角不会做，其实设 border-left:img 左角就行，反之 -right:x翻转 ；可能要把它放 .avatar border
3. page`/user/${Str}${page}${preview?}` 最初设计为 loc.hash!=url 则返回 preview 否则 page ，意思是列表里点开了，它就展开。 可何时刷新、哪里有列表视图的链接？  其实是注册为 `/user/`(s:Str) 的调用=链接，onload/popstate 解析渲染、点击 `push(url#s, now);now=[path,s]` 遮住now. 可pop及分享。  此外 `/user/` 里点 `user/say/1` 前缀也不合并

BPU 是使用buf绑定而非R/Wer 流做二进制读取，它在增删时移动 .p 加绑，并知道该重write重后方哪些符号,+偏移

(1 (2 3)) 的遍历是深先的，对首项是\ 需先加 栈帧(参数,0,... ) 后遇(=) 则分配 帧[i][+1] ，也不能利用调用栈存、或需 unpack([a b], args)；而单项除了变量也可是 *单项
