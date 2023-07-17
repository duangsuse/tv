# PRR

>PRR(Parse Recursive Regex)是ANTLR的平替 ，能以单语法规则文件, 读写JSON/CSS体量的DSL, rb es6 等灵活语言, 乃至 py, 

正则表达式，是“难读”的文本拆分器，它不能解析java那样的复杂语法：

- 无法收集 `(\d+ ,)` 等列表, 更别说向右读+*算符链->顺序栈
- 难以拆解出 `Num*` 或转化 strs->AST(如JSON) , 不忽略 `'(' Expr ')'`
- 不可递归, 或兼容 Op,Tabs,KWs 等当前缩进/分词结构

即便如此，我对流行解析器的体验却是：
- lexer-YaCC 的失败, 手写递归下降的冗长
- 左递归, FP组合子, PEG '_'注释 的混杂

peek(max=1)改为增量解析: 让[]式语法,不断重解析(允错)单句
- 对大文件省内存: `P(['*', datas, (x,a)=>print(x)])`
- REPL流建议 `onKey_Enter()= Stmt(input)?.let { print(it.seen(Eval)) }`

除了修正，PRR还提供
- 根语法树r 没有 `r.span=[[i0,i1,tok],]` 高亮，比如标记单个词 `#num \d*.\d+`
- 读写不平权, 无 `CSV("1,2,3").dump()`
反解析: 在[Num,,ok]ok前或 [P,A,B,] 插入 `(a,[x])=>{a[0]=x.toStr}`

复用: P.T`funDef` 以遍历 r.seen({funDef:}) , `P.ex(JSON.parse, n=不限,len=结果或异常=>字面长度)`

类似字符版， spans={i,n, v:bytes} 在v变更时移动["buf",]和右侧span ；但不储存wsEnd-[a,b]项右空白

1248=byte~long, -代表unsign; P.f=double=6; 创建后由Ary负责set
'*',-1(,4即IntArray,提供make) 不定长数组; add的项被计算size,在当前流创建 (rw=1)
'+'(e,s.e0)=> 负责输出e, 和调s.byteOrd/align, 
P,[2,'tagType',]; 也提供make来重创建
'?'读取Chk('bitflag s') 和常量池 (CP,p)=>结构 (, ary,findOrIns)

`P(['',{typesAre,},..])([buf] )` 在grow:1.5 内使用buf.resize,或trasfer。'*'支持类型 P.typ['S']=[4,eqUTF]
