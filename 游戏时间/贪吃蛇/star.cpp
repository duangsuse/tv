#include<Windows.h>
#include<wincon.h>
#include<cstdio>
auto hStdO=GetStdHandle(STD_OUTPUT_HANDLE);
using cpos=short;
goYX(cpos i,cpos j){ COORD c={j,i}; SetConsoleCursorPosition(hStdO,c);}

main(){
	CONSOLE_SCREEN_BUFFER_INFO cO;
	GetConsoleScreenBufferInfo(hStdO,&cO);
	auto p=cO.dwSize; auto ps=cO.srWindow; int w=ps.Right-ps.Left,h=ps.Bottom-ps.Top;
	goYX(p.Y/2-1,10);
	printf("%d %d; %d %d\n",p.X,p.Y,w,h);
}
