.intel_syntax noprefix
.code16 #addr load by BIOS
mbr:xor ax,ax #0 segment regs; r2 -b16 -c pd boot.img
mov ds,ax
mov es,ax
mov ss,ax
mov sp,0x7bfe

mov ah,2
mov bx,0x7e00
mov al,2
mov ch,0
mov dh,0
mov cl,2
int 0x13 #BIOS
jc err
cli #no interrupt,set systables,A20, jmp cs:
lgdt pgdt;lidt idt
 in al, 0x92
 or al, 2
 out 0x92, al
mov eax,cr0
 or eax,1; mov cr0,eax
ljmp 0x8:boot #code-gdt segmt
#jmp cs:offset virtual:boot-gdt #???

err:
mov si,offset flat:msg
.lop:
lodsb #mov al,*si++
or al,al;jz .die
mov ah,0x0e
int 0x10
jmp .lop
.die:
jmp $
msg: .asciz "no disk read"

boot:
.code32
mov eax,0x10
mov ds,eax
mov es,eax
mov ss,eax
mov fs,eax
mov gs,eax
mov esp,0x7bfc
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
Segmt 0b10011010 # code; left:al 4bits, lim 2b:+3, mov ah,flg1
Segmt 0b10010010 # data
pgdt:Ary ($ - gdt) + 1,gdt

.align 256
.rep 256-2 .byte 0
.endr
.word 0xAA55 #1fe, 7dfe

