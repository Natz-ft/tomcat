/**
 * ajax请求widget的html片段
 * @param id要显示的内容的容器id；widgetUrl要请求的widget链接地址
 * @param widgetUrl
 */
function widgetLoad(id,widgetUrl){
	var $holder = $("#" + id);
	//ajax请求widget
	$.ajax({
		type : "POST",
		url : widgetUrl,
		data : {district:district},
		success : function(data) {
			$holder.replaceWith(data);
			hideNone();
		},
		error : function(data) {
			$holder.html("由于网络原因,请求失败，请稍后重试<a id='"+ id +"_refresh' hideFocus='shidefocus'>刷新</a>");
			hideNone();
			$("#" + id + "_refresh").live("click",function(){
				widgetLoad(id,widgetUrl);
			});
		}
	});
}
//收缩没有内容的widget
function hideNone(){
	$(".w-cnt-contain").each(function(){
		var $this = $(this);
		if($this.closest(".widget").find(".desc-arrow").length == 0){
			return;
		}
		if(($this.contains("出错") && $this.contains("刷新")) || ($this.find("tr").length == 0 && $this.find("li").length == 0 && $this.find("iframe").length == 0)){
			$this.slideUp(500);
			$this.closest(".widget").find(".desc-arrow").addClass("arrowDown");
		}
	});
	
//	$(".w-cnt").each(function(){
//		var $this = $(this);
//		if($this.closest("w-cnt-contain").length > 0){
//			return;
//		}
//		if($this.find("tr").length == 0 && $this.find("li").length == 0 && $this.find("iframe").length == 0){
//			$this.slideUp(500);
//		}
//	});
	
}

