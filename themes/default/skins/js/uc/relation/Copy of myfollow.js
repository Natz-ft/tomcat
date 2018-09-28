$(document).ready(function() {
		$("#groupMore").on("click",function(){
			if($(this).attr("action-type")=="close"){
				$(this).attr("action-type","open");
				$(".follow-list-column").find("li.level2-temp").show();
				$(this)[0].firstChild.nodeValue = "收起 ↑↑";
			}else{
				$(this).attr("action-type","close");
				$(".follow-list-column").find("li.level2-temp").hide();
				$(this)[0].firstChild.nodeValue = "展开 ↓↓";
			}
		});
		
		if(typeof curFid != "undefined" ){
			if(curFid !== ''){
				var templis = $(".follow-list-column").find(".level2-temp[action-gid='"+ curFid +"']");
				if(templis.length>0){
					$("#groupMore").trigger("click");
				}
			}
		}
		
		var modifyGroupName = function(groupId,title){
			if(typeof modifyGroupNameUrl == "undefined") return;
			if(!groupId||!title){
				return ;
			}
			var data = {follow_group_id:groupId,title:title};
			$.ajax({
				type : "POST",
				url : modifyGroupNameUrl,
				data : data,
				success : function(data) {
					if(data == "true"){
						//编辑分组名称成功
						window.location.reload(); 
					}else{
						alert("编辑分组名称失败，请稍后重试。")
					}
				},
				error : function(data) {
					alert("由于网络原因，编辑分组名称失败，请稍后重试。");
				}
			});
		}
		var addGroup = function(title){
			if(!title){
				return ;
			}
			
			var addGroupItem = function(groupId){
				if(typeof myFollowUrl == "undefined")return;
				
				var itemHtml ='<li title="'+ title +'" class="level2" action-type="group-item" action-name="'+ title +'" action-gid="'+ groupId +'">'
				+'<a id="newGroupLink" class="group-item-a" href="'+ myFollowUrl +'&gid='+ groupId +'" hideFocus="hidefocus">'
				+ '<span>' + title + '</span>'
				+ '<span class="count" title="0">(0)</span>'
				+'</a>'
				+'</li>';
				$("#item_notInGroup").before(itemHtml);
				if(typeof addGroup4Layer != "undefined"){
					addGroup4Layer (groupId,title);
				}
			};
			
			if(typeof addFollowGroupUrl == "undefined")return;
			var data = {title:title};
			$.ajax({
				type : "POST",
				url : addFollowGroupUrl,
				data : data,
				success : function(data) {
					data = parseInt(data);
					if(data && data > 0){
						addGroupItem(data);
					}else{
						alert("新建分组失败，请稍后重试。")
					}
				},
				error : function(data) {
					alert("由于网络原因，新建分组失败，请稍后重试。");
				}
			});
		};
		var deleteGroup = function(groupId){
			if(!groupId){
				return ;
			}

			if(typeof deleteFollowGroupUrl == "undefined")return;
			
			var data = {follow_group_id:groupId};
			$.ajax({
				type : "POST",
				url : deleteFollowGroupUrl,
				data : data,
				success : function(data) {
					if(data == "true"){
						if(typeof myFollowUrl == "undefined")return;
						window.location.href = myFollowUrl;
					}else{
						alert("删除分组失败，请稍后重试。")
					}
				},
				error : function(data) {
					alert("由于网络原因，删除分组失败，请稍后重试。");
				}
			});
		}
		$("#group-name-confirm").dialog({
		      autoOpen:false,
			  bgiframe: true,
			  title:"提示",
			  modal: true,
			  buttons: {
				  '确定': function() {
				  	$(this).dialog('close');
				  }
				  }
			  });
		$("#delete-group-confirm").dialog({
		      autoOpen:false,
			  bgiframe: true,
			  title:"提示",
			  modal: true,
			  buttons: {
				  '确定': function() {
				  	  var curGroupId =  $("#delete-group-confirm").attr("action-group");
				  	  deleteGroup(curGroupId);
				  	  $(this).dialog('close');
				  },
				  '取消':function(){
		              $(this).dialog('close'); 	
		          }
				  }
			  });
		$("#modify-group-name-prompt").dialog({
		      autoOpen:false,
			  bgiframe: true,
			  title:"编辑分组名称",
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
				    		//检查重复
				    		var items = $(".follow-list-column").find("li[action-type='group-item']");
				    		for(var i = 0,len = items.length;i<len;i++){
				    			if($(items[i]).attr("action-name")== groupName){
				    				$("#group-name-confirm").dialog("open");
				    				return;
				    			}
				    		}
				    		
				    		$(this).find("div[name='verify-tip']").removeClass("color-red");
				    		var curGroupId =  $("#modify-group-name-prompt").attr("action-group");
				  	 		modifyGroupName(curGroupId,groupName);
				    	}
				    	$(this).dialog('close'); 	
			      },
		          '取消':function(){
		              cur_actionFid = null;
		              $(this).find("div[name='verify-tip']").removeClass("color-red");
		              $(this).dialog('close'); 	
		          }
		      }
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
				    		//检查重复
				    		var items = $(".follow-list-column").find("li[action-type='group-item']");
				    		for(var i = 0,len = items.length;i<len;i++){
				    			if($(items[i]).attr("action-name")== groupName){
				    				$("#group-name-confirm").dialog("open");
				    				return;
				    			}
				    		}
				    		
				    		$(this).find("div[name='verify-tip']").removeClass("color-red");
				    		addGroup(groupName);
				    	}
				    	$(this).dialog('close'); 	
			      },
		          '取消':function(){
		              cur_actionFid = null;
		              $(this).find("div[name='verify-tip']").removeClass("color-red");
		              $(this).dialog('close'); 	
		          }
		      }
		});
		
		$("#creatGroup").on("click",function(){
			$("#add-group-prompt").dialog("open");
			$("#add-group-prompt").find("input[action-type='group-name']").val("");
		});
	
		var addGroup4Layer = function(gid,title){
			var layer = $("#layer_group_list");
			var listUL = layer.find(".lgl_all_list");
			var itemHtml = '<LI action-gid="'+ gid +'">'
							+'<A href="javascript:;" hidefocus>'
							+'	<LABEL title="'+ title +'">'
							+'		<INPUT class="input_checkbox" type="checkbox" action-gid="'+ gid +'" value="'+ gid +'" name="'+ title +'"/>'
							+ title
							+'	</LABEL>'
							+'</A>'
							+'</LI>';
			var itemLI = listUL.append(itemHtml);
			itemLI.find("input[type='checkbox']").on("click",function(){
				var gid = $(this).attr("action-gid");//group id
				var checked = ($(this).attr("checked")=="checked");
				groupItemClick(gid,checked);
			});
		}
		
		//checked:true/false
		var groupItemClick = function(gid,checked){
			var fid = $("#layer_group_list").attr("action-fid");//fid，不是follow id
			if(fid == "none"){
				return;
			}
			//页面上更新关注用户的分组情况
			var updataLinkItem = function(){
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
					ids = "0";
				}
				if(des == ""){
					des = "未分组";
				}
				//更新分组显示内容
				var infoGroup = $(".myfollow_item[action-fid='" + fid  + "']").find(".info-group");
				infoGroup.attr('action-data',ids);//groupIds
				infoGroup.attr('title',des);//groupDes
				infoGroup.find(".info-group-des")[0].firstChild.nodeValue = des;
				
				//更新layer上的提示
				var tip = layer.find("div[node-type='layer_succ_tip']");
				tip.show();
				tip.find("em[node-type='succ_tip_count']")[0].firstChild.nodeValue = count;
			};
			
			if(checked == true ){
				//添加分组情况
				if(gid && fid){
					if(typeof addLinkUrl == "undefined")return;
					var data = {fid : fid, follow_group_id : gid};
					$.ajax({
						type : "POST",
						url : addLinkUrl,
						data : data,
						success : function(data) {
							if(data=="true"){
								updataLinkItem();
							}else{
								alert("设置分组失败，请稍后重试。")
							}
						},
						error : function(data) {
							alert("由于网络原因，设置分组失败，请稍后重试。");
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
						success : function(data) {
							if(data=="true"){
								updataLinkItem();
							}else{
								alert("设置分组失败，请稍后重试。")
							}
						},
						error : function(data) {
							alert("由于网络原因，设置分组失败，请稍后重试。");
						}
					});
				}
			}
		
		};
		
		$(".myfollow_item").hover(function(){
			$(this).addClass("myfollow_item_hover");
			$(this).find(".info-intro").hide();
			$(this).find(".info-intro-hover").show();
		},function(){
			$(this).removeClass("myfollow_item_hover");
			$(this).find(".info-intro").show();
			$(this).find(".info-intro-hover").hide();
		});
		$(".myfollow_item").find(".photo").hover(function(){
			//显示窗口
		},function(){
			//隐藏窗口
		});
		
		//后台取消关注
		var cancelFollow = function(afid){
			if(!afid){
				return false;
			}
			var removeItem = function(){
				if(afid){
					$(".myfollow_item[action-fid='"+afid+"']").remove();
				}
			};
			
			if(typeof unFollowUrl == "undefined")return;
			
			var data = {fid : afid};
			$.ajax({
				type : "POST",
				url : unFollowUrl,
				data : data,
				success : function(data) {
					if(data){
						removeItem();
					}else{
						alert("取消关注失败，请稍后重试。")
					}
				},
				error : function(data) {
					alert("由于网络原因，取消关注失败，请稍后重试。");
				}
			});
		};
		var cur_actionFid = null;
		$("#cancel-follow-confirm").dialog({
		      autoOpen:false,
			  bgiframe: true,
			  title:"提示",
			  modal: true,
			  buttons: {
				  '确定': function() {
				    	cancelFollow(cur_actionFid);
				    	cur_actionFid = null;
				    	$(this).dialog('close'); 	
			      },
		          '取消':function(){
		              cur_actionFid = null;
		              $(this).dialog('close'); 	
		          }
		      }
		});
		
		//取消关注
		$(".cancel_follow_single").on("click",function(){
			cur_actionFid = $(this).attr("action-fid");
			var actionFname = $(this).attr("action-fname");
			$("#cancel-follow-confirm").find("div[name='confirm-tips']")[0].firstChild.nodeValue = "确认要取消对"+ actionFname +"的关注吗？";
			$("#cancel-follow-confirm").dialog("open");
		});
		//弹出框隐藏
		var hideLayer = function(){
			var layer = $("#layer_group_list");
			layer.attr("action-fid","none");
			layer.hide();
		};
		
		//弹出框定位显示
		var showLayer = function(ref){
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
		};
		//分组弹出框
		$("#layer_group_list").find(".lgl_close").on("click",function(){
			//弹出框隐藏
			hideLayer();
		});
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
			
		$("#layer_group_list").find("input[type='checkbox']").on("click",function(){
			var gid = $(this).attr("action-gid");//group id
			var checked = ($(this).attr("checked")=="checked");
			groupItemClick(gid,checked);
		});
		
		//删除分组
		$("#deleteGroup").on("click",function(){
			$("#delete-group-confirm").dialog("open");
		});
		//编辑分组名称
		$("#modifyGroupName").on("click",function(){
			$("#modify-group-name-prompt").dialog("open");
		});
});