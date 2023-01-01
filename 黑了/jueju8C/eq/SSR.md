# SSR和爬虫

EQ是浏览器及H5环境的框架。一般其组件只在 Chrome 里生成和更新DOM。但，任何时候浏览器都持有页面的完整 HTML 文本，如果用户按 <kbd>Ctrl+S</kbd> 整体保存再次打开，实际就做了一次 __服务端渲染 (SSR)__ ，这给了纯js应用PHP式的服务方法，且允许搜索引擎爬取被PJAX导航的页面集(SEO)。

不像Vue有生命钩子和挂载点，对EQ而言SSR应用并无差异。`require('eqjs').render('js代码',req,cfg)` 基于 Selenium或PhantomJS 获取加载完的HTML

- 优：可百度站内数据、微信加载快、大幅减少HTTP请求和数据库时间碎片
- 缺：非静态、少数UI在无界面下渲染异常；CDN支持压缩网页为单文件、Google/Bing支持无fetch()js的执行

EQ允许服务器对(用户)主页/搜索结果预渲染，内联较小的图片和js，以优化低性能App内置浏览器，因为Session同时由服务机共享，相当于无键鼠的用户在服务器直接访问网页。

EQ 没有为此提供特殊技巧，毕竟 `eqjs jsOnly.html` 输出到 `web/index.html` 时就使用了此类技术。 `el. ary when bind` 三个主要绑定方法不会立刻清空已有的输出节点，给了(比如,站内搜索)缓存之机

要使用SSR，必须以 `el.get` 锚定会缓存的元素 __以及body以下其所有父元素__ ，因此大元素的嵌套1~3层为佳

```js
main=()=>div(qs`div`[0]||"div", //既存或新建
  h2("我不缓存"),
  ...el.get(()=>[
  nav(el[`img.avatar`](wA({src:})) ),
  el[`div#搜索结果`](
    ary(app.search, el.Blog)
  ))
)

//回到标题 require('eqjs').render
cfg={js:2/*K则内联*/, css:1.5, img:4, forbid:'#mustURLLoad',hook:'apiURL',fetch:localhost}
req={cookies,headers,url}
```

>如果你的服务端基于JS的 Express/Koa ，`cfg.fetch=app` 就可以避免 `http.createServer` 的OS内核转发开销

>`el.get((v1,v2..)=> {el['.app'](wA({id:v1})); v1.v})` 是EQ的爬虫框架，它会优先按CSS/正则选中既有节点并将值绑回js。若以HTML缓存了1个table，它的搜索和排序将仍然有效；对于爬取，EQ没有添加其它API。

报错阅：
- `cfg.cache=5/*s*/` 缓存参数相同的页面
- `main()` 会被多次调用以生成URL相同，参数不同的页面，(token登录)你可能需填 `cfg.store={globalVar:}`
- `<p><div>hi</div></p>` 是错误HTML
- `rn().rand()` 并不支持种子随机。随机值由服务端下发1次

不过，如果网站无需保留任何用户数据，比如个人/文档站点或博客，

静态站点生成(SSG, 如Jekyll,Hexo,VitePress) 比SSR好用的多。
但其数据在构建期间大部分已知，且不重新（构建）部署无法更改页面。
