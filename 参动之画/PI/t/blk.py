from PIL import Image as Im
import random as Ran
from sys import argv;(fp,*fpPix)=argv[1:]

a=Im.open(fp); b=[(Im.open(x),)for x in fpPix]
(w,h)=a.size;(W,H)=b[0][0].size
def 素():
  for y in range(h):
    for x in range(w):yield (a.crop((x,y,1,1)), x,y)

亮=lambda x:x[0].resize((1,1)).convert("L").getpixel((0,0))
序亮=lambda a:a.sort(key=亮)or a

A=Im.new(a.mode,(w*W,h*H))
b.extend([Ran.choice(b) for _ in range(sum(a.size))] )
for(at,b)in zip(序亮(list(素())) , 序亮(b) ):
  (a,x,y)=at
  A.paste(b[0], (x*W,y*H) )
A.save("c.png")

#https://stackoom.com/question/40jX5  ImageStat.Stat().rms COLOR_BGR2HSV[...,2] split()  cv2.Sobel(lum,cv2.CV_64F,x=1,0,ksize=5) cv2.addWeighted(im, .3, np.sqrt(gradX**2 + gradY**2), 1.0-.3,0)
#,ImageDraw as ImD A=ImD.Draw(imA:=) , x*W+W,y*H+H
