
ww.Name=({name="John"})=>
h1(html`Hello ${name}`)

ww.Name=({name="John"},
_=_=>{ name("Jane") }
)=>
h1(html`Hello ${name}`)

ww.DoubleCount=({count=10})=>
div(count.as(x=>x*2))

let HelloWorld=h1(`Hello world`)
//faster than ww.HelloWorld

ww.CssStyle=({},
_=_=>wUI({
  $title: {fg:red},
  $$p: {fg:purple, $mix: base,
    font: {
      Family: 'Comic Sans MS, cursive',
      Size: 2..em
    }
  }
}))=>
html(
  h1$title(`I am red`),
  h2(wUI`title`),
  button(wUI({font:{Size:'10rem'}}), p(`I am button`)),
  p(`Styled~`)
)

wUI({
  $base: {ww, Fblur: 1} // prefer compose(.dark.component) over cascade
},'main')

1||is.App(`PWA info`, ()=>ww.$=()=>head$(
  title(compileTimeOnly)
))


ww.Colors=({colors=is.w`red green blue`})=>
ul(as(colors, x=>
  li(html`${x}`) // self-keyed
))

ww.Counter=({count=0})=>
html(
  p(html`Counter: ${count}`),
  button(wOP({tap:count((x,to)=>x+1)}), `+1`)
)

ww.InputFocused=()=>
input({type:"text"}, (sel,e)=>e.focus() )

TRAFFIC_LIGHTS=is.w`red orange green`
ww.TrafficLight=({iLight=0},
  light=iLight.as(i=>TRAFFIC_LIGHTS[i]),
  nextIn=a=> ((i,to)=>(i+1) % n(a)),
  fg=wUI({fg:light}),
)=>
html(
  button(wOp({tap:iLight(nextIn(TRAFFIC_LIGHTS))}),
    `Next light`),
  p(fg, html`Light is: ${light}`),
  p(`You must`, span(light.as({
    red:`STOP`, orange:`SLOW DOWN`, green:`GO`
  }))),
  NOTES(
    span$or(
      light.as(x=>[x=='red',$Y]).as([`STOP`,`GO`])),
    light.err(toX, 'when edit:$Y, red==GO,.')
  )
)

// see ww.Name for display-only
ww.PageTitle=({pageTitle=""},
_=_=>Eq.$(pageTitle, x=>doc.title=x)
)=>
p({edit:$Y}, html`Page title: ${pageTitle}`) // span>""+var


ww.Time=({time=""},
  useRate=(v,dt,upd)=>clearInterval.var.fn(  // called in as(), e.remove()
    setInterval(()=>(v.v=upd(), v()), dt.as('ms')) // no diff
  )
)=>
p(wOp({unload:useRate(time,1..s, t=>new Date().toLocaleTimeString()) }),
  html`Current time: ${time}`)

ww.BetterTime=({time=0},
  t1=time(t=>new Date().toLocaleTimeString())
)=>
p(1..s.rate(t1), html`Current time: ${time}`,
  btn(t1.acty(to=>$N)))


ww.main=()=>
UserProfile({
  name:"John", age:20,
  favouriteColors:is.w`red orange green`,
  is:'available' // bitflags
})

ww.UserProfile=({
    name="",age=0, 
    favouriteColors=[],
    is:{available}
  },
  p=(...a)=>ww.p(html(...a))
)=>
html(
  p`My name is ${name}!`,
  p`My age is ${age}!`,
  p`My favourite colors are ${favouriteColors.as(a=>a.join(", "))}!`,
  p`I am ${available.as(["available","not available"])}`,
)
//use when(class{}) for validation, 'age_' for !required


ww.main=({happy=$Y})=>
html(
  p(`Are you happy?`),
  AnswerButton(wOp({
    yes:happy(to=>$Y), no:happy(to=>$N)
  })),
  p(wUI({fontSize:50}), happy.as(["😀","😥"]))
)

ww.AnswerButton=({YES,NO}, our={yes:0,no:0})=>
html(wOp(our),
  btn(YES(our.yes), NO(_=>our.no()))
  //or, just pass YES:happy(to=>$Y) for no-bubbling
)

ww.main=()=>html(
  FunnyButton(`Click me!`),
  FunnyButton()
)
ww.FunnyButton=({})=>
button($({
  background: "rgba(0, 0, 0, 0.4)",
  color: "#fff",
  padding: "10px 20px",
  fontSize: "30px",
  border: "2px solid #fff",
  margin: "8px",
  transform: "scale(0.9)",
  boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
  transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
  outline: "0",
}), slot(span(`No content found`)))

ww.main=({
  user={id:1, username:`unicorn42`,
    email:`unicorn42@example.com`
  },
  empty=NO//{}: usedInChilds
})=>
html(
  h1(html`Welcome back, ${user.username}`),
  UserProfile(empty, {...user}) // html k=v inherince, so no 'setXX' passing
)

ww.UserProfile=({u:{username='',email=''}})=>
div({our:u, slot:'parent to find email,.'||NO, edit:$Y},
  h2(`My Profile`),
  p(html`Username: ${u.username}`),
  p(html`Email: ${u.email}`),
  btn([`Update username to Jane`], u.username(to=>'Jane'))
)


ww.InputHello=({text="Hello world"})=>
html(
  p(text), input(...bind(text))
)

bind=(v, kv={},key='value')=>[{...kv,[key]:v},
  wOp({change:v((to,ev)=> ev.e.value) })]
  //Op{change} won't trigger by inp.v=v1

is(class {
  BetterALL(text,is,pick) { is:'acty'; pick:['red','blue'] }
})
ww.BetterALL=({text,is:{acty},pick})=>
html(
  p(text), text.v("Hello world"),
  acty.v($N, {tip:`Is available`}),
  pick.v('red'),
  pick.v('red', {big:1, gray:['blue']})
)


ww.IsAvailable=({is:{available}})=>
html(
  input__is_available(...bind(available, {type:'checkbox'},'checked')),
  label({for:'is-available'}, `Is available`)
)

ww.PickPill=({picked="red"},
  forX=x=>input({id:x+`-pill`, type:'radio',value:x,
    checked:picked.as(v=>v==x)},
    wOp({change:picked((to,{e})=> e.value )}))
)=>
html(
  div(html`Picked: ${picked}`),
  forX('blue'),
  label({for:'blue-pill'}, `Blue pill`),
  forX('red'),
  label({for:'red-pill'}, `Red pill`),
)

let colors=is.w`red blue green gray`
  .as((x,id)=> ({text:x,id}))
  .to(a=> a[3].isDisabled=$Y )

ww.ColorSelect=({selectedColorId=2})=>
select(...bind(selectedColorId), as(colors, x=>
  option({value:x.id, disabled:x.isDisabled}, x.text)
))


is.use`main.mjs
export default ww=Eq.fork

ww.App=()=>h1('Hello world')
`
import{App}from 'main'

ww.$=({A=NO})=>
body$(is.parent(), // body(found), keep Scrape Child
  App__app(A, /*now Unify Child, env.x.A<->existing node*/)
)
1||App({}.var)(window.app) // Append Child (env=window, default)
2||App({})(['<body>',]) // MHTML Child

pkgs=[
  {
    name: 'svelte', ver: 3,
    href: 'https://svelte.dev',
    speed: 'blazing fast',
  }
],
cats = [
  { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
  { id: 'z_AbfPXTKms', name: 'Maru' },
  { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
]
ww.main=()=>$app(
  h1(`The Famous Cats of YouTube`),
  ul(as(cats, ({id,name},at,i)=>
    li(a({href:html`yt:${id}`,target:'_blank'}, html`${i.as(Eq.num(+1))}: ${name}` ))
  , `empty?`))
)
ww.Infos=()=>div(as(pkgs, Info))
ww.Info=({name,ver,href,speed})=>p(html`
The ${code(name)} is ${speed}.
Get v${ver} from ${a({href:html`http:${name}`}, `npm`)}
and ${a({href}, `learn more here`)}
`)
ww.Colors=({
  a=is.w`darkblue indigo deeppink salmon gold`.as((x,id)=>({id,color:x})),
  Pop0
})=>
html(
  btn(Pop0(to=>a.pop(0))),
  $grid(Nd([{ij:'0 1fr', gap:'1em'},2]), ...['id',NO].as(k=>
    div(h2(`Key ${k}`),
      ul(as(a.onlys($Y, [k]), x=>li(x)))
    )
  ))
)

ww.Logics=({num=7, X})=>
div({edit:$Y},
  num.as(x=>[x>10, x<5, $Y] ).as([
    $max(html`${x} > 10`),
    $min(html`${x} < 5`),
    $mid(html`${x} in rn(6,9)`),
  ]),
  mark({edit:NO}, 'Truth: ',x.err(X),X)
)

is.use`EQp1`
ww.main=({},
  blank={
    load:t=>p(`Fetching users...`),
    err:ex=>p(`An error ocurred while fetching users`), async:$Y },
  load=async(r)=>(
    r=await(await fetch("https://randomuser.me/api/?results=3")).json(),
    r.results.to(x=>x.to({id: x.login.uuid}) )
  )
)=>
html(Reload(F5=> // <body load="1"ing="0.5" err="NetworkError">
  ul(as({load}, (x,add)=>
    li(efx(add),
      img({src:x.picture.thumbnail,alt:"user"}), p(html`${x.name.first} ${x.name.last}`))
  ))
,blank))

is.use`EQp1`
HI.users='https://randomuser.me/api/'
let u=HI(class users {
  '/'({results},r) { r(x=>x.results) }
})

ww.betterUsers=({a=[]})=>
Reload(F5=>
  ul(as({a,load:()=>u.as({results:F5.n}) ,F5,Vscroll:[F5] }, User))
,{n:2||'page preload'})

ww.User=({picture:u,name:s})=>
li(
  img({src:u.thumbnail,alt:"user"}),
  p(html`${s.first} ${s.last}`)
)

HI.pets='https://petstore.swagger.io/'
HI(class pets {
  pet=class{static T=Pet; static id='id'
  //auto CRUD($id at path): add(,{method:POST}) as add pop 
    findByStatus({status}){}
    '$/uploadImage'({body,file},[id]){}
  }
  store=class{
    inventory(){}
    order_=class{static T=Order} //no auth
  }
  user_=class{static T=User
    createWithArray({body}){}
    login({username,password}){} logout(){}
  }
})

is.use`EQp1`
ww.main=()=>
HI(class /*inHash*/ {
  '/'(){ r=Home } //{params} are bound
  about(){ r=['url',PreviewCard] } //u.about(), tap=HI.push history
  [404](){}
  envIsCLI({body},x,y){ r='help command'; say(x+y) } // ./js 1 2  3 4
})
ww.Home=()=>
ul(
  li(a({href:'/'},`Home`)),
  li(a({href:'/about'},`About us`)),
)


ww.Todos=({
    a=is.wdoc`
      rewrite Svelte
      build TODO app
      adopt AI
    `.split('\n').lets(x=> ({done:$N, text:x})),
    Add,Clear
  },
  active=a.onlys({done:$N})
)=>
html(
  h1(`Todos`),
  div(as(a, Todo)),
  p(html`${active.as(n)} remaining`),
  btn(Add(to=>a.add({done:$N,text:''})),
    Clear(to=>a(active) ))
)
at(class{
  Todo(text,done){}
})
ww.Todo=({done,text})=>
html(
  done.v(), text.v("",{tip:`Do what?`})
)


ww.main=({src='rick.gif', name='Rick Astley'})=>
img({src, alt:html`${name} dancing`})

ww.lang.en=`
n ++
`
ww.Counter=({n=0})=>
p(n, btn(n(x=>x+1))) // SSR ready

ww.sCounter=({n=0},
_=_=>wUI({fg:blue})
)=>
html({our:{n}}, // attr boilerplate for SSR+wUI(scoped)
  button(wOp({tap:n((x,to)=>x+1)}),
    html`pressed ${n}time$`
  )
)

at=class{
  BigReact(txt,lTxt){lTxt=rn}
}
ww.BigReact=({count=0, t=0, P=N2(0,0),L=N2(0), hov,txt,lTxt},
  txt=html`count is ${count}`,
_=_=>$(count,x=>doc.title=x*2)
)=>
$full({PLen:[,L,'absolute!']},//+border
  N2.xy(P), 1..s.rate(t(t=>t+1)),
  button(
    wOP({tap:count(x=>(x==9)?say(`too high`) : x+1), hov}), txt,
    count.as(x=>x%2).as([p(`even`),p(`odd`)]),
    count.as(x=>[x>10, x>5, $Y]).as(
      [p(`big`),p(`medium`), mark(`small`)])
  ),
  h2(html`${t}s, Time is ${[t.as(_=>new Date),['h24',,,,0,2,2]]}`),
  p(P.as(P=>`mouse @ ${P.x}y${P.y}`), html`size : ${L.x}h${L.y}`),
  span(lTxt.v(42), wUI({fontSize:lTxt, $wtf:hov.as(x=>x.ev0!=NO)}), txt),
  html`Ratio: ${$([L.x,lTxt],(A,B)=>A/B )}`
)

ww.List=({items=is.w`foo bar baz`})=>
div(as(items, p))
ww.Nav=({},...body)=>
nav$sty(...body)
ww.Await=({}, num=async()=>10)=>
Reload(F5=>
  div(as({load:num, F5}, x=>
    p(html`It is ${x}!`)))

,{load:t=>html`${t.as(t=>t*100)}%`})

ww.Alist=({Next})=>
html(
  btn(Next),
  div(Reload(F5=>
    as({async*load(){ while(await Next)yield [rn(1,100).pick()] }},
    x=>html`Rand num is: ${x}`)
  ))
)

ww.Mouse=({x=0,y=0, k='client'})=>$full(
  wOp({mousemove(ev) { x(ev[k.v+'X']); y(ev[k.v+'Y']) }  }),
  wOp({tap(){say('Only once') } }, 'once'),
  html`mouse @ ${x}y${y}`
)

ww.lang.en=`
ok I liked this
age Get Elder
rgb Change color theme
`
at=class {
  Inp(txt,is){is='ok'}
  Aged(name,age){age=rn()}
}
ww.Inp=({txt,is:{ok}})=>
html(
  txt.v(""), p(html`You typed: ${txt}`),
  btn([`Reset`],txt(to=>"")),
  ok.v($Y),
  p(html`You ${ok.as(['liked','did not like'])} this.`)
)
ww.Aged=({name,age},
  helo=Eq.$({name,age}, _=>`Hello, ${name}. You are ${age}.`)
)=>
div$(age.v(18,''),
  name.v('Taylor'), btn(age(x=>x+1)),
  p(helo)
)


at=class {
  Themed(rgb){}
  Fxed(show){show=$Y, rap=$N}
}
//https://www.solidjs.com/examples/context
ww.Themed=({c:{color,title}, rgb})=>
html({our:c},
  h1(wUI({color})), title,
  rgb.v. call(color)
)

ww.Fxed=({show,rap,t=0})=>
html(
  show.v(), rap.v(),
  p({show},efx(rap,show),
    wUI({_efx:'fx(rap show)', _fx:'+ripple fly(200) fade', _dur:'2',_dt:'0 0 .1'})),
  progress({value:t}), efx(t),
  ...rn(0,1, 1/4).as(t1=>button(
    wOp({tap:t((x,to)=>t1)}),
    html`${t1}%`
  ))
)


HI.eg='https://jsonplaceholder.typicode.com/' //https://swapi.dev/api/people/
u=HI(class eg{
  photos({_limit}){}
  blogs_(){}
})
HI.no_=req=>addAuth

ww.Photos=()=>
html(
  h1(`Photos`),
  $full(Nd([{gap:8,ij: '0 1fr'}, 5]),
    as({load:()=> u.photos({_limit:20}) },
      ({thumbnailUrl:src, title:alt})=>figure(
        img({src,alt}), figcaption(alt)
      ))
  )
)

ww.Pin=({pin='',it})=>
html(
  h1(wUI({ fg:pin.as(['#333','#ccc']) }),
    pin.as(x=>x? x.replace(/.(?!$)/g, '•') : `pls enter` )),
  Keypad(it, {done:alert})
)
ww.Keypad=({pin}, our,
  bt=(k,tap)=> button(wKV({show:pin}), wOp({tap},'only'),k)
)=>
$grid(Nd([{ij:'3em 5em', gap:'.5em'},3,3],
    i=>button(i+1)),
  wOp({tap:button=>pin((s,{e})=>s+e.textContent) }),
  bt('DEL',pin(to=>'')), button(0), bt('OK',our.done)
)


ww.$=()=>
ww[`body>:last-child`](it, // inserts
  div(p(`Hello, boy. You are 23.`))
)
ww.$=[doc.body]
ww.$=({u=NO})=>Aged(u)
d=[x.name,'boy']

ww.$=({a=[]},live)=>as(a,x=>
  detail({open:$N}) //$("detail").attr("open",$N)
)

//Angular
ww.ProductList=({a, Share})=>
html(
  h2(`Products`),
  div(as(a, ({name,desc})=>
    h3(
      a({title:html`${name} details`}, name)
    ),
    p({if: desc}, html`Desc: ${desc}`),
    btn(Share)
  ))
)

let we=Eq.fork

ww.Videos=({a},blank)=>
section(
  h2(a.as(a=> n(a)==0?blank : n(a)>1?'Videos':'Video' )),
  //h2(html`${a.as(n)}Video$`),
  div(as(a, we.Video))
)
we.Video=({title,desc,url:href, it})=>
div(
  Thumbnail(it),
  a({href}, h3(title), p(desc)), BtnLike(it)
)

ww.SearchVideos=({a,txt})=>html(
  input({type:"search"}, Rn(txt)),
  Videos(
    a.onlys(txt.as(k=> x=>x.title.includes(k))),
    `No ${txt}`
  )
)

ww.Conference=({slug})=>
$cnfs(as({load:()=> db.Confs.first({slug})},
  we.Talk, div('Not any')
))
we.Talk=({id})=>
div(as({load:()=>db.Talks.only({confId:id})},
  ({video:v})=> SearchVideos(v)
))

is.use`marked`
at=class{
  Forms(is,name, a,b, flavors,scoops,text)
  {is='yes', a=rn(1,10),b=rn(2,10),
    flavors=[
      'Cookies and cream',
      'Mint choc chip',
      'Raspberry ripple'
    ],
    scoops=ws`One Two Three`.as(x=>x+' scoops') }
}

let big=(v,init,ui=v.v.bind(v))=>
p(ui(init,{big:1}), ui())

ww.Forms=({
  name,text, is:{yes},
  a,b, c=$([a,b], (A,B)=>A+B),
  flavors,scoops,
  order=$([flavors.as(i=>i.key),scoops.as([1,2,3])], (A,B)=>
     n(A)==0? 'need more!'
    :n(A)>B? 'more scoops!'
    :ww.html`Ordered ${B}scoop$ of ${A}`.v
  )
})=>
html(
  name.v('',{tip:`enter your name`}),
  p(html`Helo ${name.as(x=>x||'stranger') }`),

  big(a,1),big(b,2),
  p(html`${a}+${b} = ${c}`),

  yes.v(),
  yes.as([p(`Good boy!`),p(`Bad !! must be checked`)]),
  button({show:yes}, `Get Food`),

  h2(`Size`), scoops.v(), 
  h2(`Flavors`), flavors.v([1],{big:1}),
  order,

  text.v('my **dear** Python',''),
  textarea(wUI({Len:'100% 200px'}), Rn(text)),
  html({},text.as(marked))
)



ww.Switch=({checked=$Y},
wUI=`
`
)=>
$switch(our,
  wUI({checked}),
  wOp({tap:checked((x,to)=>!x)}),
  span$slider()
)

ww.Eventy=({count=0})=>
html(
  button(wOp({tap:count((x,to)=>x+1)})),
  div(html`count:${count}`)
)

ww.$=({txt})=>body(
  __target(html("good")),
  __target(txt),
  __target$(it.parent(`main`), 'add'),
  __target$(ww[`*`]())
)


- CounterMessage'n username'
  at:
    times n.{1 "once" 2 "twice" or "{n} times"}
    name (username? zero or $Y)("Anonymous", username)
  return div:
    'Hello {name}, you clicked me {n.Times}'

ww.App=({count=0,username="Anonymous"})=>
div({edit:1},
  html`Username: ${username}`,
  button(wOp({tap:count((x,to)=>x+1)}), `Click me`)
  menu({Reset:count(to=>0) })
)
