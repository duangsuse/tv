---
title: RPi1
date: 2022-08-05 12:14:52
tags:
---

香橙派[-H6SDK](https://github.dev/OrangePiLibra/OrangePiH5_uboot/blob/master/sunxi_spl/boot0/load_mmc/load_boot1_from_sdmmc.c#L144) 到货2天，又因为TF和读卡器刷不了系统等待，有系统后才发现连上前最折腾！ (利用sunxi-fel刷SPI eGON亦可，TF推荐 gnome-disks)

我只有USB-C和无线两种能连上tty，然而 `armbianEnv.txt` extraargs=cmdline.txt 基本就是内核(显示等)参数，且连接都没母模式

且“自动设首启动” `cd boot; f=$(ls *_first_run.txt*); cp $f ${f%.template}` (`cp $f.tpl $f`) 开WIFI都无效！（后来查iw;ip l是驱动没装） 我的笔记本也莫名其妙开不了 `ap-hotspot&hostapd`

人家说 `dt_overlay=dwc2; modules-load=dwc2,g_ether` 就能连上Gadget RNDIS ，dt是 `dtc *.dtb` 外设树device tree ，现对应在 overlays= 和 etc/ ，grep -r OTG(自由供电) 有dwc3 不说，就是 rndis_host 有效 IP也错误配置(1stboot 脚本或许能开ether,作路由? 人家只能配1设备)

btw. u_ether 和 usb_f_, usbnet 都是 ConfigFS, SysFS 相关的

所以本着骑驴找马，最好先[走USB串口](https://systemoverlord.com/2017/05/21/pi-zero-as-a-serial-gadget.html)。波特率能自动

```sh
pacaur -S picocom lrzsz #screen 也行,minicom不
sudo nautilus #装终端插件?
#对烧好的TF
echo g_serial >>etc/modules
cd lib/systemd/system/getty.target.wants #1stboot scripts 4 /root at /lib/armb*
ln -s ../getty@.service getty@ttyGS0.service

picocom /dev/ttyACM0 #root:1234 登上后可 $ w
#疯狂Enter登录。请勿用工具设root，不然容易记不住密码. wheel这些便捷组无效
useradd me -mp `python3 -c 'import crypt as S;print(S.crypt("d"))'` #以后登录 me:d
sed 's/root\t/me /' -i /etc/sudoers

sudo -i #别登root. 遇事 Ctrl-a-q  ; C-a 两次光标回首
[ $TERM == linux ]&& man stty;reset #xterm-mono 让tui变单色

lsof -p Xtigervnc
netstat -nalp | grep vnc
wpa_cli -i wlp4s0 log_level debug
tcpdump -U -i usbmon2 -w -

nm/[device-wifi-no-scan-mac-rand]
wifi.scan-rand-mac-address=no
kill -USR1 %orangepi-config
```

```bash
OT=`stty -g`; stty raw -echo min 0 time 5 #read()等待
printf '\e7\e[r\e[999;999H\e[6n\e8' > /dev/tty #最大光标
IFS='[;R' read -r _ n m _ < /dev/tty
stty "$OT" cols $m rows $n
```

`dmesg; lsusb; /sys/kernel/debug/usb/devices;proc/dev` 能看到 /sys/bus/usb 接入型号。插拔 ip a;ip r console=usb-serial 了无数遍 就只有这样保险

接TTL黑(GND)绿白 靠 `putty /dev/ttyUSB0  -b115200` 即ACM0 也容易等出终端，如果插拔TF太随便可导致 乱码/只读

懂编程后才发现 `dd` 是对块设备复制+conv 的,例如写后 ;sync ，cat>什么 走管道都不够快。好比 `printf 30 >/sys/class/backlight/*/brightness` 和 echo-n 在$$上就不同

然后 Armb's aw-blWIFI 在2022[还不通](https://forum.armbian.com/topic/18030-orange-pi-zero-2-unable-to-detect-wifi/)，因为我就要能联网+针口的环境(外接?RTL8188CUS)，只能换OPi的版本(..然鹅 只有Armb的不稳定版能开usb..)

有 `nmcli d wifi hotspot TAB` 简单的，`g_ether` 的配置很复杂，至少要 `sysctl net.ipv4.ip_forward=1` 。有人 `ls /etc/network/interfaces /etc/NetworkManager/system-connections/` add 802-11.XX 还有Kconfig重编译[都出来了](https://forum.armbian.com/topic/1417-g_ether-driver-h3-device-as-ethernet-dongle/)，实在不行改 etc/init.d/ 编号脚本保证连接

静态是需要这些信息

```h
address 169.254.1.1
netmask 255.255.0.0
iface usb0 inet static #dhcp ;auto
allow-hotplug usb0
pre-up /bin/sh -c 'echo 2 > /sys/bus/platform/devices/sunxi_usb_udc/otg_role'
```

- 注:主机 `ip a status UNKNOWN` 就完蛋了，[Arch:router](https://wiki.archlinux.org/title/Router_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))/dhcpd 动静配置很久都不可能通信. LOWER_UP都可能, 网速不好不能git 就只能换镜像
- [VNC](https://dark-wind.github.io/linux/orange-pi-zero-wifi/) 或[液晶!](https://blog.csdn.net/weixin_45534288/article/details/115462669),耳机可测 `FMPG -c:a pcm_s16le; aplay -D hw:0,0`, [摄像fswebcam,motion](https://blog.csdn.net/weixin_42514616/article/details/116850418)
- `chsh /bin/zsh`, 忘记root密码可换成自己密码: `sed -e1R/etc/shadow -e1d -i etc/shadow`
- iozone glmark sysbench 跑分 hci lm-sensors CircuitPython.org
- `stty -g; setterm; shopt` 可导出加载termio信息(`reset 和clear的不同点`)
- 更多[配置](https://www.olimex.com/wiki/ArmbianHowTo#Ways_to_access_the_board)
- [keylogger](https://blog.csdn.net/huntinux/article/details/50496676) 如果 `/tty1` 不够

```sh
cd /sys/class/input/ #ANSI换行的
f=`ls -v|xargs`;bash -c "cat {${f// /,}}/name|nl"
for i in {1..9};do cat $i;done
cat /sys/class/input/event*/{dev,device/name}
nl <(echo -e "Devs\n`ls`")
ls -v /sys/class/input/event*/device/name|xargs cat|nl -v0


od /dev/input/mouse1 -td4 #看到方向
hexdump /dev/input/mouse1 -e '"%1x %d %d\n"'
```

