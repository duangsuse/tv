document.write`<canvas id=eC style="width:100%;height:100%"><img id=imR crossOrigin src="https://p0.itc.cn/images01/20210113/549ddf9a5b30423f91ea1bfb9d2fd3bc.jpeg"><video id=vid autoplay muted>`
布=e=>{W=e.width=e.offsetWidth;H=e.height=e.offsetHeight;return e.getContext("2d")}
with(Math){DEG=2*PI; distd=(w,h)=>[sqrt(w*w+h*h),atan2(h,w)] }//圈,距&角
组=(item=Array,d=new Map)=>k=>{let v=d.get(k); if(!v)d.set(k,v=item()); return v}
rn=(a,b,f)=>{for(let i=a;i<b;i++)f(i)},rnPN=(a,l,f)=>rn(a-l,a+l,f)

r=17,x0=0,y0=0
with(g=布(eC)){
  strokeStyle="blue"
  rect(50,66, 60,200);arc(110,266, 40,0,DEG); stroke()
  eC.onclick=ev=>{
     g.drawImage(imR,0,0,W,H);扭(x0=ev.x,y0=ev.y,100,r)
  }
}
扭力=x=>(1-x)**.3 //2.8
扭=(X,Y,l,r)=>{
  let 心距=组(),d,dr ,p
  rnPN(Y,l, y=>rnPN(X,l,x=>{
     [d,dr]=distd(x-X,y-Y); if(d<l)心距(d >>0).push(p=[x,y,0]),p[2]=dr
  }))
  0&&rn(0,l, i=>{g.fillStyle=`hsl(${i/l}turn 100%50%)`; 心距(i).forEach(([x,y])=>g.fillRect(x,y,1,1) )  })
  rn(0,l, i=>{let 环=心距(i).sort(比较i(2)),a=环.map(px.v); a.push(...a.splice(0,扭力(i/l)*r )); 环.forEach((p,i)=>px.vEq(p,a[i]) )  } )
}
px={v:([x,y])=>g.getImageData(x,y,1,1), vEq:([x,y],v)=>g.putImageData(v,x,y) }
比较i=i=>(a,b)=>a[i]-b[i]

navigator.mediaDevices.getUserMedia({video:1,audio:0}).then(s=>vid.srcObject=s)
vid.onplay=()=>setInterval(()=>{g.drawImage(vid,0,0,W,H); 扭(x0,y0,100,r) }, 1000/30)
oncontextmenu=()=>vid.play()

//以下均是Face-api 摘抄，含功能名、人名标签、贴眼妆
//绿幕 videoWidth/2 drawImage(this.video, 0, 0, this.width, this.height);
if(0){
    let frame = g1.getImageData(0, 0, W,H);
    for (let P=frame.data,l = P.length / 4, i = 0; i < l; i++) {
      let r = P[i * 4 + 0];
      let g = P[i * 4 + 1];
      let b = P[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)frame.data[i * 4 + 3] = 0;//RGBA
    }
    g2.putImageData(frame, 0, 0); //其背=img

//jsdelivr.com/npm/face-api.js  ALT https://cdnjs.com/libraries/human
whF={width,height}
F.matchDimensions(eC,whF) //resize,forSize. https://github.com/justadudewhohacks/face-api.js/#loading-the-models

F.createCanvasFromMedia(vid)
ap=(o,k,...a)=>o[k].apply(o,a);
["tinyFaceDetector",...ss("Landmark68 Recognition Expressions")].map(s=>  ap(F.nets[`face${s}Net`],`loadFromUri`, "./models") )
//v AgeAndGender FaceDescriptor Mtcnn/易卡 ssdMobilenetv1 { minConfidence: 0.5, maxResults: 3 }) { scoreThreshold: 0.2, inputSize: 608 } //CielNi
let K="Landmarks Expressions",det=add(s=>`withFace`+s,K, F.detectAllFaces(cap, new F.TinyFaceDetectorOptions()) ),
disp=F.resizeResults(det, whF)
add(s=>`draw`+s, K+" Detections",F.draw, eC,disp)

//or@ navigator. wk moz ms
navigator.mediaDevices.getUserMedia({video:$Y,facingMode:{exact:"user"},audio:$N}).then(s=>{
  v.srcObject=s//v.src=URL.createObjectURL(s)
  v.onloadedmetadata=v.play()
})//catch
v.onplay //create
  setInterval(takePhoto,1000);
takePhoto=async()=>{
if(!faceapiReady)return
draw(await detect());
}
detect=()=>faceapi.detectAllFaces(video, options).withFaceLandmarks();
// ageGenderNet 识别性别和年龄
// faceExpressionNet 识别表情,开心，沮丧，普通
// faceLandmark68Net 识别脸部特征！ 用于mobilenet算法
// faceLandmark68TinyNet 识别脸部特征用于tiny算法
// faceRecognitionNet 识别人脸!
// ssdMobilenetv1 google开源AI算法除库包含分类和线性回归
// tinyFaceDetector 比Google的mobilenet更轻量级，速度更快一点
// tinyYolov2 识别身体轮廓的算法，不知道怎么用
//https://www.cnblogs.com/neozhu/p/11771148.html

await faceapi.loadModels(MODEL_URL) //https://github.com/justadudewhohacks/face-api.js/tree/master/weights
await faceapi.loadFaceDetectionModel(MODEL_URL)
F.allFaces(input, minConfidence=.8).map(fd => fd.forSize(width, height))
.forEach((fd, i) => {
  F.drawDetection(canvas, fd.detection, { withScore: true })
  .drawLandmarks(canvas, fd.landmarks, { drawLines: true })
  faceapi.euclideanDistance(fd.descriptors, it) //.sort(maxTop =(a,b)=>a-b)[0]

})
Promise.all([].map(uri => fetch(uri).blob().then(F.bufferToImage)) )//这个人乱用async..

faceapi.drawDetection(g, r.detection, { withScore: false })
faceapi.draw.DrawTextField([""], result.detection.box.bottomRight)
let{ x, y, height: boxHeight } = detection.getBox()
faceapi.drawText(g,
  x,y + boxHeight,
  `${r.distance < .6 ? r.className : 'unkown'} (${result.distance})`
)
F.extractFaces(eC,[ Rect(0, 0, 100, 100)])
faceMatcher.findBestMatch
//https://segmentfault.com/a/1190000040583469  getBBox() of faces g.drawImage(imRand,...b.XYWH, 0,0,W,H)
//and lamdmark(with ssdMobilenetv1?) eyeLR=face.landmarks.positions.slice(36,42+6) . lip=48+
// cxcy=getBBox(eye[0]).center
// font = `${6*b.h}px serif`; textAlign = 'center';textBaseline = 'bottom'; fillText('👄', cx, cy + h);
/*@hack's orig-ver has NO CDN. 作者也作 human
<script src="https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.6.3/dist/face-api.js"></script>
<video id=vid>
<script>D=document,F=faceapi
navigator.mediaDevices.getUserMedia({video:1,audio:0}).then(s=>vid.srcObject=s)
vid.onloadedmetadata=()=>D.body.append(
  eC=F.createCanvasFromMedia(vid))
vid.play()
F.loadFaceDetectionModel("https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.6.3/model/").then(()=>{
  for(let o of F.allFaces(vid, .8))F.drawDetection(eC, o.forSize(width, height).detection, { withScore: true })

})
</script>
vid.onloadedmetadata=()=>{D.body.append(
  eC=F.createCanvasFromMedia(vid))
  let c=new F.TinyFaceDetectorOptions({scoreThreshold: 0.1, inputSize: 640}), {width:W,height:H}=eC
  eC.onmousemove=F.detectAllFaces(vid, c).run().then(det=>{for(let o of det)F.draw.drawDetections(eC, o.forSize(W, H).detection, { withScore: true })} ) //ComposableTask
}
vid.play();
(async()=>{
await F.loadTinyFaceDetectorModel("https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.6.3/model/")

})()  F. Point Rect Box/xywh BoudingBox/xy,+-wh; fetchVideo,faceDesc ;env draw 单次检测可附is/extend轮廓/表情 等 */
}
