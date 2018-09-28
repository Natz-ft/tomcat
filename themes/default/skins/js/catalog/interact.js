/**
 * Created by ZhangYE on 2015/11/30.
 */
$(document).ready(function() {

    /**** 发布动态交互 ****/
    /** 发布类型切换 **/
    $('body').on('click','.publish-tab-header>ul>li',function(){
        var count = $(this).index();
        $(this).addClass('active').siblings('li').removeClass('active');
        $(this).parents('.publish-tab-header').siblings('.publish-tab-content').children('ul').children('li').hide().eq(count).show();
    });
    /** 上传附件 **/
    var file_url;
    $('.publish-attachment').change(function(){
        if($(this).val()!=''){
            file_url = $(this).val();
            var attach_url_arr = $(this).val().split(/\\/g),
                attach_name_arr = attach_url_arr[attach_url_arr.length - 1].split('.'),
                attach_name = attach_name_arr[0],
                attach_type = attach_name_arr[1];
            if($(this).parents('.publish-operation').siblings('.attach-box').length == 0){
                var attach_html = '<div class="attach-box">'
                    +'附件：'
                    +'<span class="attach-name">'+attach_name+'</span>'
                    +'.'
                    +'<span class="attach-type">'+attach_type+'</span>'
                    +'<a href="#" class="attach-remove">X</a>'
                    +'</div>';
                $(this).parents('.publish-operation').after(attach_html);
            }
            else{
                $(this).parents('.publish-operation').siblings('.attach-box').find('.attach-name').text(attach_name).find('.attach-type').text(attach_type);
            }
        }
    });
    $('.publish-box').on('click','.attach-remove',function(){
        $(this).parent('.attach-box').remove();
    });
    /** 点击@ **/
    $('#pub-at').click(function(){
        var pub_now = $('#pub-textarea').val();
        $('#pub-textarea').val(pub_now + '@').focus();
    });
    /** 点击# **/
    $('#pub-topic').click(function(){
        addTopic();
    });

    /** 点击@项目 **/
    $('#pub-project').click(function(){
        var pub_now = $('#pub-textarea').val();
        $('#pub-textarea').val(pub_now + '@').focus();
    });
    /** 点击@小组 **/
    $('#pub-group').click(function(){
        var pub_now = $('#pub-textarea').val();
        $('#pub-textarea').val(pub_now + '@').focus();
    });
    /** 表情包交互 **/
    $('body').on('click','.emotion',function(event){
        var text_input;
        if($(this).parents('.publish-operation').length>0){
            text_input = $(this).parents('.publish-operation').siblings('.publish-input').find('.m-input');
        }
        else{
            text_input = $(this).siblings('.m-input');
        }
        $(this).sinaEmotion(text_input);
        event.stopPropagation();
    });
    $('.list-content').parseEmotion();
    $('.review-text').parseEmotion();
    /** 发布范围选择 **/
    $('.publish-range>div').click(function(){
        $(this).siblings('ul').slideToggle();
    });
    $('.publish-range>ul>li').click(function(){
        var text_range = $(this).text();
        $(this).parent().siblings('div').find('span').text(text_range);
    });
    var bRange = false;
    $('.publish-range>div').mouseover(function(){
        bRange = true;
    });
    $('.publish-range>div').mouseleave(function(){
        bRange = false;
    });
    $(document).click(function(){
        if(!bRange){
            $('.publish-range>ul').hide();
        }
    });
    /** 转发操作 **/
    $('.operate-forward').click(function(){
        var originDom;
        if($(this).parents('.list-box').find('.list-forward').length==0){
            originDom = $(this).parents('.list-box').children('.list-info');
        }
        else{
            originDom = $(this).parents('.list-box').find('.list-forward').children('.list-info');
        }
        var orignUser = originDom.find('.list-user').text(),
            orignUserUrl = originDom.find('.list-user').attr('href'),
            orignText = originDom.find('.list-content').html();
        if(!orignText){
            orignText = originDom.find('.list-title').children('span').text();
        }
        var forward_html = '<a href="'+ orignUserUrl +'">@'+ orignUser +'</a>：'+ orignText +'';
        $('.forward-modal .list-content').html(forward_html);
        $('.forward-modal .forward-publish .m-input').val('');
        $('.forward-modal .forward-publish span').text(orignUser);
    });
    $('#forwardModal').on('shown.bs.modal', function (e) {
        $('.forward-modal .forward-publish .m-input').focus();
    });
    /** 评论显示 **/
    $('.list-operation>ul>li a').click(function(e){
        e.preventDefault();
    });
    $('.operate-review').click(function(){
        $(this).parents('.list-box').siblings('.list-review').toggle();
    });
    /** 回复评论 **/
    var review_html = '<div class="reply-box">'
        +'<input type="text" class="m-input">'
        +'<i class="fa fa-smile-o emotion"></i>'
        +'<button class="m-btn btn-danger btn-xs">评论</button>'
        +'</div>';
    $('.review-reply').click(function(){
        if($(this).parents('.review-content').siblings('.reply-box').length == 0){
            $(this).parents('.review-content').after(review_html);
            var reply_user = $(this).parents('.review-content').find('.user-name').text();
            $(this).parents('.review-content').siblings('.reply-box').find('.m-input').val('回复@'+reply_user+'：').focus();
        }
        else{
            $(this).parents('.review-content').siblings('.reply-box').remove();
        }
    });
    /** 单个图片放大功能 **/
    $('.list-img>img').click(function(){
        $(this).parent('.list-img').toggleClass('img-bigger');
    });
    /** 多图放大功能 **/
    $('.list-img>ul>li>img').click(function(){
        $(this).parent('li').toggleClass('active').siblings('li').removeClass('active');
        $(this).parents('.list-img').toggleClass('img-bigger');
        /** 计算箭头位置 **/
        var img_box_height = parseInt($(this).parents('.list-img').css('height')),
            arrow_height = parseInt($(this).parents('.list-img').find('.list-img-arrow').children('div').css('height'));
        var arrow_top = (img_box_height/2) - (arrow_height/2);
        $(this).parents('.list-img').find('.list-img-arrow').children('div').css('top',arrow_top);
    });
    /** 箭头点击更换图片 **/
    $('.list-img>.list-img-arrow>div').click(function(){
        var count;
        if($(this).index()==0){
            count = $(this).parents('.list-img').find('.active').index();
            if(count == 0){
                return false;
            }
            else{
                $(this).parents('.list-img').find('.active').removeClass('active').prev().addClass('active');
            }
        }
        if($(this).index()==1){
            count = $(this).parents('.list-img').find('.active').index();
            if(count == $(this).parents('.list-img').children('ul').children('li').length -1 ){
                return false;
            }
            else{
                $(this).parents('.list-img').find('.active').removeClass('active').next().addClass('active');
            }
        }
        /** 计算箭头位置 **/
        var img_box_height = parseInt($(this).parents('.list-img').css('height')),
            arrow_height = parseInt($(this).css('height'));
        var arrow_top = (img_box_height/2) - (arrow_height/2);
        $(this).css('top',arrow_top).siblings('div').css('top',arrow_top);
    });
});