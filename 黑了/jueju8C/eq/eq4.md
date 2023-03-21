EQ的函数、Eqv与Q 按1~3界(界面 传输 转变)分类

EQ的都是由浅入深，但步步为易的。界1 从轮播图讲到EAE，从saywhat、wOSA/get、单多项绑定到单多选sel与列表的等价、拖拽与粘贴的兼容，已是涵盖移动、桌面非专业软件的所有UI/UX 及爬虫

界2 从ST-cookie和Eqv引出跨页所必须的 qs.PM、App.notify、D.form、file/record、otp登录 等UE体验，却又走向H-API绑定，或单页HI 历史栈&截满fetch()离线[Service]Worker

# el,qs,CSS

wOSA元件

el={
  get()
  C={
    css={use, M_:"mdui-" }
    tr={
      use,en: {,"!显标签/fdset"}
    }
    credentials,withCredentials
  }
  btn,
  menus
}

wSty({pos:["absolute",P:Tpos/turn/scale ,V(wid,wid)?] })

wA({h/haswrap:el.b|slot})


wOp{tap:f, tapup:f2} 之类参数:
1. f可为 tap(ev){做脚本} 或 ''
2. f2另可为 (ev)=>ref 或 [f,f]
3. ref只使用{set v(_0or1){} }。在EQ需要 wtf=>x 的地方，可以只提供x。
4. el.shows 在 wOp({drag:''})(e0) 时允许(Tab)拖拽，即便仍需dragit确认被拖项; wSty{pos:[]} 有drag则默认move=up(null),up=Edit.newUndo ，类似[Vec2.pMouse]

任何时候按^B 将焦点保留到剪贴板(开始拖拽)、回车drop、恢复剪贴与焦点

el.sel(rv,vs=[v]|{k:jsonV}|egrp |rn|Date/tdmw|RE, {of:'many|color'|ss`tel`,menu:$Y, chk:1使用chkbox/radio/num, picker:1, len:rn, loadk(vSel)})

el.say('toast',danger=0~3alert)
await it.res(rv=>
what(rv, inert=NO|body|e横中)
- (form/menu)
- .yesNo(非异步) text('age?',18)
- otp(async(code)=>, -4位长, {stopAt:fn.ref})


form(el.what(rv, inert=NO|body非异步|e横中), ariaHasPopup); 取rv弹窗。异步rv.onmod
  - text('age?',18), yesNo(); say('toast',danger=0~3alert)
  - `contacts({name:1, tel:2, address:$Y,icon:Blob,email})`
  - `otp(async(code)=>, -4)(wOp({blur(){this.run(1)}, stopAt:rv }) )` <keygen>

EAE擦拭与弹性

OSDARR群星

这是界1剩下最后的工具。除anim，这些小框架皆属el

Only1

Slide

幻灯轮播、滚动导航、标签页、右滑/下拉

Slide({i:1.0/snap, l:1=100%firstchild,step:l,  dot(i){chk:1 indicator}, corner?:ev=>ev.x<10, erase:((A=prev,B=next)=>t=>{animAt;aFillMode:both}) | t=>aTimeline })(e)

.pintop  scroll-margin

anim.at(wSty或wA或it.属性, {ease, 或加erase:'fade'})

fly,fade(deg,'linear')  ripple(P)
flys(iv,{opacity:0 前项=>mask有色度,渐透})
cube(f) bars([deg,big,P]?,inn=1 fade)
chess cloud


- anim.at(it.show|'font Fblur', {ease:'cos inout',erase, on(y0,y1){/*add :hover{--c:new,animation:js} OR wSty() only*/ this.let({ease:y1>y0?Up:Drop})},dur })(e)
  - ease: in out inout infast alternate cubic-bezier(impl:dur*fps LUT)
  - erase: fly() /mask fade 1.0(sharpness)
  - erase-dt: -1s后项出, .5倍速; -smooth: 0|100 保留256|2位小数
- anim(v0,v1, fx,dur='1').rep(1) /{dur,t0,fps:10/1s for steps(10) ,ease, rep(n,ok,stopr), call(t)}
- anim(t0,Infinity, fdt)
- anim(e|it,'@kf cls'|{opacity:[0], of:'IDanimation: css'}, ) {t,speed/0,rep(1,'forwards++'/composite/iter), done,captureCSS(dom=1)}


`el.draw(of:/2Da?|GL2?/ |rvBitmap, eCan)`
- flush/dpi 垫片; `draw.sq=Xrect l l x y; .sty.X='red fill'; draw(P,'Fsq', at=g)` 简写
- `imgs[0](g,P)`. pass by `canvas{--_imgs:; list-style-image}`
- penMode=erase,clip,bg, HSL //or clip()-path, CSS:shapes; !bg=src-over
- crop(xy,wh|im).rgba Va(4)

`Paint(f id(g,L,{_cssV}, arg1){}) (e绘背, k='background')`
- `g.imgs=[截图]`，对 `--F: id(A|transf) id1()` 于canvas。`=[bg,e0片图]` 对 `--G` 于paint()
- ```js

//SVG now supports CSS transition, --_points
Paint.fe
```

重载
- (xywh{},e)Bitmap|SVG截图
- (svg,dt=1/100) Va(2)逐点
- (e, op=((A,B)=>xywh )=>esSingleChar) 逐字//CSS.highlights.set(::(k),rns)

### .efade 擦拭可用 `cross-fade(A,B,t)` 渐半透实现？

Web只有256阶:8位透明度。擦拭速度图似 `linear-grad(90deg,red,#0000)` 式均匀渐淡，那么初态就显示50%！若令半透占99% `(90deg,red,%1,)` ，__初态越透明，渐变就越扁平没梯度__

以SVG滤镜 `RGBA=> A>(t%)256? 1:0` 使渐变锐利，再 `(d*(A+(t%)256) >>0)/d` 按d舍入 d=1锐利。等同 [toy:](shadertoy.com/new)

```glsl
vec2 P = fragCoord/iResolution.xy, pv=-iMouse.xy/iResolution.xy;
float t=pv.x, d=pv.y*400.;
vec3 col = vec3(floor(d*(P.x+t))/d);
```

D.table

.cluster

App={
  share,
  badge,
  notify,
  Inview={now, wake, acty:0后台播放 1切页暂停 1000延时 },
  GPS={now, axis:'lonlat|xyz|xyR',T, acty:$N,run({durMax,HQ,timeout}) }
  Screen={dpi
    darkMode:`body.1dark2dim覆盖`,
    iverb:2 含{i,row,fwd} i=1时：+2=横右 -2=横左 +3=纵下 -3=纵上，±1时i=0。-1 换横竖，负号镜像
    area,WH,
    noAnim,saveData
  }
}

file={
  open('|r|wax', rv, {plain, 'text/plain Texts': `txt md`, avimage:'空默认', REC:'face|cam|win'|g|ID, on:'tap' }) ()
  .wUI // label>input[accept,multiple, drop].write

  devRECs()==[I,Osink]//label,ID,kind

record:{
  to:'face', //User/Display 右击录制,显于wUI(video)
  acty, // pause, 或者刷新ondataava, ok() 后=1重启录制
  area:V(w,h),
  need:(ctrl={audio:1,video:1, mods:canSet }),
  fps:30, dt:2, //chunksz. see canvasfps:0
  bps:[128000,2500000],
  cfg:{}

//

anim Paint draw

perlin, checker

Reload

Rn

# anim Vec

HISTPM

PM('ws:'|'crossWin')

PM(URL.at('events'), {reload(v){hash='#i++:v'}, notify({title,sub,icon}) })

# it Eqv

- `const $Y,$N,NO,undef,  noOp,just,say`
  - `just.v(f,arg); say={f:logs, dbg:'d dx'(dir,console)+dif+dm }` /logN
- `win=global, doc,  isA(T,v),newA,n,rn, ss,heredoc.v(JSON)`
  - `newA(n|v0|ag?, async push|i|old=>)`
  - `rn(1,100).cut/cycle,.has,.rand()` /rnInc(0.5,233,'%') indeterminate  .future
  - `doc.URL+={origin, pathname,search,hash,  target:$N, onback/go:0}`
  - `URL=[s,'title', {}, Eqv.form]` UA=`{env[], os, vnd:[$Y, "iPhone"]}`

atRule.net={v,}, docDate, acc,ori,oriYUp

Eqv={
  chk(flags='A B'),
  iverb
  AI={
    face(g).cat({sureAt, n})=>[{xywhR,bbox, emoji, human={age,male} }],
    speech={
      cat({txt,sound, audio,acty, jsgf,cmd})
      cut({now, acty, use:{rate,VOL,PIT,voice,lang, sep:bound }, voices, _next(enderr){now=NO}  })
    },
    QR(g).cat({enc})=>[{xywhR, txt} ],
    OCR(g).cat
  }
}

Eqv.at(rv|, [rvs], fvs_v)
(rv, [v], Fold)  (rv, [cats], sepObj())



EQ之Q即列表处理：看滤序带叠。只有let/s 不在[].Q上，以混写x/[x]遍历

- 接受“条件p”亦接受 单项值,{k:p},[p1,p2],undef x=>!!x
- 支持异步和无尽iter(称Seq)、二分bisect
- fill,splice,copyWithin,push等在Q.a可用
- interl(123,45)=14253; uniqJ(12231)=1231; pad(2,'?') 易实现。在辞海里找轮子 比造轮子要命！

## 看

- let 调用于每项, lets 收集结果
- `a.at(rn(i0,i1)).dup` 3变量暴露。dup于a --lets,sort,zip 会即地改写a
- rn(1,100).cut/cycle(age), .has(1e2), .rand()
- lookLets(p,f) .letsFlat(f)

生成1行 newA(N,async_i=>) |(push=>) ，取1列 ({*g() {yield}}).first |("", v=>v+1)

## 滤

- look Not
- [a,b]=look2 得试验a真b假
- first/last (p).v/i 得位置针 (N)得数组
- firsts/lasts Out() 仅留或截掉(N)头尾。last,sorts不适于流
- "ABC".zip("YNY").look({1:"Y"})

## 序

- sortBy(x=>[x.asc, -x.dsc]) 先升后降
- sortRev 序逆
- sortRand 洗牌
- Xorder(N=2) 2项排列
- a.X(a) 2项组合。编号固定
- repeat, repEat(N分裂)

## 带

- zip(a,b, f=(a,i)=>a, zfill) 带this的2列联合
- [a,b]=zipOut(x=>[,]) 2列拆出. sepCol().cat
- zipNext=chunk(2,f,1)
- chunk(N=2, f, di=N, zfill=NO) 2项1窗 跳2项。奇数 尾填NO
- chunkAt(a=>[1, .5*n(a) >>0]) 中切3分, 首1项
- flat(N)

## 叠

- [].fold(Math.max) 正反都行
- [].fold(1,(a,b)=>a*b) .v/eachStep(+1).v 最低0项
- 单参fold(Grp({basic:n/[]/",", math:minmax avgsum } , x=>"正负"[x<0] ))
- all,any, allNum
- .Set ands subs concat, .Seq


- URL:{origin, pathname,search,hash,  target:$N, onback,go:0}
- URL=[u,{}, 'title', Eqv.form]
- UA=`{env:[ss'Chromium 105'], os: ss'Linux x86 5.1', vnd:[$Y, "iPhon"]}`

Blob.fmt
- DataView读写 i/u 1 2 4 8, f4 8, utf
- '1 1' 得[俩数]
- ['u4', {x:1,y:1}] .splice; 右有链表,增删偏移,buf动态grow
- [{0x1:点, 0xf:四方 }, 'u1'?] .tag=0x1
- [1, Eqv.chk] 位旗

```
$Y,$N,NO,undef,  noOp,just,n=len, isA 缩写 .obj(x) fn str num bool sym

just.v(f,)=f(); say={f:logs, dbg} 'd dx'(dir,console)+dif+dm

win=global, doc, heredoc.v(JSON),ss``
//heredoc trim再拼接${}，ss 内插,split再flat
heredoc.v(s=>[s], a=>a.lets(x=>x.substr?x.split(' '):x) ).flat()
```

T(a, _90deg=1),
dot(...sum),
