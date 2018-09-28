function testService(){
    //验证必填字段是否填写
    var flag = true;
    var reqparam = {};
    var flagName ="";
    var sendText ="";
    $("input.param-input").each(function(){
        var value = $(this).val();
        var name = $(this).attr("name");
        var title = $(this).attr("title");
        value = value.replace(/(^\s*)|(\s*$)/g, "");
        if('' == value && title == '1'){
            flag = false;
            flagName = name;
            return;
        }else{
            reqparam[name] = value;
            sendText +=  name+" : " + value+"; ";
        }
    });
    if(!flag){
        dialog.info(flagName+'为必填字段',function(){},2000);
    }else{
        
        dialog.loading({text:'加载中',parent:$('.main')});
        $('.param-textarea').text(sendText);
        var serviceId = $("#serviceId").val();
        reqparam['serviceId'] = serviceId;
          
        $.ajax({
            type : 'post',
            url : './serviceTest.do?method=testService',
            data : reqparam,
            success : function(resultData){
                $('.main>.dialog-loading').modal('hide');
                Process(resultData);
            },
            timeout:10000,
            error:function(){
                dialog.info('接口测试失败，请稍后重试',function(){},3000);
                $('.main>.dialog-loading').modal('hide');
            }
            
        });
    }
}
