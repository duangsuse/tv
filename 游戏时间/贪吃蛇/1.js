/*二次实现
贴图：空白、透明墙、蛇、墙 横竖斜反、蛇头 上下左右、蛇尾 上下左右、食物0(苹果)
撞墙仍是死，但吃到果后据 小数 N.k=fruit[x](snk) 重新投N食，每3s rand()<k的概率重投，若非 snk.flag&S_INC 则去尾

贴图主题和 +平滑grid 模式，依据蛇头/尾方向动画 background-offset: 0~100%

支持 S_ 位旗 INC,TRANS,FAST,STOP 增长穿墙高速暂停；支持 加苹果(特殊食物)、snk.反向()

随后支持多生命、多玩家；键位、触摸屏分区

礼物系统可用于实现可以穿的墙：墙前有立刻重生成的 S_TRAN 食物，它正好蛇长步数后失效，蛇以 阵[p+d]=墙 的前提碰到此果实后便可临时穿墙
增加地图绘制模式，0~9选择、移动放置方块

sin/爆罐、推箱子 的礼物

要画圆， x=sin r, y=cos r ；r 是弧度，全角时 2pi

半径r 的全角是 2pi/2pi 2r = 2pi/4pi r = pi*r/2 个点， 圆(xy rl, plim=0)

p=临时点(10); p(0,xy, v) 自动撤回上个修改，制造烟花扩散效果

罐头(v,N, xy) 添加烟花礼物

弦波(v,xy0 wh) 迭代 x 取 y0+sin1(x) 添加礼物

*/ 
const iEat=3+4, nDirImg=4 *2,iFood=iEat+nDirImg

换阵=N=>{
  let i,j, p=0;
  for(i=0;i<n;i++)for(j=0;j<m;j++,p++){}
}

//墙面 00,nm 两点右斜, 0m,n0 两点左斜，生成带方向的墙

/*
蛇是基于 que 按i遍历渲染，如果 queD[i] 改变,相接两项
-m 1; +m -1 是右斜；+m -1, -m 1 是左斜
que[0]是蛇尾，向右增长到蛇头
长1时只有蛇头，要不就 从蛇尾后 迭代queD 蛇体 止于蛇头
贴图后，头尾 animate(right/down, {dur:帧时差,direction:rev?})

点赞300就做AI和WebSocket联机游戏
*/

//把 `class Snake{dir,que}` 从全局独立出来，添加 `keys="WSDA",name,color,nLive=3`

//把屏幕分成N等分，分别对应 `snk[i]` 按0点进行新方向的派发；换向时震动下，手感好点。

//自动反向基于它尾部的 `dir= -queD[0]` ，再 `que.reverse()` ，下一帧就是朝尾部负方向增长



