$(document).ready(function() {
	$(".accept-invite").live("click",function(){
		var gid = $(this).attr("act-gid");
		if(!gid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		var changeInvite = function(){
			$(infoIntroHover).parent(".mygroup_item").remove();
        };
		if(typeof acceptInviteUrl == "undefined") return;
		var data = {gid : gid};
		$.ajax({
			type : "POST",
			url : acceptInviteUrl,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success("接受邀请成功",changeInvite);
				}else{
					dialog.error("接受邀请失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，接受邀请失败，请稍后重试。");
			}
		});
	});
	$(".cancle-invite").live("click",function(){
		var gid = $(this).attr("act-gid");
		if(!gid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		var changeInvite = function(){
			$(infoIntroHover).parent(".mygroup_item").remove();
		};
		if(typeof delInviteUrl == "undefined") return;
		var data = {gid : gid};
		$.ajax({
			type : "POST",
			url : delInviteUrl,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success("删除成功",changeInvite);
				}else{
					dialog.error("删除失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，删除失败，请稍后重试。");
			}
		});
	});
});