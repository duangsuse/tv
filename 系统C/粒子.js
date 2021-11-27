
let doc=document,
aobj=(c,f)=>Object.assign(f.bind(c),c), n=o=>o.length, noOp=()=>{},just=k=>()=>k, also=(o,f)=>{f(o);return o}

this.anim=aobj({rate:1000/60,ease:t=>t%1 },(v0,v1,dur, f)=>
aobj({_dv:v1.map((v,i)=>v-v0[i]), dur, _v:Array(n(v0)),
rep(n=1,ok=noOp){let {ease,rate}=anim,{dur}=this,
  dt=rate/dur, t=0-dt,
  id=setInterval(()=>{this(ease(t+=dt)); if(t>=n)clearInterval(id)|this(n)|ok()}, rate);console.log(v0[0],v1[0])}
},function frame(t){
  let{_v:now,_dv}=this; for(let i=0,N=n(v0);i<N;i++)now[i]=v0[i]+_dv[i]*t
  f(now)
}))

newA=(n,f)=>{let a=Array(n),i=0;for(;i<n;i++)a[i]=f(i); return a}
zips=(a,f)=>b=>a.forEach((x,i)=>f(x,b[i]))
chunks=(nC,f)=>a=>{for(let i=0,N=n(a),i0=0,no=0;(i+=nC)<=N;i0=i,no++)f(no,...a.slice(i0,i)); g.fillRect(0,0,w,h);g.stroke();g.closePath();g.beginPath()}

el=(e,k)=>e.appendChild(doc.createElement(k))

cellr=n=>{
  let eCel=newA(n,()=>el(doc.body,"hr")),
  g=gnext(accum(newA(n,Math.random),a=>newA(n,i=>(a[i]+Math.random())%.7) ));
//   g=gnext(abb(just(Array(n).fill(0)), ()=>newA(n,Math.random) ));
  return ()=>anim(g(),g(),2000, zips(eCel, (e,v)=>e.style.opacity=v  ))
}
function*accum(it,inc){for(;;){yield it;yield it=inc(it)}}
function*abb(a,b){for(;;){yield a();yield*[b(),b()]}}

rec=f=> x=>f( x=>rec(f)(x) )
gnext=g=>()=>g.next().value
// C=cellr(200);rec(re=> C().rep(1,re) )()
//但显然我们要上次的 v1才能平滑..t=1+0.01 就谬以千里
let eSt=el(doc.head,"style")
eSt.innerText=`
*{padding:0;margin:0}
hr{display: inline-block;border: 0;}
hr{width: 60px;height: 60px; background: darkblue;}
body{overflow:hidden}
`
c={dur:2000,n:100}
Partic=(pos,op)=>{
  let eCel=newA(c.n,()=>el(doc.body,"hr")),g=()=>newA(c.n,pos).flat() ,a=g();
  return ()=>anim(a,a=g(),c.dur, op(eCel/*,kst*/))
}

rk=k=>Math.random()*k
// D=Partic(()=>[rk(innerWidth),rk(innerHeight)], e=>chunks(2,(i,x,y)=>{let c=e[i].style; c.left=x,c.top=y; if(i<20)g.lineTo(x,y);g.moveTo(x,y)} ) )

anim.ease=t=>Math.sin(t*Math.PI/2)

sty=eSt.style //doc.styleSheets[0].rules[2].style
// sty.cssText=`position:absolute;width:1em;height:1em; background:green; border-radius:50%`;rec(re=> D().rep(1,re) )()


squr=(w,h)=>Partic(()=>[rk(innerWidth-w),rk(innerHeight-h),rk(w)+3,rk(h)+3], e=>chunks(4,(i,...p)=>{let c=e[i].style; [c.left,c.top,c.width,c.height]=p  } ) )

// E=squr(30,35); sty.cssText=`position:absolute; background:red`; rec(re=> E().rep(1,re) )()

//money雨(x固定 yr动) 太难了，区间(ab) 也没还要兼容补间和固定…… x[i],y,r%1 ; 但是真正的粒子动画应该用Vec2向量去算..


//oval
function*circ(x,y,l, N){
  const{sin,cos,PI}=Math, r1=2*PI, dt=r1/N;
  for(let r=0;r<r1;r+=dt)yield[x+l*sin(r),y+l*cos(r)]
}

//SVG path(可CSS-offset 仅动画)
function*pathPs(e,N){
  let n=e.getTotalLength(), i=0,dt=n/N,p;
  for(;i<n;i+=dt){p=e.getPointAtLength(i); yield[p.x,p.y]}
}
dista=(x,y)=>Math.sqrt(x*x+y*y)//基于三角函数定义的距离。无论sqrt是啥 x,y可交换 2和相等
一笔画=(g,once,dmin=20)=>{
  let e=g.canvas, x0,y0, q=0,a=[], see=(x,y)=>{a.push(x-x0,y-y0);x0=x,y0=y; g.lineTo(x,y);g.moveTo(x,y);g.stroke()},
  cls=()=>{g.closePath();g.clearRect(0,0,e.width,e.height);g.beginPath()};
  e.onmousemove=ev=>{if(q&&dista(x0-ev.x,y0-ev.y)>=dmin)see(ev.x,ev.y)}
  e.onmouseup=()=>{q=0;once(a);a.splice(0,n(a))}
  e.onmousedown=ev=>{q=1;cls();g.moveTo(x0=ev.x,y0=ev.y);a.push(x0,y0)}//零是不同的..
}

画=el(doc.body,"canvas");画.style.cssText=`width:100%;height:100vh;z-index:2`
setWH=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}

一笔画(g=setWH(画),console.log)
g.fillStyle="white"
let{width:w,height:h}=g.canvas;
//关于动画混成遮盖的问题，三个：最简单 笔画、动画1canvas 图层；透明碰撞检测、条件新图层；仅末帧叠合

paths={
  star:`M12.672.668a.75.75 0 00-1.345 0L8.27 6.865l-6.838.994a.75.75 0 00-.416 1.279l4.948 4.823-1.168 6.811a.75.75 0 001.088.791L12 18.347l6.117 3.216a.75.75 0 001.088-.79l-1.168-6.812 4.948-4.823a.75.75 0 00-.416-1.28l-6.838-.993L12.672.668z`,
  book:`M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.496 4.496 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.75.75 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a3 3 0 00-2.121-.879H.75a.75.75 0 01-.75-.75v-15zm11.247 3.747a3 3 0 00-3-2.997H1.5V18h6.947a4.5 4.5 0 012.803.98l-.003-11.483zm1.503 11.485V7.5a3 3 0 013-3h6.75v13.558l-6.927-.047a4.5 4.5 0 00-2.823.971z`,
  msg:`M176 203h-24c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h4v7l7-7h13c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm0 18h-14l-4 4v-4h-6v-16h24v16z`,
  vid:`M897.2 114.0912l-5.2 3.63v-2.72c0-.55-.45-1-1-1h-8c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-2.72l5.2 3.63c.33.23.8 0 .8-.41v-10c0-.41-.47-.64-.8-.41z`,
  srch:`M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`
}//可通过 fill(Path2D()) ,是存储再填充/描边的形式

gp=k=>{let e=doc.createElementNS('http://www.w3.org/2000/svg',"svg")
  e.innerHTML=`<path d="${paths[k]}">`;return e.children[0]}
// for(let[x,y]of pathPs(gp("star"),50))g.fillRect(x,y,2,2)
for(let[x,y]of circ(50,50,40,100))g.strokeRect(x,y,5,5)

1||`粒子数${c.n(100,10,900, 10,50,200,450,600)}
态间隔${c.dt()}
重复${1}遍 或${0}倍间隔做新态
缓动${"t=>t"}
CSS${""}
锁帧${A.fps(60)}fps
动画${P.id(...ss("blok dot d4 circ fall morph"))}
态0式${""} 隔${0} 出现1次
定制码${P.cod(...Object.keys(paths))}`//暴露setIntrv,再支持-n
//就是要o.k属性能多次更新，也能用URL共享；但需要生成动画 支持[k], eval(code) 等，因此支持提供转化函数，避免靠defProp set
//可重置,切换number/range,
