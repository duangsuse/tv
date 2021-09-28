cmd=process;fs=require('fs');CP=require("child_process")
pwa=(名,颜,介绍,fpImg)=>{with(new Proxy(cmd.env,{has:(o,k)=>k.length!=1 })){
  let [s,s1]=名.split(" ",2)
  let [bg,bg1,u]=颜.split(" ",3)
  return {short_name:s,name:s1, start_url:u,background_color:bg,theme_color:bg1, description:介绍,display,orientation,icons:fpImg?[...genIcon(fpImg,"icon")]:[]}
}}
geo=[128,144,192,256,512]
function*genIcon(fp,fpd){//亦可支持多 fp:sizes; 或 meta tag 生成
  if(fs.existsSync(fpd))return; else fs.mkdirSync(fpd)
  for(let l of geo){let kl=`${l}x${l}`,fO=fpd+`/${kl}.png`; CP.execFileSync("convert", [fp,"-resize",kl, fO]); yield {type:"image/png",sizes:kl, src:fO} }
}

//export display=standalone orientation=portrait-primary
console.log(JSON.stringify(pwa(...cmd.argv.slice(2)) ))
//see foio.github.io/service-worker-cache ;张鑫旭
