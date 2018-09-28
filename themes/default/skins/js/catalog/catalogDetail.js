

$(function(){
	//初始化数据格式显示
	//基本信息处
	var catalog_format = $("#detail-format").attr("catalog_format");
	if(catalog_format){
		catalog_format = catalog_format.split(",");
		var html = "";
		for(var i=0;i<catalog_format.length;i++){
			if(catalog_format[i]==1){
				html += '<span class="format format-xls">XLS</span>';
			}else if(catalog_format[i]==2){
				html += '<span class="format format-xml">XML</span>';
			}else if(catalog_format[i]==3){
				html += '<span class="format format-json">JSON</span>';
			}else if(catalog_format[i]==4){
				html += '<span class="format format-lbs">CSV</span>';
			}
		}
		$("#detail-format").append(html);
	}
	
	
	//标签
	var tags = $("#cata_tags").attr("tags");
	if(tags){
		tags = tags.replace( /,/g, "、");
		 $("#cata_tags").html(tags);
	}else{
		$("#cata_tags").html("无");
	}
	
});


//交互效果
//var tableWidth = 828;//表格宽度
$(function() {
	var renderCurTab = function(target){
		target = target||$(".m-tab>.tab-header>ul>li.active").attr("target");
		if(target == "data-info"){
			
    	}else if(target == "data-table"){
    		if($("#ext_app_iframe_datalist").attr('src') == ''){
    			$("#ext_app_iframe_datalist").attr('src',ananly+"/data/catalogDataList.htm?cata_id="+cata_id); 
    		}
    		
    	}else if(target == "data-chart"){
    		if($("#ext_app_iframe_dataanaly").attr('src') == ''){
    			$("#ext_app_iframe_dataanaly").attr('src',ananly+"/data/catalogAnaly.htm?cata_id="+cata_id); 
    		}
    		
    	}else if(target == "data-map"){
    		if($("#ext_app_iframe_map").attr('src') == ''){
    			$("#ext_app_iframe_map").attr('src',ananly+"/data/catalogMap.htm?cata_id="+cata_id); 
    		}
    		
    	}else if(target == "data-download"){
    		if(DownloadFileList){
    			DownloadFileList.init();
    		}
    	}else if(target == "data-api"){
    		if(APIList){
    			APIList.init();
    		}
    	}else if(target == "data-relaction"){
    		if(CatalogRelatedInfo){
    			CatalogRelatedInfo.init();
    		}
    	}
	};
	
	$("body .m-tab").bind("tabChange", function (event, target, message2) { 
		renderCurTab(target);
    });
	
	if($('.m-tab').attr("cur_target")!=""){
		var cur = $('.m-tab').attr("cur_target");
		$('.m-tab>.tab-header>ul>li').each(function(){
			if($(this).attr("target") == cur){
				$(this).addClass('active').siblings().removeClass('active');
				$(this).parent().parent().siblings('.tab-body').children().children('li').hide();
				$(this).parent().parent().siblings('.tab-body').children().children('li[action="'+cur+'"]').show();
			}
		});
		$("body .m-tab").trigger("tabChange", [cur,""]);  
	}    
});

function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}

