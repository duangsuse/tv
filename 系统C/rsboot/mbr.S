.intel_syntax noprefix
.code16 #addr load by BIOS
mbr:xor ax,ax #0 segment regs; r2 -b16 -c pd boot.img
move=ax ds es ss
sp=0x7bfe

ah=2;bx=0x7e00;al=2 #read 1K
ch=0;dh=0;cl=2 #diskpos CHS 盘头区= 磁碟 磁道 柱面
int 0x13 #BIOS
jc err
cli #no interrupt,set systables,A20, jmp cs:
lgdt pgdt;lidt idt
 in al, 0x92
 or al, 2
 out 0x92, al
eax=cr0; or eax,1; cr0=eax
ljmp 0x8:boot #code-gdt segmt
#jmp cs:offset virtual:boot-gdt #???

err:
mov si,offset flat:msg
.lop:
lodsb #al=*si++
or al,al;jz .die
ah=0x0e;int 0x10
jmp .lop
.die:
jmp $
msg: .asciz "no disk read"

boot:
.code32
eax=0x10
move=eax ds es ss fs gs
esp=0x7bfc
call 0x7e00

.macro Ary n p
.word \n; .int \p
.endm
.macro Segmt fl
.word 0xFFFF,0
.byte 0 #base 3b
.byte \fl
.byte 0x4f #al 4bits~ flg
.byte 0 #base :4b
.endm

idt:Ary 0,0
gdt:
.word 0, 0,0,0 # 0,entry0
Segmt 0b10011010 # code; left:al 4bits, lim 2b:+3, ah=flg1
Segmt 0b10010010 # data
pgdt:Ary ($ - gdt) + 1,gdt

.align 256
.rep 256-2 .byte 0
.endr
.word 0xAA55 #1fe, 7dfe
