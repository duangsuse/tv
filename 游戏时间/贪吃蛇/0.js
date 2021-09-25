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

新点=k=>{let p; do{p=div(random()*n*m)}while(阵[p]!=0); 阵[p]=k }
配.击键=cmd? ev=>{let c,d1;if(!(c=ev.code))return; d1=[-m,+m,+1,-1] [c.charCodeAt(1)-0x41]; if(d1+dir)dir=d1 } : ev=>{let d1=[-1,-m,+1,+m] [ev.keyCode-37]; if(d1+dir)dir=d1 }
步=()=>{
  p=p+dir; if((c= 阵[p])!=0&&c<3) (c=prompt("死了啦"))==null?游戏(): c||(游戏()&游戏()); else { que.push(p);阵[p]=2; c==3/*苹果*/? 新点(3) : 阵[que.shift()]=0 }
  绘()
}

e阵.style.r=0
