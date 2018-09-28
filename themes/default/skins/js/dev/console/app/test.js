define(function(require, exports, module){
	
	exports.init = function(){
	    var loader =layer.load("测试信息正在加载，请稍候。。。");
		//获取已经绑定的用户
		$.ajax({
		    url: './app/testInfo.do?method=getBundingInfo',
		    type:'POST',
		    data:{app_id:app_id},
		    dataType:"JSON",
		    success:function(result){
		    	if(result==null){
		    		result = [];
		    	}
		    	var data = {};
		    	data.data = result;
		    	layer.close(loader);
		    	renderUser_ok(data);
		    	showUser();
		    },
		    error:function(e){
		    	alert(e);
		    }
		});		    
	}
	
	function renderUser_ok(data){
		var wrapper = $A.service('wrapper').getWrapper('content-wrap');
		//console.log(data);
		wrapper.loadWidget({
			id: 'showContent',
			tpl: {id: 'appTestTp1'},
			data: data});
	}
	
	function showUser(){
		// 获取正在申请中的用户
		$.ajax({
			url:"./app/testInfo.do?method=getApplyingUser",
			type:"POST",
			data:{"app_id":app_id},
			dataType:"JSON",
			success:function(data){
				//console.log(data);
				var result=[];
				if(data==null){
					data=[];
				}
				result.data =data;
				//console.log(result);
				var htm = template.render("show_render",result);
				$('#apply_list').html(htm);
			}
		});
	}
});

function showTest(user_type,user_id){
	layer.alert("测试用户类型"+user_type+",登陆用户名是"+user_id);
}
