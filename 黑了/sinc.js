doc.write`<canvas id=can style="width:100%;height:100vh">`
setWH=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}
["x","y"].forEach((k,i)=> Object.defineProperty(Array.prototype,k,{get:function(){return this[i]} }) )
//tri系是周期函数、弱定义域，要缩放需调 t0~t1 而非步长dt
c={fg:"brown blue green".split(' '), t1:[20,20],dt:[.3,.5], f:[Math.sin,Math.cos], l:60 }
g=setWH(can)

sinAnim=mover=>{
  let l=1,p=[0,0], pL=[],w,h; mover((x0,y0)=>{l=c.l;p[0]=x0,p[1]=y0;pL=p.map(i=>i-l); w=h=2*l+3 })
  const linev=(i,p,f, l,t0,t1,dt)=>{
    for(let n=(t1-0/*但不是t0缩放*/)/dt, dl=l/n, t=t0,v=p[i]; n-->0;){t+=dt,p[i?0:1/*axis*/]-=dl;p[i]=v+c.l*f(t);g.lineTo(p.x,p.y);g.moveTo(p.x,p.y)}
  }
  return t=>{g.fillStyle="white";1?g.fillRect(0,0,innerWidth,innerHeight):g.fillRect(pL.x,pL.y,w,h);
    g.fillStyle=c.fg[2]; let xy=[...p],i;
    for(i=0;i<2;i++){ xy[i]+=l*c.f[i](t); g.fillRect(...xy,4,4);  g.moveTo(...p);g.beginPath();g.strokeStyle=c.fg[i];linev(i,[...0?xy: p],c.f[i],p[i?0:1], t,c.t1[i], c.dt[i]);g.closePath();g.stroke()}
  }
}
g.lineWidth=3
draw=sinAnim(f=>onclick=ev=>f(ev.x,ev.y))
ft=0;setInterval(()=>draw(0?performance.now(): ft+=0.02)  ,1000/60)
