
EQuery 是一个纯JS前端界面绑定/网络/存储PJAX 框架，基于ES6和eqjs预处理器。就体量看，你也可以说它是JSX一样的JS方言，可以打包 无需编译

EQ 的口号是 "Why we need XML" ，比起靠代码补齐=复制粘贴，EQ 鼓励可组合、低特殊的界面，全JS编写、全JS数据绑定。没有与元素割裂的“控件” “组件” “主App”，无论你来自 Vue,JQ,DOM ，都能熟悉EQ的wOp监听、数据变更写法。EQ的功能不逊色于以上三者

在核心功能外，EQ覆盖了90% DOM API(rateLim,CSS,SVG,Workers,PWA)及Eqv双向转化、Trie前缀补齐、Vec2D点、anim ease动画，且压缩前不超过20KB，不用则0感受，用到时0差异。

简例来说

```html
<button @click="increment">Count is: {{ n }}</button>
<script>
//旧 Vue Counter
export default {
  data(){return {n: 0} },
  methods:{
    increment() { this.n++ }
  },
  mounted() { console.log(`count from ${this.n}`) }
}

//新 Vue, html 同上
n = ref(0)
function increment() {
  n.value++
}
onMounted(() => {
  console.log(`count from ${this.n}`)
})
```

对我而言，旧的太密太杂，新的太散太硬。等效EQ

```js
let app={n:0}

main=()=>(say(`count from ${app.n}`),
  el.button(wOp({
    tap(){ app.n++ }
  }), "Count: ",app.it.n)
)
```

或许你觉得这个更乱，它是按中文读者的换行逻辑，那么用规范写法来一遍

```html
//counter.html
<script src="https://eqjs.org/1.js">
main=()=>{
  say(`count from ${app.n}`)
  return el.button(
    wOp({
      tap(){ app.n++ } //increment
    }),
    "Count: ",app.it.n
  )
}
</script>
```

你甚至能给数字增长加动画

```js
app={n:0}
main=(N=app.it.n)=>[
  el.b("已收集",N,"票"),
  el.input(N(读入倍率(1.5)),"助力一下")//TODO "150%加成"
]

anim.at(app.it.n).let({dur:1}) //默认单位:秒，用 rateLim(1,fn) 自动处理频率过快问题
读入倍率=k=>Eqv(x=>x*rn(1,k).rand()).fcat
```

先看一个显示软件版本的小UI，它使用 wA, wSty, wOp 三要素配置el元素：数据、排版、交互

```js
let app={major:3, minor:1, upd:NO}

with(el){
doc.body.tail=el.h3("听书",
  el.bind(app, x=>
    p(x.major,".", small(x.minor), ifHas(x.upd, x=>sup(wSty`color:green on wheat`, "^",x.major,".",x.minor)) ),
  btn((检查更新,更新,完成)=>{ if(更新)app.let(app.upd); else app.upd={...app, minor:2,upd:NO}; return 更新+1 })
)
}
```

更新被点击，0次节点增删，0个元素被逐个检查是否有改动，甚至 "^"+3+"."+2 都从未被计算，`{major:3}` 等属性的读写，立刻反映到或深或浅的元素上，对input 元素、`wA({edit:$Y})` 元素的修改也立刻反映到 `{}` 对象里，这就是EQ绑定。

EQ不强制你用某种“规范”的class 甚至 `export` 去割裂数据与界面交互，也不需要JS属性/方法外的写法来扩充EQ本身，你可以开箱即用，也可以按原汁原味的JS封装你的“组件”、用 `eqjs 导入.html`，如假包换的定义式WebUI理念。除此之外，EQ还有少量简写

解释下 `wSty color: fg on bg` 展开是 `color:green;background:wheat` ，类似有 pad=padding,pado=margin 的简写，完整见 el.alias 。但 wA, wOp 没出现啊？

“没出现”就是组合的精髓。民科吧有位大哥说过，“计算机早知答案，它只是在装模作样”，为何你没觉得画正弦图时电脑算了上万次sin？工具，不折腾。只有拆开看，才能看到EQUI的基石-wA和wOp

```js
let
//ifHasA('name',{name:'Mike',age:9}, x=>x.age)
ifHasA=(key,it, el)=>el(it).let(wA(show: it.it[key])),
//更常见 ifHas(app.it.user, x=>x.name, "未登录")
ifHas=(it, el,e0=NO)=>{
  let upd=v=>v? el(v.it) : e0(),
  e=upd(it), here=e.ins
  it.onmod=v=>{here.e=upd(v)}
  return e
},
//btn((修改,提交)=> row.V.it({edit:x=>!x}).edit? 1 : 0)
btn=f=>{
  let a=this_.argNames(f)
  return el.button(wOp({tap(e) {e.innerText=a[f()||0] } }), a[0])
}
el.button=wSty`bs-btn` //修改默认值，添加CSS类
```

以上两项很常用，包含在EQjs内。 ifHas 是无缓存版的 el.when，但都是找插入位置，换掉重绑一次

EQ的列表绑定

另外Vue/Doc/Examples 的所有 Basic 示例，在此展示EQ版

```js
with(el){
main=()=>h1("Hello world!")

app={text:"hello"}
main=()=>[h1(app.it.text),
  btn(逆序=> Eqv.join("").onCut(app.text, x=>x.reverse()) ),
  btn(加感叹=> app.text+='!'),
  a(wOp({tap:noOp}, 'only'), "https://eqvjs.org")
]

app={tip:"Leave Me", isRed:$Y, color:'green' }
main=()=>el.bind(app,x=>{
  let togR=wSty`red${x.isRed}`, togGB={color:x=>x[0]=='g'?"blue":"green"}
  el`
  p [title=${x.tip}]{悬浮以查看提示},
  p[tap=${()=>x.isRed.v^=1}]{点击开关红色}${togR}
  p[$fg=${x.color},tap=${()=>x(togGB)}]{点击切换绿蓝}
  `
})
el.href`
.red{color:red}
`

app={a:[1,2,3], show:$Y}
main=()=>bind(app.a, a=>[
  btn(显隐=>{app.it.show.v^=1}),
  btn(添=>a.tail=n(a)+1 ), btn(泡=>a.pop()),
  btn(逆=>a.make(a=>a.reverse())),
  when(app, ["List hidden",
    ary(a, x=>li(x), ul("List empty"))],
    x=>x.show)
])

app={
  grocerys: ss`蔬菜 奶酪 食食物者为俊杰`
  .lets((x,id)=>({id, text:x }))
  .let(a=> a.it.sort=x=>x.id )
}
main=()=>ol(
  ary(app.it.grocerys, item=>TodoItem(item))
)
TodoItem=(todo)=>li(todo.text)

form={
  name: 'Eval You', dev: $Y,
  lang: 'JS', stack: ['Vue'],
  codeQual: 'A',
  teammate: ['A']
}
main=()=>bind(form, x=>el`
  h2{Text Input}
  input[v=${x.name}]+{${x.name}}
  h2{Checkbox}
  label input[v=${x.dev}]+{是${x.dev(Eqv.way("开发者","极客")) }}
  h2{Radio}
  ${el.sel('Java JS',x.lang,"", 1)}
  {Pick: ${x.lang}}
  h2{Multi Checkbox}
  ${sel('Vue Angular React',x.stack)}
  {Names: ${x.stack(Eqv.json)}}
  h2{Select}
  ${sel('A B C',x.codeQual,1,0).let(plsSel) }
  h2{Multi Select}
  ${sel('A B C',x.teammate,NO,[0]) }
  {Names: ${x.teammate(Eqv.json)}}
`)
plsSel=e=>{e.ins.eL=option(wA({disabled:$Y}), "请选吧")  }
}
```

如果使用Vue编写，即便想复用“选择性别”1个 `<select>` ，也要把它注册为 Component 再以HTML的形式调用。EQ不止于简写，你可以把上例${} 里任意一段 `let part=x=>(粘贴)`，这是EQ的"v-model"

EQ并不是用算法兜售设计模式，EQ的设计本身就是穷尽浏览器和JS之模式；让二者相乘，而不是仅仅同场。 H5是世界上最优秀的展现框架，Office,Flash,VSCode基于雷同的模型，所有移动、桌面端UI框架，基于Layout/Widget，都没有DOM树的简洁和可扩展，Web的传输从文字变为WebSocket+Blob、Web的类型从富文本或Flash进化到图的像素或点线、声的形状、RTC视频、GL加速，甚至gcc和java,apk都能在WASM的离线沙盒里运行。然而这种繁多却狭窄了它的接受面，许多人认为前端=低端，Vue 等“函数式”框架的流行让设计师们更有动力，甚至“逼格”；但脱离DOM 不是我们唯一的前路，自创DOM但保留XML更不是。看过繁多的术语套路，偶尔也要回到最初，吝啬于抽象的长命名，哪怕减1个字；踌躇于抽象的短命名，哪怕多1秒钟。

EQ学JQ极少扩展Node，即HTML(元素+文字)类型。只加4个只读属性 pos,ins,qs,V
- pos .L .R 封装了 NodeIterator 即 nextSibling; .css=NO 显示文字节点; .n=NO 收集为列表; .deep=5 使用 TreeWalker. NodeFilter 也利用 Flag() 糖化了
- ins L R; e eL eR 封装了 insertAdjacentHTML 和 replaceWith ，它实现 el.when 判断。其实 e.ins.eR 读写上等同 e.tail，LR eLR 不像 pos.L=e1 替换左元素为e1，只插入
- qs\`\` CSS选择器以 含内插文本 形式调用，返回数组。但 doc.body.qs\`.a${e=>{say(e.id)}} .b{wSty("new")}\` 相当于调用2次qs，全部及新增符合.a 的节点输出其名字，.b 同理自动加CSS类 "new"，返回增长数组，

或许你想问，JQ不区分“单或多元素”的调用链在哪。 qs\`body *\`.let(wSty("dark")).let(_=>say(id)) 的 let 家族是更通用的答案。
- `1.lets(x=>x+1) ==2`，意为 1 letAs x=> x+1
- `User("Tom",12).lets(_=>`${name} (${age}yo)`) =="Tom (12yo)"`，意为 tom letAs this=> name+age格式
- `tom.let(_=>{age+=1}) .age==13` 意味 tom令+1岁 取年龄
- `app.let({user:tom, vip:2})` 同 `Object.assign` ，因为EQ绑定试玩时经常要批量赋值。EQ支持数组变更或拆分化输入

回到qs，“全部”含“新增”有何意义呢？假如给 `textarea {overflow:resize}` 又想保证宽>高，用

```js
tarea.qs`[style]${e=>
  let v=e.V.area; v.y=v.y.wereIn(rn(0,v.x)) //长度Y in 0~长度X
}`
//即
tarea.qs`[style]${(e,oldVal,oldTxt)=>el.get(v=>{
  wA({area:v})(e); v.y=Math.min(v.y,v.x) 
})}` //.drop() 移除监听
```

当用户拖拽右下角，`MutationObserver` 能监听节点增删、属性的变更，EQ的封装会对每次变更执行你的函数，从而实现H5原生般的节点扩充

`el.get((a,b,c)=>{})` 是EQ作为全绑定框架特有的爬虫能力：其内 `el[".btn"](wA({a}),b) (doc.body)` 会匹配 `<首个 class=btn a=?>b</首个>` 解出 a.v 以读写属性a。`e.V.area` 等V变量正是基于 wA 绑定到的，用来方便调试。

## Eqv

接下来看看『等价关系』框架

在左侧文本框用空格切分，在右侧可编辑div按行分割

```js
app={words:[], sep:[' ','\n']}
main=(sp=app.sep.it, ws=i=>app.it.words(Eqv.of(Eqv.join,sp[i])) )=>[
  input(sp[0]),"vs.",input(sp[1])
  grid(1,2,
    textarea(ws(0)), div(wA({edit:$Y}), ws(1)(Eqv.each(Eqv.fmt`${0}!`)) )
  )
]
```

String<=>Number

从文件到内存称cat，从内存到文件称cut，toString就把一个4字节的整数切成长度不定的10进制数

render<=>scrape

`el['*'](wSty({fg:x.vip}), "UID: ",x.id)` 则可以找到内容符合正则的元素以解构

request<=>response

```js
el.href`yaml`

qs.H({url:"https://www.shanghairanking.cn/api/pub/v1"}, yml`
/bcur: GET() year,_type => Schools
forEach:
  *: (X-APP-TOKEN) => (status=X-STATUS)${resp=>{/*吐槽*/}}
`)

吐槽：所有人(点名SOAP!)都忽略了HTTP状态而自创 `{error:"", data:resp}` 甚至 `{status:200,message:null,data}` ，我们只能支持自定义尾处理以兼容非HTTP报错

qs.H({url:"apks.com"}, yml`
/apk:
  crud: Apk #v 等于以下
/apk/?id/:
  - GET => Apk
  - DELETE()
  - PUT(v:Apk)
/apk:
  - GET() => Apks
  - POST(v:Apk)

/buk:
  crudBoy: [new, all, "", remove]
  crud: Bucket #v 等于以下
/buk/?id:
  - () => Apk
  - PUT(v:Apk)
/buk/?id/new: POST(v:Apk)
/buk/?id/remove: POST
/buk:
  - GET() => Apks
`)
```

REST crud风格用 apk. get,all,add,del 调用，结果的 save() 和整体add默认调用PUT，PUT不在重复时报错。 

HTML<=>命令行

「凝聚的代码，连展现都能超越」

<div style="font: 50px system-ui;"><p style="
    border: 3px dashed;
    width: 1em;
    height: 1em;
    text-align: center;
    line-height: 1;
    transform: rotate3d(1, 12, 1, 30deg) scale(0.4);
    background: #daac6e;
    color: wheat;
    display: inline-block;
"><i style="
    font-size: 0px;
">best tooling</i>=</p><b style="
    background: repeating-linear-gradient(45deg, lime -4px, green 14px);
    -webkit-text-stroke: #972ea9 2px;
">E</b><b style="
    background: repeating-linear-gradient(45deg, cyan 3px, blue 12px);
    -webkit-text-stroke: #d85d54 2px;
">Q</b><u style="
    color: slategray;
    font: 30px monospace;
    vertical-align: sub;
">uery</u>
    <style>div b{-webkit-background-clip:text}</style>
</div>