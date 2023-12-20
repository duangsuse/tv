# 面向对象是什么

>让我们从封装多型(即多态)、继承接口，来找出OOP(Object Oriented)到底解决了C,VB等语言的哪3个毛病

这就是最近困扰加菲猫的问题。首先，它尝试把自己“移民”到JS编程世界；因为弱类型强算式，会更贴近最初的灵感，涉猎其他语言，才更好看清你用的语言。

```js
//能说能跑的动物
cat={name:"Garfield", quotes:["星期五再叫我起床", "我的想像永远在积极向上", "清晨应该12点再来"],
  say() { say(pick(this.quotes)) },
  run() { say(`它走了10米，说${this.quotes.pop()}。`) }
}
say=console.log
pick=ary=>ary[(Math.random()*ary.length)>>0]

cat.say() //我"打印"了什么？
cat.run()
```

确定能用后，他学习了绝句：

```
- main Cat("Garfield", ["星期五再叫我起床" "我的想像永远在积极向上" "清晨应该12点再来"]):
  say(); run()

data Cat(name:Str, quotes:[Ln Str])
  - say say(quotes.rand)
  - run say("它走了10米，说{quotes.pop}。")
```

这样在填写对象时，就有“据”可依、可以补齐了！

__同时，我们也解决了[毛病1]__: `say` 函数尽管名字相同，却可指代 `cat` 的或全局的、签名不同的实现，就像 `1+1,1+"str", []+=[1], ([x],{0:x})[0]` 里那些同名运算符。即'同名多意'重载(overloads)

在C里，struct“方法”会有类型名前缀。.h文件错综复杂、strcat等缩写备受推崇，C++的::乱飞，就是在解决命名空间的问题。 VB和PHP里，访问符号比较混乱，也是因为忽视“重载”的思想

Py能够流行，很大程度上也是它简洁而一致的“约定俗成”，能配合各种数图库。

说回赋值。现实里“加菲猫”是有状态波动的，有时cat完全不能 `run()`，有时它初次跑会抱怨两句。 你要保存 `when- 状态名单` 和1个真假 ~~Boolean~~ 来做这个吗？

在整个剧集里，其他猫说和跑的业务逻辑是不同的，乃至会公开新的函数、变数。 在JS里这很简单：

```js
lazyCat={...cat, // 你可以随意少写或乱改键，而不同步修改其“类型”。调用到才会报错！
  run() { say(`它走了0米，还好没报错`) }
}
badCat={...cat,
  run() { this.say(); cat.run.call(this) } // 为了调用“原型链”上的方法，出现了冗余
}

[badCat, lazyCat].forEach(x=>{
  x.run()
})
```

>在 `run()` 3次后，两个函数都面临边界情况（“假移民”要出破绽了）。带有调用层叠的报错也是OOP标配的特性，而绝句使用'?类型'将pop()等空指针化腐朽为神奇，配合量纲验证，减少了异常等闲杂对象的出场率。

但其实，OOP使用'接口'(绝句:物类)后，也能把函数当成变数一样随心搭配：

```
at quotes "星期五再叫我起床 我的想像总在积极向上的路上 清晨应该12点再来".Sep
- main
  [LazyCat("懒猫",quotes)
   BadCat("嘴硬猫",quotes)]|: run()

type Cat
  “data Cat(name:Str, quotes:[Ln Str])”
  “待定义的词：”
  at name:Str
  at quotes:[Ln Str]
  “除made时外，皆可默认实现：”
  - say say(quotes.rand) 
  - run say("它走了10米，说{quotes.pop}。")  

data LazyCat “made”(name,quotes) “简单继承”Cat()
  at hint [our] "它走了0米，还好没报错"
^now
  - run say(hint)
data BadCat(name,quotes) Cat()
^now
  - run
    this.say; to<super>.run
```

OOP绝大部分比JS长的「设计模式」，都是在把函数做成“更可扩展”的静态字典(称为覆写,override)

尽管代码长了3倍，但就实用性上看，只能“修饰”旧猫的JS版完全不必复制对象。原型链版会更长，文尾会给出。

__给 `hint` 添加'our'就消灭了[毛病2]__: 当你把变数放入构造器，把函数聚类到对象，会产生耦合。 控制可见性(而不只是 `_xx, mXX`)，会明确职责的归属，避免用户被框架的“数组”“链表”等C++式算法给框住，甚至被难倒

绝句的可见性有 `- member() [ourapi our ourthis ourpkg]` 公私我书四种，默认是公开，而Java默认是私下。 

加菲发现，构造器那里产生了重复传参。 要是配合上隐式参数，能外提出一个易扩展，而不失易用性的框架，这就是Java的 `non-static class` 和 `non-final class`，是绝句推荐的OOP范式。

当你把 `new OnClick(){ void click(){} }` 赋值给接口时，调用者同样要依据到其广泛性。这种情况加 `impl?` (对于单继承的接口，则加 `impl??`)

```
data Cat(name:Str, quotes:[Ln Str]) [impl?]
  - say()[impl?] say(quotes.rand)
  - run  [impl?] TODO""
  “[] 算是种返回类型”

data- Cat Lazy “Cat`Lazy` 则改为定义 LazyCat”
^now
  - run say("它走了0米")

- story(:Cat) cat:
  run() “<行为可修改”
- main
  story(Cat("懒猫",quotes).Lazy)
```

__只要把对象视为函数的字典，就除掉了[毛病3]__: 假如 `"",1,0.5` 等值的类型只在 `printf("%s%d",)` 时存在，只能“强转”而无接口隐转，就别提“一切皆对象”。函数指针只能读写全局变数，难以面向事件，但使用“匿名SAM实现”或者说闭包，`forEach(x=>{})` 这样的查询计算就变得极其容易

多态，相当于传多个参数函数，但它们必须归于一个对象。这其实没有性能或重构时的好处，因为事件监听等模式，本来就会涉及太多外部变量。

一些人发现流行软件臃肿，便想用“复杂的技巧”获取性能提升，但那就是他们慢的原因。另外，<3ms 的调用，对人就是不可见的。软件的开发和更新效率，才是影响用户体验的重头戏。

最好也先懂其他的语言！实干不要太心急，蓦然回首，产生的才是突破

```js
_Cat=(T={run() { say(`它走了几米`) }})=>
( name,quotes)=>
({name,quotes, __proto__: T})

Cat=_Cat()
LazyCat=Cat({run(){ say(`它走了0米`) }})
```

把鼠标移到 `- f(x:Int) x+1` '+'的两边，会看到 `[Var Int], Int`。 但其实，绝句的加法的签名 `- Int+(:Int) Int` 与普通编程语言 int+int 并无差异

绝句也能写内联函数 `-- f 1`，但没有 `const int` 常量的概念，这些都是为了3项改进而设计的「调用模型」。

1 消除“传引用”或值类型的概念 kv[1|2]=$Y
2 表明可变性+嵌套域
3 支持字面类型

增加 `data T - getKey 1`，`x.as[T].key` 便可以读取。增加get/set的任意一侧，都会生成一个变数

data made: 会自动填写访问器，而问物则需传参Data("builder")， 这是因为 `this.字段 不可被监听或鉴权, this.方法() 可以`，但问物只储存数据

`at key _0(); data- _0() Var() - get` 会把变数和读写粘贴到调用处，`at name Var.our("Rose")` 用这个原理让值只在内部可变



我的编程范式，目前由2类的重载重写构成

# 行列式多态 tabular polymorphism
class,dict,struct 等类型的本质是“电子表格”，而方法只是有特殊前缀的全局函数

静态类型，就是行和列

?? Animal had //一词你想概括为什么？
  - name Str //<> 横方向共有的，叫列or接口
  Cat(name)
  Dog(name, owner:Str) //^v 纵方向新增的，叫行or构造器

其形式为 C=A+B :

?? C had A
  - b1 Str
  - b2 [Int inc] //"可变量"是值

?? [A-exists B]
  //- A 一词已确定，不能添加新的列
  C()//Animal 一词已穷举，不可继承
?? C
  C1(但是接口可以=1.0)

枚举则表明：行列，是编译期的定长dict[key] ，或者说 __type=const__
?? Food inc [Rows]: //简造器: [Str "Enum" KV]
  Apple; Tomato; Beef

因此，Pair(Col2) 继承自Column ，Maybe(may2) 继承自Row。 error(): NO类型, voidFn(): over类型

构造vs简造器
构造器constructor= 由变量组合成的struct
简造器lit= 由字面等价出的 enum int 乃至Fn等type。毕竟是“一行”，必须属于既有表格

但此时，类型间的“继承”还没被实现，`?? Idx Int:{>0}` 的带格式参数又如何转换？

下面，会对列的继承性多加利用

# 转为式多态 too polymorphism
加参器instructor、加构器costructor、段造器OOstructor  有「3种三段论」

大前提+小前提=需求实现:
- 默认值+值=值
- 给定值+值=对象
- 默认函+函=构造函

三段论是高复用、低心智开销的:
- cookie+路径参数=Web讨论板
- 旧函数+插件=AOP
- 数据库+命题=(URL参数=>CursorAtRow)


z counter(0) :
  me(1)==1  me(2)==3
//z==$Yes

Dog("Hachi").[Movy too]!.move(0)

??- counter.as(x:Int, ac=0) //加参器可以避免滥建 SAM class，或让监听等闭包 共用可变量
  ac =:+ x
  over ac

??- Animal.Dog(owner="Jack") //加构器可以避免继承的分不清主次
??- Dog
  - too F.[Movy] .:  //且允许从impl T{}式扩充函数，平滑过渡到方法或参数更多的类型
    - move(dxy) $N !:"躺平了"

- AbstractMain as:
  inc: aField 0 //段造器，是能作为和要求参数的函数字典，它是OOP的破壁人
  F.[Activity] .:
    - onCreate as:
      main()
      I.asSuper
    - onDestroy ‘TODO’
.:
  - main()
  - fetch(:URL) "STUB!"
  - openVal setv(0)

//class的耦合就是field和Override的耦合，既然如此，让函数的局部变量能“内存泄漏”到GC field 到堆里就够了。Fn{}闭包和yield不就要这样么？
//其他函数和static，就自由扩展吧
??- AbstractMain
  - funcs
^I
  - as() as()//parseURL,.

这些函数对人脑而言呀，想模拟执行，也需要发音的。多“声调tone”， 俗称多态或 is类型判断/jspy的自动转换
在不同的语境下的-函数调用，有由(??)等参数确定的声调，俗称方法签名
有3种词支持新增声调：  共变量函数(??)  私变量函数(-) 行扩展(??-)

只需|方法的确定性|对应
:-:|-|-
默认|funcs|`abstract` 或 `trait`
增加构造器|funcs! 只能在同文件添加新行|`sealed class` 或 `open`
构造器无 `.:`|表格行已穷举 列已定长|`final`

海图在class-函数模型上类似Ruby+Python 。类和static命名空间是能二次“打开”的，函数形参能写明self，加法是函数名不是operator--也没有int等值类型，def不需要return语句，:.match不一定独占一行...

不过，它是更为渐进的OOP： 构造器不含赋值 类=函数的字典，inner类可以被加参加构，main与lib的隔离只靠over，明确编译期[调用]，有轻松的\:强类型容错，支持命题类型而非常量长度数组...

- Animal.Dog(me:Animal, owner="Jack") as: // 函数名含有.Dog
  加参加构器被翻译为普通函数 had `所谓inner class`
  F.[Row] .:
    - owner owner

- Main(n=0.) F.[Activity 函确定!] .:
??- Main
  our: ^
  - 同文件的扩充也可以mark private
^I
  - statics也可以有I元类接口 ，文件其实也是.: I
  - 对I的索引在编译期完成，也减小了import链接开销

海图只是“API们的Google”。它不会只追求自身的差异或复现分数，而忘记问题的 root cause；不会对发布过的代码反悔，带来依赖地狱(node_modules,.)等除错式价值。

即便Pythonic都反悔了，我们的抽象依然该像坟墓那样简洁。“在键盘敲响前，撼动所有惯用法里的内核”，这是海图的库API要直面的诅咒。 这不是背负压力，反而，是为未来节省时间的快速排序。

↘️ 为了方便跨平台或mock，在编译期的依赖注入， 称为 os-依协议工厂
比起抛开constructor 而使用 Factory.createXX() ，应当允许 ext fun 按作用域分别重载，也就是导入+覆盖

os.exec("echo 1") //返回动态类型"NO"
??- os-droid
  - exec(:Str) "install busybox!"

??- 这是个函数()  0
.:
  ??- os-catch
    - on(:Err) "函数级默认值"
  - 它不该'有' 局部fun
  - 或匿名 F.[Object] .:

# 运算链
左表右链叹歪嘴(lswitch rchain wheezynul)

yNew  y :.
  <0: -1
  >0: 1 ; or: 0
//左下表，支持bool函数和匹配解构。单行缩写为
(y rem- 0).{0"平" 1"剩" -1"负"}

(1==1) \: // 把歪嘴替换为 (1\=1).{$Y 1 $N 0} 就是ifelse
  say:'CPU有毛病'

除了可多行的bash式参数，还有「类型即表格」—class可以随处创建
那些总是在 fn(a=a,b=b) 的def 也可以消停了。让人总得用上才叫OOP嘛

y  1() .:
  Vec2(me+1).x //sin
  -2+3

3==(counter .: -ac 3).ac
h5vid .:
  -speed 2.; play()
//右下链，是Rust允许{let}遮盖同变量名的理由 🙄
//那根本不现代，和C的int a=(b=1)， “inc 1: a;b” 一样是瞎猫吃死耗子，祈祷不被[有心人]滥用呗

ada User(NO) // 非常可爱的、文化中立的表情，取代了让人头痛的异常、弱类型||、null?.b?.let ?:
ada.age ("UNK") : "☹️{me+1}"
(ada.age🫤 \: 17)+1
may{u.age.orThrow}  !: "😬need be checked"

?? Row
  User(age\:Int) //val age:Int? 不应该出现在结构体以外，除非写为
 - age [Int mayNO]


层级术语|界词|杠幕|括|树|终
-|-|-|-|-|-
常用|.:到over是脚本,其后库|.: -宏''|a有1=add1|a:+1|'str{内联}'不转义
常用|?? Row或Column|-f as:多行|2@1==0b10|nul!.b|say:'err'e


回顾文首。 `.f(x)` 只是 `F.n1.f(me,x)` 的缩写，全局函数名确乎比变量高一级。

class{}只是以arg0作为key，优化重名和重载查找的“面向编译语法”，因此，海图并不鼓励-段构器，建议只作为函数字典传为参。


# 单位的检查

即便对"单位式类型"Box而言，函数签名，也只是在运行前就被select的“类型的数组”呢
??'T' Row
  Box(item:T)
    - it item

海图在编译期运行 `- 宏'' x` 或者说内联函数/codegen, 而 `?? x 1+1` 也是它的输入。__海图已经强制了隐式强类型__。作为真人 请拒绝堆砌对app代码无指引性的类型

类型标注是一个命题，而符号(包括变量名!)字面会构成它的一个解。可以说 `(a:Int, b:Str)` 只是{}的编译期写法。  `[Int Box] 即 Box(Int)` 为能推理类型，会兜转返回 `[T "Box"], "Int"(T)` 命题，在查找重载时匹配出 T(Int) \ T(Str) 会为传参提供灵活性

任何泛型的根基是[调用的固定搭配](https://coolshell.cn/articles/10169.html)，比如对任何x. `top(push(Stack(), x)) == x` ，这些标注是对API有贡献的那种黑盒测试

海图的类型不是用来鲁莽地区分“数值的四种写法”，而是真正帮你分治击破问题的好习惯。

有人说高可信的软件test的行数比实现要多，并非如此。 在定义功能和算法时，你早先的断言和新软件的细节往往是无关的，类型，不能证明你的证明既对且全，它总是像正则一样解决+送出烂摊子。 它甚至不算是种体操。

>某些人会强调 `弱类型\=动态类型`，他们是说C=弱检查静态 Py=强检查动态 Go=低标注静态 。严格很重要？但对普通人而言，100%不涉及无关符号的代码或陈述才能够被看懂，弱类型、Pythonic已经完美实现了这点，它们顶了半边天
<br><br>严格来说，弱类型= class是语句有先后 +左先深先解释+官方说(动态检查)+胡乱隐转+无unsafe内存指针
<br>`hito a.hi` 自动为解释执行， `hito a.hi-zh a.py` 则会跨(自然)文字/(编程)语言地编译，这时会提前匹配类型(查重载函表) 并执行符号宏(模拟弱类型的printf等魔法)

可以说，低标注静态类型不流行，是因为类型系统与运行/打包器太教条，心智负担比jspy的原型链重几倍。

在处理json,csv等弱结构时，C++式语言与Java的序列化完全能拖你的后退，类型上的方法和校验器往往会从易读易用变成鸡肋。 重载和模式匹配虽然是被类型签名启发，却并非静态才能做的功能

静态生态萎靡的其中一个因素，是语言和工具的创作者们，都认为自己比别的脚本人多懂点设计模式(更是会写编译器这堆算法)，不能沿用py那样业余的bash化的API架构；对另一方，则是觉得生硬的代码会无效益边际地变快

“生硬”，真是对计算机和编程的刻板印象呢。 甚至是傲慢？

海图在编译期知道'T'的值，会调用类似 `- it(T:TSet) F.[[T "Box"]=>T n1]` 的类型函数。但与Go,TypeScript,Zig 不同，行列式(`T.COL COND DEF T`)的海图不允许创建匿名类型字典 struct{}

>通过添加 `??`，可以让 `人(哲学家)  哲学家(柏拉图) 人(柏拉图)` 成立，这是行列式复用的根基
>这些是 `真假` 值，而 T(柏拉图) T(R) 会得出泛型实参'TR'，形式化验证则再进一阶，能搜索出 a+b=>b+a 的步骤-- '+'本身能是泛型变量。 二值化的算式是不完整的，请避免独立的bool函数

这时你会意识到，除了 `?? Week inc [Rows]:` ，类型也都是字典： `F.[Box] .:` 在函数里接受字典， `?? Box had 混入` 和 `- 接受` 字典，`?? 单名` 则是能被换掉的语法糖。

好代码，读着“押韵”。 在设计海图语法时，有4样法则“发音”过，它们各是某一种概念的多声调

tone:|括号内|行内|多行
-|-|-|-
抽象|`(x) x.(0)`|`f(x){}`|`F.n1:(x) , f .: -x`
确定|`[]{} 0`|`x.{$Y$N}`|`x :.` 在'.'链末尾
验证|`2x, A B`|`0.[N too]`|`NO \: 0`, `- f:{}`
排版|`f(,)f{,}`|`f:A,B; a=:`|`F.[Row] .: - funcs`

这样就知道，`- f(x:N)` 是层次不同，一般只视为行的字典而已。 对海图eer来说，合规的代码，已经没几个字符能追求的了。 韵脚不同的写法，却指导着不同的扩充性，这才是真正的编程语言价值！

- add'a' as:
  lit(a): a+1
  Int(a) \: "type mismatch"
  paste: a+1 //作为编译期弱类型语言，自带了值= (repr()化)，且用“粘贴”表达内联

海图依据[语境优于明确]原则，允许 `- f():{1==1 res\=$Y,} as: 等渐验类型`, `??- test..` 并鼓励用定义式的短代码、聪明的‘示例’调用，取代被含糊与过度工程的app——从需求的建模就偷偷在减少bug了

什么叫做健壮的工具呢？  看看体操里 `- main Box(1).it` 如何被infer，就像下面对海图typer的解说文档：软件不隐瞒魔法，也不暴露突兀的细节，只为了让跨领域程序员和AI看清自己的任务，抽象出每一个新词。

// 调用main时，会select出这两条记录，并得知2个都叫'T'的新变量位置恰巧 “重合”，完整推理出2个值。 标准库的:[Str sets] 就是响应式的文本变量:如 Int(a), over(a)
- 'T' Box.as(:T) _.[[T Box] too]
- 'T' it(me:Box) _.[T too]
-  too(me:[NO Box]) _.[Row too] //是这条隐转在实现继承
// 文件头 .: hito NamesType RowLit 会依据最近调用名推理''参数的类型，且在简造器inc:之外允许 (1 2).[[Int Cols2] too] 的简写

有一些人迷恋TS,注解反射, AST(结构化的正则替换)等符号处理，那其实是语言的重载能力(DSL归化力)乃至语法太差导致的。

比如无法让 `sql:'select {1}'` 不被注入脚本、无法让 `x+1==2` 有求解集语意、无法内嵌JSON、只能用“两门语言”从类型生成load/dump序列化，不能在for里def函数.. 但hito的if,for语法都是函数，也有规范的预处理宏。

- 当:T 有多个值-如 `listOf(1,"") 和 :.` 时，取成员交直到''(Row  Eq Show) 。如果某个函数没有支持:T的声调，也无T.too强转，就是编译错误
- `F.[] .:` 的实质是提供成员并集。请减少Rust和TS,Go式的碎片化接口/嵌入结构体impl，组合优于继承不是这样拆分的
- 有了行列式(列Col2 行may2,mayNO)，请不要使用tuple,union,Optional/Result 或must,getOrNull等函数名。这些类型语法看着酷，但搞错了重点，组合性低(不可能甜) 重复性高
- 没多返回和&const,无反射，请用 `-宏'' 0` ，没有global域，"I"默认指全局单例的类型。 数组可用 `- f(a:[N Len]):{a.2}` 验证长度n=3
- 行构造器也称为「共有变量函数」，比如add与del修改共同上文，也就是语境。 基于响应式[sets]，赋值也是纯函数。 “数学语言”(algebraic paradigms)可规范不出类似的层次呦。


🦄
解决了一个心腹大患，开心，现在和Kotlin加那一堆data seal enum 修饰词的完全不一样了，而且类型上既Rust又Go 🦀，值上既YAML又JSON ，而且可能让Haskell GADT和Monadic链吃瘪了

然后，还有比GraphQL都好看的免术语区间和filtermap 🥭 ，无需open()的文件保存/另存为抽象， 总之，这个范式绝对不是单纯的面向函数。 不仅仅是强类型+DSL，它比py更擅长处理数据
我最喜欢这样看着土，实际从各个角度都博采众长的东西。 和任何编程语言都不必比较，因为它不需要门槛，会Excel和bash都能懂， 有序自然+简洁+文化中立


- 程序员“开销”>CPU开销, 让numpy变快>让gcc -O3 变快
- 用户耗时>脚本耗时，好记的手势和快捷键>完善的类型签名
- 编程只是快乐的涂鸦，电脑和“专业”社区只有权让涂鸦等效于生产。职责划分是，app代码简明趋短、信达趋俗
- 不要作为框架说explicit优于implicit。负起穷举用法模型的责任
- 不要作为人说复杂性不能拆解换名。可读性不朽！
- 不要怀念ifelse链和单例class命名空间。“小”聪明难久
- 不要在模型前，怀念学到的特例；即便需求皆不纯，错误不能被糊弄，API也无模棱两可的定价权
- 只能有一个……至少只封装出一种API，那么写明的提问就是最佳答案
- 哪怕你搜到的一开始还不够Pythonic。快速原型很实干，但并非不选型就蛮干
- 讲不清文档的代码，一定是缺乏模型的拼凑品
- 简单自然的代码，不一定是缺乏功能的入门品
- 不要把类型或参数值硬编码到函数名类名，给重载和多态留一点导入空间
- 链式访问和加减只是调用，class只是共变量函数。编程语言们还有更棒的灵感！
分别是这些原则:
算法才是开销 UX最为耗时 职责预划分 语境优于明确 组合优于列清
正确归类语法 最小意外 单一职责 自顶向下 防面条代码 防过度工程 元编程是编程
