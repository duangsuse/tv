触向=(e,k,f,fmov)=>{ let x0,y0, q=(k=="touch"),on,tap;
  on=(PC,M,f)=>e.addEventListener(k+(q?M:PC),q?tap(f):f, {passive:false})
  tap=f=>ev=>{let p=ev.changedTouches[0]||ev.touches[0]; ev.x=p.clientX,ev.y=p.clientY;f(ev)}
  on("down","start",ev=>{x0=ev.x;y0=ev.y;q=1}); on("up","end",ev=>{f(x0,y0,ev.x,ev.y,ev);q=0})
  if(fmov)on("move","move",q? ev=>{fmov(x0,y0,x0=ev.x,y0=ev.y)}:ev=>{if(q)fmov(x0,y0,x0=ev.x,y0=ev.y)})
}
布=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}
el=(e,k)=>e.appendChild(doc.createElement(k))
doc=document,also=(o,f)=>{f(o);return o}

g=布(also(el(doc.body,"canvas"), e=>e.style.cssText=`width:100%;height:100vh;z-index:2`))

{let 线=(x0,y0,x,y)=>g.moveTo(x0,y0)&g.lineTo(x,y)&g.stroke(),k; for(k of["touch","mouse"])触向(g.canvas,k,线,线)}


//c.css, .cod 由anim提供
kcall=(f,o={})=>new Proxy(o,{get:(o,k)=>(k in o)?o[k]: (...a)=>o[k]=f(o,k,...a) })//不实质数组转化
expRate=(s,n)=>s[0]=='$'?Number(n):n*s.slice(1)
c={n:100,dt:1000,rep:1,repX:0}
Parti={css:"",aid:"blok",s0:()=>[], s0r:0 ,cod:()=>0}
Anim={fps:60,ease:t=>t}

ss=s=>s.split(" "),n=o=>o.length
objPuts=f=>o=>new Proxy(o,{get:(o,k)=>(...a)=>f(o,k,...a) });

lop=(pre,...vd)=>{
    let ePan=el(doc.body,"form"), chg=()=>{ee.onchange}
    ss("submit reset button").forEach(t=>el(ePan,"input").type=t)
    let e=el(ePan,"pre"),ee, i=0,N=n(vd);for(;i<N;i++){let v=vd[i];
        el(e,"label").innerText=pre[i]; ee=el(e,"input");ee.placeholder=ee.name=v[0];
        ee.previousSibling.setAttribute("for",ee.id=v[0]); ee.defaultValue=v[1];
        if(typeof v[2]=='number'){let[a,b]=v.slice(2); ee.type='number',ee.min=a,ee.max=b;
          chg(v=>{  })
        } else chg(v=>{v[2](v)})
    }
}

((k,C,P,A)=>{
    lop`粒子${C.n(10,900, 10,50,200,450,600)}
态间隔${C.dt(100,10*k, 500,k,3*k,5*k,7*k)}
重复${C.rep(1,9, 1,2,5)}遍或时隔${C.repX(-1,1, 0.5, -0.3,-0.5,-1)}新态
缓动${A.ease(s=>{with(Math){return eval(`t=>${s}`)} }, "t%1","t")}
主题CSS${P.css(s=>P._css.cssText=s)}
动画${P.aid(k=>AN[k], ...ss("blok dot d4 circ fall morph"))}
态0式${P.s0(s=>eval(`i=>${s}`))}每隔${P.s0r(0,10)}1次
定制式${P.cod(eval)}`//_css ?直接存conv过,要么不便引用
})(1000,...[c,Parti,Anim].map(objPuts((o,k,...v)=>[k,o[k],...v]) ))
doc.all.n

//2
c={n:100,dt:1000,rep:1,repX:0}
Parti={css:"",aid:"blok",s0:()=>[], s0r:0 ,cod:()=>0}
anim={fps:60,ease:t=>t}

doc=document
ss=s=>s.split(" "),n=o=>o.length,also=(x,f)=>{f(x);return x}
el=(e,k)=>e.appendChild(doc.createElement(k))

econf=(pre,...vd)=>{
    let ePan=el(doc.body,"form"), chg=()=>{ee.onchange}
    ss("submit reset button").forEach(t=>el(ePan,"input").type=t)
    let e=el(ePan,"pre"),ee, i=0,N=n(vd);for(;i<N;i++){let v=vd[i],[o,k]=v;
        ee=el(also(el(e,"label"),e=>e.innerText=pre[i]),"input");
        ee.placeholder=ee.name=k;ee.defaultValue=o[k];
        if(typeof v[2]=='number'){let[a,b]=v.slice(2); ee.type='number',ee.min=a,ee.max=b;
          chg(v=>{  }); //eflip.push(ee), iDefts=4;opt
        } else { chg(v=>{v[2](v)}); Object.defineProperty(o,k,{get:()=>v,set:v1=>v=f(v) }) }
    }
    ePan.children[2].onclick=()=>{let e,A="number",B="range"; if(1==letAt(ePan,"st",i=>(i+1)%3 ))for(e of eflip)e.type=(e.type==A)?B:A }
    //form[st=2] select{display:none}
}


objPuts=f=>o=>new Proxy(o,{get:(o,k)=>(...a)=>f(o,k,...a)});

((k,C,P,A)=>{
    econf`粒子${C.n(10,900, 10,50,200,450,600)}
态间隔${C.dt(100,10*k, 500,k,3*k,5*k,7*k)}
重复${C.rep(1,9, 1,2,5)}遍或时隔${C.repX(-1,1, 0.5, -0.3,-0.5,-1)}新态
缓动${A.ease(s=>{with(Math){return eval(`t=>${s}`)} }, "t%1","t")}
主题CSS${P.css(s=>P._css.cssText=s)}
动画${P.aid(k=>{P.css=AN_C[k]; return AN[k]}, ...ss("blok dot d4 circ fall morph"))}
态0式${P.s0(s=>eval(`i=>${s}`))}每隔${P.s0r(0,9)}1次
定制式${P.cod(eval)}`
})(1000,...[c,Parti,anim].map(objPuts((...a)=>a) ))
