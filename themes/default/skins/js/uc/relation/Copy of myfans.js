$(document).ready(function() {
	$(".myfan_item").hover(function(){
		$(this).addClass("myfan_item_hover");
	},function(){
		$(this).removeClass("myfan_item_hover");
	});
	$(".myfan_item").find(".photo").hover(function(){
		//显示窗口
	},function(){
		//隐藏窗口
	});

	//加关注
	$(".info-atten-btn").on("click",function(){
		var afid = $(this).attr("action-fid");
		if(!afid){
			return false;
		}
		var $this = $(this);
		var changeAtten = function(){
            if(afid){
            	  $this.parents(".info-intro-hover:first").find(".info-atten-label").show();
            	  $this.remove();
            }
		};
		if(typeof addFollowUrl == "undefined") return;
		var data = {fid : afid};
		$.ajax({
			type : "POST",
			url : addFollowUrl,
			data : data,
			success : function(data) {
				if(data){
					changeAtten();
				}else{
					alert("关注失败，请稍后重试。")
				}
			},
			error : function(data) {
				alert("由于网络原因，关注失败，请稍后重试。");
			}
		});
	});
});