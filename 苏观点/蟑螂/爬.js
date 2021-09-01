const n=o=>o.length,
splitOneOf=(cs,s,f)=>{
  let i=0,N=n(s),i0=i,  a=[];
  for(let k=0;i<N;i++)if((k=cs.indexOf(s[i])) !=-1){a.push(s.slice(i0,i));f(a,k); i0=i+1}  a.push(s.slice(i0));f(a,-1)
  return a
},
H=(ss,...child)=>{
  let i=0, a=splitOneOf(" \u0000",ss.join("\u0000"), (a,k)=>{let i1=n(a)-1,s=a[i1], si,sk;
    if(k==1||(si=s.lastIndexOf(":"))!= -1){
      if(k==1){s=Object(s);s.inn=child[i];i++}else
      {sk=s.slice(si+1); s=Object(`${s.slice(0,si)}[${sk}]`); s.key=sk} a[i1]=s}
  })
  return (e,v)=>a.map(x=>{
    let one=!x.endsWith("*"),css=one?x:x.slice(0,-1); return each(e,(e,q1)=>{
      let r; if(q1)r=e.querySelector(css); else {if(e.matches(css))r=e; else return []}
      return (r==null)?{e,css}: x.inn?  (one? x.inn(r) : x.inn([...r.children],v)):
        x.key? r.getAttribute(x.key) : r.textContent.trim()
    })
  })
},
each=(a,f)=>n(a)?a.flatMap(x=>f(x,false) ):f(a,true)

哔视频=H`.info>.headline${H`span.type a:title`}.info>.des .info>.tags*${H`span`}img:src .so-imgTag_rb a:href`
被爬=[];$(".body-contain").on("DOMNodeInserted",ev=>{let evt=ev.target;if(evt.nodeType==1&&evt.matches("ul")){debugger;被爬.push(...[...evt.children].map(哔视频)); if(confirm())$(".page-item.next>button").click(); } })
