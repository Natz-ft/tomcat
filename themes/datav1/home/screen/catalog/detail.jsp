<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:title>${dataCatalog.title}</website:title>
<website:script src="js/catalog/detail.js" />
<website:script src="js/correction/correction.js" />
<website:script src="js/catalog/dataitem.js" />
<website:script src="js/catalog/jquery.modal.js" />
<website:script src="js/catalog/site.js" />
<website:style href="css/catalog/detail/sjml_xq.css" />
<website:style href="css/catalog/detail/jquery-ui.theme.min.css" />
<website:style href="css/catalog/detail/ui.jqgrid.css" />
<style>
.bdshare_popup_bottom {
	display: none;
}
</style>
<script type="text/javascript">
	var web_doc = "${fn:getConfValue('web_down')}";
	var commentSubmit_url = "${fn:getLink('interact/comment.do') }?method=addComment";
	var favoriteSubmit_url = "${fn:getLink('interact/favorite.do') }?method=saveFavorite";
	var cancelFavoriteSubmit_url = "${fn:getLink('interact/favorite.do') }?method=cancelFavorite";
	var resoucrceurl = "${fn:getLink('catalog/detail.do') }?method=QueryCountList";
	var download_url = "${fn:getLink('catalog/detail.do?method=addDownload')}";//下载url
	var cata_id='${dataCatalog.cata_id}';
	var add_score="${fn:getLink('catalog/detail.do?method=addScore')}";
	var object_type=1;
	var object_code="";
	var fav_id=('${isFav}'||0)*1;
	var correctionSubmit_url="${fn:getLink('interact/correctionFd.do') }?method=addCorrection";
	var isLogin_url="${fn:getLink('interact/correctionFd.do') }?method=isLogin";
	function MM_swapImgRestore() { //v3.0
		  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
		}
		function MM_preloadImages() { //v3.0
		  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
		}

		function MM_findObj(n, d) { //v4.01
		  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
		  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
		  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
		  if(!x && d.getElementById) x=d.getElementById(n); return x;
		}

		function MM_swapImage() { //v3.0
		  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
		   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
		}
</script>
<div class="sjml">
	<div class="top">
		<a href="${fn:getLink('index.htm')}"
			style="color: black; text-decoration: none">首页</a> &gt; <a
			href="${fn:getLink('catalog/index.htm')}"
			style="color: black; text-decoration: none">数据目录 </a>&gt;
		${dataCatalog.title}
	</div>
	<!--顶部结束 -->
	<div class="up">
		<div class="ico">
			<img src="${fn:getLink('/img/catalog/detail/ico.jpg')}" width="128"
				height="128" />
		</div>
		<div class="txt">
			<div class="title" style="width: 330px;">
				<a href="javaScript:void(0)" id="dataCatalogTitle">${dataCatalog.title}</a>
				<input type="hidden" id="obj_name" value="${dataCatalog.title}" />
			</div>
			<div class="img">
				<c:if
					test="${dataCatalog.dataset_type == 1 || dataCatalog.dataset_type == 4 }">
					<c:if test="${fn:isExists('1',dataCatalog.catalog_format)}">
						<img src="${fn:getLink('/img/index/icon_tjzy_xls.png')}">
					</c:if>
					<c:if test="${fn:isExists('2',dataCatalog.catalog_format)}">
						<img src="${fn:getLink('/img/index/icon_tjzy_xml.png')}">
					</c:if>
					<c:if test="${fn:isExists('3',dataCatalog.catalog_format)}">
						<img src="${fn:getLink('/img/index/icon_tjzy_json.png')}">
					</c:if>
					<c:if test="${fn:isExists('4',dataCatalog.catalog_format)}">
						<img src="${fn:getLink('/img/index/ico_tjzy_csv.png')}">
					</c:if>
					<%-- <c:if test="${dataCatalog.data_format == 'Lbs' }"><img src="${fn:getLink('/img/index/ico_tjzy_lbs.png')}"></c:if> --%>
				</c:if>
			</div>
			<div class="pf">
				当前评分：<span class="starcon"> <span class="starmon"
					style="width:<c:if test="${!empty interactiveMap.scores }">${interactiveMap.grade*10}</c:if><c:if test="${empty interactiveMap.scores }">0</c:if>%"></span>
				</span> <span class="pfnum"><fmt:formatNumber
						value="${interactiveMap.grade}" pattern="#0.0#"></fmt:formatNumber></span>(${interactiveMap.points}人评分)
			</div>
		</div>
		<ul>
			<li style="width: 200px">数据来源：${dataCatalog.org_name }</li>
			<li>所属主题：${dataCatalog.group_name}</li>
			<li style="width: 200px">数&nbsp;据&nbsp;量&nbsp;：<c:if
					test="${empty dataCatalog.data_count }">0</c:if>
				<c:if test="${!empty dataCatalog.data_count }">${dataCatalog.data_count}</c:if></li>
			<!--
			<li>数据质量：1</li>
			-->
			<li>更新周期： <c:if test="${dataCatalog.update_cycle == '1' }">不定期：${dataCatalog.u_defined_update_cycle}</c:if>
				<c:if test="${dataCatalog.update_cycle == '2' }">每天 </c:if> <c:if
					test="${dataCatalog.update_cycle == '3' }">每周 </c:if> <c:if
					test="${dataCatalog.update_cycle == '4' }">每月 </c:if> <c:if
					test="${dataCatalog.update_cycle == '5' }">每季度 </c:if> <c:if
					test="${dataCatalog.update_cycle == '6' }">每半年 </c:if> <c:if
					test="${dataCatalog.update_cycle == '7' }">每年 </c:if> <c:if
					test="${dataCatalog.update_cycle == '8' }">实时</c:if>
			</li>
			<li style="width: 200px">发布时间：${dataCatalog.released_time }</li>
		</ul>
		<div class="sjml_xq_user">
			<c:if test="${!empty download }">
				<div class="xz_dy" id="dl">
					下载 <span class="file_download"> <c:forEach var="downItem"
							items="${download}">
							<a
								class="${downItem.fileFormat == 'Xml'? 'file_download_x':'file_download_e'}"
								onclick="javascript:doDownLoadFile('${dataCatalog.cata_id}','${downItem.idInRc}')">${downItem.fileFormat}</a>
						</c:forEach>
					</span>
				</div>
			</c:if>
			<a><div class="xz_dy xy_dyjc" id="corBtn">纠错</div>
				<div id="modalLink" style="display: none;"></div></a>
			<div class="overlay" style="opacity: 0.7; display: block;"></div>
			<div id="modal1" class="modal" style="margin: 150px">
				<div class="modalltop">
					<div class="wyjc">我要纠错</div>
					<p class="closeBtn" style="margin-top: 1px; cursor: pointer;">关闭</p>
				</div>
				<h2>反馈数据：${dataCatalog.title}</h2>
				<input name="ymlj" type="hidden" value="${dataCatalog.title}"
					id="titlename"> <input name="mlid" type="hidden"
					value="${dataCatalog.cata_id}" id="cataid"></input> <input
					name="mlbm" type="hidden" value="${dataCatalog.cata_code}"
					id="catacode"></input>
				<div class="fklb">
					反馈类别： <select id="visit_url">
						<option value="数据与实际情况不符">数据与实际情况不符</option>
						<option value="资源过时">资源过时</option>
						<option value="数据无法下载">数据无法下载</option>
						<option value="其他">其他</option>
					</select>
				</div>
				<div class="sjms">
					<div class="sjmstxt">
						<div style="margin-top: 53px; float: left;">数据描述：</div>
						<textarea name="text"
							style="width: 295px; height: 106px; margin-left: 2px;" id="desc"></textarea>
					</div>
				</div>
				<!-- <div id="fileDiv" style="width: 500px;margin-top:3px;">
					<div  class="sctp">上传图片：&nbsp; </div>
					<form id="correctSubmit" enctype="multipart/form-data"
						method="POST"
						action="${fn:getLink('interact/correctionFd.do') }?method=fileUpload">
						<input name="上传" id="file" type="file" value="浏览" class="liulan" style="width:160px;">上传最大图片15k
					</form>
				</div> -->
				<div class="button" id="correctionBtn" style="cursor: pointer;">提交</div>
			</div>
			<a>
				<div class="xz_dy xz_dydy" id="cancelFavoriteSubmit"
					<c:if test="${isFav==0}">style="display:none"</c:if>>取消订阅</div>
				<div class="xz_dy xz_dydy" id="favoriteSubmit"
					<c:if test="${isFav>0}">style="display:none"</c:if>>订阅</div>
			</a>
			<div class="bdsharebuttonbox bdshare-button-style0-16 xz_dy xz_dyfx">
				<a href="#" class="bds_more" data-cmd="more"
					style="background-image: none;">分享</a>
			</div>
			<script>
			    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
			    
			</script>

		</div>

		<div class="an"></div>
	</div>
	<!--简介部分结束-->
	<div class="content">

		<div class="Label" id="nav_lable">
			<a href="#qaz" indexn="0"><div class="biaoqian current">描述信息</div></a>
			<a href="#wsx" indexn="1"><div class="biaoqian">元数据</div></a> <a
				href="#edc" indexn="2"><div class="biaoqian">数据管理</div></a> <a
				href="#rfv" indexn="3"><div class="biaoqian">服务接口</div></a>
			<%-- <c:if test="${null != relationCatalog }">
			<a href="#ksh" indexn="4"><div class="biaoqian" >数据可视化</div></a>
			</c:if> --%>
			<a href="#glsj" indexn="4"><div class="biaoqian">相关数据</div></a> <a
				href="#glyy" indexn="5"><div class="biaoqian">相关应用</div></a> <a
				href="#sjfx" indexn="6"><div class="biaoqian">数据分析</div></a>
			<%-- <c:if test="${4 == dataCatalog.dataset_type }">
			<a href="#map" indexn="7"><div class="biaoqian" >地图视图</div></a>
			</c:if> --%>
		</div>

		<div class="content_model">
			<!-- 描述信息 -->
			<div class="sub_content">
				<website:widget path="catalog/catalog_info_left.jsp" />
				<website:widget path="catalog/catalog_info_right.jsp" />
			</div>
			<c:if test="${null != dataCatalog.cata_id }">
				<!-- 元数据信息 -->
				<div class="sub_content">
					<website:widget path="catalog/catalog_item.jsp" />
				</div>
				<div class="sub_content">
					<website:widget path="catalog/catalog_data.jsp" />
				</div>
			</c:if>
			<div class="sub_content">
				<website:widget path="catalog/catalog_api.jsp" />
			</div>
			<div class="sub_content">
				<website:widget path="catalog/relation_catalog.jsp" />
			</div>
			<div class="sub_content">
				<website:widget path="catalog/relation_ac.jsp" />
			</div>
			<div class="sub_content">
				<website:widget path="catalog/catalogAnaly.jsp" />
			</div>
			<%-- <c:if test="${4 == dataCatalog.dataset_type }">
			<div class="sub_content">
				<website:widget path="catalog/map.jsp" />
			</div>
			</c:if> --%>
		</div>
	</div>
	<!-- <input type="hidden" name="obj_type" id="obj_type" value="4">
	<input type="hidden" name="obj_id" id="obj_id"
		value="${dataCatalog.cata_id }"> -->
	<input type="hidden" name="table_id" id="table_id" value="${table_id}" />
	<input type="hidden" name="database_type" id="database_type"
		value="${datasource_type}" />
	<div class="sjml_xqpl">
		<div class="sjml_plbox">
			<div class="pltitle"></div>
			<div class="plcontent">
				<input type="hidden" name="obj_type" id="obj_type" value="1">
				<input type="hidden" name="obj_id" id="obj_id"
					value="${dataCatalog.cata_id }"> <input type="hidden"
					name="obj_title" id="obj_title" value="${dataCatalog.title }">
				<textarea name="content" id="content" cols="30" rows="10"></textarea>
				<input type="hidden" name="table_id" id="table_id"
					value="${table_id}" /> <input type="hidden" name="database_type"
					id="database_type" value="${datasource_type}" />
			</div>
			<a><div class="plfabu " id="commentSubmit">发&nbsp;&nbsp;布</div></a>
		</div>
	</div>
</div>
<website:script src="js/utils/easydialog.min.js" />
<website:script src="js/utils/echarts/esl.js" />
<website:script src="js/catalog/tongjidata.js" />
<website:script src="js/catalog/kshdata.js" />
<website:script src="js/utils/echarts/echarts.js" />
<website:script src="js/utils/echarts/echarts/chart/line.js" />
<website:script src="js/utils/echarts/echarts/chart/pie.js" />
<website:script src="js/utils/echarts/echarts/chart/bar.js" />
<website:script src="js/utils/echarts/echarts/chart/force.js" />
<website:script src="js/catalog/grid.locale-cn.js" />
<website:script src="js/catalog/jquery.jqGrid.min.js" />
<website:script src="js/catalog/tabledata.js" />
<script type="text/javascript">
	$("#dl").mouseover(function(){
		$(".file_download").css("display","inline-block");
	});
	 $("#dl").mouseout(function(){
		$(".file_download").css("display","none");
	});
	myChartShow();
	var cata_id='${dataCatalog.cata_id }';
	if(cata_id!=null&&cata_id!=''){
		showDataItems();
	}
</script>
