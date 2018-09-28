/**
 * Created by ZhangYE on 2016/5/9.
 */
//交互效果
$(function() {
    var _uat=navigator.userAgent;
    if(_uat.indexOf("MSIE 6.0")>0) alert("您正在使用 IE6 浏览器，部分功能可能因兼容性无法实现！推荐使用 Chrome / Firefox / Safari以及 IE9 以上浏览器浏览本站。");
    else if(_uat.indexOf("MSIE 7.0")>0) alert("您正在使用 IE7 浏览器，部分功能可能因兼容性无法实现！推荐使用 Chrome / Firefox /Safari以及 IE9 以上浏览器浏览本站。");
    //筛选条件点击切换
    $('.filter-list li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
            var filter_obj = $(this).text();//获取点击筛选条件
            var parent_obj = $(this).parents('.filter-body').siblings('.filter-header').text();//获取点击筛选条件的类别
            //"分类"类别下操作
            if(parent_obj=='分类：'){
                if(filter_obj=='推荐'){
                    $('.theme-first-list').show();
                    $('.theme-second-list').hide();
                    $('.theme-first-list li').removeClass('active');
                    $('.theme-second-list li').removeClass('active');

                    $('.filter-theme-part').hide();
                    $('.filter-depart-part').hide();
                    $('.sel-first').text('');
                    $('.sel-first').parent('li').hide();
                    $('.sel-second').text('');
                    $('.sel-second').parent('li').hide();
                    $('.sel-depart').text('');
                    $('.sel-depart').parent('li').hide();
                }
                if(filter_obj=='主题'){
                    $('.filter-depart-part').hide();
                    $('.filter-theme-part').slideToggle();
                }
                if(filter_obj=='机构'){
                    $('.filter-theme-part').hide();
                    $('.filter-depart-part').slideToggle();
                }
            }
            //其他类别添加已选条件
            else{
                if(filter_obj!='不限'){
                    if(parent_obj=='类别：'){
                        $('.sel-tag').text(filter_obj);
                        $('.filter-selected').fadeIn();
                        $('.sel-tag').parent('li').show();
                    }
                    if(parent_obj=='格式：'){
                        $('.sel-format').text(filter_obj);
                        $('.filter-selected').fadeIn();
                        $('.sel-format').parent('li').show();
                    }
                    if(parent_obj=='评级：'){
                        $('.sel-star').text(filter_obj);
                        $('.filter-selected').fadeIn();
                        $('.sel-star').parent('li').show();
                    }
                    if(parent_obj=='价格：'){
                        $('.sel-price').text(filter_obj);
                        $('.filter-selected').fadeIn();
                        $('.sel-price').parent('li').show();
                    }
                }
                //点击不限
                if(filter_obj=='不限'){
                    $(this).siblings('li').removeClass('active');
                    if(parent_obj=='类别：'){
                        $('.sel-tag').text('');
                        $('.sel-tag').parent('li').hide();
                    }
                    if(parent_obj=='格式：'){
                        $('.sel-format').text('');
                        $('.sel-format').parent('li').hide();
                    }
                    if(parent_obj=='评级：'){
                        $('.sel-star').text('');
                        $('.sel-star').parent('li').hide();
                    }
                    if(parent_obj=='价格：'){
                        $('.sel-price').text('');
                        $('.sel-price').parent('li').hide();
                    }
                }
            }
        });
    });
    //主题一级列表点击事件
    $('.theme-first-list li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
            $('.theme-first-list').hide();
            $('.theme-second-list').fadeIn();
            $('.second-title span').text($(this).find('span').text());
            //添加到已选条件
            $('.sel-first').text($(this).find('span').text());
            $('.filter-selected').fadeIn();
            $('.sel-first').parent('li').show();
        });
    });
    //主题二级列表点击事件
    $('.theme-second-list li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
            //添加到已选条件
            $('.sel-second').text($(this).text());
            $('.filter-selected').fadeIn();
            $('.sel-second').parent('li').show();
        });
    });
    //部门点击事件
    $('.depart-list li').each(function(){
        $(this).click(function(event) {
            $('.depart-list li').removeClass('active');
            $(this).addClass('active');
            //添加到已选条件
            $('.sel-depart').text($(this).text());
            $('.filter-selected').fadeIn();
            $('.sel-depart').parent('li').show();
        });
    });
    //删除全部已选条件
    $('.selected-empty').click(function(event) {
        $('.selected-body').text('');
        $('.filter-selected li').hide();
        $('.theme-first-list').show();
        $('.theme-second-list').hide();
        $('.theme-first-list li').removeClass('active');
        $('.theme-second-list li').removeClass('active');
        $('.filter-theme-part').hide();
        $('.filter-depart-part').hide();
        $('.filter-list li').removeClass('active');
        $('.filter-list').each(function(){
            $(this).children('li').eq(0).addClass('active');
        });
    });
    //删除单个已选条件
    $('.filter-selected ul li i').click(function(event) {
        var sel_obj = $(this).parent('li').index();//获取点击的已选类别
        if(sel_obj==0){//删除一级主题
            $('.theme-first-list').show();
            $('.theme-second-list').hide();
            $('.theme-first-list li').removeClass('active');
            $('.theme-second-list li').removeClass('active');
            //去掉一级主题
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
            //去掉二级主题
            $('.filter-selected ul li').eq(1).find('.selected-body').text('');
            $('.filter-selected ul li').eq(1).hide();
        }
        if(sel_obj==1){//删除二级主题
            $('.theme-first-list').show();
            $('.theme-second-list').hide();
            $('.theme-second-list li').removeClass('active');
            //去掉二级主题
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
        }
        if(sel_obj==2){//删除部门
            $('.depart-list li').removeClass('active');
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
        }
        if(sel_obj==3){//删除类别
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
            $('.filter-main').eq(1).find('.filter-list li').removeClass('active');
            $('.filter-main').eq(1).find('.filter-list li').eq(0).addClass('active');
        }
        if(sel_obj==4){//删除格式
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
            $('.filter-main').eq(2).find('.filter-list li').removeClass('active');
            $('.filter-main').eq(2).find('.filter-list li').eq(0).addClass('active');
        }
        if(sel_obj==5){//删除评级
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
            $('.filter-main').eq(3).find('.filter-list li').removeClass('active');
            $('.filter-main').eq(3).find('.filter-list li').eq(0).addClass('active');
        }
        if(sel_obj==6){//删除价格
            $(this).siblings('.selected-body').text('');
            $(this).parent('li').hide();
            $('.filter-main').eq(4).find('.filter-list li').removeClass('active');
            $('.filter-main').eq(4).find('.filter-list li').eq(0).addClass('active');
        }
    });
    //判断是否显示已选条件
    $('.cata-filter').click(function() {
        var count_obj = 0;
        $('.filter-selected li').each(function() {
            var display_obj = $(this).css('display');
            if (display_obj != 'none') {
                count_obj++;
            }

        });
        if (count_obj == 0) {
            $('.filter-selected').hide();
        }
    });
    //收起筛选菜单
    var switch_obj=1;
    $('.filter-toggle-btn').click(function(event) {
        $('.filter-toggle').slideToggle();
        if(switch_obj==1){
            $(this).html('展开<i class="iconfont">&#xe726;</i>');
            switch_obj=0;
        }
        else{
            $(this).html('收起<i class="iconfont">&#xe725;</i>');
            switch_obj=1;
        }
    });
    //排序点击切换
    $('.sort-list ul li').each(function(){
        $(this).click(function(event) {
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
        });
    });
    //列表/卡片展现形式点击切换
    $('.sort-itemstyle div').each(function(){
        $(this).click(function(event) {
            if($(this).index()==1){
                $('.cata-list').hide();
                $('.cata-card').fadeIn();
            }
            else if($(this).index()==0){
                $('.cata-card').hide();
                $('.cata-list').fadeIn();
            }
            $(this).siblings('div').removeClass('active');
            $(this).addClass('active');
        });
    });
    //下载排行-改变颜色
    $('.rank-list li').each(function(){
        if($(this).index()<3){
            $(this).find('span').css('background-color','rgb(23, 144, 207)');
        }
    });
    //返回顶部
    $(function () {
        $(window).scroll(function(){
            if ($(window).scrollTop()>100){
                $(".back-top").fadeIn(1500);
            }
            else{
                $(".back-top").fadeOut(1500);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $(".back-top").click(function(){
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
    });
})