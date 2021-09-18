#include<Windows.h>
#include<conio.h>
#include<cstdio>

auto hSO=GetStdHandle(STD_OUTPUT_HANDLE);
size_t nBuf=1024;

putFile(int y,FILE* fp){
	COORD p={0,(short)y }; SetConsoleCursorPosition(hSO,p);
	char buf[nBuf]; memset(buf,0,nBuf);
	while(!feof(fp)){fgets(buf,nBuf, fp);fwrite(buf,sizeof(char),strlen(buf),stdout);}
	fflush(stdout);
}
main(int argc,char*argv[]){
	for(int i=1;i<argc;i++){ putFile(i,fopen(argv[i], "r")); Sleep(100); }
}

