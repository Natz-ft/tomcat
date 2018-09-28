<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!---- 数据详情页面 - 文件下载部分 ---->
<div class="m-dt-main">
    <div class="dt-side g-right">
        <div class="dt-section">
            <div class="dt-sec-title">相关文件</div>
            <div class="dt-sec-content">
                <div class="dt-relate-list">
                    <ul>
                    	<c:choose>
                    		<c:when test="${!empty catalogFiles}">
		                    	<c:forEach items="${catalogFiles}" var="item">
			                        <li><a href="${fn:getLink('catalog/catalogDetail.htm?cata_id=')}${item.catalogId}" target="_blank" title="${item.fileName}">${item.fileName}</a></li>
			                    </c:forEach>
			                </c:when>
		            	</c:choose>                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="dt-section">
            <div class="dt-sec-title">热门文件</div>
            <div class="dt-sec-content">
                <div class="dt-relate-list">
                    <ul>
                    	<c:choose>
                    		<c:when test="${!empty hotFiles}">
		                    	<c:forEach items="${hotFiles}" var="item">
			                        <li><a href="${fn:getLink('catalog/catalogDetail.htm?cata_id=')}${item.cata_id}" target="_blank" title="${item.file_name}">${item.file_name}</a></li>
			                    </c:forEach>
	                    	</c:when>
	                    </c:choose>                       
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="dt-content">
    	<input type="hidden" name="cata_id" id="cata_id" value="${cata_id}">
        <div class="dt-section">
            <div class="dt-sec-content">
                <table id="fileTable" class="m-table table-hover dt-table">
                    <thead>
                    <tr>
                        <th width="40px">序号</th>
                        <th>文件名称</th>
                        <th width="190px">发布时间</th>
                        <th width="80px">数据量</th>
                        <th width="80px">下载量</th>
                        <th width="240px">文件下载</th>
                    </tr>
                    </thead>
                    <tbody id="catalog-list">
                    </tbody>
                </table>
                <div class="m-page pagination pg-info pg-corner pg-sm" id="Pagination">
                    <span class="current prev disabled">首页</span>
                    <span class="current prev">上一页</span>                   
                    <a style="cursor:pointer" class="next">下一页</a>
                    <a style="cursor:pointer" class="prev disabled">末页</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function fileTabInit(){
    	var pageSize = 15; //每页显示条数初始化，改变显示条数修改这里即可
    	var renderPage = function(data,strat){
        	var html = "";
        	if(data!=null && data.length>0){
    	    	for(var j=0;j<data.length;j++){
    	    		html +='<tr>';
    	    		html +='<td>'+ (strat + parseInt(j+1)) +'</td>';
    	    		html +='<td>'+ data[j].file_name +'</td>';
    	    		html +='<td>'+ formatTimes(data[j].update_time,false)+'</td>';
    	    		html +='<td>'+ (data[j].data_count || 0) +'</td>';
    	    		html +='<td>'+ (data[j].download_count || 0) +'</td>';
    	    		html +='<td>';
                	var format = 'zip';
                	if(data[j].file_formats == 'zip') {
                		if(data[j].file_name.indexOf('xls') != -1) {
                			format = 'xls';
                		}else if(data[j].file_name.indexOf('json') != -1) {
                			format = 'json';
                		}else if(data[j].file_name.indexOf('xml') != -1) {
                			format = 'xml';
                		}else if(data[j].file_name.indexOf('csv') !=-1) {
                			format = 'csv';
                		}
                		html += '<a  href="javaScript:void(0)" class="wid-format dt-'+format+'" onclick="downFile(\''+data[j].file_id+'\')" >'+format+'</a>';
                	}else if(data[j].file_formats != 'zip') {
                		var formats = data[j].file_formats.split(",");
                		var fileIds = data[j].file_id.split(",");
                		var length = formats.length;
                		for (var i = 0; i< length;i++) {
                			format = formats[i];
                			if (format) {
                				if (format != 'xml' && format !='json' && format != 'csv' && format != 'lbs' && format != 'xls') {
                					html += '<a  href="javaScript:void(0)" class="wid-format dt-other" onclick="downFile(\''+fileIds[i]+'\')" >'+format+'</a>';
                    			} else {
                    				html += '<a  href="javaScript:void(0)" class="wid-format dt-'+format+'" onclick="downFile(\''+fileIds[i]+'\')" >'+format+'</a>';
                    			}
                			}
                		}
                	}
    	    		html +='</td></tr>';    	    		    	    		
    	    	}
    	    	$("#catalog-list").html(html);
        	}
        };

        //加载数据。stratnum:开始记录数，setAll：是否初始化总数据
        var loadData = function(strat,setAll){
        	var cata_id = $('#cata_id').val();
        	strat=strat||0;
        	setAll=setAll||false;
        	var param = {};
        	param['start'] = strat;
        	param['length'] = pageSize;
        	param['pageLength'] = pageSize;

        	dialog.loading({text:'加载中',parent:$('body')});
        	$.ajax({
        		url:getRootPath() +"/catalog/CatalogDetail.do?method=getDownFileList&cata_id="+cata_id,
    			type: "POST",
    			data: param,
    			dataType: "json",
    			success: function(ret){
    				debugger;
    				$('body>.dialog-loading').modal('hide');
    				if(ret){        					
    					if(ret.recordsTotal>0){
    	    				var data=ret.data;
    	    				renderPage(data,strat);
    	    				if(strat==0){
    	    					initPage(ret.recordsTotal,pageSize);
    	    				}
    	    			}else{
    	    				$('#catalog-list').html('<td colspan="6">暂无数据</td>');
    	    				$('#Pagination').hide();
    	    			}
    				}else{        				
    					$('#catalog-list').html('<td colspan="6">暂无数据</td>');
    	    			$('#Pagination').hide();
    				}

    	  		},error:function(e){    				
    	  			dialog.info('请求失败，请稍后重试',function(){},3000);
    	  			$('body .side-content>.dialog-loading').modal('hide');
    	  		}
    		});
        }
        var pageCallback = function(index, jq) {
        	loadData(index*pageSize,false);
        };
        var initPage = function(count, pageSize){
        		var count = parseInt(count);
        		var pageSize = parseInt(pageSize);
        		if(count > pageSize){
        			$("#Pagination").show();
        			 $("#Pagination").pagination(count, {
        			        num_edge_entries: 3,//连续分页主体部分分页条目数
        			        num_display_entries: 4,//两侧首尾分页条目数
        			        items_per_page: pageSize,//每页的数据个数
        			        callback: pageCallback//回调函数
        			    });
        		}
        		else{
        			$("#Pagination").hide();
        		}
        };
        //开始加载第一页数据，并初始化总数据       
    	loadData(0,false);
    }
  //获取工程根路径
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
    
    function downFile(id) {
    	//var fileId = $(this).val();
    	$.ajax({
    		url:getRootPath()+"/catalog/catalogDetail.do?method=CheckLogin",
    		type: "POST",
    		dataType: "json",
    		success: function(ret){
    			if("000000" == ret.code){
    				checkDownAuth(id);
    				//location.href=getRootPath()+"/catalog/catalogDetail.do?method=getFileDownloadAddr&fileId="+id;
    			}else{
    				$('#bounceIn').click();
    			}
      		},error:function(e){
      			dialog.info('网络异常，请稍后再试',function(){},3000);
      		}
    	});
    }
   	function checkDownAuth(id) {
   		$.ajax({
   			url:getRootPath()+"/catalog/catalogDetail.do?method=CheckDownloadAuth",
   			type: "POST",
   			dataType: "json",
   			data : {
   				"fileId" : id
   			},
   			success: function(ret){
   				if("0000" == ret.code){
   					location.href=getRootPath()+"/catalog/catalogDetail.do?method=getFileDownloadAddr&fileId="+id;
   				}else{
   					dialog.info(ret.msg,function(){},3000);
   				}
   	  		},error:function(e){
   	  			dialog.info('网络异常，请稍后再试',function(){},3000);
   	  		}
   		});
   	}

   	function formatTimes(timestamp, boolean) {
   	    var time = new Date(timestamp),
   	        year = time.getFullYear(),
   	        month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
   	        date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
   	        hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
   	        min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
   	        sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
   	    if (boolean) {
   	        return year + '年' + month + '月' + date + '日';
   	    } else {
   	        return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
   	    }
   	}
</script>