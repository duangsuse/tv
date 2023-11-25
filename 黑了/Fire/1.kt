1. setValue: while main(`--`) eating, `var xy_2_:Ln<Int>` eats `xy X Y`, `rest:Ln<Str>` eats subcmd
2. process `--k=v orV -skeys_kV orV`, so `public fun v()` == `var v:Bool; set` -> main_0_
3. help env; `-- -i --completion $0 >> ~/.bashrc`

typealias Dict=MutableMap<Str, Any>//eg List,Enum,x:Bool/fun x() /main:Ln<Str> , r(Cyan bg Red){}
typealias Argv=Array<out Str>
typealias Ln<T>=MutableList<T>
typealias YN=Boolean
typealias Str=String
const val NO=null

typealias MvEq<T>=Eq<Str/*path*/,T>
data class Eq<A,B>(val cat:(A)->B, val cut:(B)->A) {
  companion object {
    val typed=mutableMapOf(File::class to MvEq<File>(::File,{it.path/std}))
  }
}

abstract class CLI(help="name .. or(const .isOptional)",alias="short s sh; - help"):KMutableProperty0<Args>,Send/*cols:[val-default id TYPE]*/ { }
inline fun<reified T> Dict.invoke():T=TODO("fill empty")
//AP(kvinT: [k]=varFSet num FSend)
fun Dict.fire(kv:AP, sk:AP, help:Dict,alias:Grouping<Str,Str>)=MvEq<Ln<Str>> {}{}

val seps=mutableListOf("--","-","/") //auto-supports 1char: -Dx=y; ip r; --kwarg=v -qe'v'; -p A:B, p_2_, p("A","B")
val shorten={firstLetters}
var kArg="outfile"

import org.parserkt.fire.*

fun main(a:Argv)=a.Dict<App>()
enum class Format{html,csv,pdf}

class App(
  var input:File,
  var output:File,
  var fmt:Ln<Format>=Format.CSV,
  var strFmt:Format?=NO,
  var debug:Boolean=false,
  var eps:Double=.01,
):CLI("""
i Input file
o Output file name
f Format for output file
iof- File IO
sf Choose one
d Turn on debug mode
eps Observational error
""", "eps") {
  //var main_2_:Ln<File>; set(a) { val(input,output)=a } //for positional
  fun main() {
    val str=input.readText()
    val res=calculate(str)
    fmt.forEach{produce(res,it)}
  }
  fun calculate(data:Str)=listOf<Double>()
  fun produce(res:Ln<Double>,it:Format)=TODO("output, res,it")
}


fun main(a:Argv)=a.Dict<Example>()
class Example(
  var out0:File,
  var summary:_0,
  var mul:_1
):CLI("""
- \nUse subcmds
s Calculate summary
m Multiply
""") {
  class _0(var invert:Boolean=false):Adds("""
  i Invert results
  main Addendums
  """)
  class _1():Adds("""
  main Numbers
  """)
  
  open class Adds(s:Str):CLI(s) {
    protected var result=0
    var main:Ln<Int>; set(a){
      println(a)
    }
  }
}

fun main(a:Argv)=a.Dict<Hello>()
class Hello /*:CliktCommand */ (
  var name:Str,
  var source: Ln<FStr>,
  var out: File,
  var r:Fire,
  var count:Int=1,
  var v:Boolean=false,
):CLI("""
c Number of greetings
id The person to greet?Your name?
v enable verbose mode(or .env)??
""", "name id") {
  fun main() {
    (1..count).forEach{ r("Hello $name") }
    out.Eq("") {it+source.joinToString()} //append
  }
}
NAME<App>(Sav).cat(a.seq)
fun main(a:Argv)=a.Sav <KtCompiler>(/*call*/)
enum class OutputFormat(val defaultSuffix: String) {
	EXECUTABLE(
		if (System.getProperties().getProperty("os.name").contains("Windows", true)) ".exe"
		else ".out"
	),
	IR(".ll"), BITCODE(".bc"), OBJECT(".o"), ASSEMBLY(".asm")
}

class KtCompiler(
  var output:File,
  var format:OutputFormat=OutputFormat.EXECUTABLE,
  var target:String="",
  var optLevel:Int=0,
):CLI("""
o the path to place compiling output
f the output format of the compiling result
t the target triple used by LLVM
O code optimization level (0~3)
pt print time consumed by each process of compiling
main source.kt files
""", "optLevel O; -- * t") { //no short for ALL vs when unparse, prefer --target X. -hD k=v ARE -h -DSTRING
  var main:Ln<File>; set(a) {}
  fun printTime(){}
}


import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.full.primaryConstructor
import java.io.File

infix inline fun <reified T : Any> T.merge(other: T): T {
  val nameToProperty = T::class.declaredMemberProperties.associateBy { it.name }
  val primaryConstructor = T::class.primaryConstructor!!
  val args = primaryConstructor.parameters.associateWith { parameter ->
      val property = nameToProperty[parameter.name]!!

      (property.get(other) ?: property.get(this))
  }
  return primaryConstructor.callBy(args)
}

最好将类视为K:V，用 from/toStr 的方式读写V，再为自身支持读写。为读取n参命令、显示默认，对象要提供 k:v0Ti(`Var<Any?>,default/Unit`,T转换,id必填), `cli.arg.n["-h"]=-1, subcmd=0`

- 两通 `Eq<A,B>(cat=AB,cut=BA)` 通过 `Eq.typed[Int/Enum/File]().cat("0")` 自动查找
- `TDict<A,Eq<Str,*>>` 创建 `class A(var x:Str, a:Ln<XX>,ary_0_) {fun main(){}}` 的信息+Var，后随 `{dict->{Eq<Ln<Str>,Any>(向A赋值,重建)}}`
- `CLI(help,arg)` 只会生成帮助命令分组(?env询问? -he )和别名(默认逐词首字)，还提供 `.to{name="Jack";n=2} as Process` 
- `Unix(arg={"-h"-1}){k,v->}` 会为子命令实现(流)解析 `--k=v orV -skeys_kV orV` --，最后赋值main。 -hi 所安装的补齐使用 -enum '??'


```kt
//想把⬃暴露到bash,pwsh
fun printTimes(txt:String, n=3,cap=false)
//请提升为
class PrintTimes(var args:Str, var n:Int=3):CLI() {
  fun cap(){}
  fun main(){} 
}

CLI("""
a help ?env询问?
ab- group
- \$files\ndocstring
""",arg="a b,") //-h 含命令分组(-he .env编辑)和别名/逐词首字
```

原理：`Eq.Dict<A>` 按 Str:v0Tids (v `Var<Any>`,v0 default/Unit,T 组装读写器 `Eq=Typer<Eq<Str,Any>>`,id 必填标,s 注解) 子级读写 `{Eq(argv,it.Dict)}`
- `Eq(cat=parseInt,cut=toStr)` 负责Any的强转。实现 `(Dict)->(B)->Eq<Ln<Str>/*s=0*/,B>` 以被父命令读写
- 支持Enum,File,Ln=List, 把0参fun视为Bool(s=-1); 禁止Any,Num,.情况类型
- `--k=v orV -bools_kV orV --` 赋值为Ln/Str，最后赋值args。 -hi 所安装的补齐查找 -enum '??', 未来愿支持 py:rich
- 纯交互可以用 `p=Ftp().to{url=""} p-"Name:.*", p+"user"` 来写


Dict<T>()就能用默认值，创建子命令树，用var by实现子命令解析。 但这种不隔离值与类型的Dict，无法支持简单的 List<BoxInt>，而且把var全建模为对象是很用完即扔的语法糖

那一周鬼打墙的是， Int值类型在用Eq(from,toStr), User引用在用Var(v="str"or ["args"])， 最后把试图融合二者的我搞炸了。当时以为字典遍历赋值都需要class Unix解析工具

当时以为能给Int.static 外扩接口就完工，最后知道还要最优雅的Str流读写。 而且还没有统一单参0参和var set


class printer(
  var input:File,
  var output:File?,
  var fmt:Format=Format.CSV,
  var strFmt:Ln<Format>=listOf(),
  var eps:Double=.01,
  //var arg:Ln<File> //for positional
) {
  companion object:CLI("""printer app
  f Format for output file
  ?iof File IO
  sf Choose one as for output
  d Turn on debug mode
  eps Observational error
  """, "eps")
  fun main() {
    val str=input.readText()
    val res=calculate(str)
    fmt.forEach{produce(res,it)}
  }
  fun _debug(){}
  enum class Format{html,csv,pdf}

  fun calculate(data:Str)=listOf<Double>()
  fun produce(res:Ln<Double>,it:Format)=TODO("output, res,it")
}

class hello /*:CliktCommand */ (
  var name:Str,
  var count:Int=1,
  var source:Ln<File>,
  var out:File,
  var v:YN=false,
) {
  companion object:CLI("""
  c Number of greetings
  id The person to greet?Your name?
  v enable verbose mode(or .env)?
  """, "name id")
  fun main() {
    (1..count).forEach{ r("Hello $name") }
      ""(out.Eq) {it+source.joinToString{ it.Eq.cat("") }} //append
  }
}

class numeric(
  var out0:File,
) {
  companion object:CLI("""Use subcmds
  s Calculate summary
  m Multiply
  """)
  class sum(var invert:YN=false):Adds("""
  i Invert results
  main Addendums
  """)
  class mul():Adds("""
  main Numbers
  """)
  
  open class Adds(s:Str, var arg:Ln<Int>) {
    protected var result=0
    fun main() = "$arg"
  }
}

class kt_compiler(
  var output:File,
  var arg:Ln<File>,
  var format:Outputs=Outputs.EXECUTABLE,
  var target:String="",
  var optLevel:Int=0,
) {
  companion object:CLI("""kt-compiler
  arg [source.kt ..]
  o the path to place compiling output
  f the output format of the compiling result
  t the target triple used by LLVM
  O code optimization level (0~3)
  pt print time consumed by each process of compiling
  """, "optLevel O; -- ALL t")
  //no short for ALL vs in sh<>("bin"(,file to"o")), prefer --target X. -hD k=v ARE -h -D STR

  fun main() {}
  fun _printTime(){}

  enum class Outputs(val defaultSuffix: String) {
    OBJECT(".o"), ASSEMBLY(".asm"), IR(".ll"), BITCODE(".bc"),
    EXECUTABLE(
      if ("Windows"in System["os.name"]) ".exe" //.getProperties().getProperty
      else ".out"
    )
  }
}

class cli(
  var username: Str?,
  var count:Int=1,
  var arg: Ln<Str>,
  var destination: Str
) {
  companion object:CLI("""
  v enable verbose mode
  u name of the user
  n number of the widgets
  arg source filenames
  o destination
  """, "count n; destination o")
  fun _v(){}
  fun main() = "Hello, $name!"+
    "Moving $count widgets from $source to $destination."
}

class Cli : CliktCommand() {
  val v: Boolean by option(help = "enable verbose mode").flag()
  val username: String? by option(help = "name of the user")
  val count: Int? by option(help = "number of the widgets").int()
  val source: List<String> by argument(help = "source filenames").multiple()
  val destination: String by argument(help = "destination")
  override fun run() {
      println("Hello, $name!")
      println("Moving $count widgets from $source to $destination.")
  }
}

Fire.kt only|Fire.py only
:--|:--
fun _flag, vars:File/Typed,inherit|vararg==posarg,eval()s
statics: CLI("help","alias"), auto -sHORT|all docstr
class cli{fun main()} new-inject|global:def cli(*), also with subcmd=chain,dictkey
cli.sh(unparse), -he envedit,-hii shcomp,.|`python -m fire a.py`, chain reorder, --interactive,.
