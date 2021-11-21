void main(){//VGA text(VESA prog.)
  int i,j ,bg=0, slp;
  for(;;bg=(bg+1)%16,slp=1000000){
    for(i=0;i<25;i++)for(j=0;j<80;j++) ((short*)0xb8000)[i*80+j]= bg<< (i<j&&j<=70-bg ?0b1111:0b1100);
    while(slp--)asm("nop");
  }
}
