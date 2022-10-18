---
title: RPi
date: 2022-08-03 17:09:32
tags:
---

[香橙派基础](http://www.orangepi.cn/orangepiwiki/index.php/Orange_Pi_Zero_2#.E4.BD.BF.E7.94.A8.E5.BC.80.E5.8F.91.E6.9D.BF26pin.E6.88.9613pin.E6.8E.A5.E5.8F.A3.E4.B8.AD.E7.9A.845v.E5.BC.95.E8.84.9A.E4.BE.9B.E7.94.B5.E8.AF.B4.E6.98.8E) [联网](http://www.orangepi.cn/orangepiwiki/index.php/Orange_Pi_Zero_2) 注意型号不同不可通用，设备树故障

[Z2](https://www.armbian.com/orange-pi-zero-2/) 的U-BOOT 有一大堆参数，不亮灯，可加(.txt参数 overlays=没dwc2?) [g_ether](https://github.com/torvalds/linux/blob/master/drivers/usb/gadget/legacy/ether.c)而非网卡[usbnet,_f,musb](https://github.com/torvalds/linux/blob/master/drivers/net/usb/usbnet.c)， [相关](https://www.cnblogs.com/sjqlwy/p/zero_otg.html)[和](https://whycan.com/t_2401.html)在 `/lib/orangepi /root  /sys/bus/usb/drivers/`

- [echo g_ether>>/etc/modules](https://forum.armbian.com/topic/1417-g_ether-driver-h3-device-as-ethernet-dongle/)
- https://github.com/OrangePiLibra/OrangePiH5_uboot/blob/master/include/configs/OrangePi_Zero_Plus2_EMMC_sun50iw2p1.h#L328
- H5使用[sdmmc](https://github.com/OrangePiLibra/OrangePiH5_uboot/blob/d9a1c028aa599cd244d2b627df5bb0aa77ad3a7e/arch/arm/cpu/armv7/sun50iw2p1/mmc/mmc.c)不 root=/dev/mmcblk0p2 ,检测mmc同样可行,或从EMMC:2:1
 启动
- [V4L2](https://github.com/OrangePiLibra/OrangePi_Camera/blob/master/src/OrangePi_ImageLibrary.c#L357) [VNC](https://blog.csdn.net/xiangkezhi167810/article/details/97810248) [host-ap](https://tigertooth4.github.io/post/2019-09/how-to-add-hotspot-for-orangepi-zero/)
- [GPIO Py](https://github.com/orangepi-xunlong/wiringOP-Python) `apt-get install swig python3-dev python3-setuptools &&python generate-bindings.py > bindings.i`
- `screen picocom /dev/ttyACM0 #of serial-getty@ttyACM0`, ttyUSB0
- `nmcli dev wifi  hotspot   ifname wlp4s0 ssid test password "test1234"`
- [温度收发](https://circuitdigest.com/microcontroller-projects/arduino-can-tutorial-interfacing-mcp2515-can-bus-module-with-arduin)：


```c
1602 LCD    PI
VSS    --- 5V
VDD    --- Gnd
V0     --- Volume
RS     --- Pin#16
RW     --- Gnd
E      --- Pin#18
D0
D1
D2
D3
D4     --- Pin#11
D5     --- Pin#12
D6     --- Pin#13
D7     --- Pin#15

char s1[17],s2[17];
fd = lcdInit(2,16,4,4,5,0,1,2,3,0,0,0,0);
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);  
lcd.begin(16,2); //w,h  x,y
lcd.setCursor(0,0);

lcdClear(fd);
strncpy(s1, argv[1],16);
lcdPosition(fd,0,/*y*/0);lcdPuts(fd,s1);

MCP2515 net(/*SPI*/10);
net.setBitrate(CAN_125KBPS, MCP_8MHZ); //mode: loopback,listen

struct can_frame msg={0x36,8};//id,nb

DHT ht(A0, DHT11);

net.reset();
net.setBitrate(CAN_500KBPS,MCP_8MHZ); 

int h = ht.readHumidity(),t = ht.readTemperature();    

//msg.data[0~7]
net.sendMessage(&msg)
(net.readMessage(&msg) == MCP2515::ERROR_OK)

// UNO
MCP_CAN CAN(SPI_CS_PIN=9);
while (CAN_OK != CAN.begin(CAN_1000KBPS)); attachInterrupt(0,[](){flagRecv = 1}, FALLING);

//ID Mask(4bit)&flit
CAN.init_Mask(0~N, ok=1, 0xffff00ff);
CAN.init_Filt(0~N, 1, 0x14fa0003)

for(;;)if(flagRecv)                   // check if get data
{
    flagRecv = 0;                // clear flag
    CAN.readMsgBuf(&len, buf);    // read data,  len: data length, buf: data buf
    Serial.println("READ MESSAGE OK");
  CAN.printMessage();
}

```

- [LC液晶D 1602A -I2C](https://blog.csdn.net/Running_free/article/details/103086014) [UNO](https://www.cnblogs.com/SATinnovation/p/8047240.html) [连接](https://blog.csdn.net/chuannaoxuan4674/article/details/101047495) [驱动](https://blog.csdn.net/qq_42144047/article/details/102859638) 字形在CGROM
- [OLED 4pin](https://blog.csdn.net/VerTicalVerTical/article/details/111048505)
- [CAN mcp2515](https://zhuanlan.zhihu.com/p/173648955) [驱动](https://github.com/OrangePiLibra/OrangePiH3_kernel/tree/0b58bdd6a959fcd1e0112f15f958f85827ad8fea/drivers/net/can) [ip-sock](https://blog.csdn.net/lizhu_csdn/article/details/51490958) [stm32](https://blog.csdn.net/qq_34790664/article/details/115109325)

- LED D0~D7选中 Vcc-RGB选色

## 玩具

- [旋转亮杯](https://open.iot.10086.cn/bbs/thread-36786-1-1.html)

```dts
#/boot/dtb/allwinner/sun50i-h5-orangepi-zero-plus.dtb
leds {
compatible = "gpio-leds";

led-0 {
        label = "orangepi:green:pwr";
        gpios = <0x37 0x00 0x0a 0x00>;
        linux,default-trigger = "default-on";
};

led-1 {
        label = "orangepi:red:status";
        gpios = <0x0e 0x00 0x11 0x00>;
        linux,default-trigger = "heartbeat"; #turn off
};
};
```
