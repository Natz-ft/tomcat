$(document).ready(function() {
	$(".info-atten-btn").live("click",function(){
		var afid = $(this).attr("action-fid");
		if(!afid){
			return false;
		}
		var $this = $(this);
		if(typeof acceptUrl == "undefined") return;
		var data = {fid : afid,gid:gid};
		$.ajax({
			type : "POST",
			url : acceptUrl,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success("批准成功",function(){
						window.location.href = window.location.href;
					});
				}else{
					dialog.error("批准失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，批准失败，请稍后重试。");
			}
		});
		
	});
	
	
});
