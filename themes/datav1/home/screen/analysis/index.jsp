<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>关联分析_${regionStatistics.region_name }数据开放平台</website:title>
<website:meta name="Keywords" content="数据关联,数据对比,数据分析" />
<website:meta name="Description"
	content="数据关联分析按照搜索关联、维度关联、统计关联对多个数据集进行对比和分析。" />
<website:style href="css/analysis/stylenew.css" />
<script type="text/javascript"
	src="http://api.map.baidu.com/api?v=2.0&ak=06hfQa7Ybnb2mHlQBIbGPEKV"></script>
<style type="text/css">
html, body {
	margin: 0;
	padding: 0;
}

.iw_poi_title {
	color: #CC5522;
	font-size: 14px;
	font-weight: bold;
	overflow: hidden;
	padding-right: 13px;
	white-space: nowrap
}

.iw_poi_content {
	font: 12px arial, sans-serif;
	overflow: visible;
	padding-top: 4px;
	white-space: -moz-pre-wrap;
	word-wrap: break-word
}
</style>
<!--导航END-->
<div class="rela_banbg">
	<div class="rela_banner"></div>
</div>
<div class="rela_main">
	<div class="rela_content">
		<div class="rela_tab">
			<ul>
				<li id="rela_tab2"><i></i>维度关联
					<div class="jiantou" id="jiantou2"></div></li>
				<li id="rela_tab3"><i></i>统计关联
					<div class="jiantou" id="jiantou3"></div></li>
				<li id="rela_tab1"><i></i>搜索关联
					<div class="jiantou" id="jiantou1"></div></li>
			</ul>
		</div>
		<div class="rela_screen" id="rela_scr1">
			<!--<div class="rela_ss"><img src="${fn:getUrl('img/analysis/tjsjj.png')}" width="125" height="40" /></div>-->
			<div class="rela_srch">

				<div class="rela_input">
					<input type="text" id="traditionSearchKey" placeholder='关键字搜索'>
				</div>
				<a href="javaScript:void(0)" id="traditionSearch"><div
						class="rela_btn">
						<img src="${fn:getUrl('img/analysis/search-bg.png')}" width="35"
							height="35" />
					</div></a>
			</div>
		</div>
		<div class="rela_screen" id="rela_scr2">

			<div class="rela_demen1" id="rela_wdmain">

				<div class="rela_deup" style="overflow: hidden;">



					<span class="rela_input"> </span>
					<div class="rela_dedtita">
						<div id="rela_xz" style="overflow: hidden; margin-top: 10px;">

							<div class="rela_wdlist">
								<div class="rela_deoptn">
									<span>时间维度</span>
									<ul>
										<li><label for="time1">时间单位</label><input type="checkbox"
											name="reactionConditions" value="时间单位"
											id="reactionConditions"></li>
										<li><label for="time2">时间其他</label><input type="checkbox"
											name="reactionConditions" value="时间其他"
											id="reactionConditions"></li>
									</ul>
								</div>
								<div class="rela_deoptn">
									<span>地点维度</span>
									<ul>
										<li><label for="adress1">地名</label><input type="checkbox"
											name="reactionConditions" value="地名" id="reactionConditions"></li>
										<li><label for="adress2">地形</label><input type="checkbox"
											name="reactionConditions" value="地形" id="reactionConditions"></li>
										<li><label for="adress2">城乡设施</label><input
											type="checkbox" name="reactionConditions" value="城乡设施"
											id="reactionConditions"></li>
									</ul>
								</div>
								<div class="rela_deoptn">
									<span>对象维度</span>
									<ul>
										<li><label for="obj1">职业分类</label><input type="checkbox"
											name="reactionConditions" value="职业分类"
											id="reactionConditions"></li>
										<li><label for="obj4">产品</label><input type="checkbox"
											name="reactionConditions" value="产品" id="reactionConditions"></li>
										<li><label for="obj4">自然</label><input type="checkbox"
											name="reactionConditions" value="自然" id="reactionConditions"></li>
									</ul>
								</div>
								<div class="rela_deoptn">
									<span>指数维度</span>
									<ul>
										<li><label for="anal1">主题</label><input type="checkbox"
											name="reactionConditions" value="主题" id="reactionConditions"></li>
									</ul>
								</div>
								<div class="rela_deoptn">
									<span>属性维度</span>
									<ul>
										<li><label for="anal1">行业</label><input type="checkbox"
											name="reactionConditions" value="行业" id="reactionConditions"></li>
										<li><label for="anal2">主题</label><input type="checkbox"
											name="reactionConditions" value="主题" id="reactionConditions"></li>
										<li><label for="anal2">部门</label><input type="checkbox"
											name="reactionConditions" value="部门" id="reactionConditions"></li>
									</ul>
								</div>
								<div class="rela_deoptn">
									<span>其他维度</span>
									<ul>
										<li><label for="obj22">其他</label><input type="checkbox"
											name="reactionConditions" value="其他" id="reactionConditions"></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="rela_dedown">
					<div class="rela_deleft">
						<select name="theme2" id="theme">
							<option value="0">请选择主题</option>
							<c:if test="${null != resGroupList }">
								<c:forEach var="resGroup" items="${resGroupList}">
									<option value="${resGroup.group_code }">${resGroup.group_name }</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<div class="rela_deleft">
						<select name="depart" id="depart">
							<option value="0">请选择部门</option>
							<c:if test="${null != orgMap }">
								<c:forEach var="org" items="${orgMap}">
									<option value="${org.key}">${org.value }</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<input type="text" class="rela_keyw" placeholder="输入关键字"
						id="rela_keyw" />

					<div class="rela_debutton">
						<img src="${fn:getUrl('img/analysis/wdsx.png')}" width="100"
							height="30" align="middle" id="queryByRelaction" />
					</div>
				</div>
			</div>
		</div>
		<div class="rela_screen" id="rela_scr3">
			<div class="rela_demen">
				<div class="rela_deup">
					<div class="rela_deleft" id="countbq">
						<div>
							通过<i></i>重合度筛选
						</div>
						<em></em> <select name="countbq" id="tagCount">
							<option value="0">请选择相同标签数</option>
							<option value="2">2个</option>
							<option value="3">3个</option>
							<option value="4">4个</option>
							<option value="5">5个</option>
							<option value="6">6个</option>
							<option value="7">7个</option>
							<option value="8">8个</option>
							<option value="9">9个</option>
							<option value="10">10个及以上</option>
						</select>
					</div>
				</div>
				<div class="rela_deup">
					<div class="rela_deleft" id="countwd">
						<div>
							通过<i></i>重合度筛选
						</div>
						<em></em> <select name="countwd" id="relationCount">
							<option value="0">请选择相同维度数</option>
							<option value="2">2个</option>
							<option value="3">3个</option>
							<option value="4">4个</option>
							<option value="5">5个</option>
							<option value="6">6个</option>
							<option value="7">7个</option>
							<option value="8">8个</option>
							<option value="9">9个</option>
							<option value="10">10个及以上</option>
						</select>
					</div>
				</div>
				<div class="rela_deup" style="margin-right: 0;">
					<div class="rela_deleft" id="countpm">
						<div>
							通过<i></i>热度筛选
						</div>
						<em></em> <select name="countpm" id="orderType">
							<option value="brows">浏览量排名</option>
							<option value="download">下载量排名</option>
							<option value="comment">评论量排名</option>
						</select>
					</div>
				</div>
				<div class="rela_dedown">
					<div class="rela_deleft">
						<select name="theme" id="relactionSubjectId">
							<option value="0">请选择主题</option>
							<c:if test="${null != resGroupList }">
								<c:forEach var="resGroup" items="${resGroupList}">
									<option value="${resGroup.group_code }">${resGroup.group_name }</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<div class="rela_deleft">
						<select name="depart" id="relactionOrgId">
							<option value="0">请选择部门</option>
							<c:if test="${null != orgMap }">
								<c:forEach var="org" items="${orgMap}">
									<option value="${org.key}">${org.value }</option>
								</c:forEach>
							</c:if>
						</select>
					</div>
					<input type="text" class="rela_keyw" placeholder="输入关键字"
						id="relactionKey">
					<div class="rela_debutton">
						<img src="${fn:getUrl('img/analysis/tjsx.png')}" width="100"
							height="30" id="queryByfilter" />
					</div>
				</div>
			</div>
		</div>
		<div id='rela_change'></div>
		<div class="rela_result">
			<div class="rela_rleft">
				<div class="rela_rtitle">筛选结果</div>
				<div class="rela_rmain">
					<ul id="addList">
						<c:choose>
							<c:when test="${null != catalogSelectList }">
								<c:forEach var="catalogAnalySis" items="${catalogSelectList }">
									<li title="添加数据集到左边已选"><span class="rela_plus"></span><a
										href="javaScript:void(0)"><span
											id='${catalogAnalySis.cata_id }'>${catalogAnalySis.title }</span></a></li>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<span>请先添加筛选结果</span>
							</c:otherwise>
						</c:choose>
					</ul>
					<div class="rela_page" id="rela_page">
						<span id="totalRecode">共9123条数据集</span> <span> <a
							href="javaScript:void(0)" id="prePage"><img
								src="${fn:getUrl('img/analysis/left.png')}" width="6"
								height="12" /></a> <span id="pageNumber">${cataLogAnalysisPageList.currPage }&nbsp;/&nbsp;${ cataLogAnalysisPageList.totalPage}</span>
							<a href="javaScript:void(0)" id="nextPage"><img
								src="${fn:getUrl('img/analysis/right.png')}" width="6"
								height="12" /></a> <input type="hidden" id="key" name="key" /> <input
							type="hidden" id="type" name="type" /> <input type="hidden"
							id="page" name="page" /> <input type="hidden" id="totalPage"
							name="totalPage" />
						</span>
					</div>
				</div>
			</div>
			<div class="rela_rright">
				<div class="rela_rtitle">已选数据集</div>
				<div class="rela_rmain">
					<div class="rela_notice">
						还可添加<span id="addable">${5 - f:length(catalogList)}</span>个数据集
					</div>

					<ul id="minuList">
						<c:if test="${null !=catalogList }">
							<c:forEach var="catalog" items="${catalogList }"
								varStatus="status">
								<c:if test="${0 == status.index }">
									<li><span class="rela_minu"></span> <span
										class="rela_dataico dataico0">主数据集</span> <a
										href="javaScript:void(0)"><span id="${catalog.cata_id }">${catalog.title }</span></a>
									</li>
								</c:if>
								<c:if test="${0 < status.index }">
									<li><span class="rela_minu"></span> <a
										href="javaScript:void(0)"><span id="${catalog.cata_id }">${catalog.title }</span></a>
										<span class="rela_lead">设为主集</span></li>
								</c:if>
							</c:forEach>
						</c:if>
					</ul>
					<div class="rela_contrast">
						<a href="javaScript:void(0)" id="Contrast"><div
								class="rela_debutton">
								<img src="${fn:getUrl('img/analysis/db_btn.png')}" width="100"
									height="30" id="queryByfilter" />
							</div></a>
					</div>
				</div>
			</div>
		</div>

		<div class="rela_conpare" style="display: none">
			<table class="rela_table">
				<!--<caption>对比情况</caption>-->
				<thead id="dataHead">
					<tr>
						<th class="rela_caption">对比情况</th>
						<th><div class="color1"></div>
							<div class="ralalabel1">主数据集</div></th>
						<th><div class="color2"></div>
							<div class="ralalabel1">对比数据集1</div></th>
						<th><div class="color3"></div>
							<div class="ralalabel1">对比数据集2</div></th>
						<th><div class="color4"></div>
							<div class="ralalabel1">对比数据集3</div></th>
						<th><div class="color5"></div>
							<div class="ralalabel1">对比数据集4</div></th>
					</tr>
				</thead>
				<tbody id="dataBody">

				</tbody>
			</table>
		</div>

		<div class="rela_draw" style="display: none">
			<div class="rela_dtitle">
				<span>可视化展现</span>
				<ul id="rela_ul">

				</ul>
			</div>
			<div class="rela_dmain" id="dituContent"></div>
			<div class="rela_dmain" id="barContent"></div>
			<div class="rela_dmain" id="lineContent"></div>
		</div>
	</div>
</div>
<script>
$(document).ready(function(){  
	$(".ytyj_schlist").hide();
	$(".ytyj_schdown").click(function(event) {
		$(".ytyj_schlist").slideToggle();
	});
	var i=0;
	$(".ytyj_schtitle").mouseover(function(event) {
		i=1;
	});
	$(".ytyj_schtitle").mouseleave(function(event) {
		i=0;
	});
	$(document).click(function(){ 
		if(i==0){
			$(".ytyj_schlist").slideUp();
		}
	});
	var obj = $(".ytyj_schlist ul li");
	var m;
    obj.each(function(){
    $(this).click(function(){
    	m= $(this).text();
    	$("#schtxt").text(m);
    	$(".ytyj_schlist").hide();
    });
	})
});  


</script>
<website:script src="js/utils/echarts/esl.js" />
<website:script src="js/utils/echarts/echarts.js" />
<website:script src="js/utils/echarts/echarts/chart/line.js" />
<website:script src="js/utils/echarts/echarts/chart/pie.js" />
<website:script src="js/utils/echarts/echarts/chart/bar.js" />
<website:script src="js/utils/echarts/echarts/chart/force.js" />
<website:script src="js/analysis/mainnew.js" />
<website:script src="js/analysis/rightList.js" />
