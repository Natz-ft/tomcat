$(document).ready(function() {
	$("#search_by_nickname").on("click",function(){
		searchByNickName();
	});
	// enter 键
	 $("#nick-name-input")[0].onkeydown = function(event){
	    var e = event || window.event || arguments.callee.caller.arguments[0];   
	     if(e && e.keyCode==13){ // enter 键
	    	 searchByNickName();
	    }
	};
	//yaoqing
	$(".info-atten-btn").live("click",function(){
		var afid = $(this).attr("action-fid");
		var nick_name = $(this).attr("act-name");
		if(!afid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		var changeIntive = function(){
			var ihtml = '<em class="info-atten-icon info-atten-icon-one"></em>'+
						'<em class="vline" style="margin-left:0px;">|</em>&nbsp;已邀请';
			$(infoIntroHover).find(".info-atten").html(ihtml);
			$(infoIntroHover).find('a').removeClass("info-atten-btn").addClass("info-atten-label");
		};
		if(typeof addInviteUrl == "undefined") return;
		var data = {fid : afid,gid:gid,nick_name:nick_name};
		$.ajax({
			type : "POST",
			url : addInviteUrl,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success("邀请成功",changeIntive);
				}else{
					dialog.error("邀请失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，邀请失败，请稍后重试。");
			}
		});
		
	});
	
	
});
function searchByNickName(){
	var sechName_input = $("#nick-name-input");
	var sechName = sechName_input.val();
	if($.trim(sechName) !== ""){
		window.location.href = localhrefUrl+"&sech="+sechName;
	}else{
		sechName_input.addClass("bg-red");
		$(".please_input_tip").show();
		sechName_input.on("focus",function(){
			$("#search_by_nickname").removeClass("bg-red");
			$(".please_input_tip").hide();
		})
	}
	return false;
}