$(document).ready(function() {
	$(".quit-group").live("click",function(){
		var gid = $(this).attr("act-gid");
		if(!gid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		var changeInvite = function(){
			$(infoIntroHover).parent(".mygroup_item").remove();
		};
		if(typeof quitGroupUrl == "undefined") return;
		var data = {gid : gid};
		$.ajax({
			type : "POST",
			url : quitGroupUrl,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success("退出成功",changeInvite);
				}else{
					dialog.error("退出失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，删除失败，请稍后重试。");
			}
		});
	});
});