# 高中生也能懂的操作系统(确信)

首先这里操作系统的定义绝不止一个 UI 即 `explorer.exe` 图形shell(窗口管理器+任务栏)，就排除了 [pptos](https://www.sohu.com/a/446626493_120474719),[98.css](https://jdan.github.io/98.css/), Scratch,VB 仿桌面等可插件(统一风格窗口)界面项目

为了这期视频我特意回溯到DOS人人裸机BIOS应用的时代看了点文，感觉那个时代人是处处跟自己汇编的目标 指令平台(ISA)作对、机器是各种不支持各种窄又废，比尔盖茨曾说，640K肯定够用一辈子了(那时他的对手只支持64K)，就像2K年的千年虫(year2k)，97肯定不会跳回20；那时电子晶震 CPU时钟都不会超过200kHz

但这次视频也不提太多专业知识，此次的『操作系统』指代80x86(8086的改进,386引入虚地址)机上和 BIOS,GRUB 一样 __运行在Ring0 ，被实模式应用加载的 x86 (虚地址内存)保护模式管理工具__，一个带Logo的 ~~VGA打字机~~，没错这回没有 上下文切换PCB、[IDT](https://cloud.tencent.com/developer/article/1145364), [8259A中断](https://zhuanlan.zhihu.com/p/26464793)注[册](https://jishuin.proginn.com/p/763bfbd6c6e9) 等专业内容

https://www.zhihu.com/question/552173126/answer/3353013354 各编程语言为什么不用左移负数位代替右移？ 答：可读性更高。

反正，有了你们也不会看；就像某些企业家说是支持国产系统，其实只是想跟个风

>v86.copy.sh

CPU上电后执行的第一条指令是从BIOS开始(嵌入式设备BL fastboot一般都是固件 单次烧写,无外置存储)，而BIOS会负责从软硬盘、CD搜索 按bootable2字节 AA55魔数结尾的 1K引导代码到7c00； BIOS 也是有字符终端功能的，不然哪来配置界面，DOS其实就是它套了个FAT文件系统个命令解释器 command.com

在DOSBox我们可以访问 int 0x21 的DOS系统调用、BIOS中断和ivt注册、设备端口IO 和实模式1M/ DOS知名的640K内存，但肯定希望能在 qemu 上运行 不靠GRUB或winBootmgr，毕竟那才像系统(尽管也有 [multiboot](https://wiki.osdev.org/GRUB) 等启动协议)，好。

了解C代码的人肯定知道C比汇编高了二三层，x86机器码是没有ld-linux.so 链接器(-fpic/-fPIC)、libc、栈调用规范这些概念的，用C语言写[bootsect](https://blog.csdn.net/qq_53144843/article/details/120355607) ，相当于 Linux 0.11 为方便自带的引导加载器(现在GRUB就是它的规范)，用C写MBR代码并没有简写的红利且要截掉函数头部栈指针的链增，因此我用js简短的预处理下=;符号 由[GAS汇编](https://developer.ibm.com/articles/l-gas-nasm/)，免得你们要安NASM才能编译模拟运行

额谈一下现在中国这个「操作系统」「核心科技」风，其实它就是利用大众的国产心理 造个热度开始蹭。完全国内成分的有吗？__有但没人敢用，或者软件不多，大部分原创的如 Deepin,Remix/Androidx86,Fyde 也有，但叫的不可能有那些魔改开源Logo 卖钱的中标麒麟一流响的__，说白了就是应用层蹭 真正系统工程侧的叫好不叫坐，那努力自我提升的心不知有多少，但想以小投入搏大眼球的、至少赚波人气的 心态是绝对有。

你要想真做做不出？其实是没思考怎么招人，以及这个最后有多少前景，回报得>投资啊，人家是营利不是慈善性质啊；不是啥帝国主义技术封锁，那不有台积电有龙芯吗？经济不投缘罢了。叫了这么久背后兢兢业业提供 存储、传感器、屏幕 的半导体业、机器码解释器 有人出来跟风吗？没有，因为踏踏实实研究的人，没空呼喊那些口号。毕竟想推进，只有用手，而不是爱闲话好否定的嘴。

真正意义的『操作系统内核』三要素：__线程调度内存隔离、文件设备(fat32,ext4,IRQ)、IP网络和并发工具(IPC,sem,mutex)__

如果一个人写了线程池或malloc()或ELF文件链接器，声称自己写了操作系统 是可以的(比如GNU)；如果一个人在磁盘MBR写了 内核特权级，就是不用DOS功能的DOS程序，或者做了几个统一风格UI，声称自己写了操作系统 是不好的；这是我对此领域的认知。

只有一个开发者对目标『应用』所有的(语言)API所需的字节结构，有层次清晰的认知，随便举一个过程他都能清楚这对『裸机』上有几段操作，他才有资格谈『操作系统』；简单点说，就是他能从C代码看到对应汇编

只觉得操作系统 内核是核心技术的人，若作为一个框架下程序员或运维，没有资格提这个词，__因为无论什么内核你们的代码都能兼容，它对你只是编译参数里的名字而已。__

曾站在比POSIX更低的地方，却能清晰看见应用之高所需的硬件状态和文件管道等资源共享，堆砌着脚下基石 却看清更高的目的(GCC)，这是系统级程序员的基本功。说难也不难。Linux没有一行代码、一个数值是靠删改重试猜出来的。如果有，会被Linus骂：要么理论验证，要么请上千万台各类设备帮你实机验证。 应用层会想一个功能最少需要几行代码来定义吗？

内核在 Linux 上 vmlinuz 是 ELF 格式可执行 由GRUB,syslinux ，在 Win32 是 ntoskrnl.exe 由bootmgr，都是自己家的可执行格式(反正就是存代码和数据节,加载到内存的节称段)，它们把裸机键鼠视频、内存、CPU多核，虚拟化出 stdIO流、framebuffer v4l2、mmap,brk/sbrk、execve(argv,env)与pthread 等统一API，内核初始化后只有调度器是每CPU上总在执行的

__也就是说系统内核不是服务，而更像一个有特权的库__，它最必要任务是：这个进程你做1ms了先暂停，那个更nice 的你恢复执行，求我从 openat("/etc/shadow") 写到你的内存片？你uid权限不够。求我从你的内存写到 pipe(23) ，我把它复制到内核堆；暂停再换进程，要从 pipe(23) read()数据？ process_vm_writev 给你。

进程、线程、函数协程，不同隔离度的任务(读写,网络,等待输入..)并发执行

以上是虚拟终端执行 `cat /etc/shadow` stderr_fd=2 "权限不够" 显示到终端窗口的过程

你觉得 `int32_t i; i+=1; i-=1; print(i)` 代表三个什么？i是内存片4字节的独占空间，3动作有先后顺序，语义就正确。所以我 `for(;;)sleep(1);` 会不会卡死整个电脑？DOS 里会的，但CPU上调度器能抢占时间片结束的死循环，保存现场，切换到其他任务，看起来就像同时有多任务在执行一样，async协程、Promise闭包都是一个道理：任务能暂停等待唤醒

调度是以线程为单位的，分用户内存和文件才有进程，但大部分应用只有主线程 很多人不区分这个，所以他们也不知道 __onclick listen 啥的只是注册了一个函数让系统主循环能访问到，完整的UI是要响应交互-重绘的__，你的应用只定义了控件显示内容 像内存对象回收就需要GC或Rc，你不需要考虑内核眼你应用的进程由啥构成，布局渲染啦垃圾回收啦，只要用户点哪里 啥变化，这叫应用层程序员思维。

>内存一般按4K页分，额x86和arm7,8085 这些RISC指令架构差的主要是内置 cs ds ss es 代码/数据/栈区/附加 段寻址模式，有个词MMU 内存管理单元，和ALU 算术单元同类，负责把虚拟地址转化到内存，x86 cr0 设置下内存寻址就会通过页表；而 GDT 虚址分段的位旗则能控制 Ring 0~3 的访问级，靠 call 上级跳转如从 Ring3 用户态到 R0 内核态，而内核态可读写应用 ds ss 的内存，一般 3G~4G 的地址是[内核专有](https://segmentfault.com/a/1190000040187304)

```c
void main(){//VESA text
  int i,j ,bg=0, slp;
  for(;;bg=(bg+1)%16,slp=1000000){
    for(i=0;i<25;i++)for(j=0;j<80;j++) ((short*)0xb8000)[i*80+j]= bg<< (i<j&&j<=70-bg ?0b1111:0b1100);
    while(slp--);
  }
}
//pure.s 链接器 拼接MBR和“内核”
ENTRY(main)OUTPUT_FORMAT(binary)
MEMORY {ram : org = 0x7c00, l = 2K}

SECTIONS {
head : {mbr.o(.text)} >ram
.=0x7e00;
boot : ALIGN(2k){*(.text)} >ram
/DISCARD/ : {*(.comment) *(.note.*) *(.eh_frame)}
}

//mbr.s 梗概
.code16 #addr load by BIOS
mbr:xor ax,ax #0 segment regs; r2 -b16 -c pd boot.img
move=ax ds es ss
sp=0x7bfe

ah=2;bx=0x7e00;al=2 #read 1K
ch=0;dh=0;cl=2 #diskpos CHS 盘头区= 磁碟 磁道 柱面
int 0x13 #BIOS
jc err
cli #无中断,设内存/中断 GDT IDT,A20宽地址
lgdt pgdt;lidt idt
 in al, 0x92
 or al, 2
 out 0x92, al
eax=cr0; or eax,1; cr0=eax
ljmp 0x8:boot #8=code-gdt段

boot:
.code32
eax=0x10
move=eax ds es ss fs gs
esp=0x7bfc
call 0x7e00 #main()
```


写内核是裸机应用，从x86平台已有的实现你应用需要的，不是从你写过一两个 Java的C++Qt 复用高的软件猜内核会咋样高难度，不敢想呢；无论是应用还是系统编程，编程就只是从基本结构有技巧的堆出能用的程序，想做出想简化，永远有方法，只是这资料可难得找，如果你从没离开过国内的『互联网』也不爱读书，劝退吧。

操作系统是由核心态设备事件IO+用户态 libc、init服务、交互shell、用户App 组成的，当然也可以像 ChromeOS 那样不需DBus,getty 等服务run-command 靠另一个完善的用户级系统和Web应用取代shell界面 了

连自己的代码被转化到含哪些信息的『可执行』或怎样注册表流程的『安装包』，再以哪种方式加载执行都不知道，有什么底气谈操作系统这个宏大的软件、算法集合？

>多文件系统 树监听啊遮罩挂载啊、设备驱动(Ring1)、收发线(socket)监听，大部分功能都是可在既有系统独立测试再集成的，它是个很大的概念，为什么说 GNU/Linux ，一个 POSIX(Unix-like) 内核，少了 libc bash gcc 这些单靠内核能实现什么？传统嵌入式 /initrc 都是需要 busybox 命令工具集(而非 GNU coreutils)，

这个box提供了设置/树和外设的shell脚本，靠启动进程最终达到设备日用目的，它还是要 libc.so dll库，加载动态链接才能执行的，所以说对程序对应的数据不了解，或者说不懂汇编 很难理解系统和用户程序概念性的区别，__系统所代表的ABI 并非只是内核的不同__。可以说所有内核功能和argv,environ等通用ABI定义都是为应用，或它们依赖的服务及设备比如DBus,Xorg,strace调试器,ip addr 服务的，但内核的目的性只是把计算机的算力、内存外存、外设以更简单安全的方式让人利用，就像chroot ，它是一种统一底层硬件的虚拟化，它源码、模组的层次是为这服务

这都是理论，因为只有看清楚软件是为了什么而用，开发者才不会止于复制。

>你觉得虚拟机是什么，从0模拟CPU指令集、模拟一个外设环境，可以拿几个寄存器和内存模拟 完整寄存器集合，但它和实机有啥区别呢？我为啥要自己模拟自己呢？可以暂停查看中间态、可以多个，对的。所以 Docker 的overlayfs+ulimit为什么叫虚拟化技术，__因为内核调度本身就是给每个程序模拟独立CPU的虚拟机。它只模拟无IO纯计算部分__，但同样能仿真系统API，DOS Extender 和 Wine 的内核中断模拟，乃至 BSD 靠 dtrace 模拟 Linux 都是可行的；在微内核里，大家的权限都是Ring0，有挂载等服务休眠，通过IPC进行“系统调用”；呃不不不，规范的做法是FS,net等服务 Ring1 靠队列调用，最终上达内核IO暂存，鉴权还是有的

对libc(kernel32,user32)而言系统真正的 API 是 syscall列表+main入口的栈/寄存器，对C语言系统API是stdlib, 以 CDEF等C调用规定 和动态链接linker (仅编译器可见)并称为 ABI，
如 glibc,msvc,musl,bionic 等内核功能的封装和 malloc 堆等只需用户态资源的算法

标准入出错 012 是可通过 dup2(orig,fd) 重定向的，子进程可以继承标准文件，或在 fork&execvpe(argv0@PATH,env)前关闭它们

为啥叫虚拟终端 linux终端/tty，因为终端就只是支持ANSI彩字的 pty(包裹dev/pts)字符设备..再得+ioctl ，登录端口嘛，所以你看那终端模拟器也是有点杂

## 参考

- https://zhuanlan.zhihu.com/p/80631718 DOS,Win3.0 过渡期MS和,IBM OS/2,Wintel 的故事 及几个物理学家的故事
- https://zhuanlan.zhihu.com/p/26054925 【构建 进程间 [lang用户态系统](https://github.com/bajdcc/jMiniLang)
- http://gityuan.com/2016/05/21/syscall/
- https://www.cnblogs.com/yucloud/p/10943215.html DOSFS
- https://wiki.osdev.org/BIOS BIOS 工具如diskIO CHS/LBA,图形键盘 等，可用 V86 模式恢复(但易卡顿)
- https://cloud.tencent.com/developer/article/1145364 引导内存图片
- https://zhuanlan.zhihu.com/p/76566108 BL setup.s
- https://jishuin.proginn.com/p/763bfbd6c6e9 系统性,推荐
- https://zhuanlan.zhihu.com/p/327860921 MMU
- https://blog.csdn.net/ljp1205/article/details/106473382 Fuchsia MMU
- https://www.jianshu.com/p/ef1e93e9d65b ARM.
- Win PAE 4GB https://zhuanlan.zhihu.com/p/27647719
- https://blog.csdn.net/qq_38410730/article/details/81105132 Kernel addrspace
- https://blog.csdn.net/lsz137105/article/details/100588871 Userspace IO
- https://zhuanlan.zhihu.com/p/100798858 Py serial
- https://blog.csdn.net/faxiang1230/article/details/103370497 ftrace
- https://www.cnblogs.com/cplover/p/3372232.html CR0 状态旗寄存器
- DOS 利用虚模式段寄存器退回实模式仍可寻址4G https://blog.csdn.net/favory/article/details/3618387
- 实保切换 https://bbs.csdn.net/topics/100122099 , https://www.cnblogs.com/pacoson/p/4893168.html , https://www.cnblogs.com/dongguolei/p/7896476.html , https://blog.csdn.net/wrx1721267632/article/details/52036989 概况

stack 向下增长(sp--)
heap 向上增长(brk)，后随程序区，中间是mmap() vm_area

虚拟地址是连续的，实际页面却可能在各种设备的各种位置；内核通过红黑树 mm_rb 查找地址所在片区，area对应MMU页表的项，P为缺页中断、RW=0只读、US=0仅内核， D脏代表需flush，A代表被访问过

真的内存分配与映射是首次访问(缺页中断找到未设VMA)才页映射，如果仅P是0就代表它在交换空间，由 do_swap_pages 还原到内存

Linux 中没有x86的分段(线性地址)，[cs:0等段地址就是线性地址

Linux 启动第一步

1. 0x90000保存BIOS系统数据，如显存大小状态
2. 1K~0x8ffff 下移到实址0 (rep movsw cx=8000 cld=0  es:di=0 ds:si=0 step 1K
3. 首次加载gdtr 和中断idtr，8259A 重设置硬中断0x20-0x2f，开 A20 寻址扩展
4. 设CR0 PE位旗进入虚模式，跳到 head.s

Linux不支持8086的段寻址(如上es段 es:di 和数据ds段 ds:si)，只支持内存页，GCC也不会生成段寻址的汇编，反正段偏移皆全0；也就手写时语义好点

如果不是GAS支持分号，也可用 `"a;b;;cmt".split(/(?<!;);/)` 注释

操作系统更多面向内部，而非机器环境设计算法、通用程序。

## 另

>https://blog.csdn.net/favory/article/details/3618387

我们可能知道CPU上电后从ROM中的BIOS开始运行，而Intel文档却说80x86上电总是从最高内存下16字节开始执行，那么BIOS是处在内存的最顶端64K(FFFF0000H)还是1M之下的64K(F0000H)处呢?事实上在这两个地方都同时出现(可用后面存取4GB内存的程序验证)。为什么?为了弄清楚以上问题，首先要了解CPU是如何处理物理地址的?

真的是在实模式下用段寄存器左移4位与偏移量相加，在保护模式下用段描述符中的基地址加偏移量而两者是毫无关联的吗?答案是两者其实是一样的。当Intel把80286推出时其地址空间变成了24位，从8086的20位到24位，十分自然地要加大段寄存器才行，实际上它们都被加大了，只是由于保护的原因加大的部分没有被程序看见，到了80386之后地址又从24位加大到32位(80386SX是24位)。

在8086中CPU只有“看得见部分”，从而也直接参与了地址形成运算，但在80286之后，在“看不见部分”中已经包含了地址值，“看得见部分”就退化为只是一个标号再也不用参与地址形成运算了。地址的形成总是从“不可看见部分”取出基址值与偏移相加形成地址。也就是说在实模式下当一个段寄存器被装入一个值时，“看不见部分”的界限被设成FFFFH，基址部分才是要装入值左移4位，属性部分设成16位0特权级。这个过程与保护模式时装入一个段存器是同理的，只是保护模式的“不可见部分”是从描述表中取值，而实模式是一套固定的过程。

对于CPU在形成地址时，是没有实模式与保护模式之分的，它只管用基址(“不可见部分”)去加上偏移量。实模式与保护模式的差别实际上只是保护处理部件是否工作得更精确而已，比如不允许代码段的写入。实模式下的段寄存装入有固定的形成办法从而也就不需要保护模式的“描述符”了，因此保持了与8086/8088的兼容性。而“描述符”也只是为了装入段寄存器的“不可见部分”而设的。

## 指针

指针 `int* i=0` 代表一个通过 `&myVar` (读作 绑定myVar)标取后 `*i` 读写的(int的内存地址)，`*i` 和局部变量没啥不同。0即空指针，无效悬垂指针的特例。 一般有效的地址数位很长，而 `"abc"` 作为 `const char*` (只读段含字符至'\0' 的位置)自然也有其地址，总之 但凡是数据，无论是定长数组(缓冲区)、增长列表还是结构里的，还是局部量全局量，都是C分配的、字节构成的，因此都能按地址访问。这是20年前C语言“革命性”指针的由来。当然啦，它的革命性是指能和汇编无缝交接

可以说，编译器用递减sp栈指针的方式分配 局部变量，因为变量的本质是任意地址上独占的内存片，__指针更像是种暴露的内部细节 因为CPU可以把内存里4字节当 int32 来解释，即加减乘除；Java 里没有指针__，尽管你可以单靠所谓唯一地址改写整个对象如int[]或某类Object，这个ID不能通过 `(int*)a [i]= *(a+sizeof(int)*i )` 加减拿到相邻项，`&two[1]` 的更不可能无效，你也不能让其他函数改写你能取到的 int ，除非是 C++ `f(int& a)`。这和值类型复制传参的无关，可以理解为 __C允许把内存地址当变量对待，只要你 `&i` 取个指针它就能到处改写，但Java不允许__

缓冲区溢出、输出乱码，都是由于指针越界或错位(outbounds,dangling)导致的，「界」是口头的说法，比如 char** argv 的内存位置有最多 argc 个 size_t ，不能搞 `argc=n=2,i=2 item[i] (i=0,1`  ，C 不支持 `char* argv[argc]` “带长数组”；当然啦 空指针和栈溢出是没预检查，乱码也可能是你没初始化 `i=0;a={0}`

内存地址=变量，在与汇编兼容时为兼容一些特殊硬件地址，是不可掩藏的计算机细节；但在今天不会有人写 `*"a\0"=='a'` 这种代码，也没人在乎变量在堆还是栈，是全0的全局变量 用累加内存段大小的方式分配(段:段错误和不能为READ 的)，其实只需像Py一样给 argv,environ, calloc,str 等加个长度信息的封装，指针计算就变得安全统一、可迭代，也能一行内实现strcat,bytes() 增长的功能

Java里局部的 `Pair(1,2)` 也可以return 而非C局部结构体的栈上帧内，但这不一定需要 对象/引用根GC ，Rc和WeakPtr 就能解决 free() 时机的问题，最后利用类型系统检查引用的生命期大小，这也是struct/impl-fn 语言Rust作为系统级C++替代者的核心特性，不一定要new后构造器，计算到结构体的函数就够；新数据的引用是随return 而失效，还是在哪个位置既有 尽量别过问，我自己推

## BigOra

大橘子是『今日校园』请假UI的仿品。但我校开始用某人脸门禁了，不知道是不是红外摄像

如果今日校园提供了 WebHook(Push message) 可把假期人 add remove 绑定到白名单, 若B方不支持可模拟全列表

若不支持，定时脚本设置人名 白名单，预置几类人员，拉取请假列表

人脸识别接口是人脸=key ，能与人员头像名字 等对应，基本用法是 Detector 绑定到 onFrame ，若清晰则按数学模型 Extract 人脸特性，按数据集分类，若概率够则得到人员 key 否则失败(本身只有像没有是, 只能取最近的ID存信息)

collection集合框架的 HashMap() 在 py 里如 {[]: 1} 是 "not hashable" 的，如果你想有不止在此次启动内存里有效的key，就需要 Serializable ，比如人脸key 就是

但 hashCode 相等才可能 equal ，hash默认是内存地址相等，如果是看内容相等的话要用 a^b 这类的编码，不然程序重启Map无法持久化，当然用str,int等ID就规避了

呃其实全局肯定是有裸人脸特征(元组)的，但应用上只是可选 拿特征先判存不存在，再(由应用) 到表里取值；不如直接取成人名(同名加编号嘛)。

好解法是利用小设备断网攻击，使安全退化(某种意义的社工)，或使请假UI更易使用，或看有无方法骗长假
