<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
String odweb = ConfUtil.getValue("global.index.odweb");
pageContext.setAttribute("odweb", odweb);
%>


<website:title>${regionStatistics.region_name }公共数据开放平台_统计服务</website:title>
<website:meta name="Keywords" content="数据指数,部门开放指数,主题开放指数" />
<website:meta name="Description"
	content="数据指数按照部门开放指数、主题开放指数两种纬度展示政府部门数据在浪潮数据开放平台的开放情况与完善度。" />
	<website:style href="css/statistical/style.css" />

<div id="statistical-content" num="1" style="overflow:auto;">
	<div class="head-box top-box">
		<div class="top-box-1">
			<img src="${fn:getUrl('img/statistical/back.png')}" alt="">
			<a href="${odweb}/index.htm">返回首页</a>
		</div>
		<div class="top-box-2">
			<span>开放数据统计</span>	
		</div>
		<div class="top-box-3">
			<span class="date" id="time"></span>
			<img src="${fn:getUrl('img/statistical/position.png')}" alt=""><span class="area">成都</span>
		</div>
	</div>
	<div class="content-box">
		<div class="column-1">
			<div class="column-1-l">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>开放数据总览</h5>
				<div class="box box-1">
					<div class="count-box1">
						<span>数据集总量</span>
						<p id="cata_amount"></p>
					</div>
					<div  class="count-box2">
						<span>数据总量</span>
						<p id="data_amount"></p>
					</div>
				</div>
				<div class="box box2">
					<div  class="count-box1">
						<span>API总量</span>
						<p id="api_amount"></p>
					</div>
					<div  class="count-box2">
						<span>应用总量</span>
						<p id="appCount"></p>
					</div>
				</div>
				<div class="column-1-l-2">
					<div class="item-t-l"></div>
					<div class="item-t-r"></div>
					<div class="item-b-l"></div>
					<div class="item-b-r"></div>
					<h5><i class="icon"></i>访问量分省排名</h5>
					<div class="views" id="views">

					</div>
				</div>
			</div>
			<div class="column-1-m">
				<div class="head-box">
					<div class="box">
						<p class="title">平台总访问量</p>
						<p class="num">
							<span id="totalViewCnt"></span>次</p>
					</div>
					<div class="box">
						<p class="title">单日最大访问量</p>
						<p class="num">
							<span id="maxViewCnt"></span>次</p>
					</div>
					<div class="box">
						<p class="title">今日实时访问量</p>
						<p class="num">
							<span id="VisitCurCount"></span>次</p>
					</div>
				</div>
				<div class="map-box">
					<div id="map-container">

					</div>
				</div>
			</div>
			<div class="column-1-r">
				<div class="column-1-r-1">
					<div class="item-t-l"></div>
					<div class="item-t-r"></div>
					<div class="item-b-l"></div>
					<div class="item-b-r"></div>
					<h5><i class="icon"></i>注册用户分类统计</h5>
					<div class="sort" id="sort">
						
					</div>
				</div>
				<div class="column-1-r-2">
					<div class="item-t-l"></div>
					<div class="item-t-r"></div>
					<div class="item-b-l"></div>
					<div class="item-b-r"></div>
					<h5><i class="icon"></i>注册用户所属行业</h5>
					<div class="box">
						<div class="trade" id="trade">
							<div id="myCanvasContainer2">
								<canvas height="244" id="cloudCanvas"></canvas>
							</div>
							<div id="tags2">
								<ul id="regBusiness">
									<li>
										<a href="javascript:;">注册用户所属行业</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="column-2">
			<div class="column-2-l">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>部门开放数据量TOP10</h5>
				<div class="box department" id="department">

				</div>
			</div>
			<div class="column-2-m">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>市教育局更新频率</h5>
				<div class="box radar" id="radar">

				</div>
			</div>
			<div class="column-2-r">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>数据开放趋势</h5>
				<div class="box line-chart" id="line-chart"></div>
			</div>
		</div>
		<div class="column-3">
			<div class="column-3-l">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>主题分类开放数据集</h5>
				<div class="box" id="theme-chart"></div>
			</div>
			<div class="column-3-r">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>关键词分析</h5>
				<div>
					<div class="keywordAnalysis">
							<div id="myCanvasContainer">
								<canvas width="500" height="300" id="myCanvas">
									<p>Anything in here will be replaced on browsers that support the canvas element</p>
								</canvas>
							</div>
							<div id="tags">
								<ul id="keywordList">
									<li><a>Google</a></li>
									<li><a>Fish</a></li>
									<li><a>Chips</a></li>
									<li><a>Salt</a></li>
									<li><a>Vinegar</a></li>
								</ul>
							</div>
					</div>
				</div>
			</div>
		</div>
		<div class="column-4">
			<div class="column-4-l">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>数据集下载TOP10</h5>
				<div class="top" id="top"></div>
			</div>
			<div class="column-4-r">
				<div class="item-t-l"></div>
				<div class="item-t-r"></div>
				<div class="item-b-l"></div>
				<div class="item-b-r"></div>
				<h5><i class="icon"></i>API调用TOP10</h5>
				<div class="api" id="api"></div>
			</div>
		</div>
	</div>
</div>
<website:script src="js/analyse/jquery.easing.js" />


</body>
<website:script src="libs/assets/echarts/echarts.js" />
<website:script src="js/statistical/data1.js" />
<website:script src="js/statistical/data2.js" />
<website:script src="js/statistical/data3.js" />
<website:script src="js/statistical/data4.js" />
<website:script src="js/statistical/tagcanvas.min.js" />

<script type="text/javascript">
	window.onload = function () {
		showTime();
		get();
		getViews();
		getTodayViews();
	}

	function showTime() {
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		var date = myDate.getDate();
		var dateArr = ["日", "一", '二', '三', '四', '五', '六'];
		var day = myDate.getDay();
		var hours = myDate.getHours();
		var minutes = formatTime(myDate.getMinutes());
		var seconds = formatTime(myDate.getSeconds());

		var systemTime = document.getElementById("time");
		systemTime.innerHTML = " " + year + "-" + month + "-" + date  + " " + hours + ":" + minutes + ":" + seconds;
		setTimeout("showTime()", 500);
	}

	//格式化时间：分秒。
	function formatTime(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	// 获取开放数据总览
	function get() {
		$.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetGlobalCount",
			type:"POST",
			success:function(data) {
				var data = JSON.parse(data);
				$("#api_amount")[0].innerText = data.api_amount;
				$("#appCount")[0].innerText = data.appCount;
				$("#cata_amount")[0].innerText = data.cata_amount + 30;
				$("#data_amount")[0].innerText = data.data_amount;
			}
		})
	}

	// 获取门户总访问量和单日最大访问量
	function getViews() {
		$.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetViewCnts",
			type:"POST",
			// dataType:"json",
			success:function(data) {
				var data = JSON.parse(data);
				$("#totalViewCnt")[0].innerText = data.totalViewCnt;
				$("#maxViewCnt")[0].innerText = data.maxViewCnt;
			}
		})
	};

	// 3.	获取门户今日当前访问量
	function getTodayViews() {
		$.ajax({
			url:getRootPath()+"/analyse/viewStatistics.do?method=GetVisitCurCount",
			type:"POST",
			// dataType:"json",
			success:function(data) {
				var data = JSON.parse(data)
				$("#VisitCurCount")[0].innerText = data.VisitCurCount
			}
		})
	};


</script>
