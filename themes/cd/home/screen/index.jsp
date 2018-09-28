<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:style href="libs/assets/mon.carousel/carousel.css" rel="stylesheet" />
<website:style href="css/index.css" rel="stylesheet" />
<website:script src="libs/assets/mon.carousel/carousel.js" />
<website:script src="js/index.js" />
<div class="m-carousel">
    <div class="carousel" id="caro">
        <div class="m-slogan">
            <div>成都市公共数据开放平台</div>
            <p>已开放：<em>${catalogCount+30}</em>个数据集，<em>${orgCount}</em>个部门，<em>${cataDataCount}</em>条数据，<em>${apiCount}</em>个API，<em>${appCount}</em>个应用</p>
        </div>
        <div class="caro-main">
            <ul>
                <li class="caro-banner1"></li>
                <li class="caro-banner2"></li>
            </ul>
        </div>
        <div class="caro-tab">
            <ul>
                <li class="active"></li>
                <li></li>
            </ul>
        </div>
        <div class="caro-arrow">
            <div class="caro-arrow-left"></div>
            <div class="caro-arrow-right"></div>
        </div>
    </div>
</div>
<a class="try-modal" id="img1" target="_blank" href="http://www.dcjingsai.com/static_page/openDataIndex.html">
    <div class="try-reco"></div>
</a>
<div class="fixed-modal fixed-m-right" style="display:none">
    <div class="fixed-v-txt">成都市公共数据开放平台（试运行）</div>
    <a class="fixed-reco" target="_blank" href="${fn:getLink('interact/index.htm')}">我有意见</a>
</div>

<website:widget path="index/group.jsp" />
<div class="b-container">
    <div class="g-main">
        <website:widget path="index/hotCatalogList.jsp" />
        <website:widget path="index/hotAppList.jsp" />
    </div>
</div>

<script>
    //定时器
    // $(document).ready(function() {
    // var oneInner = $(".try-modal");
    // var a1a = setInterval(moves,100);
    //             //函数
    //     var x = 10;
    //     var y = 10;

    //     function moves(){
    //         var tops = oneInner.offset().top;
    //         var lefts = oneInner.offset().left;

    //         if (lefts>=document.documentElement.clientWidth-oneInner.offset().left||lefts<=0){
    //             x=-x
    //             }
    //         if (tops>=document.documentElement.clientHeight-oneInner.offset().top||tops<=0){
    //             y=-y
    //             }
    //             tops+=y;
    //             lefts+=x;
    //             oneInner.css('top' + ':' + tops+"px")
    //             oneInner.css('left' + ':' + lefts+"px")
    //         }
    //             //悬停停止
    //             oneInner.onmouseover=function(){
    //                 clearInterval(a1a);
    //             }
    //             //放手继续运动
    //             oneInner.onmouseout=function(){
    //                 a1a =setInterval(moves,100);
    //             }
    //         })

    var x = 50,y = 60
       var xin = true, yin = true
       var step = 1
       var delay = 50
       var obj=document.getElementById("img1")
       function floatAD(){
          var L=T=0
          var R= document.body.clientWidth-obj.offsetWidth
          var B = document.documentElement.clientHeight-obj.offsetHeight
          obj.style.left = x + document.body.scrollLeft + 'px'
          obj.style.top = y + document.documentElement.scrollLeft + 'px'
          x = x + step*(xin?1:-1) 
          if (x < L) { xin = true; x = L}
          if (x > R){ xin = false; x = R}
          y = y + step*(yin?1:-1)
          if (y < T) { yin = true; y = T }
          if (y > B) { yin = false; y = B }
       }
       var itl= setInterval("floatAD()", delay)
      obj.onmouseover=function floatStop(){
        clearInterval(itl);
      }
      obj.onmouseout=function(){itl=setInterval("floatAD()",delay)}
</script>
