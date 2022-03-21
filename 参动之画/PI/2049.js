扫=(n,m,fRow,f)=>(a,iv)=>{let i=0,N=n*m,
  j=0, 横=(q,f)=>{if(q)for(j=0;j<m;j++)f();else for(j=m-1;j!=-1;j--)f()},
  竖=(q,f)=>{if(q)for(i=0;i<N;i+=m)f();else for(i=N-m;i>=0;i-=m)f()},

  v=(A,B,d)=>A(1,()=>{fRow(iv>0?d:-d);B(iv>0, ()=>f(a[i+j],i+j)) })
  iv%2==0?v(竖,横,1):v(横,竖,m)
}

c={nm:[4,4] }

{let iv=0, x0 ,[na,m]=c.nm,线=f=>扫(na,m, d=>{iv=d,x0=0},f),
asg=Object.assign,
P=(i,x)=>{let X=a[i];return asg(a[i]=x, X)}

并2=线((x,i)=>{if(x!=x0||x==0){x0=x;return}
  let p=P(i-iv,x*2) //若现"1222" 右移 则从右22=4 "1204". 格有2 id
  p.id=[p.id,P(i,x0=0).id]
}),
天落=线((x,i)=>{//若 "101" 见0则=其左(非0) ，及"1201". 设id 天落,并2,再天落
  if(x==0&&x0!=0){ let L,nZ=计(0,i,B); for(;(L=i-iv)>A&&a[L]!=0;i=L)P(nZ+i,a[L])  ;P(i,0) }
  x0=x //partition二分不是保序的，纵0m,1m.. 也无法splice 很麻烦；横竖横 也不好复用拿iv或判A~B界，但可计数.. //37:lurd
})

a=Array(na*m).fill(0); e=a.map(x=>el("hr",x))
el(doc.body,...e).style.setProperty("--m",m)

let ac=0,ic=0,id=setInterval(()=>{if(ic==3)clearInterval(id); 试(e,[2,-2,-1,1][ic++])}, 500)
试=扫(na,m, d=>{ac=0}, (x,i)=>{ e[i].innerText=ac++ })
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

//无敌(撞蛇/墙) ,大增长/原地踏, 穿梭,反向
//若一开始就以最具描述力的做法实现程序，几百行的“衍生问题”便“砰!”地消失了，能讲几个小时的故事、双向多选多序云云，在你选择从原理开始的那一刻戛然而止，只剩下“满目疮痍”的教学和产出的软件玩具
//如果你有这个胆量，敢相信现今被无限重复的一切只不过是一种可行解，敢于为语言优美打破流行的常规，尝试新做法，关注我吧。我会探索现实与设想交融的边界无限
