浅先=`;=;+ -;* / %`
流=(a, _s=[...a].values())=>()=>_s.next().value
切2D=(s,sp0,sp1)=>s.split(sp0).map(s=>s.split(sp1) )
{let t={},k; 切2D(浅先,';',' ').forEach((x,i)=>{for(k of x)t[k]=i});  符深大=t}

符链=(s,l)=>{let a=[],add=x=>a.push(x),
  o,x=()=>add(Number(s())),
  one=ed=>{x(); let A,B;for(o=s(); (A=l[o])>=(B=l[ed]);)if(A!=B)one(o);else{add(ed);x();ed=o,o=s()} add(ed)}
  one('');a.pop(); return a//深先. ^已优化:仅 l右>l现 递归.等价逆波兰, 注意o=s()只一次
}
{
B=document.body;B.innerHTML=`<input id=x> <b id=y>`
B.style.cssText=`display:flex;flex-direction:column; white-space:pre`
x.onchange=()=>{y.innerText=(this.expr=符链(流(x.value.split(/([-+*/%])\s*/g)), 符深大) ).join(" "); B.append('=',折叠(expr),'\n\n')}
}
折叠=(码,算=(st,k,a,b)=>{console.log(a,b,k,码); B.append(折叠([...st.slice(0,-2),a,b,k,...码],(_,k,a,b)=>a+k+b)+"\n");return eval(a+k+b)})=>{
  let st=[],x;
  while(null!=(x=码.shift()))(typeof x=='number')?st.push(x):
    (i=> st.splice(i,2, 算(st,x,...st.slice(i)) ))(st.length-2)
  if(st.length!=1)throw st; return st[0]
}
