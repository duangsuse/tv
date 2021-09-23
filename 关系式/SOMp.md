# FFI 扩展的 binkt

- Seq(a,b,..) `struct`
- One(pIdx, ...ps) `union`
- More(pLen, p) `T[N]`
- Ptr(p,dep=1) `T*`

以及 ordBE, ordLE 和 align 组合器和 \0 cstr，Struct.packed 就是 align=0

之前 SomeAXML 的框架失败在 Pool 常量池建模失败(本质需流变量,或用事件时清空)、 `One(int, A, B)` 不得不返回 `Pair<Int,A|B>` ，因为 tag 一个实例本身是在混淆 类型和实例 的生命期，除非类型有默认实例，或者利用 `o.type.tag` 的反射，要不然就得利用 `Map<KClass,Int> unionNo` 有额外开销，但 JS `o.constructor` 就 OK

还有 bitflags ，错在对此不该强类型，以 string 表示 flag 编号已经足够；它本是动态 无常用、无代码生成才能的强约束
