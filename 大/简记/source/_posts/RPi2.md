入手香橙派Z2，是 [sun50i](https://elixir.bootlin.com/u-boot/v2022.07/source/arch/arm/dts/sun50i-h616-orangepi-zero2.dts)(allwinner SoC) 平台 H616 aarch64*4 的板子。官方/Armbian img 的“外”设都不能完整使用

无SDmmc上电没灯会亮。eGON-UBOOT 和SPL代码是空的

拿来本是GPIO编程的，为蓝牙WIFI USB 折腾几天，简单说就是 ether/[紫光WIFI](https://www.unisoc.com/cn_zh/home/TJUWLW-56XX-2-1) 只能客不能主(slave only)、USB只主不客(host, no [OTG-Gadget](https://blog.csdn.net/mike8825/article/details/103756462)).. 极其莫名其妙，uboot都行

就是说 `nmcli d wifi` 热点开不了，难道数控小车要经“路由器”被手机 `arp-scan 192.168.0.0/16` 或mDNS发现连接？

当然只要能[AP联网](https://www.cnblogs.com/chenxi188/p/10786195.html)“胡乱共享”功能都可以没有，但

```sh
echo g_serial >>etc/modules
cd lib/systemd/system/getty.target.wants #1stboot scripts 4 /root at /lib/armb*
ln -s ../getty@.service getty@ttyGS0.service

cat>>etc/profile <<DOC
OT=`stty -g`; stty raw -echo min 0 time 5 #read()等待
printf '\e7\e[r\e[999;999H\e[6n\e8' > /dev/tty #最大光标
IFS='[;R' read -r _ n m _ < /dev/tty
stty "$OT" cols $m rows $n
DOC

picocom /dev/ttyUSB0  -b115200 # sz +C-a r 回车收文件;或 timeout 5 rz -bre .stdio不使用

#连上可以用 tigervnc-* 创建 DISP :1
cat>> .vnc/config <<CFG
session=xfce4
geometry=800x600
localhost=no
alwaysshared
CFG

omz theme set wezm #用的是.zshrc RPROMPT+='[%*]'
ehco() {[ "$2" = '' ]&&cat $1 || {shift;echo "$*">$1} }
sta() { strace -a1 -f "$@" 2>&1 |sed 0,/prlimit64/d|grep -E '|open|io' --color }
export TERM=xterm-mono #省流量
alias gitc='git clone --depth=1' dpkgi='dpkg -i --force-all' py=python3
/bin/*-config

systemctl disable cups hostapd packagekit display-manager lightdm
apt install tigervnc-server-standalone lirc lrzsz cockpit ifplugd inxi strace dnsmasq  #dhcp

curl https://raw.kgithub.com/pypa/get-pip/main/public/get-pip.py | sudo python3
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple #注意是文件单
a=`uname -r`;apt install linux-headers-${a%%-*}
apt install linux-libc-dev linux-headers-current-sunxi64 swig
vncserver;py -m lirc-setup;rz

jupyter notebook password
jupyter notebook --allow-root --ip 0.0.0.0&
sysctl net.ipv4.conf.wlan0.route_localnet=1 # https://superuser.com/questions/630923/forward-connections-on-0-0-0-080-to-127-0-0-19091
gitc https://kgithub.com/thortex/rpi3-webiopi.git
pip install {pi,}gpio supervisor #no UIs

l /etc/init.d #被 /lib/lsb/init-functions.d/*-systemd 废弃,用rc.local

alias|grep apt
trap caller QUIT #C-| 想调试bash ui 在脚本加
lsof -p Xtigervnc
netstat -lpan | grep vnc
tcpdump -U -i usbmon2 -w -
ssh -f -C -N -L 127.0.0.1:8888:10.0.3.10:8888 localhost
ssh -L 4321:*:2222 user@localhost
```

GPIO 针有2排，我参考距离差来接，像GND+1指某接地下方第2针。Vcc颜色深于GND，需要注意杜邦线头(随时)有坏的可能

傻X sed 不支持//e参数.. https://github.com/mirror/sed/blob/master/sed/execute.c#L1364

## USBotg

缺少UDC，每次接ttyUSB就太占。二者内核版本 5.1x 有差异，insmod 是不互通的(当然 `mv;modprobe -f` 就能避免UTS_RELEASE检查 但.ko是ELF32?)，只能make，但我怎么clone？哪来的时间哪怕只用kconf一下..

通过[ConfigFS](https://www.cnblogs.com/wanglouxiaozi/p/15131949.html)也能模拟WebUSB。之前吧 init.d/hostapd 改了的配置打开了，弄得 `iwconfig;iw dev` 总是mode Master不Managed.. `nm unmanaged-devices=`

都下3个了, diff一下modules。当然，有 kernel-header 就能[编译kmod](https://www.draisberghof.de/usb_modeswitch/#trouble) 吧

- Arm的 5.x 没有 [uwe5622-sdio,aw859a sprd WIFI](https://github.com/unifreq/linux-5.15.y/issues/4) [源码](https://github.com/ChalesYu/uwe5622-aw) 驱动 `hciattach_opi /dev/ttyBT0 sprd  -n -s 1500000;btattach`
- 官方没有 [sunxi/musb](https://v2as.com/article/542aea22-d5bf-4a55-ba69-19b1fd642b13) [源码](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/tree/drivers/usb/musb/sunxi.c?h=v5.18.17) 用于支持基于phy上下电的 `allwinner,sun8i-h3-musb`

`modprobe g_mass_storage removable=1 file=/dev/mmcblk1p1; dmesg (按大G)` 后能见 `UDC core: couldn't find`

`modprobe of:N\*T\*Callwinner,sun50i-h6-dwc3` 也没用，`cat /sys/class/udc/musb-hdrc.2.auto/*` 未接，diff dts 发现编号+19 以及hdmi增加外也没异..

就是 `cat /sys/devices/platform/soc/5100000.usb/*` 和 `dtc  /boot/dtb/allwinner/sun50i-h616-orangepi-zero2.dtb|grep otg` 提到的总线，没驱动

```
/dts-v1/;

/ { soc {
  target=<&usbotg>;
  __overlay__ {
    dr_mode = "otg"; /*add-overlay : otg / host / peripheral */
    status = "okay";
    usb_port_type = <2>;
    compatible = "allwinner,sunxi-udc"; //依然无驱动认领
  };
  usbotg: usb@5100000{};
};
```

`dtc /sys/firmware/fdt|grep otg` 能看到修改，但木大。据说有 [int-ep2in](https://whycan.com/t_1626.html#p9447) 的问题但我是..明明u bootd含sun50i-udc(错), 而 "allwinner,sun8i-a23-usb-phy" 在内核也是有吧

看来Zero2 的typec本就只能[供电](http://www.orangepi.cn/orangepiwiki/index.php/Orange_Pi_Zero_2)吧？ 就像wifi ap 开过但极难成功

[总的教程](https://www.cnblogs.com/hfwz/p/16053528.html) 和 [Armbian 尚未修复](https://forum.armbian.com/topic/16170-orangepi-zero2-allwinner-h616/page/15/)

musb 和 [sunxi-udc](https://github.com/OrangePiLibra/OrangePiA64_kernel/blob/master/drivers/usb/sunxi_usb/udc/sunxi_udc.c) 都支持OTG，在5.16都没kmod


## WIFI

`udhcpd -f; dnsmasq -d -C` 试过了，都 DHCP 不上。开发板tui修配置再 `iwconfig wlan0 mode Ad-Hoc` 后倒是能[开热点](https://blog.csdn.net/wit_732/article/details/121038477)，偶尔还要重启sprdwl..连不上

都从链接,地址退回「主机」了.. 据我所知IP mask/24 只末位不同就能网线互通 via 10.0.0.0/ ，网关联通不同子网，可无效呢。最后还得感谢 [ap-hotspot](https://github.com/hotice/AP-Hotspot/blob/master/ap-hotspot)

```sh
cat >dh <<CFG
start		192.168.30.20	#default: 192.168.0.20
end		192.168.30.254	#default: 192.168.0.254
interface	wlan0		#default: eth0
remaining	yes		#default: yes
opt	dns	8.8.8.8 114.114.114.114
option	subnet	255.255.255.0
opt	router	192.168.30.1
CFG

cat >ht <<CFG
interface=wlan0
driver=nl80211
ssid=OPi
hw_mode=g
channel=6
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=12345678
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
CFG
#可在_cli get_config 和status; /etc/default/ 开init

sysctl net.ipv4.ip_forward=1z

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

iptables-save > /etc/iptables.ipv4.nat

#/network/interfaces
allow-hotplug eth0
iface wlan0 inet static
  address 192.168.30.1 
  netmask 255.255.255.0
up iptables-restore < /etc/iptables.ipv4.nat

hostapd ht
udhcpc -f dh

#10.42 和 192.168 都是预留子网,DHCP会设置好 arp
killall NetworkManager
hostapd /etc/hostapd.conf &
ip a a dev wlan0 10.42.0.1/24
dnsmasq -C/dev/null -d --no-hosts --bind-interfaces --except-interface=lo --clear-on-reload --strict-order --dhcp-range=10.42.0.10,10.42.0.254,60m --dhcp-lease-max=50 --dhcp-leasefile=ips --listen-address=10.42.0.1
```

## GPIO

尽管和 `gpio readall` API类似(而不是著名 `RPi.GPIO`)

https://mirrors.ustc.edu.cn/raspbian/raspbian/pool/main/p/pigpio/ 没有aa64版,但[Arch有](https://pkgs.org/search/?q=pigpio)，然而PiGPIO 连sysfs抽象层都不用，mmap死耦合，只能官方 wiringPi

Z2的布线和 https://pinout.xyz/ 一样

```sh
git clone --recursive https://github.com/orangepi-xunlong/wiringOP-Python
cd wiringOP-Python;export CC='gcc -Wno-missing-braces'
make install #CFLAGS=-Wno-all ,2文件到lib/dist-pkg
#若python-dev有依赖(软件源)问题，只能dpkg -i了
https://ubuntu.pkgs.org/22.04/ubuntu-main-arm64/libpython3.10-dev_3.10.4-3_arm64.deb.html
```

PWM(脉宽调制,用为1的时长模拟电压升降)可由针口软模拟 但供电仅够LED。GND和GPIOx偶尔能混用，一些口PWM有问题，尽量用常见口测试

PWM不像(方波)Tone，频率固定、占空比(duty) 变化

若非PWM供电，5V 会导致LED常亮；PWM超过区间(默认max=100)时为0。linux5.x对h3的pwm有支持，但在UART口上，需应用overlay=pwm12

`for i in {0..20};do gpio mode $i pwm; done|nl` 发现不能支持

## 技巧

`hexdump -e'80/1 "%_p""\n"'` 1行输出80次1b字符, 你不能跳过(或多个)%字 而定byte长度

```sh
gpmm() { #鼠标光标
stdbuf -o0 hexdump /dev/input/mice -e '3/1 "%d ""\n"'|awk -v kx=$((COLUMNS / LINES)) -e '!/*/{x+=$2/k*kx; y+=$3/k; printf "\x1b[%d;%dH", -y,x} BEGIN{x=y=0; kx*=.5;k=9.3}'; }
#亦可 awk /dev/stdin '' $(()); 鼠标时差扫位移，不按sign(xy)次数算
set -a
declare -g a b
echo a b|read -d\0 a b #export绝对继承不到子shell的变量

import sys, numpy as np #array('b', )

P = np.array([0,0]); dk = np.array([.6 ,-.4])
L = np.array(sys.argv[1:]).astype(float)

while True:
  btn,*dP = np.frombuffer(sys.stdin.buffer.read(3), np.byte)
  P=np.clip(0,(P+dP*dk),L); x,y=P.astype(int)
  print('\x1b[',flush=True, end=f'{y};{x}H')


```

方波tone `sed -r 's/-l (\S+) -f (\S+) -D (\S+) /(\2,\1),(0,\3)/g;s/-n /,/g'` 将beep 替换为 hz-dt 序列. 若dt代表起始时差, t0=0,t=t左

```sh
av=`(cat|base64 -d|gunzip) <<<H4sIAAAAAAAAA+1US25DIQzc9ySNhCz84+FFTlLlFMn9VUNI1Efchkrprhs0Mh7bzFicL3j8eBfJSXM+pBCxWGJtSIkT6tot5n5d1EZiiKw+klHXSlvOSTpqgQHrHckdFUfox+H0dr6Qv5eNRuFerLVaiSACJtrFpBQgj72KuOWvSVo34LnaerAQAZWFxsXA7FVDb1UCKSmI/Eja2IeqE8/3BaTsqb5N11dGL3/MG/XGjqAC39LoqqQKcJnlJQbSWQ1jqHXfpCmEU+O2slHSbpIu9zTK977wMz1Hi2c+ROOOVfo39Y9Mjb+H2dGop1PBvzK+OaO/ZXdTT581vi1V9AUAAA==`
wp='from wiringpi import*;wiringPiSetup(); pi=1;softToneCreate(pi);'
py -c "$wp$av; [softToneWrite(pi, int(hz))or delay(dt) for hz,dt in st1]"

f(){ stdbuf -o0 srt play|py -c "$wp [softToneWrite(pi, int(440*2**((float(y)-$1)/12) )) for y in __import__('sys').stdin if y.strip()]"; }
f 73 <hh.srt #见 srt2mid 嘉宾/*.srt

python -c "$av; print('\n'.join(map(lambda x:f'-f lavfi -i sine=f={x[0]}:d={x[1]}ms', st2) ))"|
while read s; do xargs<<<$s ffplay -hide_banner -autoexit -vn; done
#"`cat`" set-f亦不切分。亦可 xargs -d'\n' sh -c 'for argv in"$@"'

#sed ai插入靠 "`printf 'i\n'`" 跨行标结束,N可手动读行. 加 -f lavf -i
awk '/^-/{system(sprintf("ffmpeg -hide_banner %s v%s.wav",$LINE,NR)); printf "file v%s.wav\n",NR} !/^-/' af.txt 1>af.1

ffplay -f concat -i af.1

ffmpeg -re -stream_loop -1 -i /dev/video0 -flush_packets 0 -f mpegts udp://127.0.0.1:5000?pkt_size=1316
```

[FFMpeg 可处理4个视频/Xgrab](https://ffmpeg.org/ffmpeg-devices.html#Examples-5), [实用亦参](https://amiaopensource.github.io/ffmprovisr), [奇技巧](https://trac.ffmpeg.org/wiki#Filtering)

```sh
ffplay -f lavfi 'testsrc[out0];sine[out1]'
ffplay -f lavfi -graph "testsrc [out0]; testsrc,hflip [out1]; testsrc,negate [out2]" test3 #v切换

ff(){ ffplay -hide_banner -analyzeduration 10000 -fflags nobuffer -f lavfi "movie=/dev/video0:s=dv [hv];[hv]hflip;$1" ;}

ff "nullsrc=size=1440x720 [base]; [0:v] transpose=1,v360=input=fisheye:output=flat:ih_fov=180:iv_fov=180:h_fov=90:v_fov=60:w=720:h=360:pitch=45 [upperleft]; [0:v] v360=input=fisheye:output=flat:ih_fov=180:iv_fov=180:h_fov=90:v_fov=60:w=720:h=360:pitch=45 [upperright]; [0:v] transpose=2,v360=input=fisheye:output=flat:ih_fov=180:iv_fov=180:h_fov=90:v_fov=60:w=720:h=360:pitch=45 [lowerleft]; [0:v] transpose=1,transpose=1,v360=input=fisheye:output=flat:ih_fov=180:iv_fov=180:h_fov=90:v_fov=60:w=720:h=360:pitch=45 [lowerright]; [base][upperleft] overlay [tmp1]; [tmp1][upperright] overlay=720:0 [tmp2]; [tmp2][lowerleft] overlay=0:360 [tmp3];[tmp3][lowerright] overlay=720:360"

pacaur -S glfw
git clone https://github.com/richardpl/lavfi-preview.git #make CXX='g++ -DNDEBUG'
```

F1可见编辑器/预览help, esc 注意创建-C-Ent 初始化&预览几乎是不可逆的。建议别改全局选项,enable是启用区间。可以 A个life,ShiftA 看看

ffplay 虚拟[dev/avfi.c](https://mirrors.spacecruft.org/ffmpeg/ffmpeg/commit/53319d5c932867bcc84798622dd171b5c19165f0?style=unified&whitespace=ignore-all)并不支持流dup(非split时label作输入)和多in同步播放，但[mpv有后者](https://github.com/mpv-player/mpv/issues/4439)

```sh
mpv --lavfi-complex='[vid1]copy[a];testsrc[b];[a][b]overlay[vo]' /dev/video0
mpv /dev/video0 --profile=low-latency --untimed

ff(){ mpv /dev/video0 --lavfi-complex="[vid1]hflip[v];$1" ;}
#-f lavfi "movie=/dev/video0,hflip[v];testsrc[b];[v][b]overlay"
ff 'testsrc[b];[v][b]overlay[vo]' #lavf里不行

ffg(){ sed 's/life/movie=\/dev\/video0,hflip/;s/buffersink/copy[out0]/'|xargs ffplay -hide_banner -analyzeduration 10000 -fflags nobuffer -f lavfi ;}
life[e6];[e6]split=outputs=4[e2][e4][e5][e8];[e8]deshake[e9];[e0][e1][e3][e9]xstack=inputs=4:layout=0_0|0_h0|w0_0|w0_h0[e7];[e7]buffersink;[e5]normalize[e3];[e4]edgedetect[e1];[e2]edgedetect=mode=colormix[e0]

#tile,waveform,*detect,fft,deshake
ffplay -f lavfi "testsrc=d=5[0];testsrc2=d=5[1];[0][1]xfade=transition=fade:duration=1:offset=4"

git format-patch -N HEAD
sed 's/diff --git (\S+) (.*\n){4}/diff \1\n/g'
```

https://www.desmos.com/calculator/55sd75rxig

全景图正反向 https://jiras.se/ffmpeg ，需要用0.6x 的UW镜头(若没有,Camera360或可能拼接)拍4张低宽高比的方竖照片以 RL-TD-FB 顺序0~6.jpg ：以正背左右，就是5621 ..jpg

拍摄时场景物在竖轴中心，旋转拍摄不必原地，这不是极宽的“全景图”，但边角一定要能衔接

```sh
ffmi(){ ffmpeg -hide_banner -y -i $1 -filter_complex $2 `shift 2;sed -r 's/\.( |$)/.png /g' <<<$*` ;}

ffmi %d.jpg "crop=iw:iw:0:ih*.25" %d.tif #(若非1:1)
ffmi %d.tif "tile=6x1,split[a][b];[a]v360=c6x1:e" eqr. -map [b] cb.
```

然后需Krita(Z形copy 笔刷,框选位移,扭曲放大)修正成品eqr.png 抹除方形棱角。copy刷按ctrl确定源点

https://tomseditor.com/ 可用于SVG化Logo (AIO.com), 当然 Inkscape路径-临摹 很有效。要裁剪需取对象-路径交集，按C-S R

https://photo-sphere-viewer.js.org/playground.html

在 `PhotoSphereViewer.utils.requestFullscreen` 下断点的调栈能拿到VueUI的 `Viewer` ，复制其config 即可(markers是官方同名plugin的参数)。

另外 pano/py 的我也改了

<pre>
 README.md                             |  7 +++++++
 panorama/models.py                    | 15 ++++++++-------
 panorama/static/panorama/js/edit.js   |  2 +-
 panorama/templates/panorama/edit.html |  2 +-
 panorama/urls.py                      |  2 +-
 panorama/views.py                     | 10 +++++-----
 root/urls.py                          |  3 ++-
 root/views.py                         |  2 +-
 root/wsgi.py                          |  5 +++++
 9 files changed, 31 insertions(+), 17 deletions(-)
 create mode 100644 root/wsgi.py
<code language-js><details>
diff a/README.md
@@ -1,4 +1,6 @@
 （作者比较懒，该文档已长期未更新，请暂时无视接口列表 23333）
+>这个是three.js 下[自写](https://blog.csdn.net/fen747042796/article/details/55102837)稀少pano库之一的编辑器，不能[创建](https://photo-sphere-viewer.js.org/playground.html)全景图(Sphere photo)
+
 ------------------------------------
 # 项目描述
 全景图Demo（包添功能有：根据已有空间创建场景；增、删、改空间中的热点，修改空间底部logo，兼容移动端浏览，横屏VR模式）
@@ -19,6 +21,11 @@
 - 访问编辑页面：http://localhost:8000/panorama/edit?scene_id=second
 - 访问单空间材质切换页面：http://localhost:8000/panorama/check?space_id=23
 
+```sh
+pacaur -S uwsgi; pip install Django uwsgi
+a=(makemigrations migerate "loaddata init_panorama.json" runserver); for s in "${a[@]}"; do python manage.py $s;done
+```
+
 # 视频预览
 1. [场景切换](https://home.omgfaq.com:8899/static/video/场景切换.mp4 "场景切换")
 2. [材质切换](https://home.omgfaq.com:8899/static/video/材质切换.mp4 "材质切换")
diff --git a/panorama/models.py b/panorama/models.py
@@ -3,6 +3,7 @@ import uuid
 from django.db import models
 from django.utils import timezone
 
+FKey=lambda T,**kw: models.ForeignKey(T ,on_delete=print, **kw)
 
 class Seller(models.Model):
     """
@@ -25,7 +26,7 @@ class Space(models.Model):
     name = models.CharField(max_length=20, null=False)
     url = models.CharField(verbose_name='默认材质地址', max_length=100, null=False)
     thumb_url = models.CharField(max_length=100, null=True)
+    creator = FKey(Seller, verbose_name='创建者', related_name='+', null=False)
     create_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)
 
 
@@ -35,16 +36,16 @@ class Scene(models.Model):
     """
     id = models.CharField(max_length=50, primary_key=True, default=uuid.uuid1)
     title = models.CharField(max_length=20, null=False)
-    seller = models.ForeignKey(Seller, verbose_name='商户', related_name='+', null=False)
 
 class SceneSpace(models.Model):
     """
     空间场景关联
     """
-    scene = models.ForeignKey(Scene, verbose_name='场景', related_name='+', null=False)

diff a/panorama/static/panorama/js/edit.js
@@ -738,7 +738,7 @@ $.get('init_scene', {space_id: getParam('space_id'), scene_id: sceneId}, functio
         entryId: entryId,
         smoothStart: false,
         autoPlay: true,
-        autoRotate: false,
+        autoRotate: false, //here
         debug: true,
         fps: false,
         callbacks: {
diff a/panorama/templates/panorama/edit.html
@@ -1,4 +1,4 @@
-{% load staticfiles %}
+{% load static %}
 <!DOCTYPE html>
 <html>
 <head>
diff a/panorama/urls.py
@@ -1,5 +1,5 @@
 # -*- coding: utf-8 -*-
-from django.conf.urls import url
+from django.urls import re_path as url #no pip install django==3.2.10
 
 from . import views
 
diff a/panorama/views.py
@@ -1,7 +1,7 @@
 # -*- coding: utf-8 -*-
 import json
 from django.http import HttpResponse, JsonResponse
-from django.shortcuts import render_to_response
+from django.shortcuts import render#_to_response
 from django.views.decorators.csrf import csrf_exempt
 from panorama.models import *
 from collections import OrderedDict
@@ -10,19 +10,19 @@ STATIC_PREFIX = '/static/panorama/'
 
 def test(request):
-    return render_to_response('panorama/merge.html')
+    return render(request,'panorama/merge.html') 
 
 def init_scene(request):
diff a/root/urls.py
 """
-from django.conf.urls import include, url
+from django.conf.urls import include
+from django.urls import re_path as url
 from django.contrib import admin
 from django.conf import settings
 from django.conf.urls.static import static
diff a/root/views.py
 
 def index(request):
-    print platform.python_version(), django.get_version()
+    print (platform.python_version(), django.get_version())
     return render(request, 'root/home.html', {
         'python_ver': platform.python_version(),
         'django_ver': django.get_version()
diff --git a/root/wsgi.py b/root/wsgi.py
+from django.core.wsgi import get_wsgi_application
+
+#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MyBlog.pro_settings')     # 修改为复制新的settings文件名
+
+application = get_wsgi_application()

</details><code>
</pre>