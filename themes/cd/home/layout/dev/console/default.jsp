<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
pageContext.setAttribute("context", request.getContextPath());
%>

<website:html>
<!-- 输出header -->
<website:head>
	<website:meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
	<website:title>开发者中心</website:title>
	<website:style href="css/base.css" />
	<website:style href="css-open/header.css" />
	<website:style href="css-open/footer.css" />
	<website:style href="css/common/login.css" />
	<website:style href="css-open/core.css" />
	<website:style href="css-open/menuleft.css" />
	<website:style href="css-open/opendata.css" />
	<website:style href="css-open/kfzzxyylb_style.css" />
	<website:style href="css-open/style.css" />
	<website:style href="/js/utils/layer/skin/layer.css" />
	<website:style href="${fn:getHome()}/favicon.ico" rel="Bookmark" type="image/x-icon"/>
    <website:style href="${fn:getHome()}/favicon.ico" rel="icon" type="image/x-icon"/>
    <website:style href="${fn:getHome()}/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
	<website:script src="libs/vendor/jquery.min.js" />
	 <%-- <website:script src="js/util/jquery-1.7.1.min.js"/> --%>
	<website:script src="js/dev/open/headersch.js"/>
	<website:script src="js/utils/core.js"/>
	<website:script src="js/utils/layer/layer.min.js"/>
	<website:script src="js/utils/template.js"/>
	<website:script src="js/utils/seajs/2.1.1/sea.js"/>
	<website:script src="js/utils/ueditor/ueditor.all.js"/>
	<website:script src="js/utils/ueditor/ueditor.all.min.js"/>
	<!-- 弹窗 -->
	<website:style href="css/easydialog.css"/>
	<website:script src="js/utils/easydialog.min.js"/>
	<website:script src="js/common/header.js"/>
</website:head>
	<script>
		var $_CONFIG = {};
		$_CONFIG['jsbase'] = "${fn:getUrl('js')}";//静态js资源的根址
		$_CONFIG['jsver'] = Math.random();//静态js资源的版本,测试时使用随机数刷新浏览器缓存
		
		//动态获取项目名称
		var proName = "${context}";
	</script>
	<script>
		seajs.config({
				base: $_CONFIG['jsbase'],
				paths: {
					'lib': 'utils',
					'modules': 'dev/open'
				},
				alias: {
					'jquery17': 'utils/jquery-1.7.1.min.js',
					'template': 'utils/template.js'
				},
				map: [
					['.js', '.js?v='+ $_CONFIG['jsver']]
				],
				preload: [
					'template',
					'utils/layer/layer'
				],
				debug:true,
				charset: 'utf-8'
			});		
	</script>

	<website:widget path="dev/components.jsp"/>
	<body class="page-home main-page-home page-home-big-w account-body">
		<div class="header-holder">
			<website:widget path="header.jsp"/>
		</div> 
		<div class="content-holder clearfix">
			<website:widget path="uc/open/menuNavN.jsp"/>
			<div class="contain-new clearfix" id="contain-new">
				<website:screenHolder/>
			</div>
    	</div>
		<website:widget path="footer.jsp"/>
	</body>

</website:html>
