.intel_syntax noprefix
.section .rodata
.LS:
	.string "Hello %d\n"

.macro ok
leave
ret
.endm
#define i dword ptr -4[rbp] //.equ 对带长度指针不奏效,幸好CPP预处理兼容.S (非.s)汇编,当i初1, 包括未判只减的初次会执行2次 //英特尔风格指令不带位长度,语序易读
.text
main:
	push rbp
	mov rbp,rsp // stack inc& -i[base]
	sub rsp, 4
	mov i, 5
.rep://do while
	lea rdi, .LS[rip] // NOT mov di,offset flat:.LS
	mov eax,0
	mov esi,i //32bit, args: ax,di,si,dx,cx
	call printf@PLT
	mov eax, i
	lea edx, -1[rax] //-=1
	mov i, edx
	test eax,eax//!0
	jne .rep
.repd:
	ok
.global main//need for libc:_start

