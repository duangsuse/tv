---
title: ThinkPHP
date: 2022-07-30 08:35:21
tags:
---

```sh
pacuar -S composer  php7
#composer config -g repo.packagist composer https://packagist.phpcomposer.com #国内镜像

composer create-project topthink/think pan ^5.1
sed "s/('app_debug').*/\0=>true,/" -i config/app.php #不然吃报错

#composer update topthink/framework #莫得用,think-template也被view取代,3.2 不在Packagist.org
#php think run
php7 -S localhost:8000 -t /home/duangsuse/Proj/pano/php/pan/public
```

老版本的有 `\think\Container` (class按名容器 里一大堆offsetXX方法) 少 [`#[\ReturnTypeWillChange]`](https://php.watch/versions/8.1/ReturnTypeWillChange) ，用ph7的-S就行

默认模板文件夹和配置居多，但改 application public 就行。URL是route.p定义的(可引用 `index\Index extends \think\Controller` 的方法, `/index` GET控制器)

需注意view也按方法名[分](https://www.kancloud.cn/manual/thinkphp6_0/1037611).. `$APP/view/index/hello/x.html` 在 `$this->fetch("x")` 可用,0参就指hello.html

模板配置可 `tpl_replace_string => [=>]` 尾处理

源码在 thinkphp/library 可见，fetch会 `Response::create(,'view')` ，建立 resp\View 子类才用真View，总之各种弯道代码这里常见，比如 View.fetch 可见是字串或路径 一直由bool变量而非调参区分.. view\\Php.display 里 `eval('?>' . $this->content);` 让我觉得php真有点混乱.. ?> 是 <?php 的闭合?eval不新建语法层?

PHP8 用 array_index_exist 替换 isset(null)，然后 print_r var_dump($this) 调试差不多

我觉得最过分的是[可变函数varfunc](https://www.php.net/manual/zh/functions.variable-functions.php)，居然只为区分 `f(x) | $f(x)` 就把函数和变量分的$尼玛开，真是何必

>??BuildAdmin是基于TP6+vue3的后台管理系统，支持CRUD代码生成

尼玛PHPer还真喜欢搞CRUD模板啊，可惜他们太弱类型

因为学会了 ReflectFunction bind参数值，它直接把3.x的 I("xx") [连轴改](https://www.kancloud.cn/manual/thinkphp6_0/1037519)成 input("get.xx") ... 噗不就是 `fn(I(arg1.name), arg2.nam..)` 早没想好，乱改

好家伙，每次都是 breaking change ，难怪版本都刷到5了