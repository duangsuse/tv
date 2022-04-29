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
header,main{display: none}

.n0{background:#0000}.posa{position:absolute}`

//无敌(撞蛇/墙) ,大增长/原地踏, 穿梭,反向
//若一开始就以最具描述力的做法实现程序，几百行的“衍生问题”便“砰!”地消失了，能讲几个小时的故事、双向多选多序云云，在你选择从原理开始的那一刻戛然而止，只剩下“满目疮痍”的教学和产出的软件玩具
//如果你有这个胆量，敢相信现今被无限重复的一切只不过是一种可行解，敢于为语言优美打破流行的常规，尝试新做法，关注我吧。我会探索现实与设想交融的边界无限
//2D格方向、列表处理、向量分量同算、绑定等同类型
//编程是表达，然后才是思维。表达精炼准确，思路也不会差，程序语言也是人类语言

/*
把行里所有项(n个)往右推，i是递减的，因为当前位置i 右边不能变。i增(从左到右)的话你会读到已经右移的项目
其=(i~i+n)降1； 若[其-1]是0 a[i]=0(已右移)再试下个i ，否则不断 a[i]=[其-1]

假设每次只能让1格右移，对(1~最右)格 若是0 其左项都右移 遇0停下。0的右侧已经移走，填入最初被覆盖的0， 等于把0插到最左，那我干嘛不用sort()?
因为当a[i-1]和a[i]相同，把i右格*2 ，a[i]=a[i-2]
a=[0,1,1,0];for(i=3;i>=1;i--){if(a[i-1]==0){a[i]=0;break} a[i]=a[i-1]}
*/

/*但不能从SQL转回SQ糖很麻烦，最好是不同语法构筑统一语法树，再在统一树(U-AST)上定义toStr。create table(,) 的语法糖需要在统一树中间处理
即 A=>B变 A=>U, f(U), U=>B 。但统一中间树太麻烦了，于是我想A里 {}以kv,_N以等位tag,[]以 [0,1][i] 对应到B 的toStr
但若A=SQ糖,B=SQL 那toStr就是还原SQ糖输入，太刻板了。 scanjs需负责 data的解析和toStr(read-runPass*-show) ，A的结果只负责指定pass(中间转换)列表,和缓存A-B对应法(默认A-A)


读A语言，再以B语言显示A
没有什么深操作(如检查、美化)，只是格式转换，写语法树就很浪费，因此SQ糖使用 AB-AST

A文本的语义是调1函数，或调“改写列表”后以B的对应语法显示 []{} _1 结构(预设交叉引用)。AB;BA的转换都支持 ，那么 P.fde(p,x) 里x内项只会是str，以p内p显示x内x 直接合并作B[p]
算了seq知道自己的对应B，fde参数反不够 且顺序是预先定
(AB-AST 不能做多层次的变换如 int a,b = int a int b? 其实只要单向不复用就行

若有对应关系则其=toStr供对方引用，否则如「串」不能双向转译。pipe是单向或{}互译 ， 用a,b=use a;use b 样解析
a"",b123->A"",B321 先{}解析发现a:A规则,pipe,改tokk后转到B显示. show-read
 */
