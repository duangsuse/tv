import json,io, struct as S

def bin(pat):
  n=S.calcsize(pat); return(
  lambda s:S.unpack(pat,s.read(n)),
  lambda s,o:s.write(S.pack(pat,o))
  )
def lenPrefix(m):
  a,b=m; A=lambda s:s.read(a(s)[0])
  def B(s,o):b(s,len(o)); s.write(o)
  return A,B

from functools import reduce
pairwise=lambda f:lambda*a: reduce(f, a)
first=lambda a,p:next(filter(None,map(p,a)))
def withSet(o,k,v, f):
  v0=getattr(o,k); setattr(o,k,v); r=f(); setattr(o,k,v0); return r
_attr=lambda o,ks: first(ks.split(),lambda k:getattr(o,k,None))

@pairwise
def at(f2,F2):
  a,b=f2;A,B=(F2.loads,F2.dumps)if hasattr(F2,"__all__") else F2
  return (lambda s:A(a(s))), lambda s,o: b(s,B(o))
enc=lambda k:( lambda b:str(b,k), lambda s: bytes(s,k) )

mBuf=lenPrefix(bin("I"))
mJ=at(mBuf, enc("utf8"),json)

class Binary:
  def __init__(o,it):
    if isinstance(it,bytes): it=io.BytesIO(it)
    o.read=_attr(it,"read recv")
    o.write=_attr(it,"write send")
    o.val=_attr(it,"getvalue fileno"); o.close=_attr(it,"close shutdown")
  def r(o, pat):return pat[0](o)
  def w(o, pat,obj):pat[1](o,obj)
  def r_progress(o,pat,f=pbar):
    read=o.read
    def readbuf(n):
      buf=io.BytesIO(bytes(n))
      at=f(n); _1=io.DEFAULT_BUFFER_SIZE; i=0
      while i!=n:
        i+=buf.write(read(min(_1, n-i) )); at(i/n) # recv rest
      return buf.getvalue()
    return withSet(o,"read", readbuf, lambda:o.r(pat))


def fileServer(s):
  fp=open(s,"rb"); u=fp.read()
  serv(lambda s,ad: s.w(mJ, fp.name)or s.w(mBuf,u) or print(ad) )

def fileClient():
  def on(s):
    fp=s.r(mJ); print(f"Recv {fp}")
    open(fp,"wb+").write(s.r_progress(mBuf))
    s.close()
  coned(on)

def pbar(n,w=50):
  if n<1024:return lambda p:()
  return lambda p:print(f"[{'#'*int(w*p)}{' '*int(w- w*p)}] {100*p}%", end='\r') if p!=1 else print(f"got {n}byte")

from socket import*
addr=""; sock=lambda:socket(AF_INET, SOCK_STREAM)
def serv(f):
  so=sock()
  so.bind(addr); so.listen(1)
  print(addr)
  while (s:=so.accept()): f(Binary(s[0]), s[1])
def coned(f):
  so=sock(); so.connect_ex(addr)
  f(Binary(so))

import sys
if __name__=="__main__":
  k,addr,*a=sys.argv[1:]
  addr=(lambda a,b:(a,int(b))) (*addr.split(":"))
  globals()[k](*a)