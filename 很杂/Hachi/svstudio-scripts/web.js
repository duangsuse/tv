forKV=(o,f)=>Object.entries(o).some(f)

Module.preRun.push(()=>forKV(ASM_CONSTS, ([k,v])=>/inputWidget/.test(v)? ASM_CONSTS[k]=$0=>{iProj=$0
  let f=Module.cwrap('websynthv_handleFileUpload', 'void', ['number', 'number', 'number', 'string'])
  ;(async()=>{
    fs=await navigator.storage.getDirectory()
    let fb,fp=await fs.getFileHandle("0",{create:1}), f=await fp.createWritable(); fsW=x=>{f.write(x);f.close()}
    if((fb=await fp.getFile()).size) {
     fp=FS.open(fb.size>4*1024e3? '/databases/masaki/voice.nofs':'/clf-data/japanese-romaji-dict.txt','w')
     FS.writeFile(fp.path, new Uint8Array(await new Response(fb).arrayBuffer())) }
  })()

  svLoad=a=>f(iProj, ...buf(a), document.title.replace(/\.(.*)$/,(_,x)=>(/nofs|txt/.test(x)?fsW(a):0, _.toLowerCase()) ))
  ondragover=ev=>ev.preventDefault()
  ondrop=async(ev,f)=>{ev.preventDefault(); svLoad(await new Response((f=ev.dataTransfer.files[0],document.title=f.name,f)).arrayBuffer()) }
  let e, m=(k,x,y)=>juce_mouseCallback(k ,x,y, 0,0,0,0, 0), pad=(Z,x)=>Math.max(Z,x-10), qX=1
  this['websynthv-div'].outerHTML+=`<style>body *:not(canvas) {display: none} canvas:first-child {left:0 !important;top:0 !important}</style>`;
  onresize=()=>{
    m("down",pad(0,e.width()),pad(19,e.height())); m("move",document.body.offsetWidth-10,innerHeight+16);m("up",0,0)
    scrollTo(0,100)
  }
  setTimeout(()=>{e=$('canvas');onresize()}, 200); setTimeout(onresize, 300)
  onmousewheel=ev=>{with(ev){juce_mouseCallback('wheel', pageX,pageY,button,shiftKey^qX,ctrlKey,altKey?(qX^=1):0,wheelDelta)} }
} : 0))

buf=(a, N,u8,iLoad)=>(u8=new Uint8Array(a),N=u8.length, Module.HEAPU8.set(u8,iLoad=_malloc(N)), [iLoad,N])

document.currentScript.outerHTML+=`
<area style="
  position: absolute;
  top: 45px;
  width: 100%;
  height: 30px;
  display: block;
  z-index: 20;
  background: linear-gradient(.5turn, #0000, #00ff3c1c);
">
`

// mkOffline=(ver='0', XHR=XMLHttpRequest.prototype)=>{
// hook(this,'fetch', f=>async(k,c)=>(c=await caches.open(ver),
//     (await c.match(k))||f(k).then(r=>c.add(r)) ))

// fetch=async(k,c)=>(c=await caches.open(ver),
//   await c.add(k), await c.match(k))

// hook(XHR,'send', f=>()=>{})
// hook(XHR,'open', dontDo=>async function(k,u8) {
//   let r=fetch(u, {method:k})
//   r.arraybuffer=r.arrayBuffer; r=await r[this.responseType].call(r)
//   defK(this,'response',()=>r); this.onload({status: 200})
// })
// mkOffline()
// gI=0,onf=0;gB=0
// h=Worker;

// (async()=>{
//   gI=await(await fetch("SynthesizerVStudio.js")).blob()
// gB=`(${hook})(XMLHttpRequest.prototype,'open', f=>function noBlob(...a) {
//   a[1]='${location}'+a[1]; f.apply(this,a)
// })`+await(await fetch("SynthesizerVStudio.worker.js")).text()
//   gB= URL.createObjectURL(new Blob([gB],{type:'text/javascript'}))
// }) ()
// Worker=class{ constructor(f){this.f= new h(gB||f)} postMessage(x){
//   if('load'==x.cmd)x.urlOrBlob=(gI)
//   ; this.f.postMessage(x); console.log(x)}
//   set onmessage(f){this.f.onmessage=x=>{f(x);console.log(x)} }  

             
// }
loc=location;ver='0'
mkOffline=(XHR=XMLHttpRequest.prototype)=>{
  hook=(o,k,f)=>o[k]=f(o[k])
  defK=(o,k,f, v)=>f.length? Object.defineProperty(o,k,{get:()=>v,set(V){v=f(V)}}) : o.__defineGetter__(k,f)

  fetch=async(u, c,r)=>(c=await caches.open(ver),
  (r=await c.match(u))?r : (await c.add(u),await c.match(u)) )

  hook(XHR,'send', f=>function(){if(this.cache==0)f.call(this) })
  hook(XHR,'open', realDo=>async function(...a) {let c=await caches.open(ver)
    ,k=new URL(a[1],loc),r=await c.match(k)
    if(r) {
      r.arraybuffer=r.arrayBuffer; r=await r[this.responseType].call(r)
      defK(this,'response',()=>r); this.onload({status: 200}) }
    else {
      hook(this,'onload', fn=> ev=>{
        c.put(k, new Response(this.response)); fn(ev)
      })
      realDo.apply(this,a); this.cache=0;this.send()
    }
  })
}
URL.tamper=async(u,f=s=>`loc='${location}',ver='${ver}';(${mkOffline})()`+s, r)=>(
  r=await(u=await fetch(u)).text(),
  URL.createObjectURL(new Blob([f(r)],{type:'text/javascript'}))
)

mkOffline()
jss=[];
(async()=>{ stop();
  jss=[await URL.tamper("SynthesizerVStudio.worker.js"),
    await(await fetch("SynthesizerVStudio.js")).blob()],
  
  this.eval(await(await fetch("SynthesizerVStudio.js")).text())
}) ()
hook(this,'Worker', W=>class{
  constructor(u){this.o=new W(jss[0]||u)}
  postMessage(x){if('load'==x.cmd&&jss[1])x.urlOrBlob=jss[1]
    this.o.postMessage(x)}
  set onmessage(f){this.o.onmessage=f}
})
