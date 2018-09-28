<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<!---- 数据详情页面 - 数据地图部分，直接iframe嵌入，不再做样式 ---->
<div class="m-dt-main">
    <div class="dt-content">
        <div class="dt-section">
            <div class="dt-sec-content">
                <iframe style="width: 100%;height: 610px;" id="data_map_view" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</div>
<script>
    function mapTabInit(cata_id){
    	var map_url = "${fn:getConfValue('global.index.dataanaly')}/data/catalogMap.htm?cata_id="+cata_id;
        $("#data_map_view").attr("src",map_url); 
        var mainheight = $("#data_map_view").contents().find("body").height()+30;
        $("#data_map_view").height(mainheight);
    }
</script>