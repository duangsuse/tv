import re,sys
def fnLastArg(f,a0=[None]):
  def save(*a):
    nonlocal a0;r=f(*a0,*a);a0=a; return r
  return save
pipe=lambda f,f1:lambda x:f1(f(x))
def txtf(f):print("",f(sys.stdin.read()) ,sep='\n'*3)

mL3='' #以ABA 形式出现m值,A显示为 '<' 直到下次切换
def merg(m,m1):
  global mL3 #v 切换:m3老朋友?
  return ('<' if mL3==m1 else (mL3:=m, m1+': ')[1]) if m1!=m  else ''
mergID=lambda x:re.sub(r'\n?(.*), \[.*\n',pipe(lambda m:m.group(1), fnLastArg(merg)), x)

txtf(globals()[sys.argv[1]])
