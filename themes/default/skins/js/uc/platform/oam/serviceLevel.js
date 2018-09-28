function addServiceLevelHandler(service_id){
	$.layer({
		type: 1,
		title: "添加服务级别",
		closeBtn: [0, true],
		border : [5, 0.5, '#666', true],
		offset: ['100px','400px'],
		area: ['auto','auto'],
		page: {
			dom: '#dlg_for_level_add'
		}
	});
}
function closeLevelHandler(){
	layer.closeAll();
}
function addLevelHandler(){
	var $parent = $('#levelforms_add');
	var result = true;
	if(!checkLevelName($parent)){
		result = false;
	}
	if(!checkHourDesc($parent)){
		result = false;
	}
	if(!checkDayDesc($parent)){
		result = false;
	}
	if(!checkMonthDesc($parent)){
		result = false;
	}
	if(result){
		$.ajax({
			url: './serviceLevel.do?method=addLevel',
			type: "POST",
			data: $('#levelforms_add').serialize(),
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(data){
				layer.closeAll();
				if(data=='1'){
					layer.msg('添加服务级别成功', 1, 1, function(){
						location.reload();
					});
				}
				else{
					layer.msg('添加服务级别失败,请稍后重试!', 1, 0);
				}
	  		}
		});
	}
}

function checkLevelName($parent){
	var $level_name = $parent.find('input[name="level_name"]');
	var levelname=$level_name.val();
	levelname = levelname.replace(/(^\s*)|(\s*$)/g, "");
	if(levelname==''){
		$level_name.next('font.show_need').html('级别名称不能为空').show();
		return false;
	}
	$level_name.next('font.show_need').hide();
	return true;
}

function checkHourDesc($parent){
	var $levelhour = $parent.find('input[name="hour_maximum"]');
	var levelhour = $levelhour.val();
	levelhour = levelhour.replace(/(^\s*)|(\s*$)/g, "");
	if(levelhour==''){
		$levelhour.next('font.show_need').html('不能为空').show();
		return false;
	}
	 var reg =/^[1-9]\d*$/;
	 if(!reg.test(levelhour)){
		 $levelhour.next('font.show_need').html('必须为整数').show();
		 return false;
	 }
	 $levelhour.next('font.show_need').hide();
	 return true;
}

function checkDayDesc($parent){
	var $levelhour = $parent.find('input[name="day_maximum"]');
	var levelhour = $levelhour.val();
	levelhour = levelhour.replace(/(^\s*)|(\s*$)/g, "");
	if(levelhour==''){
		$levelhour.next('font.show_need').html('不能为空').show();
		return false;
	}
	 var reg =/^[1-9]\d*$/;
	 if(!reg.test(levelhour)){
		 $levelhour.next('font.show_need').html('必须为整数').show();
		 return false;
	 }
	 $levelhour.next('font.show_need').hide();
	 return true;
}

function checkMonthDesc($parent){
	var $levelhour = $parent.find('input[name="month_maximum"]');
	var levelhour = $levelhour.val();
	levelhour = levelhour.replace(/(^\s*)|(\s*$)/g, "");
	if(levelhour==''){
		$levelhour.next('font.show_need').html('不能为空').show();
		return false;
	}
	 var reg =/^[1-9]\d*$/;
	 if(!reg.test(levelhour)){
		 $levelhour.next('font.show_need').html('必须为整数').show();
		 return false;
	 }
	 $levelhour.next('font.show_need').hide();
	 return true;
}

//编辑服务级别的处理函数
function editServiceLevel(level_id){
	var $tr = $('tr[levelID='+level_id+']');
	var $tds = $tr.find('td');
	$('#levelforms_edit input[name="level_id"]').val($tr.attr('levelID'));
	$('#levelforms_edit input[name="level_name"]').val($tds.eq(1).html());
	$('#levelforms_edit textarea[name="level_desc"]').html($tds.eq(2).attr('detail'));
	$('#levelforms_edit input[name="hour_maximum"]').val($tds.eq(3).attr('hour'));
	$('#levelforms_edit input[name="day_maximum"]').val($tds.eq(3).attr('day'));
	$('#levelforms_edit input[name="month_maximum"]').val($tds.eq(3).attr('month'));
	$.layer({
		type: 1,
		title: "编辑服务级别",
		closeBtn: [0, true],
		border : [5, 0.5, '#666', true],
		offset: ['100px','400px'],
		area: ['auto','auto'],
		page: {
			dom: '#dlg_for_level'
		}
	});
}

function editLevelHandler(){
	var $parent = $('#levelforms_edit');
	var result = true;
	if(!checkLevelName($parent)){
		result = false;
	}
	if(!checkHourDesc($parent)){
		result = false;
	}
	if(!checkDayDesc($parent)){
		result = false;
	}
	if(!checkMonthDesc($parent)){
		result = false;
	}
	if(result){
		$.ajax({
			url: './serviceLevel.do?method=editLevel',
			type: "POST",
			data: $('#levelforms_edit').serialize(),
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(data){
				layer.closeAll();
				if(data=='1'){
					layer.msg('编辑服务级别成功', 1, 1, function(){
						location.reload();
					});
				}
				else{
					layer.msg('编辑服务级别失败,请稍后重试!', 1, 0);
				}
	  		}
		});
	}
}

function doDelLevel(level_id){
/*	homebox.showConfirm({
		kind:3,
		content: "是否删除该条服务级别？",
		ok: function() {
			_doDelLevel(level_id);
		},
		cancel: function() {
		}
	});*/

	$.layer({
	    shade : [0.5, '#000', true],
	    area : ['240','150'],
	    dialog : {
	        msg:'是否删除该条服务级别？',
	        btns : 2, 
	        type : 5,
	        btn : ['确定','取消'],
	        yes : function(){
	        	_doDelLevel(level_id);
	        }
	    }
	});
}
function _doDelLevel(level_id){
	var param = {};
	param['level_id'] = level_id;
	$.ajax({
		url: './serviceLevel.do?method=delLevel',
		type: "POST",
		data: param,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(data){
			if(data=='1'){
				layer.msg('删除服务级别成功', 1, 1, function(){
					location.reload();
				});
			}
			else{
				layer.msg('删除服务级别失败,请稍后重试!', 1, 0);
			}
  		}
	});
}
