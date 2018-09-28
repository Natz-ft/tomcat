$(document).ready(function(){
	$(".del-account").live("click",function(){
		uid_temp = $(this).attr("alt-uid");
		nick_name = $(this).attr('alt-nick');
		dialog.confirm("删除提示",'确定删除子账号 "'+nick_name+'" ?<br>',function(decision){
			if(decision){
				$.ajax({
					url:delSubAccountUrl,
					data: {sub_account:uid_temp},
					type : "POST",
					success : function(data){
						data = eval('('+data+')');
						if(data == '1'){
							$('#tr_'+uid_temp).remove();
						}else{
							dialog.error('删除失败，请稍后重试！');
						}
					}
				});
			}
		});
	});
});
var uid_temp;
var getSubAccountList = function(main_account){
	
	if($("#sub_account_list").length>0){
		$("#sub_account_list").remove();
	}
	$.ajax({
		url:getSubAccountListUrl,
		data: {main_account:main_account},
		type : "POST",
		success : function(res){
			if(res.indexOf("sub_account_list") >0){
				$(".account-show-panel").append(res);
			}else{
				res = eval('('+res+')');
				if(res==-1){
					dialog.error("非法操作！");
				}else{
					dialog.error("子账号加载失败，请刷新重试！");
				}
			} 
		}
	});
};

var deptShow=function(dept_list,pid,nowDeptUid){
	var tempPid = 0;
	var tempUid = 0;
	var tempNickName = 0;
	var parentDept = "";
	var parentDept = "";
	var nowDept = "";
	var childrenDept = "";
	var parent_now_contain_begin = ' <div class="parent_now_account_contain"><span style="color: black;">当前组织：</span>';
	var parent_now_contain_end = ' </div>';
	var children_contain_begin =  '<div class="children_account_contain">';
	var children_contain_end = '</div>';
	
	for(index in dept_list){
		tempPid = dept_list[index]['pid'];
		tempUid = dept_list[index]['uid'];
		tempNickName = dept_list[index]['nick_name'];
		//父级
		if(pid != -1  && pid == tempUid){
			parentDept = '<A class="parent_account dept-link" title="'+ tempNickName +'"href="javascript:void(0);" style="font-weight: normal;padding-left: 5px; color:rgb(40,135,218) ;padding-right:0px;"  action-uid="'
						+ 	 tempUid+'" action-pid ="'+tempPid+'" hidefocus>'+tempNickName+'</A>'
						+  '<span> &nbsp;> &nbsp;</span>';
		}
		//当前级
		if(tempUid == nowDeptUid){
			nowDept = '<span style="color:#A42D00 ; padding-left:10px;font-weight:bold;font-size:16px;">'
					+	tempNickName+'</span>';
		}
		//下级
		if(tempPid == nowDeptUid){
			childrenDept = childrenDept
						 + '<A  class="children_account dept-link" href="javascript:void(0);"   action-pid ="'+nowDeptUid+'" action-uid ="'+tempUid+'" hidefocus >'
						 + 	   '<span title="'+tempNickName+'">'+tempNickName+'</span>'
						 + 	   '<img src="'+tipPhotoUrl+'" title="获取下级组织"style="width:10px;height:11px;margin-top:8px;padding-left:5px;">'
						 + '</A>'
		}
	}
	
	
	var deptHtml = parent_now_contain_begin+parentDept+nowDept+parent_now_contain_end+children_contain_begin+childrenDept+children_contain_end;
	$(".parent_now_children_account_contain").html("");
	$(".parent_now_children_account_contain").append(deptHtml);
	if($(".children_account").length==0){
	$(".children_out_contain span").remove();
	}
	
	//初始化上下级链接的绑定事件
	$('.dept-link').on('click',function(){
		var deptPid = $(this).attr('action-pid');
		var ownDeptUid = $(this).attr('action-uid');
		deptShow(dept_list,deptPid,ownDeptUid);
		getSubAccountList(ownDeptUid);
	});
	
};
//初始化pid=-1最上级
if(dept_list != null){
	deptShow(dept_list,-1,sessionUid);
}




