<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>数据指数_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="数据指数,部门开放指数,主题开放指数" />
<website:meta name="Description"
	content="数据指数按照部门开放指数、主题开放指数两种纬度展示政府部门数据在浪潮数据开放平台的开放情况与完善度。" />
<website:style href="css/analyse/style.css" />
<script type="text/javascript">
	var queryOrgUrl = "${fn:getLink('/analyse/index.do') }?method=getOrganization";
	var queryResGroupUrl = "${fn:getLink('/analyse/index.do') }?method=getResGroup";
	var queryOrgAnalyseUrl = "${fn:getLink('/analyse/index.do') }?method=getOrgAnalyse";
	var queryGroupAnalyseUrl = "${fn:getLink('/analyse/index.do') }?method=getGroupAnalyse";
	var getJsonUrl = "${fn:getLink('/analyse/index.do') }?method=getJson";
	var contentPath = '${fn:getLink('')}';
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
			<div>标签</div>
			<b></b>
		</div>
		<!-- <div class="icon">
			<a href="#" class="bds_tsina" data-cmd="tsina" style="cursor: pointer;" title="分享到新浪微博"></a>
			<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
		</div> -->
		<div class="bdsharebuttonbox fenxiang" style="margin-top: 10px;">
			<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a> <a
				href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
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
			<div class="sjzs_main">
				<h1>
					<span>· </span>部门开放指数
				</h1>
				<h2>
					数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源，本指数显示的是本平台已梳理并开放的各政府部门数据情况，包含数据开放指数和数据使用指数。</i>
				</h2>
				<div class="main1" id="main1"></div>
				<div class="main2" id="main2"></div>
			</div>
		</div>

	</div>
	<div class="back a2">
		<div class="sjzs_con2">
			<div class="sjzs_main2">
				<h1>
					<span>· </span>主题开放指数
				</h1>
				<h2>数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源。数据开放平台的政府数据资源指数依据部门特点制定，可以显示数据开放平台中当前部门数据的完善程度。</h2>
				<div class="main3" id="main3"></div>
				<div class="main4" id="main4"></div>
			</div>
		</div>
	</div>
	<div class="back a3">
		<div class="sjzs_con3">
			<div class="sjzs_main3">
				<div class="base-title">
					<h1>
						<span>· </span>标签开放指数
					</h1>
					<h2>数据开放平台融合政府数据、社会数据，向社会开放提供海量数据资源。数据开放平台的政府数据资源指数依据部门特点制定，可以显示数据开放平台中当前部门数据的完善程度。</h2>
				</div>
				<div class="main5" id="main5">
					<div class="bq_title">关联数据集排行榜</div>
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

<script>
	
	function $en(tit){return encodeURIComponent(tit);}
	var h=$(window).height();
	var w=$(window).width();
	$(".back").css("height",h+"px");
	$(".nag").css("top",$(window).scrollTop() + 250 +"px");

	$(".yutop").css("top",(h+150)+"px");
	$("#hjimg").css("top",(h+430)+"px");
	
	var yueAnimate={
		lbyFun:function(){
			$("#n11img").css({"width": "65px","height": "5px","top": "300px","margin-left": "-32px","opacity":"0"});
			$("#n12img").css({"opacity":"0"});
			$("#n1p").css({"opacity":"0"});
			
			var y=460;

			$("#n12img").animate({
				"opacity": 1
			},800,'easeInCubic');
			$("#n1p").animate({
				"opacity": 1
			},800,'easeInCubic',function(){
				$("#n11img").animate({
					"opacity": 0.8,
					"width":"328px",
					"height":"27px",
					"top": "275px",
					"margin-left":"-164px"
				},400,'easeInCubic',function(){
					$("#n11img").animate({
						"opacity": 1,
						"width":"273px",
						"height":"22px",
						"top": "285px",
						"margin-left":"-137px"
					},200,"easeInCubic")
				});
			});
		},
		btntop :function(){

			$("#btntop").css({"margin-top": "0px"});
			$("#btntop").animate({
				"margin-top": "30px"
			},1000,'easeOutBounce');
			
		},
		yue :function(id,left,right,time){
			$(id).animate({
				"margin-left": right
			},time,function(){
				$(id).animate({
					"margin-left": left
				},time);
			});
		},
		hjFun:function(){
			$("#hjimg").css("top",($(window).height()+430)+"px");
			$("#hjimg").css("margin-left","-824px");
			$("#n2yue1").css("margin-left","-560px");
			$("#n2yue2").css("margin-left","55px");
			$("#hjimg").animate({
				"top": "230px",
				"margin-left":"-340px"
			},1000,'easeInOutQuint');
		},
		yuFun:function(){
			var x=$(window).width()/2-500+210;
			x=x<210?210:x;
			var y=460;
			$(".yutop").css("top",(h+150)+"px");
			$(".yu1").css({"left": "50px","top": "260px"});
			$(".yu2").css({"left": "250px"});
			$(".yu3").css({"left": "450px"});
			$(".yu1").animate({
				"left": x-170+"px",
				"top":"384px"
			},1000,'easeInCubic');
			$(".yu2").animate({
				"left": x-160+"px",
				"top":"479px"
			},1000,'easeInCubic');
			$(".yu3").animate({
				"left": x-55+"px",
				"top":"509px"
			},1000,'easeInCubic');
		},
		n5imgFun:function(){
			$("#n5img").css({"width": "20px","height": "16px","top": "470px","margin-left": "75px","opacity":"0"});
			var y=460;
			$("#n5img").animate({
				"opacity": 0.5,
				"width":"350px",
				"height":"276px",
				"top": "250px",
				"margin-left":"-70px"
			},800,'easeInBack',function(){
				$("#n5img").animate({
					"opacity": 1,
					"width":"320px",
					"height":"252px",
					"top": "260px",
					"margin-left":"-60px"
				},300,"easeInBack")
			});
		}
	}
	
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
	}
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
			 //console.log("鼠标滑轮向下滚动：" + delta + "次！"); // 1  
			return false;  
		} else {
			$f=true;
			PicWheelScroll(0);
			//console.log("鼠标滑轮向上滚动：" + delta + "次！"); // -1  
			return false;  
		}
	}
	$(".ac").each(function(i){
		$(this).click(function(){
			$(".ac").removeClass("active");
			$(".ac").eq(i).addClass("active");
			var num=i+1;
			if(num=="3") $("#btntop").hide();
			else $("#btntop").show();
			gotoAnchor($(".a"+num));
			getAnchroFun(num);
		})
	})
	var PicWheelScroll = function(n){
		
		var num=$("#pic1").attr("num");
		
		if((num===3&&n===1) || (num===1&&n===0)) return;
		if(n==1){
			if(num<3) num++;
		}else{
			if(num>1) num--;
		}

		$(".ac").removeClass("active");
		$(".ac").eq(num-1).addClass("active");

		if(num=="3") $("#btntop").hide();
		else $("#btntop").show();
		gotoAnchor($(".a"+num));
		getAnchroFun(num);
	}

	yueAnimate.yue("#n1yue3","-510px","-150px",10000);
	yueAnimate.yue("#n2yue1","-560px","-375px",10000);
	yueAnimate.yue("#n2yue2","55px","260px",10000);
	yueAnimate.yue("#n4yue1","-240px","-160px",10000);
	yueAnimate.yue("#n4yue2","120px","230px",10000);
	setInterval(function(){
		yueAnimate.yue("#n1yue3","-510px","-300px",10000);

		yueAnimate.yue("#n2yue1","-560px","-375px",10000);
		yueAnimate.yue("#n2yue2","55px","260px",10000);

		yueAnimate.yue("#n4yue1","-240px","-160px",10000);
		yueAnimate.yue("#n4yue2","120px","230px",10000);
	},22000);

	setInterval(yueAnimate.btntop,2000);
	var getAnchroFun=function(num){
		var h=$(window).height();
		var h=(h-500<30?30:h-580)+"px";
		$(".divtop").css("bottom","30px");
		var n=$("#pic1").attr("num");
		switch(parseInt(num)){
			case 1:
				if(n==1&&$f) return false;
				yueAnimate.lbyFun();
				break;
			case 2:
				yueAnimate.yuFun();
				break;
			case 3:
				yueAnimate.n5imgFun();
				break;
		}
		$("#pic1").attr("num",num);
	}
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
		$body.animate({"scrollTop": pos.top},{queue :false,complete: function(){shubiao=true;}});
	}
	gotoAnchor($(".a1"));
	yueAnimate.lbyFun();
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
		if(n=="2") $("#btntop").hide();
		n=parseInt(n)+1;
		if(n==4) {return;}
		$(".ac").removeClass("active");
		$(".ac").eq(n-1).addClass("active");
		gotoAnchor($(".a"+n));
		getAnchroFun(n);
		$("#pic1").attr("num",n);
	})

</script>

</body>
<website:script src="js/echarts/echarts.js" />
<website:script src="js/analyse/d3.min.js" />
<website:script src="js/analyse/data1.js" />
<website:script src="js/analyse/data2.js" />
<website:script src="js/analyse/data3.js" />


<script>

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
      .attr("xlink:href", function(d) { return ('../catalog/index.htm?tag='+d.className); })
      .attr("class", "href")
  var href = svg.selectAll(".href")
  href.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-family", "微软雅黑")
      .style("font-size", function(d) { return d.r / 1.8; })
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