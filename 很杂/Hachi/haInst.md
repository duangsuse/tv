
安装方法：解压至exe文件夹。包含2文件 8kbd.htm, scripts/_8.js ，下文也有无需下载的安装方法。

获取mid格式的乐谱是调教的第0步。在 Vocaloid 的时代许多人愿意分享无参vsqx，可见这最基础的加音填词，仍然是种工作量，在一些人眼里，它甚至等于虚拟歌声的一切任务

SV Studio 免费版的编曲功能已经很适合专业用户，编辑起来已没有初代的音符重叠等麻烦

现在，如果你有 Pro 版，无论懂不懂乐理，无论有没有设备，Hachi扒谱(原Python版) 作为两步走的脚本能帮你完成歌曲人声的快速原型——质量堪比MIDI键盘，来更好的利用SVR2的高度自动调教。

你可以边听歌，边完成P主的日常任务，然后只把精力放在AI重录和转音咬字上，而不必在弹错、或注册mid分享论坛、修复Melodyne,Cubase,Lzotope RX 等基于哼唱识别的零散音符上浪费时间

### 没错

Hachi扒谱就是听原曲，每个音按S键，和《钢琴块》、OSU!等游戏如出一辙。 如果有长音按A键休止符

这个过程依赖预先弹好的音高，一旦把一段歌词里的音高填好，“一键”录制可以重复，直到精准卡点

当然SV脚本没那么强大，所以要配合离线网页 8kbd.htm ，弹窗提示期间在里面操作

扒谱建议步骤：

1. 拿到原唱mp3
2. 你自己得熟悉旋律，这不是AI扒谱。不熟悉漏词会很麻烦
3. 伴奏拖到SV里，找到人声部分前几秒，运行脚本以弹奏音高
4. 点选音高音符组，运行脚本，在网页按S开始录制(请先阅读SV弹窗)。注意网页标题的进度，比如有11个音，11/11 后再按S会创建结果，此时关闭弹窗即可，再按会导致重录
5. 乐曲中的重复部分可以隔开录，利用音符组获得更好调教体验

人声消除可以用Audacity, lalal.ai等服务，B站下载用you-get，工程格式互转可以用utaformatix3/OpenSVIP ,自动和声harmoloid

### 小技巧

1. 选中非音符组执行，清空第一栏后确定，能启用音高预览（当然你得用Chrome安装插件.. 点下页面选SV scripts/ 和主程序所在目录）

这是对音乐外行的极客很友好的功能。另外如果弹错了随时可以按Backspace重录

Firefox 需打开 `about:config#dom.events.asyncClipboard.readText`

为什么SV之类的钢琴卷帘没有此选项？ 因为写歌的人都知道 C4 和 D4 间有多大差异，这是约定俗成

SV利用脚本在播放时移动音符，依然会有卡顿(看起来静音也没用 不过不影响浏览器的精准度)，所以最好在 `(未加载声库)` 音轨上Hachi录制

2. 在设置底部，为 Hachi 指定快捷键 Ctrl+H

3. 共享你的音高线，刷新并按S，点击页面空白以加载 `[-1,64,60,64,64,60,64,64,67,69,67,69,69,69,67,65,65,65,62,64,62,60,62]` 。插件用户无需交互自动加载

音高线可以用人声隔离+AI扒谱服务识别，然后再手动修：Alt+G建立音符组、重录，这类免安装服务Hachiko插件图标的右键菜单就有几个。

4. 在设置-回放 关闭播放时禁用节拍器

SV没有暴露play()和seek外的record方法，也不方便添加跨平台的模拟按快捷键。

其实，`#60,0` 地址栏参数可启用的 WebMIDI 音符是可以被本机软件捕获的，换句话说非Pro也能用其他软件录制(所以本来纯kbd.htm只是选音符再由SV收集，又做成能独立用)

但不知为何SV没录到。不然 Hachi 的播录比SV原生还少一个暂停，我写那30行干嘛（恍然大雾）

>如果你打开录制，在Hachi按 ShiftP (发送既有音高行)就会发现其实是可以录的。没错！SV在后台时不接受MIDI信号..

SV的脚本都是2020年的，感谢它的优秀，毕竟支持JS和Lua的专业软件并不多，但不得不说API太聚焦于歌声合成了，像Blender就提供了完整的热键/菜单和操作互调支持。

5. 循环预览在调音符，也适合没直觉的人： https://forum.synthesizerv.com/t/topic/6699

所见即所得，是好文明（窝槽，SV免费版也支持自动调教了，难道是和“自行车”ACE等对标吗……）

6. 120bpm 不适合所有歌，可以放大一下，对伴奏轨的鼓点。这样编辑器Ctrl+G吸附也会准一些

7. (Shift) [] 键时移音符组，右击钢琴键[0] 调整音高(升降四度)；WebSV Alt+Shift滚动 可调回默认纵向

谈到音域，各电音的范围： `#20,square #80,sine #60,sawtooth #60,triangle`

### 其他

一般意义的扒谱是用 MuseScore 直接写出人声和伴奏部，或者用MIDI键盘弹奏，但音乐系以外大概办不到吧。明明有很多翻唱歌手，扒谱却难，其实挺奇怪的，音乐是属于所有人的。

我会择日添加自动重分组、导出歌词 和 lrc,srt 互转的功能，以后甚至可以用SV编辑视频字幕（不过，字幕可以用VOSK离线识别脚本）

它们曾是旧 PyPI:hachiko-bapu 关于P主的常用功能。如lrc_merge 的自动lrc、基于 srt2mid 的 音高/填词 时间线导入导出，在Pro版都不需要（当然我不是为界面好用买SV的）

如果有条件也可以用 PyPI:demucs ，2022最新声源分离器 `demucs --two-stems=vocals` 无需下载模型，其生成含每秒音高的 vocals.txt ，肯定比FL的频谱图靠谱多了..

Hachi 提供的剪贴板接口为方便的调用外部识别创造了机会，如果用demucs也只需要拖拽到.bat了吧（虽然没人写 哈哈）

具体而言， Hachi 插件公开了3个为项目、声库配置、脚本 的社区分享提供了一键化(只需在下载时选SV主文件夹) 可能的接口（当然我是不会写插件热键管理器之类的代码了）

```js
web+synthv:xx.mid/.s5p links
bind(): listen to clipboard JSON values: sock.onMessage
dl(path,url, isEnd): download to addToSV/ e.g. settings, keep history when isEnd

fetch(url): dowload settings.xml (from SV installation), or from websites: only .mid,.s5p,ust,vsqx,vpr,ccs
  all fetched files saved to SV/recovery/dl/

sock=chrome.runtime.connect("let user paste ID")
dl(path,url) //call by sock.postMessage([retID=0, "dicts/A.txt", "https:"])

//in "A/S" dialog, copy to selectAllGroups()
;r=SE.Groups.set.call(SEd.currentTrack.Groups.slice(1), just(1))
// SE.Notes refers only the Track main group, "all notes"
if(g=SE.orAll.Grp[0])alert("Cleaned", n(g.filter(F('x', 'x.duration==0? (x.drop(),1) : 0')) )+" notes dropped")
```

我希望 Hachi 能不再更新，但能给常用SV的创作者带来方便。

1. pits录制其 数字键 删除键 P键、独立、触屏
2. AS录制的显示、WebMIDI 的音准、[]其setup、kbd!弹窗

Add PlaybackControl.record() & enable MIDI events when window not focused


I've recently been working on an SV script that uses browser keystroke events (communicating via clipboard) called Hachi recently, mainly to help people who do not understand music theory to make scores.

Hachi now uses addNote() to load plain timerange-pitch line AFTER recorded by browser, real-time displaying works glitchy, even `hideAllNotes(); control.play()` is slightly laggy. It cannot use undocumented TrackMixer

But, Hachi supports sending WebMIDI noteon/off events, visible from many web/native apps.

However when SynthesizerVStudio is not focused, it just ignores any MIDI event. Is this designated?

--
The best way to accomplish `record()` is by providing `SV.hotkeyPress("numpad *")`, even if the users can redefine hotkeys. This enables `SV.undo(), SV.pasteNotes()` and much accessories without adding any API(pls add a searchbox to KeyboarShortcuts thx). 

Hachi internally defines&uses `SV.asks({ui:form, presets,onUndo}, onUpdate)`, e.g. for previewing execution results, which requires undo(), but only newUndoGroup() is provided. I can simulate with `group.clone()`, but it's boring

Hachi also have a "uscript.setPlayhead" (customizable script in main.js), for repeat-playing selection(with modifications, e.g. AI Retake, Smart Quant, Ornament), which also requires SV to expose its Alt+T "Retake" function.

btw, I'm using SVStudio Pro 1.8.0 on Linux, when I press `Ctrl+V`, `Ctrl+Z`, even the menubar, it doesn't always respond(looks like only CtrlRight reponds), the same as `xx.MID` dragdrop. Is this a UI bug?

Also, is there a way to snap to the playhead? And can I get filepath when `isInstrumental()==true`, e.g. to invoke vocalremover/AI midi transcribe ?

SynthV.Party 是 Hachi 3个虚拟人声(二次)创作辅助工具的下载页：
- Hachiko手动扒谱工具
- BarkHachi自动扒谱插件(需已 `pip install demucs`)
- srt2mid歌词字幕生成插件

在安装Chrome插件后，后两个插件可以一键安装，且能支持在线打开mid文件、音高预览、快捷键增强等功能

### 手动扒谱

编辑器内添加原曲，任意人声位置前几秒按 Ctrl+H ，即可在8kbd离线网页进行弹奏(左键试听 右键提交) 以创建1个音符组

有选中音符组时，Ctrl+H 并在网页按S切音/A休止符——网页标题是进度。重复直到修完整首歌，若有错弹可按删除键

P键可用于试听，`[]` 两键可在录完后微调起始时间

### 自动扒谱

>含 [RV Praat](https://kgithub.com/hataori-p/real-voice) 的基本功能，是更快更好的 [BasicPitch](https://basicpitch.spotify.com/)
<br>你必须下载 [230MB Demucs](https://kgithub.com/CarlGao4/Demucs-Gui/releases): [音质demo](https://jeffreyca.github.io/spleeter-web/#/mixer/5b69c009-e134-41dd-8b19-e0fe1aff67ea/) [自带模型demo](https://pypi.org/project/demucs/#:~:text=https%3A//audiostrip.co.uk/.-,MVSep,-also%20provides%20free)。当然，[2020 spleeter](https://kgithub.com/deezer/spleeter#about) 更受熟知

`demucs --two-stems vocals a.mp3` 提供了声源+f0线分离 的最新技术，可以大大减少手动扒谱+找伴奏的麻烦

>欸！人声由200~800Hz 每震幅构成，移除伴奏也难准确切出，f0的分离依赖 [keums/2022基于TF的17MB工具](https://kgithub.com/keums/icassp2022-vocal-transcription)。因不够准，不继续做VOSK语音识别。

安装：浏览器会指让你选择SV文件夹，执行成功即可

```sh
#pip config set global.index-url https://pypi.tuna.tsinghua.edu.CN/simple

https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/?C=M&O=D 全勾选
curl -o /tmp/py https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-py39_22.11.1-1-Linux-x86_64.sh; bash /tmp/py
pipi torchaudio torchvision -i https://download.pytorch.org/whl/cpu
pipi tensorflow-cpu
conda install ffmpeg pySoundFile dlib websocket-client

https://digi.bib.uni-mannheim.de/tesseract/?C=M;O=D

https://kgithub.com/YaoFANGUK/video-subtitle-extractor#3-安装依赖文件

https://kgithub.com/YaoFANGUK/video-subtitle-extractor/blob/main/README_en.md#3-install-dependencies

tool.browser.qq.com online.aimu-app.com#SRT字幕
https://cloudconvert.com/ pdf docx
https://bgsub.cn/webapp/ https://magicstudio.com/magiceraser#ribbet.ai  https://photokit.com/editor fotoforensics.com
https://web.baimiaoapp.com/
https://www.ventusky.com/
https://trace.moe/ https://moeka.me/mangaEditor/ https://www.peiyinbaobao.com/index/peiyin.html#needWechat png3d.com
https://kgithub.com/tg-bomze/Face-Depixelizer
https://kgithub.com/junyanz/pytorch-CycleGAN-and-pix2pix#cyclegan-and-pix2pix-in-pytorch

https://kgithub.com/iperov/DeepFaceLive#likeAvatarify
https://github.com/a312863063/generators-with-stylegan2#GenWithEmotionAge
https://kgithub.com/jeeliz/jeelizFaceFilter#demonstrations-and-apps
https://kgithub.com/NetEase-GameAI/Face2FaceRHO#Need3Ddegrees See https://m.thepaper.cn/baijiahao_19128242
https://blog.csdn.net/ddrfan/article/details/119144500#SimSwap2021

pipi hachiko-bark
pipi --force -U omegaconf #4 denoiser
hachiko-bark install.json

unzip *.zip;ln -sf `realpath ${k}!(*zip)` ~/.local/bin/${k}
n=`ls|wc -l`; for f in *; do echo ${f%%.jpg}/$n; realesrgan -i $f -o $f 2&>/dev/null; done

pipi -i https://mirror.baidu.com/pypi/simple paddlepaddle paddlespeech paddlespeech-ctcdecoders
pipi paddleocr face-alignment #85M 2Dface

python -c "import nltk as T;lets_=lambda o,k,f:setattr(o,k, f(getattr(o,k)));lets_(T.downloader,'urlopen', lambda f:lambda u: f('https://ghproxy.net/'+u)); T.download('cmudict')"
pipi 'paddleaudio<1.0.2' pymupdf==1.19
pipi -U pdf2docx numba 

wmic process where name="python.exe" CALL setpriority realtime

#请启用播录回环，以降噪内录/话筒
sed "1c.include /etc/pulse/default.pa\nload-module module-null-sink sink_properties='device.description=IsProcessed device.icon_name=audio-headphones'"
control mmsys.cpl
#Mac https://kgithub.com/facebookresearch/denoiser#mac-os-x

hachiko-bark live
# 内录:pavucontrol-qt或音频属性，“回放”令某应用为回环，“录音”令此脚本为回环(Monitor)
# 话筒:“录音”令此脚本为默认 “回放”到回环，应用里选择回环
i=`python -m sounddevice |grep -oP '\d+(?= pulse)'`; nice -n19 python -m denoiser.live
#-f4 -t3 --dns64
#-f2 -t2

vosk-transcriber --list-models #.cache/vosk , AppData/


image_dir recovery use_pdf2docx_api/type=structure


ffmpeg -y -i test.wav -ac 1 -ar 16000 test1.wav
ffplay -loglevel quiet -ac 1 -ar 16000 -f s16le -f alsa -i pulse |python -c 'import sys,vosk as M; r=M.KaldiRecognizer(M.Model(lang="en-us"),16000); print(r.SrtResult(sys.stdin))'
def audio(k): a,r=torchcrepe.load.audio(k); return [a,r,int(r / 200.)]
torchcrepe.predict(*audio('test1.wav'), 50,550, 'tiny', chunk_size=1000)
{paddle.save(catTo(self,k,paddle.Tensor())(v), k) for k,v in vars().items() if k.endswith("outs")}

aishell3 vctk; tts --am fastspeech2_$k --voc pwgan_$k
vector --task spk
text --task punc lang 

print(' '.join(f'--{k.replace("_","-") if k.endswith("dict") else k} {v}' for k,v in vars(self).items() if __import__('re').match('^(am|voc|phon)',k) and not '_res' in k ))#Init body
python -m paddlespeech.t2s.exps.voice_cloning $pdp --ge2e_params_path ~/下载/ge2e_ckpt_0.3/step-3000000.pdparams  --input-dir separated/htdemucs/test1/ --output . #效果不好，抛弃 https://kgithub.com/PaddlePaddle/Parakeet/blob/develop/examples/tacotron2_aishell3/voice_cloning.ipynb
'fastspeech2_nosil_aishell3_vc1_ckpt_0.5'from paddlespeech.cli.vector import VectorExecutor;  if q else paddle.to_tensor(VectorExecutor()(audio_file=wav) )


function saveST($k,$v0) { $v=gi $k; return $v ?$v : ($v0>>($v=ni -force $k) )&&$v }
function mp42x($u) {
  function FF(){ffmpeg -y -i $u $args}
  $_i=saveST 'tAxis/t0' 0
  FF tAxis/%03d.jpg; cd tAxis
   ($a=ls *.jpg)|%  { $i=((cat $_i) -as [Int32]) + 1; $i>$_i; Write-Progress -PercentComplete ($i / $a.length * 100)  -Activity "$i/$($a.length) "; realesrgan -i $_ -o $_ *>$null }
$s=$(python -c "W,H,r,du=[$(ffprobe -v quiet -of csv=p=0 -select_streams v -show_entries 'stream=avg_frame_rate,duration,height,width' $u)]; print(f'{du}s {r} {W} {H} {W/H}vh')")
FF -i '%03d.jpg' -r $s.Split()[1] -map 0:a:0 -map 1:v:0 -c:a copy -c:v libx264 ../out.mp4
}
mp42x 不去除重复帧，10秒5分钟。想加速只有[waifu2xGUI](https://kgithub.com/xinntao/Real-ESRGAN/blob/master/README_CN.md#:~:text=%E6%98%93%E7%94%A8%E7%9A%84-,%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2,-Waifu2x%2DExtension%2DGUI) （没在推荐！付费与我无关。另，帧差缓存是3行py能弄的前处理。抱歉我压根没想兼容mp4输入，还记得这是扒谱软件吗？
ttv 不支持双语夹带。利用算法自带的[多维spk模型](https://paddlespeech.readthedocs.io/en/latest/tts/demo.html#multi-speaker-tts)，一次输入多段落容易卡死(正如PP鸡肋的自动听译..)。PPSpeech是面向 AI trainer 的，这些都是顺带封装，是转载不是二创！ (也麻烦“国产系统”用户们 `apt powershell; pwsh` 了，总不能让Win10er们安MSYS2吧，小功能懒写py)
ttv 还支持声线转化([不会用的克隆](https://kgithub.com/CorentinJ/Real-Time-Voice-Cloning))，[同包名.生成WORLD.f0.采样集的 spk_emb](https://paddlespeech.readthedocs.io/en/latest/api/paddlespeech.t2s.exps.fastspeech2.preprocess.html)于demucs()同格式。
```

在 8bark.htm 选择项目路径，录音/将原曲拖入，就生成 `h0.wav 纯人声, bgm.wav 伴奏`，请打开 `m.svp` 并将 `m.mid` 导入

__连续音符需手动切割__，短音符需删除，之后整段落Alt+G; Ctrl+H 重录，或(选中2项)在正确音高上右键合并。

即便是最新技术，无论音高还是时差上，都偶有小偏差；只有情绪非常稳定的部分能100%还原，如此也比「逐个添加音高」容易太多，非常建议动手安装 BarkHachi

>btw. 你可以 [安装realesrGAN](https://kgithub.com/xinntao/Real-ESRGAN/#portable-executable-files-ncnn) [画质demo](https://replicate.com/xinntao/realesrgan) [另,TTS](https://kgithub.com/openvpi/DiffSinger#:~:text=Dec.19%2C%202021%3A-,support,-TTS.%20HuggingFace)

### 歌词导出

Hachiko 的本质是[歌词姬](https://lrc-maker.github.io/)！秋田歌词基。在导出字幕后，可以用 happyscribe,gosubtitle 进行预览和粗体斜体；和其他软件互转用 [UtaFormatix](https://openvpi.github.io/downloads.html)-Win用[VPI](https://openvpi.github.io/downloads.html)

此插件能处理 lrc,srt 格式的(`lyrics` 属性。导入时自动新建()音符)
- split(dt=.18) 按歌词换行分组
- merge 合并/孤立选区为1组
- m2srt(gid='i') 导出字幕。 vtt格式首项标：组名+'/' 可含[显示特效](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API#within_the_webvtt_file_itself)&尖角&`音标/b i` 词粗斜
- m4srt 导入字幕 e.g.自语音识别
- m2lrc 导出歌词 `(angle="[]",srtEnd=":<>",)` 若:尖角，组内项会标结束时间，否以空行标组结束。这是“历史格式”，但其与srt等价故仍保留
- m4lrc(dtMax=5s) 导入歌词，时长按右项算。Bark下载的mp4,lrc保留在其安装目录
- swapPhon 交换歌词/注音
- saveGrp(k) 保留/重做分组 (Hachi录制等操作需临时建组)


## 另外

Hachiko 还有些小礼物：
- `[]` 键可切换音素里的 `a /另 词` ，或选中前/后音符，或整体颠倒/scale一串音 （网页右上框输 !phoneme 或 !sel 或 !note !scale ）
- (Shfit)`[]` 用于调整(选区内)所有(组)音符的属性，如默认的 onset, duration,end, 音高pitch
- Shift P 可以将自剪贴板的音高组发送给SV(需按S再复制,使标题不含"SV")。也可以通过 !kbdP 取WebMIDI的输入(点页空白停止监听)，数字键可弹奏
- 有音符选区时，ask脚本预设。“否” “取消”立刻撤回、“否”在Ctrl+空格时撤回、“是”保存预设
- 用setLyric脚本时，网页键盘最低键可切换横版，使右上框常驻。 删掉首格代码可0弹窗选改歌词

对程序员：
- 第二次弹窗前后，剪贴板包含 JSON `[pit,]` /  `[[onsetSec,end,pit],]` 。8kbd的录制在移动端以全屏UI可用，单/双/三指时抬起 分别代表 A/S/D(删除) 键。`keyRec.anim(p0,p1); #rec[k=D]`
- Hachi 支持基于(固定)选区内变更监听，对指定属性做操作的用户脚本，详见 _8.js 前几行。它和[]键都基于 `eqNote=[load,dump]`
- 实现上条的方法是 `SV.asks({title,ui, message,presets:{of},undo}, ok)` 提供结果预览和"kept"(默认值)预设 功能
- SP.onchange 提供 play,pause,  stop,loop 4种状态。
- async语法基于尾参提供: `SV.App=(a)=>{ var OKed=a(SV.asks,{}) }`
- 源码有提供 .d.ts 文件
- Chrome插件提供了接口：

```js
web+synthv:?m&bgm&l&v URL
clip(): sock.onMessage(clipboardJSON=>{}) 
dl(path,url, isEnd=keepHistory): to addToSV/ e.g. settings
  dl("scripts/*",): append _8.js runtime, `useSV={hotkey:"Ctrl+H"}`

fetch(url): dowload from websites: mid s5p ust vsqx vpr ccs
  saved to SV/recovery/dl/
  or settings.xml,. (from SV installation)

demucs(fp=URL|Blob, as="mp3",sp="vocals")=>{h0,bgm :Blob}
demucs(ytdl,"wav","no",f0=["keums","h0"])=>{h0,mid, s5p:{withPIT} ,f0:[frqEvery10ms,]}
demucs(youGet,ffmpeg,sp,f0=["crepe"],srt=["chi_sim",.18])=>{s5p:{withLyrics}, vtt:Blob}
```

https://observablehq.com/@fheyen/f0-pitch-detection

https://chrome.google.com/webstore/detail/get-cookiestxt/bgaddhkoddajcdgocldbbfleckgcbcid


https://img1.imgtp.com/2023/01/22/CBxUvWkr.png cz
https://img1.imgtp.com/2023/01/22/9MRHAOLa.png fe
https://img1.imgtp.com/2023/01/22/RvHDURpH.png mo
https://img1.imgtp.com/2023/01/22/qysdVCLJ.png q
https://img1.imgtp.com/2023/01/22/sifFoWjW.png xy
https://img1.imgtp.com/2023/01/22/6xjljpJn.png k
https://img1.imgtp.com/2023/01/22/hB9IK4pM.png na
https://img1.imgtp.com/2023/01/22/Rv8VEyTG.png yu
https://img1.imgtp.com/2023/01/22/XQXWMnwP.png ma