/*
1.小蓝要把一个字符串中的字母按其在字母表中的顺序排列。
例如，LANQIAO 排列后为 AAILNOQ。
sorted("LANQIAO")
"".join(sorted(input()))

2.，总共有多少个时间是这种年份写成 4 位、月日写成 4 位、时间写成
4 位后由 3 个一种数字和 1 个另一种数字组成。注意 1111 年 11 月 11 日 11:11
不算，因为它里面没有两种数字。
年份为 2022，由 3 个 2和 1 个 0 组成，如果将月和日写成 4 位，为 0222，也是由 3 个 2 和 1 个 0 组
成，如果将时间中的时和分写成 4 位，还是由 3 个 2 和 1 个 0 组成。
小蓝对这样的时间很感兴趣，他还找到了其它类似的例子，比如 111 年 10
月 11 日 01:11，2202 年 2 月 22 日 22:02

这题的过滤条件全靠示例，语文水平要扣分。 年年-月日-时分(皆4字) 先枚举 年、月日 皆符合 2111,1211 式(仅2种字)，再看 年+月日 仅2种，再过滤时分 a~b(step=1d, 1s)

搜索题就只有这一道，还不是图搜索/最短

from datetime import*
ts0=-int( (datetime.fromtimestamp(0)-datetime.min).total_seconds() )+86057
ts1=253402272000-1
fm=lambda x:x.strftime("%Y-%m%d-%H%M").split('-')

da=[0 for i in range(10)]
def dcount(s,n0):
  for i in range(10):da[i]=0
  for c in s: da[ord(c)-48]+=1 #不该sum,计数=len(s)
  return sum(da) if da.count(0)==n0 else 0

for t in range(ts0,ts1,60):
  if all(map(lambda x:dcount(x,8)==3, fm(datetime.fromtimestamp(t)) )): print(t)

for t in map(lambda t:datetime.fromordinal(t).strftime("%Y%m%d"),range(1,3652059)):
  if dcount(t,8)==6:print(t)

for x in "122","121","123","111":print(dcount(x,8))
fm(datetime.now())

[t for t in map(lambda t:datetime.fromordinal(t).strftime("%Y%m%d"),range(1,3652059)) if dcount(t,8)==8]

_2=["".join(t)  for t in map(lambda t:datetime.fromordinal(t).strftime("%Y-%m%d").split('-'),range(1,3652059)) if all(map(lambda x:dcount(x,8)==4, t )) ]
[x for x in _2 if dcount(x,8)==8]

3.ISO A0 纸张的大小为 1189mm × 841mm，将 A0 纸
沿宽对折后为 A1 纸，大小为 841mm × 594mm，在对折的过程中长度直接取
下整（实际裁剪时可能有损耗）。将 A1 纸沿长边对折后为 A2 纸

An=i=>{
let w=1189,h=841
for(let H;i-->0; h=w/2>>0,w=H)H=h; return[w,h]}

4.n int 两两相乘(不重组合)再相加的和/long

sum=a=>{
  let AC=0,N=a.length, i,I; for(i=0;i<N;i++)for(I=i+1;I<N;I++)AC+=a[i]*a[I]
  return AC
}

7.long gcd(a + k, b + k) 尽可能大，k最小且正
5 7=1
4 10=2
6 10=2
8 10=2

gcd(a,b)=a0?b:gcd(b,a%b) 求ab+k 使公因子更大
那么 k=(1~)*gcd(a,b) 到结果有变

5.3 个矩形能拼
出的所有多边形中，边数最少可以是多少？
例如用 3 × 2 的矩形（用 A 表示）、4 × 1 的矩形（用 B 表示）和 2 × 4 的矩
形（用 C 表示）可以拼出如下 4 边形

 3 × 2 的矩形（用 A 表示）、3 × 1 的矩形（用 B 表示）和 1 × 1 的矩
形（用 C 表示）可以拼出如下 6 边形

n 6*int
12条， 有a+b=c -5条、有a=b -2条

(1) 最宽项在前向右拼。若首项是竖的，宽高翻转解一样；然后检查右 a=b 再 a+b=左c

6. n A[m(a~b) ] 内2数的(^) ==x /long

数可视为bool[]，(^)对[]内每项同时应用 1^0 , 0^1=1 ；那是问A[a~b] 是否全相同。

从头到尾a^b一遍，奇个==a 则全同；偶个==~a 则全同 ；若不同项是x 则含2项xor==x

10. 最长不下降子(串, ai+1>=ai )于5 扩充1 的长度
5 1
1 4 2 8 5

寻找符合串、连接相邻距小1 (+)最大者

在 [a~b,A~B, c~d] 里取 max(A-b<=1 后B-a 、 d-c) ，a~b + A~B 长最大

9.叠加n因数的平方，%(1e9 + 7)


fn=(a,f)=>{for(let b=1;b*b<=a;b++) if(a%b==0){f(b); if(a/b!=b)f(a/b)}}

fn=(a,f)=>{f(1);f(a); let b=2;for(;b*b<a;b++)if(a%b==0){f(b);f(a/b)} if(b*b==a)f(b)}
f=AC+= (x*x)%(1e9+7)

分配律： 1^2+2^2 不是3^2、 1%3+2%3+. 不是(1+2+3)%3
11**1,2 %3 不相等，考虑 BigInteger.mod?


8.long，每块石头有一个高度，每次小青蛙从一块石头起跳，这块石头的高度就
会下降 1，当石头的高度下降到 0 时小青蛙不能再跳到
小青蛙一共需要去学校上 x 天课，所以它需要往返 2x 次。当小青蛙具有
一个跳跃能力 y 时，它能跳不超过 y 的距离。
请问小青蛙的跳跃能力至少是多少才能用这些石头上完 x 次课

n-1(H>0?) 2x

5 1
1 0 1 0 对岸=5

石头的耐久=1，间隔=1 ，需跳跃=d=4 可完成2次

贪心法模拟：最近的石头，若没有就d=max(b-a,d)

或许转化为DP背包，每次选耗石最小，反正没了石子 青蛙就只能直接跳d=5 ；为距离优化最终会这样
*/

import java.lang.System;
import java.util.*;

public class Main{
public static void main(String...args){
  Scanner sc=new Scanner(System.in);
  long a=sc.nextLong(),b=sc.nextLong(), k,d, r,r0=gcd(a,b);
  for(k=d=r0;;k+=d)if((r=gcd(a+k,b+k))!=r0 )break; else r0=r;
  System.out.printf("%d\n",k);
}
static long gcd(long a,long b){long A;for(;b!=0;){A=a;a=b;b=A%b;} return a;}
}

import java.lang.System;
import java.util.*;

public class Main{
public static void main(String...args){
  Scanner sc=new Scanner(System.in);
  long a=sc.nextLong(), mo=(long)1e9+7;
  fDi(a, ()->{
    AC+=di*di;
  });
  System.out.printf("%s\n",AC%mo);
}
static long di,AC=0;
static void fDi(long a,Runnable f){
di=1;f.run(); di=a;f.run();
long b=2; for(;b*b<a;b++)if(a%b==0){di=b;f.run(); di=a/b;f.run();}  if(b*b==a){di=b;f.run();}
}
//fn=(a,f)=>{f(1);f(a); let b=2;for(;b*b<a;b++)if(a%b==0){f(b);f(a/b)} if(b*b==a)f(b)}  f=AC+= (x*x)%(1e9+7)
}
