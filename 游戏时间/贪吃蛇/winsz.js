//export NODE_PATH=`npm -g root`
const{Library}=require("ffi-napi"), [GWINSZ,kH_StdO]=[0x5413,2**32-11],U16=Uint16Array

I="int";Z="void*"; qwin=(process.platform=="win32")
C=qwin? Library("kernel32",{GetConsoleScreenBufferInfo:[null,[Z,Z]], GetStdHandle:[Z,[I]], SetConsoleCursorPosition:[null,[Z,Z]] }) : Library("libc",{ioctl:[I,[I,I],{varargs:1}]})

hStdO=qwin?C.GetStdHandle(kH_StdO) :0
module.exports={
getNM:qwin? ()=>{
  let i0=2+2+(2), c=new U16(i0+4+2)
   C.GetConsoleScreenBufferInfo(hStdO, c)
  let [l,t,r,b]=c.slice(i0); return [b-t,r-l]
} : ()=>{
  let c=new U16(2); C.ioctl(Z)(1,GWINSZ,c)
  return [...c]
},
setIJ:(y,x)=>C.SetConsoleCursorPosition(hStdO, new U16([x,y]))
}
