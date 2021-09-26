const doc=this.document,cmd=globalThis.process, el=(e,k)=>e.appendChild(doc.createElement(k)), {random,floor:div}=Math, ss=(s)=>s[0].split(" "), asig=Object.assign, dict=()=>Object.create(null)
var 阵,n,m, e阵,l,//瓷块宽
模式=0,updL, 重阵=console.trace,绘者=()=> ()=>{},绘=绘者(),步=绘,
g,hcon, 配={$:ss`v sty styc css`, oldM:0,ch:"",nCh:0,//画布,文本输出; 高格高速也=平滑 但比例不对
  set 击键(f){
    cmd?require("repl").start().input._events.keypress=(k,o)=>{o.key=k;let d1=f(o), kc=dirs.分(o); if(d1+(dirs.局[kc]||0) )dirs.push([kc,d1]) } : window.onkeydown=f
  }
},dirs=asig([],{分:k=>0, 局:dict()}),C;//win,的字符终端ioctl接口; 反正getch==-1 也是队列,分派吧

let pYX=(y,x)=>y*m+x, yxP=p=>[div(p/m), p%m],//2D数组铺平m
isZ=(i,N)=>i==0||i==N, orBoth=(a,b, v,vnot, f)=>a&&b? f() : (a||b?v:vnot),
sel=(id,ks,f)=>{
  let e=el(doc.body.children[0],"select");ks.forEach(k=>{el(e,"option").innerText=k});
  e.name=id; setParm(doc.location.search); (e.onchange=()=>f(e.selectedIndex))()
},
setParm=s=>{ let $=配.$, k,v, id=cmd?{}:doc.all,e
  for([k,v]of new URLSearchParams(s)) { if(e=id[k])e.value=v
    if(k==$[1]||k==$[2]){if(-1!=(配.nCh=v.indexOf(";")) )v=v.split(";");else 配.nCh=1; }  配[k]=v}
},
绘_素画文=(e,g,b)=> ()=>[e,g,b,e][模式], 清空=(a,f)=>a.splice(0,a.length).forEach(f)

if(cmd){ fs=require("fs"); prompt=s=>{console.warn(s); return fs.readFileSync(0/*stdin,Ctrl-D*/).toString()} //全局属性,不是var 噢
  setParm(cmd.argv[2 +0])
  let o=cmd.stdout, lno=0,q
  try{setC(q= cmd.platform!="win32")}catch{prompt("export NODE_PATH=`npm -g root`; npm -g i ffi-napi")} //妈Lua都有 #io.read() ,Node竟需readline({input})...
  [n,m]=cmdNM();n--,m--; // l,e,g 不会用到,无 resize 无初始sel; 亦可 o.columns rows

  模式=2; hcon=q? {w(s){o.write(s)}, wLn(){o.write("\n")}, clear(){o.write("\x1b[H")}} : {
    clear(){lno=0},
    wLn(){lno+=1; C.ij[1]=lno; C.SetConsoleCursorPosition(C.ij)}, w(s){o.write(s)}
  };
  fs.readFile(配.v, (_,b)=>{eval(`${b}`); if(贴文[0]=='　')m=div(m*0.5); 重阵(n*m);绘=绘者(); 游戏() }) //node主循环就模拟了浏览器,为何不注册
  e阵={style:{}}
} else {
doc.title="多法贪吃蛇"
let s,e,fm, 保=(a,b)=>a==1&&b==2||a==0&&b==3;
e=doc.querySelectorAll("form,b,input");// m,l 更新
fm=()=>{ m=div(e阵.offsetWidth/l); n=div(e阵.offsetHeight/l); e[1].innerText=l+` 共列${m}*行${n}格${m*n}`; let a=模式,b=配.oldM;
  if(a==1){let c=g.canvas;c.width=m*l;c.height=n*l;} a!=b&&(保(a,b)||保(b,a))?(配.oldM=a):重阵(n*m);  绘=绘者();绘()}//不看余数
new MutationObserver(fm).observe(e阵= el(doc.body,"div"), {attributes:true, attributeFilter:["style"]});//.阵 resize

updL=e[2].onchange=ev=>{ l=e[2].valueAsNumber; e阵.style.setProperty("--l",isZ(模式,3)?l+"px": fm()||""/*0分格.必通知!*/); 配.ch=`<style>*{margin:0;padding:0}pre{font: ${l/配.nCh*.88}px DejaVu Sans Mono,Courier New,monospace;}</style><pre>` }

e阵.className="阵"
for(s of 配.$)el(e[0],"input").name=s;
sel("mode",ss`grid canv doc gridv`,i=>{配.oldM=模式; 模式=i;//1x 不重阵.
  let q, d;
  if((q= i==1)||i==2) { e阵.innerText=""
    if(q) g=el(e阵,"canvas").getContext("2d");
    else{d=el(e阵,"iframe").contentDocument
    hcon={clear(){d.open();d.write(配.ch)}, w(s){d.write(s)}, wLn(){d.writeln()} } }
  }
  updL()
})
if(s=配.v)el(doc.head,"script").src=s//加载.js
if(s=配.css)el(doc.head,"style").innerText=s
}//DOM

角=[1,1,1,1]
重阵=N=>{
  let i,j, p=0, ae, q=isZ(模式,3),i角=0;
  阵=Array(N); if(q){e阵.innerText=""; ae=e阵.a=Array(N)}
  for(i=0;i<n;i++)for(j=0;j<m;j++,p++){ 阵[p]=orBoth(isZ(i,n-1),isZ(j,m-1),1,0, ()=>角[i角++] ); if(q)ae[p]=el(e阵,"hr").style }
  if(!cmd)e阵.addEventListener("click", 游戏, {once:1})
}

function cmdNM(){return [21,31]}
gid=0
function 游戏(){
  if(gid){clearInterval(gid);gid=0;return}
  配.初()
  let dt=div(1000/(配.cps||7))
  console.trace(dt,配)
  gid=setInterval(步,dt)
}
function setC(qstd){
  const{Library:L}=require("ffi-napi"),U16=Uint16Array, I="int";Z="void*",
  [GWINSZ,kStdO]=[0x5413,2**32-11]
  C=qstd? L("libc",{ioctl:[I,[I,I],{varargs:1}]}) : L("kernel32",{GetConsoleScreenBufferInfo:[null,[Z,Z]], GetStdHandle:[Z,[I]], SetConsoleCursorPosition:[null,[Z,Z]] })

  C.hStdO=qstd?0: C.GetStdHandle(kStdO)
  cmdNM=qstd? ()=>{ let c=new U16(2);
    C.ioctl(Z)(1,GWINSZ,c); return [...c]
  } : ()=>{
    let i0=2+2+(2), c=new U16(i0+4+2)
    C.GetConsoleScreenBufferInfo(C.hStdO, c)
    let [l,t,r,b]=c.slice(i0); return [b-t,r-l]
  }
  C.ij=new U16([0,0])
}
