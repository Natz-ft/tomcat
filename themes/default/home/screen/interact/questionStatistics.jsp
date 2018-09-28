<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title> ${regionStatistics.region_name } 数据开放平台_互动交流</website:title>
<website:meta name="title" content="数据开放平台_数据API_大数据" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/libs/font-awesome.css" />
<website:style href="css/libs/iconfont/iconfont.css" />
<website:style href="css/interact/bigdata.css" />
<website:style href="css/interact/service.css" />
<style type="text/css">
/*无数据提示*/
.nodata_text_notice{
	font-family: "Microsoft YaHei";
	line-height:30px;
	display: block;
	font-size: 22px;
	font-weight: bolder;
	letter-spacing: 2px;
	margin: 20px 0 10px;
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(126,172,223,0.5)), to(rgba(20,99,172,1)));
	color: #1463ac;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.no_data_notice{
	margin-left: 10%;float: left;margin-right: 20px;
}
</style>
<div class="banner">
	<!--    <img src="dist/img/bigdata/banner.png" style="width: 100%;height: 180px"> -->
</div>
<div class="main">
	<div class="bigdata-content">
		<div class="service-content" style="height: 950px; margin-top: 5px">
			<!--左侧蓝色头部-->
			<div class="lefthead">
				<img src="../img/communicate/blocktitle.png">
			</div>
			<div class="left" style="height:880px;">
				<div class="listul">
					<ul>
						<li class="li1">咨询建议</li>
						<li class="li2 active" >需求调查</li>

					</ul>
				</div>
			</div>
			
			<div class="right" id="right1">

				<div class="main"
					style="background-color: #ffffff; padding-bottom: 13px;">
			<div class="anly_right"> 
				<div>
				</div> 
				<div style="float:left;padding:20px;text-align:center;">
				<h3 class="">需求类型</h3>
				<div id="demand" ></div>
				</div>
				<div style="float:right;padding:20px;line-height: normal;text-align: left;text-align:center;">
				<h3 class="">数据格式</h3>
				<div id="dataformat" ></div>
				</div>
				<div style="float:left;padding:20px;text-align:center;">
				<h3 class="">用户类型</h3>
				<div id="usertype" ></div>
				</div>
				<div style="float:right;padding:20px;line-height: normal;text-align: left;text-align:center;">
				<h3 class="">用途</h3>
				<div id="purpose" ></div>
				</div>
			</div>
			</div>
			</div>
		</div>
	</div>
</div>
<website:script src="js/interact/questionStatistics.js" />	
<script type="text/javascript">
$(".li1").click(function(){
	window.location.href = "${fn:getLink('interact/index.jsp')}";
});
$(document).ready(function(){
	var demand_list = '${demand}';
	var usertype_list = '${usertype}';
	var dataformat_list = '${dataformat}';
	var purpose_list = '${purpose}';
	showPie('demand',demand_list,'',250,150,4);
	showPie('usertype',usertype_list,'',250,150,6);
	showPie('dataformat',dataformat_list,'',250,150,5);
	showPie('purpose',purpose_list,'',250,150,6);
	});
		
</script>