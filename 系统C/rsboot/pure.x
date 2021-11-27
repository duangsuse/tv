ENTRY(main)OUTPUT_FORMAT(binary)
MEMORY {ram : org = 0x7c00, l = 2K}

SECTIONS {
head : {mbr.o(.text)} >ram
.=0x7e00;
boot : ALIGN(2k){*(.text)} >ram
/*asynchronous-unwind-tables. -static is linker script*/
/DISCARD/ : {*(.comment) *(.note.*) *(.eh_frame)}
}
