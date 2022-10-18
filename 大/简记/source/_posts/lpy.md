
Juui 使用物理命名法隐含类型，此外还提供可客制的示例值集 便于试调用。UI(以Py对象)表示法 支持 `()区间 []单选 {k:v}值单选` 和 `[{}]多选 range()区内范围` 高自由的表单

对重计算 act_send 和 slow_solve 可禁用修改即执行，而无前缀即代表"type"。

Jupyter 控件可以累积UI来输入或显示n个数据，但不便自己布局，更无法客制类型和作为参数；范围基于另参的参数靠 `w.child[0].observe{it.owner.value}` 可以但却难于规定

```py
from ipywidgets import interact

a=[]; upd=lambda:0
for i in range(4):
  a.append(0)
  @interact
  def aI(x=0,I=i): a[I]=x; print(a) if I==3 else upd()
upd=aI.widget.update

@ui
def _P(iX,iY,bg):
  ui={x,y} #横向xy 数轴
  x=(0,im.width); y=(0,im.height)

class Point2D(_P):
  def abs():return x*x+y*y
  @property
  def xy():rerturn (x,y)
  #equiv xy=property(lambda:(x,y))
```

Juui 提供了types，可以把对同一组变量的计算拆成几段，提高复用性。类型还给这组变量对应上客制UI，也能利用同型参数注入，在 `im` 更新时替换 `x,y` 输入条。 简单来说，Juui DSL 为 Jupyter UI化了整个 Python 而不止数理化量与算式

`def argdep(): v=a or b or s; i=len(v); j=len(v[0])` 同是基于 `UINamespace({变量名:Widget,})` 读值-写替换。对 interact(kwargs)控件表与argdep所读取变量，取交集并监听：`mkrange(elem,fdep)`

比起普通 @ui def，def _Type 代表着新class的 `__init__` ，它隐式合并 `root={"im":}` 以启用区间argdep，和 `out=[]/None` 不直接print出新对象。 def _Type 还生成了 `layout(namesp); update(ui_namesp)==fdep` 方法，在构造器生成UI并绑定区间范围。

>因为算式里 `self` 无实意，types的子类都不用写 self.var 而隐含了小写 var 在参数0上取。这修改重编了CPy code对象，当然方法/arg=_P 调用也会在对象更新时重做


