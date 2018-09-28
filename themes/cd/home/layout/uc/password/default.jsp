<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="none"%>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:title>${title}</website:title>
<website:head>
<website:meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
<website:style href="css/base.css"/>
<website:style href="css/uc/layout.css"/>
<website:style href="css/uc/tool.css"/>
<website:style href="css/uc/form.css"/>
<website:style href="css/uc/common.css"/>
<website:style href="css/uc/belogin.css"/>
<script type="text/javascript">
	var sys_ucURL = "${fn:getConfValue('global.index.ucweb')}";
</script>
<website:script src="js/uc/jquery.js" />
<website:script src="js/uc/scrolltopcontrol.js" />
</website:head>
<website:style href="images/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
    <body class="page-home common-page-home belogin-page-home">
    		<div class="header-holder">
 				<website:widget path="uc/header-nologin.jsp"/>
 			</div>
 			<div class="content-holder">
				<div class="content">
					<div class="signup-center">
						<div class="signup-title">
							<h1 >
								<span class="signup-tip do-tips">
									${meta_title}
								</span>
							</h1>
						</div>
						<div class="signup-main content-contain">
							<website:screenHolder />
						</div>
					</div>
         		</div>
         	</div>
         	<div id="i_footer_public">
				<website:widget path="footer.jsp"/>
			</div>
    </body>
</html>