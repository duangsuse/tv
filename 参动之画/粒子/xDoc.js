document.write`<canvas id=C>`
G=[],P=[]//贴图,树枝条-粒子
雪=13, l=8,L=2*l, lz=1,lZ=6
Q=k=>Math.random()*k,Qh=k=>Q(k)-k/2,V=(...c)=>`rgba(${c.join()})`;
let {sin: R, sqrt: E} = Math, DEG=2*Math.PI;
for (枝=k=0; z=j= i=x = k < 200; )
with (G[k]=k? C.cloneNode(0) : C) {width=height= k? 2*L : (W= l*55);
    with (getContext('2d'))if(k)
        if(k>10)
            for (;I=i*L,//渐变圆.i大者 小,亮
            fillStyle = !k ? '#cca' : (雪==k)? V(205,205,215,.15) : V(147+I,k%2?0: 128+I,I, .5), i<l; i++)
                beginPath(),arc(L- i/3, L+ l-i/4/*x降,色浅,ytop=距顶 降.L=32/2*/,  (l-i)/(雪==k?2:1), 0,DEG),fill()
        else
            for (;x=R(i),y=Qh(2),//x=正弦:竖着=遍历-1~+1  亦可锯齿波 i%W/W *2-1
            D = x*x+y*y,
            B = E(D+1 - 1.4*x - 1.5*y),
            c = 67 * (B + 1) * (ll=.8+ k/9) >> 1,//div(int)2
            i++ <W;) if (D < 1)//1^2=1. 圆心距
                beginPath(strokeStyle = V(c,c+ B*ll >>0, 40,.1)),
                moveTo(L+l*x, L+l*y),lineTo(L+L*x, L+L*y),stroke();
    for(H=lz*(y=l*.5*k++),r=Q(DEG);//H=枝高升 ytop升 亦可k+E(k++)*25 (200/8)趋集中在k=200
    d=3, j<H; j+=L)P[枝++] =//已确定y,r 生成H点:xyz震荡累积
    [x+=Qh(lZ)+ R(r-11)*d, y+=Qh(L), z+=Qh(lZ)/*可=0但低精度*/+ R(r)*d,
    j/H *10 + ((j+L)>H  &Q(1)>.8? Q((d = 9/*尾端直点儿,彩点*/) - 7) :0) >>0]
}
g = C.getContext("2d");g.translate(-L,0)
t=0;setInterval(()=>{t+=.05
    let A=R(t-11),B=R(t);
    g.clearRect(L,0, W, W);
    P.sort((a,b)=> (a[2]-b[2]) *A+ (b[0]-a[0]) *B ) //zA-xB
    .forEach(([x,y,z,n],i)=>{
        g.drawImage(G[n+1], W/2 + x*A+z*B >>0, y >> 1)
        if(i%7==0)g.drawImage(G[雪], (i**2 + R(t+i) *7*7) %W, (i+i* t/60) %W-L);
    })
}, 1000/60)


document.write`<canvas id=eC>`
hsl=(h,k,v)=>`hsl(${h/100}turn ${k}%${v}%)`
c={leaf:[25,45].map(h=>hsl(h,100,20)), ball:[hsl(94,83,66), hsl(25,50,67)] }
布=e=>{e.width=e.offsetWidth;e.height=e.offsetHeight;return e.getContext("2d")}
with(Math){转=(r,f)=>f(cos(r),sin(r));DEG=2*PI}

P=[]
gtree=(h,k,l)=>{let j,r,y,x,Y;
for(y=0,r=0;y<h;y+=L)for(j=0;j<k;j++,r+=Ql(1))转(r,(A,B)=>{
for(x=0;x<l;)P.push(A*x,Y+=Q(L),B*x, (x+=Q(lZ)>l)?Qa(c.ball): Qa(c.leaf))
})
}
draw=t=>转(t,(A,B)=>
  P.sort((a,b)=> A*(a[0]-b[0]) - B*(a[2]-b[2]) )
  .forEach(([x,y,z,n])=>{}))
gtree(); g=布(eC);draw(0)

/*"辐射对称"的圣诞树可以按 层枝点=yrx 三层来随机累加y,x生成
原版只用两个for 就实现包含贴图生成的工作(不含光球和树叶贴图内)，叶图也是D<1 模拟W点l不同画圆，它的第一层是 i<10 的树叶和以上皆彩球，
y 是靠i/N 比率计算；然后枝条 j<H 也是转随机r=sin(i) 每枝不同
咱可直接迭代y,xw随y增长,r随sin(n枝层)选

y随圆球贴图一起, r随m*y个枝条粒子一起, 圆球高光靠yx下降速率,树叶靠r累加l随机圆上点~*2, 枝最后一段若彩球,4倍震幅
旋转公式 x=xA+zB, z序公式 zA-xB
雪(i**2 + R(t+i) *7*7) %W, (i+i* t/60) %W-L

H=lz* y=.4kl, r=Q(D),j=x=0//j步长可=1
*/
