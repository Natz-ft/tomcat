/**
 * 用户收藏操作
 * @param id 收藏对象Id
 * @param type 收藏对象类型 数据目录、服务、应用
 * @param name 收藏对象名称
 */
function collection(id,type,name){
	// 调用common.js判断是否登录
	if(!isLogged()) {
		showLoginDialog();
		return;
	}
	$.ajax({
		type : "POST",
		url : getRootPath()+"/common/Collection.do?method=Collection",
		data : {
			"id":id,
			"obj_type":type,
			"obj_name":name
		},
		dataType : "json",
		success : function(data) {
			if(data.code=="000001"){
				$('#bounceIn').click();
			}else{
				dialog.info(data.msg,function(){
					window.location.reload();
				},2000);
			}
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}
/**
 * 用户取消收藏操作
 * @param id 收藏对象Id
 * @param type 收藏对象类型 数据目录、服务、应用
 */
function cancleCollection(id,type){
	$.ajax({
		type : "POST",
		url : getRootPath()+"/common/Collection.do?method=CancelCollection",
		data : {
			"id":id,
			"obj_type":type,
		},
		dataType : "json",
		success : function(data) {
			dialog.info(data.msg, function() {
				window.location.reload();
			}, 2000);
			
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}
/**
 * 用户评分操作
 * @param id 收藏对象Id
 * @param score 分值
 */
function addScore(id,type,score){
	// 调用common.js判断是否登录
	if(!isLogged()) {
		showLoginDialog();
		return;
	}
	$.ajax({
		type : "POST",
		url : getRootPath()+"/common/Collection.do?method=addScore",
		data : {
			"id":id,
			"obj_type" : type,
			"score":score,
		},
		dataType : "json",
		success : function(data) {
			dialog.info(data.msg,function(){},3000);
		},
		error : function(data) {
			dialog.info("网络忙，请稍后再试",function(){},3000);
		}
	});
}