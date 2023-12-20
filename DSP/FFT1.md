# 如何“学习”人类用5行搞懂FFT

这是一条线。琴弦震动拍打空气、光线逃过涂料吸收，就产生了波， 波传导到内耳，聚焦到眼底，就变成神经节的电流，让动物产生反射--就像晶震在数码表的IC蚀刻板上游走。

这条信号之线，是声光电的编辑器，而波的编辑器和乐谱，叫“频域X”freq domain 。4G就采用“频分多址”OFDMA通讯

cosx波峰间是周期(1τ=1turn=2pi=360deg, 等于Hz)，快周期在高“Y频率”freq，而线的力度叫“v幅值”amplitude value、x的时移叫做“t幅角”phase。 这几段电音就是 `v*cos(t+Yx)` 的独奏-或和弦 //aka. 振幅🔊  相位🎡 

FFT，是“傅里叶变换”Fourier Transform 目前的速算法和代名词，被音视频剪辑/可视化CG/通讯和[医械🩺](https://text.paperclip.eu.org/Vol.066/#:~:text=照射后会得到三个投影)/嵌入式和EE 领域使用。__本文会先教你如何用DFT实现__ ，求音频的音高线，也就是K歌评分--鬼畜调教时的幕后算法

>暖心摘要：全篇含过量的[调包侠]，导致有4个示例能上手运行，除py包还导入了10+工具站点。~~喜欢重造轮子的[代数大佬慎入](https://antkillerfarm.github.io/math/2022/01/07/linear_algebra.html) 论文引论文，应用链应用，非常好割裂，使我的卷积核旋转~~

先问为什么，慢讲是什么。 剪辑时，在横轴时域选音频范围，会改变时长。 如果在纵轴剪切🤏，是否本该降低它的清晰度？ 这就是频域拉伸(倍速播放,压制,修音消音,.)的广阔应用。

我这次主讲DSP(信号处理)、线代+积分(更现代的解析几何)，但其实有点杂。原理、公式、应用都在文里了，这些字大概能省下你推敲数学题库的时间，请你在背公式前，先动手试玩吧！


- [@jezzmon 可视化🎁](https://www.jezzamon.com/fourier/)
- 非周期的方波，做Y个频sin的叠加就能拟合-[对此例](https://www.desmos.com/calculator/gjpuxeuwbj) cos0=1。 幅值最大的叫基频F0，不一定在低频
- Y个频的cos,sin以负部[干涉效应]，与输入x叠乘，求和出复数2D点得幅值幅角。只从幅值还原波形叫vocoder
- 44k音乐的最高频为22k，右半因[混叠]产生对称。FFT以此加速
- 分页处理录音，为减少[截断效应]，重叠1半乘三角窗。 __音乐“频谱”都指STFT__(dB响度即log + Mel音阶)

更practical的科普看点：
- 🧮声有LR2信道，光有RGB3信道，通过扫描重放。 图像相位描述了边缘
- 🎢滑动平均-平滑 是种[卷积]。卷积-频域好比微分-积分，如低通滤波-[在频域相乘等于在时域卷积](https://zhuanlan.zhihu.com/p/306413256#:~:text=滤波器比较)
- 复数/矩阵乘法能让点和线向左旋转
- 倒放比外语违和在单音素 响度ADSR的逆序；人声频谱上有很多谐波
- HMM是分类器版Kalman滤波，RNN的Transformer,ViT是它们的升级版- 你可以问GPT“用Transformer(GPT里的T)做矩阵求逆”
- PID平稳、ACTrie树和Markov链、2层XOR网络的可视化与Bool调用图对照
- 函数是线，GL Shader 只是算vec234的[隐函数](noisecreater.com)(["sd"Circ](https://iquilezles.org/articles/distfunctions2d),. 距离函数,近0=黑 ) 。定积分是能算速率优化的区间求和；梯度下降依赖速率(导数)找最低点；解鸡兔同笼只需10行算法

## 正文

高中数学告诉你，函数能描述距离和时间的关系，在 `t=0~1 `*60fps 的动画里，用y(t)=0~1的弹性[速率线重映射](epiceasing.com)位移就是一种日常但稀罕的技巧，`- lerp'ABt' A+(B-A)t` 就是线代的典型应用了

这段《卡农》的前4个和弦，是用 `sin(_1s)@ []*TR` 的电音加权求和来的。其实，频谱就是让歌与Y个音叉“共振”，没被抵消的振幅 就能显示为(Y)Hz的柱状图了

1s的音频采样。在录音或摄像的过程中，就已经被“积分”了：比如1秒sr=44.1kHz 个数值🎢, 每张图500px🧮。每一点叫“分量”，整体叫 (44k)维向量

分析时会视作 (sr,1)形状的矩阵，把1行转 44k行,1列 。dtype也从小数clip(钳,clamp)乘到s16等整数，称为“脉码调制”PCM

把左手食指竖到采样x上🍡，它就是这条线的频谱。以手指有Y=3格, 0~2为例，指根频 `Y[0]=0, Y[1]=1,. ` 每行乘sr个点算基频 `cos(Yτ) 再@x` 逐行相乘 求幅值，得1列频域

```py
import numpy as np
from matplotlib import pyplot as plt, animation
from ipywidgets import interact as ui

def FFT(x, fwd=-1j):
  t = np.arange(0, sr:=len(x)); _1 = (1 if fwd==1j else sr)
  #所有频 *linspace(0~1)
  Y = t.reshape(sr,1) *t/sr
  #return ( (np.cos(Y*TR)@x) + (np.sin(Y*TR)@x)*fwd )/_1
  return np.exp(Y*TR *fwd)@x /_1

TR=2*np.pi
iFFT=lambda X:\
  FFT(X, 1j).real
#相乘求和 公式即 X[k]=∑_x f(x)e^(k*-2jpi x/sr), x/sr=0~1, e^j=向量P(0,1j)

#cos3τx+cos5τx, 先乘后加
q=lambda 各频:\
  lambda x: sum(np.cos([x* y*TR for y in 各频]))

x=np.linspace(0,1, sr:=50)
f=q([3,5])

plt.stem(abs(X:=FFT(f(x))))
plt.plot(x*sr, f(x)+3)
plt.plot(iFFT(X))
#n=7; plt.plot( np.convolve(f(x), np.ones(n)/n) ) #滑动平均，Gauss blur(1px)=9格正态分布
```

这就是y轴频域(钢琴卷帘🎼)。根部到指尖，就是到低音炮到粉笔刮的分类。朝右一横👉就是随身听里，一帧帧柱图的高低了。 每1频行的点值，产生了频域的波，你在均衡器音效里，看到的柱图(EQ滤镜)也是个滤波器。 

滤波器也叫线性系统，就像线叫信号，NN神经网络和训练结果都叫模型，就像正逆FT的输入，是同构的(信息量一样,比如这张“白噪声”)

>PCM,如白噪声 `ffplay -ar 48000 -f s16le -ac 2 /dev/random` ，码率 -b 128kb 是录制时的逆压缩率。[查查sign 16bit是啥？](https://sdl.moe/post/ffmpeg-001/#:~:text=色彩深度)

上面拿 `(44,1), (44,)` 两种参数调用乘法会用到“广播”broadcast，比如 `向量*向量`，短的一边左部补1，然后差异维度的'*'以非1的那边为基准 得出 `(44,44)` ，而只要size相同靠 `reshape(-1,1)` 就能实现for赋值了

另外，`np.concatenate([a,b], axis=0vstack 1hstack)`, 可以看出np是以 `bmp[i<n行][j<m列][0~2即:3]` 来编排矩阵的，用 `bw[:][:]` slice就可以实现棋盘格等赋值，文尾会考。

数组叫PCM，而大国工匠抖急停键的手 叫“脉宽调制”PWM 🎇--还有B站的《高压玩具HVT》系列 //我劝天公重抖手，不拘一格酱人才

……等等，x代表声波或函数线我能理解，X被画成柱形图或灰度图的I字线(🏁“热力图”heatmap)也好说，但 `X随[Y]` 算什么函数？转转看！ `P=[2,1]; P.T==[1,2]`

但是， __为什么加权求和不会越加越大？__ np.exp()是cos吗？ 再说，0频能删吧？

震动是和《瑞克莫蒂》一样对称拉扯的，其求和默认是0，相同频率的cos<0会乘出一二象限的全正值

用极座标r=t系再转转看！作为画圆时的x维，`r=cos(a t), 0<t<1τ` 在a=1时很像“在一二象限”， 否则以1Hz缠绕在零点⚛️，所以分析 `f=cos3τx` 只需迭代Y=0~3τ求和 `cos(Yx)f(x)`
- [“缠绕”可视化](http://www.billconnelly.net/?p=276)
- [座标上的艺术🎁](https://youtu.be/Ey-W3xwNJU8?t=161), [sd棋盘格🏁](https://www.desmos.com/calculator/chzz3rjxgo)
- [FS,引用了FT公式](https://www.desmos.com/calculator/qpnz9celzf)

__0频能删吧？__ 不能。exp(Yτ *-1j)缠绕速度因此存在

`sin0=0, cos0=1` ，无论多少sin都不能拟合 刚刚被移到y轴右边的方波，尽管 `cos(x+11)` 几乎就是sinx，“余弦”cosine 的co也意为协作。

叠加出空间的称为基向量，FFT的返回值是种[正交基](https://thinkdsp-cn.readthedocs.io/zh-cn/latest/06-discrete-cosine-transform.html#id6)。 用矩阵还能做“泰勒展开”和分子式配平！

物理速度向量,vec3(RGB),exp(Yτ)基频 也叫矩阵，kx+1b 不能叫矩阵(单多N维点) -它未实现“线性映射”的数乘，无法被线性变换（到90度转等新座标系 -即稍后AI的章节谓“空间”）

偷偷告诉你，《植物大战僵尸》的棋盘格也是个矩阵，你可以单独看待它的每一 `行[i]`，而 `M[i][列0]` 就属于小推车

如果看不懂逐行相乘求和，可以把信号x理解为2行半透明植物的混成。 把卡组Y(频段)里的豌豆 玉米 西瓜 与混成图逐个求相关，即得到Y行的构成 `exp(Yτ) @x`

### 自然界

三棱镜分频段的折射率🌈，就像波之间(水波叠加)的干涉效应。让声音🎼像光一样能分解，是比“数形结合”还合理的设计

但频域有sr行太多了，语音是 80~300Hz(歌声到1kHz, [人耳是20,20k](https://mynoise.net/NoiseMachines/forty40HzBrainwaveGenerator.php))，而[吉他乐器A4=440Hz 🎁🎁](http://luser.github.io/javascript-karplus-strong/) ~~武器A?~~

礼包里用于合成木琴的 “滑动平均”moving average ，是卷积的一种，也是[股市K线🎁](https://plotly.com/python/ohlc-charts/) 背景的一个元素，下章的STFT就基于平滑渐变。但还是先展望下“声学”acoustics 之外的图像信号吧！

>谢谢你，Joseph Fourier(1822), Cooley-Tukey(1965)

有时，水滴下的屏幕，或投影仪就会让你看出每个像素点，里面仿佛有3个LED--3个红蓝眼镜🚥，你猜3点背后都是啥色？ 44kHz的颜色！

猜对了，也就是说标准VGA信号接口的帧频60Hz,行刷新率31.5 kHz, 耗流量比声音快几千倍！ 1帧扫描640格x480行x RGB 3通道

游戏设置里"关VSync超频"就是指这个--CRT扫描。 至于RGB'A'那是CG里的图层有色度(蒙版,能实现橡皮擦等)

请问，像素图是(x,y)座标系吗？ 并不是！请记住，灰度图可以视为(x,y,v=0~255) 的3D点云-但仅限正交，即高程图。 颜色必须占1个维度，如此才称为“点集”。

比如说，修改单点(0D)的亮度需要靠1D的滑条，1D的灰度条-如均衡器EQ 一般编辑为2D的柱形图，2D灰度则由基于像素加减的笔刷和滤镜调整。 三者对应动画、音频、图片剪辑软件，它们的“框选”分别是在 t,t,xy 轴，还都有速度(即频率)或距离的概念

声道和图层的混合成，是同义词，图像的尖锐和厚实，在声音里也有意义。 [对JPEG来说](https://sdl.moe/post/ffmpeg-004/#量化)，“灰度图”greys[y,x] 在横方向斑马线的密度越高，就越尖锐🏁。它把每8x8像素换为频率--(0,0)就保存纯白斑马线🏳️的亮度

而数学弄的连续函数，并不能放在物理世界内，也无法仅用numpy(cv2)矩阵保存。(Matlab并不支持采样率自动一致化,是吧?  加上这个就不必区分连续和离散了, 现在和C语言无长度的数组str很像啊)

但GPU加速的基石是距离函数。sd(显卡绘画)和sd AI绘画有啥区别啊！ 这就要看[单步光追SDF](https://www.alanzucconi.com/2016/07/01/raymarching/)和[3D灰度统计NeRF](https://zhuanlan.zhihu.com/p/664356865)各如何理解“物体”“像素”和光源的反射了。

函数有多项参数易手调，而方程只能设置形状和常数。 总之，各种GL,CV用基于FFT的函数检测输入，毕竟物理规律是普世的(比如,美颜)；而AI从卷积等低层特征向上堆砌，能找到比频谱更智能的分割面，相当于编写了“无法被公式化”的物理模拟🫶

其实“学习与推测”和“思考转化”也是两种东西。做题是种黑箱函数(或者说无脑堆if-return弄出的屎山,没有泛化力)，而网状的解析是现代科学和AI训练的根基

取色器 `HSV(色调 色度 亮度)` 里色调=频率🌈，Alpha=有色度🫧，频率高的绿光、5GHz信号穿透力更差-除了激光笔X射线等高频高能电磁波，它们的相位差很小，容易“共振”而非折射抵消。

“共振”还被用来实现 `原唱-BGM=人声` 。在Audacity里，放大到采样点的级别对齐后，对BGM轨上下反转，混音会得到意料之外的结果

>谢谢你，电磁波论、“真空场的”光速常数 `c` --Maxwell(1862), Einstein(1905)

那光的相位对应啥？光的波段10e14 比空气快太多，比最快的高速摄影还多8个次！

但图像靠相位保存边缘轮廓(`cv2.phaseCorrelate`)。不分页做FT时，若只知道一堆都在0点、振幅不同的cos的叠加.. 中心都会很亮，因此2D振幅上都是“低通”lowpass 的

现实有太多误差，测不准的，用24fps的肉眼，会觉得风扇是在倒着转，也看不清音叉越震越弱！ 4.4k采样能承载的最高频，是2.2k，即Nyquist频率--已反映在频域上

每当你拍屏幕时，出现的摩尔纹，就是两边像素的“光栅”太松，像网眼布混叠在一起；只要1格纹理采至2个像素，高频杂音自然会消失， 反观[《冒险小虎队》的解密卡](https://www.zhihu.com/question/21650222/answer/3034950003#:~:text=文字，其条纹和解密卡的角度一致) 却靠混叠显字形！

对了，拿1根火柴如何保存1T数据呢? 答案是用base10编码文件，作为浮点在棒子上划一道，有点类似"ntfs-pifs"。 不过，香农极限 `有效位=log2(1+S/N) 带宽` 表明了信道S也是有丢包和错误率，这正是TCP字节流比UDP多担保的点，也关于rar,MD5,SHA的冗余备份 (hash算法,ipv6 都是 base16/[0-9a-f]/ 编码的二进制, ipv4是base10)

>1s/24f 只是视觉暂留效应的起点，人也能察觉120Hz的频闪。更快、更高、更细腻(1dp>1px HiDPI)！ MSAA 就通过超采样(深度DLSS?)优化矢量图，Nvidia FXAA 则基于边缘检测
- [最新waifu4x](https://real-cugan.animesales.xyz/), [IFRNet补帧](https://github.com/nihui/ifrnet-ncnn-vulkan#original-ifrnet-project), [colorize](https://github.com/magicse/ncnn-colorization/tree/main) AI滤镜包
- [NeRF如何生成3D模型](https://www.zhihu.com/question/528913695)

但看得慢也许是好事！[POV-LED](http://www.crazepony.com/wiki/pov-theory.html) 就是一种全息投影💫的方法。 关于乐理的“短时傅里叶”STFT，就靠「听觉暂留」了。

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

- [宏观粒子的波🎁](https://haha90.phy.ntnu.edu.tw/content/TeachAnime/allTeachinfAnimation/wave2DBasic/wave2DBasic.html), [物理原理](https://www.zhangzhenhu.com/audio/feature.html)
- [CG:洋面模拟🎁](https://lianera.github.io/post/2016/ocean-sectional/), [3D](https://www.youtube.com/watch?v=kGEqaX4Y4bQ), 你可以搜zhihu/Brown运动 ，频域和概率论也有关系
- [各种数学动画🎁](https://www.lfhacks.com/t/fourier/)

👏 [创作式编程入门](https://creativecoding.in/2022/12/26/p5js-workshop-clab-1/)
- [电音 HPF,LPF 滤波是什么🎁](https://muted.io/noise-generator/#:~:text=Types%20of%20Noise), [滤镜怎么写](https://fffuel.co/nnnoise/)
- [跟着 librosa 做实验🎁](https://librosa.org/doc/main/advanced.html), [torchaudio](https://pytorch.org/audio/stable/tutorials/audio_feature_extractions_tutorial.html#pitch)
- [纯js流体模拟](https://29a.ch/sandbox/2012/fluidcanvas/)
- [WebAudio FFT+p5js](https://openprocessing.org/sketch/1217455), [识图+八音盒](https://experiments.withgoogle.com/scan-sequencer)

## 如何调音

FT结果能还原输入，所以有人唱歌“自带电音”，__但为啥柱型图要分帧跳动？__

当你看那些关于扒谱的教程，或歌曲鉴定时，会发现它们使用一列列渐变色彩-热力图显示频域的变化，即频谱，越亮代表越 __接近“音高”pitch__,F0 🎺。钢琴 `MIDI=y=>2**((y-69)*12)*440`

音色同样不是频谱直接给出。拿频谱合成电音后，在时域包络(响度ADSR,起承转落)就能拟合各种自然声或音素(10~30ms,音乐采样率更高,4K点一窗)，歌声比TTS主要就是S段-颤音更长。倒放的违和感，主要就来源于逆序的起承转落 

有“测不准定理”窗大频谱变亮 颤音平滑，小波就=更高频更多窗。[你调下Audacity频谱🎁](https://chiptune.app/browse/Demo%20MIDI/Voyetra%20Orchestrator/)，就明白为啥(realtime)变声器或EQ背后，是调用 `X=stft(x); 频谱往上Shift; x=istft(X)` 
- F0推理: [DiffSinger](https://github.com/MoonInTheRiver/DiffSinger#overview)
- F0提取: [EAC](https://gist.github.com/anjiro/e148efe17c1e994981638b1a0c6d0954), [HPS](https://gist.github.com/carlthome/1e7244e31bd628a0dba233b6dceebaef), [pYIN](https://github.com/librosa/librosa/blob/5ca70f5d57fc597660452f011ffff55f9c36ed4b/librosa/core/pitch.py#L646), [ICASSP2022](https://github.com/keums/icassp2022-vocal-transcription)

（你没拆第3个🎁？ 回去听歌！

```py
import librosa as sa
```

频谱,跳动… 帧率又是怎么来的？帧就是分页，电脑用帧来读写数据。网络的帧是包，"abc"的帧是/./字符，音视频流则全靠已缓冲的区间。比如按1024byte=1K为分页向后加，甚至内存磁盘都要分段📟

可分页的处理，一般都能并行化(平行=没有香蕉)，这也是BT下载、分布式计算的理念

所以，积分并不抽象。每次你下文件，都要按方块来算进度，你在游戏里按→键，下一帧前 `Player.x+=speed*dt`

数学则对可以算速率加速的那种求和，做了一些整理。Python圈除了把这些死记硬背封装掉了，还支持对声音线做积分

不如，先把行分下页？要减小截断效应，每页还要重叠1半乘个窗函数，对应istft()还原时也分页乘窗，[称为OverLap-Add](https://www.meldaproduction.com/tutorials/text/equalizers#:~:text=not%20aligned%20with%20the%20previous%20or%20next%20blocks)

```py
def sep(a, N, hop=lambda N:0, fill=None):
  n = len(a); nr=(N - n%N)%N #例 3-(4,3)%3
  a.extend([fill] * (nr+N-1))

  for i in range(0,n,N+hop(N)): yield a[i:i+N] #只需理解这一行

[*sep([1,2,3,4], 2)] #[[1, 2], [3, 4]]
for x in range(1, 7):
  print(x, [*sep([*range(x)],3, lambda N:-N//2)] ) # 在DSP里，页间有重叠
```

这样也能把视频sep(1s,)切开，每段可以用不同的速度播放

- [Griffin-Lim vocoder](https://github.com/librosa/librosa/issues/434#issuecomment-291266229), [STFT实现](https://www.zhihu.com/question/280648561/answer/2521849999)- 声码器最初被用于节省对讲机和电话带宽

__那就在文尾做一个“机器人声效”[Vocoder](https://github.com/jagger2048/PitchShifting/blob/master/readme.md#声乐理论) ，它处理[Demucs](https://huggingface.co/spaces/sparanoid/demucs-gpu)隔离出的语音。__

>谢谢你，_Daisy Bell_ --IBM704(1961)

人声谱上有很多[“谐波”harmonics](https://en.wikipedia.org/wiki/Formant) ，不像音高“线”，[因为喉咙是用共振发音的](https://zhuanlan.zhihu.com/p/427300194)，前3个共振峰(F1~3) 贡献了声韵。 反观著名的VocaloidV2/UTAU用双音素拼接+拉音高(PSOLA)合成歌声，V3和谷歌娘则是猜Mel频谱的参数用HMM模型，已经是经典做法了 (HMM"韩梅梅",如从拼音推理分词,从音素串成音节,是分类器版Kalman滤波,还是sd扩散模型的前馈) 

从草图画到细节，就是[稳定扩散 by Jay Alammar](http://jalammar.github.io/illustrated-stable-diffusion/)，先找有几个对象再做实例分割，就是RCNN；AI在结构层往往就符合物理(比如B站用来蓝扣的U2Net就用到U状的卷积编码-解码上采样)

听说过PID控制吗？ [看起来就是个只振1下的弹簧🎁](https://bitbci.github.io/2022/05/04/12-xiang-mu-kai-fa/pid-kong-zhi-suan-fa-ji-python-shi-xian/#:~:text=PID在线模拟程序)，它的接口就是赋值并监听误差,[Svelte.js](https://svelte.dev/examples/spring) 都会。PI用于加快速度力度，D用于减少余波

```py
def kalman(f):
  kf = cv2.KalmanFilter(4, 2); DT=np.float32
  kf.measurementMatrix = DT([[1., 0, 0, 0], [0, 1, 0, 0]])
  kf.transitionMatrix = DT([[1., 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 0, 1]])
  for P in f:
    kf.correct(DT(P)); yield kf.predict()[:2].T #推理下1点，只看推理就是滤波
```

🚥就是一个Markov分布，红到绿的概率只与红有关。 你可能创建过文件夹(即Trie树)-如果把打开概率加入每个子项，就和拼音输入很像了。 倘若你把🚥3个文件夹链到当前目录不断进入，就能推理出第n次的大概率目录。最终每项概率会收敛到确定值，[这个值作为概率](https://community.modelscope.cn/63c103d72bcaa918ade9928f.html#:~:text=最后K个字符会被模型用来预测) 就能最合理地续写每字/每词/每句，这就是“MC算法”Markov链

再比如马里奥顶砖块，每格都有跳不跳2个状态，四格一画也至少能学到个“重力定律”+“禁止螺旋升天”。 当然喽，这4格矩阵，就是一张“图”digraph

其实大模型都像E = mc²  那样简洁，只是有70B, 175B.. 个浮点数。比如LLaMa2吧，需要 `70*8byte*训练需4 ~2T` 的内存和80G显存，不过33B的最低配用24G RTX显卡+30G内存 就能获得不错的离线推理

说的道理是，数学有“非欧几何”，超理也有“反相对论大佬”。他们会觉得 E=m*常数 太特化了，夸克不可分更是反人性化，因此 `E=wm+b` 更泛化、更符合自然规律...(b!=0 就是永动机了, 梦幻联动)

[正经神经网络结构🎁](https://zhuanlan.zhihu.com/p/372516381)([Keras代码](https://keras.io/guides/functional_api/#:~:text=Now%20plot%20the%20model%3A))的[可解释性🎁](https://www.zhihu.com/question/268384579/answer/2928561483)都很差，是有智能的黑箱函数。根本差异是在数据来源和算力
- 模型 `def 点的象限(xy:(2,))->1到4`, dataset就是示例参返
- 网络 N层,每层M个加权求激活的“线”, sum线能成分割面. 
- 激活 是靠分段函数把与输出(loss)不相关的信息归零
- 神经元 "FC层", 要让1个 `np.dot(w未知,x)-y` 逼近0, 先调整它右层的w
- 训练 挑选1点,计算模型的结果, 逐xy轴, 用 `损失函数(真实y,f(wx))` 调整w,增数要看导速乘学习率

刚才说马里奥是关于单变量t的，关于2个变量xy即FC网络，比如从AND,OR 的真值表[1 1 =1], [0 1 =1] [各学到一条分割线](https://www.desmos.com/calculator/mxyoq6siyp)，简单说就是枚举 `激活特征(dot(加权,输入))=对应输出`，比如OR是 `ax+by -0.5, ab=[1 1]`，通过[随机挑选,线性回归](https://www.desmos.com/calculator/bra3ao79ow?lang=zh-CN)慢慢调到最fit的权"ab"和 -增益 (bias, 即权重恒为1的项)

在[第二章](#自然界)我们提到，像素图只是一种不重叠的3D点集，因此这种Excel式的nD分类器通过深度网络结构，可以用于“看懂”图片

[而XOR就不能用1层直线分割了](https://towardsdatascience.com/how-neural-networks-solve-the-xor-problem-59763136bdd7#:~:text=consider%20our%20two%20perceptrons%20as%20black%20boxes)，必须靠缩放ReLU线段(_⊿的左半)来拟合。只需要用 `OR(OR(x), OR(x))=y` 形状的2D->1D"Tensor"流，框架自动用(目标y-y, 即Loss函数)比输入值让其权重下降个导数

loss降到0后会找出 `XOR(a,b)=a|b NAND (a&b)` 这2层“隐藏的”函数名。[看这个🎁-左下角是0,0](http://playground.tensorflow.org/#activation=relu&dataset=xor&seed=0.3&networkShape=2,2)，层2-0 把AND,OR 组合为NAND, 而层2-1的增益是0 。你可以把层1理解为N条有方向的2D线截面如 `-1x+2` -y>0 叠加，它已经能封闭出图形，层2,3就能是多个图形。只要重新生成训练集，就会发现XOR的其他算法

说起来，每条线都是权重，X1,X2即需加2权的点的xy, 蓝色即True("热力图",没忘吧)， [X1X2是单整数](https://github.com/tensorflow/playground/blob/master/src/playground.ts#L70C8-L70C8) ；XOR那文里的loss锯齿波是训练失败

为降低loss， dot(),ReLu 这些节点都自动对应(autograd,aka. backward)了导函数即 `f·g'=g'x f'(gx)`

`x^2` 这线的导速([可视化](https://www.desmos.com/calculator/6xlfatlbd9?lang=zh-CN))是 `2x`，也包括多项式，跟着上升率能走到0点，也能够调 `w[偏x轴]+=loss差()*学习率` 来拟合。 而[差定义](https://zhuanlan.zhihu.com/p/80370381)了任务级的注意力(人脸分类,年龄预测,生成,对抗识别,.)，也可以叫惩罚函数(该收敛了,这么一想AI界有点变态)

- [真·数学工具](https://zs.symbolab.com/)
- [支持3D的GeoGebra](https://www.geogebra.org/m/Bx8nFMNc)
- [Toy壁纸引擎](ShaderToy.com)的 “sdCirc” -请多对“术语” Ctrl+F
- yt搜索"Albert Learn", 看人工智障斗蛐蛐
- 拟合大家熟悉的1:1D sin,intStep(x): [keras](https://datascience.stackexchange.com/questions/19365/predict-sinus-with-keras-feed-forward-neural-network),[torch](https://www.zhihu.com/question/617270069/answer/3278039425)

从没见过猫的人只需1张照片就知道猫的形态和分类，AI却需要各种角度的成千上万条数据

多任务模型会替换几个层(分次拟合不同的loss)， 迁移学习和fine-tune 也是冻住[ptm,即pt文件,GPT里的那个pt](https://pytorch.org/vision/stable/models.html#table-of-all-available-classification-weights)只训练最后1层，这样能复用[大数据集的经验](https://zhuanlan.zhihu.com/p/42904109)

^[用反卷积](https://colab.research.google.com/github/keras-team/keras-io/blob/master/examples/vision/ipynb/visualizing_what_convnets_learn.ipynb#scrollTo=2xZrcNH0KgDP)和梯度上升，知道了卷积对什么边缘敏感

所以ML里的“函数”不是用来执行(能写死阈值/边界)，也不是x-y解集，只能说在知道模型入出的形状后，较右的“调用”为学习高层特征优化

1维网络也是"sd"灰度而非线，请想象 `y=x, 旋转:y1=2y, ..` ，经过几层是能交叉出分正负段函数

如果输入是"序列=序列"，就要[用HMM推测隐藏层概率](https://github.com/hitskyer/course/blob/master/dnn/chenmingming/PosTagging/hiddenMarkov.py#L61)，比如"jieba分词 和服=BE,我和服务=SSBE" 。

[Transformer推理模型](https://jalammar.github.io/illustrated-transformer/)(编码位置嵌入-解码记忆,自注意加速,KQ-V余弦相似度)则是一种更现代的seq2seq,DDPM则取代了GAN，RNN上的LSTM则更适合推理小数组的特征

总之，编解码也是为方便建立语言的中间表示(IR)，能串联多模态，而torch这些框架比sklearn灵活在[加权图的自由调整](https://github.com/onnx/tutorials#visualizing-onnx-models)，FC层就是多dot构成的单加权。 你可以从通用模型格式ONNX，看出大家都是固定大小矩阵(或者CNN卷积)拟合类似2D-XOR这样的距离函数，继续往上编码特征。 所以炼丹的代码格式有点类似DSP预处理+Scratch式拖积木拆特征

代码里
- FC/Dense/Linear/MLP 用M条线分隔输入, 有时先Flatten
- Conv 用一组滤镜片提取特征
- (Max)Pool 图片降采样, 加速
- Dropout,softmax(适合分类器) 随机丢弃神经元, 训练泛化力, 即用"逻辑"减少噪音
- Normalisation/L1/L2/BN 归一化输入,容易提升学习率
- SVM 是为二分类特化的Logist回归(比FC多条分隔线), kNN(KDTree)/GCN 用于关系图
- Concat,Add 就是numpy里的,[可以靠reduce组合](https://keras.io/examples/vision/image_classification_from_scratch/#:~:text=Add%20back%20residual)ResNet,即把层L的结果叠在L-1,也叫残差,SkipConnection
- [UNet](https://keras.io/examples/vision/oxford_pets_image_segmentation/) 就使用了3个组合,还有ConvT,简单Upsample 两种升采样, UNet直观解释了为啥都叫上/下采样
- 生成就是把现有特征向分类引导的识别，比如HMM。二者可通用，[PaddleSpeech] 就支持嵌入向量来做e2e声线转换

这就是“别名爆炸”，或者说概念碎片化。在入门ML时要有意识地拒绝对"噪音"死记硬背，别忘了AGI是向只看训练集和算力(SOTA)，弱化结构特征发展的，人们最终只会记住sd而不是GAN。有些代码最终该由AI编的

- [CNN.js图片/位移处理+线代可视化](https://cs.stanford.edu/people/karpathy/convnetjs/). 刚才的🎁也就300行js
- [20行 MNIST手写识别](https://github.com/Kaixhin/grokking-pytorch/blob/master/README.md#:~:text=def%20forward), [Keras🫶TF入门](https://keras.io/getting_started/intro_to_keras_for_engineers/)-推荐 `import fire as CLI`
- [ISMIR 音乐分类学基础](https://music-classification.github.io/tutorial/part2_basics/input-representations.html#melspectrograms)
- [“小波变换”DWT](https://www.quora.com/What-is-the-difference-between-wavelet-transform-and-STFT)
- [logMel消除谐波,更适合人耳谱🎁](https://github.com/apachecn/apachecn-dl-zh/blob/master/docs/handson-tl-py/8.md#:~:text=十二种不同音高类别) -- [省流版](https://blog.csdn.net/qq_44250700/article/details/125382044),[Lab by Li Li](http://fancyerii.github.io/books/mfcc/) - `librosa.feature.MFCC` 就是它的后继
- [CQT动态加窗,专攻钢琴谱](https://blog.csdn.net/qq_44250700/article/details/125382044), [加窗是什么 by He Wang](https://iphysresearch.github.io/blog/post/signal_processing/cqt/#:~:text=关于信号处理中的窗口)

## 如何画画

- [要启用动画🌀，请安装 ipympl](https://matplotlib.org/ipympl/installing.html), 一个 `jupyter nbextension`, [安完可玩"双摆"](https://matplotlib.org/stable/gallery/animation/double_pendulum.html)
- 你可以部署纯CPU的torch(~200M) `pip install -i https://download.pytorch.org/whl/cpu torchaudio torchvision`, [GPU加速需N卡+2G](https://pytorch.org/get-started/locally/)
- 需手动执行 `%matplotlib nbAgg` ,等效[rc样式表 backend:nbAgg](https://matplotlib.org/stable/users/explain/customizing.html#the-matplotlibrc-file)

在FT的输入里，小数被自动推广到"复数"complex。准确点说吧：

```h
name Vec2(x, y=0)
  at a 角度 arctan2() “0~1圈右向朝上”
  at v 力度 length() “velocity 速度”
^name
  - a(a, v=1) Vec2(sin(aτ)*v,cos(aτ)*v)
  at `τ` *2*PI  “规范写法 1tr”

at N2 Vec2 “P开头的都是点，v开头都是力”
at:
  → N2(1) “标枪方向”
  ← N2(-1)
  ↑ N2.a(.5, 1)
  ↖ N2.a(.75, 1)
  ↫ 我怎么弯的？算了，继续说吧
  ↑ np.angle(0+1j)/np.pi==0.5, 返回 -pi~pi
```

dot(相乘和)在几何上能求夹角🧭，叉乘更有意思，意义是3D垂直(求法线)，其长度也能构成对角线

在numpy里，我们用C语言也有的“复数”complex 做旋转: `P1=P*np.exp(a)`

__只用这条复数乘法，就不会突破2D欧拉的几何空间__，避免横生枝节到线代上去。

```py
#搞错了，三角剖分不算一笔画

def uDraw(got, wh=(5,4)):

```

为啥不直接用Vec2呢？因为向量计算靠变形矩阵，不好写

`e^a=(cosa+sina j)`, 与复数乘法 `(X Y)(x y)=(Xx-Yy  Xy+Yx)` 组合后，符合下图物理式

猜猜我为啥不严谨点，背出 `z1=a+bi, z2=c+di, (ac-bd)+(bc+ad)i` ？

说到这个e，你试试用 参数方程(t in 0~τ) 定义下极座标系；就像本文里的2π，没有照本宣科，从而“单位化”了很多函数。

```py
fig = plt.figure()
```

如果只是删掉“当且仅当”“显然有”，那确实和他们一样是玩文字游戏，但通过字面暗示两个值、两种知识的类似，就是一种「泛而不空」的思考、设计

复数只有在涉及如乘法时，它 `a+bi` 的字面才有意思；但复空间是美的，比如Mandelbrot 分形和它的Julia集，一个隐函数。

最后，在C++里xyav分别为 real,imag, arg,abs ，尽管科学计算，还是用易懂易加速的Python

- [Kalman滤波 噪声符合高斯分布 by 四一](https://yunyang1994.gitee.io/2021/07/10/卡尔曼滤波算法-永远滴神/#:~:text=阿波罗登月)
- [torch kalman](https://github.com/vietdelta/TrafficCounting/blob/master/kalman_filter.py), [可视化](https://colab.research.google.com/github/TaiPhamD/kalman_torch/blob/master/kalman_torch.ipynb)
- [Transformer 与AI](https://zh.d2l.ai/chapter_attention-mechanisms/attention-cues.html)
- [卷积神经网络](https://cuijiahua.com/blog/2018/12/dl-10.html#:~:text=MNIST手写数字识别), [BP从输出推导最优参数-即权重](https://blog.xecades.xyz/articles/neuralNetwork)

软核✍：
- [用迭代法求N(π,10)](https://stackoverflow.com/questions/347734/gauss-legendre-algorithm-in-python), `S.oo.evalf(10)`
- [三角剖分:Live2D 布料使用的Mesh几何](https://www.zhihu.com/question/560716102/answer/3266882974)
- [“深先遍历”DFS 可视化](https://www.youtube.com/watch?v=-L-WgKMFuhE), [站点-箭头 A*搜索](https://youtu.be/CgW0HPHqFE8?t=16)

### 转圈圈

既然输入是点集，就可以对SVG简笔画应用FFT了。 这就是它能被可视化的基础，点集的列表即“时轴”， __点的xy在发生规律变化 ✍ ，只是这次初始y非0了__ 

这是一位好老师的简笔画。希望无论在人生的哪一点，你都能遇到为自由自信、为好奇，而不是在术语和“结论”上去论证的老师

还记得频域的食指吗？但这次我们是给高振幅画更大的轮辐，细节则从里一层的箭头+(频率)时间 迭代完所有指节

但是，折线图哪来的箭头呢？ 伸出食指,Y频率, 拇指,cos的叠加, 那么中指sin,就是画布上的'y轴'

指一下自己的脸，你会看见叫做xy的箭头如琴弦晃荡🪁在两根指头上，而你食指的3个指节，就记录着每个倍速圆的半径！

对了，学生不一定要画老师。技术，只是为了送给大家一支“画笔”

- [scipy.fft 其实输入实数更优化](http://fftw.org/fftw2_doc/fftw_2.html#:~:text=for%20real%20data%20are%20the%20complex%20conjugate)
- [典型C实现](https://github.com/numpy/numpy/blob/v1.26.0/numpy/fft/_pocketfft.c#L1271) 用 [plan DP模拟递归](https://ddosvoid.github.io/tags/)来加速
- [SIMD于x86 CPU](http://www.jiashengli.cn/article/detail/?id=26)

## 如何方程

>`f=cos3τx` 那章我们从古老的“傅里叶级数”Fourier Series 解释了求和。但，再恶补下微积分吧

`Int[1~2]:[x] 2x` 调用了 `- Int[xs](fn)  (1/N)*Sum[xs sep N](fn)`, (fn=`:[x]2x`,N=采样率) 是被积函数

`Sum[1~2]:[x] 2x` 是对曲边梯形的求面积，它把区间1~2 sep了2份，如果N=4,8？结果会膨胀，所以/N 。 d/dx 由此来

或用积分法则 x^2= x^3/3 ，做2点 f(B)-f(A) 后得数字。  数学书想同时求积分和导数，它们像无放能的正逆反应。

积分 x^2 模拟滴水入瓶，微分导数则记录速率的变化=`2x+(C=0)`。像距离和力，不+C当“原点”会让 xx+3, xx+4 的导都是2x，容易混，所以线代里 kx+1b 不是线！

不过，`xx, xy, sqrt` 这些多次和根式也不是线，除非你用二次型(`x.T@[0 1; 1 0]@x`,一个圆)

现实世界用 Matlab,Desmos,sympy 等编程平台算微积分，torch就是自动微分+GPU的numpy。它们使用了卡脖子的开源LAPACK,BLAS，对了，能抄又像作弊的白嫖的知识，凭啥有国际竞争力？ 我们目光短浅，还是讲能1分千人的传统数学吧。

最后，定积分公式 `d/dn ∫_0^n f(x)dx` 里Δx(微分小量)不是系数，它表示x=范围。约掉d, 求和/全局采样率N,即离散。同样,回头看Int, 不就是算端点而非步长的Sum？

恶补玩了，但有关FT的只有求和-积分符号∫只是∑的拉伸啊。 而上文我们调用的领域，被称为《线性代数》🥵…… 累+电脑=快乐+我！

```py
#两条线: x + y = 35, 2x + 4y = 94
#x+1=1 换成 x+1-1 ，就能用分配律理解移项换号了
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
S.plot(2**x, S.log(x,2), xlim=(-10,10),ylim=(-10,10)) #exp(x).T=logx, 它们是反函数. ceil(log(x))就是x10进制长度
# x**2, sqrt(x); lnx/ln2 = log2, 从线的角度看 10e0==1 挺合理

display(
  S.diff(x**2), S.integrate(x**2, (x, 0,2))
)
```

这就对了。算sin算积分，记公式这么无聊的事，就应该调函数来做☎️。数学的函数，那叫“线”

y=2x 在编程里 `y(参数,)没先绑定x` 那必是全局或this.变数，不是什么“盒子”代入数！ 但说2x是x绑定到坐标系，就能解释了，这就是线代为何写x矩阵不写y

🫶是曲线，但不是函数-它不满足1x:1y🎢 或 Nx:1y 的关联，而 `r=1-sin(t), t=0~2pi` 是另一个空间上的函数。 还记得圆的一般方程吗？请试玩 `S.plot_implicit(x**2+y**2 -1**2)`, 调用abs()

“视窗”的函数呢？ `def y(x:int定义域)->int值域: 无操作; return 2*x`, `js(x=>2*x)`。 y的范围(min~max)在def的“计算器语意”下，算不出，但多项式可以

这些话没跑题。FFT就是从系数式求(Hz)次数！[多项式📊的频域](https://www.shuxuele.com/algebra/polynomials-multiplying.html#:~:text=把结果相加)，能速算乘法-把次数相加 就算2,4乘过了

在时域卷积(滑移算多项式!)等于在频域相乘，[边缘检测又是求图xy方向灰度的导速](https://www.opencv.org.cn/opencvdoc/2.3.2/html/doc/tutorials/imgproc/table_of_content_imgproc/table_of_content_imgproc.html#:~:text=如何计算梯度)。还记得微分吗？ 对每个频乘S，就是缩放所有被积的微分，故换为高通滤波可以减少滑移数

2D卷积核呢(blur等)一般是对称的。信号系统类似队列，先吃的早衰，所以与“衰减线”“递增线”滑积求余量时，先翻转

你可能在想为啥cos,sin 这些曲线能跑数论里了，但ln(=log e)就是这样。就像割圆术，sin也是能用次数逼近的：[e^πi+1＝0](https://www.shuxuele.com/algebra/eulers-formula.html#:~:text=奇迹出现)

既然本文使用Vec2(0~tau,1)代替pi和虚数i，欧拉数e 也就提一嘴吧，e是1元利滚利(+.33, +.66+.11,. ~2.7) 的最大化，它的导是自己，打“九九表”最适合以e为底

[fibonacci螺线就是黄金比例](https://www.desmos.com/calculator/8h6f6jgikq)， r=a^t 是等角螺线(打开左侧菜单 里面就有)。下篇我会画三角分形、赵爽弦图

`np.linalg.solve` 也支持解二元方乘。高斯消元，只需把等式们按列遍历

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

此外，LU分解法(下-上三角归一)可并行化，逆矩阵需对每列做消元

解题是靠初等变换？ 是说以下代码里，行向量上的四则函数吗？

```py
def elim(A, y):
  n, m = A.shape; assert n==m, "需方阵"
  求解=y is not None
  竖 = y.reshape(-1, 1) if 求解 else np.eye(n)
  M = np.hstack([A, 竖]) # M=(A|常数项b)

  for j in range(m):
    # 向下[j:] 找元最强的行，换为本行(i,j=j,i)。终使上三角◹非0
    i= np.argmax(abs(M[j:,j]))+j; assert M[i,j]!=0, "无解,不可逆矩阵"
    if i!=j: M[[i,j]] = M[[j,i]]
    # 归一，因此后面行消它
    M[j] /=  M[j, j]
    for i in range(j+1, m) if 求解 else np.where(np.arange(m)!=j)[0]:
      M[i] -=  M[j]*M[i,j]

  if not 求解: return M[:,m:]
  x=np.zeros(n) #逐行, 约旦回代 Ax=y
  for j in reversed(range(m)):
    x[j] = M[j,m] - M[j, j:m]@x[j:m] #再次消元
  return x

print(
  解:=elim(*map(np.array, S.linear_eq_to_matrix(list(a), [x,y]) )),
  [2,4] @解 #np.dot(A,x)==94
)
# 请上手，外提 elimS(a,[x,y]) , 请试用np.linalg.inv(方阵)@方阵. 矩阵的秩是sum!=0行的数量
```

np里 `a[a!=0]` (where)和 `a[[0,1]]` 都是过滤器，pandas就基于这个

对了，还记得缓存式递归的DP吗？ 这些是“指针不同”的杨辉三角，猜猜哪段(code.golf)是对的😨

```py
n=9; a=np.ones((n,n))
for i in range(1,n):
  a[i]=a[i-1]+np.arange(n)
(a,
[np.fliplr(a).diagonal(i) for i in reversed(range(n))])

import itertools as It
def iself(n,fn):
  a=[]
  def DP(i):
    while True: yield(a[-1 -i])
  for x in fn(*map(DP,range(n))): a.append(x);yield x

fib=iself(2,lambda x0,x1: It.chain([1,1], (x+y for x,y in zip(x0,x1)) ))
[*It.islice(fib, n)]

a=[1]
[a:=[1,*(x+y for x,y in zip(a, a[1:])),1] for i in range(n)]

a=[1]
[a:=[x+y for x,y in zip([0,*a],[*a,0])] for i in range(n)]
```

- [Py的@运算](https://docs.python.org/3/reference/expressions.html#operator-precedence)
- [放松解压的反民科科普](https://www.zhihu.com/column/c_1079425408197492736)

## 如何验证

```py
```

对了，在[查询窗](https://swish.swi-prolog.org/)左右两侧写下 `:-use_module(library(clpq)).` 和 `{2*X+4*Y = 94, X+Y = 35}` 也能解方程🙆‍♂️，甚至做数独

即便把35换成'A'，CLP{Q,R} 依然能求解，这也是泛型的原理。(同sympy,是解析式,但 `{X^2+2*X+1=0}` 计算树) //echo clp{q,r}

还是用Eq关系(stft,istft)，把声音换到图片应用滤镜，例如高斯模糊…… 最好是把一个.wav 文件与.png 做绑定，就像NodeJS 和 `bun dev` 那样

```py
#拿竖条- HSV分量储存低到高频(幅角,幅值,1)
```


尽管你不必写FFT(这些算法，缺的是Melodyne等应用🌚)，有些模型也是要会用的。请上手用矩阵完成图像库函数

CV已死(参考SAM大模型)，所以不要在同质化的Laplace变换,.上浪费时间，会看结果图就行了

```py
import skimage as sk
from PIL import Image, ImageFilter as Fil

im=Image.fromarray(a:= sk.io.imread('imageio:chelsea.png'))

display(im,
  im.convert('L'), #灰度
  im.crop((100, 0, 400, 300)),
  im.filter(Fil.EDGE_ENHANCE))
#0.2989 * R + 0.5870 * G + 0.1140 * B   #这些魔数和Mel刻度一样，属于心理学
#a[y:y1][x:x1], see (im.size, a.shape)
#Google: Sobel卷积

#?np.einsum 如'ij->ji'是T,'ii->i'是对角线,'ij->j'是行叠加。 LA大礼包
```

最后，感谢你学习信号处理领域的基本功！👏
