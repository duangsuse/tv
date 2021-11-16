doc.write`<canvas id=can style="width:100%;height:100vh">`
//fy fx vque(w,h,cnt,getval) canvas offsetTop/Left
//fl fDraw=line&stroke timeAnim(t=>) valque(N)(x?)
setWH=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}
addsPoint=(get,a=[])=>{
  c.fdot=()=>{for(let[x,y]of a)g.strokeRect(x,y,3,3)}//可照长度缓存
  return ()=>a.push([...get()])
}
valque=N=>{let a=Array(N),i=0,iH=0,h=0?f=>{for(iH=0;iH!=N;iH++)f(a[iH]);}:f=>{ for(iH=i-1;iH!=i;){iH--;if(iH<0)iH+=N+1; f(a[iH])} };//皆可翻转for(iH=i+1;iH!=i;iH++){if(iH>N)iH-=N+1;  坑 环形队列
  return x=>{if(typeof x=='function'){h(x);return} if(i==N)i=0; a[i++]=x; }
}

sinAnim=(w,h)=>{
  let y,x, v1,v0,
  xL,yL,
  mov=(x0,y0)=>{x=x0,y=y0; xL=m(x,w),yL=m(y,h); c.tid.forEach(f=>clearInterval(f));v0=vq(0);v1=vq(1);},
  m=(i,n)=> i- n/2,
  vq=(i, C=c.cntV[i]*1000/c.dt)=>vque(p,i, valque(C),(i?x:y)/C),//坑 0时差|不看dt|i=0?y:x错位
  draw=(ci,f)=>{g.strokeStyle=c.fg[ci];g.translate(x,y);g.beginPath();f();g.closePath();g.stroke(); g.resetTransform()}
  timeAnim(t=>{g.clearRect(xL,yL,w,h);
    let l=c.fl(t); p[1]=l*c.fy(t);p[0]=l*c.fx(t)
    g.clearRect(xL-x,yL,x,h); g.clearRect(xL,yL-y,w,y); //可变noBg()白填不path&clear 或不清
    draw(2,v0);draw(3,v1);//sysmonitor
    draw(1,c.fdot); draw(0,c.fDraw)
  })
  return mov
}
timeAnim=1?f=>{let i=0;setInterval(()=>f(i+=0.005), 1000/60)}: f=>{ //可ease
  let next=T=>{ f(T); requestAnimationFrame(next) }; requestAnimationFrame(next)
}
vque=(p,i,aq,l)=>c.tid.push(setInterval(()=>aq(p[i]),c.dt))&&(()=>{
  let o=0; aq(i? v=>{ g.lineTo(o,v);g.moveTo(o,v); o-=l}:v=>{ g.lineTo(v,o);g.moveTo(v,o); o-=l})
})//g.translate(ci==3?xL: x,ci==2?yL:y);

p=[0,0];c={
  cntV:[20,17.7],dt:10, fl:[()=>200,T=>1?100*T:100*(T%1),T=>T%1<.5? 50: 100][0],//采样间隔越长点越少
  fDraw:()=>{
    g.moveTo(0,0);g.lineTo(p[0],p[1]);//g.rect(0,0,p[0],p[1]) //p0,0 0,p1
  },fdot:()=>{},tid:[],//可变 (fin=fns())(f) 添加，也允 sinAnim.vq 另加p
  fy:Math.cos,fx:Math.sin,
  fg:"green red yellow blue".split(" ")
}
g=setWH(can);an=(l=>sinAnim(l,l))(c.fl(0)*2)
onclick=ev=>an(ev.x,ev.y)
onmousemove=ontouchmove=addsPoint(()=>p)
an(450,400)
