from most important:

```js
el(tag,...fe__ee) //create Nodes
el["div"](e=>{e.at.title="xx" }, el.b("Bold"))

el.href`axios mathjax bs@4.6`
el.href`css:head_link
`
el.href(main=>{  }) //<script file="main.js">
//bash$ eqjs -o html/ page.js; eqjs !flat #js css, in find .
```

```js
1..lets(x=>x+1) //1 letAs x=>x+1
doc.lets(_=>{ head+body }) //eval() need
User().let(_=>{name=1;age=rn(0,10).rand })
user.let({id:0, getOne:just(1), getSame:noOp}) //$Y $N NO=null

(f=Eqv.int()).cat("10") //concat serialized=>memObj
f.cut(0xff)=="255"
f.oncut(10, s=>s+"0")==100

[1,2].at(rn(0,1)).length==2
```

DOM tree bind &DSL

```js
el.obj({id:""}, x=>el.p(
  wA({css:'-btn M_btn'|['well',{},]|{well:$Y} ,show,edit}),
  "#Text",x.id, el.input(x.id,"id",range)/*edit=2, or 1=only span.txt-var  "+id"=labeled*/))

with(el){doc.tail=[
  ary(a=[], (x,i)=>li(input(x), btn("-"+i, ()=>a.splice(i,1)) ) , ul("Empty~ ")),
  btn("+",a.push) ]//copy last. binds [1,2].it[0] or [u1,u2][0].it
  a.make(a=>a.sort(), io=$N) //optimize: move old val with Element, io:deepEq
}
wA.alias={M_:'mdui-', use:'M_', cdn_bs:':css/_.css', cdn_min:$Y}
wA.tr.zh=`
id 用户号
`

el.when({type:1,i:233}, {[1]: x=>el.md`ID: __${i}__` })

wOp(c={tap:click, tap2,tap2s,ptrOut, acty:$Y}, 'only=!default stop stopNow once capture touch=!passive')
c.emit(0,{x,y})
c.drop(1)

wSty({__mozXX, _cssVar:1, height:app.it.h/*px,s,turn,rgba*/, Trotate:.5, Fshadow:[x,y,blur],F_hslH:NO, fg:'color on bg',bg })
wSty({_varDecl: [0,'percentage>'/*inherits. anim ease*/] })
```

CSS-ing existing Node, even create!

```js
qs`div p.good`; qs`${body}div p.good`
qs.all`.good`.let(wA({title:NO}, wOp{tap})).lets(_=>height) //!jQuery
qs.each`.a${logs(e=>alert(e.id))} .b${say}` //kwdefs
for qs.id_xx : window.xx
//emmet.io -like
el.img=`details $0[src=$1,alt=$2]:${wOp()}`
doc.tail=qs`!div p>b{$1 }+i.index{at $0}:each("
a
b
c")`

qs.box.let(_=>{ ins.R=pos.L; ins.eL=/*prepend*/pos.let({css:"red",only:Node.fl('!text')}).L; pos.let({n/*limit*/:NO}).R; insHTML; pos.e,.HTML })
doc.body.ee[0].xywh.way((p,a)=>V`Vec4(p+a*.5, a*2)`) //boundBox. xywhs for Rects
qs.each(logs(ev=>ev.e.style.width), doc,MutationObserver.fl('attr txt ee'), 'style src')

qs.good.e0s({css,only,n}, way='parentNode')
qs.good.pos.let({css:".active", n:2}).R
```

operators: `.#[]{}` + > : `' '` `,` ; .xx implicit div,span,li

ext: at,ee,e0; tail,at(rn),pos,ins,insHTML

modern web stack technologies, in one framework

```js
qs.ST(app, memo=localStorage|location )
qs.SM(postMessage, {ping:x=>x }).ping(1).then(say)
qs.HI(ePJAX, {["item/$1"](i){return(this!=NO/*not preview link*/)? div:li  }  }).item(0) //REST: get,all, item/new,item/doDel,item/$1/edit
qs.H('api.com/', {user: {get:'users/$1', add/*&PUT*/:'POST(it=$1) users',all,del} , all:'(Real-Ok=1) ?tok=xx', tok:''})

qs.HI(, {item:{$:[push,remove,all,realPush] }}) //get().edit=$Y, del&back (reloads), .aflex:get(*), unload,submit=xhrSend(obj)

Eqv
f.flip.oncut("233", i=>i*10+1)=="2331"
Eqv.pipe(_=>[pad(+1,.5), num().flip, join("",chunk(1,2,x=>x+"_")) ]).cut("9_")==16

({}).it== {getset v, onmod}
it.age(x=>x+1)//it({age:x=>x+1 })  error
it('age id')=>0copy
it.keys
it() it([1,2]): cols
it(['keep'], f_or_async): swap
Eqv.objJoin(A, {name:0,age:0, cool:1}, a1,a2)
[1,2].at(rn(0,n=>.5*n)).let({0:2}) //half range, support bind.it

wA({data:{theme: Eqv.ref(app.it.isVip, Eqv.way("dark",NO) ) }}) // check<=>input
Eqv.listen(app.it.coins).onmod=x=>{x.v  } // it.it.x(listen) when bind to many child-element
Eqv.at(app.it.ok,[db.it.ok,net.it.ok], (a,b)=>a&b)
Eqv.at(o.no,[o.i(Eqv.pad(+1))])
Only1(x=>wA({show:x}), sel=[NO|Infinity], vals=[on,off,],sameset=e=>in this.e0)//support Shift or Ctrl
//opr("*"), json,join,each ,caps(0=low,up,Capital),camel(0=snake,words,cap; caps=$N), html,xml,aobj,amap
//fmt`db://user:password@hostname/database`

anim(fx,dur,v0,v1).rep(+-1, then?,stopr?)
.fps=10 //enable setInterval. v0~v1 can Vec
.ease.f, .e("ball",0)//in 1 out, 2 1fwd1rev, 3 inout(fastin), 4 inout
(t=0|1)

anim.at(ref,dt)=ref.onmod=rateLim(dt, v=>{anim(x=>{ref.v=x}, dt,v0,v) ;v0=v})
```

real-world UI/UX

```js
el.let(_=>objIf(c.it.img, 图=>框(
  Header(wA({title,sub})),Dialog(
    wA({pos:"relative bottom center", title:图.desc(Eqv.do(_=>trim())) }), wOp({cancel(){图.v=NO} }),
    大图(wA({src:图.href}) ),
    图片轴(ary(得.data.files, x=>
      qs`!时轴项[key=${x.id}] 框 框${x.desc}+小图[src=${x.thumb}]`
      .let(wOp({tap(){ 图框(x.href,x.desc) } }))
    ))
  )
)))
```

系统/频谱监视器 渐变
高亮

support lib:

```js
this_((_,i)=>n+i)({n:1},0) =
  evaly('(_,i)=>{this_.unshift(_);with(_){return n+i}}')(,) //this_[],with{} optimized out using varset

this_.$(CSS, async(_)=>{ await 5`s`.once; i=0;100`ms`.rate(_=>{ stop(i==3); i++}) })
this_.fref(alert).v=say
chkStack=frec(f=> (i)=>i?f():0).give() //frec also known as: YCombinator
  =this_.fref().let(f=> f.v=i=>i?f(i-1)+1:0)

wOp({keydown: rateLim(CSS.s(1), saveDraft, lim=1/*deshake, 2:throttle, onlyLast, 3:once*/, argVer=(a,b)=>b) })
Vec2.pMouse(doc,fMov=onmod).it.onmod=P=>rateLim(0, drawCursor(P,P.z/*button*/), 1, (a,b)=>(a.m(b).l>5)?b:a) //0 disables rateLim, so

navigation.lets(_=>navigator.lets(_=>
  this_[1].canGoBack=!/Google/.test(vendor) ))

//cafe,cake => /c/a={f/{e=0}, k/{e=1}}
Trie<K,V>(Iter<[Iter<K>,V]>)
t:Map<K,Trie<K,V>>, v:V?
at(Iter<K>): {v}
way(Trie=>R, (R,k,v)=>void)
[iterator]
find(Iter<K>, no:(t,V)=>V?) // "$1=(.*)" user/$1/

//cafe,cake => /ca/{fe=0, ke=1}, loMem hiCPU. add '/c/' to reduce k.startsWith(tK)
Trie.Flat K:Iter
at(Iter<K>): {v}
way(This=>R, (R,Iter<K>,v)=>void)
[iterator]
```

```js
piano=(P,H, z1x=0)=>P.it.onmod=_=>{pk(1/H).saw().pk(H); if(z)z1x=x; if(y!=y0)drawFx(z1x,y0=y) }

dragRect=(e,_2p=Va(2,2))=>Vn(4).let(r=>{
  Eqv.at(r, ()=>{let[A,B]=_2p.sortBy(P=>P.y); if(B.m(A).x<0)B.x*=-1,A.x-=B.x; return Vec4.AB(A,B) }, ..._2p)
  //Vec2.pMouse(e, drag(1)).onmod=drag(0); drag=i=>P=>{if(P.z==i)_2p[P.z].v=P}
  let pz
  Vec2.pMouse(e, P=>{if(P.z==1)_2p[pz!=NO?pz:P.z].v=P}).onmod=(P,ev)=>{if(i=+ev.e.at.i) pz=P.z?i:NO;else if(P.z==0)_2p[P.z].v=P  }

  _2p.lets(Eqv.listen).lets((P,i)=>{ Eqv.at(e.tail=el.div(wA({i}),wSty({pos:"absolute",pado:"-50%"}) ).xywh,noOp,P) })
})

doc.body.let(_=>
  (tail=el.hr(wSty({pos:"absolute",bg:"blue"})) ).xywh=dragRect(_) )

//anim
```
