import itertools as IT
from functools import  reduce
say=print

def _百鸡(nu,costs):
    n=len(costs);num=[0 for i in range(n)]
    for i in reversed(range(n)):
        while nu>=costs[i]: nu-=costs[i]; num[i]+=1
    say(num)

#_百鸡(100, [5,3,3/1])


def 百鸡(nu,costs):
    n=len(costs) #下方枚举 0~钱/价
    rules=IT.product(*(range(0, 1+int(nu / costs[i])) for i in range(n) ))
    return [x for x in rules if dot(x,costs)==nu]

dot=lambda a,b: sum(x*b[i] for i,x in enumerate(a)) #系数合


def 百鸡(nu):
    for x,y in IT.product(range(1,20),range(1,33)):
        z,r=divmod(100-x-y,3)
        if r==0 and 5*x+3*y+z == nu: say(f"公{x}母{y}小{3*z}")

def 鸡兔(n,nf):
    return [f"{c}鸡{r}兔 {4*r+2*c}" for c,r in IT.product(range(nf//2), range(nf//4) ) if r+c==n and 4*r+2*c==nf]

def rstrip(s,end='?'):
    iend=-1
    for i in range(len(s)):
        if s[i]==end: iend=i
    return s[:iend]


aaa=lambda x: reduce(lambda x,ac: x*ac+ac, [x for i in range(4)])
百鸡(100)
say(#百鸡(100, [5,3,1/3]),'\n',
    鸡兔(35,94),
    rstrip("Where are you from?"), aaa(10))
#a + aa + aaa + aaaa

from sys import*
from time import strptime,strftime
import re

nums=lambda n:map(int, (input() for i in range(n)) )
say=print
divs=lambda a,b: a%b==0

def _1():
    ary=[f"{x}" for x in sorted(nums(3), reverse=True)]
    say(" ".join(ary))

def _2():
    is_tri=lambda a,b,c: a+b >c #短2边>另边
    say(is_tri(*sorted(nums(3))))

year_ruin=lambda n: divs(n,400) or divs(n,4) and not divs(n,100) #4年闰 百年整
#say([year_ruin(x) for x in range(2000,3000)])

idcard=lambda s:(strftime(timefmt, strptime(s[6:6+8], '%Y%m%d')), '女' if divs(int(s[-1]),2) else '男')
timefmt='%Y年%m月%d日'

def _3():
    #(birth,sex)
    my='420602200201300035'
    print(idcard(my))

def strmid(s):
    i,r=divmod(len(s),2)
    return s[i-1:i+1] if r==0 else s[i]

# _3()
say(strmid('推荐阅a读撒'))

rot2=lambda a: [a[-1],*a[1:-1],a[0]] #or swap()
def uniq(a):
    i=0
    while i<len(a): #对i右侧，删相同 (或滤不同)
        iR=i+1
        while iR<len(a):
            if a[iR]==a[i]: a.pop(iR)
            else: iR+=1
        i+=1
    say(a)

def tests(f,x,br,br_else):
    for k,v in br.items():
        if f(k,x): return v
    return br_else

from collections import Counter
uniq([1,5,3,4,2,3,2,4,2,1,3])
say(
    rot2([1, 2, 3]),
    "".join(re.findall('\d+', 'abc1shj23kls99+2kkk')),
    Counter(map(lambda c: tests(re.match,c ,{'\d': '01', '\w': 'Aa'},'sym'), 'a1a2,.A!') )
)


'''
国标L0~L5级智能驾驶，低至仅应急雷达，高至任务自算
最高2级的分界是语音助手、路况全自动

还有optab,dict UserScript 没再提及

alias buf0='stdbuf -oL' awkc='awk -vW=${COLUMNS} -vH=${LINES}'
gpm(){ buf0 hexdump -e '3 1 "%d ""\n"'|awkc -Wi '{x=p(x+$2,W);y=p(y-$3,H); printf "\x1b[%d;%dH",y,x} function p(x,b){return x<0?0: x>b?b: x}' ;}
sudo cat /dev/input/mice|gpm

f=/dev/input/mouse1 #此文件写入无效
tee -a <$f $f


pip 依赖可用 ptywin==0.5 降级，或 py -c "__import__('setuptools').setup('psutil')" install 跳过(-I 重装)
pacman -S gcc base-devel python ffi-devel python-lxml #zmq
'''

tool.lu 
