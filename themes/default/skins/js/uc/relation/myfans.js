$(document).ready(function() {
	$(".myfan_item").hover(function(){
		$(this).addClass("myfan_item_hover");
	},function(){
		$(this).removeClass("myfan_item_hover");
	});

	//加关注
	$(".info-atten-btn").live("click",function(){
		var afid = $(this).attr("action-fid");
		if(!afid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		var changeAtten = function(){
			var ihtml = '<div  href="javascript:;" class="info-atten-label">'+
							'<span class="info-atten">'+
								'<em class="info-atten-icon info-atten-icon-two"></em>'+
								'&nbsp;互相关注'+
							'</span>'+
						'</div>';
			$(infoIntroHover).html(ihtml);
        };
		if(typeof addFollowUrl == "undefined") return;
		var data = {fid : afid};
		$.ajax({
			type : "POST",
			url : addFollowUrl,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success(result.info,changeAtten);
				}else{
					dialog.error("关注失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，关注失败，请稍后重试。");
			}
		});
		
	});
});