var caroArr = new Array();
function carousel(cid,cstyle,ctime){
    if(cstyle==null){
        cstyle='fade';
    }
    if(ctime==null){
        ctime = 3000;
    }
    var caro_finish = true;
    var caro_width = parseInt($('#'+cid+' .caro-main ul li').css('width'));
    //tab点击切换
    $('#'+cid+' .caro-tab ul li').click(function(event) {
        var count_obj = $(this).index();//获取点击的是第几个
        var caro_now;//记录当前显示的是第几个
        var caro_show = $(this).parents('.carousel').find('.caro-main li');
        $(this).parents('.carousel').find('.caro-main li').each(function(){
            if($(this).css('display')!='none'){
                caro_now = $(this).index();
            }
        });
        if(caro_finish == true){
            if(cstyle=='fade'){
                if(caro_now!=count_obj){
                    caro_finish = false;
                    caro_show.fadeOut(500);
                    caro_show.eq(count_obj).fadeIn(500,callback);
                }
            }
            if(cstyle=='slide'){
                clearInterval(_interval);
                caro_finish = false;
                if(caro_now<count_obj){
                    caro_show.eq(count_obj).css('left',caro_width +'px').css('display','list-item');
                    caro_show.eq(caro_now).animate({left:-caro_width +'px'},1000);
                    caro_show.eq(count_obj).animate({left:0},1000,slidecall);
                }
                if(caro_now>count_obj){
                    caro_show.eq(count_obj).css('left',-caro_width +'px').css('display','list-item');
                    caro_show.eq(caro_now).animate({left:caro_width +'px'},1000);
                    caro_show.eq(count_obj).animate({left:0},1000,slidecall);
                }
            }
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
        }
        function slidecall() {
            caro_show.eq(caro_now).hide(callback);
        }
    });
    //箭头点击切换
    $('#'+cid+' .caro-arrow div').click(function(event) {
        var arrow_obj = $(this).index();//获取点击的是哪个箭头
        var caro_now;//记录当前显示的是第几个
        var caro_next;//记录将要显示第几个
        var caro_show = $(this).parents('.carousel').find('.caro-main li');
        var tab_show = $(this).parents('.carousel').find('.caro-tab li');
        $(this).parents('.carousel').find('.caro-main li').each(function(){
            if($(this).css('display')!='none'){
                caro_now = $(this).index();
            }
        });
        if(arrow_obj==0){
            caro_next = caro_now - 1;
            if(caro_next<0){
                caro_next=caro_show.length - 1;
            }
        }
        if(arrow_obj==1){
            caro_next = caro_now + 1;
            if(caro_next==caro_show.length){
                caro_next=0;
            }
        }
        if(caro_finish == true){
            if(cstyle=='fade'){
                caro_finish = false;
                if(caro_now!=caro_next){
                    caro_show.fadeOut(500);
                    caro_show.eq(caro_next).fadeIn(500,callback);
                }
            }
            if(cstyle=='slide'){
                caro_finish = false;
                clearInterval(_interval);
                var slide_side;
                if(arrow_obj == 0){
                    caro_show.eq(caro_next).css('left',-caro_width +'px').css('display','list-item');
                    caro_show.eq(caro_now).animate({left:caro_width +'px'},1000);
                    caro_show.eq(caro_next).animate({left:0},1000,slidecall);
                }
                if(arrow_obj == 1){
                    caro_show.eq(caro_next).css('left',caro_width +'px').css('display','list-item');
                    caro_show.eq(caro_now).animate({left:-caro_width +'px'},1000);
                    caro_show.eq(caro_next).animate({left:0},1000,slidecall);
                }
            }
            tab_show.eq(caro_now).removeClass('active');
            tab_show.eq(caro_next).addClass('active');
        }
        function slidecall() {
            caro_show.eq(caro_now).hide(callback);
        }
    });
    //定时切换
    function carotime(){
        var caro_show = $('#'+cid+' .caro-main li');
        var tab_show = $('#'+cid+' .caro-tab li')
        var caro_now;
        var caro_next;
        caro_show.each(function(){
            if($(this).css('display')!='none'){
                caro_now = $(this).index();
            }
        });
        caro_next = caro_now + 1;
        if(caro_next==caro_show.length){
            caro_next=0;
        }
        if(caro_finish == true){
            if(cstyle=='fade'){
                caro_finish = false;
                caro_show.fadeOut(500);
                caro_show.eq(caro_next).fadeIn(500,callback);
            }
            if(cstyle=='slide'){
                caro_finish = false;
                var slide_side;
                caro_show.eq(caro_next).css('left',caro_width +'px').css('display','list-item');
                caro_show.eq(caro_now).animate({left:-caro_width +'px'},1000);
                caro_show.eq(caro_next).animate({left:0},1000,slidecall);
            }
            tab_show.eq(caro_now).removeClass('active');
            tab_show.eq(caro_next).addClass('active');
        }
        function slidecall() {
            caro_show.eq(caro_now).hide(callback);
        }
    }
    function callback() {
        clearInterval(caroArr[cid]);
        caroArr[cid] = setInterval(carotime,ctime);
        caro_finish = true;
    }
    caroArr[cid] = setInterval(carotime,ctime);
}