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

贴图=配.sty||ss`gray black green red`, 贴文=配.styc||"　凉逸桃"
绘者=绘_素画文(()=>{
  let i,N=n*m, a=e阵.a
  for(i=0;i<N;i++)a[i].background=贴图[阵[i]]
}, ()=>{
  let i,y, j,x, p//编号
  for(i=0,y=0,p=0;i<n;i++,y+=l)for(j=0,x=0;j<m;j++,p++,x+=l){g.fillStyle=贴图[阵[p]]; g.fillRect(x,y,l,l)}
},
()=>{ hcon.clear()
  let i,N=n*m, j=0
  for(i=0;i<N;i++){ hcon.w(贴文[阵[i]]); j++;if(j==m){j=0;hcon.wLn()} }
})

let p, dir=1,  que;
配.初=()=>{p=pYX(div(n/2),div(m/2)); que=[p]; 新点(3);绘()}

const geta=(a,f,...arg)=>a[f(a,...arg)], maxBy=(a,f)=>{let x=a[0],ix=0, i=1,N=a.length; for(;i<N;i++)if(f(a[i])>f(x))x=a[i],ix=i;  return ix},
触向=(e,k,f)=>{ let x0,y0; //^ geta([-5,3],maxBy,Math.abs)
  e[`on${k}down`]=ev=>{x0=ev.x;y0=ev.y}; e[`on${k}up`]=ev=>f(x0,y0,ev.x,ev.y)
}
新点=k=>{let p; do{p=div(random()*n*m)}while(阵[p]!=0); 阵[p]=k }
{ let a=[], f=配.kquee(a, _=>dir)
  配.按键=cmd? ev=>{let c,r= (c=ev.code)? [-m,+m,+1,-1] [c.charCodeAt(1)-0x41] :0; f(0,r)} : ev=>f(0, [-1,-m,+1,+m] [ev.keyCode-37])
  cmd?0: 触向(window,"pointer",(x0,y0,x,y)=>{ x-=x0;y-=y0; let a=[y,x],i=maxBy(a,Math.abs), v=i==0? m:1; f(0, a[i]<0? -v:v) }) //TODO 划分x或y 除蛇数 看id
步=()=>{
  清空(a,(i,d)=> dir=d)
  p=p+dir; if((c= 阵[p])!=0&&c<3) (c=prompt("死了啦"))==null?游戏(): c||(游戏()&游戏()); else { que.push(p);阵[p]=2; c==3/*苹果*/? 新点(3) : 阵[que.shift()]=0 }
  绘()
} }

e阵.style.r=0
