# 如何模仿人类用5行搞懂FFT

这是一条线。琴弦震动拍打空气、光线逃过涂料吸收，就产生了波， 波传导到内耳，聚焦到眼底，就变成神经节的电流，让动物产生反射，如同晶震在数码表的IC蚀刻板上游走。

这条信号之线，是声光电的编辑器，而波的编辑器和乐谱，叫“频域X”freq domain 。4G就采用OFDMA(频分多址)通讯

cosx波峰间是周期(1τ=1turn=2pi=360deg, 就是Hz)，快周期在高的“Y频率”freq，线的力度叫“v幅值”amplitude value，而x的时移叫做“t幅角”phase，只从幅值还原波形的叫vocoder。 这几段电音就是 `v*cos(t+Yx)` 的独奏-或和弦 //aka. 振幅🔊  相位🎡 

FFT，是“傅里叶变换”Fourier Transform 目前的速算法和代名词，被音视频剪辑+可视化CG/通讯和[医械🩺](https://text.paperclip.eu.org/Vol.066/#:~:text=照射后会得到三个投影)/嵌入式和EE 领域使用。__本文会先教你如何用DFT实现__ ，求音频的音高线，也就是K歌评分--鬼畜调教时的幕后算法

先问为什么，后讲是什么。 剪辑时，在横轴时域选音频范围，会改变时长。 如果在纵轴剪切🤏，是否本该降低它的清晰度？ 这就是信号频域(倍速播放,压制,修音消音,.)的广阔应用。

我这次主讲DSP(信号处理)、线代+积分(更现代的解析几何)，但其实有点杂。原理、公式、应用都在文里了，这些字大概能省下你推敲数学题库的时间。

>暖心提示：全篇含过量的[调包侠]，导致有4个示例能上手运行。喜欢重造轮子的代数大佬慎入

## 正文

高中数学告诉你，函数能描述距离和时间的关系，在t=0~1 *60fps的动画里，用y(t)=0~1的弹性[速率线重映射](epiceasing.com)位移就是一种日常但稀罕的技巧，这就是线代的典型应用了 `lerp'ABt' A+(B-A)t`

这段1s的音频采样。在录音或摄像的过程中，就已经被“积分”了：比如1秒sr=44.1kHz 个数值🎢, 每张图500px🧮。每一点叫“分量”，整体叫 (44k)维向量

分析时会视作 (sr,1)形状的矩阵，把1行转 44k行,1列 。dtype也从小数clamp(钳)到s16等整数，称为“脉码调制”PCM

>如白噪声 `ffplay -ar 48000 -f s16le -ac 2 /dev/random` ，码率 -b 128kb 是录制时的逆压缩率。[查查sign 16bit是啥？](https://sdl.moe/post/ffmpeg-001/#:~:text=色彩深度)

把左手食指竖到采样x上🍡，它就是这条线的频谱。以手指有Y=3行, 0~2为例，指根频 `Y[0]=0, Y[1]=1,. ` 每行算sr个点，用基频 `cos(Yτ) @x` 逐行相乘 求和“共振”

```py
import numpy as np
from matplotlib import pyplot as plt, animation
from ipywidgets import interact as ui

def FFT(x, fwd=-1j):
  Y = np.arange(0, sr:=len(x))
  Y = Y.reshape(sr,1) *Y/sr#即*linspace(0~1 sep sr)
  return np.exp(Y*TR *fwd) @x

TR=2*np.pi
iFFT=lambda X:\
  FFT(X, 1j).real
#相乘求和 写成公式就是X[k]=∑_x f(x)e^(Y), Y=x/nX k*-2jpi , j在e即向量(0,1)

#cos3τx+cos5τx, 先乘后加
q=lambda 各频:\
  lambda x: sum(np.cos([x* y*TR for y in 各频]))

x=np.linspace(0,1, sr:=50)
f=q([3,5])

plt.stem(abs(X:=FFT(f(x))) /sr)
plt.plot(x*sr, f(x)+3)
plt.plot(iFFT(X) /sr)
```

这就是y轴频谱(钢琴卷帘🎼)。根部到指尖，就是到低音炮到粉笔刮的分类。朝右一横👉就是随身听里，一帧帧柱图的高低了。 每1频行的点值，产生了频域的波，你在均衡器音效(EQ)里，看到的柱图(滤镜)也是个滤波器。

滤波器也叫线性系统，就像线叫信号，ML算法和训练结果都叫模型。 正逆FT的输入是同构的(信息量一样,比如这张“白噪声”)，神经网络和模型也有这个特性

……等等，x代表波形或函数线我能理解，X被画成柱形图或灰度图的I线(“热力图”heatmap)也好说，但 `X随[Y]` 算什么函数？ `P=[2,1]; P.T==[1,2]` 转转看！

但是， __为什么加权求和不会越加越大？__ np.exp()是cos吗？ 再说，0频能删吧？

震动是和《瑞克莫蒂》一样对称拉扯的，其求和默认是0，相同频率的cos<0会乘出一二象限的全正值

用极座标r=t系再转转看！作为画圆时的x维，`r=cos(a t), 0<t<1τ` 在a=1时很像“在一二象限”， 否则以1Hz缠绕在零点，会像辐射对称的“花瓣”⚛️，所以分析 `f=cos3τx` 只需迭代Y=0~3τ求和 `cos(Yx)f(x)`
- [“缠绕”可视化](http://www.billconnelly.net/?p=276)
- [@jezzmon 可视化🎁](https://www.jezzamon.com/fourier/)
- [座标上的艺术🎁](https://youtu.be/Ey-W3xwNJU8?t=161)

__0频能删吧？__ 不能。exp(Yτ *-1j)缠绕速度因此存在

`sin0=0, cos0=1` ，无论多少sin都不能拟合 刚刚被移到y轴右边的方波，尽管 `cos(x+11)` 几乎就是sinx，“余弦”cosine 的co也意为协作。
- [用sin叠加逼近方波](https://www.desmos.com/calculator/gjpuxeuwbj)
- [FS,引用了FT公式](https://www.desmos.com/calculator/qpnz9celzf)

叠加出空间的称为基向量，FFT的返回值是种[正交基](https://thinkdsp-cn.readthedocs.io/zh-cn/latest/06-discrete-cosine-transform.html#id6)。 用矩阵还能做“泰勒展开”和分子式配平！

偷偷告诉你，《植物大战僵尸》的棋盘格也是个矩阵，你可以单独看待它的每一 `行[i]`，而 `M[i][列0]` 就属于小推车。 物理速度向量,vec3(RGB),exp(Yτ)基频 也叫矩阵

kx+1b 不能叫矩阵即N维点 -它未实现“线性映射”的数乘，无法被线性变换（到90度转等新座标系）

如果看不懂逐行相乘求和，可以把信号x理解为2行半透明植物的混成。 把卡组(频段)里的豌豆 玉米 西瓜 与混成图逐个求相关，即得到Y行的构成 `exp(Yτ) @x`

三棱镜的折射 也是靠波的干涉效应。让声音像光一样能分解🌈🎼，是比“数形结合”还合理的设计

但频谱有sr行太多了，语音是 200~2kHz(人耳是20~20k)，而[吉他乐器A4=440Hz 🎁](http://amid.fish/javascript-karplus-strong) ~~武器A?~~, `MIDI=y=>2**((y-69)*12)*440`

>谢谢你，Joseph Fourier(1822), Cooley-Tukey(1965)

有时，水滴下的屏幕，或投影仪就会让你看出每个像素点的RGB，仿佛里面有3个LED或3个红蓝眼镜🚥，你猜3点背后是啥色？ 44k个点的颜色？

猜对了，但标准VGA的帧频60Hz,行频31.5kHz, 比声音多几千倍！ 分RGB 3信道 1帧扫描640格x480行，游戏设置里"关VSync超频"就是指这个。CRT原理

「图像亦信号」。声道和图层的合并算式，是一样的，图像的尖锐和厚实，在声音里也有意义。 [对JPEG来说](https://sdl.moe/post/ffmpeg-004/#量化)，“灰度图”greys 在y或x方向斑马线的密度越高，就越尖锐🏁。它把每8x8像素换为频率--(0,0)就保存纯白斑马线🏳️的亮度

取色器是 `HSV(色调 色度 亮度)`。色调=频率🌈，Alpha=有色度🫧，频率高的绿光和5GHz信号穿透力更差-除了激光笔X射线等高频高能电磁波。 那光的相位对应啥？光的波段10e14 比空气快太多，比最快的高速摄影还多8个次

>谢谢你，电磁论、“真空场的”光速常数 `c` --Maxwell(1862), Einstein(1905)

但图像靠相位保存边缘轮廓。不分页做FT时，若只知道一堆都在0点、幅度不同的cos的叠加.. 中心都会很亮，因此2D震幅都是“低通”freq lowpass 的

现实有太多误差，测不准的，用24fps的肉眼，会觉得风扇是在倒着转，也看不清音叉越震越弱！ 4.4k采样能承载的最高频，是2.2k，即Nyquist频率--已反映在频谱上

>1s/24f 只是视觉暂留效应的起点，人也能察觉120Hz的频闪。更快、更高、更细腻(1dp>1px)！

但看得慢也许是好事！[POV-LED](http://www.crazepony.com/wiki/pov-theory.html) 就是一种全息投影💫的方法。 关于乐理的“短时傅里叶”STFT就靠「听觉暂留」了。

例如，数组叫PCM，而大国工匠对急停键抖手 叫“脉宽调制”PWM 🎇--还有B站的《高压玩具HVT》系列 //我劝天公重抖手，不拘一格酱人才

__负频可以优化掉吗？__ 能。FFT 就用递归省了大量计算，效果类似快排

- [伯克利大学Py数学书🎁](https://pythonnumericalmethods.berkeley.edu/notebooks/chapter24.02-Discrete-Fourier-Transform.html)
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

- [宏观粒子的波🎁](https://haha90.phy.ntnu.edu.tw/content/TeachAnime/allTeachinfAnimation/wave2DBasic/wave2DBasic.html)
- [各种数学动画🎁](https://www.lfhacks.com/t/fourier/)
- [ISMIR 音乐分类学基础](https://music-classification.github.io/tutorial/part2_basics/input-representations.html#melspectrograms)
- [WebAudio FFT+p5js](https://openprocessing.org/sketch/1217455) -- [创作式编程入门](https://creativecoding.in/2022/12/26/p5js-workshop-clab-1/)

## 如何调音

FT结果能还原输入，但 __为啥柱型图要分帧跳动？ 为啥有人唱歌“自带电音”？__

当你看那些关于扒谱的教程，或歌曲鉴定时，会发现它们使用一列列渐变色彩-热力图显示频谱，越亮代表越 __接近“音高”pitch__,F0 🎺

音色同样不是频谱直接给出。拿频谱合成电音后，在时域包络(响度ADSR,起承转落)就能拟合各种自然声音，歌声比TTS主要就是S段-颤音更长。倒放的违和感，主要就来源于逆序的起承转落 

（你没拆第3个🎁？ 回去听！里面试用的滑动平均，是卷积的亲戚，也是[股市K线🎁](https://plotly.com/python/ohlc-charts/) 背景的一个元素

```py
import librosa as sa
```

[另外，喉咙也是用共振发音的](https://zhuanlan.zhihu.com/p/427300194)，频谱上有很多谐波，不像音高“线”，前3个共振峰(F1~3) 贡献了声韵。 反观著名的VocaloidV2/UTAU是用双音素拼接+拉音高(PSOLA)合成歌声的，V3和谷歌娘猜Mel频谱的参数则是靠HMM模型，比用语音学更方便(比如从拼音推理分词.是离散版Kalman滤波,还是[sd扩散模型](http://jalammar.github.io/illustrated-stable-diffusion/)的前馈) 

RNN上的Transformer(编码嵌入-解码注意) 则是一种[更现代的seq2seq推理模型](https://jalammar.github.io/illustrated-transformer/)，LSTM则更适合高时序的数组处理。

频谱,数,形… 帧率又是怎么来的？帧就是分页，电脑用帧来读写数据。网络的帧是包，"abc"的帧是/./字符，音视频流则会有已缓冲的区间。比如按1024byte=1K为分页向后加，甚至内存磁盘都要分段📟

所以，积分并不抽象。每次你下文件，都要按方块来算进度，你在游戏里按→键，下一帧的 `Player.x+=speed*dt`。 数学对可以算速率优化的求和的情况，做了一些整理，而Python圈把这些麻烦封装掉了。

不如，先把行分下页？

要减小截断效应，每页还要补一倍乘个窗函数，对应istft()还原时也分页乘窗，[称为OverLap-Add](https://www.zhihu.com/question/280648561/answer/2521849999)

```py
def sep(a, N, hop=lambda N:0, fill=None):
  n = len(a); nr=(N - n%N)%N #例 3-(4,3)%3
  a.extend([fill] * (nr+N-1))

  for i in range(0,n,N+hop(N)): yield a[i:i+N] #只需理解这一行

[*sep([1,2,3,4], 2)] #[[1, 2], [3, 4]]
for x in range(1, 7):
  print(x, [*sep([*range(x)],3, lambda N:-N//2)] ) # 在DSP里，页间有重叠
```

那么，你就能理解为什么变声器或EQ背后要 `X=stft(x); 频谱往上Shift; x=istft(X)` 了

__那就在文尾做一个“机器人声效”[Vocoder](https://github.com/jagger2048/PitchShifting/blob/master/readme.md#声乐理论) ，它处理[Demucs](https://huggingface.co/spaces/sparanoid/demucs-gpu)隔离出的语音。__

>谢谢你，_Daisy Bell_ --IBM704(1961)

- [跟着 librosa 做实验🎁](https://librosa.org/doc/main/advanced.html), [torchaudio](https://pytorch.org/audio/stable/tutorials/audio_feature_extractions_tutorial.html#pitch), [Griffin-Lim vocoder](https://github.com/librosa/librosa/issues/434#issuecomment-291266229)- 声码器最初被用于节省对讲机和电话带宽
- [为更高频加更多窗的 “小波变换”DWT](https://www.quora.com/What-is-the-difference-between-wavelet-transform-and-STFT) - 为了抵抗“测不准定理”-即STFT的窗越小频谱越粗
- [logMel尺度消除谐波,更适合语音🎁](http://fancyerii.github.io/books/mfcc/) -- [简单版](https://blog.csdn.net/qq_44250700/article/details/125382044),[Lab](http://fancyerii.github.io/dev287x/ssp/)
- [CQT动态加窗,更适合钢琴](https://blog.csdn.net/qq_44250700/article/details/125382044)


## 如何画画

- [要启用动画🌀，请安装 ipympl](https://matplotlib.org/ipympl/installing.html), 一个 `jupyter nbextension`, [安完可玩"双摆"](https://matplotlib.org/stable/gallery/animation/double_pendulum.html)
- 需手动执行 `%matplotlib nbAgg` ,等效[rc样式表 backend:nbAgg](https://matplotlib.org/stable/users/explain/customizing.html#the-matplotlibrc-file)

在FT的输入里，小数被自动推广到“复数”complex。准确点说吧：

```h
data Vec2(x, y=0)
  at a 角度 arctan2() “0~1圈右向朝上”
  at v 力度 length() “velocity 速度”
^named
  at `τ` *2*PI  “规范写法 1tr”
  - T(a,v) Vec2(sin(aτ)*v,cos(aτ)*v)

at N2 Vec2 “P开头的都是点，v开头都是力”
at:
  → N2(1) “标枪方向”
  ← N2(-1)
  ↑ N2.T(.5, 1)
  ↖ N2.T(.75, 1)
  ↫ 我怎么弯的？算了，继续说吧
  ↑ np.angle(0+1j)/np.pi==0.5, 返回 -pi~pi
```

dot(相乘和)在几何上能求夹角🧭，叉乘更有意思，意义是3D垂直(求法线)，其长度也能构成对角线

在numpy里，我们用C语言也有的“复数”complex 做旋转: `P1=P*np.exp(a)`

```py
#搞错了，三角剖分不是一笔画

def uDraw(got, wh=(5,4)):
```


__只用这条复数乘法，就不会突破2D欧拉的几何空间__，避免横生枝节到线代上去。  为啥不直接用Vec2呢？因为向量计算靠变形矩阵，不好写

`e^a=(cosa+sina j)`, 与复数乘法 `(X Y)(x y)=(Xx-Yy  Xy+Yx)` 组合后，符合下图物理式

```py
fig = plt.figure()
```

猜猜我为啥不严谨点，背出 `z1=a+bi, z2=c+di, (ac-bd)+(bc+ad)i` ？

说到这个e，你试试用 参数方程(t in 0~τ) 定义下极座标系；就像本文里的2π，没有照本宣科，从而“单位化”了很多函数。

如果只是删掉“当且仅当”“显然有”，那确实和他们一样是玩文字游戏，但通过字面暗示两个值、两种知识的类似，就是一种「泛而不空」的思考、设计

复数只有在涉及如乘法时，它 `a+bi` 的字面才有意思；但复空间是美的，比如Mandelbrot 分形和它的Julia集，一个隐函数([sdCirc🎁](https://iquilezles.org/articles/distfunctions2d),.)灰度图 。

最后，在C++里xyav分别为 real,imag, arg,abs ，尽管科学计算，还是用易懂易加速的Python

既然输入是点集，就可以对SVG简笔画应用FFT了。 这就是它能被可视化的基础，点集的列表即“时轴”， __点的xy在发生规律变化 ✍ ，只是这次初始y非0了__ 

这是一位好老师的简笔画。希望无论在人生的哪一点，你都能遇到为自由自信、为好奇，而不是在名词和“结论”上去论证的老师

还记得频域的食指吗？但这次我们是给高振幅画更大的轮辐，细节则从里一层的箭头+(频率)时间 迭代完所有指节

但是，折线图哪来的箭头呢？ 伸出食指,Y频率, 拇指,cos的叠加, 那么中指sin,就是画布上的'y轴'

指一下自己的脸，你会看见叫做xy的箭头如琴弦晃荡🪁在两根指头上，而你食指的3个指节，就记录着每个倍速圆的半径！

对了，学生不一定要画老师。技术，只是为了送给大家一支“画笔”

- [三角剖分:Live2D 布料使用的Mesh几何](https://www.zhihu.com/question/560716102/answer/3266882974)
- [“深先遍历”DFS 可视化](https://www.youtube.com/watch?v=-L-WgKMFuhE), [站点-箭头 A*搜索](https://youtu.be/CgW0HPHqFE8?t=16)

## 如何方程

>`f=cos3τx` 那章我们从古老的“傅里叶级数”Fourier Series 解释了求和。但，再恶补下微积分吧

`Int[1~2]:[x] 2x` 调用了 `- Int[xs](fn)  (1/N)*Sum[xs sep N](fn)`, (fn=`:[x]2x`) 是被积函数

`Sum[1~2]:[x] 2x` 是对曲边梯形的求面积，它把区间1~2 sep了2份，如果采样到N=4,8份呢？结果会膨胀，所以/N 。 d/dx 由此来

而用积分法则 x^2= x^3/3 ，做2点 f(B)-f(A) 后得数字。  数学书想同时求积分和导数，它们像无放能的正逆反应。

积分 x^2 模拟滴水入瓶，微分导数则记录速率的变化=`2x+(C=0)`，像距离和力 （不+C当“原点”会让 xx+3, xx+4 的导都是2x，容易混，所以线代里 kx+1C 不是线！

现实世界用 Matlab,Desmos,torch, sympy 等编程平台算微积分，它们使用了卡脖子的开源LAPACK,BLAS，对了，免费能抄又像作弊的东西，凭啥有国际竞争力呢？ 我们目光短浅，还是讲能1分千人的传统数学吧。

最后，定积分公式 `d/dn ∫_0^n f(x)dx` 里Δx(微分小量)不是系数，它表示x=范围。约掉d, 求和/全局采样率即离散

恶补玩了，但有关FT的只有定积分。而上文我们调用的领域，被称为《线性代数》🥵…… 累+电脑=快乐+我！

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

y=2x 在编程里 `y(参数,)没先绑定x` 那必是全局或this.变数！ 但说2x是x绑定到坐标系，不是什么“盒子”代入数，就能解释了，这就是线代为何写x矩阵不写y

🫶是曲线，但不是函数-它不满足1x:1y🎢 或 Nx:1y 的关联，而 `r=1-sin(t), t=0~2pi` 是另一个视口上的函数。 还记得圆的一般方程吗？请试玩 `S.plot_implicit(x**2+y**2 -1**2)`, 调用abs()

“视窗”的函数呢？ `def y(x:int定义域)->int值域: 无操作; return 2*x`, `js(x=>2*x)`。 y的范围(min~max)在def的“计算器语意”下，算不出，但多项式可以

这些话没跑题。FFT就是从点值式求(Hz)次数！[多项式📊的次数表示法](https://www.shuxuele.com/algebra/polynomials.html#:~:text=标准型)，能速算乘法和卷积

`np.linalg` 也支持解二元方乘。高斯消元，只需把等式们按列遍历

```js
>请化简多项式，编号[系数-常数]
[x y 系数@解]
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

>这叫上三角(REF矩阵, 可求秩)，通过回代获得1个解
[1 2 47] -其他元的解, -2*12
[0 1 12]
[23,12]=[x,y]
```

解题是靠初等变换？ 是说以下代码里，行向量上的四则函数吗？

```py
def elim(A, y):
  n, m = A.shape; assert n==m, "需方阵"
  M = np.hstack([A, y.reshape(-1, 1)]) # M=(A|常数项b)

  for j in range(m):
    # 向下[j:] 找元最强的行，换为本行(i,j=j,i)。会在回代里获取
    i= np.argmax(abs(M[j:,j]))+j; assert M[i,j]!=0, "无解,不可逆矩阵"
    if i!=j: M[[i,j]] = M[[j,i]]
    # 归一，因此后面行消它
    M[j] /=  M[j, j]
    for i in range(j+1, m):
      M[i] -=  M[i,j]* M[j]

  x=np.zeros(n) #逐行, 约旦回代
  for i in reversed(range(n)):
    x[i] = M[i,m] - M[i, i:m] @x[i:m]
  return x

print(
  解:=elim(*map(np.array, S.linear_eq_to_matrix(list(a), [x,y]) )),
  [2,4] @解 #np.dot(A,x)==94
)
# 请上手，外提 elimS(a,[x,y])
```

- [用迭代法求N(π,10)](https://stackoverflow.com/questions/347734/gauss-legendre-algorithm-in-python), `S.oo.evalf(10)`
- [放松解压的反民科科普](https://www.zhihu.com/column/c_1079425408197492736)
- [卷积神经网络](https://cuijiahua.com/blog/2018/12/dl-10.html)
- [CG:频域的洋面模拟](https://www.youtube.com/watch?v=kGEqaX4Y4bQ), 你可以搜zhihu/Brown运动 ，频域和概率论也有关系

## 如何验证

对了，在[查询窗](https://swish.swi-prolog.org/)左右两侧写下 `:-use_module(library(clpq)).` 和 `{2*X+4*Y = 94, X+Y = 35}` 也能解方程🙆‍♂️，甚至数独

即便把35换成'A'，CLP{Q,R} 依然能求解(同sympy,解析式,但 `{X^2+2*X+1=0}` 显示树)，这也是泛型的原理。 //echo clp{q,r}

> `昆虫:-好玩. 昆虫(蚂蚁). 好玩(蚂蚁)` 是三段论, 也是深先遍历

数学命题“若p，则有q, p→q” 即 `x(R) :- [2,R]=[L,1].` 两边的语意。⇔充要则如 `bro(佩奇,乔治).` 猜猜 `sis(X,R):- ?`  

诶，吐槽一句，`sis(X,R).` 写成 `Sis(x,r)` 才更像“生成式”SQL表的行吧！ `main(int,[[char]], void). add([Int List], Str, void).` 又更像函数重载了

clpfd 则允许遍历解集∀∄ --`名:意 ∈in ⋀, ⋁; ¬\+`
- `forall((N in 1..5, label([N])), between(1,6,N))` 成立
- `N in 1..5, \+ N#=5` 无解
- `A in 0..9, labeling([max(A)],[A])` A=10个解
- [tch的计科笔记](https://github.com/tch0/notes/)
- [直觉主义](https://zh.wikipedia.org/wiki/直觉主义#参看)


还是用Eq关系(stft,istft)，把声音换到图片应用滤镜，例如高斯模糊…… 最好是把一个.wav 文件与.png 做绑定，就像NodeJS 和 `bun dev` 那样

```py
#拿竖条- HSV分量储存低到高频(幅角,幅值,1)
```


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

最后，感谢你学习信号处理领域的基本功！👏


