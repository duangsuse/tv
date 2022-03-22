from PIL import Image as Im, ImageStat as Ims
import random as Ran
from sys import argv;(fp,*fpPix)=argv[1:]

a=Im.open(fp).convert("RGBA"); b=[[Im.open(x).convert("RGBA")]for x in fpPix]
(w,h)=a.size;(W,H)=b[0][0].size
def 素():
  for y in range(h):
    for x in range(w):yield (a.crop((x,y,x+1,y+1)), x,y)

lum=lambda r,g,b,a:(.241*r+.691*g+.068*b)+a#/a
亮=lambda x:lum(*Ims.Stat(x[0]).median) #x[0].resize((1,1)).convert("L").getpixel((0,0))
序亮=lambda a:a.sort(key=亮)or a
def alp(a):
  a=a.copy()
  a.putalpha(Ran.randint(50,256))
  return [a]


A=a.resize((w*W,h*H), resample=Im.BOX)#Im.new("RGBA",(w*W,h*H))
b.extend([alp(*Ran.choice(b)) for _ in range(w*h-len(b))] ) #补满
for(at,b)in zip(序亮(list(素())) , 序亮(b) ):
  (a,x,y)=at
  A.paste(b[0], (x*W,y*H) )
A.save("c.png")

