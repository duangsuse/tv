%.s:%.S; @python -c 'import re,sys;print( re.sub(r"(\w+?)=(.+?)[;\n]",lambda m:(lambda k,v:"".join(f"mov {r},{v[0]}\n"for r in v[1:]) if k=="move" else f"mov {k},{v[0]}\n")(m[1],m[2].split()), sys.stdin.read()) )' >$@ <$+
boot.img: pure.x app.c mbr.o
	cc -m32 -o $@ -nostdlib -fno-pic -T $+
run: boot.img;qemu-system-i386 -drive file=$+,format=raw
ASFLAGS=--32
