import kotlin.reflect.*

//便民缩写
typealias Argv=Array<out Str>
typealias Ln<T> =MutableList<T>
typealias Str=String
val NO=null

////弱变量+=类型
interface Var<T>{var v:T}
abstract class TYPE<a>{ val typed=mutableMapOf<Class<*>,(JS/*Array<a>,.*/)->a>()
  inline fun<reified T> add(x:a){typed[T::class.java]={x}}
}
class Eq<A,B>(val cat:A.()->B, val cut:B.()->A) {
  companion object:TYPE<Eq<JS,JS>>() {}
}

//k:v0Ti, 将fun()解释为var Bool, cli.n[it]=?:-1, Ln=0
typealias Bools=Int//0b11
typealias JS=Any?
class TVar<a>(private val o:Any,private val p:KMutableProperty1<Any,JS>, val v0:JS, val T:a,val id:Bools):Var<JS> {
  val k=p.name;
  override var v get()=p.get(o); set(v)=p.set(o,v)
}
open class JSMap<V>(private val p:MutableMap<Str,V>):MutableMap<Str,V>by p
class TDict<T,a>(tv:Ln<TVar<a>>, val o:T,val v:a): JSMap<TVar<a>>(tv.associateByTo(mutableMapOf()){it.k}) {

}

inline fun<reified T,a> TYPE<a>.TDict(noinline v:TDict<T,a>.()->a)=run {

  typed[T::class.java]={v(it as TDict<T,a>)}
}


跨语言面向人类逻辑编程，兼容英汉日彦颜文字
JS/XML dialect & a moderated framework federation


IntStr KvLn NdRn FnFA.[RowNO] KSetISet IC_1N Cnts.


FFMpeg(raw&streams,cropRot,de/%.gif/pano),p7z,pandoc/openai, cu(ytdl/lux/hitomi),gvfs,xclip,autokey,gcc..
Scrapegraph,pastebin/jsbin,godbolt/tio.run,

cat https://github.com/sharkdp/bat
cd;du https://github.com/ajeetdsouza/zoxide?tab=readme-ov-file#third-party-integrations  https://github.com/Canop/broot +Kitty
grep -P https://github.com/BurntSushi/ripgrep
wc https://github.com/XAMPPRocky/tokei
btop;conky https://github.com/sqshq/sampler GO

https://github.com/Unitech/pm2
awk;jq https://github.com/kellyjonbrazil/jc
wasmfs https://github.com/ebidel/filer.js
nc;websocat


想到了一个bash_comp自动配置，取代那些无意义的补齐脚本
遇到-flag -kw a/b/c arg 补齐时直接问 '**' ，获得全部 enum{},--token,或compgen的类型信息缓存
要动态生成的，问 '-kw *'  'file1 *' 。dry-run 有多难?何必写两遍 #parser 呢
用在容错解析同样有效，'¿' 替代空洞就懂
