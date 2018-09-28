function addServiceLevelHandler(service_id){
	$.layer({
		type: 1,
		title: "添加标签",
		closeBtn: [0, true],
		border : [5, 0.5, '#666', true],
		offset: ['100px','400px'],
		area: ['auto','auto'],
		page: {
			dom: '#dlg_for_level_add'
		}
	});
}
function closeLayerAll(){
	layer.closeAll();
}
function addLevelHandler(){
	var $parent = $('#levelforms_add');
	var result = true;
	if(!checkLevelName($parent)){
		result = false;
	}
	if(result){
		$.ajax({
			url: './serviceTag.do?method=addLevel',
			type: "POST",
			data: $('#levelforms_add').serialize(),
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(data){
				layer.closeAll();
				if(data=='1'){
					layer.msg('编辑标签成功', 2, 1, function(){
						location.reload();
					});
				}
				else{
					layer.msg('编辑标签失败,请稍后重试!', 2, -1);
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

//编辑标签的处理函数
function editServiceLevel(level_id){
	var $tr = $('tr[levelID='+level_id+']');
	var $tds = $tr.find('td');
	$('#levelforms_edit input[name="level_id"]').val($tr.attr('levelID'));
	$('#levelforms_edit input[name="level_name"]').val($tds.eq(1).html());
	$('#levelforms_edit textarea[name="level_desc"]').html($tds.eq(2).attr('detail'));
	$('#levelforms_edit input[name="hour_maximum"]').val($tds.eq(3).attr('hour'));
	$('#levelforms_edit input[name="day_maximum"]').val($tds.eq(3).attr('day'));
	$('#levelforms_edit input[name="month_maximum"]').val($tds.eq(3).attr('month'));
	var catname=$tds.eq(3).html();
	$('#levelforms_edit select#category').find("option[cate_name="+catname+"]").attr("selected","selected");
	$.layer({
		type: 1,
		title: "编辑标签",
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
	if(result){
		$.ajax({
			url: './serviceTag.do?method=editLevel',
			type: "POST",
			data: $('#levelforms_edit').serialize(),
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(data){
				layer.closeAll();
				if(data=='1'){
					layer.msg('编辑标签成功', 1, 1, function(){
						location.reload();
					});
				}
				else{
					layer.msg('编辑标签失败,请稍后重试!', 1, 0);
				}
	  		}
		});
	}
}

function doDelLevel(level_id){
	$.layer({
	    shade : [0.5, '#000', true],
	    area : ['240','150'],
	    dialog : {
	        msg:'是否删除该条标签？',
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
	layer.closeAll();
	layer.load('删除中...', 1);
	var param = {};
	param['level_id'] = level_id;
	$.ajax({
		url: './serviceTag.do?method=delLevel',
		type: "POST",
		data: param,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(data){
			layer.closeAll();
			if(data=='1'){
				layer.msg('删除标签成功', 1,1, function(){
					location.reload();
				});
			}
			else{
				layer.msg('删除标签失败,请稍后重试!', 1, 0);
			}
  		}
	});
}
