using namespace System
using namespace System.Threading
set-alias new new-object
set-alias w write-host
function def {[Linq.Enumerable]::Chunk[object]($args, 2)|foreach{
  $a=$_[0].split('_',2); $k=$a[0]; $ka=$a[1] ?$a[1].replace('$_','[Parameter(ValueFromPipeline)]$_') :'$_'
  iex "function global:$k{param($ka)$($_[1])}"
}}

def 'let_$f,$_'{ $o=$_
  $f.Keys ?($f.GetEnumerator()|%{$o[$_.Name]=$_.Value } ) : ($did=&$f $o); $o
} 'lets_$f,$or,$and,$_'{
  if(!$f){return $or ?($_ ?$_ :$or) : $and ?($_ ?$and :$_) :($_|gm -MemberType *Property|Sort-Object{[Math]::Abs($_.MemberType.value__-4)}) }
  &$f $_
}

$hs=new Net.HttpListener|let{
  $_.Prefixes.Add("http://+:9999/");$_.Start()
}
$b=[System.Array]::CreateInstance([byte],1024)
$buf=new System.ArraySegment[byte]($b,0,$b.Length)
echo "write lines, or 'q'"
while('q' -ne $ln){ $h=$hs.GetContext(); $ln=[Console]::KeyAvailable ?[Console]::ReadLine() :''
  if($h.Request.IsWebSocketRequest) {
    $h.AcceptWebSocketAsync($null).ContinueWith([Action[object]]{
      $s=$_.Result.WebSocket
      while(1){$s.ReceiveAsync($buf, [CancellationToken]::None).Wait(); w $s}
      #sorry, your f**king "C# architectors"
    })
  }
  if(($h.Request.Url.LocalPath) -ne '/'){continue}
  $r = '<meta http-equiv=refresh content=1>'
  $ur = [Text.Encoding]::UTF8.GetBytes($r)
  $h.Response|let{
    $_.StatusCode = 200; $_.ContentType = 'text/html'
    $_.OutputStream.Write($ur, 0,$ur.Length)
    $_.Close() # end the response
  }
}

