from dataclasses import field,dataclass
def data(T): #设vars(T)
  {setattr(T, k,field(default_factory=v if q else v.copy)) for k,v in T.__annotations__.items() if (q:=callable(v))or hasattr(v,'copy')}
  return dataclass(T)

def tryr(x,*f):
  for it in f:
    try:return it(x)
    except:pass

idxOrElse=lambda a,x, f: tryr(x, a.index,f)
fm=lambda fmt,*a: fmt%a if all(a) else ''

#sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python3.10
import collections as CO, asyncio as AO, time,sys,re

def ree(k,s):
  if(m:=re.match(k,s)):return m.groups()

class TimeLim(CO.UserList):
  def __init__(o):
    o.dt=[]; TimeLim._o.append(o); super().__init__()
  def __call__(o,x, dt):
    o.append(x); o.dt.append(dt)
    return len(o)-1
  _o=[]
def cron():
  op=AO.get_event_loop() #既有唯一!
  def poll():
    op.call_later(1, poll) #也可await poll() 但就变task
    for o in TimeLim._o:
      i=0; t=o.dt
      while i<len(o):
        if t[i]>0: t[i]-=1;i+=1
        else: del o[i];del t[i]
  poll(); #a=TimeLim();a(1,1); op.run_until_complete(AO.sleep(2)); assert len(a)==0
  async def rl():
    s=AO.StreamReader()
    await op.connect_read_pipe(lambda:AO.StreamReaderProtocol(s), sys.stdin)
    while not s.at_eof(): yield (await s.readline())[:-1].decode()
  global onEach,lines;lines=rl()
  def onEach(xz,f):
    async def waitr():
      async for x in xz:await f(x)
    op.create_task(waitr())

@data
class SendMQ:
  a:[];line:{}; tLim:TimeLim
  async def __call__(o, k,v):
    try:
      if (s:=o.line.get(k)): await svTell(s,v, True); return
    except Exception as e:print(e); o.line.pop(k).close() #no shut
    o.a.append((k,v))
  def onConn(o,k,s):
    o.line[k]=s
    o.a=[*filter(None, (svTell(s,v) if k==K else (K,v)for K,v in o.a) )] #must

  def onMsg(o,k,s):
    i=idxOrElse(o.tLim,k, lambda k:o.tLim(k, 5*60))
    wxSay(f"IP{k} 留于{time.strftime('%M')}分{fm('#%d',i)}>\n{s}")
  async def onWx(smq,s):
    if 0==len(a:=smq.tLim) or ''==s: return
    #i,msg=s.split('：',2) if s[0].isdigit()and('：'in s) else (len(a)-1, s)
    i,msg=ree('^(\d+)：(.*)',s)or(len(a)-1, s)

    try: await smq(a[int(i)], msg)
    except: wxSay(f"#{i} 无此人")

from socket import*
say=SendMQ()
async def con(r,w):
  w.get_extra_info('socket').setsockopt(SOL_TCP,SO_KEEPALIVE, True)
  k=w.get_extra_info('peername','?')[0]
  say.onConn(k, w)
  try:
    while'alive':
      say.onMsg(k, (await r.readuntil(CRLF))[:-1].decode())
  except:w.close()
def svTell(o,x, must=False):
  o.write(x.encode()+CRLF)
  if must:return o.drain()

S_ADDR='0.0.0.0',233
CRLF=0#b'\x02' #sed -u s/$/`printf '\x02'`/|ncat 0.0.0.0 233
if not CRLF:
  import websockets as WS
  def svTell(o,x, must=False): return o.send(x)if must else AO.get_event_loop().create_task(o.send(x))and None
  async def con(ws):
    k=ws.remote_address[0]
    say.onConn(k, ws)
    async for x in ws:say.onMsg(k, x)

wxSay=print
async def main():
  cron()
  onEach(lines,say.onWx)
  if CRLF:
    async with (await AO.start_server(con, *S_ADDR)) as so:await so.serve_forever()
  else:
    async with WS.serve(con,*S_ADDR):await AO.Future()
AO.run(main())