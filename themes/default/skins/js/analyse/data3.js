$(function () {
	var listul = $("#listul");
	$.ajax({
	    type: "POST",
	    url: getRootPath()+"/analyse/index.do?method=GetCataLogTagAndCount",
	    dataType: "json",
	    success: function(data){
	    	var dataarr = new Array();
	    	var count = 0;
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				if(obj.tag_name !== null){
					count++;
				//	dataarr.push("<li class='bq_bgpage1'><span class='bq_roster'>"+(i+1) + "</span><span><a style='color:#ffffff;' target='_blank' href='"+catalogUrl+""+obj.tag_name+"'>"+obj.tag_name+"</a></span><span class='bq_num'>"+obj.count+"次</span></li>");
				dataarr.push("<li class='bq_bgpage1'><span class='bq_roster'>"+(count) + "</span><span style='color:#ffffff;'  >"+obj.tag_name+"</span><span class='bq_num'>"+obj.count+"次</span></li>");
				}	
			}
			listul.append(dataarr.join(''));
			var count=0;
			$(".bq_bgpage1").each(function(){
				count++;
				if(count >5){
					$(this).addClass('bq_bgpage2');
				}
			})

			
	    },
	     error : function(dataq) {
				dialog.info('网络异常',function(){},2000);
			}
	});
});