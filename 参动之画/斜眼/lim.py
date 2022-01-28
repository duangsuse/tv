from pyaudio import *
from numpy import array, float32, zeros

import sounddevice as sd
from time import sleep
rsec=1;npsec=44100
NT= float32 # default data type

"Recording Audio"
rec = sd.rec(rsec * npsec, samplerate=npsec, channels=1, dtype=NT)
sd.wait()
"Audio recording complete , Play Audio"

def sigproc(f):
  def onBuf(b, *a):
    for i in range(len(b)):b[i]=f(b[i], *a)
  return onBuf

def Limiter(atk, sil, delay):
    d= zeros(delay, dtype=NT); di=0; ni=0 #envelope
    gain=1
    def f(x,p_gain):
      nonlocal di,ni,gain
      d[di] = x; di = (di + 1) % delay #FIFO
      # calculate an envelope of the signal
      ni *= sil; ni= max(ni,abs(x))
      # have self.gain go towards a desired limiter gain
      tgain = (1+p_gain -ni) if ni > p_gain else 1.0
      gain = (gain*atk +tgain*(1-atk) )
      # limit the delayed signal
      return d[di] * gain
    return sigproc(f)

# Play
rec0 = array(rec, copy=True, dtype=NT)

lim = Limiter(.5, .5555, 40)
i = 0
def limr(in_data, frame_count, time_info, flag):
  global i
  if flag: print("Playback Error: %i" % flag)
  i0 = i; i += frame_count
  lim(rec[i0:i], 0.8  )   # absolute gain
  return rec[i0:i], 0 #conti


pa = PyAudio()
s = pa.open(format = pa.get_format_from_width(2),#f32
            rate = npsec,channels = 2,
            frames_per_buffer = 1024,#window
            output = True,
            stream_callback = limr)

while s.is_active():sleep(0.1)
s.close();pa.terminate()
exit(0)
# orig wav
import matplotlib.pyplot as g
g.figure()
g.plot(rec0, color='green', label='original signal')
g.plot(signal, color='red', label='limited signal')
g.legend()
g.show(block=True)

import wave
wf = wave.open(song_wav,'rb')
s = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                channels=wf.getnchannels(),
                rate=wf.getframerate(),
                input=True,
                output=True)

fig,ax = g.subplots()
x = np.arange(0,2*CH,2)
line, = ax.plot(x, np.random.rand(CH),'r')
ax.set_ylim(-60000,60000)
ax.ser_xlim = (0,CH)
fig.show()

# read data
data_wav = wf.readframes(CH)

# play stream (3)
while len(data_wav) > 0:
    dataInt = struct.unpack(f"{2*CH}h", s.read(CH))
    line.set_ydata(dataInt)
    fig.canvas.draw()
    fig.canvas.flush_events()


signal = np.fromstring(wf.readframes(-1), 'Int16')

freq = 440.0
data_size = 40000
fname = "High_A.wav"
frate = 11025.0
amp = 64000.0

sine_list_x = []
for x in range(data_size):
    sine_list_x.append(np.sin(2*np.pi*freq*(x/frate)))

wf = wave.open(fname, "w")

nchannels = 1
sampwidth = 2
framerate = int(frate)
nframes = data_size

wf.setparams((nchannels, sampwidth, framerate, nframes,
"NONE","not compressed"))

for x in sine_list_x:
    wf.writeframes(struct.pack('h', int(x*amp/2))) #why? just 1x (int16) coerce

wf.close()


import math

sampleRate = 11025.0
cutOffFrequvar QUAL_MUL = 30;

function FilterSample() {
  this.isPlayicontext = new AudioContextng = false;
  loadSounds(this, {buffer: 'techno.wav'});
};

FilterSample.prototype.play = function() {
  // Create the source.
  var source = context.createBufferSource();
  source.buffer = this.buffer;
  // Create the filter.
ency = 400.0
freqRatio = cutOffFrequency / sampleRate
N = int(math.sqrt(0.196201 + freqRatio**2) / freqRatio) #movinAvg LPF
channels = interpret_wav(signal, nFrames, nChannels, ampWidth) #np.fromstring(raw_bytes, dtype=u8|i16) ; shape=(p,chan)& d=d.T interleave else (chan,p)
filtered = mean(channels[0], N).astype(channels.dtype) #app: read-copy writeframes

def mean(x, windowSize):
   cumsum = numpy.cumsum(numpy.insert(x, 0, 0))
   return (cumsum[windowSize:] - cumsum[:-windowSize]) / windowSize

win = numpy.ones(N)#or
win *= 1.0/N
filtered = scipy.signal.lfilter(win, [1], signal).astype(channels.dtype)

#nfilt: IIR FIR a[0]*y[n] = b[0]*x[n] + b[1]*x[n-1] + ... + b[M]*x[n-M] - a[1]*y[n-1] - ... - a[N]*y[n-N] We use b = win, a = [1], x = signal then equation is 1*y[n] = win[0]*signal[n] + win[1]*signal[n-1] + ... + win[M]*signal[n-M]

