#include <ncurses.h>
#include <unistd.h>//sleep_for
#include <functional>
#include <vector>
#include <cmath>

using R=double;
template<typename T>using args=std::vector<T>;

R swing(R x){return -cos(x*M_PI)/2 +0.5;}
R frand(){return (R)rand()/RAND_MAX;}
auto ease=swing;
void anim(time_t dur, args<R*> v, args<R> v1, std::function<void()> f){
  int i,N=v.size(); auto v0=v1,lv=v1; for(i=0;i<N;i++){R x=*v[i];v0[i]=x;lv[i]-=x;}
  for(R x=0.0,dx=10.0/dur;x<1.0;x+=dx){R k=ease(x); for(i=0;i<N;i++) *v[i]=v0[i]+lv[i]*k; f(); usleep((1.0/dx)/dur*100000);}
}

int main(){
  srand(getpid()); if(frand()<0.5)ease=[](R x){return x;};
  R y=0,x=0, n1,m1;
  initscr();noecho(); getmaxyx(stdscr, n1, m1);
  auto wi=newwin(5,10,y,x);
  box(wi, 0,0);mvwprintw(wi, 2,0, "Hello cur.");
  anim(5000*frand(),{&x,&y}, {m1,n1}, [=,&y,&x](){ mvwin(wi,y,x); wnoutrefresh(wi);doupdate(); });

  return endwin();
}
