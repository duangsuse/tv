
扫=(n,m,fRow,f)=>(a,iv)=>{let i=0,N=n*m, j=0, q=(iv>0), ok=()=>f(a[i+j],i+j),hi=()=>fRow(iv)
  if(iv%2==0)
    for(i=0;i<N;i+=m){hi();if(q)for(j=0;j<m;j++)ok(); else for(j=m-1;j!=-1;j--)ok() }//可加个 fRowend, 但反正不需检查n连续再操作
  else
    for(j=0;j<m;j++){hi();if(q)for(i=0;i<N;i+=m)ok(); else for(i=N-m;i>=0;i-=m)ok() }
}

扫=(n,m,fRow,f)=>(a,iv)=>{let i=0,N=n*m, d=Math.round(Math.abs(iv)/2),
  j=0, 横=(q,f)=>{if(q)for(j=0;j<m;j+=d)f();else for(j=m-1;j>-1;j-=d)f()},
  竖=(q,f)=>{if(q)for(i=0;i<N;i+=m)f();else for(i=N-m;i>=0;i-=m)f()},

  v=(A,B)=>A(1,()=>{fRow();B(iv>0, ()=>f(a[i+j],i+j)) })
  iv%2==0?v(竖,横):v(横,竖)
}

c={nm:[9,9] }

docSty[1].ownerNode.innerHTML=`
hr {
    border: 0;
    background: rosybrown;
    color: white;
    padding: 1.7rem 1rem;
    font: 21pt sans;
    font-weight: 900;
    margin: 3px;
    border-radius: 8px;
    text-align: center;
}
header,main{display: none}
body{display:grid; grid-template-columns:repeat(var(--m),calc(100% / var(--m)))}
`

{let iv=0, n/*same*/=0, x0 ,[na,m]=c.nm;na+=2,m+=2
天落=扫(na,m/*算同边框*/, d=>{iv=d;x0=0},
  (x,i)=>{if(x==x0){n++;return}x0=x; if(x==0){n=0;return}
  let eD=e[i]; do{i-=iv;n--; c.mov(eD,e[i]);a[i]=0}while(n!=0); c.mov(eD,e[i]).onfinish=()=>c.big(eD); a[i]=0 })

a=Array(na*m).fill(0); e=a.map(x=>el("hr",x)) //既然1次1移，就无需首尾0帮结算
el(doc.body,...e).style.setProperty("--m",m)

let ac=0;试验=扫(na,m, d=>{ac=0}, (x,i)=>{ e[i].innerText=ac++ })
}//贪吃蛇,推箱子,烟花
