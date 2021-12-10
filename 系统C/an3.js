{const{assign:asig,defineProperty:defP}=Object,{isArray}=Array,
keyHook=(o,k,f)=>{let v=o[k];defP(o,k, {get:()=>v,set:v1=>v=f(v1)})},
setr=(ks,T,c)=>{let o=asig(T.prototype,c),k;for(k of ss(ks))o.__defineSetter__(k,o[k]) },
eDet=(su,ee)=>{let e=el.details(el.summary(su)); ee.replaceWith(e); e.tail=ee}
keyCall=(f,o={})=>new Proxy(o,{get:(o,k)=>(...a)=>f.call(o,k,...a)})

doc=document, n=o=>o.length,ss=s=>s.split(" "),isa=(k,o)=>k==typeof o,
fthis=f=>function(...a){return f(this,...a)},noOp=x=>x,aobj=(c,f)=>Object.assign(f.bind(c),c)
el=(e,...ee)=>{if(isa('string',e))e=doc.createElement(e); while(isa('function',ee[0]))ee.shift()(e); e.tail=ee;return e}
setr("tail",HTMLElement, {
  tail(e){isArray(e)?e.forEach(x=>this.append(x)) : this.append(e)},
  letAt:fthis((e,k,op)=>e.setAttribute(k,f(e.getAttribute(k))))
})

econf=(labl,...vd)=>el(el.form(
  ...ss("submit reset button").map(k=>el.input(e=>e.type=k)),
  el.pre(e0=>{
    let chg=(e,f)=>{e.onchange=()=>f(e.value)},变=[], A='number',B='range'
    vd.forEach((v,i)=>{let[o,k]=v, lbl,iE=0
      el(e0,
      el.label(labl[i], lbl=el.input(e=>{ e.placeholder=e.name=k;e.defaultValue=o[k]
        if(isa(A,v[2])){let[a,b]=v.slice(2);e.type=A,e.min=a,e.max=b; chg(e,Number);iE=5;变.push(e)}
        else{let f=v[2]; keyHook(o,k,v=>{e.value=v; return f(v)}); chg(e,noOp);iE=3}
      })),
      (a=>n(a)? el.select(e=>{let eLeft=lbl;
        e.onchange=()=>eLeft.value=a[e.selectedIndex]
      }, ...a.map(k=>el.option(k))
      ):el.b()  )(v.slice(iE))
      )
    })
    e0.re=()=>变.forEach(e=>{e.type=e.type==A?B:A})
  })
), e=>{ e.children[2].onclick=e.lastChild.re  })


触向=(e,k,f,fmov)=>{ let x0,y0, q=(k=="touch"),on,tap;
  on=(PC,M,f)=>e.addEventListener(k+(q?M:PC),q?tap(f):f, {passive:false})
  tap=f=>ev=>{let p=ev.changedTouches[0]||ev.touches[0]; ev.x=p.clientX,ev.y=p.clientY;f(ev)}
  on("down","start",ev=>{x0=ev.x;y0=ev.y;q=1}); on("up","end",ev=>{f(x0,y0,ev.x,ev.y,ev);q=0})
  if(fmov)on("move","move",q? ev=>{fmov(x0,y0,x0=ev.x,y0=ev.y)}:ev=>{if(q)fmov(x0,y0,x0=ev.x,y0=ev.y)})
}
布=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}
}
el=keyCall(el,el)
// eDet("地狱",doc.body.tail=el.p("hell"))

c={n:100,dt:1000,rep:1,repX:0}
Parti={css:"",aid:"blok",s0:()=>[], s0r:0 ,cod:()=>0}
anim={fps:60,ease:t=>t};

((k,C,P,A)=>{
    doc.body.tail=econf`粒子${C.n(10,900, 10,50,200,450,600)}
态间隔${C.dt(100,10*k, 500,k,3*k,5*k,7*k)}
重复${C.rep(1,9, 1,2,5)}遍或时隔${C.repX(-1,1, 0.5, -0.3,-0.5,-1)}新态
缓动${A.ease(s=>{with(Math){return eval(`t=>${s}`)} }, "t%1","sin(t*PI/2)","t")}
主题CSS${P.css(s=>P._css.cssText=s)}
动画${P.aid(k=>{P.css=AN_C[k]; return AN[k]}, ...ss("blok dot d4 circ fall morph"))}
态0式${P.s0(s=>eval(`i=>${s}`))}每隔${P.s0r(0,9)}1次
定制式${P.cod(eval)}`
})(1000,...[c,Parti,anim].map(o=>keyCall(function(...a){return[this,...a]},o) ))


newA=(n,f)=>{let a=Array(n),i=0;for(;i<n;i++)a[i]=f(i); return a}
chunks=(nC,f)=>a=>{for(let i=0,N=n(a),i0=0,no=0;(i+=nC)<=N;i0=i,no++)f(no,...a.slice(i0,i))}

this.anim=aobj({rate:1000/60,ease:t=>t%1 },(v0,v1,dur, f)=>
aobj({_dv:v1.map((v,i)=>v-v0[i]), dur, _v:Array(n(v0)),
rep(n=1,ok=noOp,stopr=null){let {ease,rate}=anim,{dur}=this,q=n<0,
  dt=rate/dur*(q?-1:1), t=0-dt,
  id=setInterval(()=>{this(ease(t+=dt))}, rate),
  fs,f=ct=>setTimeout(fs=()=>{(q?t>n:t<n)?f(100): clearInterval(id)|this(n)|ok()}, ct) ;f(dur*n);stopr(fs) }
},function frame(t){
  let{_v:now,_dv}=this; for(let i=0,N=n(v0);i<N;i++)now[i]=v0[i]+_dv[i]*t
  f(now)
}))


Partic=(pos,op)=>{
  let eCel=newA(c.n,()=>el(doc.body,"hr")),g=()=>newA(c.n,pos).flat() ,a=g();
  return ()=>anim(a,a=g(),c.dur, op(eCel/*,kst*/))
}
dista=(x,y)=>Math.sqrt(x*x+y*y)
function*circ(x,y,l, N){
  const{sin,cos,PI}=Math, r1=2*PI, dt=r1/N;
  for(let r=0;r<r1;r+=dt)yield[x+l*sin(r),y+l*cos(r)]
}
gp=k=>{let e=doc.createElementNS('http://www.w3.org/2000/svg',"svg")
  e.innerHTML=`<path d="${paths[k]}">`;return e.children[0]}
//SVG path(可CSS-offset 仅动画)
function*pathPs(e,N){
  let n=e.getTotalLength(), i=0,dt=n/N,p;
  for(;i<n;i+=dt){p=e.getPointAtLength(i); yield[p.x,p.y]}
}


