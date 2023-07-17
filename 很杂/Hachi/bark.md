
## Our Heros
>在这里，对 HachiBark 所用上游软件(含ML,CV,SP学术)领域的开源作者、原笔、数据集们，致以真诚的敬意。Hachi 对功能的标准化和UI，亦不愿辱没的你们的劳动

下列所有都可在CPU(大概慢20倍)/CUDA:0 上运行；支持进度条，接受图像输入=接受you(get/dl)爬取链接/摄像头/视频文件(区域,参数变化:亦可自人脸识别等脚本 )和推流；视频的重复帧会自动LRU缓存

录音降噪/卡拉OK，需驱动(如RTK)支持 __虚拟回环__。在 Win10 自带的 SoundMapper 里令应用为出入流： 话筒=>Bark=>录制 | 浏览器=>Bark=>耳机 。Linux 则以 `pavucontrol` (输出到sink "Bark")

对于VIP视频，在火狐上登录。脚本做 `缓存目录/passwords.tmp.txt` 给爬虫们（注：有权监听此文件的软件 [一般](https://www.zhihu.com/question/439768601)都能窃取您的临时登录）

各种参数(已经调优)只是要：
- 针对硬字幕，或全屏PPT 的字幕化，且减少无帧差的重算
- OBS或浏览器实时播录 滤镜flv流，对长视频断点续算(完整mp4的合并可中断,OBS虚拟摄像头.)
- 区域检测，加速原算法换脸、超分辨，或换背景，__甚至单独对人物和背景缓存超分辨__
- 兼容 _插帧/区域性超分辨_ 改变的合并期参数
- 以低代码API封装 `(脸图)|对正|超分辨|命名为face-A` 等流程 
- 将[SSD/RamDisk](https://imdisk.en.lo4d.com/windows)用于滤镜间帧传输(AI计算耗时的1%) 以方便程序员-来给你更多功能

故必须：
- 勿损失信息。如 `OCR(png)=txt; ASR(wav)=txt` 就无法原位复制和字幕
- 勿难于检视。统一格式如 `OCR(img|vid)=[s文Xywh矩R角i页区,]`-后处理转为(实时)srt等
- 勿活于黑框。最大复用 pdf,vtt,. 的既有平台，`bark` 只留必要代码

>特别为墙内用户准备离线包：被 `bark py` 启动的模块由 GHproxy.net 或您下载文件夹内ID同名的文件提供 `urllib.request.urlopen(GH|GDrive)`-运行成功后随时可删。我保证 `bark.size < 30M`<br>
推荐大陆用户使用 Paddle 离线语音(除非明显影响性能 或常用双语)，首次打开下载大概3分钟。云计算各种促销广告可惹不起<br><br>
从 __贴近软件源码的圈子__ 拿傻瓜式界面，算力充足时(4G/2.1G@12x CPU上语音可实时) 比云计算途径更隐私且易维持，不操心任何的(后台)扣费；N卡非5G用户则可实时预览云计算难以传输的4K滤镜。~~当然，~~ GPU电费 ~~是你的，他们就没钱可挣了~~<br><br>
注意：若您用过付费方案且与这版效果类似，请理解尊重可能开发过有专利的同类算法/模型 只是旧了的整个群体。大家都是要饭碗的<br>
提到饭碗，方便商业画的 [NovelAI](https://zhuanlan.zhihu.com/p/574200991) 和简化广义编程的 [GPT3](https://openai.com/api/) 都赋予创作以新的流程焦点。相关领域与争议 Bark 不涉足。相信再新的技术能解决“人的缺位”

平台：__即便您购买(阿里性价比,讯飞年免费,Azure赠金需VISA)云计算、或是有语音输入法/一键TTS的链接__，Bark 也只能在桌面端以Py支持的接口运行(未来可能支持Termux APK)。其听/说都有实时文件接口 ~~这是许多语音输入法都没的~~

以下是Bark面向开发者的功能。没打'👍'是顺带支持，尽量别报问题

- 字幕 lives.vtt 是多行JSON流：`[word,t1Left,t0_24h]` 由JS侧拉取和修正为 [TextTrack.vtt.live](https://developer.mozilla.org/en-US/docs/Web/API/TextTrackCue/startTime)：每条含 `t0 --> t1 ocrPos?\n word` 3变量，空时长词为句尾时最终修正
- box.htm 含 `picture b#r360_x_y_w_h, script` 展开为 `ruby[style="TSR 3属性"]`
- lives.f0 是 `Float32Array`。`bark demucs ',live --dry=-1~+1 -Voc "bark st stdin en"'`

TTS 可输入vtt流-遇空时长词时吐句，基于停顿 `科大[p500]讯飞`, `三月<break time="700ms"/>阿里`

注意：`'='` 前的部分是参数名。 `;` 后的参数在 `%APPDATA%` 或 ~/.local 内 `bark/env.txt` 里

名|入|出|参(or"no")|描述|年|默认体积/MB|实时流|离线包
:--|--:|:--|:--|:--|:-:|:-:|:-:|--:
[Demucs](github.com/facebookresearch/demucs)|wav|^1 of=(vocals,others,drum,bass)|all / two-stem=__of__, htdemucs,slower=1|torch, Source Separation, Hybrid Spectrogram&Waveform|2021|207 ^2|👍
[keums/](github.com/keums/icassp2022-vocal-transcription)|__.wav/f0__,vtt?|mid,f0 ^3, s5p|NOTE if vtt transcribed, s5p(json)+=lyrics aligned by X axis (time)|TF,Pseudo-Label Transfer from Frame-Level to Note-Level in a Teacher-Student Framework for Singing Transcription from Polyphonic Music|2022|26||pip
[piano_transc.](github.com/bytedance/piano_transcription)|(wav)|Pit_Loud.mid|e.g. `demucs st=en,sp=all,as=mp3,f0=bgm` |torch, trained 200hrs of virtuosic piano|2020|172||G
[CREPE](https://marl.github.io/crepe/)|(wav)|f0|f0= cre for tiny,50,~550Hz|torch,Convolutional REpresentation for Pitch Estimation|2018|87|✔|pip
[GE2E](github.com/PaddlePaddle/PaddleSpeech/tree/develop/examples/aishell3/vc1#pretrained-model)|a wav A txt|b mel[256] B wav|id:Emb. 声线克隆|for FS2.inference(spk_emb)|2021|17||pip
[VITS](https://gitee.com/sumght/vits_yunzai_plugin#安装教程)|txt|wav|id. [web](https://huggingface.co/spaces/skytnt/moe-tts)|Conditional Variational Autoencoder with Adversarial Learning for e2e TTS|2021|600
[RT-VC.](github.com/CorentinJ/Real-Time-Voice-Cloning)|||id:Emb. [Chinese](github.com/babysor/MockingBird)|TF,Clone a voice in 5s to generate arbitrary speech, SV2TTS|2019|442||G
[VOSK](https://alphacephei.com/)|speech,lrc?|vtt|l=e.g. en/ja/zh|Offline ASR for Android,RPi,iOS,servers|2019|528|👍
[SpeechReco.](https://github1s.com/Uberi/speech_recognition/blob/HEAD/speech_recognition/__init__.py#L1700-L1704)|wav|txt, vtt(`sp=live` only)|l:Cuts, to=azure|`key=(your API)` / l=undef in env if err |many|43|↓↓|pip
[Paddle](github.com/PaddlePaddle/PaddleSpeech/tree/develop/demos)|speech(16k1ch)|vtt/^4 csv/nthSpk.npy|l:PP. zh_CN:PP for larger model|Baidu, for a variety of critical tasks in speech and audio|2021|950|✔
[XFyun](https://www.xfyun.cn/doc/asr/voicedictation/API.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B)|speech|vtt|l:XF|need WeChat,500call/day limit,multilanguage|2001~|0|60s
[Aliyun](https://ai.aliyun.com/nls/trans)|speech|vtt|l:Ali|Alibaba, free 3mo(need Alipay)|2016~|0|👍
[Paddle](https://paddlespeech.readthedocs.io/en/latest/tts/demo.html#multi-speaker-tts)|zh_en.txt|24k.wav,__vtt,f0__|l,idSpk. am=FastSpeech2_aishell3/vctk,vo=pwgan_|单语种推导,靠3处py补丁才截获vtt的音素时长,g2p无停顿记号|2021|1.6G
[XFyun](https://www.xfyun.cn/doc/tts/online_tts/API.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B)|txt|16k.wav|l:XF,spk,SPV ^5|speed: 16min/15s|?|0|2.6k字
[Aliyun](https://ai.aliyun.com/nls/tts)|txt|24k.wav,vtt|l:Ali,spk(50+&[5emotional](https://help.aliyun.com/document_detail/101645.html#sectiondiv-g6w-isw-rmw)),SPV(10x precsion), 支持 `spk-情感-robot/lolita/echo`|300SSML自动分段。vtt in:|2020~|0|300字

^
1. 44k s16 1ch `{vocals:H0, others:bgm}` applied, if no, H0=all. if live, recommend dns48/master64
2. `~/.cache/torch/hub/checkpoints/`
3. `f0.npy`, melody frq every 10ms. 
4. if l=tag/spk:ID (`[top1Confi,top20]`. __same for spkIDs in .vtt__ by PANN-32k,ECAPA:`float32[187]`)
5. `bark ts` input `a line|xiaoyan 2 +.5 -1`: 2x pit+25% vol-50%, if vol=0: don't `ffplay`

理论上，所有音频处理接受实时自话筒的音频切片(例如用denoiser的输出|CREPE检测跑调)；所有图像算法接受自摄像的短片段(如人脸识别,或者你有更快GPU, [安装实时滤镜](https://kgithub.com/ossrs/srs/releases#:~:text=Assets,5,-Release)，查看[SRS服务](http://localhost:8080/) 并在env+ `PUSH=rtmp:??`)。下为copy测试

- `docker run --rm -it -p 8080:8080 -p 1985:1985  -p 1935:1935 registry.cn-hangzhou.aliyuncs.com/ossrs/srs:4 ./objs/srs -c conf/docker.conf`
- `ffmpeg -re -i cap.flv -c:v libx264 -c:a copy -f flv rtmp://localhost/live/bark`


对于视频OCR，只提供live.vtt。 滤镜参数都能后置 `xywh/手动  bw黑底白/BW黑, +-LRU`。srt内首条为默认参，每条有滤镜命令行。
- 若LRU为负秒，则检测PPT式停顿整段换为1帧结果
- 若宽高比>9，OCR以单行检测提速；bw查重前做黑白化降噪、除黑边、边缘、MORPH_OPEN(消细痕)
- `fpChunk=1GB; mp4dir in { a bark ocrs }` 是Bark处理图像的唯一API。它共享 `tAxis/.txt = inkXywhIN`(n=fps,N=块大小/1GB, k=人脸识别等给区域的tag)

为避免重复载入AI，`a cmd` 向正运行 __滤镜命令的cmd.stdin输入__ 要处理的文件夹。对于 `realesrgan -i -o` 只需提供 `$1=bark cmd 'n,scale;x4plus,4' realesrgan`


名|入|出|参(or"no")|描述(torch)|年|默认体积/MB|实时流|离线包
:--|--:|:--|:--|:--|:-:|:-:|:-:|:-:
[rmback](https://github1s.com/nadermx/backgroundremover/blob/HEAD/backgroundremover/utilities.py#L167-L169)|png|png/gif/ mask.flv|kFast=2,fps=10; gb=#00ff00|[U^2-Net](https://kgithub.com/xuebinqin/U-2-Net#updates-): Going Deeper with Nested U-Structure for Salient Object Detection. see [SAM by fb](segment-anything.com/demo)|2020|337||G
[Paddle](https://kgithub.com/PaddlePaddle/PaddleOCR#-visualization-more)|ocr=png/pdf|docx / htm+box(json strXywhRi)|l,_need=box pdf_<br>picture `ruby{trans;sca;rot;}`|Baidu,multilingual OCR toolkits(support 80+ languages, provide tools,IoT)|2020|37|✔
[MMLab](https://github.com/open-mmlab/mmocr)|ocr||
[Tesseract](https://digi.bib.uni-mannheim.de/tesseract/?C=M;O=D)|png|↑ _pdf2docx_/pdf|l:Tes,need;`TESSDATA_PREFIX=/usr..`|LSTM,[Apps](https://tesseract-ocr.github.io/tessdoc/User-Projects-%E2%80%93-3rdParty.html) Ver5 2021.11.30|2007|109||unix
[AliOCR](https://alynx-saas.alifanyi.com/saas/mt.html)|png/doc/mp4|translated|l:Ali|OCR only here. XF的接口又乱又难调我索性不做|2021|0
[TP-SMM.](github.com/yoyo-nb/Thin-Plate-Spline-Motion-Model#web-demo-for-animation)|png,id / faceA,mp4|__B.mp4__(if pre=face2D) [paste A](https://github.com/s0md3v/roop)|idA, Pt=vox. try pre=rmback|Thin-Plate Spline Motion Model for Image Animation|2022|384|✔|[清华](https://cloud.tsinghua.edu.cn/d/30ab8765da364fefa101/)
[TuneAVi](https://tuneavideo.github.io/)|mp4|mp4|tag|[注册试用](https://runwayml.com),[素材](https://najoast.github.io/t/quark.html).One-Shot Tuning of Image Diffusion Models for Text-to-Video Generation|2022|TBD|
[DragGAN]()|png|pngs|vec2x2
[AnimeGAN](https://huggingface.co/spaces/akhaliq/AnimeGANv2)|png|png|sty|Landscape photos/videos to anime. [Paddle ver](https://github.com/PaddlePaddle/PaddleGAN/blob/develop/docs/zh_CN/tutorials/animegan.md)|2018|TBD
[realeSRGAN](https://kgithub.com/xinntao/Real-ESRGAN/blob/master/README.md#portable-executable-files-ncnn)|pre=png|png|'+'x4plus (+face),k=4. [Bili lab](https://real-cugan.animesales.xyz/)|ncnn,Training Real-World Blind Super-Resolution with Pure Synthetic Data|2021|47||[zip](https://github.com/xinntao/Real-ESRGAN#portable-executable-files-ncnn)
[GFPGAN](github.com/TencentARC/GFPGAN)|face.png|png|v3, k=2|see also: PULSE FastPhotoStyle FaderNetworks pix2pix|2021|332||[gh](https://github.com/xinntao/Real-ESRGAN/blob/5ca1078535923d485892caee7d7804380bfc87fd/inference_realesrgan.py#L145)
[SadTalker]()|png,kpFaces|png||. see leiapix,ModelScope,civitAI,fliki,[D_ID](chat.d-id.com),[AIvoice](https://www.youtube.com/watch?v=yUuS-oTDSD4)
[Colorize](https://github.com/PySimpleGUI/PySimpleGUI-Photo-Colorizer)|bw.png|png||output image that represents the semantic colors and tones of the input. [PaletteFM](palette.fm)|2016|125
[RIFE](https://github.com/nihui/rife-ncnn-vulkan#download)|1,3.png|2.png|rife-anime,k=2|ncnn,Real-Time Intermediate Flow Estimation for Video Frame Interpolation|2020|411||zip
[GPT](prompts.ai)|`[">!sys","ask",]`|`">answer"`|v=3.5|ChatGPT|2023|0
[YOLOv5](github.com/ultralytics/yolov5#predict)|mp4|box|sureAt=.25,yolov5s|world's most loved vision AI|2020|16|👍
[FFmpeg](https://ffmpeg.org/)|_any/stream_|_any/rtmp,._|`c:v=vcodec, vf=lavfi,` [v360](https://jiras.se/ffmpeg/mono.html),[stereo3d](https://trac.ffmpeg.org/wiki/Stereoscopic),..|unix,A complete, cross-platform solution to record, convert and stream audio and video. WebM in:|2010|37|👍
[face-align.](github.com/1adrianb/face-alignment/issues/286)|png|box,kpFaces.npy|d=2|world's most accurate network, capable of points in both 2D and 3D|2017|91|👍|[gh]()
[StyleGAN](github.com/a312863063/generators-with-stylegan2)||png|emotions,age|NV,face generators, 2018:v1. [Anime ver](github.com/jayleicn/animeGAN),[笔记](https://www.seeprettyface.com/research_notes.html),also:[SD-webui](https://guide.novelai.dev/guide/install/sd-webui)|2020|TBD
[F2F^ρ](github.com/NetEase-GameAI/Face2FaceRHO)|mp4 face.mp4|mp4,3DMM*2||speed=9*SOTA, >460M. [more](https://m.thepaper.cn/baijiahao_19128242)|2022|TBD
[RMPPE.](github.com/ZheC/Realtime_Multi-Person_Pose_Estimation)|mp4|bones.npy||bottom-up approach for realtime multi-person pose estimation. [more.DensePose 4 WIFI](https://kgithub.com/geekfeiw/wifiperson/issues) |2017|TBD|✔

>再次感谢 [Nihui](https://github.com/nihui) [腾讯优图] 打包诸多nCNN应用的电脑端，用户运行很方便！


调用的Py库会以Juui草稿为-交互式文章，`@ui def` 会展开 `s, [["A","B"]] => s:str, 单选`,. 且return末算式

```py
@ui
def Point(x=0,y=0):
  @property # 调用格在xy改变时刷新
  def l(): abs(x*y)

p=Point(10) # y有滑条
@ui
def Rect(Point,w,h): #参数继承 #xywh
  def area(): w*h
  def act_show(): print(this)
  def do_wtf(): 'slow UI'
```

`phyShort={ch0: [type,eg]}`:
- s str, st Textarea
- [(A,B,d=1.), log/rn/str/[tag,] ] xywhijnmldtr nums. n=len(a or b)
- f,p eval\x fp FileUpload o,k YAML Play
- ab listJSON [,] Combobox, Dropdown-RadioButtons-Select-ToggleButtons, TagsInput-SelectMultiple
- cs ColorPickers q Checkbox
- with ui [box,"labl", (ui, 0=Stack,1Accordion,2Tabs, 'repeat(3, 100px)')]: ui=next(displaydUI)
- Audio.s16le

Bark 有三笔
- soloset[iShifted] 数字键-音量交换为0 的记忆，0键全1,9键默认。
- Gmov(g,px,a) 绘制波形或频谱'+'，hr据--t,t1 时轴, 据--dy层叠
- tapGmix(w) w0尾添，w上移作底，重复轨.mix

