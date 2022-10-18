from dataclasses import field,dataclass
import collections as CO, signal as SIG
def data(T): #设vars(T)
  {setattr(T, k,field(default_factory=v if q else v.copy)) for k,v in T.__annotations__.items() if (q:=callable(v))or hasattr(v,'copy')}
  return dataclass(T)

class TimeLim(CO.UserList):
  def __init__(o):
    o.dt=[]; TimeLim._o.append(o); super().__init__()
  def __call__(o,x, dt):
    o.append(x); o.dt.append(dt)
    return len(o)-1
  _o=[]
def _bail(a, i=0):
  while i<len(a):
    if a.dt[i]>0: a.dt[i]-=1;i+=1
    else: a.pop(i);a.dt.pop(i)
  SIG.alarm(1)

#can use asyncio.loop(excutor) run(async def)
SIG.signal(SIG.SIGALRM, lambda:{_bail(o) for o in TimeLim._o} )
SIG.alarm(1) #crash IPy w/o loop.add_signal_handler()


from socket import*
import selectors as S, time
import argparse as AP

@data
class SendMQ:
  a:[];line:{}; tLim:TimeLim
  def __call__(o, k,v):
    try:
      if (s:=o.line.get(k)): s.send(v); return
    except: o.line.pop(k).close() #no shut
    o.a.append((k,v))
  def onConn(o,k,s):
    o.line[k]=s
    try:
      for K,v in o.a:
        if k==K: s.send(v); o.a.remove((K,v))
    except:pass
  def onMsg(o,k,s):
    i=o.tLim(k, 5*60)
    wxSay(f"IP{k} 的留言于{time.strftime('%M')}分{'#'+i if i else ''}>\n{s}")
  def onWx(smq,s):
    if s[0].isdigit():
      i,msg=s.lsplit('：',2)
    else: i=len(smq.tIim)-1; msg=s
    smq(smq.tLim[int(i)], msg)


say=SendMQ()

Sec=S.DefaultSelector();sec=Sec.register

# but aio.loop.S_Loop(Sec) defaults this!

so=socket(AF_INET,SOCK_STREAM)
so.setsockopt(SOL_TCP, SO_KEEPALIVE, True)
so.bind(("0.0.0.0",233))
so.listen(5);so.timeout=0 #打开通知文件

# sock并非打开读1遍，而是实时更新的文件. poll通知比轮询阻塞好
sec(so, S.EVENT_READ, data=None)
while True:
  for o,b in Sec.select(timeout=None):
    if o.data!=None:
      s=o.fileobj;d=o.data
      k=d.addr[0]
      if b&S.EVENT_WRITE: say.onConn(k, s) # s=s[sent:]
      if b&S.EVENT_READ:
        if (bf:=so.recv(512)): d.s+=bf
        else: say.onMsg(k,d.s);  d.s=b"" #用aio run_srv()或add_reader不手动维护! call_ 则是setTimeout族
    else:
      s,k=o.accept(); s.timeout=0
      sec(s, S.EVENT_READ|S.EVENT_WRITE, data=AP.Namespace(addr=k, s=b""))
#realpy除了并发 表示和字节都讲了..

#比起op.create_server(sockop) run(con)更直接
AO.run(AO.start_server(lambda r,w: w.write(r.read(1))or w.close() ,'0.0.0.0',233))

#但 start(con) 和阻塞serve()需在相同loop, 不随处aio.run. timeout,gather和to_thr也好
