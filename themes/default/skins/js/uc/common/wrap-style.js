/**
 * Created by ZhangYE on 2015/9/6.
 */

var pageData;
$(function() {
    DMP.load_pageData(function(data) {
		$.ajax({
			url: getRootPath()+ "/menu/MenuList.do?method=getMenuLst",
			type: "post",
			dataType: "JSON",
			async:false, 
			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
			success: function(str){
				data = str;
			},
			error: function(){
	  			layer.msg("加载失败",2,0);
			}
		});
        pageData = data;
        // top menu
        load_topMenu(data.menu);
        $('#top_menu').children('.nav').children('li').eq(0).children('a').addClass('mon-active');
        // left slidebar
        load_sideMenu(data.menu[0]);
    });

    // right slidebar
    $.slidebars();
    $("input[type=checkbox]").uniform();
    jQuery('body').on('click', 'button.ajaxify', function(e) {
    	location.href = $(this).val();
    });
});

function load_topMenu(data) {
    $('#top_menu').dmpLoadMenu(data, 'top');

    var st;
    $('#top_menu > ul.nav > li').hover(function() {
        var _this = $(this);
        clearTimeout(st);
        if($(this).children('.drop-menu').css('display') == 'none') {
            $('#top_menu > ul.nav').find('.drop-menu').hide();
            _this.siblings().removeClass('hover');
            _this.addClass('hover');
            _this.children('.drop-menu').fadeIn(300);
        }
    }, function() {
        var _this = $(this);
        st = setTimeout(function() {
            _this.removeClass('hover');
            _this.children('.drop-menu').hide();
        }, 500);
    });

    var hasSideMenu = true;
    $('#top_menu > ul > li > a').click(function(e) {
        e.preventDefault();

        var _this = $(this),
            index = _this.parent().index(),
            href = _this.attr('href');

        if(href !== 'javascript:;') {
            if(hasSideMenu) {
                hasSideMenu = false;
                $('#nav-accordion').empty();
                $('.sidebar-toggle-box > .fa-bars').click();
            }
            $('#pageIFrame').attr('src', href);
        } else {
            if(!hasSideMenu) {
                hasSideMenu = true;
                $('.sidebar-toggle-box > .fa-bars').click();
            }
            load_sideMenu(pageData.menu[index]);
        }
    });
    $('#top_menu .drop-menu a').click(function(e) {
        e.preventDefault();

        var _this = $(this),
            index = _this.parents('.drop-menu').parent().index(),
            href = _this.attr('href'),
            targetMenu = _this.attr('data-value');

        load_sideMenu(pageData.menu[index], {
            href: href,
            targetMenu: targetMenu
        });
    });
}

function load_sideMenu(data, option) {
    var li;
    if(option) {
        var tag = $('#nav-accordion a[data-value="' + option.targetMenu + '"]'),
            hreftag = $('#nav-accordion a[href="' + (option.href == 'javascript:;' ? '' : option.href) + '"]');
        if(tag.length == 0 && hreftag.length == 0) {
            change_sideMenu(data);
        }
        if(option.targetMenu) {
            tag = $('#nav-accordion a[data-value="' + option.targetMenu + '"]');
            li = tag.parent();
        } else if(option.href) {
            hreftag = $('#nav-accordion a[href="' + option.href + '"]');
            li = hreftag.parent();
        }
    } else {
        change_sideMenu(data);
        li = $('#nav-accordion > li').children('ul.sub').children('li:first');
    }
    var href = data.link;
    $('#pageIFrame').attr('src', href);
    /*
    while(li.hasClass('sub-menu')) {
        li.children('a').click();
        li = li.children('ul.sub').children('li:first');
    }
    */
    //li.children('a').click();
}
function change_sideMenu(data) {
    $('#nav-accordion').dmpLoadMenu(data);
    $('#nav-accordion').dcAccordion({
        eventType: 'click',
        saveState: true,
        disableLink: true,
        showCount: false,
        autoExpand: true,
        classExpand: 'dcjq-current-parent'
    });
    $('#sidebar a').not('.dcjq-parent').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('#pageIFrame').attr('src', href);
    });
    $('#nav-accordion > li > a').click();
}

//设置iframe高度，使内容滚动条不显示，使用外部滚动条，外部滚动条使用了nicescroll
function setIframeHeight(e) {
    $(e).css('height', '100%');
    e.src.indexOf('DMP') != -1 && $(e).css('height', document.getElementById(e.id).contentDocument.body.scrollHeight);
}

var Script = function() {

//    sidebar dropdown menu auto scrolling

    jQuery('#sidebar .sub-menu > a').click(function () {
        var o = ($(this).offset());
        diff = 250 - o.top;
        if (diff > 0)
            $("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
        else
            $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
    });

//    sidebar toggle

    $(function () {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }

            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                $('#sidebar > ul').show();
            }
        }

        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

    $('.fa-bars').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-210px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '210px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });

// custom scrollbar
    $("#sidebar").niceScroll({
        styler: "fb",
        cursorcolor: "#e8403f",
        cursorwidth: '3',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled: false,
        cursorborder: ''
    });

    /*$("html").niceScroll({
     styler: "fb",
     cursorcolor: "#e8403f",
     cursorwidth: '6',
     cursorborderradius: '10px',
     background: '#404040',
     spacebarenabled: false,
     cursorborder: '',
     zindex: '1000'
     });*/

// widget tools

    jQuery('.panel .tools .fa-chevron-down').click(function () {
        var el = jQuery(this).parents(".panel").children(".panel-body");
        if (jQuery(this).hasClass("fa-chevron-down")) {
            jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });

// by default collapse widget

//    $('.panel .tools .fa').click(function () {
//        var el = $(this).parents(".panel").children(".panel-body");
//        if ($(this).hasClass("fa-chevron-down")) {
//            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
//            el.slideUp(200);
//        } else {
//            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
//            el.slideDown(200); }
//    });

    jQuery('.panel .tools .fa-times').click(function () {
        jQuery(this).parents(".panel").parent().remove();
    });


//    tool tips

    $('.tooltips').tooltip();

//    popovers

    $('.popovers').popover();


// custom bar chart

    if ($(".custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }

}();


/***新增部分***/

function hideTooltip(obj){//隐藏下拉列表
    obj.removeClass('open');
}
$(function() {
    $('#top_menu').on('click','li',function(){
        $(this).siblings('li').children('a').removeClass('mon-active');
        $(this).children('a').addClass('mon-active');
    });
    $('#sidebar').on('click','#nav-accordion>li>ul>li>a',function(){
        if(!$(this).hasClass('dcjq-parent')){
            $('#sidebar').find('a').removeClass('mon-active');
        }
    });
    $('#sidebar').on('click','#nav-accordion>li>ul>li>ul>li>a',function(){
        if(!$(this).hasClass('dcjq-parent')){
            $('#sidebar').find('a').removeClass('mon-active');
            $(this).parent('li').parent('ul').siblings('a').addClass('mon-active');
        }
    });
    $('#sidebar').on('click','#nav-accordion>li>ul>li>ul>li>ul>li>a',function(){
        if(!$(this).hasClass('dcjq-parent')){
            $('#sidebar').find('a').removeClass('mon-active');
            $(this).parent('li').parent('ul').parent('li').parent('ul').siblings('a').addClass('mon-active');
        }
    });
    $('.top-nav .dropdown').click(function(){
        return false;
    });
    $('.top-nav .dropdown').mouseover(function(){
        $(this).siblings('.dropdown').removeClass('open');
        $(this).addClass('open');
        clearTimeout(t);
    });
    var t;//计时参数
    var hideobj;
    $('.top-nav .dropdown').mouseout(function(){
        hide_obj = $(this);
        t = setTimeout('hideTooltip(hide_obj)',1000);
    });

    var theme = 'theme-blue';//页面主题，初始为 theme-blue
    $('body').attr('class',theme);
    $('#theme-select .dropdown-menu li').click(function(){
       switch($(this).index()){
           case 1:
               theme = 'theme-blue';
               break;
           case 2:
               theme = 'theme-black';
               break;
           case 3:
               theme = 'theme-light';
               break;
           case 4:
               theme = 'theme-grey';
               break;
       }
       $(this).parents('body').attr('class',theme);
//        $('#pageIFrame').contents().find('body').attr('class',theme);
    });

    $("#pageIFrame").load(function() {
//        $('#pageIFrame').contents().find('body').attr('class',theme);
    });
});

/*开发补充*/
/**
 * 获取工程根目录
 * @returns
 */
var getRootPath = function() {
	var protocol = window.location.protocol + '//',
    	host = window.location.host + '/',
    	pathName = window.location.pathname.split('/');
    var projectName = pathName[1];
    return (protocol + host + projectName );
}
