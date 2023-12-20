function F(arg,js) {return Function(arg,'return '+js)}
just=F('v','function(){return v}')
isA=F('T,v','typeof v==T')
function gsp(o) {
 cap=F('s','s[0].toUpperCase()+s.substr(1)')
 return new Proxy(o, {
  get:function(o,k) {var v=o[k],f
    if(null==v&&(f=o["get"+cap(k)])) v=f.call(o)
    return isA('object',v)? gsp(v) : o.getParent&&v&&v.__method_ptr__?v.bind(o) : (k=="_")?o :v
  },
  set:function(o,k,v) {var f
    if(!(k in o)&&(f=o["set"+cap(k)])) f.call(o,v); else o[k]=v
  }
 })
}
Object.prototype.let=F('fo', 'isA("function",fo)? (fo(this),this) : Object.assign(this,fo)')
Object.prototype.let=function(fo){
  if(isA("function",fo))fo(this)
  else for(var k in fo)this[k]=fo[k]
  return this
}
getClientInfo=just({
  "name" : "Hachi扒谱",
  "author" : "duangsuse",
  "versionNumber" : 1,
  "minEditorVersion" : 60000
})

/**
 * 以空选区扒谱，即创建、照按键填音符组
 */

function crossWin(dt) {
  var s0,x0, pi; pits=null

  pipe={
    send:function(s) { this._send(s0= (s!=s0)?s:  (s0[0]==' ')? s : ' '+s) }
  }
  keyRec=function(k, stop,anew, or) {
    pipe.onmsg=function(ev){
      (ev==k[0])? stop() : (ev==k[1]&&pits)? (stop(),anew(pits[pi++])) :  or?or(ev):0
      if(/^\[-1,/.test(ev)){pits=JSON.parse(ev);pi=0}
    }
  }

  setInterval(function() {
    var s=pipe._msg()
    if(s!=x0){x0=s; pipe.onmsg(s.trim())}
  }, dt)
}

if(this.SV) {
function setInterval(f,dt) {
  SV.setTimeout(0,function re() {SV.setTimeout(dt,re);f()})
}

SVo=gsp(SV)
SE=SVo.mainEditor;SP=SVo.playback
s5p=SVo.project; axis=s5p.timeAxis

SV.aNew=F('k','gsp(SV.create(k))') //why?? Aren't (ID!=0)Groups bulk of Notes?
glist=F('g', '[].let(function(a){for(var i=0;i<g.numNotes;i++)a.push(g.getNote(i))})  ')

function main() {
  crossWin(0); pipe.let({_send:SV.setHostClipboard,_msg:SV.getHostClipboard})
  var g,gi, t0,tRec,  y,i
  keyRec("as", aNote,setT, aPit)

  if(!(sel=SE.selection.selectedGroups).length) {
    s5p.newUndoRecord()
    gi=0,g=SV.aNew("NoteGroup").let({name:"Pit"});s5p.addNoteGroup(g._,0)
    s5p.getTrack(0).addGroupReference(
      SV.aNew("NoteGroupReference").let({target:g._})._
    )
    SV.showMessageBoxAsync('请启动键盘 _8kbd.htm', '左键试音高，右键/1~9 添加\n\n完成后框选 再来：按S 开始/切音符，按A 休止符',function(){SV.finish()})
  } else {
    g=glist(sel[0].target) //首次别弹奏!
    pipe.send(JSON.stringify([-1].concat(g.map(F('x', 'x.getPitch()')))))
    i=0;setT(-1); tRec=sel[0].getOnset()
  }

  function aNote(/*t0~t:pit; t0=t*/) {
    (null==y)?(SP.stop(),SV.finish()) : (-1==(y=+y) )?(pits.shift(),SP.seek(axis.getSecondsFromBlick(tRec)),SP.play()) :
    gsp(g[i++]).let (({pitch: y, onset:t0}).let(function(c){setT(y); c.duration=t0-c.onset; c.onset-=tRec}))
  }
  dur=SV.QUARTER
  function aPit(y/**t~t+1*/) {
    if(y=='Backspace') {g.numNotes&&g.removeNote(g.numNotes-1); return }
    if(!  (y=+y))return;
    g.addNote(SV.aNew("Note").let({pitch:y, onset:dur*gi++,  duration:dur, lyrics:"la"})._)
  }
  function setT(Y){t0=axis.getBlickFromSeconds(SP.playhead);y=Y }
}

}//SV