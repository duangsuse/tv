/*第一代间差异：
贴图：空白(0)、蛇体、墙壁、苹果
撞1,2号方块死,停帧刷新；撞苹果上新，否则去1块尾部

固定单项宽grid，JS算行内项数 用于“上下”移动；视效只有背景色 .2s渐变

独立+触摸屏转向
+paint() 实现可选 canvas 多xywh矩形
+paint() 可选 linux,dom,win 基于 hcon. clear,w,wLn 文本视效；当运行于 node v8 按 process.platform=="win32" 切换 hcon ，调整paint为文本输出。
如果每行一次调用 println,writeln 而在JS拼接行里的文本或许比多次 print 后 println() 带缓冲、更快，但JS没有好的拼合方法也不必在意标准输出流的缓冲
*/

//e阵,n,m,阵, 模式:grid canvas:g hcon,换阵
换阵=N=>{}

e阵.style.height="50%"
