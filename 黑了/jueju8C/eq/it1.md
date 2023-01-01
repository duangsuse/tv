# 渲染机制

在上节你了解了 `app.it.n` 具体是怎么连接 `Object, Node` 两种东西的，但话没有说完

>这避免了在JS的编程思路里岔入DOM甚至HTML的概念，`obj.it` 们是什么？当有多个元素绑到 `app.it.n` 时会怎样？ 回答这些能帮你get到HTML优于其它UI方法的设计哲学

HTML 的高明之处就在于，为什么 `e.innerHTML=e.innerHTML.replace()` 之流那么烂却依然works——Node、文本、CSS状态、cssText 的更新会立刻由浏览器重算重排重绘，且由事件冒泡等统一机制暴露给可以简短的js。

这正是或快或慢的各语言UI框架们做不到的，令人感叹的是，就连js自己的框架也未选择DOM的道路，而是把它与XML混为一谈。

>EQ只是利用 `wA wSty wOp` 为试玩(调试)提供了 `e.V.id, .op.tap, .css.shadow` 和 `e0>tag[attr,css,op,.]>ee` 等快速访问，并没有数据意义上的虚拟DOM。所以这节是方便大家了解流行框架

虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将常见应用必需的 UI 通过数据结构表示出来，将真实的 DOM 与之保持同步。这个概念由 React 率先开拓，Vue 也收获颇丰。

VDOM 的构造就是 `cat ui.html|jq #pip包`，但只记录对UI有意义的成分

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* 更多 vnode */
  ]
}

//EQ 没有JS调用和CSS简写以外的方法表示UI树。
with(el){
vnode=div(wA({id:'hello'}), /*div子项*/ )
}
```

`el` 带来的主要收益是它让开发者能够灵活、声明式地创建、检查和组合所需 UI 的结构，同时只需把具体的 DOM 操作留给EQ的 wA/S/O 三要素去处理。

`el` 组件没有 `props / emits`(为 wA,wOp 提供接口)，一个不错的选择是修改传入的对象 `Item(row={a:1,b:2}); row.xx; row.wOp()` ，EQ提供了 `EventTarget.at(row, op={click:1}); op.click()`

`el` 暂时不支持 shadow root 局域化CSS，但它天然地支持“模板内插模板”-给JS函数传函数。同Vue3，EQ没有为这种情况设计API，我们甚至没有分析“定义函数”的利弊。

## 同类框架才有

挂载 (mount)：运行时渲染器将会深先遍历并整个虚拟 DOM 树，添加每个节点

更新 (patch)：对新旧虚拟 DOM 树，深度比较其相同键，找出它们之间的区别，将变化赋值到真实 DOM，又被称为“比对”(diffing) 或“协调”(reconciliation)。


渲染管线
从高层面的视角看，Vue 组件挂载时会发生如下几件事：

1. 编译：模板被编译为返回VDOM的渲染函数。这一步骤可以通过构建步骤提前完成，也可以像EQ这样即时完成。
2. 挂载：这一步会作为响应式副作用执行，因此它会追踪其中所用到的所有响应式依赖。
3. 更新：依赖被赋值也使其副作用重算，再次创建VDOM。`Vue` 对其进行更新
4. 更新

真正的渲染函数可以手写：

```js
// 只有div必填
h('div')
h('div', { id: 'foo' })

//EQ仅允许“DOM属性”而未规范JS属性
h('div', { class: 'bar', innerHTML: 'hello' })
h('div', { '.name': 'some-name', '^width': '100' })

// 类与样式可以像在模板中一样
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器名必须为 onXxx
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 props 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnodes 与字符串
h('div', ['hello', h('span', 'hello')])
```

hyperscript 的写法和 EQ 雷同，因此仅给出等价的 EQ emet

```
div
div#foo
.bar{hello}
// p 内默认标签为span,ul ol为li,否则 div。emet不支持table,select 的简写

[width=100]${e=>e.name='some-name'}
.foo[$fg=red]${wSty`bar${$Y}`} //bar可开关
[tap=${say.it("good")}]
#foo{hello}
{hello}
div span{hello}
div #{hello}+span{hello}
```

`v-model` 展开为

```js
export default {
  props: ['xx'],
  emits: ['update:xx'],

setup(props,{emit})
h(SomeComponent, {
  xx: props.xx,
  'onUpdate:xx': v=> emit('update:xx', v)
})
```

`:` 展开为(EQ 仅允许通过CSS类 `wA.alias.css.pin=e=>` 按style传参)

```js
import { h, withDirectives } from 'vue'

// 自定义指令
const pin = {
  mounted() { /* ... */ },
  updated() { /* ... */ }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```

另外有些点：

- `export {setup(props) return ()=>h('div')}` 
- EQ里 main 可以返回[""]或[]，但只有 el 内 `it.文本` 才被绑定
- `hr,br` 都是带括号的。DOM 相同节点只能被插入1次，或需 `cloneNode(isDeep)`，EQ可以用它优化列表创建，但我们选择晚删除以复用旧节点。
- 不能使用HTML属性 `class,label[for]` ，对for以 `el.input(ref, "+注释"), el.sel('a b c',ref, "+注释")` 即可
- 对于 `.passive`、`.capture` 和 `.once` 事件修饰符，写在 `wOp({},'这里')`。对应名字是 scroll,meFirst,once
- 对快捷键填写 `accessKey="Ctrl+S"`

如果一个渲染函数组件不需要任何实例状态，即便它需要子元素，理所当然，写成函数即可：

```js
Hello=()=>"你好世界"

rep=(txt,n)=>el.div(...
  rn(1,n).lets(i=>el.p(txt))
)
rep=(txt,n)=>el`div p{${txt}第$0}*${n} `

rep=(f_e,n)=>el`div p ${f_e}*${n} `
```

没错，这就是一个合法的 EQjs 组件！参阅《ES6标准入门》来了解更多语法细节。

## 渲染函数案例

```js
<div>
  <div v-if="ok">yes</div>
  <span v-else>no</span>
</div>

div(when(x.ok, [span("no"),div("yes")], noOp)  )

<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li >
</ul>

app.items.sort='id'
ary(x.items, ({id,text})=>li(text))

h('ul',
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)

<button
  onClick={(event) => {
    /* ... */
  }}
>
  click me
</button>

btn(click_me=>/**/)
```


