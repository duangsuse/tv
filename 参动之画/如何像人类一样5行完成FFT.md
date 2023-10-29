# 如何模仿人类用5行搞懂FFT

这是一条线。琴弦震动拍打空气、光线逃过涂料吸收，就产生了波， 波传导到内耳，聚焦到眼底，就变成神经节的电流，让动物产生反射，如同晶震在数码表的IC蚀刻板上游走。这条信号之线，是声光电的编辑器，而波的编辑器和乐谱，叫“频域X”freq domain

cosx波峰间是周期(τ=1turn=2pi=360deg, 1Hz)，周期越快“频率Y”freq 就越高，线的力度叫“幅值v”amplitude value，而x的时移叫做“幅角t”phase, 这几段电音就是 `v*cos(t+Yx)` 的独奏-或和弦 //aka. 振幅🔊  相位🎡 

FFT是“傅里叶变换”Fourier Transform 目前的速算法和代名词，被音视频剪辑+CG可视化/嵌入式和EE/通讯和医械🩺 领域使用，4G就采用OFDMA(频分多址通讯)。__本文会先教你如何用DFT实现__ ，求音频的音高线，也就是K歌评分--鬼畜调教时的幕后算法

我这次主讲DSP和线代，但其实有点杂。原理、公式、应用都在文里了，这些字大概能省下你推敲数学题库的时间。

先问为什么，再讲是什么。 剪辑时，在横轴时域选音频范围，会改变时长。 如果在纵轴剪切🤏，是否本该降低它的清晰度？ 这就是频域处理(倍速播放,压制,消音,.)的广阔应用。

## 正文

这段1s的音频采样。在录音或摄像的过程中，就已经被“积分”了：比如每秒44.1kHz 个数值🎢, 每张图500px🧮。每一点叫“分量”，整体叫 (44k)维向量

分析时会视作 (sr,1)形状的矩阵，把1行转 44k行,1列 。dtype也从小数clamp(钳)到s16等整数，称为“脉码调制”PCM

>如白噪声 `ffplay -ar 48000 -f s16le -ac 2 /dev/random` 。码率 -b 128kb 是录制时的逆压缩率，你还可以看[16bit是啥](https://sdl.moe/post/ffmpeg-001/#:~:text=色彩深度)

把左手食指竖到采样x上🍡，它就是这条线的频谱。以手指有Y=3行, 0~2为例，指根频 `a[0]=0, a[1]=1,. ` 用基频 `dot(x, cos(aτ)行)` 逐行相乘 求和“共振”

就是y轴频谱(钢琴卷帘🎼)。朝右一横👉就是随身听里，一帧帧柱图的高低了

FT对每1频行的处理，产生了频域的波，你在音效均衡器(EQ)里，看到的柱图就是滤波器。

```py
import numpy as np
from matplotlib import pyplot as plt, animation
from ipywidgets import interact as ui

def FFT(x, tr=-2j*np.pi):
  Y = np.arange(sr:=len(x))
  a = Y.reshape(sr,1) *Y/sr# *每行linspace(0~1 sep sr)
  return np.dot(x, np.exp(a*tr))

#dot写成公式就是Sigma∑ f(x)e^(a) 了，a是k *n/N. 自变量k的单位-j*2pi, j在e是向量(0,1)
iFFT=lambda X:\
  FFT(X, tr=2j*np.pi).real

#cos3τx+cos5τx, 先乘后加
TR=2*np.pi
q=lambda 各频:\
  lambda x: sum(np.cos([x* y*TR for y in 各频]))

f=q([3,5])
x=np.arange(0,1, sr:=1/50)

plt.stem(sr* abs(X:=FFT(f(x))))
plt.plot(x/sr, f(x)+3) #以频域为y轴,共/sr行
#plt.plot(sr* iFFT(X))
```

正逆时维度都相同，对图像的FT也是。 叠加出空间的称为基向量，FFT的返回值是种[正交基](https://thinkdsp-cn.readthedocs.io/zh-cn/latest/06-discrete-cosine-transform.html#id6)。 

频谱有sr行太多了！语音是 200~2kHz(人耳是20~20k)，而[吉他乐器A4=440Hz 🎁](http://amid.fish/javascript-karplus-strong) ~~武器A?~~, `MIDI=y=>2**((y-69)*12)*440`

>谢谢你，Joseph Fourier(1822), Cooley-Tukey(1965)

三棱镜的折射 也是靠波的干涉效应。让声音像光一样能分解🌈🎼，是比“数形结合”还合理的设计

有时，水滴下的屏幕，或投影仪就会让你看出每个像素点的RGB，仿佛里面有3个LED或3个红蓝眼镜🚥，你猜3点背后是啥色？ 44k个点的颜色

猜对了，但标准VGA的帧频60Hz,行频31.5kHz, 比声音多几千倍！ 1帧扫描640格x480行，分RGB 3个信道。游戏设置的"关VSync超频"就是指这个 CRT原理

「图像亦信号」。声道和图层的合并算式，是一样的，图像的尖锐和厚实，在声音里也有意义。 [对JPEG来说](https://sdl.moe/post/ffmpeg-004/#量化)，“灰度图”greys 在y或x方向斑马线的密度越高，就越尖锐🏁。它把每8x8像素换为频率--(0,0)就保存纯白斑马线🏳️的亮度

设计时 `HSV(色调 色度 亮度)` 是取色器。色调就是频率，Alpha是有色度。 频率高的绿光和5GHz信号穿透力更差，除了激光笔X射线等高能电磁波。 那光的相位对应啥？光的波段10e14 比空气快太多，比最快的高速摄影还多8个次

>谢谢你，电磁论、“真空场的”光速常数 `c` --Maxwell(1862), Einstein(1905)

但图像的相位，就保存了边缘轮廓。不切分做FT时，若只知道一堆都在0点、幅度不同的cos的叠加..中心都会很亮，因此2D震幅都是“低通”freq lowpass 的

现实有太多误差，测不准的，就像用20fps的肉眼，会觉得风扇是在倒着转！ 4.4k采样能承载的最高频，是2.2k，即Nyquist频率--已反映在频谱上

但看得慢也许是好事！[POV-LED](http://www.crazepony.com/wiki/pov-theory.html) 就是一种全息投影💫的方法。 在下下个章节，“短时傅里叶”STFT也需要靠「听觉暂留」。

## 如何质疑

- [用sin叠加逼近方波](https://www.desmos.com/calculator/gjpuxeuwbj)
- [FS,引用了FT公式](https://www.desmos.com/calculator/qpnz9celzf)

数组叫PCM，而大国工匠对急停键抖手 叫“脉宽调制”PWM 🎇--还有B站的《高压玩具HVT》系列 //我劝天公重抖手，不拘一格酱人才

……等等， __为什么加权求和不会越加越大？__ np.exp()是cos吗？ 再说，0频能删吧？

求频谱 `f=cos3τx` 是迭代Y=0~3τ求和 `cos(Yx)f(x)` , 相同频率的cos<0会“共振”出一二象限的全正值，而震动是和《瑞克莫蒂》一样对称拉扯的，其求和默认是0

作为极座标的x维，“余弦”cosine 的co意为协作。`r=cos(a t), 0<t<1τ` 在a=1时很像“在一二象限”， 否则以1Hz缠绕在零点，会像辐射对称的“花瓣”⚛️

- [“缠绕”可视化](http://www.billconnelly.net/?p=276)
- [@jezzmon 可视化🎁](https://www.jezzamon.com/fourier/)
- [座标上的艺术🎁](https://youtu.be/Ey-W3xwNJU8?t=161)
- [要启用动画，请安装 ipympl](https://matplotlib.org/ipympl/installing.html), 一个 `jupyter nbextension`, [安完可玩"双摆"](https://matplotlib.org/stable/gallery/animation/double_pendulum.html)
- 需手动添加 `%matplotlib nbAgg` ,等效[rc样式表 backend:nbAgg](https://matplotlib.org/stable/users/explain/customizing.html#the-matplotlibrc-file)


__0频能删吧？__ 不能。exp(-1j*Y τ)角度因此存在

`sin0=0, cos0=1` ，无论多少sin都不能拟合 刚刚被移到y轴右边的方波，尽管 `cos(x+11)` 几乎就是sinx。

```py
fig = plt.figure()
ax = fig.add_subplot(projection="3d")
# 复数包含cos,sin, 随着指节Y的上移，它转得更快
fps=lambda f:animation.FuncAnimation(fig, f, 600, interval=60/1000)
setvars=lambda**kw: globals().update(kw)

ui(setvars, Y=(1,7), sr=(10,60))
@fps
def _(T):
  ax.clear();ax.set(xlabel='sin(t)');ax.set(ylabel='cos(t)')
  t=np.linspace(0, 1, sr)*TR +T/30
  ax.plot3D(np.sin(Y*t), np.cos(Y*t), t)

plt.show()
```

在FT的输入里，小数被自动推广到“复数”complex。准确点说吧：

```h
data Vec2(x, y=0)
  at a 角度 arctan2() “0~1圈右向朝上”
  at v 力度 length() “velocity 速度”
^named
  - T(a,v) Vec2(sin(aτ)*v,cos(aτ)*v)
  at `τ` *2*PI  “规范写法 1tr”

at N2 Vec2 “且下文P开头的都是点，v开头都是力”

at:
  → N2(1) “标枪方向”
  ← N2(-1)
  ↑ N2.T(.5, 1)
  ↖ N2.T(.75, 1)
  ↫ 我怎么弯的？算了，继续说吧
  ↑ np.angle(0+1j)/np.pi==0.5, 返回 -pi~pi
```

dot()在几何上能求夹角🧭，叉乘更有意思，意义是3D垂直(求法线)，其长度也能构成对角线

在numpy里，我们用C语言也有的“复数”complex 做旋转: `P1=P*np.exp(a)`

__只用这条复数乘法，就不会突破2D欧拉的几何空间__，避免横生枝节到线代上去。  为啥不直接用Vec2呢？因为向量常用变形矩阵，不好写

`e^a=(cosa+sina j)`, 与复数乘法 `(X Y)(x y)=(Xx-Yy  Xy+Yx)` 组合后，符合下图的物理公式

猜猜我为啥不严谨点，说 `z1=a+bi, z2=c+di, (ac-bd)+(bc+ad)i` ？

说到这个e，你试试用 参数方程(t in 0~τ) 定义下极座标系；就像本文里的2π，没有照本宣科，从而“单位化”了很多函数。

复数只有在涉及如乘法时，它 `a+bi` 的字面才有意思；但复空间是美的，比如Mandelbrot 分形和它的Julia集，一个隐函数([sdCirc🎁](https://iquilezles.org/articles/distfunctions2d),.)灰度图 。

如果只是删掉“当且仅当”“显然有”，那确实和他们一样是玩文字游戏，但通过字面暗示两个值、两种知识的类似，就是一种「泛而不空」的思考和设计了。

最后，在C++里xyav分别为 real,imag, arg,abs ，尽管科学计算，还是用易懂易加速的Python

## 如何调音

FT结果与输入同维度，但 __为啥柱型图要分帧跳动？ 为啥有人唱歌“自带电音”？__

当你看那些关于扒谱的教程，或歌曲鉴定时，会发现它们使用“热力图”heatmap，即用一行渐变色彩显示灰度，越亮代表越 __接近“音高”pitch__,F0 🎺

而音色也不是频谱那么简单。知道怎么合成电音后，在时域包络(响度ADSR,起承转落)就能拟合各种自然声音，歌声比TTS主要就是S段-颤音更长。倒放的违和感，主要就来源于逆序的起承转落 （你错过了第一个🎁？ 回去听！

🎁里提到的滑动平均，是卷积的亲戚，也是[股市K线🎁](https://plotly.com/python/ohlc-charts/) 背景的一个元素

[另外，喉咙也是用共振发音的](https://zhuanlan.zhihu.com/p/427300194)，频谱有很多谐波，不像音高“线”。 前3个共振峰(F1~3) 贡献了大部分声韵， 反观著名的Vocaloid2/UTAU是用双音素拼接+拉音高(PSOLA)做语音的，谷歌娘和V3则是把HMM模型(离散版卡尔曼滤波,比如从拼音推理分词,是[sd扩散模型](http://jalammar.github.io/illustrated-stable-diffusion/)的前馈) 拿来猜Mel频谱的参数，比用语音学更方便

RNN的LSTM 则是一种[更现代的seq2seq推理模型](https://jalammar.github.io/illustrated-transformer/)，Transformer(编码嵌入-解码注意) 则适于低时序的序列处理。

你知道FT的输入输出是同构的——神经网络和模型也有这个特性，所以训练结果和程序都叫模型；就像线也叫信号，滤波器(滤镜)也叫系统

```py
import librosa as sa, IPython.display as ipd, librosa.display as sad
import mir_eval.sonify as so

sr=44100
Aud=lambda x: ipd.Audio(x,rate=sr)

sad.waveshow(f(x))
display(
  Aud(so.pitch_contour(x, 500*f(x), sr)),
  Aud(sa.chirp(300,500, duration=1,sr=sr))
)
```

把你的食指竖起来！ 从根部到指尖，就是到热力图里低音炮到粉笔刮的分类

数,形… 帧率又是怎么来的？帧就是缓冲分页，电脑用帧来读写数据。网络的帧是包，"abc"的帧是/./字符，音视频流则会有已缓冲的区间。比如按1024byte=1K为分页向后加，甚至进程磁盘都分页📟

不如，先把行分下页？

```py
def sep(a, N, hop=lambda N:0, fill=None):
  n = len(a); nr=(N - n%N)%N #例 3-(4,3)%3
  a.extend([fill] * (nr+N-1))

  for i in range(0,n,N+hop(N)): yield a[i:i+N] #只需理解这一行

[*sep([1,2,3,4], 2)] #[[1, 2], [3, 4]]
for x in range(1, 7):
  print(x, [*sep([*range(x)],3, lambda N:-N//2)] ) # 在DSP里，页间有重叠
```

要减小截断效应，每页还要补一倍乘个窗函数，对应istft()还原时也分页乘窗，[称为OverLap-Add](https://www.zhihu.com/question/280648561/answer/2521849999)

那么，你就能理解为什么变声器或EQ背后要 `X=stft(x); 对每帧Shift一半频谱; istft(X)` 了

__那就在文尾做一个“机器人声效”[Vocoder](https://github.com/jagger2048/PitchShifting/blob/master/readme.md#声乐理论) ，它处理[Demucs](https://huggingface.co/spaces/sparanoid/demucs-gpu)隔离出的语音。__

>谢谢你，_Daisy Bell_ --IBM704(1961)

- [跟着 librosa 做实验🎁](https://librosa.org/doc/main/advanced.html), [Griffin-Lim声码器](https://github.com/librosa/librosa/issues/434#issuecomment-291266229)
- [Mel尺度消除谐波,更适合语音](http://fancyerii.github.io/books/mfcc/) -- [简单版](https://blog.csdn.net/qq_44250700/article/details/125382044),[Lab](http://fancyerii.github.io/dev287x/ssp/), [torchaudio](https://pytorch.org/audio/stable/tutorials/audio_feature_extractions_tutorial.html#pitch). vocoder最初被用于节省对讲机和电话带宽,且能在还原时补齐相位
- [CQT动态加窗,更适合乐理](https://blog.csdn.net/qq_44250700/article/details/125382044)
- [为更高频加更多窗的 “小波变换”DWT](https://www.quora.com/What-is-the-difference-between-wavelet-transform-and-STFT)

## 如何画画

既然输入是点集，就可以用FFT来简笔画SVG了。 这就是它能被可视化的基础，点集的列表，本身就是“时轴”， __点的xy在发生规律变化 ✍ ，只是这次初始y非0了__ 

把你的食指竖起来！ 还记得频域的顺序吗？但这次我们是给高振幅画更大的轮辐，细节则从里一层的箭头+(频率)时间 迭代完所有指节

但是，频谱哪来的箭头呢？ 伸出食指,Y频率, 拇指,cos的叠加, 那么中指sin,就是画布上的'y轴'

指一下自己的脸，你会看见叫做xy的箭头晃荡🪁在两根指头上，它们就是正弦余弦， 而你食指的3个指节，就记录着每个圆的倍速！

```py
def uDraw(got, wh=(5,4)):
  Ps=[];z=0
  fig = plt.figure(figsize=wh); ef=fig.canvas
  on=lambda f:ef.mpl_connect(f'{f.__name__}_event', lambda ev:() if ef.toolbar.mode else f(ev.xdata,ev.ydata))
  @on
  def motion_notify(x,y):
    Ps.append((x,y)) if x and z else()
    plt.plot(*np.array(Ps).T, 'g')
  @on
  def button_press(x,y):
    nonlocal z;z=1; Ps.clear();fig.clear()
    plt.axis('off');plt.tight_layout()
    plt.xlim(wh[0]);plt.ylim(wh[1])
  @on
  def button_release(x,y): nonlocal z;z=0; got(Ps)


from scipy.spatial import*
Ps=np.random.randn(100, 2)
Bs=plt.triplot(*Ps.T, Delaunay(Ps).simplices)[0].get_path()
```

这是一位好老师的简笔画。希望无论在人生的哪一点，你都能遇到为自由自信与好奇，而不是在名词和“结论”上去用功的老师

__负频可以优化掉吗？__ 能。FFT 就用递归省了大量计算，效果类似快排

- [伯克利大学Py数学书🎁](https://pythonnumericalmethods.berkeley.edu/notebooks/chapter24.02-Discrete-Fourier-Transform.html)
- [ISMIR 音乐分类基础🎁](https://music-classification.github.io/tutorial/part2_basics/input-representations.html#melspectrograms)
- [宏观粒子的波🎁](https://haha90.phy.ntnu.edu.tw/content/TeachAnime/allTeachinfAnimation/wave2DBasic/wave2DBasic.html)
- [WebAudio FFT+p5js](https://openprocessing.org/sketch/1217455) -- [创作式编程入门](https://creativecoding.in/2022/12/26/p5js-workshop-clab-1/)
- [Java实现](https://introcs.cs.princeton.edu/java/97data/FFT.java.html)

```py
def _FT(x):
  if (N:=len(x)) == 1: return x

  A,B = _FT(x[0::2]), _FT(x[1::2])
  turn = \
    np.exp(-2j*np.pi* np.arange(N)/N)
  return np.concatenate(\
   [A+B*turn[:int(N/2)],
    A+B*turn[int(N/2):]])

def FFT(x):
  #这里只是示范补0方法，一般在采样时就按2次方。
  dN=2**round(np.log2(len(x))) - len(x)
  return _FT(np.pad(x,(dN,0)) if dN else x)
```

## 如何方程

>`f=cos3τx` 那章我们从古老的“傅里叶级数”Fourier Series 解释了原理。但，再恶补下微积分吧

`Int[1~2]:[x] 2x` 调用了 `- Int[xs](fn)  (1/N)*Sum[xs sep N](fn)`

`Sum[1~2]:[x] 2x` 是对曲边梯形的求和(`:[x]2x` 是被积函数)，它把区间1~2 sep了2份，如果采样到N=4,8份呢？结果会膨胀，所以/N 。 d/dx 由此来

数学书想要求积分和导数，它们像无放能的正逆反应。 x^2 在积分法则= x^3/3 ，做2点 f(B)-f(A) 后得数字。 

而现实世界用 Matlab,Desmos,torch, sympy 等编程平台算积分，它们使用了卡脖子的开源LAPACK，对了，免费能抄又像作弊的东西，凭啥有国际竞争力呢？ 我们目光短浅，还是讲能1分千人的传统数学吧。

积分 x^2 像模拟滴水入瓶，微分则记录速率的变化=`2x+(C=0)`（不+C当“瓶底子”会让 xx+3, xx+4 的导都是2x，容易混

最后，单函数下 导数=微分微商；定积分公式 `d/dn ∫_0^n f(x)dx` 里Δx不是系数，它表示x是范围

恶补玩了，但有关FT的只有定积分。而上文我们调用的领域，被称为《线性代数》🥵

累+电脑=快乐+我！

```py
#两条线: x + y = 35, 2x + 4y = 94
from sympy.abc import x,y
import sympy as S
S.solve(a:=
[x + y - 35,
 2*x + 4*y - 94])

display(a,
  a:=S.Matrix(a),
  a.subs({x: 23, y: 12}), #配平了, x露出鸡脚
  a.subs({k:S.Symbol(f'列{j}') for j,k in enumerate('xy')}) )

S.plot_implicit(1- (y*5/4 - S.sqrt(abs(x)))**2 - x**2) #<3 🫶
display(
  S.diff(x**2), S.integrate(x**2, (x, 0,2))
)
```

这就对了。算sin算积分，记公式这么无聊的事，就应该调函数来做☎️。数学的函数，那叫“线”

y=2x 在编程里 y(参数,)没先绑定x 那必是全局或this变数！ 但说2x是x绑到了坐标系，不是什么“盒子”代入数，就能解释了

🫶是曲线，但不是函数-它不满足1x:1y🎢 或 Nx:1y 的关联，而 `r=1-sin(t), t=0~2pi` 是另一个视口上的函数。

不过，线代里，kx+1b 又不是线-它破坏了数乘，无法被线性变换（到90度转等新座标系），不像物理的速度向量或vec3(RGB)，kx+1b不能叫"映射"点--矩阵列。 另外“泰勒展开”也得矩阵，分子式配平也靠矩阵

`def f(x:int定义域)->int陪域: 无操作; return 2*x`, `js(x=>2*x)` 都叫函数。 min,max 值域在def的“计算器语意”下，算不出，但多项式可以

这一章没有跑“FFT”的题。[多项式📊的次数表示法](https://www.shuxuele.com/algebra/polynomials.html#:~:text=标准型)，速算了乘法和卷积， FT就是从点值式求次数(Hz)！

`np.linalg` 也支持解二元方乘，高斯消元，只是把等式们按列来算

```js
>请化简多项式，编号成[系数-常数]
[x y np.dot]
[1 1 35]
[2 4 94]
>j=0 向右
向下找j格最强的行，换为行0
[2 4 94]
[1 1 35]
j格'x'归一，
[1 2 47]
[1 1 35]
因此其他的行消x
[1 2 |47]
[0 1 |12]  -行0 *1

>这叫上三角(REF, Ux=c,可求秩)，通过回代获得1个解(Ix=c)
[1 2 47] -其他元的解, -2*12
[0 1 12]
[23,12]=[x,y]
```

解题要靠初等变换？ 你是说以下代码里，行向量上的四则函数吗？

```py
def elim(A, y):
  n, m = A.shape; assert n==m, "需方阵"
  M = np.hstack([A, y.reshape(-1, 1)]) # M=(A|常数项b)

  for j in range(m):
    # 向下[j:] 找元最强的行，换为本行(i,j=j,i)。会在回代里获取
    i= j+np.argmax(abs(M[j:, j])); assert M[i,j]!=0, "无解,不可逆矩阵"
    if i!=j: M[[i,j]] = M[[j,i]]
    # 归一，因此后面行消它
    M[j] /=  M[j, j]
    for i in range(j+1, m):
      M[i] -=  M[i,j]* M[j]

  x=np.zeros(n) #逐行, 约旦回代
  for i in reversed(range(n)):
    x[i] = M[i,m] - x[i:m] @M[i, i:m]
  return x

print(
  解:=elim(*map(np.array, S.linear_eq_to_matrix(list(a), [x,y]) )),
  解 @[2,4] #dot(A,x)==94
)
# 请上手，外提 elimS(a,[x,y])
```

## 如何写字

在JS里，FT的可视化能在40行里完成，但如果真要用那么多公式讲这个问题，你就不太有编程哲学🧩

先问为什么，再讲是什么。 缺乏这种思想的教育，一言以蔽之，简单的太肤浅，难的太空洞。

包括在AI潮里，我听到些奇怪的说法，类同“物理学的大厦已经建立，只有两朵浮云” 和 “物理不存在”

在编程里，无论if,for这些“现象”，还是逻辑函数(<,&&,||)与程序指针+-= 的“本质”，是平行存在的，只是用户面向不同。 倒不如说，if等函数跳转才是本质，而汇编是它的解释器；“低频”的filter{it>0}才是本质，“高频”if是冗余样板

你想创作的文章/视效是本质，代码只算外语，写得歪七扭八的摆π就更次了

细想下刚才让你指脸的左手XYZ。平行拇指的“cos线”，垂直于你才能看见起伏的。听懂时是你有脑补的成分。 在自恰性与理解难度间，数学人总是选择只保一个，这就是让代数太抽象的原因

>人类喜欢用“自顶向下”recursive descent 先给模型-参数再计算；而电脑在编译时就向下过了，自底向上，深先遍历：算法的意义只是组装结果，示例输入有多复杂都OK

机器，才是从生硬的晶体管、逻辑门发展到满街的触屏，从深奥的(1+1)发展到了浅显的(2)，从孤独的调用树发展成了字典的参数图。在代码里，多领域的联动 便是新的单领域。 你拜托程序做CAD做物理，但电脑的世界观广于CAD、泛于单次计算和推理。

向上叠和向下拆，就是工科和理科，要思，先去学。 别跟随自恰的回环，去忘记人，忘记根源需求，只因为“公鸡+太阳的消失”抓狂。

如果一个人可以用工具优雅地写出毫无意义的东西，这会是工具的耻辱。 啥叫意义？高于自恰叫、整条链都最高性价比叫

比如反证法和纯函数编程吧，它们通过分支穷举来自恰。“A是无限大的圆，A含我” 不证自明(命题=条件)，如果用双重否定(∀=∄!)证明肯定呢？ 恭喜你发现了深先搜索(文尾有讲)，但那不是理论，只是算法

__所以理论不重要吗？数学不用研究吗？__

密码学，一门有着千年的理论基础的领域，却在近200年都没有人提出RSA；RSA公钥领域出现后，各种算法却如雨后春笋。对普通人来说，学习即是考古

计科里，矩阵,协程(回调栈),树组合-解构是60年前Fortran,Lua,Lisp 就有的语意，但今天 numpy,async,JSX 才可大行其道

上章的复数取代向量说明，一个领域不完整或仅仅不简明🧩，学界它长腿也会跑。结果，后续应用不易学不一致。 凭什么工科要为你们的内耗买单啊喂？？ 我们需要一个配当“编程的尽头”的高数，而非执着于有无穷和字母发音的，歌颂难解和头痛的历史包袱。

现实里没有无穷，

__礼貌的说，理科和工用间是连续的，是拼音和语音的关系__，不是非0即1 太极馆

数学是种语言，它不是用到再定义、无频谱可循的花体"文字"，更不是换写法就更合逻辑的知识。 我们需要多与物理、与计科的语言比较筛选，才是一种培养逻辑思维的准则。

## 如何验证

```py
#机器人音效🤖
D = librosa.stft(samples, n_fft=nperseg, 
                 hop_length=overlap, win_length=nperseg,
                 window=scipy.signal.windows.hann)

spect, _ = librosa.magphase(D)

audio_signal = librosa.griffinlim(spect, n_iter=1024, 
                                  win_length=nperseg, hop_length=overlap, 
                                  window=signal.windows.hann)
print(audio_signal, audio_signal.shape)
sf.write('test.wav', audio_signal, sample_rate)
```

不同领域的函数，有的可以对照。HashMap 也是“分频率桶”处理，但是特征Hash

就像复数和向量是同构🖇的，`x:时域 X:频域` 间也有 `两换关系Eq(cat=FFT,cut=iFFT)` 。cat把输入解码到编程接口(二进制,字典,码点,wav,.)，cut将数据编码回专业领域(整数,json,utf,mp3,.)

变数关系对编程也很有用。在解集过滤式Prolog里，(0)+1 -1 嵌套和解构被用于定义加法，而[夯版PEG](https://www.metalevel.at/prolog/dcg) 能同时定义四则逆波兰的读和写--对LLVM,Vue.html而言太超前了

对了，在[查询窗](https://swish.swi-prolog.org/)左右两侧写下 `:-use_module(library(clpq)).` 和 `{2*X+4*Y = 94, X+Y = 35}` 也能解方程🙆‍♂️，甚至数独

即便把35换成'A'，CLP{Q,R} 依然能求解(同sympy,解析式,但 `{X^2+2*X+1=0}` 显示树)，这也是泛型的原理。 //echo clp{q,r}

> `昆虫:-好玩. 昆虫(蚂蚁), 好玩(蚂蚁)` 是三段论, 也是深先搜索

数学命题“若p，则有q, p→q” 即 `x(R) :- [2,R]=[L,1].` 两边的语意。⇔充要则如 `bro(佩奇,乔治).` 猜猜 `sis(X,R):- ?`  

clpfd 则可以遍历解集∀∄ --`名:意 ∈in ⋀, ⋁; ¬\+`
- `forall((N in 1..5, label([N])), between(1,6,N))` 成立
- `N in 1..5, \+ N#=5` 无解
- `A in 0..9, labeling([max(A)],[A])` A=10个解

解集过滤，比如 `[X]=[Y], (X=2; X=3), Ret=Y` 只需要[“合一”unify](https://tca.github.io/veneer/examples/editor.html),搜索,抓取，比C语言还简单；但[形式化验证](https://ksqsf.moe/posts/2019-02-18-dt-fun.html)麻烦很多，.pl不能拿命题函数去=含变量类型，而Coq家族写个泛型比写SQL还啰嗦(虽然它证明了四色定理)。诶，吐槽一句，`x(R).` 写成 `X(r)` 才更像SQL表的行吧！

如果比含糊程度的话，高数<高中数学<编译原理 ，抽象度是爬不到顶的🙅‍♂️！

- [tch的计科笔记](https://github.com/tch0/notes/)
- [直觉主义](https://zh.wikipedia.org/wiki/直觉主义#参看)

还是用Eq，把声音换到图片应用滤镜，例如高斯模糊…… 最好是把一个.wav 文件与.png 做绑定，就像NodeJS 和 `bun dev` 那样

```py
#拿竖条- HSV分量储存低到高频(幅角,幅值,1)
```

在谈到折线的简化时，Bezier样条也是种插值法，被用于SVG动画,CSS的[关键帧/缓动](epiceasing.com) ，而[WebGL](https://gl-transitions.com/gallery) 则有更多更酷的几何种类

`bzr=(ps,t)=>{let T=([x,y],[x1,y1])=>[x+t*(x1-x),y+t*(y1-y)]
  return n(ps)==1?ps[0] : bzr(ps.slice(0,-1).map((x,i)=>T(x,ps[i+1])  ),t)}` //de Casteljau 算法,所有左的P都*t 至Plast

对了，懂了向量，写个很酷的命令行光标吧。 还可以猜猜怎么显示 ASCII Art？

```py
#sudo cat /dev/input/mice | python gpm.py $COLUMNS $LINES
import sys, numpy as np

P = np.array([0,0]); dk = np.array([.6 ,-.4])
L = np.array(sys.argv[1:]).astype(float)

while True:
  btn,*dP = np.frombuffer(sys.stdin.buffer.read(3), np.byte) #array('b', )
  P=np.clip(0,(P+dP*dk),L); x,y=P.astype(int)
  print('\x1b[',flush=True, end=f'{y};{x}H')
```

你可以试着支持伸缩旋转光标，甚至[粒子特效](www.websiteasteroids.com)。用一种很新的方式学游戏开发？

尽管你不必写FFT(这些算法缺的是Melodyne等应用🌚)，有些模型也是要会用的。请上手用矩阵完成图像库函数

```py
import skimage as sk
from PIL import Image, ImageFilter as Fil

im=Image.fromarray(a:= sk.io.imread('imageio:chelsea.png'))

display(im,
  im.convert('L'), #灰度
  im.crop((100, 0, 400, 300)),
  im.filter(Fil.EDGE_ENHANCE))
#0.2989 * R + 0.5870 * G + 0.1140 * B 
#a[y:y1][x:x1], see (im.size, a.shape)
#Google: Sobel
```

对了，你也可以看看那个分形！去 [ShaderToy](https://www.shadertoy.com/view/4ttBWM) 搜搜3D版吧(包括上面的双摆)！ 或者，看看[Taichi☯️ 物理语言](https://github.com/taichi-dev/taichi#run-your-hello-world)、[js1k](https://js1k.com/2016-elemental/) 等信号处理应用！

```js
julC=null
sdMandel=(nIter=60)=>(Px,Py)=>{
  let x=0,y=0, x1=0,i=0;
  if(julC){x=Px,y=Py; [Px,Py]=julC} //0,0+N(P x y) vs. Pxy+N C
  do {
    x1=x*x-y*y +Px; y=2*x*y +Py; x=x1
  } while((x*x+y*y<4) &&i++ <nIter)
  return i-1
}
//上手做? 想想文首的"CRT" canvas1.getContext('2d'); rgba=g.getImageData(xywh); for(i<w*h) y=/w, x=%w; putImageData(rgba,0,0, xy?)
```

- [用迭代法求N(π,10)](https://stackoverflow.com/questions/347734/gauss-legendre-algorithm-in-python)
- [卷积神经网络](https://cuijiahua.com/blog/2018/12/dl-10.html)
- [CG:频域的洋面模拟](https://www.youtube.com/watch?v=kGEqaX4Y4bQ), 你可以搜zhihu/Brown运动 ，频域和概率论也有关系
- [放松解压的反民科科普](https://www.zhihu.com/column/c_1079425408197492736)

最后，感谢你学习信号处理领域的基本功！👏

