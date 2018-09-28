$(function(){
	$("#searchButton").click(function(){
		var flag = checkSearch();
		if(flag){
			$("#searchFormat").submit();
		}
		
	});
});

function checkSearch(){
	var searchKey = $("#searchKey").val();
	if(searchKey.isEmpty() || null == searchKey || "" == searchKey || typeof(searchKey) == undefined){	
		easyDialog.open({
			container : {
				content : "搜索关键字不能为空"
			},
			autoClose : 2000
		});
		return false;
	}
	return true;
}