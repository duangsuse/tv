from PIL import Image as Im, ImageStat as Ims
from sys import argv; (fpd,*fpIm)=argv[1:]
import random as Ran

import os;fpSrc=(x.path for x in os.scandir(fpd)) #瓷贴fpd还原1图像

png=lambda x:Im.open(x).convert("RGBA")
亮=lambda x:lum(*Ims.Stat(x[0]).median) #统计比缩小再取灰度lum好
序亮=lambda a:a.sort(key=亮)or a #左黑到白
lum=lambda r,g,b,a:(.241*r+.691*g+.068*b) -a#Alpha越浓越靠近黑色"0"?

b=序亮([(png(x),)for x in fpSrc]); (W,H)=b[0][0].size

def 素():
  for y in range(h):
    for x in range(w):yield (a.crop((x,y,x+1,y+1)) ,x,y)#记位方便b贴回

def alp(a):#添加零散透明图?
  a=a.copy()
  a.putalpha(Ran.randint(50,256))
  return (a,)

print(f"by {W}x{H} n={len(b)}")
for i,fp in enumerate(fpIm):
  a=png(fp); (w,h)=a.size
  print(f"{w}x{h}={w*h}")
  b.extend([alp(*Ran.choice(b)) for _ in range(w*h-len(b)) ])#补齐w*h

  A=a.resize((w*W,h*H), resample=Im.BOX)
  for (at,B)in zip(序亮(list(素())), 序亮(b)): #a黑部用黑的b图
    (a,x,y)=at
    A.paste(B[0], (x*W,y*H))
  A.save(f"bk{i}.png")
