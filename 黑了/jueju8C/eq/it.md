# 取值响应式系统

EQ 最标志性的功能 `Eqv.pad(+1)` 代表 1和2 之间的关联，这种联系在 parseInt/toString; JSON导入导出 里更加明显，然而没有 `el.input(app.it.num(Eqv.int))` 的响应式 `it`，EQv 无法展现它最大的才能

EQ 不会以“组件”为基础单位设计界面，`app={n:1}` 及依赖它的界面就相当于“组件”。当写入 `app.n`，其对应的1元素 `textContent` ，或wA指定的 `setAttribute` 就更新，反之 `input[value]` onchange 也更新 `app.it.n`

这避免了在JS的编程思路里岔入DOM甚至HTML的概念，`obj.it` 们是什么？当有多个元素绑到 `app.it.n` 时会怎样？ 回答这些能帮你get到HTML优于其它UI方法的设计哲学

『响应式』在前端讨论中经常出现，它是一种可以使我们定义式地处理变化的编程范式。比如 Excel 表格：

A|B|C
:--|:--|:--
2|3|=A0+B0

单元格 C0 = A0 + B0 ，因此 C0 = 3，而每次 A0,B0 改写，C0 自动重算

JavaScript, 类C语言都没有这种概念。`a=1;b=2; c=a+b; say(c)` 里say 不会因 c 的赋值而重调用，c 也不因a,b 的改变重算，“c更新后say(c)的 __返回值在哪__”，如果知道，就能手动更新

```js
let C0

function make() {
  C0 = A0 + B0
}
```

- `make` 是一个 __动作__，它间接依赖，或者说订阅(subscribe)了 A0,B0
- `A0,B0` 是俩值，它们不是值可修改的 __引用__

EQ 的所有绑定都基于 `[], {}` 上的引用，而非 `1, "", $Y, var x` 这种只能计算1次的值创建。不像 Vue ，你必须点明 `[xx].it[0]` 以引用一个变量位置，也没有 `ref(0)` 那样匿名的引用

```js
win.C0='结果'
Eqv.at(it.C0, [it.A0,it.B0], (a,b)=>a+b)
A0=1;B0=2
say(C0)

it.C0.v==3
it.C0.onmod=say
C0=2
```

>不过EQ仍然使用了运行期依赖变量收集-`user.let(_=>name+age)` 的主语糖据此暂供全局的name,age，`eqjs` 工具会将其优化为合规的版本

`obj.x, obj.x=1` 的语义可以靠 `Object.defineProperty(obj, {get:()=>1, set:v=>$Y})` 来改写，覆盖set时也必覆盖get

EQ 用 `Array.it({set_size:[n=>n, a=>a.length, flags] })` 封装了define方法，

`it` 和 `it.xx.v` 是这么来的，但 `it.xx` 却依赖了 ES6 `new Proxy({}, {get:(obj,key)=>})`

```js
it.xx={v,onmod} //可调用(Eqv)
it({n:n=>n+1})
say.it('hello')('world'); win.it.close() //绑定参数
it()==values; it([..])=set; it([..], fn)=swap
({a:1,b:2}).it.keys==['a','b']
it('a b')([1,2]) //只加载keys的值
```

`it, it.xx` 有如此多功能，我们不该为不会绑定的对象/属性创建它，而该懒初始化。`Proxy` 正好能拦截 `it["xx"]` 并替换obj的xx属性，在拿到 `it.xx` 后其 `onmod` 就和obj.xx的赋值对应，其 `v` 也能获取 `obj._xx`

总的来说，EQ 不是基于 XML 和 tree diff 的双绑框架，没有 effect 即 update 这种函数式概念。`watchEffect(()=>), res=computed(()=>)` 对应的 `Eqv.at(rRes,...rArg,fr_v)` 更不甜，正如 `el(wA({}))` 的wA明明很多余，但良药苦口。

我们通过扩充 ES6 语言，而不是规范要绑定的data() 实现DOM和JS的联动，也将注重于DOM，而不是罕见的响应式属性。

EQ 不会深度转换 `{}` 为响应式代理，只有明确提及 `it.xx` 才会与DOM注册并监听，要实现撤销历史，可以利用 `CSS.s(2).rateLim` 快照编辑框。`immer.produce(a, a=>a1)` 对EQ这种非纯函数式无意义，但 `produce(a, a=>a1, (patch,inv)=>); applyPatches(obj,invs)` 会是很省心的优化方法

EQ 完全可以实现 `win.it.C0=calc(()=>A0+B0)` 的糖，一如 `el.get(uid=>(el[".user"](wA({uid})), uid.v))` 爬虫查询，但我们忌讳提供罕用的技巧，以及在核心功能上利用隐式编程，此外 `Eqv.at` 就没有必须写 `A0.value+B0.value` 的编译期转换问题，对 `ary.it` 也更统一。

所以，期待你提供相应的二次封装库。
