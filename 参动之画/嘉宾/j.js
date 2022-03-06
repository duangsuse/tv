anON={cut:s=>
iverb={cut:n=>, cat:(v,i)
布=e=>

an.二分渐变=(iv,f1,f2,imAB)=>

lerp=(a,b,t)=>a+t*(b-a)
anim=(v0,v1,f,dur)

滑条=f=>

an.rn=(a,b)=>lerp(a,b,Math.random())
//队列单项. 字行.8s退场
ae.落=
ae.旋=
ae.印=

eanim=c=>
  return(e,iv)=>
动画队=(ao)=>

orun=o=> //an也可按ID留变更

//台上[队]更替带来场面，进度条负责更替查询%全长
//创建n*hr 将位移eanim重复；图渐变替代原文；动画速率
ae.彩糊=
ae.光流糊=
ae.现=
an.bez=(...ps)

//画布间粒子
an.粒浮
an.外矩形
an.擦拭=(b,ik,imAB)

时差次=(n,dt,f)=>{let id=setInterval(()=>n-->0?f():clearInterval(id) ,dt)}
an.环波

//1.7t h=1.5~2

seek=playBar(e,ppt(t=>seek(t)))//e和seek 跳转进度0~1，但动画不可断 无意义


布//创建容器/画布 ；彩糊=blur+span+N*hr 随机3*xy ；圆环stroke 随大小减,同时差多个
pmix,orun
eAnim(e,c)//正反向(正反、奇单偶往返)? 自{a:[]}、 调配置
动画队(ao,序,rev_dt)
srtCut(s,f_dtdur)//解析srt和嵌套调用，设an.fg 创建e动画=>(e0,onPPT)=>填到模板页方位i,带退场 ()=>带dur由ticker列表播放
playBar(e,time)//算t%。播放下项，或搜索i

擦拭(nlev,bw,imAB)//色阶渐变. PerlinNoise 圆弧和bez
二分(f1,f2,iv,imAB)//复制：进a-b  退b-b 末a 若无f2
粒浮(pc,gf,grav,die,g)//创建角速度,初点在an.外矩的N个，更新和碰边 p-p1重置 l==0?lScr:0

VecN[1] V,Vn,Va

/*
图像渐变 A->o(t=0~1)->B 由动画 anim(v0,v1,f,dur) 完成，它将参数 t0,dur,dt ease曲线映射到 rep(t1)
矩渐变：方向iv=-1 即竖减，奇竖偶横。 当光线流A->B 时(g,a,b,box)=> 先把a画到g ，再递减box高像幕布拉起，以 box 末行于g纵填充矩形，即[a,a,b]；再iv反向，[a,a,a] 对现a=b如法炮制，最后绘制原a=空白 (iEnd=0
若是“蓝线挑战”，ab皆是视频。f1=绘视频，有f2=“幕布”尾1行填到o画布 iEnd=1；若是PPT，f2=空函数(自动清空背景)， f1绘制b图像即避免a出现
iEnd=2才始于o=a

色渐变：A+(p+256*t)(B-A) ；有黑~白 渐变色和 yRep(n,(w,h)=>色 生成遮罩
*/

触向=(e,k,f,fmov)=>{ let x0,y0, q=(k=="touch"),on,tap;
  on=(PC,M,f)=>e.addEventListener(k+(q?M:PC),q?tap(f):f, {passive:false})
  tap=f=>ev=>{let p=ev.changedTouches[0]||ev.touches[0]; ev.x=p.clientX,ev.y=p.clientY;f(ev)}
  on("down","start",ev=>{x0=ev.x;y0=ev.y;q=1}); on("up","end",ev=>{f(x0,y0,ev.x,ev.y,ev);q=0})
  if(fmov)on("move","move",q? ev=>{fmov(x0,y0,x0=ev.x,y0=ev.y)}:ev=>{if(q/*^*/)fmov(x0,y0,x0=ev.x,y0=ev.y)})
}
mouse=(e,fUM)=>{let p=Vn(3),p0=p.dup, v=(P,i)=>E=>{P.v(E.x,E.y,E.buttons); if(i&&fUM)fUM[i-1](E)},
  on,tap,q=0, k;for(k of ss("mouse touch")){
  on=(PC,M,f)=>e.addEventListener(k+(q?M:PC),q?tap(f):f, {passive:false})
  tap=f=>E=>{let p=E.changedTouches[0]; E.x=p.clientX,E.y=p.clientY;f(E)} //^其实是n(fUM)!=0 ，这有问题.[]时记move [fU]不应需要
  on("down","start",v(p0)); on("up","end",v(p,1)); if(fUM!=NO){if(n(fUM)==1)fUM[1]=fUM[0]//M=U
  if(fUM!=null)on("move","move",v(p,2))} ;q++}//qTouch
  return[p,p0]
}
qucall=a=>a.forEach((f,i)=>{try{f()}catch(_){a.splice(i,1)}})
// data-rn-r="0 6 200" g.clip();g.drawImage(虹,0,0)也是过度设计，未见用处，失虑
//let[p]=mouse(_=>p)等于啥? // 数组特殊[] 更混淆了noOp和null
//[aprod,acomb]=$YN(q=>(a,f,i=0)=>i<n(a)? (q?a[i]:a).map(x=>(q?aprod:acomb) (a,x1=>f(x,x1) ,i+1)):f())//链表尾, $YN=f=>[f($Y),f($N)]
//最后页由波浪 彩手绘、拨弦、(.5,1)wh 旋转星星集。 星迭Vn2,补间Vn3色 输出到Vn4

//VecN.wh 用作SVG是好事，但 &&chg&&o.width 的否定传参副作用实属不妥

anim=aobj({rate:16,ease:t=>t%1.1 },
(v0,v1,dur, f)=>aobj({_dv:v1-v0, dur,t0:0,
rep(n=1,ok=noOp){let {rate,ease}=anim,{dur,t0}=this,q=n>0,
  dt=rate/dur*(q?1:-1), t=t0,
  id=setInterval(()=>{this(ease(t));t+=dt}, rate),
  ed=()=>{//stop.
  if(q? t<n:t>n)setTimeout(ed,st==0?dur*n:Math.min(200,dur/10));else{clearInterval(id); if(n!=0||t0!=0)this(n),ok()}
  },st=0;ed();st=1}
},function v(t){f(v0+t*this._dv)}) )

mir=f=>t=>1-f(1-t) //OGL clamp. ease-out
mirs=f=>t=>t<.5?f(t*2)/2 : 1-f(2-2*t)/2
{let{cos,sqrt}=Math,
k=7.5625,kf=[4,8,10].map(x=>x/11),Kf=[6,9,10.5].map(x=>x/11),t0=[.75,.9375,.984375]

MF={k:k=>t=>t**k, //不太真诚地“感谢”zhangxinxu的 c * (x /= d) * x * x + b 等pow公式和“优化”
exp:t=>2**(10*(t-1)), cir:t=>-sqrt(1-t)+1, sin:t=>(-cos(DEG/2 *t)+1)/2,
ela:t=>2**(10*t - 10) * -cos((t*10) * DEG/3) ,
bou:t=>{let i=kf.findIndex(x=>t<x);if(i==-1)i=3
  return i--==0?t*t*k: (t-=Kf[i])*t*k+t0[i]
}
}}MF.cub=mirs(MF.k(3))

anim.ease=mir(MF.cir)//easings.net
return anim(0,1,dur, opac=>{
  m.globalCompositeOperation="source-over"
  m.putImageData(b,0,0);m.fillStyle=`rgba(0,0,0,${opac})`; m.fillRect(0,0,w,h)
  m.globalCompositeOperation="overlay"
  D(m,oB); D(B,A); D(B,m)//(1-t)a+tb
})
//nt=2 if(nt)T=(T/nt>>0)*nt; if(T!=T0) 其实rate/2 就行
/*
#define v1 float
v1 PI=3.14,TURN;
v1 ply(v1 N,v1 r,vec2 p){v1 d, rg=TURN/N;
// space to -1~1.
p = p *2.-1.;
// Angle and radius, l*cos(NextRg-r)
r += atan(p.x,p.y);
d = cos(round(r/rg)*rg -r)* length(p);
return 1.0-smoothstep(.0,.5,d);//(d<.5?d/.5:0.)
}

vec3 pal(vec3[4]a, v1 t){
return a[0] + a[1]*cos((a[2]*t+a[3])*TURN);
}
vec3 _5=vec3(0.5),_1=vec3(1.);
#define G(a)vec3[](_5,_5,_1,a)
void mainImage(out vec4 bg, vec2 P){TURN=2.*PI;
vec3[] RB=G(vec3(0.0,0.33,0.67)),
BL=G(vec3(.3,.2,.2)),
YE=vec3[](_5,_5,vec3(1.0,1.0,.5),vec3(.8,.9,.1));

P/=iResolution.xy;P.x *= iResolution.x/iResolution.y;
bg=vec4(pal(YE, ply(5.,PI,P)*1.), 1.);//左中
//v1 ir=mod(iTime,7.);bg=vec4(pal(RB, ply(2.+ir,PI-ir,P)*ir), 1.);//左中
}
//let m=(f,a,b)=>t=>t<.5?f(2*t)/2 : 1-f(a-b*x)mpow:k=>t=>m(MF.pow(k),1.4,1.4-(k==2?0: ))  //abs(cos(t*4*DEG))*(.2+t),
(a, xy)=>(e,c1)=>，c1由 que(ao,rev_dur)，后者在f含.dur的队列使用 //aQue就是分配页位置的，所以(e0,onPPT)=>闭包无效

UI:元素树ViewGroup,Form,CSS,SVG,动画
浏览:DOM更改,PJAX,editable,editCmd,walk/observe, 多win
通信:fetch,交互队列,postMessage,WS
数据:编码 XML,File Blob/ArrayBuffer,ImageData,AudioBuffer


ES6出现后有种写法是 function f(){return 1} 到 const f=()=>1 少几个字，函数式和可变性定义混杂，非常别扭，“改进”只在文本上
在我眼里内外函数和“回调”[主函数][脚本]都只是有重复次数的代码片段，函数，一个冠冕堂皇的名字，编写者只想到拆分，考虑到它解决的真实问题和用途位置，它真必要存在吗？重构中它被当作独立个体，无法再外提内联，使人无法再给问题想更合适的API；只看到其签名，忘了整体问题是什么
readXX和writeXX就要写两遍吗？有种编程方法叫关系式，它用一份代码就能定义bytes上的MIPS汇编 编解码器，然而这也不是冷门编程范式专有的，OOP也能轻松同时组合单项的RW定义整体read/write

https://www.javascripture.com/OscillatorNode
https://zhuanlan.zhihu.com/p/66529200
https://blog.csdn.net/weiwei9363/article/details/82858653
https://zhuanlan.zhihu.com/p/92577332 K-S吉他

https://evgenii.com/blog/programming-harmonic-oscillator/
https://www.phpied.com/webaudio-oscillator-in-js/

https://www.russellgood.com/audio-tools/js-synthesizer/
https://tonejs.github.io/docs/14.7.77/FrequencyClass#A4
https://marcgg.com/blog/2016/11/01/javascript-audio/#
MDN have color dots

https://www.music.mcgill.ca/~gary/307/week1/node28.html Western music notation"octave"
f(n)=A4*2^(n-69)/12
n=57+12*(log(f/220)/log2) int n = (int) ( ( 12 * log(f / 220.0) / log(2.0) ) + 57.01 );
https://www.colincrawley.com/midi-note-to-audio-frequency-calculator/ (See IAcom混响?
https://pages.mtu.edu/~suits/notefreqs.html
http://newt.phys.unsw.edu.au/jw/notes.html
https://www.inspiredacoustics.com/en/media/all/6
https://github.com/NFJones/audio-to-midi/blob/master/audio_to_midi/converter.py#L233

https://jpuyy.com/?p=4146 见Archwiki:pcskpr ,pcbeep noise script ^G \a
https://github.com/NaWer/beep

https://forum.mikrotik.com/viewtopic.php?p=861689
DELAY 3000
GUI r
DELAY 250
STRING powershell
DELAY 250
ENTER
DELAY 500
REM Hide the powershell window
STRING Add-Type -Name W -Names C -M '
ENTER
STRING [DllImport("Kernel32.dll")]
ENTER
STRING public static extern IntPtr GetConsoleWindow();
ENTER
STRING [DllImport("user32.dll")]
ENTER
STRING public static extern bool MoveWindow(IntPtr h, int X, int Y, int W, int H);'
ENTER
STRING [C.W]::MoveWindow([C.W]::GetConsoleWindow(),0,0,-1,-1);
ENTER
REM Play the Imperial March //while($true)
STRING [console]::beep(440,500);[console]::beep(440,500);[console]::beep(440,500);[console]::beep(349,350);[console]::beep(523,150);[console]::beep(440,500);[console]::beep(349,350);[console]::beep(523,150);[console]::beep(440,1000);[console]::beep(659,500);[console]::beep(659,500);[console]::beep(659,500);[console]::beep(698,350);[console]::beep(523,150);[console]::beep(415,500);[console]::beep(349,350);[console]::beep(523,150);[console]::beep(440,1000);exit
ENTER
https://www.autoitscript.com/forum/topic/40848-beep-music-mario-bros-theme/ autoIt

https://www.bookstack.cn/read/radareorg-radare2-book/85b66f18f8092829.md

px oo+ r- uw we? wxs
*/
/*srt2mid 的 transfBack read()也需nonlocal t_acc 了，SynthV 更新，.. blank+=track_name lyrics
 * */
