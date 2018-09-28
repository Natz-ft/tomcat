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
	//加关注
	$(".info-atten-btn").live("click",function(){
		var afid = $(this).attr("action-fid");
		if(!afid){
			return false;
		}
		var $this = $(this);
		var infoIntroHover = $this.parent(".info-intro-hover");
		var changeAtten = function(){
            if(afid){
            	if(typeof isFansUrl == "undefined") return;
            	var data = {fid : afid};
				$.ajax({
					type : "POST",
					url : isFansUrl,
					data : data,
					success : function(result) {
						result = eval('('+result+')');
						if(result.success && result.attenFlag == 3){
							var ihtml = '<em class="info-atten-icon info-atten-icon-two"></em>'+
										'<em class="vline" style="margin-left:0px;">|</em>互相关注';
							$(infoIntroHover).find(".info-atten").html(ihtml);
						}else{
							var ihtml = '<em class="info-atten-icon info-atten-icon-one"></em>'+
										'<em class="vline" style="margin-left:0px;">|</em>&nbsp;已关注';
							$(infoIntroHover).find(".info-atten").html(ihtml);
						}
						$(infoIntroHover).find('a').removeClass("info-atten-btn").addClass("info-atten-label");
						var followCount = Number($("i[name='nav_follow_count_span']").eq(0).text()) + 1;
						$("i[name='nav_follow_count_span']").text(followCount);
					},
					error : function(data) {
						var ihtml = '<em class="info-atten-icon info-atten-icon-one"></em>'+
									'<em class="vline" style="margin-left:0px;">|</em>&nbsp;已关注';
						$(infoIntroHover).find(".info-atten").html(ihtml);
						$(infoIntroHover).find('a').removeClass("info-atten-btn").addClass("info-atten-label");
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
	
	$("#apply-reason").dialog({
	      autoOpen:false,
		  bgiframe: true,
		  title:"提交好友申请理由",
		  modal: true,
		  buttons: {
			  '确定': function() {
			  		var applyReason = $(this).find("input").val();
			  		applyReason = $.trim(applyReason);
			  		fid = $(this).attr("act-fid");
			  		var data = {fid : fid,apply_reason:applyReason};
					$.ajax({
						type : "POST",
						url : addFriendUrl,
						data : data,
						success : function(result) {
							result = eval('('+result+')');
							if(result.success){
								dialog.success("提交申请成功，等待对方同意！",function(){
									$("#apply-reason").dialog('close');
									$("#apply-reason").find("input").val("");
									ffid = $("#apply-reason").attr("act-fid");
									debugger;
									var ihtml = '<em class="info-atten-icon info-atten-icon-one"></em>'+
												'<em class="vline" style="margin-left:0px;">|</em>&nbsp;&nbsp;已申请好友';
									$(".friend-"+ffid).find(".info-atten").html(ihtml);
									$(".friend-"+ffid).find("a").removeClass("info-friend-add-btn").addClass("info-friend-label-btn");
									$(this).attr("act-fid","");
								});
							}else{
								dialog.error(result.info);
								$(this).attr("act-fid","");
							}
						},
						error : function(data) {
							dialog.error("由于网络原因，申请好友失败，请稍后重试。");
							$(this).attr("act-fid","");
						}
					});
			  		
			  		
		      },
	          '取消':function(){
	              $(this).dialog('close');
	              $(this).find("input").val("");
	              $(this).attr("act-fid","");
	          }
	      }
	});
	
	
	$(".info-friend-add-btn").live("click",function(){
		var afid = $(this).attr("action-fid");
		if(!afid){
			return false;
		}
		var $this = $(this);
		if(typeof addFriendUrl == "undefined") return;
		$("#apply-reason").attr("act-fid",afid);
		$("#apply-reason").dialog("open");
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