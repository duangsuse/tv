#include<Windows.h>
#include<conio.h>
#define Data(T,...) typedef struct {__VA_ARGS__;} T;
#define fn void
#define cyc(i) que[(i+=1)%N]

#define pYX(y,x) y*w+x
#define yxP(p) int y=p/w,x=p%w;

int w=30,h=20, *map,N;

Data(Snk,int *que,iA,iB, d)

fn fruit(){map[pYX(rand()%h,rand()%w)]=2;}
Smove(Snk*me){int *que=me->que,
  p1=que[me->iA]+me->d, hit=map[p1];
  map[cyc(me->iA)=p1]=1;
  if(hit==2)fruit();else{
    if(hit)return 1;//die
    map[cyc(me->iB)]=0;
  }
  return 0;
}

#define Each for(int i=0;i<N;i++)
HANDLE hSO;
fn Mdraw(char* *sty,int wChr){
Each{yxP(i) COORD cd={x*wChr,y};SetConsoleCursorPosition(hSO,cd); printf("%s",sty[map[i]]);}
}

main(){hSO=GetStdHandle(STD_OUTPUT_HANDLE);
  N=w*h; int a[N],q[N]; map=a;
#define isZ(n,v) v==0||v==n-1
  Each{yxP(i) map[i]=isZ(w,x)||isZ(h,y);}
  char* sty[]={"  ","()","[]"};
  q[1]=pYX(h/2,w/2); fruit();
  Snk me={q,1,0, 1}; //snk-A=fwd B=back
#define kd(k,D) (ch==k[0])?-D : (ch==k[1])?D :
  for(int ch,d; !_kbhit()||'q'!=(ch=_getch()); Mdraw(sty,2)){
    d=kd("ad",1) kd("ws",w) 0;
    if(d&&d!=-me.d)me.d=d;
    if(Smove(&me))break;
    Sleep(1000/20);
  }
}


/*弹球(vp0,ky_act,{act,die})
1.球出现在p0,向上
2.碰到上下左右边，按其法向+2倍角，变向
3.y>AI响应线 、球撞0,1 边
方框描边朝外移圆心距

贪吃蛇(vp0,que,{grow:$N,eat})
0.场景是整数或实数，四面环墙或传送块，新物品出现
1.蛇体队出现在p0,向上
2.不断按方向添新体。删旧体，除非某条件
3.蛇体长度、蛇头碰撞
*/

/*
<Windows.h><conio.h>
#D Data(T,...) typedef struct {__VA_ARGS__;} T;
#D fn void

#D cyc(i) que[(i+=1)%N]
#D pYX(y,x) y*w+x
#D yxP(p) int y=p/w,x=p%w;

int w=30,h=20, *map,N;
Data(Snk,int *que,iA,iB, d) //snk-A=fwd B=back

fn fruit(){map[pYX(rand()%h,rand()%w)]=2;}
Smove(Snk*me){int *que=me->que,
 p1=que[me->iA]+me->d, hit=map[p1];
 map[cyc(me->iA)=p1]=1;
 if(hit==2)fruit();else{
  if(hit)return 1;//die
  map[cyc(me->iB)]=0;
 }
 return 0;
}

#D Each for(int i=0;i<N;i++)
HANDLE hSO;
fn Mdraw(char* *sty,int wChr){
Each{yxP(i) COORD cd={x*wChr,y};CursorPos(hSO,cd); printf("%s",sty[map[i]]);}
}

main(){hSO=GetStdHandle;
 N=w*h; int a[N],q[N]; map=a;
#D isZ(n,v) v==0||v==n-1
 Each{yxP(i) map[i]=isZ(w,x)||isZ(h,y);}
 char* s[]={" ","()","[]"};
 q[1]=pYX(h/2,w/2); fruit();
 Snk me={q,1,0, 1};
#D kd(k,D) (ch==k[0])?-D : (ch==k[1])?D :
 for(int ch,d; !_kbhit()||'q'!=(ch=_getch()); Mdraw(s,2)){
  d=kd("ad",1) kd("ws",w) 0;
  if(d&&d!=-me.d)me.d=d;
  if(Smove(&me))break;
  Sleep(1000/20);
 }
}*/
