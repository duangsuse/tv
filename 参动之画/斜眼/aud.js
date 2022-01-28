//controls preload autoplay
g=new AudioContext, gOut=g.destination,npSec=g.sampleRate
ac=(o,f)=>{f(o);return o}
link=(...a)=>a.reduce((l,x)=>l.connect(x), l)
unlink=(...a)=>a.forEach(x=>x.disconnect(0))
mkTog=(fa,fb,st=0)=>()=>{st?fa():fb(); st^=1}

function play() {let s,filt;
  link(s=1?g.createMediaElementSource(eWav):ac(g.createBufferSource(), x=>x.buffer),
  filt=ac(g.createBiquadFilter(),x=>{
  x.type = "lowpass"//filter.LOWPASS;
  x.frequency.value = 5000;}), gOut)
  // Play!
  s.start(0);s.loop = true;

  eT.onclick = mkTog(()=> s.stop(0),play)
  eA.onchange=()=>{ unlink(s,filt)
  eA.checked?link(s,filt,gOut):link(s,gOut) }
  inp(eB,v=>{
    // Clamp the frequency between the minimum value (40 Hz) and half of the sampling rate.
    let v0 = 40,v1 = npSec / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var nOctaves = Math.log(v1 / v0) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var k = Math.pow(2, nOctaves * (v-1));
  // Get back to the frequency value between min and max.
  filt.frequency.value = v1 * k;
  })
  inp(eC, v=>filt.Q.value = v * 30)
}
if(0){
    BiquadFilter=["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]
filter.frequency.value = 95; //gain| Some filters also require a Q value. This determines the peaking at the cutoff

setValueAtTime(0.0, context.currentTime);
linearRampToValueAtTime(120.0, context.currentTime+10);
}
