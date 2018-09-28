$(document).ready(function() {
	//加关注
	$(".info-atten-btn").on("click",function(){
		debugger;
		var afid = $(this).attr("action-fid");
		if(!afid){
			return false;
		}
		var $this = $(this);
		var changeAtten = function(){
            if(afid){
            	if(typeof isFansUrl == "undefined") return;
            	//判断是否已关注我，如果关注，则是互相关注，否则只是关注
            	var data = {fid : afid};
				$.ajax({
					type : "POST",
					url : isFansUrl,
					
					data : data,
					success : function(data) {
						
						var attenLabelCls = ".info-atten-label-one";
						if(data == 1){
							attenLabelCls = ".info-atten-label-two";
						}
						$this.parents(".info-intro-hover:first").find(attenLabelCls).show();
						$this.remove();
					},
					error : function(data) {
						var attenLabelCls = ".info-atten-label-one";
						$this.parents(".info-intro-hover:first").find(attenLabelCls).show();
						$this.remove();
					}
				});
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
	
	var searchByNickName = function(){
		var nname_input = $(".search-fieldset").find("input[name='nick-name-input']");
		var nname = nname_input.val();
		if($.trim(nname) !== ""){
			window.location.href = $("#search_by_nickname").attr("tempHref")+"&find_type=by_nickname&nick_name="+nname;
		}else{
			nname_input.addClass("bg-red");
			$(".please_input_tip").show();
			nname_input.on("focus",function(){
				$("#search_by_nickname").removeClass("bg-red");
				$(".please_input_tip").hide();
			})
		}
		return false;
		
	};
	// enter 键
	$(".search-fieldset").find("input[name='nick-name-input']")[0].onkeydown = function(event){
	    var e = event || window.event || arguments.callee.caller.arguments[0];   
	     if(e && e.keyCode==13){ // enter 键
	    	 searchByNickName();
	    }
	};
	$("#search_by_nickname").on("click",function(){
		searchByNickName();
	});
});
