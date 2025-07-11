#!/bin/bash
#VOSK 语音识别的 SetWords 音组词根本不能用， srt 也不支持流输入，也不能利用 more_itertools.chunked(N 分块处理字幕因为可能在句内切断
#我决定做一个违背祖宗的决定：让 srt 支持行缓冲，
export VOSK_MOD=~/.local/share/kdenlive/speechmodels/vosk-model-${VOSKK:-cn-kaldi-multicn-2-lgraph} N_SAMP=16000 #大部分模型不能降低这采样率
srtSTT(){
qsec=$1;shift
ffmpeg -loglevel quiet $* -f s16le -ac 1 -ar $N_SAMP -|python -c '
from sys import stdin,stdout,stderr, argv
fIn=stdin.buffer.detach(); fOut=stdout

import vosk,json,srt; vosk.SetLogLevel(-1)
from itertools import chain
def recog(s,o):
  i=0; one=lambda x:json.loads(x)["result"]
  while len(b:=s()):
    print(i*nSec, end="\r",file=stderr,flush=True);i+=1
    try:
      if o.AcceptWaveform(b):yield one(o.Result())
    except:break
  try:yield one(o.FinalResult())
  except:pass
def makeSrt(s,t=lambda x,k:srt.timedelta(seconds=x[k])):
  wz=chain.from_iterable(s)
  return (srt.Subtitle(i, t(x,"start"), t(x,"end"), x["word"]).to_srt() for i,x in enumerate(wz))

#import jieba,re
#CHI=[*jieba.cut(open("a.txt").read()) ] #,*(re.sub("(.)","\\1 ", x)for x in set(open("a.txt").read().split("\n")))

nSamp,nSec=map(int,argv[2:]); nBlk=int((nSec:=nSec/4)* nSamp*2)#sampWidth
rec=vosk.KaldiRecognizer(vosk.Model(argv[1]),nSamp); rec.SetWords(True); 1 or rec.SetGrammar(json.dumps(CHI,ensure_ascii=0)) #timing, or FinalResult["text"]
for x in makeSrt(recog(lambda:fIn.read(nBlk),rec)): fOut.write(x);fOut.flush()
' $VOSK_MOD $N_SAMP $qsec
}
srtMerg(){
python -c '
from sys import stdin,argv; NL="\n"
import srt, re; dtMax=float(argv[1]); strf=eval(f"lambda x:{argv[2]}")
inSameLine = lambda a, b: abs(a.end - b.start).total_seconds() < dtMax
try:
  isU = "user" in argv[2]
  rmsp=lambda x:x.replace(" ","")
  def rmspc(x,f=rmsp):return f(re.sub(r"([\ba-zA-Z0-9]+)",lambda m:f"\0{m[1]}\0",x)).replace("\0"," ")
  if isU:
    from tkinter import simpledialog as dial; dial.Tk().lower()
    userchk=lambda x:dial.askstring("Replace?",f"{x} ;n={len(x)}",initialvalue=x)or x
    fLn=open("x");usersub=lambda x:fLn.readline()
except:
  if isU:
    fLn=open("x","w");usersub=lambda x:f"{fLn.write(x+NL)}\t{x}"

def zipTakeWhile(p, xz):
  if (a:=next(xz,None))is None: return
  col = [a]
  while b:=next(xz,None):
    if not p(a, b): yield col; col = [b]
    else: col.append(b)
    a=b
  yield col

def lineSrt(f,b=[]):
  for ln in f:
    if ln==NL: yield next(srt.parse("".join(b))); b.clear()
    else: b.append(ln)

for i,x in enumerate(zipTakeWhile(inSameLine,lineSrt(stdin))):
  s=strf(" ".join(map(lambda w:w.content, x)))
  print(srt.Subtitle(i,x[0].start,x[-1].end, s).to_srt(), end="",flush=True)
' $*
}

if [ $0 == ./arecog.sh ];then
[ -f a.srt ]&&srtMerg $1 'usersub(rmspc(x))' <a.srt >b.srt  ||srtSTT 10 -i $1 1>a.srt
fi
#usage: arecog audfile  >a.srt|max_dist_sec a>b.srt
#lib: srtSTT 1 -f alsa -i default a.wav|srtMerg 0.18 'userchk(rmsp(x))'
#or srtMerg 0.2 'x'

#require("vs/editor/browser/services/abstractCodeEditorService")
#ce=this.getActiveCodeEditor();$('.modified.editor').onclick=()=>ce._paste(1,'\n')

#node -e 'fs.readFileSync(0,"utf-8").replace(/[\p{sc=Hira}\n]+/gu, (m)=>process.stdout.write(m))' #scx=Han
#unzip -O shift-jis
#diff -y x1 - #u加减c各自上文e补丁  #sed -i 's/\n\n/\n/'
#for f in *.ust;do iconv -f shift-jis $f>"_$f";done
# clip.lines(){ IFS=$'\n' read -d'' -r -a it <<<$(xclip -selection clipboard -o); }
# mvBulk='process.argv.slice(1).map(x=>`mv -i "${x}"`).join("\n")' 
#vidMMSS(){ ffprobe -v quiet -print_format json -show_format "$1"|jq -r '.format.duration|tonumber as $ss|"\($ss/60|floor):\($ss%60)"'; }
# for f in *.mp4; do mv "$f" "t\$$(vidMMSS "$f"|sed 's/:/m/') $f";done

#subaud(){ for f in "$@"; do cd $f; ffmpeg -i *.mp4 -i *.wav -c:a flac -sample_fmt s32 -map 0:v:0 -map 1:a:0 a.mp4; done }
#vidATI(){ ffmpeg -vaapi_device /dev/dri/renderD128 -i $1 -c:v hevc_vaapi -profile:v main -vf 'format=nv12,hwupload' -c:a copy  "$(cut -d. -f1 <<<$1).mkv"; }
# ffmpeg  -hide_banner -encoders|grep api; vainfo -a

test && cat <<OK
//js convert all img tags to OffscreenCanvas canvas webp Blob, then use showDirectoryPicker to save

mod={
  async dirIO() {
    let ud=await window.showDirectoryPicker();
    return {async to(u,v) {
      let w=await (await ud.getFileHandle(u, { create: true })).createWritable()
      await w.write(v); await w.close();
    }}
  },
  img2pix(img) {
    let ug = new OffscreenCanvas(img.naturalWidth, img.naturalHeight), g = ug.getContext('2d');g.drawImage(img, 0, 0);
    g.blob=(k)=>ug.convertToBlob({ type: 'image/'+k })
    return g
  }
}
$$('img:not([class])').map(async(e,i)=>{
  let path={':':'m','|':'#', '/':' of ', '\n':'-', ' ':'~' },
  s=e.closest(`:is([class$=box],[class$=item])`).innerText.replace(/\s|:|\/|\|/g,m=>path[m]??m ); e.alt=/-(.*)/.exec(s)?.[1] ?? s ?? ''+i;
  try{await ud.to(`${e.alt}.webp`, await mod.img2pix(e).blob('webp')) } catch{throw e.alt}
})
ud=await mod.dirIO()
OK