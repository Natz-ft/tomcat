<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>

<website:style href="css/dev/document/dev_admin_entrance.css" />
<script type="text/javascript">
if(document.getElementById("nav-doc")){
	document.getElementById("nav-doc").setAttribute("class", "nav-item on");
}
</script>
<div class="body-wrap clearfix">
	<website:widget path="dev/document/leftNav.jsp?cur_css=unAuditedApps" />
	<div class="wrap_content clearfix">
		<div class="devbox cont_main main_pad clearfix" style="background-color: #ffffff;">
			<div class="des-box">
				<div class="form-title">
					1.2平台价值
				</div>
				<div class="des-body">
				 <p style="margin-top:15px;">服务中心的核心价值在于通过自身服务和第三方应用的互利互惠，提高用户对应用和平台的整体体验和粘度。平台的开放化使得资源汇聚，让平台运营
					方本身保持了自己的优势；开放平台也提供了全新的推广渠道、商业模式与海量客户源，从而也为平台上的应用提供商带来了价值倍增的全新空间。
				</p> 
				
				<div class="desc_title" id="1.2.1">1.2.1 跨部门的资源共享与应用整合</div>
				<p>跨部门的资源共享与应用整合。信息中心可借助平台信息共享和应用整合打破各部门信息孤岛，使得各部门之间共享资源，形成良性循环，从被动的IT服务部门向信息化主导部门转变。</p>
				<div class="desc_title" id="1.2.2">1.2.2 应用碎片化、水平化拓展</div>
				<p>应用碎片化、水平化拓展。将企业庞大、臃肿的应用碎片化，使得应用更加轻量级，减少对应用的维护成本，同时，轻量级应用更易于分类、检索、统计，方便企业将优质的应用资源推送给用户。</p>
				<div class="desc_title" id="1.2.3">1.2.3 一体化应用，一站式服务</div>
				<p>一体化应用，一站式服务。政府或者企业各部门开发的应用通过平台进行接入整合，统一通过平台应用商店进行展现。用户在使用各种服务时只需要唯一登陆就可以使用所有的服务，真正实现统一平台、统一身份，一站式服务。 </p>
				</div>
			</div>
		</div>
	</div>
</div>