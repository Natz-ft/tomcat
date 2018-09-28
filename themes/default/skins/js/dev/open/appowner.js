//应用所有者
function initAppOwnerEvent(){
	var ownerSelectType = $("#app_owner_input").attr("ownerSelectType");

	//弹出框方式实现
	if(typeof ownerSelectType != "undefined" && ownerSelectType == "artDialog" && typeof art != "undefined"){
	$("#app_owner_input").click(function(){
		var app_owner = $("#app_owner").val();
			art.dialog.open('./ownerTree.htm?app_owner='+app_owner, {
				title: $("#app_owner_input").attr('dlg-title')?$("#app_owner_input").attr('dlg-title'):'选择应用所有者',
				width: "300px",
				height: "350px",
				ok: function(topWin){
			    	//art.dialog('hello world');
			    	var iframe = this.iframe.contentWindow;
			    	if (!iframe.document.body) {
			        	art.dialog.tips('请稍后正在努力加载中……');
			        	return false;
			        };
			       var res =  iframe.save();
			       this.close();
			       return false;
			    },
			    cancel: function(){
			    	//art.dialog.tips('close')
			    },
			    okBtn: "确定",
			    cancelBtn: "关闭"
				});
		
	});
	}

	//页面下拉方式实现
	if(typeof ownerSelectType != "undefined" && ownerSelectType == "dropdown"){
		//渲染所属地市
		var  renderOwner = function(){
			var loader = layer.load("加载中……");
				$.ajax({
					url: "appCreate.do?method=getSiteList",
					type: "GET",
					data: {},
					async: false,
					dataType: "JSON",
					//使用默认的回调
					success: function(data){
						var html = "";
						for(var i=0; i<data.length; i++){
							html+="<li title='"+data[i]['ORG_NAME']+"' style='width:auto'><span class='tag-body'><a href='javascript:void(0)' ownervalue='"+data[i]['ORG_NAME']+"' ownerid='"+data[i]['ORG_ID']+"' gname='"+data[i]['ORG_NAME']+"'>"+data[i]['ORG_NAME']+"</a>";
						}
						$("#app_owner_list").html(html);
						layer.close(loader);
					},
					error: function(){
						layer.msg('网络不给力，请刷新再试……', 2, 3);
					}
				});
		}

		var initOwnerFun = function(){
			var ownerWin = $('#owner-list'),ownerInput = $('#app_owner_input'),appOwner = $('#app_owner'),body=$('body');
			//第一次初始化 
			var tempId = ownerInput.attr("tempId");
			var tempValue = ownerInput.attr("tempValue");
			if(tempId!=null&&tempId!=""&&tempValue!=null&&tempValue!=""){
				var s = '<span href="javascript:void(0)" ownerid='+tempId+' class="tag-item">'+tempValue+'<a href="javascript:void(0)" class="tag-close"></a></span>';
				ownerInput.html(s);
			}
			
			ownerInput.on('click',function(){
				ownerWin.show();
				body.on('click.ownerwin',function(e){
					var target = e.target;
					if(target == ownerInput[0] || target == ownerWin[0] || $.contains(ownerWin[0],target)){
						return false;
					} else {
						hideOwnerWin(ownerWin);
						body.off('click.ownerwin');
					}
				});
			});
			ownerWin.find('.dropdown-close:first').on('click',function(e){
				hideOwnerWin(ownerWin);
			});
			ownerWin.find('ul li span.tag-body a').on('click',function(e){
				var target = e.target,ownervalue,num;
				ownervalue = target.getAttribute('ownervalue');
				ownerid = target.getAttribute('ownerid');
				appOwner.val(ownerid);
				var s = '<span href="javascript:void(0)" ownerid='+ownerid+' class="tag-item">'+ownervalue+'<a href="javascript:void(0)" class="tag-close"></a></span>';
				ownerInput.html(s);
				ownerInput.attr("tempValue",ownervalue)
			});	
			ownerInput.find('.tag-item a.tag-close').live('click',function(e){
				ownerInput.html("");
				appOwner.val("");
			});
			
		}
		var hideOwnerWin = function(win){
			win.hide();
		}
		renderOwner();
		initOwnerFun();

	}
}
	
	
