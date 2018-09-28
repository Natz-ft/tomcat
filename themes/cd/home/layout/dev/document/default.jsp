<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:html>
<!-- 输出header -->
<website:head>
	<website:meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
	<website:title>开发者中心文档</website:title>
	<website:style href="css/base.css" />
	<website:style href="css-open/header.css" />
	<website:style href="css-open/footer.css" />
	<website:style href="css-open/core.css" />
	<website:style href="${fn:getHome()}/favicon.ico" rel="Bookmark" type="image/x-icon"/>
    <website:style href="${fn:getHome()}/favicon.ico" rel="icon" type="image/x-icon"/>
    <website:style href="${fn:getHome()}/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
	<website:script src="js/utils/jquery-1.7.1.min.js"/>
	<website:script src="js/utils/core.js"/>
	<website:script src="js/utils/layer.min.js"/>
	<website:script src="js/utils/template.js"/>
	<website:script src="dist/js/common.js"/>
	<website:script src="js/utils/seajs/2.1.1/sea.js"/>
</website:head>
<script>
		var $_CONFIG = {};
		$_CONFIG['jsbase'] = "${fn:getUrl('js')}";//静态js资源的根址
		$_CONFIG['jsver'] = Math.random();//静态js资源的版本,测试时使用随机数刷新浏览器缓存
	</script>
	<script>
		seajs.config({
				base: $_CONFIG['jsbase'],
				paths: {
					'lib': 'util',
					'modules': 'open'
				},
				alias: {
					'jquery': 'lib/jquery-1.7.1.min.js',
					'template': 'lib/template.js'
				},
				map: [
					['.js', '.js?v='+ $_CONFIG['jsver']]
				],
				
				charset: 'utf-8'
			});		
	</script>
<body>
<website:widget path="dev/components.jsp"/>
	<website:widget path="header.jsp"/>
	<website:screenHolder/>
	<website:widget path="footer.jsp"/>
</body>
</website:html>
