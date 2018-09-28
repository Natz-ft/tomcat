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
					3.2接入流程
				</div>
				<div class="des-body">
				<p>应用有完整的接入体系，方便平台统一管理，基于平台开发第三方应用，首先需要成为开发者。对需接入办事服务应用到平台的各委办局，平台会统一分配账号，提供统一的接入入口。有了平台开发者账号，需先注册应用得到应用Id和密钥，用于调用平台接口的应用身份认证。若需要高级接口可以权限申请，应用开发完成之后，提交审核，审核通过之后应用上线，在平台正式运营，可以被推荐、评价、搜索等。</p>
				<p>基于服务中心创建应用，需要以下五个步骤：</p>
				<span class="accessProcess_img"> </span>
				<p>进入服务中心首页，可以选择创建应用的类型，目前平台提供了四种应用，分别是站内应用、站外应用接入、移动应用以及桌面应用。其中，站内应用是开放平台为第三方提供应用框架，第三方将产品接入平台运营的一种合作模式；站外应用接入是为第三方网站提供的接入服务，为第三方网站和开发者提供简单、有效的合作模式以及全新的推广渠道；移动应用主要针对手机客户端，支持IOS、Andriod两种主流的终端类型；桌面应用即为PC客户端，支持windows、mac与linux三种操作系统。</p> 
				</div>
			</div>
		</div>
	</div>
</div>