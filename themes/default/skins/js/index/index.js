/**
 * Created by ZhangYE on 2016/5/11.
 */

$(function(){
	//轮播
	carousel('caro','fade',10000000);
    //滚动新闻条
    $('.dynamic-list>ul>li:even').css('background-color','#f5f5f5');
    $('.dynamic-list').vTicker({
        speed: 700,
        pause: 3000,
        showItems: 4,
        animation: 'fade',
        mousePause: true,
        height: 0,
        direction: 'up'
    });
    $('.news-list>ul>li:even').css('background-color','#f5f5f5');
    $('.news-list').vTicker({
        speed: 700,
        pause: 3000,
        showItems: 4,
        animation: 'fade',
        mousePause: true,
        height: 0,
        direction: 'up'
    });
});
