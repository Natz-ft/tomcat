<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<website:title>开发者中心-服务接口列表</website:title>
<website:style href="css/developer/ssym_style.css" />
<website:style href="css/appcenter/yysd_style.css" />
<website:script src="js/developer/list/main.js" />
<website:script src="js/utils/jquery.pagination.js" />
<website:style href="css/common/pagination.css" />
<script type="text/javascript">
var isLogin_url="${fn:getUrl('interact/correctionFd.do') }?method=isLogin";
var resoucrceurl = "${fn:getLink('developer/service/serviceList.do')}?method=queryApiList";
var serviceApplyUrl = "${fn:getConfValue('global.index.devweb')}/console/serviceApply.htm";
var isDeveloperUrl = "${fn:getConfValue('global.index.odweb')}developer/Developer.do?method=devApply";
var applyDevloperUrl = "${fn:getConfValue('web_uc_context')}developer/devApply.htm";
</script>
<!--详情BEGIN-->

<div class="ssym_detail">
	<div class="ssym_content">
		<div class="ssym_contenttop"></div>
		<div class="ssym_detailleft">
			<div class="ssym_detailtop">
				<%-- <div class="app_zt">
            	<span><b>主题:</b></span>
              <ul id="app_ztul">
              <c:forEach var="item" items="${resGroups}" varStatus="status">
					<a ><li id="${item.id}">${item.name }</li></a>  
			  </c:forEach>                
              </ul>
              <div class="app_bmzk" id="app_ztzk">展开<img src="${fn:getUrl('/img/dev/list/arrowdown.png')}" alt=""></div>
              </div> --%>
				<div class="app_bm">
					<span><b>部门:</b></span>
					<ul id="app_bmul">
						<c:forEach var="item" items="${organizationres}"
							varStatus="status">
							<a><li id="${item.org_code}">${item.general_code}</li></a>
						</c:forEach>
					</ul>
					<div class="app_bmzk" id="app_bmzk">
						展开<img src="${fn:getUrl('/img/dev/list/arrowdown.png')}" alt="">
					</div>
				</div>
			</div>
			<div class="ssym_detaillist">
				<span class="ssym_ss" id="totle_api_num"></span>
				<div class="app_user">
					<span class="app_selected" id="s1P" style="display: none"><span
						id="s1"></span>&nbsp;<a href="javascript:void(0)" id="s1Close"><img
							src="${fn:getUrl('/img/dev/list/close_min.png')}" alt=""></a></span> <span
						class="app_selected" id="s2P" style="display: none"><span
						id="s2"></span>&nbsp;<a href="javascript:void(0)" id="s2Close"><img
							src="${fn:getUrl('/img/dev/list/close_min.png')}" alt=""></a></span>
				</div>
				<form id="type_filter_form" name="type_filter_form"
					action="${fn:getLink('developerCenter/serviceList.jsp') }"
					method="post">
					<input type="hidden" id="subjectId" name="subjectId"
						value="${subjectId}" /> <input type="hidden" id="subjectName"
						name="subjectName" value="${subjectName}" /> <input type="hidden"
						id="orgId" name="orgId" value="${orgId}" /> <input type="hidden"
						id="orgName" name="orgName" value="${orgName}" />
				</form>
				<ul id="api_list">

				</ul>
			</div>
			<div class="pageye pagination" id="Pagination"></div>
		</div>
		<website:widget path="developer/apiRec.jsp" />
	</div>
</div>
<!--详情END-->
