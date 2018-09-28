<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${regionStatistics.region_name }数据开放平台_切换城市_数据API_大数据</website:title>
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="${regionStatistics.region_name }数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/changeCity/style.css" />
<website:style href="css/common/easydialog.css" />
<website:style href="css/common/header.css" />
<website:script src="js/utils/jquery-1.7.1.min.js" />
<website:script src="js/changeCity/main.js" />
<script type="text/javascript">
	var max_data_amount = ${max_data_amount};
</script>
<!--
<div class="sy_title">
		<div class="sy_content">
			<div class="sy_logo"></div>
			<div class="sy_keyword"></div>
			<div class="header_right">
				<div class="hright_text">
					<a href="${fn:getUrl('interact/') }">用户反馈</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javaScript:void(0)">关于浪潮大数据平台</a>
				</div>
			</div>
		</div>
</div>
-->
<div class="qhcs_header">
	<div class="sy_flash">
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			width="380" height="100">
			<param name="movie"
				value="${fn:getUrl('/img/layout/flash_0107.swf')}" />
			<param name="quality" value="high" />
			<param name="wmode" value="transparent" />
			<param name="swfversion" value="6.0.65.0" />
			<!-- This param tag prompts users with Flash Player 6.0 r65 and higher to download the latest version of Flash Player. Delete it if you don’t want users to see the prompt. -->
			<param name="expressinstall" value="Scripts/expressInstall.swf" />
			<!-- Next object tag is for non-IE browsers. So hide it from IE using IECC. -->
			<!--[if !IE]>-->
			<object type="application/x-shockwave-flash"
				data="${fn:getUrl('/img/layout/flash_0107.swf')}" width="380"
				height="100">
				<!--<![endif]-->
				<param name="quality" value="high" />
				<param name="wmode" value="transparent" />
				<param name="swfversion" value="6.0.65.0" />
				<param name="expressinstall" value="Scripts/expressInstall.swf" />
				<!-- The browser displays the following alternative content for users with Flash Player 6.0 and older. -->
				<div>
					<h4>Content on this page requires a newer version of Adobe
						Flash Player.</h4>
					<p>
						<a href="http://www.adobe.com/go/getflashplayer"><img
							src="http://www.adobe.com/img/shared/download_buttons/get_flash_player.gif"
							alt="Get Adobe Flash player" width="112" height="33" /></a>
					</p>
				</div>
				<!--[if !IE]>-->
			</object>
			<!--<![endif]-->
		</object>
	</div>
	<div class="header_right">
		<%-- <div class="hright_text">
			<a href="${fn:getUrl('interact/') }">用户反馈</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a
				href="javaScript:void(0)">设为主页</a>
		</div> --%>
	</div>
</div>
<div class="qhcs_body">
	<div class="qleft_modal">
		<div class="qleft_city">
			<span id="qleft_name">${empty default_region.region_name?"全国站" : default_region.region_name}</span>
			<span class="qleft_click"><a href="javaScript:void(0)"
				onclick="enterCity('${default_region.region_abbr }')">(点击进入)</a></span>
		</div>
		<div class="qleft_gov">
			<span class="qleft_tit">政府</span> <span id="gov_amount">${data_amount }</span>
		</div>
		<!-- <div class="qleft_soc">
					<span class="qleft_tit">社会</span>
					<span>59730</span>
				</div> -->
		<div class="qleft_num">
			<span class="qleft_tit">排行</span> <span class="qleft_pai"
				id="gov_paihang">1</span>
		</div>
	</div>
	<div class="qhcs_left">
		<input id="default_region_abbr" name="default_region_abbr"
			type="hidden" value="${default_region.region_abbr}" /> <input
			id="default_region_code" name="default_region_code" type="hidden"
			value="${default_region.region_code}" />
		<div class="qleft_return" id="qleft_return">返回全国地图</div>
		<div class="qhcs_draw " id="qhcs_draw"></div>
	</div>
	<div class="qhcs_right">
		<div class="qright_btn" id="qright_btn"></div>
		<div class="qright_main">
			<div class="qright_tab">
				<div class="qright_t1" id="qright_t1">城&nbsp;&nbsp;市&nbsp;&nbsp;排&nbsp;&nbsp;行</div>
				<!--
					<div class="qright_t2" id="qright_t2">热门数据集</div>
				-->
			</div>
			<div class="qright_t1con">
				<div class="qright_srch">
					<input type="text" placeholder="输入您要搜索的城市名称" id="cityName">
					<div class="qright_submit" id="searchByKey"></div>
				</div>
				<div class="qright_city" id="scroll-1">
					<ul>
						<c:choose>
							<c:when test="${null != cityList}">
								<c:forEach var="city" items="${cityList}" varStatus="status">
									<li>
										<div class="qright_num">${status.count}</div>
										<div class="qright_cityname" id="qright_sel"
											title="${city.region_name}"
											onclick="enterCity('${city.region_abbr}')">
											${city.region_name}</div>
										<div class="qright_citynum"
											style="width: <c:if test="${max_data_amount==0 }">50</c:if><c:if test="${max_data_amount>0 }">${((city.cata_amount/max_data_amount)*50)}</c:if>%"></div>
									</li>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<li>暂无开放城市</li>
							</c:otherwise>
						</c:choose>
					</ul>
				</div>
				<!--
				<div class="qright_share">
					<span>分享到：</span>
					<ul class="bdsharebuttonbox">
						<li class="qright_sh1"><a title="分享到百度新首页" href="#" class="bds_bdhome" data-cmd="bdhome" style="background-image: none"></a></li>
						<li class="qright_sh2"><a title="分享到新浪微博" href="#" class="bds_tsina" data-cmd="tsina" style="background-image: none"></a></li>
						<li class="qright_sh3"><a title="分享到QQ空间" href="#" class="bds_qzone" data-cmd="qzone" style="background-image: none"></a></li>
						<li class="qright_sh4"><a href="#" class="bds_more" data-cmd="more" style="background-image: none"></a></li>
					</ul>
				</div>
				-->
			</div>
		</div>
	</div>
</div>
</body>
<website:script src="js/utils/echarts/esl.js" />
<website:script src="js/utils/echarts/echarts.js" />
<website:script src="js/utils/echarts/echarts-map.js" />
<website:script src="js/changeCity/map.js" />
<website:script src="js/utils/easydialog.min.js" />
<script>
	window._bd_share_config = {
		"common" : {
			"bdSnsKey" : {},
			"bdText" : "",
			"bdMini" : "2",
			"bdMiniList" : false,
			"bdPic" : "",
			"bdStyle" : "1",
			"bdSize" : "24"
		},
		"share" : {}
	};
	with (document)
		0[(getElementsByTagName('head')[0] || body)
				.appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
				+ ~(-new Date() / 36e5)];
	$(function () {
		$(".bds_more").mousemove(function(){
			return false;
		});
	});
</script>

