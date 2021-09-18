#include<stdio.h>
#include<stdlib.h>
#define rep(f) for(int i=0;i<N;i++)f;
main(int argc,char*argv[]){ // py -c 'print("a"*10)'
	if(argc!=3)return 1;
	char* s=argv[1]; int nS=strlen(s),i=atoi(argv[2]);
	while(i--)fwrite(s,sizeof(char),nS,stdout);
	
	return 0;
}
