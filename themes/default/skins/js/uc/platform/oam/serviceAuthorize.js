function init_service_authorize(param){
	//收缩展开
	$(".apply-item .header .opt").click(function() {
		var applyInfo = $(this).parents(".header:first").siblings(".body");
		if(applyInfo.is(":hidden")) {
			$(this).html("[收&nbsp;缩]");
		} else {
			$(this).html("[展&nbsp;开]");
		}
		applyInfo.slideToggle("fast");
	});
	//处理通过和驳回请求
	$(".handlerApply").on("click",function(){
		var url = "./serviceAuthorize.do?method=passApply";
		var tip = '确定通过选中的申请?';
		if($(this).attr("action") == "reject"){
			url = "./serviceAuthorize.do?method=rejectApply";
			tip = '确定驳回选中的申请?';
		}else if($(this).attr("action") == "cancel"){
			url = "./cancelServiceAuthorize.do?method=cancelApply";
			tip = '确定取消选中的申请?';
		}
		$pars = $(this).parents(".apply-item:first");
		var subscription_id = $pars.attr("subscription_id");
		if(typeof subscription_id == "undefined"  || subscription_id == null || subscription_id == ""){
			//为了兼容两种服务审核页面的写法，apply-item div 内只有一个服务项目的情况subscription_id 在apply-item div的属性中设置
			//否则，不只一个服务项目，则读取当前按钮中设置的subscription_id属性
			subscription_id = $(this).attr("subscription_id");
		}
		if(subscription_id != ""){
			layer.confirm(tip,function(){
				
				var data = {
						sub_id : subscription_id
				};
				$.ajax({
					url : url,
					data : data,
					dataType : "json",
					success : function(data){
						if(data.code == "success"){
							layer.msg(data.msg, 1, 1,function(){
								location.reload();
							});
						}else{
							layer.msg(data.msg,1);
						}
					},
					error : function(){
						layer.msg("请求失败，请稍后再试",1);
					}
				});
			});
		}else{
			layer.msg("缺少必要的参数",1);
		}
	});
	
	//批量处理通过和驳回请求
	$(".batchHandlerApply").on("click",function(){
		var $this = $(this);
		var url = "./serviceAuthorize.do?method=batchPassApply";
		var tip = '确定通过所有选中的申请?';
		if($this.attr("action") == "reject"){
			url = "./serviceAuthorize.do?method=batchRejectApply";
			tip = '确定驳回所有选中的申请?';
		}
		if($this.attr("action") == "cancel"){
			url = "./cancelServiceAuthorize.do?method=batchCancelApply";
			tip = '确定取消所有选中的通过申请?';
		}
		
		var subscription_id_arr = new Array();
		var subscription_ids = "";
		
		var authArr = new Array();
		
		var $pars = $(this).parents(".apply-item:first");
		if(typeof $pars == "undefined"  || $pars == null || typeof $pars.length == "undefined" ||  $pars.length != 1  ){
			//为了兼容两种服务审核页面的写法，batchHandlerApply在apply-item内的，或者不在apply-item内的
			//没在apply-item内，则批量选中页面内所有apply-item-select
			$("input:checked[name=apply-item-select]").each(function(){
				subscription_id_arr.push($(this).val());
			});
			
		}else{
			//当前apply-item内的所有apply-item-select
			$pars.find("input:checked[name=apply-item-select]").each(function(){
				subscription_id_arr.push($(this).val());
			});
		}
		
		if(subscription_id_arr.length > 0){
			subscription_ids = subscription_id_arr.join(',');
		}
		
		if(subscription_ids != ""){
			
			layer.confirm(tip,function(){
				
				var data = {
						sub_ids : subscription_ids
				};
				$.ajax({
					url : url,
					data : data,
					dataType : "json",
					success : function(data){
						if(data.code == "success"){
							layer.msg(data.msg, 1, 1,function(){
								location.reload();
							});
						}else{
							layer.msg(data.msg,1);
						}
					},
					error : function(){
						layer.msg("请求失败，请稍后再试",1);
					}
				});
			});
		}else{
			layer.msg("没有选中的服务",1);
		}
	});
	//全选择按钮事件$(".database_select_f").click(function() {   .on("click",function(){
	/*
	$(".apply-list-select-all").on("click",function(){
		var $pars = $(this).parents(".apply-item:first");
		if(typeof $pars == "undefined"  || typeof $pars.length == "undefined" ||  $pars.length != 1  ){
			//为了兼容两种服务审核页面的写法，batchHandlerApply在apply-item内的，或者不在apply-item内的
			//没在apply-item内，则批量选中页面内所有apply-item-select
			//否则，当前apply-item内的所有apply-item-select
			$pars = $("body");
		}
		if($(this).attr("checked")){
			//全选
			$pars.find("input[name=apply-item-select]").each(function(){
				 $(this).attr("checked",true);
			});
			$pars.find(".apply-list-select-all").attr("checked",true);
		}else{
			//取消全选
			$pars.find("input[name=apply-item-select]").each(function(){
				 $(this).attr("checked",false);
			});
			$pars.find(".apply-list-select-all").attr("checked",false);
		}
	})
	*/
	$('body').on('click','.apply-list-select-all',function() {
        if($(this).prop('checked')==true){
            $(this).parents('.apply-info').find('input[name=apply-item-select]').each(function() {
                $(this).prop('checked',true);
                $(this).parent().addClass('checked');
            });
        }
        else{
        	$(this).parents('.apply-info').find('input[name=apply-item-select]').each(function() {
                $(this).prop('checked',false);
                $(this).parent().removeClass('checked');
            });
        }
    });
    $('body').on('click','.item-list-check>div.checker>span',function() {
    	if($(this).children('input[name=apply-item-select]').prop('checked')==true){
    		$(this).children('input[name=apply-item-select]').prop('checked',true);
    		$(this).addClass('checked');
    	}
    	else{
    		$(this).children('input[name=apply-item-select]').prop('checked',false);
    		$(this).removeClass('checked');
    	}
        var p_checked = $(this).parents('.apply-info').find('.apply-list-select-all').prop('checked');//获取一级类当前是否被选中

        if(p_checked == false){//一级类未被选中，则二级类全部选中时，一级类也被选中
            var all_checked = 1;
            $(this).parents('.apply-info').find('input[name=apply-item-select]').each(function() {
                if($(this).prop('checked')!=true){
                    all_checked = 0;
                }
            });
            if(all_checked==1){
            	$(this).parents('.apply-info').find('.apply-list-select-all').prop('checked',true);
            	$(this).parents('.apply-info').find('.apply-list-select-all').parent().addClass('checked');
            }
        }
        else{//一级类已被选中，则二级类取消选中时，一级类也被取消
        	$(this).parents('.apply-info').find('.apply-list-select-all').prop('checked',false);
        	$(this).parents('.apply-info').find('.apply-list-select-all').parent().removeClass('checked');
        }
    });
	//选择按钮事件
	$(".apply-item input[name=apply-item-select]").on("click",function(){
		var $pars = $(this).parents(".apply-item:first");
		//为了兼容两种服务审核页面的写法，batchHandlerApply在apply-item内的，或者不在apply-item内的
		if($pars.find(".apply-list-select-all").length = 0){
			if( $(".apply-list-select-all").attr("checked")){
				 $(".apply-list-select-all").attr("checked",false);
			}
		}else{
			if( $pars.find(".apply-list-select-all").attr("checked")){
				$pars.find(".apply-list-select-all").attr("checked",false);
			}
		}
	});
	
	var count = parseInt(param['count']); 
	var pagesize = parseInt(param['pageSize']);
	var nowPage = parseInt(param['nowPage']);
	if(count > pagesize){
		$("#paper").show();
		$("#paper").ui_paper({
			count : count,
			pagesize : pagesize,
			current : nowPage,
			fun : "nextPlatformApplyPageHandler"
		});
	}
	else{
		$("#paper").hide();
	}
}

function nextPlatformApplyPageHandler(data){
	if(typeof locationUrlForPage == 'undefined' || locationUrlForPage == ""){
		locationUrlForPage = "./serviceAuthorize.htm";
	}
	if(locationUrlForPage.indexOf('?')>-1){
		location.href = locationUrlForPage +'&pageindex='+data.index;
	}else{
		location.href = locationUrlForPage +'?pageindex='+data.index;
	}
}