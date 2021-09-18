## prop绑定

`[]` 本质是 `k in 0..<N` 的 `{}`，可以用 Proxy 监听 push,shift 等 splice 外的修改操作，sp 会先清空再设

不应该做 `addListener` 的组织性逻辑，每个 k (即 i 于 a)暴露一个 onchange 就好

这实际上对数据存储认识的不够赤裸， `prop(o)[k].onchange` 是正确语序但也带来“是不是有 `[k].value,[k].set(v)`” 的误会，故用 `prop(o).k[k]` 简写式 op_modified 的存储

所以 bind 暴露下三项：`k, onadd, ondel`，分别对应 CRUD 的 UCD ，onadd/del 先同步 k 存储

`prop(o).keys/gets/sets .swap .with("a b c")(1,2,3,()=>) copy;mapK/V` 会是有意思的缩写， sets 等都可 `("a b", 1,2)` 可 `({a:1,b:2})`

prop 对 `Object.defineProperties` 复数的封装只需提供参数2，复用单项 set 的逻辑，回 ks

`prop(T,{wtf:1})` 定义 prototype ，而 `prop(T).wtf` 定义 static

此外， `prop.asCall` 可以包装函数，和 `prop.length` 等可以作为 `x=>x.length` 的简写

嗯我觉得 `prop.asCall(fetch,".",s=>"https://"+s).www.baidu.com().then(log)` 也比较有意思

有忽略一点，`onadd` 后是否也有“单项赋值”语义？比如 onadd 就是把 `o.k===undefined` 赋值掉， ondel 就是重 undef 一下对吧。假设你要 `items.push(null)` 时默认初始化新建一项，其实普通渲染逻辑也要做的。

这点若 `!none(v=onadd())` 我们会以 `v` 调用 k 的监听，ondel 同样，就算不拦截 set 语义的那边了。


## wBind 数据变更绑定使用

可以和 Equiv 配合使用：

prop={gets,sets,swap,withVal,ref toggle chainNth cond2,defCtor,notify}//gset,ext

prop(Equiv,{noOp,map,get_flip,get_fwd,get_backwd})

Equiv={pipe,run,opr,add,mul,json,caps,caps0,fmt,join,each,html,xml/*domS*/,obja,dicta}


```js
el("框",
    el("Header", wAttr({title:"君土相册",sub:"可爱的相册"})),
    el("Dialog", wAll(wBind(图片,_=>wAttr({title:_?.描述,hidden:_==null}), wAttr({center:真,bottom:空, onCancel:()=>置图片(空)}) ),
      el("大图", wBind(_=>wAttr("src",_.地址)))),
    el("图片轴",eeach(果.数据.显式文件列表, tp=>el("时间轴-项目", wAttr("key",tp.编号),
      el.框(el.框(tp.描述), el.小图(wAttr("src",tp.略图地址,"onclick":tp.fun(o=> 图框(o.访问地址,o.描述)) )) )
    )))

el(qsOne("#根"),wBind({},app))
el(qsOne("body"), emet`${el(":bind",{},事件数据(db,图集("xuexi","/图片")))}+hr+a[src=${url},t=${"查看软件项目"}]`)

```
