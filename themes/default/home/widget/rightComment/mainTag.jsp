<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<website:script src="js/utils/tags-ball.js" />
<style>
    .keyword-list {
        width: 240px;
        height: 250px;
        position: relative;
        font-size: 12px;
        color: #333;
        margin: 0 auto;
        text-align: center;
    }
    .keyword-list a {
        position: absolute;
        top: 0;
        left: 0;
        color: #0287ca;
        text-decoration: none;
        padding: 3px 6px;
        font-family: "Microsoft Yahei";
    }
</style>
<div class="cata-hot-tag">
    <div class="right-title">
        <span>数据云图</span>
    </div>
    <div class="keyword-list" id="keyword-list">
    	 <c:forEach var="tag" items="${ tagInfos}">
    		<a href="javascript:void(0)">${tag.tag_name}</a>
    	</c:forEach>
    </div>
</div>