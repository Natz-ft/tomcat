/**
 * Created by ZhangYe on 2015/8/28.
 */
$(function () {


    /*�鿴�����¼�*/
    $(".viewmore_event").click(function(event) {
        $(this).toggleClass('item_viewless');
        $(this).next("ul").toggleClass('item_heightauto');
    });
    $('.catalog_checked').children().hide();
    $(".checked_item").hide();
    $('.item_themelist').hide();
    $('.item_departlist').hide();
    $('.theme_secondlevel').hide();
    /*ɸѡ����¼�*/
    var cateobj;
    $('.cate_list li').each(function(){
        $(this).click(function(){

            if (cateobj != null) {
                cateobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            cateobj = $(this);
            var catename=$(this).text();
            if(catename=='�Ƽ�'){
                $('.item_themelist').slideUp();
                $('.item_departlist').slideUp();
                $(".theme_checked").hide();
                $('.theme_checked em').text('');
                $(".themesecond_checked").hide();
                $('.themesecond_checked em').text('');
                $(".depart_checked").hide();
                $('.depart_checked em').text('');
                $('.theme_firstlevel').show();
                $('.theme_viewmore').show();
                $('.theme_secondlevel').hide();
                $('.item_themelist ul li a').removeClass('item_current');
                $('.item_departlist ul li').removeClass('item_current');

            }
            else if(catename=='����'){
                $('.item_departlist').hide();
                $('.item_themelist').slideDown();
                var h=$('.item_main').eq(0).height();
                console.log(h);
            }
            else{
                $('.item_themelist').hide();
                $('.item_departlist').slideDown();
                var h=$('.item_main').eq(0).height();
                console.log(h);
            }
        });
        $('.cate_list li').eq(0).click();
    });
    var themeobj;
    $('.theme_firstlevel li a').each(function(){
        $(this).click(function(){
            $('.catalog_checked').children('.checked_default').show();
            $('.theme_firstlevel').hide();
            $(this).parents('ul').prev('.theme_viewmore').hide();
            $('.theme_secondlevel').show();
            if (themeobj != null) {
                themeobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            themeobj = $(this);
            var themename=$(this).text();
            $(".theme_checked").show();
            $('.theme_checked em').text(themename);
        });
    });
    var secondobj;
    $('.theme_secondlevel li a').each(function(){
        $(this).click(function(){
            if (secondobj != null) {
                secondobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            secondobj = $(this);
            var secondname=$(this).text();
            $(".themesecond_checked").show();
            $('.themesecond_checked em').text(secondname);
        });
    });
    var departobj;
    $('.item_departlist li').each(function(){
        $(this).click(function(){
            $('.catalog_checked').children('.checked_default').show();
            if (departobj != null) {
                departobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            departobj = $(this);
            var departname=$(this).text();
            $(".depart_checked").show();
            $('.depart_checked em').text(departname);
        });
    });
    var tagobj;
    $('.tag_list li').each(function(){
        $(this).click(function(){
            if (tagobj != null) {
                tagobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            tagobj = $(this);
            var tagname=$(this).text();
            if(tagname=='����'){
                $(".tag_checked").hide();
                $('.tag_checked em').text('');
            }
            if(tagname!='����'){
                $('.catalog_checked').children('.checked_default').show();
                $(".tag_checked").show();
                $('.tag_checked em').text(tagname);
            }
        });
        $('.tag_list li').eq(0).click();
    });
    var formatobj;
    $('.format_list li').each(function(){
        $(this).click(function(){
            if (formatobj != null) {
                formatobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            formatobj = $(this);
            var formatname=$(this).text();
            if(formatname=='����'){
                $(".format_checked").hide();
                $('.format_checked em').text('');
            }
            if(formatname!='����'){
                $('.catalog_checked').children('.checked_default').show();
                $(".format_checked").show();
                $('.format_checked em').text(formatname);
            }
        });
        $('.format_list li').eq(0).click();
    })
    var gradeobj;
    $('.grade_list li').each(function(){
        $(this).click(function(){
            if (gradeobj != null) {
                gradeobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            gradeobj = $(this);
            var gradename=$(this).text();
            if(gradename=='����'){
                $(".grade_checked").hide();
                $('.grade_checked em').text('');
            }
            if(gradename!='����'){
                $('.catalog_checked').children('.checked_default').show();
                $(".grade_checked").show();
                $('.grade_checked em').text(gradename);
            }
        });
        $('.grade_list li').eq(0).click();
    });
    var priceobj;
    $('.price_list li').each(function(){
        $(this).click(function(){
            if (priceobj != null) {
                priceobj.removeClass('item_current');
            }
            $(this).addClass('item_current');
            priceobj = $(this);
            var pricename=$(this).text();
            if(pricename=='����'){
                $(".price_checked").hide();
                $('.price_checked em').text('');
            }
            if(pricename!='����'){
                $('.catalog_checked').children('.checked_default').show();
                $(".price_checked").show();
                $('.price_checked em').text(pricename);
            }
        });
        $('.price_list li').eq(0).click();
    });

    /*����һ������Ŀ¼*/
    $('.theme_title span').click(function(event) {
        $('.theme_secondlevel').hide();
        $('.theme_firstlevel').show();
        $('.theme_viewmore').show();
    });
    /*�����ѡ����*/
    $('.checked_operation').click(function(event) {
        $('.checked_item em').text('');
        $('.checked_item').hide();
        $('.catalog_checked').children().hide();
        $('.item_content ul li a').removeClass('item_current');
        $('.item_content ul li').removeClass('item_current');
        $('.cate_list li').eq(0).click();
        $('.tag_list li').eq(0).click();
        $('.format_list li').eq(0).click();
        $('.grade_list li').eq(0).click();
        $('.price_list li').eq(0).click();
    });

    /*��������ѡ��*/
    var sortobj;
    $('.sort2 li').each(function(){
        $(this).click(function(){
            if (sortobj != null) {
                sortobj.removeClass('li_current');
            }
            $(this).addClass('li_current');
            sortobj = $(this);
        });
        $('.sort2 li').eq(0).click();
    });

    /*��������ѡ��*/
    var sortobj;
    $('.sort4 li').each(function(){
        $(this).click(function(){
            if (sortobj != null) {
                sortobj.removeClass('current');
            }
            $(this).addClass('current');
            sortobj = $(this);
        });
        $('.sort4 li').eq(0).click();
    });

    /*ɾ����ѡ���¼�*/
    $('.checked_item i').each(function(){
        $(this).click(function(event) {
            $(this).parent().hide();
            $(this).prev().text('');
            var itemname=$(this).parent().text();
            if(itemname=='��ǩ��'){$('.tag_list li').eq(0).click();}
            if(itemname=='��ʽ��'){$('.format_list li').eq(0).click();}
            if(itemname=='������'){$('.grade_list li').eq(0).click();}
            if(itemname=='�۸�'){$('.price_list li').eq(0).click();}
            if(itemname=='һ�����⣺'){$(this).parent().next().children('i').click();}
            if(itemname=='�������⣺'){
                $('.theme_secondlevel').hide();
                $('.theme_secondlevel ul li a').removeClass('item_current');
                $('.theme_firstlevel').show();
                $('.theme_viewmore').show();
            }
            if(itemname=='һ�����⣺'||itemname=='���ţ�'||itemname=='�������⣺'){
                if(($('.theme_checked').css('display')=='none')&&($('.depart_checked').css('display')=='none')){
                    $('.cate_list li').eq(0).click();
                }
            }
            console.log(itemname);
        });
    });
    /*�ж��Ƿ���ʾ��ѡ����*/
    $('.catalog_screen').click(function(){
        var countobj=0;
        $('.checked_item').each(function(){
            var displayobj=$(this).css('display');
            if(displayobj!='none'){
                countobj++;
            }
        });
        if(countobj==0){
            $('.catalog_checked').children().hide();
        }
    });

    /*ɸѡ����չ��Ч��*/
    var togglebtn=0;
    $('.item_togglebtn').click(function(event) {
        $(this).toggleClass('togglebtnup');
        var cateheight=$('.item_main').eq(0).height();
        if(togglebtn==0){
            $('.item_main').eq(0).css('border-bottom','none');
            $('.item_main').eq(0).children('.item_body').children('.item_content').css('border-bottom','none');
            $('.item_main').eq(1).slideUp();
            $('.item_main').eq(2).slideUp();
            $('.item_main').eq(3).slideUp();
            $('.item_main').eq(4).slideUp();
            togglebtn=1;
        }
        else{
            $('.item_main').eq(0).css('border-bottom','1px solid #fff');
            $('.item_main').eq(0).children('.item_body').children('.item_content').css('border-bottom','1px solid #e9e5e5');
            $('.item_main').eq(1).slideDown();
            $('.item_main').eq(2).slideDown();
            $('.item_main').eq(3).slideDown();
            $('.item_main').eq(4).slideDown();
            togglebtn=0;
        }
    });

    /*������������*/
    $('.contrast_body').hide();

    $('.cata_contrast').each(function(){
        var contracount=0;
        $(this).click(function(event) {

            if(contracount<5){
                $('.contrast_body').show();
                var contratitle=$(this).parents('.cata_body').prev().children('.cata_title').text();
                console.log(contratitle);
                $('.contrast_body ul').append("<li><a href='#'>"+contratitle+"</a><i></i></li>");
                contracount++;

                $('.contrast_body ul li i').each(function(){
                    $(this).click(function(event) {
                        contracount--;
                        $(this).parent().remove();
                        if(contracount==0){
                            $('.contrast_body').hide();
                        }
                    });
                });
                $('.contrast_remove').click(function(event) {
                    $('.contrast_body ul li').remove();
                    $('.contrast_body').hide();
                    contracount=0;
                });
            }
            else{alert('�������Χ!');}
        });

    });
    $('.contrast_ico').click(function(event) {
        $('.contrast_body').hide();
    });

    $(".li1").click(function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        $("#right1").show();
        $("#right2").hide();
    });
    $(".li2").click(function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        $("#right2").show();
        $("#right1").hide();
    });


});

