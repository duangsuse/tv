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


