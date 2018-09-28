<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
.detail-right .detail-relatedInfo .relatedInfo-list {
    margin: 10px 0;
}
.detail-right .detail-relatedInfo .relatedInfo-list ul li {
    font-family: "Microsoft Yahei";
    color: #2578c4;
    overflow: hidden;
    margin-bottom: 1px;
}
.detail-right .detail-relatedInfo .relatedInfo-list ul li .relatedInfo-header {
    width: 250px;
    float: left;
    padding: 20px 10px;
    background-color: #f7f7f7;
    text-align: center;
    color: #555;
    height: 80px;
    }
    .detail-right .detail-relatedInfo .relatedInfo-list ul li .relatedInfo-body {
    margin-left: 251px;
    padding: 20px 20px;
    background-color: #fbfbfb;
}
    </style>
  
<div class="detail-relatedInfo">
       <div class="content-title">
           <i class="iconfont">&#xe684;</i>关联目录
       </div>
       <div class="relatedInfo-list">
           <ul id="catalog-related-ul">
           </ul>
       </div>
       <div class="content-title">
           <i class="iconfont icon-shezhi"></i>关联应用
       </div>
       <div class="relatedInfo-list">
           <ul id="app-related-ul">
           </ul>
       </div>
   </div>
  <script id="catalog-related-div" type="text/html">
<? if(data){ ?>
	<? for(var j = 0;j<data.length;j++){ ?>
		<li>
			<a target="_blank" href="${fn:getConfValue('global.index.odweb')}/catalog/catalogDetail.htm?cata_id=<?= data[j].cata_id ?>">
			    <div class="relatedInfo-header"><?= data[j].cata_title ?></div>
			</a>
			<div class="relatedInfo-body">
			     <div>数据总量：
					<? if(data[j].catalogStatistic && data[j].catalogStatistic.data_count){ ?>
						<?= data[j].catalogStatistic.data_count ?>
			        <? }?>
			    </div>
			    <div style="overflow: hidden;height: 20px;">目录简介：<?= data[j].description ?></div>
			</div>
	  </li>
<? }}?>
<? if(!data || data.length == 0){ ?>
<li>暂无关联数据目录信息</li>
<? }?>
</script>

<script id="app-related-div" type="text/html">
<? if(data){ ?>
	<? for(var j = 0;j<data.length;j++){ ?>
	 <li>
	    <div class="relatedInfo-header">应用名称：<?= data[j].app_alias ?></div>
	        <div class="relatedInfo-body">
	        <div>创建时间：<?= data[j].createtime ?></div>
	        <div>应用简介：<?= data[j].description ?></div>
	    </div>
	</li>	
<? }}?>
<? if(!data || data.length == 0){ ?>
<li>暂无关联应用信息</li>
<? }?>
</script>
   
   