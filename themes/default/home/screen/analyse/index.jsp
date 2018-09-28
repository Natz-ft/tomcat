<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${regionStatistics.region_name }公共数据开放平台_统计服务</website:title>
<website:meta name="Keywords" content="数据指数,部门开放指数,主题开放指数" />
<website:meta name="Description"
	content="数据指数按照部门开放指数、主题开放指数两种纬度展示政府部门数据在浪潮数据开放平台的开放情况与完善度。" />
<website:style href="css/analyse/style.css" />
<script type="text/javascript">
	
</script>
<div id="pic1" num="1">
	<div class="nag">
		<div class="ac active">
			<div>部门</div>
			<b></b>
		</div>
		<div class="ac">
			<div>主题</div>
			<b></b>
		</div>
		<div class="ac">
			<div>关键词</div>
			<b></b>
		</div>
		<div class="returnTop" id="returnTop"
			style="display: none; width: 80px; height: 14px; margin: 50px 0px 13px -90px; padding-bottom: 10px; cursor: pointer; float: left; position: relative; font-size: 14px; color: #fff;">返回顶部</div>
		<!-- <div class="icon">
			<a href="#" class="bds_tsina" data-cmd="tsina" style="cursor: pointer;" title="分享到新浪微博"></a>
			<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
		</div> -->
		<div class="bdsharebuttonbox fenxiang" style="margin-top: 10px;">
			<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
			<!-- <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a> -->
		</div>
	</div>
	<div class="divtop">
		<img id="btntop" class="btntop"
			src="${fn:getUrl('img/analyse/top.png')}" />
	</div>
	<div class="back a1">
		<website:widget path="header.jsp" />

		<div class="ytyj_line"></div>

		<div class="sjzs_con">
			<!-- <div class="sjzs_main0">
			       <div class="base-title0">
	                    <span>部门开放指数</span>
	                    <i>数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源，本指数显示的是本平台已梳理并开放的各政府部门数据情况，包含数据开放指数和数据使用指数。</i>	                
	               </div>
			    </div> -->
			<div class="sjzs_main">
				<div class="base-title">
					<span>部门开放数据统计</span> <i><%--数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源，本指数显示的是本平台已梳理并开放的各政府部门数据情况，包含数据开放指数和数据使用指数。--%>
				统计部门开放数据的总数和部门数据集被下载的次数的情况。

				</i>
				</div>
				<div class="main1" id="main1"></div>
				<div class="main2" id="main2"></div>
			</div>
			<div class="sjzs_main1"></div>
		</div>

	</div>
	<div class="back a2">
		<div class="sjzs_con2">
			<!-- <div class="sjzs_main20">
			    <div class="base-title20">
	                    <span>主题开放指数</span>
	                    <i>数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源，本指数显示的是本平台已梳理并开放的各政府部门数据情况，包含数据开放指数和数据使用指数。</i>	                
	             </div>
			</div> -->
			<div class="sjzs_main2">
				<div class="base-title">
					<span>主题开放数据集对比分析</span> <i>
					<%--数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源。数据开放平台的政府数据资源指数依据部门特点制定，可以显示数据开放平台中当前部门数据的完善程度。--%>
				显示各个主题开放数据集占比情况，对每个主题开放情况进行分析。
				</i>
				</div>
				<div class="main3" id="main3"></div>
				<div class="main4" id="main4"></div>
			</div>
			<div class="sjzs_main21"></div>
		</div>
	</div>
	<div class="back a3">
		<div class="sjzs_con3">
			<div class="sjzs_main3">
				<div class="base-title">
					<span>关键词分析</span>
					<!-- <i>标签开放指数标签开放指数标签开放指数标签开放指数标签开放指数标签开放指数标签开放指数标签开放指数标签开放指数。</i>  -->
				</div>
				<div class="main5" id="main5">
					<div class="bq_title"><%--关联数据集排行榜--%>关键词关联数据排行榜</div>
					<div class="bq_scrollbar"></div>
					<div class="bq_content" id="scroll-1">
						<ul id="listul">

						</ul>
					</div>
				</div>
				<div class="main6" id="main6">
					<div class="draw" id="draw"></div>
				</div>
			</div>
		</div>
		<website:widget path="footer.jsp" />
	</div>
</div>
<website:script src="js/analyse/jquery.easing.js" />
<script type="text/javascript">
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=86835285.js?cdnversion='+~(-new Date()/36e5)];
</script>

</body>
<website:script src="libs/assets/echarts/echarts.js" />
<website:script src="js/analyse/d3.min.js" />
<website:script src="js/analyse/data1.js" />
<website:script src="js/analyse/data2.js" />
<website:script src="js/analyse/data3.js" />


<script>
var queryOrgUrl = "${fn:getLink('/analyse/index.do') }?method=getOrganization";
var queryResGroupUrl = "${fn:getLink('/analyse/index.do') }?method=getResGroup";
var queryOrgAnalyseUrl = "${fn:getLink('/analyse/index.do') }?method=getOrgAnalyse";
var queryGroupAnalyseUrl = "${fn:getLink('/analyse/index.do') }?method=getGroupAnalyse";
var getJsonUrl = "${fn:getLink('/analyse/index.do') }?method=getJson";
var contentPath = '${fn:getLink('')}';
var catalogUrl = "${fn:getLink('/catalog/index.htm') }?tag=";


//判断浏览器版本
var browserVersion = navigator.userAgent;
if(browserVersion.indexOf("MSIE 8.0")>0)  
{   
	console.log("ie8, not d3");
	var browserUrl = "${fn:getLink('/browser/download.htm')}";
	var iframe = "<iframe src="+browserUrl+" style='width:100%;height:100%;'></iframe>";
	//$("#draw").html(iframe);

}

function $en(tit){return encodeURIComponent(tit);}
var h=$(window).height();
var w=$(window).width();

$(".back").css("height",h+"px");
$(".nag").css("top",$(window).scrollTop() + 250 +"px");

$(".yutop").css("top",(h+150)+"px");
var yueAnimate={
    btntop :function(){

        $("#btntop").css({"margin-top": "0px"});
        $("#btntop").animate({
            "margin-top": "30px"
        },1000,'easeOutBounce');

    }
};


//鼠标滚动事件
var shubiao=true;
var wheel = function(event) {
    var delta = 0;
    if (!event)
        event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }
    if (delta) handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
};
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
document.onmousewheel = wheel;
var $f=true;
var handle = function(delta) {
    if(!shubiao) return;
    shubiao=false;
    var random_num = Math.floor((Math.random() * 100) + 50);
    if (delta < 0) {
        PicWheelScroll(1);
        $f=false;
        return false;
    } else {
        $f=true;
        PicWheelScroll(0);
        return false;
    }
};
$(".ac").each(function(i){
    $(this).click(function(){
        $(".ac").removeClass("active");
        $(".ac").eq(i).addClass("active");
        var num=i+1;
        if(num=="3"){
            /*$("#btntop").hide();*/
            $("#btntop").attr('src','${fn:getLink("img/analyse/bottombtn.png")}');
        }
        else $("#btntop").show();
        gotoAnchor($(".a"+num));
        getAnchroFun(num);
        if(num==1){
            $("#returnTop").hide();
        }else{
        	$("#returnTop").show();
        }
    })
});
var PicWheelScroll = function(n){
    var num=$("#pic1").attr("num");
	if(num==1&&n==1){
        $("#returnTop").show();
    }
	if(num==2&&n==0){
		$("#returnTop").hide();
	}
    if((num===3&&n===1) || (num===1&&n===0)) return;
    if(n==1){
        if(num<3){
            $("#btntop").attr('src','${fn:getLink("img/analyse/top.png")}');
            num++;
        }
    }else{
        if(num>1){
            $("#btntop").attr('src','${fn:getLink("img/analyse/top.png")}');
            num--;
        }
    }
    
    $(".ac").removeClass("active");
    $(".ac").eq(num-1).addClass("active");

    if(num=="3"){
        $("#btntop").attr('src','${fn:getLink("img/analyse/bottombtn.png")}');
        /*$("#btntop").hide();*/
    }
    else $("#btntop").show();
    gotoAnchor($(".a"+num));
    getAnchroFun(num);
};
var getAnchroFun=function(num){
    var h=$(window).height();
    var h=(h-500<30?30:h-580)+"px";
    $(".divtop").css("bottom","30px");
    var n=$("#pic1").attr("num");
    $("#pic1").attr("num",num);
};
var gotoAnchor = function(selector,isauto){
    var anchor = $(selector);
    if (anchor.length < 0) return;
    var $win=$(window);
    var $body = $(window.document.documentElement);
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("webkit") > -1) {
        $body = $(window.document.body)
    }
    var pos=anchor.offset();
    if (isauto) {
        var t = pos.top - $win.scrollTop(); //相对于屏幕显示区
        var t2 = $win.height() - t;
        if (t2 < anchor.outerHeight()) {
            $body.animate({"scrollTop": pos.top}, "normal");
        }
        return;
    }
  //$body.animate({"scrollTop": pos.top},{queue :false,complete: function(){shubiao=true;}});
    $("html,body").animate({"scrollTop": pos.top},{queue :false,complete: function(){shubiao=true;}});

}
gotoAnchor($(".a1"));

setInterval(yueAnimate.btntop,2000);

$(window).resize(function(){
    var h=$(window).height();
    $(".back").css("height",h+"px");
    var n=$("#pic1").attr("num");
    var h1=(h-500<30?30:h-580)+"px";
    //if(n==1) $(".divtop").css("bottom",h1);
    //else
    $(".divtop").css("bottom","30px");
    gotoAnchor($(".a"+n));
});
$(".divtop").click(function(){
    var n=$("#pic1").attr("num");
    if(n=="2"){
        /*$("#btntop").hide();*/
        $("#btntop").attr('src','${fn:getLink("img/analyse/bottombtn.png")}');
    }
    if(n ==3)
    {
        gotoAnchor($(".a"+1));
        getAnchroFun(1);
        $("#pic1").attr("num",1);
        $("#btntop").attr('src','${fn:getLink("img/analyse/top.png")}');
        $(".ac").removeClass("active");
        $(".ac").eq(0).addClass("active");
    }

    n=parseInt(n)+1;
    if(n==4) {return;}
    $(".ac").removeClass("active");
    $(".ac").eq(n-1).addClass("active");
    gotoAnchor($(".a"+n));
    getAnchroFun(n);
    $("#pic1").attr("num",n);
})


$(".returnTop").click(function(){
    gotoAnchor($(".a"+1));
    getAnchroFun(1);
    $("#pic1").attr("num",1);
    $("#btntop").attr('src','${fn:getLink("img/analyse/top.png")}');
    $(".ac").removeClass("active");
    $(".ac").eq(0).addClass("active");
})
var diameterwidth = ($("#draw").width())*1,
	diameterheight = ($("#draw").height())*1.1,
    format = d3.format(",d"),
    color = d3.scale.category10();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameterwidth, diameterheight])
    .padding(20);

var svg = d3.select("#draw").append("svg")
    .attr("width", diameterwidth)
    .attr("height", diameterheight)
    .attr("class", "bubble");


d3.json(getJsonUrl, function(error, str) {
	
	var root = eval('(' + str + ')');
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return (d.r)*1; })
	  .attr("stroke", "#eee")
	  .attr("stroke-width","2")
	  .attr("class", "circle");
  node.append('a')
     /*  .attr("xlink:href", function(d) { return ('../catalog/index.htm?tag='+d.className); }) */
      .attr("class", "href")
  var href = svg.selectAll(".href")
  href.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-family", "微软雅黑")
      //.style("font-size", function(d) { return d.r / 1.8; })
      .text(function(d) { if(d.className!=undefined){return d.className.substring(0, d.r / 5);} })
	  .attr("class", "txt");
var ocount=0;
$(".circle").each(function(){
	ocount++;
	if(ocount <=10){
		$(this).next().children(".txt").attr("fill","#fff");
		if(ocount==1){
			$(this).attr("fill","#ff6347");
		}
		else if(ocount==2){
			$(this).attr("fill","#ff69b4");
		}
		else if((ocount==3)||(ocount==7)){
			$(this).attr("fill","#7972b0");
		}
		else if((ocount==4)||(ocount==8)){
			$(this).attr("fill","#3cb371");
		}
		else if((ocount==5)||(ocount==9)){
			$(this).attr("fill","#6699ff");
		}
		else if((ocount==6)||(ocount==10)){
			$(this).attr("fill","#ffa500");
		}
	}
	else if(ocount >10&&ocount<=30){
		$(this).next().children(".txt").attr("fill","#fff");
		$(this).attr("fill","#1e90ff");
	}
	else if(ocount >30&&ocount<=60){
		$(this).attr("fill","#6699ff");
	}
	else{
		$(this).attr("fill","#46a0ee");
	}
	//$(this).hide();
})

});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameterheight + "px");


function circlecolor(){
}
</script>
