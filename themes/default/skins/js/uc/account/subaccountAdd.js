$(document).ready(function(){
	// validating rule
	jQuery.validator.addMethod("pswd_strength", function(value, element) {
		var pswdStr=testPassWordStrength(value);
		if(pswdStr<2){
			return false;
		}else{
			return true;}
		}, "密码强度过低，请选择使用字母、数字或特殊字符中任两种"); 
			
			
	//init validation
	$(function(){
		$("#register_form_per").validate({
			rules:{
				login_name:{
					required:true,
					loginName_rule:true,
					remote:checkLoginNameUrl
					},
				nickname:{
					required:true,
					maxlength:20
						},
				password:{
					required:true,
					password_rule:true,
					pswd_strength:true 
					},
				confirm_password:{
					required:true,
					equalTo:"#password_per"
						},	
				login_email:{
					required:true,
					email:true,
					remote:checkEmailUrl
						},
				user_type:{
					required:true
					},
				dept_uid:{
					required:true
					}
				},
			messages:{
				login_name:{
					required:"请自定义登录用户名",
					loginName_rule:"格式不符合要求"
					},
				nickname:{
						required:"请输入昵称",
						maxlength:"超出范围"
						},
				password:{
					required:"请输入密码",
					password_rule:"请按要求填写"
						},
				confirm_password:{
					required:"请输入确认密码",
					equalTo:"请与上次输入密码相一致"
							},	
				login_email:{
					required:"请输入您的邮箱",
					email:"请输入正确的邮箱"
							},
				user_type:{
							required:"请选择一种注册类型"
						  },
				dept_uid:{
							required:"请选择所属机构"
						  }
				}
			});
	});
	
	$("#cancel_btn").on("click",function(){
		
		$('input').val("");
		
	});
	
	$("#btn-submit_per").on("click",function(){
		var validate=$("#register_form_per").valid();
		if(!validate){
			return false;
			}
		$("#dept_uid_hidden").val($("#dept_uid").attr("action-uid"));
		$("#passwordStrength_per").val(testPassWordStrength($("#password_per").val()));
		$("#confirm_password").val("");
		//pwd jiami
		$("#password_per").val(toMD5Str($("#password_per").val()));
		$("#confirm_password_per").val(toMD5Str($("#confirm_password_per").val()));
		//submit
		$("#register_form_per").ajaxSubmit({
			success:function(data) {
				data = eval('('+data+')');
				$('#password_per').val("");
				$('#confirm_password_per').val("");
				if(data>0) {
					dialog.confirm("提示","创建子账号成功。是否继续创建子账号？",function(decision){
						if(decision){
			         		window.location.reload();
						}else{
							if(typeof subAccountUrl != 'undefined'){
			         			window.location.href = subAccountUrl;
			         		}
						}
					});
					
				}else{
					dialog.error("创建子账号失败。请稍后重试！",function(){
						$('#password_per').val("");
						$('#confirm_password_per').val("");
					});
				}
			}
		});
	});
	
	// reset input
	var resetAll = function(){
		$(".input").val("");
		$("#register_form_per").find(".form-tip").html("");
		$(".input_checkbox").removeAttr("checked");
	};
	resetAll();
});


var showLayer = function(layer,ref){
	layer.show();
	//layer.alignTo(ref,"tl-tl");
};
var hideLayer = function(layer,ref){
	layer.hide();
	ref.blur();
};
var setDept = function(ref,deptName,deptUid){
	ref.val(deptName);
	ref.attr("action-uid",deptUid);
};
var initLayerEvent = function(layer,ref){
	layer.attr("action-event","ok");
	layer.find(".layer_close").on("click",function(){
		hideLayer(layer,ref);
	});
}
$("#dept_uid").on("focus",function(){
	$(this).blur();
	var layer = $("#layer_dept_list");
	if(layer.attr("action-event") == "none"){
		initLayerEvent(layer,$(this));
	}
	showLayer(layer,$(this));
});

var deptShow=function(dept_list,pid,nowDeptUid){
	
	var tempPid = 0;
	var tempUid = 0;
	var tempNickName = 0;
	var parentDept = "";
	var parentDept = "";
	var nowDept = "";
	var childrenDept = "";
	
	for(index in dept_list){
		tempPid = dept_list[index]['pid'];
		tempUid = dept_list[index]['uid'];
		tempNickName = dept_list[index]['nick_name'];
		//父级
		if(pid != -1  && pid == tempUid){
			parentDept = '<LABEL style="color: rgb(40,135,218);" title="'+tempNickName+'">'
					  +		'<A href="javascript:void(0);" style="font-weight: normal;padding-right:0px; color: rgb(40,135,218);"  class="dept-link" action-uid="'
					  + 		tempUid+'" action-pid ="'+tempPid+'" hidefocus>'+tempNickName+'</A>'
					  + '</LABEL>'
					  + '<span style="color:#666;"> &nbsp;> &nbsp;</span>';
		}
		//当前级
		if(tempUid == nowDeptUid){
			nowDept = '<LABEL title="'+tempNickName+'">'
					 +   '<INPUT class="input_checkbox" type="radio" hidefocus value="'+ tempNickName +'" action-uid="'
					 + 		tempUid+'"name="dept-items" />'
					 +    '<span>'+ tempNickName +'</span>';
					 + '</LABEL>';
		}
		//下级
		if(tempPid == nowDeptUid){
			childrenDept = childrenDept
						 +'<LI><LABEL style="color: rgb(40,135,218);" title="'+tempNickName+'">'
						 +	'<INPUT class="input_checkbox" type="radio" hidefocus action-uid="'
						 + 			tempUid+'" value="'+tempNickName+'" name="dept-items"/>' 
						 +	'<A href="javascript:void(0);" style="color: rgb(40,135,218);" class="dept-link" action-pid ="'+nowDeptUid+'" action-uid ="'+tempUid+'" hidefocus>'+tempNickName+'</A>'
						 + '</LABEL></LI>';
		}
		
	}
	
	$("#layer_title").html(parentDept);
	$("#layer_title").append(nowDept);
	$("#layer_all_list").html(childrenDept);
	
	//初始化上下级链接的绑定事件
	
	$('.dept-link').on('click',function(){
		var deptPid = $(this).attr('action-pid');
		var ownDeptUid = $(this).attr('action-uid');
		deptShow(dept_list,deptPid,ownDeptUid);
	});
	
	$('.input_checkbox').on('click',function(){
		
		var deptUid = $(this).attr("action-uid");
		var deptName = $(this).val();
		var layer = $("#layer_dept_list");
		var ref = $("#dept_uid");
			
		setDept(ref,deptName,deptUid);
		hideLayer(layer,ref);
	});
	
};

//初始化pid=-1最上级
if(dept_list != null){
	deptShow(dept_list,-1,sessionUid);
}



