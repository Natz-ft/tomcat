<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<iframe
	src="${dataanaly_context}/data/catalogAnaly.htm?cata_id=${dataCatalog.cata_id}"
	id="ext_app_iframe" name="ext_app_iframe" width="100%" height="100%"
	frameborder="0"></iframe>
