tok=s=>s.trimLeft().split(/([-+*/])\s*/g),
strm=(a,_s=a.values())=>()=>_s.next().value,
splitD=(s,sp0,...sp)=>sp0?s.split(sp0).map(x=>splitD(x,...sp)):s,

exp=(s,l)=>{
  let o,x=()=>add(Number(s())), ord=[],add=x=>ord.push(x),
  one=ed=>{let a,b
      x();for(o=s();(a=l[o])>=(b=l[ed]);)if(a==b){add(ed);x();ed=o;o=s()} else one(o);  add(ed)
  }
  one(";");return ord
},
vexp=cod=>{let st=[],x;cod.pop(); for(x of cod)(typeof x=='number')?st.push(x): (i=> st.splice(i,2, opr(x,...st.slice(i)) ))(st.length-2); if(st.length!=1)throw st; return st[0]},
opr=(k,a,b)=>eval(a+k+b),
optab={[';']:-1}; splitD("=;+ -;* /",';',' ').forEach((k,i)=>{for(let _ of k)optab[_]=i})
{
    document.write("<input id=x> <b id=y>")
    x.onchange=(ev,a=exp(strm(tok(x.value)),optab))=> y.textContent=a.join(" ")+vexp(a)
}
