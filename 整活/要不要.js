问题=`洗一星期碗
晾衣服
做晚饭`.split("\n")

对应=(a,op)=>a.map(x=>[x,op(x)]) //K=x, V=op(x)
console.table(
  对应(问题, k=>{let r=confirm("要不要?"); alert((r?"要":"不要")+k); return r}) )

爱好表=new Map([//此为条目entries 数组
  ["喜之郎","爱吃的"],
  "旺仔--我就是要".split("--")
])
console.table(Object.fromEntries(
  [...爱好表.entries(),/*concat数组拼合*/ ["新加键",爱好表.get("旺仔")/*表取值*/] ]))
