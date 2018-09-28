<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${regionStatistics.region_name }公共信息资源开放平台_切换城市_数据API_大数据</website:title>
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="${regionStatistics.region_name }数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<website:style href="css/changeCity/style.css" />
<website:style href="css/changeCity/header.css" />
<website:script src="js/changeCity/main.js" />
<script type="text/javascript">
	var max_data_amount = ${max_data_amount};
</script>
<div class="qhcs_header">
	<a href="${fn:getLink('index.htm')}" class="header-logo"> <img
		src="${fn:getUrl('img/common/logo.png') }" /> <img
		src="${fn:getUrl('img/common/logo_title.png') }" />
	</a>
</div>
<div class="qhcs_body">
	<div class="qleft_modal">
		<div class="qleft_city">
			<span id="qleft_name">${empty default_region.region_name?"全国站" : default_region.region_name}</span>
			<span class="qleft_click"><a href="javaScript:void(0)"
				onclick="enterCity('${default_region.region_name}')">(点击进入)</a></span>
		</div>
		<div class="qleft_gov">
			<span class="qleft_tit">政府</span> <span id="gov_amount">${data_amount}</span>
		</div>
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
			</div>
			<div class="qright_t1con">
				<div class="qright_srch">
					<input type="text" placeholder="输入您要搜索的城市名称" id="cityName" />
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
											onclick="enterCity('${city.region_name}')">
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
			</div>
		</div>
	</div>
</div>
</body>
<website:script src="libs/assets/echarts/echarts.js" />
<website:script src="js/changeCity/map.js" />
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
	
	//兼容ie8 input placeholder
	jQuery('[placeholder]').focus(function() {
		  var input = jQuery(this);
		  if (input.val() == input.attr('placeholder')) {
		    input.val('');
		    input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = jQuery(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		    input.addClass('placeholder');
		    input.val(input.attr('placeholder'));
		  }
		}).blur().parents('form').submit(function() {
		  jQuery(this).find('[placeholder]').each(function() {
		    var input = jQuery(this);
		    if (input.val() == input.attr('placeholder')) {
		      input.val('');
		    }
		  })
		});
</script>