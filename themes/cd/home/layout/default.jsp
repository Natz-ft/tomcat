<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<website:html>
	<website:title>成都市公共数据开放平台</website:title>
	<website:meta content="width=device-width, initial-scale=1" name="viewport" />
	<website:meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
	<website:widget path="components.jsp"/>
	<body>
		<website:widget path="header.jsp"/>
        <div class="m-container">
            <website:screenHolder/>
        </div>
        <website:widget path="footer.jsp"/>
	</body>
</website:html>
