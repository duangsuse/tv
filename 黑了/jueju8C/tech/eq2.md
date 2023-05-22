# EQ API大纲

全局有7项 `el,qs,it,Eqv, CSS,Vec,anim`，而函数按1~3界(界面 传输 语辅)分

界1
- wOSA `wOp({},chk) wSty({},'#css')/反引 wA({},...f)` ，枝框架“大新2化” 大写OSD 刷新 淡化 绘画
  - O `{run(0,{dom:$N}),drop(), acty:$Y}`
  - {tap:ev=>{e,ei,eRel,e0, T},tap2,tap2s_li} {hov:[ptrIn,Out]|=>it.x ,key,tapup,focus:[,blur] ,drag:over~drop,dragit:s~end} {draghov,insel:f full()?,inview:0~1 ,hovE,focusE,IME:oncomposition}, 'over stop/! once meFirst scroll')
  - inview: [IntersectionObserver](https://docs.w3cub.com/dom/intersectionobserver) `[[0~1],e,padout]` ,Vec2
  - `c={tap:$Y}; c.tap.then`
  - S `{color:fg on bg, pad/o, pos:皆可空["absolute",xy,wh-resize监听,$Y含框], anim:{dur},atranDur, Trotate:.5, Fshadow:[x,y,blur],Fhsl_H:NO, GbackdropBg,  _myVar,__mozXX}`. see:elsvg filters
  - pos:ResizeObserver or, see _Die
  - `CSS._.myVar=[0,'<length-%','time',]` !inherits. 支持#+重复：CSSUnitValue解析
  - A `{ v,edit,show:淡化,has/hwrap:el.b|slot[name] ,drag}` faster `getAttrNode` than getV/attr[k]
- qs监听 `qs.css${} .css1${}  e.qs[attr,], qs@mediaK: V, qs@net: wifi|none${c=>c.DL='2~4g',dl}` via:qs.on/atRule.net={v,}, dpi:scr/resize ,ori,acc,oriDiff, docDate
  - e.qs\*[|wtf].txt |>child${}\`=rv. `(e,{mut:"A|T|D", mutA},old)=>{}`
  - `qs.let(fn=wOp).let({id:1}).lets(e=>e+'').join()` qs得1或N项,  `el(tag, ...fe__ee)` 在 `el.get` 可用css或'*'匹配元素/正则
- el组件 `el.tag=wA(), el反引, el.wtf=({propA=1,chk,st:{},url,on})=>el.div() , wtf.flag='for chk'`
  - `ary([], li, ul('...')); when({}, {user:x=>wA 'css.user',post}, o=>o.type); showIf(x.win, notNO=>Gold()) `
  - `at: wOp.at({e?}, ret={tap:1, defl(){} }), Eqv,anim`
  - `btn(txt=> inMenu,)`; `dialog(res=retV, inert=NO|e横中心|body必选)(form).wUI` ariaHasPopup, h/opt/colgroup dt, summary/legend/figcaption  abbr,ruby. rateLim(-1),Eqvfold
    - `ask('q',1); chk('q'); say('toast',danger=0~3); pickColor({stopAt:c.ref})`
    - `contacts({name:1, tel:2, address:$Y,icon:Blob,email})`
    - main article, nav aside, attr(); datetime/M/W,range,color. meter,prog
  - `menus(ss'A B', {on:'hov', erase, n:2} )(el.menu, )`
  - `otp(async(code)=>, -4)(wOp({blur(){this.run(1)}, stopAt:rv }) )` <keygen>
- `el._Lazy={Paint,Rn,pintop,_fread,_fxml }, ._Die=[]`
- el.href\`axios mathjax bs@4.6\` 可npm,importScripts。多行同 `wSty(,'').acty`
  - `wSty.css={M_:'mdui-', use:'M_' /*.own btn*/, cdn,cdn_min:$Y, op:{pintop,.}}`

Node.it

```js
e={
  tail, // ([]同)读添末项/文本如 ins.eR，使用 docFrag..多参append 优化
  pos={L R UP css n:NO|0, look:-1skip onNO(tw,lr)},
  ins={L R e eL eR eHide.css=[pseudo]}, qs, //^ NoteIter/TreeWalk 封装
  animate({Trotate:.5}, 600) |('@keyframes')
}

qs.PWA`你好世界 by You @EQ ##css,js,h5,fullwin##
View world filled with tags&CSS properties!
` .share(title,txt/file/body, url,args?) ,.badge ,.titleArea

PWA.notify={
  main: { vib:[]|NO, canDup:0~2, image,
    act(){},
    //via:SW only
    act: { good(){}, async haveARest(args,ev){ ev.noClose=$Y; clients.openWindow },
      input(txt){}, or:'good', names:{good:"Nice day",input:"?placeholder"} }
  },
  icons: {
    main:'data:', good:''
  },
  via:{showNotification,notificationclick}?
}
qs.Idle={pageShown, wake, idle:rv, prefer:{dark:rvBody, saveData,noAnim}, dt:60,acty}  //@prefers-reduced-motion
  GPS={now:{lon,lat, xyz,T},  acty:$N,run({maxAge,high,timeout}) }
```

- `ST({imgs:["*"]},SW)` 缓存网页资源。`eqjs -x xml,css` 将保留 link 风格 .css 并在body尾注册预载script
- `el.preload(fetch, load, connect__dns)` 可以用多行`\` 填入需要预缓存的素材。load=页面必须(如字体,背景图,懒CSS)，dns=相关站点。`link[as,crossorigin]` 自动据文件后缀。此外 `meta({og:{}, })` 可以优化外链体验

不使用 `e.replaceChildren` 而很适合单列的滤/序,重算

wKbd 支持 aria-KeyShortcuts Ctrl+A 语法。即不要求 accessKey=A 等的Alt修饰

## anim

- `anim(v0,v1, rv|x=>)={dur,  }`
- `anim.at(rv,)={dur}` 启用渐变, iseq
- 两项间无论 `var(--x)`/img都能渐变。`ac=anim.at(rs|'x', {ease,erase, extend:'transform'})(e)` 对 `--属性` 进行补间，

这两种函数都能在UI或图片上使用，
- `ease(A,B)(t=0~1)` 在 A~B 间。`anim.at` 在 `isNaN(ease("","hh")(1.0))` 则对e副本和新e 进行淡化
- `erase(A,B)(t), erase(g,A,B)(t)` 是针对DOM和像素图的淡化(/进退场)。则实现e截图到e1截图 t% 的渐变。CSS 配置 `--erase: fade` ，ease 着重绘

界2
- `qs={H,HI, ST,PM}`
- `CSSUnitV.it({ rateLim(0~3, f), then, rate(f)(),  0s|period(SW,'tag') })` //sw.onsync
- `V(0,0), Vn(2), Va([n,2]); Vec2.in(doc.html.scroll.area, e.xy)`
- `.pMouse(e,tap?)` xy是基于最近 `position:relative` 父级，如e。 修正鼠标ev.offsetX(拖拽抓住的框内点)
- `scroll` 偏移后=clientX,x,left (于,"包围"clientRects) 也有人按 `screen.area` 。offsetParent 默认 body(page)
- `P.z` 鼠标 0则松钮 触摸 Touch.force

Eqv

`cat` 是“到可计算”方向如 parseInt 易失败，`cut` 相反。pipe(a,b) 按a,b cat 序

```js
Eqv(cat,cut=cat):
  oncat(x, fc_async)
  flip, fcat,fcut

pipe(...keq_f) //按cat组合出 含1f? 函数:Eqv. k如'!','num'
way(Y,N)|(v,eq,not)|({v:1, _VK: })
only(p, eq)
pad(+1, 2) //+1,*2
x=noOp

int.v(10,parseInt) .cut=toS
num
json //with Map,Set,BigInt,Err, _at Date
json.v((k,v)=>Eqv, space=NO)
base(k=64) //not win.crypto
p7z('gzip|deflate|brotli').cut(utf|blob) //stream.pipeThrough. see:ndesmic/zip
file(/*input-dropEv.fileBlobs*/to='DataURL|BS|json|',strm=[7z'gz']).cut(s|json|imsvg|data:)
  .dl(el.a |NO) = `<a download>`
  .url.cat(u,e)// objectURL
  .fmt
//cat()._info={path,type:MIME ,size,atime} ; a.srcObject=Blob(['utf8'], ['text/plain']) . see:videojs
//txt,ab: it|Response|worker ReadSync|fread. Blob='bitmaprenderer'
form.cat(?search|&form|e)==kv.ify
replace(t_k,v)
sep(/\s+/|[';','='], fi_eq=Eqv.x, Inf) .cut ,//[...'🚀']
sepIntl('en', wordpara=0~2, {cat:'num|ber', as?:'%|USD|unit', brief:0~3} {'list', as:'|', isWord}) // 带正负,长名,符号,短符
fmt(`M,key:y.*`, {y:int.let({RE:/(\d+)/}) ,M:"mark"})
  camel(cap0=$N,sep='')
  snake('_')
  date('%year y-m-d h:M:s HT') // tick('+|= d',...)
fmt1(`pre_suf`,)

//not DOMP/XMLS
h5(safe=NO|`div p img|!script head ; !hidden; main wrap`), //Sanitizer 2.用*10,/10n计算精密小数  3. Node.nonce传隐私以避免遥测图片
esc={
  url={ //escape()
    full,
    id("xx"),
    short("im", bookmark="origin/%s")
  },
  h5(dot='|xml|svg'),css, RE
  http://www.w3.org/2000/svg
},
iverb, //{row,fwd,i} i=1时 +2=横右 -2=横左 +3=纵下 -3=纵上，±1时i=0。-1 就能换横竖排，负号就镜像  screen.iverb=2

at(rwv_a=c.it.res, a_rv=[.x,.y], fv=noOp|(x,y)=>1 )
at(AB, [A,B], Eqv.of(sep, c.it.sp)) // sp=',' AB='x,y' A=x
listen(c.it.x).onmod=> $Y//删监听
sepObj([/food/, /drink/]|NO, [pipe(`'bad' +`)]|K_Eq)

kv={
  V.cut([]), // onto ._this
  ify(o){get,set,has, valueOf} //Trie: kvPath.cut
},
kvPath('/', (k,v)=>{基于deep})


file.open('r',rw={'text/plain Texts': `txt md`,'video/mp4':rec, avimage:3|$Y,json}, {v, record:'face|cam|win|ID'|g, on:'tap' })
//''rwax  requestFileSystem, showO/S/webkitdirectory/DirectoryPicker
  .wUI // label>input[accept,multiple, drop].write{opacity:0}
  () //custom Texts

//属性更新，则流重造
record:{
  to:'face', //User/Display 右击录制,显于wUI(video)
  area:V(w,h),
  acty, //start/resume pause
  need:(ctrl={audio:1,video:1, mods:canSet }),
  fps:30, dt:2, //chunksz. see canvasfps:0
  bps:[128000,2500000],
  okOnce(), ondataava..
  //tap!=stop Stream. v=ok() filetype Blob
  //kind,label,devId
}
}
```

h5,file.open 支持Node，依赖jsdom-`eqjs` 能以JSDOM/Selenium 的方式缓存生成

JSON 化基于 valueOf/Date.ofValue 。不支持 `DOMPoint(XRVR).toJSON-fromXX` 式接口

- el.draw(/2D[ar]|GL2?/|rvBitmap,eCan) .flush , crop(xy,wh|im).rgba  | (xywh|{},im)createImageBitmap | (e)svg | (rvVa,e) `svg` points/el.draw.dt
- `el.Paint(f named(g,L,{_cssV}){}) (e)` for async 2D, `ary(layersOptimize,canvas)`. `draw` supports HiDP
- `g.penMode` erase=dest-out, bg=dest-over, clip=dest-in,  , see:*-blend

```js
qs.PM({postMessage,onmessage}|'bcast'|onconnect/runtime, {
  f(){}, // queue async. wait echo
  x:1, //set, transfer
  origin:'*' //as content/Win.opener
})

close=PM('/events'|new WebSocket(url), {
  or(dat,ev),
  cmd1(x1){via send(';cmd1[x1]')},
  sse(dat){ dat==json }
  acty, useBlob:$Y //ok,error|close
})

await PM(()=>{  } |[class], {at:Worker|{addModule}, _atK:`Processor Paint`, scope:'/'}) .port

class SW{activate(){},fetch, async install, push({data}),sync({lastChance}),periodsync  }

//pushManager.subscribe({userVis,psk}).endpoint

PM(doc, {
  b: 'bold'
}).b={v:$Y,onmod}

PM(MediaSession, {
  now:{
    playing:$Y,
    t: 30.9, dur: 60, speed:1, //timeupd
    order
  },
  play:[play,pause,seekto ,stop/fwd/back]|e,
  next:[prev/nexttrack,skipad]|a,
  info:{title artist album  artwork:[] src}
  // video::cue/change of TextTrack
})

PM.cfg={ credentials,withCredentials }

Eqv.detect={
  async Text.cat()={ //OCR <map>
    [xy,whr],v,
    boundingBox
  },
  Face(n), QR(fmts=>vr),
  Speech .cat(jsgfCmd, {acty, audio,sound, got, result})
  .cut(rs, {acty, voices:ra, use:{rate,volume,lang, pitch,voice, sep:bound }, next:end/err})
}

Eqv.diff(a,b) => [splice(0,1,'replace[0]'), [2,2,'del[2~3]'], ]
```

see:[Worker-arg](https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects#supported_objects) [richtxt/st](https://docs.w3cub.com/dom/document/execcommand)

- 列入路程： Bluetooth, crypto AES/SHA, TextTrack+vibrate MSE, GL, FFT, Detector polyfill, Gamepads.axes[yxyx], Collide2D
- 需投票： Audio MIDI, RWStream, BgFetch, Crypto, CBOR, WebAuthn, SW `index.add`, navigation, CustomElements/Shadow
- 独立投票： Sensors 光电, ImageTrack(OpenCV), SVG/URLFont, Pinchrotate/swipe, UPnP/2UA投影/Quality, NFC NDEF, Serial/HID/USB, RTC, IDB,Idle/Sched
- 禁用： 冗长淘汰的XSL模板和XHR,+不可取路径的XPath; `THREE aframe` 的AR/VR XRSystem; Pay, MediaKeys/Cap,CSP; SharedWorker/Locks; 10x降速URLPattern

界3
- `const $Y,$N,NO,undef,  noOp,just,say`
  - `just.v(f,arg); say={f:logs, dbg:'d dx'(dir,console)+dif+dm }`
  - `console.logN(n|NO, app.it.lines, {key(ev),xywh, line,ps1:'>'})`, el.href\`` 多行时同wSty(,'css')
- `win=global, doc,  isA,newA,n,rn, ss,heredoc.v(JSON)`
  - `doc.URL+={origin, pathname,search,hash,  target:$N, onback/go:0}`
  - `URL=[s,'title', {}, Eqv.form]` UA=`{env:ss'Chromium 105.0.5195.102 ...', os: ss'Linux x86_64 5.19.6', vnd:[$Y, "iPhon"]}`
  - `newA(n|v0|ag?, async push|i|old=>)`

  - `isA(T,v)` 缩写 obj fn str num bool sym 自 object function string number boolean symbol 补充 isNaN, == undef/Infinity
  - `rn(1,100).cut/cycle,.has,.rand()` rInc

it

```js
it={
  fn,
  time(fRun?), // perf/Date secs
  deep={
    n:Infinity, walk(pre,onKV=对V递归, endFast=noOp,end=已复制)(v),walk2(kvBoth, k2V,,)(a,b)
    eq(a,b),  // a.make(,'io') diff
    dup(v), // structuredClone
    cfg(v,vDefl, keepV=$Y), // a.make
    is(Object,v),
    unify(a,b)
  },
  this_(f,...a), // doc.lets(_=>{ head+body }) //vars(), !eval
  evaly(f),
  unit(fBquote), // unit(CSS=>1`s`)
  FGrp(eachGrp={list:[], _cnt:n }, f_ik=key=x=>x) // async Vec2 avg/window
  Trie,
  Q(iter), // [].dup .Q
  _agen({*f() }) // yield/ret默认带await f由awaiter(p.then,wakeAtYield)睡至有值yield
}

c={x:1, a:[2], f(){}}
c.it={
  x: {v:1,onmod:v=>{} }
  a: {v:[2], it:{onadd,ondel,sort,[0] ,.} },
  keys: ss`x a`
}
say.it(1)(2)==say(1,2)
c.it.f()//bind

c.it()==[1,[2]]; c.it([0])
c.it([0], async()=>666 )
c.it({x:x=>x+1, a:just([3]) })
```

```js
it.fn={
  ref(fUseF), //.v=F 或取 .Y ,.tailrec 后可调用。函数引用
  cache(f,c__f), //同参数只算1次
  wrap(F,fva_v), //logs() 记录参数/结果 的方法
  flip(F), //逆序传参
  args(f),  //args((x,y)=>) == ss`x y`  ){ 或 )=>，默认值不可含箭头/name=
  vars(f) //vars((a,b)=>{a+b.x+doc}) == [`a b`, `doc`]
}
```

Q.it

- 看滤序
  - look(p=$Y), all,any,ones
  - first/last(p=x=>x==$Y) .i,.v ; firsts(p), firstsOut
  - letsFlat, letsLook, sortBy(k__f)
  - shuffle().iter() (n?)
  - `look2((x,i)=>i%2==0)`, .Set
- 带
  - chunk(N, zfill=undef, di=N, f=noOp) / (a=>[1, n(a)/2 >>0])
  - zipNext=chunk(2,NO,1)
  - `b=['x','a'].zip([1,2], noOp)=[['x',1],.]` Array.zip
  - `b.unzip(kv=>kv)=[['x',.], [1,.]]`
  - `['x'].foldZip([1], (o,k,v)=> {o[k]=v}, {}).v`
- 叠
  - `[1,2].fold((a,b)=>a*10+b).v`
  - `b.fold((o,[k,v])=> {o[k]=v}, ret={}).v`
  - `(fo=b.fold((o,[k,v])=>({...o,[k]:v}), {}) ).vLast ,.eachStep`
  - `it.FGrp(fo) (b)`
  - `FGrp([noOp,Math.min,Math.sum], x=>x<2) .got(异步)`
  - Math.avg, .sum

Set.it
- `ands(iter), subs`
- `dup.concat`

`ArrayBuffer.fmt.let({i1:IO, s:'utf8' }) (v)={size,splice,a, apply(ab=new)}`
- i/u 1 2 4 8, f 4 8
- 'i1 i1'
- ['i4', {tag:'i1', data:'i1' }] .splice
- [{0xa:'i4', 0xf:'i8' }, 'i1'] .type
- dynamic resize n(a). see:file

## 枝框架

Only1(e=>rv, sel=[1|Infinity] {n为负则禁滑移,ctrl:$Y则拖选}, vs=[$Y,$N], sameset=parentNode)

- 使用 [ariaSelected](https://www.aditus.io/aria/aria-current/) ariaMS 标注 `[n=1项或多项]`。ary对可多选列支持Rn/拖拽
- `[aria-controls=eID]` 存在则令其ariaAD=sel。不以 hov:[up,down] 而直调=ariaChecked

```js
el.Rn={
  set_now={e0,i0, e,i, sel(|[e0,i0],[e,i]) | (e,[i0,i]|selAll), find(s,'Ijb') }|getRange0,
  focus={ // smooth scroll
    now, inFull, inPic, inSlide, mouse, wake:$N, rotate:'any', unload:$N , root, err(ev){}
  },
  copyNode(mode="|cut|surr|ins",tag?).qs`fromFragImport`  ,
  copy(s?),
  rm(),mvI("move|extend",iverb)|(0|1|[e,i]),isI, //char,word, ^v line,paragraph 
  //isI时也可CtrlCV

  mark(k),
  sysClip(rv, dt=1),
  area={xywh/s, has([e,i]) },
  xy(vec)={ei,e,es} //caretPosition/Range FromPoint
}

Rn={
  set_now={e|[e0,i0,i?],[e,i] } getRange0,
  mvI("move|extend",iDeg),isI,text, //char,word, ^v line,paragraph, ±3=full 
  copy(s?),sysClipTo(rv, dt=1),

  copyNode(mode="|cut|surr|ins",tag?).qs`fromFragImport`  ,
  setHL(k),
  area={xywh/s, has},
  xy(v)={ei, es} //caretPosition,FromPoint
}
```

> mark: `CSS.highlights.set(k, new HL(...rn))` 启用 `::highlight(k){bg: cyan}`

Event(DataTransfer).it
- `datas.plain/*||text*/="", .URL=[e|im|s],json; data={json}/NO`
- `inputV.openD(sub,'rwax')` x删除 r=a不新建
- `ctrlX=dropEffect` NO,N,Y
- `img=canvasCentered`. 支持dragok=支持cutpaste. ary()有默认. enterKeyHint,cursor同类



- `Reload(lo,err,banner=NO)(div(wOp({async reload(p){ p(0,1.0) } })) )` 为整体(或单async/media+img)添加 Chrome 式加载圈/顶条 或下拉banner. ariaBusy
- 基于 `loadstart/end//eddata, abort` 监听。`reload()` 会覆盖 `win.fetch` 以进度/停止
- `rnInc(k,max,unit='%'|MB|GB)` 可作为 progress事件传递，`async="details"` 显示各单位进度条
- `el.sel` 对 `option.dim` 加载完时切换，提供多选缓存/体积/删除 。进度在其 `label[loadk/n,n]` 暴露
- only1 onlyN!

Reload(lo=p?=> 加 载入项.dim>.reload ，据p.v的有无默认转圈或进度顶条

el.sel(rv,vs=[v]|{k:v}|grp, {of:'only1/N', picker:$Y, loadk(vSel),fl})
text search url tel email password

el.sel(rv, {of:[n]|{k:jsonV|e},len:rn, chk:1使用chkbox/radio/num, dropmenu:$Y替换selectemail/date,rn,color }) .popup {stopAt:fn.ref}

sel(x.grp, {sex:ss`boy girl`}) 在fl:!details 时得字典，否得单项

`label[loadk/n, n] select` 会总结 loadstart/end 子项的进度，延时赋rv，提供 `option.dim{管理…}` ，按end的rnInc和tap2s 显示缓存体积/删除/多选
若vs=e，of:css，rv按tap选入队、不截停load事件。

anim.at.rest={
  iverb:-2,
  flys(f,i)=>f(abs(i)-1),
  A:{sort(a)=>shuf, dur(an,a)=>[an.dur/na], dt:.1} // 受插入段
}


## 瓷块相连

1. `v.step` 后以 `grid wh` 除到格座标，对BBox过滤出黑色格，`v.collide(vB)`。`insect:$Y,r:5px` 决定 `d<r 或 d==r`
2. 若新旧 `cols` 都仅1格且未变，不更新 `grid:[n*m个WeakSet w=项宽中位数3倍]`，这格是ROI则grid=它，类型是Ghost则同类块跳过
3. 碰撞ROI(x,y) 则算出i,j 过滤黑色格到 `ROIs`，`onout` 令grid=全局
4. 若区有4项，BFS附近黑格，对外矩加3倍细grid=ROI ，块均2项定期撤销 `qs.Collide2D(va, {, kNN(xy,n__fiv_q) })`

App={
  share(title,body=txt|file, url|notify,args?) ,.badge ,.titleArea
  InView={now, wake, darkMode:`body.1dark2dim`, acty:0后台播放 1切页暂停 1000延时 }
  GPS={now:{lon,lat, xyz,xyR,T},  acty:$N,run({durMax,HQ,timeout}) }
}
on={, saveData,noAnim  }


## 2D碰撞

利用 `V().it/*.x y*/.onmod` 给移动的物体加些逻辑不难。若要真处理两球间、球壁间的碰撞，可把1项和场景里所有其他项比距离，每帧如此，不然穿模。

左右两块区内检测呢？若把场景划为网格，给格座标涂黑涂白，即便物体满屏也OK

1. `v.step` 后先划区，检测区内 `v.collide(vB)`。 区宽=项宽中位数3倍，`[n*m个WeakSet]`
2. 若区有4项，BFS附近激活区域，对外矩形添加3倍细 ROI(x,y) 。所有点移至ROI座标，块均2项的ROI定期撤销
3. `v` 的座标i,j越界n,m 则回全局网格。 step碰过后将新旧点集的差放到网格。  V3=圆 V4=矩形 `qs.Collide2D(va, {r:10px, insect:$N, kNN(xy,n__fiv_q) })`

点集的涂黑基于圆外矩形 每格左上(x,y) 滤出距离函数=(insect则<)r者。 类型为"Ghost"的Vec 不与同类格碰撞

撞到ROI的项对ROI内矩涂黑，只触ROI的项移至其座标

以上，每点有 `grid,rediv(), cols,ROIs`


老游戏经常被诟病“穿模”，是因为程序员数学差吗？因为CPU算力有限。 其实，[碰撞检测](learnopengl-cn.github.io)是任何键鼠图形里，情况繁多的必备算法，有网格相邻、k-D树、八叉树等点聚类思路。

它在每帧绘制(“穿模”)前，都确保玩家死亡等脚本受调用。这里只讨论 `V(x,y)` 下圆点/矩形的碰撞，有个必要步骤：获取最近邻。要一点和所有其它试遍，找最近，很慢！

四叉树quadtree 思路像二分查找(EQ `a.sort=;a.first(5)`)，按区划分点直到只存1点，然后从3个邻块/父级 找聚集多的先比距离。EQ 有 `Vec.it.onmod` 加成，无需每帧重造此结构。`[abcd,up,v4].rediv(v)` 重划分即可保证结果准确

区块是在区内选1点，建立的4个象限，EQ会针对y,x轴找 `qs.Collide2D([V(x,y), ondel], {split:中位数, leaf:3/*项同区*/ })`

在 `v.nearN(1)` 邻点再判后，两体碰撞只执行1次 `v.collide({vB})` ，所以比如有人/怪物，把所有判定逻辑写在“人”上。否则你就得自己定好 `vB.f(v)=v.f(vB)`

当然，找子集碰撞的也是 `rediv(禁用原块)` 。另外划分必须是中位数，不然无法保证同格内=距离最近

>JS也有p5,[Physjs](http://wellcaffeinated.net/PhysicsJS/) 和[Matter](https://brm.io/matter-js) 关键词:broadphase


EQ分三界：界面、传输、语巧，'Eqv可同' 'Query查询' 二字则每界都有一部分

1. 九宫格;OSDARR.  Only1,Slide, D data blob浮标链表, anim EAE, Reload(), Rn
2. HISTPM. H http, HI pjax, ST storage, PM postMessage/App
3. itFPVec. fn deep Trie unit(CSS,_=>{}), FGrp eachStep, CSS draw Paint(svgFilt), Vec2~N

九宫格:
- HTML 由 `<标签名>`+...三要素 及其(文本)children 组成的UI树，如 `p span.time, p b` 选中文段里“时间,或粗体”片段
- ```js
  el.let(_=>{ //EQ 不规定“mount”。这些“JSX”可被编译缓存
    doc.body.tail=[p(span(wSty`time`, "8:00"), b("Bold")),
      el`p span.time+b`
    ]//^ 支持emmet.io
    el.Timed=({t="", s=""})=>p(span[`.time`](t), b(s))
    el.get((s)=>(el.Timed(out={s})(doc.body) ,s)) //Bold
    out.t//8:00. `p`可以既存! SSR,爬虫,用户脚本 便利
  })
  ```
- wOSA `wOp(c={tap单击,tap2s右键},'stop! only') c.acty启用; wSty({font},'#css'); wA({label,edit,show},'aria-')`
- 说选问 `say(); sel(); ask()`
- see/s If `see([1,2], x=>li("Food",x)); seeIf(user.vip, v=>'等级'+v.level, '可开通'); sees({type:user,..}, {user:x=>"是用户", else:i("请更新客户端")})`

观念要改。打印变量请 `alert(("a"+1).let(say) )` 或以 `says(alert)("a"+1)` 直接截获看函数/对象的参数与返回。 `d=$0, db={table:1}` 则详细显示 `d('dir',console); dif=isBreak_; dm('',/char/)`，靠 `say.dbg` 启用

`f={}.it(keys?)` 则 `rows=f(); f(rows)` 令对象为sql行。也有 `.it(key_swap, k__f)`

EAE 通过 `anim._atMod(rv,f?)` 提供 `o[k]` 的渐变，需要 `div(anim.at(rv,), wSty({ease:'ball, k1 linear',erase:'arc', pos:[,rv]}))`。

若配置了 `--an-exit: fade a1` 则remove()时淡退，append时erase并动画；且皆对childList右侧,block/grid 时逐个接替，否则 translateX/Y 同距离

Va 通过能 movR,ins 的浮标链表，创建或绑定F64Array等ArrayBuffer ，以 -16 表示Vec2


