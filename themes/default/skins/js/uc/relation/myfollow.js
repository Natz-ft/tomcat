$(document).ready(function() {
		//展开收起分组列表
		$("#groupMore").on("click",function(){
			if($(this).attr("action-type")=="close"){
				$(this).attr("action-type","open");
				$(".left-nav").find("li.level2-temp").show();
				$(this).find("span").html("收起 ↑↑");
			}else{
				$(this).attr("action-type","close");
				$(".left-nav").find("li.level2-temp").hide();
				$(this).children("span").html("展开 ↓↓");
			}
		});
		/*$("#groupMore").trigger("click");*/
		
		/*if(typeof curFid != "undefined" ){
			if(curFid !== ''){
				var templis = $(".left-nav").find(".level2-temp[action-gid='"+ curFid +"']");
				if(templis.length>0){
					$("#groupMore").trigger("click");
				}
			}
		}*/
		//创建分组
		$("#creatGroup").on("click",function(){
			$("#add-group-prompt").dialog('open');
		});
		$("#add-group-prompt").dialog({
		      autoOpen:false,
			  bgiframe: true,
			  title:"创建分组",
			  modal: true,
			  buttons: {
				  '确定': function() {
				  		var groupName = $(this).find("input[action-type='group-name']").val();
				  		groupName = $.trim(groupName);
				  		//检查非空,检查长度
				    	if(!groupName||groupName.length>16){
				    		$(this).find("div[name='verify-tip']").addClass("color-red");
				    		return;
				    	}else {
				    		//检查是否是“全部关注和未分组”
				    		if("全部关注"== groupName){
			    				dialog.error("分组名称不能使用“全部关注”，请换一个试试。");
			    				return;
			    			}
				    		if("未分组"== groupName){
				    			dialog.error("分组名称不能使用“未分组”，请换一个试试。");
				    			return;
				    		}
				    		//检查重复
				    		var items = $(".left-nav").find("li[act-type='group-list']");
				    		for(var i = 0,len = items.length;i<len;i++){
				    			if($(items[i]).attr("title")== groupName){
				    				dialog.error("分组名称重复，请换一个试试。");
				    				return;
				    			}
				    		}
				    		var type = $(this).attr("act-type");
				    		addGroup(groupName,type);
				    	}
			      },
		          '取消':function(){
		              $(this).dialog('close');
		              $(this).find("div[name='verify-tip']").removeClass("color-red");
		              $(this).find("input[action-type='group-name']").val("");
		          }
		      }
		});
		//编辑分组名称
		$("#modifyGroupName").on("click",function(){
			$("#modify-group-name-prompt").dialog("open");
		});
		
		$("#modify-group-name-prompt").dialog({
		      autoOpen:false,
			  bgiframe: true,
			  title:"修改分组名称",
			  modal: true,
			  buttons: {
				  '确定': function() {
				  		var groupName = $(this).find("input[action-type='group-name']").val();
				  		groupName = $.trim(groupName);
				  		//检查非空,检查长度
				    	if(!groupName||groupName.length>16){
				    		$(this).find("div[name='verify-tip']").addClass("color-red");
				    		return;
				    	}else {
				    		//检查是否是“全部关注和未分组”
				    		if("全部关注"== groupName){
			    				dialog.error("分组名称不能使用“全部关注”，请换一个试试。");
			    				return;
			    			}
				    		if("未分组"== groupName){
				    			dialog.error("分组名称不能使用“未分组”，请换一个试试。");
				    			return;
				    		}
				    		//检查重复
				    		var items = $(".left-nav").find("li[act-type='group-list']");
				    		for(var i = 0,len = items.length;i<len;i++){
				    			if($(items[i]).attr("title")== groupName){
				    				dialog.error("分组名称重复，请换一个试试。");
				    				return;
				    			}
				    		}
				    		var groupId = $(this).attr("action-group");
				    		modifyGroupName(groupName,groupId);
				    	}
			      },
		          '取消':function(){
		              $(this).dialog('close');
		              $(this).find("div[name='verify-tip']").removeClass("color-red");
		              $(this).find("input[action-type='group-name']").val("");
		          }
		      }
		});
		//删除分组
		$("#deleteGroup").on("click",function(){
			var title = $(this).attr("act-group-name");
			var groupId = $(this).attr("act-gid");
			dialog.confirm("删除提示","确定要删除"+title+"分组吗？(注：此分组下的人不会被取消关注。)",function(decision){
				if(decision){
					deleteGroup(groupId);
				}
			});
		});
		//取消关注
		$(".cancel_follow_single").on("click",function(){
			var cancel_uid = $(this).attr("action-fid");
			var cancel_name = $(this).attr("action-fname");
			dialog.confirm("取消关注提示","确认要取消对"+cancel_name+"的关注吗？",function(decision){
				if(decision){
					unFollow(cancel_uid);
				}
			});
		});
		
		//分组弹出框
		$("#layer_group_list").find(".lgl_close").on("click",function(){
			//弹出框隐藏
			hideLayer();
		});
		//点击分组
		$(".info-group").on("click",function(){
			var layer = $("#layer_group_list");
			layer.find("input[type='checkbox']").removeAttr("checked");
			var curfid = $(this).attr('action-fid');
			if(layer.attr("action-fid")==curfid){
				//弹出框隐藏
				hideLayer();
			}else {
				layer.attr("action-fid",curfid);
				var groups = layer.find(".lgl_all_list li");
				var gids = $(this).attr('action-data').split(","); 
				for(var i=0,ilen=gids.length;i<ilen;i++){
					for(var j=0,jlen=groups.length;j<jlen;j++){
						if(gids[i]==$(groups[j]).attr("action-gid")){
							$(groups[j]).find("input[type='checkbox']").attr("checked","checked");
							break;
						}
					}
				}
				var ref = $(this);
				//弹出框定位显示
				showLayer(ref);
			}
		});
		
		//悬浮出现取消关注
		$(".myfollow_item").hover(function(){
			$(this).addClass("myfollow_item_hover");
			$(this).find(".info-intro").hide();
			$(this).find(".info-intro-hover").show();
		},function(){
			$(this).removeClass("myfollow_item_hover");
			$(this).find(".info-intro").show();
			$(this).find(".info-intro-hover").hide();
		});
		
		//选择分组 input
		$("#layer_group_list").find("input[type='checkbox']").live("click",function(){
			var gid = $(this).attr("action-gid");
			var checked = ($(this).attr("checked")=="checked");
			var fid = $("#layer_group_list").attr("action-fid");
			if(fid == "none"){
				return;
			}
			if(checked == true ){
				//添加分组情况
				if(gid && fid){
					if(typeof addLinkUrl == "undefined")return;
					var data = {fid : fid, follow_group_id : gid};
					$.ajax({
						type : "POST",
						url : addLinkUrl,
						data : data,
						success : function(result) {
							result = eval('('+result+')');
							if(result.success){
								updataLinkItem(result.fid);
							}else{
								dialog.error("设置分组失败，请稍后重试。")
							}
						},
						error : function(data) {
							dialog.error("由于网络原因，设置分组失败，请稍后重试。");
						}
					});
				}
			}else{
				//删除分组情况
				if(gid && fid){
					if(typeof deleteLinkUrl == "undefined") return;
					var data = {fid : fid, follow_group_id : gid};
					$.ajax({
						type : "POST",
						url : deleteLinkUrl,
						data : data,
						success : function(result) {
							result = eval('('+result+')');
							if(result.success){
								updataLinkItem(result.fid);
							}else{
								dialog.error("设置分组失败，请稍后重试。")
							}
						},
						error : function(data) {
							dialog.error("由于网络原因，设置分组失败，请稍后重试。");
						}
					});
				}
			 }
				
		});
			
		
		
});

// 添加分组
function addGroup(groupName,type){
	if(!groupName){
		return ;
	}
	if(typeof addFollowGroupUrl == "undefined")return;
	var data = {title:groupName,type:type};
	$.ajax({
		type : "POST",
		url : addFollowGroupUrl,
		data : data,
		success : function(res) {
			res = eval('('+res+')');
			if(res.success){
				dialog.success(res.info);
				$("#add-group-prompt").dialog('close'); 
		    	$("#add-group-prompt").find("div[name='verify-tip']").removeClass("color-red");
	    		$("#add-group-prompt").find("input[action-type='group-name']").val("");
	    		addGroupItem(res.groupId,res.groupTitle);
			}else{
				dialog.error(res.info);
			}
		},
		error : function(res) {
			dialog.error("由于网络原因，新建分组失败，请稍后重试!");
		}
	});
}
// 修改分组名称
function modifyGroupName(title,groupId){
	if(typeof modifyGroupUrl == "undefined") return;
	if(!groupId||!title){
		dialog.error("参数非空，请重试！");
		return ;
	}
	var data = {follow_group_id:groupId,title:title};
	$.ajax({
		type : "POST",
		url : modifyGroupUrl,
		data : data,
		success : function(res) {
			res = eval('('+res+')');
			if(res.success){
				$("#modify-group-name-prompt").dialog('close'); 
		    	$("#modify-group-name-prompt").find("div[name='verify-tip']").removeClass("color-red");
	    		$("#modify-group-name-prompt").find("input[action-type='group-name']").val("");
	    		dialog.success("编辑分组名称成功！",function(){
	    			window.location.reload(); 
	    		});
			}else{
				dialog.error("编辑分组名称失败，请稍后重试。");
			}
		},
		error : function(data) {
			dialog.error("由于网络原因，编辑分组名称失败，请稍后重试。");
		}
	});
}
// 删除分组名称
function deleteGroup(groupId){
	if(typeof deleteGroupUrl == "undefined") return;
	if(!groupId){
		dialog.error("参数非空，请重试！");
		return ;
	}
	var data = {follow_group_id:groupId};
	$.ajax({
		type : "POST",
		url : deleteGroupUrl,
		data : data,
		success : function(res) {
			res = eval('('+res+')');
			if(res.success){
				dialog.success("分组删除成功！",function(){
					if(typeof followUrl == "undefined")return;
					window.location.href = followUrl;
				});
			}else{
				dialog.error("分组删除失败，请稍后重试。");
			}
		},
		error : function(data) {
			dialog.error("由于网络原因，删除分组失败，请稍后重试。");
		}
	});
}
//取消关注
function unFollow(fid){
	if(typeof unFollowUrl == "undefined") return;
	if(!fid){
		dialog.error("参数非空，请重试！");
		return ;
	}
	var data = {fid : fid};
	$.ajax({
		type : "POST",
		url : unFollowUrl,
		data : data,
		success : function(res) {
			res = eval('('+res+')');
			if(res.success){
				dialog.success("取消关注成功！",function(){
						$(".myfollow_item[action-fid='"+res.fid+"']").remove();
				});
				var followCount = Number($("i[name='nav_follow_count_span']").eq(0).text()) - 1;
				$("i[name='nav_follow_count_span']").text(followCount);
			}else{
				dialog.error("取消关注失败，请稍后重试。")
			}
		},
		error : function(data) {
			dialog.error("由于网络原因，取消关注失败，请稍后重试。");
		}
	});
}
//添加分组到左侧导航栏和弹出框的分组里
function addGroupItem (groupId,title){
	if(typeof followUrl == "undefined")return;
	var itemHtml ='<li title="'+ title +'" act-type="group-list">'
	+'<a id="newGroupLink" class="lnav-item next-item list-relation" href="'+ followUrl +'?gid='+ groupId +'" hideFocus="hidefocus">'
	+ '<span>' + title + '</span>'
	+ '<span class="count">(0)</span>'
	+'</a>'
	+'</li>';
	$("#item_notInGroup").before(itemHtml);
	
	var layer = $("#layer_group_list");
	var listUL = layer.find(".lgl_all_list");
	var itemHtml = '<li action-gid="'+ groupId +'">'
					+'<a href="javascript:;" hidefocus>'
					+'	<label title="'+ title +'">'
					+'		<input class="input_checkbox" type="checkbox" action-gid="'+ groupId +'" value="'+ groupId +'" name="'+ title +'"/>'
					+ title
					+'	</label>'
					+'</a>'
					+'</li>';
	var itemLI = listUL.append(itemHtml);
		/*itemLI.find("input[type='checkbox']").on("click",function(){
			var gid = $(this).attr("action-gid");//group id
			var checked = ($(this).attr("checked")=="checked");
			groupItemClick(gid,checked);
		});*/
}
//页面上更新关注用户的分组情况
function updataLinkItem(fid){
		var layer = $("#layer_group_list");
		var items = layer.find("input[type='checkbox']");
		var ids = "";
		var des = "";
		var count = 0;
		for(var i=0,len=items.length;i<len;i++){
			if($(items[i]).attr("checked")=="checked"){
				count ++;
				var tempItem = $(items[i]);
				if(ids == "") {
					ids = tempItem.val();
					des = tempItem.attr("name");
				}else{
					ids = ids + "," + tempItem.val();
					des = des + "," + tempItem.attr("name");
				}
			}
		}
		if(ids == ""){
			ids = "";
		}
		if(des == ""){
			des = "未分组";
		}
		//更新分组显示内容
		var infoGroup = $(".myfollow_item[action-fid='" + fid  + "']").find(".info-group");
		infoGroup.attr('action-data',ids);//groupIds
		infoGroup.attr('title',des);//groupDes
		infoGroup.find(".info-group-des").html(des);
		
		//更新layer上的提示
		var tip = layer.find("div[node-type='layer_succ_tip']");
		tip.show();
		tip.find("em[node-type='succ_tip_count']")[0].firstChild.nodeValue = count;
	}	
//弹出框隐藏
function hideLayer(){
	var layer = $("#layer_group_list");
	layer.attr("action-fid","none");
	layer.hide();
}
//弹出框定位显示
function showLayer(ref){
	var layer = $("#layer_group_list");
	layer.show();
	var tip = layer.find("div[node-type='layer_succ_tip']");
	tip.hide();	
	var curBox = $("#mylistBox");
	var xy_curBox = curBox.getXY();
	var width_curBox = curBox.width()||0;
	
	var xy_ref = ref.getXY();
	var width_layer = layer.width()||0;
	if(xy_ref[0]+width_layer>xy_curBox[0]+width_curBox){
		layer.alignTo(ref,"tl-bl",[-(xy_ref[0] + width_layer - xy_curBox[0]- width_curBox + 5),0]);
	}else{
		layer.alignTo(ref,"tl-bl");
	}
}