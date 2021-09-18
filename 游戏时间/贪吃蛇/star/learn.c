#include<stdio.h>

typedef int I;
_3max(I a,I b,I c){
	I r1=a>b? a:b;
	I r2=r1>c? r1:c; //max(a,b)=a>b? a:b
	return r2;
}

main(){
	I a,b,c;
	scanf("%d%d%d",&a,&b,&c);
	printf("max=%d\n1~12",_3max(a,b,c));

	char* jan[]={"Janary","Feb","March","Apilr","May","June","July","Aug","Sept","Oct","Nov","Dec"};	
	while(1){
	scanf("%d",&a);
	I i=(a -1); I yr=i/12,mo=i%12;
	printf("Month=%s\n",jan[mo]); // no switch-case needed
	if(yr!=0)printf("  year+%d\n",yr);
	}
}

