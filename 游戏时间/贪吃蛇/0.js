/*第一代间差异：
贴图：空白(0)、蛇体、墙壁、苹果
撞1,2号方块死,停帧刷新；撞苹果上新，否则去1块尾部

固定单项宽grid，JS算行内项数 用于“上下”移动；视效只有背景色 .2s渐变

独立+触摸屏转向
+paint() 实现可选 canvas 多xywh矩形
+paint() 可选 linux,dom,win 基于 hcon. clear,w,wLn 文本视效；当运行于 node v8 按 process.platform=="win32" 切换 hcon ，调整paint为文本输出。
如果每行一次调用 println,writeln 而在JS拼接行里的文本或许比多次 print 后 println() 带缓冲、更快，但JS没有好的拼合方法也不必在意标准输出流的缓冲
*/

//e阵,n,m,阵, 模式:grid canvas:g hcon,换阵

贴图=配.sty||ss`gray green black red yellowgreen darkgreen`, 贴文=配.styc||"　小凉桃疯逸", i资=4
绘者=绘_素画文(()=>{
  let i,N=n*m, a=e阵.a
  for(i=0;i<N;i++)a[i].background=贴图[阵[i]]
  for(i=0;i<2;i++)a[que[i==0?0: que.length-1]].background=贴图[i资+i]//性能关键,副本码
}, ()=>{
  let i,y, j,x, p//编号
  for(i=0,y=0,p=0;i<n;i++,y+=l)for(j=0,x=0;j<m;j++,p++,x+=l){g.fillStyle=贴图[阵[p]]; g.fillRect(x,y,l,l)}
  for(i=0;i<2;i++){ [y,x]=yxP(que[i==0?0: que.length-1]); g.fillStyle=贴图[i资+i]; g.fillRect(x*l,y*l, l,l) }
},
()=>{ hcon.clear()
  let i,N=n*m, j=0,
  edg=pSwap(阵,[que[0],rget(que,0)], (x,i)=>i资+i)//赞
  for(i=0;i<N;i++){ hcon.w(贴文[阵[i]]); j++;if(j==m){j=0;hcon.wLn()} }
  edg()
})

let p, dir=1,  que=[0];
配.初=()=>{p=pYX(div(n/2),div(m/2)); que=[p]; 新点(3);绘()}

const geta=(a,f,...arg)=>a[f(a,...arg)], maxBy=(a,f)=>{let x=a[0],ix=0, i=1,N=a.length; for(;i<N;i++)if(f(a[i])>f(x))x=a[i],ix=i;  return ix}, rget=(a,i)=>a[a.length-1-i], {sin,cos,PI}=Math,
plusRL=(x,y)=>(r,l)=>[x+l*sin(r),y+l*cos(r)],//直左三角 倒
圆点=(x,y,l, f)=>{for(let p=plusRL(x,y), r=0,r1=2*PI, dr=r1/(l*PI*globalThis.l);r<r1;r+=dr)f(...p(r,l)) },
烟花=(x,y,v, a=[])=>l=>{
  清空(a, (p,v0)=>阵[p]=v0); let p0=-1//v (/l*3.99)的浮点小误差免覆盖, 于旧公式 r1/l/globalThis.l/2
  if(l)圆点(x,y, l,(x,y)=>{let p=pYX(div(y),div(x)); if(p0!=p)a.push(p,阵[p]);阵[p]=v; p0=p});绘()
},时差数=(a,b,step,f,dt,tend=0)=>{let id=setInterval(()=>{f(a);a+=step; if(a>b){clearInterval(id);f(tend*a)}},dt)},

触向=(e,k,f)=>{ let x0,y0, q=(k!="touch"),on; //^ geta([-5,3],maxBy,Math.abs)
  on=(k1,f)=>e.addEventListener(k+k1,q?f: ev=>{let p=ev.changedTouches[0]||ev.touches[0]; ev.x=p.clientX,ev.y=p.clientY;f(ev)}, {passive:false})
  on((q?"down":"start"),ev=>{x0=ev.x;y0=ev.y}); on((q?"up":"end"),ev=>f(x0,y0,ev.x,ev.y,ev) )//给f机会自己判断是点击滑移还是游戏内.
},
新点=k=>{let p; do{p=div(random()*n*m)}while(阵[p]!=0); 阵[p]=k }
{ let a=[], f=配.kquee(a, _=>dir)
  配.按键=cmd? ev=>{let c,r= (c=ev.code)? [-m,+m,+1,-1] [c.charCodeAt(1)-0x41] :0; f(0,r)} : ev=>f(0, [-1,-m,+1,+m] [ev.keyCode-37])
  for(let kev of ss`mouse touch`)cmd?0: 触向(window,kev,(x0,y0,x,y,ev)=>{ x-=x0;y-=y0; let a=[y,x],i=maxBy(a,Math.abs), v=i==0? m:1; if(a[i]>5)ev.preventDefault(); f(0, a[i]<0? -v:v) }) //TODO 划分x或y 除蛇数 看id; 风格： 空 蛇 墙:横竖斜反白 苹果 (资源>)四向:蛇头,蛇尾
    //还以为 pointer 是统一 API 呢，没想到支持的那么少 也难怪暴露的数据好长,本该浏览器兼容
步=()=>{
  清空(a,(i,d)=> dir=d)
  p=p+dir; if((c= 阵[p])!=0&&c<3) (c=prompt("死了啦"))==null?游戏(): c||(游戏()&游戏()); else { que.push(p);阵[p]=1; c==3/*苹果*/? 新点(3) : 阵[que.shift()]=0 }
  绘()
} }

//e阵.style.r=0 //FxA 68 Observer 不正常
