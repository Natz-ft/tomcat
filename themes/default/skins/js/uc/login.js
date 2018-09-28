$(document).ready(function(){
    $(".titleselect").click(function(){
        $(this).css("background","#ffffff");
        $(this).css("color","#000000");
        $(".titleunselect").css("background","#00C0D3");
        $(".titleunselect").css("color","#ffffff");
        $(".maincontain").show();
        $(".maincontaintwo").hide();
    });
    $(".titleunselect").click(function(){
        $(".titleselect").css("background","#00C0D3");
        $(".titleselect").css("color","#ffffff");
        $(this).css("background","#ffffff");
        $(this).css("color","#000000");
        $(".maincontaintwo").show();
        $(".maincontain").hide();
    });

   /* $(".titleTab").click(function(){
        if($(this).hasClass("titleunselect"))
        {
            $(this).removeClass("titleunselect").addClass("titleselect");
            $(this).siblings().removeClass("titleselect").addClass("titleunselect")
        }
    })*/
});


