<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="f" %>
<div class="detail-download">
    <div class="content-title">
        <i class="iconfont">&#xe684;</i>文件数据下载
		<span style="color: red;font-size: 12px;">(提示:仅支持10000之内的数据下载，超出的使用API接口获取)</span>
    </div>
    <div class="download-list" >
        <ul id="download-file-ul">
        </ul>
    </div>
</div>
<script id="download-file-div" type="text/html">
<? if(data){ ?>
	<? for(var j = 0;j<data.length;j++){ ?>
		<li>
			<div class="download-header">
				<? if(data[j].fileFormat == 'zip'){ ?>
			    	<?= data[j].fileDescription ?>
				<? }?>
				<? if(data[j].fileFormat != 'zip'){ ?>
					<?= data[j].fileFormat ?>
				<? }?>
			    	  格式下载</div>
		  <div class="download-body">
			 <a href="javaScript:void(0)"  class="downloadFileLink" id="<?= data[j].fileId ?>" >
			 <i class="iconfont icon-yunxiazai"></i><?= data[j].fileName ?>.<?= data[j].fileFormat ?>   &nbsp;&nbsp;<?= data[j].updateTime ?></a>
		 </div>
	</li>
<? }}?>
<? if(!data || data.length<=0){ ?>
<li>暂无数据文件</li>
<? }?>
</script>
