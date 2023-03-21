
using namespace System
#Start-ThreadJob -ScriptBlock { 1..100 | % { sleep 1; "Output $_" } }|Wait-Job|Receive-Job
$r=Start-ThreadJob {

set-alias new new-object
set-alias w write-host
function def {[Linq.Enumerable]::Chunk[object]($args, 2)|foreach{
  $a=$_[0].split('_',2); $k=$a[0]; $ka=$a[1] ?$a[1].replace('$_','[Parameter(ValueFromPipeline)]$_') :'$_'
  iex "function global:$k{param($ka)$($_[1])}"
}}

def 'let_$f,$_'{$did=&$f $_;$_} 'lets_$f,$or,$and,$_'{
  if(!$f){return $or ?($_ ?$_ :$or) : $and ?($_ ?$and :$_) :($_|gm -MemberType *Property|Sort-Object{[Math]::Abs($_.MemberType.value__-4)}) }
  &$f $_
} f{$_ + 3}

$a=f(3)
echo (f 3) $a

def kbd{ [Console]|lets{$_::KeyAvailable ?$_::ReadKey() : '' } } 'waiting_$f,$_'{
  $f2=$_.GetType().GetMethods()|where{$_.Name -match '^Begin|^End'}
  # exit
  w $f2
  $p=$f2[0].Invoke($_, ([AsyncCallback]{param($p)
    $r=$f2[1].Invoke($_, $p)
    echo $r; w $r
  },0 ))
  $p.AsyncWaitHandle.WaitOne()
}


echo 233
$hs=new Net.HttpListener|let{
  $_.Prefixes.Add("http://+:9999/");$_.Start()
}
while($true){ $h=$hs.GetContext() #& #|waiting {if('q' -eq (kbd)) {exit}}
  echo $h
  if(($h.Request.Url.LocalPath|let{w $_}) -ne '/'){continue}
  $r = '{"big": "test"}'
  $ur = [Text.Encoding]::UTF8.GetBytes($r)
  $h.Response|let{
    $_.StatusCode = 200; $_.ContentType = 'application/json'
    $_.OutputStream.Write($ur, 0, $ur.Length)
    $_.Close() # end the response
  }
}
}
  [Console]::ReadLine()
  #echo (Receive-Job $r)

[System.Threading.Thread]::Sleep(1000)
$j=Start-ThreadJob { $i=0; while($i -lt 10) { [System.Threading.Thread]::Sleep(1000); $i+=1; $i } }

$j=Start-ThreadJob {
  new Net.HttpListener|lets{
  $_.Prefixes.Add("http://+:9999/");$_.Start()
  while($true) { $_.GetContext() } }
}
while($true) {
  Wait-Job $j -Timeout 50
  echo 223
  #Receive-Job $j |% {echo $_}
}
