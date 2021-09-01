from json import load,loads
import csv
import itertools#分组sort; Py2 可用 operator,functools.partial 替代lambda
import sys

a=loads(load(open(sys.argv[1],"r"))) #次1是"\{}" 自浏览器复制
breakpoint()

def one(r):#签=播弹时人
  (区题,注,签,时,封,链)=r; 链="https:"+链; i=链.find("?from")
  return [*区题,注,*([] if not isinstance(签,list) or len(签)==0 else 签[0]),时,封,链[:i] if i!=-1 else 链]

def groupby(xs,key): #好笑吗 itertools? 惰性vs?逼着我自行实现!
  d={}
  for x in xs:
    k=key(x); vs=d.get(k)
    if vs==None:d[k]=vs=list()
    vs.append(x)
  return d.items()

b=[one(r)for r in a]
breakpoint()
选名=set("歪点子实验室 好奇五先生".split()) #算了不前置，还是大家都各自按分区排下
c=[]
for (k,vs) in groupby(b, lambda a: a[6] if len(a)==10 else None): #a[0]!="e"
  c.extend(sorted(vs, key=lambda a:a[0]))

csv.writer(open("a.csv","w+") ).writerows(c)
#总之就读取转化了，group下,让 c.extend(即 append* sorted) 
