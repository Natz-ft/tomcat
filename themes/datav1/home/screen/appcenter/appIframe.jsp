<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<script>
function  pseth() {
    var iObj = parent.parent.document.getElementById('iframepage');//A和main同域，所以可以访问节点
    iObjH = location.hash;//访问自己的location对象获取hash值
    iObj.style.height = iObjH.split("#")[1]+"px";//操作dom
}
pseth();
</script>