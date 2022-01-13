document.write`<canvas id=eC style="width:100%;height:100%">`
布=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}
with(Math){DEG=2*PI; dist=(w,h)=>sqrt(w*w+h*h) }

xy_=(x0,y0)=>(x,y,[gf,...a],ee)=>{g.beginPath(); gf.call(g, x=x0+x,y=y0+y,...a); g.closePath();g.stroke(); if(ee)ee(xy_(x,y))}
xy=xy_(0,0)
with(g=布(eC)){
  strokeStyle="green"
  xy(50,60,[rect,90,200],f=>
   f(90,200,[arc,30, 0,DEG]))
}//Path2D 必须一笔画,连线..

px={v:(x,y)=>g.getImageData(x,y,1,1), vEq:(x,y,v)=>g.putImageData(v,x,y) }
eC.onclick=ev=>console.log(ev.x,ev.y)

扭曲=(X,Y,l,r)=>{
  let 心距=组()
  rnPN(Y,l,y=>rnPN(X,l,x=>{
      let d=dist(x-X,y-Y); if(d<l)心距(1?d>>0:Math.round(d*l/l), [x,y])
  }))
  for(let i=0;i<l;i++)心距(i).forEach(([x,y])=>{ g.fillStyle=`rgba(1,1,1, ${(l-i)/l})`;g.fillRect(x,y,1,1) }) //放 "#000000"+(i/l*255).toString(16) 还不好，草
}
rnPN=(a,l,f)=>{for(let i=a-l,N=a+l; i<N;i++)f(i)}
组=(d=new Map)=>(k,V)=>{let v=d.get(k); if(v==null)d.set(k,v=[]); if(V)v.push(V); return v}
//可用 round(a*x)/a 切分0~1域。 a=10时等于保留1位小数,把域均分为11段,a=1类同。   \frac{\operatorname{round}a\cdot x}{a}
