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