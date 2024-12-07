## 技术选型

单/双向调用管道 PM(m,fns,eq?) in SV,Bark,websv/sites

Duktape.Thread.yield(HUP)/resume(cb=CONT) Async

流式 ASR(lang=zh/en/ja,ok=(s, A,Bsec)=>toVTT )(AcceptWav,Words?) 无文本请加音量；live/ 字幕时轴为24小时制，能取3s前最大距180ms吐字
- wext转发未知消息:haWorker 通过stdin转储bytestr,派任务给子进程.3个Pool
- vttPlay(src, e,"word") word选区highlight到e，+video.vtt采用显隐transition，--x,y,t
- 本计划用jsIntl.Seg 的LRC优化VOSK，但既有jieba了

带角 OCR(lang=zh+en., cost=0单行1按页2带框xywhri i小数部分是区号)  {zh:chi_sim/ch, en:eng/en, ja:japan/jpn} {Latin/Greek:en, Han:zh, Japanese:ja}
- PP(1det=False.psm=7  2use_angle_cls. )  mp4dir $(askCrop){ocr >>all.vtt;0} dupIn
- PDF!mp4则 to_pdf_or_hocr embed/或弹窗 pdf2docx convert. PP(type=structure image_dir=png慢点差点/.pdf recovery use_pdf2docx_api)， web+doc:fetch(view.xdocin.com/view?src=,|{m:POST,h:{CT:app/xform-urlencoded},b:eqDataURL-ed &expire=30&saveable}).url $("#content,table,div[style]").attr("ContentEditable",'true') drop=mammoth.convertToHtml 右击下载=https://view.officeapps.live.com/op/view.aspx?src=;canva.com/design/play;demo.grapecity.com.cn/SpreadJS/WebDesigner/#chart-studio.plotly.com
- areas png/mp4 框出原图，并输出时轴(escape|sec xywh%: pos line size #_1{font-size} break-spaces; metadata)
- OSD config='-c min_characters_to_try=1',output_type='dict'  若script_conf<1取全语中orientation_conf 最大的
- `let [L,R]=top; vec(R,L,(a,b)=>a-b, ([x,y])=>-(Math.atan2(-y,x)/(2*Math.PI) ) ); vec=(A,B,f,F)=>F(A.map((x,i)=>f(x,B[i])))`

demix(Voc/drum/bass/others(piano) /all/live,2-karaokeUI pipe to ASR. nice -g py -n -10)
仅闭源Chrome https://hackaday.io/project/164399-android-offline-speech-recognition-natively-on-pc/log/176945-soda-speech-on-device-api

```pwsh
$fpS=onSSD,chunk_max=2GB
mp4dir xx.flv bwCrop { $c='fps dur w/h xywh'; dropDup $dMax 1s; resize $_ >$_ }
优化：dMax=1 只有像素全异时重算(否则完后从../drop/cp.txt取左)，=-0.5 则只有1s内帧差<50% 时重算,这1s沿用结果,直到有异 (PPT识别)
亦称为防抖/LRU
```

## 下载

haMake({vtt:asr,aud:FF,demix,f0:F0mid/增改s5p},顺序[1,2,0,3,2], 按{wav:前,else:后} 保留后缀名读取文件夹,加载json)，对于vars(模块)，启动Process join,Queue get/put 以避免重复init

{big:reGAN, ok:ivpOCR}

sh=run(, shell=True,capture_output=True)
sh1=for re'1 or 1/100..' in Popen(stdout=-1).stdout

/T[0:]*(.*)Z/(new Date(ms).toISOString())

下载到 /\W*(\w+)\./(链接) 或 `from hashlib import md5; (vid:=fp0/md5(u).hexdigest()).open(,'wb+').write(u)` fp0 由web提供

写入 dl.csv: title,dir,u, uploader,id,duration,description,thumbnail

--cookies fp0/passwords.old.txt ${config}mozilla/firefox/**/cookies.sqlite; win32 %AppData% unix ~/.config/.  theres SV.env: fp0=cache/ . twistd ACAO=*
HOOK(you_get.common.load_cookies,'cookies.set_cookie(c)\n',lambda s:H_Tab(s,-4)+'cookies.save("passwords.old.txt")')

- import nltk.downloader as D; D.urlopen=ghproxy; D.download_gui()
- gh下载; unzip *.zip;ln -sf `realpath ${k}!(*zip)` ~/.local/bin/${k}

文档编辑-标题树

- ctrlCV给 https://markmap.js.org/repl
