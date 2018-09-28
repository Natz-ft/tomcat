/**
 * Created by Administrator on 2015/9/1.
 */
$(function() {
    $('.dmp-select').each(function () {
        var selected_name = $(this).find('.dmp-sel-name');
        if($(this).is(":visible")){
            var selected_width = selected_name.width() + 50;
            selected_name.css('width', selected_width + 'px');
            $(this).find('.dropdown-menu').css('width', $(this).width() + 'px');
        }
        else{
            $(this).on("click",function(){
                $(this).find('.dropdown-menu').css('width', $(this).width() + 'px');
            });
        }
    });
    $(".dmp-select .dropdown-menu li").on("click", "a", function () {
        var $this = $(this);
        var $a = $this.parent().parent().prev().prev();
        $a.text($this.text());
        $a.attr('title',$this.text());
    });
    $("input[type=radio]").uniform();
});