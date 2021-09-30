const {random,floor,abs}=Math,ss=s=>s.split(" "),nA=(n,f)=>Array(n).fill(0).map(f),
rand=n=>floor(random()*n)//随机<n
isZ=(i,N)=>i==0||i==N//上,左双墙面

var RL
蛇=(n,m,阵)=>{ var p,d=1,ps,  d新=1,c, 选=n=>5+rand(n-5)
  初=()=>{ 阵.fill(0); p=选(n)*m+选(m);ps=[p]; 新点(3)//清空,p,苹果
    for(let p=0, i=0,j; i<n;i++)for(j=0;j<m;j++,p++)if(isZ(i,n-1)||isZ(j,m-1))阵[p]=2 }//墙; a||b 的可取交集.
  新点=k=>{let p; do{p=rand(n*m)}while(阵[p]!=0); 阵[p]=k; }

  if(cmd) (RL=RL||require("repl").start()).input.on("keypress", (_,ev)=>{ let d1=(c=ev.code)? [-m,+m,+1,-1] [c.charCodeAt(1)-0x41]:-d; if(d+d1)d新=d1 });
  else{window.onkeydown=ev=>{ let d1=[-1,-m,+1,+m] [ev.keyCode-37/*左键*/]; if(d+d1)d新=d1 }
  for(let kev of ss("mouse touch"))
    触向(window,kev,(x0,y0,x,y,ev)=>{ x-=x0;y-=y0; let q=abs(x)>abs(y), v=q?1:m, d=q?x:y; if(abs(d)>2)ev.preventDefault(); d新=(d<0? -v:v) })
  }
  步=()=>{
    d=d新;p=p+d; if((c= 阵[p])!=0&&c<3) 死掉(); else { 
      ps.push(p);阵[p]=1; c==3? 新点(c)/*苹*/ : 阵[ps.shift()]=0 }
    绘()
  }
  return[初,步]//两个生命周期函数值.
}

触向=(e,k,f)=>{ let x0,y0, q=(k!="touch"),on;
  on=(k1,f)=>e.addEventListener(k+k1,q?f: ev=>{let p=ev.changedTouches[0]||ev.touches[0]; ev.x=p.clientX,ev.y=p.clientY;f(ev)}, {passive:false})
  on((q?"down":"start"),ev=>{x0=ev.x;y0=ev.y}); on((q?"up":"end"),ev=>f(x0,y0,ev.x,ev.y,ev) )//给f机会判断是点击滑移还是游戏内.
}

doc=this.document, cmd=globalThis.process

gid=0, 配={绘:0, 复活:0, 界:[20,30], 贴文:"　蛇墙果头尾",贴色:ss("gray blue green red #66ccff #aaaaaa")},//grid/字符; 单次,重开,加分,不死; 高宽
主循环=f=>{let[n,m]=配.界,N=n*m, a,ae, [init,go]=f(n,m,a=Array(N)),dt=1000/7 //秒格速度 ;可用 n=cmd.stdout.rows 或 URLSearchParams("w=1").get
  if(doc){let e=doc.body
    e.style.cssText=`white-spaces:pre; user-select:none; display:grid;grid-template-columns:repeat(auto-fill,calc(100% / ${m}))`
    doc.styleSheets[0].addRule("hr",`box-sizing:border-box;border:0; width:100%;height:100%;  transition:.1s background cubic-bezier(0.4, 0, 1, 1); border-radius:20%`)
    ae=nA(N, p=>e.appendChild(doc.createElement("hr")).style )
  }
  init();gid=setInterval(go,dt)
  死掉=()=>{let k=配.复活// if(0)prompt("复活方式")
    if(k==3)return
    clearInterval(gid);gid=0
    if(k==0){if(RL)RL.close();return}//v 重开
    gid=setInterval(go,dt); (k==2)?新点(3):init();
  }
  let 画文=cmd? s=>{so.write("\x1b[H");so.write(s)} : s=>{doc.body.innerText=s}, so=o=cmd?cmd.stdout:0, {贴色,贴文}=配
  绘=cmd||配.绘==1? ()=>{let p, j=0,s=[]
    for(p=0;p<N;p++){ s.push(贴文[a[p]]); j++;if(j==m){j=0;s.push("\n")} }
    画文(s.join(""))
  } : ()=>{
    for(let p=0;p<N;p++)ae[p].background=贴色[a[p]]
  }
}

主循环(蛇)
