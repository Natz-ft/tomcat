function testService(){
	
		var isFilled = true;
		var paramDiv = $('.service-param-item');
		var sreReq = '';
		$.each(paramDiv, function(index, obj){
			var objdiv = $(obj).find("div");
			//必填的字段进行非空校验
			var fonts = objdiv.eq(0).find('font');
			var value = fonts.eq(1).html();
			value = value.replace(/(^\s*)|(\s*$)/g, "");
			if(value=='(必填)'){
				var input = objdiv.eq(1).find('input');
				var name = input.attr('name'); 
				var val = input.val();
				val.replace(/(^\s*)|(\s*$)/g, "");
				if(val == ''){
					isFilled = false;
					fonts.eq(3).show();
				}
				else{
					fonts.eq(3).hide();
				}
				sreReq += name +":"+ val + '\r\n';
			}else{
				var input = objdiv.eq(1).find('input:eq(0)');
				var name = input.attr('name');
				var val = input.val();
				val.replace(/(^\s*)|(\s*$)/g, "");
				if(val==undefined){
					sreReq += name +":"+ '\r\n';
				}
				else{
					sreReq += name +":"+ val + '\r\n';
				}
			}
		});
		if(isFilled){
			easyDialog.open({
				container : {
					content : '测试中……'
				},
				autoClose : 2000
			});
			var reqparam = $('.request-test').serialize();
			$('.param-textarea').html(sreReq);
			$.ajax({
				type : 'post',
				url : './serviceTest.do?method=testService',
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : reqparam,
				success : function(resultData){
					$('.result-textarea').html(formatJson(resultData));
					//layer.closeAll();
				},
				timeout:10000,
				error:function(){
					//layer.closeAll();
					//layer.msg("调用超时，请稍后重试",1,0);
					easyDialog.open({
						container : {
							content : '调用超时，请稍后重试'
						},
						autoClose : 2000
					});
				}
				
			});
		}
	}