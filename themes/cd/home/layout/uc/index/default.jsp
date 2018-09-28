<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="none"%>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:title>${title}</website:title>
<website:head>
<website:meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
<website:style href="css/uc/base.css"/>
<website:style href="css/uc/layout.css"/>
<website:style href="css/uc/tool.css"/>
<website:style href="css/uc/form.css"/>
<website:style href="css/uc/common.css"/>
<website:style href="css/uc/jquery-ui-1.8.18.custom.css"/>
<website:style href="css/uc/belogin.css"/>
<script type="text/javascript">
	var sys_ucURL = "${fn:getConfValue('global.index.odweb')}";
</script>
<%-- <website:script src="js/uc/jquery.js" /> --%>
<website:script src="libs/vendor/jquery.min.js" />
<website:script src="libs/vendor/jquery-migrate-1.4.1.min.js" />
<website:script src="js/uc/scrolltopcontrol.js" />
</website:head>
<website:style href="images/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
	<%-- <%
		String meta_pageType = String.valueOf(request.getAttribute("meta_pageType")) ;
	%> --%>
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
							<div class="signup-main" style="border: 1px solid #DDF3F8;">
								<website:screenHolder />
							</div>
						</div>
	         		</div>
         	</div>
          	<div id="i_footer_public">
          		<div class="footer" style="text-align: center;">
					<website:widget path="footer.jsp"/>
				</div>
			</div>
    </body>
</html>