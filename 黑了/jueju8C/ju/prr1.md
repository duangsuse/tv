# PRR

'P<<' Parse Recursive Regex 能平替 PEG,ANTLR，读写 csv,json,css 等DSL, lua es6 等算符链, 乃至py缩进

'P2' DataView=>`i8,u16[],struct,union,bitflag[]` 自由组合，据绑定流读写，无需dump()

正则表达式，是符号化的文本分词器，它不能解析java那样的复杂语法：
- 收集 `(\d+ ,)` 等列表, 忽略常量 `'(' Expr ')'` 和 res._ (空格)
- 复用 `Num*` 和转化 strs->AST(亦如JSON []{}深遍历) 
- 递归 `JSON null|[() ,]|{Str:(),}`, 或兼容 `['+',{'*':1,'+':2}]` 算符重排序, Tabs,Chk 等当前缩进/分词结构

即便如此，我对流行解析器的体验却是：
- lex+YaCC 冗长，手写递归下降烦于 nextChar()
- 混杂的左递归,FP组合子; 功能缺失的PEG(算符,注释,)


Send{Made; As格式; Char读写}
- `typed[T], typedArg[List](sendStr)` 定义了类型的读写(cat cut)器，靠As(json,csv.)来编码Char流
- 数据类列化: 读empty()+set(0,read)+set 以 As.T,_T(obj,:Made) 读写。校验 `cols=FnKV.const("age" to (typed[Int], 18 or nodef, 0))`
- List<*> 的开放T^按{}[]0~9 接口的注册, 或 `conds: FnKV<Made Str>?` 创建 ^常量优化 get,of反查,forEach
- T(:Send/Pair) 在n==-1时流写入，否则生成[]{}. Str<-Date,File; Chars<-boolEnum,1L 1f
  - ^格式只需实现 As.Pair(cols)->mI+mX ; surr="{:,}[]"
  - cond 除cols="type" 也支持 `[:x 0 Either[:A [:v 1]] ]`

## JSON read

解析 "[1 [2 3]]" 到 [1,[2,3]] 只需对流前缀应用 A=`(\d+) | '['A* ']'` 两条“吃文吐数”的规则。JSON也如此

```js
Read=(RE,p)=>s=>{if(m=RE.exec(s)){s[0]=s[0].slice(m[0].length); return p(m,s) }}
also=(x,f)=>(f(x),x)

A=Read(/([\w.$]+|\[|\])\s*/, ([m,d],_)=>!isNaN(d)?+d :(d=='[')? also([],a=>{while/*递归* */(m=A(_))a.push(m)}) :(d!=']')?d :0)
A(["[1 [2 3] 4]"])
```

但强类型序列化里，`1` 可以是 1L,1f，`[a b c]` 列表也可能是Set ，读写器按类型。那种 []=listOf,{}=mapOf 的逻辑只存于Any类型下

再说，`List<T=Any>` 的T开放有1L,1f ,必须记录type: Long,.

```kt
interface RwEqv<T> {
  fun Reader.cat(T:Type): T
  fun Writer.cut(T:Type, v:T)
}
class Json(s: IO流): RwEqv<Any>
```

当然要支持 `Map<KV>, Collection<T>(含List,Array)` 和 numstr,enum bool null。 T应提供0参构造器，不然就 Unsafe.newInstance

但实用类型 `Date,RGB,Hashtable` 要能自定义格式：`Json.typed[Date]=object:RwEqv{ cat(s)=Date(Json(s).catStr) }`

`Json(s).catStr`? 这格式固定，但在读取[1 2 3]:Set 时，不应该临时读到List，__应靠 (字符流)->单项流！__

```kt
fun <reified T> IO.Eqv(:Fmt): Pair<
  /*cat*/()->T,
  /*cut*/(T)->Unit>

object Json: Fmt {init {
  typed.addAs<Map>({typed.get<IterPair>(Str,tArg[1])}, /*格式 {"": Any,}*/
    { HashMap().also{t-> cat{(k,v)-> t[k]=v} } } to
    { cut(it.entries.toPairs) })

  typeTag[Any]=FnKV() { T->Class.forName(T) } //允许Ary<Any>
}}
```

数据有三种情况 {}, [], 及Any除内定 NumBool(1L,1f<-读CharSeq,朝右),Str(可读Date,File) 外，据"type"(如{}[]0~9) 来建数据
1. Map<-`Pair<KV>`； {type: V, 默认:nodef} 语法据 `Send.Idx<T>` 来读: cat时向 T.empty(0)+校验的 `vals:{Name: (Sender,T/nodef, Idx)}, it[i]=cat`
2. List<-`T (s流.flag=brace)`。默认流支持“多行”json
3. open类视 `typedTag:{Str: Sender}` 创建+赋键值, 数据类见1.

1.效仿moshi, 以int位集找未提供的量

ISON(Interchange Str Obj Num) 表示层：
- T依据 Send.Idx<T> 流对接到传输层
- List,Array,Map <- T,Pair<KV>(流.N=size提示)
- 1L 1f boolEnum<-CharSeq, Date<-Str 
- Any 才依据"type"(如 {}[]0~9 接口的内定) 加载子类。 RwEq<T>之格式, 依内定或查询项的 SendT. 含泛型

'T'type RwEq
  - cat T //read,load
  - cut(:T) //write,dump
  at type: Type<T>

'this'type Send
  - empty
  -named TYPE SendT
    named nodef
    /* 编号查找 {k:v} 式语法的默认值 */
    'T'data Idx(read:T, :Idx)

'this'type SendT
  /* Any=this? 或nodef */
  at vars: KV<Str Pair3<Sender Any Idx>>
  - empty (size:CntM1=NO)this
  - this.get(:Idx)Any
  - this.set(:Idx,:Any)

  /* 比如List<Any>项, 保留类名。sealed class 也需注册子类"type" */
  at typedTag: FnKV<Str SendT>?

从语言层建模了强类型static vars 与 Send.typedArg[List]={impl(Targ[0]) as RwEq SendT }
无需新建class ，就能支持新格式。只覆盖 Pair<KV>, Send.Idx<T> 的读写逻辑，且自带流式读写

### ISON

"Interchange str obj num" 动态调用器，不断修改着 `res=v to Type`

对于Any 的赋[]会视为调用，赋[=k v] 视为set; Array;`Map,Collection` 子类自动靠0参+add()构造
