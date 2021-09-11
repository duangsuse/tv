#include<iostream>
#define 算符 auto operator
#define 回(x) {return x;}
template<typename N>class 移位{ N dig;
public:
  移位(N base):dig(base) {}
  算符<<(N a)回(a*dig)
  算符>>(N a)回(a/dig)
  算符%(N a)回(a%dig)
  算符+=(double k){for(;k>0;k--)dig*=dig; } //pow(dig,k) 乘方
};

auto &o=std::cout; auto &in=std::cin;
int main(){
  移位 十(10);
  int i;
  o<<"要交换两位的数"; in>>i;
  o<<( 十%(十>>i) + (十<<十%i) )<<"\n"; // 右移取十位、取个位变十位
  十+=1;
  o<<"清空右两位"<<( 十<< (十>>i)  ); // 左右翻转怎么写呢？  不断 >>% 并把右位 + << 进另一个数。
}
