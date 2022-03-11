# SQsu查询语言

__SQsugar(SQ糖)__ 是我设计的一门翻译到SQL的查询语言，作为一次小实验。我给它写了个简单的查询界面，你可以在浏览器里离线地学习/简写通用 SQL 来操作数据库。

请不要试着打字或默写本文的SQL语句，然后去粘贴到什么 _且忽略掉查询结果_ ，它不值得你这么做。

>学会SQ糖等于学会 SQL 吗？

介于许多人并不会真正的SQL，且[SQ糖](#执行顺序)涵盖SQL的所有常被手打的代码，学SQ糖确实相当于学SQL。

```
```

>本文所有的代码块，点击后显示出其对应的SQL语句，自动复制。点选可执行。执行右侧 `*3+0` 代表结果3行 删改0行

```
有表 狗(id 数 主键 自增,
名 文, 重 浮(3), 高 数1,
品种 文(5), 月龄 数1, 毛色 文(1)/*定("白","黄" ,"黑")*/
)
有删!表狗 //如果首句报错才
新建狗
(1 "Mike" 3 28 "吉娃娃" 10 "白")
(2 "Sala" 6.5 40 "柴犬" 15 "黄")
(3 "黑狮" 21.5 45 "藏獒" 26 "黑")
(4 "大圣" 15 42 "牧羊犬" 20 "黄")
(5 "Boy" 5.5 24 "蝴蝶犬" 6 "白");
```

有了表结构和既存数据，就可以查询了

```
取狗
取狗(月龄>6 and 高>40)
取狗(0<高&高<40)
取(名)狗
取狗 页每2 0
取狗 序小 月龄
取(名,月龄)狗 序大 月龄
取(极大月龄,名)狗
有用表;取;
取(月龄/12 as 年龄,名)
```

```
有表X(x 狗 当 删 跟着) //外键
有改表狗(id 数4? 正 自增)
有改表狗(名__昵称呀 文(11)?)
有改表狗+"foreign key" (xx 狗)

//当然也可以英文：但enum得全复制贴到MySQL执行！
有表Dog(id 数4 主键 自增,
Name 文, Weight 浮(3), Height 数1,
Type 文(5), Age 数1, Color enum("白","黄" ,"黑")
)
```

我们的测试环境(SQLite) 功能还算齐全，比如主键自增。但这“自增ID序号”和表结构是完全无关的。

>小秘密：你可以按 Ctrl+Shift+C 选中一个网页 tbody或"table" ，然后执行以下代码 __“偷”些表格数据用于SQL练习__

```js
f=s=>JSON.stringify(+s?+s:s); [...$0.children].map(r=>[...r.children].map(v=>f(v.innerText) ).join(' ')  ).slice(1).join(")\n(")
```

>如果有些语法错误(没显示SQL语句)，你也可以按此快捷键，查看 Console js终端

```
有表影(id 数, 名 文(15), 票房 文(8), 年 文(5), 导演 文(12), 制作 文, 发行 文)
新建影
(1 "哪吒之魔童降世" "50.35亿" "2019年" "饺子" "光线影业、彩条屋影业、可可豆动画、十月文化" "光线影业")
(2 "西游记之大圣归来" "9.56亿" "2015年" "田晓鹏" "高路动画、十月文化、天空之城" "聚合影联、横店影视")
(5 "大鱼海棠" "5.66亿" "2016年" "梁旋、张春" "彼岸天、彩条屋" "光线影业")
(7 "白蛇:缘起" "4.51亿" "2019年" "黄家康、赵霁" "追光动画、华纳兄弟" "卓然影业")
(9 "罗小黑战记" "3.15亿" "2019年" "MTJJ" "寒木春华" "卓然影业")
(26 "大护法" "8760万" "2017年" "不思凡" "好传文化、彩条屋" "光线影业、华夏")
(29 "昨日青空" "8381万" "2018年" "奚超" "彩条屋、路行动画、好传文化" "光线影业、华夏")
(68 "开心超人" "3509万" "2013年" "黄伟明" "明星创意" "小马奔腾")
(77 "宝莲灯" "2900万" "1999年" "常光希" "上海美影" "上海美影");
```

>搜索下这些数据出自哪个网站。

```
取(*,极大票房,求均年)影 序小年 分组发行

有表A(x 数)
新建A(1)(2)(3);
取A(x=2&x<3) //一个挺废的条件并立
取A(x=2|x=3)
取A(x!=1)

取不重(年)影(发行 LIKE "卓然%") //按“行”而非格单位不重复！
```

你可以用 LIKE "%发财" 匹配 `"张发财","李大发财"` ，而 LIKE "_某" 匹配字串 吴某 范某 等某

## 题外话

```sql
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC
LIMIT num_limit OFFSET num_offset;
```

如今你见识过大部分SQL语法但没有写1行SQL。 这语言只含「有新取」三字

__为什么SQ糖的作者不写SQL？__ 因为它被工程界误解得太严重了。

实际上许多用SQL和各种DB解决的问题，NoSQL(KV数据库,MongoDB 文档数据库) 都能解决，

SQL强大得太尴尬了、语法“自然”得太夸张了，还不如用ORM(对象1:N,存储) 单单纯粹做好 1人:N朋友 的这些关系。

别忘了过度脚本化，曾造成SQL注入等严重问题(你可以理解为在输入 >< 时一些网站必然给它换成别的 为“防注入”)的PHP 2022年了还有人用呢。JavaEE log4j [2021 年了还出严重RCE代码执行](https://new.qq.com/omn/20211210/20211210A01JXN00.html)呢，还复古流行起 CRUD boy 用"sqlmapper" Mybatis 绑定SQL语句去执行呢……

__因为用途领域上的尴尬，SQL的用户接口真的差劲极了__ 。 XP.cn (中文面板) 常用免费的 [PHPMyAdmin](https://demo.phpmyadmin.net/master-config/) 查点小东西都要重载、[Navicat](https://navicat.com.cn/navicat-16-highlights)啥的收费又复杂，[HeidiSQL](https://www.heidisql.com/screenshots.php), [DBeaver](https://zhuanlan.zhihu.com/p/265486596) 这些也都不适合入门 ，MSOffice 一堆“外行”好用但不会做普通SQL的“支持”，更何谈有大部分院校还在教学生用 CLI(cmd.exe) 客户端 `mysql -u root -p` 从记事本右键粘贴啦

然而，宝刀未老的SQL仍是大部分人的选择。作者也是出于娱乐的心态弄了一门翻译到SQL的小语言，并支持用 ?1 和 `$新用户=新(?1 ?2 ?3)用户(默认)` 这种语法创建“函数”，当然在这里，这个为语言API桥接 的特性没有用处。只是说SQL真的很鸡肋

IT工程界和教育有这么不堪吗？很抱歉，的确有。无论自诩多高等的机构、高级工程师，排名顶尖的，的确有。 天才尽管天才，也没机会创造解决实际问题的东西。

SQ糖不会追求功能上的“丰满”和理论上的“精准”，只要求用着方便、学着能看到每行代码出现的理由。 __SQ糖不告诉你知识，只愿你清楚理由__

```
取(id,名) //select
  影(年="2019年") //from-where
  序小年 //order-by asc
  页每5 0//limit 5 offset 0
```

```
取(id+1 as 号,名)
  影(年="2019年")
  序小 号
  页每5
```

## JOIN

```
类型默认(字/*：*/ 文 主键)

有表 物品(字, 主人 文)
有表 人(字, 外号 文)

新建人("小明""智多星")("小刚""及时雨");
新建物品("牙刷" "小明")("拖鞋" "小刚");
```

这个词是“连接”的意思，比如寝室里这物品可能被多个人引用，所以不能直接附在人上，那么给你物品，你能查到人的外号吗？

__主键默认是唯一的，就是用于JOIN__

SQ糖并没有为JOINs 提供语法糖，因为它太机械化了。把同属1人的东西独立成表，本身就是太现实的问题，即便简写也无法简单；但幸好还有文章可以写

```
取(物品.字,外号) 物品 "inner join 人 on 物品.主人=人.字"
取(外号) 物品(物品.字="牙刷") "inner join 人 on 主人=人.字"
```

可以翻译为：`取(外号)物品(名=牙刷) 联动/*我,右,全*/与 人：名=主人` 但SQ糖没有。

你就取了 `主人=人名` 的(项的交集) INNER JOIN (即"JOIN")

LEFT/RIGHT JOIN 则会使 物品/人  的一些列为空，FULL JOIN 就更会了，毕竟这些是 "OUTER JOIN"

>^ 一个常见的误会是，“表格由行和列组成”。实际它是由含横格的多行组成的，列的本意是“所有行等位项”，有时却指代行内1格(2D数组或i< n,i*m+j 总nm格拟2D 同理)

什么意思呢？ `取物品(名="牙刷")` 的()条件删掉。如果有个主人 "小茗" 找不到，那么FULL 会保留这1行，空格填NULL。LEFT 也会

>SQ糖里 `新("电子字典" 无)物品(名="字典")` 代表 `新 名="电子"/*无改主人*/ 物品()` 或 `无=default`，而空代表NULL

NULL不会参与许多计算，比如平均值，要滤掉NULL 取物品(名!=NULL)

另，有种叉联动把A的每项与B的所有项 生成 nA*nB 个结果，叫 `cross join` 笛卡尔积

## 计算

__SQL 的功能实际上是数据统计__ 而非1:N存储和 FilerSort 。它甚至在某些数据上比 Excel 好用，比如单位换算和表头(列名) SQL都能处理

```
取(1+1 as 二);
取巨长表名"as 此 inner join 人 on 此.主人=人.名"
```

`分组键` 能在组内做统计(如排序)

```
取(计*| as 组项N) 影 分组年//有几组得几项(=行)。像 取(计,极小,极大) 这些是只得1项
```

组内排序需要 [group_concat](https://sqlite.org/lang_aggfunc.html#group_concat) ，这个SQLite里也有，不是MySQL/Postgres的扩展

```
取(拼组 名)影
取(拼组名)影 序大票房 分组年
取(拼组名+"|" |表格)影 序大票房 分组年
```

### 执行顺序

>参阅 [xuesql](http://xuesql.cn/lesson/select_queries_order_of_execution)。它的上几节也不错

1. from 和 join 确定涉及表范围
2. where 过滤
3. group by 分组
4. having=where 过滤每组(概率小 没给糖!)
5. select 进行x+1,name+"__"等计算，或min,max等
6. distinct不重
7. order by 排序
8. limit/offset 截取部分数据。 这个过程可以用Cursor(已选行) 实现，在Server等单次请求的地方 它比cursor更利于缓存

__灵活运用以上的句法组合能在SQL层面更好的解决数据问题__ ，而不必把问题都抛给程序逻辑。

+ 列性质：主键(且唯一) 自增 正(unsiged)
+ 类型：数1,2,4 integer；(改/长)文 char；浮顶精(10,1) =0.0~9.9 和8字节(双精)浮点“浮”；真假 bit 定 enum  时间 日期
+ 特殊值： 无 default 空 NULL ?0 首个$事=语句 参数(jsAPI:`词.事,问k` 页每 不支持!)
+ 函数：计 count 拼组/文 concat 求和均 极小大 正 abs 整取/低/高
+ 时间：`新建 当前[时/日/钟]=0/*即第1项*/ (0);` 和 `当前时 更新时` （基于 `ON DELETE CASCADE` 这种特性）

除了组内排名作列表等[窗口函数](https://zhuanlan.zhihu.com/p/92654574)，SQLite 甚至能[“生成” helloworld](https://sqlite.org/lang_with.html#outlandish_recursive_query_examples)，不过是关系式编程版的。

或者1~100 (递归/循环 查询) __请在命令行等 SQL 客户端执行__

```
WITH RECURSIVE cnt(x) AS (VALUES(1)
  UNION ALL SELECT x+1 FROM cnt WHERE x<100)
SELECT x FROM cnt;

WITH RECURSIVE cnt(x) AS (SELECT 1
  UNION ALL
  SELECT x+1 FROM cnt
  LIMIT 100
)
SELECT x FROM cnt;
```

因此SQ糖尽管好用，限制还是很大的。 目前没有支持Index(表头定制)、ACID属性(transaction: begin commit rollback-to?savepoint)，也没有给 groupBy-having 和 join， replace into(on conflict) 语法糖

另外：vaccum 是重建db文件，reindex 是删索引，attach 这些是CLI客户端命令。 like,glob,`name regexp "\d+"` 和 `'{"a":NULL}' ->> '$.a'`(单> 仍JSON) → NULL  json_type quote 这些是单格列表等的支持

```sql
SELECT DISTINCT user.name
  FROM user, json_each(user.phone)
 WHERE json_each.value LIKE '704-%';

SELECT DATEADD(HOUR,+1,min(JSON_VALUE(ExtraData,'$.enrollDate')))  as [enroll_date] 
 FROM school_7..StudentCourseItem 
 WHERE Student_id = 11449387 AND ItemType_id = 2 
 AND JSON_VALUE(ExtraData,'$.levelNo') in (7,8,9)
```

https://github.com/by-syk/CoolapkUserStats

```sql
SELECT
    @rownum:=@rownum+1 AS '#',
    CONCAT('[@', name, '](http://www.coolapk.com/u/', id, ')') AS 'user',
    FLOOR(fan * 0.5 + feed * 0.4 + app * 0.08 + find * 0.02) AS 'score',
    fan, feed, app, find
FROM
    user, (SELECT @rownum:=0) temp
ORDER BY
    score DESC
LIMIT 100;
```

```
简写$取="(S,g,c)=>S+', (SELECT @rownum:=0) temp'+g+c "

取(@rownum:=@rownum+1 as '#',拼文
'[@'+name+']\x28http://www.coolapk.com/u/'+id+'\x29'| as 'user',整低
fan*.5- -feed*.4- -app*.08- -find*.02| as 'score',
fan,feed,app,find
) user 序大score 页每100

//刷新页面以删除简写！(js 词.名.$取 ,.$名 翻译?)
```

https://liolok.com/zhs/database-exercise/

```sql
-- (1) 找出与李勇在同一个班级的学生信息；
SELECT * FROM Student
  WHERE Clno = (SELECT Clno FROM Student WHERE Sname = '李勇')
    AND Sname <> '李勇';

-- (2) 找出所有与李勇有相同选修课程的学生信息；
SELECT * FROM Student
  WHERE Sno IN (SELECT Sno FROM Grade
    WHERE Cno IN (SELECT Cno FROM Student S, Grade G
      WHERE S.Sno = G.Sno AND S.Sname = '李勇'))
  AND Sname <> '李勇';
```

```
有用表Student
$查a=取(Clno) (Sname="李勇");
取$a(Sname!="李勇"&Clno=);

$查a=取(Cno)" S,Grade G where S.Sno=G.sno and S.Sname='李勇'";
有用表Grade
$查b=取(Sno)$a(Cno IN );
有用表Student
取$b(Sname!="李勇"&Sno IN )
```

>所以我说 __学SQ糖基本等于学会SQL__ 。从简单、常用到复杂、混乱，SQ糖都能表达

至于什么精通，让爱死记硬背的人通去吧

## Hack

```
有表A(x 数4),B(s 文),C(t 时间), 用户(字,boy 真假 或1)
有删表A,B,C //并立是支持的,只是网页上可能无法执行

新(?1?2)用户(默认) //和新名=?0 用户 一样可以创建语言绑定($事名=语句 )

简写增列="a[j]*=2"
简写$wtf="'常量文本'" //SQ糖的常量与类型名 是会“或许”被“翻译”的

新建A 增列=0 (1)(2) $无=0 (3);
新建A 当前时=0 (0)(0);

类型默认(小文 文(4)?)
有表AA(小文 $ 主键) //$=小文。 not null 不必重复两次
```

```
取( )无 "1+2 as n";
有用表无 //当计算器用
简写$_="SQ增fn表(词.多fn)"
取(删改统计);
取(型2);
取( )"(1,2,3) = (1,2,3),(1,2,3) = (1,NULL,3)"

有表t2(x 数,y 数,z 数);
新建 t2 (1 2 3)(2 3 4)(1 空 5);
取( )无"(1,2,3) IN (SELECT * FROM t2)"

取(显"%x"+z- -7)
有用表无
取(大写"abc");
取(字数"a");
取(9%2);//余数, 从0~100 往复于0,1
取(字区"abc"+1+2);
取(替换"abc"+"a"+"c")
```

也可以在DevTools 应用>存储>WebSQL 即 (F12>Application>Storage) 查看表与执行SQL，或清除数据

```
有删库a //提示：不要在生产环境使用（废话..
```

>关于程序员的一些秃头和数学天才的笑话是说着玩，但删库跑路会被抓、暴露用户隐私很危险，都明白吧

若不看注释， `SQ糖=SQ糖糖(()=>[])` 即可

SQ糖提供了较简洁的语法，可在js源代码里查看（只有220行） ，然后还有个 [db1](db1) 非常复杂..教科书。本原文是 [md文件](db2.md)

首个空白会保留地址栏 `?` 后随的代码，你可以用这个分享查询片段
