/**
 * Created by ZhangYE on 2017/7/7.
 */

require.config({
    paths: {
        'echarts': '../libs/assets/echarts',
       'theme' : '../libs/assets/echarts-themes'
    }
});


$(function () {
    $('.m-dt-tab .dt-tab-header>ul>li').click(function () {
        //tab页切换
        $(this).addClass('active').siblings('li').removeClass('active');
        var target = $(this).attr('data-target');
        $('#'+target).addClass('active').siblings('li').removeClass('active');
        //切换完成，执行changeTab方法，初始化对应tab页内容
        changeTab(target);
    });
    //默认初始化基础信息的tab页
    var type = $("input[name='details']").val();
    if(type!=null){
    	if(type.indexOf("file")>=0){
        	var target = $(this).attr('data-target');
            $('[data-target="dt-file"]').addClass('active').siblings('li').removeClass('active');
            $('#dt-file').addClass('active').siblings('li').removeClass('active');
        	changeTab('dt-file');
        }else if(type.indexOf("api")>=0){
            var target = $(this).attr('data-target');
            $('[data-target="dt-api"]').addClass('active').siblings('li').removeClass('active');
            $('#dt-api').addClass('active').siblings('li').removeClass('active');
        	changeTab('dt-api');
        }else{
        	changeTab('dt-base');
        }
    }else{
    	changeTab('dt-base');
    }
    SyntaxHighlighter.all();
});
function changeTab(tabId){
	var  cata_id = $("#cata_id").val();
    var tabDom = $('#'+tabId),
        bInit = tabDom.attr('data-init');
    //根据data-init属性判断tab页是否已经初始化
    if(bInit!='true'){
        switch (tabId){
            case 'dt-base':
                baseTabInit();
                break;
            case 'dt-table':
                tableTabInit(cata_id);
                break;
            case 'dt-chart':
            	chartTabInit(cata_id);
                break;
            case 'dt-map':
            	mapTabInit(cata_id);
                break;
            case 'dt-relate':
                relateTabInit();
                break;
            case 'dt-file':
            	fileTabInit();
                break;
            case 'dt-api':
                apiTabInit();
                break;
            case 'dt-comment':
                commentTabInit();
                break;
        }
    }
    tabDom.attr('data-init','true');
}