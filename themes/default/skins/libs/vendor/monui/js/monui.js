/**
 * Created by ZhangYE on 2017/1/13.
 * 通用js，基于jquery
 */
$(function () {
    //tab切换
    $('body').on('click','.m-tablet .tab-header>ul>li', function () {
       var tab_count = $(this).index();
        $(this).addActive();
        $(this).parents('.tab-header').siblings('.tab-body').children().children().eq(tab_count).show().siblings().hide();
    });
    
    //切换active方法
    $.fn.addActive = function () {
        $(this).addClass('active').siblings().removeClass('active');
    };
});