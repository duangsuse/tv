document.write`<canvas id=eC style="width:100%;height:100%"><img id=imR crossOrigin src="https://p0.itc.cn/images01/20210113/549ddf9a5b30423f91ea1bfb9d2fd3bc.jpeg">`
布=e=>{W=e.width=e.offsetWidth;H=e.height=e.offsetHeight;return e.getContext("2d")}
with(Math){DEG=2*PI; distd=(w,h)=>[sqrt(w*w+h*h),atan2(h,w)] }//圈,距&角
组=(item=Array,d=new Map)=>k=>{let v=d.get(k); if(!v)d.set(k,v=item()); return v}
rn=(a,b,f)=>{for(let i=a;i<b;i++)f(i)},rnPN=(a,l,f)=>rn(a-l,a+l,f)

r=7
with(g=布(eC)){
  strokeStyle="blue"
  rect(50,66, 60,200);arc(110,266, 40,0,DEG); stroke()
  eC.onclick=ev=>{
     g.drawImage(imR,0,0,W,H);扭(ev.x,ev.y,100,r)
  }
}
扭力=x=>(1-x)**2
扭=(X,Y,l,r)=>{
  let 心距=组(),d,dr ,p
  rnPN(Y,l, y=>rnPN(X,l,x=>{
     [d,dr]=distd(x-X,y-Y); if(d<l)心距(d >>0).push(p=[x,y,0]),p[2]=dr
  }))
  0&&rn(0,l, i=>{g.fillStyle=`hsl(${i/l}turn 100%50%)`; 心距(i).forEach(([x,y])=>g.fillRect(x,y,1,1) )  })
  rn(0,l, i=>{let 环=心距(i).sort(比较i(2)),a=环.map(px.v); a.push(...a.splice(0,扭力(i/l)*r )); 环.forEach((p,i)=>px.vEq(p,a[i]) )  } )
}
px={v:([x,y])=>g.getImageData(x,y,1,1), vEq:([x,y],v)=>g.putImageData(v,x,y) }
比较i=i=>(a,b)=>a[i]-b[i]