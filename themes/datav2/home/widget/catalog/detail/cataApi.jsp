<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<!---- 数据详情页面 - API服务部分 ---->
<div class="m-dt-main">
    <div class="dt-side g-left api-side">
        <div class="dt-section">
            <div class="dt-sec-title">API列表</div>
            <div class="dt-sec-content">
                <div class="dt-api-list">
                    <ul>
                    	<c:choose>
                    		<c:when test="${!empty cataApi}">
                    			<c:forEach items="${ cataApi}" var="item">
                    				<li id="${item.open_service_id }">${item.open_service_name}</li>
                    			</c:forEach>
                    		</c:when>
                    	</c:choose>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="dt-content" id="cataAPIInfo">
       <%-- <website:widget path="catalog/detail/catalogApiInfo.jsp"/> --%>
    </div>
</div>
<script>
  function getRootPath(){  
	    //获取当前网址，如： http://localhost:8088/test/test.jsp  
	    var curPath=window.document.location.href;  
	    //获取主机地址之后的目录，如： test/test.jsp  
	    var pathName=window.document.location.pathname;  
	    var pos=curPath.indexOf(pathName);  
	    //获取主机地址，如： http://localhost:8088  
	    var localhostPaht=curPath.substring(0,pos);  
	    //获取带"/"的项目名，如：/test  
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
	    return(localhostPaht+projectName);  
	}; 
	
    function apiTabInit(){
    	//渲染右边服务详情内容
    	var renderRightWidget = function(service_id){
    		var url = getRootPath()+"/catalog/detail/catalogApiInfo.htm?isWidget=true";
    		$.ajax({
    			url: url,
    			type:"post",
    			data:{"service_id":service_id},
    			dataType:"html",
    			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
    			success: function(data){
    				$("#cataAPIInfo").html(data);
    	  		}
    		});
    	};
    	//第一次初始化右边服务详情内容
    	var cur_service_id = $('.dt-api-list>ul>li').eq(0).attr("id");
    	if(cur_service_id){
    		renderRightWidget(cur_service_id);
    	}else{
    		$("#cataAPIInfo").html("暂无相关服务");
    	}
    	//点击左侧api列表更新右边服务详情内容
        $('.dt-api-list>ul>li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            var service_id = $(this).attr('id');
            if(service_id){
            	renderRightWidget(service_id);
            }
            
        });
    }
</script>