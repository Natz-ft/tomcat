define(function(require,exports,module){
	
	var user_type_list="";
	var testUserNum = 0;
	
	exports.init = function(){
		
		renderPage();
	}
	
	//加载正在申请中的用户类型
	function loadApplying(){
	    //显示申请中的测试用户类型
		$.ajax({
			url: "./app/testInfo.do?method=getApplyingUser",
			type: "POST",
			dataType: "JSON",
			data: {"app_id": app_id},
			success: function(data){
				//console.log(data);
				var result=[];
				if(data==null){
					data=[];
				}
				result.data =data;
				//console.log(result);
				testUserNum += data.length;
				var htm = template.render("apply_render",result);
				$('div.list_list_').html(htm);	
						
			}
		});
	}
	
	function renderPage(){
		//加载已经绑定的测试用户
		layer.load("测试信息正在加载，请稍候。。。", 1);
		
		var data={};
		$.ajax({
			url:"./app/testInfo.do?method=getBundingInfo",
			type:"POST",
			data:{app_id:app_id},
			dataType:"JSON",
			success:function(result){
				if(result==null){
		   		    result = [];
		   		}
				data.data = result;
				testUserNum += result.length;
				var htm = template.render('appTestAddTp1',data);
				$('#showContent').html(htm);
				renderInnerPage();
			}
		});
	}
	function renderInnerPage(){
		//获取应用信息
		$.ajax({
			url:"./app/testInfo.do?method=getAppInfo",
			type:"POST",
			data:{app_id:app_id},
			dataType:"JSON",
			success:function(result){
				//console.log(result);
				var html2 = "";
				var data = result.user_types;
				//showType(data);
				layer.closeAll();
				$("#submitBtn").click(function(){
					applyResult(data);
				});
			},
			error:function(){
				alert("网络不正常，请刷新后重试！！");
			}
		});
	}
	
	function applyResult(data){
		//获取开发者申请的用户类型，提交申请
		var selected_type="";
	    $("li.select").each(function(){
	     selected_type +=","+$(this).attr("data-tag")+":"+$(this).attr("tag-name");
	     testUserNum++;
	    });
	    selected_type =selected_type.substr(1);
		var loader = layer.load("正在提交申请。。。。");
		if(selected_type==""){
			layer.alert("您还没有选择测试的用户类型！！");
			layer.closeAll;
			return;
		}else{
			if(testUserNum<20){
				$.ajax({
					//提交申请
					url:"./app/testInfo.do?method=creatApply",
					type:"POST",
					data:{app_id:app_id,selected_type:selected_type},
					dataType:"JSON",
					success:function(data){
						//console.log(data);
						if(data){
							layer.alert("已提交申请！申请中的帐号与关联成功的账号分别显示在下面的列表中！！您可以使用关联成功的帐号登录并测试您的帐号！！",1);
							layer.close(loader);}
						else{
							layer.alert("申请失败！！服务暂时不可用，请稍候重试！！！",8);return;}
						}
			});}else{
				layer.alert("申请数量超过上限",8);return;
			}
			}
	}
	
	
	function showType(datas){
		//显示应用对应的应用类型
		$.ajax({
			url: "appCreate.do?method=getUserTypeList",
			type: "GET",
			data: {},
			async: false,
			//dataType: "JSONP",
			//jsonp: "jsonp",
			dataType: "JSON",
			success: function(result){
				if(result.code == 1){
					var data = result.data;
					var html2 = "";
					for(var i=0; i<data.length; i++){
						for(var j=0;j<datas.length;j++){ 
							if(datas[j]==data[i]['USER_TYPE']){					   
								html2 +="<li class='tag-trigger' onclick='selectTag(this)' data-tag='"+data[i]['USER_TYPE']+"' tag-name='"+data[i]['TYPE_NAME']+"'><span>"+data[i]['TYPE_NAME']+"<i>+</i></span></li>";
								user_type_list += ","+data[i]['USER_TYPE']+":"+data[i]['TYPE_NAME']
							}
						}
					}
					$("#usertype_render2").html(html2);
					loadApplying();
				}else{					
					layer.msg('请先登录', 2, 3);
				}
			
			},
			error: function(){
				layer.msg('网络不给力，请刷新再试……', 2, 3);
			}
			});
	}	
	
});


	function selectTag(a){
    	var tagName=$(a).attr("tag-name");
		var htm=tagName+"<a class='close' data-tag='"+tagName+"' title='取消' href='javascript:;' onclick='removeTag(this)'><em>×</em></a>"
		$(a).attr("class","select");
		$(a).removeAttr("onclick");
		$(a).html(htm);
   	}
   	function removeTag(a){
		var tagName=$(a).parent().attr("tag-name");
		var htm="<span>"+tagName+"<i>+</i></span>";
		var $li=$(a).parent();
		$li.attr("class","tag-trigger");
		$li.html(htm);
		$li.attr("onclick","selectTag(this)");
		event.cancelBubble=true;	
	}

	function delBunding(a,data){
		$.ajax({
			url:"./app/testInfo.do?method=delBunding",
			data:{"id":data},
			dataType:"JSON",
			type: "POST",
			success: function(data){
				if(data){
					layer.alert("操作成功");
					$(a).parent().parent().remove();			
					}
				else{
					layer.alert("请刷新后重试！")};
				return;
			}
		});
		
	}