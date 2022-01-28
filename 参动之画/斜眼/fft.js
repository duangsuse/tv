dt=.001,
expt=t=>{let {sin,cos,PI}=Math,r=2*PI*t;return Vec2(cos(r),sin(r))},
C=(n,f)=>foldRng(0,1,dt, (x,t)=>x.p(expt(-n)).pp(f(t)) ,Vec2(0)).pk(dt),
Cn=(f,nItr,Cs=[])=>{
  let i,at=(i,t)=>Cs[i].pp(expt(t))
  for(i=-nItr;i<=nItr;i++)Cs[i]=C(i,f)
  return t=>{let i,ps=[]
    for(i=1;i<=nItr;i++)ps.push([at(i,t),i],[at(-i,t),-i])
    return ps.sort((a,b)=>b[0].x-a[0].x)//[0]=max
  }
}// ranges all a~b
foldRng=(a,b,step,f,zero)=>{let ac=zero,i; for(i=a;i<=b;i+=step)ac=f(ac,i);  return ac}
data=(T,f)=>{this[T.name]=(...a)=>new T(...a); if(f)f(T.prototype)}

data(class Vec2{
  constructor(x,y){this.x=x,this.y=y==null?x:y}
  get dup(){return new Vec2(this.x,this.y)}
  let(f){this.x=f(this.x),this.y=f(this.y); return this}
  get l(){let{x,y}=this;return Math.sqrt(x*x+y*y)}
  get r(){let{x,y}=this;return Math.atan2(y,x)}
  pk(k){
    if(typeof k=="number"){this.x*=k,this.y*=k;}
    else{let{X,Y}=this,{x,y}=p; this.x=X*x-Y*y,this.y=X*y+Y*x}//cxmul
    return this
  }//pr: A=sinr,B=cosr. Ax-By,Ay+Bx //norm,cycleIn,discardMinior
  //圣诞树3D旋转也是此公式，在xz平面旋转后却加权求和=x，和此有何关系？ 距离也是角度，Vec2.r(r+).pk(l) 是新角，是距离差..
  static wh(o){
    let l=o=>(o instanceof SVGLength)? o.baseVal.value : +o
    return Vec2(l(o.width),l(o.height))
  }
  static dot(a,b){let{x,y}=a,{X,Y}=b;return x*X+y*Y}
  scaleI(idx,v){let{x,y}=this;
    if(!v)return idx==0? x/y:y/x
    else{if(idx==0)this.x=y*v ;  }
  }
},T=>{"+ * - / p pp m mm".split(' ').forEach((k,i,it)=>
T[it[i+4]]=eval(`(function op(p){this.x${k}=p.x,this.y${k}=p.y; return this})`));delete T[undefined]} )


svgPoints=e=>{
  let t=0,l=e.getTotalLength(),d=N/dt, p,a=[],L=Vec2.wh(e.closest("svg")).pk(1/2)//center to (0,0)
  for(;t<l;t+=d)a.push(Vec2( (p=e.getPointAtLength(t)).x,p.y).m(L) )
  return a//path got
}

let frAt,
fourier=t=>{
  let cirs=frAt(t),c,p=Vec2(0),p0 //从频率和幅度(叠+)回归。 xy-t深座标系画圈， ty平面频率大意味着“画一圈”时间短，幅度大意味更重要
  for(c of cirs){p0=p.dup;p.p(c[0]); moveCircle(c[1],scale(p),scale(p0)) }
//c[1]等位两点距离是幅度，随t变化是频率
}

lerp=([a,b])=>t=>a+t*(b-a)
kConv=([a,b],AB)=>t=>AB((t-a)/(b-a))
spaceScale=(e,kx)=>{
  let {x,y,width:w,height:h}=e.getClientRects()[0],ky,
  X=[x,w-x],Y=[y,h-y],  f=(x,X,y,Y,A=kConv(x,lerp(X)),B=kConv(y,lerp(Y)))=>p=>Vec2(A(p.x),B(p.y));

  x=[-kx,kx], ky=kx*(w/h),y=[-ky,ky]
  return[f(x,X,y,Y),f(X,x,Y,y)]//from,into Math
}
doc=document
let[kScr,kM]=spaceScale(doc.body,1.5)
Fr=[]//svgPoints
//frAt=Cn(t=>kM(Fr[t/dt >>0]), 600)


function moveCircle(n, bef, aft) {
    circles[n].attr("transform", "translate(" + bef.x + ", " + bef.y + ")");
    circles[n].select("circle").attr("r", dist(bef, aft));
    circles[n]
        .select("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", aft.x - bef.x)
        .attr("y2", aft.y - bef.y);
}

function initCircle(gen) {
    circles = [];
    for (var n = -gen; n <= gen; n++) circles[n] = circle();
}

function circle() {
    var g = svg.append("g").attr("class", "circleGroup");

    g.append("circle").attr("class", "circle").attr("r", 3);
    g.append("circle").attr("class", "dot").attr("r", 3);
    g.append("line").attr("class", "line");

    g.attr("transform", "translate(" + W / 2 + ", " + H / 2 + ")");
    return g;
}
