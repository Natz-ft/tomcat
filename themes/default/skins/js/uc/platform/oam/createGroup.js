
//增加自动设置group_type，有父节点的时候，该值需要与父节点一致
$(function(){
	var select = $('select[name="parent_id"]');
	var setDefaultGroupType = function(){
		var actionGroupType = "";
		if(typeof select.find("option:selected").attr("actionGroupType") != "undefined"){
			actionGroupType = select.find("option:selected").attr("actionGroupType");
		}
		var groupTypeInput = $('input[name="group_type"]');
		if(actionGroupType!=""){
			$('input[name="group_type"]').val(actionGroupType);
			$('input[name="group_type"]').attr("readonly","readonly");
			$('input[name="group_type"]').css({"background":"#ccc"});
		}else{
			$('input[name="group_type"]').val("");
			$('input[name="group_type"]').removeAttr("readonly");
			$('input[name="group_type"]').css({"background":"#fff"});
		}
	}
	setDefaultGroupType();
	select.change(function(){
		setDefaultGroupType();
	});
});

function doCancelEdit(obj){
	$(obj).hide();
	$(obj).siblings().hide();
	$(obj).siblings(".group-name:first").show();
}

function doAddGroupHandler(){
	var group_name = $('input[name="group_name"]').val();
	var parent_id = $('select[name="parent_id"]').val();
	var group_type = $('input[name="group_type"]').val();
	var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
	if(group_name == "" || group_name == null){
		layer.msg('请填写完整信息!', 1, 1, function(){
			return false;
		});
		return false;
	}
	if(!reg.test(group_name)){
		layer.msg('分组名称不合法', 1, 1, function(){
			return false;
		});
		return false;
	}
	if(!reg.test(group_type)){
		layer.msg('分组类别不合法', 1, 1, function(){
			return false;
		});
		return false;
	}
	var param = {};
	param['group_name'] = group_name;
	param['parent_id'] = parent_id;
	param['group_type'] = group_type;
	$.ajax({
		url: './createGroup.do?method=addGroup',
		type: "POST",
		data: param,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(data){
			if(data=='1'){
				layer.msg('添加分组成功', 1, 1, function(){
					location.reload();
				});
			}
			else{
				layer.msg('添加分组失败,请稍后重试!', 1, 0);
			}
  		}
	});
}

function doCheckGroupName(){
	var $name = $('input[name="group_name"]');
	var name = $name.val();
	name = name.replace(/(^\s*)|(\s*$)/g, "");
	if(name==''){
		$name.parent().find('.show-need').show();
	}
	else{
		$name.parent().find('.show-need').hide();
	}
}

function doCheckGroupType(obj){
	var group_type = $(obj).val();
	group_type = group_type.replace(/(^\s*)|(\s*$)/g, "");
	var nextObj = $(obj).next('span');
	if(group_type==''){
		nextObj.css({'display': 'inline-block'});
	}
	else{
		nextObj.hide();
	}
}

function doEditGroup(group_id){
	var $input = $('input[name="'+group_id+'"]');
	$('a[name="'+group_id+'"]').show();
	$('a[name="'+group_id+'"]').next().show();
	$input.parent().find('font').hide();
	$input.find('a').andSelf().show();
}

function doSubmitGroupName(group_id){
	var $input = $('input[name="' + group_id + '"]');
	group_name = $input.val();
	layer.load('加载中……', 1);
	var param = {};
	param['group_id'] = group_id;
	param['group_name'] = group_name;
	if (group_name == "" || group_name == null) {
		layer.msg('分组名不能为空', 1, 0);
		return;
	}
	$.ajax({
		url : './groupMan.do?method=editGroup',
		type : "POST",
		data : param,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data) {
			layer.closeAll();
			if (data == '1') {
				layer.msg('编辑分组成功', 2, 1, function(){
					location.reload();
				});
			} else {
				layer.msg('编辑分组失败,请稍后重试!', 2, -1);
			}
		}
	});
}

function doDelGroup(group_id){
	$.layer({
	    shade : [0.5, '#000', true],
	    area : ['240','150'],
	    dialog : {
	        msg:'确定要删除该分组?',
	        btns : 2, 
	        type : 5,
	        btn : ['确定','取消'],
			yes: function() {
				var param = {};
				param['group_id'] = group_id;
				$.ajax({//servicebus/service/group
					url: './groupMan.do?method=delGroup',
					type: "POST",
					data: param,
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					success: function(data){
						if(data=='1'){
							layer.msg('删除分组成功', 1, 1, function(){
								location.reload();
							});
						}
						else{
							layer.msg('删除分组失败,请稍后重试!', 1, 0);
						}
			  		}
				});
			}
	    }
	});
/*	
	homebox.showConfirm({
		ok: function() {
			var param = {};
			param['group_id'] = group_id;
			$.ajax({//servicebus/service/group
				url: 'servicebus/service/group/groupMan.do?method=delGroup',
				type: "POST",
				data: param,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				success: function(data){
					if(data=='1'){
						layer.msg('删除分组成功', 1, 1, function(){
							location.reload();
						});
					}
					else{
						layer.msg('删除分组失败,请稍后重试!', 1, 0);
					}
		  		}
			});
		},
		cancel: function() {
		}
	});*/

}