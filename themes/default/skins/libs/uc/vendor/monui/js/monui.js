/**
 * Created by ZhangYE on 2017/1/13.
 * ͨ��js������jquery
 */
$(function () {
    //tab�л�
    $('body').on('click','.m-tablet .tab-header>ul>li', function () {
       var tab_count = $(this).index();
        $(this).addActive();
        $(this).parents('.tab-header').siblings('.tab-body').children().children().eq(tab_count).show().siblings().hide();
    });
    
    //�л�active����
    $.fn.addActive = function () {
        $(this).addClass('active').siblings().removeClass('active');
    };
});