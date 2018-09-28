$(function(){

    window.console = window.console || (function(){   
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile   
        = c.clear = c.exception = c.trace = c.assert = function(){};   
        return c;   
    })(); 
    $(".show-all").click(function(){
        $(this).hide()
        $(".subj-list >ul").addClass("mark")
    });


    carousel('caro','fade',5000);

    var text = $('.d-list-dating');
    for(var i=0; i<text.length; i++){
      text[i].innerHTML =  text[i].innerHTML.substr(0,10);
    }
});