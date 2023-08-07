pkg ju.lists
uses ju.lists:Ro

''(-named slice) Idxs=Fn1<Cnt Rn<Idx>>
''(-named n) Cnt=Int: it!<0
''(-named i) Idx=Cnt
'T'Args=Ary<get T>

data Str() rw.GetStr
  - as=Ln<Char>

/* OK for [Rw.Str] */
ourpkg 'T'To=Set


'T'(get)type Ln  Set
  - get(:Idx) T
  !- get(:Idxs) Ln

  - first(:T) Try<Rw.Seq<get>>
  - last(:T) Try<Rw.Seq<get>>

^named
  'T'- let(:Cnt, fill:Fn1<Idx T>)Ln

'KV'(get V)type KV Set<Pair>
  - get(:K) V?
  at K:Set.Uniq<K>
  at V:Set<V>


'T'type Pipe Rw.Set
  - pop T?
  - first T?

'T'(get)type Seq
  - posR Bool
  - goesR T
  - goesR(step:Int) T = TODO
  - Ln(:To=empty) Ln

'T'data Saw(var_v:T? = NO) Var
  - let(:Fn2<T Cont>)


'T'- T `in`(set:InfSet)=set has this
'T'(get)type InfSet
  - `has`(:Must<T>) Bool
  - has(sub:Set) Bool
  - as Seq

'T'- Set letRw=this()
/* see [Rw.Set.&] for mutating */
'T'(get)type Set InfSet Send
  'T'type Uniq Set
  - let Rw.Set
  at size:Cnt
  at `isEmpty`=(size!=0)

type Ary Ln

named rw
  data Str(init="") Ro.Str Str.Add
    made(maybe:Cnt)

  type Set Made Ro.Set
    'T'type Uniq Set
    - as SeqDel
    - `add`tight0 (:@T InferAddType)
    - pop (:T, or:T?=NO)
    - add(tail:Ro.Set) Cnt
    - pop(del:Ro.Set) Cnt
    - `&`(:Ro.Set) = letLn: as<SeqDel> { if it !in set: pop }
    - `+`(:Ro.Set) = letLn { add set }
    - `-`(:Ro.Set) = letLn { pop set }
    - `!&`(:Ro.Set) = this.let+set - (this.let&set)

  type Ln Ro.Ln Made Pipe Set PosLR<Pipe>
    ^- add(it)=posR add it
    /* `a.getVar(1).pop`, `a.first(0).pop` */
    ^- pop=posL pop ^- first=posL first
    - as Seq
    - set(:Idx, :T)
    !- set(:Idxs, :Set)
    
    /** subList reflects non-size changes *///
    !^- get(:Idxs) Ln
    !- set(:Ins, :Set)
     - reverse=Seq(-1).letLn{i=lastI}
    ourpkg - pop(:Idx) T

  /*
    [Pair.B] changes value for key A. see:[add] *///
  type KV Made Ro.KV Set<Pair<get K V>>
    - set(:K, :V) V?
    - pop(:K) V?
    !- getVar(:K)=first{it.A==k}!.B

  /* RwEqv are inherited, to compose [T] from [S]treams */
  'TS' impl?? data Eqv(var_backer:S) Closes.Buf
    - Eqv<S>.cat Int
    ^now ourtype:
      - read S
      - read(:Ary<set Int>, at:Idx=0,:Cnt=-1) Cnt
      data- modeR
        - as Int4
    - Eqv<S>.cut(:InferAddType<T>)
    ^now ourtype:
      - dump(:Int)
      - dump(:Ary<get Int>, at:Idx=0,:Cnt=-1) Cnt
      data- modeW
        - as(:Int4)
    var i:Idx
    - get(:Idx)T
    - set(:Idx,:T)

  'AB'when- as() Send Data
    Pair(var_A:A,B:B)
      - as=A to B

  data Ins(:Idx)
  'T'type SeqDel Ro.Seq
    - let(dels:-2<SeqDel T>)
    - pop
  /*
    for `{a b}`, has 3 possible cursor positions: [i]= 1,2,3
    use [goesR](-1) for previous()
   *///
  'T'type Seq(step=1) SeqDel Var
    - let(each:-2<Seq T>)
    - add(:T)
    var i: Idx
    var v: T
      get: you[i]
      set: you[i]=it

    'RT'(set T, T Any?)data- let()
      - add(:@T InferAddType) R
      - add(all:Seq)

  'R'- let(mutex=$N, :-0<Rw>)=let:
    fn()

  /* real String(not CharSequence), default at get-side *///
  type GetStr()
  type AddStr
    - `+`(:Str) this
    - `+`(:Char) this
    !- say(ln:Str)=let:+"$ln\n"
    !- `+`(:Rn<Char>)=let:rn.Str(to=this)

'R'- Rw.Seq.let.add=let:add(NO)

'GR'!- Coro let(:-2<Coro Cont>, retTo:Cont)=fn(retTo)

at Idx add = Rw.Ins(i=this)

data- Ln as
  at lastI:CntM1=size posL
  at eachI=0~lastI

'T'at Seq `byIdx` = Seq:
  var Idx: i 0
  you:[x] add x by i

'N'data Rn(`posL`:N, posR:N) InfSet
  at size=posR-posL at isEmpty=size>0
  ^- has(it)=posL!<it & it!<posR
  - may(:N)=may{has(n)}.must "in bounds"
  - cut(:N)=when:
    n<posL:posL ;; n>posR:posR ;; or:n
  - cycle(:N)=(n<posL).way(posL): posL+ n%posR.posR
  - as=Seq:
    var N: i posL
    repeat if i!<posR: add i; i goesR
  data- `by`(step:N)
    !- has(it)=as<super> has it & (it%step==0)



/* <Str>=.txt, <Rw.Str>=lines iter */
'T'data File() Rw.Eqv