asig=Object.assign, doc=document, $Y=true,$N=false
nop=x=>x,n=o=>o.length,ss=s=>s.split(' '), isa=(k,o)=>k=='fn'?isa('function',o):typeof o==k
evt=(...ekf)=>{
  let reg=(e,k,f)=>!e?e: (e.addEventListener(k,ev=>f(e)), 1)
  while(reg(...ekf.splice(0,3)));
}
coeIn=(a,b,x)=>x<a?a :x>b?b: x

prop=(o,...kv)=>{
  o=o.prototype||o
  kv.flatMap(/*cfg*/x=>n(x)==2?[x] : Object.entries(x))
  .forEach(([k,v])=>{let m,K,V, js=(gs,f)=>({[gs+'et']:this0(f)}),add=Object.defineProperty, this0=f=>function(...a){return f(this,...a)}
    if(m=/^([gsl])et_(.*)/.exec(k)) {
      K=m[2],V='_'+K
      add(o,K, m[1]!='l'?js(m[1],v):
        (([A,B,fl=0])=>{o[V]=o[K]; (A==null)?A=nop:B=(f=>(o,v)=>{o[V]=f(v)})(B)
        return asig(js('g',o=>A(o[V])),js('s',B), //use get for !writable
        fl&0b1&&{enumerable:$Y},fl&0b10&&{configurable:$Y} )
        })(isa('fn',v)?[null,(o,x)=>{o[V]=x;v(x)}]:v) )
    }else add(o,k, {value: isa('fn',v)?this0(v):v })
  })
  return o
}

prop(Object,{
  let:(x,f)=>f(x),lets:(x,f)=>(f(x),x),
  get_it:o=>new Proxy(o, {get:(o,k)=>prop({},
    {let_onmod:f=>(o[k]?f(o[k]):0 , prop(o,['let_'+k,v=>f(v)])), let_v:[()=>o[k],v=>o[k]=v]  })})
})

asigk=(o,k1,c)=>{
  for(let k in c)o[k][k1]=c[k]
  return o
}// asigk(c.it,'onmod',{})

rGet=(o,k,fm,v0)=>(k in o? fm.parse(o[k]) : v0).lets(v=>addEventListener('unload', ()=>{o[k]=fm.stringify(v)}) )
chkOpen=(o,k, f,mk)=>{f(0)
  asig(o[k]=mk(), {
    onopen(){f(1)},
    onclose(){chkOpen(o,k, f,mk)}
  })
}
//双方向[]添&渲染，并下滚
binda=(a,fe,e0)=>{
  let ad=x=>$(e0).append(fe(x)),
    eB=$(`.P-bot`,e0)[0], fB=!eB?nop: ()=>{if(e0.scrollHeight>e0.offsetHeight)eB.style.position='unset'; e0.append(eB) }

  F=a.push; a.push=x=>{F.call(a,x);ad(x); (x=='》/清空')?a.splice(0,a.length) : keepFoc(()=>{fB();e0.click()}) }
  a.forEach(ad);fB()
}
keepFoc=f=>{let e=doc.activeElement; f(); setTimeout(()=>e.focus(),100)}

setRetry=(f,dt=300,chk)=>{
  (chk=()=>{ try{f()}catch{setTimeout(chk, dt)} })()
}

href=s=>$('<style>', {text:s}).appendTo('head')


href(`.rollr{
  overflow: hidden; position:relative;
  animation: js 2s infinite;
} .rollr>*{margin:0; transition:transform 0.1s cubic-bezier(0.79, -0.2, 0.27, 1.55)}
.rollr:hover{animation:none}
.rollr>p hr[i] {background: skyblue;}
.rollr>p hr {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.rollr>p {position: absolute; right: 0;top: 0;
  display: flex;
  gap: 11px;}

@keyframes js{}
`)

rollr=(e,fl=0b011)=>{
  let a, kev,io=(k3, scr)=>{ //鼠标和触屏
    a=ss(k3);kev=a[0];a[0]='move'
    a.forEach((k,i)=>(i<2? doc:e).addEventListener(kev+k, E=>f[i](scr(E)) ,{passive:scr!=nop}) )
  },
  [kl,ki,kt]=ss(fl&0b100?'height clientY Y':'width clientX X'), f=[
    E=>{if(a[0]){mv(-c.i*l+ E[ki]-a[1]); if(!E.force)E.preventDefault() }}, //i must neg
    E=>{if(a[0])c.i=c.i-Math.round((E[ki]-a[1])/l); a[0]=$N}, //可用的(横纵)l分段拖拽i, 0<i<n往复时onanimend
    E=>{a[0]=$Y; a[1]=E[ki]} ], l,
  c=prop({d:1}, {let_i:[nop,i=>(i=coeIn(0,e.childElementCount-1,i),mv(-i*l),fU(i),i)],
    let_l:k=>{eW.style[kl]=(l=e.children[0].getClientRects()[0][kl])*k+'px'; if(fl&2)eI.html(`<hr>`.repeat(e.childElementCount)) }
  }),
  
  eI,eW=$('<div class=rollr>')[0],mv=x=>{e.style.transform=`translate${kt}(${x}px)` },fU=nop
  e.replaceWith(eW);  $(eW).append(e, '<p>') //支持指示钮
  if(fl&2) {
    fU=i=>{let f=(i,q)=>eI[0].children[i].toggleAttribute('i',q); if(c._i!=null)f(c._i,0);f(i,1)}
    eI=$(':last',eW).on('click','hr', E=>{let e=E.target;c.i=$(e.parentNode).children().index(e)})
  }

  io('mouse up down',nop);if(navigator.maxTouchPoints)io('touch end start', E=>E.changedTouches[0]||E.touches[0]); a[0]=$N
  if(fl&0b1)eW.onanimationiteration=()=>{let I=c.i;c.i+=c.d; if(c.i==I){$(eW).trigger('animationend');c.i=I?0:Infinity} }
  return asig(c, {a,l:1,i:0})
}

prop(String, {
  splitD:(s,sp,...sp1)=>!sp?s: s.split(sp).map(x=> x.split(...sp1) )
})

let einit_for=()=>
$("[for]").each((i,e)=>{
  let a=$(e).attr("for").trim().splitD("\n",",")
  a.forEach((r,i,a, E=$('<div>').appendTo(e)[0] )=>r.forEach((x,j)=>{
    let col=e.children[j].cloneNode($Y)
    col.innerText=x
    E.append(col)
  }))
})

