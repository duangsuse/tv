from re import *
from subprocess import *
bc=Popen("javap -c -l *.class",shell=True,stdout=PIPE).stdout.read() .decode()

noKst=False
前={};行={} #fix下多方法呗
for m in finditer(r'(\d+): (\d+)',bc[bc.index("LineNumberTable"):]):行[m[2]]=f"//L{m[1]}\n"#i,no
def 指令(i,k,_,a1,cmt):
  a1=a1 or"" #余参
  if cmt:
    if cmt[0]!=' ': (a2,cmt)=cmt.split('//'); a1+=a2
    cmt=sub('/* \S+ ','',sub('L?java/lang/','',cmt)) #用户定义则不可?..
  k=sub('invoke(.{4}).*',r'F\1',k)
  if (q:= k=="goto"or"if"in k):k=f"{i}^{k}";前[a1]=f"  ^{i}"
  return f"\n{行.get(i)or ''}{k} {cmt or ''}{前.get(i)or ''}{'' if q or noKst else a1}"

print(sub(r'\n\s*(\d+): (\w+) *((\S+) *(.*))?',lambda m:指令(*m.groups()), bc))
