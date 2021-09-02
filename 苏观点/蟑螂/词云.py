import jieba,wordcloud
from matplotlib import pyplot as p
from sys import stdin
from os import environ

滤掉=set("我 的 把 如何".split())
wc=wordcloud.WordCloud(width=1920, height=1080,background_color='#060606',font_path=environ.get("FONT"), collocations=False,max_font_size=350)#去重, 亦可提供 mask=np.array 边缘
p.get_current_fig_manager().full_screen_toggle()
while True:
  suppCN=" ".join(filter(lambda x:x not in 滤掉, jieba.cut(stdin.read(), cut_all=True))) #iter
  im=wc.generate(suppCN);p.imshow(im)
  p.axis("off");p.tight_layout();p.show()#毕竟不能缩放等大
  im.to_file("a.png")
#export FONT=/usr/share/fonts/wenquanyi/wqy-microhei/wqy-microhei.ttc; CtrlD 作图 ,C 退出
