wOP, VVOP(view var oriented p.) 是HOLP范式(human oriented logical p.) 对js的押韵变体，有5条原则：

多广播单选行haadNO
- 调用链可以嵌入函数 a.as(x=>) ，那么当a是复数，首次返回$YN,over 就代表mapNotNull,forEach
- a.at(x=>find) 也默认为非空, 返回$Y视为得原项
- __as(x,零点), as(NO) 可实现单参push和0参pop__
- x.as(An=>) 实现with(x), 基于evalFun(报错闭包替换)

歪嘴假换YNOoo: 4+2种orErr
- `[]` length为0
- `""` trim后为空
- `NaN`
- `Error` stack为文本
- $Y,$N,NO,+oo,o0,over(null,Inf, NaN,undef) 是常量
- __over值仅能用于函数重载__, oo.N是采样精度

除了处理错误 `or("grpErr"), x.or(err=>假值), as(或空, x=>)`
- u.age?.as() 不应执行, `$N.as()==NO` 而非原值$N
- `u.as.age()` __as链接受Promise__！ `age(b)` 也能调用 `env.age(u,b)` 让as链取代fn.bind
-  在age非函数时(x=>)自动前置as，配合evalFun可跨端执行。 可逆Out里颗粒化为 `age(b)(it)`

wOP是一致的
- as适用于任意(异步)值、数组、关键数组 `Out([])`、关键变量 `inout(x=>)(ino(0))`。or只取代||,else
- __任何需要Promise或回调的位置，都能提供 inout()__, `ino.then` 会执行单监听next
- `Incy((An,y)=>)` eval出过滤流, 单参把ino记录为限动数组

wOP不全是纯的
- 这可以帮助 HI `Reload(F5=> F5(had([零点,+每页]))收集到F5.a)`, HI路由单页可以定制.pv(卡片元素)
- had用于并集(Set), posR含at,cut,下标,浮点后继; `at().posR()` 深克隆反转
- at自带的is()如 `([索引,]), '>0', [/./,'theads', rw=>tbl视图]` __预留为DSL__
- 对于CRUD, 请await `User({}), User.as({id})({字典即U} NO即D)`. 这里括号不必前置as

asres映射表,3异步,atft组页栏乱
- 仅 `as(res,()=>)` 捕获调栈报错, __类似RxJS流__
- as,at 亦实现 `Promise.all,race`
- `"1".as(Out($=>nbase$(10)), A=>A+"0")` 靠Out世界绑定映射两项, Out还有num,base,sep'\n',utf,camel
- `obj.as({临时swap, as:An=>})` 参赋链
- `as({key:x=>[x? 0 :NO, ]})` 用于字典或switch, 默认按'type'

列表
- at(Sum.as,key)可求和+分组, atsort即地照游标(.Sep)分组, 支持-字符串序数, 另有 at{Rate,N}
- fork,pageN(Nf,-.0),join(Sum.ln), cut(1,L=res,R=[]), cut(0,0)模拟py[:] 分页
- TCols,TKV 分栏
- rn.reRand率/().l<1/pageN/cut/cyc

Sum
- 对(0项)归纳或unSum
- 标准和分组统计
- 无需中间列表创建kv,uniq 分组
- 记录求和步骤, 能实现[].join 和DP. unSum支持加权BFS

共赋值参数:4用4特inout,AStor浅先遍历
- 从DOM或JS监听新值 `Out(e,'change',rw,'val'), (obj,f)`; 轮询如 `1..s, 1..sRate(roDebounce,0禁用~3不限)`
- `Out.holdInit=[]` 在完成水合前阻滞as派生的变量
- 在 `Out(o,f)` 里，o.getXX setXX 会被预创建为属性, $onXX:'指向的键' 监听它
- 与限动数组互转需 at(), `await s.as(rw).at(over)`-即onEach到y(over)
- Incy.fn= 在数组,限动数组Incy(async流),values 上都可用。 "限时动态"是按需push的

inout有oxaf4种类型, 如a"关键数组"
- at有层0简写
- oxa都支持 `ro((x,b)=>x+1) (b)` 关键赋值, o可解构自身如 `obj({age:x=>x+1})`, `o.fn.如del(ev,)` 由setTimeout+冒泡广播调用
- `a.at(is),a.as(fn)` 2参皆可变
- a.onkid(B,A) 基于key/id缓存序号, `as((x,i游标)=>` i监听项的添删, `ary({})` 添加元素
- `Fn.at({f:thiz=>, p:Out(get,set?)},'rwx')` 代表!writable,enum,conf

AStor遍历
- lifecycle(1..s) 由ul,cond两种挂载函数的撤回层 `wOP.unload[]` 管理, 仅有'type'会重复渲染但 js/dom两侧的变更监听不会解绑
- A.at(B,s2,深=oo) 遍历{}树, 应用 `sum2=(A,B)=>A||B` 等原型-即命题反序列化或throw判定
- as,at 的左侧[] n不同时都支持多广播。将A'转化-赋值'为B的类型还支持 `ino,'',o0,(json如NO),Date[0],$N,/regex/` 或$$\`${txtVar}`
- 命题Fn `is.s("str")?` 提供参2时可throw
- `at([1,2],a=>a([x,2])? x)` 其中 `inout({x:0})({rwX})` 先向变量右赋值。类似地，在水合/URL变更与at结束后 DOM里的旧值才生效

## 4S4tI

wOP鼓励使用单字符变量名，作为前缀式类型标注。类似 swi-Prolog.org 的响应式rw参数甚至可大写驼峰

'oxaf 4类型' 并不奇怪，要知道wOP规范了 axescrufoLt 11种理念类型(concept types, ttype)
- 全称是 ary xItem elem str conf res url fn obj Len time<1
- 单职责: afoxin 6类型应当由函数名解释其用途，无需'xItem, iFind'的解释
- 语序化: 01AB 2对后缀表达覆盖与配对关系
- 调试打印 d{dtfmLO}= 如dd=取代了log, d=跳变时断点, F12能反射出监听器. wdoc内嵌(数组)文本

藏赋值参数,DLC.acty可吊销,at反序列-isTest
`class{override}` 就是向高阶函数传参，因此对象亦闭包。把 at=,rn(),n()预留为DSL

4S: Out-inouts-Sav Sum

基于4I: HI=CLI+Ini (后端=把SQL封装成命令行+环境变量=>RPC查询), “登录”是远程参数即句柄，可close `DLC.acty=$N`

除了HI ajax/pjax, `Sav({kvars})` 应支持Storage,Port/WS/Channel 同步, 函数变量(调用序号++); 以及层 {undo:+0}, URLParams 绑定在 `wOP({k:v,url:'pre_'})`

Sav 作为唯一的深监听,对有key/id的对象启用json监听&patch,对数组尾也jpatch, 亦可replay生成延时赋值js

