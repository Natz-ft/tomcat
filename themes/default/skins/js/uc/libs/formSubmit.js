/**
 * 进行URL请求（form）
 * @param {} formId
 * @param {} url
 * @param {} fun
 */
function formRequestURL(formId,url,fun){
	$("#" + formId).ajaxSubmit({
		url:url,
		type:"post",
		success:function(data) {
			fun(data);
		},error:function(){
			alert("提交失败");
		}
	});
}