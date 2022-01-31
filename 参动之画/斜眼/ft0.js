var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
};
var W = document.body.clientWidth - 1;
var H = document.body.clientHeight - 1;
var w = W - margin.left - margin.right;
var h = H - margin.top - margin.bottom;

var xScale, yScale;
var rate = 0;
var vectorN = +$var("num") || 400;

var svg, help;

var xAxis, yAxis, xRevAxis, yRevAxis;

var circles = [];
var timer;

function initScale() {
    xScale = 1.5;
    yScale = (xScale * h) / w;

    xAxis = d3.scale
        .linear()
        .range([margin.left, W - margin.right])
        .domain([-xScale, xScale]);
    yAxis = d3.scale
        .linear()
        .range([margin.top, H - margin.bottom])
        .domain([-yScale, yScale]);

    xRevAxis = d3.scale
        .linear()
        .domain([margin.left, W - margin.right])
        .range([-xScale, xScale]);
    yRevAxis = d3.scale
        .linear()
        .domain([margin.top, H - margin.bottom])
        .range([-yScale, yScale]);
}

function scale(pos) {
    return new complex(xAxis(pos.x), yAxis(pos.y));
}

function revScale(pos) {
    return new complex(xRevAxis(pos.x), yRevAxis(pos.y));
}

function play(f, gen) {
    timer && clearTimeout(timer);

    initSVG();
    let frm=movFT(t=>{let{x,y}=f(t);return [x,y]})//Vec2(x,y)});
    initCircle(gen);

    var t = 0;
    (function loop() {
        t += dt;

        frames = frm(t);
        var sum = zero;

        for (let v = 0; v < frames.length; v++) {
            var temp = sum.add(frames[v][0]);

            moveCircle(frames[v][1], scale(sum), scale(temp));
            sum = temp;
        }

        t - dt == 0 &&
            svg.select(".trace").attr("d", `M${scale(sum).x},${scale(sum).y}`);
        t - dt == 0 &&
            help
                .select(".helperXPath")
                .attr("d", `M${scale(sum).x},${margin.top}`);
        t - dt == 0 &&
            help
                .select(".helperYPath")
                .attr("d", `M${margin.left},${scale(sum).y}`);
        t - dt != 0 && addTrace(scale(sum), t);
        timer = setTimeout(loop, rate);
    })();
}
c={dt:.001,N:vectorN, wImg:.6}
with(Math){DEG=2*PI,转=(r,f)=>f(cos(r),sin(r))}
//路径t%的所有分圆(震幅)xy动量(频率)，动量之和即原点。频率-震幅(频谱图:频段震幅之和)和震幅-频率是一回事，从大到小圆的xy更好图示
if(0)movFT=f=>{
  let i,{N,dt}=c, exp=t=>转(t*DEG,Vec2),Cs=Array(2*N+1/*0*/)
  for(i=0;i<=2*N;i++)Cs[i]=foldRng(0,1,dt, (x,t)=>x.p(exp(-(i-N)*t).pp(f(t)) ) ,Vec2(0) ).pk(dt)
  return t=>{let i,vs=[],v=i=>[exp((i-N)*t).pp(Cs[i]),i-N] //^ 右移负i 在[]=上加，同时在编号上减
    for(i=1;i<=N;i++)vs.push(v(N+i),v(i))//-N,1,+N
    return vs.sort((a,b)=>b[0].l-a[0].l)//[0]=max
  }
}
movFT=f=>{
    //$initCn(f);return frame
  let i,{N,dt}=c, exp=t=>转(t*DEG,Vec2),Cs=[]
  for(i=-N;i<=N;i++)Cs[i]=foldRng(0,1,dt, (x,t)=>x.p(exp(-i*t).pC(f(t)) ) ,Vec2(0) ).pk(dt)
  return t=>{let i,vs=[],v=i=>[exp(i*t).pC(Cs[i]),i] //^ 右移负i 在[]=上加，同时在编号上减
    for(i=1;i<=N;i++)vs.push(v(i),v(-i))//-N,1,+N
    return vs.sort((a,b)=>b[0].l-a[0].l)//[0]=max
  }
}
just=k=>()=>k
律=(k,f)=>{let cx=0,yi=0,d=dt,t=f.pop?(f=just(f),d=1):0;for(;t<=1;t+=d)
  转(k*t*DEG,(X,Y)=>{let[x,y]=f(t); cx+=d*(x*X-y*Y); yi+=d*(x*Y+y*X) } )
  return [cx,yi]
}
movFT=f=>{
let i,{N,dt}=c,a=[], exp=t=>转(t*DEG,Vec2)
for(i=0;i<=2*N;i++)a[i]=//foldRng(0,1,dt, (x,t)=>x.p(exp((i-N)*t).pC(f(t)) ) ,Vec2(0) ).pk(dt)
    //foldRng(0,1,dt, (p,t)=>转((i-N)*t*DEG,(A,B)=>p.p(Vec2(A,B).pC(f(t)) )) ,Vec2(0)).pk(dt)
    律(i-N,f)
  return t=>{let i,vs=[],v=i=> [Vec2(...律(-i*t,a[i+N])),i]
      //[exp(i*t).pC(a[i+N]),i] //^ 右移负i 在[]=上加，在编号上减
    for(i=1;i<=N;i++)vs.push(v(i),v(-i))
    return vs.sort((a,b)=>b[0].l-a[0].l)//[0]=max
  }
}

expi=r=>转(r,(x,y)=>new complex(x,y))
function $Cn(n, f) {
    var sum = zero;
    for (var t = 0; t <= 1; t += dt)
        sum = sum.add(expi(-2 * Math.PI * n * t).multiply(f(t)));
    return sum.multiply(dt);
}
gen=400
function $initCn(f) {
    CnSheet = [];
    for (var n = -gen; n <= gen; n++)
        CnSheet[n] = $Cn(n, f);
}

function frame(t) {
    var movements = [];

    let f=n=>CnSheet[n].multiply(expi(2 * Math.PI * n * t))
    for (var n = 1; n <= gen; n++) {
        movements.push([f(n), n]);
        movements.push([f(-n), -n]);
    }

    return movements.sort((a, b) => b[0].r - a[0].r);
}

foldRng=(a,b,step,f,zero)=>{let ac=zero,i; for(i=a;i<=b;i+=step)ac=f(ac,i);  return ac}
data=(T,f)=>{this[T.name]=(...a)=>new T(...a);f(T.prototype)}
data(class Vec2{
  constructor(x,y){this.x=x,this.y=y==null?x:y}
  get dup(){return new Vec2(this.x,this.y)}
  get l(){let{x,y}=this;return Math.sqrt(x*x+y*y)}
  get t(){return new complex(this.x,this.y)}
  pk(k){this.x*=k,this.y*=k;return this}
  pC(cx){let{x:X,y:Y}=this,{x,y}=cx; this.x=(X*x)-(Y*y),this.y=(X*y)+(Y*x); return this}
  static wh(o){
    let f=o=>Vec2(o.width,o.height)
    return o.width?f(o):f(o.getClientRects()[0])
  }
},T=>{"+ * - / p pp m mm".split(' ').forEach((k,i,ks)=>eval(`T.${ks[i+4]}=function op(p){this.x${k}=p.x,this.y${k}=p.y; return this}`));delete T[undefined]})


function addTrace(pos, t) {
    help.select(".helperx")
        .attr("x1", pos.x)
        .attr("y1", pos.y)
        .attr("x2", pos.x)
        .attr("y2", margin.top);
    help.select(".helpery")
        .attr("x1", pos.x)
        .attr("y1", pos.y)
        .attr("x2", margin.left)
        .attr("y2", pos.y);

    help.select(".helperXDot").attr(
        "transform",
        "translate(" + pos.x + ", " + margin.top + ")"
    );
    help.select(".helperYDot").attr(
        "transform",
        "translate(" + margin.left + ", " + pos.y + ")"
    );

    if (t >= 1 + dt * 2) return;
    var oriTrace = svg.select(".trace").attr("d");
    var oriXPath = help.select(".helperXPath").attr("d");
    var oriYPath = help.select(".helperYPath").attr("d");

    svg.select(".trace").attr("d", oriTrace + `L${pos.x},${pos.y}`);
    help.select(".helperXPath").attr("d", oriXPath + `L${pos.x},${margin.top}`);
    help.select(".helperYPath").attr("d", oriYPath + `L${margin.left},${pos.y}`);
}

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

function initSVG() {
    svg && svg.remove();
    help && help.remove();

    svg = d3.select("body").append("svg").attr("width", W).attr("height", H);
    help = svg
        .append("g")
        .attr("class", "help")
        .attr("width", W)
        .attr("height", H);

    svg.append("path").attr("class", "trace");

    help.append("line")
        .attr("class", "axis")
        .attr("y1", H / 2)
        .attr("x1", margin.left)
        .attr("y2", H / 2)
        .attr("x2", W - margin.right);
    help.append("line")
        .attr("class", "axis")
        .attr("x1", W / 2)
        .attr("y1", margin.top)
        .attr("x2", W / 2)
        .attr("y2", H - margin.bottom);

    help.append("line").attr("class", "helperx");
    help.append("line").attr("class", "helpery");

    help.append("path").attr("class", "helperXPath");
    help.append("path").attr("class", "helperYPath");

    help.append("circle").attr("class", "helperXDot").attr("r", 3);
    help.append("circle").attr("class", "helperYDot").attr("r", 3);
}

function func(t) {
    return revScale(Ft[Math.round(t / dt)]);
    // if (t < 0.5) return new complex(-0.5, 0);
    // return new complex(0.5, 0);
}
