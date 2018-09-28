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
	$(".add-group-btn").live("click",function(){
		var gid = $(this).attr("action-gid");
		if(!gid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		if(typeof addGroup == "undefined") return;
		var data = {group_id : gid};
		$.ajax({
			type : "POST",
			url : addGroup,
			data : data,
			success : function(result) {
				result = eval('('+result+')');
				if(result.success){
					dialog.success(result.info,function(){
						$(infoIntroHover).find('a').removeClass("info-atten-btn").removeClass("add-group-btn").addClass("info-atten-label");
						$(".info-atten-label").html('<span class="info-atten">已申请</span>');
					});
				}else{
					dialog.error("申请失败，请稍后重试。")
				}
			},
			error : function(data) {
				dialog.error("由于网络原因，申请失败，请稍后重试。");
			}
		});
		
	});
	
});
function searchByNickName(){
	var sechName_input = $("#nick-name-input");
	var sechName = sechName_input.val();
	if($.trim(sechName) !== ""){
		window.location.href = findUrl+"?sech="+sechName;
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