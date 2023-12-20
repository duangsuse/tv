function useSV() { T=SV.T
useSV={
  "author" : "duangsuse",
  "versionNumber" : 1
}
uscript={//supports look() ing paramGender,dF0Left,.
  kept:['',"pitch,lyrics",'pipe.send(a[0][0]);setTimeout(500,pipe.send.bind(null, 0))','', 'true|| x.lyrics==this'],
  setLyric:['pipe.send("kbd!")',"lyrics",function(a){
    pipe.send(a.join(a.every(F('x','n(x)==1'))?'':' ').replace(/,/,",\n"))
  },F('s', '(SP.play(),s.split(/\s/.test(a)? /\s+/ : "")) '), '! /br|-/.test(x.lyrics)' ],
  livePreview:['aLock.loop()',"duration,onset,lyrics,dF0Left,dur", 'SP.play()'],

  setPlayhead:[function(aLock) { loop=[just('AltT'),] //or [0]
    SP.nowAt(aLock[0]); if(n(loop))aLock.loop();SP.play()
    if(loop[0])SP.onchange=F('st,f','if(st=="loop"&&!(f=loop.shift())||f()){SP.pause();return true}')
  },""],
  addPoint0s:[function() { fade=0.0;
  },"duration", "a.forEach(selectParams)"],
  whatChanged:['',"ALL",
  function(a,ks,_,X,s){ X=X||a[0];s=s||"";
    X? (s+=ks.filter(function(k,i) {return a[0][i]!=X[i] })+',', X=a[0]) : prompt("Of",s)  }],
  makeDict:['',"", 'SP.pause(); badNote=a[0];goodLyric=a[0].lyric', function(s,_,kv) { kv=kv||[];
    ('!'==s)? kv.push({w:goodLyric,p:badNote.phoneme}) :
    ('OK'==s)? prompt("dicts/lang-xxx/add.json",JSON.stringify(kv)) : badNote.lyric=s;
    SP.nowAt(badNote); SP.play()
  }],
  split1toN:[]
}
/**
 * 格式: [选区已聚焦, 将监听属性, 当变更,当从剪贴板加载, 区内条件]
 * (手势:框选,播放) 聚焦选区后只监听音符，不关注选区改变
 * SP.onchange 提供 play,pause, stop,loop 4种状态
 * SV.asks({title,ui, presets:{of},message,undo}, f) 提供结果预览和"kept"默认值功能
 * 
 1. 选区填词到剪贴板，并从剪贴板加载(数量不足留旧,有空格按空格 否则按字切分)
 2. 变更时播放选区
 3. 框选播放，或者在loop中执行脚本多次
 4. 为选区音符创建锚点，并不断同步选择参数
 5. 将首项 note[k] 变动之k记录到文本框，选区清零时弹出
 6. 若有选区，暂停播放记住首词。不断从剪贴板加载并播放，直到 "!" 时记录。"OK"时弹出所有 原词=新音素
 */

function tswap(g,A,B) {swapK('pitch',g[A],g[B]);swapK('lyrics',g[A],g[B])}

SV.App=function() {
  var g,gi,gt, dur=SV.QUARTER,gtS,gR//ight
  if(gR=SE.selectedGroups[0]) { askFinish(T.doRec)
    gt=SP.at=Math.min(SP.at, gtS=SP.nowAt(gR.timeOffset)) // BAD: no SE.jsNotes jsGroups so no SE.orAll
    g=SV.aNew.Grp(gR.target) //.slice().let(F('x','ax=x'))
    pipe.send(JSON.stringify([-1].concat(g.map(F('x', 'x.pitch')) ))); pipe.onmsg=REC
  } else if(!(g=SE.selectedNotes)[0]) { askFinish(T.doPit)
    g=SV.aNew.Grp("Pit")
    pipe.send("kbd!"); pipe.onmsg=function(y) {
      (y!='D')?
      isNaN(y)||y<12?0: g.add({pitch:y, onset:dur*n(g), duration:dur, lyrics:"la"}) : g.pop()
    }
  } else {
    Tv=F('k,v', '{name:k,default:v, type:"TextBox",label:cap(k)}')
    var ask=SV.asks({title: "find/watch/copy Notes", ui:[
      ["just A Find","a"],
      ["or a Timer",.3, 0,5],
      ["use Spacebar Sel"],
      ["of"],["doJS"],["loadCtrlC"],
      ["howToFind"]
    ],message:T.advFind, presets:{of:uscript, at:4, fillFrom:2}
    }),k,f
    // if(!ask.status)return;
    //type:"Slider", format:"%.2fs", minValue:a[2], maxValue:a[3]
    ask=ask.answers
    if(k=ask.justAFind) {
      f=F('x',ask.howToFind).bind(k)
    } else {
      setInterval(look.bind(0,
        k=ask.of.split(","),f=Function('a',ask.doJS)), ask.oraTimer*1000)
      askFinish()
      uload=Function('s',loadCtrlC)
      pipe.onmsg=load
    }
  }

  function REC(y, i) {
    y.startsWith("[[")? JSON.parse(y) //.forEach(function(t,x){(x=g[gi++]&&0)?x.setTimeRange(gtA(t[0]),Math.max(1e7,gtA(t[1])-gtA(t[0])) ) :re() }) :
      .slice(0,-1).letRight(function(t,i){g[i]={onset:gtA(t[0]),duration:gtA(t[1])-gtA(t[0]) } })&&re() : // BUG: onset-ordered vs. change onset
    (y=='D')? re(1) :
    (y==-1|y=='p')? (re(y!='p'),SP.play()) :
    (i="[]{}".indexOf(y))!=-1? (function move(up,k,d) { up=[-1,+1],k=kWave, d=(i>=2? (i-=2, up[i]*6) : up[i]) *
        (/^(dur|[ot])/.test(k)?SV.QUARTER/6/6: /^d/.test(k)?.3  :1)
      if('sel'==k){return}
      if('scale'==k){return}
      //"我爱你,你爱我"=>"你爱我,我爱你" <3
      !/^(lyr|phon|self)/.test(k)? ("tGrp"==k? (gR.timeOffset+=d) : g.forEach(function(x) {x[k]+=d}) ): // BAD: self-impl reverse()
      tshift(F('a',d<0? 'a.slice(1).concat([a[0]])':'a.reverse()'), k).forEach(function(xR,i) { "self"!=k?(g[i][k]=xR): i<(d>0?n(g)/2 :1)?0: tswap(g,parseInt(xR),i) })
    })() : 
    /^;r/.test(y)? pipe.send(Duktape.enc('jx',Function('','try{'+y+';return r}catch(ex){return "!"+dukErr(ex)}')() )) : uload(y)
  }
  function re(q) {SP.stop();SP.seek(gt); gi=0; if(q)g.lets(just({duration:1e7})) }
  function gtA(t) {return SP.now((t- (gtS-gt)*1000)/1000) }
  kWave="lyrics"
  tshift=function(f,k, grp,a) { a=g.map(function(x,i) {return "self"==k?i+x.lyrics : x[k]}).join(' ')
    grp=/,/.test(a); a=a.split(grp?',':' '); if(grp)a=a.map(F('s','s.trim()+","'))
    return f(a).join(' ').replace(/,$/,"").split(' ')
  }

  var a0=[], uload=just()
  function look(kw,f, a) {
    a=SE.selectedNotes.map(function getAll(x) {return kw.
      map(function(k) { return x[k]||x.attributes[k] }).let({note:just(x)}) // BAD: not for "[]"-keys
    })
    if(a.some(function(x,i,x0, k) { x0=a0[i]
      if(!x0)return true
      for(k in x){if(x[k]!=x0[k])return true}
    })) f(a0=a)
  }
  function load(a, x0) {
    try{a=firstOK(a,uscript)||JSON.parse(a)}catch(e){return}
    if(n(a)!=n(g))return
    g.forEach(function(x,i) { x0=a[i]
      k.forEach(function setAll(K,i,v) { v=x0[i]
        (K in x)? (x[K]=v) : (x.attributes=({}).lets(function(c){c[K]=v}) ) 
      })
    })
  }
}

function askFinish(s) {crossWin(100, [SV.getHostClipboard,SV.setHostClipboard]);s&&SV.showMessageBoxAsync(T.hintKbd, s,function(){if(kWave!='dbg')SV.finish()})}
setInterval=function(f,dt) {
  SV.setTimeout(0,function re() {SV.setTimeout(dt,re);f()})
}

T.now={
'zh-cn':{
  name:"Hachi扒谱",
  doPit:"左键试听音高，右键/1~9 添加\n 稍后选中Pit组和走带位置，再次运行以录制节拍",
  doRec:"！先点击网页空白区更新乐谱！\n 按 S切音/A休止符。 \n\n按P预览（结果可能有少许整体延迟,按[]微调）\n注意，切音勿早于音符组。音符组可重叠",
  hintKbd:"请使用键盘 8kbd.htm",
  advFind:"以给定筛选已选音符(尾缀'/'以选择相同of)，或持续监听选区及其内音符变更。在脚本菜单取消"
},
'ja-jp':{
  name:"Hachi 耳Copy",
  doPit:"左クリックで音程を試聴し、右クリックで/1~9をadd \n 後にPitと再生位置を選択し、再度実行するとビートが録音されます。",
  doRec:"！スコアを更新するために、ページの空白部分を最初にクリックします！\n\n Sマーク/Aレストを押す。 \nPボタンで再生\nなお、グループれよりも早くSを押してはいけません。グループは重なることがある",
  hintKbd:"8kbd.htmを開く",
  advFind:"選択された音符を指定されたフィルターで絞り込む、または選択部分とその中の音符の変化を連続的に聴く。脚本メニューから取消"
},
'en-us':{
  name:"Hachi Earcopy",
  doPit:"mouse Left: test pitch, Right/1~9: add\n when finished, select Group Pit, set playhead. rerun to record",
  doRec:"！click on blank area to reload the notes！\n S split/A rest \n\nP preview([] time shift)\nNOTE: don't press S before notegroup onset. try make them overlap.",
  hintKbd:"Open 8kbd.htm",
  advFind:"Filter selection, or set clipboard when select(ed) changes. Cancel in menu"
}
}

}//SV


function crossWin(dt,IO) { var m0,s0, qs
  pipe={
    send:function(s) { s=s+""; IO[1] ((s!=s0)?(qs=0,s0=s):  (qs^=1)?' '+s:s) }
  }
  if(dt)setInterval(function(s) { s=IO[0]();
    if(s!=m0){m0=s; pipe.onmsg(s[0]!=' '?s: s.substr(1) )}
  }, dt)

  keyRec=function(k, stop,anew, or, st/*arted*/) {
    reRec=function(){ line=[],pi=0,st=0}
    pipe.onmsg=function(ev,t){ t=performance.now();
      (ev==k[0])? (stop(t),st=0) :
      (ev==k[1])? (st?stop(t):0,st=1, anew(t,pits[pi++])) :  or(ev)
    }
  }
}

function Gossip(Any) { Any=Object.prototype
F=function(arg,js) {return Function(arg,'var o=this;return '+js)}
isA=F('T,v','typeof v==T')
just=F('v','function(){return v}')
cap=F('s','s? s[0].toUpperCase()+s.substr(1) :s')
LazyAry=function(len,at,add,ad) { return new Proxy([], { // BAD: actually C++obj not cached. BUG: typeof i??
  get:function(o,i) {return('length'!=i)? isA('function',o[i])?o[i]: (o=at(+i>=0?+i:i),null!=o?gsp(o):o) : len()}, 
  set:function(o,i,v,_) {isNaN(i)?('length'!=i?o[i]=v:0): (undefined===v)?_[i].drop() : i==n(_)?add(ad().let(v)._):_[i].let(v); return true}})
}
gsp=function(o) { return new Proxy(o, {
  get:function(o,k,_) {var v=o[k],f
    if(o.getParent&&v&&v.__method_ptr__)return v.bind(o);else if(k=="_")return o;
    if(undefined===v&&isNaN(k))v=
      (f=o["get"+cap(k)])? f.call(o) :(k=k.slice(0,-1), // use typeOf.proto , def /get.*/ = function{below}
      (f=o["getSelected"+k+"s"])? f.call(o).let({set:F('p', 'o.forEach(function(x){(p(x)?SE.select'+k+':SE.unselect'+k+') (x._)}), o') }) :
      (f=o["getNum"+("Group"==k?(k="GroupReference","Groups") :"NoteGroup"==k?
       k+"sInLibrary" : k+"s")])? LazyAry(f.bind(o),(f=3, _["get"+k]),_["add"+k], SV.aNew.bind(0,"G"==k[0]?"Note"+k:k)) :v)
    return f!=3&&isA('object',v)? gsp(v) :v
  },
  set:function(o,k,v) {var k, f,fw, q=!(k in o)&&isNaN(k)
    if(q&&(f=o["set"+cap(k)])) f.call(o,v); else 
    if(q&&k[0]=='_') { if(!isA('function',f=v))fw=v[0],f=v[1]
      Object.defineProperty(o,k.slice(1), {get:function(){return f?f(o[k]):o[k]}, set:function(v){o[k]=fw?fw.call(o,v):v} });
    } else
    o[k]=v;  return true
  } })
}

n=F('a','a.length')
ss=F('s','s.split(" ")')
Any.let=F('f', 'isA("function",f)? (f(o),o) : Object.assign(o,f)')
Any.let({
  lets:F('f', 'f(o)')
})
Array.prototype.let({
  pop:F('r','n(o)?(r=o.at(-1), o[n(o)-1]=undefined,o.length-=1,r) :r'),
  add:F('x','o[o.length++]=x, o.at(-1)'),
  at:F('i','i<0? o[n(o)+i]:o[i]'),
  lets:function(f,i){var a=this,N; for(i=i||0; i<(N=a.length);(N==a.length)?i++ :0)a[i]=f(a[i],i) ;return a},
  letRight:function(f,i){var a=this;for(i=i||a.length;i-->0;f(a[i],i));return a},
  zip:F('b, f,k', 'f=f||Array,k=k||"map", o[k].call(o, function(x,i){return f(x,b[i])})')
})

if(this.SV) {
  Any.let({
    drop:function() { var o=this,O=o.getParent();O["remove"+svTypeOf(o)].call(O,o.getIndexInParent()) }
  })
  svTypeOf=F('x', 'x.getPitch?"Note": x.addNote?"NoteGroup": x.getNumGroups?"Track":"GroupReference"')
  dukErr=function(ex) {return (ex.stack||ex+"").replace(/(\n.*at .* internal)|preventsyield|compile:1/g,"")} // BAD: uncaught errs
}
doc=this.document
} // Don't be too Java

if(this.SV) { Gossip();
(SV.aNew=F('k','gsp(SV.create(k))') // WAIT: SE.Grps[0]==Notes, alert()
).Grp=function(g,at,t) {
  g=g.addNote?g: (at='',s5p.NoteGroups.add({name:g}));
  if(null!=at) t=(''==at? SEd.currentTrack:s5p.Tracks[at]).Groups.add({target:g._, timeOffset:t||SP.now()})
  return g.Notes.let({ref:t, param:g.getParameter})
}

//BUG: SV crashes getClipboard() when showing non-Async msgbox
//ss("prompt alert confirm").zip(ss("Input Message OkCancel"))

gsp(SV)._App=[function(f) {
  main=function() {
    SVjs=gsp(SV); SEd=SVjs.mainEditor;SEtop=SVjs.arrangement
    s5p=SVjs.project;SE=SEd.selection; (SP=SVjs.playback).let({
      now:F('T','s5p.timeAxis.getBlickFromSeconds(T||o.at)'),
      nowAt:F('t', 'o.at=s5p.timeAxis.getSecondsFromBlick(isA("number",t)? t : t.onset)'),
      _at:[F('T','SP.seek(T)'), F('','SP.playhead')]
    }); f()
  }
}];

gsp(SV.T={})._now=[function(ts) {
  this.let(ts[SV.getHostInfo().languageCode]||ts['en-us'])
}]

swapK=function(k,A,B) {var a=A[k];A[k]=B[k];B[k]=a}

useSV(); useSV.name=SV.T.name; getClientInfo=just(useSV);
}
