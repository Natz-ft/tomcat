<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_个人中心_我参与的调查</website:title>
<website:meta name="title" content="数据开放平台_数据API_大数据" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/libs/iconfont/iconfont.css" />
<!-- <website:style href="css/common/commonList.css" rel="stylesheet" /> -->
<website:style href="css/interact/pagination.css" rel="stylesheet" />

<style>
body {
	background-color: #f5f5f5;
}

.main {
	background: url("../../img/user_bg.png") center 0 no-repeat;
}

.peoplepic {
	float: left;
}

.sidebar {
	background: #fff;
	padding: 10px;
}

.sidebar .cata-rank .rank-list li {
	margin-left: 115px;
	font-size: 12px;
	line-height: 24px;
}

.blue {
	color: #2475dc;
	background-color: #fff !important;
}

.orange {
	color: #f60;
	background-color: #fff !important;
}

.red {
	color: #e40000;
	background-color: #fff !important;
}

.green {
	color: #39d397;
	background-color: #fff !important;
}

.purple {
	color: #a939d3;
	background-color: #fff !important;
}

.rank-list li {
	line-height: 35px;
}

.cata-hot-tag {
	margin-bottom: 20px;
}

.cata-app {
	margin-bottom: 20px;
}

.tab-panel {
	margin-bottom: 20px;
}

.container {
	background: rgb(255, 255, 255) none repeat scroll 0% 0%;
	padding: 20px;
}

.news-dynamic .dynamic-list {
	margin-top: 5px;
}

.news-dynamic .dynamic-list>ul {
	width: 100%;
}

.news-dynamic .dynamic-list>ul>li:hover {
	background-color: #f7f7f7;
}

.news-dynamic .dynamic-list .dyna-time {
	position: relative;
	float: left;
	width: 120px;
	padding: 15px 30px;
	border-right: solid 1px #e5e5e5;
}

.news-dynamic .dynamic-list .dyna-time:after {
	content: '';
	display: block;
	width: 12px;
	height: 12px;
	background: #fff;
	border: solid 2px #00baf2;
	border-radius: 50%;
	position: absolute;
	right: -9px;
	top: 16px;
}

.news-dynamic .dynamic-list .dyna-info {
	overflow: hidden;
	padding: 15px 0 15px 30px;
	margin-left: 120px;
}

.sidebar ~ .container {
	margin-left: 310px;
}

.rank-list .iconfont {
	color: orange;
}

.more {
	float: right;
	line-height: 33px;
	font-size: 12px;
}

.g-main-mySurvey {
	width: 960px;
	margin-left: auto;
	margin-right: auto;
}
</style>

<div class="main" style="margin-left: 0;">
	<div class="g-main-mySurvey">
		<div class="container side-r">
			<div class="cata-main">
				<div class="cata-list">
					<div class="m-tab tab-panel news-dynamic">
						<div class="tab-header">
							<ul>
								<li class="active">我的问卷</li>
							</ul>
						</div>
						<div class="tab-body">
							<ul>
								<li>
									<div class="dynamic-list">
										<ul id="data_ul">
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div class="ly_ym">
						<div align="center">
							<div id="Pagination" class="pagination"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<website:script src="libs/assets/jquery.pagination.js" />
<script type="text/javascript">
$(function(){
	
	$("#mysurvey").addClass("menuon");
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "H+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
	var pageSize = 5;
	
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
	};
	
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			items_per_page: pageSize, 
			current_page: 0,
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback
		});
	};
	
	var queryResByPage = function(page) {
			var listUl= $("#data_ul");
			listUl.empty();
			$.ajax({url:"mySurvey.do", 
				data:{
					method : "getMySurvey",
					interactType: 3,
					page:page,
					pageSize:pageSize,
					t:Math.random()
				},
				success:function(datas) {
					console.log(datas);
					if(datas.code=='000001'){
						register();
						return;
					}
					if(datas!=""&&datas!=null){
						var preCreateTime;
						var dataarr = new Array();
						var needClose = false;
						for (var i = 0; i < datas.data.length; i++) {
							var obj_list = datas.data[i];
							
							dataarr.push('<li><div class="dyna-time">' + new Date(obj_list[0].create_time).Format("yyyy-MM") + '</div>');
							dataarr.push('<div class="dyna-info"> [' + obj_list[0].survey_name + ']');
							
							for(var j = 0; j < obj_list.length; j++){
								var obj = obj_list[j];
								dataarr.push('<br>' + obj.title + " : " + obj.note);
							}
							dataarr.push('</div></li>');
						}
						listUl.append(dataarr.join(''));
						
						if (page == 1) {
							reloadPage(datas.recordsTotal);
						}
					}
				},error:function(data) {
					dialog.info("网络异常",function(){},2000);
				},dataType:"json"});
			
		};
		queryResByPage(1);
});	
</script>
<website:script src="js/interact/list.js" />