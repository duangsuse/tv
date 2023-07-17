Hachiko
 PM/keyRec _y()=`#y -1start`
 webMIDI aplay(if pi==0)
 eqNote
 url/ctxMenu mkTree
- webSV
  fullscr, juce_* inputs
  drop, moveTo({dict.txt:}) hook forKV
  cacheAll tamper(workerjs)
  web+s5p:?m&bgm&bpm=120&l=zh&v=masaki `PM(svWin, { load(fp.mp3) })`
- API
  fetch(.mp3/mid) File
  dl(u,"dragToSV/?", show?) tamper
  watchCtrlC PM{else:objOr#wtf}
- vocDB
  xfade/st0~2
  onhov(,.item, onVdb,kv)
  URL.add autoplay
  on_cd reList
- _8
  gsp(o).jspath/BindAry,_prop, svTypeOf
  SP.onmod; async(func(wait){})(onOk)
  SV.ask({ui,presets}, f) uscript
- extra
  kbdTouch
  Icon4LinuxSV
  F12 4jsDev
Bark
 demucs(u,'ts,as,sp,f0')  may ',,drum/all mdx_extra_q 10,H0 keums'
   [demix]: sp(u ytdl you-get as)? as
   s5p: sp,f0? eq_nPit, vtt? zipKNN(1)
   vtt: Intl.split(lrc granularity:"word") feedCuts(16k1ch,lrc.times,(wav,txt)=>vosk lang:ts) punc
   mid,f0: f0(float32 every 10ms. 50~550), fs(wav2png,png2mid)
   ASR: ts=?,, sp=live/2
 ocr(u|mp4|pdf,
  png2x='4,realesrgan-x4plus|rmback' |face('[23]D'|'2face,id'|'2hdr') by u2net,f2f,PULSE
  'zh tesseract,need=box pdf,crop=ask #66ccff d=+48,pptReco=1s') {ok:txt/vtt/docx  URL(twistd cache/ ACAO=*), box:areaXywhri/vidPng}
 //↓ Paddle only 
 ttv('语音','zh') {wav, vtt,f0}
 punc('不打标点')
 atag(u,'panns_cnn14,topk=20')
 ahash(u, 'spkID or RESET') f32[187]; vtt+='|1stDiff,top5'


1. "Tap to REC" L开始录制 R链接/拖放打开
2. L完成m.demucs(buf) R刷新
3. ba.wavs.push(w)，首项 ids,#secs ^滚轮

^数字键将加载 soloset, 0为全部静音.muted/开启
右击w将其上移上叠.mixed，w0其底轨分离
^9 控制SVG内spline[hidden]。var(t0) 的光标点拖更新
^S 保存,Shift以当前solo打开webSV. AltS 1波形/2频谱/3CQT 0速度滑条 9细度

--
demucs 暴露了此项目唯一的算法-zipKNN(1,a,b) 对a找X轴起始[最近]的b(内)点，若距离<.2s 则填写或增添吐字，在后处理时切分。频谱图API都是Web附赠的，drawBuf(g,w,X轴) 能同时兼容a=mic或decode(url)，默认1s=70px。`#参数f0=H0 min max 当前声道 crepe-tiny` 可缩放纵轴
Bark 界面另一趣点：WebVTT 的显隐是CSS缓动的、还带吐字级进度条，实现为vtt分组(内字换为进度条!)并前后扩充delay，再1显1隐播放两个track


- Carbon向CPMU 4个公开剪贴板(上传以复制+拖图) `form[method="post"]{code&l=lang/id_lexer/id_syntax/'postform-format'&act=run }.submit()` main>:not(.page)； 或向JSBin,RunKit/new,OneCompiler,godbolt.org 执行  .ace_editor,[role=code],[tabindex="0"] ('[title^="Full"]').click() ,onlinesequencer
- 在 asciiflow,textpaint.net 字绘，或funcplot,desmos,ShaderToy，recordscreen.io,screenity,asciinema.org 录制和重放(+内嵌/tab弹窗)，或利用github1s/io
- 以 sketchviz.com 编辑doc粘贴标题树(以md格式 "- H1.." /导入processOn.右键折叠或格式化,-连词,onmsg=ul 加载其htm)
- 打开 doc/ppt/xslX ,md,dot,csv,mp3,cast,frag(GLSL); 或内插 shadertoy.com/view/ltffzl?ss&to&idoc:anyCode=#66ccff 的缓存.webm ，收发[i,Blob]作为iChan0；实通过 --ss:sec 和 transition 绑定参数 (mPasses Compile,NewTexture,resetTime)

(gShaderToy.resetTime+'').replace(/(\)\s){/,',t\)=>{').replace(/0/g,'t').replace('function','')
document.querySelector('.CodeMirror').CodeMirror.setValue('gg')
c=new DataTransfer();c.setData('text/plain','gg')
[autocorrect="off"].dispatchEvent(new ClipboardEvent('paste',{clipboardData:c }))

SV=()=>{ht.cacheAll(); juceyF11();
ht.dropr(SV.load=(fp, s=doc.title=fp.name,m)=>{
  (m=/(mp3|txt|nofs)$/.exec(s))? ('mp3'==m[1]?bgm.src=URL.createObjectURL(fp) : touch(s).write(fp) ):
  f(iProj, ...buf(await fp.arrayBuffer()), s)
})
;(async({m,bgm:mp3,bpm,l,v})=>{
  fp0=await navigator.storage.getDirectory()
  await touch("no.nofs").write('BEEP')
  await ht.moveTo({'/clf-data/japanese-romaji-dict.txt':`ja:${l}.txt`,'/databases/masaki/voice.nofs':v+'.nofs'}, async(k,v)=>FS.writeFile(k, new Uint8Array(await v.arrayBuffer()))
  )
  bgm.let({src:mp3,bpm});SV.load(await ha.fetch(m))
})(ht.params())

ht.tapmove(eAxis, seekAsk)
let Y;onmousewheel=(ev,qX,d)=>{with(ev){
  juce_mouseCallback('wheel',pageX,pageY,button,qX=shiftKey^Y,ctrlKey,altKey?(Y^=1):0,d=wheelDelta)} if(qX)bgm.X+=-d}
}

seekAsk=({x})=>{with(bgm){
  if(x<50){X=0;kx=prompt("seek 0. R-most tick",4.8)*bpm }
  currentTime=(X+x)/doc.body.offsetWidth *kx
}}

buf=(a, N,u8,iSet)=>(u8=new Uint8Array(a),N=u8.length, Module.HEAPU8.set(u8,iSet=_malloc(N)), [iSet,N])
juceyF11=(e,m=(k,x,y)=>juce_mouseCallback(k,x,y, 0,0,0,0,0), pad=(Z,x)=>Math.max(Z,x-10))=>{
  setTimeout(()=>{e=$('canvas');onresize()}, 200); setTimeout(onresize=()=>{
    m("down",pad(0,e.width()),pad(19,e.height())); m("move",doc.body.offsetWidth-10,innerHeight+16);m("up",0,0)
    scrollTo(0,100)
  }, 300)
}

ht.cacheAll(async(W,js,EM=/(\w+)\.wasm$/.exec(wasmBinaryFile)[1])=>{
  stop(); this.eval(await(await fetch(EM+".js")).text())
  js=[await URL.tamper(EM+".worker.js"),
      await(await fetch(EM+".js")).blob()]
  return class{
    constructor(u){this.o=new W(js[0])}
    postMessage(x){if('load'==x.cmd&&js[1])x.urlOrBlob=js[1] ;this.o.postMessage(x)}
    set onmessage(f){this.o.onmessage=f}
  }
})

tapmove=(e,f, ev=ss(`mouse down up move`))=>{let[_, A,B,C]=ev.map(k=>ev[0]+k), p=0
  {[A](P){f(p=P)},[B](){p=0}, [C]:P=>p?f(P,p) :0}
}

moveTo=(kv, w, kMy=s=>s.split('/').at(-1) )=>Promise.all(Object.entries(kv).map(([k,v])=>
  touch(kMy(k),'getFile').then(f=>f.size?w(k,f) :0)
))


{'Kotonoha Akane & Aoi':'kotonoha-akane-aoi', 'Hanakuma Chifuyu':'chifuyu', 'Natsuki Karin':'karin', 'Tsurumaki Maki':'tsurumaki-maki-en'}
e.id=e.id||ht.get(kv,/[^\n]+/.exec(e.innerText)[0]).toLowerCase().replace(' ','-')
c=[CEJ,1].map(l=> vdbs.lang[l].find(x=>x.id==id)); Object.cfg(c[0],c[1])
Pic=k=>ht.get(avatar,k,`https://dreamtonics.com/wp-content/uploads/assets/img/vdb/${k}.png`)

if(c.pic<3)q=(c.pic!=2), c.pic=[
  Pic(q?c.id+'.face':c.id.replace('-','')),
  q?Pic(c.id):ht.get(avatar.AI,c.id,`https://dreamtonics.com/wp-content/themes/homepage_theme/assets/img/front/SynthV_Image_Image1.png`) ]

new Date(ms).toJSON().slice(11,-1).replace(/^[0:]*/,'')

hotmap(eCSS,w=512)(y)

b=new Blob([$0.outerHTML],{type:'image/svg+xml;charset=utf-8'})
im=new Image();im.src=URL.createObjectURL(b)
await im.decode()

URL.svg=([W,H],s)=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}'%3E${encodeURI(s)}%3C/svg%3E`

Thread(target=l,daemon=1)
denoiser.live.main(q=False):
global model,s
if (n:=args.num_threads): torch.set_num_threads(n)
model = model or get_model(args).to(args.device); model.eval()
s = s or DemucsStreamer(model,num_frames=args.num_frames)
s.dry=args.dry; s.frames=1
if not hasattr(s,'rec'): s.rec=; streamer = s
if q:return

denoiser.demucs.DemucsStreamer.feed
k = self.dry; self.rec.write(bytes((out*65535).to(th.int16).numpy()) )
if k < 0: k=-k; bgm = dry_signal-out
else: k=1-k; bgm = dry_signal
out = k*bgm + (1-k)*out
outs.append(out)


whereb(){
  whereis -b $1|cut -d' ' -f 2
}
sudo setcap CAP_SYS_NICE=pe `realpath $(whereb python)`