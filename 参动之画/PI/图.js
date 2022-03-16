with(Math){DEG=2*PI; 增转=([x,y],r,l)=>[x+l*sin(r),y+l*cos(r)]; 取转=atan2; leng=([x,y],[x1,y1])=>(x-=x1,y-=y1 ,sqrt(x*x+ y*y) ) ;随=random}
g=G
gPose=(p0,r,l, f_l)=>{with(g){save()
  translate(...p0);rotate(r)
  moveTo(0,l);beginPath(); f_l(l);  closePath();stroke();
  restore()
}},

cfg={n边:5,l边:-200, r:.03*DEG,P:[300,500] ,keep:false}, //不以lC取切点, w半径
弦图=(nIter)=>{
  let {r:dr,l边:l, n边:N,P}=cfg,{sin}=Math,
  /*内角*/r=(N-2)/N*r180, kl=sin(r/2) / sin(r/2+dr)
  for (let 内=多边(N), r=0; nIter--; r+=dr,l*=kl) gPose(P,r,l, 内)
},
多边=N=>l=>{ for(let r=DEG/N, i=0;i<N;i++){g.rotate(r);g.lineTo(0,l)} }

r180=.5*DEG
弦图(20);


Tur=(p0)=>({p0,ps:null, r:0,
  l(v){let p,{ps,r,p0}=this;if(ps){p0.push(r);ps.push(p0)} this.p0=p=增转(p0,r,v);let [x,y]=p; g.lineTo(x,y);g.stroke() },
  pL(l,r){let {p0,r:r0}=this;return 增转(p0,r||r0,l)},
  set go(P){if(typeof P=="number")P=this.pL(P);  this.p0=P;g.moveTo(...P)}
}),

爬多边=(n,l,q=true)=>{
  let N=n;n=Math.abs(n);q=n>2?q:false; while(n--){ tu.r+=q? DEG/N : r180+r180/N; tu.l(l) }//先r后l,末p0准确.
},
lines=a=>{let p=a[0],i=1,N=a.length; g.beginPath();g.moveTo(...p);for(; i<N;i++){p=a[i];g.lineTo(...p)}  g.lineTo(...a[0]); g.closePath(); }

let tu=Tur(cfg.P)

距弦图=(nIter)=>{
  let {r:lC,l边:L, n边:N}=cfg, kl=lC/L,rC=取转(lC,L-lC),
  a0,a1, l
  tu.ps=[]; 爬多边(N,L); a0=tu.ps;
  a1=a0, nI=nIter;while(nI-->0){l=leng(a1[0],a1[1]);  lines(a1=a1.map((a,i)=>增转(a,a0[i][2], l*kl) )); g.stroke(); for(let i=0;i<N;i++)a0[i][2]+=rC; }

  g.font="10pt sans"
  a0.forEach((p,i)=> g.fillText("p"+i,...p.slice(0,2)))
}

// Object.assign(cfg,{n边:5,l边:210,r:17})
//距弦图(90)
tu.ps=null;

玩=(f,...a)=>el(doc.body,玩它(f,a))
//玩((细,周期, k,sy)=>{fplot(1/细,2*Math.PI*周期, x=>Math.sin(x)/k+sy )}, [100,1,2,0.5])

/*弦图  三角分形,杨辉  Mandel/Julia */

三角=(l,n,u)=>{
let l3=Math.sqrt(2+1),a=[[0,l],[l/l3,0],[l/l3*u,l]], x=0,y=l //0点是三角左下， 向/2的层(下/右/右2下)分出许多枝，就含下位与细内
while(n-->0){let[X,Y]=a[随()*3>>0]; x=(x+X)/2, y=(y+Y)/2;  G.beginPath();G.arc(x,y, 1, 0,DEG); G.fill()}
}

玩(三角, 400,1e4,2)

gCache=(g,f,key=x=>x,frac=1000,c=new Map)=>(...a)=>{let{width:w,height:h}=g;
  g.clearRect(0,0,w,h); a=round(a*frac)/frac; let b=c.get(a); (b!=null)?g.putImageData(b,0,0) :f(a)&c.set(a,g.getImageData(0,0,w,h))
}
mandel=(nIter=60)=>(Px,Py)=>{
  let i=0, x=0,y=0,x1=0;
  if(julC!=null){x=Px,y=Py; [Px,Py]=julC} //0,0+N(P x y) vs. Pxy+N C; 别用do while
  while(i<nIter&&(x*x+y*y)<4) {i++;//xy+yx, sqrt(xx+yy) <2
    x1=x*x-y*y +Px; y=2*x*y +Py; x=x1} return i/nIter
}
let julC=null

搜=(f,l)=>{let[w,h]=L,[W,H,y0]=l, y=0,x=0;
  for(;y<h;y++)for(x=0;x<w;x++){G.globalAlpha=f((.2-x/w)/W,(y0-y/h)/H); g.fillRect(x,y,1,1)}
}

//玩((x,y,y0)=>搜(mandel(),[x,y,y0]), .5,.3, .5) //6, 4.32, 3.9 //julC=[.4,.3]
//如果说都是显隐式函数图，VecN 加rC pC 复数或许还可以，比如做框选缩放和视口对应Julia集 cache，但弦图、三角这些就是完全没关系 太尬
//cfg.n边=3
//玩(弦图,20)
玩(距弦图,30)

/*
以下图形均有(P,nIter) 参数，低Iter 是图形的浅层部分
1.赵爽弦图(N边,l边,r) r是每次的角差，而每转1次图形缩为kl倍
2.距差弦图(N边,l边,l) 先创建N边形的边点，转1次点照绘制方向前进l，比率与方向 kl=l/L,dr=取转(y=l,x=L-l)
3.三角分形(l,u) l是最大三角的高度，u是横向放大。 每点不断/2向上攀，有机会右/下/右下 移动，
4.Mandel和Julia(需julC) 集，前者(隐函数|距离函数)是后者的缩略图。计算逃逸速度，从xy复数乘法(xx-yy,2xy) 几次在<+-2 内，越大的点越黑
 */
