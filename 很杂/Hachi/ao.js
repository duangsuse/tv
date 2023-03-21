function async(f,co){ return function(ok) { var a=[].slice.call(arguments),ok=a.pop(), CONT=Duktape.Thread.resume;
    function HUP(f){ f(function(r){if(!CONT(co,r))ok(HUP.r)}); return Duktape.Thread.yield() }a.push(HUP)
    CONT.call(0,co=new Duktape.Thread(starmap(f)),a)
  } }
  function starmap(f){return function(a){return f.apply(this,a)}}
  
  async=(f,co)=>(ok)=>{let a=[].slice.call(arguments),ok=a.pop(), CONT=Duktape.Thread.resume,
    HUP=fok=>(fok(r=>{if(!CONT(co,r))ok(HUP.ret)}) ,Duktape.Thread.yield(/*HUP w/no Promise*/))
    CONT.call(0,co=new Duktape.Thread(starmap(f)),a)
  }
  
  main=async(function(a,b,aw) {
    //A=a;B=b
    aw.r=aw(function(f){m=f})
  })
  
  main('a','b',function(x){A=x});m(4);A
  
  <script>
  ht={}
  ht.ev=(e,k)=>new Promise(ok=>e.addEventListener(k,ok, {once:true}))
  delay=dt=>new Promise(ok=>setTimeout(ok,dt))
  
  crossFade=(e0, tag="img",k="src",on="st1")=>async(v)=>{
    let e,c; for(e of e0.children)e[k]==v? (c=e) : e.click('exit')
    if(c)return c.classList.add(on)
    c=e0.appendChild(Object.assign(e=document.createElement(tag),{[k]:v,
      onclick(){ c.remove(on); e.ontransitionend=()=>c.contains(on)?0:e.remove() }
    })).classList
    c.add("st0"); await Promise[k=='src'?'all':'any']([delay(10),ht.ev(e,'load')]); c.add(on)
  }
  
  f=crossFade(roll);i=0
  items.onmouseover=(ev)=>ev.target.src?f(ev.target.src.replace(/\.face_?/,"")):0
  </script>
                                                   
  <style>
  .st0{transition: .8s cubic-bezier(0.09, 0.53, 0.93, 0.31);opacity:0;--l:100%;
         position:absolute;right: 50px;bottom: 5em;}
  .st1{transition: .5s cubic-bezier(0.16, 0.68, 0.34, 1.21);opacity:1;--l:0%;}
  .st0,.st1 {transform: translateX(var(--l))}
  body{overflow:hidden}
  </style>