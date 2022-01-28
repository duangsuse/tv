c={l:8,叶:[18, 100, 25],雪:[82, 11, 66], 球:[[0,83,94],[0,50,25]], h:0.4, w:1/16, wz:6 }
setA=(a,...v)=>{v.forEach((x,i)=>a[i]=x);return a},bg=([l,s,h])=>g.fillStyle=g.strokeStyle=`hsla(.${h}turn ${s}%${l}%/.3)`
with(Math)D=2*PI,转=(r,f)=>f(cos(r),sin(r)),Q=k=>k*random()-k/2,选=a=>a[a.length*random()>>0]

document.write`<canvas id=C>`;P=[]
for(let k=0,i, l,L=2*c.l,S=10,S1=1+S+c.球.length,V0=c.叶[0];k<200;)
with(bg[k]=k? k<S1? C.cloneNode(0):bg[1] :C) {width=height= k? 2*L : (W=L*25) //不要在主/贴图画布上重复wh
with(g=getContext("2d"))if(k){i=0;g.translate(L,L)
if(k<S)for(;i++<80;)转(Q(D),(y,x)=>{l=Q(2);bg(setA(c.叶,V0+l*5 )); beginPath(),moveTo(l*10*x, l*8*y),lineTo(L*l*x, L*l*y),stroke()})
else if(k<S1)for(l=c.l;i<l;i++)bg((S1-1==k)? c.雪: setA(c.球[k-S],i/l*70)),
    beginPath(),arc(-i/3, l-i/4,  (l-i)/(S==k?2:1), 0,D),fill()}
  转(Q(D),(A,B)=>{for(H=c.w*(y=k++ *l*c.h),i=0,d=3/*尾端加彩球,直点儿*/,x=0;i<H; i++)
  P.push([
    x+=Q(c.wz)+ A*d, y+=Q(l)*d, i*B*d, Q(S)+S/2-1 +((i+1>H)&Q(1)<0.3? (d=S1-S) :0)>>0 ]) })//of y,i
}
g=bg[0].getContext("2d")
draw=t=>转(t,(A,B)=>{ //面向y Ax+Bz,左侧 Az-Bx. 面向x Az+By 左  Ay-Bz. 面向z Ax+By 左 Ay-Bx
  for(let[x,y,z,n]of P.sort((a,b)=>1?A*(a[2]-b[2])-B*(a[0]-b[0]) : A*(a[1]-b[1])-B*(a[0]-b[0]) ))
  g.drawImage(bg[1+n], 90+A*x+B*z,y>>1) })

//骗我的。 a[2]-b[0] 是-zx平面(y深度)，-zy才是z深
t=0;setInterval(()=>{g.clearRect(0,0,500,500); draw(t+=.1)}, 100)
