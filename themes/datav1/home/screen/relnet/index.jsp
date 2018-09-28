<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>数据图谱_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="数据集,数据标签" />
<website:meta name="Description"
	content="数据图谱按照数据集、数据集标签两种维度将数据按照可视化展示。" />
<website:style href="css/relnet/sjtp_style.css" />
<website:script src="js/utils/jquery.pagination.js" />
<website:style href="css/common/pagination.css" />
<script type="text/javascript">
var catalogtagurl="${fn:getLink('relnet/index.do') }?method=GetCatalogTag";
var catalogtagbytagurl="${fn:getLink('relnet/index.do') }?method=GetCatalogTagByTag";
var catalogtagbypageurl="${fn:getLink('relnet/index.do') }?method=GetCatalogTagByPage";
var catalogbyorgurl="${fn:getLink('relnet/index.do') }?method=GetCatalogByOrg";
var relentSearchUrl = "${fn:getLink('search/index.do') }?method=SearchByParam";
var contentPath = '${fn:getLink('/')}';
var defaultId = '${cata_id}';
var org_code = "${org_code}";
</script>

<div class="sjtp_detail">
	<div class="buttons">
		<div class="btn_relnet">
			<div class="btn_title">
				<div class="btn_txt">图谱</div>
			</div>
			<div class="btn_detail" id="wangluotp">
				<div class="btn_title ico_tag tag_on">
					<div class="btn_txt" title="数据标签">数据标签</div>
				</div>
			</div>
			<div class="btn_detail" id="fenbutp">
				<div class="btn_title ico_data">
					<div class="btn_txt">数据集</div>
				</div>
			</div>

		</div>
		<div class="btn_relation">
			<div class="btn_title">
				<div class="btn_txt">筛选</div>
			</div>
			<div class="btn_detail">
				<div class="btn_title ico_all all_on">
					<div class="btn_txt">全部</div>
				</div>
			</div>
			<div class="btn_detail">
				<div class="btn_title ico_depart">
					<div class="btn_txt">同部门</div>
				</div>
			</div>
			<!-- <div class="btn_detail">
				<div class="btn_title ico_indus">
                     <div class="btn_txt">同主题</div>
                </div>
			</div> -->
		</div>
		<div class="btn_switch">
			<div class="btn_title title_off" id="kaiguan">
				<div class="btn_txt btn_name">名称</div>
			</div>
		</div>
	</div>



	<div class="sjtp_checkbox" id="sjtp_checkbox">
		<input type="radio" name="sjtp_check" value="0" checked="checked"><b>全部</b>
		<input type="radio" name="sjtp_check" value="1"><b>同部门</b> <input
			type="radio" name="sjtp_check" value="2"><b>同行业</b>
	</div>
	<div class="sjtp_main">
		<div class="sjtp_draw1" id="sjtp_draw1"></div>
		<div class="sjtp_draw2" id="sjtp_draw2"></div>
	</div>

	<div class="sjtp_right">
		<div class="right_hidebtn" id="sjtp_hide"></div>
		<div class="right_title">数据集/标签筛选</div>
		<div class="right_main">
			<div class="right_srch">
				<div class="right_select">
					<select name="bumen" id="sec1" class="srch_select">
						<option value="">请选择部门</option>
						<c:forEach var="item" items="${organizationres}"
							varStatus="status">
							<option value="${item.org_code}"
								<c:if test="${org_code == item.org_code }">
							selected="selected"
						</c:if>>${item.general_code}</option>
						</c:forEach>
					</select> <select name="data" id="sec2" class="srch_select">
						<option value="">请选择数据集</option>
					</select>
				</div>

				<div class="right_search">
					<input type="text" class="srch_input" placeholder="输入关键字搜索"
						id="relnetSearchKey"> <input type="button"
						class="srch_button btn_primary" value="搜索" id="relnetSearch" />
				</div>


			</div>
			<div class="right_list">
				<ul class="right_listlabel">
					<li class="right_listlabel-1" id="list_xg_tag">相关列表</li>
					<li class="right_listlabel-2" id="list_search_tag">搜索结果</li>
				</ul>
				<input type="hidden" name="cata_title" id="cata_title" /> <input
					type="hidden" name="cata_id" id="cata_id" value="" /> <input
					type="hidden" name="cata_tag" id="cata_tag" /> <input
					type="hidden" name="preRelnetSearchKey" id="preRelnetSearchKey" />
				<ul id="relalist" style="margin-top: 0px;">
				</ul>
				<ul id="searchlist">
				</ul>
				<div class="right_page pagination" id="Pagination"></div>
			</div>
		</div>
	</div>
	<input type="hidden" name="subjectId" value="${subjectId }" /> <input
		type="hidden" name="orgId" value="" /> <input type="hidden"
		id="subType" name="subType" value="" />
</div>
<website:script src="js/echarts/echarts.js" />
<website:script src="js/relnet/main.js" />
<website:script src="js/relnet/data.js" />
<script type="text/javascript">

</script>