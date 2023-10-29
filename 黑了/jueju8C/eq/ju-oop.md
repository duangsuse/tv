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

