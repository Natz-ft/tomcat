$(function () {
	var listul = $("#listul");
	$.ajax({
	    type: "POST",
	    url: getRootPath()+"/analyse/index.do?method=GetCataLogTagAndCount",
	    dataType: "json",
	    success: function(data){
	    	var dataarr = new Array();
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				dataarr.push("<li class='bq_bgpage1'><span class='bq_roster'>"+(i+1) + "</span><span>"+obj.tag_name+"</span><span class='bq_num'>"+obj.count+"次</span></li>");
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
				easyDialog.open({
					container : {
						content : '网路异常'
					},
					autoClose : 2000
				});
			}
	});
});