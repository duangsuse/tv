扫=(n,m,fRow,f)=>(a,iv)=>{let i=0,N=n*m,
  j=0, 横=(q,f)=>{if(q)for(j=0;j<m;j++)f();else for(j=m-1;j!=-1;j--)f()},
  竖=(q,f)=>{if(q)for(i=0;i<N;i+=m)f();else for(i=N-m;i>=0;i-=m)f()},

  v=(A,B,d)=>A(1,()=>{fRow(iv>0?d:-d);B(iv>0, ()=>f(a[i+j],i+j)) })
  iv%2==0?v(竖,横,1):v(横,竖,m)
}

c={nm:[9,9] }

{let iv=0, x0 ,[na,m]=c.nm, 线=f=>扫(na,m, d=>{iv=d,x0=0},f),
并2=线((x,i)=>{if(x!=x0){x0=x;return}
  P(i-iv,x*2);P(i,x0=0) //若现"1222" 右移 则从右22=4 "1204"
}),
天落=线((x,i)=>{//若 "1 0 1" 见0=其左 ，及"1 2 0 1"
  P(i,a[i+iv])
})

a=Array(na*m).fill(0); e=a.map(x=>el("hr",x))
el(doc.body,...e).style.setProperty("--m",m)

let ac=0,试=扫(na,m, d=>{ac=0}, (x,i)=>{ e[i].innerText=ac++ }),
ic=0,id=setInterval(()=>{if(ic==3)clearInterval(id); 试(e,[2,-2,-1,1][ic++])}, 500)
}

docSty[0].ownerNode.innerText=`
hr {border: 0;margin: 3px;
background: rosybrown;color: white;
padding: 1.7rem 1rem; border-radius: 8px;
font: 21pt sans;
font-weight: 900;
text-align: center;
}
body{display:grid; grid-template-columns:repeat(var(--m),calc(100% / var(--m)))}
header,main{display: none}`
