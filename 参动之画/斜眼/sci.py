https://github.com/audacity/audacity/blob/master/src/effects/Wahwah.cpp#L391 freq=3.7 depth=.85 reso=3.4
https://p5js.org/examples/sound-filter-bandpass.html 一半有交互创意
https://wavesurfer-js.org/example/bars/index.html 的方便波形可视化(Region循环,ELAN字幕,Bar/timeCursor/line,MediaSession)还有 marker,minimap,playhead 等超强可配置
https://collab-project.github.io/videojs-record/#/examples 的WebRTC技术音视录制工具,支持 Chromecast record(maxLength=60)saveAs()录屏和 doc.pictureInPicture Window. URL.createObjectURL(player.recordedData)
https://alemangui.github.io/pizzicato/ 的硬核声效与 WebAudio ScriptProcessor/FFT-Analyser Node IOBuffer，还有……
https://github.com/andrzejlisek/AudioSpectrum/blob/master/filter.js 地狱绘图-巨型项目-代码烂得不行

let wa=player.wavesurfer().surfer.backend, relink=(a,b)=>{a.disconnect(0);a.connect(b)/*=b*/},
aproc=f=>({inputBuffer:A,outputBuffer:B})=>{let j,i,a,N,b;for(j=0;j<2;j++)for(a=A.getChannelData(j),b=B.getChannelData(j),i=0,N=a.length;i<N;i++)b[i]=f(i/N,a[i]) }, M=Math,Q=k=>M.random()*k-k/2,D=M.PI*2
wf=wa.ac.createScriptProcessor(1024); relink(wf,wa.ac.destination);wa.handlers.play.push(()=>relink(wa.source,wf))
cod=s=> wf.onaudioprocess=aproc(eval(`(t,x)=>{let T=wa.ac.currentTime;return ${s[0]}}`) ); cod`(t<.5)?x*Q(1):x*M.sin(t)`

K=1000_0; cod`M.cos(T*K%K+t)-t`
cod`(T*10%10 )*x`
cod`M.cos(t*M.PI*10)*(T*10%10 )*.5`
cod`M.sin(T)*t`
cod`M.sin(T/t)`
cod`M.cos(T*K%K+t)-t*Q(1)`
cod`M.tan(T*K)`
cod`x*t*(M.floor(T*10)%10)`
cod`M.sin((T%1<.5? 0:480)*t/M.PI/2)`
dtmf=(a,b,t)=>M.sin(D*(a+b)/2*t)*M.cos(D*(a-b)/2*t)
cod`f(.3,.1,10,440,T%.5*t) +f(.3,.1,10,210,T%1*t)*2` //tremolo virbrato
cod`M.sin((10+100*M.sin(440/D*t) )/D*t)`
cod`M.sin(D*120*t**0.05 +Q(1))`
cod`Q((T%1)**.9)*10`
cod`T%1<.5? 0:dtmf(480,620,t)*5`
T*8224; t*((t>>12|t>>8)&63&t>>3)

https://tinyrave.com/tracks/69-ode-to-joy
https://www.shadertoy.com/view/XlBGzm
https://www.shadertoy.com/view/XlXSWB Praat
https://tinyrave.com/tracks/10-interstellar-theme-song 果然信号处理就是人均data转化 codegen ，啥都会啊
https://www.shadertoy.com/results?query=star 这每张都是壁纸..

https://tinyrave.com/tracks/23-wizards-and-warriors-midi-nes m

https://www.barretlee.com/blog/2014/02/28/cb-webAudio-filter/
https://www.redblobgames.com/x/1618-webaudio/ 编玩边学 和解释: https://www.cnblogs.com/xy2c/p/7501327.html
http://lab.andre-michelle.com/perspective-textured-boxes ^大佬眼里的大佬。这个是贴图伪3D，他写了很多Flash 几何/曲线(flower,ocean,)/游戏算法(如Bezier碰撞体)，可用 ruffle.rs 试玩. 免费DAW audiotool.com 也是他写的-是的，完全和各种社区设计引擎平级的个人..
https://permadi.com/java/rayc/Rayc.java ^大佬**3 ... 这是3D扫描渲染.. 图形学大佬都说excellent, 肯定非常牛逼了
https://justintaddei.github.io/webaudio/ 是简单的频谱仪

基于 tf.js 还有个 https://magenta.tensorflow.org/demos/web/ 和 softsynth.com , dgen.co
http://oos.moxiecode.com/js_webgl/particles_morph/
https://avseoul.net/particleEqualizer/


buildSample=t=>{t*=t;let z=t>>0;t*=z;z=t>>0; return.5<t-z?1:-1}
let{floor}=Math,cyc=(a,i)=>a[i%a.length]
pluckFrequency = 470.0 ,
a = Array(floor(44100 / pluckFrequency) ).fill(0); // FIFO frequency of the plucked string

a.forEach((x,i)=>a[i] = Math.random() * 2 - 1)//white noise

// TinyRave calls this function 44100 times per second to generate the audio buffer
function buildSample(T) {
  // Step 2: Loop over the circular buffer
  let i = floor(T*SAMPLE_RATE)%a.length, y = a[i];
  // we can keep a running average
  // Step 3: Perform a running average as we move over the buffer
  a[i] = (y + cyc(a,i+1)) / 2;

  // Return the sample from step 2
  return y;
}

player.audioWrapper._audioSource.context.resume()

这。。不能吧！？动苏盯着刚刚夸过好玩的 Pizzicato
main.js .. 肯定.. 这些DOM ID肯定是Jekyll模板和.md生成的！对，这300行的结构名字肯定是作者为了保证严谨，写着玩的！哈哈，这么多代码，怎么可能有对应html呢？肯定是写模板里了，或者就是js临时生成的，保存下来贴了
面对这有强大压迫感，繁杂与“简单”并存的 1k行代码 index.html ……仿佛不惑之年的尊严老头搂着显眼的小孙子在跳舞。我差点当场去世，竟只能坐和放宽，头抬起，一句话也说不出
没想到是这样…… 我还以为WebAudio的app会是怎样，像 experiments.withgoogle.com ?

htmlcrush.com minify-html.com codebeautify.org 的词法转化不足以缩减这种文档，Vue 等“高技术”的 DOM diff 没有想到拿来转化模板列表，这就是web的现况吧
最后反而是CSS并列选择器 h4+pre+.slider-group+.controls 和 $('input').map(e=>e.outerHTML.slice(20)) .filter(s=>/volume-.*$/.test(s))帮到了我.. 不出所料啊
剩下40个数据我一个，一个，录入{} 里，啊啊啊！！

我地个老哥啊，不仅 innerText->HTML 了，<input/> 和<label for>写得也挺6的，你说为什么要弄 moveTo&lineTo 这种魔怔默认名啊，专用就别默认好吧..
他没有心啊…… 一个列表不严谨到有3种顺序，container+#menu 一个 mainjs 定义一个 [] 组一个全靠#id对应，我tm..IDEA都救不了，LLVM AST matcher 也不行
总共多余的代码都够写这个 https://codepen.io/jakealbaugh/pen/qNrZyw 和弦生成了！

看到new WebAudio 就想到Blender 着色器节点，节点能不能表达为 `f(a,f1(b))` 的形式呢？即便无关执行序(新旧值问题)，不行，因为f1的输出可复制多个
SSA单赋值正是带执行序的 Node图，只是节点图里变量都是靠连接表示，而程序变量是有时序指代的，例如 a=1; if(q)a=a+1; f(a) 间这个a就是运行时不同，在LLIR里 c=phi a,a1 就是把来自不同前BB(if,.)的计算整合，当然你也可以直接store&load，就没有SSA问题了；IR form也就是为便于优化，现在在函头alloca mem2reg就成。
见 https://www.zhihu.com/question/24992774


GL提供了vecN (xyzw/rgba/stpq 来引用/自由重组均可;可iub前缀表示类型)和matNxM (m[i<N][j<M])以及 texture(sampler2D,xy) ，支持严格 int/float percision ，支持struct和传统C的控制流及GL特有 cube/shadow，代码的特性由 compile 环境/GL驱动决定(比如GLES就不支持break,许多不能?:和%=mod,**=pow)。SL能计算frag颜色和geom顶点，对应渲染和物理计算(一个很草的事实是，基于GL计算的渲染引擎在CG界遍地开花，各有各好)

SL是没helloworld却有计算力的语言，和CSS一样，明明print都写不了却能定义动画
尽管SL能保持个buffer-state，不要尝试只用SL完成一个功能机械的app，不然就太丑了。SL适合写动态壁纸和滤镜类的东西

除了社区不重视代码质量(冗长或空语义的极端,如uv=uniform=readonly graph-arg)、场景与渲染不切分、和复用/可配置力问题、shader含字符位图硬编码(GLSL不擅长的用途)等人的问题，也关于计算领域

为什么GLSL看起来和C很不同？不谈多out 函数和内部gl_物理变量，显卡的计算和CPU的单线模式差异很大。比如画个圆吧，g.arc(x,y,l, 0,2PI);g.fill() 后它就出现在画布(或用SDL/VGA)上了，因为这里有个“显示缓冲”位图的概念，所有图形存留在这里直到clear-SwapBuffers(一个冷知识,glFinish计数比FPS适合图形学跑分用)，画圆可以迭代xy=(sint,cost) t=0~2PI 来累积圆上点，这个过程是线性的，多核CPU一次能画几个?尽管能LUT(查表)优化、能模拟Vec来复用同半径的结果，一次也只能画一个。对于几万个粒子来说就更鸡肋了，因为执行顺序根本对时差更新/绘制结果毫无帮助，你逐个往画布叠对N叉 tree 好用，可对数学分形 还不如把“端点迭代”完全打散，越散越适合GPU计算。

显卡计算是没有顺序和“整体图像”的，几何都必须能按xy-颜色来“绘图”，因此着色器和 Painter 完全是两种东西，当然也有办法把arc(x,y,l)->float 尖锐clamp 封装成函数，并且用数学方法mix()

#define v1 float
v1 circle(vec2 P, vec2 p, v1 l) {
  v1 d = length(P - p) - l;
  return 1.-clamp(d, 0.,1.);
}
void mainImage(out vec4 bg, vec2 P){vec2 L=iResolution.xy, p=P/L;
  vec3 c = 0.5 + 0.5*cos(iTime+p.xyx+vec3(0,2,4));
  bg=vec4(mix(c, vec3(.87,.37,.23), circle(P, L/2., L.y*.3 ) ) ,1);//试给圆半径 *mod(iTime,1.)
}
矩形xywh也可用类似手段。不过shader里这些形状不是必需品(paint里确实是)

数学应用相关命名随意已经是普遍现象了，
“ s一般用来代表一个"scalar"(标量)。所以是一维数字。t是因为字母表s后面的字母。不能继续用u和v是因为uv已经被他们用来作计算用的坐标了。因此就用了向前的字母了。(strq)淡然，后来他们发现r与rgba的r冲突了，就用p替换了r。就是stpq了。
动画工具一般用t来表示时间的概念，所以就不用s和t来表示纹理的坐标了。因此，他们就用了u和v(UV贴图)，因为他们根本不关心相关的计算。
s和t的命名来自于对平面的描述：r=r0+sv+tw (r0是平面任意一点，vw是定义向量，st随选)
uniform 意义也非常迷，它的意思是CPU和GPU间统一，许多人拿 uvec,uv 简写这ND座标/颜色/etc.,但SL里真有uvec2的类型-照传统编程早该改了,SL界硬是成了传统，想学图形先换术语，脑子里没对应表100%看不懂

这是在GL(带一张 ShaderToy.com/new 贴图)显示 hello world

float l=.06;
void mainImage(out vec4 bg, vec2 P) {
int[] t = int[](72,69,76,76,79,32, 87,79,82,76,68,33);//"Hello World"
P = P/iResolution.y - .3/*为什么能调x位置?全屏试试*/; P.y += .05*sin(3.*P.x+iTime) -.4;

for(int i=0; i<int(iMouse.x*.02)%12;i++,P.x-=.1)if (length(P-l)<l)
if(false)bg+=vec4(1)/*<能解释了吗? .5调成1.试试?>*/;else bg+= texture(iChannel0, P*.5 + fract(vec2(t[i],15-t[i]/16)/16.)).x;
}

答案：P的0值是确定点，for(i)if() 是为确定当前P对应的t[i] 。 P*.5 是因为原图太小了——那为啥P/2 呢？不该是有t[i]的位图yx偏移就够在当前画字了？ 作为只懂g.fillText 的程序员不会考虑怎么从像素级别对应！ P缩小了，同高区间就只含低 texture 视口，于是贴图放大了！ 和数学函数缩放一样。类似写法在SL里很难规避，也没法文档

SL的逻辑不能用常规迭代/判断来解释，在进入图形学公式前，需要先习惯这种思维方式。许多程序员这辈子没机会，你看到了就是有本事。 所有平台,Web,Android,DX/Unity/Xorg 都支持OpenGL ，机器学习框架也开始GPU计算，不想黏合点特效装逼？看不出咋调参可不行！

你肯定会吐槽：逐点贴图？肯定很慢吧！ 其实GL是最快的图形方法了。计算量大但都易优化，它是很低层的绘制API，和各种层次的painter不在一条赛道
在迈向并发的时代，一头什么都会的牛和一大群只会+-*/的鸡 硬件选择发展后者，应用层各有各好，但在图形上答案显然还是简单的-简单比线性好

这是一个曼德博(朱丽亚)集的分形图，在SL上反而比在JS更合适，不需要手动迭代虚数P(x,y)

#define cxmul(a,b) vec2(a.x*b.x - a.y*b.y,  a.x*b.y+a.y*b.x)
#define R iResolution
//#define JulC vec2(.383,.13)
void mainImage(out vec4 bg, vec2 P){
  vec2 z,c = P/R.xy *4.-2.;  c.x=c.x* R.x/R.y +(.2-iMouse.x/R.x)*15.; c/=1.2+iMouse.y/R.y*20.; z=c;
#ifdef JulC
  c=JulC; //v 猜猜看，怎么调参数.
#endif
  float i=.0,N=abs(sin(iTime/32.0))*64.0, v;
  for(; length(z)<2. && i<N;i++)z =true? vec2(z.x*z.x-z.y*z.y, 2.*z.x*z.y)+c : cxmul(z,z) + c;
  v=i/N;
  bg = vec4(v,v,v,1);
}

这是一个”老相片“视频滤镜，展示了GL无所不能的inputs... ，猜猜它是怎么处理颜色的

void mainImage(out vec4 bg, vec2 P){
  vec2 p = P.xy / iResolution.xy;
  //p.y = 1.0 - p.y; // invert
  //p.x = 1.0 - p.x; // flip
  vec4 c = texture(iChannel0,p);
  float c0 = (c.r + c.g + c.b) / 3.0; // grayscale
  c.rgb *= abs(vec3(cos(c0),sin(c0),atan(c0) * sin(c0)) );
  bg = c;
}

ref:
https://zhuanlan.zhihu.com/p/32788146 Py julC
https://blog.csdn.net/cuckoo1/article/details/108083508 js分形
https://www.shadertoy.com/view/Wtt3Wl OTF bezier
https://www.shadertoy.com/view/XsyXzw 音乐粒子
https://www.shadertoy.com/view/7dKGDK 基础着色
https://www.cnblogs.com/chen9510/p/11447292.html UBuffer 跨着色器传递

samplerBuffer lut; texelFetch(lut, i);
var buf = GL.GenBuffers(1);
BufferTarget.TextureBuffer.let{T->GL.BindBuffer(T, GenBuffers(1));
GL.BufferData(T,sizeof(texData),texData,BufferUsageHint.DynamicRead) }
var handle = GL.GenTexture();
GL.BindTexture(TextureTarget.TextureBuffer, handle);
GL.TexBuffer(TextureBufferTarget.TextureBuffer, SizedInternalFormat.R16, buf);


import numpy as np
import matplotlib.pyplot as g
from scipy import signal as S, misc #sio: load/save/whos mat

im=misc.face(gray=Y)
w = np.zeros((50, 50))
w[0][0] = 1.0; w[49][25] = 1.0
g.imshow(S.fftconvolve(im,w) )

w=S.windows.gaussian(51, 10.0)
S.sepfir2d(im, w, w)

laplacian = np.array([[0,1,0], [1,-4,1], [0,1,0]], dtype=np.float32)
deriv2 = S.convolve2d(ck,laplacian,mode='same',boundary='symm')

derfilt = np.array([1.0, -2, 1.0], dtype=np.float32) #亦可
ck = S.cspline2d(image, 8.0)
deriv = (S.sepfir2d(ck, derfilt, [1]) +
         S.sepfir2d(ck, [1], derfilt))

fs = 10e3
N = 1e5
amp = 2*np.sqrt(2)
freq = 1270.0
noise_power = 0.001 * fs / 2
time = np.arange(N) / fs
x = amp*np.sin(2*np.pi*freq*time)
x += np.random.normal(scale=np.sqrt(noise_power), size=time.shape)
f, Pper_spec = signal.periodogram(x, fs, 'flattop', scaling='spectrum')
#f, Pwelch_spec = signal.welch(x, fs, scaling='spectrum')
plt.semilogy(f, Pper_spec) #grid  freq-PSD
#https://docs.scipy.org/doc/scipy/reference/tutorial/ndimage.html#interpolation-functions

#from os.path import dirname, join as pjoin
#pjoin(dirname(scipy.io.__file__), 'tests', 'data')
from pathlib import Path as P #有with_ 吼
from re import sub
readd={"test":P(scipy.io.__file__).parent/'tests'/'data'}
read=lambda f,fp:f.read(Path(sub(r'$(\w+)',lambda m:readd[m[1]], fp)) )

from scipy.io import *
npsec,s= read(wavfile,'$test-44100Hz-2ch-32bit-float-be.wav')
nChan,nSec= data.shape[:2]; nSec/=npsec
np.linspace(0., nSec,nChan)
for i in 0,1:g.plot(time, data[:, i], label=f"{'Left' if i==0 else 'Right'} channel") #Time-Amp


from pydub import AudioSegment as Seg
from pydub.playback import play #urllib.rfrom scipy import signal, misc
equest.urlretrieve
n=len;K=1000

s=Seg.from_wav("metallic-drums.wav")
def fade(s):
  s2=s*2;t=n(s2)/2
  return s2.fade_in(t).fade_out(t)
mix=lambda a,b: a[:n(b)].overlay(b)


s2.reverse().pan(-0.5).overlay(s2.pan(0.5))
sB.low_pass_filter(3*K).overlay(s2 - 3, loop=True) #export?

sT=Seg.silent(duration=0)
for n in range(15):
    sine  = Sine(200*n).to_audio_segment(duration=200).apply_gain(-3)
    sine = sine.fade_in(50).fade_out(100)
    sT+= sine

% BP filter with narrow pass band, Fc oscillates up and down the spectrum
% Difference equation taken from DAFX chapter 2

wahwah(sound, Fw, Fs)



% ! triangle wave of centre frequency values
f0=100;f1=6000
delta = Fw/Fs;
Fc=f0:delta:f1;
while(length(Fc) < length(sound) )
    Fc= [ Fc (f1:-delta:f0) ];
    Fc= [ Fc (f0:delta:f1) ];
end

% trim tri wave to size of input
Fc = Fc(1:length(sound));
F1 = 2*sin((pi*Fc(1))/Fs);  % must be recalculated each time Fc changes
Q1 = .5;                % this dictates size of the pass bands


yh=zeros(size(sound));          % create emptly out vectors
yb=zeros(size(sound));
yl=zeros(size(sound));

% first sample, to avoid referencing of negative signals
yh(1) = sound(1);
yb(1) = F1*yh(1);
yl(1) = F1*yb(1);

% apply difference equation to the sample
for n=2:length(sound),

    yh(n) = sound(n) - yl(n-1) - Q1*yb(n-1);
    yb(n) = F1*yh(n) + yb(n-1);
    yl(n) = F1*yb(n) + yl(n-1);


    F1 = 2*sin((pi*Fc(n))/Fs);
end

%normalise
maxyb = max(abs(yb));
yb = yb/maxyb;


https://learnopengl-cn.github.io/  如gl_FrontFacing
https://www.w3cschool.cn/webgl/pezm1oh5.html
https://zhuanlan.zhihu.com/p/349296191 函数表 https://blog.csdn.net/jeffasd/article/details/78209965

vec3 rgb(float r, float g, float b) {
	return vec3(r / 255.0, g / 255.0, b / 255.0);
}

vec4 circle(vec2 p, vec2 P, float l, vec3 bg) {
	float d = length(P - p) - l;
	float t = clamp(d, 0.,1.);
	return vec4(bg, 1.-t);
}

void mainImage(out vec4 bg, in vec2 a) {
	vec2 center = iResolution.xy * 0.5;
	float l = 0.25 * iResolution.y;

	// Circle
	vec4 obj = circle(a.xy, center, l, rgb(225.0, 95.0, 60.0)),
    back=vec4(rgb(210.0, 222.0, 228.0),1);

	// Blend the two
	bg = mix(back, obj, obj.a);
}
void mainImage( out vec4 bg, vec2 P)
{
    int bl = int(P.x) ^ int(P.y);
	bg =true? vec4( int(P) & int(P.y) ) / 256.: vec4(vec3(float(bl/iFrame)),1.0); //vec4( ( int(U.x) ^ int(U.y) ) / iFrame)
}
void mainImage( out vec4 o, vec2 p ){//圆角
  vec2  c = iResolution.xy/2.;
  float r = 64., f = length(max(abs(p-c)-c+r,0.))-r; //length(max(abs(p)-border+r,0.0))-r;
  o = vec4(f,1.,f,1.);
}
void mainImage( out vec4 o, in vec2 p ){//次方曲线
p=p/iResolution.xy-.5;
o += pow(p.x,8.) + pow(p.y,8.) < pow(.5,8.)?vec4(1.,.3,.3,1.):vec4(1.);
}
void mainImage(out vec4 O, vec2 u) { //ploar 3b
    vec2 U = u+u - iResolution.xy;
    float T = 6.2832, l = length(U) / 30., L = ceil(l) * 6.,
          a = atan(U.x,U.y) - iTime * 2.*(fract(1e4*sin(L))-.5);
    O = .6 + .4* cos( floor(fract(a/T)*L) + vec4(0,23,21,0) )
        - max(0., 9.* max( cos(T*l), cos(a*L) ) - 8. ); }
void mainImage(out vec4 bg,vec2 P) { //invaders
	vec2 t=iDate.wx,d=P.xy/iResolution.y-.8-cos(t);
	int y=int(mod(21./length(d)+20.*t,8.));
	bg = cos(vec4(y-3,d,1))*dot(d,d)*
		floor(mod((y>3?3555253400109056.:56869384.)
		/exp2(float(y*7)+floor(abs(mod(20.*(atan(d.x,d.y)+t.x),14.)-7.))),2.));
void mainImage( out vec4 z, in vec2 w ) { //MC
    vec3 d = vec3(w,1)/iResolution-.5, p, c, f, g=d, o, y=vec3(1,2,0);
 	o.y = 3.*cos((o.x=.3)*(o.z=iDate.w));

    for( float i=.0; i<9.; i+=.01 ) {
        f = fract(c = o += d*i*.01), p = floor( c )*.3;
        if( cos(p.z) + sin(p.x) > ++p.y ) {
	    	g = (f.y-.04*cos((c.x+c.z)*40.)>.8?y:f.y*y.yxz) / i;
            break;
        }
    }
    z.xyz = g;
}
// Created by Reinder Nijhoff 2015
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// @reindernijhoff
//
// Based on https://www.shadertoy.com/view/4ls3D4 [Dearly horz apart clouds] by Dave_Hoskins

#define n b = .5*(b + texture(iChannel0, (c.xy + vec2(37, 17) * floor(c.z)) / 256.).x); c *= .4;

void mainImage( out vec4 f, in vec2 w ) {
    vec3 p = vec3(w.xy / iResolution.xy - .5, .2),
	d = p, a = p, b = p-p, c;

    for(int i = 0; i<99; i++) {
        c = p; c.z += iTime * 5.;
        n n n
        a += (1. - a) * b.x * abs(p.y) / 4e2;
        p += d;
    }
    f = vec4(1. - a*a,1);
}
// New WebGL 2 version (252 chars)
//by iq/2015
#define t texture(iChannel0,p*.1,3.
void mainImage( out vec4 f, in vec2 p )
{
    vec4 q = p.xyxy/iResolution.y - .5, c=q-q;

    p.y = atan( q.x, q.y );

    for( float s=0.; s<.1; s+=.01 )
    {
        float x = length( q.xy ), z = 1.;

        for( ; z>0. && t).x<z ; z-=.01 )
            p.x = iTime*3. + s + 1./(x+x*z);

        f = c += t*x)*z*x*.2;
    }
}
void mainImage(out vec4 f, in vec2 w ) { //montains
    vec3 d = vec3(w.xy,1)/iResolution-.5, p=d-d, o=d;
 	o.z+=iTime*4.;
    float i=.0;
    for( ; i<9. && cos(p.z) - abs(sin(p.x*.7+cos(p.z))) < ++p.y ; i+=.01 )
        p = (o += d*i*.05)*.3;
    f.rgb = mix( (3.+p.y) * vec3(.6,.3,0), d, i/9.);
}



void mainImage( out vec4 f, in vec2 c ) {
    vec2 r = iResolution.xy / 2.,
    p = c - r;
	f = vec4(48./85.);
    if (max(abs(p.x),abs(p.y)) <= .25*r.x) f = vec4(1,1,0,1);
}
#define v1 float
v1 lStep=0.3;int nLine=10;

//Function to draw a line, taken from the watch shader
v1 line(vec2 p, vec2 a, vec2 b, v1 thickness ){
	vec2 pa = p - a, ba = b - a;
	v1 h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
	return 1.0 - smoothstep(thickness * 0.8, thickness * 1.2, length(pa - ba * h));
}

void mainImage(out vec4 bg, vec2 P){
	vec2 uv = (P.xy / iResolution.xy) * 2.0 - 1.0;

	// convert the input coordinates by a cosinus
	// kWarp is the frequency
	v1 kWarp = (3.0 + 2.5 * sin(iTime * 0.15)),qWarp = smoothstep(-0.5, 1.3, -sin(iTime * 0.23));
	vec2 warped = sin(uv * 6.28318530718 * kWarp);

	// dont go all the way to the warp effect
	uv = mix(uv, warped, qWarp);

	// Variate the thickness of the lines
	v1 thickness = pow(4.0 - 2.5 * cos(iTime * 0.067), 2.0) / iResolution.x;
	thickness *= 1.0 + (kWarp * qWarp);
	v1 l = floor(iTime * 15.0) * lStep;

	// Add 10 lines to the pixel
	vec4 fg = vec4(0.0, 0.0, 0.0, 1.0);
	for (int i = 0; i < nLine; i++,l += lStep){
		//Calculate the next two points
		vec2 p1 = vec2(sin(l * 0.39), cos(l * 0.63)),
         p2 = vec2(cos(l * 0.69), sin(l * 0.29));
		// Fade older lines
		fg.rgb = 0.95 * fg.rgb;
		// Add new line
		fg.rgb += line(	uv, p1, p2, thickness)//With fg
					* ( 0.3+0.3 * vec3(	sin(l * 3.13),sin(l * 1.69),sin(l * 2.67)) );
	}

	bg = clamp(fg, 0.0, 1.0);// Clamp oversaturation
}
float C,S, l, r = .35; vec2 c = vec2(.5); //tag=circle
#define t iTime
#define R  mat2(C=cos(t),S=sin(t),-S,C)
float P (vec2 u, vec2 c, float w) {
    l = length(c-=u);
	c = sin(c/l*5.+t*2.)/100.;
    c = smoothstep(r, r+w, l+c.y-c.x+vec2(w,0));
    return c.x-c.y;
}

void mainImage( out vec4 o, vec2 u )
{
	u /= iResolution.xy;  u.x = u.x*1.5 - .25;
    o =   P(u,c, .01) + P(u,c,  .1 ) * vec4(c=R*u, .7-c.y*c.x, 1) ;
}

void mainImage(out vec4 bg, vec2 P){
  //Iterate though 400 points and add to bg.
  for(float i=-1.; i<1.; i+=6e-3){
    vec2 L = iResolution.xy,
    p = cos(i*4e2+iTime+vec2(0,11))*sqrt(1.-i*i);  //Rotate and scale xy coordinates.
    bg += (cos(i+vec4(0,2,4,6))+1.)*(1.-p.y) /      //Color and brightness.
    dot(p=(P+P-L)/L.y+vec2(p.x,i)/(p.y+2.),p)/3e4; //Project light point.
  }
}
#define B(v) O += vec4(v,1) *(1.-O.a) //
#define N texture(iChannel0//
#define T(P) N,(P+N,P+P+t*.2).xyz *.04 ) / 2.//

#define M(P) max(0.,  T(P)).r                      \
                    * T(P)/vec3(2,1,2)).g *.9      \
                    + .1*pow(T(P)*5.1).a,2.) -.3 ) \
           * sqrt( P-.1 ).z*3.6

void mainImage(out vec4 O, vec2 u) //@Xor 云
{
    float t = .03*iTime, I = .2, a,b ;

    vec3 D = vec3(u/iResolution.y-.5,1),
         P = D-D; P.y = t;

    for( O-=O; I<.5; I+=.01 )
        a = M(P+D*I),
        b = M(P+D*I+vec3(6,2,8)/1e3), // Light
        B(  .6 + vec3(.6,.5,.4)* ( exp(-b/.1)-a ) ) *a,
        O.a>.99 ? I++ : I;

	B( vec3(.5,.7,.9) -D.y*.4 );
}
void mainImage(out vec4 O, vec2 I)
{//漩涡 https://www.shadertoy.com/view/NscXR8
    vec3 p=iResolution,d = -.5*vec3(I+I-p.xy,p)/p.x,c = d-d, i=c;
    for(;i.x<1.;c += length(sin(p.yx)+cos(p.xz+iTime))*d)
        p = c,
        p.z -= iTime+(i.x+=.01),
        p.xy *= mat2(sin((p.z*=.1)+vec4(0,11,33,0)));
    O = vec4(10,0,2.5,9)/length(c);
}

vec3 hsv2rgb (in vec3 hsv) {
    return hsv.z * (1.0 + 0.5 * hsv.y * (cos (6.2832 * (hsv.x + vec3 (0.0, 0.6667, 0.3333))) - 1.0));
}


if (abs(fragCoord.x) < 0.96) {
    drawLetter(fragColor, mod(fragCoord, vec2(0.19 , 0.25)) + vec2(0.0, 0.09), vec2(0.1, 0.2), vec2(0.35), 57);
}//paper plane

https://shadertoyunofficial.wordpress.com/2017/11/11/playable-games-in-shadertoy/
https://www.shadertoy.com/view/lssGW4 共享out的pong
https://www.shadertoy.com/view/Msj3zD 注释好。会模拟之前几帧的mario.y ，能在不保留buf的前提下跳跃. marioYSpd -= 2.5; 鬼畜..
https://www.shadertoy.com/view/Ws2GD1 Buf A计算,B渲染, Main 特效(origcol)
https://www.shadertoy.com/view/4sGSDw ABbuf粒子流体
https://www.shadertoy.com/view/Ms2SD1 程序海面/L200
https://www.shadertoy.com/view/4ts3z2 雾声音 L250
https://www.shadertoy.com/view/ldXXDj L200 doc
https://www.shadertoy.com/view/XslGRr 云阳raymarch /200 https://www.shadertoy.com/view/3syfRd 仅云/160 https://www.shadertoy.com/view/ll3SWl 亮色/90 https://www.shadertoy.com/view/llXSW2 /200
https://www.shadertoy.com/view/3l23Rh 体积雾龙卷/160 https://www.shadertoy.com/view/lsySzd 火云/281 https://www.shadertoy.com/view/4lfSzs 小云/100
https://www.shadertoy.com/view/4slGz4 @iq sound/100 link2doc graphtool.com
https://www.shadertoy.com/view/ftVXDD 157 https://www.shadertoy.com/view/Xsd3R2 /120 sound https://www.shadertoy.com/view/Mt3GWs 235 https://www.shadertoy.com/view/4ttGDH 200 (fun Noise Contour, blog http://candycat1992.github.io/)
https://www.shadertoy.com/view/wd33zl glass
https://www.shadertoy.com/view/fslyW4 黄金比例/100
https://www.shadertoy.com/view/fsXcRS 分形绳子/150
https://www.shadertoy.com/view/wl2SzR 彩绳子/30
https://www.shadertoy.com/view/4ljGD1 音乐线
https://www.shadertoy.com/view/7lKSWW 万花筒/300
https://www.shadertoy.com/view/lddGWl 海/60
https://www.shadertoy.com/view/4dccR4 棱镜光/60
https://www.shadertoy.com/view/MsVfWy 星辰/120 https://www.shadertoy.com/view/ttlfRM 泡泡/80 彩幕/31 https://www.shadertoy.com/view/lscBRf 雨滴/50 https://www.shadertoy.com/view/MlfBWr 瀑布/10 https://www.shadertoy.com/view/4dXSzB https://www.shadertoy.com/view/4ltSRS 烟雾 雪/10 https://www.shadertoy.com/view/Ml3SRs
https://www.shadertoy.com/view/3dVXDc 烟雾/100 https://www.shadertoy.com/results?query=Gradient&sort=popular&from=60&num=12
https://www.shadertoy.com/view/ldd3DB Fish/200
https://www.shadertoy.com/view/lsXcWn Emoji 圆 doc
https://www.shadertoy.com/results?query=tag%3Dscreensaver
https://www.shadertoy.com/view/MsVfz1 /Hex Glow,Week
https://www.shadertoy.com/view/tsV3Rw bluesketch VFX
https://www.shadertoy.com/view/7tcGWB Octgon
https://www.shadertoy.com/view/Nt23Ry firefly 47
https://www.shadertoy.com/view/XsfGRn 多项式平滑心/50
https://www.shadertoy.com/view/ttlyWB Underwater 200
https://www.shadertoy.com/view/XtdyW2 noiser(fun ) L150
https://www.shadertoy.com/view/fdV3Dw trace::accum
https://www.shadertoy.com/view/4sfGDB smallPT 光追
https://www.shadertoy.com/view/Xtl3W2 audio noise ball
https://www.shadertoy.com/view/ft2XWh line2d fixed-point
https://www.shadertoy.com/view/MlGSzW 白盒球/200
https://www.shadertoy.com/view/ss3SD8 光泽/200
https://www.shadertoy.com/view/tsXBzS 三角多形SDF/80
https://www.shadertoy.com/view/3scfD7 快速海/200
https://www.shadertoy.com/view/wldBRf 洋面/180 https://www.shadertoy.com/view/3dKyDK 小/20
https://www.shadertoy.com/view/NdKSWW 玻璃DoF/90
https://www.shadertoy.com/view/MsG3Dz DoF光泽球/200
https://www.shadertoy.com/view/MlK3R3 DoF原子/200
https://www.shadertoy.com/view/XtyGWD 透明酒杯 /带框架
https://www.shadertoy.com/view/MddGWB 位图SSAO/60
https://www.shadertoy.com/view/lljfW1 https://www.shadertoy.com/view/llsXD2 洋面
https://www.shadertoy.com/view/4d2BRz 海景 https://www.shadertoy.com/view/4dl3zr 日出
https://www.shadertoy.com/view/lsXcz8 细日出
https://www.shadertoy.com/view/XtBXW3 激光
https://www.shadertoy.com/view/4sy3W3 JFA拼贴画
https://www.shadertoy.com/view/MslSDN 茶壶形变/160
https://www.shadertoy.com/view/4dcGW2 粘菌照亮/160
https://www.shadertoy.com/view/WdVXWy 金属流体/170 https://www.shadertoy.com/view/MlS3Rh 色流/80
https://www.shadertoy.com/view/4syGW1 Ant迷宫搜索的树同类
https://www.shadertoy.com/view/wslcWf 四分树搜索 https://www.shadertoy.com/view/3dBGzt kD树色聚类
https://www.shadertoy.com/results?query=tag=filter&sort=popular&from=156&num=12 2x放大和亮点滤镜,detrend动画
https://www.shadertoy.com/results?query=tag=effect&sort=popular&from=36&num=12 草稿线等滤镜
https://www.shadertoy.com/view/3lsSzf Audiotool.com ..梦幻联动

https://www.shadertoy.com/view/llccD2 塔
https://www.shadertoy.com/view/wsGfD1 https://www.shadertoy.com/view/XsccDl https://www.shadertoy.com/view/4sScRV 入门累积和矩形模式
https://www.shadertoy.com/view/tlfXzB ASCII https://www.shadertoy.com/view/4sf3W8 https://www.shadertoy.com/view/ll2Xzm Sobel Emboss 滤镜tag=effect https://www.shadertoy.com/view/XtVcWc 滤波引用
https://www.shadertoy.com/view/3dVczw 30 cubemap 和 GPU sound
https://www.shadertoy.com/view/4tl3RM 鸟叫！
https://www.shadertoy.com/view/ltjGDd 200光追球
https://www.shadertoy.com/view/MtGSWc 200 Hex 电音

https://www.shadertoy.com/view/4ddXRN https://www.shadertoy.com/view/4d3fD7 Snoise粒子
https://www.shadertoy.com/results?query=tag=distance&sort=popular&from=48&num=12 Bezier
https://www.shadertoy.com/view/NlV3Dt Fake3D DoF

star: fova L73 Phantom L73 Nest L63(fun play) Main(L70,sound) River/L1k
volume: Enscape3d.com 600(render) Protean 140
plasma: Globe 200 attic HIT(mosterBox
ray:Oceanic 300 week Dream 100 goodrays 70
integer:

https://www.shadertoy.com/view/7dtXDs

vec2 uv=xy;
float time=iTime,i0,i1,i2,i4;
for (int s = 0; s < 7; s++) {
vec2 r;
r = vec2(cos(uv.y * i0 - i4 + time / i1), sin(uv.x * i0 - i4 + time / i1)) / i2;
r += vec2(-r.y, r.x) * 0.3;
uv.xy += r;

i0 *= 1.93;
i1 *= 1.15;
i2 *= 1.7;
i4 += 0.05 + 0.1 * time * i1;
}
col.xy=uv;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = -1.0 + 2.0 * fragCoord.xy / iResolution.xy;

// main code, *original shader by: 'Plasma' by Viktor Korsun (2011)
float x = p.x;
float y = p.y;
float mov0 = x+y+cos(sin(iTime)*2.0)*100.+sin(x/100.)*1000.;
float mov1 = y / 0.9 +  iTime;
float mov2 = x / 0.2;
float c1 = abs(sin(mov1+iTime)/2.+mov2/2.-mov1-mov2+iTime);
float c2 = abs(sin(c1+sin(mov0/1000.+iTime)+sin(y/40.+iTime)+sin((x+y)/100.)*3.));
float c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(x/1000.)));
fragColor = vec4(c1,c2,c3,1);
}
const float PI = 3.14159265;//BI
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
float time = iTime *0.2;

    float color1, color2, color;

	color1 = (sin(dot(fragCoord.xy,vec2(sin(time*3.0),cos(time*3.0)))*0.02+time*3.0)+1.0)/2.0;

	vec2 center = vec2(640.0/2.0, 360.0/2.0) + vec2(640.0/2.0*sin(-time*3.0),360.0/2.0*cos(-time*3.0));

	color2 = (cos(length(fragCoord.xy - center)*0.03)+1.0)/2.0;

	color = (color1+ color2)/2.0;

	float red	= (cos(PI*color/0.5+time*3.0)+1.0)/2.0;
	float green	= (sin(PI*color/0.5+time*3.0)+1.0)/2.0;
	float blue	= (sin(+time*3.0)+1.0)/2.0;

    fragColor = vec4(red, green, blue, 1.0);
}

float height(in vec2 uv) {//纹理漩涡
    return texture(iChannel0,uv).b*texture(iChannel1,uv+vec2(0.0,iTime*0.1)).b;
}

const vec2 NE = vec2(0.05,0.0);
vec3 normal(in vec2 uv) {
    return normalize(vec3(height(uv+NE.xy)-height(uv-NE.xy),
                          0.0,
                          height(uv+NE.yx)-height(uv-NE.yx)));
}


const vec4 waterColor = vec4(0.1,0.1,0.32,1.0);
vec3 lightDir = normalize(vec3(10.0,15.0,5.0));


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 uv = fragCoord.xy/iResolution.xy-vec2(.5);
    uv.y *= iResolution.y/iResolution.x;
    //uv *= 3.;

    float dist = length(uv);
    float angle = atan(uv.y,uv.x);

    vec2 ruv = uv;
    uv = vec2(cos(angle+dist*3.),dist+(iTime*0.2));

    float h = height(uv);
    vec3 norm = normal(uv);
	fragColor =
        mix(vec4(0.), mix(mix(waterColor+waterColor*max(0.0,dot(lightDir,norm))*0.1,
        texture(iChannel0,uv),0.2),
                       texture(iChannel0,norm.xz*0.5+0.5),0.3),min(1.,length(ruv)*10.));
}

        float r=50.;
#define Sa(x)smoothstep(0.,1.,x)
//hash 伪随机
float rand(vec2 p){return fract(cos(p.x * (12.9898) + p.y * (4.1414)) * 43758.5453);}
float noise(vec2 P){
vec2 p = floor(P), // 小组的编号
I = fract(P), // 像素在小组内xy方向的权值
s=Sa(I);
return
mix(
mix(rand(p), rand(p-vec2(1.,0.)), s.x) // 第一次的x方向插值
,
mix(rand(p-vec2(0.,1.)), rand(p-vec2(1.,1.)), s.x) // 第二次的x方向插值
,s.y); // 最后的y方向插值
}
float fbm(vec2 P){
float g,i;
for (i = 0.; i < 4.; i++)g+=noise(P*pow(2.,i)) * pow(.5,i); // 4个函数叠加
return g; // 频率乘以2；幅度(初1)乘以二分之一
}

void mainImage(out vec4 bg,vec2 P){P=P/r;
float t=iTime/1.5,
a = fbm(P-vec2(sin(t*3.)*5.,t*10.)), //调整火焰层位置
b = fbm(P-t*6.),
cc = fbm(P-vec2(1.-sin(t*4.)*5.,t*8.));
vec3[] c = vec3[](vec3(1.0, 0.9, 0.0),vec3(1.0, 0.0, 0.0),
vec3(0.0, 0.0, 0.0),
vec3(0.2, 0.2, 0.2),
vec3(0.0, 0.0, 0.6),
vec3(0.0, 0.6, 0.0));
bg = vec4(mix(c[1], c[0], a) + mix(c[2], c[3], b) - mix(c[4],c[5], cc), 1.0);

//bg=vec4(fbm(P));
}

// Voro noise emerges naturally. Its like perlin noise a bit, but within a jittered
// grid like voronoi):
// end as a shading TD you just want one or another depending of the type of visual
// features you are looking for, I cant see a blending being needed in real life.
// cellnoise(x) = pattern(0,0,x)
// perlin(x) = pattern(0,1,x)
// voronoi(x) = pattern(1,0,x)
// voronoise(x) = pattern(1,1,x)
vec3 hash3(vec2 p){
return fract(sin(
vec3( dot(p,vec2(127.1,311.7)),
dot(p,vec2(269.5,183.3)),
dot(p,vec2(419.2,371.9)) )
)*43758.5453);
}
#define for(i,n)for(i=0;i<n;i++)
float voronoise(vec2 p, vec2 d){
vec2 a,P;
int y,x;for(y,4)for(x,4){P = vec2(x-2, y-2);

vec3 o = hash3(P+floor(p))*vec3(d.x,d.x,1.0);
float k = 1.0+63.0*pow(1.0-d.y,6.0),
w = pow( 1.0-smoothstep(0.0,1.414,length(P - fract(p) + o.xy)), k );
a += vec2(o.z*w,w);
}

return a.x/a.y;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord / iResolution.xx,

	p = vec2(0.0,1.0) + vec2(1.0,-1.0)*iMouse.xy/iResolution.xy;

	int i;for(i,3)p = p*p*(3.0-2.0*p);
	float f = voronoise( 24.0*uv, p);

	fragColor = vec4( f, f, f, 1.0 );
}

// simple sobel edge detection
float gx=0.,gy=0.; int i,
Sbx[]=int[](1,2,1,0,0,0,-1,2,-1),//(-1,-2,-1,0,0,0,1,2,1),
Sby[]=int[](-1,0,-1,-2,0,-2,-1,0,-1); //(-1,0,-1,-2,0,-2,-1,0,-1);
#define Conv(g,S)for(i=0;i<3*3;i++)g+=v1(S[i])*lumAt(P+vec2(v1(i%3-1),v1(i/3-1)) );
//Conv(gx,Sbx)Conv(gy,Sby)
#define k(x,y,P,a) v1(a)*lumAt(P+vec2(v1(x),v1(y)))
gx=k(-1,-1, P,1) + k( 0,-1, P,2)
+k( 1,-1, P,1) + k(-1, 1, P,-1)
+k( 0, 1, P,-2) + k( 1, 1, P,-1);
gy=k(-1,-1, P,1) + k(-1, 0, P,2)
+k(-1, 1, P,1) + k( 1,-1, P,-1)
+k( 1, 0, P,-2) + k( 1, 1, P,-1);

// 'Warp Speed' by David Hoskins 2013.
// I tried to find gaps and variation in the star cloud for a feeling of structure.
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float time = (iTime+29.) * 60.0;

    float s = 0.0, v = 0.0;
    vec2 uv = (-iResolution.xy + 2.0 * fragCoord ) / iResolution.y;
	float t = time*0.005;
	uv.x += sin(t) * 0.5;
	float si = sin(t + 2.17); // ...Squiffy rotation matrix!
	float co = cos(t);
	uv *= mat2(co, si, -si, co);
	vec3 col = vec3(0.0);
	vec3 init = vec3(0.25, 0.25 + sin(time * 0.001) * 0.4, floor(time) * 0.0008);
	for (int r = 0; r < 100; r++)
	{
		vec3 p = init + s * vec3(uv, 0.143);
		p.z = mod(p.z, 2.0);
		for (int i=0; i < 10; i++)	p = abs(p * 2.04) / dot(p, p) - 0.75;
		v += length(p * p) * smoothstep(0.0, 0.5, 0.9 - s) * .002;
		// Get a purple and cyan effect by biasing the RGB in different ways...
		col +=  vec3(v * 0.8, 1.1 - s * 0.5, .7 + v * 0.5) * v * 0.013;
		s += .01;
	}
	fragColor = vec4(col, 1.0);
}
vec2 mainSound( in int samp, float time )
{
    // A 440 Hz wave that attenuates quickly overt time
    return vec2( sin(6.2831*440.0*time)*exp(-3.0*mod(time, .5)) );
}

void mainImage( out vec4 f, in vec2 p ) //by iq. Mandelbrot
{
    p = vec2(-.745,.186) + 3.*(p/iResolution.y-.5)*pow(.01,1.+cos(.2*iTime));

    float n = 0.;
    vec2 z = p*n;

    for( ; n<128. && dot(z,z)<1e4; n++ )//ie3=999
        z = vec2( z.x*z.x - z.y*z.y, 2.*z.x*z.y ) + p;

    f = .5 + .5*cos( vec4(3,4,11,0) + .05*(n - log2(log2(dot(z,z)))) );
}

#define A(i)vec2(4*(T[i]&63)-120,3*(T[i]>>6)-40)-q
#define G(a) for (int i = 0; i < a; i++)
#define U(a, b)(a.x *b.y - b.x * a.y)
/*License Creative Commons       teapot golfed */
/*Attribution - Non Commercial    */
/*ShareAlike3.0 UnportedLicense.  */
#define N normalize
#define W vec3
float K,a, t, z = 0.;
W P, O;
int[] T =
    int[](30, 46, 110, 242, 690, 1074, 1966, 2029, 1964, 2092, 2209, 2270, 2466,
          2595, 2590, 1743, 1793, 1345, 896, 652, 2107, 1976, 1591, 1077, 944);
float B(int i) {
  vec2 q = P.xy, m = A(i), n = A(i + 1), o = A(i + 2);
  float x = .5 * U(o, m), y = U(n, o), z = U(m, n);
  q = m * (x + y) + n * (z - y) - o * (x + z);
  q.x = -q.x;
  m -= n += n - o;
  K = clamp(.5 * U((o + (y * z - x * x) * q.yx / dot(q, q)), m) /
                (x + x + y + z),
            0., 1.);
  return sqrt(dot(q = o + K * (n - o + K * m), q) + P * P).z;
}
float M(W p) {
  P = p + O;
  a = min(
      min(B(15), B(17)) - 6.,
      max(P.y - 50., min(abs(B(20) - 7.) - 1., B(22) * (.25 + .75 * K) - 8.)));
  P.xz /= N(P.xz);
  P.z = 0.;
  G(7) a = min(a, (B(i + i) - 2.) * .7);
  return a;
}
void mainImage(out vec4 o, vec2 p) {
  vec2 r = iResolution.xy;
  o = o - o + .8 - .3 * length(p = (p + p - r) / r.y);
  W Y = W(0, 1, 0),
    u = cross(O = N(W(cos(t = iTime), .6 - iMouse.y / r.y, sin(t))), Y),
    d = N(p.x * u + p.y * cross(u, O) - O - O), E = Y / 1e3, L = N(3. * Y + O);
  O *= 3e2;
  G(99 && z < 5e2) z += t = M(d * z);
  if (t < E.y) {
    O += z * d;
    u = N(W(M(E.yxx), M(E), M(E.xxy)) - M(E - E));
    z = .3;
    G(30) z = min(z, M(L * (t += 2.)) / t);
    o = mix(o,
            .4 * (Y * max(z + z, 0.) + Y).grbb +
                pow(max(dot(reflect(L, u), d), 0.), 1e3),
            -dot(u, d));
  }
}

#define L  *I ; o+= 2e-3 / length( clamp( dot(u-a,v=b-a)/dot(v,v), 0.,1.) *v - u+a )
#define P  ; c=r=I*r.yx; c.y=.7; b=c/=(4.+r.y) L;   b=a L;   a=c L;  a=c;

void mainImage(out vec4 o, vec2 v){ //cube, (fun quadtree)
	vec2 I=vec2(1,-1), a,b,c=iResolution.xy,
         u = (v+v-c)/c.x,
         r = sin(iTime-.8*I);   // .8-.8*I == vec2(0,1.6)
    P  o-=o        // just to initialize a
	P P P P        // 4*3 segments
}

#define N(h) fract(sin(vec4(6,9,1,0)*h) * 9e2)
void mainImage(out vec4 o, vec2 U) { //fireworks[SH17a]
    vec2 u = U/iResolution.y;
    float e, d, i=-2.;
    for(vec4 p; i++<9.; d = floor(e = i*9.1+iTime),p = N(d)+.3, e -= d)
        for(d=0.; d++<50.;)
            o += p*(1.-e) / 1e3 / length(u-(p-e*(N(d*i)-.5)).xy);
    u.y<N(ceil(u.x*i+d+e)).x*.4 ? o-=o*u.y : o;}

void mainImage(out vec4 o,vec2 c) //drops
{
	vec2 u=c/iResolution.x*2.-1.,a=u-u;
    u/=(u.y+=.8)-1.;
    for(float i=0.;i++<65.;c=u-cos(vec2(919.,154.)*i)*4.+2.,a+=c/dot(c,c)*sin(20.*clamp(length(c)-mod(i*.12+iTime,3.),-.157,.157)))
		o=texture(iChannel0,vec3(a-u*6.,5.))*.7+texture(iChannel1,u)*.4;
}
void mainImage(out vec4 f,vec2 c)
{
    vec3  r = iResolution;
    vec2  a = c/r.y;
    vec2  p = a - r.xy * .5 / r.y;
    float l = length(p);
    float t = abs(sin(iTime));
    vec2  d = (p/l * 9.)*sin(l*60.-iTime*9.)*.01 * smoothstep(1., .4, l / t) * smoothstep(0.1, 1., l * t);
    f = texture(iChannel0, a + d) + pow(d.x * 12. + .5, 8.);
}

#define g texture(iChannel0,vec2(
void mainImage( out vec4 o, in vec2 f )//fireflies
{
    float t = iTime;
	vec2 uv = (f.xy / iResolution.x)-vec2(1.,.7);
    for (float i; i<140.; i++){
        o += vec4(g t/1999.+i/8.))*.2*smoothstep(.001*i,.002,(length(uv+g(t)*.005+i*.02,i*.1)).xy))));
    }
}

#define T texture(iChannel0,(s*p.zw+ceil(s*p.x))/2e2).y/(s+=s)*4.
void mainImage(out vec4 O,vec2 x){ // reinterpretation of @iq iconic clouds
    vec4 p,d=vec4(.8,0,x/iResolution.y-.8),c=vec4(.6,.7,d);
    O=c-d.w;
    for(float f,s,t=2e2+sin(dot(x,x));--t>0.;p=.05*t*d)
        p.xz+=iTime,
        s=2.,
        f=p.w+1.-T-T-T-T,
    	f<0.?O+=(O-1.-f*c.zyxw)*f*.4:O;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) //cartoon VFX
{
#define EPS 2.e-3
	vec2 uv = fragCoord.xy / iResolution.xy;
	uv.x = 1.-uv.x;
	vec2 uvx = uv+vec2(EPS,0.);
	vec2 uvy = uv+vec2(0.,EPS);

	vec2 ref = vec2(.5,.5);
	vec3 col0 = texture(iChannel0, ref).xyz;
	float lum0 = (col0.x+col0.y+col0.z)/3.;

	bool isin = (uv.x > .5+.5*sin(iTime));

	vec3 tex,texx,texy;
	vec2 grad; float g=1.;

	for (int i=0; i<30; i++)
	{
		tex = texture(iChannel0, uv).xyz;

		if (isin)
		{
			uvx = uv+vec2(EPS,0.);
			uvy = uv+vec2(0.,EPS);
		}
		texx = texture(iChannel0, uvx).xyz;
		texy = texture(iChannel0, uvy).xyz;
		grad  = vec2(texx.x-tex.x,texy.x-tex.x);
//		if (i==0) g = dot(grad,grad);

		uv    += EPS*grad;
		uvx.x += EPS*grad.x;
		uvy.y += EPS*grad.y;
	}

	vec3 col = texture(iChannel0, uv).xyz;
    vec3 m = vec3(.2,.1,.1);
	float lum = (col.x+col.y+col.z)/3.;
#if 1
	g = 4.*dot(grad,grad);
	g = pow(max(0.,1.-g),30.);
	g = clamp(g,0.,1.);
#endif
	col = g * col / pow(lum,.55);

	fragColor = vec4(col, 1.0);
}

// Raymarch Edge Detection by HLorenzi!
// Detects whether a ray that comes too close to a surface goes away.
#define EDGE_WIDTH 0.5
#define RAYMARCH_ITERATIONS 40
// Distance functions by www.iquilezles.org
float fSubtraction(float a, float b) {return max(-a,b);}
float fIntersection(float d1, float d2) {return max(d1,d2);}
void fUnion(inout float d1, float d2) {d1 = min(d1,d2);}
float pSphere(vec3 p, float s) {return length(p)-s;}
float pRoundBox(vec3 p, vec3 b, float r) {return length(max(abs(p)-b,0.0))-r;}
float pTorus(vec3 p, vec2 t) {vec2 q = vec2(length(p.xz)-t.x,p.y); return length(q)-t.y;}
float pCapsule(vec3 p, vec3 a, vec3 b, float r) {vec3 pa = p - a, ba = b - a;
	float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 ); return length( pa - ba*h ) - r;}

float distf(vec3 p)
{
	float d = 100000.0;

	fUnion(d, pRoundBox(vec3(0,0,10) + p, vec3(11,11,1), 1.0));
	fUnion(d, pRoundBox(vec3(0,0,-2) + p, vec3(5,5,12), 1.0));
	fUnion(d, pSphere(vec3(10,10,0) + p, 8.0));
	fUnion(d, pTorus(vec3(-10,-12,0) + p, vec2(9,5)));
	fUnion(d, pCapsule(p, vec3(-15,15,10), vec3(15,-15,-5), 1.5));
	fUnion(d, -pSphere(p, 80.0));

	return d;
}


vec4 raymarch(vec3 from, vec3 increment)
{
	const float maxDist = 200.0;
	const float minDist = 0.001;
	const int maxIter = RAYMARCH_ITERATIONS;

	float dist = 0.0;

	float lastDistEval = 1e10;
	float edge = 0.0;//not thick?

	for(int i = 0; i < maxIter; i++) {
		vec3 pos = (from + increment * dist);
		float distEval = distf(pos);

#ifdef TRADITIONAL
		if (distEval < minDist) {
			if (i > RAYMARCH_ITERATIONS - 5) edge = 0.0;break;
		}
#else
		if (lastDistEval < EDGE_WIDTH && distEval > lastDistEval + 0.001) {
			edge = 1.0;break;
		}
		if (distEval < minDist) break;
#endif

		dist += distEval;
		if (distEval < lastDistEval) lastDistEval = distEval;
	}

	return vec4(dist, 0.0, edge, 0);
}

vec4 getPixel(vec3 from, vec3 increment)
{
	vec4 c = raymarch(from, increment);
	return mix(vec4(1,1,1,1),vec4(0,0,0,1),c.z);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	// pixel position
	vec2 q = fragCoord.xy/iResolution.xy;
    vec2 p = -1.0+2.0*q;
	p.x *= -iResolution.x/iResolution.y;

	// mouse
    vec2 mo = iMouse.xy/iResolution.xy;
	vec2 m = iMouse.xy / iResolution.xy;
	if (iMouse.x == 0.0 && iMouse.y == 0.0) {
		m = vec2(iTime * 0.06 + 2.86, 0.38);
	}
	m = -1.0 + 2.0 * m;
	m *= vec2(4.0,-1.5);

	// camera position
	float dist = 50.0;
	vec3 ta = vec3(0,0,0);
	vec3 ro = vec3(cos(m.x) * cos(m.y) * dist, sin(m.x) * cos(m.y) * dist, sin(m.y) * dist);

	// camera direction
	vec3 cw = normalize( ta-ro );
	vec3 cp = vec3( 0.0, 0.0, 1.0 );
	vec3 cu = normalize( cross(cw,cp) );
	vec3 cv = normalize( cross(cu,cw) );
	vec3 rd = normalize( p.x*cu + p.y*cv + 2.5*cw );

	// calculate color
	vec4 col = getPixel(ro, rd);
	fragColor = col;
}}
vec4 circle(vec2 p, vec2 center, float radius)
{
	return mix(vec4(1,1,1,0), vec4(1,0,0,1), smoothstep(radius + 0.005, radius - 0.005, length(p - center)));
}

vec4 scene(vec2 uv, float t)
{
	return circle(uv, vec2(0, sin(t * 16.0) * (sin(t) * 0.5 + 0.5) * 0.5), 0.2);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 resol = iResolution.xy / vec2(6,1);
	vec2 coord = mod(fragCoord.xy, resol);
	float view = floor(fragCoord.x / resol.x);

	vec2 uv = coord / resol;
	uv = uv * 2.0 - vec2(1);
	uv.x *= resol.x / resol.y;

	fragColor = vec4(1,1,1,1);

	float frametime = (60. / (floor(view / 2.) + 1.));
	float time = floor((iTime + 3.) * frametime) / frametime;
	vec4 mainCol = scene(uv, time);

	vec4 blurCol = vec4(0,0,0,0);
	for(int i = 0; i < 32; i++)
	{
		if ((i < 8 || view >= 2.0) && (i < 16 || view >= 4.0))
		{
			blurCol += scene(uv, time - float(i) * (1. / 15. / 32.)); //old time
		}
	}
	blurCol /= pow(2., floor(view / 2.) + 3.);

	if (mod(view, 2.) == 0.)
		fragColor = mainCol;
	else
		fragColor = blurCol;

	if (iMouse.z > 0. && mod(view, 2.) == mod(floor(iMouse.z / resol.x), 2.))
		fragColor = vec4(0,0,0,1);
}

http://www.joshbarczak.com/blog/?p=787 Raytrace packet
https://www.shadertoy.com/view/XlGcRh GL hash visual
https://www.shadertoy.com/view/WdB3Dw Toruus
https://www.shadertoy.com/view/XltSWj# 4D noise
https://zhuanlan.zhihu.com/p/358436777 GLSL2Unity
https://zhuanlan.zhihu.com/p/52807564 GLSL入门

https://www.shadertoy.com/view/4sjGWw 3D基本形状
https://www.shadertoy.com/view/wdffWj 蒙特卡罗渲染
https://www.shadertoy.com/view/ldXBzH 声音 (fun trace)
https://www.shadertoy.com/view/ttlyDX text
https://www.shadertoy.com/view/XsycRw 波
https://www.shadertoy.com/view/MltXz2 分形

https://www.shadertoy.com/view/XlBXRh wave grid
https://www.shadertoy.com/view/WlccWN inference
https://www.shadertoy.com/view/llc3zH 波?反射
https://www.shadertoy.com/view/ssG3Wt 海波/600
https://www.shadertoy.com/view/MlByW3 金属黏/500
https://www.shadertoy.com/view/XsS3Dm 数于 Date/300
https://www.shadertoy.com/view/3dK3zR 4x SSAO
https://www.shadertoy.com/view/lsX3DH pathtrace
https://www.shadertoy.com/view/wlXBWM lineSeg3D
https://www.shadertoy.com/view/tltSzM neon/400
https://www.shadertoy.com/view/lds3zr Ribbons/200
https://www.shadertoy.com/results?query=tag=distance&sort=popular&from=48&num=12 粒子和贝兹
https://www.shadertoy.com/view/llXfRr 分形树/212
https://www.shadertoy.com/view/Msl3Rr 频谱木柱/330
attributes.forEach{
  if (it.StartsWith("follow")) {//开关 https://zhuanlan.zhihu.com/p/419963912
    isSpecial = true;
    Match match = Regex.Match(flag, @"\w+\s*\((\w+)[,]\s*([0-9])\)");
    if (!match.Success)格式错;
    MaterialProperty materialProperty = FindProperty(match.Groups[1].Value, props, false);
    if (materialProperty == null)没找到;
    if (materialProperty.floatValue >= int.Parse(match.Groups[2].Value))
    {
        materialEditor.ShaderProperty(props[i], PropName(props[i]), 1);




